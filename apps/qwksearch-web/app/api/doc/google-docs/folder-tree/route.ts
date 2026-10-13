/**
 * @fileoverview Google Drive folder sync. GET walks one synced folder
 * (`folderId`, or `root` for all of My Drive) and returns every file and
 * subfolder beneath it, which the workspace turns into the file tree shown
 * when a Google Drive storage source is active.
 */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  driveErrorResponse,
  isValidDriveId,
  listFolderTree,
  persistRefreshedToken,
  tokenRefFromCookies,
} from "@/lib/integrations/googleDrive";

export async function GET(request: NextRequest) {
  const folderId = request.nextUrl.searchParams.get("folderId");
  if (!isValidDriveId(folderId)) {
    return NextResponse.json({ success: false, error: "folderId parameter is required" }, { status: 400 });
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

    const tree = await listFolderTree(folderId, tokenRef);
    persistRefreshedToken(cookieStore, tokenRef);

    return NextResponse.json({ success: true, ...tree });
  } catch (error: any) {
    const { status, body } = driveErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
