/**
 * @fileoverview Plugin that enforces a maximum character length for the editor.
 * It trims excess text or restores the previous editor state if the limit is exceeded.
 */


import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $trimTextContentFromAnchor } from '@lexical/selection';
import { $restoreEditorState } from '@lexical/utils';
import { $getSelection, $isRangeSelection, EditorState, RootNode } from 'lexical';
import { useEffect } from 'react';

/**
 * Plugin that enforces a character limit on the editor's content.
 * @param {Object} props - Component props.
 * @param {number} props.maxLength - The maximum number of characters allowed.
 * @returns {null} This plugin doesn't render any UI directly.
 */
export function MaxLengthPlugin({ maxLength }: { maxLength: number }): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let lastRestoredEditorState: EditorState | null = null;

    return editor.registerNodeTransform(RootNode, (rootNode: RootNode) => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
        return;
      }
      const prevEditorState = editor.getEditorState();
      const prevTextContentSize = prevEditorState.read(() =>
        rootNode.getTextContentSize(),
      );
      const textContentSize = rootNode.getTextContentSize();
      if (prevTextContentSize !== textContentSize) {
        const delCount = textContentSize - maxLength;
        const anchor = selection.anchor;

        if (delCount > 0) {
          // Restore the old editor state instead if the last
          // text content was already at the limit.
          if (
            prevTextContentSize === maxLength &&
            lastRestoredEditorState !== prevEditorState
          ) {
            lastRestoredEditorState = prevEditorState;
            $restoreEditorState(editor, prevEditorState);
          } else {
            $trimTextContentFromAnchor(editor, anchor, delCount);
          }
        }
      }
    });
  }, [editor, maxLength]);

  return null;
}
