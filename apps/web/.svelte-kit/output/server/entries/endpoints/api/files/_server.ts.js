import { json } from "@sveltejs/kit";
import { f as files } from "../../../../chunks/schema.js";
const GET = async ({ locals }) => {
  return json({});
};
async function POST({ locals, request }) {
  const { title, content, user: user2 } = await request.json();
  const newFile = {
    id: crypto.randomUUID(),
    title,
    content,
    user: JSON.stringify(user2),
    lastUpdated: /* @__PURE__ */ new Date()
  };
  await locals.db.insert(files).values(newFile);
  return json(newFile, { status: 201 });
}
export {
  GET,
  POST
};
