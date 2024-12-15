import { redirect } from "@sveltejs/kit";
import { generateCodeVerifier, generateState } from "arctic";

import { COOKIE_NAME } from "$lib/middleware/config";
import { googleOauth } from "$lib/middleware/auth";
import { dev } from "$app/environment";


export const GET = async ({ cookies }) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url =  googleOauth.createAuthorizationURL(state, codeVerifier,  ["openid","profile", "email"] );

  cookies.set(COOKIE_NAME + "_google_oauth_state", state, {
    path: "/",
    secure: !dev,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });

  cookies.set(COOKIE_NAME + "_google_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: !dev,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });

  redirect(302, url);
};
