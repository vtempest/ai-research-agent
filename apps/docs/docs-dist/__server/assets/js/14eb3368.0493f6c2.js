exports.ids = ["1983"];
exports.modules = {
63970: (function (module) {
// Exports
module.exports = {
	"breadcrumbHomeIcon": `breadcrumbHomeIcon_l_dL`
};


}),
6110: (function (module) {
// Exports
module.exports = {
	"breadcrumbsContainer": `breadcrumbsContainer_xxoF`
};


}),
52393: (function (module) {
// Exports
module.exports = {
	"cardContainer": `cardContainer_RXZi`,
	"cardTitle": `cardTitle_pPws`,
	"cardDescription": `cardDescription_g_Ra`
};


}),
16873: (function (module) {
// Exports
module.exports = {
	"docCardListItem": `docCardListItem_Q12s`
};


}),
43735: (function (module) {
// Exports
module.exports = {
	"generatedIndexPage": `generatedIndexPage_yx3N`,
	"title": `title_cetW`
};


}),
67687: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (HomeBreadcrumbItem)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64688);
/* ESM import */var _docusaurus_useBaseUrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32945);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(92372);
/* ESM import */var _theme_Icon_Home__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21104);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(63970);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 






function HomeBreadcrumbItem() {
    var homeHref = (0,_docusaurus_useBaseUrl__WEBPACK_IMPORTED_MODULE_3__["default"])('/');
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
        className: "breadcrumbs__item",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__["default"], {
            "aria-label": (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_4__.translate)({
                id: 'theme.docs.breadcrumbs.home',
                message: 'Home page',
                description: 'The ARIA label for the home page in the breadcrumbs'
            }),
            className: "breadcrumbs__link",
            href: homeHref,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_Icon_Home__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */.Z, {
                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_6___default().breadcrumbHomeIcon)
            })
        })
    });
}


}),
32102: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocBreadcrumbsStructuredData)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_Head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31118);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26850);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 



function DocBreadcrumbsStructuredData(props) {
    var structuredData = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_3__/* .useBreadcrumbsStructuredData */.o)({
        breadcrumbs: props.breadcrumbs
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Head__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */.Z, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("script", {
            type: "application/ld+json",
            children: JSON.stringify(structuredData)
        })
    });
}


}),
50719: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (DocBreadcrumbs)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(18475);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(63034);
/* ESM import */var _docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11237);
/* ESM import */var _docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64688);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(92372);
/* ESM import */var _theme_DocBreadcrumbs_Items_Home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(67687);
/* ESM import */var _theme_DocBreadcrumbs_StructuredData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32102);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6110);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 










// TODO move to design system folder
function BreadcrumbsItemLink(param) {
    var children = param.children, href = param.href, isLast = param.isLast;
    var className = 'breadcrumbs__link';
    if (isLast) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: className,
            children: children
        });
    }
    return href ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: className,
        href: href,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            children: children
        })
    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: className,
        children: children
    });
}
// TODO move to design system folder
function BreadcrumbsItem(param) {
    var children = param.children, active = param.active;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.Z)('breadcrumbs__item', {
            'breadcrumbs__item--active': active
        }),
        children: children
    });
}
function DocBreadcrumbs() {
    var breadcrumbs = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_8__/* .useSidebarBreadcrumbs */.s1)();
    var homePageRoute = (0,_docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_9__/* .useHomePageRoute */.Ns)();
    if (!breadcrumbs) {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocBreadcrumbs_StructuredData__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */.Z, {
                breadcrumbs: breadcrumbs
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
                className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.Z)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_10__/* .ThemeClassNames.docs.docBreadcrumbs */.k.docs.docBreadcrumbs, (_styles_module_css__WEBPACK_IMPORTED_MODULE_6___default().breadcrumbsContainer)),
                "aria-label": (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_3__.translate)({
                    id: 'theme.docs.breadcrumbs.navAriaLabel',
                    message: 'Breadcrumbs',
                    description: 'The ARIA label for the breadcrumbs'
                }),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                    className: "breadcrumbs",
                    children: [
                        homePageRoute && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocBreadcrumbs_Items_Home__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.Z, {}),
                        breadcrumbs.map(function(item, idx) {
                            var isLast = idx === breadcrumbs.length - 1;
                            var href = item.type === 'category' && item.linkUnlisted ? undefined : item.href;
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BreadcrumbsItem, {
                                active: isLast,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BreadcrumbsItemLink, {
                                    href: href,
                                    isLast: isLast,
                                    children: item.label
                                })
                            }, idx);
                        })
                    ]
                })
            })
        ]
    });
}


}),
43036: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocCard)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64688);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(63034);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(82440);
/* ESM import */var _docusaurus_isInternalUrl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(74287);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(92372);
/* ESM import */var _theme_Heading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33385);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(52393);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 









