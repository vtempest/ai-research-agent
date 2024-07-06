import fs from "fs";


var dict = fs.readFileSync("./data/en-dict-index.json", "utf8");
dict = JSON.parse(dict);

var wikiNouns = fs.readFileSync("./data/wiki-nouns.json", "utf8");
wikiNouns = JSON.parse(wikiNouns);

var wordsPhrasesTree = {}

//object keys make list and number of words in each key
for (var key of Object.keys(wikiNouns)) {
    var words = key.split(" ");
    var firstWord = words[0];
    var phraseSize = words.length;

    if (phraseSize > 1) {
        for (var i = 0; i < phraseSize - 1; i++) {
            var nextWords = words.slice(i+1).join(" ");
            if (words[i] in wordsPhrasesTree) {
                wordsPhrasesTree[words[i]].push({"next": nextWords, s: phraseSize, "v": wikiNouns[key]});
            } else {
                wordsPhrasesTree[words[i]] = [{"next": nextWords, s: phraseSize, "v": wikiNouns[key]}];
            }
        }
    } else if (phraseSize == 1) {
        if (firstWord in wordsPhrasesTree) {
            wordsPhrasesTree[firstWord].push({ s: phraseSize, "v": wikiNouns[key] });
        } else {
            wordsPhrasesTree[firstWord] = [{ s: phraseSize, "v": wikiNouns[key] }];
        }
    }

}

// // combine words with same first word
// for (var key of Object.keys(wordsPhrasesTree)) {
//     var nextWords = wordsPhrasesTree[key];
//     var nextWordsObj = {};
//     for (var nextWord of nextWords) 
//             nextWordsObj[nextWord.size] = {"next": nextWord.next, "v": nextWord.v};
//     wordsPhrasesTree[key] = nextWordsObj;
// }


fs.writeFileSync("./data/words-phrases-tree.json", JSON.stringify(wordsPhrasesTree, null, 2), "utf8");

