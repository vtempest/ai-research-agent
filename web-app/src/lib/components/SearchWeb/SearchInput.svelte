<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { suggestNextWordCompletions } from "$ai-research-agent";
  import iconSearch from "$assets/icons/icon-qwksearch.svg";

  import {
    Search, // for "general"
    Newspaper, // for "news"
    Video, // for "videos"
    Image, // for "images"
    Beaker, // for "science"
    Monitor, // for "it"
    Files, // for "files"
    MessageCircle, // for "social+media"
    Map, // for "map"
    Music, // for "music"
  } from "lucide-svelte";

  export let handleSearchSubmit = (text) => {  };

  export let selectedCategory = "general";
  export let handleCategoryClick = null;
  export let phrasesModel = null;
  let searchText = "";
  let suggestions = [];
  let showSuggestions = false;
  let selectedIndex = -1;
  let isSearchOpen = false;
  
  const categories = [
    { code: "general", icon: Search, name: "General" },
    { code: "news", icon: Newspaper, name: "News" },
    { code: "videos", icon: Video, name: "Videos" },
    { code: "images", icon: Image, name: "Images" },
    { code: "science", icon: Beaker, name: "Academic" },
    { code: "files", icon: Files, name: "Files" },
    { code: "it", icon: Monitor, name: "Tech" },
    // { code: "social+media", icon: MessageCircle, name: "Forums" }
  ];

  $: if (searchText.length > 0) {
    querySuggestions();
  } else {
    suggestions = [];
    showSuggestions = false;
  }

  onMount(async () => {
    setTimeout(() => document.getElementById("searchInput").focus(), 100);
  });

  

  async function querySuggestions() {
    if (!phrasesModel) {
      return;
    }
    suggestions = await suggestNextWordCompletions(searchText, {
      phrasesModel,
      limit: 10,
    });
    if (!suggestions) return;

    var words = searchText.trim().split(/\W+/);
    var name;
    suggestions = suggestions
      .map((s) => {
        if (s.word) name = words.slice(0, -1).join(" ") + " " + s.word;
        if (s.phrase) {
          name =
            words
              .join(" ")
              .slice(0, words.join(" ").lastIndexOf(s.phrase.split(" ")[0])) +
            " " +
            s.phrase;
        }
        return { name };
      })
      .filter(Boolean);

    showSuggestions = suggestions.length > 0;
    selectedIndex = -1;
  }


  function handleKeydown(event) {
    switch (event.key) {
      case "ArrowDown":
        if (!showSuggestions) return;

        event.preventDefault();
        selectedIndex =
          selectedIndex === -1 ? 0 : (selectedIndex + 1) % suggestions.length;
        break;
      case "ArrowUp":
        if (!showSuggestions) return;

        event.preventDefault();
        if (selectedIndex === -1) return;
        selectedIndex =
          selectedIndex === 0 ? suggestions.length - 1 : selectedIndex - 1;
        break;
      case "Enter":
        if (selectedIndex !== -1) {
          selectSuggestion(suggestions[selectedIndex]);
        } else {
          handleSearchSubmit(searchText);
          isSearchOpen = false;
        }
        break;
      case "Escape":
        showSuggestions = false;
        isSearchOpen = false;
        break;
    }
  }

  function selectSuggestion(suggestion) {
    searchText = suggestion.name;
    showSuggestions = false;
    isSearchOpen = false; // Close the full-page input after selecting a suggestion
    handleSearchSubmit(searchText);
    console.log("Selected:", searchText);
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

  function handleBlurFullPage() {
    setTimeout(() => {
      showSuggestions = false;
      isSearchOpen = false;
    }, 200);
  }

  function openFullPageSearch() {
    isSearchOpen = true;
    setTimeout(
      () => document.getElementById("searchInputFullScreen").focus(),
      100
    );
  }

  function handleIconClick() {
    if (searchText.trim() === "") {
      openFullPageSearch();
    } else {
      handleSearchSubmit(searchText);
    }
  }
</script>

<div class="container">
  <div class="search-container">
    <input
      id="searchInput"
      type="text"
      bind:value={searchText}
      on:input={querySuggestions}
      on:keydown={handleKeydown}
      on:blur={handleBlur}
      on:focus={openFullPageSearch}
      on:pointerdown={openFullPageSearch}
      on:touchstart={openFullPageSearch}
      on:mousedown={openFullPageSearch}
      placeholder="Search..."
      class="search-input"
      autofocus
    />
    <button class="search-button" on:click={handleIconClick}>
      <img
        src={iconSearch}
        alt="Search"
        class="w-7 h-7 mb-0 transition-opacity duration-200"
      />
    </button>

    {#if showSuggestions && !isSearchOpen}
      <ul class="suggestions-list">
        {#each suggestions as suggestion, index}
          <li
            class="suggestion-item"
            class:highlighted={index === selectedIndex}
            on:mousedown={() => selectSuggestion(suggestion)}
          >
            {suggestion.name}
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if isSearchOpen}
    <div
      transition:fade={{ duration: 300, easing: quintOut }}
      class="search-overlay"
    >
      <div class="search-modal" style="max-height: 100vh; overflow: visible;">
        <div class="categories-row" style="display: flex; font-size: smaller;">
          {#each categories as category (category.name)}
          <div
          class="group relative grid overflow-hidden rounded-full px-1 py-1 cursor-pointer
         ${category.code === selectedCategory ? 
            "  shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] " : ""} transition-colors duration-200"
        >
          <span>
            <span
              class="spark mask-gradient animate-flip before:animate-kitrotate absolute inset-0
               h-[100%] w-[100%] overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] 
               before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg]
                before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] 
                before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]"
            />
          </span>
          <span
            class="backdrop absolute inset-px rounded-full   ${category.code === selectedCategory ? 
            "bg-neutral-950" : ""}  transition-colors duration-200"
          />
          <span class="z-10 text-neutral-400 text-xs font-medium flex items-center"
              on:click={() => handleCategoryClick(category)}
            >
              <svelte:component this={category.icon} class="mb-1 mr-1 w-4 h-4" style="display: inline-block; vertical-align: middle;" /> 
              {category.name}
            </span>
            </div>
          {/each}
        </div>
        <div class="relative">
          <div class="absolute top-0 flex w-full justify-center">
            <div
              class="h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000"
            />
          </div>
          <div class="relative">
            <div class="absolute top-0 flex w-full justify-center">
              <div
                class="h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000"
              />
            </div>
            <input
            class="border-2 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)] bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none "
             
          id="searchInputFullScreen"
          type="text"
          bind:value={searchText}
          on:input={querySuggestions}
          on:keydown={handleKeydown}
          on:blur={() => {
            handleBlurFullPage();
          }}
        />
        </div>

      </div>

      
        {#if showSuggestions}
          <ul class="suggestions-list full-page-suggestions" style="position: absolute; top: 100%; left: 0; right: 0;">
            {#each suggestions as suggestion, index}
              <li
                class="suggestion-item"
                class:highlighted={index === selectedIndex}
                on:mousedown={() => selectSuggestion(suggestion)}
              >
                {suggestion.name}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
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
    flex-shrink: 0;
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
    flex-grow: 1;
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
