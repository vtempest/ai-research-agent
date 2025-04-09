<script lang="ts">
  import { onMount, tick } from "svelte";
  import TextEditor from "$lib/components/Editor/EditorMain.svelte";
  import FileSystem from "$lib/components/FileSystem/F2.svelte";
  import Settings from "$lib/components/Settings/Settings.svelte";
  import SearchWeb from "$lib/components/SearchWeb/SearchMain.svelte";
  import AppDockMenu from "./AppDockMenu.svelte";
  import { page } from "$app/stores";
  import { pushState } from "$app/navigation";
  import { writable } from "svelte/store";
	import { playSoundEffect, SoundEffect } from "$lib/components/AppLayout/sound-effects";

  // Import icons
  import logoIcon from "$lib/components/icons/icon-logo.svg";
  import youtubeIcon from "$lib/components/icons/icon-youtube-debate.svg";
  import filesIcon from "$lib/components/icons/icon-files.svg";
  import readIcon from "$lib/components/icons/icon-read.svg";
  import graphIcon from "$lib/components/icons/icon-graph.svg";
  import searchIcon from "$lib/components/icons/icon-searchresults.svg";
  import flowIcon from "$lib/components/icons/icon-flow.svg";
  import chatIcon from "$lib/components/icons/icon-chat.svg";
  import organizeIcon from "$lib/components/icons/icon-organize.svg";
  import configureIcon from "$lib/components/icons/icon-configure.svg";
  import qwksearchIcon from "$lib/components/icons/icon-qwksearch.svg";

  import {
    APP_NAME,
    GOOGLE_ANALYTICS,
    PUBLIC_DOMAIN,
    FOOTER_LINKS,
    PUBLIC_GOOGLE_CLIENT_ID,
  } from "$lib/custom-domain";

  import { displayGoogleOneTapLogin } from "$lib/components/AppLayout/auth-google-one-tap";

  const browser = typeof window !== "undefined";



  let user: OAuthUserInfo = null;

  // State variables
  let activeView = $state("search");
  let activeFileId = null;
  let isMobileView = $state(false); // default to false;

  // Navigation items configuration
  const listDockApps = [
    {
      id: "search",
      icon: qwksearchIcon,
      component: SearchWeb,
    },
    {
      id: "read",
      icon: readIcon,
      component: TextEditor,
    },
    {
      id: "documents",
      icon: filesIcon,
      component: FileSystem,
      disabled: true

    },
    { id: "settings", 
      icon: configureIcon, 
      component: Settings,
      label: "Configure",
      disabled: true
    },
  ].filter(item => !item.disabled);

  onMount(async () => {
    if (typeof window === "undefined") return;

    user = $page.data.session?.user;

    // parseURL();

    checkMobileView();

    window.addEventListener("popstate", parseURL);
    window.addEventListener("resize", checkMobileView);

    if (!user) {
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
   * Adds the search query to the URL so that the state
   * of the search is preserved in a sharable URL.
   * @param {string} key - The key to add to the URL
   * @param {string} value - The value to add to the URL
   */
   function updateURL(key, value) {
    if (!browser) return;
    const url = new URL(document?.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState({}, "", url);
  }

  function handleAppDockClick(id) {
    activeView = id;
    playSoundEffect(SoundEffect.boop)
    updateURL("view", id);
  }


  function parseURL() {
    if (!browser) return;
    const url = new URL(window.location.href);
    const view = url.searchParams.get("view");
    if (view) activeView = view;
  }

  function checkMobileView() {
    isMobileView = window.innerWidth < 768;
    // Keep isNavVisible true by default for both mobile and desktop
    // isNavVisible = true;
  }
</script>

<svelte:head>
  <title>{APP_NAME}</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="//fonts.googleapis.com" />
  <link rel="preconnect" href="//fonts.gstatic.com" crossorigin="" />
  <link
    href="//fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="//fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="//fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
    rel="stylesheet"
  />

  <!-- Google Analytics -->
  {#if GOOGLE_ANALYTICS}
    {@html `
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS}" ✂prettier:content✂="CiAgICA=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script>
    <script>
      
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', "${GOOGLE_ANALYTICS}" )
    </script>`}
  {/if}

  <!-- SimpleAnalytics.com -->
  <script
    async
    defer
    src="https://scripts.simpleanalyticscdn.com/latest.js"
  ></script>
</svelte:head>


<div class="flex w-full overflow-hidden">
  <!-- {#if isMobileView && !isNavVisible}
    <button
      onclick={toggleNavigation}
      class="fixed bottom-4 right-4 z-50 bg-[#E8E5D8] p-2 rounded-full shadow-lg"
    >
      <svg
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  {/if}

  {#if !isMobileView || isNavVisible}
    <nav
      class="{isMobileView
        ? 'w-full h-[80px] fixed bottom-0 left-0 z-50 rounded-[15px]  shadow-xl '
        : 'w-[80px] max-w-[80px] h-full'} bg-[#E8E5D8] flex {isMobileView
        ? 'flex-row'
        : 'flex-col'} items-center justify-around py-4 {isMobileView
        ? ''
        : 'rounded-tr-[15px] rounded-br-[15px]'} overflow-y-auto"
    >
      {#if isMobileView}
        <button
          onclick={toggleNavigation}
          class="absolute top-2 right-2 hover:shadow-xl hover:-translate-y-1 text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      {/if}
      {#each navigationItems as item}
        <button
          onclick={() => handleNavigationClick(item.id)}
          class="flex flex-col items-center justify-center {isMobileView
            ? 'w-auto'
            : 'w-full'} transition-colors duration-200"
        >
          <img
            src={item.icon}
            alt={item.label}
            class="w-10 h-10 mb-0 transition-opacity duration-200 {activeView ===
            item.id
              ? 'opacity-100'
              : 'opacity-60 hover:opacity-100'}"
          />
          {#if !isMobileView}
            <span
              class="text-sm text-center transition-colors duration-200 {activeView ===
              item.id
                ? 'text-[#D2691E] font-semibold'
                : 'text-gray-700 hover:text-[#D2691E]'}"
            >
              {item.label}
            </span>
          {/if}
        </button>
      {/each}
    </nav>
  {/if} -->

  <main class="flex-1 overflow-y-auto text-lg {isMobileView ? ' ' : ''}">
    <div
      style="position: absolute; top: 0; left: 0; z-index: 100; margin-top: 4rem;"
    >
      <AppDockMenu {handleAppDockClick} {listDockApps} />
    </div>

    {#each listDockApps as view (view.id)}
      {@const AppViewComponent = view.component}
      <div style="display: {view.id == activeView ? 'block' : 'none'}">
        <AppViewComponent />
      </div>
    {/each}
  </main>
</div>

