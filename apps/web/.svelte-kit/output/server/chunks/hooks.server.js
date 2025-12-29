import { sequence } from "@sveltejs/kit/hooks";
import "@sveltejs/kit";
import "./schema.js";
import "stripe";
import { c as createAuth, a as initDatabase } from "./auth.js";
import "resend";
import "./customize-site.js";
import "./validations.js";
import { svelteKitHandler } from "better-auth/svelte-kit";
var authInstance;
async function handleAuth({ event, resolve }) {
  if (!authInstance)
    authInstance = createAuth(event.platform?.env);
  return svelteKitHandler({ event, resolve, auth: authInstance });
}
const authHandler = async ({ event, resolve }) => {
  const env = event.platform?.env;
  const auth = createAuth(env);
  authInstance = auth;
  return svelteKitHandler({ event, resolve, auth });
};
const allowCORSAccessAPI = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/api/") || event.url.pathname.startsWith("/.well")) {
    event.request.headers.get("X-API-Key");
    event.locals.user;
    let isAuthorized = false;
    const origin = event.request.headers.get("Origin");
    origin && event.url.origin === origin;
    {
      isAuthorized = true;
    }
    if (!isAuthorized) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (event.request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, X-API-Key, Authorization"
        }
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
const handle = sequence(
  initDatabase,
  authHandler,
  allowCORSAccessAPI
);
export {
  allowCORSAccessAPI,
  handle,
  handleAuth
};
