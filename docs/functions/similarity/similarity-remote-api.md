[ai-research-agent](../modules.md) / similarity/similarity-remote-api

## Similarity

### weighRelevanceConceptVectorAPI()

```ts
function weighRelevanceConceptVectorAPI(
   source_sentence, 
   sentences, 
   options?): Promise<any>
```

Calculate the semantic similarity between one text and a list of
other sentences by comparing their embeddings.
https://huggingface.co/docs/api-inference/detailed_parameters#sentence-similarity-task

<img src="https://i.imgur.com/ex2UWnu.png" width="350px" />

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

`source_sentence`

</td>
<td>

`string`

</td>
<td>

The string that you wish to
compare the other strings with. This can be a phrase, sentence,
or longer passage, depending on the model being used.

</td>
</tr>
<tr>
<td>

`sentences`

</td>
<td>

`string`[]

</td>
<td>

A list of strings which will be compared
against the source_sentence.

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

\{ `HF_API_KEY`: `string`; `model`: `string`; \}

</td>
<td>

*

</td>
</tr>
<tr>
<td>

`options.HF_API_KEY`?

</td>
<td>

`string`

</td>
<td>

Required https://huggingface.co/settings/tokens

</td>
</tr>
<tr>
<td>

`options.model`?

</td>
<td>

`string`

</td>
<td>

default="sentence-transformers/all-MiniLM-L6-v2"

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

array of 0-1 similarity scores for each sentence
 *
