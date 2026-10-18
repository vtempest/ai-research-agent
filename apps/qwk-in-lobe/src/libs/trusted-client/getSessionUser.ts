import { type TrustedClientUserInfo } from './index';

/**
 * Get user info for trusted client authentication. There is no sign-in, so
 * this is the local user, and only once it has an email on record.
 *
 * @returns User info or undefined if the local user has no email
 */
export const getSessionUser = async (): Promise<TrustedClientUserInfo | undefined> => {
  try {
    // Dynamic imports to avoid validator ESM/CJS issue during sitemap generation
    const { getServerDB } = await import('@/database/core/db-adaptor');
    const { UserModel } = await import('@/database/models/user');
    const { getLocalUserId } = await import('@/server/modules/LocalUser');

    const userId = await getLocalUserId();
    const user = await UserModel.findById(await getServerDB(), userId);
    if (!user?.email) return undefined;

    return { email: user.email, name: user.fullName || undefined, userId };
  } catch {
    return undefined;
  }
};
