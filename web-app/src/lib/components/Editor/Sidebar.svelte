<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TableOfContents from './TableOfContents.svelte';
  import SearchBox from './SearchBox.svelte';

  export let mainContent;
  export let headings;
  export let editor;
  export let currentHeading;
  export let handleLoadBlock;

  let lastEdited = mainContent.lastEdited || new Date().toLocaleDateString();

  const dispatch = createEventDispatcher();

  let filteredHeadings = [];

  function handleHeadingsFiltered(event) {
    filteredHeadings = event.detail;
  }

  $: displayHeadings = filteredHeadings.length ? filteredHeadings : headings;

</script>

<div class="bg-[#F3F3EE] h-full pl-2  flex flex-col">
  <div class="space-y-4 overflow-y-auto flex-grow">
    <div class="sticky top-0 bg-[#F3F3EE] pt-2 z-10">
      <SearchBox {headings} {editor} on:headingsFiltered={handleHeadingsFiltered} />
    </div>

    <div class="text-md font-semibold  tracking-tight text-gray-900">
      {mainContent.title}
    </div>



    <!-- Outline -->
    <div class="space-y-2">
      <!-- <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400">Outline</h3> -->
      <div class="space-y-2">
        <TableOfContents 
          headings={displayHeadings}
          {handleLoadBlock}
          {mainContent} 
          {editor} 
          {currentHeading}
        />
      </div>
    </div>

    <div class="space-y-2">
      <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400">Document Info</h3>
      <p class="text-sm text-gray-600">Last edited: {lastEdited}</p>
      <div class="text-sm text-gray-500">Word count: {mainContent.wordCount}</div>
    </div>
    
  </div>
</div>