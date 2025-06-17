exports.ids = ["3740"];
exports.modules = {
46811: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  assets: () => (assets),
  contentTitle: () => (contentTitle),
  "default": () => (MDXContent),
  frontMatter: () => (frontMatter),
  metadata: () => (/* reexport default export from named module */ _site_docusaurus_docusaurus_plugin_content_docs_default_site_docs_api_qwksearch_api_info_mdx_92f_json__WEBPACK_IMPORTED_MODULE_0__),
  toc: () => (toc)
});
/* ESM import */var _site_docusaurus_docusaurus_plugin_content_docs_default_site_docs_api_qwksearch_api_info_mdx_92f_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86158);
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74132);
/* ESM import */var _mdx_js_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22840);
/* ESM import */var _theme_ApiLogo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55716);
/* ESM import */var _theme_ApiLogo__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_theme_ApiLogo__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _theme_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33385);
/* ESM import */var _theme_SchemaTabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25525);
/* ESM import */var _theme_SchemaTabs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_theme_SchemaTabs__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _theme_TabItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13134);
/* ESM import */var _theme_ApiExplorer_Export__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29591);
/* ESM import */var _theme_ApiExplorer_Export__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_theme_ApiExplorer_Export__WEBPACK_IMPORTED_MODULE_6__);


const frontMatter = {
	id: 'qwksearch-api',
	title: 'QwkSearch API',
	description: 'Search, extract, vectorize and outline a topic base with AI Research Agent.',
	sidebar_label: 'Introduction',
	sidebar_position: 0,
	hide_title: true,
	custom_edit_url: null
};
const contentTitle = undefined;

const assets = {

};








const toc = [];
function _createMdxContent(props) {
  const _components = {
    a: "a",
    p: "p",
    ...(0,_mdx_js_react__WEBPACK_IMPORTED_MODULE_7__/* .useMDXComponents */.a)(),
    ...props.components
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
      className: "theme-doc-version-badge badge badge--secondary",
      children: "Version: 1.0.0"
    }), "\n", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_theme_Heading__WEBPACK_IMPORTED_MODULE_3__["default"], {
      as: "h1",
      className: "openapi__heading",
      children: "QwkSearch API"
    }), "\n", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)((_theme_ApiLogo__WEBPACK_IMPORTED_MODULE_2___default()), {
      logo: {
        "url": "https://qwksearch.com/icons/qwksearch-logo.svg",
        "altText": "logo"
      },
      darkLogo: undefined
    }), "\n", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p, {
      children: "Search, extract, vectorize and outline a topic base with AI Research Agent."
    }), "\n", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      style: {
        "display": "flex",
        "flexDirection": "column",
        "marginBottom": "var(--ifm-paragraph-margin-bottom)"
      },
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
        style: {
          "marginBottom": "0.25rem"
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p, {
          children: "Contact"
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p, {
          children: ["QwkSearch: ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a, {
            href: "mailto:support@qwksearch.com",
            children: "support@qwksearch.com"
          })]
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p, {
          children: ["URL: ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a, {
            href: "https://qwksearch.com",
            children: "https://qwksearch.com"
          })]
        })
      })]
    }), "\n", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      style: {
        "marginBottom": "var(--ifm-paragraph-margin-bottom)"
      },
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
        style: {
          "marginBottom": "0.25rem"
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p, {
          children: "Terms of Service"
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
        href: "http://qwksearch.com/legal/terms/",
        children: 'http://qwksearch.com/legal/terms/'
      })]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = {
    ...(0,_mdx_js_react__WEBPACK_IMPORTED_MODULE_7__/* .useMDXComponents */.a)(),
    ...props.components
  };
  return MDXLayout ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout, {
    ...props,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}



}),
45924: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clsx: () => (clsx),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

}),
64460: (function (module) {
// Exports
module.exports = {
	"tabItem": `tabItem_UN9A`
};


}),
11227: (function (module) {
(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if(true)b();else{}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

}),
74396: (function (module, __unused_webpack_exports, __webpack_require__) {
var root = __webpack_require__(29165);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


}),
28486: (function (module) {
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


}),
98768: (function (module, __unused_webpack_exports, __webpack_require__) {
var arrayPush = __webpack_require__(28486),
    isFlattenable = __webpack_require__(89465);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


}),
80732: (function (module, __unused_webpack_exports, __webpack_require__) {
var Symbol = __webpack_require__(74396),
    getRawTag = __webpack_require__(31239),
    objectToString = __webpack_require__(57058);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


}),
84742: (function (module, __unused_webpack_exports, __webpack_require__) {
var baseGetTag = __webpack_require__(80732),
    isObjectLike = __webpack_require__(55073);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


}),
96476: (function (module) {
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;


}),
31239: (function (module, __unused_webpack_exports, __webpack_require__) {
var Symbol = __webpack_require__(74396);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


}),
89465: (function (module, __unused_webpack_exports, __webpack_require__) {
var Symbol = __webpack_require__(74396),
    isArguments = __webpack_require__(30353),
    isArray = __webpack_require__(24669);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


}),
57058: (function (module) {
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


}),
29165: (function (module, __unused_webpack_exports, __webpack_require__) {
var freeGlobal = __webpack_require__(96476);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


}),
22612: (function (module, __unused_webpack_exports, __webpack_require__) {
var baseFlatten = __webpack_require__(98768);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


}),
30353: (function (module, __unused_webpack_exports, __webpack_require__) {
var baseIsArguments = __webpack_require__(84742),
    isObjectLike = __webpack_require__(55073);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


}),
24669: (function (module) {
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


}),
55073: (function (module) {
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


}),
77226: (function (module, exports) {
/**
 * @param {string} string    The string to parse
 * @returns {Array<number>}  Returns an energetic array.
 */
function parsePart(string) {
  let res = [];
  let m;

  for (let str of string.split(",").map((str) => str.trim())) {
    // just a number
    if (/^-?\d+$/.test(str)) {
      res.push(parseInt(str, 10));
    } else if (
      (m = str.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/))
    ) {
      // 1-5 or 1..5 (equivalent) or 1...5 (doesn't include 5)
      let [_, lhs, sep, rhs] = m;

      if (lhs && rhs) {
        lhs = parseInt(lhs);
        rhs = parseInt(rhs);
        const incr = lhs < rhs ? 1 : -1;

        // Make it inclusive by moving the right 'stop-point' away by one.
        if (sep === "-" || sep === ".." || sep === "\u2025") rhs += incr;

        for (let i = lhs; i !== rhs; i += incr) res.push(i);
      }
    }
  }

  return res;
}

exports["default"] = parsePart;
module.exports = parsePart;


}),
13134: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (TabItem)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54461);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64460);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 



function TabItem(param) {
    var children = param.children, hidden = param.hidden, className = param.className;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        role: "tabpanel",
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z)((_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().tabItem), className),
        hidden: hidden,
        children: children
    });
}


}),
77037: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  a: () => (useBackToTopButton)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39546);
/* ESM import */var _utils_scrollUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(63666);
/* ESM import */var _utils_useLocationChange__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6786);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}



/** Wires the logic for the back to top button. */ function useBackToTopButton(param) {
    var threshold = param.threshold;
    var _useState = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), 2), shown = _useState[0], setShown = _useState[1];
    var isFocusedAnchor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    var _useSmoothScrollTo = (0,_utils_scrollUtils__WEBPACK_IMPORTED_MODULE_1__/* .useSmoothScrollTo */.Ct)(), startScroll = _useSmoothScrollTo.startScroll, cancelScroll = _useSmoothScrollTo.cancelScroll;
    (0,_utils_scrollUtils__WEBPACK_IMPORTED_MODULE_1__/* .useScrollPosition */.RF)(function(param, lastPosition) {
        var scrollTop = param.scrollY;
        var lastScrollTop = lastPosition === null || lastPosition === void 0 ? void 0 : lastPosition.scrollY;
        // Component is just being mounted. Not really a scroll event from the user.
        // Ignore it.
        if (!lastScrollTop) {
            return;
        }
        if (isFocusedAnchor.current) {
            // This scroll position change is triggered by navigating to an anchor.
            // Ignore it.
            isFocusedAnchor.current = false;
        } else if (scrollTop >= lastScrollTop) {
            // The user has scrolled down to "fight against" the animation. Cancel any
            // animation under progress.
            cancelScroll();
            setShown(false);
        } else if (scrollTop < threshold) {
            // Scrolled to the minimum position; hide the button.
            setShown(false);
        } else if (scrollTop + window.innerHeight < document.documentElement.scrollHeight) {
            setShown(true);
        }
    });
    (0,_utils_useLocationChange__WEBPACK_IMPORTED_MODULE_2__/* .useLocationChange */.S)(function(locationChangeEvent) {
        if (locationChangeEvent.location.hash) {
            isFocusedAnchor.current = true;
            setShown(false);
        }
    });
    return {
        shown: shown,
        scrollToTop: function() {
            return startScroll(0);
        }
    };
} //# sourceMappingURL=useBackToTopButton.js.map


}),
54090: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  F: () => (useCodeWordWrap)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39546);
/* ESM import */var _useMutationObserver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(63310);
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}


// Callback fires when the "hidden" attribute of a tabpanel changes
// See https://github.com/facebook/docusaurus/pull/7485
function useTabBecameVisibleCallback(codeBlockRef, callback) {
    var _useState = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(), 2), hiddenTabElement = _useState[0], setHiddenTabElement = _useState[1];
    var updateHiddenTabElement = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function() {
        var _codeBlockRef_current;
        // No need to observe non-hidden tabs
        // + we want to force a re-render when a tab becomes visible
        setHiddenTabElement((_codeBlockRef_current = codeBlockRef.current) === null || _codeBlockRef_current === void 0 ? void 0 : _codeBlockRef_current.closest('[role=tabpanel][hidden]'));
    }, [
        codeBlockRef,
        setHiddenTabElement
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        updateHiddenTabElement();
    }, [
        updateHiddenTabElement
    ]);
    (0,_useMutationObserver__WEBPACK_IMPORTED_MODULE_1__/* .useMutationObserver */.I)(hiddenTabElement, function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'hidden') {
                callback();
                updateHiddenTabElement();
            }
        });
    }, {
        attributes: true,
        characterData: false,
        childList: false,
        subtree: false
    });
}
function useCodeWordWrap() {
    var _useState = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), 2), isEnabled = _useState[0], setIsEnabled = _useState[1];
    var _useState1 = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), 2), isCodeScrollable = _useState1[0], setIsCodeScrollable = _useState1[1];
    var codeBlockRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    var toggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function() {
        var codeElement = codeBlockRef.current.querySelector('code');
        if (isEnabled) {
            codeElement.removeAttribute('style');
        } else {
            codeElement.style.whiteSpace = 'pre-wrap';
            // When code wrap is enabled, we want to avoid a scrollbar in any case
            // Ensure that very very long words/strings/tokens still wrap
            codeElement.style.overflowWrap = 'anywhere';
        }
        setIsEnabled(function(value) {
            return !value;
        });
    }, [
        codeBlockRef,
        isEnabled
    ]);
    var updateCodeIsScrollable = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function() {
        var _codeBlockRef_current = codeBlockRef.current, scrollWidth = _codeBlockRef_current.scrollWidth, clientWidth = _codeBlockRef_current.clientWidth;
        var isScrollable = scrollWidth > clientWidth || codeBlockRef.current.querySelector('code').hasAttribute('style');
        setIsCodeScrollable(isScrollable);
    }, [
        codeBlockRef
    ]);
    useTabBecameVisibleCallback(codeBlockRef, updateCodeIsScrollable);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        updateCodeIsScrollable();
    }, [
        isEnabled,
        updateCodeIsScrollable
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        window.addEventListener('resize', updateCodeIsScrollable, {
            passive: true
        });
        return function() {
            window.removeEventListener('resize', updateCodeIsScrollable);
        };
    }, [
        updateCodeIsScrollable
    ]);
    return {
        codeBlockRef: codeBlockRef,
        isEnabled: isEnabled,
        isCodeScrollable: isCodeScrollable,
        toggle: toggle
    };
} //# sourceMappingURL=useCodeWordWrap.js.map


}),
63310: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  I: () => (useMutationObserver)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39546);
/* ESM import */var _utils_reactUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11845);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 

