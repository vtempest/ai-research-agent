// import  { pipeline }  from  //"../../node_modules/@huggingface/transformers/dist/transformers.mjs";



// fill in indexedDB on backend
import {
  indexedDB,
  IDBCursor,
  IDBCursorWithValue,
  IDBDatabase,
  IDBFactory,
  IDBIndex,
  IDBKeyRange,
  IDBObjectStore,
  IDBOpenDBRequest,
  IDBRequest,
  IDBTransaction,
  IDBVersionChangeEvent,
} from "fake-indexeddb";

// polyfill indexedDB on backend
if (typeof window == "undefined") {
  var globalVar =
    typeof window !== "undefined"
      ? window
      : typeof WorkerGlobalScope !== "undefined"
      ? self
      : typeof global !== "undefined"
      ? global
      : Function("return this;")();

  globalVar.indexedDB = indexedDB;
  globalVar.IDBCursor = IDBCursor;
  globalVar.IDBCursorWithValue = IDBCursorWithValue;
  globalVar.IDBDatabase = IDBDatabase;
  globalVar.IDBFactory = IDBFactory;
  globalVar.IDBIndex = IDBIndex;
  globalVar.IDBKeyRange = IDBKeyRange;
  globalVar.IDBObjectStore = IDBObjectStore;
  globalVar.IDBOpenDBRequest = IDBOpenDBRequest;
  globalVar.IDBRequest = IDBRequest;
  globalVar.IDBTransaction = IDBTransaction;
  globalVar.IDBVersionChangeEvent = IDBVersionChangeEvent;
  globalVar.Window = globalVar;
  globalVar.self = globalVar;
}
import { loadHnswlib } from 'hnswlib-wasm/dist/hnswlib.js';


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
 * <img src="https://i.imgur.com/wtJqEqX.png" width="350" /> <br />
 * @param {string} text - The text to embed.
 * @param {Object} [options]
 * @param {import("@huggingface/transformers").AutoTokenizer} options.pipeline
 *  - The pipeline to use for embedding.
 * @param {number} options.precision default=3 - The number of decimal places to round to.
 * @returns {Promise<{embeddingsDict: Object.<string, number[]>, embedding: number[]}>}
 */
export async function convertTextToEmbedding(text, options = {}) {
  var { precision = 3, pipeline } = options;

  if (!pipeline) pipeline = await getEmbeddingModel();

  const embedding = await pipeline(text, { pooling: "mean", normalize: true });
  // return embedding;
  const roundedEmbedding = Array.from(embedding.data).map((num) =>
    parseFloat(num.toFixed(precision))
  );
  return roundedEmbedding;
}

/**
 * Initialize HuggingFace Transformers pipeline for embedding text.
 * @param {Object} [options]
 * @param {string} options.pipelineName default "feature-extraction",
 * @param {string} options.modelName default="Xenova/all-MiniLM-L6-v2" - 
 * The name of the model to use
 * @returns {Promise<import("@huggingface/transformers").AutoTokenizer>} The pipeline.
 */
export async function getEmbeddingModel(options = {}) {
  // const {pipeline} = await import("../../../transformers.js/dist/transformers")
  const {pipeline} = await import("@huggingface/transformers")
  const {
    pipelineName = "feature-extraction",
    modelName = "Xenova/all-MiniLM-L6-v2",
    quantized = true,
    gpu = false,
  } = options;
  
  return await pipeline(pipelineName, modelName, {
    quantized,
    dtype: "fp32",
    device: gpu ? "cuda" : "cpu",
  });
}

/**
 * Generates vectors for a set of documents and creates an HNSW index using
 * hnswlib-node WASM JS for efficient similarity search.
 *
 * "If AI is Humanity's Last Invention, then Vector Space is the Final Frontier."
 *
 * [ANN Benchmarks](https://ann-benchmarks.com)
 *
 * [Pinecone - HNSW](https://www.pinecone.io/learn/series/faiss/hnsw/)
 *
 * [Wikipedia - HNSW](https://en.wikipedia.org/wiki/Hierarchical_navigable_small_world)
 * @param {string[]} documentVectors - An array of document texts to be vectorized.
 * @param {Object} [options={}] - Optional parameters for vector generation and indexing.
 * @param {number} [options.numDimensions=384] - The length of data point vector that will be indexed.
 * @param {number} [options.maxElements=100] - The maximum number of data points.
 * @returns {Promise<HierarchicalNSW>} The created HNSW index.
 * @author [Malkov, Y. et al (2016)](https://arxiv.org/abs/1603.09320)
 */
export async function convertEmbeddingsToHNSW(documentVectors, options = {}) {
    const {
      numDimensions = 384, // the length of data point vector that will be indexed.
      maxElements = 100, // the maximum number of data points.
      m = 16,
      efConstruction = 200,
      efSearch = 100,
    } = options;
    // Load the hnswlib library
    const lib = await loadHnswlib();
    // Create and initialize the index
    const index = new lib.HierarchicalNSW('cosine', numDimensions, "a");
    index.initIndex(maxElements, m, efConstruction, efSearch);
    // Add points to the index
    const labels = index.addItems(documentVectors, true);
    return { index, labels };
  }

  export async function searchVectorIndex(index, query, options = {}) {
    const { numNeighbors = 5 } = options;
    // Convert query to embedding vector
    const queryVector = await convertTextToEmbedding(query);
    // Searching k-nearest neighbor data points
    const result = index.searchKnn(queryVector, numNeighbors, null);
    return result;
}

