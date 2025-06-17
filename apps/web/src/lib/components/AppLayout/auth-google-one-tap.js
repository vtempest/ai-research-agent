// import { signIn, signOut } from "@auth/sveltekit/client"

/**
 * Show Google One Tap menu and send JWT userinfo to callback.
 *
 * The verifyIdToken function verifies the JWT signature,
 * the aud claim, the exp claim, and the iss claim.
 *
 * Error: If browser blocks due to closing with "FedCM get()
 *  rejects with NetworkError" then clear cookies and allow 
 * localhost in chrome://settings/content/federatedIdentityApi, or click lock
 * icon in url bar and allow "Third Party Sign In"
 *
 * @see Verify_JWT [Verify Docs](https://developers.google.com/identity/sign-in/web/backend-auth)
 * @see Google_One_Tap [One Tap Docs](https://developers.google.com/identity/gsi/web/reference/js-reference)
 * @param {string} client_id Google OAuth Client ID
 * @param  {{
 *   auto_select?: boolean;
 *   use_fedcm_for_prompt?: boolean;
 *   cancel_on_tap_outside?: boolean;
 *   callback_url: string;
 *   state_cookie_domain?: string;
 * }} options
 * @param {boolean} [options.auto_select] - If true, the
 *   One Tap prompt will immediately return an ID token
 *   without user interaction when there is only one Google
 *   session.
 * @param {boolean} [options.use_fedcm_for_prompt] - If true,
 *   the browser will control user sign-in prompts and mediate
 *   the sign-in flow between your website and Google.
 * @param {boolean} [options.cancel_on_tap_outside] - If true,
 *   the One Tap request will be canceled if the user clicks
 *   outside the prompt. If user clicks X it's always off until 
 *   they click lock icon in url bar and allow "Third Party Sign In"
 * @returns {Promise<boolean>} true if able to show menu
 * @author [vtempest](https://github.com/vtempest/)
 * @example
    if (!user) {
      var isOneTapShown = displayGoogleOneTapLogin(
        PUBLIC_GOOGLE_CLIENT_ID, {3/k.
          use_fedcm_for_prompt: true,
          cancel_on_tap_outside: true,
          callback_url: `/auth/google/callback`,
          state_cookie_domain: PUBLIC_DOMAIN
        })
      if (!isOneTapShown) 
        console.log("OneTap error - use alternatives");
    }
 */
export async function displayGoogleOneTapLogin(
  client_id,
  options = {}
) {
  const {
    auto_select = true,
    use_fedcm_for_prompt = true,
    cancel_on_tap_outside = true,
  } = options;

  try {
    //load Google One Tap client script if not already loaded
    await loadScript("https://accounts.google.com/gsi/client")

    google?.accounts.id.initialize({
      client_id,
      auto_select,
      use_fedcm_for_prompt,
      cancel_on_tap_outside,
      context: "use",
      callback: async ({ credential }) => {

        //TODO does not set cookie jwt
        if (0)
          void signIn("googleonetap", {
          credential,
          redirect: true,
        });

        const data = await fetch("/signin", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "content-type": "application/x-www-form-urlencoded",
          },
          body: "providerId=google",
          redirect: 'follow'
        }).then(res => res.json())

        window.location.href = data.location;
      },
    });

    // document.cookie =  `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    google.accounts.id.prompt()

  } catch (error) {
    // console.debug(error);
    return false
  }
}

/**
 * Loads a script from the given URL.
 * @param {string} url 
 */
export async function loadScript(url) {
  return await new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = resolve;
    document.head.appendChild(script);
  });
}