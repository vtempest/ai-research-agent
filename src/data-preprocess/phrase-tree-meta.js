import fs from "fs";


var dict = fs.readFileSync("./data/world-model-phrase-tree.json", "utf8");
dict = JSON.parse(dict);

var total = Object.keys(dict).length;

console.log("Total Phrase Starters or Words: ", total);  