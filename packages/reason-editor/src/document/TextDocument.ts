import { Delta, AttributeMap, Op, isEqual } from '../delta';
import Line, { type LineRanges, type LineIds } from './Line';
import LineOp from './LineOp';
import { type EditorRange, normalizeRange } from './EditorRange';
import TextChange from './TextChange';
import { deltaToText } from './deltaToText';

const EMPTY_RANGE: EditorRange = [0, 0];
const EMPTY_OBJ = {};
const DELTA_CACHE = new WeakMap<TextDocument, Delta>();
const excludeProps = new Set(['id']);

/**
 * Options for formatting retrieval.
 */
export interface FormattingOptions {
  nameOnly?: boolean;
  allFormats?: boolean;
}

/**
 * Represents a text document with lines and selection.
 * Immutable structure that returns new instances on change.
 */
export default class TextDocument {
  private _ranges: LineRanges;
  byId: LineIds;
  lines: Line[];
  length: number;
  selection: EditorRange | null;

  /**
   * Creates a new TextDocument.
   * @param linesOrDocOrDelta Initial content (lines, another doc, or delta).
   * @param selection Initial selection.
   */
  constructor(
    linesOrDocOrDelta?: TextDocument | Line[] | Delta,
    selection: EditorRange | null = null,
  ) {
    if (linesOrDocOrDelta && (linesOrDocOrDelta as TextDocument).lines) {
      const textDocument = linesOrDocOrDelta as TextDocument;
      this.lines = textDocument.lines;
      this.byId = textDocument.byId;
      this._ranges = textDocument._ranges;
      this.length = textDocument.length;
    } else {
      this.byId = new Map();
      if (linesOrDocOrDelta && Array.isArray(linesOrDocOrDelta)) {
        this.lines = linesOrDocOrDelta as Line[];
      } else if (linesOrDocOrDelta) {
        this.lines = Line.fromDelta(linesOrDocOrDelta as Delta);
      } else {
        this.lines = [Line.create()];
      }
      if (!this.lines.length) {
        this.lines.push(Line.create());
      }
      this.byId = Line.linesToLineIds(this.lines);
      // Check for line id duplicates (should never happen, indicates bug)
      this.lines.forEach((line) => {
        if (this.byId.get(line.id) !== line)
          throw new Error('TextDocument has duplicate line ids: ' + line.id);
      });
      this._ranges = Line.getLineRanges(this.lines);
      this.length = this.lines.reduce(
        (length, line) => length + line.length,
        0,
      );
    }
    if (selection) {
      selection = selection.map((index) =>
        Math.min(this.length, Math.max(0, index)),
      ) as EditorRange;
      if (selection[0] === selection[1] && selection[0] === this.length) selection[0]--;
    }
    this.selection = selection;
  }

  /**
   * Creates a new TextChange for this document.
   */
  get change() {
    const change = new TextChange(this);
    change.apply = () => this.apply(change);
    return change;
  }

  /**
   * Gets the text content of the document or a range.
   * @param range Optional range to get text from.
   */
  getText(range?: EditorRange): string {
    if (range) range = normalizeRange(range);
    return deltaToText(
      range ? this.slice(range[0], range[1]) : this.slice(0, this.length - 1),
    );
  }

  /**
   * Gets a line by its ID.
   * @param id The line ID.
   */
  getLineBy(id: string) {
    return this.byId.get(id) as Line;
  }

  /**
   * Gets the line at a specific character index.
   * @param at The character index.
   */
  getLineAt(at: number) {
    return this.lines.find((line) => {
      const [start, end] = this.getLineRange(line);
      return start <= at && end > at;
    }) as Line;
  }

  /**
   * Gets lines within a range.
   * @param atOrRange The range or position.
   * @param encompassed Whether to include only lines fully encompassed by the range.
   */
  getLinesAt(atOrRange: number | EditorRange, encompassed?: boolean) {
    let at: number, to: number;
    if (Array.isArray(atOrRange)) [at, to] = normalizeRange(atOrRange);
    else at = to = atOrRange;
    return this.lines.filter((line) => {
      const [start, end] = this.getLineRange(line);
      return encompassed
        ? start >= at && end <= to
        : (start < to || start === at) && end > at;
    });
  }

  /**
   * Gets the range of a line.
   * @param at The line, its ID, or a position within it.
   */
  getLineRange(at: number | string | Line): EditorRange {
    const { lines, _ranges: lineRanges } = this;
    if (typeof at === 'number') {
      for (let i = 0; i < lines.length; i++) {
        const range = lineRanges.get(lines[i]) || EMPTY_RANGE;
        if (range[0] <= at && range[1] > at) return range;
      }
      return EMPTY_RANGE;
    } else {
      if (typeof at === 'string') at = this.getLineBy(at);
      return lineRanges.get(at) as EditorRange;
    }
  }

