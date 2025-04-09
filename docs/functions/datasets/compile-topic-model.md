[ai-research-agent](../modules.md) / datasets/compile-topic-model

## Other

### weightWikiWordSpecificity()

```ts
function weightWikiWordSpecificity(query): number
```

Find domain-specific unique words for a single doc with BM25 formula
by using Wikipedia term frequencies as the common words corpus.
All words in English Wikipedia are sorted by number of pages they are in for 
325K words with frequencies of at least 32 wikipages, between 3 to 23 characters 
of Latin alphanumerics like az09, punctuation like .-, and diacritics like éï, 
but filtering out numbers and foreign language. <br />
<b>Total Terms (frequency>=32)</b>: 324896 <br />
<b>Filesize (JSON, frequency>=32)</b>: 4MB  <br />
<b>Total Articles (Wiki-en-2020)</b>: 5,989,879 <br /> <br />

 Galkin, M., Malykh, V. (2020). Wikipedia TF-IDF Dataset Release (v1.0). 
Zenodo. https://doi.org/10.5281/zenodo.3631674 https://github.com/SmartDataAnalytics/Wikipedia_TF_IDF_Dataset

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

phrase to search wiki-idf for each word

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

score for term specificity 0-12~

## Topics

### compileTopicModel()

```ts
function compileTopicModel(options?): Promise<void>
```

Compile a topic phrases model from a dictionary and Wikipedia page titles. <br />
Search and outline a research base using Wikipedia's 100k popular pages as the core topic 
phrases graph for LLM Research Agents. Most of the documents online (and by extension thinking 
in the collective conciousness) can revolve around core topic phrases linked as a graph.  
If all the available docs are nodes, the links in the graph can be extracted Wiki page entities 
and mappings of dictionary phrases to their wiki page. These can serve as topic labels, keywords, 
and suggestions for LLM followup questions. Documents can be linked in a graph with: <br />
1. wiki page entity recognition <br /> 2. frequent keyphrases <br /> 3. html links <br /> 
4. research paper references <br /> 5. keyphrases to query in global web search <br /> 6. site-specific recommendations. <br />
These can lay the foundation for LLM Research Agents to fully grok, summarize, and outline a research base.   <br /><br />
240K total words & phrases, first 117K first-word or single words to check every token against. 100K Wikipedia Page Titles and links - Wikipedia most popular pages titles. Also includes domain specificity score and what letters should be capital.<br />
84K  words and 67K phrases in dictionary lexicon  OpenEnglishWordNet, a better updated version of Wordnet - multiple definitions per term, 120k definitions, 45 concept categories<br />
JSON Prefix Trie  - arranged by sorting words and phrases for lookup by first word to tokenize by word, then find if it starts a phrase based on entries, for Phrase Extraction from a text. <br /> 
There is <a href="https://johnresig.com/blog/javascript-trie-performance-analysis/">"unanimous consensus"</a> that Prefix Trie <a href="https://github.com/daviddwlee84/LeetCode/blob/master/Notes/DataStructure/Trie_PrefixTree.md">O(1) lookups</a> (instead of having to loop through the index for each lookup) makes it the best data type for this task.

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

`options`?

</td>
<td>

\{ `addJSONLineBreaks`: `number`; `addWikiPageTitles`: `boolean`; `maxSynonymsPerTerm`: `number`; `minTermCharCount`: `number`; `sortInFirstTwoLettersTrie`: `boolean`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.addJSONLineBreaks`?

</td>
<td>

`number`

</td>
<td>

include line breaks in JSON output for debugging

</td>
</tr>
<tr>
<td>

`options.addWikiPageTitles`?

</td>
<td>

`boolean`

</td>
<td>

true to add wiki page titles, false for dictionary only

</td>
</tr>
<tr>
<td>

`options.maxSynonymsPerTerm`?

</td>
<td>

`number`

</td>
<td>

max synonyms per term

</td>
</tr>
<tr>
<td>

`options.minTermCharCount`?

</td>
<td>

`number`

</td>
<td>

min length of term to include

</td>
</tr>
<tr>
<td>

`options.sortInFirstTwoLettersTrie`?

</td>
<td>

`boolean`

</td>
<td>

sort the first words by first two letters Trie, needd for autocomplete after 2 letters typed

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`void`&gt;
