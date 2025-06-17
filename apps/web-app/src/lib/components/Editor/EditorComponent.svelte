<script lang="ts">
  import { onMount } from "svelte";
  import { Root, InlineMenu, BubbleMenu} from "reason-editor/svelte";
  import  { virtualRendering, smartEntry, smartQuotes, Editor } from "reason-editor";

  let { viewMode, content } = $props();

  let editor = $state(null);

  $effect(() => {
    if (content && editor) editor.setHTML(content);
  });

  onMount(async () => {
    if (typeof window == "undefined") return;
    // @ts-ignore
    // const typewriterModule = await import("ai-research-agent/src/editor");
    // const { virtualRendering, smartEntry, smartQuotes } = typewriterModule;

    // let Editor = typewriterModule.;
    // BubbleMenu = typewriterModule.BubbleMenu;
    // Root = typewriterModule.Root;
    // InlineMenu = typewriterModule.InlineMenu;

    editor = new Editor({
      modules: {
        smartEntry: smartEntry(),
        smartQuotes,
        rendering: virtualRendering,
      },
    });

    // @ts-ignore
    window.editor = editor;
  });

  export function setHTML(html) {
    editor.setHTML(html);
  }

  export function getHTML() {
    return editor.getHTML();
  }
</script>

{#if editor}
  <InlineMenu {editor} let:active let:commands>
    <div class="menu inline-menu z-100">
      <div data-popper-arrow class="arrow"></div>
      <button
        class="menu-button"
        class:active={active.header === 1}
        onclick={commands.header1}>H1</button
      >

      <button
        class="menu-button"
        class:active={active.header === 2}
        onclick={commands.header2}>H2</button
      >

      <button
        class="menu-button"
        class:active={active.header === 3}
        onclick={commands.header3}>H3</button
      >

      <button
        class="menu-button"
        class:active={active.header === 4}
        onclick={commands.header4}>Tag</button
      >
    </div>
  </InlineMenu>

  <BubbleMenu {editor} let:active let:commands let:placement>
    <div class="menu bubble-menu  ">
      <div data-arrow class="arrow {placement}"></div>

      <button
        class="menu-button"
        class:active={active.mark}
        onclick={commands.mark}>M</button
      >

      <button
        class="menu-button"
        class:active={active.underline}
        onclick={commands.underline}>U</button
      >
      <button
        class="menu-button"
        class:active={active.bold}
        onclick={commands.bold}>B</button
      >

      <button
        class="menu-button"
        class:active={active.italic}
        onclick={commands.italic}>I</button
      >

      <button
        class="menu-button"
        class:active={active.paragraph}
        onclick={commands.paragraph}>P</button
      >

      <button
        class="menu-button"
        class:active={active.header === 1}
        onclick={commands.header1}>H1</button
      >

      <button
        class="menu-button"
        class:active={active.header === 2}
        onclick={commands.header2}>H2</button
      >

      <button
        class="menu-button"
        class:active={active.header === 3}
        onclick={commands.header3}>H3</button
      >

      <button
        class="menu-button"
        class:active={active.header === 4}
        onclick={commands.header4}>Tag</button
      >
    </div>
  </BubbleMenu>

  <div class="editor {viewMode}">
    <Root {editor}>
      {@html content}
    </Root>
  </div>
{/if}


<style>
  

/* editor textbox fixes */

/* Hide outline on contenteditable elements */
[contenteditable] {
  outline: none;
}

/* Optional: Add a custom focus style for accessibility */
[contenteditable]:focus {
  box-shadow: 0 0 0 0px black;
}

/* Ensure the text cursor is visible */
[contenteditable]:focus::selection {
  background: #835d16;
}

/* Hide the resize handle in Firefox */
[contenteditable] {
  resize: none;
}

/* Remove the default focus ring in Firefox */
[contenteditable]::-moz-focus-inner {
  border: 0;
}

/* Optional: Custom styling for placeholder text */
[contenteditable]:empty:before {
  content: attr(placeholder);
  color: #888;
  font-style: italic;
}

  :global(.editor h1, h2, h3, h4, h5, h6) {
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
  :global(.editor h3) {
    margin: 10px 5px;
    border-top: #dfdfdf 2px solid;
  }
  :global(.editor h1) {
    margin: 10px 5px;
    font-variant: small-caps;
    /* border: 2px solid gray; */
    border-radius: 10px;
    background-color: rgb(225, 222, 222, 0.6);

    --tw-shadow: 0 3px 5px 0 rgb(0 0 0 / 0.4);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  :global(.editor h2) {
    font-variant: small-caps;
    background-color: rgb(225, 222, 222, 0.4);
    margin: 10px 5px;
    /* border: 2px solid gray; */
    border-radius: 10px;
    --tw-shadow: 0 2px 4px 0 rgb(0 0 0 / 0.25);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  :global(.editor h3) {
    background-color: rgb(225, 222, 222, 0.2);

    font-variant: small-caps;
    margin: 10px 5px;
    /* border: 2px solid gray; */
    border-radius: 10px;
    --tw-shadow: 0 2px 2px 0 rgb(0 0 0 / 0.15);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  :global(.editor h3),
  :global(.editor h2),
  :global(.editor h1) {
    text-align: center;
  }

  .editor {
    /* margin-left: 8px; */
    height: 100%;
    overflow-y: auto;
    /* background: #f3f3ee; */
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

  :global(.editor.highlighted p:not(:has(mark)) u) {
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
    height: 32px;
    white-space: nowrap;
    background-color: #e8e5d8;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .inline-menu {
    top: 0;
    left: 0;
  }

  .bubble-menu {
    transform: translate(-30%, 0%);
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

  .highlight-cursor {
    cursor:
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M2 30l3-3 6-1.5L28.5 8c1-1 1-2.6 0-3.5L26 2c-1-1-2.6-1-3.5 0L5 19.5 3.5 25.5 1 28z" fill="%23E68D2C"/><path d="M2 30l3-3 6-1.5L28.5 8c1-1 1-2.6 0-3.5L8 26z" fill="%23E06B34"/><path d="M17 11.5l3.5 3.5-9 9-3.5-3.5z" fill="%23A8EAEF"/><path d="M18.5 13l2 2-9 9-2-2z" fill="%2380CDD8"/><path d="M5 19.5 3.5 25.5 1 28l2 2 2.5-2.5 6-1.5L5 19.5z" fill="%23D1393C"/></svg>')
        0 32,
      auto;
  }
</style>