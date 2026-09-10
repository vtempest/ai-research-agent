'use client';

import * as React from 'react';

import { SparklesIcon } from 'lucide-react';
import { useEditorRef } from 'platejs/react';

import { getAiController } from '@/docs-agent/plate/ai-controller';
import { AI_PLUGIN_KEY } from '@/docs-agent/plate/ai-plugin';

import { ToolbarButton } from './toolbar';

/**
 * "Ask AI" — the shortest path from highlighting text to rewriting it, and the
 * entry point both toolbars share. It only opens the panel that
 * `./ai-menu.tsx` renders; the commands, streaming and review flow all live
 * there, so this is one more way in rather than a second implementation.
 *
 * Renders nothing when the AI plugin is not registered, so it can be dropped
 * into a toolbar unconditionally — the same contract as the Tiptap bubble's
 * `AskAiButton`.
 */
export function AIToolbarButton(props: React.ComponentProps<typeof ToolbarButton>) {
  const editor = useEditorRef();

  if (!editor.plugins?.[AI_PLUGIN_KEY]) return null;

  return (
    <ToolbarButton
      {...props}
      onClick={() => getAiController(editor).open()}
      tooltip="Ask AI (⌘J)"
    >
      <SparklesIcon className="text-violet-600" />
    </ToolbarButton>
  );
}
