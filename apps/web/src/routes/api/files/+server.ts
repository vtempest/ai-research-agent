
import { json } from '@sveltejs/kit';
import { files, userFileIndex, user  } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const GET = async ({locals}) => {
  // const { user } = await locals.auth();
  // const userId = (await locals.db.select().from(user)
  //   .where(eq(user.email, user.email)).limit(1))[0]?.id;

  // const userFiles = await locals.db.select().from(userFileIndex).where(eq(userFileIndex.userId, userId));

  return json({});
}

export async function POST({locals, request}) {
  const { title, content, user } = await request.json();
  const newFile = {
    id: crypto.randomUUID(),
    title,
    content,
    user: JSON.stringify(user),
    lastUpdated: new Date()
  };
  await locals.db.insert(files).values(newFile);
  return json(newFile, { status: 201 });
}