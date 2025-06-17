import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oneTap, openAPI } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { redirect, error } from "@sveltejs/kit";
import * as schema from "./schema";
import { user } from "./schema";
// import { sendWelcomeEmail } from "./email";
import * as custom from "$lib/customize-site"

// Updated route handler that creates auth instance per request
export const initAuthRouteHandler = async ({ event, resolve }: { event: any, resolve: Function }) => {
  const env = event.platform?.env;
  
  // Create auth instance with the current request's environment
  const auth = createAuth(env);
  
  // For non-auth routes, you might want to attach auth to the event
  // so it can be used in your app
  event.locals = event.locals || {};
  event.locals.auth = auth;
  
  return resolve(event);
};

/**
 * Initialize Better Auth instance
 * @param {any} env - Environment variables
 * @param {object} [options] - Additional options
 * @param {number} [options.SESSION_DURATION_IN_DAYS=60] - Session duration in days
 * @param {boolean} [options.SHOULD_SEND_WELCOME_EMAIL=false] - Send welcome email to new users
 * @param {boolean} [options.ALLOW_ACCOUNT_LINKING=true] - Allow merging accounts by email
 * @returns {ReturnType<typeof betterAuth>} - Better Auth instance
 */

const SESSION_DURATION_IN_DAYS = 60 , SHOULD_SEND_WELCOME_EMAIL = 0;

export let auth 
// Factory function to create auth instance with platform env
export const createAuth = (env: any) => {
  auth = betterAuth({
    database: drizzleAdapter(drizzle(env.DB, { schema }), {
      provider: "sqlite",
      // generateId: () => crypto.randomUUID(),
    }),
    
    secret: env.BETTER_AUTH_SECRET,
    baseURL: custom.PUBLIC_DOMAIN,
    
    session: {
      expiresIn: SESSION_DURATION_IN_DAYS * 24 * 60 * 60, // Convert to seconds
      updateAge: 24 * 60 * 60, // Update session every 24 hours
    },

    socialProviders: {
      google: {
        clientId: env.AUTH_GOOGLE_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
      },
      discord: {
        clientId: env.AUTH_DISCORD_ID,
        clientSecret: env.AUTH_DISCORD_SECRET,
      },
      github: {
        clientId: env.AUTH_GITHUB_ID,
        clientSecret: env.AUTH_GITHUB_SECRET,
      },
      microsoft: {
        clientId: env.AUTH_MICROSOFT_ENTRA_ID_ID,
        clientSecret: env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      },
      facebook: {
        clientId: env.AUTH_FACEBOOK_ID,
        clientSecret: env.AUTH_FACEBOOK_SECRET,
      },
    },

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },

    emailVerification: {
      sendOnSignUp: false,
      autoSignInAfterVerification: true,
    },

    plugins: [
      openAPI(), 
      oneTap()
    ],


    advanced: {
      crossSubDomainCookies: {
        enabled: true,
      },
    }
  });

  return auth;
}


/**
 * Add drizzle DB to locals.db
 */
export const initDatabase = async ({ event, resolve }: { event: any, resolve: Function }) => {
  event.locals.db = drizzle(event.platform?.env.DB, { schema });
  return resolve(event);
};


export const permissions = {
  "/admin": ["admin"],
  "/settings": ["user", "admin"]
};


/**
 * SvelteKit hook for checking user authorization and handling route protection
 */
export const checkAuthorization = async ({ event, resolve }: { event: any, resolve: Function }) => {
  const user = await initializeUser(event.locals, event.request);
  
  for (const route in permissions) {
    if (event.route.id?.startsWith(route) && 
        permissions[route]?.length && 
        !permissions[route]?.includes(user?.isAdmin ? "admin" : user ? "user" : null)) {
      throw redirect(307, "/signin");
    }
  }

  return resolve(event);
};




/**
 * Get user object from locals of the request
 */
export async function initializeUser(locals: any, request: any): Promise<User | null> {


  const session = await auth.api.getSession({
    headers: request?.headers
  });
  
  if (!session?.user?.email) {
    return null;
  }

  const authUser = await locals.db.query.user.findFirst({
    where: eq(user.email, session.user.email),
  });
  
  if (!authUser) {
    throw error(401, "Unauthorized");
  }

  return authUser;
}


