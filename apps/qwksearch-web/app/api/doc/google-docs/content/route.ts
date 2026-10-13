/**
 * @fileoverview Google Drive file bytes for the in-app viewers. GET streams
 * one file (`fileId`) straight through from Drive: PDFs and images as they
 * are, Google Docs exported as HTML for the editor, Sheets and Slides as PDF.
 *
 * The body is streamed rather than buffered, so a large PDF never sits in the
 * Worker's memory. Responses carry `Content-Security-Policy: sandbox`: these
 * are arbitrary files from a user's Drive served from this origin, and if one
 * is ever opened directly (an HTML or SVG file, say) it must not run script
 * as this site.
 */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  DRIVE_BASE,
  driveErrorResponse,
  driveRequest,
  getDriveItem,
  isValidDriveId,
  persistRefreshedToken,
  servedFormat,
  tokenRefFromCookies,
} from "@/lib/integrations/googleDrive";

export async function GET(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get("fileId");
  if (!isValidDriveId(fileId) || fileId === "root") {
    return NextResponse.json({ success: false, error: "fileId parameter is required" }, { status: 400 });
  }

  try {
    const cookieStore = await cookies();
    const tokenRef = tokenRefFromCookies(cookieStore);
    if (!tokenRef) {
      return NextResponse.json(
        { success: false, error: "Not authenticated with Google Drive", needsReauth: true },
        { status: 401 },
      );
    }

    const file = await getDriveItem(fileId, tokenRef);
    const format = servedFormat(file.mimeType);
    if (!format) {
      return NextResponse.json(
        { success: false, error: "This kind of Google file has no preview", webViewLink: file.webViewLink },
        { status: 415 },
      );
    }

    const id = encodeURIComponent(file.id);
    const url = format.exportMime
      ? `${DRIVE_BASE}/files/${id}/export?mimeType=${encodeURIComponent(format.exportMime)}`
      : `${DRIVE_BASE}/files/${id}?alt=media&supportsAllDrives=true`;
    const driveRes = await driveRequest(url, tokenRef);
    persistRefreshedToken(cookieStore, tokenRef);

    const headers = new Headers({
      "Content-Type": format.contentType,
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(file.name)}`,
      // next.config.mjs sets the same value for this path (its catch-all
      // CSP would otherwise replace this one); kept here for any host that
      // does not apply the config's headers.
      "Content-Security-Policy": "sandbox; frame-ancestors *;",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, max-age=300",
    });
    const length = driveRes.headers.get("content-length");
    if (length) headers.set("Content-Length", length);

    return new Response(driveRes.body, { status: 200, headers });
  } catch (error: any) {
    const { status, body } = driveErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
