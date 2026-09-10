/**
 * The Plate writing assistant — the "Ask AI anything…" flow, ported from the
 * Tiptap side's `src/extensions/Ai/Ai.ts`. Read that file's doc comment first:
 * the three rules it is built on hold here unchanged.
 *
 *   1. Nothing is written to the document until the user accepts.
 *   2. What is written is the sanitised, Markdown-aware content the review
 *      panel showed, not the raw model response.
 *   3. A request only ever carries a bounded window of the document.
 *
 * Only the document API differs. ProseMirror's decoration plugin and position
 * mapping have no Slate equivalent, so the state machine lives in this
 * per-editor controller — the same shape as `./transcribe-controller.ts` — and
 * the target range is held in a `rangeRef`, Slate's own way of keeping a range
 * valid while the document changes under it (the equivalent of mapping
 * positions through a ProseMirror transaction). The streamed result is
 * reviewed in the floating panel rather than as an inline red/green diff:
 * Slate decorations can only style existing text, so there is no way to render
 * text that is not in the document yet without writing it first, which rule 1
 * forbids.
 *
 * Commands, prompts, response sanitising and the endpoint contract come from
 * `@/extensions/Ai/lib/*`, which is engine-neutral and shared with Tiptap.
 */

import { PathApi, RangeApi, type Descendant, type TRange } from 'platejs';
import { MarkdownPlugin } from '@platejs/markdown';

import { needsRichInsert } from '@/extensions/Ai/lib/completionToContent';
import { buildAiInstruction, clampContext } from '@/extensions/Ai/lib/prompt';
import { sanitizeCompletion } from '@/extensions/Ai/lib/sanitizeCompletion';

import { AiPlugin, type AiPluginOptions } from './ai-plugin';

import type { PlateEditor } from 'platejs/react';
import type { AiCommandDefinition, AiSuggestionMode } from '@/extensions/Ai/types';

/** A suggestion being reviewed. The range it applies to is the controller's, not a copy. */
export interface AiPlateSuggestion {
  originalText: string;
  suggestedText: string;
  mode: AiSuggestionMode;
  /** True while text is still streaming in; accept/insert-below are disabled until it settles. */
  isStreaming: boolean;
}

export type AiPanelState =
  | { status: 'closed' }
  | { status: 'menu' }
  | { status: 'loading'; commandLabel: string }
  | { status: 'reviewing'; commandLabel: string; suggestion: AiPlateSuggestion }
  | { status: 'error'; commandLabel: string; message: string };

/** The last request that ran, kept so "Try again" can be re-issued without retyping. */
interface AiLastRequest {
  instruction: string;
  commandId: string;
  commandLabel: string;
  option?: string;
}

export interface AiControllerState {
  panel: AiPanelState;
}

export interface AiController {
  getState(): AiControllerState;
  subscribe(listener: () => void): () => void;
  /**
   * The range the panel is acting on, read live so it follows edits made while
   * a completion streams. `null` once the panel is closed.
   */
  getRange(): TRange | null;
  /** Open the command / free-form prompt menu over the current selection. */
  open(): void;
  /** Close the panel and drop any pending suggestion without touching the document. */
  close(): void;
  /** Run one of the configured commands, optionally with a submenu choice. */
  runCommand(commandId: string, option?: string): boolean;
  /** Run a free-form instruction typed into the menu's input. */
  submitPrompt(instruction: string): boolean;
  /** Abort an in-flight completion, keeping whatever already streamed in. */
  stop(): void;
  /** Re-run the last instruction against its original range. */
  retry(): boolean;
  /** Replace the range with the suggestion (or insert it, when nothing was selected). */
  accept(): boolean;
  /** Keep the original text and insert the suggestion as a new block below it. */
  insertBelow(): boolean;
}

const controllers = new WeakMap<PlateEditor, AiController>();

/** Where the panel opens when the editor has no selection: a caret at the end of the document. */
function collapsedAtEnd(editor: PlateEditor): TRange | null {
  const end = editor.api.end([]);
  return end ? { anchor: end, focus: end } : null;
}

