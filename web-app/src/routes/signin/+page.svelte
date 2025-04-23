<script lang="ts">
  import { onMount } from "svelte";
  import { SignIn } from "@auth/sveltekit/components";
  // import { page } from "$app/state";

  import {
    APP_ICON,
    APP_NAME,
    PUBLIC_GOOGLE_CLIENT_ID,
  } from "$lib/custom-domain";

  import { displayGoogleOneTapLogin } from "$lib/components/AppLayout/auth-google-one-tap";
  import Apple from "@auth/sveltekit/providers/apple";
  import Auth0 from "@auth/sveltekit/providers/auth0";
  import Coinbase from "@auth/sveltekit/providers/coinbase";
  import Discord from "@auth/sveltekit/providers/discord";
  import Dropbox from "@auth/sveltekit/providers/dropbox";
  import Facebook from "@auth/sveltekit/providers/facebook";
  import GitHub from "@auth/sveltekit/providers/github";
  import GitLab from "@auth/sveltekit/providers/gitlab";
  import Google from "@auth/sveltekit/providers/google";
  import Keycloak from "@auth/sveltekit/providers/keycloak";
  import LinkedIn from "@auth/sveltekit/providers/linkedin";
  import MicrosoftEntraID from "@auth/sveltekit/providers/microsoft-entra-id";
  import Resend from "@auth/sveltekit/providers/resend";

  onMount(() => {
    if (typeof window === "undefined") return;

    // var user = $page.data.session?.user;
    if (!user) {
      var isOneTapShown = displayGoogleOneTapLogin(PUBLIC_GOOGLE_CLIENT_ID, {
        auto_select: true,
        use_fedcm_for_prompt: true,
        cancel_on_tap_outside: true,
        callback_url: null,
      });
    }
  });
  var providerMap = [
    Google,
    // Discord,
    // LinkedIn,
    // Facebook,
    MicrosoftEntraID,
    GitHub,
    Resend,
  ].map((provider) => {
    // @ts-ignore
    return provider({}); // needs the {} or MicrosoftEntraID won't work
  });

  const getProviderLogo = (providerName: string) => {
    switch (providerName.toLowerCase()) {
      case "google":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
 </svg>`;
      case "discord":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path fill="#7289DA" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
 </svg>`;
      case "linkedin":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
 </svg>`;
      case "facebook":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669c1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
 </svg>`;
      case "resend":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path fill="#2563EB" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/>
 </svg>`;
      case "microsoft entra id":
        return `<svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#f3f3f3" d="M0 0h23v23H0z"/><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>`;
      case "github":
        return `<svg class="w-6 h-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-140.000000, -7559.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"><path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"> </path> </g> </g> </g> </g></svg>`;
      default:
        return "";
    }
  };
</script>

<svelte:head>
  <title>Sign in</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen bg-gray-50">
  <div class="w-full max-w-md">
    <div class="bg-white p-8 rounded-3xl shadow-xs space-y-6">
      <div class="flex items-center justify-center">
        <a href="/" class="cursor-pointer">
          <img
            src="/icons/qwksearch-logo.svg"
            alt="Qwk Logo"
            width="200px"
            class=" object-contain mr-6"
          />
        </a>
      </div>

      <div class="space-y-6">
        {#each providerMap as provider}
          {#if provider.name !== "Resend" && provider.name !== "google-one-tap"}
            <SignIn
              provider={provider.id}
              signInPage="signin"
              className="w-half"
            >
              <div
                slot="submitButton"
                style={`--hover-bg: ${provider.style?.bg || provider.style?.brandColor || "#f3f3f3"}`}
                class={`relative w-full flex items-center justify-between px-4 py-3 text-gray-700 
                        border border-gray-300 rounded-xl hover:bg-[var(--hover-bg)] transition-colors duration-200 
                        focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <div class="flex items-center justify-center pr-2">
                  {@html getProviderLogo(provider.name) || ""}
                </div>
                <span class="text-base font-medium">
                  Login with {#if provider.name === "Microsoft Entra ID"}Microsoft{:else}{provider.name}{/if}
                </span>
              </div>
            </SignIn>
          {/if}
        {/each}
      </div>

      <div class="relative hidden">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 text-gray-500 bg-white">or</span>
        </div>
      </div>

      <div class="space-y-4">
        {#each providerMap as provider}
          {#if provider.name === "Resend"}
            <SignIn
              provider={provider.id}
              signInPage="signin"
              className="w-full"
            >
              <div slot="submitButton" class="space-y-4 mt-4">
                <div
                  class="w-full px-4 py-3 text-white bg-blue-500 rounded-xl hover:bg-blue-600
                       transition-colors duration-200 focus:outline-hidden focus:ring-2
                       focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Email with Login Link
                </div>
              </div>
            </SignIn>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</div>
