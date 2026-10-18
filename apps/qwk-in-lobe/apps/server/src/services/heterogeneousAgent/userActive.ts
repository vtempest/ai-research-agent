import { users } from '@lobechat/database/schemas';
import { eq } from 'drizzle-orm';

import type { LobeChatDatabase } from '@/database/type';

/** Rejects a user that no longer exists or is currently banned. */
export const assertUserActive = async (db: LobeChatDatabase, userId: string) => {
  const [user] = await db
    .select({ banExpires: users.banExpires, banned: users.banned, id: users.id })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const banned = !!user?.banned && (!user.banExpires || user.banExpires > new Date());
  if (!user || banned) throw new Error('User is no longer active');
};
