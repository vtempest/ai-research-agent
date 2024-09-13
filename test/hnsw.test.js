import { test, expect } from "vitest";
import {
  convertEmbeddingsToHNSW, 
  searchVectorIndex, getAllEmbeddings,
  getEmbeddingModel,
  exportEmbeddingsIndex,
  convertTextToEmbedding,
  importVectorIndexFromString
} from "../index.js"

test("hnsw", async () => {

  const  pipeline = await getEmbeddingModel();

  console.log(1)
    const documents = [
      "The quick brown fox jumps over the lazy dog",
      "Lorem ipsum dolor sit amet",
      "foxes are red",
      "foxes are not blue",
      "foxes like to hunt their prey",
    ];
    const query = "What does the fox eat?";


  let documentVectors = [];

  for (let doc of documents) 
    documentVectors.push(await convertTextToEmbedding(doc, { pipeline }));

  const {index} = await convertEmbeddingsToHNSW(documentVectors, {pipeline});

  const result = await searchVectorIndex(index, query, {pipeline});
  console.log(result);
  
  const base64 = await exportEmbeddingsIndex(index, 1536, 100000);
  // console.log(base64);

  // // var index2 = await importVectorIndexFromString(base64)


  // const result2 = await searchVectorIndex(index2, query, {pipeline});
  // console.log(result2);

  expect(result).toBeDefined();
}, 90000);



