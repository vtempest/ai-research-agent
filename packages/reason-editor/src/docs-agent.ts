/**
 * `react-reason-editor/docs-agent` — the dual-editor workspace.
 *
 * Two implementations of the Reason Editor sit behind one product contract:
 *
 *   - `ReasonTiptapEditor` — the existing Tiptap stack, unchanged, kept as the
 *     control version.
 *   - `ReasonPlateEditor`  — the Plate starter's editor UI and plugin set.
 *
 * `ReasonPlaygroundEditor` is a third *surface*, not a third engine: the same
 * Plate editor and the same collaboration room as `ReasonPlateEditor`, wearing
 * the Plate playground's full toolbar instead of `ReasonToolbar`. It is what the
 * demo opens by default; the two toolbar-schema editors above are untouched and
 * stay reachable so the three can be compared side by side.
 *
 * The comparison has since settled: the product's own `ReasonDocs` shell mounts
 * Plate by default too, through `src/editor/PlateEditorWrapper.tsx` — the same
 * plugin set and playground toolbar as here, but driven by the document store's
 * HTML rather than by a Yjs room. `ReasonTiptapEditor` stays as the control
 * version, and `ReasonDocs`' `editorEngine="tiptap"` mounts the Tiptap wrapper
 * for the features not yet ported.
 *
 * Both render the same `REASON_TOOLBAR` schema through the same
 * `ReasonToolbar` renderer, and differ only in which `EditorToolbarAdapter`
 * they hand it — including the dictation button (`transcribe`), the
 * voice-commands plugin ported from the Tiptap side's `Transcribe` extension to
 * a new Plate plugin in `./docs-agent/plate/transcribe-controller.ts`. Their
 * Yjs rooms are namespaced per engine (`reason-editor:<engine>:<documentId>`)
 * because a ProseMirror document and a Slate document are not interchangeable;
 * they stay separate until there is an explicit conversion/export pipeline.
 *
 * The AI writing assistant is shared the same way: the commands, prompts,
 * response sanitising and endpoint contract in `src/extensions/Ai/lib/*` drive
 * both engines, with the Tiptap extension and the Plate plugin
 * (`./docs-agent/plate/ai-plugin.ts` and its controller) as the two front ends.
 * On Plate it is reachable from the selection toolbar, the fixed toolbar, the
 * slash menu and ⌘J.
 *
 * `ReasonSidebar` (from `./docs-agent/shared`) is the third shared plugin: the
 * document navigation list both routes mount around their editor, backed by
 * the same document store the production file-tree uses.
 */

export {
  createNullAdapter,
  type EditorEngine,
  type EditorToolbarAdapter,
  type TableCommand,
  type ToolbarCommand,
  type ToolbarCommandPayload,
} from './docs-agent/shared/editor-types';
export {
  collectToolbarCommands,
  REASON_TOOLBAR,
  type ToolbarItem,
} from './docs-agent/shared/toolbar-schema';
export {
  ReasonToolbar,
  type ReasonToolbarProps,
} from './docs-agent/shared/toolbar-renderer';
export { ReasonSidebar, type ReasonSidebarProps } from './docs-agent/shared/Sidebar';
export {
  createSidebarDocument,
  deleteSidebarDocument,
  listSidebarDocuments,
  renameSidebarDocument,
  subscribeSidebarDocuments,
  SIDEBAR_DOCUMENTS_STORAGE_KEY,
  type SidebarDocument,
} from './docs-agent/shared/sidebar-store';

export {
  collaborationRoom,
  createCollaborationSession,
  cursorColorFor,
  hocuspocusUrl,
  parseCollaborationRoom,
  plateYjsProviders,
  ROOM_PREFIX,
  type CollaborationOptions,
  type CollaborationSession,
} from './docs-agent/collaboration/hocuspocus-client';

export { createTiptapAdapter } from './docs-agent/tiptap/editor-adapter';
export {
  ReasonTiptapEditor,
  type ReasonTiptapEditorProps,
} from './docs-agent/tiptap/editor';

export { createPlateAdapter } from './docs-agent/plate/plate-adapter';
export { htmlToPlateValue } from './docs-agent/plate/html-to-plate';
/**
 * The other half of the HTML bridge: `plateValueToHtml` serializes a document
 * back to the HTML the document store persists, through the static plugin set
 * in `plateBasePlugins`. Together with `htmlToPlateValue` this is what lets the
 * Plate editor be `ReasonDocs`' default rather than only a collaboration
 * surface — see `src/editor/PlateEditorWrapper.tsx`.
 */
export { plateValueToHtml } from './docs-agent/plate/plate-to-html';
export { plateBasePlugins } from './docs-agent/plate/plate-base-kit';
export {
  EMPTY_PLATE_VALUE,
  MediaKit,
  platePlugins,
} from './docs-agent/plate/plate-editor-config';
export {
  ReasonPlateEditor,
  type ReasonPlateEditorProps,
} from './docs-agent/plate/editor';
export {
  ReasonPlaygroundEditor,
  type ReasonPlaygroundEditorProps,
} from './docs-agent/plate/playground-editor';
/**
 * The AI writing assistant. `AiKit` is already in `platePlugins`, so every
 * surface above has it; these exports are for hosts that need to *configure*
 * it — most often `getCompletion`, either through `ReasonPlateEditor`'s `ai`
 * prop or `editor.setOption(AiPlugin, 'getCompletion', …)` — or that drive the
 * panel from chrome of their own through `getAiController`.
 */
export { AiPlugin, AI_PLUGIN_KEY, type AiPluginOptions } from './docs-agent/plate/ai-plugin';
export { AiKit } from './docs-agent/plate/kits/ai-kit';
export {
  getAiController,
  type AiController,
  type AiControllerState,
  type AiPanelState,
  type AiPlateSuggestion,
} from './docs-agent/plate/ai-controller';
export { AiMenu } from './docs-agent/plate/ui/ai-menu';
export { AIToolbarButton } from './docs-agent/plate/ui/ai-toolbar-button';

export { REASON_TOOLBAR_SKIN } from './docs-agent/plate/ui/reason-toolbar-skin';
export { FixedToolbar } from './docs-agent/plate/ui/fixed-toolbar';
export { FixedToolbarButtons } from './docs-agent/plate/ui/fixed-toolbar-buttons';
export { FloatingToolbar } from './docs-agent/plate/ui/floating-toolbar';
export { FloatingToolbarButtons } from './docs-agent/plate/ui/floating-toolbar-buttons';
