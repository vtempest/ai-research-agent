import { logger } from "$lib/middleware/logger";
import { resetPasswordFormSchemaThirdStep } from "$lib/middleware/validations";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import type { Actions, PageServerLoad } from "./$types";
import { superValidate, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { updateUserById } from "$lib/db/users";
import { sha256 } from '@noble/hashes/sha256';
import { verifyRateLimiter } from "$lib/middleware/ratelimits";
import { isAnonymous } from "$lib/middleware/auth";
import { resetPasswordLimiter } from "$lib/middleware/ratelimits";

import { fail } from "@sveltejs/kit";


export const load = (async ({ locals }) => {
  isAnonymous(locals);

  const form = await superValidate(zod(resetPasswordFormSchemaThirdStep));

  return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const { request, locals, cookies, params, getClientAddress } = event;
    const flashMessage = { status: "error", text: "" };

    isAnonymous(locals);

    const minutes = await verifyRateLimiter(event, resetPasswordLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate(request, zod(resetPasswordFormSchemaThirdStep));

    const { password } = form.data;

    form.data.password = "";
    form.data.passwordConfirm = "";

    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

   

    const { userId } = params;

    await locals.lucia.invalidateUserSessions(userId);

    const updatedUser = await updateUserById(locals.db, userId, { password: sha256(password) });
    if (!updatedUser) {
      flashMessage.text = "Failed to update user";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    flashMessage.status = "success";
    flashMessage.text =  "Password changed successfully. You can now login.";

    redirect(("/auth/login"), flashMessage, cookies);
  }
};
