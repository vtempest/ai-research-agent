import fs from "fs";

import weightWikiWordSpecificity from "../frequency/wiki-word-specificity.js";

const OPTION_FILETYPE_JS = 0;
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

var wikiTopPages = fs.readFileSync("./data/wiki-pages-100k.json", "utf8");
wikiTopPages = JSON.parse(wikiTopPages).slice(0, 100000);


var wordsPhrasesTree = {}



// build TOP 100K WIKI TOPICS
    //add the WIKI PAGE TITLE to the tree with the wikipage
for (var pageTitle of wikiTopPages) {

    //if has parenthesis, skip 
    if (pageTitle.includes("(") || pageTitle.includes(")")) continue;

    // remove everything in (parentesis) and [brackets] from the title with regex
    var wpt_words = pageTitle.replace(/ *\([^)]*\)/g, "").replace(/ *\[[^)]*\]/g, "")
    .replace(/^List_of_/, "")
    // remove everything after a comma
    // .split(",")[0]
    .replace(/[^a-zA-Z_0-9\-]/g, "").toLowerCase().split("_");
    var wpt_firstWord = wpt_words[0];
    var wpt_phraseSize = wpt_words.length;
    var wpt_nextWords = wpt_words.slice(1)?.join(" ");

    if (wpt_words.join().length < 4) continue;

    var wikiObj = {"w": pageTitle}
    if (wpt_phraseSize > 1) 
        wikiObj.n = wpt_nextWords;

    if (wpt_firstWord in wordsPhrasesTree) 
        wordsPhrasesTree[wpt_firstWord].push(wikiObj)
    else 
        wordsPhrasesTree[wpt_firstWord] = [wikiObj];


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


    var phraseObj = {} //{  "c": posType, "p": pos}
    if (phraseSize > 1)
        phraseObj.n = words.slice(1)?.join(" ");
    if (synonyms.length) 
        phraseObj.s = synonyms;

    
        if (firstWord in wordsPhrasesTree && wordsPhrasesTree[firstWord].push) {
                wordsPhrasesTree[firstWord].push(phraseObj)
        } else {
            wordsPhrasesTree[firstWord] =  [phraseObj];
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

if (OPTION_FILETYPE_JS)
    fs.writeFileSync("./data/wiki-world-model.js",
"export default " + (OPTION_PRINT_SPACING ? JSON.stringify(firstTwoLettersTree, null, 2): JSON.stringify(firstTwoLettersTree)), "utf8");
else 
fs.writeFileSync("./data/wiki-world-model.json",
    (OPTION_PRINT_SPACING ? JSON.stringify(firstTwoLettersTree, null, 2): JSON.stringify(firstTwoLettersTree)), "utf8");
    

