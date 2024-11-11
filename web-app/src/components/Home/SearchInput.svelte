<script>
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import {suggestNextWordCompletions} from "$airesearchagent";
  import iconSearch from "$lib/icons/icon-search.svg"

  export let phrasesModel = null;
  export let searchText = "";
  let suggestions = [];
  let showSuggestions = false;
  let selectedIndex = -1;
  let isSearchOpen = false;

  $: if (searchText.length > 0) {
    querySuggestions();
  } else {
    suggestions = [];
    showSuggestions = false;
  }



  onMount(async () => {
    
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
 
  });


  async function querySuggestions() {
    if (!phrasesModel) {
      console.error("Wait. Phrase model not loaded");
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
        selectedIndex = selectedIndex === -1 ? 0 : (selectedIndex + 1) % suggestions.length;
        break;
      case "ArrowUp":
        if (!showSuggestions) return;

        event.preventDefault();
        if (selectedIndex === -1) return;
        selectedIndex = selectedIndex === 0 ? suggestions.length - 1 : selectedIndex - 1;
        break;
      case "Enter":
        if (selectedIndex !== -1) {
          selectSuggestion(suggestions[selectedIndex]);
        } else {
          handleSubmit(searchText);
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
    handleSubmit(searchText);
    console.log("Selected:", searchText);
  }

  function clearSearch() {
    searchText = "";
    suggestions = [];
    showSuggestions = false;
  }

  export let handleSubmit = (text) => {
    
    // Close the full-page input when submitting a search
    isSearchOpen = false;
  };

  function handleBlur() {
    setTimeout(() => {
      showSuggestions = false;
    }, 200);
  }

  function openFullPageSearch() {
    isSearchOpen = true;
    setTimeout(() => document.getElementById('searchInputFullScreen').focus(), 100);
  }

  function handleIconClick() {
    if (searchText.trim() === "") {
      openFullPageSearch();
    } else {
      handleSubmit(searchText);
    }
  }
</script>

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
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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
      placeholder="Search..."
      class="search-input"
      autofocus
    />
    <button class="search-button" on:click={handleIconClick}> 
      <img src={iconSearch} alt="Search" class="w-7 h-7 mb-0 transition-opacity duration-200" />
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
    <div transition:fade={{ duration: 300, easing: quintOut }} class="search-overlay">
      <div class="search-modal">
        <input
          id="searchInputFullScreen"
          type="text"
          bind:value={searchText}
          on:input={querySuggestions}
          on:keydown={handleKeydown}
          on:blur={() => { handleBlur(); isSearchOpen = false; }}
          placeholder="Search..."
          class="search-input"
        />
        {#if showSuggestions}
          <ul class="suggestions-list full-page-suggestions">
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