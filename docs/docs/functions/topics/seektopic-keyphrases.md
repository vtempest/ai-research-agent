[ai-research-agent](../index.md) / topics/seektopic-keyphrases

## Topics

### extractSEEKTOPIC()

```ts
function extractSEEKTOPIC(docText, options?): object
```

### 🔤📊 SEEKTOPIC: Summarization by Extracting Entities, Keyword Tokens, and Outline Phrases Important to Context 
Extracts unique, domain-specific key phrases from a document using noun 
n-grams and ranks sentences based on their centrality to the most frequently 
referenced key phrase concepts,  enabling efficient extraction of 
domain-specific content. This can be a first step to use key sentences or topics
to vectorize or fit more docs into context limit and visualize them in vector space.
1. Sentence Segmentation: Split the text into sentences, accounting for 
   common abbreviations, numbers, URLs, and other exceptions.
2. Tokenization and Phrase Extraction: Employ a Wiki Phrases tokenizer to 
   identify wiki topics, phrases, and nouns. This includes spell-checking 
   and root word verification using Porter Stemmer.
3. Noun N-gram Extraction: Generate noun edge-grams, allowing for stop words 
   in the middle (e.g., "state of the art").
4. Key Phrase Consolidation: Merge smaller n-grams that are subsets of 
   larger ones by comparing weights.
5. Domain Specificity Calculation: Determine named entities and phrase 
   domain specificity using WikiIDF. This rewards unique key phrases 
   specific to the document's field (e.g., "endocrinology" in medical texts 
   or "thou shall" in religious texts).
6. Key Phrase Filtering: Select top key phrases based on a combination of 
   frequency and word count.
7. Graph Construction: Create a double-ring weighted graph with key phrases 
   in the central ring and sentences in the outer ring. Assign weights to 
   links based on concept usage probability.
8. Sentence Weighting: Apply TextRank algorithm to weight sentences, 
   identifying those that centralize and connect key phrase concepts most 
   referenced by other sentences. This process, based on TextRank and 
   PageRank, includes random surfing and jumping to avoid loops.
9. Top Results Selection: Select top sentences and key phrases based on 
   overall weight and graph centrality, using either a fixed number or 
   percentage for larger documents.
10. Output Generation: Return top sentences (with associated key phrases) 
    and top key phrases (with associated sentences).
11. Dynamic Reranking: If a user interacts with a key phrase or if there's a 
    search query leading to the document, compare query similarity to key 
    phrases, heavily weight the most similar key phrase, and reapply 
    TextRank from step 8.

<video src="https://github.com/user-attachments/assets/73348d63-7671-4e20-8df9-29a13d5b0768" 
 width="550px" controls />

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

`docText`

</td>
<td>

`string`

</td>
<td>

input text to analyze

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

\{ `heavyWeightQuery`: `string`; `limitTopKeyphrases`: `number`; `limitTopSentences`: `number`; `maxWords`: `number`; `minKeyPhraseLength`: `number`; `minWordLength`: `number`; `minWords`: `number`; `phrasesModel`: `any`; `topKeyphrasesPercent`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.heavyWeightQuery`?

</td>
<td>

`string`

</td>
<td>

query to give heavy weight to

</td>
</tr>
<tr>
<td>

`options.limitTopKeyphrases`?

</td>
<td>

`number`

</td>
<td>

default=10 - maximum number of top keyphrases to return

</td>
</tr>
<tr>
<td>

`options.limitTopSentences`?

</td>
<td>

`number`

</td>
<td>

default=5 - maximum number of top sentences to return

</td>
</tr>
<tr>
<td>

`options.maxWords`?

</td>
<td>

`number`

</td>
<td>

default=5 - maximum words in a keyphrase

</td>
</tr>
<tr>
<td>

`options.minKeyPhraseLength`?

</td>
<td>

`number`

</td>
<td>

default=6 - minimum length of a keyphrase

</td>
</tr>
<tr>
<td>

`options.minWordLength`?

</td>
<td>

`number`

</td>
<td>

default=3 - minimum length of a word

</td>
</tr>
<tr>
<td>

`options.minWords`?

</td>
<td>

`number`

</td>
<td>

default=1 - minimum words in a keyphrase

</td>
</tr>
<tr>
<td>

`options.phrasesModel`?

</td>
<td>

`any`

</td>
<td>

phrases model

</td>
</tr>
<tr>
<td>

`options.topKeyphrasesPercent`?

</td>
<td>

`number`

</td>
<td>

default=0.2 - percentage of top keyphrases to consider

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `keyphrases` | `Object`[] |
| `sentences` | `string`[] |
| `topSentences` | `Object`[] |

#### Example

```ts
const result = extractSEEKTOPIC(testDoc, { phrasesModel, heavyWeightQuery: "self attention", limitTopSentences: 10});
  console.log(result.topSentences); // Array of top sentences with their keyphrases and weights
  console.log(result.keyphrases); // Array of top keyphrases with their weights and associated sentence indices
  console.log(result.sentences); // Array of all sentences in the input text
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
