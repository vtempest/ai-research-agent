<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { X, GripVertical } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { Card } from "$lib/components/ui/card";
  import Sortable from 'sortablejs';

  export let results;
  export let tabsStore;
  export let fetchAllTabs;

  const OPTION_HIGHLIGHT_RESULT = 0;
  let tabMessage = "Search text of open tabs or web";
  let listElement: HTMLElement;
  let sortableInstance: Sortable;

 

  onMount(() => {
    fetchAllTabs();
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "updateTabLists") {
        fetchAllTabs();
      } else if (message.type === "tabActivated") {
        updateActiveTab(message.tabId);
      }
    });

    // Initialize Sortable
    sortableInstance = new Sortable(listElement, {
      animation: 150,
      ghostClass: "bg-info",
      handle: ".cursor-grab",
      onEnd: (evt) => {
        handleSort();
      }
    });
  });

  onDestroy(() => {
    if (sortableInstance) {
      sortableInstance.destroy();
    }
  });

  function updateActiveTab(activeTabId) {
    tabsStore.update((tabs) =>
      tabs.map((tab) => ({ ...tab, active: tab.id === activeTabId }))
    );
  }

  function handleResultClick(result) {
    chrome.tabs.get(result.id, function (tab) {
      chrome.windows.get(tab.windowId, function (win) {
        chrome.windows.update(win.id, { focused: true });
      });
    });

    chrome.tabs.update(result.id, { active: true });

    chrome.scripting.executeScript({
      target: { tabId: result.id, allFrames: true },
      args: [result?.lastSearchWord || "", OPTION_HIGHLIGHT_RESULT],
      func: (search, OPTION_HIGHLIGHT_RESULT) => {
        window.find(search, false, false, true, false, true, false);

        if (OPTION_HIGHLIGHT_RESULT) {
          let newNode = document.createElement("mark");
          newNode.className = "highlight";
          let selection = window.getSelection();
          selection.getRangeAt(0).surroundContents(newNode);
        }
      },
    });
  }

  

  function handleSort() {
    tabsStore.set(results);

    chrome.runtime.sendMessage({
      type: "updateTabOrder",
      newOrder: results.map((item) => item.id),
    });

    console.log("Refetching tabs and forcing re-render after sort");
    fetchAllTabs();
  }

  function closeTab(tabId, event) {
    event.stopPropagation();
    chrome.tabs.remove(tabId, () => {
      tabsStore.update((tabs) => tabs.filter((tab) => tab.id !== tabId));
    });
  }

  function toggleAudio(tabId, event) {
    event.stopPropagation();
    chrome.tabs.get(tabId, (tab) => {
      chrome.tabs.update(
        tabId,
        { muted: !tab.mutedInfo.muted },
        (updatedTab) => {
          tabsStore.update((tabs) =>
            tabs.map((t) =>
              t.id === tabId ? { ...t, muted: updatedTab.mutedInfo.muted } : t
            )
          );
        }
      );
    });
  }



</script>

<div bind:this={listElement} class="list-group col">
  {#each results as result (result.id)}
        <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div
      class="list-group-item no-select cursor-pointer"
      onclick={() => handleResultClick(result)}
    >
      <Card
        class="cursor-grab py-2 px-3 flex items-center space-x-3 transition-colors duration-200 {result.active
          ? 'bg-slate-300 border-slate-300  hover:bg-slate-300'
          : 'bg-slate-200 border-slate-300  hover:bg-gray-100'}"
      >
        {#if result.favIconUrl}
          <img src={result.favIconUrl} alt="" class="w-4 h-4 shrink-0" />
        {:else}
          <div class="w-4 h-4 shrink-0 bg-gray-200 rounded-full" ></div>
        {/if}
        {#if result.audible || result.muted}
          <span
            class="text-slate-800 cursor-pointer"
            onclick={(e) => toggleAudio(result.id, e)}
            title={result.muted ? "Unmute" : "Mute"}
          >
            {#if result.muted}
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
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            {:else}
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
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path
                  d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
                ></path>
              </svg>
            {/if}
          </span>
        {/if}
        <div class="grow flex flex-col justify-center overflow-hidden">
          <p
            class="text-sm font-medium text-gray-900 truncate"
            title={result.title}
          >
            {result.title}
          </p>
          {#if result.dispString}
            <p class="text-xs text-gray-500 break-words">
              {@html result.dispString}
            </p>
          {/if}
        </div>
        <Button
          variant="ghost"
          size="icon"
          class="shrink-0 h-6 w-6 hover:bg-slate-300"
        >
          <span onclick={(e) => closeTab(result.id, e)}>
            <X size={14} class="text-gray-500" />
          </span>
        </Button>
      </Card>
    </div>
  {/each}
</div>

{#if results.length === 0}
  <div class="p-2 text-sm italic text-gray-600">
    {tabMessage}
  </div>
{/if}

<style>
  :global(.bg-info) {
    background-color: #cce5ff;
  }
  .no-select {
    user-select: none;
  }
</style>