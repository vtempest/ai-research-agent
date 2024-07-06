import fs from "fs";


var wikiIndex = fs.readFileSync("../data/words-phrases-tree.json", "utf8");
wikiIndex = JSON.parse(wikiIndex);

function phraseLookup(inputString) {
    //split input string into words
    const words = inputString.toLowerCase().split(/\s+/);
    const results = [];

    for (let i = 0; i < words.length; i++) {
        let firstWord = words[i];
        let nextWord = words[i+1];

        if (firstWord in wikiIndex) {

            if (nextWord in wikiIndex[firstWord]) {
                results.push(wikiIndex[firstWord][nextWord]);
                
            } else {
                if (wikiIndex[firstWord]["_"])
                    results.push([firstWord, wikiIndex[firstWord]["_"]]);
            }

        }
    }
    return results;

}

// Example usage
const inputString = "I think wine tasting red wine is the je ne sais quoi of life";
const result = phraseLookup(inputString);
console.log(result);