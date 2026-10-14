/**
 * Documents mirrored from an external storage source (a synced Google Drive
 * folder): an extensionless Google Doc still gets its file-type icon, and the
 * saved source list announces changes so a mounted sidebar can re-read it.
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { FileTree } from '../../src/file-tree/filetree';
import type { Document } from '../../src/documents/DocumentTree';
import {
  addFileSource,
  FILE_SOURCES_CHANGED_EVENT,
  getFileSources,
} from '../../src/app-utils/file-sources/sources';

const noop = () => {};

describe('external documents in the file tree', () => {
  it('labels a Google Doc with the icon extension it carries', () => {
    const documents: Document[] = [
      {
        id: 's:doc',
        title: 'Meeting notes',
        content: '',
        parentId: null,
        external: { sourceId: 's', fileId: 'doc', mimeType: 'application/vnd.google-apps.document', view: 'editor', extension: 'docx' },
      },
      { id: 'plain', title: 'Untyped', content: '', parentId: null },
    ];
    const { container } = render(<FileTree activeId={null} documents={documents} onMove={noop} onSelect={noop} />);
    const rows = Array.from(container.querySelectorAll('[role="treeitem"]'));

    expect(rows[0].querySelector('svg')?.textContent?.toLowerCase()).toContain('docx');
    expect(rows[1].querySelector('svg')?.textContent?.toLowerCase() ?? '').not.toContain('docx');
  });
});

describe('FILE_SOURCES_CHANGED_EVENT', () => {
  it('fires when a source is saved', () => {
    localStorage.clear();
    const listener = vi.fn();
    window.addEventListener(FILE_SOURCES_CHANGED_EVENT, listener);

    addFileSource({ name: 'Drive', type: 'gdocs', credentials: { isAuthenticated: true, folders: [{ id: 'root', name: 'My Drive' }] } } as any);

    window.removeEventListener(FILE_SOURCES_CHANGED_EVENT, listener);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(getFileSources().map((s) => s.type)).toEqual(['local', 'gdocs']);
  });
});
