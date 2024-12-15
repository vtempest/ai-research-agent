import { sha256 } from "@noble/hashes/sha256";
import { fail } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { redirect, setFlash } from "sveltekit-flash-message/server";

import type { PageServerLoad, Actions } from "./$types";
import { getUserByEmail } from "$lib/db/users";
import { createAndSetSession } from "$lib/middleware/sessions";
import { loginFormSchema } from "$lib/middleware/validations";
import { logger } from "$lib/middleware/logger";
import { verifyRateLimiter } from "$lib/middleware/ratelimits";
import { isAnonymous } from "$lib/middleware/auth";
import { loginLimiter } from "$lib/middleware/ratelimits";


export const load: PageServerLoad = async ({ locals }) => {
  isAnonymous(locals);

  const form = await superValidate(
    zod(loginFormSchema)
  );

  return { form };
};

export const actions: Actions = {
  default: async (event) => {
    const { request, locals, url, cookies, getClientAddress } = event;
    const flashMessage = { status: "error", text: "" };

    isAnonymous(locals);

    const minutes = await verifyRateLimiter(event, loginLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in " + minutes + " minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate(
      request,
      zod(loginFormSchema)
    );

    const { email, password } = form.data;
    form.data.password = "";

    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    const existingUser = await getUserByEmail(locals.db, email);
    if (!existingUser) {
      flashMessage.text = "Invalid email or password";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 400 });
    }

    if (!existingUser.password && !existingUser.authMethods.includes("email")) {
      flashMessage.text =
        "You registered with an OAuth provider. Please use the appropriate login method.";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 403 });
    }
    // validate password

    if (
      Buffer.from(sha256(password)).toString("base64") != existingUser.password
    ) {
      flashMessage.text = "Invalid email or password";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 400 });
    }

    await createAndSetSession(locals.lucia, existingUser.id, cookies);

    let redirectTo = url.searchParams.get("redirectTo");

    if (redirectTo) {
      // with this line we are forcing to redirect to our domain
      // for example, if they pass a malicious domain like example.com/auth/login?redirectTo=http://virus.com
      // the redirect to the malicious domain won't work because this will throw a 404
      // instead if it's a legit url like example.com/auth/login?redirectTo=/admin it will work as usual
      redirectTo = `/${redirectTo.slice(1)}`;
    }

    //redirect  to extension

    redirect(303, redirectTo ?? ("/"));
  },
};
