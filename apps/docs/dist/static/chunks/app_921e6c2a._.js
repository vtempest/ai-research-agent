(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/search.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DefaultSearchDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$components$2f$dialog$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/fumadocs-ui/dist/components/dialog/search.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$search$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/fumadocs-core/dist/search/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$orama$2f$dist$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@orama/orama/dist/browser/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$orama$2f$dist$2f$browser$2f$methods$2f$create$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@orama/orama/dist/browser/methods/create.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$contexts$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/fumadocs-ui/dist/contexts/i18n.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function initOrama() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$orama$2f$orama$2f$dist$2f$browser$2f$methods$2f$create$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])({
        schema: {
            _: 'string'
        },
        // https://docs.orama.com/open-source/supported-languages
        language: 'english'
    });
}
function DefaultSearchDialog(props) {
    _s();
    const { locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$contexts$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])(); // (optional) for i18n
    const { search, setSearch, query } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$search$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocsSearch"])({
        type: 'static',
        // @ts-ignore
        initOrama,
        locale
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$components$2f$dialog$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchDialog"], {
        search: search,
        onSearchChange: setSearch,
        isLoading: query.isLoading,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$components$2f$dialog$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchDialogOverlay"], {}, void 0, false, {
                fileName: "[project]/app/components/search.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$components$2f$dialog$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchDialogContent"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$components$2f$dialog$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchDialogHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$components$2f$dialog$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchDialogIcon"], {}, void 0, false, {
                                fileName: "[project]/app/components/search.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$components$2f$dialog$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchDialogInput"], {}, void 0, false, {
                                fileName: "[project]/app/components/search.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$components$2f$dialog$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchDialogClose"], {}, void 0, false, {
                                fileName: "[project]/app/components/search.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/search.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$components$2f$dialog$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchDialogList"], {
                        items: query.data !== 'empty' ? query.data : null
                    }, void 0, false, {
                        fileName: "[project]/app/components/search.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/search.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/search.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(DefaultSearchDialog, "kLw+Z8pnOym1ZqcPdXkKlIkAbdM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$contexts$2f$i18n$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$core$2f$dist$2f$search$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocsSearch"]
    ];
});
_c = DefaultSearchDialog;
var _c;
__turbopack_context__.k.register(_c, "DefaultSearchDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Provider",
    ()=>Provider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$provider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/fumadocs-ui/dist/provider/index.js [app-client] (ecmascript) <locals>");
// your custom dialog
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$search$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/search.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function Provider(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$fumadocs$2d$ui$2f$dist$2f$provider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RootProvider"], {
        search: {
            SearchDialog: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$search$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/provider.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Provider;
var _c;
__turbopack_context__.k.register(_c, "Provider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_921e6c2a._.js.map