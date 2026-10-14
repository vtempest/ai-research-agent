/**
 * @fileoverview The "Google Drive" storage source on the client: connecting
 * Drive with folder access, browsing folders to sync from settings, turning a
 * synced folder's listing into file-tree documents, and the
 * `FileSourceProvider` that hands those to `ReasonDocs`.
 *
 * Everything goes through this app's `/api/doc/google-docs/*` routes, which
 * hold the Google tokens in HTTP-only cookies; no token reaches this code.
 */
import type { Document, ExternalDocumentView } from 'react-reason-editor-sidebar';
import type { FileSourceProvider } from 'react-reason-editor/reason-docs';
import type { AnyFileSource, GoogleDocsCredentials } from '../types/fileSource';

/** Base path of the app's Google Drive routes. */
export const GOOGLE_DRIVE_API = '/api/doc/google-docs';

const GOOGLE_DOC = 'application/vnd.google-apps.document';
const GOOGLE_SHEET = 'application/vnd.google-apps.spreadsheet';
const GOOGLE_SLIDES = 'application/vnd.google-apps.presentation';
const GOOGLE_DRAWING = 'application/vnd.google-apps.drawing';
export const GOOGLE_FOLDER = 'application/vnd.google-apps.folder';

/** One Drive file or folder as the folder-tree route returns it. */
export interface DriveItem {
  id: string;
  name: string;
  mimeType: string;
  parents?: string[];
  webViewLink?: string;
  size?: string;
  modifiedTime?: string;
}

/** A folder chosen for sync. `root` stands for all of My Drive. */
export interface DriveFolderRef {
  id: string;
  name: string;
}

/** An error from a Drive route, with the flags the settings UI acts on. */
export class GoogleDriveError extends Error {
  needsReauth: boolean;
  needsFolderAccess: boolean;
  status: number;
  constructor(message: string, status: number, body: Record<string, unknown> = {}) {
    super(message);
    this.name = 'GoogleDriveError';
    this.status = status;
    this.needsReauth = !!body.needsReauth;
    this.needsFolderAccess = !!body.needsFolderAccess;
  }
}

async function driveJson<T>(path: string): Promise<T> {
  const res = await fetch(`${GOOGLE_DRIVE_API}${path}`, { credentials: 'same-origin' });
  let body: any = {};
  try {
    body = await res.json();
  } catch {
    // A non-JSON body (an HTML error page) still yields a useful error below.
  }
  if (!res.ok || body?.success === false) {
    throw new GoogleDriveError(body?.error || `Google Drive request failed (${res.status})`, res.status, body);
  }
  return body as T;
}

/**
 * Pulls a Drive folder ID out of whatever the user pasted: a folder link
 * (`drive.google.com/drive/folders/<id>`, with or without `/u/0`), an
 * `?id=` link, "My Drive", or a bare ID. Returns `null` when nothing in it
 * looks like a folder.
 */
export function parseDriveFolderInput(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  if (/^(my ?drive|root)$/i.test(value)) return 'root';
  const folderPath = value.match(/\/folders\/([A-Za-z0-9_-]+)/);
  if (folderPath) return folderPath[1];
  const idParam = value.match(/[?&]id=([A-Za-z0-9_-]+)/);
  if (idParam) return idParam[1];
  if (/^[A-Za-z0-9_-]{10,}$/.test(value)) return value;
  return null;
}

/** How a Drive file opens in the workspace. */
export function driveDocumentView(mimeType: string): ExternalDocumentView {
  if (mimeType === GOOGLE_DOC || mimeType === 'text/plain' || mimeType === 'text/markdown') return 'editor';
  if (mimeType === 'application/pdf' || mimeType === GOOGLE_SHEET || mimeType === GOOGLE_SLIDES) return 'pdf';
  if (mimeType === GOOGLE_DRAWING || mimeType.startsWith('image/')) return 'image';
  return 'unsupported';
}

/** The extension that picks a Drive file's icon in the tree. */
export function driveExtension(item: Pick<DriveItem, 'name' | 'mimeType'>): string | undefined {
  if (item.mimeType === GOOGLE_DOC) return 'docx';
  if (item.mimeType === GOOGLE_SHEET) return 'xlsx';
  if (item.mimeType === GOOGLE_SLIDES) return 'pptx';
  if (item.mimeType === GOOGLE_DRAWING) return 'png';
  const dot = item.name.lastIndexOf('.');
  if (dot > 0 && dot < item.name.length - 1) return item.name.slice(dot + 1).toLowerCase();
  if (item.mimeType === 'application/pdf') return 'pdf';
  const subtype = item.mimeType.split('/')[1];
  return subtype && /^[a-z0-9]{2,5}$/.test(subtype) ? subtype : undefined;
}

/** Document ID for a Drive file in a source: unique even when two sources share a file. */
export const driveDocumentId = (sourceId: string, fileId: string) => `${sourceId}:${fileId}`;

