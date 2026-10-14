import { describe, expect, it, vi } from 'vitest';

import { startDemoSession } from './startDemoSession';

describe('startDemoSession', () => {
  it('posts to the demo sign-in endpoint with credentials', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));

    await startDemoSession(fetcher);

    expect(fetcher).toHaveBeenCalledWith(
      '/api/auth/sign-in/demo',
      expect.objectContaining({ body: '{}', credentials: 'include', method: 'POST' }),
    );
  });

  it('reports whether a new guest session was created', async () => {
    const created = vi.fn().mockResolvedValue(new Response('{"created":true}', { status: 200 }));
    const kept = vi.fn().mockResolvedValue(new Response('{"created":false}', { status: 200 }));

    await expect(startDemoSession(created)).resolves.toEqual({ created: true });
    await expect(startDemoSession(kept)).resolves.toEqual({ created: false });
  });

  it('throws when the server refuses (e.g. demo disabled)', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('', { status: 404 }));

    await expect(startDemoSession(fetcher)).rejects.toThrow('404');
  });
});
