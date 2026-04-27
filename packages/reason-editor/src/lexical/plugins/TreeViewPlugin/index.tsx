/**
 * @fileoverview Plugin that renders a debug view of the Lexical editor's state tree.
 * Primarily used for development to visualize node hierarchy and state changes.
 */


import type { JSX } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TreeView } from '@lexical/react/LexicalTreeView';
import * as React from 'react';

/**
 * Plugin that renders the Lexical TreeView for debugging purposes.
 * @returns {JSX.Element} The rendered TreeView component.
 */
export default function TreeViewPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  return (
    <TreeView
      viewClassName="tree-view-output"
      treeTypeButtonClassName="debug-treetype-button"
      timeTravelPanelClassName="debug-timetravel-panel"
      timeTravelButtonClassName="debug-timetravel-button"
      timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
      timeTravelPanelButtonClassName="debug-timetravel-panel-button"
      editor={editor}
    />
  );
}
