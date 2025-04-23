[Documentation](../modules.md) / tokenize/suggest-complete-word

## Topics

### suggestNextWordCompletions()

```ts
function suggestNextWordCompletions(query: string, options?: object): Promise<any[]>;
```

Defined in: tokenize/suggest-complete-word.js:33

### Autocomplete Topic Phrase Completions
<img width="350px"  src="https://i.imgur.com/0k5mO76.png" /> 

Completes the query with the most likely next words for phrases.
If typing 2+ letters of a word, returns all possible words matching those few letters.

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

The input query which can be pertial words or phrases.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `limitMaxResults`: `number`; `numberOfLastWordsToCheck`: `number`; `phrasesModel`: `any`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.limitMaxResults?`

</td>
<td>

`number`

</td>
<td>

default=10 - The maximum number of autocomplete suggestions to return.

</td>
</tr>
<tr>
<td>

`options.numberOfLastWordsToCheck?`

</td>
<td>

`number`

</td>
<td>

default=5 - The number of last words in the query to check for phrase completions.

</td>
</tr>
<tr>
<td>

`options.phrasesModel?`

</td>
<td>

`any`

</td>
<td>

A custom phrases model to use for autocomplete suggestions.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`[]&gt;

An array of autocomplete suggestions, each containing either a 'phrase' or 'word' property.

#### Examples

```ts
// Basic usage
const suggestions = await suggestNextWordCompletions("self att");
// Possible output: [{ phrase: "self attention" }, { phrase: "self attract" }, { phrase: "self attack" }]
```

```ts
// Using options
const customModel = await import("./custom-phrases-model.json");
const suggestions = await suggestNextWordCompletions("artificial int", {
  phrasesModel: customModel,
  limitMaxResults: 5,
  numberOfLastWordsToCheck: 3
});
// Possible output: [{ phrase: "artificial intelligence" }, { phrase: "artificial interpretation" }]
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
