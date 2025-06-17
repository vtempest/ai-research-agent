export { default as AttributeMap } from './AttributeMap.ts';
export { default as Delta } from './Delta.ts';
export { default as Op, OpIterator } from './Op.ts';

import diff from 'fast-diff';
import cloneDeep from './util/cloneDeep.ts';
import isEqual from './util/isEqual.ts';

export { cloneDeep, diff, isEqual };
