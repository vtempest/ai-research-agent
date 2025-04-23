<script lang="ts">
  import TableOfContents from './TableOfContents.svelte';
  import SearchBox from './SearchBox.svelte';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs"
  import FileSystem from "$lib/components/FileSystem/F2.svelte";
  import { FileIcon, SettingsIcon } from "lucide-svelte" // or your preferred icon library

  let {
    mainContent,
    headingsOutline,
    editor,
    handleLoadBlock,
    currentHeading,
    handleReadingStyleChange,
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

    <Tabs defaultValue="outline" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="outline">
          <FileIcon className="mr-2 h-4 w-4" />
          Outline
        </TabsTrigger>
        <TabsTrigger value="docs">
          <SettingsIcon className="mr-2 h-4 w-4" />
          Docs
        </TabsTrigger>
      </TabsList>
      <TabsContent value="outline">
        

            <!-- Outline -->
            <div class="space-y-2">
              <!-- <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400">Outline</h3> -->
              <div class="space-y-2">
                <TableOfContents 
                  {headingsOutline}
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

    </TabsContent>
      <TabsContent value="docs">
        <FileSystem />
      
      </TabsContent>
    </Tabs>

    
  </div>
</div>