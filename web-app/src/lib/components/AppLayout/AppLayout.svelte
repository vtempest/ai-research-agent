<script lang="ts">
  import { onMount } from "svelte";
  // import {themeNames} from "./Theme.svelte";
  import "./themes-shadcn.css";
  // src/lib/stores/theme.ts
  import { writable } from "svelte/store";

  import { listDockApps } from "./AppDockViews.svelte";
  import AppDockMenu from "./AppDockMenu.svelte";
  import {
    setupMobileView,
    loadGoogleFonts,
    loadAnalytics,
    setStateInURL,
    loadMetaTags,
  } from "$lib/utils";
  import { grab } from "$lib/grab-api.js";
  import {
    APP_NAME,
    GOOGLE_ANALYTICS,
    SERVER_API_URL,
    PUBLIC_DOMAIN,
    PUBLIC_GOOGLE_CLIENT_ID,
  } from "$lib/customize-site";

  import {
    playSoundEffect,
    SoundEffect,
  } from "$lib/components/AppLayout/sound-effects";
  import { displayGoogleOneTapLogin } from "$lib/components/AppLayout/auth-google-one-tap";

  export const theme = writable("modern-minimal"); // default theme

  // State variables
  let optionSoundOnSwitch = $state(true);
  let view = $state(null);
  let user: User = $state({});
  let deviceInfo: {
    isMobile?: boolean;
    os?: string;
  } = $state({}); // default to false;

  $effect(() => {
    if (view) setStateInURL({ view });
  });

  let currentTheme = $state("");

  $effect(() => {
    const unsubscribe = theme.subscribe((value) => {
      currentTheme = value;
      // Persist user choice
      localStorage.setItem("theme", value);
    });
    return () => unsubscribe();
  });

  onMount(async () => {
    if (typeof window === "undefined") return;

    grab("", { 
      setDefaults: true,
      baseURL: SERVER_API_URL,
      timeout: 30,
      debug: true,
      rateLimit: 1,
      cache: false,
      cancelNewIfOngoing: false
    });

    // remove the loader
    // document.getElementById('artistic-loader')?.remove();

    // get user from server
    await grab("user", user);

    // get the view from the URL or default to the first app
    view = setStateInURL().view || view;
    // listen to mobile view changes
    setupMobileView(deviceInfo);

    if (!user?.name) {
      var isOneTapShown = displayGoogleOneTapLogin(PUBLIC_GOOGLE_CLIENT_ID, {
        auto_select: true,
        use_fedcm_for_prompt: true,
        cancel_on_tap_outside: true,
        callback_url: `/auth/google/callback`,
        state_cookie_domain: PUBLIC_DOMAIN,
      });
      if (!isOneTapShown) {
        console.log("OneTap error - use alternatives");
      }
    }
  });

  /**
   * Handles the click event on the app dock menu items
   * Updates the active view and plays a sound effect if enabled
   * Updates the URL and document title to reflect the new view
   * @param {string} id - The ID of the clicked app dock item
   * @returns {void}
   */
  function handleAppDockClick(newView) {
    if (view === newView) return;

    view = newView;
    if (optionSoundOnSwitch) playSoundEffect(SoundEffect.boop);
  }
</script>

<svelte:head>
  <title>{APP_NAME}</title>
  {@html loadMetaTags(
    "/favicon.ico",
    "/icons/apple-touch-icon.png",
    "/site.webmanifest",
    true
  )}
  {@html loadGoogleFonts("Lato, Open Sans, Montserrat")}
  {@html loadAnalytics(GOOGLE_ANALYTICS, true)}
</svelte:head>

<div class="theme-doom-64 light flex w-full overflow-hidden flex-col h-screen">
  <main
    class="relative flex-1 overflow-y-auto text-lg {deviceInfo.isMobile
      ? 'mb-16'
      : ''}"
  >
    <div>
      {#each listDockApps as viewComponent}
        {@const AppViewComponent = viewComponent.component as any}
        <div
          style="position: relative; display: {viewComponent.id == view
            ? 'block'
            : 'none'}"
        >
          <AppViewComponent {user} />
        </div>
      {/each}
    </div>
  </main>
  <div
    class={deviceInfo.isMobile
      ? "fixed bottom-0 left-0 w-full z-10"
      : "absolute top-0 left-0 z-100 mt-16"}
  >
    <AppDockMenu {handleAppDockClick} {listDockApps} />
  </div>
</div>
