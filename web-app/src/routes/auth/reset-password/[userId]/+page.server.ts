import { resetPasswordFormSchemaSecondStep } from "$lib/middleware/validations";
import { superValidate, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, type Actions } from "@sveltejs/kit";
import { logger } from "$lib/middleware/logger";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import type { PageServerLoad } from "./$types";
import { generateToken, verifyToken } from "$lib/middleware/sessions";

import { isAnonymous } from "$lib/middleware/auth";
import { verifyRateLimiter, resetPasswordLimiter,  resendResetPasswordLimiter } from "$lib/middleware/ratelimits";
import { sendPasswordResetEmail } from "$lib/middleware/email";
import { getUserById } from "$lib/db/users";


export const load = (async ({ locals, params }) => {
  isAnonymous(locals);
  const { userId } = params;

  const form = await superValidate(zod(resetPasswordFormSchemaSecondStep));

  return { form, userId };
}) satisfies PageServerLoad;

export const actions: Actions = {
  confirm: async (event) => {
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

    const form = await superValidate(request, zod(resetPasswordFormSchemaSecondStep));
    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    const { token } = form.data;
    const userId = params.userId as string;
    const user = await getUserById(locals.db, userId);
    if (!user) {
      flashMessage.text = "User not found";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 404 });
    }

    const { email } = user;


    const isValidToken = await verifyToken(locals.db, userId, token, "password_reset", email);
    if (!isValidToken) {
      flashMessage.text =  "Invalid token";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    flashMessage.status = "success";
    flashMessage.text = "Email sent successfully";
    redirect(302, "/auth/reset-password/"+ userId +"/new-password")
  },

  resendEmail: async (event) => {
    const { locals, cookies, params } = event;
    const flashMessage = { status: "error", text: "" };

    isAnonymous(locals);

    const minutes = await verifyRateLimiter(event, resendResetPasswordLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const {userId} = params;
    const user = await getUserById(locals.db, userId);
    if (!user) {
      flashMessage.text = "User not found";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }

    const { email } = user;

    const newToken = await generateToken(locals.db, userId, email, "password_reset");
    if (!newToken) {
      flashMessage.text =  "Failed to generate token";
      logger.error(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }

    //@ts-ignore
    const mailSent = await sendPasswordResetEmail(email, newToken);
    if (!mailSent) {
      flashMessage.text =  "Failed to send email";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }

    flashMessage.status = "success";
    flashMessage.text = "Email sent successfully";

    redirect(302, "/auth/reset-password/"+ userId +"/new-password")
  }
};
