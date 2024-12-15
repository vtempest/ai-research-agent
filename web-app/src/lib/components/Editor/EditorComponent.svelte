<script lang="ts">
  import { onMount, createEventDispatcher, afterUpdate } from "svelte";
  import { fade } from "svelte/transition";

  export let mainContent;
  export let viewMode;
  let editor;
  let Editor;
  let Root;
  let InlineMenu;
  let BubbleMenu;

  const dispatch = createEventDispatcher();

  onMount(async () => {
    if (typeof window !== "undefined") {
      const typewriterModule = await import("$ai-research-agent/src/editor");
      const { virtualRendering, smartEntry, smartQuotes } = typewriterModule;

      Editor = typewriterModule.Editor;
      BubbleMenu = typewriterModule.BubbleMenu;
      Root = typewriterModule.Root;
      InlineMenu = typewriterModule.InlineMenu;

      editor = new Editor({
        formats: ["link", "bold", "mark", "italic", "code", "underline"],
        modules: {
          smartEntry: smartEntry(),
          smartQuotes,
          rendering: virtualRendering,
        },
      });

      window.editor = editor;
    }
  });

  export function setHTML(html) {
    editor.setHTML(html);
  }

  export function getHTML() {
    return editor.getHTML();
  }

  function getEditorContent() {
    return mainContent.content || "<p>Start typing here...</p>";
  }

  function handleEditorUpdate() {
    if (editor) {
      const updatedContent = editor.getHTML();
      dispatch("updateContent", { content: updatedContent });
    }
  }
</script>

