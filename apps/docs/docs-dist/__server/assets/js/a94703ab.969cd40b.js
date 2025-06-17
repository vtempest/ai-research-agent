exports.ids = ["9914"];
exports.modules = {
45985: (function (module) {
// Exports
module.exports = {
	"backToTopButton": `backToTopButton_TBD5`,
	"backToTopButtonShow": `backToTopButtonShow_aCCM`
};


}),
6438: (function (module) {
// Exports
module.exports = {
	"docMainContainer": `docMainContainer_M2yx`,
	"docMainContainerEnhanced": `docMainContainerEnhanced_P1e6`,
	"docItemWrapperEnhanced": `docItemWrapperEnhanced_P0vn`
};


}),
95004: (function (module) {
// Exports
module.exports = {
	"expandButton": `expandButton_c4Me`,
	"expandButtonIcon": `expandButtonIcon_QP3R`
};


}),
38802: (function (module) {
// Exports
module.exports = {
	"docSidebarContainer": `docSidebarContainer_bqnN`,
	"docSidebarContainerHidden": `docSidebarContainerHidden_gXWk`,
	"sidebarViewport": `sidebarViewport_yOqo`
};


}),
52979: (function (module) {
// Exports
module.exports = {
	"docRoot": `docRoot_EXUC`,
	"docsWrapper": `docsWrapper_LdU2`
};


}),
82127: (function (module) {
// Exports
module.exports = {
	"collapseSidebarButton": `collapseSidebarButton_eTAZ`,
	"collapseSidebarButtonIcon": `collapseSidebarButtonIcon_sk5H`
};


}),
96201: (function (module) {
// Exports
module.exports = {
	"menu": `menu_TTzw`,
	"menuWithAnnouncementBar": `menuWithAnnouncementBar_Qaa1`
};


}),
99193: (function (module) {
// Exports
module.exports = {
	"sidebar": `sidebar_Xuvk`,
	"sidebarWithHideableNavbar": `sidebarWithHideableNavbar_aYxm`,
	"sidebarHidden": `sidebarHidden_DNxK`,
	"sidebarLogo": `sidebarLogo_SbuP`
};


}),
80733: (function (module) {
// Exports
module.exports = {
	"menuHtmlItem": `menuHtmlItem_zkK3`
};


}),
27667: (function (module) {
// Exports
module.exports = {
	"menuExternalLink": `menuExternalLink_Sy5r`
};


}),
65662: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (BackToTopButton)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92372);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18475);
/* ESM import */var _docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(77037);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45985);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 






function BackToTopButton() {
    var _useBackToTopButton = (0,_docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_4__/* .useBackToTopButton */.a)({
        threshold: 300
    }), shown = _useBackToTopButton.shown, scrollToTop = _useBackToTopButton.scrollToTop;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        "aria-label": (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__.translate)({
            id: 'theme.BackToTopButton.buttonAriaLabel',
            message: 'Scroll back to top',
            description: 'The ARIA label for the back to top button'
        }),
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */.Z)('clean-btn', _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__/* .ThemeClassNames.common.backToTopButton */.k.common.backToTopButton, (_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().backToTopButton), shown && (_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().backToTopButtonShow)),
        type: "button",
        onClick: scrollToTop
    });
}


}),
57762: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocRootLayoutMain)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18538);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6438);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 




function DocRootLayoutMain(param) {
    var hiddenSidebarContainer = param.hiddenSidebarContainer, children = param.children;
    var sidebar = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_3__/* .useDocsSidebar */.V)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("main", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.Z)((_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().docMainContainer), (hiddenSidebarContainer || !sidebar) && (_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().docMainContainerEnhanced)),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.Z)('container padding-top--md padding-bottom--lg', (_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().docItemWrapper), hiddenSidebarContainer && (_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().docItemWrapperEnhanced)),
            children: children
        })
    });
}


}),
11436: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocRootLayoutSidebarExpandButton)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92372);
/* ESM import */var _theme_Icon_Arrow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4487);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(95004);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 




