import { describe, it, expect } from "vitest";

import  {weighRelevanceConceptVector,  vectorizeTextAsConcept,
  vectorizeTextAsConceptAPI} from "..";

describe("rerank similar conceptually with HF-llm", () => {
  it("LOCAL - rerank similar conceptually", async () => {
    // Example usage
    const documents = [
      "The quick brown fox jumps over the lazy dog",
      "Lorem ipsum dolor sit amet",
      "foxes are red",
      "foxes are not blue",
      "foxes eat hamsters",
      "JavaScript is a programming language",
    ];
    const query2 = "What does the fox say?";

    const sortedDocs = await weighRelevanceConceptVector(documents, query2);

    console.log("Most relevant documents:", sortedDocs);

    expect(typeof sortedDocs).toBe("object");
  }, 100000)

it("API - rerank similar conceptually", async () => {
  


  const apiKey = process.env.HF_API_KEY;
  const model = 'sentence-transformers/all-MiniLM-L6-v2';

  const sampleSentences = [
    "The quick brown fox jumps over the lazy dog.",
    "To be or not to be, that is the question.",
    "I think, therefore I am.",
    "All that glitters is not gold.",
    "Where there's a will, there's a way."
  ];

  let query3 = "What does the fox say?";


    let similarities = await vectorizeTextAsConceptAPI(query3, sampleSentences, model, apiKey);

    console.log(JSON.stringify(similarities, null, 2));

    
    let similarities2 = await vectorizeTextAsConcept(sampleSentences, model, apiKey);

    console.log(JSON.stringify(similarities2, null, 2));



  expect(typeof similarities).toBe("object");
}, 100000)

});
