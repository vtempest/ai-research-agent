import { redirect } from "sveltekit-flash-message/server";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  redirect(303, ("/app/settings/profile"));
}) satisfies PageServerLoad;
