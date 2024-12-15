[ai-research-agent](../index.md) / similarity/usearch

## Similarity

### convertTextToEmbedding()

```ts
function convertTextToEmbedding(text, options?): Promise<{
  embedding: number[];
  embeddingsDict: {};
 }>
```

<img src="https://i.imgur.com/wtJqEqX.png" width="350" /> 
Text embeddings convert words or phrases into numerical vectors in a high-dimensional
space, where each dimension represents a semantic feature extracted by a model like
MiniLM-L6-v2. In this concept space, words with similar meanings have vectors that
are close together, allowing for quantitative comparisons of semantic similarity.
These vector representations enable powerful applications in natural language processing,
including semantic search, text classification, and clustering, by leveraging the
geometric properties of the embedding space to capture and analyze the relationships
between words and concepts.
[Text Embeddings, Classification, and Semantic Search
 (Youtube)](https://www.youtube.com/watch?v=sNa_uiqSlJo&t=129s)

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

`text`

</td>
<td>

`string`

</td>
<td>

The text to embed.

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

\{ `pipeline`: `AutoTokenizer`; `precision`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.pipeline`?

</td>
<td>

`AutoTokenizer`

</td>
<td>

The pipeline to use for embedding.

</td>
</tr>
<tr>
<td>

`options.precision`?

</td>
<td>

`number`

</td>
<td>

default=4 - The number of decimal places to round to.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;\{
  `embedding`: `number`[];
  `embeddingsDict`: \{\};
 \}&gt;

*

***

### getEmbeddingModel()

```ts
function getEmbeddingModel(options?): Promise<AutoTokenizer>
```

Initialize HuggingFace Transformers pipeline for embedding text.

<img src="https://i.imgur.com/3R5Tsrf.png" width="350px" />

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

\{ `modelName`: `string`; `pipelineName`: `string`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.modelName`?

</td>
<td>

`string`

</td>
<td>

default="Xenova/all-MiniLM-L6-v2" - 
The name of the model to use

</td>
</tr>
<tr>
<td>

`options.pipelineName`?

</td>
<td>

`string`

</td>
<td>

default "feature-extraction",

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`AutoTokenizer`&gt;

The pipeline.
 *
