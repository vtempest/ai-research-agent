// @vitest-environment node
import { memoryAdapter } from 'better-auth/adapters/memory';
import { betterAuth } from 'better-auth/minimal';
import { describe, expect, it } from 'vitest';

import { GUEST_EMAIL_DOMAIN, isGuestEmail } from '../guestEmail';
import { guestSession } from './guest-session';

const createAuth = (options?: Parameters<typeof guestSession>[0]) => {
  const db = { account: [], session: [], user: [], verification: [] } as Record<string, any[]>;
  const auth = betterAuth({
    baseURL: 'https://lobe.example.com',
    database: memoryAdapter(db),
    plugins: [guestSession(options)],
    secret: 'test-secret-test-secret-test-secret-123',
  });
  return { auth, db };
};

type GuestApi = {
  signInGuest: (input: {
    headers: Headers;
    returnHeaders: true;
  }) => Promise<{ headers: Headers; response: { created: boolean; userId: string } }>;
};

const signInGuest = (auth: ReturnType<typeof createAuth>['auth'], headers = new Headers()) =>
  (auth.api as unknown as GuestApi).signInGuest({ headers, returnHeaders: true });

describe('guestSession', () => {
  it('creates a guest user and sets a session cookie when there is no session', async () => {
    const { auth, db } = createAuth();

    const { headers, response } = await signInGuest(auth);

    expect(response.created).toBe(true);
    expect(db.user).toHaveLength(1);
    expect(isGuestEmail(db.user[0].email)).toBe(true);
    expect(db.session).toHaveLength(1);

    const cookies = headers.getSetCookie();
    expect(cookies.some((cookie) => cookie.includes('session_token='))).toBe(true);

    const session = await auth.api.getSession({
      headers: new Headers({ cookie: cookies.map((c) => c.split(';')[0]).join('; ') }),
    });
    expect(session?.user.id).toBe(response.userId);
  });

  it('reuses an existing session instead of creating another guest', async () => {
    const { auth, db } = createAuth();
    const first = await signInGuest(auth);
    const cookie = first.headers
      .getSetCookie()
      .map((c) => c.split(';')[0])
      .join('; ');

    const second = await signInGuest(auth, new Headers({ cookie }));

    expect(second.response).toEqual({ created: false, userId: first.response.userId });
    expect(db.user).toHaveLength(1);
  });

  it('is not reachable over HTTP', async () => {
    const { auth, db } = createAuth();

    const res = await auth.handler(
      new Request('https://lobe.example.com/api/auth/sign-in/guest', { method: 'POST' }),
    );

    expect(res.status).toBe(404);
    expect(db.user).toHaveLength(0);
  });
});

describe('guestSession demo sign-in', () => {
  const postDemo = (auth: ReturnType<typeof createAuth>['auth'], cookie?: string) =>
    auth.handler(
      new Request('https://lobe.example.com/api/auth/sign-in/demo', {
        headers: {
          origin: 'https://lobe.example.com',
          ...(cookie ? { cookie } : {}),
        },
        method: 'POST',
      }),
    );

  it('starts a guest session over HTTP when enabled', async () => {
    const { auth, db } = createAuth({ demoSignIn: true });

    const res = await postDemo(auth);

    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ created: true });
    expect(db.user).toHaveLength(1);
    expect(isGuestEmail(db.user[0].email)).toBe(true);
    expect(res.headers.getSetCookie().some((c) => c.includes('session_token='))).toBe(true);
  });

  it('keeps an existing session', async () => {
    const { auth, db } = createAuth({ demoSignIn: true });
    const first = await postDemo(auth);
    const cookie = first.headers
      .getSetCookie()
      .map((c) => c.split(';')[0])
      .join('; ');

    const second = await postDemo(auth, cookie);

    expect(await second.json()).toMatchObject({ created: false });
    expect(db.user).toHaveLength(1);
  });

  it('404s when disabled', async () => {
    const { auth, db } = createAuth();

    const res = await postDemo(auth);

    expect(res.status).toBe(404);
    expect(db.user).toHaveLength(0);
  });
});

describe('isGuestEmail', () => {
  it('only matches the reserved guest domain', () => {
    expect(isGuestEmail(`guest-abc@${GUEST_EMAIL_DOMAIN}`)).toBe(true);
    expect(isGuestEmail('someone@example.com')).toBe(false);
    expect(isGuestEmail(undefined)).toBe(false);
  });
});
