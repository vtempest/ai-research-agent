/**
 * The completion function REASON itself ships with: the wire contract the
 * QwkSearch web app's rewrite route speaks, wrapped around the generic
 * `createStreamingCompletion` fetch/stream glue.
 *
 * It lives in `lib/` — with the rest of the engine-neutral helpers — rather
 * than next to the Tiptap extension that first used it, because both engines
 * need it: `editor-views/config/pluginRegistry.tsx` builds the Tiptap `Ai`
 * extension from it, and `docs-agent/plate/ai-plugin.ts` builds the Plate
 * plugin from it. One definition means the two editors post the same body to
 * the same route, so a change to the contract cannot land on only one of them.
 */

import type { AiCompletionFn } from '../types';

import { createStreamingCompletion } from './createStreamingCompletion';
import { mockAiCompletion } from './mockCompletion';
import { buildAiUserPrompt } from './prompt';

/**
 * Default endpoint the AI writing assistant posts to. It matches the
 * `{ text, prompt } -> { rewrittenText }` contract the QwkSearch web app
 * serves at `/api/agent/rewrite`, which is where this editor is mounted.
 * Hosts without that route point the setting at their own (or clear it) —
 * an empty value falls back to the offline demo transform rather than
 * failing every action.
 */
export const DEFAULT_AI_ENDPOINT = '/api/agent/rewrite';

/**
 * Builds a `getCompletion` for `endpoint`. The request carries the whole
 * instruction — the system rules, the surrounding context window and the text
 * to act on — as one prompt, so a plain rewrite route needs no changes to
 * serve every command in the menu.
 *
 * An empty `endpoint` yields the offline demo transform, so an editor mounted
 * without a backing route still demonstrates the flow instead of erroring on
 * every action.
 */
export const createReasonAiCompletion = (endpoint: string): AiCompletionFn =>
  endpoint
    ? createStreamingCompletion({
        endpoint,
        body: (request) => ({
          // `prompt` carries the real instruction; `text` is the field such
          // routes validate as non-empty, so the generate commands (which run
          // with no selection) fall back to their context and instruction.
          text: request.selectedText || request.documentText || request.instruction,
          prompt: `${request.systemPrompt}\n\n${buildAiUserPrompt(request)}`,
          command: request.commandId,
        }),
      })
    : mockAiCompletion;
