/**
 * @fileoverview Plugin that provides a floating toolbar for text formatting.
 * Appears when text is selected and provides options for bold, italic, underline, link, etc.
 */

import type { JSX } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useFloatingTextFormatToolbar } from './hooks/useFloatingTextFormatToolbar';
import type { FloatingTextFormatToolbarPluginProps } from './types';

export { APPLY_HIGHLIGHT_COMMAND } from './commands';
export { AutoHighlightProvider } from './context/AutoHighlightContext';

/**
 * Plugin that renders a portal-based floating text format toolbar.
 * @param {Object} props - Component props.
 * @param {HTMLElement} [props.anchorElem=document.body] - The element to anchor the floating UI to.
 * @param {Dispatch<boolean>} props.setIsLinkEditMode - Dispatch function to update link edit mode.
 * @returns {JSX.Element | null} The rendered floating text format toolbar plugin.
 */
export default function FloatingTextFormatToolbarPlugin({
  anchorElem = document.body,
  setIsLinkEditMode,
}: FloatingTextFormatToolbarPluginProps): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  return useFloatingTextFormatToolbar(editor, anchorElem, setIsLinkEditMode);
}
