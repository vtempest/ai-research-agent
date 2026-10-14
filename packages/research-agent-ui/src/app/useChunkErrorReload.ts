'use client';

import { useEffect } from 'react';

const RELOAD_KEY = 'qwk:chunk-error-reload';

/**
 * How long after one chunk-error reload another is refused. Long enough that a
 * build which is genuinely missing a chunk cannot put the tab in a reload loop,
 * short enough that a tab which recovered and then outlived a *later* deploy in
 * the same session still gets its one reload.
 */
const RELOAD_COOLDOWN_MS = 60_000;

/**
 * The messages browsers and bundlers give a chunk that could not be fetched:
 * webpack's `ChunkLoadError`, and the native dynamic-`import()` failures that
 * Vite (and so vinext) builds surface — Chromium's "Failed to fetch dynamically
 * imported module", Firefox's "error loading dynamically imported module" and
 * Safari's "Importing a module script failed".
 */
const CHUNK_ERROR_PATTERN =
  /Loading (CSS )?chunk|ChunkLoadError|Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS/i;

/** Whether `error` (an Error, a message, or a rejection reason) is a failed chunk fetch. */
export function isChunkLoadError(error: unknown): boolean {
  if (typeof error === 'string') return CHUNK_ERROR_PATTERN.test(error);
  if (error && typeof error === 'object') {
    const { name, message } = error as { name?: unknown; message?: unknown };
    return (
      name === 'ChunkLoadError' ||
      (typeof message === 'string' && CHUNK_ERROR_PATTERN.test(message))
    );
  }
  return false;
}

/**
 * Reloads the page if `error` is a failed chunk fetch and no such reload
 * happened in the last {@link RELOAD_COOLDOWN_MS}. Returns whether it reloaded,
 * so a caller can keep showing a loading state instead of an error.
 */
export function reloadForChunkError(error: unknown): boolean {
  if (typeof window === 'undefined' || !isChunkLoadError(error)) return false;
  try {
    const last = Number(window.sessionStorage.getItem(RELOAD_KEY));
    if (last && Date.now() - last < RELOAD_COOLDOWN_MS) return false;
    window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Without storage there is no loop guard, so don't reload at all.
    return false;
  }
  window.location.reload();
  return true;
}

/**
 * Deployments replace `_next/static` chunks with newly-hashed filenames, so a
 * browser tab left open from before a deploy will 404 when it tries to fetch
 * an old chunk (e.g. on a client-side navigation). Reload once to pick up the
 * new build instead of leaving the user stuck on a broken page.
 *
 * This only sees failures nothing else handled. A lazy component's failed
 * chunk is caught by the nearest error boundary instead, so boundaries around
 * lazy subtrees should call {@link reloadForChunkError} themselves.
 */
export function useChunkErrorReload(): void {
  useEffect(() => {
    const onError = (event: ErrorEvent): void => {
      reloadForChunkError(event.error ?? event.message);
    };
    const onRejection = (event: PromiseRejectionEvent): void => {
      reloadForChunkError(event.reason);
    };
    // Vite's preload helper dispatches this when a dynamic import's
    // dependencies fail to load; `payload` is the underlying error.
    const onPreloadError = (event: Event): void => {
      if (reloadForChunkError((event as Event & { payload?: unknown }).payload ?? 'Loading chunk')) {
        event.preventDefault();
      }
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    window.addEventListener('vite:preloadError', onPreloadError);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
      window.removeEventListener('vite:preloadError', onPreloadError);
    };
  }, []);
}
