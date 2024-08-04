const { pipeline } = await import("@xenova/transformers");


export async function vectorizeTextAsConceptAPI(source_sentence, sentences, model, apiKey) {
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
 * by a MiniLM transformer model.
 *
 * @param {Array<string>} documents
 * @param {string} query
 * @param {Object} config
 * @returns {Promise<Array<{content: string, similarity: number}>>}
 */
export async function weighRelevanceConceptVector(documents, query, config = {}) {
  const docEmbeddings = await vectorizeTextAsConcept(documents, config);

  const queryEmbedding = await vectorizeTextAsConcept(query, config);

  let sortedDocs = docEmbeddings
    .map((docEmbedding, i) => ({
      index: i,
      similarity: calculateCosineSimilarity(queryEmbedding[0], docEmbedding),
    }))
    .filter((sim) => sim.similarity > 0.5)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)
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
 * @param {Object} config
 * @returns {Promise<Array<Array<number>>>}
 */
export async function vectorizeTextAsConcept(input, config = {}) {
  const {
    batchSize = 512,
    stripNewLines = true,
    modelName = "Xenova/all-MiniLM-L6-v2",
  } = config;

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
 */
function splitArrayToChunks(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Cosine similarity is a measure of similarity between two vectors
 * in an inner product space. It determines the degree to 
 * which two vectors are pointing in the same direction by 
 * calculating the cosine of the angle between them. 
 * Cosine similarity is commonly used in text analysis 
 * to measure the similarity between documents based on 
 * the frequency of words or phrases they contain.
 * https://en.wikipedia.org/wiki/Cosine_similarity
 * @param {Array<number>} vecA
 * @param {Array<number>} vecB
 * @returns {number}
 */
function calculateCosineSimilarity(vecA, vecB) {
  return (
    vecA.reduce((sum, a, i) => sum + a * vecB[i], 0) /
    (Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0)) *
      Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0)))
  );
}
