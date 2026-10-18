/**
 * Session helpers for the QwkSearch feature routes.
 *
 * There is no sign-in: favorites and documents belong to the local user
 * (`@/server/modules/LocalUser`), the same user every LobeHub request runs as.
 */

export const getUserId = async (_headers: Headers): Promise<string | null> => {
  try {
    const { getLocalUserId } = await import('@/server/modules/LocalUser');
    return await getLocalUserId();
  } catch (error) {
    console.error('[qwksearch] local user lookup failed:', error);
    return null;
  }
};

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}

export const requireUserId = async (headers: Headers): Promise<string> => {
  const userId = await getUserId(headers);
  if (!userId) throw new UnauthorizedError();
  return userId;
};

export const unauthorizedResponse = () =>
  Response.json({ message: 'Authentication required' }, { status: 401 });
