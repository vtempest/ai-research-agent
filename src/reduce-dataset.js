import wikiTermFrequency from "../data/wiki-term-freq8-1M.js";
import fs from "fs";


const minFreq = 8;
var output = {};

console.log(wikiTermFrequency["in"])

// for (var key of Object.keys(wikiTermFrequency)) {
//     if (wikiTermFrequency[key] >= minFreq )
//         output[key] = wikiTermFrequency[key];
// }

console.log(Object.keys(wikiTermFrequency).length)

fs.writeFileSync("./data/wiki-term-freq6-1M.js", "export default " + JSON.stringify(wikiTermFrequency));