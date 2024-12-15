import { and, eq } from "drizzle-orm";
import { OAuth2RequestError, decodeIdToken } from "arctic";
import { generateId } from "lucia";
import { error } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";

import { logger } from "$lib/middleware/logger";
import { googleOauth } from "$lib/middleware/auth";
import { users } from "$lib/db/schema";
import { getUserByEmail } from "$lib/db/users";
import { oauthAccounts } from "$lib/db/schema";
import { createAndSetSession } from "$lib/middleware/sessions";
import { COOKIE_NAME } from "$lib/middleware/config";

export const GET = async ({ cookies, url, locals: { db, lucia } }) => {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const stateCookie = cookies.get(COOKIE_NAME + "_google_oauth_state");
  const codeVerifierCookie = cookies.get(COOKIE_NAME + "_google_oauth_code_verifier");

  // validate OAuth state and code verifier
  if (!code || !state || !stateCookie || !codeVerifierCookie || state !== stateCookie) {
    error(400, "Invalid OAuth state or code verifier");
  }

  try {
    const tokens = await googleOauth.validateAuthorizationCode(code, codeVerifierCookie);

    // @ts-ignore
    const { email, name, picture, sub } = decodeIdToken(tokens.idToken());
    
    
    if (!email) 
      error(400, "No primary email address");

    // check if the user already exists
    const existingUser = await getUserByEmail(db, email);


    

    if (existingUser) {
      // check if the user already has a Google OAuth account linked
      var providerId = "google"
      var providerUserId = sub;

    // @ts-ignore
      const existingOauthAccount =  await db.query.oauthAccounts.findFirst({
        where: and(
    // @ts-ignore
          eq(oauthAccounts.providerId, providerId),
          eq(oauthAccounts.providerUserId, providerUserId)
        ),
      });
      if (!existingOauthAccount) {
        // add the 'google' auth provider to the user's authMethods list
        const authMethods = existingUser.authMethods || [];
        authMethods.push("google");

        await db.batch([
          // link the Google OAuth account to the existing user
          db
            .insert(oauthAccounts)
            .values({
              userId: existingUser.id,
              providerId: "google",
              providerUserId: sub
            })
            .onConflictDoNothing()
            .returning(),

          // update the user's authMethods list
          db
            .update(users)
            .set({
              name:   name,
              avatarUrl: picture,
              authMethods
            })
            .where(eq(users.id, existingUser.id))
            .returning()
        ]);
      }

      await createAndSetSession(lucia, existingUser.id, cookies);
    } else {
      const userId = generateId(15);

      // if user doesn't exist in db
      await db.batch([
        // create a new user
        db
          .insert(users)
          .values({
            id: userId,
            name: name,
            username: email.split("@")[0] + generateId(5),
            avatarUrl: picture,
            email: email,
            isVerified: true,
            authMethods: ["google"]
          })
          .onConflictDoNothing()
          .returning(),

        // create a new Google OAuth account
        db
          .insert(oauthAccounts)
          .values({
            userId,
            providerId: "google",
            providerUserId: sub
          })
          .onConflictDoNothing()
          .returning()
      ]);

      await createAndSetSession(lucia, userId, cookies);
    }
  } catch (e) {
    logger.error(e);

    if (e instanceof OAuth2RequestError) {
      error(400);
    }

    error(500);
  }

  redirect(303, ("/"));
};
