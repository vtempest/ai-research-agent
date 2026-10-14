/**
 * Start a guest session through Better Auth's `POST /api/auth/sign-in/demo`
 * (the `guestSession` plugin). Resolves once the session cookie is set; an
 * existing session is kept as is.
 */
export const startDemoSession = async (fetcher: typeof fetch = fetch): Promise<void> => {
  const res = await fetcher('/api/auth/sign-in/demo', {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!res.ok) throw new Error(`Demo sign-in failed with status ${res.status}`);
};
