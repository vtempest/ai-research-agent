/**
 * @fileoverview Google Drive connection status check. GET inspects cookies
 * to determine if the user has a valid Google access/refresh token.
 */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET /api/google-docs/auth/status - Check if user has connected Google Drive
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('google_access_token')?.value;
    const refreshToken = cookieStore.get('google_refresh_token')?.value;

    const scope = cookieStore.get('google_drive_scope')?.value ?? '';

    const isConnected = !!(accessToken || refreshToken);

    return NextResponse.json({
      success: true,
      isConnected,
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      // Whether the grant covers folder sync (drive.readonly or full drive),
      // not just files picked one at a time.
      canReadFolders: isConnected && /auth\/drive(\.readonly)?(\s|$)/.test(scope),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        isConnected: false,
        error: error.message || 'Failed to check connection status',
      },
      { status: 500 }
    );
  }
}
