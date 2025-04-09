<script lang="ts">
  import { Search, X, Maximize, ChevronDown } from "lucide-svelte";
  import findInTabContent from "./find-in-tab-content.js";
  import { writable } from "svelte/store";
  import { searchEngines } from "$ai-research-agent";
  import { slide } from 'svelte/transition';

  // Import shadcn components
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  let selectedSearchEngine = 0;



  export let results; 
  export let tabsStore;
  export let fetchAllTabs;

  let searchText = "";
  $: searchText = searchText;
  let tabMessage = "Search tab text or web";

  //TODO autocomplete
  let searchOptions = 'tab, abc, def'.split(', ')
 
  let isOpen = false;
  let autocompleteResults = [];
  let arrowCounter = -1;

  let showDropdown = false;

  const regExpEscape = (s) => {
    return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&")
  }


  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.type === "tabFound") {
        let resultObj = findInTabContent(request, searchText, 100);

        if (
          typeof resultObj === "undefined" ||
          resultObj?.dispString === undefined
        ){
          console.log(request.url);
          return;
        }

        tabsStore.update((currentResults) => {
          const existingIndex = currentResults.findIndex(
            (result) => result.id === resultObj.id
          );
          if (existingIndex !== -1) {
            currentResults[existingIndex] = {
              ...currentResults[existingIndex],
              ...resultObj,
            };
            return [...currentResults];
          } else {
            return [...currentResults, resultObj];
          }
        });
      }
    }
  )

  function handleSelectChange(engineKey) {
    selectedSearchEngine = engineKey;
    showDropdown = false;
    if (searchText)
      searchSelected();
  }

  function searchSelected() {
    var baseURL = searchEngines[selectedSearchEngine].url;
    let url = baseURL + encodeURIComponent(searchText);

    chrome.runtime.sendMessage({ type: "openTab", url, bg: false });
  }

  async function onSearchType(event) {
    searchText = event.target.value;

    if (searchText === "") {
      await fetchAllTabs();
      isOpen = false;
      return;
    }

    filterResults();
    isOpen = true;

    tabsStore.set([]);
    chrome.tabs.query({}, (tabs) => {
      for (let tab of tabs) {
        if (!tab.url?.startsWith("chrome://")) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            func: (tabId, favIconUrl, title, url, searchText) => {
              const content = document.body.innerText;
              chrome.runtime.sendMessage({
                type: "tabFound",
                tabId,
                favIconUrl,
                title,
                url,
                content,
              });
            },
            args: [
              tab.id,
              tab.favIconUrl || "",
              tab.title,
              tab.url,
              searchText,
            ],
          });
        }
      }
    });
  }

  function filterResults() {
    autocompleteResults = searchOptions
      .filter(item => item.toUpperCase().includes(searchText.toUpperCase()))
      .map(item => ({
        // @ts-ignore
        ...item,
        label: item.replace(RegExp(regExpEscape(searchText.trim()), 'i'), "<span>$&</span>")
      }));
  }

  function onKeyDown(event) {
    if (event.keyCode === 40 && arrowCounter < autocompleteResults.length - 1) {
      arrowCounter++;
    } else if (event.keyCode === 38 && arrowCounter > 0) {
      arrowCounter--;
    } else if (event.keyCode === 13) {
      event.preventDefault();
      if (arrowCounter === -1) {
        searchSelected();
      } else {
        selectOption(arrowCounter);
      }
    } else if (event.keyCode === 27) {
      event.preventDefault();
      closeAutocomplete();
    }
  }

  function selectOption(index) {
    if (index > -1 && index < autocompleteResults.length) {
      searchText = autocompleteResults[index].key;
      closeAutocomplete();
      onSearchType({ target: { value: searchText } });
    }
  }

  function closeAutocomplete() {
    isOpen = false;
    arrowCounter = -1;
  }

  function clearSearchText() {
    searchText = "";
    closeAutocomplete();
    fetchAllTabs();
  }

  function toggleFullScreen() {
    chrome.runtime.sendMessage({
      type: "requestFullScreen"
    });
  }

  function openDebateApp() {
    chrome.runtime.sendMessage({
      type: "openDebateApp"
    });
  }

  function toggleDropdown(event) {
    event.stopPropagation();
    showDropdown = !showDropdown;
  }

  function handleClickOutside(event) {
    if (!event.target.closest('.search-dropdown')) {
      showDropdown = false;
    }
    if (!event.target.closest('.autocomplete')) {
      closeAutocomplete();
    }
  }
</script>

<svelte:window onclick={handleClickOutside} />

<div class="container mx-auto  max-w-sm">
  <div class="mb-2">
    <div class="relative autocomplete">
      <Search
        class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
        size={20}
      />
      <Input
        bind:value={searchText}
        oninput={onSearchType}
        onkeydown={onKeyDown}
        class="pl-10 pr-8"
        placeholder={tabMessage}
      />
      {#if searchText}
        <button
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onclick={clearSearchText}
        >
          <X size={16} />
        </button>
      {/if}
      {#if isOpen && autocompleteResults.length > 0}
        <ul class="autocomplete-results">
          {#each autocompleteResults as result, i}
          <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->

            <div 
              onclick={() => selectOption(i)} 
              class="autocomplete-result{i === arrowCounter ? ' is-active' : ''}"
            >
              {@html result.label}
            </div>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
  <div class="flex space-x-1 mb-2">
    <div class="relative inline-block text-left flex-grow search-dropdown">
      <Button 
        type="button" 
        class="w-full bg-slate-400 hover:bg-slate-500 inline-flex items-center justify-between"
      >
      <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
        <div class="flex items-center flex-grow" onclick={searchSelected}>
          <span class="flex items-center">
            <img alt={searchEngines[selectedSearchEngine].name} src={`data:image/png;base64,${searchEngines[selectedSearchEngine].icon}`} 
            class="h-4 w-4 mr-2" />

            {searchEngines[selectedSearchEngine].name}</span>
        </div>
        
        <div class="flex-shrink-0 ml-2" onclick={toggleDropdown}>
          <ChevronDown class="h-4 w-4" />
        </div>
      </Button>

      {#if showDropdown}
        <div
          class="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-slate-400 ring-opacity-5 focus:outline-none"
          transition:slide={{ duration: 200 }}
        >
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {#each searchEngines as engine, index}
              <button
                class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onclick={() => handleSelectChange(index)}
              >
    
                <span class="flex items-center">
                  <img alt="{engine.name}" src={`data:image/png;base64,${engine.icon}`} class="h-4 w-4 mr-2" />
                  <span class="font-bold">{engine.name}</span></span>
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
    <Button onclick={openDebateApp} class="flex-shrink-0 ml-1">
      <Maximize class="h-4 w-4" />
    </Button>
  </div>
</div>

<style>
  .autocomplete {
    position: relative;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #dbdbdb;
    max-height: 6rem;
    overflow-y: auto;
    width: 100%;
    background-color: white;
    box-shadow: 2px 2px 24px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 100;
  }

  .autocomplete-result {
    color: #7a7a7a;
    list-style: none;
    text-align: left;
    height: 2rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  .autocomplete-result > :global(span) {
    background-color: none;
    color: #242424;
    font-weight: bold;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #dbdbdb;
  }

  .search-dropdown {
    position: relative;
  }
</style>