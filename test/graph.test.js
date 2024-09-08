import { test, expect, it } from "vitest";
import {convertEmbeddingsToHNSW, searchWithQuery, getAllEmbeddings,
  getEmbeddingPipeline,
  convertEmbeddingsIndexToBase64,
} from "../index.js"

test("hnsw", async () => {

  const  pipeline = await getEmbeddingPipeline();

    // Example usage:
    const documents = [
      "The quick brown fox jumps over the lazy dog",
      "Lorem ipsum dolor sit amet",
      "foxes are red",
      "foxes are not blue",
      "foxes like to hunt their prey",
    ];
    const query = "What does the fox eat?";

  const index = await convertEmbeddingsToHNSW(documents, {pipeline});
  const result = await searchWithQuery(index, query, {pipeline});
  console.log(result);
  
  const base64 = convertEmbeddingsIndexToBase64(index, 1536, 100000);
  console.log(base64);

  expect(result).toBeDefined();
});



