<script lang="ts">
  import TableOfContents from './TableOfContents.svelte';
  import SearchBox from './SearchBox.svelte';

  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  
  import FileSystem from "$lib/components/FileSystem/F2.svelte";
  import { FileIcon, SettingsIcon } from "lucide-svelte" // or your preferred icon library

  let {
    mainContent,
    headingsOutline,
    editor,
    handleLoadBlock,
    currentHeading,
    handleRenameHeading
  } = $props()

  let lastEdited = mainContent.lastEdited || new Date().toLocaleDateString();

  let filteredHeadings = [];

  function handleHeadingsFiltered(event) {
    filteredHeadings = event.detail;
  }
</script>

<div class="bg-[#F3F3EE] h-full pl-2  flex flex-col">
  <div class="space-y-4 overflow-y-auto grow">
    <div class="sticky top-0 bg-[#F3F3EE] pt-2 z-10 pb-14">
      <SearchBox {editor} {handleHeadingsFiltered} />
    </div>

    <div class="text-md font-semibold  tracking-tight text-gray-900">
      {mainContent.title}
    </div>


<Tabs.Root value="outline" class="w-full">
  <Tabs.List class="grid w-full grid-cols-2"> <!-- Added grid classes -->
    <Tabs.Trigger value="outline">
      <FileIcon class="mr-2 h-4 w-4" />
      Outline
    </Tabs.Trigger>
    <Tabs.Trigger value="docs">
      <SettingsIcon class="mr-2 h-4 w-4" />
      Docs
    </Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="outline">
    <Card.Root> <!-- Added Card container -->
      <Card.Content>
        <div class="space-y-2">
          <TableOfContents 
            {headingsOutline}
            {handleLoadBlock}
            {mainContent} 
            {editor} 
            {currentHeading}
          />
        </div>
        <div class="space-y-2 mt-4">
          <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400">Document Info</h3>
          <p class="text-sm text-gray-600">Last edited: {lastEdited}</p>
          <div class="text-sm text-gray-500">Word count: {mainContent.wordCount}</div>
        </div>
      </Card.Content>
    </Card.Root>
  </Tabs.Content>

  <Tabs.Content value="docs">
    <Card.Root> <!-- Added Card container -->
      <Card.Content>
        <FileSystem />
      </Card.Content>
    </Card.Root>
  </Tabs.Content>
</Tabs.Root>

  </div>
</div>