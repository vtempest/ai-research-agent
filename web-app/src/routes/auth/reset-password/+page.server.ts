import type { PageServerLoad } from "./$types";
import { fail, type Actions } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { logger } from "$lib/middleware/logger";
import { resetPasswordFormSchemaFirstStep } from "$lib/middleware/validations";
import { getUserByEmail } from "$lib/db/users";
import { sendPasswordResetEmail } from "$lib/middleware/email";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { generateToken } from "$lib/middleware/sessions";



import { verifyRateLimiter } from "$lib/middleware/ratelimits";
import { isAnonymous } from "$lib/middleware/auth";
import { resetPasswordLimiter } from "$lib/middleware/ratelimits";



export const load = (async ({ locals }) => {
  isAnonymous(locals);

  const form = await superValidate(zod(resetPasswordFormSchemaFirstStep));

  return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const { request, locals, cookies, getClientAddress } = event;
    const flashMessage = { status: "error", text: "" };

    isAnonymous(locals);

    const minutes = await verifyRateLimiter(event, resetPasswordLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate(request, zod(resetPasswordFormSchemaFirstStep));
    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    const { email } = form.data;
    const userFromDb = await getUserByEmail(locals.db, email);
    if (!userFromDb) {
      flashMessage.status = "success";
      flashMessage.text = "Email sent successfully";

      // we send a success message even if the user doesn't exist to prevent email enumeration
      redirect(("/"), flashMessage, cookies);
    }

    const { id: userId } = userFromDb;

    const newToken = await generateToken(locals.db, userId, email, "password_reset");
    if (!newToken) {
      flashMessage.text =  "Failed to generate token";
      logger.error(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }
    //@ts-ignore
    const mailSent = await sendPasswordResetEmail(email, newToken);
    if (!mailSent) {
      flashMessage.text =  "Failed to send email";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    flashMessage.status = "success";
    flashMessage.text = "Email sent successfully";

    redirect( 200, "/auth/reset-password/"+userId)
  }
};
