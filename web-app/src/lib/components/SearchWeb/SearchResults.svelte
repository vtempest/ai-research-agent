<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { convertHTMLToEscapedHTML } from "$ai-research-agent";
    import ReadView from "./ReadView.svelte";
    export let searchResultList = [];
    export let selectedResultIndex = -1;
    export let currentArticle = null;
    
    export let fetchArticle = (url, index) => {};

    export let isLoading = false;

    let optionShowURLPath = false;

    function handleResultClick(index) {
        selectedResultIndex = index;
        currentArticle = searchResultList[index];
        fetchArticle(currentArticle.url, index);
        return false;
    }

</script>
<div class="results-list flex-grow overflow-y-auto overflow-x-hidden p-0">
    {#if searchResultList.length > 0}
        <ul class="space-y-1">
            {#each searchResultList as result, index}
                <li
                    class="rounded-lg p-2 transition-colors duration-300 cursor-pointer
                  {index === selectedResultIndex
                        ? 'bg-[#DFD8C2] shadow-xl -translate-y-1  active'
                        : 'bg-[#f8f8f8] hover:bg-[#DFD8C2] outline outline-1 ' +
                          ' outline-slate-300 hover:shadow-xl hover:-translate-y-1'}"
                             on:click={() => handleResultClick(index)}
                >
                    <div class="flex justify-between items-top mb-1">
                        <div
                            class="text-md font-medium mb-0 text-slate-600 flex-grow pr-2 max-w-full"
                        >
                            {convertHTMLToEscapedHTML(result.title)}
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
                        {@html `
                  <img src="https://www.google.com/s2/favicons?domain=${result.url.match(/^(?:https?:\/\/)?(?:www\.)?([^/:?\s]+)(?:[/:?]|$)/i)?.[0]}&sz=16"
                     class="w-4 h-4 inline"  onError="this.remove()"  />
                  `}
                        {result.url
                            ?.replace(/(http:\/\/|https:\/\/|www.)/gi, "")
                            .split("/")[0]}</span
                    >

                    {#if optionShowURLPath}
                        <span class="text-xs truncate text-slate-400 pr-4">
                            {result.url
                                ?.replace(/(http:\/\/|https:\/\/|www.)/gi, "")
                                .split("/")
                                .slice(1)
                                .join("/")
                                .replace(/^/, "/")}</span
                        >
                    {/if}
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
