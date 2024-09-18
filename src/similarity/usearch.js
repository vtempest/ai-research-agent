import usearch from 'usearch';
import { getEmbeddingModel,
    convertTextToEmbedding,
    convertEmbeddingsToHNSW,
 } from './similarity-vector.js';

async function convertEmbeddingsToUSearch(documentVectors, options = {}) {
  const {
    numDimensions = 384,
    maxElements = 100,
    metric = 'cos',
    connectivity = 16,
  } = options;

  // Create and initialize the index
  const index = new usearch.Index({
    metric: metric,
    dimensions: numDimensions,
    connectivity: connectivity,
    maxElements: maxElements,
  });

  // Add vectors to the index
  const labels = [];
  for (let i = 0; i < documentVectors.length; i++) {
    const label = BigInt(i);
    index.add(label, new Float32Array(documentVectors[i]));
    labels.push(label);
  }

  return { index, labels };
}

async function searchVectorIndex(index, query, options = {}) {
  const { numNeighbors = 5, pipeline } = options;

  // Convert query to embedding vector
  var queryVector = await convertTextToEmbedding(query, { pipeline });

  queryVector = new Float32Array(queryVector)

  // console.log(queryVector);

  // Perform k-nearest neighbor search

  // try {

    const results = index.search(queryVector, 10);



    // Format results to match the expected output
    return results.map((result, i) => ({
      id: Number(result.key),

      distance: results.distances[i],
    }));
}

async function exportEmbeddingsIndex(index, dimensions, maxElements) {
  // Placeholder function for exporting index
  return Buffer.from(index.data()).toString('base64');
}

async function main() {
  const pipeline = await getEmbeddingModel();

  console.log(1);

  const documents = [
    "The quick brown fox jumps over the lazy dog",
    "Lorem ipsum dolor sit amet",
    "foxes are red",
    "foxes are not blue",
    "foxes like to hunt their prey",
  ];
  const query = "What does the fox eat?";

  let documentVectors = [];

  for (let doc of documents) {
    documentVectors.push(await convertTextToEmbedding(doc, { pipeline }));
  }

  const { index, labels } = await convertEmbeddingsToUSearch(documentVectors, {
    numDimensions: 384,
    maxElements: 100,
  });

  console.log(`Index created with ${index.size()} elements`);

  const result = await searchVectorIndex(index, query, { pipeline, numNeighbors: 5 });
  console.log(result);

  const base64 = await exportEmbeddingsIndex(index, 384, 100000);
  // console.log(base64);
}

main().catch(console.error);