<script lang="ts">
  import { onMount } from "svelte";
  import { Pane, Splitpanes } from "svelte-splitpanes";
  import { writable } from "svelte/store";
  import Sidebar from "./Sidebar.svelte";
  import TopBar from "./TopBar.svelte";
  import EditorComponent from "./EditorComponent.svelte";
  import { parseDebateDocx } from "./docx/parse-debate-docx";
  import { documentToMarkup } from "./docx/docx-to-html";

  const browser = typeof window !== "undefined";

  export let mainContent;
  export let fileNameId: string = null;

  const MAX_RECENT_BLOCKS = 8;

  let viewMode = "show-all";
  let headings = [];
  let readingStyle = "default";
  let fileInput: HTMLInputElement;
  let currentHeading = null;
  let activeBlockIndex: number = 0;
  let recentBlocks: { blockIndex: number; title: string; level: number }[] = [];
  let editor: any;

  const mainContentStore = writable({
    wordCount: 0,
    title: "REASON ",
    content: `<h2>REASON</h2><h3>Research Editor for Annotated Summaries in Outline Notation </h3><p>Start <u>editing</u> and <mark>marking</mark> your content here.</p>`,
    outline: [],
  });

  mainContentStore.subscribe((value) => {
    mainContent = value;
  });

  function handleScroll() {
    // Implement scrolling logic for the editor
  }

  function calculateWordCount() {
    const totalWordCount = mainContent.content
      .replace(/<[^>]*>/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    mainContentStore.update((mc) => ({ ...mc, wordCount: totalWordCount }));
  }

  function handleReadingStyleChange(event) {
    readingStyle = event.detail;
    console.log("Reading style changed to:", readingStyle);
  }

  async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      try {
        mainContentStore.update((mc) => ({
          ...mc,
          content: "Loading document...",
        }));

        const htmlContent = await documentToMarkup(file);

        editor.setHTML(htmlContent);

        var outline = extractOutlineFromHTML(htmlContent);

        mainContentStore.update((mc) => ({
          ...mc,
          content: htmlContent,
          outline,
        }));
        calculateWordCount();
      } catch (error) {
        console.error("Error parsing DOCX file:", error);
        mainContentStore.update((mc) => ({
          ...mc,
          content: "Error loading document.",
        }));
      }
    }
  }

  function extractOutlineFromHTML(htmlContent) {
    // Recursively split h1 h2 h3 into outline and blocks
    let cardCount = 0;
    let outline = htmlContent
      .split("<h1>")
      .slice(1)
      .map((h1) => {
        let h1Title = h1.split("</h")[0].replace(/<[^>]*>/g, "");

        let h2s = h1
          .split("<h2>")
          .slice(1)
          .map((h2) => {
            let h2Title = h2.split("</h")[0].replace(/<[^>]*>/g, "");

            let h3s = h2
              .split("<h3>")
              .slice(1)
              .map((block) => {
                let h3Title = block.split("</h")[0].replace(/<[^>]*>/g, "");

                let h4Titles = block.split("<h4>").map((card) => {
                  return {
                    h4Title: card.split("</h")[0].replace(/<[^>]*>/g, ""),
                  };
                });

                cardCount += block.split("<h4>").length - 1;

                return { h3Title, h4Titles };
              });
            return { h2Title, h3s };
          });
        return { h1Title, h2s };
      });

    mainContentStore.update((mc) => ({
      ...mc,
      outline,
    }));

    return outline;
  }

  function handleViewModeChange(event: CustomEvent) {
    viewMode = event.detail.value;
  }

  function triggerFileUpload() {
    fileInput.click();
  }

  function handleLoadBlock(event) {
    const newBlockIndex = event.detail.blockIndex;
    alert(newBlockIndex);
  }

  function handleRenameHeading(event) {
    const { level, oldText, newText, blocks } = event.detail;
    mainContentStore.update((mc) => {
      const newOutline = updateOutline(mc.outline, level, oldText, newText);

      //rename in the content
      // const updatedBlocks = [...mc.blocks];
      // updatedBlocks[blocks] = updatedBlocks[blocks].replace(
      //   new RegExp(`<h${level}>${oldText}</h${level}>`),
      //   `<h${level}>${newText}</h${level}>`
      // );

      recentBlocks = recentBlocks.map((block) =>
        block.blockIndex === blocks ? { ...block, title: newText } : block
      );

      return { ...mc, outline: newOutline, content: updatedBlocks };
    });
  }

  function updateOutline(outline, level, oldText, newText) {
    // Implementation to update the outline structure
    // ... (rest of the updateOutline function)
  }

  function handleEditorUpdate(event) {
    mainContentStore.update((mc) => ({ ...mc, content: event.detail.content }));
    calculateWordCount();
    extractOutlineFromHTML($mainContentStore.content);
  }

  async function handleCopy() {
    if (!editor) return;

    let html = editor.getHTML();
    // // add newlines between paragraphs for raw text
    html = html.replace(/<\/p>/g, "</p>\n")
    .replace(/<\/h1>/g, "</h1>\n")
    .replace(/&nbsp;/g, " ")
    .replace(/<\/h3>/g, "</h3>\n");

    let HTMLBlob = new Blob([html], { type: "text/html" });

    var copyPlainWithHTML = 1;
    var textContent = copyPlainWithHTML ? html : html.replace(/<[^>]*>/g, "");

    let textBlob = new Blob([textContent ?? ""], { type: "text/plain" });
    const clipboardItem = new window.ClipboardItem({
      "text/html": HTMLBlob,
      "text/plain": textBlob,
    });
    navigator.clipboard.write([clipboardItem]).then(() => {
      showCopiedMessage = true;
      setTimeout(() => {
        showCopiedMessage = false;
      }, 2000);
    });
  }

  let showCopiedMessage = false;
</script>

<svelte:head>
  <title
    >REASON: Research Editor for Annotated Summaries in Outline Notation</title
  >
</svelte:head>

<Splitpanes style="height: 100vh;">
  <Pane size={20}>
    <Sidebar
      {mainContent}
      {currentHeading}
      {headings}
      on:readingStyleChange={handleReadingStyleChange}
      on:renameHeading={handleRenameHeading}
      on:loadBlock={handleLoadBlock}
    />
  </Pane>

  <Pane>
    <div class="h-full flex flex-col">
      <TopBar
        {viewMode}
        {recentBlocks}
        on:copyContent={handleCopy}
        on:viewModeChange={handleViewModeChange}
        on:triggerFileUpload={triggerFileUpload}
        on:loadBlock={handleLoadBlock}
      />

      <div class="flex-grow overflow-hidden p-1" on:scroll={handleScroll}>
        <EditorComponent
          bind:this={editor}
          mainContent={$mainContentStore}
          {viewMode}
          on:updateContent={handleEditorUpdate}
        />
      </div>
    </div>
  </Pane>
</Splitpanes>

<input
  bind:this={fileInput}
  type="file"
  accept=".docx"
  on:change={handleFileUpload}
  style="display: none;"
/>
