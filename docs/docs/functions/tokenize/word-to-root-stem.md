[ai-research-agent](../index.md) / tokenize/word-to-root-stem

## Topics

### stemWordToRoot()

```ts
function stemWordToRoot(word): string
```

Stems a word using the <a
href="https://snowballstem.org/algorithms/porter/stemmer.html">Porter
 Stemmer</a> for removing  inflectional endings like "ing", "ist", "ize".

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

`word`

</td>
<td>

`string`

</td>
<td>

The word to be stemmed

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

- The stemmed word

#### Author

[Porter, M. (1980)](https://tartarus.org/martin/PorterStemmer/)

#### Example

```ts
var rootWord = stemWordToRoot("running"); // returns "run"
```
