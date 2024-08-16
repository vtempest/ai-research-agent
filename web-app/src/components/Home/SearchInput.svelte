<script>
  import { onMount } from "svelte";
  import {autocompleteNextWords} from "../../../../src/autocomplete/autocomplete.js";
  import iconSearch from "../../lib/icons/icon-search.svg"

  export let phrasesModel = null;
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
  async function querySuggestions() {
    if (!phrasesModel) {
      console.error("Wait. Phrase model not loaded");
      return;
    }
    suggestions = await autocompleteNextWords(searchText, {
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
        if (selectedIndex !== -1) {
          selectSuggestion(suggestions[selectedIndex]);
        } else {
          handleSubmit(searchText);
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
    handleSubmit(searchText)
    console.log("Selected:", searchText);
  }

  function clearSearch() {
    searchText = "";
    suggestions = [];
    showSuggestions = false;
  }
  export let handleSubmit = () => {};

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
      autofocus
      type="text"
      bind:value={searchText}
      on:input={querySuggestions}
      on:keydown={handleKeydown}
      on:blur={handleBlur}
      placeholder="Search..."
      class="search-input"
    />
    <!-- {#if searchText}
      <button class="clear-button mr-2 mt-2" on:click={clearSearch}> ✕ </button>
    {/if} -->
    <button class="search-button  pt-2" on:click={()=>{handleSubmit(searchText)}}> 
      <img
        src={iconSearch}
        class="w-7 h-7 mb-0 transition-opacity duration-200"
      />
    </button>

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