var DefaultOptions = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
};
function useMutationObserver(target, callback) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : DefaultOptions;
    var stableCallback = (0,_utils_reactUtils__WEBPACK_IMPORTED_MODULE_1__/* .useEvent */.zX)(callback);
    // MutationObserver options are not nested much
    // so this should be to memo options in 99%
    // TODO handle options.attributeFilter array
    var stableOptions = (0,_utils_reactUtils__WEBPACK_IMPORTED_MODULE_1__/* .useShallowMemoObject */.Ql)(options);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        var observer = new MutationObserver(stableCallback);
        if (target) {
            observer.observe(target, stableOptions);
        }
        return function() {
            return observer.disconnect();
        };
    }, [
        target,
        stableCallback,
        stableOptions
    ]);
} //# sourceMappingURL=useMutationObserver.js.map


}),
30488: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  p: () => (usePrismTheme)
});
/* ESM import */var _contexts_colorMode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26308);
/* ESM import */var _utils_useThemeConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(544);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 

/**
 * Returns a color-mode-dependent Prism theme: whatever the user specified in
 * the config. Falls back to `palenight`.
 */ function usePrismTheme() {
    var prism = (0,_utils_useThemeConfig__WEBPACK_IMPORTED_MODULE_0__/* .useThemeConfig */.L)().prism;
    var colorMode = (0,_contexts_colorMode__WEBPACK_IMPORTED_MODULE_1__/* .useColorMode */.I)().colorMode;
    var lightModeTheme = prism.theme;
    var darkModeTheme = prism.darkTheme || lightModeTheme;
    var prismTheme = colorMode === 'dark' ? darkModeTheme : lightModeTheme;
    return prismTheme;
} //# sourceMappingURL=usePrismTheme.js.map


}),
57145: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  K: () => (useSearchQueryString),
  M: () => (useSearchLinkCreator)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48131);
/* ESM import */var _utils_historyUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28558);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 


var SEARCH_PARAM_QUERY = 'q';
/**
 * Permits to read/write the current search query string
 */ function useSearchQueryString() {
    return (0,_utils_historyUtils__WEBPACK_IMPORTED_MODULE_2__/* .useQueryString */.Nc)(SEARCH_PARAM_QUERY);
}
/**
 * Permits to create links to the search page with the appropriate query string
 */ function useSearchLinkCreator() {
    var _useDocusaurusContext = (0,_docusaurus_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_1__["default"])(), _useDocusaurusContext_siteConfig = _useDocusaurusContext.siteConfig, baseUrl = _useDocusaurusContext_siteConfig.baseUrl, themeConfig = _useDocusaurusContext_siteConfig.themeConfig;
    var searchPagePath = themeConfig.algolia.searchPagePath;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(searchValue) {
        return(// Refer to https://github.com/facebook/docusaurus/pull/2838
        // Note: if searchPagePath is falsy, useSearchPage() will not be called
        "".concat(baseUrl).concat(searchPagePath, "?").concat(SEARCH_PARAM_QUERY, "=").concat(encodeURIComponent(searchValue)));
    }, [
        baseUrl,
        searchPagePath
    ]);
} //# sourceMappingURL=useSearchPage.js.map


}),
90819: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  S: () => (useTOCHighlight)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39546);
/* ESM import */var _utils_useThemeConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(544);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 

// TODO make the hardcoded theme-classic classnames configurable (or add them
// to ThemeClassNames?)
/**
 * If the anchor has no height and is just a "marker" in the DOM; we'll use the
 * parent (normally the link text) rect boundaries instead
 */ function getVisibleBoundingClientRect(element) {
    var rect = element.getBoundingClientRect();
    var hasNoHeight = rect.top === rect.bottom;
    if (hasNoHeight) {
        return getVisibleBoundingClientRect(element.parentNode);
    }
    return rect;
}
/**
 * Considering we divide viewport into 2 zones of each 50vh, this returns true
 * if an element is in the first zone (i.e., appear in viewport, near the top)
 */ function isInViewportTopHalf(boundingRect) {
    return boundingRect.top > 0 && boundingRect.bottom < window.innerHeight / 2;
}
function getAnchors(param) {
    var minHeadingLevel = param.minHeadingLevel, maxHeadingLevel = param.maxHeadingLevel;
    var selectors = [];
    for(var i = minHeadingLevel; i <= maxHeadingLevel; i += 1){
        selectors.push("h".concat(i, ".anchor"));
    }
    return Array.from(document.querySelectorAll(selectors.join()));
}
function getActiveAnchor(anchors, param) {
    var anchorTopOffset = param.anchorTopOffset;
    // Naming is hard: The "nextVisibleAnchor" is the first anchor that appear
    // under the viewport top boundary. It does not mean this anchor is visible
    // yet, but if user continues scrolling down, it will be the first to become
    // visible
    var nextVisibleAnchor = anchors.find(function(anchor) {
        var boundingRect = getVisibleBoundingClientRect(anchor);
        return boundingRect.top >= anchorTopOffset;
    });
    if (nextVisibleAnchor) {
        var boundingRect = getVisibleBoundingClientRect(nextVisibleAnchor);
        // If anchor is in the top half of the viewport: it is the one we consider
        // "active" (unless it's too close to the top and and soon to be scrolled
        // outside viewport)
        if (isInViewportTopHalf(boundingRect)) {
            return nextVisibleAnchor;
        }
        var _anchors_;
        // If anchor is in the bottom half of the viewport, or under the viewport,
        // we consider the active anchor is the previous one. This is because the
        // main text appearing in the user screen mostly belong to the previous
        // anchor. Returns null for the first anchor, see
        // https://github.com/facebook/docusaurus/issues/5318
        return (_anchors_ = anchors[anchors.indexOf(nextVisibleAnchor) - 1]) !== null && _anchors_ !== void 0 ? _anchors_ : null;
    }
    var _anchors_1;
    // No anchor under viewport top (i.e. we are at the bottom of the page),
    // highlight the last anchor found
    return (_anchors_1 = anchors[anchors.length - 1]) !== null && _anchors_1 !== void 0 ? _anchors_1 : null;
}
function getLinkAnchorValue(link) {
    return decodeURIComponent(link.href.substring(link.href.indexOf('#') + 1));
}
function getLinks(linkClassName) {
    return Array.from(document.getElementsByClassName(linkClassName));
}
function getNavbarHeight() {
    // Not ideal to obtain actual height this way
    // Using TS ! (not ?) because otherwise a bad selector would be un-noticed
    return document.querySelector('.navbar').clientHeight;
}
function useAnchorTopOffsetRef() {
    var anchorTopOffsetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    var _useThemeConfig = (0,_utils_useThemeConfig__WEBPACK_IMPORTED_MODULE_1__/* .useThemeConfig */.L)(), hideOnScroll = _useThemeConfig.navbar.hideOnScroll;
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        anchorTopOffsetRef.current = hideOnScroll ? 0 : getNavbarHeight();
    }, [
        hideOnScroll
    ]);
    return anchorTopOffsetRef;
}
/**
 * Side-effect that applies the active class name to the TOC heading that the
 * user is currently viewing. Disabled when `config` is undefined.
 */ function useTOCHighlight(config) {
    var lastActiveLinkRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(undefined);
    var anchorTopOffsetRef = useAnchorTopOffsetRef();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        var updateLinkActiveClass = function updateLinkActiveClass(link, active) {
            if (active) {
                if (lastActiveLinkRef.current && lastActiveLinkRef.current !== link) {
                    lastActiveLinkRef.current.classList.remove(linkActiveClassName);
                }
                link.classList.add(linkActiveClassName);
                lastActiveLinkRef.current = link;
            // link.scrollIntoView({block: 'nearest'});
            } else {
                link.classList.remove(linkActiveClassName);
            }
        };
        var updateActiveLink = function updateActiveLink() {
            var links = getLinks(linkClassName);
            var anchors = getAnchors({
                minHeadingLevel: minHeadingLevel,
                maxHeadingLevel: maxHeadingLevel
            });
            var activeAnchor = getActiveAnchor(anchors, {
                anchorTopOffset: anchorTopOffsetRef.current
            });
            var activeLink = links.find(function(link) {
                return activeAnchor && activeAnchor.id === getLinkAnchorValue(link);
            });
            links.forEach(function(link) {
                updateLinkActiveClass(link, link === activeLink);
            });
        };
        if (!config) {
            // No-op, highlighting is disabled
            return function() {};
        }
        var linkClassName = config.linkClassName, linkActiveClassName = config.linkActiveClassName, minHeadingLevel = config.minHeadingLevel, maxHeadingLevel = config.maxHeadingLevel;
        document.addEventListener('scroll', updateActiveLink);
        document.addEventListener('resize', updateActiveLink);
        updateActiveLink();
        return function() {
            document.removeEventListener('scroll', updateActiveLink);
            document.removeEventListener('resize', updateActiveLink);
        };
    }, [
        config,
        anchorTopOffsetRef
    ]);
} //# sourceMappingURL=useTOCHighlight.js.map


}),
39910: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Collapsible: () => (/* reexport safe */ _components_Collapsible__WEBPACK_IMPORTED_MODULE_5__.z),
  DraftBannerMessage: () => (/* reexport safe */ _translations_contentVisibilityTranslations__WEBPACK_IMPORTED_MODULE_22__.xo),
  DraftBannerTitle: () => (/* reexport safe */ _translations_contentVisibilityTranslations__WEBPACK_IMPORTED_MODULE_22__.ht),
  ErrorBoundaryError: () => (/* reexport safe */ _utils_errorBoundaryUtils__WEBPACK_IMPORTED_MODULE_23__.aG),
  ErrorBoundaryErrorMessageFallback: () => (/* reexport safe */ _utils_errorBoundaryUtils__WEBPACK_IMPORTED_MODULE_23__.Ac),
  ErrorBoundaryTryAgainButton: () => (/* reexport safe */ _utils_errorBoundaryUtils__WEBPACK_IMPORTED_MODULE_23__.Cw),
  ErrorCauseBoundary: () => (/* reexport safe */ _utils_errorBoundaryUtils__WEBPACK_IMPORTED_MODULE_23__.QW),
  HtmlClassNameProvider: () => (/* reexport safe */ _utils_metadataUtils__WEBPACK_IMPORTED_MODULE_9__.FG),
  NavbarSecondaryMenuFiller: () => (/* reexport safe */ _contexts_navbarSecondaryMenu_content__WEBPACK_IMPORTED_MODULE_11__.Zo),
  PageMetadata: () => (/* reexport safe */ _utils_metadataUtils__WEBPACK_IMPORTED_MODULE_9__.d),
  ReactContextError: () => (/* reexport safe */ _utils_reactUtils__WEBPACK_IMPORTED_MODULE_8__.i6),
  SkipToContentFallbackId: () => (/* reexport safe */ _utils_skipToContentUtils__WEBPACK_IMPORTED_MODULE_21__.u),
  SkipToContentLink: () => (/* reexport safe */ _utils_skipToContentUtils__WEBPACK_IMPORTED_MODULE_21__.l),
  ThemeClassNames: () => (/* reexport safe */ _utils_ThemeClassNames__WEBPACK_IMPORTED_MODULE_6__.k),
  ThemedComponent: () => (/* reexport safe */ _components_ThemedComponent__WEBPACK_IMPORTED_MODULE_2__.Z),
  UnlistedBannerMessage: () => (/* reexport safe */ _translations_contentVisibilityTranslations__WEBPACK_IMPORTED_MODULE_22__.eU),
  UnlistedBannerTitle: () => (/* reexport safe */ _translations_contentVisibilityTranslations__WEBPACK_IMPORTED_MODULE_22__.cI),
  UnlistedMetadata: () => (/* reexport safe */ _translations_contentVisibilityTranslations__WEBPACK_IMPORTED_MODULE_22__.T$),
  composeProviders: () => (/* reexport safe */ _utils_reactUtils__WEBPACK_IMPORTED_MODULE_8__.Qc),
  createStorageSlot: () => (/* reexport safe */ _utils_storageUtils__WEBPACK_IMPORTED_MODULE_3__.WA),
  duplicates: () => (/* reexport safe */ _utils_jsUtils__WEBPACK_IMPORTED_MODULE_17__.lx),
  filterDocCardListItems: () => (filterDocCardListItems),
  groupBy: () => (/* reexport safe */ _utils_jsUtils__WEBPACK_IMPORTED_MODULE_17__.vM),
  isMultiColumnFooterLinks: () => (/* reexport safe */ _utils_footerUtils__WEBPACK_IMPORTED_MODULE_15__.a),
  isRegexpStringMatch: () => (/* reexport safe */ _utils_regexpUtils__WEBPACK_IMPORTED_MODULE_16__.F),
  listStorageKeys: () => (/* reexport safe */ _utils_storageUtils__WEBPACK_IMPORTED_MODULE_3__._f),
  listTagsByLetters: () => (/* reexport safe */ _utils_tagsUtils__WEBPACK_IMPORTED_MODULE_13__.P),
  prefersReducedMotion: () => (/* reexport safe */ _utils_accessibilityUtils__WEBPACK_IMPORTED_MODULE_7__.n),
  processAdmonitionProps: () => (/* reexport safe */ _utils_admonitionUtils__WEBPACK_IMPORTED_MODULE_19__.X),
  translateTagsPageTitle: () => (/* reexport safe */ _utils_tagsUtils__WEBPACK_IMPORTED_MODULE_13__.M),
  uniq: () => (/* reexport safe */ _utils_jsUtils__WEBPACK_IMPORTED_MODULE_17__.jj),
  useClearQueryString: () => (/* reexport safe */ _utils_historyUtils__WEBPACK_IMPORTED_MODULE_20__.eH),
  useCollapsible: () => (/* reexport safe */ _components_Collapsible__WEBPACK_IMPORTED_MODULE_5__.u),
  useColorMode: () => (/* reexport safe */ _contexts_colorMode__WEBPACK_IMPORTED_MODULE_10__.I),
  useContextualSearchFilters: () => (useContextualSearchFilters),
  useCurrentSidebarCategory: () => (useCurrentSidebarCategory),
  useDocsPreferredVersion: () => (useDocsPreferredVersion),
  useEvent: () => (/* reexport safe */ _utils_reactUtils__WEBPACK_IMPORTED_MODULE_8__.zX),
  useHistorySelector: () => (/* reexport safe */ _utils_historyUtils__WEBPACK_IMPORTED_MODULE_20__.xL),
  usePluralForm: () => (/* reexport safe */ _utils_usePluralForm__WEBPACK_IMPORTED_MODULE_4__.c),
  usePrevious: () => (/* reexport safe */ _utils_reactUtils__WEBPACK_IMPORTED_MODULE_8__.D9),
  usePrismTheme: () => (/* reexport safe */ _hooks_usePrismTheme__WEBPACK_IMPORTED_MODULE_18__.p),
  useQueryString: () => (/* reexport safe */ _utils_historyUtils__WEBPACK_IMPORTED_MODULE_20__.Nc),
  useQueryStringList: () => (/* reexport safe */ _utils_historyUtils__WEBPACK_IMPORTED_MODULE_20__.H),
  useSearchLinkCreator: () => (/* reexport safe */ _hooks_useSearchPage__WEBPACK_IMPORTED_MODULE_14__.M),
  useSearchQueryString: () => (/* reexport safe */ _hooks_useSearchPage__WEBPACK_IMPORTED_MODULE_14__.K),
  useStorageSlot: () => (/* reexport safe */ _utils_storageUtils__WEBPACK_IMPORTED_MODULE_3__.Nk),
  useThemeConfig: () => (/* reexport safe */ _utils_useThemeConfig__WEBPACK_IMPORTED_MODULE_1__.L),
  useWindowSize: () => (/* reexport safe */ _hooks_useWindowSize__WEBPACK_IMPORTED_MODULE_12__.i)
});
/* ESM import */var _docusaurus_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48131);
/* ESM import */var _utils_searchUtils__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(16674);
/* ESM import */var _utils_useThemeConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(544);
/* ESM import */var _components_ThemedComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52385);
/* ESM import */var _utils_storageUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(90280);
/* ESM import */var _utils_usePluralForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(82440);
/* ESM import */var _components_Collapsible__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(49107);
/* ESM import */var _utils_ThemeClassNames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18475);
/* ESM import */var _utils_accessibilityUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54900);
/* ESM import */var _utils_reactUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11845);
/* ESM import */var _utils_metadataUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(71063);
/* ESM import */var _contexts_colorMode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(26308);
/* ESM import */var _contexts_navbarSecondaryMenu_content__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(52550);
/* ESM import */var _hooks_useWindowSize__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(57004);
/* ESM import */var _utils_tagsUtils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(58940);
/* ESM import */var _hooks_useSearchPage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(57145);
/* ESM import */var _utils_footerUtils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(42972);
/* ESM import */var _utils_regexpUtils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(48091);
/* ESM import */var _utils_jsUtils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(19696);
/* ESM import */var _hooks_usePrismTheme__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(30488);
/* ESM import */var _utils_admonitionUtils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(994);
/* ESM import */var _utils_historyUtils__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(28558);
/* ESM import */var _utils_skipToContentUtils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(79160);
/* ESM import */var _translations_contentVisibilityTranslations__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(41587);
/* ESM import */var _utils_errorBoundaryUtils__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(16228);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}


