import { AutoTokenizer } from '@huggingface/transformers';
/**
 * Text embeddings convert words or phrases into numerical vectors in a high-dimensional
 * space, where each dimension represents a semantic feature extracted by a model like
 * MiniLM-L6-v2. In this concept space, words with similar meanings have vectors that
 * are close together, allowing for quantitative comparisons of semantic similarity.
 * These vector representations enable powerful applications in natural language processing,
 * including semantic search, text classification, and clustering, by leveraging the
 * geometric properties of the embedding space to capture and analyze the relationships
 * between words and concepts.
 * [Text Embeddings, Classification, and Semantic Search
 *  (Youtube)](https://www.youtube.com/watch?v=sNa_uiqSlJo&t=129s)
 *
 * <img src="https://i.imgur.com/wtJqEqX.png" width="350" />
 * @param {string} text - The text to embed.
 * @param {Object} [options]
 * @param {AutoTokenizer} options.pipeline
 *  - The pipeline to use for embedding.
 * @param {number} options.precision default=4 - The number of decimal places to round to.
 * @returns {Promise<{embeddingsDict: Object.<string, number[]>, embedding: number[]}>}
  * @category Similarity
  */
export function convertTextToEmbedding(text: string, options?: {
    pipeline: AutoTokenizer;
    precision: number;
}): Promise<{
    embeddingsDict: {
        [x: string]: number[];
    };
    embedding: number[];
}>;
/**
 * Initialize HuggingFace Transformers pipeline for embedding text.
 *
 * <img src="https://i.imgur.com/3R5Tsrf.png" width="350px" />
 * @param {Object} [options]
 * @param {string} options.pipelineName default "feature-extraction",
 * @param {string} options.modelName default="Xenova/all-MiniLM-L6-v2" -
 * The name of the model to use
 * @returns {Promise<import("@huggingface/transformers").AutoTokenizer>} The pipeline.
  * @category Similarity
  */
export function getEmbeddingModel(options?: {
    pipelineName: string;
    modelName: string;
}): Promise< AutoTokenizer>;
/**
 * ### VSEARCH: Vector Similarity Embedding Approximation in RAM-Limited Cluster Hierarchy
 * <img src="https://i.imgur.com/nvJ7fzO.png" width="350px" />
 *
 * 1. Compile hnswlib-node or NGT algorithm C++ to WASM JS for efficient similarity search.
 * 2. Vector index is split by K-means into regional clusters, each being a
 * specific size to fit in RAM. This is better than popular vector engines that
 *  require costly 100gb-RAM servers because they load all the vectors at once.
 * 3. Vectors for centroids of each cluster are stored in a list in SQL, each
 * cluster's binary quantized data is exported as base64 string to SQL, S3, etc.
 * 4. Search: Embed Query, Compare to each cluster centroid to pick top clusters,
 * download  base64 strings for those clusters, load each into WASM, find top neighbors
 * per cluster, merge results sorted by distance.
 *
 *
 * [NGT Algorithm](https://github.com/yahoojapan/NGT/wiki)
 * [NGT Cluster](https://github.com/yahoojapan/NGT/blob/main/lib/NGT/Clustering.h#L82)
 * https://qdrant.tech/articles/memory-consumption/
 [Lancedb](https://lancedb.com)
 [Usearch](https://unum-cloud.github.io/usearch/javascript/index.html)
  * [ANN Benchmarks](https://ann-benchmarks.com)
 *
 * ![Benchmark](https://ann-benchmarks.com/glove-100-angular_10_angular.png)
 * @param {string[]} documentVectors - An array of document texts to be vectorized.
 * @param {Object} [options={}] - Optional parameters for vector generation and indexing.
 * @param {number} [options.numDimensions=384] - The length of data point vector that will be indexed.
 * @param {number} [options.maxElements=100] - The maximum number of data points.
 * @author [Malkov et al. (2016)](https://arxiv.org/abs/1603.09320),
 * @returns {Promise<HierarchicalNSW>} The created HNSW index.
 * @category Similarity
 */
/**
 * Searches the vector index for the nearest neighbors of a given query.
 *
 * <img src="https://github.com/NJU-RINC/hnsw-visulize/blob/master/path.gif?raw=true" width="350px" />
 * <img src="https://i.imgur.com/ZAAfogK.png" width="350px" />
 * @param {HierarchicalNSW} index - The HNSW index to search.
 * @param {string} query - The query string to search for.
 * @param {Object} [options={}] - Optional parameters for the search.
 * @param {number} [options.numNeighbors=5] - The number of nearest neighbors to return.
 * @returns {Promise<Array<{id: number, distance: number}>>} A promise that resolves to an array of nearest neighbors, each with an id and distance.
 * @throws {Error} If there's an error during the search process.
 * @example
 * const index = await addEmbeddingVectorsToIndex(documentVectors);
 * const results = await searchVectorIndex(index, 'example query');
 * console.log(results); // [{id: 3, distance: 0.1}, {id: 7, distance: 0.2}, ...]
* @category Similarity
 */
export function searchVectorIndex(index: HierarchicalNSW, query: string, options?: {
    numNeighbors?: number | undefined;
}): Promise<Array<{
    id: number;
    distance: number;
}>>;
/**
 * Retrieves all embeddings from the HNSW index.
 * @param {HierarchicalNSW} index - The HNSW index containing the embeddings.
 * @param {number} precision default=8 - The number of decimal places to round to.
 * @returns {number[][]} An array of embedding vectors.
  * @category Similarity
 */
export function getAllEmbeddings(index: HierarchicalNSW, precision?: number): number[][];
/**
 * [Cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) gets similarity of two
 * vectors by whether they have the same direction (similar) or are poles apart. Cosine similarity
 * is often used with text representations to compare how similar two documents or sentences
 * are to each other. The output of cosine similarity ranges from -1 to 1, where -1 means the
 * two vectors are completely dissimilar, and 1 indicates maximum similarity.
 * @param {Array<number>} vectorA
 * @param {Array<number>} vectorB
 * @returns {number} -1 to 1 similarity score
 */
export function calculateCosineSimilarity(vectorA: Array<number>, vectorB: Array<number>): number;
/**
 * Rerank documents's chunks based on relevance to query,
 * based on cosine similarity of their concept vectors generated
 * by a 20MB MiniLM transformer model downloaded locally.
 *
 * [A Complete Overview of Word Embeddings](https://www.youtube.com/watch?v=5MaWmXwxFNQ&t=323s)
 * @param {Array<string>} documents
 * @param {string} query
 * @param {Object} [options]
 * @returns {Promise<Array<{content: string, similarity: number}>>}
  * @category Similarity
 */
export function weighRelevanceConceptVector(documents: Array<string>, query: string, options?: Object): Promise<Array<{
    content: string;
    similarity: number;
}>>;
