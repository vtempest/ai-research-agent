<script lang="ts">
  import { createPopper, type Placement, type Instance as Popper } from '@popperjs/core';
  import { onDestroy } from 'svelte';
  import type { Editor } from './Editor';
  import { OFFSCREEN_RECT } from './popper';
  import { editorStores } from './stores';

  export let editor: Editor;
  let className = 'bubble-menu';
  export { className as class };
  export let offset = 40;
  export let padding = 0;
  let forLineType: string | undefined = undefined;
  export { forLineType as for };
  export let placement: Placement = 'bottom';

  let menu: HTMLElement;
  let popper: Popper | null = null;
  let oldRoot: HTMLElement | undefined;
  let oldDoc: Document | undefined;
  let mouseDown = false;
  let menuHasFocus = false;
  let actualPlacement = placement;
  const { active, doc, selection, focus, root, updateEditor } = editorStores(editor);

  $: updateEditor(editor);
  $: activeSelection = getActive(mouseDown, menuHasFocus, $selection);
  $: update(menu, $doc);
  $: updateRoot($root);

  function update(menu: HTMLElement, doc) {
    if (mouseDown) return;
    if (menu) {
      if (popper) {
        popper.update();
      } else {
        const element = {
          getBoundingClientRect: () => (activeSelection && editor.getBounds(activeSelection)) || OFFSCREEN_RECT,
          contextElement: editor.root,
        };
        popper = createPopper(element, menu, {
          placement,
          modifiers: [
            { name: 'arrow', options: { element: '[data-arrow]' } },
            { name: 'computeStyles', options: { adaptive: false } },
            { name: 'offset', options: { offset: [-20, offset] } },
            { name: 'preventOverflow', options: { padding } },
            {
              name: 'dataOutput',
              enabled: true,
              phase: 'write',
              fn({ state }) {
                actualPlacement = state.placement.split('-')[0] as Placement;
              },
            },
          ],
        });
        requestAnimationFrame(() => menu && menu.classList.add('active'));
      }
    } else {
      if (popper && !menuHasFocus) {
        popper.destroy();
        popper = null;
      }
    }
  }

  function getActive(mouseDown: boolean, menuHasFocus: boolean, selection: any | null): any | null {
    let fixedSelection = selection && editor?.trimSelection(selection);
    let lineType;
    if (fixedSelection && fixedSelection[0] === fixedSelection[1] - 1) {
      const line = editor.doc.getLineAt(fixedSelection[0]);
      const type = editor.typeset.lines.findByAttributes(line.attributes, true);
      if (type.frozen) {
        lineType = type.name;
      }
    }
    if (lineType != forLineType) fixedSelection = null;
    return mouseDown || menuHasFocus ? activeSelection : fixedSelection;
  }

  function onMouseDown() {
    mouseDown = true;
  }

  function onMouseUp() {
    mouseDown = false;
    update(menu, $doc);
  }

  function updateRoot(root?: HTMLElement) {
    if (oldRoot) {
      oldRoot.removeEventListener('mousedown', onMouseDown);
      (oldDoc || oldRoot).removeEventListener('mouseup', onMouseUp);
    }
    oldRoot = root;
    oldDoc = root && root.ownerDocument;
    if (oldRoot) {
      oldRoot.addEventListener('mousedown', onMouseDown);
      (oldDoc || oldRoot).addEventListener('mouseup', onMouseUp);
    }
  }

  function onGainFocus(event: FocusEvent) {
    if (menuHasFocus || (event.target as HTMLElement).nodeName === 'BUTTON') return;
    editor.modules.selection.pause();
    menuHasFocus = true;
  }

  function onLoseFocus() {
    if (!menuHasFocus) return;
    editor.modules.selection.resume();
    menuHasFocus = false;
  }

  onDestroy(() => {
    updateRoot();
    onLoseFocus();
    if (popper) popper.destroy();
  });
</script>

{#if activeSelection && activeSelection[0] !== activeSelection[1]}
  <div class="{className} z-10000" on:focusin={onGainFocus} on:focusout={onLoseFocus} bind:this={menu}>
    <slot
      commands={editor.commands}
      active={$active}
      selection={activeSelection}
      focus={$focus}
      placement={actualPlacement}
    ></slot>
  </div>
{/if}
