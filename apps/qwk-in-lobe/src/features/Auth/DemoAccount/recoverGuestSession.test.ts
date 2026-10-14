import { describe, expect, it, vi } from 'vitest';

import { recoverGuestSession } from './recoverGuestSession';

const memoryStorage = () => {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
  };
};

const respond = (status: number, body: unknown = {}) =>
  vi.fn(async () => new Response(JSON.stringify(body), { status }));

describe('recoverGuestSession', () => {
  it('starts a new guest session and reloads the page', async () => {
    const reload = vi.fn();
    const fetcher = respond(200, { created: true, userId: 'u1' });

    await expect(
      recoverGuestSession({ fetcher, reload, storage: memoryStorage() }),
    ).resolves.toBe('reloading');

    expect(fetcher).toHaveBeenCalledWith(
      '/api/auth/sign-in/demo',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it('stays on the page when the server kept the existing session', async () => {
    const reload = vi.fn();

    await expect(
      recoverGuestSession({
        fetcher: respond(200, { created: false, userId: 'u1' }),
        reload,
        storage: memoryStorage(),
      }),
    ).resolves.toBe('kept');
    expect(reload).not.toHaveBeenCalled();
  });

  it('reports unavailable when the demo account is disabled', async () => {
    const reload = vi.fn();

    await expect(
      recoverGuestSession({ fetcher: respond(404), reload, storage: memoryStorage() }),
    ).resolves.toBe('unavailable');
    expect(reload).not.toHaveBeenCalled();
  });

  it('does not recover twice within 30 seconds, so a persistent 401 cannot reload-loop', async () => {
    const storage = memoryStorage();
    const reload = vi.fn();
    const fetcher = respond(200, { created: true });
    let now = 1_000_000;

    await recoverGuestSession({ fetcher, now: () => now, reload, storage });
    now += 5000;
    await expect(recoverGuestSession({ fetcher, now: () => now, reload, storage })).resolves.toBe(
      'unavailable',
    );
    now += 30_000;
    await expect(recoverGuestSession({ fetcher, now: () => now, reload, storage })).resolves.toBe(
      'reloading',
    );

    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
