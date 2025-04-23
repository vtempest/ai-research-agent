import { message, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { settingsAccountFormSchema } from "$lib/server/validations";
import { fail, type Actions } from "@sveltejs/kit";


import { verifyRateLimiter, accountSettingsLimiter } from "$lib/server/ratelimits";
import { logger } from "$lib/server";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { updateUserById } from "$lib/server/users";


export const load: PageServerLoad = async ({ locals: { user } }) => {
  // TODO add guard
  const { name } = user!;
  const form = user ;
  // await superValidate({ name }, zod(settingsAccountFormSchema));

  return { form, user };
};

export const actions: Actions = {
  default: async (event) => {
    const { request, locals, cookies } = event;
    const flashMessage = { status: "error", text: "" };

    const minutes = await verifyRateLimiter(event, accountSettingsLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    redirect(("/app/settings/account"), flashMessage, cookies);
  
    const form =  {name: "test"} ;
    // await superValidate(request, zod(settingsAccountFormSchema));
    // if (!form.valid) {
    //   flashMessage.text = "Invalid form";
    //   logger.debug(flashMessage.text);

    //   // return message(form, flashMessage);
    // }

    // TODO check this !
    // const { name } = form.data;
    const { id: userId } = locals.user!;

    const updatedUser = await updateUserById(locals.db, userId, { name });
    if (!updatedUser) {
      flashMessage.text = "User not found";
      logger.debug(flashMessage.text);

      // return message(form, flashMessage, { status: 400 });
    }

    flashMessage.status = "success";
    flashMessage.text = "Account updated successfully";

    redirect(("/app/settings/account"), flashMessage, cookies);
  }
};
