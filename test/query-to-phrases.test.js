import { test, expect } from "vitest";
import queryPhraseTokenizer, {
  calculatePhraseSpecificity,
} from "../src/search/phrase-tokenizer";
import fs from "fs";
import phrasesModel from "../../data/wiki-phrases-model-240k.json"

var queries = JSON.parse(
  fs.readFileSync("./data/quora-queries-15k.json", "utf8")
);

// var queries = ["what is  albert einstein's favorite programming language?"];

test("query to keyphrases", async () => {
  var random = 7000 // Math.floor(Math.random() * 15000);

  for (var q of queries.slice(random, random + 100)) {
    //example usage
    var result = queryPhraseTokenizer(q, { phrasesModel });

//array key: var [nextWords, wikiTitle, category, 
// uniqueness, capsIndexes] = dict[key.slice(0,2)][key];

    var str = result.filter(Boolean)
      .map(
        (r) =>
          (r?.length>3 && r[5] || "") +
          (r[2] < 30 && r[2] > 3 ? " (n)" : "") +
          (r[5]?.includes(" ") ? " (Phrase)" : "") +
          " " +
          (r[1] ? "(Wiki: " + r[1] + ")" : "")
      )
      .join("  ");
    console.log(str);

    //average the .u values
    var u_avg = calculatePhraseSpecificity(q);
    console.log(u_avg);
  }

  expect(result).toBeDefined();
});
