/**
 * @fileoverview Publishes Prism on `globalThis` so the `prismjs/components/*`
 * grammar scripts can find it.
 *
 * Those grammar files are plain browser scripts, not modules — `prism-markup.js`
 * literally opens with `Prism.languages.markup = {...}`, resolving `Prism` as a
 * free variable off the global object. Prism's core only publishes that global
 * when it can see `window` (browser), a `WorkerGlobalScope` `self`, or Node's
 * `global`. On Cloudflare Workers / edge runtimes none of the three exist, so
 * the first grammar file throws `ReferenceError: Prism is not defined` while the
 * module graph is still evaluating, taking the whole SSR render down with it.
 *
 * Import this module *before* any `prismjs/components/*` import. ES modules are
 * evaluated in import order, so this file's body runs — and the global lands —
 * before the grammars reference it.
 */
import Prism from "prismjs";

(globalThis as typeof globalThis & { Prism?: unknown }).Prism ??= Prism;

export default Prism;
