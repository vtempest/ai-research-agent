<script lang="ts">
  import Particles, { particlesInit } from '@tsparticles/svelte';
  import { loadSlim } from '@tsparticles/slim';
  import { Card, CardContent } from "$lib/components/ui/card";
  
  import "./icons-download.css";

  import QuantumWaveOrbital from './QuantumWaveOrbital.svelte';
  import particlesConfig from './particlesConfig.js';
  import { Bot, Globe, SwatchBook, Pencil, BadgePercent } from 'lucide-svelte';
  import { onMount } from "svelte";
  import LoginButton from "./LoginButton.svelte"
  import Footer from "./Footer.svelte"
  import {getGreeting, getBackground} from "./home-extras.js"
  import * as Select from "$lib/components/ui/select";

  export let handleSearchSubmit = (searchText) => { 
    window.location.href = `/#search/?q=${encodeURIComponent(searchText)}`;
    showSuggestions = false;
   };

  export let selectedCategory = "general";
  export let handleCategoryClick = null;
  export let phrasesModel = null;
  export let searchText = "";

  let particlesContainer;
  let suggestions: string[] = [];
  let showSuggestions = false;
  let selectedIndex = -1;
  let user = null;

  $: if (searchText.length > 0) {
  } else {
    suggestions = [];
    showSuggestions = false;
  }

  onMount( async () => {
    if (typeof window !== 'undefined') 
      user = window?.data?.user;

    // Initialize particles
    try{
      await particlesInit(particlesConfig);
    }catch(e){ }
  });


  
  let onParticlesLoaded = (event) => {
    particlesContainer = event.detail.particles;
  };

  void particlesInit(async (engine) => {
    try{ 
      await loadSlim(engine);
    }catch(e){ }

  });
  function handleMouseMove(event: MouseEvent) {
    try{
      if (particlesContainer && particlesContainer.addParticle) {
      particlesContainer.addParticle({
        x: event.clientX,
        y: event.clientY
      });
    }
  }catch(e){ }
  }
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
    event.preventDefault();
    handleSearchSubmit(searchText);
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
          handleSearchSubmit(searchText);
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
    handleSearchSubmit(searchText);
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

  function handleFocusModeChange(event) {
    setFocusMode(event.value);
  }

  
</script>
<div class="relative h-screen w-full overflow-hidden">
  <img
    src={getBackground()}
    class="absolute inset-0 w-full h-full object-cover"
    alt="Background"
  />

  <div class="absolute inset-0 bg-black bg-opacity-50"></div>

  <Particles
    on:mousemove={handleMouseMove}
    id="tsparticles"
    options={particlesConfig}
    on:particlesLoaded={onParticlesLoaded}
    class="absolute inset-0"
  />
  <div class="relative z-10 h-screen flex flex-col items-center justify-center text-white text-center px-2 sm:px-4">
    <Card class="w-full max-w-[320px] xs:max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] bg-opacity-30 border-none">
      <CardContent >
        <div  class="mb-11" >
        <QuantumWaveOrbital />
        </div>
        {#if user}
          <div class="text-sm xs:text-base sm:text-xl mt-2 mb-2 sm:mb-4 text-slate-300">
            {getGreeting()}, {user?.name?.split(" ")[0]}
          </div>
        {/if}

        <div class="flex flex-col items-start justify-between">
          <div class="w-full">
            <div class="search-container flex flex-col sm:flex-row items-center bg-slate-200 rounded-lg overflow-hidden shadow-lg">
              <input
                autofocus
                type="text"
                bind:value={searchText}
                on:keydown={handleKeydown}
                on:blur={handleBlur}
                placeholder="What are you curious to research?"
                class="search-input w-full px-2 sm:px-3 py-2 text-xs sm:text-sm text-black bg-transparent focus:outline-none rounded-lg"
              />
              <div class="w-full sm:w-auto flex items-center justify-between sm:justify-start mt-1 sm:mt-0 px-2 py-1 sm:py-0">
                <Select.Root 
                  onSelectedChange={handleFocusModeChange}
                >
                  <div class="w-[100px] sm:w-[105px]">
                    <Select.Trigger 
                      class="w-full appearance-none bg-transparent sm:border-l border-gray-300 p-1 focus:outline-none text-black text-xs sm:text-sm rounded-lg"
                    >
                      <!-- <Select.Value placeholder={selectedFocusMode.label} /> -->
                    </Select.Trigger>
                  <Select.Content class="bg-white shadow-md">
                    <Select.Group>
                     
                    </Select.Group>
                  </Select.Content>

                </Select.Root >
                
                <div class="relative flex-grow sm:ml-2">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg sm:rounded-r-lg sm:rounded-l-none animate-gradient"></div>
                  <button
                    on:click={() => handleSearchSubmit(searchText)}
                    class="search-button relative text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none transition duration-300 w-full flex items-center justify-center overflow-hidden"
                  >
                    <span class="relative z-10 flex items-center text-xs sm:text-sm">
                      <Bot size={14} class="mr-1" />
                      Ask AI
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            {#if searchText}
              <button class="clear-button absolute right-4 sm:right-6 top-2 text-gray-500 px-1 text-xs" on:click={clearSearch}> ✕ </button>
            {/if}
            
            {#if showSuggestions}
              <ul class="suggestions-list absolute bg-white text-black rounded-lg shadow-lg mt-1 w-full max-w-[320px] xs:max-w-[400px] sm:max-w-[500px] z-10">
                {#each suggestions as suggestion, index}
                  <li
                    class="suggestion-item px-2 py-1 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm"
                    class:bg-gray-200={index === selectedIndex}
                    on:mousedown={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </li>
                {/each}
              </ul>
            {/if}

            {#if !user}
              <div class="mt-2 sm:mt-4">
                <div class="relative inline-block" >
                  <div class="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-400 via-green-400 via-blue-500 via-purple-500 to-pink-500 rounded-lg animate-gradient"></div>
                  <LoginButton class="relative z-10" />
                </div>
              </div>
            {/if}
            <p class="text-lg text-gray-500 text-center justify-center mt-4">
              <a
                class="download-chrome download-btn text-center justify-center"
                target="_blank"
                href="https://chromewebstore.google.com/detail/tab-manager-ai/manhemnhmipdhdpabojcplebckhckeko"
              >
              </a>
      
              <a
                class="download-windows download-btn text-center justify-center"
                target="_blank"
                href="https://apps.microsoft.com/detail/9pcgf9gnk460?rtc=1&hl=en-us&gl=US"
              >
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <Footer />
</div>
