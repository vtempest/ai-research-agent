/**
 * @fileoverview Utility hooks for the CodeActionMenuPlugin.
 */

import { debounce } from "lodash-es";
import { useMemo, useRef } from "react";

/**
 * Custom hook for debouncing a function within a React component.
 * @param {T} fn - The function to debounce.
 * @param {number} ms - The debounce delay in milliseconds.
 * @param {number} [maxWait] - The maximum time to wait before executing the function.
 */
export function useDebounce<T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
  maxWait?: number,
) {
  const funcRef = useRef<T | null>(null);
  funcRef.current = fn;

  return useMemo(
    () =>
      debounce(
        (...args: Parameters<T>) => {
          if (funcRef.current) {
            funcRef.current(...args);
          }
        },
        ms,
        { maxWait },
      ),
    [ms, maxWait],
  );
}
