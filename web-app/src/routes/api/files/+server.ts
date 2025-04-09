
import { json } from '@sveltejs/kit';
import { files } from '$lib/server/schema';

export const GET = async ({locals}) => {
  const allFiles = await locals.db.select().from(files);
  return json(allFiles);
}

export async function POST({locals, request}) {
  const { title, content, users } = await request.json();
  const newFile = {
    id: crypto.randomUUID(),
    title,
    content,
    users: JSON.stringify(users),
    lastUpdated: new Date()
  };
  await locals.db.insert(files).values(newFile);
  return json(newFile, { status: 201 });
}