// TODO Docusaurus v4: remove these workarounds as a breaking change
//  and remove docs plugin peerDeps in theme-common/package.json
//  This is public API surface that we need to keep for v3
//  See https://github.com/facebook/docusaurus/pull/10316
function useCurrentSidebarCategory() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    var _require;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return (_require = __webpack_require__(31862)).useCurrentSidebarCategory.apply(_require, _to_consumable_array(args));
}
function filterDocCardListItems() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    var _require;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return (_require = __webpack_require__(31862)).filterDocCardListItems.apply(_require, _to_consumable_array(args));
}
function useDocsPreferredVersion() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    var _require;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return (_require = __webpack_require__(31862)).useDocsPreferredVersion.apply(_require, _to_consumable_array(args));
}
function useContextualSearchFilters() {
    var i18n = (0,_docusaurus_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_0__["default"])().i18n;
    var docsTags = // eslint-disable-next-line @typescript-eslint/no-var-requires, react-compiler/react-compiler
    (__webpack_require__(31862)/* .useDocsContextualSearchTags */.useDocsContextualSearchTags)();
    var tags = [
        _utils_searchUtils__WEBPACK_IMPORTED_MODULE_24__/* .DEFAULT_SEARCH_TAG */.H
    ].concat(_to_consumable_array(docsTags));
    return {
        locale: i18n.currentLocale,
        tags: tags
    };
}
/*
 * APIs to document
 */ 











