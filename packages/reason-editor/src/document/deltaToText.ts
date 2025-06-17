import { Delta } from '../delta';

export function deltaToText(delta: Delta) {
  return delta
    .map((op) =>
      typeof op.insert === 'string' ? op.insert : op.insert ? ' ' : '',
    )
    .join('');
}