function useCategoryItemsPlural() {
    var selectMessage = (0,_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_6__/* .usePluralForm */.c)().selectMessage;
    return function(count) {
        return selectMessage(count, (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_3__.translate)({
            message: '1 item|{count} items',
            id: 'theme.docs.DocCard.categoryDescription.plurals',
            description: 'The default description for a category card in the generated index about how many items this category includes'
        }, {
            count: count
        }));
    };
}
function CardContainer(param) {
    var className = param.className, href = param.href, children = param.children;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__["default"], {
        href: href,
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.Z)('card padding--lg', (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().cardContainer), className),
        children: children
    });
}
function CardLayout(param) {
    var className = param.className, href = param.href, icon = param.icon, title = param.title, description = param.description;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CardContainer, {
        href: href,
        className: className,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_theme_Heading__WEBPACK_IMPORTED_MODULE_4__["default"], {
                as: "h2",
                className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.Z)('text--truncate', (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().cardTitle)),
                title: title,
                children: [
                    icon,
                    " ",
                    title
                ]
            }),
            description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.Z)('text--truncate', (_styles_module_css__WEBPACK_IMPORTED_MODULE_5___default().cardDescription)),
                title: description,
                children: description
            })
        ]
    });
}
function CardCategory(param) {
    var item = param.item;
    var href = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_8__/* .findFirstSidebarItemLink */.LM)(item);
    var categoryItemsPlural = useCategoryItemsPlural();
    // Unexpected: categories that don't have a link have been filtered upfront
    if (!href) {
        return null;
    }
    var _item_description;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardLayout, {
        className: item.className,
        href: href,
        icon: "\uD83D\uDDC3\uFE0F",
        title: item.label,
        description: (_item_description = item.description) !== null && _item_description !== void 0 ? _item_description : categoryItemsPlural(item.items.length)
    });
}
function CardLink(param) {
    var item = param.item;
    var icon = (0,_docusaurus_isInternalUrl__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */.Z)(item.href) ? "\uD83D\uDCC4\uFE0F" : "\uD83D\uDD17";
    var _item_docId;
    var doc = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_8__/* .useDocById */.xz)((_item_docId = item.docId) !== null && _item_docId !== void 0 ? _item_docId : undefined);
    var _item_description;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardLayout, {
        className: item.className,
        href: item.href,
        icon: icon,
        title: item.label,
        description: (_item_description = item.description) !== null && _item_description !== void 0 ? _item_description : doc === null || doc === void 0 ? void 0 : doc.description
    });
}
function DocCard(param) {
    var item = param.item;
    switch(item.type){
        case 'link':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardLink, {
                item: item
            });
        case 'category':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardCategory, {
                item: item
            });
        default:
            throw new Error("unknown item type ".concat(JSON.stringify(item)));
    }
}


}),
65455: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocCardList)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(63034);
/* ESM import */var _theme_DocCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43036);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16873);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_3__);
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






function DocCardListForCurrentSidebarCategory(param) {
    var className = param.className;
    var items = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_4__/* .useCurrentSidebarSiblings */.Ok)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DocCardList, {
        items: items,
        className: className
    });
}
function DocCardListItem(param) {
    var item = param.item;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("article", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */.Z)((_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().docCardListItem), 'col col--6'),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocCard__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */.Z, {
            item: item
        })
    });
}
function DocCardList(props) {
    var items = props.items, className = props.className;
    if (!items) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DocCardListForCurrentSidebarCategory, _object_spread({}, props));
    }
    var filteredItems = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_4__/* .filterDocCardListItems */.MN)(items);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */.Z)('row', className),
        children: filteredItems.map(function(item, index) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DocCardListItem, {
                item: item
            }, index);
        })
    });
}


}),
53269: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (DocCategoryGeneratedIndexPage)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(71063);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(63034);
/* ESM import */var _docusaurus_useBaseUrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32945);
/* ESM import */var _theme_DocCardList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65455);
/* ESM import */var _theme_DocPaginator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(85428);
/* ESM import */var _theme_DocVersionBanner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40069);
/* ESM import */var _theme_DocVersionBadge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(51191);
/* ESM import */var _theme_DocBreadcrumbs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(50719);
/* ESM import */var _theme_Heading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(33385);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(43735);
/* ESM import */var _styles_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_9__);
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












