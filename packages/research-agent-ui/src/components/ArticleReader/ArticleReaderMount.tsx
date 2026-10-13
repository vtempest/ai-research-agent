/**
 * @fileoverview Mounts the article reader for pages outside the chat thread
 * (the homepage, `/learn`) — the same lazy, mount-once-opened pattern the
 * thread uses, so the reader's code is fetched on the first `openPanel` and
 * never with the page.
 */
'use client';

import { lazy, Suspense, useEffect, useState } from 'react';
import { useOptionalExtractPanel } from './ExtractPanelContext';

const ArticleExtractPanel = lazy(() => import('./ArticleExtractPanel'));

/**
 * Renders the reader once it has been opened, and keeps it mounted after.
 * Renders nothing outside an `ExtractPanelProvider`.
 */
export default function ArticleReaderMount() {
  const isOpen = useOptionalExtractPanel()?.isOpen ?? false;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  if (!mounted && !isOpen) return null;
  return (
    <Suspense fallback={null}>
      <ArticleExtractPanel />
    </Suspense>
  );
}
