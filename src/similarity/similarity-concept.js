
/**
 * Calculate the semantic similarity between one text and a list of 
 * other sentences by comparing their embeddings.
 * https://huggingface.co/docs/api-inference/detailed_parameters#sentence-similarity-task
 * 
 * @param {string} source_sentence The string that you wish to 
 * compare the other strings with. This can be a phrase, sentence, 
 * or longer passage, depending on the model being used.
 * @param {Array<string>} sentences A list of strings which will be compared 
 * against the source_sentence.
 * @param {object} options 
 * @param {string} options.model="sentence-transformers/all-MiniLM-L6-v2"  
 * @param {string} options.HF_API_KEY Required https://huggingface.co/settings/tokens
 * @returns array of 0-1 similarity scores for each sentence
 * @category Relevance 
*/
export async function weighRelevanceConceptVectorAPI(source_sentence, sentences, options={}) {
  var {
    model = "sentence-transformers/all-MiniLM-L6-v2",
    HF_API_KEY = 0
  } = options;
  
  if (!HF_API_KEY)
    return {error: "No API key"}

  const url = `https://api-inference.huggingface.co/models/${model}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: {
        source_sentence,
        sentences
      }
    })
  });

  if (!response.ok) {
    console.error("API request failed:", await response.text());
    return null;
  }

  return await response.json();
}


/**
 * Rerank documents's chunks based on relevance to query,
 * based on cosine similarity of their concept vectors generated
 * by a 20MB MiniLM transformer model downloaded locally.
 * "A Complete Overview of Word Embeddings" https://www.youtube.com/watch?v=5MaWmXwxFNQ&t=323s
 * @param {Array<string>} documents
 * @param {string} query
 * @param {Object} options
 * 
 * @returns {Promise<Array<{content: string, similarity: number}>>}
 * @category Relevance
 */
export async function weighRelevanceConceptVector(documents, query, options = {}) {
  const docEmbeddings = await vectorizeTextAsConcept(documents, options);

  const queryEmbedding = await vectorizeTextAsConcept(query, options);

  let sortedDocs = docEmbeddings
    .map((docEmbedding, i) => ({
      index: i,
      similarity: calculateCosineSimilarity(queryEmbedding[0], docEmbedding),
    }))
    .filter((sim) => sim.similarity > 0.5)
    .sort((a, b) => b.similarity - a.similarity)
    .map((sim) => ({
      content: documents[sim.index],
      similarity: sim.similarity,
    }));

  return sortedDocs;
}

/**
 * Convert text to concept vector int[] of length m, where
 * m is number of features extracted by MiniLM-L6-v2
 * and values are similar if words are similar by that feature 
 * within m-dimensional "concept space" 
 * @param {string|Array<string>} input
 * @param {Object} options
 * @returns {Promise<Array<Array<number>>>}
 * @category Relevance
*/
export async function vectorizeTextAsConcept(input, options = {}) {
  const { pipeline } =  await import("@xenova/transformers");

  const {
    batchSize = 512,
    modelName = "Xenova/all-MiniLM-L6-v2",
  } = options;

  const texts = Array.isArray(input) ? input : [input];
  const processedTexts = stripNewLines
    ? texts.map((t) => t.replace(/\n/g, " "))
    : texts;
  const batches = splitArrayToChunks(processedTexts, batchSize);

  const pipe = await pipeline("feature-extraction", modelName);

  const batchRequests = batches.map(async (batch) => {
    const output = await pipe(batch, { pooling: "mean", normalize: true });
    return output.tolist();
  });

  const batchResponses = await Promise.all(batchRequests);
  return batchResponses.flat();
}

/**
 * Split an array into chunks
 * @param {Array} array
 * @param {number} chunkSize
 * @returns {Array<Array>}
 * @private
 */
function splitArrayToChunks(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) 
    chunks.push(array.slice(i, i + chunkSize));
  return chunks;
}

/**
 * Cosine similarity is a way to measure how similar two vectors are. To simplify, it reflects 
 * whether the vectors have the same direction (similar) or are poles apart. Cosine similarity 
 * is often used with text representations to compare how similar two documents or sentences 
 * are to each other. The output of cosine similarity ranges from -1 to 1, where -1 means the 
 * two vectors are completely dissimilar, and 1 indicates maximum similarity.
 * https://en.wikipedia.org/wiki/Cosine_similarity
 * @param {Array<number>} vectorA
 * @param {Array<number>} vectorB
 * @returns {number} 0-1 similarity score
 * @category Relevance
 */
function calculateCosineSimilarity(vectorA, vectorB) {
  return (
    vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0) /
    (Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0)) *
      Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0)))
  );
}
