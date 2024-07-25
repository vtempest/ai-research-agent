import { test, expect } from "vitest";
import searchWikipedia from "../src/search-wiki-api/search-wikipedia.js";

test("search wiki", async () => {
  var result = await searchWikipedia("bm25 search", {
    plainText: false,
    summarySentenceLimit: 3,
    limitSearchResults: 3,
    images: true,
    imageSize: 200,
    searchInTitleOnly: 0,
    rerankByTitleSimilarity: 0,
    filterDisambiguation: 1,
  }); 
  console.log(result);

  expect(result.results[0].title).toBe("Okapi BM25");
});
