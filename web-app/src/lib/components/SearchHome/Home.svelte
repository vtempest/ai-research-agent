<script lang="ts">
  // import {page} from "$app/stores";
  import { Card, CardContent } from "$lib/components/ui/card";
  import GoogleIcon from "$lib/components/icons/icon-google.svg";
  import QuantumWaveOrbital from './QuantumWaveOrbital.svelte';
  import { Bot, Globe, SwatchBook, Pencil, BadgePercent } from 'lucide-svelte';
  import { onMount } from "svelte";
  import {getGreeting, getBackground} from "./home-extras.js"
  import Footer from "$lib/components/AppLayout/Footer.svelte";
  import { FOOTER_LINKS } from "$lib/custom-domain";
  import { getUserDeviceOS } from "$lib/utils";
  import "./icons-download.css";
  
  import { APP_NAME, APP_SLOGAN } from "$lib/custom-domain";
  let {
    handleSearchSubmit = () => {  }, 
    selectedCategory = "general",
    handleCategoryClick = null,
    phrasesModel = null,
    searchText = "", 
    updateSearchText = () => {  },
  } = $props();

  let suggestions: string[] = $state([]);
  let showSuggestions = $state(false);
  let selectedIndex = $state(-1);
  let user =  $state(null);
  let introSearchPlaceholder = "What are you curious to research?";
  
  $effect(() => {
    if (searchText.length > 0) {
      showSuggestions = true;
    } else {
      suggestions = [];
      showSuggestions = false;
    }
  })

  onMount( async () => {
    if (typeof window === 'undefined') 
      return;

    // user = $page.data.session?.user;
  });


  function handleKeydown(event: KeyboardEvent) {
    
    if (event.key === 'Enter') {
    event.preventDefault();
    updateSearchText(searchText)
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
        selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
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
    updateSearchText(searchText)
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


<svelte:head>
  <title>{APP_NAME} - {APP_SLOGAN}</title>
</svelte:head>


<div
  class="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
>
 
  
  {#if typeof window !== "undefined"}
    <img
    class="absolute  z-5 inset-0 w-full h-full object-cover" 
    src={getBackground()}
      alt="Background"
    />
  {/if}

  <div class="absolute  z-3 inset-0 bg-black bg-opacity-50"></div>

  <div class="relative z-10 h-screen flex flex-col items-center justify-center text-white text-center px-2 sm:px-4">
    
  <Card class="bg-transparent w-full max-w-[320px] xs:max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] bg-opacity-30 border-none">
      <CardContent >
        <div class="bg-transparent mb-11" >
        <QuantumWaveOrbital />
        <div class="text-sm xs:text-base sm:text-xl mt-2 mb-2 sm:mb-4 text-slate-300">

        {#if user}
            {getGreeting()}, {user?.name?.split(" ")[0]}
        {:else}
          { APP_SLOGAN }
        {/if}
      </div>

        <div class="flex flex-col items-start justify-between">
          <div class="w-full">
            <div class="search-container flex flex-col sm:flex-row items-center bg-slate-200 rounded-lg overflow-hidden shadow-lg">
              <input
                autofocus
                type="text"
                bind:value={searchText}
                onkeydown={handleKeydown}
                onblur={handleBlur}
                placeholder="{introSearchPlaceholder}"
                class="search-input w-full py-0 sm:px-3 text-xs sm:text-sm text-black bg-transparent focus:outline-hidden rounded-lg"
              />
              <div class="w-full sm:w-auto flex items-center justify-between sm:justify-start mt-1 sm:mt-0  py-1 sm:py-0">
                <!-- <Select.Root 
                >
                  <div class="w-[100px] sm:w-[105px]">
                    <Select.Trigger 
                      class="w-full appearance-none bg-transparent sm:border-l border-gray-300 p-1 focus:outline-hidden text-black text-xs sm:text-sm rounded-lg"
                    >
                  <Select.Content class="bg-white shadow-md">
                    <Select.Group>
                     
                    </Select.Group>
                  </Select.Content>

                </Select.Root > -->
                
                <div class="relative grow py-3  sm:ml-2">
                  <div class="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg sm:rounded-r-lg sm:rounded-l-none animate-gradient"></div>
                  <button
                    onclick={() => { updateSearchText(searchText); handleSearchSubmit() }}
                    class="search-button relative text-white px-3   sm:px-4 sm:py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none transition duration-300 w-full flex items-center justify-center overflow-hidden"
                  >
                    <span        
                      class="relative z-10 flex items-center text-xs sm:text-sm">
                      <Bot size={14} class="mr-1" />
                      Ask
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            {#if searchText}
              <button class="clear-button absolute right-4 sm:right-6 top-2 text-gray-500 px-1 text-xs" onclick={clearSearch}> ✕ </button>
            {/if}
            
            {#if showSuggestions}
              <ul class="suggestions-list absolute bg-white text-black rounded-lg shadow-lg mt-1 w-full max-w-[320px] xs:max-w-[400px] sm:max-w-[500px] z-10">
                {#each suggestions as suggestion, index}

                  <div 
                    role="option" 
                    aria-selected={index === selectedIndex} tabindex={index === selectedIndex ? 0 : -1}
                    class="suggestion-item px-2 py-1 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm"
                    class:bg-gray-200={index === selectedIndex}
                    onmousedown={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </div>
                {/each}
              </ul>
            {/if}

            {#if !user}
              <div class="mt-2 sm:mt-4">
                <div class="relative inline-block" >
                  <div class="absolute inset-0 bg-linear-to-r from-red-500 via-orange-500 via-yellow-400 via-green-400 via-blue-500 via-purple-500 to-pink-500 rounded-lg animate-gradient"></div>

                  <button
                  onclick={()=>window.location.href = "/signin"}
                  class=" text-gray-700 relative px-4 py-2 rounded-lg m-[2px] flex items-center justify-center gap-2 hover:bg-gray-100"
                >
                  <img
                      src={GoogleIcon}
                      class="h-8 w-10"
                      alt="Login"
                    />
                  Login
                </button>

              </div>
              </div>
            {/if}
            <p class="text-lg text-gray-500 text-center justify-center mt-4">
              <a aria-label="Chrome Web Store"
                class="download-chrome download-btn text-center justify-center"
                target="_blank"
                href="https://chromewebstore.google.com/detail/tab-manager-ai/manhemnhmipdhdpabojcplebckhckeko"
              >
              </a>
      
              <a aria-label="Microsoft Store"
                class="download-windows download-btn text-center justify-center"
                target="_blank"
                href={getUserDeviceOS() == 'Windows' ? 'ms-windows-store://pdp/?productid=9PCGF9GNK460' : `https://apps.microsoft.com/detail/9pcgf9gnk460?rtc=1&hl=en-us&gl=US`}
              >
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <Footer listFooterLinks={FOOTER_LINKS} />
</div>
