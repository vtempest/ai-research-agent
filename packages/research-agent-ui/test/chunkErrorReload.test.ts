import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isChunkLoadError, reloadForChunkError } from '../src/app/useChunkErrorReload';

describe('isChunkLoadError', () => {
  it('recognises chunk fetch failures from each browser and bundler', () => {
    expect(
      isChunkLoadError(
        new TypeError(
          'Failed to fetch dynamically imported module: https://opensourceagi.app/_next/static/chunks/PlateEditorWrapper-BrP2qdUQ-Bymdrwgj.js',
        ),
      ),
    ).toBe(true);
    expect(isChunkLoadError(new TypeError('error loading dynamically imported module'))).toBe(true);
    expect(isChunkLoadError(new TypeError('Importing a module script failed.'))).toBe(true);
    expect(isChunkLoadError('Loading chunk 42 failed.')).toBe(true);
    expect(isChunkLoadError(Object.assign(new Error('x'), { name: 'ChunkLoadError' }))).toBe(true);
  });

  it('ignores other errors', () => {
    expect(isChunkLoadError(new ReferenceError('document is not defined'))).toBe(false);
    expect(isChunkLoadError(undefined)).toBe(false);
    expect(isChunkLoadError(42)).toBe(false);
  });
});

describe('reloadForChunkError', () => {
  const reload = vi.fn();
  const chunkError = new TypeError('Failed to fetch dynamically imported module: /x.js');

  beforeEach(() => {
    sessionStorage.clear();
    reload.mockReset();
    vi.stubGlobal('location', { ...window.location, reload });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('reloads once for a chunk error, then not again within the cooldown', () => {
    expect(reloadForChunkError(chunkError)).toBe(true);
    expect(reloadForChunkError(chunkError)).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it('reloads again once the cooldown has passed', () => {
    expect(reloadForChunkError(chunkError)).toBe(true);
    vi.advanceTimersByTime(61_000);
    expect(reloadForChunkError(chunkError)).toBe(true);
    expect(reload).toHaveBeenCalledTimes(2);
  });

  it('does not reload for other errors', () => {
    expect(reloadForChunkError(new Error('boom'))).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });
});
