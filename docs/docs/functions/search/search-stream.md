[Documentation](../modules.md) / search/search-stream

## Search

### searchSTREAM()

```ts
function searchSTREAM(query: string, options?: object): Promise<any[]>;
```

Defined in: search/search-stream.js:34

### 🤖🔎 STREAM: Search with Top Result Extraction & Answer Model 
 <img width="350px"  src="https://i.imgur.com/l5AFrS0.png"  /> 

1. Searches the Web for the query via metasearch of major engines or custom data.<br />
2. Extracts text of top results using Tractor the Text Extractor.<br />
3. Implements SEEKTOPIC to extract Keyphrase Topics and Top Sentences that centralize those topics.<br />
4. Reranks document chunks based on relevance to the query, using embeddings to <br />
convert text to concept vectors within LLM "concept space", and calculates cosine similarity of query to topic. <br />
5. Uses a Research Agent prompt with key sentences from relevant sources to generate an answer via Groq 
 Llama, OpenAI, or Anthropic API, and suggests follow-up queries.

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

\{ `categoryIndex`: `number`; `customSearxngDomain`: `string`; `maxRetries`: `number`; `maxTopResultsToExtract`: `number`; `recencyIndex`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.categoryIndex?`

</td>
<td>

`number`

</td>
<td>

default=0 - Index of the search category.

</td>
</tr>
<tr>
<td>

`options.customSearxngDomain?`

</td>
<td>

`string`

</td>
<td>

default=null - Use your custom domain SearXNG

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

default=5 - Maximum number of retry attempts for the search.

</td>
</tr>
<tr>
<td>

`options.maxTopResultsToExtract?`

</td>
<td>

`number`

</td>
<td>

default=6 - Maximum number of top results to extract and analyze.

</td>
</tr>
<tr>
<td>

`options.recencyIndex?`

</td>
<td>

`number`

</td>
<td>

default=0 - Index representing the recency of results.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`[]&gt;

A promise that resolves to an array containing the search results, 
 extracted information, and generated answer.

#### Example

```ts
const advancedResults = await searchSTREAM('Latest developments in quantum computing', {
  categoryIndex: 2,
  recencyIndex: 1,
  maxRetries: 5,
  maxTopResultsToExtract: 10
});
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