function DocRootLayoutSidebarExpandButton(param) {
    var toggleSidebar = param.toggleSidebar;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().expandButton),
        title: (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__.translate)({
            id: 'theme.docs.sidebar.expandButtonTitle',
            message: 'Expand sidebar',
            description: 'The ARIA label and title attribute for expand button of doc sidebar'
        }),
        "aria-label": (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__.translate)({
            id: 'theme.docs.sidebar.expandButtonAriaLabel',
            message: 'Expand sidebar',
            description: 'The ARIA label and title attribute for expand button of doc sidebar'
        }),
        tabIndex: 0,
        role: "button",
        onKeyDown: toggleSidebar,
        onClick: toggleSidebar,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_Icon_Arrow__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, {
            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().expandButtonIcon)
        })
    });
}


}),
38376: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocRootLayoutSidebar)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54900);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18475);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18538);
/* ESM import */var _docusaurus_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26936);
/* ESM import */var _theme_DocSidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(86308);
/* ESM import */var _theme_DocRoot_Layout_Sidebar_ExpandButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11436);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(38802);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_4__);
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









// Reset sidebar state when sidebar changes
// Use React key to unmount/remount the children
// See https://github.com/facebook/docusaurus/issues/3414
function ResetOnSidebarChange(param) {
    var children = param.children;
    var sidebar = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_5__/* .useDocsSidebar */.V)();
    var _sidebar_name;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: children
    }, (_sidebar_name = sidebar === null || sidebar === void 0 ? void 0 : sidebar.name) !== null && _sidebar_name !== void 0 ? _sidebar_name : 'noSidebar');
}
function DocRootLayoutSidebar(param) {
    var sidebar = param.sidebar, hiddenSidebarContainer = param.hiddenSidebarContainer, setHiddenSidebarContainer = param.setHiddenSidebarContainer;
    var pathname = (0,_docusaurus_router__WEBPACK_IMPORTED_MODULE_6__/* .useLocation */.TH)().pathname;
    var _useState = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), 2), hiddenSidebar = _useState[0], setHiddenSidebar = _useState[1];
    var toggleSidebar = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function() {
        if (hiddenSidebar) {
            setHiddenSidebar(false);
        }
        // onTransitionEnd won't fire when sidebar animation is disabled
        // fixes https://github.com/facebook/docusaurus/issues/8918
        if (!hiddenSidebar && (0,_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_7__/* .prefersReducedMotion */.n)()) {
            setHiddenSidebar(true);
        }
        setHiddenSidebarContainer(function(value) {
            return !value;
        });
    }, [
        setHiddenSidebarContainer,
        hiddenSidebar
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("aside", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */.Z)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_9__/* .ThemeClassNames.docs.docSidebarContainer */.k.docs.docSidebarContainer, (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().docSidebarContainer), hiddenSidebarContainer && (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().docSidebarContainerHidden)),
        onTransitionEnd: function(e) {
            if (!e.currentTarget.classList.contains((_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().docSidebarContainer))) {
                return;
            }
            if (hiddenSidebarContainer) {
                setHiddenSidebar(true);
            }
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ResetOnSidebarChange, {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (0,clsx__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */.Z)((_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().sidebarViewport), hiddenSidebar && (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().sidebarViewportHidden)),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebar__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */.Z, {
                        sidebar: sidebar,
                        path: pathname,
                        onCollapse: toggleSidebar,
                        isHidden: hiddenSidebar
                    }),
                    hiddenSidebar && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocRoot_Layout_Sidebar_ExpandButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, {
                        toggleSidebar: toggleSidebar
                    })
                ]
            })
        })
    });
}


}),
55233: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocRootLayout)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18538);
/* ESM import */var _theme_BackToTopButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65662);
/* ESM import */var _theme_DocRoot_Layout_Sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38376);
/* ESM import */var _theme_DocRoot_Layout_Main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57762);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(52979);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_5__);
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







