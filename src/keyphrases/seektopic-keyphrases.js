import { splitSentences } from "../../index.js";
import { tokenizeTopics } from "../../index.js";
import { rankSentencesCentralToKeyphrase } from "./rank-sentences-keyphrases.js";
import extractNounEdgeGrams from "./ngrams.js";

/**
 * 🔤📊 SEEKTOPIC: Summarization, Extraction of Entities,
 * Keywords, and Topic Outline Phrases Important to Context
 * Weights sentences using TextRank noun keyphrase frequency
 * to find which sentences centralize and tie together keyphrase
 * concepts referred to most by other sentences. Based on the
 * TextRank & PageRank algorithms, it randomly surfs links to nodes
 * to find probability of being at that node, thus ranking influence.
 * @param {string} docText - input text to analyze
 * @param {Object} options
 * @param {Object} options.phrasesModel - phrases model
 * @param {number} options.maxWords=5 - maximum words in a keyphrase 
 * @param {number} options.minWords=1 - minimum words in a keyphrase
 * @param {number} options.minWordLength=3 - minimum length of a word 
 * @param {number} options.topKeyphrasesPercent=0.2 - percentage of top keyphrases to consider
 * @param {number} options.limitTopSentences=5 - maximum number of top sentences to return 
 * @param {number} options.limitTopKeyphrases=10 - maximum number of top keyphrases to return 
 * @param {number} options.minKeyPhraseLength=6 - minimum length of a keyphrase 
 * @param {string} options.heavyWeightQuery  - query to give heavy weight to
 * @returns {Array<Object>} - [{text, keyphrases, weight}] array of sentences
 * @example  extractSEEKTOPIC(testDoc, { phrasesModel, heavyWeightQuery: "self attention", limitTopSentences: 10,
 * @category Topics
 */
