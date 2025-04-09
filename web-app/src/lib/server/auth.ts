// @ts-expect-error
import Discord from "@auth/sveltekit/providers/discord";
import Dropbox from "@auth/sveltekit/providers/dropbox";
import Facebook from "@auth/sveltekit/providers/facebook";
import GitHub from "@auth/sveltekit/providers/github";
import GitLab from "@auth/sveltekit/providers/gitlab";
import Google from "@auth/sveltekit/providers/google";
import Keycloak from "@auth/sveltekit/providers/keycloak";
import LinkedIn from "@auth/sveltekit/providers/linkedin";
import MicrosoftEntraID from "@auth/sveltekit/providers/microsoft-entra-id";
import Resend from "@auth/sveltekit/providers/resend";
import Credentials from "@auth/sveltekit/providers/credentials";
import { SvelteKitAuth } from "@auth/sveltekit";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { APP_EMAIL } from "$lib/custom-domain";
import { D1Adapter } from "@auth/d1-adapter";
import { dev } from "$app/environment";
import { decode } from "@auth/core/jwt";
import { drizzle } from "drizzle-orm/d1";
import { error, redirect } from "@sveltejs/kit";
// @ts-ignore
import * as schema from "$lib/server/schema";
import { users, accounts } from "$lib/server/schema";
import { sendWelcomeEmail } from "$lib/server";

/**
 * Initialize SvelteKitAuth session handler
 * @param {import('svelte').Adapter} env - SvelteKit environment
 * @param {object} [options] - Additional options
 * @param {number} [options.SESSION_DURATION_IN_DAYS=60] 
 * - How many days to keep user signed in on a device
 * @param {boolean} [options.USE_JWT_SESSION_COOKIE=true] 
 * - Store session in jwt cookie with no 'sessions' table
 * @param {boolean} [options.SHOULD_SEND_WELCOME_EMAIL=false] 
 * - Send welcome email to new users
 * @param {boolean} [options.ALLOW_ACCOUNT_LINKING=true]
 * - Allow merging third-party login accounts by email 
 * @returns {import('@auth/sveltekit').SvelteKitAuth} - SvelteKitAuth instance
 */
