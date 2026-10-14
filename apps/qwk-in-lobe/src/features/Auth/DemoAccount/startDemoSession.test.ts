import { describe, expect, it, vi } from 'vitest';

import { startDemoSession } from './startDemoSession';

describe('startDemoSession', () => {
  it('posts to the demo sign-in endpoint with credentials', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));

    await startDemoSession(fetcher);

    expect(fetcher).toHaveBeenCalledWith(
      '/api/auth/sign-in/demo',
      expect.objectContaining({ credentials: 'include', method: 'POST' }),
    );
  });

  it('throws when the server refuses (e.g. demo disabled)', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('', { status: 404 }));

    await expect(startDemoSession(fetcher)).rejects.toThrow('404');
  });
});