function DocRootLayout(param) {
    var children = param.children;
    var sidebar = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_6__/* .useDocsSidebar */.V)();
    var _useState = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), 2), hiddenSidebarContainer = _useState[0], setHiddenSidebarContainer = _useState[1];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().docsWrapper),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_BackToTopButton__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */.Z, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().docRoot),
                children: [
                    sidebar && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocRoot_Layout_Sidebar__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, {
                        sidebar: sidebar.items,
                        hiddenSidebarContainer: hiddenSidebarContainer,
                        setHiddenSidebarContainer: setHiddenSidebarContainer
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocRoot_Layout_Main__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.Z, {
                        hiddenSidebarContainer: hiddenSidebarContainer,
                        children: children
                    })
                ]
            })
        ]
    });
}


}),
27545: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (DocRoot)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71063);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18475);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(63034);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18538);
/* ESM import */var _theme_DocRoot_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55233);
/* ESM import */var _theme_NotFound_Content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(84146);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 






function DocRoot(props) {
    var currentDocRouteMetadata = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_4__/* .useDocRootMetadata */.SN)(props);
    if (!currentDocRouteMetadata) {
        // We only render the not found content to avoid a double layout
        // see https://github.com/facebook/docusaurus/pull/7966#pullrequestreview-1077276692
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_NotFound_Content__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, {});
    }
    var docElement = currentDocRouteMetadata.docElement, sidebarName = currentDocRouteMetadata.sidebarName, sidebarItems = currentDocRouteMetadata.sidebarItems;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_5__/* .HtmlClassNameProvider */.FG, {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */.Z)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_7__/* .ThemeClassNames.page.docsDocPage */.k.page.docsDocPage),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_8__/* .DocsSidebarProvider */.b, {
            name: sidebarName,
            items: sidebarItems,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocRoot_Layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */.Z, {
                children: docElement
            })
        })
    });
}


}),
78347: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (CollapseButton)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92372);
/* ESM import */var _theme_Icon_Arrow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4487);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(82127);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 





function CollapseButton(param) {
    var onClick = param.onClick;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        type: "button",
        title: (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__.translate)({
            id: 'theme.docs.sidebar.collapseButtonTitle',
            message: 'Collapse sidebar',
            description: 'The title attribute for collapse button of doc sidebar'
        }),
        "aria-label": (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__.translate)({
            id: 'theme.docs.sidebar.collapseButtonAriaLabel',
            message: 'Collapse sidebar',
            description: 'The title attribute for collapse button of doc sidebar'
        }),
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */.Z)('button button--secondary button--outline', (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().collapseSidebarButton)),
        onClick: onClick,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_Icon_Arrow__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, {
            className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().collapseSidebarButtonIcon)
        })
    });
}


}),
42818: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocSidebarDesktopContent)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18475);
/* ESM import */var _docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22215);
/* ESM import */var _docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(63666);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92372);
/* ESM import */var _theme_DocSidebarItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24536);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(96201);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_4__);
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








function useShowAnnouncementBar() {
    var isActive = (0,_docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_5__/* .useAnnouncementBar */.n)().isActive;
    var _useState = _sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(isActive), 2), showAnnouncementBar = _useState[0], setShowAnnouncementBar = _useState[1];
    (0,_docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_6__/* .useScrollPosition */.RF)(function(param) {
        var scrollY = param.scrollY;
        if (isActive) {
            setShowAnnouncementBar(scrollY === 0);
        }
    }, [
        isActive
    ]);
    return isActive && showAnnouncementBar;
}
function DocSidebarDesktopContent(param) {
    var path = param.path, sidebar = param.sidebar, className = param.className;
    var showAnnouncementBar = useShowAnnouncementBar();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
        "aria-label": (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__.translate)({
            id: 'theme.docs.sidebar.navAriaLabel',
            message: 'Docs sidebar',
            description: 'The ARIA label for the sidebar navigation'
        }),
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.Z)('menu thin-scrollbar', (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().menu), showAnnouncementBar && (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().menuWithAnnouncementBar), className),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
            className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.Z)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_8__/* .ThemeClassNames.docs.docSidebarMenu */.k.docs.docSidebarMenu, 'menu__list'),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebarItems__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, {
                items: sidebar,
                activePath: path,
                level: 1
            })
        })
    });
}


}),
8568: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(544);
/* ESM import */var _theme_Logo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51787);
/* ESM import */var _theme_DocSidebar_Desktop_CollapseButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(78347);
/* ESM import */var _theme_DocSidebar_Desktop_Content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42818);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(99193);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 







