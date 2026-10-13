/**
 * The PDF.js loader: it fetches the pinned CDN build through a module script
 * tag (never `import()`, which host bundlers rewrite), reads the
 * `globalThis.pdfjsLib` PDF.js publishes, points the worker at the same
 * release, and retries after a failed load instead of caching the failure.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type Global = typeof globalThis & { pdfjsLib?: unknown };

const appended: HTMLScriptElement[] = [];

beforeEach(() => {
  vi.resetModules();
  appended.length = 0;
  delete (globalThis as Global).pdfjsLib;
  vi.spyOn(document.head, 'appendChild').mockImplementation((node) => {
    appended.push(node as HTMLScriptElement);
    return node;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  delete (globalThis as Global).pdfjsLib;
});

describe('loadPdfJs', () => {
  it('loads the pinned build as a module script and sets the worker', async () => {
    const { loadPdfJs, PDFJS_URL, PDFJS_WORKER_URL } = await import('@/editor/pdfjs-cdn');
    const pending = loadPdfJs();

    expect(appended).toHaveLength(1);
    expect(appended[0].type).toBe('module');
    expect(appended[0].src).toBe(PDFJS_URL);

    const lib = { getDocument: vi.fn(), GlobalWorkerOptions: { workerSrc: '' } };
    (globalThis as Global).pdfjsLib = lib;
    appended[0].onload!(new Event('load'));

    await expect(pending).resolves.toBe(lib);
    expect(lib.GlobalWorkerOptions.workerSrc).toBe(PDFJS_WORKER_URL);
    // Cached: a second PDF does not add another script.
    await loadPdfJs();
    expect(appended).toHaveLength(1);
  });

  it('retries after a failed load', async () => {
    const { loadPdfJs } = await import('@/editor/pdfjs-cdn');
    const first = loadPdfJs();
    appended[0].onerror!(new Event('error'));
    await expect(first).rejects.toThrow(/Could not load the PDF viewer/);

    loadPdfJs();
    expect(appended).toHaveLength(2);
  });
});
