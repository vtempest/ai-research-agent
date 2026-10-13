/**
 * @fileoverview The Google Drive storage source on the client: parsing pasted
 * folder links, turning folder listings into file-tree documents, cleaning a
 * Google Docs HTML export for the editor, and the provider's fetch paths
 * (against a mocked `fetch`, not live Drive).
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  driveDocumentView,
  driveExtension,
  driveTreesToDocuments,
  googleDocHtmlToEditorHtml,
  googleDriveSourceProvider,
  listGoogleDriveSource,
  loadGoogleDriveDocumentContent,
  parseDriveFolderInput,
  sourceFolders,
  GOOGLE_FOLDER,
  type DriveItem,
} from '../src/lib/google-drive-source';

const folder = (id: string, name: string, parents?: string[]): DriveItem => ({
  id,
  name,
  mimeType: GOOGLE_FOLDER,
  parents,
});
const file = (id: string, name: string, mimeType: string, parents: string[]): DriveItem => ({
  id,
  name,
  mimeType,
  parents,
  webViewLink: `https://drive.google.com/file/d/${id}/view`,
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('parseDriveFolderInput', () => {
  it.each([
    ['https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOp', '1AbCdEfGhIjKlMnOp'],
    ['https://drive.google.com/drive/u/0/folders/1AbCdEfGhIjKlMnOp?usp=sharing', '1AbCdEfGhIjKlMnOp'],
    ['https://drive.google.com/open?id=1AbCdEfGhIjKlMnOp', '1AbCdEfGhIjKlMnOp'],
    ['  1AbCdEfGhIjKlMnOp  ', '1AbCdEfGhIjKlMnOp'],
    ['My Drive', 'root'],
    ['root', 'root'],
  ])('reads %s', (input, id) => {
    expect(parseDriveFolderInput(input)).toBe(id);
  });

  it.each(['', 'hello world', 'https://example.com/x', 'short'])('rejects %j', (input) => {
    expect(parseDriveFolderInput(input)).toBeNull();
  });
});

describe('driveDocumentView / driveExtension', () => {
  it('opens Google Docs and plain text in the editor', () => {
    expect(driveDocumentView('application/vnd.google-apps.document')).toBe('editor');
    expect(driveDocumentView('text/plain')).toBe('editor');
  });

  it('opens PDFs, Sheets and Slides in the PDF viewer', () => {
    expect(driveDocumentView('application/pdf')).toBe('pdf');
    expect(driveDocumentView('application/vnd.google-apps.spreadsheet')).toBe('pdf');
    expect(driveDocumentView('application/vnd.google-apps.presentation')).toBe('pdf');
  });

  it('opens images and Drawings in the image viewer', () => {
    expect(driveDocumentView('image/png')).toBe('image');
    expect(driveDocumentView('image/jpeg')).toBe('image');
    expect(driveDocumentView('application/vnd.google-apps.drawing')).toBe('image');
  });

  it('has no preview for other files', () => {
    expect(driveDocumentView('application/zip')).toBe('unsupported');
    expect(driveDocumentView('application/vnd.google-apps.form')).toBe('unsupported');
  });

  it('gives extensionless Google files an icon extension', () => {
    expect(driveExtension({ name: 'Notes', mimeType: 'application/vnd.google-apps.document' })).toBe('docx');
    expect(driveExtension({ name: 'Budget', mimeType: 'application/vnd.google-apps.spreadsheet' })).toBe('xlsx');
    expect(driveExtension({ name: 'Paper.PDF', mimeType: 'application/pdf' })).toBe('pdf');
    expect(driveExtension({ name: 'scan', mimeType: 'application/pdf' })).toBe('pdf');
    expect(driveExtension({ name: 'photo', mimeType: 'image/png' })).toBe('png');
  });
});

describe('driveTreesToDocuments', () => {
  const tree = {
    root: folder('R', 'Research'),
    items: [
      file('d1', 'Zeta notes', 'application/vnd.google-apps.document', ['R']),
      folder('F', 'Sources', ['R']),
      file('p1', 'paper.pdf', 'application/pdf', ['F']),
      file('i1', 'chart.png', 'image/png', ['F']),
    ],
  };

  it('nests files under their folders beneath the synced folder', () => {
    const docs = driveTreesToDocuments('gdocs-1', [tree]);
    const byId = Object.fromEntries(docs.map((d) => [d.id, d]));

    expect(byId['gdocs-1:R']).toMatchObject({ parentId: null, isFolder: true, title: 'Research', isExpanded: true });
    expect(byId['gdocs-1:F']).toMatchObject({ parentId: 'gdocs-1:R', isFolder: true });
    expect(byId['gdocs-1:p1']).toMatchObject({ parentId: 'gdocs-1:F', isFolder: false });
    expect(byId['gdocs-1:d1'].parentId).toBe('gdocs-1:R');
  });

  it('records how each file opens and where its bytes come from', () => {
    const docs = driveTreesToDocuments('gdocs-1', [tree]);
    const pdf = docs.find((d) => d.id === 'gdocs-1:p1')!;
    const doc = docs.find((d) => d.id === 'gdocs-1:d1')!;

    expect(pdf.external).toMatchObject({
      sourceId: 'gdocs-1',
      fileId: 'p1',
      view: 'pdf',
      extension: 'pdf',
      contentUrl: '/api/doc/google-docs/content?fileId=p1',
    });
    expect(doc.external).toMatchObject({ view: 'editor', extension: 'docx' });
    expect(doc.content).toBe('');
  });

  it('lists folders before files, then by name', () => {
    const docs = driveTreesToDocuments('s', [tree]);
    expect(docs.map((d) => d.title)).toEqual(['Research', 'Sources', 'chart.png', 'paper.pdf', 'Zeta notes']);
  });

  it('lists a file shared by two synced folders once, and collapses roots when there are several', () => {
    const shared = file('x', 'shared.pdf', 'application/pdf', ['A', 'B']);
    const docs = driveTreesToDocuments('s', [
      { root: folder('A', 'A'), items: [shared] },
      { root: folder('B', 'B'), items: [shared] },
    ]);

    expect(docs.filter((d) => d.id === 's:x')).toHaveLength(1);
    expect(docs.find((d) => d.id === 's:A')!.isExpanded).toBe(false);
  });

  it('puts a file whose parent is outside the walk at the synced folder root', () => {
    const docs = driveTreesToDocuments('s', [
      { root: folder('R', 'R'), items: [file('o', 'orphan.png', 'image/png', ['elsewhere'])] },
    ]);
    expect(docs.find((d) => d.id === 's:o')!.parentId).toBe('s:R');
  });
});

describe('sourceFolders', () => {
  it('prefers named folders and falls back to bare IDs', () => {
    expect(sourceFolders({ folders: [{ id: 'a', name: 'A' }], folderIds: ['a'] })).toEqual([{ id: 'a', name: 'A' }]);
    expect(sourceFolders({ folderIds: ['root', 'b'] })).toEqual([
      { id: 'root', name: 'My Drive' },
      { id: 'b', name: 'b' },
    ]);
    expect(sourceFolders(undefined)).toEqual([]);
  });
});

describe('googleDocHtmlToEditorHtml', () => {
  const exported = `<html><head><meta charset="utf-8"><style type="text/css">
    .c1{font-weight:700}.c2{font-style:italic}.c3{text-decoration:underline}.c4{color:#000}
  </style></head><body class="doc-content"><h1 id="h.x" class="c4"><span class="c4">Title</span></h1>
  <p class="c4"><span class="c1">Bold</span> <span class="c2">italic</span> <span class="c3">under</span> plain</p>
  <p><a class="c4" href="https://www.google.com/url?q=https://example.com/a&amp;sa=D">link</a></p>
  <script>alert(1)</script></body></html>`;

  it('turns class-based styling into tags and strips the rest', () => {
    const html = googleDocHtmlToEditorHtml(exported);

    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<strong>Bold</strong>');
    expect(html).toContain('<em>italic</em>');
    expect(html).toContain('<u>under</u>');
    expect(html).not.toMatch(/class=|style=|id=|<script|<style|<span/);
  });

  it('unwraps Google link redirects', () => {
    expect(googleDocHtmlToEditorHtml(exported)).toContain('href="https://example.com/a"');
  });
});

describe('googleDriveSourceProvider', () => {
  it('only lists Google Drive sources', () => {
    expect(googleDriveSourceProvider.canList({ type: 'gdocs' } as any)).toBe(true);
    expect(googleDriveSourceProvider.canList({ type: 's3' } as any)).toBe(false);
  });

  it('walks every synced folder and keeps the ones that load', async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (url.includes('folderId=bad')) {
        return new Response(JSON.stringify({ success: false, error: 'not found' }), { status: 404 });
      }
      return new Response(
        JSON.stringify({ success: true, root: folder('good', 'Good'), items: [file('f', 'a.pdf', 'application/pdf', ['good'])] }),
        { status: 200 },
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    const docs = await listGoogleDriveSource({
      id: 'src',
      type: 'gdocs',
      name: 'Drive',
      credentials: { isAuthenticated: true, folders: [{ id: 'good', name: 'Good' }, { id: 'bad', name: 'Bad' }] },
    } as any);

    expect(fetchMock).toHaveBeenCalledWith('/api/doc/google-docs/folder-tree?folderId=good', expect.anything());
    expect(docs.map((d) => d.id)).toEqual(['src:good', 'src:f']);
  });

  it('throws when no synced folder loads', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ success: false, error: 'Reconnect', needsReauth: true }), { status: 401 })),
    );

    await expect(
      listGoogleDriveSource({ id: 's', type: 'gdocs', credentials: { isAuthenticated: true, folderIds: ['x'] } } as any),
    ).rejects.toMatchObject({ message: 'Reconnect', needsReauth: true });
  });

  it('returns nothing for a source with no folders', async () => {
    expect(await listGoogleDriveSource({ id: 's', type: 'gdocs', credentials: { isAuthenticated: true } } as any)).toEqual([]);
  });

  it('loads a Google Doc body as cleaned HTML and plain text as paragraphs', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) =>
        url.includes('doc')
          ? new Response('<html><body><p><span style="font-weight:700">Hi</span></p></body></html>')
          : new Response('one\n\ntwo <b>'),
      ),
    );

    const doc = await loadGoogleDriveDocumentContent({
      id: 's:doc',
      title: 'Doc',
      content: '',
      parentId: null,
      external: { sourceId: 's', fileId: 'doc', mimeType: 'application/vnd.google-apps.document', view: 'editor', contentUrl: '/c?doc' },
    });
    const text = await loadGoogleDriveDocumentContent({
      id: 's:t',
      title: 'T',
      content: '',
      parentId: null,
      external: { sourceId: 's', fileId: 't', mimeType: 'text/plain', view: 'editor', contentUrl: '/c?t' },
    });

    expect(doc).toBe('<p><strong>Hi</strong></p>');
    expect(text).toBe('<p>one</p><p>two &lt;b&gt;</p>');
  });
});
