import cloneDeep from './util/cloneDeep';
import isEqual from './util/isEqual';

interface AttributeMap {
  [key: string]: any;
}

function isObject(value: unknown): value is AttributeMap {
  return value === Object(value) && !Array.isArray(value);
}

function isDeepNull(value: unknown): boolean {
  if (value == null) return true;
  if (!isObject(value)) return false;
  for (const key in value) {
    if (!isDeepNull(value[key])) return false;
  }
  return true;
}

namespace AttributeMap {
  export function compose(
    a: AttributeMap = {},
    b: AttributeMap = {},
    keepNull?: boolean,
  ): AttributeMap | undefined {
    if (typeof a !== 'object') {
      a = {};
    }
    if (typeof b !== 'object') {
      b = {};
    }
    let attributes = cloneDeep(b);
    for (const key in a) {
      if (isObject(a[key]) && isObject(attributes[key])) {
        attributes[key] = compose(a[key], attributes[key], keepNull);
      }
    }
    if (!keepNull) {
      attributes = Object.keys(attributes).reduce<AttributeMap>((copy, key) => {
        if (!isDeepNull(attributes[key])) {
          copy[key] = attributes[key];
        }
        return copy;
      }, {});
    }
    for (const key in a) {
      if (a[key] !== undefined && b[key] === undefined) {
        attributes[key] = a[key];
      }
    }
    return Object.keys(attributes).length > 0 ? attributes : undefined;
  }

  export function diff(
    a: AttributeMap = {},
    b: AttributeMap = {},
  ): AttributeMap | undefined {
    if (typeof a !== 'object') {
      a = {};
    }
    if (typeof b !== 'object') {
      b = {};
    }
    const attributes = Object.keys(a)
      .concat(Object.keys(b))
      .reduce<AttributeMap>((attrs, key) => {
        if (!isEqual(a[key], b[key])) {
          if (b[key] === undefined) {
            attrs[key] = null;
          } else if (isObject(a[key]) && isObject(b[key])) {
            attrs[key] = diff(a[key], b[key]);
          } else {
            attrs[key] = b[key];
          }
        }
        return attrs;
      }, {});
    return Object.keys(attributes).length > 0 ? attributes : undefined;
  }

  export function invert(
    attr: AttributeMap = {},
    base: AttributeMap = {},
  ): AttributeMap {
    attr = attr || {};
    const baseInverted = Object.keys(base).reduce<AttributeMap>((memo, key) => {
      if (!isEqual(base[key], attr[key]) && attr[key] !== undefined) {
        if (isObject(attr[key]) && isObject(base[key])) {
          memo[key] = invert(attr[key], base[key]);
        } else {
          memo[key] = base[key];
        }
      }
      return memo;
    }, {});
    return Object.keys(attr).reduce<AttributeMap>((memo, key) => {
      if (attr[key] !== base[key] && base[key] === undefined) {
        memo[key] = null;
      }
      return memo;
    }, baseInverted);
  }

  export function transform(
    a: AttributeMap | undefined,
    b: AttributeMap | undefined,
    priority = false,
  ): AttributeMap | undefined {
    if (typeof a !== 'object') {
      return b;
    }
    if (typeof b !== 'object') {
      return undefined;
    }
    if (!priority) {
      return b; // b simply overwrites us without priority
    }
    const attributes = Object.keys(b).reduce<AttributeMap>((attrs, key) => {
      if (a[key] === undefined) {
        attrs[key] = b[key]; // null is a valid value
      } else if (isObject(a[key]) && isObject(b[key])) {
        attrs[key] = transform(a[key], b[key], true);
      }
      return attrs;
    }, {});
    return Object.keys(attributes).length > 0 ? attributes : undefined;
  }
}

export default AttributeMap;
