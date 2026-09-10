/**
 * The Plate writing assistant's document-facing behaviour: what it refuses to
 * run, what the completion function is handed, and — the part that matters
 * most — what actually lands in the document when a suggestion is accepted.
 *
 * The Tiptap counterpart is `test/ai-extension.test.ts`; the cases here follow
 * it deliberately, because the two engines are meant to behave identically.
 */

import { createPlateEditor } from 'platejs/react';
import { describe, expect, it, vi } from 'vitest';

import { getAiController } from '../../src/docs-agent/plate/ai-controller';
import { AiPlugin } from '../../src/docs-agent/plate/ai-plugin';
import { platePlugins } from '../../src/docs-agent/plate/plate-editor-config';

import type { PlateEditor } from 'platejs/react';
import type { AiCompletionFn, AiCompletionRequest } from '../../src/extensions/Ai/types';

/** A completion that resolves immediately with `text`, recording what it was asked. */
function stubCompletion(text: string) {
  const seen: AiCompletionRequest[] = [];
  const fn: AiCompletionFn = async (request, onChunk) => {
    seen.push(request);
    onChunk(text);
    return text;
  };

  return { fn, seen };
}

function createEditor(paragraphs: string[], getCompletion: AiCompletionFn) {
  const editor = createPlateEditor({
    plugins: platePlugins as any,
    value: paragraphs.map((text) => ({ children: [{ text }], type: 'p' })),
  });

  editor.setOption(AiPlugin, 'getCompletion', getCompletion);

  return editor;
}

/** Selects `[start, end)` of the first paragraph and opens the panel over it. */
function selectAndOpen(editor: PlateEditor, start: number, end: number) {
  editor.tf.select({
    anchor: { offset: start, path: [0, 0] },
    focus: { offset: end, path: [0, 0] },
  });

  const controller = getAiController(editor);
  controller.open();

  return controller;
}

