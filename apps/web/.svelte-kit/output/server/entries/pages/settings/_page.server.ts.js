import { redirect as redirect$1 } from "@sveltejs/kit";
function redirect(status, location, message, event) {
  switch (arguments.length) {
    case 2: {
      return realRedirect(status, `${location}`);
    }
    case 3:
      return realRedirect(303, status, location);
    case 4:
      return realRedirect(status, location, message);
    default:
      throw new Error("Invalid redirect arguments");
  }
}
function realRedirect(status, location, message, event) {
  if (!message)
    return redirect$1(status, location.toString());
  throw new Error("RequestEvent is required for redirecting with flash message");
}
const load = (async () => {
  redirect(303, "/app/settings/profile");
});
export {
  load
};
