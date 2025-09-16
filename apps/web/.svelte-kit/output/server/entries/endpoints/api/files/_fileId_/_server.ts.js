import { json } from "@sveltejs/kit";
import { f as files } from "../../../../../chunks/schema.js";
import { eq } from "drizzle-orm";
import "stripe";
import { i as initializeUser } from "../../../../../chunks/auth.js";
import "resend";
import "../../../../../chunks/customize-site.js";
import "../../../../../chunks/validations.js";
async function GET({ params, locals, request }) {
  await initializeUser(locals, request);
  const file = await locals.db.select().from(files).where(eq(files.id, params.fileId)).get();
  if (!file) {
    return json({ error: "File not found" }, { status: 404 });
  }
  return json(file);
}
async function POST({ params, request, locals: { db } }) {
  const updates = await request.json();
  await db.update(files).set({ ...updates, lastUpdated: /* @__PURE__ */ new Date() }).where(eq(files.id, params.fileId));
  const updatedFile = await db.select().from(files).where(eq(files.id, params.fileId)).get();
  return json(updatedFile);
}
async function DELETE({ params, locals: { db } }) {
  await db.delete(files).where(eq(files.id, params.fileId));
  return new Response(null, { status: 204 });
}
export {
  DELETE,
  GET,
  POST
};
