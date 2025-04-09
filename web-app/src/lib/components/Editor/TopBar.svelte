<script lang="ts">
  import { Upload, Eye, X, Copy } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import * as Select from "$lib/components/ui/select";
  import * as Tabs from "$lib/components/ui/tabs";

  let { 
    recentBlocks, 
    handleLoadBlock, 
    handleViewModeChange,
     triggerFileUpload, handleCopy 
  } = $props();

  
  let viewMode = $state("show-all");
  $effect(() => {
    if (viewMode) {
      document.querySelector(".editor")?.classList.remove("show-all", "highlighted", "underlined", "edit");

      document.querySelector(".editor")?.classList.add(viewMode);
    }
  }
  )

  const ENLARGE_TERM = 'Embiggen ';
  // BBC (2018, March 6). "Word created by The Simpsons added 
  //  to US dictionary." BBC. https://www.bbc.com/news/newsbeat-43298229

  const viewModes = [
    { value: "highlighted", label: ENLARGE_TERM + "Highlighted" },
    { value: "underlined", label: ENLARGE_TERM + "Underlined" },
    { value: "show-all", label: "Show All" },
    { value: "edit", label: "Editing" },

  ];
  function handleRecentBlockClick(block) {
    if (block && block.blockIndex !== undefined) {
      handleLoadBlock({ detail: block });
    }
  }

  function removeRecentBlock(blockIndex) {
    if (blockIndex !== undefined) {
      recentBlocks = recentBlocks.filter(block => block.blockIndex !== blockIndex);
    }
  }

</script>

<div class="border-b p-2 flex items-center space-x-4 shadow-md ">
  <Select.Root type="single" name="viewMode" bind:value={viewMode} onSelectedChange={handleViewModeChange}>
    <Select.Trigger class="min-w-[120px] w-[120px] shadow-sm bg-white">
      <Eye class="h-4 w-4 mr-2" />
      {viewModes.find(mode => mode.value === viewMode)?.label || ''} 

    </Select.Trigger>
    <Select.Content class="bg-white shadow-md">
      <Select.Group>
        <Select.GroupHeading>Embiggen</Select.GroupHeading>
        {#each viewModes as mode}
          <Select.Item value={mode.value} class="bg-white hover:bg-gray-100">
            {mode.label}
          </Select.Item>
        {/each}
      </Select.Group>
    </Select.Content>
  </Select.Root>

  <Button variant="outline" class="whitespace-nowrap shadow-sm bg-white" onclick={triggerFileUpload}>
    <Upload class="h-4 w-4 mr-2" />
    Upload
  </Button>

  <Button variant="outline" class="whitespace-nowrap shadow-sm bg-white" onclick={handleCopy}>
    <Copy class="h-4 w-4 mr-2" />
      </Button>

  {#if recentBlocks && recentBlocks.length > 0}
    <Tabs.Root value={activeTab} class="flex-1">
      <Tabs.List class="w-full bg-muted p-1 rounded-md shadow-sm">
        {#each recentBlocks as block (block.blockIndex)}
          {#if block && block.blockIndex !== undefined}
            <Tabs.Trigger
              value={block.blockIndex.toString()}
              class="relative data-[state=active]:shadow-sm"
              onclick={() => handleRecentBlockClick(block)}
            >
              {block.title || 'Untitled'}
              <button
                class="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                onclick={() => removeRecentBlock(block.blockIndex)}
              >
                <X class="h-3 w-3" />
              </button>
            </Tabs.Trigger>
          {/if}
        {/each}
      </Tabs.List>
    </Tabs.Root>
  {/if}
</div>


<style>
  :global(.select-content) {
    background-color: white !important;
    border: 1px solid #e2e8f0 !important;
  }
  
  :global(.select-trigger) {
    background-color: white !important;
  }

  :global(.select-item) {
    background-color: white !important;
  }

  :global(.select-item:hover) {
    background-color: #f3f4f6 !important;
  }
</style>