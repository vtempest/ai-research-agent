import type { PageServerLoad } from "./$types";
import { fail, type Actions } from "@sveltejs/kit";
import { changeEmailFormSchemaFirstStep } from "$lib/middleware/validations";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { logger } from "$lib/middleware/logger";
import { sendEmailChangeEmail } from "$lib/middleware/email";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { generateToken } from "$lib/middleware/sessions";
import { verifyRateLimiter } from "$lib/middleware/ratelimits";
import { isUserAuthenticated } from "$lib/middleware/auth";

import { changeEmailLimiter } from "$lib/middleware/ratelimits";
import { getUserByEmail } from "$lib/db/users";


export const load = (async ({ locals, cookies, url }) => {
  isUserAuthenticated(locals, cookies, url);

  const form = await superValidate(zod(changeEmailFormSchemaFirstStep));

  return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const { request, locals, url, cookies, getClientAddress } = event;
    const flashMessage = { status: "error", text: "" };

    isUserAuthenticated(locals, cookies, url);

    const minutes = await verifyRateLimiter(event, changeEmailLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate(request, zod(changeEmailFormSchemaFirstStep));
    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    const { id: userId, name } = locals.user;
    const { email: newEmail } = form.data;


    const existingUser = await getUserByEmail(locals.db, newEmail);
    if (existingUser) {
      flashMessage.text =  "Email already used";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 401 });
    }

    const newToken = await generateToken(locals.db, userId, newEmail, "email_change");
    if (!newToken) {
      flashMessage.text =  "Failed to generate token";
      logger.error(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    //@ts-ignore
    const mailSent = await sendEmailChangeEmail(newEmail, name, newToken);
    if (!mailSent) {
      flashMessage.text =  "Failed to send email";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    flashMessage.status = "success";
    flashMessage.text = "Email sent successfully";

    redirect(("/auth/change-email/confirm"), flashMessage, cookies);
  }
};