/*
 * APIs kept undocumented, on purpose
 * Note: we still guarantee retro-compatibility on those
 */ 









 //# sourceMappingURL=index.js.map


}),
13119: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AnnouncementBarProvider: () => (/* reexport safe */ _contexts_announcementBar__WEBPACK_IMPORTED_MODULE_1__.p),
  BlogAuthorNoPostsLabel: () => (/* reexport safe */ _translations_blogTranslations__WEBPACK_IMPORTED_MODULE_25__.J$),
  BlogAuthorsListViewAllLabel: () => (/* reexport safe */ _translations_blogTranslations__WEBPACK_IMPORTED_MODULE_25__.fw),
  CodeBlockContextProvider: () => (/* reexport safe */ _utils_codeBlockUtils__WEBPACK_IMPORTED_MODULE_7__.EF),
  Collapsible: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.Collapsible),
  ColorModeProvider: () => (/* reexport safe */ _contexts_colorMode__WEBPACK_IMPORTED_MODULE_5__.S),
  DEFAULT_SEARCH_TAG: () => (/* reexport safe */ _utils_searchUtils__WEBPACK_IMPORTED_MODULE_8__.H),
  DraftBannerMessage: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.DraftBannerMessage),
  DraftBannerTitle: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.DraftBannerTitle),
  ErrorBoundaryError: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.ErrorBoundaryError),
  ErrorBoundaryErrorMessageFallback: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.ErrorBoundaryErrorMessageFallback),
  ErrorBoundaryTryAgainButton: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.ErrorBoundaryTryAgainButton),
  ErrorCauseBoundary: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.ErrorCauseBoundary),
  HtmlClassNameProvider: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.HtmlClassNameProvider),
  NavbarProvider: () => (/* reexport safe */ _utils_navbarUtils__WEBPACK_IMPORTED_MODULE_17__.V),
  NavbarSecondaryMenuFiller: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.NavbarSecondaryMenuFiller),
  PageMetadata: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.PageMetadata),
  PluginHtmlClassNameProvider: () => (/* reexport safe */ _utils_metadataUtils__WEBPACK_IMPORTED_MODULE_16__.VC),
  ReactContextError: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.ReactContextError),
  ScrollControllerProvider: () => (/* reexport safe */ _utils_scrollUtils__WEBPACK_IMPORTED_MODULE_14__.OC),
  SkipToContentFallbackId: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.SkipToContentFallbackId),
  SkipToContentLink: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.SkipToContentLink),
  ThemeClassNames: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.ThemeClassNames),
  ThemedComponent: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.ThemedComponent),
  TitleFormatterProvider: () => (/* reexport safe */ _utils_titleFormatterUtils__WEBPACK_IMPORTED_MODULE_9__.D),
  UnlistedBannerMessage: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.UnlistedBannerMessage),
  UnlistedBannerTitle: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.UnlistedBannerTitle),
  UnlistedMetadata: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.UnlistedMetadata),
  composeProviders: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.composeProviders),
  containsLineNumbers: () => (/* reexport safe */ _utils_codeBlockUtils__WEBPACK_IMPORTED_MODULE_7__.nt),
  createCodeBlockMetadata: () => (/* reexport safe */ _utils_codeBlockUtils__WEBPACK_IMPORTED_MODULE_7__.MA),
  createStorageSlot: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.createStorageSlot),
  duplicates: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.duplicates),
  filterDocCardListItems: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.filterDocCardListItems),
  getLineNumbersStart: () => (/* reexport safe */ _utils_codeBlockUtils__WEBPACK_IMPORTED_MODULE_7__._D),
  getPrismCssVariables: () => (/* reexport safe */ _utils_codeBlockUtils__WEBPACK_IMPORTED_MODULE_7__.QC),
  groupBy: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.groupBy),
  isMultiColumnFooterLinks: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.isMultiColumnFooterLinks),
  isRegexpStringMatch: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.isRegexpStringMatch),
  isSamePath: () => (/* reexport safe */ _utils_routesUtils__WEBPACK_IMPORTED_MODULE_15__.Mg),
  keyboardFocusedClassName: () => (/* reexport safe */ _hooks_useKeyboardNavigation__WEBPACK_IMPORTED_MODULE_21__.h),
  listStorageKeys: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.listStorageKeys),
  listTagsByLetters: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.listTagsByLetters),
  parseCodeBlockTitle: () => (/* reexport safe */ _utils_codeBlockUtils__WEBPACK_IMPORTED_MODULE_7__.bc),
  parseLanguage: () => (/* reexport safe */ _utils_codeBlockUtils__WEBPACK_IMPORTED_MODULE_7__.Fz),
  parseLines: () => (/* reexport safe */ _utils_codeBlockUtils__WEBPACK_IMPORTED_MODULE_7__.nZ),
  prefersReducedMotion: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.prefersReducedMotion),
  processAdmonitionProps: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.processAdmonitionProps),
  sanitizeTabsChildren: () => (/* reexport safe */ _utils_tabsUtils__WEBPACK_IMPORTED_MODULE_2__.h),
  splitNavbarItems: () => (/* reexport safe */ _utils_navbarUtils__WEBPACK_IMPORTED_MODULE_17__.A),
  translateBlogAuthorsListPageTitle: () => (/* reexport safe */ _translations_blogTranslations__WEBPACK_IMPORTED_MODULE_25__.HV),
  translateTagsPageTitle: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.translateTagsPageTitle),
  uniq: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.uniq),
  useAlternatePageUtils: () => (/* reexport safe */ _utils_useAlternatePageUtils__WEBPACK_IMPORTED_MODULE_6__.l),
  useAnnouncementBar: () => (/* reexport safe */ _contexts_announcementBar__WEBPACK_IMPORTED_MODULE_1__.n),
  useBackToTopButton: () => (/* reexport safe */ _hooks_useBackToTopButton__WEBPACK_IMPORTED_MODULE_24__.a),
  useBlogAuthorPageTitle: () => (/* reexport safe */ _translations_blogTranslations__WEBPACK_IMPORTED_MODULE_25__.ds),
  useBlogTagsPostsPageTitle: () => (/* reexport safe */ _translations_blogTranslations__WEBPACK_IMPORTED_MODULE_25__.Wi),
  useClearQueryString: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useClearQueryString),
  useCodeBlockContext: () => (/* reexport safe */ _utils_codeBlockUtils__WEBPACK_IMPORTED_MODULE_7__.LS),
  useCodeWordWrap: () => (/* reexport safe */ _hooks_useCodeWordWrap__WEBPACK_IMPORTED_MODULE_23__.F),
  useCollapsible: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useCollapsible),
  useColorMode: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useColorMode),
  useContextualSearchFilters: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useContextualSearchFilters),
  useCurrentSidebarCategory: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useCurrentSidebarCategory),
  useDateTimeFormat: () => (/* reexport safe */ _utils_IntlUtils__WEBPACK_IMPORTED_MODULE_19__.P),
  useDocsPreferredVersion: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useDocsPreferredVersion),
  useEvent: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useEvent),
  useFilteredAndTreeifiedTOC: () => (/* reexport safe */ _utils_tocUtils__WEBPACK_IMPORTED_MODULE_13__.b),
  useHideableNavbar: () => (/* reexport safe */ _hooks_useHideableNavbar__WEBPACK_IMPORTED_MODULE_20__.c),
  useHistoryPopHandler: () => (/* reexport safe */ _utils_historyUtils__WEBPACK_IMPORTED_MODULE_12__.Rb),
  useHistorySelector: () => (/* reexport safe */ _utils_historyUtils__WEBPACK_IMPORTED_MODULE_12__.xL),
  useHomePageRoute: () => (/* reexport safe */ _utils_routesUtils__WEBPACK_IMPORTED_MODULE_15__.Ns),
  useKeyboardNavigation: () => (/* reexport safe */ _hooks_useKeyboardNavigation__WEBPACK_IMPORTED_MODULE_21__.t),
  useLocalPathname: () => (/* reexport safe */ _utils_useLocalPathname__WEBPACK_IMPORTED_MODULE_11__.b),
  useLocationChange: () => (/* reexport safe */ _utils_useLocationChange__WEBPACK_IMPORTED_MODULE_10__.S),
  useLockBodyScroll: () => (/* reexport safe */ _hooks_useLockBodyScroll__WEBPACK_IMPORTED_MODULE_22__.N),
  useNavbarMobileSidebar: () => (/* reexport safe */ _contexts_navbarMobileSidebar__WEBPACK_IMPORTED_MODULE_3__.e),
  useNavbarSecondaryMenu: () => (/* reexport safe */ _contexts_navbarSecondaryMenu_display__WEBPACK_IMPORTED_MODULE_4__.Y),
  usePluralForm: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.usePluralForm),
  usePrevious: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.usePrevious),
  usePrismTheme: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.usePrismTheme),
  useQueryString: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useQueryString),
  useQueryStringList: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useQueryStringList),
  useQueryStringValue: () => (/* reexport safe */ _utils_historyUtils__WEBPACK_IMPORTED_MODULE_12__._X),
  useScrollController: () => (/* reexport safe */ _utils_scrollUtils__WEBPACK_IMPORTED_MODULE_14__.sG),
  useScrollPosition: () => (/* reexport safe */ _utils_scrollUtils__WEBPACK_IMPORTED_MODULE_14__.RF),
  useScrollPositionBlocker: () => (/* reexport safe */ _utils_scrollUtils__WEBPACK_IMPORTED_MODULE_14__.o5),
  useSearchLinkCreator: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useSearchLinkCreator),
  useSearchQueryString: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useSearchQueryString),
  useSmoothScrollTo: () => (/* reexport safe */ _utils_scrollUtils__WEBPACK_IMPORTED_MODULE_14__.Ct),
  useStorageSlot: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useStorageSlot),
  useTOCHighlight: () => (/* reexport safe */ _hooks_useTOCHighlight__WEBPACK_IMPORTED_MODULE_18__.S),
  useTabs: () => (/* reexport safe */ _utils_tabsUtils__WEBPACK_IMPORTED_MODULE_2__.Y),
  useThemeConfig: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useThemeConfig),
  useTitleFormatter: () => (/* reexport safe */ _utils_titleFormatterUtils__WEBPACK_IMPORTED_MODULE_9__.pe),
  useTreeifiedTOC: () => (/* reexport safe */ _utils_tocUtils__WEBPACK_IMPORTED_MODULE_13__.a),
  useWindowSize: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.useWindowSize)
});
/* ESM import */var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39910);
/* ESM import */var _contexts_announcementBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22215);
/* ESM import */var _utils_tabsUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27009);
/* ESM import */var _contexts_navbarMobileSidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(51919);
/* ESM import */var _contexts_navbarSecondaryMenu_display__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(97599);
/* ESM import */var _contexts_colorMode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26308);
/* ESM import */var _utils_useAlternatePageUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(81172);
/* ESM import */var _utils_codeBlockUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16738);
/* ESM import */var _utils_searchUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(16674);
/* ESM import */var _utils_titleFormatterUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(51216);
/* ESM import */var _utils_useLocationChange__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6786);
/* ESM import */var _utils_useLocalPathname__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(38309);
/* ESM import */var _utils_historyUtils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(28558);
/* ESM import */var _utils_tocUtils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(38812);
/* ESM import */var _utils_scrollUtils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(63666);
/* ESM import */var _utils_routesUtils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(11237);
/* ESM import */var _utils_metadataUtils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(71063);
/* ESM import */var _utils_navbarUtils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(74979);
/* ESM import */var _hooks_useTOCHighlight__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(90819);
/* ESM import */var _utils_IntlUtils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(6494);
/* ESM import */var _hooks_useHideableNavbar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(41886);
/* ESM import */var _hooks_useKeyboardNavigation__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(54692);
/* ESM import */var _hooks_useLockBodyScroll__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(59463);
/* ESM import */var _hooks_useCodeWordWrap__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(54090);
/* ESM import */var _hooks_useBackToTopButton__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(77037);
/* ESM import */var _translations_blogTranslations__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(84310);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ // This re-export permits to handle some level of retro-compatibility. Users
// might swizzle unsafe components and expose these internal imports. When we
// move an API from internal to public, former internal imports should keep
// working, so that the change doesn't become breaking.
//
// Important: this line is removed from build output with the
// "removeThemeInternalReexport" script for CI checks. This ensures that none of
// our internal code relies on this re-export and that we don't forget to
// migrate theme internal imports to public imports.
//
// eslint-disable-next-line no-restricted-syntax

























 //# sourceMappingURL=internal.js.map


}),
84310: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  HV: () => (translateBlogAuthorsListPageTitle),
  J$: () => (BlogAuthorNoPostsLabel),
  Wi: () => (useBlogTagsPostsPageTitle),
  ds: () => (useBlogAuthorPageTitle),
  fw: () => (BlogAuthorsListViewAllLabel)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92372);
/* ESM import */var _utils_usePluralForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(82440);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 



// Only used locally
function useBlogPostsPlural() {
    var selectMessage = (0,_utils_usePluralForm__WEBPACK_IMPORTED_MODULE_3__/* .usePluralForm */.c)().selectMessage;
    return function(count) {
        return selectMessage(count, (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__.translate)({
            id: 'theme.blog.post.plurals',
            description: 'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
            message: 'One post|{count} posts'
        }, {
            count: count
        }));
    };
}
function useBlogTagsPostsPageTitle(tag) {
    var blogPostsPlural = useBlogPostsPlural();
    return (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__.translate)({
        id: 'theme.blog.tagTitle',
        description: 'The title of the page for a blog tag',
        message: '{nPosts} tagged with "{tagName}"'
    }, {
        nPosts: blogPostsPlural(tag.count),
        tagName: tag.label
    });
}
function useBlogAuthorPageTitle(author) {
    var blogPostsPlural = useBlogPostsPlural();
    return (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__.translate)({
        id: 'theme.blog.author.pageTitle',
        description: 'The title of the page for a blog author',
        message: '{authorName} - {nPosts}'
    }, {
        nPosts: blogPostsPlural(author.count),
        authorName: author.name || author.key
    });
}
var translateBlogAuthorsListPageTitle = function() {
    return (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__.translate)({
        id: 'theme.blog.authorsList.pageTitle',
        message: 'Authors',
        description: 'The title of the authors page'
    });
};
function BlogAuthorsListViewAllLabel() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "theme.blog.authorsList.viewAll",
        description: "The label of the link targeting the blog authors page",
        children: "View all authors"
    });
}
function BlogAuthorNoPostsLabel() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "theme.blog.author.noPosts",
        description: "The text for authors with 0 blog post",
        children: "This author has not written any posts yet."
    });
} //# sourceMappingURL=blogTranslations.js.map


}),
41587: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  T$: () => (UnlistedMetadata),
  cI: () => (UnlistedBannerTitle),
  eU: () => (UnlistedBannerMessage),
  ht: () => (DraftBannerTitle),
  xo: () => (DraftBannerMessage)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92372);
/* ESM import */var _docusaurus_Head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31118);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 



function UnlistedBannerTitle() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "theme.contentVisibility.unlistedBanner.title",
        description: "The unlisted content banner title",
        children: "Unlisted page"
    });
}
function UnlistedBannerMessage() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "theme.contentVisibility.unlistedBanner.message",
        description: "The unlisted content banner message",
        children: "This page is unlisted. Search engines will not index it, and only users having a direct link can access it."
    });
}
// TODO Docusaurus v4 breaking change (since it's v3 public theme-common API :/)
//  Move this to theme/ContentVisibility/Unlisted
function UnlistedMetadata() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Head__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
            name: "robots",
            content: "noindex, nofollow"
        })
    });
}
function DraftBannerTitle() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "theme.contentVisibility.draftBanner.title",
        description: "The draft content banner title",
        children: "Draft page"
    });
}
function DraftBannerMessage() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "theme.contentVisibility.draftBanner.message",
        description: "The draft content banner message",
        children: "This page is a draft. It will only be visible in dev and be excluded from the production build."
    });
} //# sourceMappingURL=contentVisibilityTranslations.js.map


}),
6494: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  P: () => (useDateTimeFormat)
});
/* ESM import */var _docusaurus_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48131);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}

