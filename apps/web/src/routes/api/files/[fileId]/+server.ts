
import { json } from '@sveltejs/kit';
import { files } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { initializeUser } from '$lib/server';

export async function GET({ params, locals, request }) {
  let user = await initializeUser(locals, request);
  
  const file = await locals.db.select().from(files)
    .where(eq(files.id, params.fileId)).get();
  
  if (!file) {
    return json({ error: 'File not found' }, { status: 404 });
  }
  return json(file);
}

export async function POST({ params, request, locals: {db} }) {
  const updates = await request.json();
  await db.update(files)
    .set({ ...updates, lastUpdated: new Date() })
    .where(eq(files.id, params.fileId));
  const updatedFile = await db.select().from(files).where(eq(files.id, params.fileId)).get();
  return json(updatedFile);
}

export async function DELETE({ params, locals: {db} }) {
  await db.delete(files).where(eq(files.id, params.fileId));
  return new Response(null, { status: 204 });
}