/** Bytes (or the export) of a Drive file, served by the app. */
export const driveContentUrl = (fileId: string) =>
  `${GOOGLE_DRIVE_API}/content?fileId=${encodeURIComponent(fileId)}`;

/**
 * Turns synced folders' listings into the flat, `parentId`-linked document
 * list the file tree renders. Each synced folder becomes a top-level folder;
 * a file reachable from two synced folders appears once, under the first.
 * Folders sort before files, then by name, the way Drive shows them.
 */
export function driveTreesToDocuments(
  sourceId: string,
  trees: Array<{ root: DriveItem; items: DriveItem[] }>,
): Document[] {
  const docs: Document[] = [];
  const taken = new Set<string>();
  const byName = (a: DriveItem, b: DriveItem) =>
    Number(b.mimeType === GOOGLE_FOLDER) - Number(a.mimeType === GOOGLE_FOLDER) ||
    a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });

  for (const { root, items } of trees) {
    const rootDocId = driveDocumentId(sourceId, root.id);
    if (taken.has(rootDocId)) continue;
    taken.add(rootDocId);
    docs.push({
      id: rootDocId,
      title: root.name,
      content: '',
      parentId: null,
      isFolder: true,
      isExpanded: trees.length === 1,
      external: {
        sourceId,
        fileId: root.id,
        mimeType: GOOGLE_FOLDER,
        view: 'unsupported',
        webViewLink: root.webViewLink,
      },
    });

    const inTree = new Set([root.id, ...items.filter((i) => i.mimeType === GOOGLE_FOLDER).map((i) => i.id)]);
    for (const item of [...items].sort(byName)) {
      const id = driveDocumentId(sourceId, item.id);
      if (taken.has(id)) continue;
      taken.add(id);
      const parent = item.parents?.find((p) => inTree.has(p)) ?? root.id;
      const isFolder = item.mimeType === GOOGLE_FOLDER;
      const view = isFolder ? 'unsupported' : driveDocumentView(item.mimeType);
      docs.push({
        id,
        title: item.name,
        content: '',
        parentId: driveDocumentId(sourceId, parent),
        isFolder,
        isExpanded: false,
        external: {
          sourceId,
          fileId: item.id,
          mimeType: item.mimeType,
          view,
          extension: isFolder ? undefined : driveExtension(item),
          contentUrl: isFolder || view === 'unsupported' ? undefined : driveContentUrl(item.id),
          webViewLink: item.webViewLink,
        },
      });
    }
  }
  return docs;
}

/** The folders a Google Drive source syncs, newest field first. */
export function sourceFolders(credentials: Partial<GoogleDocsCredentials> | undefined): DriveFolderRef[] {
  if (credentials?.folders?.length) return credentials.folders;
  return (credentials?.folderIds ?? []).map((id) => ({ id, name: id === 'root' ? 'My Drive' : id }));
}

/**
 * Lists every synced folder of a Google Drive source as tree documents. A
 * folder that fails (unshared, deleted) is skipped as long as another one
 * loads; when all of them fail, the first error is thrown.
 */