function useCalendar() {
    var _useDocusaurusContext = (0,_docusaurus_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_0__["default"])(), _useDocusaurusContext_i18n = _useDocusaurusContext.i18n, currentLocale = _useDocusaurusContext_i18n.currentLocale, localeConfigs = _useDocusaurusContext_i18n.localeConfigs;
    return localeConfigs[currentLocale].calendar;
}
function useDateTimeFormat() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var _useDocusaurusContext = (0,_docusaurus_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_0__["default"])(), currentLocale = _useDocusaurusContext.i18n.currentLocale;
    var calendar = useCalendar();
    return new Intl.DateTimeFormat(currentLocale, _object_spread({
        calendar: calendar
    }, options));
} //# sourceMappingURL=IntlUtils.js.map


}),
994: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  X: () => (processAdmonitionProps)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}


// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children) {
    var items = react__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(children);
    var mdxAdmonitionTitleWrapper = items.find(function(item) {
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.isValidElement(item) && item.type === 'mdxAdmonitionTitle';
    });
    var rest = items.filter(function(item) {
        return item !== mdxAdmonitionTitleWrapper;
    });
    var mdxAdmonitionTitle = mdxAdmonitionTitleWrapper === null || mdxAdmonitionTitleWrapper === void 0 ? void 0 : mdxAdmonitionTitleWrapper.props.children;
    return {
        mdxAdmonitionTitle: mdxAdmonitionTitle,
        rest: rest.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: rest
        }) : null
    };
}
function processAdmonitionProps(props) {
    var _extractMDXAdmonitionTitle = extractMDXAdmonitionTitle(props.children), mdxAdmonitionTitle = _extractMDXAdmonitionTitle.mdxAdmonitionTitle, rest = _extractMDXAdmonitionTitle.rest;
    var _props_title;
    var title = (_props_title = props.title) !== null && _props_title !== void 0 ? _props_title : mdxAdmonitionTitle;
    return _object_spread_props(_object_spread({}, props, title && {
        title: title
    }), {
        children: rest
    });
} //# sourceMappingURL=admonitionUtils.js.map


}),
16738: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  EF: () => (CodeBlockContextProvider),
  Fz: () => (parseClassNameLanguage),
  LS: () => (useCodeBlockContext),
  MA: () => (createCodeBlockMetadata),
  QC: () => (getPrismCssVariables),
  _D: () => (getLineNumbersStart),
  bc: () => (parseCodeBlockTitle),
  nZ: () => (parseLines),
  nt: () => (containsLineNumbers)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54461);
/* ESM import */var parse_numeric_range__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77226);
/* ESM import */var parse_numeric_range__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(parse_numeric_range__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _reactUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11845);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}





var codeBlockTitleRegex = RegExp("title=(?<quote>[\"'])(?<title>.*?)\\1");
var metastringLinesRangeRegex = RegExp("\\{(?<range>[\\d,-]+)\\}");
// Supported types of highlight comments
var popularCommentPatterns = {
    js: {
        start: '\\/\\/',
        end: ''
    },
    jsBlock: {
        start: '\\/\\*',
        end: '\\*\\/'
    },
    jsx: {
        start: '\\{\\s*\\/\\*',
        end: '\\*\\/\\s*\\}'
    },
    bash: {
        start: '#',
        end: ''
    },
    html: {
        start: '<!--',
        end: '-->'
    }
};
var commentPatterns = _object_spread_props(_object_spread({}, popularCommentPatterns), {
    // minor comment styles
    lua: {
        start: '--',
        end: ''
    },
    wasm: {
        start: '\\;\\;',
        end: ''
    },
    tex: {
        start: '%',
        end: ''
    },
    vb: {
        start: "['\u2018\u2019]",
        end: ''
    },
    vbnet: {
        start: "(?:_\\s*)?['\u2018\u2019]",
        end: ''
    },
    rem: {
        start: '[Rr][Ee][Mm]\\b',
        end: ''
    },
    f90: {
        start: '!',
        end: ''
    },
    ml: {
        start: '\\(\\*',
        end: '\\*\\)'
    },
    cobol: {
        start: '\\*>',
        end: ''
    }
});
var popularCommentTypes = Object.keys(popularCommentPatterns);
function getCommentPattern(languages, magicCommentDirectives) {
    // To be more reliable, the opening and closing comment must match
    var commentPattern = languages.map(function(lang) {
        var _commentPatterns_lang = commentPatterns[lang], start = _commentPatterns_lang.start, end = _commentPatterns_lang.end;
        return "(?:".concat(start, "\\s*(").concat(magicCommentDirectives.flatMap(function(d) {
            var _d_block, _d_block1;
            return [
                d.line,
                (_d_block = d.block) === null || _d_block === void 0 ? void 0 : _d_block.start,
                (_d_block1 = d.block) === null || _d_block1 === void 0 ? void 0 : _d_block1.end
            ].filter(Boolean);
        }).join('|'), ")\\s*").concat(end, ")");
    }).join('|');
    // White space is allowed, but otherwise it should be on it's own line
    return new RegExp("^\\s*(?:".concat(commentPattern, ")\\s*$"));
}
/**
 * Select comment styles based on language
 */ function getAllMagicCommentDirectiveStyles(lang, magicCommentDirectives) {
    switch(lang){
        case 'js':
        case 'javascript':
        case 'ts':
        case 'typescript':
            return getCommentPattern([
                'js',
                'jsBlock'
            ], magicCommentDirectives);
        case 'jsx':
        case 'tsx':
            return getCommentPattern([
                'js',
                'jsBlock',
                'jsx'
            ], magicCommentDirectives);
        case 'html':
            return getCommentPattern([
                'js',
                'jsBlock',
                'html'
            ], magicCommentDirectives);
        case 'python':
        case 'py':
        case 'bash':
            return getCommentPattern([
                'bash'
            ], magicCommentDirectives);
        case 'markdown':
        case 'md':
            // Text uses HTML, front matter uses bash
            return getCommentPattern([
                'html',
                'jsx',
                'bash'
            ], magicCommentDirectives);
        case 'tex':
        case 'latex':
        case 'matlab':
            return getCommentPattern([
                'tex'
            ], magicCommentDirectives);
        case 'lua':
        case 'haskell':
            return getCommentPattern([
                'lua'
            ], magicCommentDirectives);
        case 'sql':
            return getCommentPattern([
                'lua',
                'jsBlock'
            ], magicCommentDirectives);
        case 'wasm':
            return getCommentPattern([
                'wasm'
            ], magicCommentDirectives);
        case 'vb':
        case 'vba':
        case 'visual-basic':
            return getCommentPattern([
                'vb',
                'rem'
            ], magicCommentDirectives);
        case 'vbnet':
            return getCommentPattern([
                'vbnet',
                'rem'
            ], magicCommentDirectives);
        case 'batch':
            return getCommentPattern([
                'rem'
            ], magicCommentDirectives);
        case 'basic':
            return getCommentPattern([
                'rem',
                'f90'
            ], magicCommentDirectives);
        case 'fsharp':
            return getCommentPattern([
                'js',
                'ml'
            ], magicCommentDirectives);
        case 'ocaml':
        case 'sml':
            return getCommentPattern([
                'ml'
            ], magicCommentDirectives);
        case 'fortran':
            return getCommentPattern([
                'f90'
            ], magicCommentDirectives);
        case 'cobol':
            return getCommentPattern([
                'cobol'
            ], magicCommentDirectives);
        default:
            // All popular comment types
            return getCommentPattern(popularCommentTypes, magicCommentDirectives);
    }
}
function parseCodeBlockTitle(metastring) {
    var _metastring_match;
    var _metastring_match_groups_title;
    return (_metastring_match_groups_title = metastring === null || metastring === void 0 ? void 0 : (_metastring_match = metastring.match(codeBlockTitleRegex)) === null || _metastring_match === void 0 ? void 0 : _metastring_match.groups.title) !== null && _metastring_match_groups_title !== void 0 ? _metastring_match_groups_title : '';
}
function getMetaLineNumbersStart(metastring) {
    var showLineNumbersMeta = metastring === null || metastring === void 0 ? void 0 : metastring.split(' ').find(function(str) {
        return str.startsWith('showLineNumbers');
    });
    if (showLineNumbersMeta) {
        if (showLineNumbersMeta.startsWith('showLineNumbers=')) {
            var value = showLineNumbersMeta.replace('showLineNumbers=', '');
            return parseInt(value, 10);
        }
        return 1;
    }
    return undefined;
}
function getLineNumbersStart(param) {
    var showLineNumbers = param.showLineNumbers, metastring = param.metastring;
    var defaultStart = 1;
    if (typeof showLineNumbers === 'boolean') {
        return showLineNumbers ? defaultStart : undefined;
    }
    if (typeof showLineNumbers === 'number') {
        return showLineNumbers;
    }
    return getMetaLineNumbersStart(metastring);
}
// TODO Docusaurus v4: remove, only kept for internal retro-compatibility
//  See https://github.com/facebook/docusaurus/pull/11153
function containsLineNumbers(metastring) {
    return Boolean(metastring === null || metastring === void 0 ? void 0 : metastring.includes('showLineNumbers'));
}
function parseCodeLinesFromMetastring(code, param) {
    var metastring = param.metastring, magicComments = param.magicComments;
    // Highlighted lines specified in props: don't parse the content
    if (metastring && metastringLinesRangeRegex.test(metastring)) {
        var linesRange = metastring.match(metastringLinesRangeRegex).groups.range;
        if (magicComments.length === 0) {
            throw new Error("A highlight range has been given in code block's metastring (``` ".concat(metastring, "), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges."));
        }
        var metastringRangeClassName = magicComments[0].className;
        var lines = parse_numeric_range__WEBPACK_IMPORTED_MODULE_2___default()(linesRange).filter(function(n) {
            return n > 0;
        }).map(function(n) {
            return [
                n - 1,
                [
                    metastringRangeClassName
                ]
            ];
        });
        return {
            lineClassNames: Object.fromEntries(lines),
            code: code
        };
    }
    return null;
}
function parseCodeLinesFromContent(code, params) {
    var language = params.language, magicComments = params.magicComments;
    if (language === undefined) {
        return {
            lineClassNames: {},
            code: code
        };
    }
    var directiveRegex = getAllMagicCommentDirectiveStyles(language, magicComments);
    // Go through line by line
    var lines = code.split(/\r?\n/);
    var blocks = Object.fromEntries(magicComments.map(function(d) {
        return [
            d.className,
            {
                start: 0,
                range: ''
            }
        ];
    }));
    var lineToClassName = Object.fromEntries(magicComments.filter(function(d) {
        return d.line;
    }).map(function(param) {
        var className = param.className, line = param.line;
        return [
            line,
            className
        ];
    }));
    var blockStartToClassName = Object.fromEntries(magicComments.filter(function(d) {
        return d.block;
    }).map(function(param) {
        var className = param.className, block = param.block;
        return [
            block.start,
            className
        ];
    }));
    var blockEndToClassName = Object.fromEntries(magicComments.filter(function(d) {
        return d.block;
    }).map(function(param) {
        var className = param.className, block = param.block;
        return [
            block.end,
            className
        ];
    }));
    for(var lineNumber = 0; lineNumber < lines.length;){
        var line = lines[lineNumber];
        var match = line.match(directiveRegex);
        if (!match) {
            // Lines without directives are unchanged
            lineNumber += 1;
            continue;
        }
        var directive = match.slice(1).find(function(item) {
            return item !== undefined;
        });
        if (lineToClassName[directive]) {
            blocks[lineToClassName[directive]].range += "".concat(lineNumber, ",");
        } else if (blockStartToClassName[directive]) {
            blocks[blockStartToClassName[directive]].start = lineNumber;
        } else if (blockEndToClassName[directive]) {
            blocks[blockEndToClassName[directive]].range += "".concat(blocks[blockEndToClassName[directive]].start, "-").concat(lineNumber - 1, ",");
        }
        lines.splice(lineNumber, 1);
    }
    var lineClassNames = {};
    Object.entries(blocks).forEach(function(param) {
        var _param = _sliced_to_array(param, 2), className = _param[0], range = _param[1].range;
        parse_numeric_range__WEBPACK_IMPORTED_MODULE_2___default()(range).forEach(function(l) {
            var _lineClassNames, _l;
            var _;
            (_ = (_lineClassNames = lineClassNames)[_l = l]) !== null && _ !== void 0 ? _ : _lineClassNames[_l] = [];
            lineClassNames[l].push(className);
        });
    });
    return {
        code: lines.join('\n'),
        lineClassNames: lineClassNames
    };
}
/**
 * Parses the code content, strips away any magic comments, and returns the
 * clean content and the highlighted lines marked by the comments or metastring.
 *
 * If the metastring contains a range, the `content` will be returned as-is
 * without any parsing. The returned `lineClassNames` will be a map from that
 * number range to the first magic comment config entry (which _should_ be for
 * line highlight directives.)
 */ function parseLines(code, params) {
    // Historical behavior: we remove last line break
    var newCode = code.replace(/\r?\n$/, '');
    var _parseCodeLinesFromMetastring;
    // Historical behavior: we try one strategy after the other
    // we don't support mixing metastring ranges + magic comments
    return (_parseCodeLinesFromMetastring = parseCodeLinesFromMetastring(newCode, _object_spread({}, params))) !== null && _parseCodeLinesFromMetastring !== void 0 ? _parseCodeLinesFromMetastring : parseCodeLinesFromContent(newCode, _object_spread({}, params));
}
/**
 * Gets the language name from the class name (set by MDX).
 * e.g. `"language-javascript"` => `"javascript"`.
 * Returns undefined if there is no language class name.
 */ function parseClassNameLanguage(className) {
    if (!className) {
        return undefined;
    }
    var languageClassName = className.split(' ').find(function(str) {
        return str.startsWith('language-');
    });
    return languageClassName === null || languageClassName === void 0 ? void 0 : languageClassName.replace(/language-/, '');
}
// Prism languages are always lowercase
// We want to fail-safe and allow both "php" and "PHP"
// See https://github.com/facebook/docusaurus/issues/9012
function normalizeLanguage(language) {
    return language === null || language === void 0 ? void 0 : language.toLowerCase();
}
function getLanguage(params) {
    var _params_language, _ref, _normalizeLanguage;
    return (_normalizeLanguage = normalizeLanguage((_ref = (_params_language = params.language) !== null && _params_language !== void 0 ? _params_language : parseClassNameLanguage(params.className)) !== null && _ref !== void 0 ? _ref : params.defaultLanguage)) !== null && _normalizeLanguage !== void 0 ? _normalizeLanguage : 'text'; // There's always a language, required by Prism;
}
/**
 * This ensures that we always have the code block language as className
 * For MDX code blocks this is provided automatically by MDX
 * For JSX code blocks, the language gets added by this function
 * This ensures both cases lead to a consistent HTML output
 */ function ensureLanguageClassName(param) {
    var className = param.className, language = param.language;
    return (0,clsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z)(className, language && !(className === null || className === void 0 ? void 0 : className.includes("language-".concat(language))) && "language-".concat(language));
}
function createCodeBlockMetadata(params) {
    var language = getLanguage({
        language: params.language,
        defaultLanguage: params.defaultLanguage,
        className: params.className
    });
    var _parseLines = parseLines(params.code, {
        metastring: params.metastring,
        magicComments: params.magicComments,
        language: language
    }), lineClassNames = _parseLines.lineClassNames, code = _parseLines.code;
    var className = ensureLanguageClassName({
        className: params.className,
        language: language
    });
    var title = parseCodeBlockTitle(params.metastring) || params.title;
    var lineNumbersStart = getLineNumbersStart({
        showLineNumbers: params.showLineNumbers,
        metastring: params.metastring
    });
    return {
        codeInput: params.code,
        code: code,
        className: className,
        language: language,
        title: title,
        lineNumbersStart: lineNumbersStart,
        lineClassNames: lineClassNames
    };
}
function getPrismCssVariables(prismTheme) {
    var mapping = {
        color: '--prism-color',
        backgroundColor: '--prism-background-color'
    };
    var properties = {};
    Object.entries(prismTheme.plain).forEach(function(param) {
        var _param = _sliced_to_array(param, 2), key = _param[0], value = _param[1];
        var varName = mapping[key];
        if (varName && typeof value === 'string') {
            properties[varName] = value;
        }
    });
    return properties;
}
var CodeBlockContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
function CodeBlockContextProvider(param) {
    var metadata = param.metadata, wordWrap = param.wordWrap, children = param.children;
    // Should we optimize this in 2 contexts?
    // Unlike metadata, wordWrap is stateful and likely to trigger re-renders
    var value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function() {
        return {
            metadata: metadata,
            wordWrap: wordWrap
        };
    }, [
        metadata,
        wordWrap
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CodeBlockContext.Provider, {
        value: value,
        children: children
    });
}
function useCodeBlockContext() {
    var value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(CodeBlockContext);
    if (value === null) {
        throw new _reactUtils__WEBPACK_IMPORTED_MODULE_4__/* .ReactContextError */.i6('CodeBlockContextProvider');
    }
    return value;
} //# sourceMappingURL=codeBlockUtils.js.map


}),
27009: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Y: () => (useTabs),
  h: () => (sanitizeTabsChildren)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26936);
