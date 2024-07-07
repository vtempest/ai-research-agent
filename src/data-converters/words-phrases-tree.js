import fs from "fs";

import weightWikiWordSpecificity from "../../src/keyphrases/wiki-word-specificity.js";

var dict = fs.readFileSync("./data/en-dict-index.json", "utf8");
dict = JSON.parse(dict);

var wikiNouns = fs.readFileSync("./data/dict-to-wiki-topics-35k.json", "utf8");
wikiNouns = JSON.parse(wikiNouns);

var wordsPhrasesTree = {}

// build dict_phrase -> wikiNouns Map phrases tree
for (var key of Object.keys(wikiNouns)) {
    var words = key.split(" ");
    var firstWord = words[0];
    var phraseSize = words.length;

    if (phraseSize > 1) {
        for (var i = 0; i < phraseSize - 1; i++) {
            var nextWords = words.slice(i+1).join(" ");
            if (words[i] in wordsPhrasesTree) {
                wordsPhrasesTree[words[i]].push({"n": nextWords, s: phraseSize, "w": wikiNouns[key]});
            } else {
                wordsPhrasesTree[words[i]] = [{"n": nextWords, s: phraseSize, "w": wikiNouns[key]}];
            }
        }
    } else if (phraseSize == 1) {
        if (firstWord in wordsPhrasesTree) {
            wordsPhrasesTree[firstWord].push({ s: phraseSize, "w": wikiNouns[key] });
        } else {
            wordsPhrasesTree[firstWord] = [{ s: phraseSize, "w": wikiNouns[key] }];
        }
    }

}




// build dict_phrase -> def Map phrases tree
for (var key of Object.keys(dict)) {
    var words = key.split(" ");
    var firstWord = words[0];
    var phraseSize = words.length;

    if (phraseSize > 1) {
        for (var i = 0; i < phraseSize - 1; i++) {
            var nextWords = words.slice(i+1).join(" ");
            if (words[i] in wordsPhrasesTree && wordsPhrasesTree[words[i]].push) {
                wordsPhrasesTree[words[i]].push({"n": nextWords, s: phraseSize, "d": dict[key]});
            } else {
                wordsPhrasesTree[words[i]] = [{"n": nextWords, s: phraseSize, "d": dict[key]}];
            }
        }
    } else if (phraseSize == 1) {
        if (firstWord in wordsPhrasesTree && wordsPhrasesTree[firstWord].push) {
            try{
                wordsPhrasesTree[firstWord].push({ s: phraseSize, "d": dict[key] });
            }
            catch(e){
                console.log("Error: ", e);
                console.log("key: ", key);
                console.log("dict[key]: ", dict[key]);
            }
        } else {
            wordsPhrasesTree[firstWord] = [{ s: phraseSize, "d": dict[key] }];
        }
    }

}

// combine the same phrases by comparing size and next words
for (var key of Object.keys(wordsPhrasesTree)) {
    var phrases = wordsPhrasesTree[key];
    var combinedPhrases = [];
    for (var phrase of phrases) {
        var found = false;
        for (var combinedPhrase of combinedPhrases) {
            if ( (phrase.s > 1 && combinedPhrase.s == phrase.s && 
                    combinedPhrase.n == phrase.n ) 
                ||
                (phrase.s == 1 && combinedPhrase.s == phrase.s ) 
                ){
                found = true;
                combinedPhrase.w = combinedPhrase.w || phrase.w;
                combinedPhrase.d = combinedPhrase.d || phrase.d;
                combinedPhrases.push(phrase)
                break;
            }
        }
        if (!found) {
            combinedPhrases.push(phrase);
        }
    }
    wordsPhrasesTree[key] = combinedPhrases;
}

for (var key of Object.keys(wordsPhrasesTree)) {
    wordsPhrasesTree[key] = wordsPhrasesTree[key].sort((a, b) => b.s - a.s);
}


//calculate term specificity

for (var key of Object.keys(wordsPhrasesTree)) {

    var thisKey = key;
    
        
    for (var next of wordsPhrasesTree[key]) {
        //get whole phrase
        var phrase = thisKey + " " + (next.n || "");

        var uniqueness = weightWikiWordSpecificity(phrase)

        // console.log( phrase, uniqueness);
        // add uniqueness to the phrase
        next.u = uniqueness;

    }
}

// prefix tree by the first two letters
var firstTwoLettersTree = {};
for (var key of Object.keys(wordsPhrasesTree)) {
    var firstTwoLetters = key.substring(0, 2);
    if (firstTwoLetters in firstTwoLettersTree) {
        firstTwoLettersTree[firstTwoLetters][key] = wordsPhrasesTree[key];
    } else {
        firstTwoLettersTree[firstTwoLetters] = {};
        firstTwoLettersTree[firstTwoLetters][key] = wordsPhrasesTree[key];
    }
}


fs.writeFileSync("./data/world-model-phrase-tree.json", JSON.stringify(firstTwoLettersTree), "utf8");


