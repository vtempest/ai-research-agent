import { createAuthClient } from 'better-auth/svelte';
import { oneTapClient } from "better-auth/client/plugins";
import * as custom from "$lib/customize-site"

/**
 * ### Create Better Auth Client with One Tap
 * 
 * Note: If browser blocks due to closing with "FedCM get()
 * rejects with NetworkError" then click lockicon in url bar and 
 * allow "Third Party Sign In" or clear cookies and allow 
 * localhost in chrome://settings/content/federatedIdentityApi
 */
export const authClient = createAuthClient({
	baseURL: custom.PUBLIC_DOMAIN, // the base url of your auth server
	plugins: [
		oneTapClient({
		  clientId: custom.PUBLIC_GOOGLE_CLIENT_ID,
		  autoSelect: true,
		  cancelOnTapOutside: true,
		  context: "signin",
		  promptOptions: {
			baseDelay: 0,   // Base delay in ms (default: 1000)
			maxAttempts: 5     // Maximum number of attempts before triggering onPromptNotification (default: 5)
		  }
		})
	  ]
});

