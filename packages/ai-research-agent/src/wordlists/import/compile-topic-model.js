import wikiWordFrequency from "../wordlists/wiki-word-freq-325k.json" //with { type: "json" };
import fs from "fs";

/**
 * Compile a topic phrases model from a dictionary and Wikipedia page titles. <br />
 * Search and outline a research base using Wikipedia's 100k popular pages as the core topic 
 * phrases graph for LLM Research Agents. Most of the documents online (and by extension thinking 
 * in the collective conciousness) can revolve around core topic phrases linked as a graph.  
 * If all the available docs are nodes, the links in the graph can be extracted Wiki page entities 
 * and mappings of dictionary phrases to their wiki page. These can serve as topic labels, keywords, 
 * and suggestions for LLM followup questions. Documents can be linked in a graph with: <br />
 * 1. wiki page entity recognition <br /> 2. frequent keyphrases <br /> 3. html links <br /> 
 * 4. research paper references <br /> 5. keyphrases to query in global web search <br /> 6. site-specific recommendations. <br />
 * These can lay the foundation for LLM Research Agents to fully grok, summarize, and outline a research base.   <br /><br />
 * 240K total words & phrases, first 117K first-word or single words to check every token against. 100K Wikipedia Page Titles and links - Wikipedia most popular pages titles. Also includes domain specificity score and what letters should be capital.<br />
 * 84K  words and 67K phrases in dictionary lexicon  OpenEnglishWordNet, a better updated version of Wordnet - multiple definitions per term, 120k definitions, 45 concept categories<br />
 * JSON Prefix Trie  - arranged by sorting words and phrases for lookup by first word to tokenize by word, then find if it starts a phrase based on entries, for Phrase Extraction from a text. <br /> 
 * There is <a href="https://johnresig.com/blog/javascript-trie-performance-analysis/">"unanimous consensus"</a> that Prefix Trie <a href="https://github.com/daviddwlee84/LeetCode/blob/master/Notes/DataStructure/Trie_PrefixTree.md">O(1) lookups</a> (instead of having to loop through the index for each lookup) makes it the best data type for this task.
 * @param {Object} [options] 
 * @param {number} options.addJSONLineBreaks - include line breaks in JSON output for debugging
 * @param {number} options.maxSynonymsPerTerm - max synonyms per term
 * @param {boolean} options.addWikiPageTitles - true to add wiki page titles, false for dictionary only
 * @param {boolean} options.sortInFirstTwoLettersTrie - sort the first words by first two letters Trie, needd for autocomplete after 2 letters typed
 * @param {number} options.minTermCharCount - min length of term to include
 * @returns {Promise<void>} 
 * @category Topics
 */
