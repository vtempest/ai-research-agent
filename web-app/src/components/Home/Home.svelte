<script>
  import { Splitpanes, Pane } from 'svelte-splitpanes';
  import SearchInput from "./SearchInput.svelte";
  import { onMount, onDestroy } from "svelte";
  import './home-style.css';
  import ReadView from "./ReadView.svelte";
  import ActionsPanel from "./ActionsPanel.svelte";
  import PricingPlan from './PricingPlan.svelte';
  import { APP_NAME } from '$lib/config/config';

  import {convertHTMLSpecialChars} from "../../../..";

  import { extractSEEKTOPIC } from "../../../..";

  // State variable
  let phrasesModel = null;
  let searchResultList = [];  
  let currentArticle = null;
  let activeSearchController = null;
  let selectedResultIndex = -1;

  // Constants
  const SCROLL_DISTANCE = 100;
  const API_ENDPOINTS = {
    MODEL: './api/model',
    SEARCH: '/api/search',
    EXTRACT: '/api/extract'
  };

  onMount(async () => {
    await initializephrasesModel();
    setupKeyboardListener();
  });

  onDestroy(() => {
    cleanupKeyboardListener();
    abortActiveSearch();
  });

  // Reactive declarations
  $: {
    if (searchResultList.length > 0) {
      loadFirstResult();
    }
  }
  $: currentArticle = null;
  $: if (selectedResultIndex !== -1) {
    scrollActiveResultIntoView();
  }

  /**
   * Initialize the phrase model by fetching it from the API
   */
  async function initializephrasesModel() {
    const response = await fetch(API_ENDPOINTS.MODEL);
    phrasesModel = await response.json();
  }

  /**
   * Set up the keyboard event listener
   */
  function setupKeyboardListener() {
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', handleKeyboardNavigation);
  }

  /**
   * Remove the keyboard event listener
   */
  function cleanupKeyboardListener() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('keydown', handleKeyboardNavigation);
  }

  /**
   * Abort any active search request
   */
  function abortActiveSearch() {
    if (activeSearchController) {
      activeSearchController.abort();
      activeSearchController = null;
    }
  }

  /**
   * Handle the search submission
   * @param {string} searchQuery - The search query entered by the user
   */
  async function handleSearchSubmit(searchQuery) {
    abortActiveSearch();
    activeSearchController = new AbortController();

    try {
      const searchUrl = `${API_ENDPOINTS.SEARCH}?q=${searchQuery}`;
      const response = await fetch(searchUrl, { signal: activeSearchController.signal });
      const data = await response.json();
      
      searchResultList = data?.results || [];
      resetSearchView();
      
      document.body.focus();
      document.querySelector('.search-input').blur();

    } catch (error) {
      handleSearchError(error);
    } finally {
      activeSearchController = null;
      document.body.focus();
    }
  }

  /**
   * Reset the search view
   */
  function resetSearchView() {
    document.querySelector('.results-list').scrollTo(0, 0);
    currentArticle = null;
    selectedResultIndex = -1;
  }

  /**
   * Handle search errors
   * @param {Error} error - The error that occurred during the search
   */
  function handleSearchError(error) {
    if (error.name === 'AbortError') {
      console.log('Search aborted');
    } else {
      console.error('Error fetching search results:', error);
    }
  }

  /**
   * Fetch and display an article
   * @param {string} articleUrl - The URL of the article to fetch
   * @param {number} index - The index of the article in the search results
   */
  async function fetchAndDisplayArticle(articleUrl, index) {
    try {
      const response = await fetch(`${API_ENDPOINTS.EXTRACT}?url=${encodeURIComponent(articleUrl)}`);
      var newArticle = await response.json();
      
      if (newArticle.error || !newArticle.html) {
        throw new Error(newArticle.error || 'Empty article content');
      }

      currentArticle = newArticle;

      updateArticleView();
      selectedResultIndex = index;

      // Run summarize AI function
      summarizeArticle();
    } catch (error) {
      console.error('Error fetching article:', error);
      currentArticle = null;
    }
  }

  /**
   * Update the article view
   */
  function updateArticleView() {
    document.querySelector('.read-view').scrollTo(0, 0);
  }

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} event - The keyboard event
   */
  function handleKeyboardNavigation(event) {
    if (event.key=="Esc") document.body.focus();
    if (isInsideTextInput(event.target)) return;

    const key = event.key.toLowerCase();
    const navigationActions = {
      'w': () => scrollArticle(-SCROLL_DISTANCE),
      's': () => scrollArticle(SCROLL_DISTANCE),
      'a': () => navigateSearchResults(-1),
      'd': () => navigateSearchResults(1)
    };

    if (key in navigationActions) {
      navigationActions[key]();
    }
  }

  /** 
   * Detect if pressing shortcut in text input box
   * @param {HTMLElement} i element to test
   * @returns {boolean} true if inside text input
   */
  function isInsideTextInput(i) {
    return (
      i instanceof HTMLImageElement ||
      i instanceof HTMLInputElement ||
      i instanceof HTMLTextAreaElement ||
      i.textbox ||
      (i.textContent && i.textContent == "") ||
      (i.ownerDocument &&
        i.ownerDocument.designMode &&
        i.ownerDocument.designMode.match(/on/i))
    );
  }

  /**
   * Scroll the article view
   * @param {number} distance - The distance to scroll (positive for down, negative for up)
   */
  function scrollArticle(distance) {
    document.querySelector('.article-container').scrollBy(0, distance);
  }

  /**
   * Navigate through search results
   * @param {number} direction - The direction to navigate (1 for next, -1 for previous)
   */
  function navigateSearchResults(direction) {
    const newIndex = selectedResultIndex + direction;
    if (newIndex >= 0 && newIndex < searchResultList.length) {
      selectedResultIndex = newIndex;
      fetchAndDisplayArticle(searchResultList[newIndex].url, newIndex);
    }
  }

  /**
   * Scroll the active result into view if needed
   */
  function scrollActiveResultIntoView() {
    setTimeout(() => {
      const activeElement = document.querySelector('.results-list li.active');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }, 0);
  }

  /**
   * Load the first result when the results list is loaded
   */
  function loadFirstResult() {
    if (searchResultList.length > 0) {
      fetchAndDisplayArticle(searchResultList[0].url, 0);
    }
  }

  /**
   * Run the summarize AI function on the current article
   */
  function summarizeArticle() {
    if (currentArticle) {
      // Assuming the summarize function is available in the ActionsPanel component
      const actionsPanelComponent = document.querySelector('svelte\\:component[this=ActionsPanel]');
      if (actionsPanelComponent && actionsPanelComponent.__svelte_component__) {
        actionsPanelComponent.__svelte_component__.summarize();
      }
    }
  }
