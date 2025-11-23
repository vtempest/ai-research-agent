/**
 * Represents a selection range in the editor [start, end].
 */
export type EditorRange = [number, number];

/**
 * Normalizes a range so that start <= end.
 * @param range The range to normalize.
 */
export function normalizeRange(range: EditorRange): EditorRange {
  if (!range) return range;
  if (range[0] > range[1]) range = [range[1], range[0]];
  return range;
}
