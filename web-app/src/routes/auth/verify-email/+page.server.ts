import { redirect, setFlash } from "sveltekit-flash-message/server";
import { type Actions, fail } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate, message } from "sveltekit-superforms/server";

import type { PageServerLoad } from "./$types";
import { verifyEmailFormSchema } from "$lib/middleware/validations";
import { logger } from "$lib/middleware/logger";
import { createAndSetSession, generateToken, verifyToken } from "$lib/middleware/sessions";
import { getUserByEmail, updateUserById } from "$lib/db/users";
import { sendEmailVerificationEmail, sendWelcomeEmail } from "$lib/middleware/email";
import { verifyRateLimiter } from "$lib/middleware/ratelimits";
import { isUserNotVerified } from "$lib/middleware/auth";
import { verifyEmailLimiter, resendVerifyEmailLimiter } from "$lib/middleware/ratelimits";
import { ORIGIN } from "$lib/middleware/config";

export const load = (async ({ locals, cookies, url }) => {

  
  let token = url.searchParams.get('token');

  console.log(token);

  isUserNotVerified(locals, cookies, url);

  const form = await superValidate(zod(verifyEmailFormSchema));

  return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  confirm: async (event) => {
    const { request, locals, url, cookies, getClientAddress } = event;
    const flashMessage = { status: "error", text: "" };

    isUserNotVerified(locals, cookies, url);

    const minutes = await verifyRateLimiter(event, verifyEmailLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate(request, zod(verifyEmailFormSchema));
    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    const { id: userId, email, name } = locals.user;
    const { token } = form.data;

    const isValidToken = await verifyToken(locals.db, userId, token, "email_verification", email);
    if (!isValidToken) {
      flashMessage.text =  "Invalid token";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    await locals.lucia.invalidateUserSessions(userId);

    const existingUser = await getUserByEmail(locals.db, email);
    if (!existingUser) {
      flashMessage.text = "User not found";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 404 });
    }

    const authMethods = existingUser.authMethods ?? [];
    authMethods.push("email");

    const updatedUser = await updateUserById(locals.db, userId, { isVerified: true, authMethods });
    if (!updatedUser) {
      flashMessage.text = "Failed to update user";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 404 });
    }

    const urlLogo = ORIGIN + '/icons/qwksearch-icon.svg';

    await createAndSetSession(locals.lucia, userId, cookies);
    await sendWelcomeEmail(email, name, urlLogo);

    flashMessage.status = "success";
    flashMessage.text =  "Email verified successfully";

    redirect(("/"), flashMessage, cookies);
  },

  resendEmail: async (event) => {
    const { locals, url, cookies } = event;
    const flashMessage = { status: "error", text: "" };


    isUserNotVerified(locals, cookies, url);

    const minutes = await verifyRateLimiter(event, resendVerifyEmailLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const { id: userId, name, email } = locals.user;

    //@ts-ignore
    const newToken = await generateToken(locals.db, userId, email, "email_verification");
    if (!newToken) {
      flashMessage.text =  "Failed to generate token";
      logger.error(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }
    //@ts-ignore
    const mailSent = await sendEmailVerificationEmail(email, name,  newToken);
    if (!mailSent) {
      flashMessage.text =  "Failed to send email";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(500);
    }

    flashMessage.status = "success";
    flashMessage.text = "Email sent successfully";

    redirect(("/auth/verify-email"), flashMessage, cookies);
  }
};