</script>

<svelte:head>
  <title>{APP_NAME}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
  <link href="//fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
  <link href="//fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<main class="flex h-screen w-full">
  <Splitpanes>
    <!-- Sidebar (20% width)  -->
    <Pane size={20} snapSize={10}>
      <div class="h-full flex flex-col shadow-md p-1">
        <!-- Search bar at the top of the sidebar -->
        <div class="border-b border-gray-200">
          <SearchInput handleSubmit={handleSearchSubmit} {phrasesModel}/>
        </div>
        
        <!-- Search results  -->
        <div class="results-list flex-grow overflow-y-auto overflow-x-hidden p-0">
          {#if searchResultList.length > 0}
            <ul class="space-y-1">
              {#each searchResultList as result, index}
                <li class="rounded-lg p-2 transition-colors duration-300 cursor-pointer
                           {index === selectedResultIndex ? 'bg-[#EAEBEE] shadow-xl -translate-y-1 bg-[#DFD8C2] active' : 'bg-[#f8f8f8] hover:bg-[#DFD8C2] outline outline-1 outline-slate-300 hover:shadow-xl hover:-translate-y-1'}" 
                    on:click={() => fetchAndDisplayArticle(result.url, index)}>
                  <div class="text-md font-medium mb-0 text-slate-600">{convertHTMLSpecialChars(result.title)}</div>
                  <span class="text-sm inline truncate text-blue-900">
                    {result.url?.replace(/(http:\/\/|https:\/\/|www.)/gi,"").split("/")[0]}</span><span class="text-xs truncate text-slate-400 pr-4 ">/{result.url?.replace(/(http:\/\/|https:\/\/|www.)/gi,"").split("/").slice(1).join("/")}</span>
                </li>
              {/each}
            </ul>
          {:else}
            <p class="text-gray-500 text-center mt-4">No results to display</p>
          {/if}
        </div>
      </div>
    </Pane>

    <!-- ReadView (center panel) -->
    <Pane size={45} snapSize={10}>
      <ReadView selectedArticle={currentArticle} />
    </Pane>

    <!-- ActionsPanel (right panel) -->
    <Pane size={35} snapSize={10}>
      <ActionsPanel selectedArticle={currentArticle} />
    </Pane>
  </Splitpanes>
</main>

<style>
  :global(.splitpanes) {
    height: 100vh;
  }

  :global(body) {
    font-family: 'Merriweather', 'Open Sans', 'Lato', sans-serif;
  }
</style>