/* ESM import */var _docusaurus_useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45573);
/* ESM import */var _docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28558);
/* ESM import */var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19696);
/* ESM import */var _index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(90280);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}





// A very rough duck type, but good enough to guard against mistakes while
// allowing customization
function isTabItem(comp) {
    var props = comp.props;
    return !!props && (typeof props === "undefined" ? "undefined" : _type_of(props)) === 'object' && 'value' in props;
}
function sanitizeTabsChildren(children) {
    var _React_Children_toArray_filter_map;
    var _React_Children_toArray_filter_map_filter;
    return (_React_Children_toArray_filter_map_filter = (_React_Children_toArray_filter_map = react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children).filter(function(child) {
        return child !== '\n';
    }).map(function(child) {
        if (!child || /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child) && isTabItem(child)) {
            return child;
        }
        // child.type.name will give non-sensical values in prod because of
        // minification, but we assume it won't throw in prod.
        throw new Error("Docusaurus error: Bad <Tabs> child <".concat(// @ts-expect-error: guarding against unexpected cases
        typeof child.type === 'string' ? child.type : child.type.name, '>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.'));
    })) === null || _React_Children_toArray_filter_map === void 0 ? void 0 : _React_Children_toArray_filter_map.filter(Boolean)) !== null && _React_Children_toArray_filter_map_filter !== void 0 ? _React_Children_toArray_filter_map_filter : [];
}
function extractChildrenTabValues(children) {
    return sanitizeTabsChildren(children).map(function(param) {
        var _param_props = param.props, value = _param_props.value, label = _param_props.label, attributes = _param_props.attributes, isDefault = _param_props["default"];
        return {
            value: value,
            label: label,
            attributes: attributes,
            "default": isDefault
        };
    });
}
function ensureNoDuplicateValue(values) {
    var dup = (0,_index__WEBPACK_IMPORTED_MODULE_2__/* .duplicates */.lx)(values, function(a, b) {
        return a.value === b.value;
    });
    if (dup.length > 0) {
        throw new Error('Docusaurus error: Duplicate values "'.concat(dup.map(function(a) {
            return a.value;
        }).join(', '), '" found in <Tabs>. Every value needs to be unique.'));
    }
}
function useTabValues(props) {
    var valuesProp = props.values, children = props.children;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function() {
        var values = valuesProp !== null && valuesProp !== void 0 ? valuesProp : extractChildrenTabValues(children);
        ensureNoDuplicateValue(values);
        return values;
    }, [
        valuesProp,
        children
    ]);
}
function isValidValue(param) {
    var value = param.value, tabValues = param.tabValues;
    return tabValues.some(function(a) {
        return a.value === value;
    });
}
function getInitialStateValue(param) {
    var defaultValue = param.defaultValue, tabValues = param.tabValues;
    if (tabValues.length === 0) {
        throw new Error('Docusaurus error: the <Tabs> component requires at least one <TabItem> children component');
    }
    if (defaultValue) {
        // Warn user about passing incorrect defaultValue as prop.
        if (!isValidValue({
            value: defaultValue,
            tabValues: tabValues
        })) {
            throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'.concat(defaultValue, '" but none of its children has the corresponding value. Available values are: ').concat(tabValues.map(function(a) {
                return a.value;
            }).join(', '), ". If you intend to show no default tab, use defaultValue={null} instead."));
        }
        return defaultValue;
    }
    var _tabValues_find;
    var defaultTabValue = (_tabValues_find = tabValues.find(function(tabValue) {
        return tabValue["default"];
    })) !== null && _tabValues_find !== void 0 ? _tabValues_find : tabValues[0];
    if (!defaultTabValue) {
        throw new Error('Unexpected error: 0 tabValues');
    }
    return defaultTabValue.value;
}
function getStorageKey(groupId) {
    if (!groupId) {
        return null;
    }
    return "docusaurus.tab.".concat(groupId);
}
function getQueryStringKey(param) {
    var _param_queryString = param.queryString, queryString = _param_queryString === void 0 ? false : _param_queryString, groupId = param.groupId;
    if (typeof queryString === 'string') {
        return queryString;
    }
    if (queryString === false) {
        return null;
    }
    if (queryString === true && !groupId) {
        throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');
    }
    return groupId !== null && groupId !== void 0 ? groupId : null;
}
function useTabQueryString(param) {
    var _param_queryString = param.queryString, queryString = _param_queryString === void 0 ? false : _param_queryString, groupId = param.groupId;
    var history = (0,_docusaurus_router__WEBPACK_IMPORTED_MODULE_3__/* .useHistory */.k6)();
    var key = getQueryStringKey({
        queryString: queryString,
        groupId: groupId
    });
    var value = (0,_docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_4__/* .useQueryStringValue */._X)(key);
    var setValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(newValue) {
        if (!key) {
            return; // no-op
        }
        var searchParams = new URLSearchParams(history.location.search);
        searchParams.set(key, newValue);
        history.replace(_object_spread_props(_object_spread({}, history.location), {
            search: searchParams.toString()
        }));
    }, [
        key,
        history
    ]);
    return [
        value,
        setValue
    ];
}
function useTabStorage(param) {
    var groupId = param.groupId;
    var key = getStorageKey(groupId);
    var _useStorageSlot = _sliced_to_array((0,_index__WEBPACK_IMPORTED_MODULE_5__/* .useStorageSlot */.Nk)(key), 2), value = _useStorageSlot[0], storageSlot = _useStorageSlot[1];
    var setValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(newValue) {
        if (!key) {
            return; // no-op
        }
        storageSlot.set(newValue);
    }, [
        key,
        storageSlot
    ]);
    return [
        value,
        setValue
    ];
}
function useTabs(props) {
    var defaultValue = props.defaultValue, _props_queryString = props.queryString, queryString = _props_queryString === void 0 ? false : _props_queryString, groupId = props.groupId;
    var tabValues = useTabValues(props);
    var _useState = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function() {
        return getInitialStateValue({
            defaultValue: defaultValue,
            tabValues: tabValues
        });
    }), 2), selectedValue = _useState[0], setSelectedValue = _useState[1];
    var _useTabQueryString = _sliced_to_array(useTabQueryString({
        queryString: queryString,
        groupId: groupId
    }), 2), queryStringValue = _useTabQueryString[0], setQueryString = _useTabQueryString[1];
    var _useTabStorage = _sliced_to_array(useTabStorage({
        groupId: groupId
    }), 2), storageValue = _useTabStorage[0], setStorageValue = _useTabStorage[1];
    // We sync valid querystring/storage value to state on change + hydration
    var valueToSync = function() {
        var value = queryStringValue !== null && queryStringValue !== void 0 ? queryStringValue : storageValue;
        if (!isValidValue({
            value: value,
            tabValues: tabValues
        })) {
            return null;
        }
        return value;
    }();
    // Sync in a layout/sync effect is important, for useScrollPositionBlocker
    // See https://github.com/facebook/docusaurus/issues/8625
    (0,_docusaurus_useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */.Z)(function() {
        if (valueToSync) {
            setSelectedValue(valueToSync);
        }
    }, [
        valueToSync
    ]);
    var selectValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(newValue) {
        if (!isValidValue({
            value: newValue,
            tabValues: tabValues
        })) {
            throw new Error("Can't select invalid tab value=".concat(newValue));
        }
        setSelectedValue(newValue);
        setQueryString(newValue);
        setStorageValue(newValue);
    }, [
        setQueryString,
        setStorageValue,
        tabValues
    ]);
    return {
        selectedValue: selectedValue,
        selectValue: selectValue,
        tabValues: tabValues
    };
} //# sourceMappingURL=tabsUtils.js.map


}),
58940: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  M: () => (translateTagsPageTitle),
  P: () => (listTagsByLetters)
});
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(92372);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}

