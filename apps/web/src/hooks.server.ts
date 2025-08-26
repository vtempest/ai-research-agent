import { sequence } from "@sveltejs/kit/hooks";
import {
  error,
  redirect,
  type Handle,
} from "@sveltejs/kit";

import {
  validateApiKey,
  initDatabase,
  initAuthRouteHandler,
  checkAuthorization,
  API_ACCESS_ALLOW_GUEST,
} from "$lib/server";
import { createAuth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";

// Create auth instance once at module level if possible
// If you need environment-specific auth, this might need adjustment
var authInstance;

// handle better Auth
// Create auth instance with the current request's environment
export async function handleAuth({ event, resolve }) {
    if (!authInstance)
      authInstance = createAuth(event.platform?.env);

    return svelteKitHandler({ event, resolve, auth: authInstance });

}

const authHandler = async ({ event, resolve }) => {
  const env = event.platform?.env;
    
  // Create auth instance with the current request's environment
  const auth = createAuth(env);
  authInstance = auth
	return svelteKitHandler({ event, resolve, auth });
};

/**
 * Enable API access for users with valid API keys and allow CORS.
 *
 * @param {Handle} event: RequestEvent, resolve: Function
 * @returns {Promise<Response>} - The resolved response
 */
export const allowCORSAccessAPI: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/api/")
  || event.url.pathname.startsWith("/.well") ) {
    const apiKey = event.request.headers.get("X-API-Key");

    const user = event.locals.user;

    let isAuthorized = false;

    const origin = event.request.headers.get("Origin");
    const isSameOrigin = origin && event.url.origin === origin;
    if (API_ACCESS_ALLOW_GUEST || isSameOrigin || user) {
      isAuthorized = true;
    } else if (apiKey) {
      isAuthorized = await validateApiKey(event.locals.db, apiKey);
    }

    if (!isAuthorized) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (event.request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Content-Type, X-API-Key, Authorization",
        },
      });
    }

    const response = await resolve(event);

    response.headers.append("Access-Control-Allow-Origin", "*");
    response.headers.append(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    response.headers.append(
      "Access-Control-Allow-Headers",
      "Content-Type, X-API-Key, Authorization"
    );

    return response;
  }

  return resolve(event);
};

export const handle = sequence(
  initDatabase,
  authHandler,
  allowCORSAccessAPI
);