/**
 * The document text sent as context: a window centred on the range rather than
 * the whole document, so cost and latency stay bounded on a long file.
 */
function readContextWindow(editor: PlateEditor, range: TRange, budget: number): string {
  if (budget <= 0) return '';

  const docStart = editor.api.start([]);
  const docEnd = editor.api.end([]);
  if (!docStart || !docEnd) return '';

  const [start, end] = RangeApi.edges(range);
  const before = editor.api.string({ anchor: docStart, focus: start });
  const after = editor.api.string({ anchor: end, focus: docEnd });

  const half = Math.floor(budget / 2);
  const head = clampContext(before, half);
  const tail =
    after.length > budget - head.length ? `${after.slice(0, budget - head.length)}…` : after;

  return `${head}${head && tail ? '\n' : ''}${tail}`.trim();
}

/** Renders a completion as Plate nodes, so Markdown the model emitted becomes real blocks. */
function completionToNodes(editor: PlateEditor, text: string): Descendant[] {
  return editor.getApi(MarkdownPlugin).markdown.deserialize(text) as Descendant[];
}

function createController(editor: PlateEditor): AiController {
  const state: AiControllerState = { panel: { status: 'closed' } };

  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());

  /** Live target range. Slate keeps it valid as the document changes; unref'd on close. */
  let rangeRef: ReturnType<PlateEditor['api']['rangeRef']> | null = null;
  let lastRequest: AiLastRequest | null = null;
  let abortController: AbortController | null = null;
  let requestToken = 0;

  const options = (): AiPluginOptions => editor.getOptions(AiPlugin);

  const getRange = (): TRange | null => rangeRef?.current ?? null;

  function setRange(range: TRange | null): void {
    rangeRef?.unref();
    rangeRef = range ? editor.api.rangeRef(range) : null;
  }

  /**
   * The range to act on: the one the panel was opened over, or — for a command
   * run without opening the panel first, as the toolbars and slash menu can —
   * the live selection, adopted as the panel's range.
   */
  function ensureRange(): TRange | null {
    if (!getRange()) setRange(editor.selection ?? null);
    return getRange();
  }

  /** Cancels any in-flight request so a late chunk cannot revive a settled panel. */
  function cancelInFlight(): void {
    abortController?.abort();
    abortController = null;
    requestToken += 1;
  }

  function setPanel(panel: AiPanelState): void {
    state.panel = panel;
    notify();
  }

  function close(): void {
    cancelInFlight();
    setRange(null);
    lastRequest = null;
    setPanel({ status: 'closed' });
  }

  function open(): void {
    cancelInFlight();
    setRange(editor.selection ?? collapsedAtEnd(editor));
    setPanel({ status: 'menu' });
  }

  async function run(request: AiLastRequest): Promise<void> {
    const range = getRange();
    if (!range) return;

    const selectedText = editor.api.string(range);
    const documentText = readContextWindow(editor, range, options().contextChars);
    const mode: AiSuggestionMode = selectedText ? 'replace' : 'insert';

    cancelInFlight();
    const controller = new AbortController();
    abortController = controller;
    const token = (requestToken += 1);

    lastRequest = request;
    setPanel({ status: 'loading', commandLabel: request.commandLabel });

    /** True once this request has been superseded, aborted, or the editor is gone. */
    const stale = () => token !== requestToken || controller.signal.aborted;

    const showSuggestion = (text: string, isStreaming: boolean) => {
      if (stale()) return;
      setPanel({
        status: 'reviewing',
        commandLabel: request.commandLabel,
        suggestion: {
          originalText: selectedText,
          suggestedText: sanitizeCompletion(text, { streaming: isStreaming }),
          mode,
          isStreaming,
        },
      });
    };

    try {
      const result = await options().getCompletion(
        {
          instruction: request.instruction,
          selectedText,
          documentText,
          commandId: request.commandId,
          commandLabel: request.commandLabel,
          option: request.option,
          systemPrompt: options().systemPrompt,
          mode,
        },
        (chunk) => showSuggestion(chunk, true),
        controller.signal,
      );

      if (stale()) return;

      if (!sanitizeCompletion(result)) {
        setPanel({
          status: 'error',
          commandLabel: request.commandLabel,
          message: 'The model returned an empty response.',
        });
        return;
      }

      showSuggestion(result, false);
    } catch (error) {
      if (stale()) return;
      setPanel({
        status: 'error',
        commandLabel: request.commandLabel,
        message: error instanceof Error ? error.message : 'Something went wrong.',
      });
    }
  }

  function findCommand(commandId: string): AiCommandDefinition | undefined {
    return options().commands.find((command) => command.id === commandId);
  }

  /** The content to write, and how: plain text keeps the marks already on the range. */
  function writeSuggestion(text: string, at: TRange): boolean {
    const trimmed = text.trim();
    if (!trimmed) return false;

    editor.tf.focus();
    editor.tf.select(at);

    if (needsRichInsert(trimmed)) {
      editor.tf.insertFragment(completionToNodes(editor, trimmed));
    } else {
      editor.tf.insertText(trimmed);
    }

    return true;
  }

  return {
    getState: () => state,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getRange,
    open,
    close,

    runCommand(commandId: string, option?: string) {
      const command = findCommand(commandId);
      if (!command) return false;

      const range = ensureRange();
      if (!range) return false;

      // A command that rewrites a selection has nothing to act on when the
      // caret is collapsed; running it anyway produces a confident answer
      // about nothing, so refuse instead.
      if (command.requiresSelection !== false && RangeApi.isCollapsed(range)) return false;
      if (command.options?.length && !option) return false;

      void run({
        instruction: buildAiInstruction(command, option),
        commandId: command.id,
        commandLabel: option ? `${command.label} → ${option}` : command.label,
        option,
      });
      return true;
    },

    submitPrompt(instruction: string) {
      const trimmed = instruction.trim();
      if (!trimmed) return false;

      if (!ensureRange()) return false;

      void run({ instruction: trimmed, commandId: 'custom', commandLabel: 'Custom' });
      return true;
    },

    stop() {
      const { panel } = state;
      if (panel.status !== 'loading' && panel.status !== 'reviewing') return;

      cancelInFlight();

      // Text already streamed in is worth keeping: settle it so the user can
      // accept the partial result. With nothing yet to review, fall back to
      // the command list.
      if (panel.status === 'reviewing') {
        setPanel({ ...panel, suggestion: { ...panel.suggestion, isStreaming: false } });
      } else {
        setPanel({ status: 'menu' });
      }
    },

    retry() {
      if (!lastRequest) return false;
      void run(lastRequest);
      return true;
    },

    accept() {
      const { panel } = state;
      if (panel.status !== 'reviewing' || panel.suggestion.isStreaming) return false;

      const range = getRange();
      if (!range) return false;

      const written = writeSuggestion(panel.suggestion.suggestedText, range);
      if (written) close();
      return written;
    },

    insertBelow() {
      const { panel } = state;
      if (panel.status !== 'reviewing' || panel.suggestion.isStreaming) return false;

      const range = getRange();
      if (!range) return false;

      const text = panel.suggestion.suggestedText.trim();
      if (!text) return false;

      // Insert after the block the range ends in, so the original text is left
      // exactly as it was rather than being split around the result.
      const block = editor.api.block({ at: RangeApi.end(range) });
      if (!block) return false;

      editor.tf.focus();
      editor.tf.insertNodes(completionToNodes(editor, text), {
        at: PathApi.next(block[1]),
        select: true,
      });
      close();
      return true;
    },
  };
}

/** One controller per editor instance, created on first use and cached for its lifetime. */
export function getAiController(editor: PlateEditor): AiController {
  let controller = controllers.get(editor);
  if (!controller) {
    controller = createController(editor);
    controllers.set(editor, controller);
  }

  return controller;
}
