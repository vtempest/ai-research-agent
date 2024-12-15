import { Lucia, TimeSpan } from "lucia";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";
import { dev } from "$app/environment";
import { Google } from "arctic";
import { error } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";

import { SESSION_EXPIRATION_TIME } from "$lib/middleware/validations";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { ORIGIN, COOKIE_NAME } from "$lib/middleware/config";

//initialize google oauth
export const googleOauth = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  ORIGIN + "/auth/oauth/google/callback"
);

/**
 * Initialize Lucia.
 * @param {Database} db The database to use.
 * @returns {Lucia} The initialized Lucia instance.
 */
export function initializeLucia(db) {
  const adapter = new D1Adapter(db, {
    user: "users",
    session: "sessions",
  });

  return new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(SESSION_EXPIRATION_TIME, "d"),
    sessionCookie: {
      name: COOKIE_NAME + "_auth",
      attributes: {
        secure: !dev,
      },
    },
    getUserAttributes: (data) => {
      return {
        id: data.id,
        username: data.username,
        name: data.name,
        email: data.email,
        authMethods: JSON.parse(data.auth_methods),
        avatarUrl: data.avatar_url,
        isVerified: !!data.is_verified,
        isAdmin: !!data.is_admin,
        createdAt: new Date(data.created_at).toISOString(),
        modifiedAt: data.modified_at
          ? new Date(data.modified_at).toISOString()
          : null,
      };
    },
  });
}

/**
 * Checks if the user is anonymous.
 * Redirects home if they are not.
 *
 * @param {Object} locals - The locals object of RequestEvent.
 * @returns void
 */
export function isAnonymous(locals) {
  if (locals.user && locals.session) redirect(303, ("/"));
}

/**
 * Checks if the user is authenticated.
 * Redirects them to the login page if they are not.
 *
 * @param {Object} url - The URL object.
 * @param {Object} locals - The locals object of RequestEvent.
 * @param {Object} cookies - The cookies object of RequestEvent.
 * @returns void
 */
export function isUserAuthenticated(locals, cookies, url) {
  if (!locals.user && !locals.session) {
    const redirectTo = url.pathname;
    const flashMessage = { status: "success", text: "Please login first" };

    redirect(("/auth/login"), flashMessage, cookies);
  }
}

/**
 * Checks if the user is authenticated and is not verified.
 * Redirects them to the dashboard if they are not.
 *
 * @param {Object} url - The URL object.
 * @param {Object} locals - The locals object of RequestEvent.
 * @param {Object} cookies - The cookies object of RequestEvent.
 * @returns void
 */
export function isUserNotVerified(locals, cookies, url) {
  isUserAuthenticated(locals, cookies, url);

  if (locals.user?.isVerified) {
    const flashMessage = { status: "success", text: "Already verified" };

    redirect(("/"), flashMessage, cookies);
  }
}

/**
 * Checks if the user is authenticated and has admin privileges.
 * Redirects them to the dashboard if they are not.
 * @param {Object} url - The URL object.
 * @param {Object} locals - The locals object of RequestEvent.
 * @param {Object} cookies - The cookies object of RequestEvent.
 * @returns void
 */
export function isUserAdmin(locals, cookies, url) {
  isUserAuthenticated(locals, cookies, url);

  if (!locals.user?.isAdmin) error(404);
}
