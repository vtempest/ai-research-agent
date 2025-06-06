[Documentation](../modules.md) / topics/rank-sentences-keyphrases

## rankSentencesCentralToKeyphrase()

```ts
function rankSentencesCentralToKeyphrase(sentencesWithKeyphrases: any[], options: object): any[];
```

Defined in: topics/rank-sentences-keyphrases.js:20

Rank sentences based on their centrality to key phrases.
This function implements the TextRank algorithm to weight each sentence
based on the number of key phrases it shares with other sentences.
It creates a weighted graph where edges connect sentences to matching
keyphrases, then performs random walks to distribute probabilities.

<br /> 
1. Hongyang Zhao and Qiang Xie 2021 J. Phys.: Conf. Ser. 2078 012021
   "An Improved TextRank Multi-feature Fusion Algorithm For
   Keyword Extraction of Educational Resources"
   https://iopscience.iop.org/article/10.1088/1742-6596/2078/1/012021/pdf
<br />
2. Pan, S. et al (2019). "An improved TextRank keywords extraction algorithm"
   https://dl.acm.org/doi/10.1145/3321408.3326659
   https://doi.org/10.1145/3321408.3326659

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

`sentencesWithKeyphrases`

</td>
<td>

`any`[]

</td>
<td>

Array of objects, each containing (text, keyphrases)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

\{ \}

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

### Returns

`any`[]

Updated array with added weights: text, keyphrases, weight
