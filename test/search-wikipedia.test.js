import { test, expect } from "vitest";
import searchWikipedia from "../src/search-wikipedia.js";

test("search wiki", async () => {
  var result = await searchWikipedia("vimeo.com", {
    plainText: false,
    summarySentenceLimit: 3,
    limitSearchResults: 4,
    images: true,
    imageSize: 200,
    searchInTitleOnly: 0,
    rerankByTitleSimilarity: 1,
    filterDisambiguation: 1,
  });
  console.log(result);

  expect(result.results[0].title).toBe("Vimeo");
});
