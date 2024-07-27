<script>
  import { onMount } from "svelte";
  import queryAutocomplete from "../../../src/search/autocomplete.js";

  let phrasesModel = null;
  let searchText = "";
  let suggestions = [];
  let showSuggestions = false;
  let selectedIndex = -1;

  $: if (searchText.length > 0) {
    querySuggestions();
  } else {
    suggestions = [];
    showSuggestions = false;
  }

  onMount(async () => {
    const res = await fetch("./api/autocomplete");
    phrasesModel = await res.json();
  });

  async function querySuggestions() {
    if (!phrasesModel) {
      console.error("Phrase model not loaded");
      return;
    }
    suggestions = await queryAutocomplete(searchText, {
      phrasesModel,
      limit: 10,
    });
    if (!suggestions) return;

    var words = searchText.trim().split(/\W+/);

    suggestions = suggestions
      .map((s) => {
        if (s.word) var name = words.slice(0, -1).join(" ") + " " + s.word;
        if (s.phrase) {
          var name =
            words
              .join(" ")
              .slice(0, words.join(" ").lastIndexOf(s.phrase.split(" ")[0])) +
            " " +
            s.phrase;
        }
        return { name };
      })
      .filter(Boolean);
    // console.log(suggestions);

    showSuggestions = suggestions.length > 0;
    selectedIndex = -1;
  }

  function handleKeydown(event) {
    if (!showSuggestions) return;

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
        if (selectedIndex !== -1) {
          selectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        showSuggestions = false;
        break;
    }
  }

  function selectSuggestion(suggestion) {
    searchText = suggestion.name;
    showSuggestions = false;
    // Perform search or other actions here
    handleSubmit()
    console.log("Selected:", searchText);
  }

  function clearSearch() {
    searchText = "";
    suggestions = [];
    showSuggestions = false;
  }

  function handleSubmit() {
    // Perform search or other actions here
    var searchURL =  "https://www.google.com/search?q="+searchText;

    window.open(searchURL, "_blank");
    showSuggestions = false;
  }

  function handleBlur() {
    // Delay hiding suggestions to allow for clicks on suggestion items
    setTimeout(() => {
      showSuggestions = false;
    }, 200);
  }
</script>

<div class="container">
  <div class="search-container">
    <input
      type="text"
      bind:value={searchText}
      on:input={querySuggestions}
      on:keydown={handleKeydown}
      on:blur={handleBlur}
      placeholder="Search..."
      class="search-input"
    />
    {#if searchText}
      <button class="clear-button" on:click={clearSearch}> ✕ </button>
    {/if}
    <button class="search-button" on:click={handleSubmit}> 🔍 </button>
    {#if showSuggestions}
      <ul class="suggestions-list">
        {#each suggestions as suggestion, index}
          <li
            class="suggestion-item"
            class:selected={index === selectedIndex}
            on:mousedown={() => selectSuggestion(suggestion)}
          >
            {suggestion.name}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }

  .search-container {
    position: relative;
    display: flex;
    align-items: top;
  }

  .search-input {
    width: 100%;
    padding: 10px 40px 10px 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .clear-button,
  .search-button {
    position: absolute;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }

  .clear-button {
    right: 40px;
  }

  .search-button {
    right: 10px;
  }

  .suggestions-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    max-height: 500px;
    overflow-y: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
    z-index: 10;
  }

  .suggestion-item {
    padding: 10px;
    cursor: pointer;
  }

  .suggestion-item:hover,
  .suggestion-item.selected {
    background-color: #f0f0f0;
  }
</style>
