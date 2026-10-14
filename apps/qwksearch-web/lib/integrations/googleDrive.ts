/**
 * @fileoverview Google Drive REST helpers behind the `/api/doc/google-docs/*`
 * routes: an authorized fetch that refreshes the access token once on a 401,
 * folder listing for the "Google Drive" storage source, and the rule for how
 * each Drive file type is served to the in-app viewers.
 *
 * Plain `fetch` only — no `googleapis` SDK — so all of it runs on a Worker.
 */
import { getEnv } from "@/lib/config/env";

export const DRIVE_BASE = "https://www.googleapis.com/drive/v3";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

export const FOLDER_MIME = "application/vnd.google-apps.folder";

/**
 * The scope folder sync needs on top of the connector's per-file
 * `drive.file`. Listing a folder the user picked — and reading the files in
 * it — is not covered by `drive.file`, which only reaches files handed over
 * one by one through the Picker or created by this app.
 */
export const DRIVE_FOLDER_SCOPE = "https://www.googleapis.com/auth/drive.readonly";

/** The access token in use, the refresh token behind it, and whether it changed. */
export interface DriveTokenRef {
  token: string;
  refresh?: string;
  refreshed: boolean;
}

/** One Drive file or folder, with only the fields the storage source uses. */
export interface DriveItem {
  id: string;
  name: string;
  mimeType: string;
  parents?: string[];
  modifiedTime?: string;
  size?: string;
  webViewLink?: string;
}

const ITEM_FIELDS = "id,name,mimeType,parents,modifiedTime,size,webViewLink";