var translateTagsPageTitle = function() {
    return (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_0__.translate)({
        id: 'theme.tags.tagsPageTitle',
        message: 'Tags',
        description: 'The title of the tag list page'
    });
};
function getTagLetter(tag) {
    return tag[0].toUpperCase();
}
/**
 * Takes a list of tags (as provided by the content plugins), and groups them by
 * their initials.
 */ function listTagsByLetters(tags) {
    var groups = {};
    Object.values(tags).forEach(function(tag) {
        var _groups, _initial;
        var initial = getTagLetter(tag.label);
        var _;
        (_ = (_groups = groups)[_initial = initial]) !== null && _ !== void 0 ? _ : _groups[_initial] = [];
        groups[initial].push(tag);
    });
    return Object.entries(groups)// Sort letters
    .sort(function(param, param1) {
        var _param = _sliced_to_array(param, 1), letter1 = _param[0], _param1 = _sliced_to_array(param1, 1), letter2 = _param1[0];
        return letter1.localeCompare(letter2);
    }).map(function(param) {
        var _param = _sliced_to_array(param, 2), letter = _param[0], letterTags = _param[1];
        // Sort tags inside a letter
        var sortedTags = letterTags.sort(function(tag1, tag2) {
            return tag1.label.localeCompare(tag2.label);
        });
        return {
            letter: letter,
            tags: sortedTags
        };
    });
} //# sourceMappingURL=tagsUtils.js.map


}),
38812: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  a: () => (useTreeifiedTOC),
  b: () => (useFilteredAndTreeifiedTOC)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39546);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}

function treeifyTOC(flatTOC) {
    var headings = flatTOC.map(function(heading) {
        return _object_spread_props(_object_spread({}, heading), {
            parentIndex: -1,
            children: []
        });
    });
    // Keep track of which previous index would be the current heading's direct
    // parent. Each entry <i> is the last index of the `headings` array at heading
    // level <i>. We will modify these indices as we iterate through all headings.
    // e.g. if an ### H3 was last seen at index 2, then prevIndexForLevel[3] === 2
    // indices 0 and 1 will remain unused.
    var prevIndexForLevel = Array(7).fill(-1);
    headings.forEach(function(curr, currIndex) {
        var _Math;
        // Take the last seen index for each ancestor level. the highest index will
        // be the direct ancestor of the current heading.
        var ancestorLevelIndexes = prevIndexForLevel.slice(2, curr.level);
        curr.parentIndex = (_Math = Math).max.apply(_Math, _to_consumable_array(ancestorLevelIndexes));
        // Mark that curr.level was last seen at the current index.
        prevIndexForLevel[curr.level] = currIndex;
    });
    var rootNodes = [];
    // For a given parentIndex, add each Node into that parent's `children` array
    headings.forEach(function(heading) {
        var parentIndex = heading.parentIndex, rest = _object_without_properties(heading, [
            "parentIndex"
        ]);
        if (parentIndex >= 0) {
            headings[parentIndex].children.push(rest);
        } else {
            rootNodes.push(rest);
        }
    });
    return rootNodes;
}
/**
 * Takes a flat TOC list (from the MDX loader) and treeifies it into what the
 * TOC components expect. Memoized for performance.
 */ function useTreeifiedTOC(toc) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function() {
        return treeifyTOC(toc);
    }, [
        toc
    ]);
}
function filterTOC(param) {
    var toc = param.toc, minHeadingLevel = param.minHeadingLevel, maxHeadingLevel = param.maxHeadingLevel;
    function isValid(item) {
        return item.level >= minHeadingLevel && item.level <= maxHeadingLevel;
    }
    return toc.flatMap(function(item) {
        var filteredChildren = filterTOC({
            toc: item.children,
            minHeadingLevel: minHeadingLevel,
            maxHeadingLevel: maxHeadingLevel
        });
        if (isValid(item)) {
            return [
                _object_spread_props(_object_spread({}, item), {
                    children: filteredChildren
                })
            ];
        }
        return filteredChildren;
    });
}
/**
 * Takes a flat TOC list (from the MDX loader) and treeifies it into what the
 * TOC components expect, applying the `minHeadingLevel` and `maxHeadingLevel`.
 * Memoized for performance.
 *
 * **Important**: this is not the same as `useTreeifiedTOC(toc.filter(...))`,
 * because we have to filter the TOC after it has been treeified. This is mostly
 * to ensure that weird TOC structures preserve their semantics. For example, an
 * h3-h2-h4 sequence should not be treeified as an "h3 > h4" hierarchy with
 * min=3, max=4, but should rather be "[h3, h4]" (since the h2 heading has split
 * the two headings and they are not parent-children)
 */ function useFilteredAndTreeifiedTOC(param) {
    var toc = param.toc, minHeadingLevel = param.minHeadingLevel, maxHeadingLevel = param.maxHeadingLevel;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function() {
        return filterTOC({
            toc: treeifyTOC(toc),
            minHeadingLevel: minHeadingLevel,
            maxHeadingLevel: maxHeadingLevel
        });
    }, [
        toc,
        minHeadingLevel,
        maxHeadingLevel
    ]);
} //# sourceMappingURL=tocUtils.js.map


}),
82440: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  c: () => (usePluralForm)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48131);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 

