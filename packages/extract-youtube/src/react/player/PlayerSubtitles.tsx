/**
 * @fileoverview Scrollable, playback-synced captions panel shown above the
 * video when subtitles are toggled on. Clicking any line seeks the player
 * there; the active line auto-scrolls and gets an approximate karaoke-style
 * per-word sweep.
 */

'use client';

import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { formatTime, useTranscript, type TranscriptSnippet, type TranscriptSource } from '../transcript';

interface PlayerSubtitlesProps extends TranscriptSource {
  videoId: string;
  currentTime: number;
  onSeek: (seconds: number) => void;
}

const SubtitleLine = forwardRef<
  HTMLButtonElement,
  { snippet: TranscriptSnippet; isActive: boolean; currentTime: number; onSeek: () => void }
>(function SubtitleLine({ snippet, isActive, currentTime, onSeek }, ref) {
  const words = useMemo(() => snippet.text.split(/\s+/).filter(Boolean), [snippet.text]);

  // Words don't carry their own timestamps — approximate a sweep by spreading
  // the snippet's duration evenly across its words.
  const activeWordIndex =
    isActive && snippet.duration > 0
      ? Math.min(
          words.length - 1,
          Math.max(0, Math.floor(((currentTime - snippet.start) / snippet.duration) * words.length)),
        )
      : -1;

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onSeek();
      }}
      className={`eytp-line${isActive ? ' eytp-line-active' : ''}`}
    >
      <span className="eytp-line-time">{formatTime(snippet.start)}</span>
      <span>
        {words.map((word, i) => (
          <span key={i} className={i === activeWordIndex ? 'eytp-word-active' : undefined}>
            {word}{' '}
          </span>
        ))}
      </span>
    </button>
  );
});

export function PlayerSubtitles({
  videoId,
  currentTime,
  onSeek,
  transcriptUrl,
  fetchTranscript,
}: PlayerSubtitlesProps) {
  const { snippets, loading, error } = useTranscript(videoId, true, { transcriptUrl, fetchTranscript });
  const lineRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = useMemo(() => {
    if (!snippets || snippets.length === 0) return -1;
    let idx = -1;
    for (let i = 0; i < snippets.length; i++) {
      if (snippets[i].start <= currentTime) idx = i;
      else break;
    }
    return idx;
  }, [snippets, currentTime]);

  // Keep the active line in view as playback advances.
  useEffect(() => {
    if (activeIndex < 0) return;
    lineRefs.current[activeIndex]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <div className="eytp-subtitles">
      {loading && (
        <div className="eytp-status">
          <Loader2 size={14} className="eytp-spin" />
          Loading captions...
        </div>
      )}
      {error && !loading && (
        <div className="eytp-status eytp-status-error">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
      {snippets?.map((snippet, index) => (
        <SubtitleLine
          key={index}
          ref={(el) => {
            lineRefs.current[index] = el;
          }}
          snippet={snippet}
          isActive={index === activeIndex}
          currentTime={currentTime}
          onSeek={() => onSeek(snippet.start)}
        />
      ))}
    </div>
  );
}
