/**
 * @module FileViewer
 * @description Read-only viewers for documents that are files rather than
 * notes — today the PDFs and images of a synced Google Drive folder (any
 * document whose `external.view` is `pdf`, `image` or `unsupported`).
 *
 * `EditorArea` loads this module lazily, and the PDF viewer in turn loads
 * PDF.js from a CDN (`./pdfjs-cdn`) only when a PDF is opened, so neither
 * costs anything to a page that never shows a file.
 */
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, FileQuestion, Minus, Plus, ScanLine } from 'lucide-react';
import type { Document } from 'react-reason-editor-sidebar';
import { Button } from '../app-ui/button';
import { loadPdfJs, type PdfDocument } from './pdfjs-cdn';

interface FileViewerProps {
  document: Document;
}

/** Header shared by every viewer: title, plus links out to the file. */
function ViewerHeader({ document, children }: { document: Document; children?: React.ReactNode }) {
  const webViewLink = document.external?.webViewLink;
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30 shrink-0">
      <span className="flex-1 min-w-0 truncate text-sm font-medium" title={document.title}>
        {document.title}
      </span>
      {children}
      {webViewLink && (
        <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs" asChild>
          <a href={webViewLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5" />
            Open in Drive
          </a>
        </Button>
      )}
    </div>
  );
}

/** Message shown in place of a viewer that cannot render. */
function ViewerMessage({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="flex h-full items-center justify-center p-6 text-center">
      <div>
        <FileQuestion className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
        <p className="font-medium text-foreground">{title}</p>
        {detail && <p className="mt-1 text-sm text-muted-foreground">{detail}</p>}
      </div>
    </div>
  );
}

function Spinner({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center" aria-busy="true" aria-label={label}>
      <div className="size-6 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground/60" />
    </div>
  );
}

/** Shows an image, fitted to the pane; click toggles actual size. */
export function ImageViewer({ src, alt }: { src: string; alt: string }) {
  const [actualSize, setActualSize] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) return <ViewerMessage title="This image couldn't be loaded" />;

  return (
    <div className="flex-1 min-h-0 overflow-auto bg-muted/20">
      <div className={actualSize ? 'p-4' : 'flex h-full items-center justify-center p-4'}>
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          onClick={() => setActualSize((v) => !v)}
          className={
            actualSize
              ? 'max-w-none cursor-zoom-out'
              : 'max-h-full max-w-full object-contain cursor-zoom-in shadow-sm'
          }
        />
      </div>
    </div>
  );
}

const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];

/**
 * Renders one page to a canvas once it scrolls near the viewport, and again
 * when the zoom or pane width changes. Off-screen pages keep a placeholder of
 * the right height, so a long PDF neither renders every page up front nor
 * jumps around while scrolling.
 */
function PdfPageCanvas({
  pdf,
  pageNumber,
  scale,
  placeholderRatio,
}: {
  pdf: PdfDocument;
  pageNumber: number;
  scale: number;
  placeholderRatio: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || scale <= 0) return;
    let cancelled = false;
    let renderTask: { promise: Promise<void>; cancel(): void } | null = null;

    pdf
      .getPage(pageNumber)
      .then((page) => {
        if (cancelled || !canvasRef.current) return;
        const viewport = page.getViewport({ scale });
        const ratio = window.devicePixelRatio || 1;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;
        // Draw at device resolution, display at CSS size, so text stays sharp.
        const drawViewport = page.getViewport({ scale: scale * ratio });
        canvas.width = Math.floor(drawViewport.width);
        canvas.height = Math.floor(drawViewport.height);
        setSize({ width: viewport.width, height: viewport.height });
        renderTask = page.render({ canvasContext: context, viewport: drawViewport });
        return renderTask.promise;
      })
      .catch((error) => {
        // A cancelled render (zoom changed mid-draw) is expected, not a failure.
        if (error?.name !== 'RenderingCancelledException') console.error('PDF page render failed', error);
      });

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [pdf, pageNumber, scale, visible]);

  const width = size?.width;
  const height = size?.height;

  return (
    <div
      ref={wrapperRef}
      className="mx-auto bg-white shadow-sm"
      style={{
        width: width ?? '100%',
        height: height ?? undefined,
        aspectRatio: size ? undefined : String(placeholderRatio),
        maxWidth: size ? undefined : 800,
      }}
      data-page-number={pageNumber}
    >
      <canvas ref={canvasRef} style={{ width, height, display: size ? 'block' : 'none' }} />
    </div>
  );
}

