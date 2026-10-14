/**
 * Visitors are never sent to a sign-in page: a protected page request without
 * a session gets a guest session instead (see `plugins/guest-session.ts`).
 */

const BOT_UA_REGEX =
  /bot\b|crawl|spider|slurp|facebookexternalhit|embedly|preview|headless|lighthouse|curl\/|wget\/|python-requests|httpclient|go-http-client/i;

/**
 * Crawlers and link unfurlers get the page without a session, so they do not
 * create a user row on every hit.
 */
export const isLikelyBot = (userAgent: string | null | undefined) =>
  !userAgent || BOT_UA_REGEX.test(userAgent);

/**
 * Create a guest user + session for this request and return the `Set-Cookie`
 * values to attach to the page response. Returns `null` when the request
 * already has a session, comes from a bot, or the guest could not be created
 * (e.g. a database error, or `AUTH_ALLOWED_EMAILS` with the demo account off).
 */
export const startGuestSession = async (headers: Headers): Promise<string[] | null> => {
  if (isLikelyBot(headers.get('user-agent'))) return null;

  const { auth } = await import('@/auth');

  try {
    const result = await (auth.api as unknown as GuestApi).signInGuest({
      headers,
      returnHeaders: true,
    });
    if (!result.response?.created) return null;

    const cookies = result.headers.getSetCookie();
    return cookies.length > 0 ? cookies : null;
  } catch (error) {
    console.error('[guest-session] failed to start a guest session:', error);
    return null;
  }
};

interface GuestApi {
  signInGuest: (input: {
    headers: Headers;
    returnHeaders: true;
  }) => Promise<{ headers: Headers; response: { created: boolean; userId: string } | null }>;
}
