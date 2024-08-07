import fs from "fs";
import wikiWordFrequency from "../../data/wiki-word-freq-325k.json"


const OPTION_PRINT_SPACING = 0;
const OPTION_MAX_SYNONYMS = 200;
const OPTION_FILETYPE_JS = 0;
const OPTION_ADD_WIKI_TITLE = 1;
const OPTION_PREFIX_TWO_LETTERS = 1;
const OPTION_MIN_TERM_SIZE = 4;

//array key: var [nextWords, wikiTitle, category, 
// uniqueness, capsIndexes] = dict[key.slice(0,2)][key];

const pos_categories = ["n", "v", "r", "a", "s"]; //a and s is for adjectives

var dict = JSON.parse(
  fs.readFileSync("./data/dictionary-152k.json", "utf8")
);

var wikiTopPages = JSON.parse(fs.readFileSync("./data/wiki-pages-200k.json", "utf8"));

var wordsPhrasesTree = {};


//  TOP 100K WIKI PAGE TITLE to the tree with the wikipage
let maxWikiPages = 100000;
for (var pageTitle of wikiTopPages) {
  //if has parenthesis, skip
  if (pageTitle.includes("(") || pageTitle.includes(")")) continue;

  // remove everything in (parentesis) and [brackets] from the title with regex
  var wpt_words = pageTitle
    .replace(/ *\([^)]*\)/g, "")
    .replace(/ *\[[^)]*\]/g, "")
    
    .replace(/[ ]+/g, " ")
    .replace(/^List_of_/, "")
    // remove everything after a comma
    // .split(",")[0]
    .replace(/[^a-zA-Z_0-9\-]/g, "")
    .toLowerCase()
    .split("_");

  var wpt_firstWord = wpt_words[0];
  var wpt_phraseSize = wpt_words.length;
  var wpt_nextWords = wpt_words.slice(1)?.join(" ");

  if (wpt_words.join().length < OPTION_MIN_TERM_SIZE) continue;


  var wikiObj = OPTION_ADD_WIKI_TITLE ? { w: pageTitle, cat: 50 } : {w:1, cat: 50};
  wikiObj.n = wpt_phraseSize > 1 ? wpt_nextWords : "";


  if (!wordsPhrasesTree[wpt_firstWord]) wordsPhrasesTree[wpt_firstWord] = [];

  wordsPhrasesTree[wpt_firstWord].push(wikiObj);
  maxWikiPages--;
  if (maxWikiPages <= 0) break;
}

function totalTreeMap(dict) {
return  [ Object.keys(dict).length, 
  Object.keys(dict).reduce(
  (total, key) =>
    total +
    Object.keys(dict[key]).length,
  0
),
// get the total number of W: 1
Object.keys(dict).reduce(
  (total, key) =>
    total +
    dict[key].filter((x) => x.w).length,
  0
)
]
}


console.log("wikiTopPages", totalTreeMap(wordsPhrasesTree))

// Add dictionary words & phrases to tree

for (var key of Object.keys(dict)) {
  var words = key.split(" ");
  var firstWord = words[0];
  var phraseSize = words.length;

  var { syns, cat, pos, caps} = dict[key];

  pos = pos_categories.indexOf(pos);
  if (caps){
    //compare caps to key and see which letters have capitaication, return their idnexes
    var capsIndexes = [];
    for (var i = 0; i < key.length; i++) {
      if (caps[i] === key[i].toUpperCase()) {
        capsIndexes.push(i);
      }
    }
    caps = capsIndexes //.join(",");
  }

  syns = syns?.split(",").slice(0, OPTION_MAX_SYNONYMS).join(",") //max

  var phraseObj = { cat, pos}
  if (phraseSize > 1) phraseObj.n = words.slice(1)?.join(" ");
  if (syns?.length) phraseObj.s = syns;
  if (caps) phraseObj.caps = caps;

  if (!wordsPhrasesTree[firstWord] || !wordsPhrasesTree[firstWord].push) wordsPhrasesTree[firstWord] = [];

  wordsPhrasesTree[firstWord].push(phraseObj);
}

console.log("after dict", totalTreeMap(wordsPhrasesTree))


// combine the same phrases by comparing size and next words
for (var key of Object.keys(wordsPhrasesTree)) {
  var phrases = wordsPhrasesTree[key];
  var combinedPhrases = [];
  for (var phrase of phrases) {
    var found = false;
    for (var combinedPhrase of combinedPhrases) {
      if ((combinedPhrase.n || "") == (phrase.n || "")) {
        found = true;
        combinedPhrase.w = combinedPhrase.w || phrase.w;
        phrase.w = combinedPhrase.w || phrase.w;
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


console.log("after combo", totalTreeMap(wordsPhrasesTree))

//calculate term specificity and combine into array

for (var key of Object.keys(wordsPhrasesTree)) {
  var thisKey = key;

  wordsPhrasesTree[key] = wordsPhrasesTree[key].map((next) => {
    //get whole phrase
    var phrase = thisKey + " " + (next.n || "");
    // add uniqueness to the phrase
    next.u = weightWikiWordSpecificity(phrase);
// next.w,  , next.caps
    var nextArray = [next.n,  next.cat, next.u, next.s]
      .map((x) => x || 0);
    return nextArray;

  });
}


/** 
 * Find domain-specific unique words for a single doc with BM25 formula 
 * by using Wikipedia term frequencies as the common words corpus.
 * 
 * @param {string} query phrase to search wiki-idf for each word
 * @returns {number} score for term specificity 
 */
export default function weightWikiWordSpecificity(
  query
) {
  const totalWikiPages = 6000000;
  const queryTerms = query.toLowerCase().split(/\W+/);
  

  let phraseScoreList = queryTerms.map((term) => {
    //skip terms that are too short
    if (term.length < 3) return null;

    //calculate IDF from Wikipedia term frequency
    const wikiPagesWithTerm = wikiWordFrequency[term] //|| 10;

    if (!wikiPagesWithTerm) return null;

    return Math.log(
      (totalWikiPages - wikiPagesWithTerm ) / (wikiPagesWithTerm ) +
        1
    ) ;
  }).filter(Boolean)
  
  var phraseScore = Math.floor(phraseScoreList.reduce((a, b) => a + b, 0) / phraseScoreList.length) || 5;
  return phraseScore;
}


// prefix tree by the first two letters
if (OPTION_PREFIX_TWO_LETTERS) {
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
} else { 
  var firstTwoLettersTree = wordsPhrasesTree;
}

//sort alphabetically by the first two letters
firstTwoLettersTree = Object.keys(firstTwoLettersTree)
  .sort()
  .reduce((acc, key) => {
    acc[key] = firstTwoLettersTree[key];
    return acc;
  }, {});

if (OPTION_FILETYPE_JS)
  fs.writeFileSync(
    "./data/wiki-phrases-model-240k.js",
    "export default " +
      (OPTION_PRINT_SPACING
        ? JSON.stringify(firstTwoLettersTree, null, 2)
        : JSON.stringify(firstTwoLettersTree)),
    "utf8"
  );
else
  fs.writeFileSync(
    "./data/wiki-phrases-model-240k.json",
    OPTION_PRINT_SPACING
      ? JSON.stringify(firstTwoLettersTree, null, 2)
      : JSON.stringify(firstTwoLettersTree),
    "utf8"
  );
