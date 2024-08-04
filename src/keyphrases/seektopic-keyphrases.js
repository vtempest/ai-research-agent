import {splitSentences} from  "../../index.js";
import {tokenizeTopics} from "../../index.js";
import TextRank from "./graph-centrality-rank.js";
import extractNounEdgeGrams from "./ngrams.js";

/**
 * 🔤📊 SEEKTOPIC: Summarization, Extraction of Entities, 
 * Keywords, and Topic Outline Phrases Important to Content 
 * Weights sentences using TextRank noun keyphrase frequency
 * to find which sentences centralize and tie together keyphrase
 * concepts referred to most by other sentences. Based on the
 * TextRank & PageRank algorithms, it randomly surfs links to nodes
 * to find probability of being at that node, thus ranking influence.
 * @param {string} inputString - input text to analyze
 * @param {Object} options
 * @param {Object} options.phrasesModel - phrases model
 * @param {Object} options.typosModel - typos model
 * @param {number} options.maxWords - maximum words in a keyphrase (default: 5)
 * @param {number} options.minWords - minimum words in a keyphrase (default: 2)
 * @param {number} options.minWordLength - minimum length of a word (default: 3)
 * @param {number} options.topKeyphrasesPercent - percentage of top keyphrases to consider (default: 0.2)
 * @param {number} options.limitTopSentences - maximum number of top sentences to return (default: 5)
 * @param {number} options.limitTopKeyphrases - maximum number of top keyphrases to return (default: 10)
 * @param {number} options.minKeyPhraseLength - minimum length of a keyphrase (default: 5)
 * @param {string} options.heavyWeightQuery - query to give heavy weight to
 * @returns {Array<Object>} - [{text, keyphrases, weight}] array of sentences
 */