function DocCategoryGeneratedIndexPageMetadata(param) {
    var categoryGeneratedIndex = param.categoryGeneratedIndex;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_10__/* .PageMetadata */.d, {
        title: categoryGeneratedIndex.title,
        description: categoryGeneratedIndex.description,
        keywords: categoryGeneratedIndex.keywords,
        // TODO `require` this?
        image: (0,_docusaurus_useBaseUrl__WEBPACK_IMPORTED_MODULE_2__["default"])(categoryGeneratedIndex.image)
    });
}
function DocCategoryGeneratedIndexPageContent(param) {
    var categoryGeneratedIndex = param.categoryGeneratedIndex;
    var category = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_11__/* .useCurrentSidebarCategory */.jA)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_9___default().generatedIndexPage),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocVersionBanner__WEBPACK_IMPORTED_MODULE_5__["default"], {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocBreadcrumbs__WEBPACK_IMPORTED_MODULE_7__["default"], {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocVersionBadge__WEBPACK_IMPORTED_MODULE_6__["default"], {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_Heading__WEBPACK_IMPORTED_MODULE_8__["default"], {
                        as: "h1",
                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_9___default().title),
                        children: categoryGeneratedIndex.title
                    }),
                    categoryGeneratedIndex.description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        children: categoryGeneratedIndex.description
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("article", {
                className: "margin-top--lg",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocCardList__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, {
                    items: category.items,
                    className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_9___default().list)
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("footer", {
                className: "margin-top--md",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_DocPaginator__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.Z, {
                    previous: categoryGeneratedIndex.navigation.previous,
                    next: categoryGeneratedIndex.navigation.next
                })
            })
        ]
    });
}
function DocCategoryGeneratedIndexPage(props) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DocCategoryGeneratedIndexPageMetadata, _object_spread({}, props)),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DocCategoryGeneratedIndexPageContent, _object_spread({}, props))
        ]
    });
}


}),
85428: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (DocPaginator)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92372);
/* ESM import */var _theme_PaginatorNavLink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29930);
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





function DocPaginator(props) {
    var className = props.className, previous = props.previous, next = props.next;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.Z)(className, 'pagination-nav'),
        "aria-label": (0,_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__.translate)({
            id: 'theme.docs.paginator.navAriaLabel',
            message: 'Docs pages',
            description: 'The ARIA label for the docs pagination'
        }),
        children: [
            previous && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_PaginatorNavLink__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, _object_spread_props(_object_spread({}, previous), {
                subLabel: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    id: "theme.docs.paginator.previous",
                    description: "The label used to navigate to the previous doc",
                    children: "Previous"
                })
            })),
            next && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_theme_PaginatorNavLink__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z, _object_spread_props(_object_spread({}, next), {
                subLabel: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    id: "theme.docs.paginator.next",
                    description: "The label used to navigate to the next doc",
                    children: "Next"
                }),
                isNext: true
            }))
        ]
    });
}


}),
51191: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (DocVersionBadge)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92372);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18475);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66159);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 





function DocVersionBadge(param) {
    var className = param.className;
    var versionMetadata = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_3__/* .useDocsVersion */.E)();
    if (versionMetadata.badge) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */.Z)(className, _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_5__/* .ThemeClassNames.docs.docVersionBadge */.k.docs.docVersionBadge, 'badge badge--secondary'),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_2__["default"], {
                id: "theme.docs.versionBadge.label",
                values: {
                    versionLabel: versionMetadata.label
                },
                children: 'Version: {versionLabel}'
            })
        });
    }
    return null;
}


}),
40069: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (DocVersionBanner)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48131);
/* ESM import */var _docusaurus_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64688);
/* ESM import */var _docusaurus_Translate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(92372);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(31862);
/* ESM import */var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18475);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20352);
/* ESM import */var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(66159);
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









