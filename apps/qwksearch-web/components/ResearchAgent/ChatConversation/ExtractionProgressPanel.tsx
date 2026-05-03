/**
 * Progress indicator shown while the research agent extracts URL contents
 * from the top sources of search results. Mirrors the elicit-style
 * "Running analysis..." panel: a header with completed/total counter, plus
 * a per-URL list with status icons.
 */
'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, XCircle, Globe } from 'lucide-react';
import type { ExtractionProgress } from '@/components/ResearchAgent/hooks/useChat/types';
import { cn } from '@/lib/utils';

interface ExtractionProgressPanelProps {
  progress: ExtractionProgress;
  active: boolean;
}

const formatHost = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const ExtractionProgressPanel = ({ progress, active }: ExtractionProgressPanelProps) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!active || progress.endedAt) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [active, progress.endedAt]);

  const elapsedMs = (progress.endedAt ?? now) - progress.startedAt;
  const elapsedSec = Math.max(0, Math.floor(elapsedMs / 1000));
  const capSec = progress.capSeconds || 0;
  const remainingSec = capSec > 0 ? Math.max(0, capSec - elapsedSec) : null;
  const isRunning = active && !progress.endedAt;

  return (
    <div className="my-4 bg-secondary/40 rounded-xl border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2">
        {isRunning ? (
          <Loader2 size={16} className="animate-spin text-accent-foreground" />
        ) : (
          <CheckCircle2 size={16} className="text-emerald-500" />
        )}
        <p className="font-medium text-sm text-foreground/90">
          {isRunning ? 'Extracting sources…' : 'Extracted sources'}
        </p>
        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {progress.completed}/{progress.total} URLs
          {' · '}
          {elapsedSec}s
          {remainingSec !== null && isRunning ? ` (cap ${capSec}s)` : ''}
        </span>
      </div>

      <ul className="border-t border-border bg-muted/40 divide-y divide-border/60">
        {progress.urls.map((u) => (
          <li key={u.url} className="flex items-center gap-2 px-4 py-1.5 text-xs">
            {u.status === 'pending' && (
              <Loader2 size={12} className="animate-spin text-muted-foreground flex-shrink-0" />
            )}
            {u.status === 'success' && (
              <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
            )}
            {u.status === 'failed' && (
              <XCircle size={12} className="text-rose-500 flex-shrink-0" />
            )}
            <Globe size={12} className="text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground flex-shrink-0">{formatHost(u.url)}</span>
            <span
              className={cn(
                'truncate text-foreground/80',
                u.status === 'failed' && 'line-through text-muted-foreground',
              )}
              title={u.title || u.url}
            >
              {u.title || u.url}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExtractionProgressPanel;
