/**
 * @fileoverview Google Drive file content fetcher. GET downloads a file's
 * content by ID, handling both Google Workspace exports and regular file
 * downloads. Automatically refreshes expired tokens.
 */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { google } from "googleapis";
import { getEnv } from "@/lib/env";

// Helper to get authenticated Google Drive client
async function getAuthenticatedDriveClient(
  accessToken: string,
  refreshToken?: string,
): Promise<{ drive: any; oauth2Client: InstanceType<typeof google.auth.OAuth2> }> {
  const oauth2Client = new google.auth.OAuth2(
    getEnv("GOOGLE_CLIENT_ID")!,
    getEnv("GOOGLE_CLIENT_SECRET")!,
    getEnv("GOOGLE_REDIRECT_URI") ||
      "https://qwksearch.com/api/google-docs/callback",
  );

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  return { drive, oauth2Client };
}

// Helper to export Google Docs to different formats
async function exportGoogleDoc(
  drive: any,
  fileId: string,
  mimeType: string,
): Promise<Buffer> {
  const exportMimeType = mimeType.includes("document")
    ? "text/plain"
    : mimeType.includes("spreadsheet")
      ? "text/csv"
      : mimeType.includes("presentation")
        ? "text/plain"
        : "text/plain";

  const response = await drive.files.export(
    {
      fileId,
      mimeType: exportMimeType,
    },
    { responseType: "arraybuffer" },
  );

  return Buffer.from(response.data);
}

// GET /api/google-docs/files?fileId=xxx - Fetch file content from Google Drive
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json(
        {
          success: false,
          error: "fileId parameter is required",
        },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("google_access_token")?.value;
    const refreshToken = cookieStore.get("google_refresh_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Not authenticated with Google Drive",
        },
        { status: 401 },
      );
    }

    const { drive, oauth2Client } = await getAuthenticatedDriveClient(
      accessToken,
      refreshToken,
    );

    // Get file metadata
    const fileMetadata = await drive.files.get({
      fileId,
      fields: "id, name, mimeType, size, modifiedTime, webViewLink",
    });

    const file = fileMetadata.data;
    let content: Buffer;

    // Check if it's a Google Workspace file (needs to be exported)
    if (file.mimeType?.startsWith("application/vnd.google-apps")) {
      content = await exportGoogleDoc(drive, fileId, file.mimeType);
    } else {
      // Regular file - download directly
      const response = await drive.files.get(
        {
          fileId,
          alt: "media",
        },
        { responseType: "arraybuffer" },
      );
      content = Buffer.from(response.data);
    }

    // Check if token was refreshed
    const credentials = oauth2Client.credentials;
    if (credentials.access_token !== accessToken) {
      // Token was refreshed, update cookie
      cookieStore.set("google_access_token", credentials.access_token!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
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
        content: content.toString("base64"),
      },
    });
  } catch (error: any) {
    console.error("Error fetching Google Drive file:", error);

    // Check if it's an authentication error
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

    // Google Drive returns 404 when the file doesn't exist or the token scope
    // doesn't cover it (drive.file scope limitation)
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
      {
        success: false,
        error: error.message || "Failed to fetch file from Google Drive",
      },
      { status: 500 },
    );
  }
}