/**
 * Retrieves all embeddings from the HNSW index.
 * @param {HierarchicalNSW} index - The HNSW index containing the embeddings.
 * @param {number} [precision=3] - The number of decimal places to round to.
 * @returns {number[][]} An array of embedding vectors.
 */
export function getAllEmbeddings(index, precision = 3) {
  const numElements = index.getCurrentCount();
  const vectors = [];
  for (let i = 0; i < numElements; i++) {
    const vector = index.getPoint(i);
    vectors.push(vector.map((v) => Number(v.toFixed(precision))));
  }
  return vectors;
}

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
export function calculateCosineSimilarity(vectorA, vectorB) {
  return (
    vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0) /
    (Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0)) *
      Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0)))
  );
}

///OLDER ======================
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
 */
export async function weighRelevanceConceptVector(
  documents,
  query,
  options = {}
) {
  const docEmbeddings = await convertTextToEmbedding(documents, options);

  const queryEmbedding = await convertTextToEmbedding(query, options);

  let sortedDocs = docEmbeddings
    .map((docEmbedding, i) => ({
      index: i,
      similarity: calculateCosineSimilarity(queryEmbedding[0], docEmbedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .map(({ index, similarity }) => ({
      content: documents[index],
      similarity,
    }));

  return sortedDocs;
}




/**
 * Converts an HNSW index to a base64 encoded string.
 * 
 * @param {object} index - The HNSW index object.
 * @returns {Promise<string>} A promise that resolves to a base64 encoded string representation of the index.
 * @throws {Error} If there's an error during the index serialization process.
 */
export async function exportEmbeddingsIndex(index) {

  const lib = await loadHnswlib();

    const tmpFilePath = '/hnsw_tmp.dat';
    
    // Write the index to the temporary file in the Emscripten file system
    await index.writeIndex(tmpFilePath);
    
    // Synchronize the file system to ensure the file is written
    // await lib.EmscriptenFileSystemManager.syncFS(false, null); // Save data to the persistent source
    
    const databases = await indexedDB.databases();
    const dbName = databases[0].name;


    // Open the database
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });

    // Get the names of all object stores in the database
    const objectStoreNames = Array.from(db.objectStoreNames);
    
    if (objectStoreNames.length === 0) {
      return;
    }

    // Open a transaction and get the first object store
    const transaction = db.transaction(objectStoreNames[0], "readonly");
    const objectStore = transaction.objectStore(objectStoreNames[0]);

    // Retrieve all records from the object store
    const records = await new Promise((resolve, reject) => {
      const request = objectStore.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });

    
    var U8VectorIndex = records[0].contents;


    var dataStringIndex = JSON.stringify(Array.from(U8VectorIndex))
    
    return dataStringIndex;
    // Delete the temporary file
    // lib.EmscriptenFileSystemManager.unlink(tmpFilePath);
    
    // Convert the Uint8Array to a base64 string
    // const base64String = btoa(String.fromCharCode.apply(null, indexData));
    
    // return base64String;
  // } catch (error) {
  //   throw new Error(`Failed to serialize HNSW index: ${error.message}`);
  // }
}


/**
 * Imports an HNSW index from a string representation.
 * 
 * @param {string} indexString - The string representation of the HNSW index.
 * @param {number} dim - The dimensionality of the vectors in the index.
 * @param {string} space - The space type of the index (e.g., 'l2', 'ip', 'cosine').
 * @returns {Promise<object>} A promise that resolves to the imported HNSW index object.
 * @throws {Error} If there's an error during the index deserialization process.
 */
export async function importVectorIndexFromString(indexString, dim = 384, space = "cosine") {
 
  const lib = await loadHnswlib();
    
  // Sync the file system to ensure we have the latest data
  await lib.EmscriptenFileSystemManager.syncFS(true, null); // Read data from the persistent source
  
  const databases = await indexedDB.databases();
  const dbName = databases[0].name;

  // Open the database
  const db = await new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });

  // Get the names of all object stores in the database
  const objectStoreNames = Array.from(db.objectStoreNames);
  
  if (objectStoreNames.length === 0) {
    throw new Error('No object stores found in the database');
  }

  // Open a transaction and get the first object store
  const transaction = db.transaction(objectStoreNames[0], "readonly");
  const objectStore = transaction.objectStore(objectStoreNames[0]);

  // Retrieve all records from the object store
  const records = await new Promise((resolve, reject) => {
    const request = objectStore.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });

  if (records.length === 0) {
    throw new Error('No records found in the object store');
  }

  // Assume the index data is in the first record
  const indexData = records[0].contents;

  // Create a new HNSW index
  const index = new lib.HierarchicalNSW(space, dim);
  
  // Create a temporary file name
  const tempFileName = 'temp_index.dat';
  
  // Write the index data to a temporary file in the Emscripten file system
  lib.FS.writeFile(tempFileName, indexData);
  
  // Read the index from the temporary file
  await index.readIndex(tempFileName, maxElements, true);
  
  // Delete the temporary file
  lib.FS.unlink(tempFileName);
  
  return index;

}