import fs from "fs";

import weightWikiWordSpecificity from "../frequency/wiki-word-specificity.js";

const OPTION_PRINT_SPACING = 0;
const OPTION_ADD_WIKI_RELATED_WORDS = 0;
const OPTION_MAX_SYNONYMS = 0;
 
const categories = ["noun.Tops","noun.act",
"noun.animal","noun.artifact","noun.attribute","noun.body","noun.cognition","noun.communication",
"noun.event","noun.feeling","noun.food","noun.group","noun.location","noun.motive","noun.object",
"noun.person","noun.phenomenon","noun.plant","noun.possession","noun.process","noun.quantity",
"noun.relation","noun.shape","noun.state","noun.substance","noun.time","verb.body","verb.change",
"verb.cognition","verb.communication","verb.competition","verb.consumption","verb.contact",
"verb.creation","verb.emotion","verb.motion","verb.perception","verb.possession","verb.social",
"verb.stative","verb.weather", "adj.all","adj.pert","adj.ppl","adv.all"]
const pos_categories = [  "n","v", "r", "a", "s"] //a and s is for adjectives

var dict = fs.readFileSync("./data/en-dict-index.json", "utf8");
dict = JSON.parse(dict);
var dictDefs = JSON.parse(fs.readFileSync("./data/en-dict-defs.json", "utf8"));
var wikiNouns = fs.readFileSync("./data/dict-to-wiki-topics-35k.json", "utf8");
wikiNouns = JSON.parse(wikiNouns);

var wordsPhrasesTree = {}

// build dict_phrase -> wikiNouns Map phrases tree
for (var key of Object.keys(wikiNouns)) {
    var pageTitle = wikiNouns[key];


    //add the dictionary word term to the tree with wikipage
    var words = key.split(" ");
    var firstWord = words[0];
    var phraseSize = words.length;
    var nextWords = words.slice(1)?.join(" ");
    
    if (OPTION_ADD_WIKI_RELATED_WORDS) 
    if (phraseSize > 1) {
            // console.log("nextWords: ", nextWords);  
            if (firstWord in wordsPhrasesTree) {
                wordsPhrasesTree[firstWord].push({"n": nextWords,  "w": pageTitle});
            } else {
                wordsPhrasesTree[firstWord] = [{"n": nextWords,  "w": pageTitle}];
            }
    } else if (phraseSize == 1) {
        if (firstWord in wordsPhrasesTree) {
            wordsPhrasesTree[firstWord].push({  "w": pageTitle });
        } else {
            wordsPhrasesTree[firstWord] = [{  "w": pageTitle }];
        }
    }


    //add the WIKI PAGE TITLE to the tree with the wikipage

    // remove everything in (parentesis) and [brackets] from the title with regex
    var wpt_words = pageTitle.replace(/ *\([^)]*\) */g, "").replace(/ *\[[^)]*\] */g, "")
    // remove everything after a comma
    .split(",")[0]
    .replace(/[^a-zA-Z_0-9\-]/g, "").toLowerCase().split("_");
    var wpt_firstWord = wpt_words[0];
    var wpt_phraseSize = wpt_words.length;
    var wpt_nextWords = wpt_words.slice(1)?.join(" ");

    if (wpt_phraseSize > 1) {
            // console.log("nextWords: ", nextWords);  
            if (wpt_firstWord in wordsPhrasesTree) {
                wordsPhrasesTree[wpt_firstWord].push({"n": wpt_nextWords,  "w": pageTitle});
            } else {
                wordsPhrasesTree[wpt_firstWord] = [{"n": wpt_nextWords, "w": pageTitle}];
            }
    } else if (wpt_phraseSize == 1) {
        if (wpt_firstWord in wordsPhrasesTree) {
            wordsPhrasesTree[wpt_firstWord].push({ "w": pageTitle });
        } else {
            wordsPhrasesTree[wpt_firstWord] = [{  "w": pageTitle }];
        }
    }



}




   
// build dict_phrase -> def Map phrases tree
for (var key of Object.keys(dict)) {
    var words = key.split(" ");
    var firstWord = words[0];
    var phraseSize = words.length;

    var defs = dict[key].map(defID => dictDefs[defID])
    var synonyms = [], 
        posType = categories.indexOf(defs[0].posType), 
        pos = pos_categories.indexOf(defs[0].pos[0]);

    if (pos==-1||posType==-1)
        console.log(defs[0])

    for (var def of defs) 
        synonyms = synonyms.concat(def.synonyms.split(", "));

    synonyms = [...new Set(synonyms)];

    synonyms = synonyms
    //remove the word itself
    .filter(s=>s!=key)
    .slice(0, OPTION_MAX_SYNONYMS) //max
    .join(",")




    if (phraseSize > 1) {
        for (var i = 0; i < phraseSize - 1; i++) {
            var nextWords = words.slice(i+1).join(" ");
            if (words[i] in wordsPhrasesTree && wordsPhrasesTree[words[i]].push) {
                wordsPhrasesTree[words[i]].push(synonyms.length ? 
                    {"n": nextWords,  "s": synonyms, "c": posType, "p": pos} 
                    : {"n": nextWords,  "c": posType, "p": pos} 
                );
            } else {
                wordsPhrasesTree[words[i]] = synonyms.length ? 
                    [{"n": nextWords,  "s": synonyms, "c": posType, "p": pos}  ] 
                    : [{"n": nextWords,  "c": posType, "p": pos}];
            }
        }
    } else if (phraseSize == 1) {
        if (firstWord in wordsPhrasesTree && wordsPhrasesTree[firstWord].push) {
                wordsPhrasesTree[firstWord].push({  "s": synonyms, "c": posType, "p": pos});
           
        } else {
            wordsPhrasesTree[firstWord] = [{  "s": synonyms, "c": posType, "p": pos }];
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
            if ( (combinedPhrase.n || "") == (phrase.n || "")  ){
                found = true;
                combinedPhrase.w = combinedPhrase.w ? combinedPhrase.w : phrase.w;
                combinedPhrase.d = combinedPhrase.d ? combinedPhrase.d : phrase.d;
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


fs.writeFileSync("./data/wiki-world-model.json", OPTION_PRINT_SPACING ? JSON.stringify(firstTwoLettersTree, null, 2): JSON.stringify(firstTwoLettersTree), "utf8");


