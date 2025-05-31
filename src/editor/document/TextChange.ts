import { Delta, AttributeMap, Op, isEqual } from '../delta';
import TextDocument from './TextDocument';
import { type EditorRange, normalizeRange } from './EditorRange';
import { deltaToText } from './deltaToText';

export default class TextChange {
  private _pos: number;
  doc: TextDocument | null;
  delta: Delta;
  selection?: EditorRange | null;
  activeFormats?: AttributeMap;

  constructor(
    doc: TextDocument | null,
    delta = new Delta(),
    selection?: EditorRange | null,
    activeFormats?: AttributeMap,
  ) {
    this._pos = 0;
    this.doc = doc;
    this.delta = delta;
    this.selection = selection;
    this.activeFormats = activeFormats;
  }

  get contentChanged() {
    return this.delta.ops.length > 0;
  }

  get selectionChanged() {
    return (
      this.selection !== undefined &&
      !isEqual(this.selection, this.doc?.selection)
    );
  }

  apply() {
    throw new Error('Must be overridden by creator of change (e.g. Editor).');
  }

  setDelta(delta: Delta) {
    this.delta = delta;
    this._pos = delta.length();
    return this;
  }

  setActiveFormats(activeFormats: AttributeMap) {
    this.activeFormats = activeFormats;
    return this;
  }

  select(at: EditorRange | number | null) {
    this.selection = typeof at === 'number' ? [at, at] : at;
    return this;
  }

  delete(range: EditorRange | null, options?: { dontFixNewline?: boolean }) {
    if (!range || !this.doc) return this;
    let [at, to] = normalizeRange(range);
    if (at === to) return this;
    at = Math.min(this.doc.length - 1, Math.max(0, at));
    to = Math.min(this.doc.length, Math.max(0, to));
    if (at === to) return this; // check again
    const length = to - at;
    if (this.doc.selection) this.selection = [at, at];
    this.compose(at, (delta) => delta.delete(length), length);

    const lineRange = this.doc.getLineRange(at);
    if (!options?.dontFixNewline && lineRange[1] <= to) {
      const format = this.doc.getLineAt(at).attributes;
      this.formatLine(to, format);
    }
    return this;
  }

  insert(
    at: number,
    insert: string | object,
    format?: AttributeMap,
    options?: { dontFixNewline?: boolean },
  ) {
    if (!this.doc) return this;
    at = this.normalizePoint(at);

    if (this.doc.selection) {
      const end = at + (typeof insert === 'string' ? insert.length : 1);
      this.selection = [end, end];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...lineFormat } = this.doc.getLineAt(at).attributes;

    if (typeof insert !== 'string') {
      this.compose(at, (delta) => delta.insert(insert, format));
    } else if (insert === '\n') {
      if (options?.dontFixNewline) {
        this.compose(at, (delta) => delta.insert('\n', { ...format }));
      } else {
        this.compose(at, (delta) => delta.insert('\n', lineFormat));
        this.formatLine(at, { ...format });
      }
    } else {
      if (!format) format = this.getFormatAt(at);
      if (insert.includes('\n')) {
        const lines = insert.split('\n');
        this.compose(at, (delta) => {
          lines.forEach((line, i) => {
            if (i) delta.insert('\n', i === 1 ? lineFormat : {});
            if (line.length) delta.insert(line, format);
          });
          return delta;
        });
      } else {
        this.compose(at, (delta) => delta.insert(insert, format));
      }
    }
    return this;
  }

  insertContent(at: number, content: Delta) {
    if (!this.doc) return this;
    at = this.normalizePoint(at);

    if (this.doc.selection) {
      // Ignore retain ops at the end
      const ops = content.ops.filter((op) => op.delete);
      while (ops.length && ops[ops.length - 1].retain) ops.pop();
      const end = at + ops.reduce((length, op) => length + Op.length(op), 0);
      this.selection = [end, end];
    }

    const text = deltaToText(content);
    const newlineIndex = text.indexOf('\n');

    if (newlineIndex !== -1) {
      content = content.compose(
        new Delta().retain(newlineIndex).retain(1, this.doc.getLineFormat(at)),
      );
    }
    this.compose(at, (delta) => delta.concat(content));
    return this;
  }

