[Documentation](../modules.md) / match/weigh-relevance-frequency

## Match

### weighRelevanceTermFrequency()

```ts
function weighRelevanceTermFrequency(
   document: string, 
   query: string, 
   options?: object): number;
```

Defined in: match/weigh-relevance-frequency.js:28

#### 📈📝 WRITEFAT: Weigh Relevance by Inference of Topics, Entities, and Frequency Averages for Terms
<img width="350px"  src="https://i.imgur.com/e2uTpoh.png" /> 

Calculate term specificity for a single doc with [BM25 
formula](https://www.youtube.com/watch?v=ruBm9WywevM) 
by using Wikipedia term frequencies as the baseline IDF. <br />

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

a single document to calculate the score for

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

phrase to search tf and idf for each word

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `avgDocWordCount`: `number`; `normalizeLength`: `number`; `saturationWeight`: `number`; `totalWikiPages`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.avgDocWordCount?`

</td>
<td>

`number`

</td>
<td>

Estimated average word count of all documents

</td>
</tr>
<tr>
<td>

`options.normalizeLength?`

</td>
<td>

`number`

</td>
<td>

normalizeLengthcontrols the document length normalization.
   It ranges from 0 to 1, with 0.75 being a common default value.
   When normalizeLength=1: Full length normalization is applied.
   Longer documents are penalized more heavily.

</td>
</tr>
<tr>
<td>

`options.saturationWeight?`

</td>
<td>

`number`

</td>
<td>

saturationWeight controls the impact of term frequency saturation.
   It typically ranges from 1.2 to 2.0, with 1.5 being a common default value.
   As saturationWeight increases: The impact of term frequency increases (i.e., multiple occurrences of a term in a document become more significant).

</td>
</tr>
<tr>
<td>

`options.totalWikiPages?`

</td>
<td>

`number`

</td>
<td>

Total number of Wikipedia pages used to calculate IDF

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

score for term specificity

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Other

### calculatePhraseSpecificity()

```ts
function calculatePhraseSpecificity(phrase: string, options: any): number;
```

Defined in: match/weigh-relevance-frequency.js:76

Calculate overall domain-speicificity after Query Resolution to Phrases. 
Words are tokenized into phrases and their specificity is calculated based on 
how many Wiki pages they appear in.

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

`phrase`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

domain specificity 0-12~
