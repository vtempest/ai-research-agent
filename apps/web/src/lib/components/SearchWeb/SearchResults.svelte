<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { iconLoadingFloatingSearch } from "$lib/components/icons";

  let {
    searchResults = {} as any,
    selectedResultIndex = 0,
    grabArticle = () => {},
    grabSearchResults = () => {},
  }: {
    searchResults: Response & {
      results?: Array<SearchResult>;
    };
    selectedResultIndex: number;
    grabArticle: (url: string, index: number) => void;
    grabSearchResults: () => void;
  } = $props();

  let optionShowURLPath = false;
  let optionShowDomain = $state(false);

  onMount(() => {
    
    
  });

  onDestroy(() => {
    // resultsList.removeEventListener("scroll", handleScroll);
  });

  

  function handleResultClick(index) {
    selectedResultIndex = index;
    grabArticle(searchResults.results[index].url, index);
  }
</script>

  {#if searchResults?.results?.length}
    <div class="space-y-1">
      <!-- // @ts-ignore -->
      {#each searchResults.results as { title, url, favicon, domain, source }, index}
        <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
        <div
          class="rounded-lg p-2 transition-colors duration-300 cursor-pointer relative group
                {index === selectedResultIndex
            ? 'bg-[#DFD8C2] shadow-xl -translate-y-1  active'
            : 'bg-[#f8f8f8] hover:bg-[#DFD8C2] outline outline-1 ' +
              ' outline-slate-300 hover:shadow-xl hover:-translate-y-1'}"
          onclick={() => handleResultClick(index)}
        >
          <div class="flex justify-between items-top mb-1">
            <div
              class="text-md font-medium mb-0 text-slate-600 grow pr-2 max-w-full"
            >
              {title}
            </div>
            <a
              href={url}
              target="_blank"
              aria-label="Open in new tab"
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-gray-700 shrink-0 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
            <img alt="favicon" src={favicon} class="w-4 h-4 inline" />
            {optionShowDomain ? domain : source}
          </span>

          {#if optionShowURLPath}
            <span class="text-xs truncate text-slate-400 pr-4"> {domain}</span>
          {/if}
        </div>
      {/each}
    </div>
  {:else if !searchResults?.isLoading}
    <p class="text-gray-500 text-center mt-4">No results to display</p>
  {/if}

  {#if searchResults?.isLoading}
  <div class="text-center py-4">
    <div class="loader"></div>
    {@html iconLoadingFloatingSearch()}
  </div>
  {/if}
