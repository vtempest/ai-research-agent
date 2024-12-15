import { message, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { fail, type Actions } from "@sveltejs/kit";




import { verifyRateLimiter } from "$lib/middleware/ratelimits";



import { logger } from "$lib/middleware/logger";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { updateUserById } from "$lib/db/users";
import { settingsNotificationsFormSchema, type SettingsNotificationsFormSchema } from "$lib/middleware/validations";
import { notificationsSettingsLimiter } from "$lib/middleware/ratelimits";


export const load: PageServerLoad = async ({ locals: { user } }) => {
  // TODO add guard
  const { name } = user!;
  const form = await superValidate<SettingsNotificationsFormSchema, FlashMessage>({ name }, zod(settingsNotificationsFormSchema));

  return { form, user };
};

export const actions: Actions = {
  default: async (event) => {
    const { request, locals, cookies } = event;
    const flashMessage = { status: "error", text: "" };

    const minutes = await verifyRateLimiter(event, notificationsSettingsLimiter);
    if (minutes) {
      flashMessage.text = "Too many requests, retry in "+minutes+" minutes";
      logger.debug(flashMessage.text);

      setFlash(flashMessage, cookies);
      return fail(429);
    }

    const form = await superValidate<SettingsNotificationsFormSchema, FlashMessage>(request, zod(settingsNotificationsFormSchema));
    if (!form.valid) {
      flashMessage.text = "Invalid form";
      logger.debug(flashMessage.text);

      return message(form, flashMessage);
    }

    // TODO implements notifications
    const { name } = form.data;
    const { id: userId } = locals.user!;

    const updatedUser = await updateUserById(locals.db, userId, { name });
    if (!updatedUser) {
      flashMessage.text = "User not found";
      logger.debug(flashMessage.text);

      return message(form, flashMessage, { status: 400 });
    }

    flashMessage.status = "success";
    flashMessage.text = "Profile updated successfully";

    redirect(("/app/settings/notifications"), flashMessage, cookies);
  }
};
