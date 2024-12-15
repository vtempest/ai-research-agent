import { loadFlash } from "sveltekit-flash-message/server";
import type { LayoutServerLoad } from "./$types";

export const load = loadFlash(async ({ url }) => {
  return { url: url.pathname };
}) satisfies LayoutServerLoad;
