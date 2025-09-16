import { json } from "@sveltejs/kit";
import { u as user } from "../../../../chunks/schema.js";
import "stripe";
import { i as initializeUser } from "../../../../chunks/auth.js";
import "resend";
import "../../../../chunks/customize-site.js";
import "../../../../chunks/validations.js";
async function GET({ locals, request }) {
  const userObject = await initializeUser(locals, request);
  return userObject ? json(userObject) : json({ error: "Unauthorized" });
}
async function POST({ locals, request }) {
  const { name, image, settings } = await request.json();
  const userObject = await initializeUser(locals, request);
  if (!userObject)
    return json({ error: "Unauthorized" }, { status: 401 });
  const userFiles = await locals.db.update(user).set({
    ...name !== void 0 && { name },
    ...settings !== void 0 && { settings },
    ...image !== void 0 && { image }
  });
  return json(userFiles);
}
export {
  GET,
  POST
};
