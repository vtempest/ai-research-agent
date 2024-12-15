import { generateId } from "lucia";
import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate, message } from "sveltekit-superforms/server";
import { sha256 } from '@noble/hashes/sha256';

import { createAndSetSession, generateToken } from "$lib/middleware/sessions";
import { registerFormSchema } from "$lib/middleware/validations";
import { sendEmailVerificationEmail } from "$lib/middleware/email";
import { logger } from "$lib/middleware/logger";
import { createUser, getUserByEmail, updateUserById } from "$lib/db/users";
import { USER_ID_LEN } from "$lib/middleware/validations";
import { verifyRateLimiter, registerLimiter } from "$lib/middleware/ratelimits";
import { isAnonymous } from "$lib/middleware/auth";



export const load = async ({ locals }) => {
  isAnonymous(locals);

  const form = await superValidate(zod(registerFormSchema));

  return { form };
};

export const actions = {
  default: async (event) => {
    try{
    const { request, locals, cookies } = event;
    const flashMessage = { status: "error", text: "" };

    isAnonymous(locals);

    const minutes = await verifyRateLimiter(event, registerLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate(request, zod(registerFormSchema));

    const { name, email, password } = form.data;

    form.data.password = "";
    form.data.passwordConfirm = "";

    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }


    const existingUser = await getUserByEmail(locals.db, email);
    if (existingUser && existingUser.authMethods.includes("email")) {
      flashMessage.text = "This email is already used. Please do login.";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 400 });
    }

    const userId = existingUser?.id ?? generateId(USER_ID_LEN);
    const hashedPassword = Buffer.from(sha256(password)).toString('base64');


    if (!existingUser) {
      const newUser = await createUser(locals.db, {
        id: userId,
        name,
        email,
        username: email.split("@")[0] + generateId(5),
        password: hashedPassword,
        isVerified: false,
        isAdmin: false,
        authMethods: []
      });

      if (!newUser) {
        flashMessage.text = "Failed to insert new user";
        logger.debug(flashMessage.text);

        return message(form, flashMessage, { status: 400 });
      }
    } else {
      const updatedUser = await updateUserById(locals.db, existingUser.id, { password: hashedPassword, isVerified: false });

      if (!updatedUser) {
        flashMessage.text = "Failed to insert new user";
        logger.debug(flashMessage.text);

        return message(form, flashMessage, { status: 400 });
      }
    }

    const newToken  = await generateToken(locals.db, userId, email, "email_verification");
    if (!newToken) {
      flashMessage.text =  "Failed to generate token";
      logger.error(flashMessage.text);

      return message(form, flashMessage, { status: 500 });
    }

    //dev only - use this to get the token for testing
    logger.debug(newToken)
    // @ts-ignore
    const res = await sendEmailVerificationEmail(email, name, newToken);
    if (!res) {
      flashMessage.text =  "Failed to send email";
      logger.debug(flashMessage.text);

      //for testing
      // return message(form, flashMessage, { status: 500 });
    }

    await createAndSetSession(locals.lucia, userId, cookies);

    flashMessage.status = "success";
    flashMessage.text = "Account created. Please check your email to verify your account.";

    redirect(("/auth/verify-email"), flashMessage, cookies);
  }
  catch(e){
    console.error(e);
  }
  }
};
