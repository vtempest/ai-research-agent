<script lang="ts">
  import { Search, ArrowDown, X } from 'lucide-svelte';

  export let headings = [];
  export let handleHeadingsFiltered;

  const browser = typeof window !== "undefined";


  let searchTerm = '';
  let filteredHeadings = [];
  let hasSearched = false;
  let noMatchesFound = false;
  let searchWords: string[] = [];
  let currentWordIndex = 0;
  let isSearchingFullPhrase = true;


  function searchHeadings() {
    filteredHeadings = headings.filter(heading => {
      const headingText = heading.text.toLowerCase();
      return headingText.includes(searchTerm.toLowerCase());
    });

    handleHeadingsFiltered(filteredHeadings);
  }

  function processSearchTerm(term: string): string[] {
    return term.toLowerCase().split(/\s+/).filter(word => word.length > 0).reverse();
  }

  function handleSearchClick() {
    if (!browser) return;
    if (searchTerm.trim()) {
      if (!hasSearched) {
        // Initial search
        window.getSelection().removeAllRanges();
        isSearchingFullPhrase = true;
        if (findFullPhrase()) {
          hasSearched = true;
          noMatchesFound = false;
        } else {
          // Fallback to word-based search
          isSearchingFullPhrase = false;
          searchWords = processSearchTerm(searchTerm);
          currentWordIndex = 0;
          if (findNextWordMatch()) {
            hasSearched = true;
            noMatchesFound = false;
          } else {
            noMatchesFound = true;
          }
        }
      } else {
        // Find next
        if (isSearchingFullPhrase) {
          if (!findFullPhrase(false)) {
            // If no more full phrase matches, switch to word-based search
            isSearchingFullPhrase = false;
            searchWords = processSearchTerm(searchTerm);
            currentWordIndex = 0;
            if (!findNextWordMatch()) {
              noMatchesFound = true;
            }
          }
        } else {
          if (!findNextWordMatch()) {
            noMatchesFound = true;
          }
        }
      }
    }
  }

  function findFullPhrase(isInitialSearch: boolean = true): boolean {
    if (!browser) return
    
  
    
    let found = window.find(searchTerm, false, false, true, false, true, false);
    if (found && isInitialSearch) {
      // For initial search, find the second occurrence
    found = window.find(searchTerm, false, false, true, false, true, false);
    }
    if (found) {
      scrollToCurrentMatch();
    }
    return found;
  }

  function findNextWordMatch(): boolean {
    if (!browser) return;

    let found = false;
    let wrappedAround = false;

    while (!found && currentWordIndex < searchWords.length) {
      const currentWord = searchWords[currentWordIndex];
    found = window.find(currentWord, false, false, true, false, true, false);

      if (!found) {
        currentWordIndex++;
        window.getSelection().removeAllRanges();
      }

      if (!found && currentWordIndex === searchWords.length) {
        if (!wrappedAround) {
          currentWordIndex = 0;
          wrappedAround = true;
        } else {
          break;
        }
      }
    }

    if (found) {
      scrollToCurrentMatch();
    }

    return found;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchClick();
    }
  }

  function scrollToCurrentMatch() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.startContainer.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function resetSearch() {
    if (!browser) return;

    searchTerm = '';
    filteredHeadings = [];
    handleHeadingsFiltered( []);
    hasSearched = false;
    noMatchesFound = false;
    searchWords = [];
    currentWordIndex = 0;
    isSearchingFullPhrase = true;
    window?.getSelection().removeAllRanges();
  }

  $: {
    if (searchTerm) {
      searchHeadings();
      noMatchesFound = false;
      hasSearched = false;
      isSearchingFullPhrase = true;
    } else {
      resetSearch();
    }
  }
</script>

<div class="mb-6">
  <div class="relative flex items-center pr-1 pl-1">
    <input
      type="text"
      placeholder="Search doc..."
      bind:value={searchTerm}
      oninput={() => { hasSearched = false; noMatchesFound = false; isSearchingFullPhrase = true; }}
      onkeydown={handleKeyDown}
      class="w-full pl-4 pr-20 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
    />
    {#if searchTerm}
      <button
        onclick={resetSearch}
        class="absolute right-10 p-1 rounded-full hover:bg-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <X size={20} class="text-gray-500" />
      </button>
    {/if}
    <button
      onclick={handleSearchClick}
      class="absolute right-2 p-1 rounded-full hover:bg-gray-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {#if !hasSearched}
        <Search size={20} class="text-blue-500" />
      {:else}
        <ArrowDown size={20} class="text-blue-500" />
      {/if}
    </button>
  </div>
  {#if noMatchesFound}
    <div class="mt-2 text-sm text-red-600">
      No matches found
    </div>
  {/if}
</div>