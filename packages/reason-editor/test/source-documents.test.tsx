/**
 * External storage sources in `ReasonDocs`: with a `FileSourceProvider`, an
 * active Google Drive source replaces the file tree with its files, those
 * files stay out of the local document store, they refuse edits, and opening
 * one shows it the right way — a Google Doc in the editor once its body has
 * loaded, a PDF in the PDF.js viewer, an image in the image viewer.
 */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Document } from 'react-reason-editor-sidebar';

vi.mock('@/editor/pdfjs-cdn', () => {
  const page = {
    getViewport: ({ scale }: { scale: number }) => ({ width: 600 * scale, height: 800 * scale }),
    render: () => ({ promise: Promise.resolve(), cancel: () => {} }),
  };
  const pdf = { numPages: 3, getPage: vi.fn(async () => page), destroy: vi.fn(async () => {}) };
  return {
    loadPdfJs: vi.fn(async () => ({
      GlobalWorkerOptions: { workerSrc: '' },
      getDocument: vi.fn(() => ({ promise: Promise.resolve(pdf), destroy: vi.fn(async () => {}) })),
    })),
  };
});

import { useReasonDocsState } from '@/editor/useReasonDocsState';
import { EditorArea } from '@/editor/EditorArea';
import type { FileSourceProvider } from '@/editor/fileSourceProvider';
import { loadPdfJs } from '@/editor/pdfjs-cdn';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

const SOURCE_ID = 'gdocs-1';

const external = (fileId: string, mimeType: string, view: 'editor' | 'pdf' | 'image' | 'unsupported') => ({
  sourceId: SOURCE_ID,
  fileId,
  mimeType,
  view,
  contentUrl: view === 'unsupported' ? undefined : `/api/doc/google-docs/content?fileId=${fileId}`,
  webViewLink: `https://drive.google.com/file/d/${fileId}/view`,
});

const driveDocs: Document[] = [
  {
    id: `${SOURCE_ID}:R`,
    title: 'Research',
    content: '',
    parentId: null,
    isFolder: true,
    isExpanded: true,
    external: external('R', 'application/vnd.google-apps.folder', 'unsupported'),
  },
  {
    id: `${SOURCE_ID}:doc`,
    title: 'Notes',
    content: '',
    parentId: `${SOURCE_ID}:R`,
    external: external('doc', 'application/vnd.google-apps.document', 'editor'),
  },
  {
    id: `${SOURCE_ID}:pdf`,
    title: 'paper.pdf',
    content: '',
    parentId: `${SOURCE_ID}:R`,
    external: external('pdf', 'application/pdf', 'pdf'),
  },
];

const localDocs: Document[] = [
  { id: 'local-folder', title: 'Folder', content: '', parentId: null, isFolder: true, isExpanded: true },
  { id: 'local-note', title: 'Note', content: '<p>local</p>', parentId: 'local-folder' },
];

function makeProvider(): FileSourceProvider & {
  listDocuments: ReturnType<typeof vi.fn>;
  loadDocumentContent: ReturnType<typeof vi.fn>;
} {
  return {
    canList: (source) => source.type === 'gdocs',
    listDocuments: vi.fn(async () => driveDocs),
    loadDocumentContent: vi.fn(async () => '<h1>From Drive</h1>'),
  };
}

let container: HTMLDivElement;
let root: Root;
let state: ReturnType<typeof useReasonDocsState>;

function Harness({ provider }: { provider?: FileSourceProvider }) {
  state = useReasonDocsState(undefined, provider);
  return null;
}

async function flush() {
  await act(async () => {
    for (let i = 0; i < 5; i++) await Promise.resolve();
  });
}

/** Re-renders until `check` passes: lazy chunks resolve on a real timer. */
async function waitFor(check: () => void, timeout = 3000) {
  const start = Date.now();
  for (;;) {
    try {
      check();
      return;
    } catch (error) {
      if (Date.now() - start > timeout) throw error;
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 20));
      });
    }
  }
}

async function mount(provider?: FileSourceProvider) {
  await act(async () => {
    root.render(<Harness provider={provider} />);
  });
  await flush();
}

