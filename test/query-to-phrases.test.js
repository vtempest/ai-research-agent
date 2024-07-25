import { test, expect } from "vitest";
import queryPhraseTokenizer, {
  calculatePhraseSpecificity,
} from "../src/search/phrase-tokenizer";
import fs from "fs";

var queries = JSON.parse(
  fs.readFileSync("./data/quora-queries-15k.json", "utf8")
);

// var queries = ["what is  albert einstein's favorite programming language?"];

test("query to keyphrases", async () => {
  var random = Math.floor(Math.random() * 15000);

  for (var q of queries.slice(random, random + 100)) {
    //example usage
    var result = queryPhraseTokenizer(q);

    var str = result
      .map(
        (r) =>
          r.full +
          (r.p === 0 ? " (n)" : "") +
          (r.full.includes(" ") ? " (Phrase)" : "") +
          " " +
          (r.w ? "(Wiki: " + r.w + ")" : "")
      )
      .join("  ");
    console.log(str);

    //average the .u values
    var u_avg = calculatePhraseSpecificity(q);
    console.log(u_avg);
  }

  expect(result).toBeDefined();
});