function DocSidebarDesktop(param) {
    var path = param.path, sidebar = param.sidebar, onCollapse = param.onCollapse, isHidden = param.isHidden;
    var _useThemeConfig = (0,_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__/* .useThemeConfig */.L)(), hideOnScroll = _useThemeConfig.navbar.hideOnScroll, _useThemeConfig_docs = _useThemeConfig.docs, hideable = _useThemeConfig_docs.sidebar.hideable;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.Z)((_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().sidebar), hideOnScroll && (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().sidebarWithHideableNavbar), isHidden && (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().sidebarHidden)),
        children: [
            hideOnScroll && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_Logo__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */.Z, {
                tabIndex: -1,
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().sidebarLogo)
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebar_Desktop_Content__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.Z, {
                path: path,
                sidebar: sidebar
            }),
            hideable && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebar_Desktop_CollapseButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, {
                onClick: onCollapse
            })
        ]
    });
}
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.memo(DocSidebarDesktop));


}),
89802: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18475);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(52550);
/* ESM import */var _docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(51919);
/* ESM import */var _theme_DocSidebarItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24536);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 





// eslint-disable-next-line react/function-component-definition
var DocSidebarMobileSecondaryMenu = function(param) {
    var sidebar = param.sidebar, path = param.path;
    var mobileSidebar = (0,_docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_3__/* .useNavbarMobileSidebar */.e)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.Z)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_5__/* .ThemeClassNames.docs.docSidebarMenu */.k.docs.docSidebarMenu, 'menu__list'),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebarItems__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */.Z, {
            items: sidebar,
            activePath: path,
            onItemClick: function(item) {
                // Mobile sidebar should only be closed if the category has a link
                if (item.type === 'category' && item.href) {
                    mobileSidebar.toggle();
                }
                if (item.type === 'link') {
                    mobileSidebar.toggle();
                }
            },
            level: 1
        })
    });
};
function DocSidebarMobile(props) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__/* .NavbarSecondaryMenuFiller */.Zo, {
        component: DocSidebarMobileSecondaryMenu,
        props: props
    });
}
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.memo(DocSidebarMobile));


}),
86308: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocSidebar)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57004);
/* ESM import */var _theme_DocSidebar_Desktop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8568);
/* ESM import */var _theme_DocSidebar_Mobile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89802);
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





function DocSidebar(props) {
    var windowSize = (0,_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_4__/* .useWindowSize */.i)();
    // Desktop sidebar visible on hydration: need SSR rendering
    var shouldRenderSidebarDesktop = windowSize === 'desktop' || windowSize === 'ssr';
    // Mobile sidebar not visible on hydration: can avoid SSR rendering
    var shouldRenderSidebarMobile = windowSize === 'mobile';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            shouldRenderSidebarDesktop && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebar_Desktop__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */.Z, _object_spread({}, props)),
            shouldRenderSidebarMobile && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebar_Mobile__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, _object_spread({}, props))
        ]
    });
}


}),
38673: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocSidebarItemCategory)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11845);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(544);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(49107);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(18475);
/* ESM import */var _docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11237);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(63034);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(58162);
/* ESM import */var _docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64688);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(92372);
/* ESM import */var _docusaurus_useIsBrowser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18069);
/* ESM import */var _theme_DocSidebarItems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24536);
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