beforeEach(() => {
  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as any;
  localStorage.clear();
  localStorage.setItem('REASON-documents', JSON.stringify(localDocs));
  localStorage.setItem('REASON-active-doc', JSON.stringify('local-note'));
  localStorage.setItem('REASON-open-tabs', JSON.stringify(['local-note']));
  localStorage.setItem(
    'REASON-file-sources',
    JSON.stringify([
      {
        id: SOURCE_ID,
        name: 'My Drive folders',
        type: 'gdocs',
        credentials: { isAuthenticated: true, folders: [{ id: 'R', name: 'Research' }] },
        createdAt: '',
        updatedAt: '',
      },
    ]),
  );
  localStorage.setItem('REASON-active-file-source', SOURCE_ID);
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('useReasonDocsState with an external source', () => {
  it('shows the active Drive source in the tree and keeps local notes untouched', async () => {
    const provider = makeProvider();
    await mount(provider);

    expect(provider.listDocuments).toHaveBeenCalledTimes(1);
    expect(state.isExternalSourceActive).toBe(true);
    expect(state.treeDocuments.map((d) => d.id)).toEqual(driveDocs.map((d) => d.id));
    expect(state.documents.map((d) => d.id)).toEqual(['local-folder', 'local-note']);
    expect(localStorage.getItem('REASON-documents')).not.toContain(SOURCE_ID);
  });

  it('caches the listing (without file bodies) for the next load', async () => {
    await mount(makeProvider());
    await act(async () => state.handleSelectDocument(`${SOURCE_ID}:doc`));
    await flush();

    const cached = JSON.parse(localStorage.getItem('REASON-source-documents')!);
    expect(cached[SOURCE_ID].map((d: Document) => d.id)).toContain(`${SOURCE_ID}:doc`);
    expect(JSON.stringify(cached)).not.toContain('From Drive');
  });

  it('fetches a Google Doc body when it is opened', async () => {
    const provider = makeProvider();
    await mount(provider);

    await act(async () => state.handleSelectDocument(`${SOURCE_ID}:doc`));
    await flush();

    expect(provider.loadDocumentContent).toHaveBeenCalledTimes(1);
    expect(state.activeDocument?.id).toBe(`${SOURCE_ID}:doc`);
    expect(state.activeDocument?.content).toBe('<h1>From Drive</h1>');
    expect(state.activeDocument?.external?.contentLoaded).toBe(true);
    expect(state.openTabs).toContain(`${SOURCE_ID}:doc`);
  });

  it('records a failed body fetch so the editor area can offer a retry', async () => {
    const provider = makeProvider();
    provider.loadDocumentContent.mockRejectedValueOnce(new Error('Authentication expired'));
    await mount(provider);

    await act(async () => state.handleSelectDocument(`${SOURCE_ID}:doc`));
    await flush();

    expect(state.externalContentErrors[`${SOURCE_ID}:doc`]).toBe('Authentication expired');
    expect(state.activeDocument?.external?.contentLoaded).toBeFalsy();
  });

  it('refuses to create, delete, rename or move while showing Drive', async () => {
    await mount(makeProvider());
    const before = localStorage.getItem('REASON-documents');

    await act(async () => {
      await state.handleAddDocument(null);
      await state.handleDeleteDocument(`${SOURCE_ID}:pdf`);
      state.handleUpdateDocument(`${SOURCE_ID}:pdf`, { title: 'renamed' });
      state.handleMoveDocument(`${SOURCE_ID}:pdf`, null, 'child');
    });
    await flush();

    expect(localStorage.getItem('REASON-documents')).toBe(before);
    expect(state.treeDocuments.find((d) => d.id === `${SOURCE_ID}:pdf`)?.title).toBe('paper.pdf');
  });

  it("applies the tree's expand state to Drive folders, not local ones", async () => {
    await mount(makeProvider());

    await act(async () => state.handleSetExpandedFolders([]));

    expect(state.treeDocuments.find((d) => d.id === `${SOURCE_ID}:R`)?.isExpanded).toBe(false);
    expect(state.documents.find((d) => d.id === 'local-folder')?.isExpanded).toBe(true);
  });

  it('goes back to local notes when the source switches to Local Files', async () => {
    await mount(makeProvider());

    await act(async () => state.handleFileSourceChange('local-default'));
    await flush();

    expect(state.isExternalSourceActive).toBe(false);
    expect(state.treeDocuments).toBe(state.documents);
  });

  it('treats the source as not listable without a provider', async () => {
    await mount(undefined);

    expect(state.isExternalSourceActive).toBe(false);
    expect(state.treeDocuments.map((d) => d.id)).toEqual(['local-folder', 'local-note']);
  });
});

describe('EditorArea with external documents', () => {
  function renderArea(activeDocument: Document, extra: Partial<React.ComponentProps<typeof EditorArea>> = {}) {
    return act(async () => {
      root.render(
        <EditorArea
          activeDocument={activeDocument}
          documents={[activeDocument]}
          splitViewDocId={null}
          activeDocId={activeDocument.id}
          isMobile={false}
          onUpdateDocument={() => {}}
          onCloseSplitView={() => {}}
          {...extra}
        />,
      );
    });
  }

  it('opens a PDF in the PDF.js viewer loaded from the CDN', async () => {
    await renderArea(driveDocs[2]);
    await waitFor(() => expect(container.textContent).toContain('3 pages'));

    expect(loadPdfJs).toHaveBeenCalled();
    expect(container.querySelector('[data-testid="pdf-viewer"]')).not.toBeNull();
    expect(container.textContent).toContain('3 pages');
    expect(container.querySelectorAll('[data-page-number]')).toHaveLength(3);
    expect(container.querySelector('a[href^="https://drive.google.com/"]')).not.toBeNull();
  });

  it('opens an image in the image viewer', async () => {
    const image: Document = {
      id: `${SOURCE_ID}:img`,
      title: 'chart.png',
      content: '',
      parentId: null,
      external: external('img', 'image/png', 'image'),
    };
    await renderArea(image);
    await waitFor(() => expect(container.querySelector('img')).not.toBeNull());

    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toBe('/api/doc/google-docs/content?fileId=img');
    expect(img?.getAttribute('alt')).toBe('chart.png');
  });

  it('offers a link out for files with no preview', async () => {
    const zip: Document = {
      id: `${SOURCE_ID}:zip`,
      title: 'data.zip',
      content: '',
      parentId: null,
      external: external('zip', 'application/zip', 'unsupported'),
    };
    await renderArea(zip);
    await waitFor(() => expect(container.textContent).toContain('No preview'));

    expect(container.textContent).toContain('No preview for this file');
    expect(container.textContent).toContain('Open in Drive');
  });

  it('waits for a Google Doc body, and shows a retry when it fails', async () => {
    const retry = vi.fn();
    await renderArea(driveDocs[1]);
    expect(container.querySelector('[aria-label="Loading the editor"]')).not.toBeNull();

    await renderArea(driveDocs[1], { externalContentError: 'Authentication expired', onRetryExternalContent: retry });
    expect(container.textContent).toContain('Authentication expired');
    const button = [...container.querySelectorAll('button')].find((b) => b.textContent === 'Try again');
    act(() => button!.click());
    expect(retry).toHaveBeenCalled();
  });
});
