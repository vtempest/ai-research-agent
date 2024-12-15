<script>
  import { onMount } from "svelte";
  import TextEditor from "$lib/components/Editor/EditorMain.svelte";
  import FileSystem from "$lib/components/FileSystem/FileSystem.svelte";
  import Chat from "$lib/components/Chat/ChatMain.svelte";
  import SearchWeb from "$lib/components/SearchWeb/SearchMain.svelte";
  import Settings from "$lib/components/Settings/Settings.svelte";

  // Import icons
  import logoIcon from "$assets/icons/icon-logo.svg";
  import youtubeIcon from "$assets/icons/icon-youtube-debate.svg";
  import readIcon from "$assets/icons/icon-read.svg";
  import graphIcon from "$assets/icons/icon-graph.svg";
  import searchIcon from "$assets/icons/icon-searchresults.svg";
  import flowIcon from "$assets/icons/icon-flow.svg";
  import chatIcon from "$assets/icons/icon-chat.svg";
  import configureIcon from "$assets/icons/icon-configure.svg";
  import qwksearchIcon from "$assets/icons/icon-qwksearch.svg";
  import { writable } from 'svelte/store';

  const browser = typeof window !== "undefined";
  import { APP_NAME, GOOGLE_ANALYTICS } from "$lib/middleware/config";

  export let data;
  // State variables
  let activeView = "search";
  let activeFileId = null;
  let isMobileView = false;
  let isNavVisible = true;

  export const activeViewStore = writable('search');
  $: activeView = $activeViewStore;

  const isDebateMode = 0;
  // Navigation items configuration
  const navigationItems = isDebateMode
    ? [
        { id: "chat", icon: logoIcon, label: "Research" },
        { id: "shared", icon: searchIcon, label: "Discover Shared" },
        { id: "read", icon: readIcon, label: "Read" },
        { id: "documents", icon: graphIcon, label: "Organize" },
        { id: "flow", icon: flowIcon, label: "Flow" },
        { id: "videos", icon: youtubeIcon, label: "Watch" },
        // { id: 'configure', icon: configureIcon, label: 'Configure' },
      ]
    : [
        { id: "search", icon: qwksearchIcon, label: "Research" },
        { id: "read", icon: readIcon, label: "Read" },
        { id: "documents", icon: graphIcon, label: "Organize" },
        { id: "search", icon: configureIcon, label: "Configure" },
      ];

  function handleNavigationClick(id) {
    activeView = id;
    activeFileId = null;
    updateBrowserURL();
    // Remove this line to prevent collapsing on item click
    // if (isMobileView)
    //   isNavVisible = false;
  }

  function updateBrowserURL() {
    const url = activeFileId
      ? `#${activeView}/${activeFileId}`
      : `#${activeView}`;
    if (browser) {
      history.pushState(null, "", url);
    }
  }

  function parseURL() {
    if (browser) {
      const hash = window.location.hash.slice(1);
      const [view, id] = hash.split(/[/?]/);
      if (view) activeView = view;
      activeFileId = id || null;

      activeViewStore.set(activeView);


      console.log("view", activeView)
    }
  }

  function checkMobileView() {
    isMobileView = window.innerWidth < 768;
    // Keep isNavVisible true by default for both mobile and desktop
    isNavVisible = true;
  }

  function toggleNavigation() {
    isNavVisible = !isNavVisible;
  }

  onMount(() => {
    parseURL();
    checkMobileView();

    if (browser) {
      window.addEventListener("popstate", parseURL);
      window.addEventListener("resize", checkMobileView);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", `${GOOGLE_ANALYTICS}`);
    }

    return () => {
      if (browser) {
        window.user = window?.data?.user;
        window.removeEventListener("popstate", parseURL);
        window.removeEventListener("resize", checkMobileView);
      }
    };
  });
</script>

<svelte:head>
  <title>{APP_NAME}</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="//fonts.googleapis.com" />
  <link rel="preconnect" href="//fonts.gstatic.com" crossorigin="true" />
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

  <style>
    body {
      font-family: "Montserrat", "Lato", "Open Sans", Arial, sans-serif;
      font-size: 14px;
      font-weight: 400;
    }
  </style>

  {@html `<!-- Google Analytics -->
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS}" ✂prettier:content✂="CiAgICA=">{}</script>
    <script>
      
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', "${GOOGLE_ANALYTICS}" )
    </script>`}
</svelte:head>

<div class="flex h-[100dvh] w-full overflow-hidden">
  {#if isMobileView && !isNavVisible}
    <button
      on:click={toggleNavigation}
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
          on:click={toggleNavigation}
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
          on:click={() => handleNavigationClick(item.id)}
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
  {/if}

  <main
    class="flex-1 overflow-y-auto text-lg {isMobileView ? 'pb-[80px]' : ''}"
  >
    {#if activeView === "documents"}
      <FileSystem />
    {:else if activeView == "read"}
      <TextEditor />
    {:else if activeView === "configure"}
      <Settings />
    {:else if activeView === "chat"}
      <Chat />
    {:else if activeView === "search"}
      <SearchWeb />

      <!-- {:else if activeView === 'flow'}
      <Flow /> -->
      <!-- {:else if activeView === 'shared'}
      <SearchEvidence />
    {:else if activeView === 'videos'}
      <Videos /> -->
    {:else}
      <div class="p-6">
        <h1 class="text-3xl font-bold mb-4">
          {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
        </h1>
        <p class="text-xl">This is the {activeView} view.</p>
      </div>
    {/if}
  </main>
</div>

<style>
  body {
    font-family: "Montserrat", "Lato", "Open Sans", Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
  }
</style>
