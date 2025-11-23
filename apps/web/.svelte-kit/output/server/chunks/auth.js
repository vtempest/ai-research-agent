import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, oneTap } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { error } from "@sveltejs/kit";
import { u as user, s as schema } from "./schema.js";
import { P as PUBLIC_DOMAIN } from "./customize-site.js";
const SESSION_DURATION_IN_DAYS = 60;
let auth;
const createAuth = (env) => {
  auth = betterAuth({
    database: drizzleAdapter(drizzle(env.DB, { schema }), {
      provider: "sqlite"
      // generateId: () => crypto.randomUUID(),
    }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: PUBLIC_DOMAIN,
    session: {
      expiresIn: SESSION_DURATION_IN_DAYS * 24 * 60 * 60,
      // Convert to seconds
      updateAge: 24 * 60 * 60
      // Update session every 24 hours
    },
    socialProviders: {
      google: {
        clientId: env.AUTH_GOOGLE_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET
      },
      discord: {
        clientId: env.AUTH_DISCORD_ID,
        clientSecret: env.AUTH_DISCORD_SECRET
      },
      github: {
        clientId: env.AUTH_GITHUB_ID,
        clientSecret: env.AUTH_GITHUB_SECRET
      },
      microsoft: {
        clientId: env.AUTH_MICROSOFT_ENTRA_ID_ID,
        clientSecret: env.AUTH_MICROSOFT_ENTRA_ID_SECRET
      },
      facebook: {
        clientId: env.AUTH_FACEBOOK_ID,
        clientSecret: env.AUTH_FACEBOOK_SECRET
      }
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false
    },
    emailVerification: {
      sendOnSignUp: false,
      autoSignInAfterVerification: true
    },
    plugins: [
      openAPI(),
      oneTap()
    ],
    advanced: {
      crossSubDomainCookies: {
        enabled: true
      }
    }
  });
  return auth;
};
const initDatabase = async ({ event, resolve }) => {
  event.locals.db = drizzle(event.platform?.env.DB, { schema });
  return resolve(event);
};
async function initializeUser(locals, request) {
  const session = await auth.api.getSession({
    headers: request?.headers
  });
  if (!session?.user?.email) {
    return null;
  }
  const authUser = await locals.db.query.user.findFirst({
    where: eq(user.email, session.user.email)
  });
  if (!authUser) {
    throw error(401, "Unauthorized");
  }
  return authUser;
}
export {
  initDatabase as a,
  createAuth as c,
  initializeUser as i
};
