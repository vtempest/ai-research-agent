[Documentation](../modules.md) / search/search-web

## Search

### searchWeb()

```ts
function searchWeb(query: string, options?: object): Promise<object[]>;
```

Defined in: search/search-web.js:37

Search Web via SearXNG metasearch of all major search engines.
Options are 10 search categories, recency, and how many
times to retry other domains if first time fails.
SearXNG is a free internet metasearch engine which aggregates results from
 more than [180+ search sources](https://docs.searxng.org/user/configured_engines.html).

[Searxng Overview](https://medium.com/@elmo92/search-in-peace-with-searxng-an-alternative-search-engine-that-keeps-your-searches-private-accd8cddd6fc)
[Searxng Installation Guide](https://github.com/searxng/searxng-docker/tree/master)

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

The search query string.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `category`: `string`; `lang`: `string`; `maxRetries`: `number`; `page`: `number`; `privateSearxng`: `string` \| `boolean`; `proxy`: `string`; `recency`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.category?`

</td>
<td>

`string`

</td>
<td>

default=general - ["general", "news", "videos", "images",
 "science","it", "files", "social+media",  "map", "music"]

</td>
</tr>
<tr>
<td>

`options.lang?`

</td>
<td>

`string`

</td>
<td>

default="en-US" - The language to use for the search.

</td>
</tr>
<tr>
<td>

`options.maxRetries?`

</td>
<td>

`number`

</td>
<td>

default=3 - Maximum number of retry attempts if the initial search fails.

</td>
</tr>
<tr>
<td>

`options.page?`

</td>
<td>

`number`

</td>
<td>

default=1 - The page number to retrieve.

</td>
</tr>
<tr>
<td>

`options.privateSearxng?`

</td>
<td>

`string` \| `boolean`

</td>
<td>

default=null - Use your custom domain SearXNG

</td>
</tr>
<tr>
<td>

`options.proxy?`

</td>
<td>

`string`

</td>
<td>

default=false - Use corsproxy.io to access in frontend JS

</td>
</tr>
<tr>
<td>

`options.recency?`

</td>
<td>

`number`

</td>
<td>

default=0 - ["", "day", "week", "month", "year"]

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`object`[]&gt;

An array of search result objects.

#### Example

```ts
const advancedResults = await searchWeb('Node.js', {
  category: 2,
  recency: 1,
  maxRetries: 5
});
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
[Heiser, M., Tauber, A., Flament, A., et al. (2014-)](https://github.com/searxng/searxng/graphs/contributors)
