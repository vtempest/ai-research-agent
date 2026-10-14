/**
 * @fileoverview Google Drive file content fetcher. GET downloads a file's
 * content by ID, handling both Google Workspace exports and regular file
 * downloads. Automatically refreshes expired tokens.
 */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DRIVE_BASE, driveRequest } from "@/lib/integrations/googleDrive";

function pickExportMime(mimeType: string): string {
  if (mimeType.includes("spreadsheet")) return "text/csv";
  return "text/plain";
}

export async function GET(request: NextRequest) {
  try {
    const fileId = request.nextUrl.searchParams.get("fileId");
    if (!fileId) {
      return NextResponse.json(
        { success: false, error: "fileId parameter is required" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("google_access_token")?.value;
    const refreshToken = cookieStore.get("google_refresh_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: "Not authenticated with Google Drive" },
        { status: 401 },
      );
    }

    const tokenRef = { token: accessToken, refresh: refreshToken, refreshed: false };

    const metaUrl = `${DRIVE_BASE}/files/${encodeURIComponent(fileId)}?fields=${encodeURIComponent("id,name,mimeType,size,modifiedTime,webViewLink")}`;
    const metaRes = await driveRequest(metaUrl, tokenRef);
    const file = (await metaRes.json()) as {
      id?: string;
      name?: string;
      mimeType?: string;
      size?: string;
      modifiedTime?: string;
      webViewLink?: string;
    };

    let contentBuf: ArrayBuffer;
    if (file.mimeType?.startsWith("application/vnd.google-apps")) {
      const exportUrl = `${DRIVE_BASE}/files/${encodeURIComponent(fileId)}/export?mimeType=${encodeURIComponent(pickExportMime(file.mimeType))}`;
      const res = await driveRequest(exportUrl, tokenRef);
      contentBuf = await res.arrayBuffer();
    } else {
      const dlUrl = `${DRIVE_BASE}/files/${encodeURIComponent(fileId)}?alt=media`;
      const res = await driveRequest(dlUrl, tokenRef);
      contentBuf = await res.arrayBuffer();
    }

    if (tokenRef.refreshed) {
      cookieStore.set("google_access_token", tokenRef.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return NextResponse.json({
      success: true,
      file: {
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size,
        modifiedTime: file.modifiedTime,
        webViewLink: file.webViewLink,
        content: Buffer.from(contentBuf).toString("base64"),
      },
    });
  } catch (error: any) {
    console.error("Error fetching Google Drive file:", error);

    if (error.code === 401 || error.message?.includes("invalid_grant")) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication expired. Please reconnect Google Drive.",
          needsReauth: true,
        },
        { status: 401 },
      );
    }

    if (error.code === 404 || error.message?.includes("File not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "File not found or access denied. You may need to reconnect Google Drive.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch file from Google Drive" },
      { status: 500 },
    );
  }
}
