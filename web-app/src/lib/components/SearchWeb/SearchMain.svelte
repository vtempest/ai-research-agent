<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import { Splitpanes, Pane } from "svelte-splitpanes";
  import SearchInput from "./SearchInput.svelte";
  import SearchResults from "./SearchResults.svelte";
  import ReadView from "./ReadView.svelte";
  import AgentsPanel from "./AgentsPanel.svelte";
  import { APP_NAME, APP_SLOGAN } from "$lib/custom-domain";
  import SearchHome from "$lib/components/SearchHome/Home.svelte";
  import { callServerAPI } from "$lib/utils";

  import "./home-style.css";
  // import Graph from "./Graph.svelte";

  import {
    convertHTMLToEscapedHTML,
    convertMarkdownToHTML,
    extractSEEKTOPIC,
  } from "$ai-research-agent";

  let phrasesModel =  $state( null);
  let searchResultList : Array<SearchResult> =  $state([]);
  // @ts-ignore
    let currentArticle : Article =  $state({});

  let activeSearchController = null;
  let selectedResultIndex =  $state(-1);
  let AgentsPanelComponent =  $state(null);
  let currentPage = $state(1);
  let isLoading = $state(false);
  let hasMoreResults = $state(true);
  let selectedCategory =  $state("general");
  let fetchingURL = $state("");
  let topicsObject = $state({});
  let lastFetchTime = $state(0);
  let searchText = $state("");
  let showResults= $state(false);
  const FETCH_DEBOUNCE_TIME = 3;

  let options = $state({
    AutoSummarize: true,
    ShowURLPath: false,
    ShowImages: false,
    OpenFirstResultInBackgroundTab: false,
    OpenFirstResultInSameTab: false,
  });


  $effect(() => {
    showResults = searchText.length > 0;
  });
  

  $effect(() => {
    if (selectedResultIndex !== -1) {
      scrollActiveResultIntoView();
    }
    currentArticle = null;
  });

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

  onMount(() => {
    
    setupParams();
    
    setupKeyboardListener();

    document.title = "QwkSearch - AI Research Agent";
    //focus on input
    document.querySelector("#searchInput")?.dispatchEvent(
      new MouseEvent('mousedown', {
        bubbles: true
      }));

    initializephrasesModel();
  });

  /**
   * Setup state variables from URL, preserving state in URL ?q=
   */
  function setupParams() {
    var params = Object.fromEntries(
      new URL(document?.location.href).searchParams.entries()
    );
    let { q: query, cat, extract: urlToExtract, prompt, first } = params;

    if (first) 
      options.OpenFirstResultInSameTab = true;


    if (cat) selectedCategory = cat;

    if (query) {
      searchText = query;
      showResults = query.length > 0;
      handleSearchSubmit();
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


      //avoid if already fetching
      if(fetchingURL === articleUrl ||
      lastFetchTime > Date.now() - 1000 * FETCH_DEBOUNCE_TIME) {
        return;
      }

      fetchingURL = articleUrl;

      var fetchedArticle  = await callServerAPI("extract", {
        url: articleUrl,
      });

      lastFetchTime = Date.now();

      // if (fetchingURL != articleUrl) {
      //   // alert(1111111111)
      //   console.log("fetchingURL != articleUrl", fetchingURL, articleUrl)
      //   return;
      // }
      if (fetchedArticle.error || !fetchedArticle.html) {
        console.error("Error fetching article:", fetchedArticle.error);
        // currentArticle = null;
        return;
      }
   

      currentArticle = fetchedArticle;



      var readViewElement = document.querySelector(".read-view");
      readViewElement?.scrollTo(0, 0);

    // Run summarize AI function
    setTimeout(() => {
      AgentsPanelComponent?.generateAISummary();
      AgentsPanelComponent?.generateFollowupQuestions();
      }, 400);

      // <!-- if(phrasesModel)
      // topicsObject = extractSEEKTOPIC(fetchedArticle.html,
      // // @ts-ignore
      // {
      //   phrasesModel,
      //   limitTopSentences: 5,
      //   limitTopKeyphrases: 5
      // }).keyphrases.slice(10) -->
      // console.log("topicsObject", topicsObject);

      //add article to url in history
      updateURL("extract", fetchedArticle.url);

      } catch (error) {
      console.error("Error fetching article:", error);
      // currentArticle = null;
    }
  }

  onDestroy(() => {
    cleanupKeyboardListener();
  });

  /**
   * Initialize the phrase model by fetching it from the API
   */
  async function initializephrasesModel() {
    phrasesModel = await callServerAPI("model");
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


  async function loadMoreResults() {
    if (isLoading || !hasMoreResults) return;

    isLoading = true;
    currentPage++;

    try {
      const newResults : Array<SearchResult> = await fetchSearchResults(searchText, currentPage);
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
   * @returns {Promise<Array<SearchResult>>} - The search results
   */
  async function fetchSearchResults(query, page) {
    var lang = navigator?.language || "en-US";

    const { results, error } : {
      results: Array<SearchResult>;
      error: string;
    } = await callServerAPI("search", {
      q: query,
      page,
      cat: selectedCategory,
      lang,
    });
    if (error) {
      console.error(error);
      return [];
    }

    //add query to search url in history
    updateURL("q", query);


    //add domain and favicon
    return results.map((result) => {

      var favicon = "https://www.google.com/s2/favicons?domain=" 
        + result.url.match(/^(?:https?:\/\/)?(?:www\.)?([^/:?\s]+)(?:[/:?]|$)/i)?.[0] 
        + "&sz=16"

      var domain = result.url
        ?.replace(/(http:\/\/|https:\/\/|www.)/gi, "").split("/")[0]
      

      var path = result.url
                  ?.replace(/(http:\/\/|https:\/\/|www.)/gi, "")
                  .split("/")
                  .slice(1)
                  .join("/")
                  .replace(/^/, "/")
      return {
        ...result,
        domain,
        favicon,
        path
      };
    });

  }

  function updateSearchText(newText){
    searchText = newText;
  }

  /**
   * Handle the search submission
   */
  async function handleSearchSubmit() {
    
    showResults = searchText.length > 0;

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
      searchResultList = await fetchSearchResults(searchText, currentPage);
      resetSearchView();

      document.body.focus();
      // @ts-ignore
      document.querySelector(".search-input")?.blur();

      //autoload first result
      setTimeout(() => loadFirstResult(), 1000);

      if (options.OpenFirstResultInBackgroundTab)
        window.open(searchResultList[0].url, "_blank");
      else if (options.OpenFirstResultInSameTab)
        window.location.href = searchResultList[0].url;
      
        if (searchResultList.length > 0) {
      loadFirstResult();
    }
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

    if (key in navigationActions)
      navigationActions[key]();
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
    document.querySelector(".article-container")?.scrollBy(0, distance);
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
    handleSearchSubmit();
  }
</script>

<svelte:head>
  <title>QwkSearch - AI Research Agent</title>

  <!-- <title>{APP_NAME} - {APP_SLOGAN}</title> -->
</svelte:head>

<main class="flex h-screen w-full">
  {#if !searchResultList.length && searchText.length == 0}
    <SearchHome
      {handleSearchSubmit}
      {phrasesModel}
      {searchText}
      {updateSearchText}
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
              {searchText}
              {handleCategoryClick}
              {updateSearchText}
            />
          </div>
          <!-- Search results  -->
          <SearchResults
            {searchResultList}
            {selectedResultIndex}
            {currentArticle}
            {fetchArticle}
            {loadMoreResults}
          />
        </div>
      </Pane>

      <!-- ReadView (center panel) -->
      <Pane size={45} snapSize={10}>
        <ReadView
          summarizeArticle={() => AgentsPanelComponent.generateAISummary()}
          {currentArticle}
          {topicsObject}
          {fetchArticle}
        />
      </Pane>

      <!-- GRAPH 
    <Pane size={45} snapSize={10}>
      <Graph />
    </Pane> -->

      <!-- AgentsPanel (right panel) -->
      <Pane size={35} snapSize={10}>
        <AgentsPanel
          bind:this={AgentsPanelComponent}

          {searchText}
          {currentArticle}
        />
      </Pane>
    </Splitpanes>
  {/if}
</main>
