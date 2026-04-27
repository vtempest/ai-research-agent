/**
 * @fileoverview Plugin that renders a link to the Lexical documentation.
 */


import type { JSX } from 'react';

import * as React from 'react';

/**
 * Plugin that renders a button linking to Lexical's official documentation.
 * @returns {JSX.Element} The rendered documentation link button.
 */
export default function DocsPlugin(): JSX.Element {
  return (
    <a target="__blank" href="https://lexical.dev/docs/intro">
      <button
        id="docs-button"
        className="editor-dev-button"
        title="Lexical Docs"
      />
    </a>
  );
}
