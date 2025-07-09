[Documentation](../modules.md) / topics/ngrams

## extractNounEdgeGrams()

```ts
function extractNounEdgeGrams(
   nGramSize: number, 
   terms: (string | number)[][], 
   index: number, 
   nGrams: object, 
   minWordLength: number, 
   sentenceNumber: number): object;
```

Defined in: [packages/ai-research-agent/src/topics/ngrams.js:27](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/topics/ngrams.js#L27)

Extracts noun-based edge grams from a given set of terms. This function is crucial
for identifying important multi-word concepts in the text.

The function looks for sequences of words (n-grams) that:
1. Start and end with a noun
2. Contain words that are either nouns or common ignored words (like articles or prepositions)
3. Meet the minimum word length requirement

### Parameters

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

`nGramSize`

</td>
<td>

`number`

</td>
<td>

The size of the n-grams to extract. For example, 2 for bigrams, 3 for trigrams, etc.

</td>
</tr>
<tr>
<td>

`terms`

</td>
<td>

(`string` \| `number`)[][]

</td>
<td>

Array of terms, where each term is an array containing the word and its part of speech tag.
                                             Example: [["The", 1], ["quick", 2], ["brown", 2], ["fox", 3]]

</td>
</tr>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
<td>

The starting index in the terms array to begin extraction. This allows for sliding window extraction.

</td>
</tr>
<tr>
<td>

`nGrams`

</td>
<td>

\{ \}

</td>
<td>

Object to store the extracted n-grams.

</td>
</tr>
<tr>
<td>

`minWordLength`

</td>
<td>

`number`

</td>
<td>

The minimum length a word should have to be considered in the n-gram.

</td>
</tr>
<tr>
<td>

`sentenceNumber`

</td>
<td>

`number`

</td>
<td>

The current sentence number being processed. Used to track which sentences contain the n-gram.

</td>
</tr>
</tbody>
</table>

### Returns

`object`

The updated nGrams object with newly extracted n-grams.

### Example

```ts
let terms = [["The", 1], ["quick", 2], ["brown", 2], ["fox", 3], ["jumps", 4]];
let nGrams = {};
extractNounEdgeGrams(3, terms, 0, nGrams, 3, 1);
// nGrams might now contain: {3: {"brown fox jumps": [1]}}
```
