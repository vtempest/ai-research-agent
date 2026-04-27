/**
 * @fileoverview Plugin that provides a custom context menu for the editor.
 * The menu includes options like Remove Link, Cut, Copy, Paste, and Delete Node.
 */


import type { JSX } from 'react';

import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  NodeContextMenuOption,
  NodeContextMenuPlugin,
  NodeContextMenuSeparator,
} from '@lexical/react/LexicalNodeContextMenuPlugin';
import {
  $getSelection,
  $isDecoratorNode,
  $isNodeSelection,
  $isRangeSelection,
  COPY_COMMAND,
  CUT_COMMAND,
  type LexicalNode,
  PASTE_COMMAND,
} from 'lexical';
import { useMemo } from 'react';
import Icon from '../../ui/Icon';

/**
 * Plugin that renders a custom context menu when right-clicking on editor nodes.
 * @returns {JSX.Element} The rendered context menu plugin.
 */
export default function ContextMenuPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const items = useMemo(() => {
    return [
      new NodeContextMenuOption(`Remove Link`, {
        $onSelect: () => {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        },
        $showOn: (node: LexicalNode) => $isLinkNode(node.getParent()),
        disabled: false,
        icon: <i className="PlaygroundEditorTheme__contextMenuItemIcon" />,
      }),
      new NodeContextMenuSeparator({
        $showOn: (node: LexicalNode) => $isLinkNode(node.getParent()),
      }),
      new NodeContextMenuOption(`Cut`, {
        $onSelect: () => {
          editor.dispatchCommand(CUT_COMMAND, null);
        },
        disabled: false,
        icon: (
          <i className="PlaygroundEditorTheme__contextMenuItemIcon page-break" />
        ),
      }),
      new NodeContextMenuOption(`Copy`, {
        $onSelect: () => {
          editor.dispatchCommand(COPY_COMMAND, null);
        },
        disabled: false,
        icon: <i className="PlaygroundEditorTheme__contextMenuItemIcon copy" />,
      }),
      new NodeContextMenuOption(`Paste`, {
        $onSelect: () => {
          navigator.clipboard.read().then(async function (...args) {
            const data = new DataTransfer();

            const readClipboardItems = await navigator.clipboard.read();
            const item = readClipboardItems[0];

            const permission = await navigator.permissions.query({
              // @ts-expect-error These types are incorrect.
              name: 'clipboard-read',
            });
            if (permission.state === 'denied') {
              alert('Not allowed to paste from clipboard.');
              return;
            }

            for (const type of item.types) {
              const dataString = await (await item.getType(type)).text();
              data.setData(type, dataString);
            }

            const event = new ClipboardEvent('paste', {
              clipboardData: data,
            });

            editor.dispatchCommand(PASTE_COMMAND, event);
          });
        },
        disabled: false,
        icon: (
          <i className="PlaygroundEditorTheme__contextMenuItemIcon paste" />
        ),
      }),
      new NodeContextMenuOption(`Paste Plain`, {
        $onSelect: () => {
          navigator.clipboard.readText()
            .then((clipboardText) => {
              editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  selection.insertRawText(clipboardText);
                }
              });
            })
            .catch((err) => {
              console.warn('Failed to read clipboard:', err);
              // Fallback: try to use the browser's native paste
              try {
                document.execCommand('paste');
              } catch (e) {
                console.error('Paste failed:', e);
              }
            });
        },
        disabled: false,
        icon: <Icon name="paste-plain" className="PlaygroundEditorTheme__contextMenuItemIcon" />,
      }),
      new NodeContextMenuSeparator(),
      new NodeContextMenuOption(`Delete Node`, {
        $onSelect: () => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const currentNode = selection.anchor.getNode();
            const ancestorNodeWithRootAsParent = currentNode
              .getParents()
              .at(-2);

            ancestorNodeWithRootAsParent?.remove();
          } else if ($isNodeSelection(selection)) {
            const selectedNodes = selection.getNodes();
            selectedNodes.forEach((node) => {
              if ($isDecoratorNode(node)) {
                node.remove();
              }
            });
          }
        },
        disabled: false,
        icon: (
          <i className="PlaygroundEditorTheme__contextMenuItemIcon clear" />
        ),
      }),
    ];
  }, [editor]);

  return (
    <NodeContextMenuPlugin
      className="PlaygroundEditorTheme__contextMenu"
      itemClassName="PlaygroundEditorTheme__contextMenuItem"
      separatorClassName="PlaygroundEditorTheme__contextMenuSeparator"
      items={items}
    />
  );
}