  formatText(range: EditorRange, format?: AttributeMap) {
    if (!this.doc) return this;
    range = normalizeRange(range);
    const length = range[1] - range[0];
    if (!length) return this;
    if (format) {
      Object.keys(format).forEach(
        (name) => format[name] === false && (format[name] = null),
      );
    }

    // get lines for at-to and apply, skipping newlines
    this.doc.getLineRanges(range).forEach(([start, end]) => {
      start = Math.max(range[0], start);
      end = Math.min(range[1], end - 1);
      const length = end - start;
      this.compose(start, (delta) => delta.retain(length, format), length);
    });
    return this;
  }

  toggleTextFormat(range: EditorRange, format: AttributeMap) {
    if (!this.doc) return this;
    if (typeof range === 'number') range = [range, range];
    range = normalizeRange(range);
    const existing = this.doc.getTextFormat(range);
    if (hasFormat(format, existing)) format = AttributeMap.invert(format);
    return this.formatText(range, format);
  }

  formatLine(
    range: EditorRange | number,
    format: AttributeMap,
    decoration?: boolean,
  ) {
    if (!this.doc) return this;
    const doc = this.doc;
    if (typeof range === 'number') range = [range, range];
    range = normalizeRange(range);
    this.doc.getLineRanges(range).forEach(([, end]) => {
      end--;
      if (!decoration) {
        const undoFormat = AttributeMap.invert(doc.getLineFormat(end));
        format = { ...undoFormat, ...format };
      }
      this.compose(end, (delta) => delta.retain(1, format), 1);
    });
    this.delta.chop();
    return this;
  }

  toggleLineFormat(range: EditorRange | number, format: AttributeMap) {
    if (!this.doc) return this;
    if (typeof range === 'number') range = [range, range];
    range = normalizeRange(range);
    const existing = this.doc.getLineFormat(range);
    if (hasFormat(format, existing)) format = AttributeMap.invert(format);
    return this.formatLine(range, format);
  }

  removeFormat(range: EditorRange) {
    if (!this.doc) return this;
    range = normalizeRange(range);
    const undo = AttributeMap.invert(this.doc.getFormats(range));
    const length = range[1] - range[0];
    return this.compose(
      range[0],
      (delta) => delta.retain(length, undo),
      length,
    );
  }

  transform(change: TextChange, priority?: boolean) {
    const delta = this.delta.transform(change.delta, priority);
    const selection =
      change.selection && this.transformSelection(change.selection);
    return new TextChange(null, delta, selection);
  }

  transformSelection(
    selection: EditorRange | null,
    priority?: boolean,
  ): EditorRange | null {
    if (!selection) return selection;
    const from = this.delta.transformPosition(selection[0], priority);
    const to = this.delta.transformPosition(selection[1], priority);
    if (from === selection[0] && to === selection[1]) return selection;
    return [from, to];
  }

  transformAgainst(delta: TextChange | Delta, priority?: boolean) {
    const change = (delta as Delta).ops
      ? new TextChange(null, delta as Delta)
      : (delta as TextChange);
    return change.transform(this, !priority);
  }

  isFor(doc: TextDocument) {
    return this.doc === doc;
  }

  clone() {
    return new TextChange(
      this.doc,
      new Delta(this.delta.ops.slice()),
      this.selection?.slice() as EditorRange,
    );
  }

  private compose(
    at: number,
    applicator: (delta: Delta) => Delta,
    length?: number,
  ) {
    if (this._pos <= at) {
      this.delta = applicator(this.delta.retain(at - this._pos));
    } else {
      this.delta = this.delta.compose(applicator(new Delta().retain(at)));
    }
    this._pos = Math.max(at + (length || 0), this._pos);
    return this;
  }

  private normalizePoint(
    at: number,
    maxLength: number = this.doc ? this.doc.length - 1 : 0,
  ): number {
    return Math.max(0, Math.min(maxLength, at));
  }

  private getFormatAt(at: number) {
    let format: AttributeMap | undefined = undefined;
    if (this.doc) {
      // Only keep the format if it is present on both sides of the cursor
      const attr1 = this.doc.getTextFormat(at);
      const attr2 = this.doc.getTextFormat(at + 1);
      if (attr1 && attr2) {
        format = attr1 === attr2 ? attr1 : intersect(attr2, Object.keys(attr1));
      }
    }
    return format;
  }
}

export function hasFormat(format: AttributeMap, attributes: AttributeMap) {
  return Object.keys(format).every((name) =>
    isEqual(attributes[name], format[name]),
  );
}

export function intersect(value: object, other: object) {
  const obj: object = {};
  Object.keys(value).forEach((key) => {
    //@ts-ignore
    if (value[key] === other[key]) obj[key] = value[key];
  });
  return obj;
}
