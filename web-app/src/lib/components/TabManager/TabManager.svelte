<script lang="ts">
  import { writable, derived } from "svelte/store";
  import TabList from "./TabList.svelte";
  import WebSearch from "./WebSearch.svelte";

  import * as Tabs from "$lib/components/ui/tabs";
  import { Layers, AppWindow, Settings } from "lucide-svelte";

  const tabsStore = writable([]);
  export const resultsStore = derived(tabsStore, ($tabs) => $tabs);

  $: results = $resultsStore;

  // Fetch all tabs and update the store
  async function fetchAllTabs() {
    chrome.tabs.query({}, (tabs) => {

      console.log(JSON.stringify(tabs));
      
      const newResults = tabs
        .filter((tab) => !tab.url?.startsWith("chrome://")) //TODO add as blank
        .map((tab) => ({
          id: tab.id,
          title: tab.title,
          url: tab.url,
          active: tab.active,
          favIconUrl:  `chrome-extension://${chrome.runtime.id}`+
            `/_favicon/?pageUrl=${encodeURIComponent(tab.url)}&size=16`,
          dispString: false,
          muted: tab.mutedInfo?.muted,
          audible: tab.audible,
        }));

      tabsStore.set(newResults);
    });
  }


</script>

<div class="  bg-[#f7f7f7] container mx-auto p-2 max-w-sm h-screen">
  <Tabs.Root value="tabs" class="w-full">
     <Tabs.List>
      <Tabs.Trigger value="tabs" class="flex items-center gap-2">
        <Layers size={16} />
        <span>Tabs</span>
      </Tabs.Trigger>
      <Tabs.Trigger value="apps" class="flex items-center gap-2">
        <AppWindow size={16} />
        <span>AI</span>
      </Tabs.Trigger>
      <Tabs.Trigger value="settings" class="flex items-center gap-2">
        <Settings size={16} />
        <span>Search</span>
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="tabs">
      
      <WebSearch {results} {tabsStore} {fetchAllTabs} />
      <TabList {results} {tabsStore} {fetchAllTabs} />
    </Tabs.Content>
    <Tabs.Content value="apps">
      <!-- <Categorizer {tabsStore}  /> -->
      <!-- Add content for Apps here -->
    </Tabs.Content>
    <Tabs.Content value="settings">
      <!-- Add content for Settings here -->
    </Tabs.Content>
  </Tabs.Root>
</div>