
import { json } from '@sveltejs/kit';
import { files } from '$lib/db/schema';

export const GET = async ({locals}) => {
    // Access the DB environment variable
    const db = locals.db;

    
  const allFiles = await db.select().from(files);
  return json(allFiles);
}

export async function POST({locals, request}) {
    const db = locals.db;

  const { title, content, users } = await request.json();
  const newFile = {
    id: crypto.randomUUID(),
    title,
    content,
    users: JSON.stringify(users),
    lastUpdated: new Date()
  };
  await db.insert(files).values(newFile);
  return json(newFile, { status: 201 });
}