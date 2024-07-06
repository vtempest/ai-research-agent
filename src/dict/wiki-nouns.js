import {data} from "../data/Noun.js" 
// from compromise wikipedia
import fs from "fs"
var wikiNouns = {}

data.forEach((noun) => {
    var wiki = noun.same_as.wikipedia_page;

    var word = noun.id.split(".")[0];

    if (wiki) {
        wikiNouns[word] = convertHexAsciiToChar(wiki);    
    }

});

function convertHexAsciiToChar(str) {
    return str.replace(/\$([0-9A-Fa-f]{4})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    });
  }
  

console.log(Object.keys(wikiNouns).length);

fs.writeFileSync("data/wiki-nouns.json", JSON.stringify(wikiNouns, null, 2));
