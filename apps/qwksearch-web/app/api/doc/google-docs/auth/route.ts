/**
 * @fileoverview Google OAuth authorization URL generator. GET builds and
 * returns the Google OAuth consent URL for connecting Google Drive.
 * `?access=folders` asks for folder sync access on top of the per-file scope
 * (see GoogleDocsService.FOLDER_SYNC_SCOPES).
 */
import { NextRequest, NextResponse } from "next/server";
import { GoogleDocsService } from "@/lib/integrations/googleDocsService";
import { getEnv } from "@/lib/config/env";
import { googleRedirectUri } from "@/lib/integrations/googleDrive";

// GET /api/doc/google-docs/auth - Get OAuth URL for authorization
export async function GET(request: NextRequest) {
  try {
    const clientId = getEnv("GOOGLE_CLIENT_ID");
    const clientSecret = getEnv("GOOGLE_CLIENT_SECRET");
    const redirectUri = googleRedirectUri(request.url);

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google OAuth credentials not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.",
        },
        { status: 500 },
      );
    }

    const folderAccess =
      new URL(request.url).searchParams.get("access") === "folders";
    const authUrl = GoogleDocsService.getAuthUrl(
      { clientId, clientSecret, redirectUri },
      folderAccess
        ? GoogleDocsService.FOLDER_SYNC_SCOPES
        : GoogleDocsService.AUTH_SCOPES,
    );

    return NextResponse.json({
      success: true,
      data: { authUrl },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate auth URL",
      },
      { status: 500 },
    );
  }
}
