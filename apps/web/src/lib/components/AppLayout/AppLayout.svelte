<script lang="ts">
/** 
## TODO
- sidebar
- mobile view with chat, and popup browser
- docs working
- mind map
- themes
- mobile launch

*/

  import { onMount } from "svelte";
  // import {themeNames} from "./Theme.svelte";
  import "./themes-shadcn.css";
  // src/lib/stores/theme.ts
  import { writable } from "svelte/store";

  import { listDockApps } from "./AppDockViews.svelte";
  import AppDockMenu from "./AppDockMenu.svelte";
  import {
    setupMobileView,
    setStateInURL,
    loadHeadTags,
    type DeviceInfo,
    // @ts-ignore
  } from "$components/utils";
  import { log, grab } from "grab-url";
  import {
    APP_NAME,
    GOOGLE_ANALYTICS,
    APP_SLOGAN,
    SERVER_API_URL,
  } from "$lib/customize-site";

  import { authClient } from "$lib/components/utils/auth-client";

  import { playSoundEffect } from "$lib/components/AppLayout/sound-effects";
  // import { displayGoogleOneTapLogin } from "$lib/components/AppLayout/auth-google-one-tap";

  export const theme = writable("modern-minimal"); // default theme

  // State variables
  let optionSoundOnSwitch = $state(true);
  let view = $state(null);
  let user: User = $state({});
  let deviceInfo: DeviceInfo = $state({}); // default to false;

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
      cache: false,
      cancelNewIfOngoing: true,
    });

    // get the view from the URL or default to the first app
    view = setStateInURL().view || view;
    // listen to mobile view changes
    setupMobileView(deviceInfo);

    // get user from server
    await loadUser();

    if (!user?.name) {
      await authClient.oneTap({
        fetchOptions: {
          onSuccess: loadUser,
        },
      });
    }
  });

  const loadUser = async () => await grab("user", { response: user });

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
    if (optionSoundOnSwitch) playSoundEffect("boop");
  }
</script>

<svelte:head>
  {@html loadHeadTags({
    title: APP_NAME + " - " + APP_SLOGAN,
    faviconPath: "/favicon.ico",
    androidManifest: "/site.webmanifest",
    appleIcon: "/icons/apple-touch-icon.png",
    fonts: "Lato, Open Sans, Montserrat",
    googleAnalyticsId: GOOGLE_ANALYTICS,
    simpleAnalytics: true,
    addMobileViewport: true,
    shouldAppend: false,
  })}
</svelte:head>

<div class="theme-doom-64 light flex w-full overflow-hidden flex-col h-screen">
  <main
    class="relative flex-1 overflow-y-auto text-lg {deviceInfo?.isMobile
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
    class={deviceInfo?.isMobile
      ? "fixed bottom-0 left-0 w-full z-10"
      : "absolute top-0 left-0 z-100 mt-16"}
  >
    <AppDockMenu {handleAppDockClick} {listDockApps} />
  </div>
</div>
