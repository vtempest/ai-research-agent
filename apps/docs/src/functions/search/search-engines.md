[Documentation](../modules.md) / search/search-engines

## Search

### searchEngines

```ts
const searchEngines: any[];
```

Defined in: [packages/ai-research-agent/src/search/search-engines.js:13](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/search/search-engines.js#L13)

A list of search engines which can be used to
search selected text. Each item in the list is
 an object with the following properties:
Categories: AI Web Search, Shopping Sites, and Social Media 

- `name`: The name of the search engine.
- `url`: The base search URL that should have the query appended.
- `icon`: A URL or data URL for the search engine. Prepend "data:image/png;base64,"
