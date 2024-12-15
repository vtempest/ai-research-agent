import { destroySession } from "$lib/middleware/sessions";
import { isUserAuthenticated } from "$lib/middleware/auth";
import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ locals, url, cookies }) => {
    isUserAuthenticated(locals, cookies, url);

    await locals.lucia.invalidateSession(locals.session.id);
    destroySession(locals.lucia, cookies);

    redirect(302, ("/"));
  }
} ;
