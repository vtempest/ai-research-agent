/**
 * @fileoverview Google Drive folder browser for the storage settings. GET
 * returns one folder (`parentId`, default `root` = My Drive) and the folders
 * directly inside it, so the settings page can let a user walk their Drive
 * and pick folders to sync, or resolve the name of a pasted folder link.
 */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  FOLDER_MIME,
  driveErrorResponse,
  getDriveItem,
  isValidDriveId,
  listChildren,
  persistRefreshedToken,
  tokenRefFromCookies,
} from "@/lib/integrations/googleDrive";

export async function GET(request: NextRequest) {
  const parentId = request.nextUrl.searchParams.get("parentId") || "root";
  if (!isValidDriveId(parentId)) {
    return NextResponse.json({ success: false, error: "Invalid folder ID" }, { status: 400 });
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

    const folder = await getDriveItem(parentId, tokenRef);
    if (folder.mimeType !== FOLDER_MIME) {
      return NextResponse.json({ success: false, error: "That link is not a Google Drive folder" }, { status: 400 });
    }
    const folders = await listChildren([folder.id], tokenRef, { foldersOnly: true });
    persistRefreshedToken(cookieStore, tokenRef);

    return NextResponse.json({
      success: true,
      folder: { id: parentId === "root" ? "root" : folder.id, name: folder.name },
      folders: folders.map((f) => ({ id: f.id, name: f.name })),
    });
  } catch (error: any) {
    const { status, body } = driveErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
