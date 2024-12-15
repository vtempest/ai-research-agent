import { drizzle } from "drizzle-orm/d1";
import { sequence } from "@sveltejs/kit/hooks";
import { error, type Handle } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";

import * as schema from "$lib/db/schema";
import { initializeLucia } from "$lib/middleware/auth";
import { destroySession, setNewSession } from "$lib/middleware/sessions";
import { logger } from "$lib/middleware/logger";
import { validateApiKey } from '$lib/db/users';
import { ORIGIN, API_ACCESS_ALLOW_ALL } from "$lib/middleware/config";

export const database = async ({ event, resolve }) => {
  event.locals.db = drizzle(event.platform?.env.DB, { schema });

  return resolve(event);
};

/**
 * Authenticate the user by validating the session
 * using the sessionId from the browser's cookies
 * @param param0
 * @returns
 */
export const authentication: Handle = async ({ event, resolve }) => {
  event.locals.lucia = initializeLucia(event.platform?.env.DB);

  const lucia = event.locals.lucia;

  // retrieve the sessionId from the browser's cookies
  const sessionId = event.cookies.get(lucia.sessionCookieName);

  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;

    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);

  // if the session is newly created (due to session expiration extension), generate a new session cookie
  if (session?.fresh) {
    setNewSession(lucia, session.id, event.cookies);
  }

  // if the session is invalid, generate a blank session cookie to remove the existing session cookie from the browser
  if (!session) {
    destroySession(lucia, event.cookies);
  }

  event.locals.user = user;
  event.locals.session = session;

  // logger.debug(user, "User");
  // logger.debug(session, "Session");

  return resolve(event);
};

/**
 * Ensure that user is authenticated and authorized to access the route
 *
 * @param param0
 * @returns
 */
export const authorization: Handle = async ({ event, resolve }) => {
  const {
    locals,
    route: { id },
  } = event;

  const flashMessage = { status: "success", text: "" };

  //   logger.debug(`ROUTE: ${id}`);

  const isAuthenticated = !!locals.user;
  const isVerified = !!locals.user?.isVerified;
  const isAdmin = !!locals.user?.isAdmin;
  const isAdminRoute = !!id?.startsWith("/(app)/admin");
  const isUserRoute = !!id?.startsWith("/(app)/app");
  const isProtectedRoute = isUserRoute || isAdminRoute;

  // if user is trying to access a protected route and it's not verified
  if (isProtectedRoute && isAuthenticated && !isVerified) {
    logger.debug(
      `Redirect to ${("/auth/verify-email")} route because user is not verified`
    );

    flashMessage.text = "Please verify your email first";

    redirect(("/auth/verify-email"), flashMessage, event.cookies);
  }

  // if user is trying to access admin protected route and it's not an admin
  if (isAdminRoute && isAuthenticated && !isAdmin) {
    logger.debug(
      `Throwing 404 because someone is trying to access admin section and it is not admin`
    );

    // TODO should I change this?
    error(404);
  }

  // if user is trying to access an user protected route and it's not authenticated
  if (isUserRoute && !isAuthenticated) {
    const redirectTo = event.url.pathname;

    flashMessage.text = "Please login first";

    logger.debug(
      `Redirect to /auth/login route because user is not authenticated`
    );

    redirect("/auth/login", flashMessage, event.cookies);
  }

  return resolve(event);
};



/**
 * Ensure that user is authenticated and authorized to access the route
 *
 * @param param0
 * @returns
 */
export const apiAccess: Handle = async ({ event, resolve }) => {
  

  if (event.url.pathname.startsWith('/api/')) {
    const apiKey = event.request.headers.get('X-API-Key');
    const user = event.locals.user;

    let isAuthorized = false;

    const isSameOrigin = event.url.origin === ORIGIN;

    if (API_ACCESS_ALLOW_ALL || isSameOrigin || user) {
      isAuthorized = true;
    } else if (apiKey) {
      isAuthorized = await validateApiKey(event.locals.db, apiKey);
    }

    if (!isAuthorized) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (event.request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, X-API-Key, Authorization',
        }
      });
    }

    const response = await resolve(event);
    
    response.headers.append('Access-Control-Allow-Origin', '*');
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.headers.append('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, Authorization');
    
    return response;
  }


  
  return resolve(event);
};



export const handleError = ({ status, message, error }) => {
  if (status !== 404) {
    logger.error(error);
  }

  // do not return sensitive data here as it will be sent to the client
  return {  message };
};

export const handle = sequence(database, authentication, authorization, apiAccess);