export function extractSEEKTOPIC(inputString, options = {}) {
  var {
    phrasesModel,
    typosModel,
    maxWords = 5,
    minWords = 2,
    minWordLength = 3,
    topKeyphrasesPercent = 0.2,
    limitTopSentences = 5,
    limitTopKeyphrases = 10,
    minKeyPhraseLength = 5,
    heavyWeightQuery = "",
  } = options;

  //if not string throw error
  if (typeof inputString != "string") {
    throw new Error("inputString must be a string");
  }

  //add space before < to ensure split sentences
  inputString = inputString
    .replace(/</g, " <")
    .replace(/>/g, "> ")
    .replace(/&.{2,5};/g, ""); //&quot; &amp; &lt; &gt; &nbsp;


  //split into sentences
  var sentencesArray = splitSentences(inputString)
  var sentenceNumber = 0;

  //extract ngrams
  var nGrams = {};
  var tokensPerSentence = [];

  for (var sentenceText of sentencesArray) {
  
    var tokens = tokenizeTopics(sentenceText, {
      phrasesModel,
      typosModel,
    });
    
    tokensPerSentence.push(tokens);

    for (var i = 0; i < tokens.length; i++) 
      for (var nGramSize = minWords; nGramSize <= maxWords; nGramSize++) 
        extractNounEdgeGrams(
          nGramSize,
          tokens,
          i,
          nGrams,
          minWordLength,
          sentenceNumber++
        );
      
  }

  //give keyphrases weight of num_occurences ^ word_count
  var keyphraseGrams = [];
  for (var nGramSize = minWords; nGramSize <= maxWords; nGramSize++)
    keyphraseGrams = keyphraseGrams.concat(
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
  keyphraseGrams = keyphraseGrams.sort((a, b) => b.words - a.words);

  //fold smaller keyphrases that are subsets of larger ones
  var keyphrasesFolded = [];

  for (var keyphraseGram of keyphraseGrams) {
    var shouldAddCurrent = true;

    for (var i = 0; i < keyphrasesFolded.length; i++) {
      var phrase = keyphraseGram.keyphrase;
      var lastWordIndex = phrase.lastIndexOf(" ");

      //check if larger includes smaller phrase or smaller phrase minus last word
      if (
        keyphrasesFolded[i].keyphrase.indexOf(phrase) > -1 ||
        (lastWordIndex > 5 &&
          keyphrasesFolded[i].keyphrase.includes(
            phrase.substring(0, lastWordIndex)
          ))
      ) {
        //combine weight of smaller keyphrase into larger, divided by word count
        keyphrasesFolded[i].weight +=
          keyphraseGram.weight /
          keyphrasesFolded[i].keyphrase.split(" ").length;
        keyphrasesFolded[i].sentences = keyphrasesFolded[i].sentences.concat(
          keyphraseGram.sentences
        );

        // use whatever version has greater weight as keyphrase text
        if (keyphrasesFolded[i].weight < keyphraseGram.weight)
          keyphrasesFolded[i].keyphrase = keyphraseGram.keyphrase;

        shouldAddCurrent = false;
      }
    }

    if (shouldAddCurrent && keyphraseGram.sentences.length >= 1)
      keyphrasesFolded.push(keyphraseGram);
  }
  

  //heavy weight query - bias towards query or user-clicked keyphrase
  if (heavyWeightQuery)
    keyphrasesFolded.forEach((keyphrase) => {
      if (keyphrase.keyphrase == heavyWeightQuery) keyphrase.weight += 5000;
    });

  keyphraseGrams = keyphrasesFolded.sort((a, b) => b.weight - a.weight);

  //deduplicate and enforce unique values
  var keyphraseGramsUnique = {};
  keyphraseGrams = keyphraseGrams
    .map((keyphrase) => {
      keyphrase.sentences = [...new Set(keyphrase.sentences)];
      if (keyphraseGramsUnique[keyphrase.keyphrase]) return false;
      keyphraseGramsUnique[keyphrase.keyphrase] = 1;

      return keyphrase;
    })
    .filter(Boolean);

  var limitKeyPhrases = Math.floor(
    keyphrasesFolded.length * topKeyphrasesPercent
  );
  if (limitKeyPhrases < limitTopKeyphrases)
    limitKeyPhrases = limitTopKeyphrases;

  //weight wiki entities
  keyphraseGrams = keyphraseGrams
    .map((keyphraseGram) => {
      var phraseTokenized = tokenizeTopics(keyphraseGram.keyphrase, {
        phrasesModel,
        typosModel,
      });

      var isEntity = phraseTokenized.filter((r) => r[0]).length;
      if (isEntity) {
        keyphraseGram.wiki = true;
        keyphraseGram.weight = keyphraseGram.weight * 2;
      }

      var tokensWithFreq = phraseTokenized.filter((r) => r[2]);

      keyphraseGram.specificity = Math.floor(
        tokensWithFreq.reduce((acc, r) => acc + r[2], 0) / tokensWithFreq.length
      );

      keyphraseGram.weight = Math.floor(
        keyphraseGram.weight * keyphraseGram.specificity
      );

      return keyphraseGram;
    })
    .filter((k) => k.keyphrase.length > minKeyPhraseLength)
    .sort((a, b) => b.weight - a.weight)
    //limit to top % of keyphrases to give weights to
    .slice(0, limitKeyPhrases);

  // create sentenceKeysMap  [{text,index,keyphrases:[{text,weight}] }]
  var sentenceKeysMap = [];
  for (var i = 0; i < sentencesArray.length; i++)
    sentenceKeysMap.push({
      text: sentencesArray[i],
      index: i,
      keyphrases: [],
    });

  keyphraseGrams.forEach(({ keyphrase, sentences, weight }) => {
    for (var sentenceNumber of sentences)
      sentenceKeysMap[sentenceNumber].keyphrases.push({ keyphrase, weight });
  });

  //run text rank
  var top_sentences = TextRank(sentenceKeysMap);

  if (top_sentences)
    top_sentences = top_sentences.sort((a, b) => {
      return b.weight - a.weight;
    });

  //cut off top K limit
  top_sentences = top_sentences?.slice(0, limitTopSentences).map((s) => ({
    index: s.index,
    text: s.text, //remove to not show text
    keyphrases: s.keyphrases.map((k) => k.keyphrase),
  }));
  keyphraseGrams = keyphraseGrams.slice(0, limitTopKeyphrases);

  var keyphrases = keyphraseGrams.map((k) => {
    k.sentences = k.sentences.join(",");
    return k;
  });

  return { top_sentences, keyphrases, sentences: sentencesArray };
}
