import fs from "fs";
import {compileTopicModel} from "./compile-topic-model.js";

var dictindex = fs.readFileSync("./src/wordlists/dictionary-152k.json", "utf8");
// var dictDefs = JSON.parse(fs.readFileSync("./src/wordlistsw/dictionary-defs.json", "utf8"));

var dict = JSON.parse(fs.readFileSync("./src/wordlists/wiki-phrases-model-240k.json", "utf8"));

// look thru all children of dict and add up their children to toal
var totalFirsts = Object.keys(dict).reduce(
  (total, key) => total + Object.keys(dict[key]).length,
  0
);

console.log("Total Phrase Starter First Words: ", totalFirsts);

var totalTerms = Object.keys(dict).reduce(
  (total, key) =>
    total +
    Object.keys(dict[key]).reduce(
      (subtotal, fullword) =>
        subtotal + Object.keys(dict[key][fullword]).length,
      0
    ),
  0
);

console.log("Total Terms: ", totalTerms);

var dictindex = JSON.parse(dictindex);

var multiMeanings = [],
  oneWord = [];
for (var key of Object.keys(dictindex)) {
  var word_count = key.split(" ").length;
  if (word_count > 1) {
    multiMeanings.push(key);
  } else {
    oneWord.push(key);
  }
}

console.log("Dict phrases: ", multiMeanings.length);
console.log("Dict single words: ", oneWord.length);
console.log(Object.keys(dictindex).length);
// console.log(Object.keys(dictDefs).length);

