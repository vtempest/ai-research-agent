[ai-research-agent](../index.md) / match/compare-letters

## Match

### weighSimilarityByCharacter()

```ts
function weighSimilarityByCharacter(s1, s2): number
```

### Jaro-Winkler String Similarity Comparison
<img width="350px"  src="https://i.imgur.com/1qpRzNh.png" /> 

Measures similarity between two strings, taking into account the common characters and
their positions. Jaro-Winkler is often used in record linkage and data cleansing to improve
the accuracy of string matching, particularly for names and addresses, by giving
more weight to the common prefix and penalizing longer string differences.  It is [more 
optimal](https://medium.com/@appaloosastore/string-similarity-algorithms-compared-3f7b4d12f0ff) 
for words than [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance):
1. Edit operations: Levenshtein considers insertions, deletions, and substitutions, 
while Jaro focuses on transpositions.
2. Sensitivity to string length: Levenshtein is more sensitive to overall 
string length, while Jaro normalizes for length in its formula.
3. Prefix matching: The Jaro-Winkler variant explicitly rewards matching 
prefixes, which Levenshtein does not.
4. Scale of results: Levenshtein produces an edit distance (usually converted to a similarity score), 
while Jaro directly produces a similarity score.

[A Comprehensive List of Similarity Search 
Algorithms](https://crucialbits.com/blog/a-comprehensive-list-of-similarity-search-algorithms/)

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

`s1`

</td>
<td>

`string`

</td>
<td>

First string

</td>
</tr>
<tr>
<td>

`s2`

</td>
<td>

`string`

</td>
<td>

Second string

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

0-1 string similarity score

#### Author

[Jaro, M., Winkler, W. (1990)](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance)
