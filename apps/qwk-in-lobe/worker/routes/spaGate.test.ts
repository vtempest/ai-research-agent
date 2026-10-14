// @vitest-environment node
import { Hono } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  authEnv: { AUTH_DISABLE_DEMO_ACCOUNT: false },
  getSession: vi.fn(),
  startGuestSession: vi.fn(),
}));

vi.mock('@/envs/auth', () => ({ authEnv: mocks.authEnv }));

vi.mock('@/auth', () => ({ auth: { api: { getSession: mocks.getSession } } }));
vi.mock('@/envs/app', () => ({ appEnv: { APP_URL: 'https://qwksearch.com' } }));
vi.mock('@/libs/better-auth/guest', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  startGuestSession: mocks.startGuestSession,
}));

const { resolveDemoBypass, resolvePageSession } = await import('./spa');

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';

const gate = async (
  url: string,
  headers: Record<string, string> = { 'user-agent': BROWSER_UA },
) => {
  const app = new Hono();
  app.get('*', async (c) => {
    const { redirect, setCookies } = await resolvePageSession(c);
    if (redirect) return redirect;
    return c.json({ setCookies: setCookies ?? null });
  });
  return app.request(url, { headers });
};

describe('resolvePageSession', () => {
  beforeEach(() => {
    mocks.getSession.mockReset().mockResolvedValue(null);
    mocks.startGuestSession
      .mockReset()
      .mockResolvedValue(['better-auth.session_token=abc; Path=/']);
  });

  it('starts a guest session instead of redirecting to sign in', async () => {
    const res = await gate('https://lobe.example.com/');

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ setCookies: ['better-auth.session_token=abc; Path=/'] });
    expect(mocks.startGuestSession).toHaveBeenCalledOnce();
  });

  it('leaves signed-in visitors alone', async () => {
    mocks.getSession.mockResolvedValue({ user: { id: 'user-1' } });

    const res = await gate('https://lobe.example.com/agent');

    expect(await res.json()).toEqual({ setCookies: null });
    expect(mocks.startGuestSession).not.toHaveBeenCalled();
  });

  it('serves crawlers without creating a user', async () => {
    const res = await gate('https://lobe.example.com/', { 'user-agent': 'Googlebot/2.1' });

    expect(res.status).toBe(200);
    expect(mocks.startGuestSession).not.toHaveBeenCalled();
  });

  it('falls back to this deployment’s own sign-in page, never APP_URL’s', async () => {
    mocks.startGuestSession.mockResolvedValue(null);

    const res = await gate('https://lobe.example.com/agent?hl=ja-JP');

    expect(res.status).toBe(302);
    const location = new URL(res.headers.get('location')!);
    expect(location.origin).toBe('https://lobe.example.com');
    expect(location.pathname).toBe('/signin');
    expect(location.searchParams.get('callbackUrl')).toBe(
      'https://lobe.example.com/agent?hl=ja-JP',
    );
  });

  it('skips public routes entirely', async () => {
    const res = await gate('https://lobe.example.com/share/t/abc');

    expect(await res.json()).toEqual({ setCookies: null });
    expect(mocks.getSession).not.toHaveBeenCalled();
  });
});

const bypass = async (
  url: string,
  headers: Record<string, string> = { 'user-agent': BROWSER_UA },
) => {
  const app = new Hono();
  app.get('*', async (c) => (await resolveDemoBypass(c)) ?? c.text('auth page'));
  return app.request(url, { headers });
};

describe('resolveDemoBypass', () => {
  beforeEach(() => {
    mocks.authEnv.AUTH_DISABLE_DEMO_ACCOUNT = false;
    mocks.getSession.mockReset().mockResolvedValue(null);
    mocks.startGuestSession
      .mockReset()
      .mockResolvedValue(['better-auth.session_token=abc; Path=/']);
  });

  it('skips sign-up: starts a guest session and returns to the callback', async () => {
    const res = await bypass(
      'https://lobe.example.com/signup?email=a%40b.com&callbackUrl=https%3A%2F%2Flobe.example.com%2Fagent%3Fx%3D1',
    );

    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe('/agent?x=1');
    expect(res.headers.get('set-cookie')).toContain('better-auth.session_token=abc');
  });

  it('skips sign-in for a visitor who already has a session', async () => {
    mocks.getSession.mockResolvedValue({ user: { id: 'user-1' } });

    const res = await bypass('https://lobe.example.com/signin');

    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe('/');
    expect(mocks.startGuestSession).not.toHaveBeenCalled();
  });

  it('never redirects off-site or back to an auth page', async () => {
    for (const callbackUrl of ['https://evil.example/', '//evil.example/', '/signin?x=1']) {
      const res = await bypass(
        `https://lobe.example.com/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      );
      expect(res.headers.get('location')).toBe('/');
    }
  });

  it('shows the auth page when a guest cannot be created', async () => {
    mocks.startGuestSession.mockResolvedValue(null);

    const res = await bypass('https://lobe.example.com/signin');

    expect(await res.text()).toBe('auth page');
  });

  it('shows the auth page when the demo account is disabled', async () => {
    mocks.authEnv.AUTH_DISABLE_DEMO_ACCOUNT = true;

    const res = await bypass('https://lobe.example.com/signup');

    expect(await res.text()).toBe('auth page');
    expect(mocks.startGuestSession).not.toHaveBeenCalled();
  });

  it('leaves other auth pages alone', async () => {
    const res = await bypass('https://lobe.example.com/reset-password');

    expect(await res.text()).toBe('auth page');
  });
});
