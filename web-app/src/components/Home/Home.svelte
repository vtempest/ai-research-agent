<script>
  import { Splitpanes, Pane } from "svelte-splitpanes";
  import SearchInput from "./SearchInput.svelte";
  import { onMount, onDestroy } from "svelte";
  import "./home-style.css";
  import ReadView from "./ReadView.svelte";
  import ActionsPanel from "./ActionsPanel.svelte";
  import PricingPlan from "./PricingPlan.svelte";
  import { APP_NAME } from "$lib/config/config";
  // import Graph from "./Graph.svelte";

  import {
    convertHTMLSpecialChars,
    convertMarkdownToHTML,
    extractSEEKTOPIC,
  } from "$airesearchagent";

  // Props from URL ?q=...
  export let data = {};
  let { query, category, time } = data;

  // State variable
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

  // Constants
  const SCROLL_DISTANCE = 100;
  const API_ENDPOINTS = {
    MODEL: "./api/model",
    SEARCH: "/api/search",
    EXTRACT: "/api/extract",
  };

  onMount(async () => {
    await initializephrasesModel();
    setupKeyboardListener();
    setupScrollListener();

    if (query) {
      searchText = query;
      handleSearchSubmit(query);
    }
  });

  onDestroy(() => {
    cleanupKeyboardListener();
    cleanupScrollListener();
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
    resultsListElement.addEventListener("scroll", handleScroll);
  }

  /**
   * Remove the scroll event listener
   */
  function cleanupScrollListener() {
    if (typeof window === "undefined") return;
    const resultsListElement = document.querySelector(".results-list");
    resultsListElement.removeEventListener("scroll", handleScroll);
  }

  /**
   * Handle scroll event to load more results
   */
  function handleScroll(event) {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollHeight - scrollTop <= clientHeight + 1 && !isLoading && hasMoreResults) {
      loadMoreResults();
    }
  }

  /**
   * Load more search results
   */
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
    const searchUrl = `${API_ENDPOINTS.SEARCH}?q=${query}&page=${page}&public=true`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    return data?.results || [];
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
      document.querySelector(".search-input").blur();
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
    document.querySelector(".results-list").scrollTo(0, 0);
    currentArticle = null;
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

  let iframe = null;

  /**
   * Fetch and display an article
   * @param {string} articleUrl - The URL of the article to fetch
   * @param {number} index - The index of the article in the search results
   */
  async function fetchAndDisplayArticle(articleUrl, index) {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.EXTRACT}?url=${encodeURIComponent(articleUrl)}`
      );
      var newArticle = await response.json();

      if (newArticle.error || !newArticle.html) {

        //if bot blocked, then as backup load using Jina
        var articleExtract = await (
          await fetch("https://r.jina.ai/" + articleUrl)
        ).text();


        if(articleExtract.includes("===============\n"))
          articleExtract = articleExtract
            .split("===============\n")
            .slice(1).join(" ")
        


        var match = articleExtract.match(/Markdown Content:([\s\S]*)/);
        articleExtract = match ? match[1] : articleExtract;

        articleExtract = convertMarkdownToHTML(articleExtract);

        newArticle = {  html: articleExtract };

        currentArticle = newArticle;
        updateArticleView();
        // Run summarize AI function
          setTimeout(() => {
            summarizeArticle();
          }, 200);
        selectedResultIndex = index;

        /* Implement fallback method using an invisible iframe
              const iframeId = 'article-iframe';
               iframe = document.getElementById(iframeId);
              const readView = document.querySelector('.read-view');
              
              if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.id = iframeId;
                iframe.style.cssText = 'width:100%;height:100%;border:0;';
                readView.innerHTML = '';
                readView.appendChild(iframe);
              }
              iframe.src = articleUrl;

              // Wait for the iframe to load
              iframe.onload = () => {
                try {
                  var iframeContent = iframe.contentWindow.document.body.innerHTML;
                  iframeContent = convertHTMLSpecialChars(iframeContent);
                  newArticle = { source: "html", html: iframeContent };
                  currentArticle = newArticle;
                  updateArticleView();
                  return;
                } catch (iframeError) {
                  console.error("Error accessing iframe content:", iframeError);
                  currentArticle = null;
                }
              };
              */
      } else {
        // hide the iframe
        currentArticle = newArticle;

        updateArticleView();

        // Run summarize AI function
          setTimeout(() => {
            summarizeArticle();
          }, 400);


        var topics = extractSEEKTOPIC(newArticle.html,
          {
            phrasesModel
          }
        );
        
        console.log(topics)

        topicsObject = topics;



      }
    } catch (error) {
      console.error("Error fetching article:", error);
      currentArticle = null;
    }
  }

  /**
   * Update the article view
   */
  function updateArticleView() {
    document.querySelector(".read-view").scrollTo(0, 0);
  }

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
      fetchAndDisplayArticle(searchResultList[newIndex].url, newIndex);
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
      fetchAndDisplayArticle(searchResultList[0].url, 0);
    }
  }

  /**
   * Run the summarize AI function on the current article
   */
  function summarizeArticle() {
    if (!currentArticle) return;

    // document.querySelector("#ai-generate-btn").click()
    actionsPanelComponent.generateAISummary();
  }
</script>

<svelte:head>
  <title>{APP_NAME}</title>
   
</svelte:head>

<main class="flex h-screen w-full">
  <Splitpanes>
    <!-- Sidebar (20% width)  -->
    <Pane size={20} snapSize={10}>
      <div class="h-full flex flex-col shadow-md p-1">
        <!-- Search bar at the top of the sidebar -->
        <div class="border-b border-gray-200">
          <SearchInput
            handleSubmit={handleSearchSubmit}
            {phrasesModel}
            {searchText}
          />
        </div>

        <!-- Search results  -->
        <div
          class="results-list flex-grow overflow-y-auto overflow-x-hidden p-0"
        >
          {#if searchResultList.length > 0}
            <ul class="space-y-1">
              {#each searchResultList as result, index}
                <li
                  class="rounded-lg p-2 transition-colors duration-300 cursor-pointer
                  {index === selectedResultIndex
                    ? 'bg-[#DFD8C2] shadow-xl -translate-y-1  active'
                    : 'bg-[#f8f8f8] hover:bg-[#DFD8C2] outline outline-1 ' +
                      ' outline-slate-300 hover:shadow-xl hover:-translate-y-1'}"
                  on:click={() => fetchAndDisplayArticle(result.url, index)}
                >
                  <div class="flex justify-between items-top mb-1">
                    <div
                      class="text-md font-medium mb-0 text-slate-600 flex-grow pr-2 max-w-full"
                    >
                      {convertHTMLSpecialChars(result.title)}
                    </div>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-gray-500 hover:text-gray-700 flex-shrink-0 absolute top-1 right-1"
                      title="Open in new tab"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-external-link"
                      >
                        <path
                          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                        ></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                  <span class="text-sm inline truncate text-blue-900">
                    {result.url
                      ?.replace(/(http:\/\/|https:\/\/|www.)/gi, "")
                      .split("/")[0]}</span
                  ><span class="text-xs truncate text-slate-400 pr-4"
                    >{result.url
                      ?.replace(/(http:\/\/|https:\/\/|www.)/gi, "")
                      .split("/")
                      .slice(1)
                      .join("/")
                      .replace(/^/, "/")}</span
                  >
                </li>
              {/each}
              {#if isLoading}
                <li class="text-center py-4">
                  <div class="loader"></div>
                </li>
              {/if}
            </ul>
          {:else}
            <p class="text-gray-500 text-center mt-4">No results to display</p>
          {/if}
        </div>
      </div>
    </Pane>

    <!-- ReadView (center panel) -->
    <Pane size={45} snapSize={10}>
      <ReadView selectedArticle={currentArticle} {topicsObject} />
    </Pane>

    <!-- GRAPH 
    <Pane size={45} snapSize={10}>
      <Graph />
    </Pane> -->

    <!-- ActionsPanel (right panel) -->
    <Pane size={35} snapSize={10}>
      <ActionsPanel
        bind:this={actionsPanelComponent}
        selectedArticle={currentArticle}
      />
    </Pane>
  </Splitpanes>
</main>

<style>
  :global(.splitpanes) {
    height: 100vh;
  }

  :global(body) {
    font-family: "Merriweather", "Open Sans", "Lato", sans-serif;
  }
</style>