export async function listGoogleDriveSource(source: AnyFileSource): Promise<Document[]> {
  const folders = sourceFolders(source.credentials as GoogleDocsCredentials | undefined);
  if (folders.length === 0) return [];
  const results = await Promise.allSettled(
    folders.map((f) =>
      driveJson<{ root: DriveItem; items: DriveItem[]; truncated?: boolean }>(
        `/folder-tree?folderId=${encodeURIComponent(f.id)}`,
      ),
    ),
  );
  const trees = results.flatMap((r) => (r.status === 'fulfilled' ? [r.value] : []));
  if (trees.length === 0) {
    throw (results[0] as PromiseRejectedResult).reason;
  }
  return driveTreesToDocuments(source.id, trees);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Plain text as blank-line-separated paragraphs, the editor's own shape. */
function textToHtml(text: string): string {
  return text
    .split(/\r?\n\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\r?\n/g, '<br>')}</p>`)
    .join('');
}

/**
 * Cleans a Google Docs HTML export for the editor. Google styles text through
 * generated CSS classes (`.c3{font-weight:700}`) in a `<style>` block, which
 * the editor would drop along with the stylesheet — so bold, italic,
 * underline and strikethrough are turned into tags first. Then every class,
 * inline style and id goes, as do Google's `google.com/url?q=` link
 * redirects, leaving plain semantic HTML.
 */
export function googleDocHtmlToEditorHtml(html: string): string {
  if (typeof DOMParser === 'undefined') {
    const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    return (body ? body[1] : html).replace(/<(script|style)[\s\S]*?<\/\1>/gi, '');
  }

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const classStyles = new Map<string, string>();
  for (const style of Array.from(doc.querySelectorAll('style'))) {
    for (const rule of (style.textContent ?? '').matchAll(/\.([A-Za-z0-9_-]+)\s*\{([^}]*)\}/g)) {
      classStyles.set(rule[1], `${classStyles.get(rule[1]) ?? ''};${rule[2]}`);
    }
  }
  doc.querySelectorAll('script, style, meta, link, title').forEach((node) => node.remove());

  for (const span of Array.from(doc.body.querySelectorAll('span'))) {
    const declarations = [
      ...Array.from(span.classList).map((c) => classStyles.get(c) ?? ''),
      span.getAttribute('style') ?? '',
    ].join(';');
    let inner: Node[] = Array.from(span.childNodes);
    const wrap = (tag: string) => {
      const el = doc.createElement(tag);
      inner.forEach((n) => el.appendChild(n));
      inner = [el];
    };
    if (/font-weight:\s*(700|800|900|bold)/i.test(declarations)) wrap('strong');
    if (/font-style:\s*italic/i.test(declarations)) wrap('em');
    if (/text-decoration[^;]*underline/i.test(declarations)) wrap('u');
    if (/text-decoration[^;]*line-through/i.test(declarations)) wrap('s');
    span.replaceWith(...inner);
  }

  for (const link of Array.from(doc.body.querySelectorAll('a[href]'))) {
    try {
      const url = new URL(link.getAttribute('href')!);
      if (url.hostname === 'www.google.com' && url.pathname === '/url' && url.searchParams.get('q')) {
        link.setAttribute('href', url.searchParams.get('q')!);
      }
    } catch {
      // Relative or malformed hrefs (in-document anchors) stay as they are.
    }
  }

  for (const el of Array.from(doc.body.querySelectorAll('[class], [style], [id]'))) {
    el.removeAttribute('class');
    el.removeAttribute('style');
    el.removeAttribute('id');
  }

  return doc.body.innerHTML.trim();
}

/** Fetches the body of a Drive document that opens in the editor. */
export async function loadGoogleDriveDocumentContent(doc: Document): Promise<string> {
  const external = doc.external;
  if (!external?.contentUrl) return '';
  const res = await fetch(external.contentUrl, { credentials: 'same-origin' });
  if (!res.ok) {
    let body: any = {};
    try {
      body = await res.json();
    } catch {
      // Fall through to the generic message.
    }
    throw new GoogleDriveError(body?.error || `Couldn't load the file (${res.status})`, res.status, body);
  }
  const text = await res.text();
  return external.mimeType === GOOGLE_DOC ? googleDocHtmlToEditorHtml(text) : textToHtml(text);
}

/** Shows Google Drive storage sources in the `ReasonDocs` file tree. */
export const googleDriveSourceProvider: FileSourceProvider = {
  canList: (source) => source.type === 'gdocs',
  listDocuments: (source) => listGoogleDriveSource(source as AnyFileSource),
  loadDocumentContent: loadGoogleDriveDocumentContent,
};

/** Whether Drive is connected, and whether the grant covers folder sync. */
export async function getGoogleDriveStatus(): Promise<{ isConnected: boolean; canReadFolders: boolean }> {
  const body = await driveJson<{ isConnected?: boolean; canReadFolders?: boolean }>('/auth/status');
  return { isConnected: !!body.isConnected, canReadFolders: !!body.canReadFolders };
}

/** One folder and the folders directly inside it, for the settings browser. */
export async function browseGoogleDriveFolders(
  parentId = 'root',
): Promise<{ folder: DriveFolderRef; folders: DriveFolderRef[] }> {
  return driveJson(`/folders?parentId=${encodeURIComponent(parentId)}`);
}

/**
 * Connects Google Drive with folder access in a popup. The popup is opened
 * before the consent URL is fetched, inside the click, so popup blockers let
 * it through. Resolves `true` once the callback page reports success and
 * `false` if the user closes the popup first.
 */
export function connectGoogleDriveFolders(): Promise<boolean> {
  const width = 520;
  const height = 680;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  const popup = window.open('', 'google-drive-auth', `width=${width},height=${height},left=${left},top=${top}`);

  return new Promise<boolean>((resolve, reject) => {
    let settled = false;
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      window.removeEventListener('message', onMessage);
      window.clearInterval(closedPoll);
      fn();
    };
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === 'google-drive-connected') finish(() => resolve(true));
      if (event.data?.type === 'google-drive-error') {
        finish(() => reject(new GoogleDriveError(event.data.error || 'Google sign-in failed', 401)));
      }
    };
    window.addEventListener('message', onMessage);
    const closedPoll = window.setInterval(() => {
      if (popup?.closed) finish(() => resolve(false));
    }, 500);

    driveJson<{ data?: { authUrl?: string } }>('/auth?access=folders')
      .then((body) => {
        const authUrl = body.data?.authUrl;
        if (!authUrl) throw new GoogleDriveError('Google sign-in is not configured', 500);
        if (popup && !popup.closed) {
          popup.location.href = authUrl;
        } else {
          // Blocked anyway: fall back to a full-page redirect.
          window.location.href = authUrl;
        }
      })
      .catch((error) => {
        popup?.close();
        finish(() => reject(error));
      });
  });
}
