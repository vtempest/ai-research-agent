<script lang="ts">
  import { iconGoogle } from "$lib/components/icons";
  import QuantumWaveOrbital from "./extras/QuantumWaveOrbital.svelte";
  import { onMount } from "svelte";
  import { getGreeting, getBackgroundArtwork } from "./extras/home-extras.js";
  import Footer from "$lib/components/AppLayout/Footer.svelte";
  import { setupMobileView } from "$lib/components/utils";
  import "./extras/icons-download.css";
  import { authClient } from "$lib/components/utils/auth-client";

  import {
    listFooterLinks,
    DOWNLOAD_CHROME_URL,
    DOWNLOAD_WINDOWS_URL_NATIVE,
    DOWNLOAD_WINDOWS_URL,
    APP_NAME,
    APP_SLOGAN,
  } from "$lib/customize-site.js";


  let {
    user = null,
    handleSearchSubmit = () => {},
    selectedCategory = "general",
    handleCategoryClick = null,
    phrasesModel = null,
    searchText = "",
    updateSearchText = () => {},
  } = $props();

  let suggestions: string[] = $state([]);
  let showSuggestions = $state(false);
  let selectedIndex = $state(-1);
  let introSearchPlaceholder = $state("What are you curious to research?");
  let searchInputElement = null;
  let deviceInfo = $state({} as any);

  $effect(() => {
    if (searchText.length > 0) {
      showSuggestions = true;
    } else {
      suggestions = [];
      showSuggestions = false;
    }
  });

  onMount(async () => {
    if (typeof window === "undefined") return;



    // Focus search input on mount
    if (searchInputElement) {
      searchInputElement.focus();
    }
    setupMobileView(deviceInfo);

    // Get user's OS and set appropriate keyboard shortcut
    const shortcutKey = deviceInfo.os === "Mac" ? "⌘" : "Ctrl";
    introSearchPlaceholder = `What are you curious to research? (${shortcutKey} + K)`;
  });

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      updateSearchText(searchText);
      handleSearchSubmit();
    }

    // if (!showSuggestions) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        selectedIndex = (selectedIndex + 1) % suggestions.length;
        break;
      case "ArrowUp":
        event.preventDefault();
        selectedIndex =
          (selectedIndex - 1 + suggestions.length) % suggestions.length;
        break;
      case "Enter":
        event.preventDefault();
        // if (selectedIndex !== -1) {
        //   selectSuggestion(suggestions[selectedIndex]);
        // } else {
        handleSearchSubmit();
        // }
        break;
      case "Escape":
        showSuggestions = false;
        break;
    }
  }

  function selectSuggestion(suggestion: string) {
    searchText = suggestion;
    showSuggestions = false;
    updateSearchText(searchText);
    handleSearchSubmit();
  }

  function clearSearch() {
    searchText = "";
    suggestions = [];
    showSuggestions = false;
  }

  function handleBlur() {
    setTimeout(() => {
      showSuggestions = false;
    }, 200);
  }
</script>

<div
  class="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
