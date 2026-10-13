/**
 * @module pdfjs-cdn
 * @description Loads Mozilla PDF.js from jsDelivr the first time a PDF is
 * opened.
 *
 * PDF.js is deliberately not a dependency of this package: it is ~1 MB of
 * library plus a worker that only matters to someone who opens a PDF, so it
 * is fetched at runtime instead of being bundled into every consumer. The
 * version is pinned so the library and its worker always match.
 *
 * It is loaded with a `<script type="module">` tag rather than `import()`:
 * a host app's bundler rewrites `import()` calls in this package's built
 * output (Turbopack turns one into a broken `__turbopack_context__` call once
 * minification has stripped the ignore comments), but it never touches a
 * script tag. PDF.js publishes its exports on `globalThis.pdfjsLib`.
 */

/** The pinned PDF.js release. The worker must come from the same one. */
export const PDFJS_VERSION = '4.10.38';

const PDFJS_BASE = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build`;
export const PDFJS_URL = `${PDFJS_BASE}/pdf.min.mjs`;
export const PDFJS_WORKER_URL = `${PDFJS_BASE}/pdf.worker.min.mjs`;

/** The slice of the PDF.js API the viewer uses. */
export interface PdfJsLib {
  getDocument(params: Record<string, unknown>): {
    promise: Promise<PdfDocument>;
    destroy(): Promise<void>;
  };
  GlobalWorkerOptions: { workerSrc: string };
}

export interface PdfDocument {
  numPages: number;
  getPage(pageNumber: number): Promise<PdfPage>;
  destroy(): Promise<void>;
}

export interface PdfPage {
  getViewport(params: { scale: number }): { width: number; height: number };
  render(params: {
    canvasContext: CanvasRenderingContext2D;
    viewport: { width: number; height: number };
  }): { promise: Promise<void>; cancel(): void };
}

let pdfjsPromise: Promise<PdfJsLib> | null = null;

/** Runs PDF.js as a module script and resolves to the global it publishes. */
function loadPdfJsScript(url: string): Promise<PdfJsLib> {
  const existing = (globalThis as { pdfjsLib?: PdfJsLib }).pdfjsLib;
  if (existing?.getDocument) return Promise.resolve(existing);

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = url;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      const lib = (globalThis as { pdfjsLib?: PdfJsLib }).pdfjsLib;
      if (lib?.getDocument) resolve(lib);
      else reject(new Error('PDF.js loaded but did not initialise'));
    };
    script.onerror = () => {
      script.remove();
      reject(new Error('Could not load the PDF viewer. Check your connection and try again.'));
    };
    document.head.appendChild(script);
  });
}

/**
 * Resolves the PDF.js module, loading it from the CDN on first call and
 * caching it after. A failed load is not cached, so the next PDF retries.
 */
export function loadPdfJs(): Promise<PdfJsLib> {
  if (!pdfjsPromise) {
    pdfjsPromise = loadPdfJsScript(PDFJS_URL)
      .then((lib) => {
        // A cross-origin worker URL is fine here: PDF.js wraps it in a
        // same-origin blob that imports it.
        lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
        return lib;
      })
      .catch((error) => {
        pdfjsPromise = null;
        throw error;
      });
  }
  return pdfjsPromise;
}