describe('plate ai controller', () => {
  it('lets a second AiPlugin entry override the registered options', () => {
    // What `ReasonPlateEditor`'s `ai` prop relies on: Plate merges plugins that
    // share a key, and the later entry wins.
    const editor = createPlateEditor({
      plugins: [...platePlugins, AiPlugin.configure({ options: { contextChars: 7 } })] as any,
      value: [{ children: [{ text: 'Hello world' }], type: 'p' }],
    });

    expect(editor.getOptions(AiPlugin).contextChars).toBe(7);
    // Everything not overridden keeps the registered default.
    expect(editor.getOptions(AiPlugin).commands.length).toBeGreaterThan(0);
    expect(typeof editor.getOptions(AiPlugin).getCompletion).toBe('function');
  });

  it('refuses a rewrite command when nothing is selected', () => {
    const { fn, seen } = stubCompletion('rewritten');
    const editor = createEditor(['Hello world'], fn);

    editor.tf.select({ offset: 5, path: [0, 0] });
    const controller = getAiController(editor);
    controller.open();

    expect(controller.runCommand('improve')).toBe(false);
    expect(seen).toHaveLength(0);
    expect(controller.getState().panel.status).toBe('menu');
  });

  it('runs a generate command with no selection', async () => {
    const { fn, seen } = stubCompletion('A continuation.');
    const editor = createEditor(['Hello world'], fn);

    editor.tf.select({ offset: 11, path: [0, 0] });
    const controller = getAiController(editor);
    controller.open();

    expect(controller.runCommand('continue')).toBe(true);
    await vi.waitFor(() => expect(seen).toHaveLength(1));
    expect(seen[0].mode).toBe('insert');
    expect(seen[0].selectedText).toBe('');
  });

  it('sends the selection, a bounded context window and the system prompt', async () => {
    const { fn, seen } = stubCompletion('planet');
    const editor = createEditor(['Hello world', 'A second paragraph.'], fn);
    editor.setOption(AiPlugin, 'contextChars', 4);

    const controller = selectAndOpen(editor, 6, 11);
    controller.runCommand('improve');

    await vi.waitFor(() => expect(seen).toHaveLength(1));

    const request = seen[0];
    expect(request.selectedText).toBe('world');
    expect(request.mode).toBe('replace');
    expect(request.commandId).toBe('improve');
    expect(request.systemPrompt).toContain('writing assistant');
    // Clamped from both sides of the selection, never the whole document.
    expect(request.documentText.length).toBeLessThanOrEqual(6);
    expect(request.documentText).not.toContain('second paragraph');
  });

  it('sends no context at all when the budget is zero', async () => {
    const { fn, seen } = stubCompletion('planet');
    const editor = createEditor(['Hello world'], fn);
    editor.setOption(AiPlugin, 'contextChars', 0);

    selectAndOpen(editor, 6, 11).runCommand('improve');

    await vi.waitFor(() => expect(seen).toHaveLength(1));
    expect(seen[0].documentText).toBe('');
  });

  it('appends the submenu choice to the instruction', async () => {
    const { fn, seen } = stubCompletion('mundo');
    const editor = createEditor(['Hello world'], fn);

    const controller = selectAndOpen(editor, 6, 11);

    // Translate needs a target language before it can run.
    expect(controller.runCommand('translate')).toBe(false);
    expect(controller.runCommand('translate', 'Spanish')).toBe(true);

    await vi.waitFor(() => expect(seen).toHaveLength(1));
    expect(seen[0].instruction).toContain('Spanish');
    expect(seen[0].option).toBe('Spanish');
  });

  it('reviews the suggestion without touching the document', async () => {
    const { fn } = stubCompletion('Sure, here is the rewrite:\nplanet  ');
    const editor = createEditor(['Hello world'], fn);

    const controller = selectAndOpen(editor, 6, 11);
    controller.runCommand('improve');

    await vi.waitFor(() => {
      const { panel } = controller.getState();
      expect(panel.status).toBe('reviewing');
      if (panel.status !== 'reviewing') return;
      expect(panel.suggestion.isStreaming).toBe(false);
      // The preamble the model volunteered is stripped before review, so what
      // is shown is what accepting writes.
      expect(panel.suggestion.suggestedText).toBe('planet');
    });

    expect(editor.api.string([])).toBe('Hello world');
  });

  it('replaces the selection on accept', async () => {
    const { fn } = stubCompletion('planet');
    const editor = createEditor(['Hello world'], fn);

    const controller = selectAndOpen(editor, 6, 11);
    controller.runCommand('improve');

    await vi.waitFor(() => expect(controller.getState().panel.status).toBe('reviewing'));

    expect(controller.accept()).toBe(true);
    expect(editor.api.string([])).toBe('Hello planet');
    expect(controller.getState().panel.status).toBe('closed');
  });

  it('accepts Markdown as real blocks rather than literal punctuation', async () => {
    const { fn } = stubCompletion('- first\n- second');
    const editor = createEditor(['Hello world'], fn);

    const controller = selectAndOpen(editor, 0, 11);
    controller.runCommand('key-points');

    await vi.waitFor(() => expect(controller.getState().panel.status).toBe('reviewing'));
    controller.accept();

    const text = editor.api.string([]);
    expect(text).toContain('first');
    expect(text).toContain('second');
    expect(text).not.toContain('- first');
    expect(text).not.toContain('Hello world');
  });

  it('leaves the original text alone when inserting below', async () => {
    const { fn } = stubCompletion('An added paragraph.');
    const editor = createEditor(['Hello world'], fn);

    const controller = selectAndOpen(editor, 0, 11);
    controller.runCommand('improve');

    await vi.waitFor(() => expect(controller.getState().panel.status).toBe('reviewing'));

    expect(controller.insertBelow()).toBe(true);
    expect(editor.children).toHaveLength(2);
    expect(editor.api.string([0])).toBe('Hello world');
    expect(editor.api.string([1])).toBe('An added paragraph.');
  });

  it('refuses to accept while the response is still streaming', async () => {
    const editor = createEditor(['Hello world'], async (_request, onChunk) => {
      onChunk('pla');
      // Never settles: the request stays in flight for the length of the test.
      return new Promise<string>(() => {});
    });

    const controller = selectAndOpen(editor, 6, 11);
    controller.runCommand('improve');

    await vi.waitFor(() => expect(controller.getState().panel.status).toBe('reviewing'));

    expect(controller.accept()).toBe(false);
    expect(editor.api.string([])).toBe('Hello world');

    // Stopping keeps what already arrived, so a partial result is still usable.
    controller.stop();
    const { panel } = controller.getState();
    expect(panel.status).toBe('reviewing');
    if (panel.status !== 'reviewing') return;
    expect(panel.suggestion.isStreaming).toBe(false);
    expect(controller.accept()).toBe(true);
    expect(editor.api.string([])).toBe('Hello pla');
  });

  it('surfaces a failed request as an error the user can retry', async () => {
    let attempts = 0;
    const editor = createEditor(['Hello world'], async () => {
      attempts += 1;
      if (attempts === 1) throw new Error('Model unavailable.');
      return 'planet';
    });

    const controller = selectAndOpen(editor, 6, 11);
    controller.runCommand('improve');

    await vi.waitFor(() => {
      const { panel } = controller.getState();
      expect(panel.status).toBe('error');
      if (panel.status !== 'error') return;
      expect(panel.message).toBe('Model unavailable.');
    });

    expect(editor.api.string([])).toBe('Hello world');

    expect(controller.retry()).toBe(true);
    await vi.waitFor(() => expect(controller.getState().panel.status).toBe('reviewing'));
    controller.accept();
    expect(editor.api.string([])).toBe('Hello planet');
  });

  it('reports an empty response instead of writing nothing', async () => {
    const { fn } = stubCompletion('   ');
    const editor = createEditor(['Hello world'], fn);

    const controller = selectAndOpen(editor, 6, 11);
    controller.runCommand('improve');

    await vi.waitFor(() => expect(controller.getState().panel.status).toBe('error'));
    expect(editor.api.string([])).toBe('Hello world');
  });

  it('follows edits made while the response streams', async () => {
    const editor = createEditor(['Hello world'], async (_request, onChunk) => {
      onChunk('planet');
      return 'planet';
    });

    const controller = selectAndOpen(editor, 6, 11);
    controller.runCommand('improve');

    await vi.waitFor(() => expect(controller.getState().panel.status).toBe('reviewing'));

    // Text typed before the target range shifts it; the range ref keeps up, so
    // accepting still replaces "world" rather than whatever now sits at 6..11.
    editor.tf.insertText('Oh, ', { at: { offset: 0, path: [0, 0] } });
    controller.accept();

    expect(editor.api.string([])).toBe('Oh, Hello planet');
  });

  it('closes without writing when the suggestion is discarded', async () => {
    const { fn } = stubCompletion('planet');
    const editor = createEditor(['Hello world'], fn);

    const controller = selectAndOpen(editor, 6, 11);
    controller.runCommand('improve');

    await vi.waitFor(() => expect(controller.getState().panel.status).toBe('reviewing'));

    controller.close();
    expect(controller.getState().panel.status).toBe('closed');
    expect(controller.getRange()).toBeNull();
    expect(editor.api.string([])).toBe('Hello world');
  });
});
