import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oneTap } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { redirect, error } from "@sveltejs/kit";
import { APP_EMAIL } from "$lib/customize-site";
import * as schema from "$lib/server/schema";
import { users } from "$lib/server/schema";
import { sendWelcomeEmail } from "$lib/server";

/**
 * Initialize Better Auth instance
 * @param {any} env - Environment variables
 * @param {object} [options] - Additional options
 * @param {number} [options.SESSION_DURATION_IN_DAYS=60] - Session duration in days
 * @param {boolean} [options.SHOULD_SEND_WELCOME_EMAIL=false] - Send welcome email to new users
 * @param {boolean} [options.ALLOW_ACCOUNT_LINKING=true] - Allow merging accounts by email
 * @returns {ReturnType<typeof betterAuth>} - Better Auth instance
 */
export function initAuth(env: any, options: {
  SESSION_DURATION_IN_DAYS?: number;
  SHOULD_SEND_WELCOME_EMAIL?: boolean;
  ALLOW_ACCOUNT_LINKING?: boolean;
} = {}) {
  const {
    SESSION_DURATION_IN_DAYS = 60,
    SHOULD_SEND_WELCOME_EMAIL = false,
    ALLOW_ACCOUNT_LINKING = true
  } = options;

  return betterAuth({
    database: drizzleAdapter(drizzle(env.DB, { schema }), {
      provider: "sqlite"
    }),
    
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL || "http://localhost:5173",
    
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
      oneTap()
    ],

    hooks: {
      after: [
        {
          matcher(context) {
            return context.path === "/sign-up";
          },
          handler: async (ctx) => {
            if (ctx.returned?.user && SHOULD_SEND_WELCOME_EMAIL) {
              const { email, name } = ctx.returned.user;
              await sendWelcomeEmail(email, name, env.AUTH_RESEND_KEY);
            }
          }
        }
      ]
    },

    advanced: {
      crossSubDomainCookies: {
        enabled: true,
      },
      generateId: () => crypto.randomUUID(),
    }
  });
}

/**
 * Add drizzle DB to locals.db
 */
export const initDatabase = async ({ event, resolve }: { event: any, resolve: Function }) => {
  event.locals.db = drizzle(event.platform?.env.DB, { schema });
  return resolve(event);
};

/**
 * Initialize Better Auth route handler
 */
export const initAuthRouteHandler = async ({ event, resolve }: { event: any, resolve: Function }) => {
  const env = event.platform?.env;
  const auth = initAuth(env);
  
  // Handle auth routes
  if (event.url.pathname.startsWith("/api/auth")) {
    return await auth.handler(event.request);
  }
  
  // Add auth to locals for other routes
  event.locals.auth = auth;
  event.locals.session = await auth.api.getSession({
    headers: event.request.headers
  });
  
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
  const user = await initializeUser(event.locals);
  
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
export async function initializeUser(locals: any): Promise<User | null> {
  const session = locals.session;
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await locals.db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  });
  if (!user) 
    throw error(401, "Unauthorized");

  return user;
}

/**
 * Helper functions for use in components and pages
 */
export const authHelpers = {
  /**
   * Sign in with provider
   */
  signIn: async (provider: string, redirectTo?: string) => {
    const searchParams = new URLSearchParams();
    if (redirectTo) searchParams.set("callbackUrl", redirectTo);
    
    window.location.href = `/api/auth/sign-in/${provider}?${searchParams.toString()}`;
  },

  /**
   * Sign out
   */
  signOut: async (redirectTo?: string) => {
    const response = await fetch("/api/auth/sign-out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ callbackUrl: redirectTo || "/" }),
    });
    
    if (response.ok) {
      window.location.href = redirectTo || "/";
    }
  },

  /**
   * Get current session on client side
   */
  getSession: async () => {
    const response = await fetch("/api/auth/session");
    if (response.ok) {
      return await response.json();
    }
    return null;
  },
};

/**
 * Server-side helper to get authenticated user
 */
export async function getAuthenticatedUser(request: Request, env: any): Promise<User | null> {
  const auth = initAuth(env);
  const session = await auth.api.getSession({ headers: request.headers });
  
  if (!session?.user?.email) {
    return null;
  }

  const db = drizzle(env.DB, { schema });
  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  });

  return user || null;
}