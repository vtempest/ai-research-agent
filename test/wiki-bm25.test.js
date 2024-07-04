import { calculateWikiBM25 } from "../src/wiki-bm25.js";
import { test, expect } from "vitest";
import sampleNewsDocs from "./sample-data-news.js";

test("WikiBM25 - cancer", () => {
  const query = "cancer";

  var results = sampleNewsDocs
    .map((doc, index) => {
      var docText = doc.title + " " + doc.content;
      var score = calculateWikiBM25(query, docText);

      return { score, title: doc.title };
    })
    .sort((a, b) => b.score - a.score)
    .filter((doc) => doc.score > 0);

  expect(results[0].title).toBe(
    "New Cancer Treatment Shows Promise in Clinical Trials"
  );

  console.log(results);
});

test("WikiBM25 - climate change", () => {
  const query = "climate change"

  var results = sampleNewsDocs
    .map((doc, index) => {
      var docText = doc.title + " " + doc.content;
      var score = calculateWikiBM25(query, docText);

      return { score, title: doc.title };
    })
    .sort((a, b) => b.score - a.score)
    .filter((doc) => doc.score > 0);

    console.log(results);
  if (results.length)
    expect(results[0]?.title).toBe(
      "Global Climate Summit Ends with New Emissions Agreement"
);

});
