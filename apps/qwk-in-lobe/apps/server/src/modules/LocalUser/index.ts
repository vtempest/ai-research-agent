import { getServerDB } from '@/database/core/db-adaptor';
import { UserModel } from '@/database/models/user';

/**
 * QwkSearch-in-Lobe has no sign-in: every request runs as this one user.
 * Anyone who can reach the deployment shares its chats, files and settings.
 */
export const LOCAL_USER_ID = 'qwk-local-user';

let ensured: Promise<void> | undefined;

/**
 * Make sure the local user's row exists (once per isolate), so foreign keys
 * from agents, sessions, messages, … resolve.
 */
export const ensureLocalUser = (): Promise<void> => {
  ensured ??= (async () => {
    const db = await getServerDB();
    await UserModel.makeSureUserExist(db, LOCAL_USER_ID);
  })().catch((error) => {
    ensured = undefined;
    throw error;
  });
  return ensured;
};

/** The user id every request runs as, after making sure its row exists. */
export const getLocalUserId = async (): Promise<string> => {
  await ensureLocalUser();
  return LOCAL_USER_ID;
};
