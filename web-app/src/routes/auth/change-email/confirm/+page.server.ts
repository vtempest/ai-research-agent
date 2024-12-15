import type { PageServerLoad } from "./$types";
import { fail, type Actions } from "@sveltejs/kit";
import { changeEmailFormSchemaSecondStep } from "$lib/middleware/validations";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { logger } from "$lib/middleware/logger";
import { updateUserById } from "$lib/db/users";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { generateToken, verifyToken , getTokenByUserId } from "$lib/middleware/sessions";

import { verifyRateLimiter } from "$lib/middleware/ratelimits";
import { isUserAuthenticated } from "$lib/middleware/auth";
import { sendEmailChangeEmail } from "$lib/middleware/email";
import {changeEmailLimiter , resendChangeEmailLimiter } from "$lib/middleware/ratelimits";


export const load = (async ({ locals, cookies, url }) => {
  isUserAuthenticated(locals, cookies, url);

  const form = await superValidate(zod(changeEmailFormSchemaSecondStep));

  return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  confirm: async (event) => {
    const { request, locals, url, cookies, getClientAddress } = event;
    const flashMessage = { status: "error", text: "" };

    isUserAuthenticated(locals, cookies, url);

    const minutes = await verifyRateLimiter(event, changeEmailLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.error(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate(request, zod(changeEmailFormSchemaSecondStep));
    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    const { token } = form.data;

    const { id: userId } = locals.user;

    const emailFromDatabase = await verifyToken(locals.db, userId, token, "email_change");
    if (!emailFromDatabase) {
      flashMessage.text =  "Invalid token";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    await locals.lucia.invalidateUserSessions(userId);

    const updatedUser = await updateUserById(locals.db, userId, { email: emailFromDatabase });
    if (!updatedUser) {
      flashMessage.text = "Failed to update user";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 404 });
    }

    flashMessage.status = "success";
    flashMessage.text = "Email changed successfully. You can login now!"
;

    redirect(("/auth/login"), flashMessage, cookies);
  },

  resendEmail: async (event) => {
    const { locals, url, cookies } = event;
    const flashMessage = { status: "error", text: "" };

    isUserAuthenticated(locals, cookies, url);

    const minutes = await verifyRateLimiter(event, resendChangeEmailLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const { id: userId, name } = locals.user;

    const tokenFromDatabase = await getTokenByUserId(locals.db, userId, "email_change");
    if (!tokenFromDatabase) {
      flashMessage.text =  "Invalid token";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }

    const newEmail = tokenFromDatabase.email;

    const newToken = await generateToken(locals.db, userId, newEmail, "email_change");
    if (!newToken) {
      flashMessage.text =  "Failed to generate token";
      logger.error(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }
    // @ts-ignore
    const mailSent = await sendEmailChangeEmail(newEmail, name, newToken);
    if (!mailSent) {
      flashMessage.text =  "Failed to send email";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }

    flashMessage.status = "success";
    flashMessage.text = "Email sent successfully";

    redirect(("/auth/change-email/confirm"), flashMessage, cookies);
  }
};