// If we navigate to a category and it becomes active, it should automatically
// expand itself
function useAutoExpandActiveCategory(param) {
    var isActive = param.isActive, collapsed = param.collapsed, updateCollapsed = param.updateCollapsed;
    var wasActive = (0,_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__/* .usePrevious */.D9)(isActive);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {
        var justBecameActive = isActive && !wasActive;
        if (justBecameActive && collapsed) {
            updateCollapsed(false);
        }
    }, [
        isActive,
        wasActive,
        collapsed,
        updateCollapsed
    ]);
}
/**
 * When a collapsible category has no link, we still link it to its first child
 * during SSR as a temporary fallback. This allows to be able to navigate inside
 * the category even when JS fails to load, is delayed or simply disabled
 * React hydration becomes an optional progressive enhancement
 * see https://github.com/facebookincubator/infima/issues/36#issuecomment-772543188
 * see https://github.com/facebook/docusaurus/issues/3030
 */ function useCategoryHrefWithSSRFallback(item) {
    var isBrowser = (0,_docusaurus_useIsBrowser__WEBPACK_IMPORTED_MODULE_4__["default"])();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function() {
        if (item.href && !item.linkUnlisted) {
            return item.href;
        }
        // In these cases, it's not necessary to render a fallback
        // We skip the "findFirstCategoryLink" computation
        if (isBrowser || !item.collapsible) {
            return undefined;
        }
        return (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_7__/* .findFirstSidebarItemLink */.LM)(item);
    }, [
        item,
        isBrowser
    ]);
}
function CollapseButton(param) {
    var collapsed = param.collapsed, categoryLabel = param.categoryLabel, onClick = param.onClick;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        "aria-label": collapsed ? (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_3__.translate)({
            id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
            message: "Expand sidebar category '{label}'",
            description: 'The ARIA label to expand the sidebar category'
        }, {
            label: categoryLabel
        }) : (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_3__.translate)({
            id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
            message: "Collapse sidebar category '{label}'",
            description: 'The ARIA label to collapse the sidebar category'
        }, {
            label: categoryLabel
        }),
        "aria-expanded": !collapsed,
        type: "button",
        className: "clean-btn menu__caret",
        onClick: onClick
    });
}
function DocSidebarItemCategory(_param) {
    var item = _param.item, onItemClick = _param.onItemClick, activePath = _param.activePath, level = _param.level, index = _param.index, props = _object_without_properties(_param, [
        "item",
        "onItemClick",
        "activePath",
        "level",
        "index"
    ]);
    var items = item.items, label = item.label, collapsible = item.collapsible, className = item.className, href = item.href;
    var _useThemeConfig = (0,_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_8__/* .useThemeConfig */.L)(), _useThemeConfig_docs = _useThemeConfig.docs, autoCollapseCategories = _useThemeConfig_docs.sidebar.autoCollapseCategories;
    var hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);
    var isActive = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_7__/* .isActiveSidebarItem */._F)(item, activePath);
    var isCurrentPage = (0,_docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_9__/* .isSamePath */.Mg)(href, activePath);
    var _useCollapsible = (0,_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_10__/* .useCollapsible */.u)({
        // Active categories are always initialized as expanded. The default
        // (`item.collapsed`) is only used for non-active categories.
        initialState: function() {
            if (!collapsible) {
                return false;
            }
            return isActive ? false : item.collapsed;
        }
    }), collapsed = _useCollapsible.collapsed, setCollapsed = _useCollapsible.setCollapsed;
    var _useDocSidebarItemsExpandedState = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_11__/* .useDocSidebarItemsExpandedState */.f)(), expandedItem = _useDocSidebarItemsExpandedState.expandedItem, setExpandedItem = _useDocSidebarItemsExpandedState.setExpandedItem;
    // Use this instead of `setCollapsed`, because it is also reactive
    var updateCollapsed = function() {
        var toCollapsed = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !collapsed;
        setExpandedItem(toCollapsed ? null : index);
        setCollapsed(toCollapsed);
    };
    useAutoExpandActiveCategory({
        isActive: isActive,
        collapsed: collapsed,
        updateCollapsed: updateCollapsed
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {
        if (collapsible && expandedItem != null && expandedItem !== index && autoCollapseCategories) {
            setCollapsed(true);
        }
    }, [
        collapsible,
        expandedItem,
        index,
        setCollapsed,
        autoCollapseCategories
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */.Z)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_13__/* .ThemeClassNames.docs.docSidebarItemCategory */.k.docs.docSidebarItemCategory, _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_13__/* .ThemeClassNames.docs.docSidebarItemCategoryLevel */.k.docs.docSidebarItemCategoryLevel(level), 'menu__list-item', {
            'menu__list-item--collapsed': collapsed
        }, className),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (0,clsx__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */.Z)('menu__list-item-collapsible', {
                    'menu__list-item-collapsible--active': isCurrentPage
                }),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__["default"], _object_spread_props(_object_spread({
                        className: (0,clsx__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */.Z)('menu__link', {
                            'menu__link--sublist': collapsible,
                            'menu__link--sublist-caret': !href && collapsible,
                            'menu__link--active': isActive
                        }),
                        onClick: collapsible ? function(e) {
                            onItemClick === null || onItemClick === void 0 ? void 0 : onItemClick(item);
                            if (href) {
                                // When already on the category's page, we collapse it
                                // We don't use "isActive" because it would collapse the
                                // category even when we browse a children element
                                // See https://github.com/facebook/docusaurus/issues/11213
                                if (isCurrentPage) {
                                    e.preventDefault();
                                    updateCollapsed();
                                } else {
                                    // When navigating to a new category, we always expand
                                    // see https://github.com/facebook/docusaurus/issues/10854#issuecomment-2609616182
                                    updateCollapsed(false);
                                }
                            } else {
                                e.preventDefault();
                                updateCollapsed();
                            }
                        } : function() {
                            onItemClick === null || onItemClick === void 0 ? void 0 : onItemClick(item);
                        },
                        "aria-current": isCurrentPage ? 'page' : undefined,
                        role: collapsible && !href ? 'button' : undefined,
                        "aria-expanded": collapsible && !href ? !collapsed : undefined,
                        href: collapsible ? hrefWithSSRFallback !== null && hrefWithSSRFallback !== void 0 ? hrefWithSSRFallback : '#' : hrefWithSSRFallback
                    }, props), {
                        children: label
                    })),
                    href && collapsible && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CollapseButton, {
                        collapsed: collapsed,
                        categoryLabel: label,
                        onClick: function(e) {
                            e.preventDefault();
                            updateCollapsed();
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_10__/* .Collapsible */.z, {
                lazy: true,
                as: "ul",
                className: "menu__list",
                collapsed: collapsed,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebarItems__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */.Z, {
                    items: items,
                    tabIndex: collapsed ? -1 : 0,
                    onItemClick: onItemClick,
                    activePath: activePath,
                    level: level + 1
                })
            })
        ]
    });
}


}),
92522: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocSidebarItemHtml)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18475);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80733);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 




