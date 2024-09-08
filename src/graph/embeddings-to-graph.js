import { UMAP } from "umap-js/lib/umap-js";
import { HierarchicalNSW } from "hnswlib-node";
import { pipeline } from "@huggingface/transformers";

/**
 * @typedef {Object} PlotDataPoint
 * @property {number} x - The x-coordinate in the UMAP plot.
 * @property {number} y - The y-coordinate in the UMAP plot.
 * @property {string} label - The label associated with this data point.
 */

/**
 * Converts embeddings to UMAP coordinates.
 * 
 * [Understanding UMAP](https://pair-code.github.io/understanding-umap/) <br>
 * [UMAP Algorithm Overview](https://www.youtube.com/watch?v=VPq4Ktf2zJ4)
 * @param {Object.<string, number[]>} embeddingsDict - The dictionary of embeddings.
 * @param {Object} [options]
 * @param {number} options.numberDimensions [default=2] - The number of dimensions for UMAP output.
 * @param {number} options.numberNeighbors [default=15] - The number of nearest neighbors for UMAP.
 * @param {number} options.numberDistance [default=0.1] - The minimum distance parameter for UMAP.
 * @returns {Promise<PlotDataPoint[]>} An array of plot data points.
 * @author [McInnes, L. et al (2018)](https://arxiv.org/abs/1802.03426)
 */
export async function convertEmbeddingsToUMAP(embeddingsDict, options = {}) {
  const {
    numberDimensions = 2,
    numberNeighbors = 15,
    numberDistance = 0.1,
  } = options;

  const valuesArray = Object.values(embeddingsDict);

  const compressed_vectors = await new UMAP({
    nComponents: numberDimensions,
    nNeighbors: numberNeighbors,
    minDist: numberDistance,
  }).fitAsync(valuesArray);

  const originalKeys = Object.keys(embeddingsDict);

  let plotDataArray = [];
  for (let i = 0; i < originalKeys.length; i++) {
    let thisVec = compressed_vectors[i];

    plotDataArray.push({
      x: thisVec[0],
      y: thisVec[1],
      label: originalKeys[i],
    });
  }

  return plotDataArray;
}

// Calculate cosine similarity between two vectors
export function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Text embeddings convert words or phrases into numerical vectors in a high-dimensional
 * space, where each dimension represents a semantic feature extracted by a model like
 * MiniLM-L6-v2. In this concept space, words with similar meanings have vectors that
 * are close together, allowing for quantitative comparisons of semantic similarity.
 * These vector representations enable powerful applications in natural language processing,
 * including semantic search, text classification, and clustering, by leveraging the
 * geometric properties of the embedding space to capture and analyze the relationships
 * between words and concepts.
 * [Text Embeddings, Classification, and Semantic Search (Youtube)](https://www.youtube.com/watch?v=sNa_uiqSlJo&t=129s)
 *
 * <img src="https://i.imgur.com/wtJqEqX.png" width="350" /> <br />
 * @param {string} text - The text to embed.
 * @param {import("@huggingface/transformers").AutoTokenizer} pipeline - The pipeline to use for embedding.
 * @param {Object} [options]
 * @param {string} options.modelName default="Xenova/all-MiniLM-L6-v2" - The name of the model to use
 * @param {number} options.precision default=3 - The number of decimal places to round to.
 * @returns {Promise<{embeddingsDict: Object.<string, number[]>, embedding: number[]}>}
 */
export async function convertTextToEmbeddingVector(text, options = {}) {
  var {
    modelName = "Xenova/all-MiniLM-L6-v2",
    precision = 2,
    pipeline,
  } = options;

  if (!pipeline) pipeline = await getEmbeddingPipeline();

  const embedding = await pipeline(text, { pooling: "mean", normalize: true });
  // return embedding;
  const roundedEmbedding = Array.from(embedding.data).map((num) =>
    parseFloat(num.toFixed(precision))
  );
  return roundedEmbedding;
}

/**
 * Initialize HuggingFace Transformers pipeline for embedding text.
 * @returns {Promise<import("@huggingface/transformers").AutoTokenizer>} The pipeline.
 */
export async function getEmbeddingPipeline() {
  return await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
    quantized: true,
  });
}

/**
 * Generates vectors for a set of documents and creates an HNSW index using 
 * hnswlib-node WASM JS for efficient similarity search.
 * 
 * [ANN Benchmarks](https://ann-benchmarks.com)<br />  
 * [Pinecone - HNSW](https://www.pinecone.io/learn/series/faiss/hnsw/) <br /> 
 * [Wikipedia - HNSW](https://en.wikipedia.org/wiki/Hierarchical_navigable_small_world)
 * @param {string[]} documents - An array of document texts to be vectorized.
 * @param {Object} [options={}] - Optional parameters for vector generation and indexing.
 * @param {number} [options.numDimensions=384] - The length of data point vector that will be indexed.
 * @param {number} [options.maxElements=100] - The maximum number of data points.
 * @returns {Promise<HierarchicalNSW>} The created HNSW index.
 * @author [Malkov, Y. et al (2016)](https://arxiv.org/abs/1603.09320)
 */
export async function convertEmbeddingsToHNSW(documents, options = {}) {
  const {
    numDimensions = 384, // the length of data point vector that will be indexed.
    maxElements = 100, // the maximum number of data points.
    pipeline = 0,
  } = options;

  let documentVectors = [];
  for (let doc of documents) {
    documentVectors.push(await convertTextToEmbeddingVector(doc, { pipeline }));
  }

  // declaring and initializing index.
  const index = new HierarchicalNSW("cosine", numDimensions);
  index.initIndex(maxElements, 16, 200, 100);

  // inserting data points to index.
  for (let i = 0; i < documentVectors.length; i++) {
    index.addPoint(documentVectors[i], i);
  }

  return index;
}

export async function searchWithQuery(index, query, options = {}) {
  const { numNeighbors = 5, pipeline = 0 } = options;

  // preparing query data points.
  const queryVector = await convertTextToEmbeddingVector(query, { pipeline });

  // searching k-nearest neighbor data points.
  const result = index.searchKnn(queryVector, numNeighbors);

  return result;
}
/**
 * Retrieves all embeddings from the HNSW index.
 * @function getAllEmbeddings
 * @param {HierarchicalNSW} index - The HNSW index containing the embeddings.
 * @returns {Promise<number[][]>} A promise that resolves to an array of embedding vectors.
 */
export function getAllEmbeddings(index, precision = 3) {
  const ids = index.getIdsList();
  const vectors = [];
  for (let id of ids) {
    vectors.push(index.getPoint(id).toFixed(precision));
  }
  return vectors;
}
