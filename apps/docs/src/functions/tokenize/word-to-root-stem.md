[Documentation](../modules.md) / tokenize/word-to-root-stem

## Topics

### stemWordToRoot()

```ts
function stemWordToRoot(word: string): string;
```

Defined in: [packages/ai-research-agent/src/tokenize/word-to-root-stem.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/tokenize/word-to-root-stem.js#L12)

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
