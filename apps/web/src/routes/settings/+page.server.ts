import { redirect } from "sveltekit-flash-message/server";
import type { ServerLoad } from "@sveltejs/kit";

export const load = (async () => {
  redirect(303, ("/app/settings/profile"));
}) satisfies ServerLoad;
