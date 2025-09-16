[ai-research-agent](../modules.md) / tokenize/text-to-sentences

## Topics

### splitSentences()

```ts
function splitSentences(inputText: string, options?: object): string[];
```

Defined in: [src/tokenize/text-to-sentences.js:14](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/text-to-sentences.js#L14)

Splits text into sentences, handling 220+ common abbreviations,
and infering acronyms, numbers, URLs, times, names, etc.

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

`inputText`

</td>
<td>

`string`

</td>
<td>

The text to be split into sentences.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `maxSize`: `number`; `minSize`: `number`; `splitOnHtmlTags`: `boolean`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.maxSize?`

</td>
<td>

`number`

</td>
<td>

default=600 - Maximum size for a sentence.

</td>
</tr>
<tr>
<td>

`options.minSize?`

</td>
<td>

`number`

</td>
<td>

default=20 - Minimum size for a sentence.

</td>
</tr>
<tr>
<td>

`options.splitOnHtmlTags?`

</td>
<td>

`boolean`

</td>
<td>

default=true - Split on HTML tags like P, DIV, UL, OL.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`[]

An array of sentences.

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
