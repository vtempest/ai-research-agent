import { APIError, createAuthEndpoint, getSessionFromCtx } from 'better-auth/api';
import { setSessionCookie } from 'better-auth/cookies';
import { type BetterAuthPlugin } from 'better-auth/types';

/**
 * Reserved TLD (RFC 2606), so a guest address can never reach a real mailbox.
 */
export const GUEST_EMAIL_DOMAIN = 'guest.invalid';

export const isGuestEmail = (email?: string | null) =>
  !!email && email.endsWith(`@${GUEST_EMAIL_DOMAIN}`);

const randomGuestId = () => crypto.randomUUID().replaceAll('-', '');

/**
 * Lets a visitor use the app without signing in: the first visit gets its own
 * user row and session, exactly as if they had signed up, so every
 * session-scoped tRPC/API route keeps working unchanged.
 *
 * Modelled on Better Auth's `anonymous` plugin, minus its `isAnonymous` user
 * column — this needs no schema migration. The endpoint is `SERVER_ONLY`: it is
 * not routed over HTTP and is only reachable through `auth.api.signInGuest`
 * from the page gate (see `startGuestSession`).
 */
export const guestSession = (): BetterAuthPlugin => ({
  endpoints: {
    signInGuest: createAuthEndpoint(
      '/sign-in/guest',
      { metadata: { SERVER_ONLY: true }, method: 'POST' },
      async (ctx) => {
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
      },
    ),
  },
  id: 'guest-session',
});
