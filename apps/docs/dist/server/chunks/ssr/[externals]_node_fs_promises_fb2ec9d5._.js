module.exports = [
"[externals]/node:fs/promises [external] (node:fs/promises, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_node:fs_promises_ef82023e._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
    });
});
}),
];