export async function compileTopicModel(options = {}) {
  const {
    minTermCharCount = 3,
    maxSynonymsPerTerm = 0,
    addWikiPageTitles = true,
    sortInFirstTwoLettersTrie = true,
    addJSONLineBreaks = 0,
  } = options;

  //array key: var [nextWords, wikiTitle, category,
  // uniqueness, capsIndexes] = dict[key.slice(0,2)][key];

  var dict = JSON.parse(fs.readFileSync("./src/wordlists/dictionary-index-152k.json", "utf8"));

  var wikiTopPages = JSON.parse(
    fs.readFileSync("./src/wordlists/wiki-pages-200k.json", "utf8")
  );

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

    if (wpt_words.join().length < minTermCharCount) continue;

    var wikiObj = addWikiPageTitles
      ? { w: pageTitle, cat: 5 }
      : { w: 1, cat: 5 };
    wikiObj.n = wpt_phraseSize > 1 ? wpt_nextWords : "";

    if (!wordsPhrasesTree[wpt_firstWord]) wordsPhrasesTree[wpt_firstWord] = [];

    wordsPhrasesTree[wpt_firstWord].push(wikiObj);
    maxWikiPages--;
    if (maxWikiPages <= 0) break;
  }

  function totalTreeMap(dict) {
    return [
      Object.keys(dict).length,
      Object.keys(dict).reduce(
        (total, key) => total + Object.keys(dict[key]).length,
        0
      ),
      // get the total number of W: 1
      Object.keys(dict).reduce(
        (total, key) => total + dict[key].filter((x) => x.w).length,
        0
      ),
    ];
  }

  console.log("wikiTopPages", totalTreeMap(wordsPhrasesTree));

  // Add dictionary words & phrases to tree

  for (var key of Object.keys(dict)) {
    var words = key.split(" ");
    var firstWord = words[0];
    var phraseSize = words.length;
    // if (caps) {
    //   //compare caps to key and see which letters have capitaication, return their idnexes
    //   var capsIndexes = [];
    //   for (var i = 0; i < key.length; i++) {
    //     if (caps[i] === key[i].toUpperCase()) {
    //       capsIndexes.push(i);
    //     }
    //   }
    //   caps = capsIndexes; //.join(",");
    // }

    // syns = syns?.split(",").slice(0, maxSynonymsPerTerm).join(","); //max

    var phraseObj = {  cat: dict[key] };
    if (phraseSize > 1) phraseObj.n = words.slice(1)?.join(" ");
    // if (syns?.length) phraseObj.s = syns;
    // if (caps) phraseObj.caps = caps;

    if (!wordsPhrasesTree[firstWord] || !wordsPhrasesTree[firstWord].push)
      wordsPhrasesTree[firstWord] = [];

    wordsPhrasesTree[firstWord].push(phraseObj);
  }

  console.log("after dict", totalTreeMap(wordsPhrasesTree));

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

  console.log("after combo", totalTreeMap(wordsPhrasesTree));


  //save to file as list of phrases by combining the word 
  var phrases = [];
  for (var key of Object.keys(wordsPhrasesTree)) {
    for (var phrase of wordsPhrasesTree[key]) {
      phrases.push(key + " " + (phrase.n || ""));
    }
  }

  fs.writeFileSync("./src/wordlists/phrases-list-240k.json", JSON.stringify(phrases, null, 2));
  
  //calculate term specificity and combine into array

  for (var key of Object.keys(wordsPhrasesTree)) {
    var thisKey = key;

    wordsPhrasesTree[key] = wordsPhrasesTree[key].map((next) => {
      //get whole phrase
      var phrase = thisKey + " " + (next.n || "");
      // add uniqueness to the phrase
      next.u = weightWikiWordSpecificity(phrase);
      // next.w,  , next.caps
      var nextArray = [next.n, next.cat, next.u, next.s].map(x => x || 0);
      
      if (!next.s)
        nextArray.pop()

      return nextArray;
    });
  }

  // prefix tree by the first two letters
  if (sortInFirstTwoLettersTrie) {
    var firstTwoLettersTree = {};
    for (var key of Object.keys(wordsPhrasesTree)) {
      var firstTwoLetters = key.substring(0, 2);
      var restOfWord = key.substring(2);
      if (!(firstTwoLetters in firstTwoLettersTree)) 
        firstTwoLettersTree[firstTwoLetters] = {};

      firstTwoLettersTree[firstTwoLetters][restOfWord] = wordsPhrasesTree[key];
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

    fs.writeFileSync(
      "./src/wordlists/wiki-phrases-model-240k.json",
      addJSONLineBreaks
        ? JSON.stringify(firstTwoLettersTree, null, 2)
        : JSON.stringify(firstTwoLettersTree),
      "utf8"
    );

    //read file size
    const fileSize = fs.statSync("./src/wordlists/wiki-phrases-model-240k.json").size;
    console.log("file size", fileSize);
}

/**
 * Find domain-specific unique words for a single doc with BM25 formula
 * by using Wikipedia term frequencies as the common words corpus.
 * All words in English Wikipedia are sorted by number of pages they are in for 
 * 325K words with frequencies of at least 32 wikipages, between 3 to 23 characters 
 * of Latin alphanumerics like az09, punctuation like .-, and diacritics like éï, 
 * but filtering out numbers and foreign language. <br />
 * <b>Total Terms (frequency>=32)</b>: 324896 <br />
 * <b>Filesize (JSON, frequency>=32)</b>: 4MB  <br />
 * <b>Total Articles (Wiki-en-2020)</b>: 5,989,879 <br /> <br />
 * 
 * @see Galkin, M., Malykh, V. (2020). Wikipedia TF-IDF Dataset Release (v1.0). 
 * Zenodo. https://doi.org/10.5281/zenodo.3631674 https://github.com/SmartDataAnalytics/Wikipedia_TF_IDF_Dataset

 * @param {string} query phrase to search wiki-idf for each word
 * @returns {number} score for term specificity 0-12~

 */
export function weightWikiWordSpecificity(query) {
  const totalWikiPages = 6000000;
  const queryTerms = query.toLowerCase().split(/\W+/);

  let phraseScoreList = queryTerms
    .map((term) => {
      //skip terms that are too short
      if (term.length < 3) return null;

      //calculate IDF from Wikipedia term frequency
      const wikiPagesWithTerm = wikiWordFrequency[term]; //|| 10;

      if (!wikiPagesWithTerm) return null;

      return Math.log(
        (totalWikiPages - wikiPagesWithTerm) / wikiPagesWithTerm + 1
      );
    })
    .filter(Boolean);

  var phraseScore =
    Math.floor(
      phraseScoreList.reduce((a, b) => a + b, 0) / phraseScoreList.length
    ) || 5;
  return phraseScore;
}

await compileTopicModel();
