'use client';

import { AiPlugin } from '@/docs-agent/plate/ai-plugin';
import { getAiController } from '@/docs-agent/plate/ai-controller';
import { AiMenu } from '@/docs-agent/plate/ui/ai-menu';

/**
 * The AI writing assistant, assembled: the plugin's configuration
 * (`../ai-plugin.ts`), the panel it renders after the editable
 * (`../ui/ai-menu.tsx`), and the ⌘J shortcut that opens it — the same shortcut
 * the Tiptap `Ai` extension binds.
 *
 * Registering the plugin is all a surface has to do: the panel comes with it
 * through `render.afterEditable`, so `PlateEditorWrapper`, `ReasonPlateEditor`
 * and the playground all get the assistant from
 * `../plate-editor-config.ts` alone. The toolbar and slash-menu entry points
 * (`../ui/ai-toolbar-button.tsx`, `../ui/slash-node.tsx`) only open it.
 */
export const AiKit = [
  AiPlugin.configure({
    handlers: {
      onKeyDown: ({ editor, event }) => {
        if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'j') return;

        event.preventDefault();
        getAiController(editor).open();
      },
    },
    render: {
      afterEditable: () => <AiMenu />,
    },
  }),
];
