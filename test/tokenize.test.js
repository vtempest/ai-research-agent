import { test, expect } from "vitest";
import  {
  convertTextToTokens
} from "../index.js";
import fs from "fs";

var phrasesModel = JSON.parse(
  fs.readFileSync("./src/wordlists/wiki-phrases-model-240k.json", "utf8")
);

var  queries = JSON.parse(
  fs.readFileSync("./src/wordlists/quora-queries-15k.json", "utf8")
);
 
// var queries = ["what is  albert einstein's favorite programming language?"];

test("tokenize query  to keyphrases", async () => {
  var random = Math.floor(Math.random() * 15000);


  for (var q of queries.slice(random, random + 20)) {

    //example usage
    var result = convertTextToTokens(q, { phrasesModel });
 
    // var str = result.filter(Boolean)
    //   .map(
    //     (r) =>
    //       (r[2] && r[2]?.includes(" ")  || r[0] == 50 ? "(" : "") +
    //       ( r[2] || "") +
    //       // (r[1] < 29 && r[1] > 3 ? "(n)" : "") +
    //       (r[2] && r[2]?.includes(" ") ? ")(Phrase)" : "") +
    //       (r[0] == 50 ? ")(Wiki)" : "")
    //   )
    //   .join("  ");
    console.log(result);

    //average the .u values
    // var u_avg = calculatePhraseSpecificity(q);
    // console.log(u_avg);
  }

  expect(result).toBeDefined();
});
