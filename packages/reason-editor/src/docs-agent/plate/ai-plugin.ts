/**
 * The Plate writing assistant's plugin: its configuration, and the presence
 * flag the toolbars check before rendering an "Ask AI" control.
 *
 * Deliberately UI-free and state-free. The panel's state machine and the
 * request/abort plumbing live in `./ai-controller.ts`, the menu in
 * `./ui/ai-menu.tsx`, and `./kits/ai-kit.tsx` is what wires the three
 * together — so this module can be imported from the controller without a
 * cycle, exactly as `@platejs/*` plugin modules are.
 *
 * The commands, prompts, response sanitising and endpoint contract are the
 * *same* modules the Tiptap `Ai` extension runs on (`@/extensions/Ai/lib/*`):
 * everything in there is engine-neutral, and only `extensions/Ai/Ai.ts` is
 * bound to ProseMirror. Sharing them means the two engines offer the same
 * commands, send the same request, and clean the response the same way; read
 * `extensions/Ai/Ai.ts`'s doc comment first — this mirrors its design.
 */

import type { PluginConfig } from 'platejs';
import { createTPlatePlugin } from 'platejs/react';

import { DEFAULT_AI_COMMANDS } from '@/extensions/Ai/commands';
import { AI_SYSTEM_PROMPT } from '@/extensions/Ai/lib/prompt';
import {
  createReasonAiCompletion,
  DEFAULT_AI_ENDPOINT,
} from '@/extensions/Ai/lib/reasonEndpoint';

import type { AiCommandDefinition, AiCompletionFn } from '@/extensions/Ai/types';

/** Plugin key, also what `hasPlugin(editor, 'ai')` and the Tiptap side answer to. */
export const AI_PLUGIN_KEY = 'ai';

export interface AiPluginOptions {
  /** Quick commands offered in the "Ask AI anything…" menu and the toolbar dropdown. */
  commands: AiCommandDefinition[];
  /**
   * Runs a completion for an instruction. Defaults to REASON's own rewrite
   * endpoint; hosts serving a different route (or none) override it, the same
   * way the Tiptap side's plugin-registry setting does.
   */
  getCompletion: AiCompletionFn;
  /**
   * System message sent with every request. Constrains the model to return
   * only the replacement text — override to add house style or domain rules.
   */
  systemPrompt: string;
  /**
   * How much surrounding document text (in characters) is sent as context.
   * The window is taken from around the selection, so the nearest text is
   * what survives the clamp. Set to `0` to send no context at all.
   */
  contextChars: number;
}

export type AiPluginConfig = PluginConfig<typeof AI_PLUGIN_KEY, AiPluginOptions>;

export const AiPlugin = createTPlatePlugin<AiPluginConfig>({
  key: AI_PLUGIN_KEY,
  options: {
    commands: DEFAULT_AI_COMMANDS,
    getCompletion: createReasonAiCompletion(DEFAULT_AI_ENDPOINT),
    systemPrompt: AI_SYSTEM_PROMPT,
    contextChars: 4000,
  },
});