function DocSidebarItemHtml(param) {
    var item = param.item, level = param.level, index = param.index;
    var value = item.value, defaultStyle = item.defaultStyle, className = item.className;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_4__/* .ThemeClassNames.docs.docSidebarItemLink */.k.docs.docSidebarItemLink, _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_4__/* .ThemeClassNames.docs.docSidebarItemLinkLevel */.k.docs.docSidebarItemLinkLevel(level), defaultStyle && [
            (_styles_module_css__WEBPACK_IMPORTED_MODULE_2___default().menuHtmlItem),
            'menu__list-item'
        ], className),
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML: {
            __html: value
        }
    }, index);
}


}),
11507: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocSidebarItemLink)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18475);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(63034);
/* ESM import */var _docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64688);
/* ESM import */var _docusaurus_isInternalUrl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(74287);
/* ESM import */var _theme_Icon_ExternalLink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(99377);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27667);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_4__);
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









function DocSidebarItemLink(_param) {
    var item = _param.item, onItemClick = _param.onItemClick, activePath = _param.activePath, level = _param.level, index = _param.index, props = _object_without_properties(_param, [
        "item",
        "onItemClick",
        "activePath",
        "level",
        "index"
    ]);
    var href = item.href, label = item.label, className = item.className, autoAddBaseUrl = item.autoAddBaseUrl;
    var isActive = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_5__/* .isActiveSidebarItem */._F)(item, activePath);
    var isInternalLink = (0,_docusaurus_isInternalUrl__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */.Z)(href);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.Z)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_8__/* .ThemeClassNames.docs.docSidebarItemLink */.k.docs.docSidebarItemLink, _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_8__/* .ThemeClassNames.docs.docSidebarItemLinkLevel */.k.docs.docSidebarItemLinkLevel(level), 'menu__list-item', className),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__["default"], _object_spread_props(_object_spread({
            className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.Z)('menu__link', !isInternalLink && (_styles_module_css__WEBPACK_IMPORTED_MODULE_4___default().menuExternalLink), {
                'menu__link--active': isActive
            }),
            autoAddBaseUrl: autoAddBaseUrl,
            "aria-current": isActive ? 'page' : undefined,
            to: href
        }, isInternalLink && {
            onClick: onItemClick ? function() {
                return onItemClick(item);
            } : undefined
        }, props), {
            children: [
                label,
                !isInternalLink && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_Icon_ExternalLink__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, {})
            ]
        }))
    }, label);
}


}),
65179: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocSidebarItem)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var _theme_DocSidebarItem_Category__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38673);
/* ESM import */var _theme_DocSidebarItem_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11507);
/* ESM import */var _theme_DocSidebarItem_Html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(92522);
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





