import { test, expect } from "vitest";
import queryAutocomplete from "../src/autocomplete/autocomplete";
import fs from "fs";
import phrasesModel from "../data/wiki-phrases-model-240k.json"

var queries = JSON.parse(
  fs.readFileSync("./data/quora-queries-15k.json", "utf8")
);

var q = "who is john s" //"when is the 2024 ";

test("query autocomplete", async () => {
  var random = Math.floor(Math.random() * 15000);

  // for (var q of queries.slice(random, random + 100)) {
    //example usage
    var autocompletes = queryAutocomplete(q, {phrasesModel});
    // autocompletes = JSON.stringify(autocompletes, null, 0)


    console.log(autocompletes);

//array key: var [nextWords, wikiTitle, category, 
// uniqueness, capsIndexes] = dict[key.slice(0,2)][key];

  // }

  expect(autocompletes).toBeDefined();
});
