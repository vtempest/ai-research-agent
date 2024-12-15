
import { json } from '@sveltejs/kit';
// import { db } from '$lib/db';
// import { files } from '$lib';
import { eq } from 'drizzle-orm';

export async function GET({ params }) {
  // const file = await db.select().from(files).where(eq(files.id, params.fileId)).get();
  // if (!file) {
  //   return json({ error: 'File not found' }, { status: 404 });
  // }
  return json(1);
}

// export async function PUT({ params, request }) {
//   const updates = await request.json();
//   await db.update(files)
//     .set({ ...updates, lastUpdated: new Date() })
//     .where(eq(files.id, params.fileId));
//   const updatedFile = await db.select().from(files).where(eq(files.id, params.fileId)).get();
//   return json(updatedFile);
// }

// export async function DELETE({ params }) {
//   await db.delete(files).where(eq(files.id, params.fileId));
//   return new Response(null, { status: 204 });
// }