{#if editor}
  <InlineMenu {editor} let:active let:commands>
    <div class="menu inline-menu" in:fade={{ duration: 100 }}>
      <div data-popper-arrow class="arrow"></div>
      <button
        class="menu-button"
        class:active={active.header === 1}
        on:click={commands.header1}>H1</button
      >

      <button
        class="menu-button"
        class:active={active.header === 2}
        on:click={commands.header2}>H2</button
      >

      <button
        class="menu-button"
        class:active={active.header === 3}
        on:click={commands.header3}>H3</button
      >

      <button
        class="menu-button"
        class:active={active.header === 4}
        on:click={commands.header4}>Tag</button
      >
    </div>
  </InlineMenu>

  <BubbleMenu {editor} let:active let:commands let:placement>
    <div class="menu bubble-menu">
      <div data-arrow class="arrow {placement}"></div>

      <button
        class="menu-button"
        class:active={active.mark}
        on:click={commands.mark}>M</button
      >

      <button
        class="menu-button"
        class:active={active.underline}
        on:click={commands.underline}>U</button
      >
      <button
        class="menu-button"
        class:active={active.bold}
        on:click={commands.bold}>B</button
      >

      <button
        class="menu-button"
        class:active={active.italic}
        on:click={commands.italic}>I</button
      >

      <button
      class="menu-button"
      class:active={active.paragraph}
      on:click={commands.paragraph}>P</button
    >

      <button
      class="menu-button"
      class:active={active.header === 1}
      on:click={commands.header1}>H1</button
    >

    <button
      class="menu-button"
      class:active={active.header === 2}
      on:click={commands.header2}>H2</button
    >

    <button
      class="menu-button"
      class:active={active.header === 3}
      on:click={commands.header3}>H3</button
    >

    <button
      class="menu-button"
      class:active={active.header === 4}
      on:click={commands.header4}>Tag</button
    >
    </div>
  </BubbleMenu>

  <div class="editor {viewMode}">
    <Root {editor} on:update={handleEditorUpdate}>
      {@html getEditorContent()}
    </Root>
  </div>
{/if}

<style>
  
  :global(.editor h1,
  h2,
  h3,
  h4,
  h5,
  h6) {
    font-weight: bold !important;
    margin-top: 10px;
    padding: 4px;
  }
 
  :global(.editor h1) {
    font-size: 18pt !important;
  }

  :global(.editor h2) {
    font-size: 16pt !important;
  }
  :global(.editor h3) {
    font-size: 14pt !important;
  }

  :global(.editor h3) {
    font-size: 12pt !important;
    font-weight: bold;
  }
  :global(.editor h1),
  :global(.editor h2),
  :global(.editor h3){
    margin: 10px 5px;
    border-top: #dfdfdf 2px solid;
  }
  :global(.editor h1){
    margin: 10px 5px;
    font-variant: small-caps;
    /* border: 2px solid gray; */
    border-radius: 10px;
    background-color: rgb(225, 222, 222, 0.6);
    
    --tw-shadow: 0 3px 5px 0 rgb(0 0 0 / 0.4);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  }
  :global(.editor h2){
    font-variant: small-caps;
    background-color: rgb(225, 222, 222, 0.4);
     margin: 10px 5px;
    /* border: 2px solid gray; */
    border-radius: 10px;
    --tw-shadow: 0 2px 4px 0 rgb(0 0 0 / 0.25);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  }
  :global(.editor h3) {
    background-color: rgb(225, 222, 222, 0.2);
    
    font-variant: small-caps;
     margin: 10px 5px;
    /* border: 2px solid gray; */
    border-radius: 10px;
    --tw-shadow: 0 2px 2px 0 rgb(0 0 0 / 0.15);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  }

  :global(.editor h3),
  :global(.editor h2),
  :global(.editor h1) {
    text-align: center;
  }

  .editor {
    margin-left: 8px;
    height: 100%;
    overflow-y: auto;
    background: #f3f3ee;
  }

  :global(.editor.highlighted *:is(strong, mark, h1, h2, h3, h4)) {
    line-height: 150%;
    font-size: initial;
    padding: 0px 2px;
    letter-spacing: normal;
  }

  :global(.editor.highlighted),
  :global(.editor.highlighted u strong),
  :global(.editor.highlighted strong > u) {
    font-size: 1pt;
    line-height: 50%;
    letter-spacing: -1px;
  }

  /* if in highlightmode but card is not highlighted
    then make the underlined text normal
  */

  :global(.editor.highlighted  p:not(:has(mark)) u) {   
    
    font-size: initial;
    letter-spacing: normal;
    line-height: 150%;
  }

  :global(.editor.underlined *:is(strong, b, u, mark, h1, h2, h3, h4)) {
    font-size: initial;
    letter-spacing: normal;
    line-height: 150%;
  }

  :global(.editor.underlined) {
    font-size: 1pt;
    line-height: 50%;
    letter-spacing: -1px;
  }

  :global(.editor.show-all) {
    font-size: 8pt !important;
  }

  :global(.editor.show-all *:is(strong, b, u, mark, h1, h2, h3, h4)) {
    font-size: initial !important;
  }

  :root {
    --yellow: #f1e83e;
    --gray: #f0f0f0;
    --slate: #f0f0f3;
    --tomato: #feebe7;
    --red: #feebec;
    --ruby: #feeaed;
    --crimson: #ffe9f0;
    --pink: #fee9f5;
    --plum: #fbebfb;
    --purple: #f7edfe;
    --violet: #f4f0fe;
    --iris: #f0f1fe;
    --indigo: #e1e9ff;
    --blue: #e6f4fe;
    --cyan: #def7f9;
    --teal: #e0f8f3;
    --jade: #e6f7ed;
    --green: #e6f6eb;
    --bronze: #f6edea;
    --gold: #f2f0e7;
    --brown: #f6eee7;
    --orange: #ffefd6;
    --amber: #fff7c2;
    --lime: #eef6d6;
    --mint: #ddf9f2;
    --sky: #e1f6fd;
  }

   :global(.editor mark) {
    background-color: var(--yellow);
    text-decoration: underline;
  }

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

  .menu {
    display: flex;
    height: 32px;
    color: #999;
    white-space: nowrap;
  }
  .menu-button:hover {
    color: #444;
  }
  .separator {
    height: 16px;
    margin: 8px 0;
    border-right: 1px solid #aaa;
  }
  .description {
    margin-bottom: 20px;
  }

  .menu {
    position: absolute;
    display: flex;
    z-index: 100;
    height: 32px;
    white-space: nowrap;
    background-color: #E8E5D8;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .inline-menu {
    top: 0;
    left: 0;
  }

  .bubble-menu {
    transform: translateY(-100%);
  }

  .menu-button {
    text-align: center;
    border: none;
    margin: 0;
    padding: 0;
    width: 32px;
    height: 32px;
    line-height: 32px;
    color: #777;
    font-size: 12px;
    background: none;
    outline: none;
    cursor: pointer;
  }

  .menu-button:hover {
    color: #444;
  }

  .menu-button.active {
    background-color: #cdb85c;
  }

  .arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    visibility: hidden;
  }

  .arrow::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }
  
  :global(.editor strong, em ){
    font-weight: bold !important;
  }

</style>
