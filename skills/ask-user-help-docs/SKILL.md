---
name: ask-user-help-docs
description: Guide to user-help-docs (packages/user-help-docs), the Fumadocs help site mounted at /docs in qwksearch-web — the content/docs MDX tree and meta.json ordering, the import.meta.glob source that replaces fumadocs-mdx codegen so it runs on Cloudflare Workers, the helpDocsMdxPlugin build-time MDX compile the host has to register, the search index, the llms.mdx / llms-full.txt plain-text views, and docsConfig branding. Use when adding or reordering a help page, when /docs 500s after a content change, when docs search returns nothing, or when wiring the docs routes into a host app.
---

# Working With user-help-docs

`packages/user-help-docs` (private, not published). The user-facing help site rendered
at `/docs` by `apps/qwksearch-web`, built on [Fumadocs](https://fumadocs.dev).

## The one architectural decision to know

This package **does not use `fumadocs-mdx`'s build-time collections pipeline**. `src/source.ts`
inlines every file with `import.meta.glob`, because the consuming app ships to a
**Cloudflare Worker**: there is no filesystem to scan, and no `import.meta.url` to
resolve `content/docs` against. Resolving one anyway threw

```
TypeError: The "path" argument must be of type string or an instance of URL. Received undefined
    at fileURLToPath (node-internal:internal_url)
```

at module scope, taking down every route bundled into the same chunk — not just `/docs`.

Each file is globbed **twice**, in the two shapes the site needs:

| Glob | Shape | Used by |
| --- | --- | --- |
| `'../content/docs/**/*.{md,mdx,json}'` with `{ query: '?raw', import: 'default', eager: true }` | the original Markdown | `search.ts` (`structure()` at index time), `llms.ts` |
| `'../content/docs/**/*.{md,mdx}'` with `{ eager: true }` | a compiled module — `default` is the body component, `toc` its outline | `app/docs/[[...slug]]/page.tsx` |

The compile behind the second glob is done by the bundler, via `helpDocsMdxPlugin()` from
`user-help-docs/vite`. **A host app has to register that plugin in its Vite config and in
its Vitest config**, or `source.ts` throws at module scope with a message saying so.

Compiling per request instead — which is what this package used to do, through
`@fumadocs/mdx-remote`'s `createCompiler()` — cannot work on a Worker: its renderer
instantiates the compiled module with `new AsyncFunction(...)`, and workerd refuses to
generate code from strings:

```
EvalError: Code generation from strings disallowed for this context
```

Every `/docs` request 500'd on that, in production only, while Node-hosted tests stayed
green. `test/docs.test.ts` now guards it — nothing under `src/` (except `vite.ts`, which
is bundler-side) may import `@fumadocs/mdx-remote` or construct a `Function`.

The remaining consequences: no codegen step for the host to wire up, but the bundler
**must** support `import.meta.glob` (Vite/vinext), and pages carry no pre-computed
structured data, which is why `src/search.ts` runs `structure()` over the raw body at
index time.

## Content

`content/docs/`: `index`, `quickstart`, `features`, `search`, `chat`, `reader`,
`reason-editor`, `api`, `mcp-server`, `browser-extension`, `desktop-app`,
`vscode-extension`, `self-hosting`, `comparison`, `faq`, `packages`, plus
`architecture/` and `meta.json`.

**Add a page**: drop `content/docs/<name>.mdx` with `title` and `description`
frontmatter, then add its slug to `meta.json` — ordering comes from `meta.json`, not the
filesystem.

## Exports

| Subpath | Purpose |
| --- | --- |
| `.` | `source` (the Fumadocs loader), `HelpDocPage`, `HelpDocPageData` |
| `./config` | `docsConfig` — title, description, `baseUrl`, GitHub links, `githubEdit`, `searchApi`, favicon, `topLinks` |
| `./vite` | `helpDocsMdxPlugin()` — the build-time MDX compile the host registers |
| `./search` | `searchServer` for the host's search route |
| `./llms` | `getMarkdownUrl`, `getGithubUrl`, `parseMarkdownSlug`, `getMarkdownParams`, `getLLMText`, `getLLMFullText` |
| `./layout.config`, `./mdx-components` | Docs chrome and MDX component map |
| `./components/docs-actions`, `./components/breadcrumb`, `./components/theme-dropdown` | Individual chrome components |

Every subpath maps to **`src/*.ts(x)` source**, not a build output — this package has no
`build` script, only `type-check` and `test`.

## Recipes

**Plain-text views for LLMs.** `getMarkdownUrl(page)` yields `/docs/llms.mdx/<path>.mdx`
— the trailing extension is what makes a copied or downloaded file land as Markdown.
`parseMarkdownSlug` is its inverse (both `undefined` and `['index']` mean the root),
`getMarkdownParams()` feeds `generateStaticParams`, and `getLLMFullText()` produces
`${baseUrl}/llms-full.txt`.

**Search.** Mount `searchServer` at the route named by `docsConfig.searchApi`; the
client-side search UI points there.

**Rebranding.** Everything the chrome needs is in `docsConfig` — `title`, `description`,
`baseUrl` (no trailing slash), `github`, `githubDocs`, `githubPackages`, `githubEdit`
(`{ owner, repo, sha, pathPrefix }` for the per-page "Edit on GitHub" link), `searchApi`,
`favicon`, `topLinks`.

## Troubleshooting

| Symptom | Cause → fix |
| --- | --- |
| A new page 404s | It is not in `meta.json`. |
| Pages appear in the wrong order | Same — `meta.json` is the order, not the filesystem. |
| `/docs` builds but every route in its chunk 500s at runtime | Something reintroduced a filesystem or `import.meta.url` read at module scope. Content must stay inlined via `import.meta.glob`. |
| `/docs` 500s only once deployed, with `EvalError: Code generation from strings disallowed for this context` | Something compiles MDX at request time again. Workers forbid `new Function`; compile in the bundler instead. |
| `No compiled module for "<file>"` at startup | The host's Vite or Vitest config is missing `helpDocsMdxPlugin()`. |
| The app build fails with `Unexpected \`FunctionDeclaration\` in code: only import/exports are supported`, once per page | Two MDX plugins in the chain. vinext auto-injects its own unless it sees a plugin named `@mdx-js/rollup` (or `mdx`), so `helpDocsMdxPlugin()` must keep that name. |
| A page renders its own frontmatter as body text | `remarkFrontmatter` fell out of `helpDocsMdxPlugin`. |
| `import.meta.glob is not a function` | The host's bundler does not support it. This package assumes Vite/vinext. |
| Search returns nothing | `structuredData` is computed by `structure()` at index time; a page whose body failed to compile indexes empty. Also check the route matches `docsConfig.searchApi`. |
| "Edit on GitHub" points at the wrong file | `githubEdit.pathPrefix` doubles as `CONTENT_ROOT` for `absolutePath`; moving `content/docs` means updating it. |
| `llms.mdx` URLs 404 | The route must use `parseMarkdownSlug` to strip the `.mdx` and map `index` back to the root. |
| Importing it from a non-Next host fails | `next`, `react` and `react-dom` are peers, and the chrome components are Next-flavoured. |
