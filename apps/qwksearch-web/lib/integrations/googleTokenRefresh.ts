import { OAuth2Client } from "google-auth-library";
import { getEnv } from "../env";

export interface TokenRefreshResult {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

/**
 * Refresh Google OAuth access token using refresh token
 */
export async function refreshGoogleAccessToken(
  refreshToken: string,
): Promise<TokenRefreshResult> {
  try {
    const oauth2Client = new OAuth2Client(
      getEnv("GOOGLE_CLIENT_ID")!,
      getEnv("GOOGLE_CLIENT_SECRET")!,
      getEnv("GOOGLE_REDIRECT_URI") ||
        "https://qwksearch.com/api/doc/google-docs/callback",
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    // Get new access token
    const { credentials } = await oauth2Client.refreshAccessToken();

    if (!credentials.access_token) {
      throw new Error("Failed to refresh access token");
    }

    return {
      accessToken: credentials.access_token,
      refreshToken: credentials.refresh_token || refreshToken,
      expiresAt: credentials.expiry_date || Date.now() + 3600 * 1000,
    };
  } catch (error: any) {
    console.error("Token refresh error:", error);
    throw new Error(`Failed to refresh token: ${error.message}`);
  }
}

/**
 * Check if access token is expired or about to expire (within 5 minutes)
 */
export function isTokenExpired(expiresAt?: number): boolean {
  if (!expiresAt) return true;

  const now = Date.now();
  const bufferTime = 5 * 60 * 1000; // 5 minutes buffer

  return now >= expiresAt - bufferTime;
}

/**
 * Get valid access token, refreshing if necessary
 */
export async function getValidAccessToken(
  currentAccessToken: string,
  refreshToken: string,
  expiresAt?: number,
): Promise<{ accessToken: string; wasRefreshed: boolean }> {
  // If token is still valid, return it
  if (!isTokenExpired(expiresAt)) {
    return {
      accessToken: currentAccessToken,
      wasRefreshed: false,
    };
  }

  // Token expired, refresh it
  try {
    const refreshed = await refreshGoogleAccessToken(refreshToken);
    return {
      accessToken: refreshed.accessToken,
      wasRefreshed: true,
    };
  } catch (error) {
    throw new Error(
      "Token expired and refresh failed. Please reconnect Google Drive.",
    );
  }
}
