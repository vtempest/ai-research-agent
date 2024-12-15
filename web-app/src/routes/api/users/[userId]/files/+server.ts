
import { json } from '@sveltejs/kit';
import { userFileIndex } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET({ params , locals }) {
  const { db } = locals;
  const fileIndexes = await db.select().from(userFileIndex).where(eq(userFileIndex.userId, params.userId));
  
  return json(fileIndexes.map(index => index.fileId));

}
