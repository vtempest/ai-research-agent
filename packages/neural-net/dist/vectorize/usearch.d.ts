import { AutoTokenizer } from '@huggingface/transformers';
export function searchVectorIndex(index: any, query: any, options?: {}): Promise<{
    key: number;
    distance: any;
}[]>;
/**
 * <img src="https://i.imgur.com/wtJqEqX.png" width="350" />
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
