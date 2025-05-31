import Line, { type LineIds, type LineIterator } from './Line';
import { Op, OpIterator } from '../delta';

namespace LineOp {
  export function iterator(lines: Line[], lineIds?: LineIds) {
    return new LineOpIterator(lines, lineIds);
  }

  export function length(op: Op): number {
    return Op.length(op);
  }
}

export default LineOp;

export class LineOpIterator {
  lineIterator: LineIterator;
  opIterator: OpIterator;

  constructor(lines: Line[], lineIds?: LineIds) {
    this.lineIterator = Line.iterator(lines, lineIds);
    const line = this.lineIterator.peek();
    this.opIterator = Op.iterator(line?.content.ops || []);
  }

  hasNext(): boolean {
    return this.opIterator.hasNext() || this.lineIterator.hasNext();
  }

  next(length?: number): Op {
    let op = this.opIterator.next(length);
    if (op.retain === Infinity && this.lineIterator.hasNext()) {
      op = getLineOp(this.nextLine());
    }
    return op;
  }

  nextLine() {
    const line = this.lineIterator.next();
    const nextLine = this.lineIterator.peek();
    this.opIterator = new OpIterator(nextLine?.content.ops || []);
    return line;
  }

  peek(): Op {
    if (this.opIterator.hasNext() || !this.lineIterator.hasNext()) {
      return this.opIterator.peek();
    } else {
      return getLineOp(this.peekLine());
    }
  }

  peekLine(): Line {
    return this.lineIterator.peek();
  }

  peekLength(): number {
    if (this.opIterator.hasNext() || !this.lineIterator.hasNext()) {
      return this.opIterator.peekLength();
    } else {
      return 1; // a newline is length 1
    }
  }

  peekLineLength(): number {
    return this.lineIterator.peekLength();
  }

  peekType(): string {
    if (this.opIterator.hasNext()) {
      return this.opIterator.peekType();
    } else if (this.lineIterator.hasNext()) {
      return 'insert'; // insert: '\n'
    } else {
      return 'retain';
    }
  }

  restCurrentLine(): Op[] {
    return this.opIterator.rest();
  }

  restLines(): Line[] {
    if (this.opIterator.offset) {
      this.lineIterator.next(this.opIterator.offset);
    }
    return this.lineIterator.rest();
  }
}

function getLineOp(line: Line) {
  const op = { insert: '\n' } as Op;
  if (line.attributes) op.attributes = line.attributes;
  return op;
}