>
  {#if typeof window !== "undefined"}
    <img
      class="absolute z-5 inset-0 w-full h-full object-cover"
      src={getBackgroundArtwork()}
      alt="Background"
    />
  {/if}

  <div class="absolute z-3 inset-0 bg-black bg-opacity-50"></div>

  <div
    class="relative z-10 h-screen flex flex-col items-center justify-center text-white text-center px-2 sm:px-4"
  >
    <div
      class="bg-transparent w-full max-w-[320px] xs:max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] bg-opacity-30 border-none"
    >
      <div class="bg-transparent mb-11">
        <QuantumWaveOrbital />
        <div
          class="text-sm xs:text-base sm:text-xl mt-2 mb-1 sm:mb-1 text-slate-300 [text-shadow:_0_2px_4px_rgba(0,0,0,0.5),0_0_2px_rgba(0,0,0,0.8)] font-bold tracking-wide rounded-lg px-4 py-2"
        >
          {#if user?.name}
            {getGreeting()}, {user?.name?.split(" ")[0]}
          {:else if user?.isLoading}
            <div class="pb-10"></div>
          {:else }
            {APP_SLOGAN}
          {/if}
        </div>

        <div class="flex flex-row items-start justify-between">
          <div class="w-full">
            <div
              class="search-container flex flex-row items-center bg-slate-200 rounded-lg overflow-hidden shadow-lg p-0 m-0"
            >
              <input
                bind:this={searchInputElement}
                id="main-search-input"
                bind:value={searchText}
                onkeydown={handleKeydown}
                onblur={handleBlur}
                placeholder={introSearchPlaceholder}
                class="search-input w-full py-0 sm:px-3 text-xs sm:text-sm text-black bg-transparent focus:outline-hidden rounded-lg"
              />
            </div>

            {#if searchText}
              <button
                class="clear-button absolute right-4 sm:right-6 top-2 text-gray-500 text-xs p-0 m-0 w-full h-full"
                onclick={clearSearch}
              >
                ✕
              </button>
            {/if}

            {#if showSuggestions}
              <ul
                class="suggestions-list full-page-suggestions"
                style="position: absolute; top: 100%; left: 0; right: 0;"
              >
                {#each suggestions as suggestion, index}
                  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
                  <div
                    class="suggestion-item"
                    class:highlighted={index === selectedIndex}
                    onmousedown={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </div>
                {/each}
              </ul>
            {/if}

            {#if !user?.name && !user?.isLoading}
              <div class="mt-2 sm:mt-4">
                <div class="relative inline-block">
                  <div
                    class="absolute inset-0 bg-linear-to-r from-red-500 via-orange-500 via-yellow-400 via-green-400 via-blue-500 via-purple-500 to-pink-500 rounded-lg animate-gradient"
                  ></div>
                  <!-- onclick={() => (window.location.href = "/signin")} -->

                  <button
                    onclick={async () => {
                      await authClient.signIn.social({
                        provider: "google",
                        callbackURL: "/",
                      });
                    }}
                    class="text-gray-700 relative px-4 py-2 rounded-lg m-[2px] flex items-center justify-center gap-2 hover:bg-gray-100"
                  >
                    <span class="w-8 h-8 flex items-center justify-center"
                      >{@html iconGoogle()}</span
                    >
                    Login
                  </button>
                </div>
              </div>
            {/if}
            <p class="text-lg text-gray-500 text-center justify-center mt-4">
              <a
                aria-label="Chrome Web Store"
                class="download-chrome download-btn text-center justify-center"
                target="_blank"
                href={DOWNLOAD_CHROME_URL}
              >
              </a>

              <a
                aria-label="Microsoft Store"
                class="download-windows download-btn text-center justify-center"
                target="_blank"
                href={deviceInfo.os == "Windows"
                  ? DOWNLOAD_WINDOWS_URL_NATIVE
                  : DOWNLOAD_WINDOWS_URL}
              >
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="w-full max-w-[320px] xs:max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px]"
  >
    <Footer {listFooterLinks} optionShowIcons={true} />
  </div>
</div>

<style>
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  .animate-gradient {
    background-size: 800% 800%;
    animation: gradient 15s ease infinite;
  }

  button {
    cursor: pointer;
  }

  .suggestions-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 150px;
    background-color: white;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    max-height: 200px;
    overflow-y: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
    z-index: 10;
  }

  .suggestion-item {
    padding: 10px;
    cursor: pointer;
    color: black;
    text-align: left;
  }

  .suggestion-item:hover,
  .suggestion-item.selected {
    background-color: #f0f0f0;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  /* Add styles for the legal links to ensure they're clickable */
  .absolute.bottom-4.right-4 {
    pointer-events: auto;
  }

  .suggestion-item {
    padding: 5px 10px;
    cursor: pointer;
  }

  .suggestion-item.highlighted {
    background-color: #f0f0f0;
  }

  .search-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-button {
    padding: 8px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    color: #333;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    shrink: 0;
  }

  .search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 100px;
    z-index: 1000;
  }

  .search-modal {
    width: 80%;
    max-width: 600px;
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 16px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.9);
    grow: 1;
    margin-right: 10px;
  }

  .search-input::placeholder {
    color: #999;
  }

  .suggestions-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1001;
  }

  .full-page-suggestions {
    z-index: 1002;
  }
</style>