/** A scrolling PDF viewer with fit-to-width and zoom, on PDF.js from a CDN. */
export function PdfViewer({ url, document }: { url: string; document: Document }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<PdfDocument | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<'fit' | number>('fit');
  const [paneWidth, setPaneWidth] = useState(0);
  const [pageSize, setPageSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: { destroy(): Promise<void> } | null = null;
    let loaded: PdfDocument | null = null;
    setPdf(null);
    setError(null);
    setPageSize(null);

    loadPdfJs()
      .then((lib) => {
        if (cancelled) return null;
        // isEvalSupported:false keeps PDF.js from compiling font programs
        // with `new Function`, closing the class of bug behind CVE-2024-4367.
        const task = lib.getDocument({ url, isEvalSupported: false });
        loadingTask = task;
        return task.promise;
      })
      .then(async (doc) => {
        if (!doc) return;
        if (cancelled) {
          doc.destroy();
          return;
        }
        loaded = doc;
        const first = await doc.getPage(1);
        const viewport = first.getViewport({ scale: 1 });
        if (cancelled) return;
        setPageSize({ width: viewport.width, height: viewport.height });
        setPdf(doc);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Failed to load PDF');
      });

    return () => {
      cancelled = true;
      loadingTask?.destroy();
      loaded?.destroy();
    };
  }, [url]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => setPaneWidth(el.clientWidth);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fitScale = pageSize && paneWidth ? Math.max(0.25, Math.min(3, (paneWidth - 32) / pageSize.width)) : 1;
  const scale = zoom === 'fit' ? fitScale : zoom;

  const stepZoom = (direction: 1 | -1) => {
    const current = scale;
    const next =
      direction > 0
        ? ZOOM_STEPS.find((s) => s > current + 0.01)
        : [...ZOOM_STEPS].reverse().find((s) => s < current - 0.01);
    if (next) setZoom(next);
  };

  return (
    <>
      <ViewerHeader document={document}>
        {pdf && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="mr-1 tabular-nums">
              {pdf.numPages} {pdf.numPages === 1 ? 'page' : 'pages'}
            </span>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => stepZoom(-1)} aria-label="Zoom out">
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="w-10 text-center tabular-nums">{Math.round(scale * 100)}%</span>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => stepZoom(1)} aria-label="Zoom in">
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={zoom === 'fit' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setZoom('fit')}
              aria-label="Fit to width"
              title="Fit to width"
            >
              <ScanLine className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </ViewerHeader>
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-auto bg-muted/40" data-testid="pdf-viewer">
        {error ? (
          <ViewerMessage title="This PDF couldn't be opened" detail={error} />
        ) : !pdf || !pageSize ? (
          <Spinner label="Loading PDF" />
        ) : (
          <div className="flex flex-col gap-4 p-4" style={{ minWidth: 'min-content' }}>
            {Array.from({ length: pdf.numPages }, (_, i) => (
              <PdfPageCanvas
                key={i + 1}
                pdf={pdf}
                pageNumber={i + 1}
                scale={scale}
                placeholderRatio={pageSize.width / pageSize.height}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/** Picks the viewer for a file document from its `external.view`. */
export function FileViewer({ document }: FileViewerProps) {
  const external = document.external;
  const url = external?.contentUrl;

  return (
    <div className="flex h-full flex-col bg-editor-bg" data-testid="file-viewer">
      {external?.view === 'pdf' && url ? (
        <PdfViewer url={url} document={document} />
      ) : (
        <>
          <ViewerHeader document={document} />
          {external?.view === 'image' && url ? (
            <ImageViewer src={url} alt={document.title} />
          ) : (
            <ViewerMessage
              title="No preview for this file"
              detail={external?.webViewLink ? 'Use “Open in Drive” to view it there.' : undefined}
            />
          )}
        </>
      )}
    </div>
  );
}

export default FileViewer;