  /**
   * Gets ranges for multiple lines.
   * @param at Optional range to get line ranges for.
   */
  getLineRanges(at?: number | EditorRange) {
    if (at == null) {
      return Array.from(this._ranges.values());
    } else {
      return this.getLinesAt(at).map((line) => this.getLineRange(line));
    }
  }

  /**
   * Gets the line format at a position or range.
   * @param at The position or range.
   * @param options Formatting options.
   */
  getLineFormat(
    at: number | EditorRange = this.selection as EditorRange,
    options?: FormattingOptions,
  ) {
    let to = at as number;
    if (Array.isArray(at)) [at, to] = normalizeRange(at);
    if (at === to) to++;
    return getAttributes(Line, this.lines, at, to, undefined, options);
  }

  /**
   * Gets the text format at a position or range.
   * @param at The position or range.
   * @param options Formatting options.
   */
  getTextFormat(
    at: number | EditorRange = this.selection as EditorRange,
    options?: FormattingOptions,
  ) {
    let to = at as number;
    if (Array.isArray(at)) [at, to] = normalizeRange(at);
    if (at === to) at--;
    return getAttributes(
      LineOp,
      this.lines,
      at,
      to,
      (op) => op.insert !== '\n',
      options,
    );
  }

  /**
   * Gets both text and line formats at a position or range.
   * @param at The position or range.
   * @param options Formatting options.
   */
  getFormats(
    at: number | EditorRange = this.selection as EditorRange,
    options?: FormattingOptions,
  ): AttributeMap {
    return {
      ...this.getTextFormat(at, options),
      ...this.getLineFormat(at, options),
    };
  }

  /**
   * Returns a slice of the document as a Delta.
   * @param start Start index.
   * @param end End index.
   */
  slice(start = 0, end = Infinity): Delta {
    const ops: Op[] = [];
    const iter = LineOp.iterator(this.lines);
    let index = 0;
    while (index < end && iter.hasNext()) {
      let nextOp: Op;
      if (index < start) {
        nextOp = iter.next(start - index);
      } else {
        nextOp = iter.next(end - index);
        ops.push(nextOp);
      }
      index += Op.length(nextOp);
    }
    return new Delta(ops);
  }

  /**
   * Applies a change or delta to the document, returning a new TextDocument.
   * @param change The change or delta to apply.
   * @param selection Optional new selection.
   * @param throwOnError Whether to throw on error.
   */
  apply(
    change: Delta | TextChange,
    selection?: EditorRange | null,
    throwOnError?: boolean,
  ): TextDocument {
    let delta: Delta;
    if ((change as TextChange).delta) {
      delta = (change as TextChange).delta;
      selection = (change as TextChange).selection;
    } else {
      delta = change as Delta;
    }

    // If no change, do nothing
    if (
      !delta.ops.length &&
      (selection === undefined || isEqual(this.selection, selection))
    ) {
      return this;
    }

    // Optimization for selection-only change
    if (!delta.ops.length && selection) {
      return new TextDocument(this, selection);
    }

    if (selection === undefined && this.selection) {
      selection = [
        delta.transformPosition(this.selection[0]),
        delta.transformPosition(this.selection[1]),
      ];
      // If the selection hasn't changed, keep the original reference
      if (isEqual(this.selection, selection)) {
        selection = this.selection;
      }
    }

    const thisIter = LineOp.iterator(this.lines, this.byId);
    const otherIter = Op.iterator(delta.ops);
    const lines: Line[] = [];
    const firstChange = otherIter.peek();
    if (firstChange && firstChange.retain && !firstChange.attributes) {
      let firstLeft = firstChange.retain;
      while (thisIter.peekLineLength() <= firstLeft) {
        firstLeft -= thisIter.peekLineLength();
        lines.push(thisIter.nextLine());
      }
      if (firstChange.retain - firstLeft > 0) {
        otherIter.next(firstChange.retain - firstLeft);
      }
    }

    if (!thisIter.hasNext()) {
      if (throwOnError)
        throw new Error(
          'apply() called with change that extends beyond document',
        );
    }
    let line = Line.createFrom(thisIter.peekLine());
    // let wentBeyond = false;

    function addLine(line: Line) {
      line.length = line.content.length() + 1;
      lines.push(line);
    }

    while (thisIter.hasNext() || otherIter.hasNext()) {
      if (otherIter.peekType() === 'insert') {
        const otherOp = otherIter.peek();
        const index =
          typeof otherOp.insert === 'string'
            ? otherOp.insert.indexOf('\n', otherIter.offset)
            : -1;
        if (index < 0) {
          line.content.push(otherIter.next());
        } else {
          const nextIndex = index - otherIter.offset;
          if (nextIndex) line.content.push(otherIter.next(nextIndex));
          const newlineOp = otherIter.next(1);
          // Ensure that the content up until now retains the current line id
          addLine(Line.create(line.content, newlineOp.attributes, line.id));
          // Reset the content and ID of the new line
          line = Line.create(undefined, line.attributes);
        }
      } else {
        const length = Math.min(thisIter.peekLength(), otherIter.peekLength());
        const thisOp = thisIter.next(length);
        const otherOp = otherIter.next(length);
        if (typeof thisOp.retain === 'number') {
          if (throwOnError)
            throw new Error(
              'apply() called with change that extends beyond document',
            );
          // line.content.push({ insert: '#'.repeat(otherOp.retain || 1) });
          // wentBeyond = true;
          continue;
        }

        if (typeof otherOp.retain === 'number') {
          const isLine = thisOp.insert === '\n';
          let newOp: Op = thisOp;
          // Preserve null when composing with a retain, otherwise remove it for inserts
          const attributes =
            otherOp.attributes &&
            AttributeMap.compose(thisOp.attributes, otherOp.attributes);
          if (otherOp.attributes && !isEqual(attributes, thisOp.attributes)) {
            if (isLine) {
              line.attributes = attributes || {};
            } else {
              newOp = { insert: thisOp.insert };
              if (attributes) newOp.attributes = attributes;
            }
          }
          if (isLine) {
            addLine(line);
            line = Line.createFrom(thisIter.peekLine());
          } else {
            line.content.push(newOp);
          }

          // Optimization if at the end of other
          if (otherOp.retain === Infinity || !otherIter.hasNext()) {
            if (
              thisIter.opIterator.index !== 0 ||
              thisIter.opIterator.offset !== 0
            ) {
              const ops = thisIter.restCurrentLine();
              for (let i = 0; i < ops.length; i++) {
                line.content.push(ops[i]);
              }
              addLine(line);
              thisIter.nextLine();
            }
            lines.push(...thisIter.restLines());
            break;
          }
        } else if (typeof otherOp.delete === 'number') {
          if (thisOp.insert === '\n') {
            // Be sure a deleted line is not kept
            line = Line.create(line.content, thisIter.peekLine()?.attributes, line.id);
          }
          // else ... otherOp should be a delete so we won't add the next thisOp insert
        }
      }
    }

    // if (wentBeyond) {
    //   console.log('went beyond:', line);
    //   addLine(line);
    // }

    // Deleted the last newline without replacing it
    if (!lines.length) {
      lines.push(line);
    }

    return new TextDocument(lines, selection);
  }