export function extractSEEKTOPIC(docText, options = {}) {
  var {
    phrasesModel,
    maxWords = 5,
    minWords = 2,
    minWordLength = 3,
    topKeyphrasesPercent = 0.5,
    limitTopSentences = 5,
    limitTopKeyphrases = 10,
    minKeyPhraseLength = 5,
    heavyWeightQuery = "",
    removeHTML = true,
  } = options;

  //if not string throw error
  if (typeof docText != "string") {
    throw new Error("docText must be a string");
  }

  //add space before < to ensure split sentences
  docText = docText
    .replace(/</g, " <")
    .replace(/>/g, "> ")
    .replace(/&.{2,5};/g, ""); //&quot; &amp; &lt; &gt; &nbsp;

  //remove html tags
  if (removeHTML)
  docText = docText.replace(/<[^>]*>/g, "");

  //split into sentences
  var sentencesArray = splitSentences(docText);
  var sentenceNumber = 0;

  //extract ngrams
  var nGrams = {};

  // create sentenceKeysMap  [{text,index,tokens,keyphrases:[{text,weight}] }]
  var sentenceKeysMap = [];

  for (var index in sentencesArray) {
    var text = sentencesArray[index];

    var tokens = tokenizeTopics(text, {
      phrasesModel,
      // typosModel,
    });

    sentenceKeysMap.push({
      text,
      index: Number(index),
      keyphrases: [],
      // tokens,
    });

    for (var i = 0; i < tokens.length; i++)
      for (var nGramSize = minWords; nGramSize <= maxWords; nGramSize++)
        extractNounEdgeGrams(
          nGramSize,
          tokens,
          i,
          nGrams,
          minWordLength,
          index
        );
  }

  //give keyphrases weight of num_occurences ^ word_count
  var keyphraseObjects = [];
  for (var nGramSize = minWords; nGramSize <= maxWords; nGramSize++)
    keyphraseObjects = keyphraseObjects.concat(
      Object.entries(nGrams[nGramSize]).map(([keyphrase, sentences]) => {
        return {
          keyphrase,
          sentences,
          words: nGramSize,
          weight: sentences.length * nGramSize,
        };
      })
    );

  //sort keyphrases by word count
  keyphraseObjects = keyphraseObjects.sort((a, b) => b.words - a.words);

  //fold smaller keyphrases that are subsets of larger ones
  var keyphrasesFolded = [];

  for (var keyphraseObject of keyphraseObjects) {
    var shouldAddCurrent = true;
      //check if larger includes smaller phrase or smaller phrase minus last word

    for (var i = 0; i < keyphrasesFolded.length; i++) {
      var phrase = keyphraseObject.keyphrase;
      var lastWordIndex = phrase.lastIndexOf(" ");

      var largerKeyphraseSplit = keyphrasesFolded[i].keyphrase.split(" ")
      // compare sorted arrays of words, see if at least 2 words different
        var diff =  phrase.split(" ").filter(x => !largerKeyphraseSplit.includes(x)).length;
        if (diff < 2) {

        //combine weight of smaller keyphrase into larger, divided by word count
        keyphrasesFolded[i].weight +=
          keyphraseObject.weight /
          keyphrasesFolded[i].keyphrase.split(" ").length;
        keyphrasesFolded[i].sentences = [...new Set(keyphrasesFolded[i].sentences.concat(
          keyphraseObject.sentences
        ))];

        // use whatever version has greater weight as keyphrase text
        if (keyphrasesFolded[i].weight < keyphraseObject.weight){
          keyphrasesFolded[i].keyphrase = keyphraseObject.keyphrase;
          keyphrasesFolded[i].words = keyphraseObject.words;
        }
        shouldAddCurrent = false;
      }
    }

    if (shouldAddCurrent && keyphraseObject.sentences.length >= 1)
      keyphrasesFolded.push(keyphraseObject);
  }

  //heavy weight query - bias towards query or user-clicked keyphrase
  // TODO - compare concept similarity of keyphrases to heavyWeightQuery
  if (heavyWeightQuery)
    keyphrasesFolded.forEach((keyphrase) => {
      if (keyphrase.keyphrase == heavyWeightQuery) keyphrase.weight += 5000;
    });

  var keysUniqueMap = {};
  //deduplicate and enforce unique values

  keyphraseObjects = keyphrasesFolded
    .sort((a, b) => b.weight - a.weight)
    .filter(
      (k) => !keysUniqueMap[k.keyphrase] && (keysUniqueMap[k.keyphrase] = 1)
    )
    .map((k) => ({ sentences: [...new Set(k.sentences)], ...k }));

  var limitKeyPhrases = Math.floor(
    keyphrasesFolded.length * topKeyphrasesPercent
  );
  if (limitKeyPhrases < limitTopKeyphrases)
    limitKeyPhrases = limitTopKeyphrases;

  //weight wiki entities
  keyphraseObjects = keyphraseObjects
    .map((keyphraseObject) => {
      var phraseTokenized = tokenizeTopics(keyphraseObject.keyphrase, {
        phrasesModel,
        // typosModel,
      });
      //if wiki entity, triple weight
      if (phraseTokenized.filter((r) => r[0] == 50)[0]) {
        keyphraseObject.wiki = true;
        keyphraseObject.weight *= 3;
      }

      //multiply weight by rarity of keyphrase to boost domain-specificity
      keyphraseObject.weight = Math.floor(
        (keyphraseObject.weight *
          phraseTokenized.reduce((acc, r) => acc + (r[1] || 4), 0)) /
          phraseTokenized.length
      );

      return keyphraseObject;
    })
    //filter out keyphrases that are too short
    .filter((k) => k.keyphrase.length > minKeyPhraseLength)
    .sort((a, b) => b.weight - a.weight)
    //limit to top % of keyphrases to give weights to
    // .slice(0, limitKeyPhrases);

  //add keyphrases to sentences Map
  for (var keyphraseObject of keyphraseObjects) {
    const { keyphrase, sentences, weight } = keyphraseObject;
    for (var sentenceNumber of sentences)
      sentenceKeysMap[sentenceNumber].keyphrases?.push({ keyphrase, weight });
  }

  //run text rank
  var topSentences = rankSentencesCentralToKeyphrase(sentenceKeysMap)
    ?.sort((a, b) => b.weight - a.weight)
    .slice(0, limitTopSentences) //cut off top S limit
    .map((s) => ({
      ...s,
      text: s.text, //remove to not show text
      keyphrases: [...new Set(s.keyphrases.map((k) => k.keyphrase) )].slice(0,5),
    }));

  // limit keyphrases to top K
  var keyphrases = keyphraseObjects.slice(0, limitTopKeyphrases).map((k) => ({
    ...k,
    sentences: k.sentences.join(","),
  }));

  return { topSentences, keyphrases, sentences: sentencesArray };
}
