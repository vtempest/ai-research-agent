import usearch from "usearch";
import {
  getEmbeddingModel,
  convertTextToEmbedding,
  addEmbeddingVectorsToIndex,
} from "./similarity-vector.js";

// Main implementation
async function convertEmbeddingsToUSearch(documentVectors, options = {}) {
  return { index, labels };
}

async function searchVectorIndex(index, query, options = {}) {
  const { numNeighbors = 5, pipeline } = options;

  var queryVector = await convertTextToEmbedding(query, { pipeline });
  // console.log(JSON.stringify(Array.from(queryVector)))

  queryVector = new Float32Array(queryVector);

  const results = await index.search(queryVector, numNeighbors);
  const resultJson = Array.from(results.keys || [])
    .map((key, index) => ({
      key: Number(key),
      distance: results.distances[index],
    }))
    .sort((a, b) => a.distance - b.distance);

  return resultJson;
}

import fs from "fs";
// Example usage
async function main() {
  const pipeline = await getEmbeddingModel();

  const documents = [
    {
      id: 0,
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    },
    {
      id: 1,
      text: "The only way to achieve true innovation is to embrace uncertainty with an open mind.",
    },
    {
      id: 2,
      text: "Life is like riding a bicycle. To keep your balance, you must keep moving forward.",
    },
    {
      id: 3,
      text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    },
    {
      id: 4,
      text: "Leadership is not about being in charge. Leadership is about taking care of those in your charge.",
    },
    {
      id: 6,
      text: "Every challenge is an opportunity in disguise, waiting to be discovered.",
    },
    {
      id: 7,
      text: "In the midst of chaos, there is also opportunity for growth and transformation.",
    },
    {
      id: 8,
      text: "The journey of a thousand miles begins with a single step forward.",
    },
    {
      id: 9,
      text: "Knowledge speaks, but wisdom listens and learns from every experience.",
    },
    {
      id: 10,
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    },
  ];
  const query = "when to plant a tree";
  // Convert documents to vectors
  const documentVectors = await Promise.all(
    documents.map((doc) => convertTextToEmbedding(doc.text, { pipeline }))
  );

  const numDimensions = 384,
    maxElements = 100,
    metric = "cos",
    connectivity = 3;
  const index = new usearch.Index({
    metric: "cos", // USearch supports 'cos' and 'l2'
    dimensions: numDimensions,
    connectivity: connectivity,
    // quantization: "f32"  // Disable quantization for exact search
  });

  // Add vectors to index
  const labels = [];
  for (let i = 0; i < documentVectors.length; i++) {
    index.add(BigInt(i), new Float32Array(documentVectors[i]));
    labels.push(i);
  }

  console.log(`Index created with ${documentVectors.length} elements`);
  index.a;
  index.save("./vectors.bin");
  var content = fs.readFileSync("./vectors.bin");
  const base64String = Buffer.from(content).toString("base64");
  console.log(base64String);

  // Search
  const results = await searchVectorIndex(index, query, {
    pipeline,
    numNeighbors: 5,
  });

  // Display results
  console.log(results);
}

// Execute if running directly
main().catch(console.error);