  /**
   * Creates a new document replacing the current one with a delta.
   * @param delta The new content delta.
   * @param selection The new selection.
   */
  replace(delta?: Delta, selection?: EditorRange | null) {
    return new TextDocument(delta, selection);
  }

  /**
   * Converts the document to a Delta.
   */
  toDelta(): Delta {
    const cache = DELTA_CACHE;
    let delta = cache.get(this);
    if (!delta) {
      delta = Line.toDelta(this.lines);
      cache.set(this, delta);
    }
    return delta;
  }

  /**
   * Checks if this document is equal to another.
   * @param other The other document.
   * @param options Comparison options.
   */
  equals(other: TextDocument, options?: { contentOnly?: boolean }) {
    return (
      this === other ||
      ((options?.contentOnly || isEqual(this.selection, other.selection)) &&
        isEqual(this.lines, other.lines, { excludeProps }))
    );
  }

  toJSON() {
    return this.toDelta();
  }

  toString() {
    return (
      this.lines
        .map((line) =>
          line.content
            .map((op) => (typeof op.insert === 'string' ? op.insert : ' '))
            .join(''),
        )
        .join('\n') + '\n'
    );
  }
}

function getAttributes(
  Type: any,
  data: any,
  from: number,
  to: number,
  filter?: (next: any) => boolean,
  options?: FormattingOptions,
): AttributeMap {
  const iter = Type.iterator(data);
  let attributes: AttributeMap | undefined;
  let index = 0;
  if (iter.skip) index += iter.skip(from);
  while (index < to && iter.hasNext()) {
    const next = iter.next() as { attributes: AttributeMap };
    index += Type.length(next);
    if (index > from && (!filter || filter(next))) {
      if (!next.attributes) attributes = {};
      else if (!attributes) attributes = { ...next.attributes };
      else if (options?.allFormats)
        attributes = AttributeMap.compose(attributes, next.attributes);
      else
        attributes = intersectAttributes(
          attributes,
          next.attributes,
          options?.nameOnly,
        );
    }
  }
  return attributes || EMPTY_OBJ;
}

// Intersect 2 attibute maps, keeping only those that are equal in both
function intersectAttributes(
  attributes: AttributeMap,
  other: AttributeMap,
  nameOnly?: boolean,
) {
  return Object.keys(other).reduce(function (intersect: any, name) {
    if (nameOnly) {
      if (name in attributes && name in other) intersect[name] = true;
    } else if (isEqual(attributes[name], other[name], { partial: true })) {
      intersect[name] = other[name];
    } else if (isEqual(other[name], attributes[name], { partial: true })) {
      intersect[name] = attributes[name];
    }
    return intersect;
  }, {});
}