export function initAuth(env, options = {} as any) {
  const {
    SESSION_DURATION_IN_DAYS = 60,
    USE_JWT_SESSION_COOKIE = true,
    SHOULD_SEND_WELCOME_EMAIL = false,
    ALLOW_ACCOUNT_LINKING = true
  } = options;

  const db = drizzle(env.DB, { schema });
  const { handle, signIn, signOut } = SvelteKitAuth({
    debug: dev,
    trustHost: true,
    adapter: D1Adapter(env.DB),
    secret: env.AUTH_SECRET,
    events: {
      createUser: (message: { user }) => {
        let { email, name } = message?.user;
        if (SHOULD_SEND_WELCOME_EMAIL) 
          sendWelcomeEmail(email, name);
      },
    },
    callbacks: {
      signIn: async ({ user }) => {
        return true;
      },
      redirect: async ({ url, baseUrl }) => {
        return baseUrl;
      },
      session: async ({ session, newSession, token, trigger, user }) => {
        return {
          ...session,
          user: {
            ...session.user,
          },
        };
      },
      jwt({ token, user, account, profile }) {
        if (token) {
          token.accessToken = token.access_token;
          token.id = token.id;
          token.email = token.email;
          token.name = token.name;
        }
        return token;
      },
    },
    session: {
      strategy: USE_JWT_SESSION_COOKIE ? "jwt" : "database",
      maxAge: SESSION_DURATION_IN_DAYS * 24 * 60 * 60 * 1000,
    },
    providers: [
      Google({
        clientId: env.AUTH_GOOGLE_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
        allowDangerousEmailAccountLinking: ALLOW_ACCOUNT_LINKING,
      }),
      Discord({
        clientId: env.AUTH_DISCORD_ID,
        clientSecret: env.AUTH_DISCORD_SECRET,
        allowDangerousEmailAccountLinking: ALLOW_ACCOUNT_LINKING,
      }),
      LinkedIn({
        clientId: env.AUTH_LINKEDIN_ID,
        clientSecret: env.AUTH_LINKEDIN_SECRET,
        allowDangerousEmailAccountLinking: ALLOW_ACCOUNT_LINKING,
      }),
      Facebook({
        clientId: env.AUTH_FACEBOOK_ID,
        clientSecret: env.AUTH_FACEBOOK_SECRET,
        allowDangerousEmailAccountLinking: ALLOW_ACCOUNT_LINKING,
      }),
      MicrosoftEntraID({
        clientId: env.AUTH_MICROSOFT_ENTRA_ID_ID,
        clientSecret: env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
        // issuer: "https://login.microsoftonline.com/common/v2.0",
        // issuer: env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
        allowDangerousEmailAccountLinking: ALLOW_ACCOUNT_LINKING,
      }),
      GitHub({
        clientId: env.AUTH_GITHUB_ID,
        clientSecret: env.AUTH_GITHUB_SECRET,
        allowDangerousEmailAccountLinking: ALLOW_ACCOUNT_LINKING,
      }),
      Resend({
        apiKey: env.AUTH_RESEND_KEY,
        from: APP_EMAIL,
      }),
      Credentials({
        id: "googleonetap",
        name: "googleonetap",
        credentials: {
          credential: { type: "text" },
        },
        authorize: async (credentials) => {
          let {
            email,
            sub,
            given_name,
            family_name,
            picture: image,
          } = (await decode((credentials as any).credential)) as any;

          // If for some reason the email is not provided, we cannot login the user with this method
          if (!email) throw new Error("Email not available");

          const user = await db.query.users.findFirst({
            where: eq(users.email, email?.toLowerCase()),
          });

          // If user doesn't exist, create user and account
          if (!user) {
            // Create user
            const [createdUser] = await db
              .insert(users)
              .values({
                id: crypto.randomUUID(), // Generate UUID for the user
                email: email?.toLowerCase(),
                name: [given_name, family_name].join(" "),
                image: image,
              })
              .returning();

            // Create associated account
            await db.insert(accounts).values({
              // @ts-ignore
              id: crypto.randomUUID(), // Generate UUID for the account
              userId: createdUser.id,
              provider: "google",
              providerAccountId: sub,
              access_token: null,
              refresh_token: null,
              expires_at: null,
            });
            return createdUser;
            // Include the desired user properties in the session
          }
          return {
            id: user.id,
            email: user.email,
            image: user.image,
            name: [given_name, family_name].join(" "),
          };
        },
      }),
    ],
    pages: {
      signIn: "/signin",
    },
  });

  return { handle, signIn, signOut };
}

/**
 *  Add drizzle DB to locals.db
 */
export const initDatabase = async ({ event, resolve }) => {
  event.locals.db = drizzle(event.platform?.env.DB, { schema });
  return resolve(event);
};

/**
 *  Initialize auth.js session provider handler
 */
export const initAuthRouteHandler = async ({ event, resolve }) => {
  const env = event.platform?.env;
  const { handle, signIn, signOut } = initAuth(env);
  return await handle({ event, resolve });
};

export const checkAuthorization = async ({ event, resolve }) => {
  let session = await event.locals.auth();
  if (session) var user = session?.user;

  const isAdmin = !!user?.isAdmin;
  const isAuthenticated = !!user;
  const isAdminRoute = !!event.route.id?.startsWith("/admin");
  const isUserRoute = !!event.route.id?.startsWith("/settings");

  // if user is trying to access admin protected route and it's not an admin
  if (isAdminRoute && isAuthenticated && !isAdmin) {
    console.debug(
      `Throwing 404 because someone is trying to access admin section and it is not admin`
    );

    error(404);
  }

  // if user is trying to access an user protected route and it's not authenticated
  if (isUserRoute && !isAuthenticated) {
    const redirectTo = event.url.pathname;

    redirect(307, "/signin");
  }

  return resolve(event);
};