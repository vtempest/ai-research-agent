[ai-research-agent](../modules.md) / match/match-quasar

## Match

### matchQUASAR()

```ts
function matchQUASAR(document: string, query: string): boolean;
```

Defined in: [src/match/match-quasar.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/match/match-quasar.js#L19)

### QUASAR: Quotes-Unifying Alphanumeric Search-All RegExp 

Search document for all words of query ignoring casing
but "words in quotes" as necessarily together like users expect
in web search engines.  Single line function that can be used 
anywhere, such as UI inputs to filter a data list.

<img width="350px"  src="https://i.imgur.com/IuwW97p.png" />

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

`document`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
<tr>
<td>

`query`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

true if doc has all words and "phrases in quotes"

#### Example

```ts
var isFound = matchQUASAR(`Ask not what your country can do for you, 
ask what you can do for your country.  is nothing to fear but fear itself.`, 
` "Ask not" "but fear itself" nothing`) // returns true
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
