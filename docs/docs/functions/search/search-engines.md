[ai-research-agent](../index.md) / search/search-engines

## Search

### searchEngines

```ts
const searchEngines: Object[];
```

A list of search engines which can be used to search selected text.

Each item in the list is an object with the following properties:

- `name`: The name of the search engine.
- `url`: The base search URL that should have the query appended.
- `icon`: A URL or data URL of an SVG icon for the search engine. Prepend "data:image/png;base64,"
