<script lang="ts">
  import { onMount } from 'svelte';
  import type { Editor } from '../src/Editor';
  import { docFromDom } from '../src/rendering/html';

  export let editor;
  let className = '';
  export { className as class };

  let root: HTMLElement | undefined;
  let lastEditor: Editor | undefined;

  $: updateEditor(editor, root);

  function updateEditor(editor: Editor, root?: HTMLElement) {
    if (!root) return;
    if (lastEditor) {
      lastEditor.destroy();
    }
    lastEditor = editor;
    if (editor) {
      editor.setRoot(root);
    }
  }

  onMount(() => {
    if (!root) return;
    const old = Array.from(root.childNodes);
    if (editor && root.children.length) {
      editor.set(docFromDom(editor, root));
    }
    return () => {
      for (let i = 0; i < old.length; i++) root?.appendChild(old[i]);
    };
  });
</script>

<div bind:this={root} class={className}>
  <slot></slot>
</div>
