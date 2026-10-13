// @vitest-environment node
import { Hono } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getSession: vi.fn(),
  startGuestSession: vi.fn(),
}));

vi.mock('@/auth', () => ({ auth: { api: { getSession: mocks.getSession } } }));
vi.mock('@/envs/app', () => ({ appEnv: { APP_URL: 'https://qwksearch.com' } }));
vi.mock('@/libs/better-auth/guest', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  startGuestSession: mocks.startGuestSession,
}));

const { resolvePageSession } = await import('./spa');

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
