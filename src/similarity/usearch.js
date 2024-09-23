import usearch from 'usearch';
import { getEmbeddingModel,
    convertTextToEmbedding,
    addEmbeddingVectorsToIndex,
 } from './similarity-vector.js';

 /// https://i.imgur.com/rQKDTRB.png
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
    index.add(BigInt(i), new Float32Array(documentVectors[i]));
    // labels.push(label);
  }

  return { index, labels };
}

async function searchVectorIndex(index, query, options = {}) {
  const { numNeighbors = 5, pipeline } = options;

  // Convert query to embedding vector
  var queryVector = await convertTextToEmbedding(query, { pipeline });

  queryVector = new Float32Array(queryVector)


    const results = index.search(queryVector, 2);

    console.log(results);

    // Format results to match the expected output
    const formattedResults = [];
    for (let i = 0; i < results.keys.length; i++) {
      formattedResults.push({
        id: Number(results.keys[i]),
        distance: results.distances[i],
      });
    }
    return formattedResults;
}

async function exportEmbeddingsIndex(index, dimensions, maxElements) {
  // Placeholder function for exporting index
  // return Buffer.from(index.data()).toString('base64');
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

  console.log(322)

  // index.save('index.usearch'); // Save the index to a file

  console.log(`Index created with ${index.size()} elements`);

  const result = await searchVectorIndex(index, 
    query, { pipeline, numNeighbors: 5 });
  console.log(result);

  // const base64 = await exportEmbeddingsIndex(index, 384, 100000);
  // console.log(base64);
}

main().catch(console.error);