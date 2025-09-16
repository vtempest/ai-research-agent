[neural-net-training](../modules.md) / vectorize/similarity-vector

## Other

### calculateCosineSimilarity()

```ts
function calculateCosineSimilarity(vectorA: number[], vectorB: number[]): number;
```

Defined in: [vectorize/similarity-vector.js:165](https://github.com/vtempest/ai-research-agent/tree/master/packages/neural-net/src/vectorize/similarity-vector.js#L165)

[Cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) gets similarity of two
vectors by whether they have the same direction (similar) or are poles apart. Cosine similarity
is often used with text representations to compare how similar two documents or sentences
are to each other. The output of cosine similarity ranges from -1 to 1, where -1 means the
two vectors are completely dissimilar, and 1 indicates maximum similarity.

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

`vectorA`

</td>
<td>

`number`[]

</td>
<td>

</td>
</tr>
<tr>
<td>

`vectorB`

</td>
<td>

`number`[]

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

-1 to 1 similarity score

## Similarity

### convertTextToEmbedding()

```ts
function convertTextToEmbedding(text: string, options?: object): Promise<{
  embedding: number[];
  embeddingsDict: {
  };
}>;
```

Defined in: [vectorize/similarity-vector.js:23](https://github.com/vtempest/ai-research-agent/tree/master/packages/neural-net/src/vectorize/similarity-vector.js#L23)

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

<img src="https://i.imgur.com/wtJqEqX.png" width="350" />

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

`options?`

</td>
<td>

\{ `pipeline`: `AutoTokenizer`; `precision`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.pipeline?`

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

`options.precision?`

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
  `embeddingsDict`: \{
  \};
\}&gt;

*

***

### getAllEmbeddings()

```ts
function getAllEmbeddings(index: HierarchicalNSW, precision: number): number[][];
```

Defined in: [vectorize/similarity-vector.js:145](https://github.com/vtempest/ai-research-agent/tree/master/packages/neural-net/src/vectorize/similarity-vector.js#L145)

Retrieves all embeddings from the HNSW index.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`index`

</td>
<td>

`HierarchicalNSW`

</td>
<td>

`undefined`

</td>
<td>

The HNSW index containing the embeddings.

</td>
</tr>
<tr>
<td>

`precision`

</td>
<td>

`number`

</td>
<td>

`8`

</td>
<td>

default=8 - The number of decimal places to round to.

</td>
</tr>
</tbody>
</table>

#### Returns

`number`[][]

An array of embedding vectors.
 *

***

### getEmbeddingModel()

```ts
function getEmbeddingModel(options?: object): Promise<AutoTokenizer>;
```

Defined in: [vectorize/similarity-vector.js:47](https://github.com/vtempest/ai-research-agent/tree/master/packages/neural-net/src/vectorize/similarity-vector.js#L47)

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

`options?`

</td>
<td>

\{ `modelName`: `string`; `pipelineName`: `string`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.modelName?`

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

`options.pipelineName?`

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

***

### searchVectorIndex()

```ts
function searchVectorIndex(
   index: HierarchicalNSW, 
   query: string, 
   options?: object): Promise<object[]>;
```

Defined in: [vectorize/similarity-vector.js:129](https://github.com/vtempest/ai-research-agent/tree/master/packages/neural-net/src/vectorize/similarity-vector.js#L129)

Searches the vector index for the nearest neighbors of a given query.

<img src="https://github.com/NJU-RINC/hnsw-visulize/blob/master/path.gif?raw=true" width="350px" />
<img src="https://i.imgur.com/ZAAfogK.png" width="350px" />

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

`index`

</td>
<td>

`HierarchicalNSW`

</td>
<td>

The HNSW index to search.

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

The query string to search for.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `numNeighbors?`: `number`; \}

</td>
<td>

Optional parameters for the search.

</td>
</tr>
<tr>
<td>

`options.numNeighbors?`

</td>
<td>

`number`

</td>
<td>

The number of nearest neighbors to return.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`object`[]&gt;

A promise that resolves to an array of nearest neighbors, each with an id and distance.

#### Throws

If there's an error during the search process.

#### Example

```ts
const index = await addEmbeddingVectorsToIndex(documentVectors);
const results = await searchVectorIndex(index, 'example query');
console.log(results); // [{id: 3, distance: 0.1}, {id: 7, distance: 0.2}, ...]
```

***

### weighRelevanceConceptVector()

```ts
function weighRelevanceConceptVector(
   documents: string[], 
   query: string, 
   options?: Object): Promise<object[]>;
```

Defined in: [vectorize/similarity-vector.js:186](https://github.com/vtempest/ai-research-agent/tree/master/packages/neural-net/src/vectorize/similarity-vector.js#L186)

Rerank documents's chunks based on relevance to query,
based on cosine similarity of their concept vectors generated
by a 20MB MiniLM transformer model downloaded locally.

[A Complete Overview of Word Embeddings](https://www.youtube.com/watch?v=5MaWmXwxFNQ&t=323s)

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

`documents`

</td>
<td>

`string`[]

</td>
<td>

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

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`Object`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`object`[]&gt;

*