// We want to ensurer a stable plural form order in all cases
// It is more convenient and natural to handle "small values" first
// See https://x.com/sebastienlorber/status/1366820663261077510
var OrderedPluralForms = [
    'zero',
    'one',
    'two',
    'few',
    'many',
    'other'
];
function sortPluralForms(pluralForms) {
    return OrderedPluralForms.filter(function(pf) {
        return pluralForms.includes(pf);
    });
}
// Hardcoded english/fallback implementation
var EnglishPluralForms = {
    locale: 'en',
    pluralForms: sortPluralForms([
        'one',
        'other'
    ]),
    select: function(count) {
        return count === 1 ? 'one' : 'other';
    }
};
function createLocalePluralForms(locale) {
    var pluralRules = new Intl.PluralRules(locale);
    return {
        locale: locale,
        pluralForms: sortPluralForms(pluralRules.resolvedOptions().pluralCategories),
        select: function(count) {
            return pluralRules.select(count);
        }
    };
}
/**
 * Poor man's `PluralSelector` implementation, using an English fallback. We
 * want a lightweight, future-proof and good-enough solution. We don't want a
 * perfect and heavy solution.
 *
 * Docusaurus classic theme has only 2 deeply nested labels requiring complex
 * plural rules. We don't want to use `Intl` + `PluralRules` polyfills + full
 * ICU syntax (react-intl) just for that.
 *
 * Notes:
 * - 2021: 92+% Browsers support `Intl.PluralRules`, and support will increase
 * in the future
 * - NodeJS >= 13 has full ICU support by default
 * - In case of "mismatch" between SSR and Browser ICU support, React keeps
 * working!
 */ function useLocalePluralForms() {
    var _useDocusaurusContext = (0,_docusaurus_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_1__["default"])(), currentLocale = _useDocusaurusContext.i18n.currentLocale;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function() {
        try {
            return createLocalePluralForms(currentLocale);
        } catch (err) {
            console.error('Failed to use Intl.PluralRules for locale "'.concat(currentLocale, '".\nDocusaurus will fallback to the default (English) implementation.\nError: ').concat(err.message, "\n"));
            return EnglishPluralForms;
        }
    }, [
        currentLocale
    ]);
}
function selectPluralMessage(pluralMessages, count, localePluralForms) {
    var separator = '|';
    var parts = pluralMessages.split(separator);
    if (parts.length === 1) {
        return parts[0];
    }
    if (parts.length > localePluralForms.pluralForms.length) {
        console.error("For locale=".concat(localePluralForms.locale, ", a maximum of ").concat(localePluralForms.pluralForms.length, " plural forms are expected (").concat(localePluralForms.pluralForms.join(','), "), but the message contains ").concat(parts.length, ": ").concat(pluralMessages));
    }
    var pluralForm = localePluralForms.select(count);
    var pluralFormIndex = localePluralForms.pluralForms.indexOf(pluralForm);
    // In case of not enough plural form messages, we take the last one (other)
    // instead of returning undefined
    return parts[Math.min(pluralFormIndex, parts.length - 1)];
}
/**
 * Reads the current locale and returns an interface very similar to
 * `Intl.PluralRules`.
 */ function usePluralForm() {
    var localePluralForm = useLocalePluralForms();
    return {
        selectMessage: function(count, pluralMessages) {
            return selectPluralMessage(pluralMessages, count, localePluralForm);
        }
    };
} //# sourceMappingURL=usePluralForm.js.map


}),
29591: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */ var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var react_1 = __importDefault(__webpack_require__(39546));
var file_saver_1 = __importDefault(__webpack_require__(11227));
var saveFile = function(url) {
    var fileName;
    if (url.endsWith("json") || url.endsWith("yaml") || url.endsWith("yml")) {
        fileName = url.substring(url.lastIndexOf("/") + 1);
    }
    file_saver_1["default"].saveAs(url, fileName ? fileName : "openapi.txt");
};
function Export(param) {
    var url = param.url, proxy = param.proxy;
    return react_1["default"].createElement("div", {
        style: {
            float: "right"
        },
        className: "dropdown dropdown--hoverable dropdown--right"
    }, react_1["default"].createElement("button", {
        className: "export-button button button--sm button--secondary"
    }, "Export"), react_1["default"].createElement("ul", {
        className: "export-dropdown dropdown__menu"
    }, react_1["default"].createElement("li", null, react_1["default"].createElement("a", {
        onClick: function(e) {
            e.preventDefault();
            saveFile("".concat(url));
        },
        className: "dropdown__link",
        href: "".concat(url)
    }, "OpenAPI Spec"))));
}
exports["default"] = Export;


}),
55716: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */ var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = ApiLogo;
var react_1 = __importDefault(__webpack_require__(39546));
var theme_common_1 = __webpack_require__(39910);
var useBaseUrl_1 = __importDefault(__webpack_require__(32945));
var ThemedImage_1 = __importDefault(__webpack_require__(43449));
function ApiLogo(props) {
    var colorMode = (0, theme_common_1.useColorMode)().colorMode;
    var logo = props.logo, darkLogo = props.darkLogo;
    var altText = function() {
        if (colorMode === "dark") {
            var _darkLogo_altText;
            return (_darkLogo_altText = darkLogo === null || darkLogo === void 0 ? void 0 : darkLogo.altText) !== null && _darkLogo_altText !== void 0 ? _darkLogo_altText : logo === null || logo === void 0 ? void 0 : logo.altText;
        }
        return logo === null || logo === void 0 ? void 0 : logo.altText;
    };
    var lightLogoUrl = (0, useBaseUrl_1["default"])(logo === null || logo === void 0 ? void 0 : logo.url);
    var darkLogoUrl = (0, useBaseUrl_1["default"])(darkLogo === null || darkLogo === void 0 ? void 0 : darkLogo.url);
    if (logo && darkLogo) {
        return react_1["default"].createElement(ThemedImage_1["default"], {
            alt: altText(),
            sources: {
                light: lightLogoUrl,
                dark: darkLogoUrl
            },
            className: "openapi__logo"
        });
    }
    if (logo || darkLogo) {
        return react_1["default"].createElement(ThemedImage_1["default"], {
            alt: altText(),
            sources: {
                light: lightLogoUrl !== null && lightLogoUrl !== void 0 ? lightLogoUrl : darkLogoUrl,
                dark: lightLogoUrl !== null && lightLogoUrl !== void 0 ? lightLogoUrl : darkLogoUrl
            },
            className: "openapi__logo"
        });
    }
    return undefined;
}


}),
25525: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */ var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function get() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function() {
    var ownKeys = function ownKeys1(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = SchemaTabs;
var react_1 = __importStar(__webpack_require__(39546));
var internal_1 = __webpack_require__(13119);
var useIsBrowser_1 = __importDefault(__webpack_require__(18069));
var clsx_1 = __importDefault(__webpack_require__(45924));
var flatten_1 = __importDefault(__webpack_require__(22612));
function TabList(param) {
    var className = param.className, block = param.block, selectedValue = param.selectedValue, selectValue = param.selectValue, tabValues = param.tabValues;
    var tabRefs = [];
    var blockElementScrollPositionUntilNextRender = (0, internal_1.useScrollPositionBlocker)().blockElementScrollPositionUntilNextRender;
    var handleTabChange = function(event) {
        var newTab = event.currentTarget;
        var newTabIndex = tabRefs.indexOf(newTab);
        var newTabValue = tabValues[newTabIndex].value;
        if (newTabValue !== selectedValue) {
            blockElementScrollPositionUntilNextRender(newTab);
            selectValue(newTabValue);
        }
    };
    var handleKeydown = function(event) {
        var focusElement = null;
        switch(event.key){
            case "Enter":
                {
                    handleTabChange(event);
                    break;
                }
            case "ArrowRight":
                {
                    var nextTab = tabRefs.indexOf(event.currentTarget) + 1;
                    var _tabRefs_nextTab;
                    focusElement = (_tabRefs_nextTab = tabRefs[nextTab]) !== null && _tabRefs_nextTab !== void 0 ? _tabRefs_nextTab : tabRefs[0];
                    break;
                }
            case "ArrowLeft":
                {
                    var prevTab = tabRefs.indexOf(event.currentTarget) - 1;
                    var _tabRefs_prevTab;
                    focusElement = (_tabRefs_prevTab = tabRefs[prevTab]) !== null && _tabRefs_prevTab !== void 0 ? _tabRefs_prevTab : tabRefs[tabRefs.length - 1];
                    break;
                }
            default:
                break;
        }
        focusElement === null || focusElement === void 0 ? void 0 : focusElement.focus();
    };
    var tabItemListContainerRef = (0, react_1.useRef)(null);
    var _ref = _sliced_to_array((0, react_1.useState)(false), 2), showTabArrows = _ref[0], setShowTabArrows = _ref[1];
    (0, react_1.useEffect)(function() {
        var resizeObserver = new ResizeObserver(function(entries) {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                var _loop = function() {
                    var entry = _step.value;
                    requestAnimationFrame(function() {
                        if (entry.target.clientWidth < entry.target.scrollWidth) {
                            setShowTabArrows(true);
                        } else {
                            setShowTabArrows(false);
                        }
                    });
                };
                for(var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                        _iterator["return"]();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        });
        resizeObserver.observe(tabItemListContainerRef.current);
        return function() {
            resizeObserver.disconnect();
        };
    }, []);
    var handleRightClick = function(e) {
        e.preventDefault();
        if (tabItemListContainerRef.current) {
            tabItemListContainerRef.current.scrollLeft += 90;
        }
    };
    var handleLeftClick = function(e) {
        e.preventDefault();
        if (tabItemListContainerRef.current) {
            tabItemListContainerRef.current.scrollLeft -= 90;
        }
    };
    return react_1["default"].createElement("div", {
        className: "openapi-tabs__schema-tabs-container"
    }, showTabArrows && react_1["default"].createElement("button", {
        className: "openapi-tabs__arrow left",
        onClick: handleLeftClick
    }), react_1["default"].createElement("ul", {
        ref: tabItemListContainerRef,
        role: "tablist",
        "aria-orientation": "horizontal",
        className: (0, clsx_1["default"])("openapi-tabs__schema-list-container", "tabs", {
            "tabs--block": block
        }, className)
    }, tabValues.map(function(param) {
        var value = param.value, label = param.label, attributes = param.attributes;
        return react_1["default"].createElement("li", _object_spread_props(_object_spread({
            // TODO extract TabListItem
            role: "tab",
            tabIndex: selectedValue === value ? 0 : -1,
            "aria-selected": selectedValue === value,
            key: value,
            ref: function(tabControl) {
                tabRefs.push(tabControl);
            },
            onKeyDown: handleKeydown,
            onClick: handleTabChange
        }, attributes), {
            className: (0, clsx_1["default"])("tabs__item", "openapi-tabs__schema-item", attributes === null || attributes === void 0 ? void 0 : attributes.className, {
                active: selectedValue === value
            })
        }), react_1["default"].createElement("span", {
            className: "openapi-tabs__schema-label"
        }, label !== null && label !== void 0 ? label : value));
    })), showTabArrows && react_1["default"].createElement("button", {
        className: "openapi-tabs__arrow right",
        onClick: handleRightClick
    }));
}
function TabContent(param) {
    var lazy = param.lazy, children = param.children, selectedValue = param.selectedValue;
    var childTabs = (Array.isArray(children) ? children : [
        children
    ]).filter(Boolean);
    var flattenedChildTabs = (0, flatten_1["default"])(childTabs);
    if (lazy) {
        var selectedTabItem = flattenedChildTabs.find(function(tabItem) {
            return tabItem.props.value === selectedValue;
        });
        if (!selectedTabItem) {
            // fail-safe or fail-fast? not sure what's best here
            return null;
        }
        return (0, react_1.cloneElement)(selectedTabItem, {
            className: "margin-top--md"
        });
    }
    return react_1["default"].createElement("div", {
        className: "margin-top--md"
    }, childTabs.map(function(tabItem, i) {
        return (0, react_1.cloneElement)(tabItem, {
            key: i,
            hidden: tabItem.props.value !== selectedValue
        });
    }));
}
function TabsComponent(props) {
    var tabs = (0, internal_1.useTabs)(props);
    return react_1["default"].createElement("div", {
        className: "openapi-tabs__schema-container"
    }, react_1["default"].createElement(TabList, _object_spread({}, props, tabs)), react_1["default"].createElement(TabContent, _object_spread({}, props, tabs)));
}
function SchemaTabs(props) {
    var isBrowser = (0, useIsBrowser_1["default"])();
    return react_1["default"].createElement(TabsComponent, // Remount tabs after hydration
    // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
    _object_spread({
        // Remount tabs after hydration
        // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
        key: String(isBrowser)
    }, props), (0, internal_1.sanitizeTabsChildren)(props.children));
}


}),
22840: (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (MDXProvider),
  a: () => (useMDXComponents)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39546);
/**
 * @import {MDXComponents} from 'mdx/types.js'
 * @import {Component, ReactElement, ReactNode} from 'react'
 */

/**
 * @callback MergeComponents
 *   Custom merge function.
 * @param {Readonly<MDXComponents>} currentComponents
 *   Current components from the context.
 * @returns {MDXComponents}
 *   Additional components.
 *
 * @typedef Props
 *   Configuration for `MDXProvider`.
 * @property {ReactNode | null | undefined} [children]
 *   Children (optional).
 * @property {Readonly<MDXComponents> | MergeComponents | null | undefined} [components]
 *   Additional components to use or a function that creates them (optional).
 * @property {boolean | null | undefined} [disableParentContext=false]
 *   Turn off outer component context (default: `false`).
 */



/** @type {Readonly<MDXComponents>} */
const emptyComponents = {}

const MDXContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents)

/**
 * Get current components from the MDX Context.
 *
 * @param {Readonly<MDXComponents> | MergeComponents | null | undefined} [components]
 *   Additional components to use or a function that creates them (optional).
 * @returns {MDXComponents}
 *   Current components.
 */
function useMDXComponents(components) {
  const contextComponents = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext)

  // Memoize to avoid unnecessary top-level context changes
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    function () {
      // Custom merge via a function prop
      if (typeof components === 'function') {
        return components(contextComponents)
      }

      return {...contextComponents, ...components}
    },
    [contextComponents, components]
  )
}

/**
 * Provider for MDX context.
 *
 * @param {Readonly<Props>} properties
 *   Properties.
 * @returns {ReactElement}
 *   Element.
 * @satisfies {Component}
 */
function MDXProvider(properties) {
  /** @type {Readonly<MDXComponents>} */
  let allComponents

  if (properties.disableParentContext) {
    allComponents =
      typeof properties.components === 'function'
        ? properties.components(emptyComponents)
        : properties.components || emptyComponents
  } else {
    allComponents = useMDXComponents(properties.components)
  }

  return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    MDXContext.Provider,
    {value: allComponents},
    properties.children
  )
}


}),
86158: (function (module) {
"use strict";
module.exports = JSON.parse('{"id":"api/qwksearch-api","title":"QwkSearch API","description":"Search, extract, vectorize and outline a topic base with AI Research Agent.","source":"@site/docs/api/qwksearch-api.info.mdx","sourceDirName":"api","slug":"/api/qwksearch-api","permalink":"/api/qwksearch-api","draft":false,"unlisted":false,"editUrl":null,"tags":[],"version":"current","sidebarPosition":0,"frontMatter":{"id":"qwksearch-api","title":"QwkSearch API","description":"Search, extract, vectorize and outline a topic base with AI Research Agent.","sidebar_label":"Introduction","sidebar_position":0,"hide_title":true,"custom_edit_url":null},"sidebar":"default","previous":{"title":"API Routes","permalink":"/category/qwksearch-api"},"next":{"title":"## Extract structured content and cite from any URL","permalink":"/api/extract-content"}}')

}),

};
;