function UnreleasedVersionLabel(param) {
    var siteTitle = param.siteTitle, versionMetadata = param.versionMetadata;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_4__["default"], {
        id: "theme.docs.versions.unreleasedVersionLabel",
        description: "The label used to tell the user that he's browsing an unreleased doc version",
        values: {
            siteTitle: siteTitle,
            versionLabel: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                children: versionMetadata.label
            })
        },
        children: 'This is unreleased documentation for {siteTitle} {versionLabel} version.'
    });
}
function UnmaintainedVersionLabel(param) {
    var siteTitle = param.siteTitle, versionMetadata = param.versionMetadata;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_4__["default"], {
        id: "theme.docs.versions.unmaintainedVersionLabel",
        description: "The label used to tell the user that he's browsing an unmaintained doc version",
        values: {
            siteTitle: siteTitle,
            versionLabel: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                children: versionMetadata.label
            })
        },
        children: 'This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.'
    });
}
var BannerLabelComponents = {
    unreleased: UnreleasedVersionLabel,
    unmaintained: UnmaintainedVersionLabel
};
function BannerLabel(props) {
    var BannerLabelComponent = BannerLabelComponents[props.versionMetadata.banner];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BannerLabelComponent, _object_spread({}, props));
}
function LatestVersionSuggestionLabel(param) {
    var versionLabel = param.versionLabel, to = param.to, onClick = param.onClick;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_4__["default"], {
        id: "theme.docs.versions.latestVersionSuggestionLabel",
        description: "The label used to tell the user to check the latest version",
        values: {
            versionLabel: versionLabel,
            latestVersionLink: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("b", {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
                    to: to,
                    onClick: onClick,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_docusaurus_Translate__WEBPACK_IMPORTED_MODULE_4__["default"], {
                        id: "theme.docs.versions.latestVersionLinkLabel",
                        description: "The label used for the latest version suggestion link label",
                        children: "latest version"
                    })
                })
            })
        },
        children: 'For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).'
    });
}
function DocVersionBannerEnabled(param) {
    var className = param.className, versionMetadata = param.versionMetadata;
    var _useDocusaurusContext = (0,_docusaurus_useDocusaurusContext__WEBPACK_IMPORTED_MODULE_2__["default"])(), _useDocusaurusContext_siteConfig = _useDocusaurusContext.siteConfig, siteTitle = _useDocusaurusContext_siteConfig.title;
    var pluginId = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_5__.useActivePlugin)({
        failfast: true
    }).pluginId;
    var getVersionMainDoc = function(version) {
        return version.docs.find(function(doc) {
            return doc.id === version.mainDocId;
        });
    };
    var savePreferredVersionName = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_6__/* .useDocsPreferredVersion */.J)(pluginId).savePreferredVersionName;
    var _useDocVersionSuggestions = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_5__.useDocVersionSuggestions)(pluginId), latestDocSuggestion = _useDocVersionSuggestions.latestDocSuggestion, latestVersionSuggestion = _useDocVersionSuggestions.latestVersionSuggestion;
    // Try to link to same doc in latest version (not always possible), falling
    // back to main doc of latest version
    var latestVersionSuggestedDoc = latestDocSuggestion !== null && latestDocSuggestion !== void 0 ? latestDocSuggestion : getVersionMainDoc(latestVersionSuggestion);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */.Z)(className, _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_8__/* .ThemeClassNames.docs.docVersionBanner */.k.docs.docVersionBanner, 'alert alert--warning margin-bottom--md'),
        role: "alert",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BannerLabel, {
                    siteTitle: siteTitle,
                    versionMetadata: versionMetadata
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "margin-top--md",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LatestVersionSuggestionLabel, {
                    versionLabel: latestVersionSuggestion.label,
                    to: latestVersionSuggestedDoc.path,
                    onClick: function() {
                        return savePreferredVersionName(latestVersionSuggestion.name);
                    }
                })
            })
        ]
    });
}
function DocVersionBanner(param) {
    var className = param.className;
    var versionMetadata = (0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_9__/* .useDocsVersion */.E)();
    if (versionMetadata.banner) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DocVersionBannerEnabled, {
            className: className,
            versionMetadata: versionMetadata
        });
    }
    return null;
}


}),
21104: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (IconHome)
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


function IconHome(props) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", _object_spread_props(_object_spread({
        viewBox: "0 0 24 24"
    }, props), {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",
            fill: "currentColor"
        })
    }));
}


}),
29930: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  Z: () => (PaginatorNavLink)
});
/* ESM import */var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74132);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39546);
/* ESM import */var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54461);
/* ESM import */var _docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64688);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 



function PaginatorNavLink(props) {
    var permalink = props.permalink, title = props.title, subLabel = props.subLabel, isNext = props.isNext;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_docusaurus_Link__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */.Z)('pagination-nav__link', isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev'),
        to: permalink,
        children: [
            subLabel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "pagination-nav__sublabel",
                children: subLabel
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "pagination-nav__label",
                children: title
            })
        ]
    });
}


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

};
;