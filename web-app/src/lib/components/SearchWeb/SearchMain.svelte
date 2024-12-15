<script>
  import { onMount, onDestroy } from "svelte";
  import { Splitpanes, Pane } from "svelte-splitpanes";
  import SearchInput from "./SearchInput.svelte";
  import SearchResults from "./SearchResults.svelte";
  import ReadView from "./ReadView.svelte";
  import ActionsPanel from "./AgentsPanel.svelte";
  import { APP_NAME } from "$lib/middleware/config";
  import SearchHome from "$lib/components/SearchHome/Home.svelte";
  import { callServerAPI } from "$lib/utils/call-server";

  import "./home-style.css";
  // import Graph from "./Graph.svelte";

  import {
    convertHTMLToEscapedHTML,
    convertMarkdownToHTML,
    extractSEEKTOPIC,
  } from "$ai-research-agent";

  let phrasesModel = null;
  let searchResultList = [];
  let currentArticle = null;
  let activeSearchController = null;
  let selectedResultIndex = -1;
  let searchText = "";
  let optionAutoSummarize = true;
  let actionsPanelComponent = null;
  let currentPage = 1;
  let isLoading = false;
  let hasMoreResults = true;
  let topicsObject = null;
  let selectedCategory = "general";
  let optionShowURLPath = false;
  let ReadViewComponent = null;
  let optionShowImages = false;
  let query = "";
  let urlToExtract = "";
  let userPrompt = "";

  $: showSearchHome = !searchText;

  onMount(async () => {
    setupParams();

    setupKeyboardListener();

    setupScrollListener();

    await initializephrasesModel();
  });

  /**
   * Setup state variables from URL parameters
   * @param {Object} params - URL parameters
   * @param {string} params.q - search query
   * @param {string} params.cat - category
   * @param {string} params.url - URL to extract
   * @param {string} params.prompt - prompt message
   */
  function setupParams() {
    var params = Object.fromEntries(
      new URL(document?.location.href).searchParams.entries()
    );
    let { q: query, cat, extract: urlToExtract, prompt } = params;

    const defaultPrompt = "Summarize in bullet points and bold topics";

    userPrompt = prompt || defaultPrompt;

    if (cat) selectedCategory = cat;

    if (query) {
      searchText = query;
      handleSearchSubmit(searchText);
    }
    if (urlToExtract) fetchArticle(urlToExtract, 0);
  }

  /**
   * MAIN FUNCTION: Fetch and display an article
   * @param {string} articleUrl - The URL of the article to fetch
   * @param {number} index - The index of the article in the search results
   */
  export async function fetchArticle(articleUrl, index) {
    try {
      var newArticle = await callServerAPI("extract", {
        url: articleUrl,
      });

      if (newArticle.error || !newArticle.html) {
        //open new tab if  chrome extension available
      } else {
        currentArticle = newArticle;
        var readViewElement = document.querySelector(".read-view");
        readViewElement?.scrollTo(0, 0);

        // Run summarize AI function
        // setTimeout(() => {
        actionsPanelComponent?.generateAISummary();
        // }, 400);

        //   topicsObject = extractSEEKTOPIC(newArticle.html,
        //   {
        //     phrasesModel,
        //     limitTopSentences: 5,
        //     limitTopKeyphrases: 8
        //   }
        // );

        //add article to url in history
        updateURL("extract", articleUrl);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      // currentArticle = null;
    }
  }

  onDestroy(() => {
    cleanupKeyboardListener();
    cleanupScrollListener();
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
    const response = await fetch("./api/model");
    phrasesModel = await response.json();
  }

  /**
   * Set up the keyboard event listener
   */
  function setupKeyboardListener() {
    if (typeof window === "undefined") return;
    window.addEventListener("keydown", handleKeyboardNavigation);
  }

  /**
   * Remove the keyboard event listener
   */
  function cleanupKeyboardListener() {
    if (typeof window === "undefined") return;
    window.removeEventListener("keydown", handleKeyboardNavigation);
  }

  /**
   * Set up the scroll event listener
   */
  function setupScrollListener() {
    if (typeof window === "undefined") return;
    const resultsListElement = document.querySelector(".results-list");
    resultsListElement?.addEventListener("scroll", handleScroll);
  }

  function cleanupScrollListener() {
    if (typeof window === "undefined") return;
    const resultsListElement = document.querySelector(".results-list");
    resultsListElement?.removeEventListener("scroll", handleScroll);
  }

  function handleScroll(event) {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (
      scrollHeight - scrollTop <= clientHeight + 1 &&
      !isLoading &&
      hasMoreResults
    ) {
      loadMoreResults();
    }
  }

  async function loadMoreResults() {
    if (isLoading || !hasMoreResults) return;

    isLoading = true;
    currentPage++;

    try {
      const newResults = await fetchSearchResults(searchText, currentPage);
      if (newResults.length > 0) {
        searchResultList = [...searchResultList, ...newResults];
      } else {
        hasMoreResults = false;
      }
    } catch (error) {
      console.error("Error loading more results:", error);
    } finally {
      isLoading = false;
    }
  }

  /**
   * Fetch search results
   * @param {string} query - The search query
   * @param {number} page - The page number to fetch
   * @returns {Promise<Array>} - The search results
   */
  async function fetchSearchResults(query, page) {
    var lang = navigator?.language || navigator?.userLanguage || "en-US";
    
    const data = await callServerAPI("search", {
      q: query,
      page,
      cat: selectedCategory,
      lang
    });

    //add query to search url in history
    updateURL("q", query);

    return data?.results || [];
  }

  /** 
   * Adds the search query to the URL so that the state 
   * of the search is preserved in a sharable URL.
   * @param {string} key - The key to add to the URL
   * @param {string} value - The value to add to the URL
   */
  function updateURL(key, value) {
    const url = new URL(document?.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState({}, "", url);
  }
  /**
   * Handle the search submission
   * @param {string} searchQuery - The search query entered by the user
   */
  async function handleSearchSubmit(searchQuery) {
    //Abort any active search request
    if (activeSearchController) {
      activeSearchController.abort();
      activeSearchController = null;
    }
    activeSearchController = new AbortController();

    try {
      currentPage = 1;
      hasMoreResults = true;
      isLoading = true;
      searchResultList = await fetchSearchResults(searchQuery, currentPage);
      resetSearchView();

      document.body.focus();
      document.querySelector(".search-input")?.blur();

      //autoload first result
      setTimeout(() => loadFirstResult(), 1000);
    } catch (error) {
      handleSearchError(error);
    } finally {
      activeSearchController = null;
      document.body.focus();
      isLoading = false;
    }
  }

  /**
   * Reset the search view
   */
  function resetSearchView() {
    document.querySelector(".results-list")?.scrollTo(0, 0);
    // currentArticle = null;
    selectedResultIndex = -1;
  }

  /**
   * Handle search errors
   * @param {Error} error - The error that occurred during the search
   */
  function handleSearchError(error) {
    if (error.name === "AbortError") {
      console.log("Search aborted");
    } else {
      console.error("Error fetching search results:", error);
    }
  }

  // Constants
  const SCROLL_DISTANCE = 100;
  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} event - The keyboard event
   */
  function handleKeyboardNavigation(event) {
    if (event.key == "Esc") document.body.focus();
    if (isInsideTextInput(event.target)) return;

    const key = event.key.toLowerCase();
    const navigationActions = {
      w: () => scrollArticle(-SCROLL_DISTANCE),
      s: () => scrollArticle(SCROLL_DISTANCE),
      a: () => navigateSearchResults(-1),
      d: () => navigateSearchResults(1),
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
    document.querySelector(".article-container").scrollBy(0, distance);
  }

  /**
   * Navigate through search results
   * @param {number} direction - The direction to navigate (1 for next, -1 for previous)
   */
  function navigateSearchResults(direction) {
    const newIndex = selectedResultIndex + direction;
    if (newIndex >= 0 && newIndex < searchResultList.length) {
      selectedResultIndex = newIndex;
      fetchArticle(searchResultList[newIndex].url, newIndex);
    }
  }

  /**
   * Scroll the active result into view if needed
   */
  function scrollActiveResultIntoView() {
    setTimeout(() => {
      const activeElement = document.querySelector(".results-list li.active");
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 0);
  }

  /**
   * Load the first result when the results list is loaded
   */
  function loadFirstResult() {
    if (searchResultList.length > 0) {
      fetchArticle(searchResultList[0].url, 0);
    }
  }

  function handleCategoryClick(category) {
    selectedCategory = category.code;

    updateURL("cat", selectedCategory);
  }
</script>

<svelte:head>
  <title>{APP_NAME}</title>
</svelte:head>

<main class="flex h-screen w-full">
  
  {#if !searchResultList.length}
    <SearchHome
      {handleSearchSubmit}
      {phrasesModel}
      {searchText}
      {selectedCategory}
    />
  {:else}
    <Splitpanes>
      <!-- Sidebar (20% width)  -->
      <Pane size={20} snapSize={10}>
        <div class="h-full flex flex-col shadow-md p-1">
          <!-- Search bar at the top of the sidebar -->
          <div class="border-b border-gray-200">
            <SearchInput
              {handleSearchSubmit}
              {phrasesModel}
              {selectedCategory}
              {handleCategoryClick}
            />
          </div>

          <!-- Search results  -->
          <SearchResults
            {searchResultList}
            {selectedResultIndex}
            {currentArticle}
            on:click={loadFirstResult}
            {fetchArticle}
            on:scroll={handleScroll}
            on:keydown={handleKeyboardNavigation}
          />
        </div>
      </Pane>

      <!-- ReadView (center panel) -->
      <Pane size={45} snapSize={10}>
        <ReadView
          bind:this={ReadViewComponent}
          on:summarizeArticle={actionsPanelComponent.generateAISummary}
          {currentArticle}
          {topicsObject}
          {fetchArticle}
        />
      </Pane>

      <!-- GRAPH 
    <Pane size={45} snapSize={10}>
      <Graph />
    </Pane> -->

      <!-- ActionsPanel (right panel) -->
      <Pane size={35} snapSize={10}>
        <ActionsPanel
          bind:this={actionsPanelComponent}
          {currentArticle}
          {userPrompt}
          {searchText}
        />
      </Pane>
    </Splitpanes>
  {/if}
</main>
