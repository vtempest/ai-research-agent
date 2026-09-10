/**
 * Mounts the AI panel over a real Plate editor.
 *
 * The controller's behaviour is covered by `./ai-controller.test.ts`; what is
 * checked here is the wiring that only exists once React is involved — that the
 * plugin renders the panel after the editable at all, that the toolbar button
 * opens it, that the command list reflects the selection, and that Escape
 * closes it without writing anything.
 */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Plate, usePlateEditor } from 'platejs/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { getAiController } from '@/docs-agent/plate/ai-controller';
import { platePlugins } from '@/docs-agent/plate/plate-editor-config';
import { AIToolbarButton } from '@/docs-agent/plate/ui/ai-toolbar-button';
import { Editor, EditorContainer } from '@/docs-agent/plate/ui/editor';
import { FixedToolbar } from '@/docs-agent/plate/ui/fixed-toolbar';

import type { PlateEditor } from 'platejs/react';

// Floating UI's `autoUpdate` observes the anchor; jsdom has no ResizeObserver.
class NoopResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// The panel anchors to the DOM range behind the Slate selection. jsdom's
// `Range` implements no layout, so measuring it has to be faked or Floating
// UI's async positioning rejects — which says nothing about the component.
const EMPTY_RECT = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  toJSON: () => ({}),
  top: 0,
  width: 0,
  x: 0,
  y: 0,
} as DOMRect;

Range.prototype.getBoundingClientRect ??= () => EMPTY_RECT;
Range.prototype.getClientRects ??= () =>
  ({ item: () => null, length: 0, [Symbol.iterator]: function* () {} }) as unknown as DOMRectList;

function Harness({ onEditor }: { onEditor: (editor: PlateEditor) => void }) {
  const editor = usePlateEditor({
    plugins: platePlugins,
    value: [{ children: [{ text: 'Hello world' }], type: 'p' }],
  });

  onEditor(editor);

  return (
    <Plate editor={editor}>
      <FixedToolbar>
        <AIToolbarButton />
      </FixedToolbar>
      <EditorContainer>
        <Editor />
      </EditorContainer>
    </Plate>
  );
}

describe('plate ai menu', () => {
  let container: HTMLDivElement;
  let root: Root;
  let editor: PlateEditor;

  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', NoopResizeObserver);

    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);

    act(() => {
      root.render(<Harness onEditor={(next) => (editor = next)} />);
    });
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  function panel() {
    return container.querySelector('[role="dialog"][aria-label="Ask AI"]');
  }

  it('renders nothing until the panel is opened', () => {
    expect(panel()).toBeNull();
  });

  it('opens from the toolbar button and closes on Escape', () => {
    act(() => {
      editor.tf.select({
        anchor: { offset: 0, path: [0, 0] },
        focus: { offset: 11, path: [0, 0] },
      });
    });

    const button = container.querySelector('button');
    expect(button).not.toBeNull();

    act(() => {
      button!.click();
    });

    const opened = panel();
    expect(opened).not.toBeNull();
    expect(opened!.textContent).toContain('11 characters selected');
    // The rewrite commands are offered because there is a selection.
    expect(opened!.textContent).toContain('Improve writing');
    expect(opened!.textContent).toContain('Translate');

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    });

    expect(panel()).toBeNull();
    expect(getAiController(editor).getState().panel.status).toBe('closed');
    expect(editor.api.string([])).toBe('Hello world');
  });

  it('offers only the commands that work at a bare caret', () => {
    act(() => {
      editor.tf.select({ offset: 11, path: [0, 0] });
      getAiController(editor).open();
    });

    const opened = panel();
    expect(opened).not.toBeNull();
    expect(opened!.textContent).toContain('Nothing selected');
    expect(opened!.textContent).toContain('Continue writing');
    expect(opened!.textContent).not.toContain('Improve writing');
  });
});
