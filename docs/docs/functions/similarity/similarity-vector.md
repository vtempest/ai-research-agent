[ai-research-agent](../index.md) / similarity/similarity-vector

## Other

### AutoTokenizer

```ts
type AutoTokenizer<>: AutoTokenizer;
```

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

***

### calculateCosineSimilarity()

```ts
function calculateCosineSimilarity(vectorA, vectorB): number
```

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

### addEmbeddingVectorsToIndex()

```ts
function addEmbeddingVectorsToIndex(documentVectors, options?): Promise<HierarchicalNSW>
```

### VSEARCH: Vector Similarity Embedding Approximation in RAM-Limited Cluster Hierarchy
<img src="https://i.imgur.com/nvJ7fzO.png" width="350px" />
 
1. Compile hnswlib-node or NGT algorithm C++ to WASM JS for efficient similarity search.
2. Vector index is split by K-means into regional clusters, each being a
specific size to fit in RAM. This is better than popular vector engines that
 require costly 100gb-RAM servers because they load all the vectors at once. 
3. Vectors for centroids of each cluster are stored in a list in SQL, each
cluster's binary quantized data is exported as base64 string to SQL, S3, etc.
4. Search: Embed Query, Compare to each cluster centroid to pick top clusters,
download  base64 strings for those clusters, load each into WASM, find top neighbors 
per cluster, merge results sorted by distance.  

[NGT Algorithm](https://github.com/yahoojapan/NGT/wiki)
[NGT Cluster](https://github.com/yahoojapan/NGT/blob/main/lib/NGT/Clustering.h#L82)
https://qdrant.tech/articles/memory-consumption/ 
[Lancedb](https://lancedb.com)
[Usearch](https://unum-cloud.github.io/usearch/javascript/index.html)
 * [ANN Benchmarks](https://ann-benchmarks.com)

![Benchmark](https://ann-benchmarks.com/glove-100-angular_10_angular.png)

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

`documentVectors`

</td>
<td>

`string`[]

</td>
<td>

An array of document texts to be vectorized.

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

\{ `maxElements`: `number`; `numDimensions`: `number`; \}

</td>
<td>

Optional parameters for vector generation and indexing.

</td>
</tr>
<tr>
<td>

`options.maxElements`?

</td>
<td>

`number`

</td>
<td>

The maximum number of data points.

</td>
</tr>
<tr>
<td>

`options.numDimensions`?

</td>
<td>

`number`

</td>
<td>

The length of data point vector that will be indexed.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`HierarchicalNSW`&gt;

The created HNSW index.

#### Author

[Malkov et al. (2016)](https://arxiv.org/abs/1603.09320),

***

### convertTextToEmbedding()

```ts
function convertTextToEmbedding(text, options?): Promise<{
  embedding: number[];
  embeddingsDict: {};
 }>
```

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

### getAllEmbeddings()

```ts
function getAllEmbeddings(index, precision): number[][]
```

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

***

### searchVectorIndex()

```ts
function searchVectorIndex(
   index, 
   query, 
   options?): Promise<object[]>
```

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

`options`?

</td>
<td>

\{ `numNeighbors`: `number`; \}

</td>
<td>

Optional parameters for the search.

</td>
</tr>
<tr>
<td>

`options.numNeighbors`?

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
   documents, 
   query, 
   options?): Promise<object[]>
```

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

`options`?

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