function DocSidebarItem(_param) {
    var item = _param.item, props = _object_without_properties(_param, [
        "item"
    ]);
    switch(item.type){
        case 'category':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebarItem_Category__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */.Z, _object_spread({
                item: item
            }, props));
        case 'html':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebarItem_Html__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.Z, _object_spread({
                item: item
            }, props));
        case 'link':
        default:
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebarItem_Link__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, _object_spread({
                item: item
            }, props));
    }
}


}),
24536: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(63034);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58162);
/* ESM import */var _theme_DocSidebarItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65179);
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




function DocSidebarItems(_param) {
    var items = _param.items, props = _object_without_properties(_param, [
        "items"
    ]);
    var visibleItems = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_3__/* .useVisibleSidebarItems */.f)(items, props.activePath);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_4__/* .DocSidebarItemsExpandedStateProvider */.D, {
        children: visibleItems.map(function(item, index) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocSidebarItem__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */.Z, _object_spread({
                item: item,
                index: index
            }, props), index);
        })
    });
}
// Optimize sidebar at each "level"
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(DocSidebarItems));


}),
4487: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (IconArrow)
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


function IconArrow(props) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", _object_spread_props(_object_spread({
        width: "20",
        height: "20",
        "aria-hidden": "true"
    }, props), {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
            fill: "#7a7a7a",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                    d: "M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                    d: "M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"
                })
            ]
        })
    }));
}


}),
84146: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (NotFoundContent)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92372);
/* ESM import */var _theme_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33385);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 




function NotFoundContent(param) {
    var className = param.className;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("main", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.Z)('container margin-vert--xl', className),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "row",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "col col--6 col--offset-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_Heading__WEBPACK_IMPORTED_MODULE_3__["default"], {
                        as: "h1",
                        className: "hero__title",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
                            id: "theme.NotFound.title",
                            description: "The title of the 404 page",
                            children: "Page Not Found"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
                            id: "theme.NotFound.p1",
                            description: "The first paragraph of the 404 page",
                            children: "We could not find what you were looking for."
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
                            id: "theme.NotFound.p2",
                            description: "The 2nd paragraph of the 404 page",
                            children: "Please contact the owner of the site that linked you to the original URL and let them know their link is broken."
                        })
                    })
                ]
            })
        })
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

};
;