<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  // import "grab-api.js/global";
  import { grab } from "grab-api.js";
  import { setStateInURL } from "$components/utils";
  import { Splitpanes, Pane } from "svelte-splitpanes";
  import SearchInput from "./MainInputBox.svelte";
  import SearchResults from "./SearchResults.svelte";
  import ReadView from "./ReadView.svelte";
  import AgentsPanel from "./AgentsPanel.svelte";
  import SearchHome from "./SearchHomepage.svelte";
  import "./home-style.css";

  let { user = {} as User } = $props();

  let searchText = $state("");
  let phrasesModel = $state({}) as Response & {
    topicModel?: any;
  };
  let AgentsPanelComponent = $state(null);
  let selectedResultIndex = $state(-1);
  let selectedCategory = $state("");
  let fetchingURL = $state("");

  let searchResults = $state({}) as Response & {
    results?: Array<SearchResult>;
  };
  let resultsList: HTMLElement;
  let extractedArticle = $state({}) as Response & Article;

  let options = $state({
    AutoSummarize: true,
    ShowURLPath: false,
    ShowImages: false,
    OpenFirstResultInBackgroundTab: false,
    OpenFirstResultInSameTab: false,
    ...(user?.settings as UserSettings), //merge user settings
  });

  $effect(() => {
    if (extractedArticle?.url) setStateInURL({ extract: extractedArticle.url });
    if (searchText) setStateInURL({ q: searchText });
    if (selectedCategory) setStateInURL({ cat: selectedCategory });

    //reset view
    if (selectedResultIndex !== -1) scrollActiveResultIntoView();
  });

  let grabSearchResults = () =>
    grab("search", {
      response: searchResults,
      q: searchText,
      cat: selectedCategory,
      lang: navigator?.language,
      cancelNewIfOngoing: false,
      cancelOngoingIfNew: true,
      infiniteScroll: ["page", "results", ".results-list"],
      cache: false,
      debug: true   
    });

  /**
   * Fetch and display html from URL
   * @param {string} articleUrl - The URL of the article to fetch
   * @param {number} index - The index of the article in the search results
   */
  let grabArticle = async (articleUrl, index?) => {
    fetchingURL = articleUrl;
    await grab("extract", {
      response: extractedArticle,
      url: articleUrl,
      cancelOngoingIfNew: true,
    });

    var readViewElement = document.querySelector(".read-view");
    readViewElement?.scrollTo(0, 0);

    // Run summarize AI function
    AgentsPanelComponent?.callLanguageAPI("suggest-followups");
    setTimeout(() => {
      AgentsPanelComponent?.callLanguageAPI("question");
    }, 1000);
  };

  onMount(async () => {
    setupKeyboardListener();

    //focus on input
    document.querySelector("#searchInput")?.dispatchEvent(
      new MouseEvent("mousedown", {
        bubbles: true,
      })
    );

    // handle incoming vars in URL from browser search or extension

    let { q, cat, extract: urlToExtract, prompt, first } = setStateInURL();

    if (first) options.OpenFirstResultInSameTab = true;

    if (cat) selectedCategory = cat;

    if (urlToExtract) grabArticle(urlToExtract, 0);

    if (q) {
      searchText = q;
      handleSearchSubmit();
    }

    // initialize phrases model
    phrasesModel = await grab("model", {debug: false});

    //setup infinite loading scroll listener

    // setupScrollListener(".results-list", grabSearchResults);
  });

  /**
   * Sets up an infinite scroll listener to get more results when scrolled.
   * @param {HTMLElement|string} element - The element or selector to attach scroll to
   * @param {Function} searchFunction - The function to call when scrolled near bottom
   */
  // let setupScrollListener = (
  //   element: HTMLElement | string,
  //   searchFunction: Function
  // ) =>
  //   (typeof element === "string"
  //     ? document.querySelector(element)
  //     : element
  //   )?.addEventListener(
  //     "scroll",
  //     ({ target: t }: any) =>
  //       t.scrollHeight - t.scrollTop <= t.clientHeight + 200 && alert()
  //   );

  onDestroy(() => {
    cleanupKeyboardListener();
  });

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

  function updateSearchText(newText) {
    searchText = newText;
  }

  /**
   * Handle the search submission and load new results
   */
  async function handleSearchSubmit() {
    await grabSearchResults();

    // setup scroll listener for infinite loading

    //reset scroll and selected result
    document.querySelector(".results-list")?.scrollTo(0, 0);
    selectedResultIndex = -1;

    document.body.focus();
    (document.querySelector(".search-input") as HTMLElement)?.blur();

    // test if q is valid url with regex, then extract that URL
    if (
      searchText.match(
        /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/
      )
    ) {
      grabArticle(searchText, 0);
      return;
    }

    //otherwise autoload first result
    let firstResult = searchResults.results?.[0]?.url;
    if (!firstResult) return;

    if (options.OpenFirstResultInBackgroundTab)
      window.open(firstResult, "_blank");
    else if (options.OpenFirstResultInSameTab)
      window.location.href = firstResult;

    // auto extract first result
    grabArticle(firstResult, 0);
  }

  // Constants
  const SCROLL_DISTANCE = 100;
  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} event - The keyboard event
   */
  function handleKeyboardNavigation(event) {
    var { key, target } = event;

    // if inside text input, do not use key shortcuts
    if (
      (key != "Esc" &&
        target instanceof HTMLInputElement &&
        !"button,checkbox,radio,submit,reset,file,image,range,color"
          .split(",")
          .includes(target.type)) ||
      target instanceof HTMLTextAreaElement ||
      target.isContentEditable
    )
      return;

    // WASD to scroll and navigate search results
    const navigationActions = {
      Esc: () => document.body.focus(),
      W: () => scrollArticle(-SCROLL_DISTANCE),
      S: () => scrollArticle(SCROLL_DISTANCE),
      A: () => navigateSearchResults(-1),
      D: () => navigateSearchResults(1),
    };

    if (key in navigationActions) navigationActions[key]();
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
    if (newIndex >= 0 && newIndex < searchResults?.results?.length) {
      selectedResultIndex = newIndex;
      grabArticle(searchResults?.results[newIndex].url, newIndex);
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

  function handleCategoryClick(category) {
    selectedCategory = category.code;
    handleSearchSubmit();
  }
</script>

<main class="flex h-screen w-full">
  {#if searchText.length == 0}
    <SearchHome
      {user}
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

          <div
            bind:this={resultsList}
            class="results-list grow overflow-y-auto overflow-x-hidden p-0"
          >
            <SearchResults
              {searchResults}
              {selectedResultIndex}
              {grabArticle}
              {grabSearchResults}
            />
          </div>
        </div>
      </Pane>

      <!-- ReadView (center panel) -->
      <Pane size={45} snapSize={10}>
        <ReadView {extractedArticle} {grabArticle} {fetchingURL} />
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
          {extractedArticle}
        />
      </Pane>
    </Splitpanes>
  {/if}
</main>
