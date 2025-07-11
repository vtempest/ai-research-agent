[Documentation](../modules.md) / search/search-wikipedia

## Search

### searchWikipedia()

```ts
function searchWikipedia(query: string, options?: object): object;
```

Defined in: [packages/ai-research-agent/src/search/search-wikipedia.js:23](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/search/search-wikipedia.js#L23)

Function to query phrase in Wikipedia Search API and return 
page titles, images and first few sentences of each result. 
 Wikipedia Search API  has complex [documentation](https://www.mediawiki.org/wiki/API:Opensearch)
and is dificult to parse and clean up results.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`query`

</td>
<td>

`string`

</td>
<td>

search phrase

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `filterDisambiguation`: `boolean`; `images`: `boolean`; `imageSize`: `number`; `limitSearchResults`: `number`; `plainText`: `boolean`; `searchInTitleOnly`: `boolean`; `summarySentenceLimit`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.filterDisambiguation?`

</td>
<td>

`boolean`

</td>
<td>

default=true Filter disambiguation pages

</td>
</tr>
<tr>
<td>

`options.images?`

</td>
<td>

`boolean`

</td>
<td>

default=true Include image in results

</td>
</tr>
<tr>
<td>

`options.imageSize?`

</td>
<td>

`number`

</td>
<td>

default=200 Image size in pixels

</td>
</tr>
<tr>
<td>

`options.limitSearchResults?`

</td>
<td>

`number`

</td>
<td>

default=1 Limit number of search results

</td>
</tr>
<tr>
<td>

`options.plainText?`

</td>
<td>

`boolean`

</td>
<td>

default=false Return plain text instead of HTML

</td>
</tr>
<tr>
<td>

`options.searchInTitleOnly?`

</td>
<td>

`boolean`

</td>
<td>

default=false Search in title only

</td>
</tr>
<tr>
<td>

`options.summarySentenceLimit?`

</td>
<td>

`number`

</td>
<td>

default=3 Limit summary to this many sentences

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`results`

</td>
<td>

`object`[]

</td>
<td>

[packages/ai-research-agent/src/search/search-wikipedia.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/search/search-wikipedia.js#L19)

</td>
</tr>
</tbody>
</table>

#### Example

```ts
await searchWikipedia("JavaScript", { plainText: true })
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
