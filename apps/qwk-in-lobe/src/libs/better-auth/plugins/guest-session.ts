import { APIError, createAuthEndpoint, getSessionFromCtx } from 'better-auth/api';
import { setSessionCookie } from 'better-auth/cookies';
import { type BetterAuthPlugin } from 'better-auth/types';

import { GUEST_EMAIL_DOMAIN } from '../guestEmail';

const randomGuestId = () => crypto.randomUUID().replaceAll('-', '');

/** Better Auth's `GenericEndpointContext`, which it does not re-export. */
type GuestEndpointContext = Parameters<typeof getSessionFromCtx>[0];

const startGuest = async (ctx: GuestEndpointContext) => {
  const existing = await getSessionFromCtx(ctx, { disableRefresh: true });
  if (existing?.user) return ctx.json({ created: false, userId: existing.user.id });

  const now = new Date();
  const user = await ctx.context.internalAdapter.createUser({
    createdAt: now,
    email: `guest-${randomGuestId()}@${GUEST_EMAIL_DOMAIN}`,
    emailVerified: false,
    name: 'Guest',
    updatedAt: now,
  });
  if (!user) throw new APIError('INTERNAL_SERVER_ERROR', { message: 'GUEST_USER_FAILED' });

  const session = await ctx.context.internalAdapter.createSession(user.id);
  if (!session) {
    throw new APIError('INTERNAL_SERVER_ERROR', { message: 'GUEST_SESSION_FAILED' });
  }

  await setSessionCookie(ctx, { session, user });
  return ctx.json({ created: true, userId: user.id });
};

export interface GuestSessionOptions {
  /**
   * Expose `POST /sign-in/demo` over HTTP so the "Continue with demo account"
   * button on the sign-in / sign-up pages can start a guest session.
   */
  demoSignIn?: boolean;
}

/**
 * Lets a visitor use the app without signing in: the first visit gets its own
 * user row and session, exactly as if they had signed up, so every
 * session-scoped tRPC/API route keeps working unchanged.
 *
 * Modelled on Better Auth's `anonymous` plugin, minus its `isAnonymous` user
 * column — this needs no schema migration. `signInGuest` is `SERVER_ONLY`: it is
 * not routed over HTTP and is only reachable through `auth.api.signInGuest`
 * from the page gate (see `startGuestSession`). `signInDemo` is the same thing
 * over HTTP for the demo-account button, and 404s unless `demoSignIn` is set.
 */
export const guestSession = ({
  demoSignIn = false,
}: GuestSessionOptions = {}): BetterAuthPlugin => ({
  endpoints: {
    signInDemo: createAuthEndpoint('/sign-in/demo', { method: 'POST' }, async (ctx) => {
      if (!demoSignIn) throw new APIError('NOT_FOUND', { message: 'DEMO_ACCOUNT_DISABLED' });
      return startGuest(ctx);
    }),
    signInGuest: createAuthEndpoint(
      '/sign-in/guest',
      { metadata: { SERVER_ONLY: true }, method: 'POST' },
      async (ctx) => startGuest(ctx),
    ),
  },
  id: 'guest-session',
});