/** Builds an `Error` carrying the HTTP status the Drive call failed with. */
function driveError(message: string, code: number): Error & { code: number } {
  const err = new Error(message) as Error & { code: number };
  err.code = code;
  return err;
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: getEnv("GOOGLE_CLIENT_ID")!,
      client_secret: getEnv("GOOGLE_CLIENT_SECRET")!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }).toString(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw driveError(text || "invalid_grant", 401);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/**
 * GETs a Drive URL with the user's token. On a 401 it refreshes once (when a
 * refresh token is available), records the new token on `tokenRef` and
 * retries. Any other non-2xx response throws with `code` set to its status.
 */
export async function driveRequest(url: string, tokenRef: DriveTokenRef): Promise<Response> {
  let res = await fetch(url, {
    headers: { Authorization: `Bearer ${tokenRef.token}` },
  });
  if (res.status === 401 && tokenRef.refresh) {
    tokenRef.token = await refreshAccessToken(tokenRef.refresh);
    tokenRef.refreshed = true;
    res = await fetch(url, {
      headers: { Authorization: `Bearer ${tokenRef.token}` },
    });
  }
  if (!res.ok) {
    const text = await res.text();
    throw driveError(text || `Request failed: ${res.status}`, res.status);
  }
  return res;
}

/**
 * Reads the Google tokens from the request cookies. Returns `null` when the
 * user has never connected Drive (no access or refresh token at all).
 */
export function tokenRefFromCookies(cookieStore: {
  get(name: string): { value: string } | undefined;
}): DriveTokenRef | null {
  const accessToken = cookieStore.get("google_access_token")?.value;
  const refreshToken = cookieStore.get("google_refresh_token")?.value;
  if (!accessToken && !refreshToken) return null;
  // An expired access cookie with a live refresh token still works: the
  // first Drive call 401s and driveRequest refreshes it.
  return { token: accessToken ?? "", refresh: refreshToken, refreshed: false };
}

/** Writes a token driveRequest refreshed back to its cookie. */
export function persistRefreshedToken(
  cookieStore: { set(name: string, value: string, options: Record<string, unknown>): unknown },
  tokenRef: DriveTokenRef,
): void {
  if (!tokenRef.refreshed) return;
  cookieStore.set("google_access_token", tokenRef.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

/**
 * The OAuth redirect URI: `GOOGLE_REDIRECT_URI` when set, otherwise this
 * deployment's own callback route. The same value must be used to build the
 * consent URL and to exchange the code, and it must be listed on the OAuth
 * client in the Google Cloud console.
 */
export function googleRedirectUri(requestUrl: string): string {
  return (
    getEnv("GOOGLE_REDIRECT_URI") ||
    `${new URL(requestUrl).origin}/api/doc/google-docs/callback`
  );
}

/** Drive file IDs are URL-safe base64-ish; `root` is the alias for My Drive. */
export function isValidDriveId(id: string | null | undefined): id is string {
  return !!id && /^[A-Za-z0-9_-]{1,200}$/.test(id);
}

/** Metadata for one file or folder. `root` resolves to the user's My Drive. */
export async function getDriveItem(fileId: string, tokenRef: DriveTokenRef): Promise<DriveItem> {
  const url = `${DRIVE_BASE}/files/${encodeURIComponent(fileId)}?fields=${encodeURIComponent(ITEM_FIELDS)}&supportsAllDrives=true`;
  const item = (await (await driveRequest(url, tokenRef)).json()) as DriveItem;
  // Drive names the root folder "My Drive" in its UI but returns it as such
  // only in some locales; pin it so the tree root reads the same everywhere.
  if (fileId === "root") item.name = "My Drive";
  return item;
}

/**
 * Lists the non-trashed children of one or more folders, following
 * `nextPageToken` to the end. Several parents go in one query (`'a' in
 * parents or 'b' in parents`), which keeps a folder tree's walk to a few
 * subrequests per level rather than one per folder.
 */
export async function listChildren(
  parentIds: string[],
  tokenRef: DriveTokenRef,
  options: { foldersOnly?: boolean } = {},
): Promise<DriveItem[]> {
  const parents = parentIds.map((id) => `'${id}' in parents`).join(" or ");
  const q = `(${parents}) and trashed = false${options.foldersOnly ? ` and mimeType = '${FOLDER_MIME}'` : ""}`;
  const items: DriveItem[] = [];
  let pageToken: string | undefined;
  do {
    const params = new URLSearchParams({
      q,
      fields: `nextPageToken,files(${ITEM_FIELDS})`,
      pageSize: "1000",
      orderBy: "folder,name",
      supportsAllDrives: "true",
      includeItemsFromAllDrives: "true",
    });
    if (pageToken) params.set("pageToken", pageToken);
    const res = await driveRequest(`${DRIVE_BASE}/files?${params.toString()}`, tokenRef);
    const page = (await res.json()) as { files?: DriveItem[]; nextPageToken?: string };
    items.push(...(page.files ?? []));
    pageToken = page.nextPageToken;
  } while (pageToken);
  return items;
}

/** Most parents one listing query names. Drive caps the length of `q`. */
const PARENTS_PER_QUERY = 20;

export interface DriveFolderTree {
  /** The folder the walk started from. */
  root: DriveItem;
  /** Every file and folder found beneath it, in walk order. */
  items: DriveItem[];
  /** True when the walk stopped at `maxItems` or `maxDepth` before finishing. */
  truncated: boolean;
}

/**
 * Walks a folder breadth-first and returns everything beneath it. The walk is
 * bounded — a Worker has a subrequest budget, and the sidebar has no use for
 * tens of thousands of rows — and says so through `truncated`.
 */
export async function listFolderTree(
  folderId: string,
  tokenRef: DriveTokenRef,
  { maxItems = 2000, maxDepth = 8 }: { maxItems?: number; maxDepth?: number } = {},
): Promise<DriveFolderTree> {
  const root = await getDriveItem(folderId, tokenRef);
  if (root.mimeType !== FOLDER_MIME) {
    throw driveError("Not a folder", 400);
  }

  const items: DriveItem[] = [];
  const seen = new Set<string>([root.id]);
  let level = [root.id];
  let truncated = false;

  for (let depth = 0; level.length > 0; depth++) {
    if (depth >= maxDepth) {
      truncated = true;
      break;
    }
    const next: string[] = [];
    for (let i = 0; i < level.length; i += PARENTS_PER_QUERY) {
      const children = await listChildren(level.slice(i, i + PARENTS_PER_QUERY), tokenRef);
      for (const child of children) {
        // A file can sit in several folders; list it once.
        if (seen.has(child.id)) continue;
        seen.add(child.id);
        if (items.length >= maxItems) {
          truncated = true;
          break;
        }
        items.push(child);
        if (child.mimeType === FOLDER_MIME) next.push(child.id);
      }
      if (truncated) break;
    }
    if (truncated) break;
    level = next;
  }

  return { root, items, truncated };
}

/**
 * How a Drive file is served to the viewers. Google's own formats have no
 * bytes of their own and must be exported: Docs as HTML (opened in the
 * editor), Sheets and Slides as PDF (shown in the PDF viewer), Drawings as
 * PNG. `null` means the type has no in-app preview (Forms, Sites, shortcuts).
 */
export function servedFormat(mimeType: string): { exportMime?: string; contentType: string } | null {
  if (mimeType === "application/vnd.google-apps.document") {
    return { exportMime: "text/html", contentType: "text/html; charset=utf-8" };
  }
  if (
    mimeType === "application/vnd.google-apps.spreadsheet" ||
    mimeType === "application/vnd.google-apps.presentation"
  ) {
    return { exportMime: "application/pdf", contentType: "application/pdf" };
  }
  if (mimeType === "application/vnd.google-apps.drawing") {
    return { exportMime: "image/png", contentType: "image/png" };
  }
  if (mimeType.startsWith("application/vnd.google-apps.")) return null;
  return { contentType: mimeType || "application/octet-stream" };
}

/** Maps a thrown Drive error to the JSON error response the routes return. */
export function driveErrorResponse(error: any): { status: number; body: Record<string, unknown> } {
  const message: string = error?.message || "Google Drive request failed";
  if (error?.code === 401 || message.includes("invalid_grant")) {
    return {
      status: 401,
      body: { success: false, error: "Authentication expired. Please reconnect Google Drive.", needsReauth: true },
    };
  }
  if (error?.code === 403 && /insufficient|scope/i.test(message)) {
    return {
      status: 403,
      body: {
        success: false,
        error: "Google Drive folder access was not granted. Reconnect Google Drive and allow access to your files.",
        needsFolderAccess: true,
      },
    };
  }
  if (error?.code === 404) {
    return { status: 404, body: { success: false, error: "File or folder not found, or not shared with this account." } };
  }
  if (error?.code === 400) {
    return { status: 400, body: { success: false, error: message } };
  }
  return { status: 500, body: { success: false, error: message } };
}
