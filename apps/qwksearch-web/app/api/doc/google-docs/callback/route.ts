/**
 * @fileoverview Google OAuth callback handler. GET exchanges the authorization
 * code for tokens, stores them in secure HTTP-only cookies, and renders an
 * HTML page that notifies the opener window of success/failure.
 */
import { NextRequest, NextResponse } from "next/server";
import { GoogleDocsService } from "@/lib/integrations/googleDocsService";
import { cookies } from "next/headers";
import { getEnv } from "@/lib/config/env";
import { googleRedirectUri } from "@/lib/integrations/googleDrive";

/** Embeds a value in an inline <script> as a JS string literal that cannot close the tag. */
const scriptString = (value: string) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

// GET /api/doc/google-docs/callback - OAuth callback handler
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head><title>Authorization Failed</title></head>
          <body>
            <h1>Authorization Failed</h1>
            <p>Authorization code not provided</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'google-drive-error', error: 'No authorization code' }, '*');
              }
            </script>
          </body>
        </html>
        `,
        {
          status: 400,
          headers: { "Content-Type": "text/html" },
        },
      );
    }

    const clientId = getEnv("GOOGLE_CLIENT_ID")!;
    const clientSecret = getEnv("GOOGLE_CLIENT_SECRET")!;
    const redirectUri = googleRedirectUri(request.url);

    const tokens = await GoogleDocsService.getTokensFromCode(
      { clientId, clientSecret, redirectUri },
      code,
    );

    // Store tokens in secure HTTP-only cookies
    const cookieStore = await cookies();
    cookieStore.set("google_access_token", tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // The granted scopes, so the status route can tell a per-file grant from
    // one that also covers folder sync. Not a secret: no token is in it.
    if (tokens.scope) {
      cookieStore.set("google_drive_scope", tokens.scope, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    if (tokens.refreshToken) {
      cookieStore.set("google_refresh_token", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    // Return HTML that closes the popup and notifies parent window
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head><title>Authorization Successful</title></head>
        <body>
          <h1>Authorization Successful!</h1>
          <p>You can close this window.</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'google-drive-connected' }, '*');
              setTimeout(() => window.close(), 1000);
            }
          </script>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  } catch (error: any) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head><title>Authorization Failed</title></head>
        <body>
          <h1>Authorization Failed</h1>
          <p>Failed to exchange the authorization code. Please try again.</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'google-drive-error', error: ${scriptString(error?.message || "Failed to exchange authorization code")} }, '*');
            }
          </script>
        </body>
      </html>
      `,
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      },
    );
  }
}
