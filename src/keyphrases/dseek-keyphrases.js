import splitSentences from "../tokenize/sentences.js";
import tokenizeWikiPhrases from "../tokenize/tokenize-topics.js";
import TextRank from "./graph-centrality-rank.js";
import extractNounEdgeGrams from "./ngrams.js";

/**
 * DSEEK - Domain Specific Extraction of Entities & Keyphrases
 * Weights sentences using TextRank noun keyphrase frequency
 * to find which sentences centralize and tie together keyphrase
 * concepts refered to most by other sentences. Based on the
 * TextRank & PageRank algorithms, it randomly surfs links to nodes
 * to find probability of being at that node, thus ranking influence.

 * @param {string} inputString
 * @param {object} options
    maxWords = 5,
    minWords = 2,
    minWordLength = 3,
    topKeyphrasesPercent = 0.2,
    limitTopSentences = 5,
    limitTopKeyphrases = 5,
    minKeyPhraseLength = 5,
 * @returns {Array<Object>} [{text, keyphrases, weight}] array of sentences
 */
export function weightKeyPhrasesSentences(inputString, options = {}) {
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
  var nGrams = {};

 
  //split into sentences
  var sentencesPOS = splitSentences(inputString).map((text, sentenceNumber) => {
    var sentence = { text };

    sentence.terms = tokenizeWikiPhrases(sentence.text, {
      phrasesModel,
      typosModel,
    });

    for (var i = 0; i < sentence.terms.length; i++) {
      for (var nGramSize = minWords; nGramSize <= maxWords; nGramSize++) {
        extractNounEdgeGrams(
          nGramSize,
          sentence.terms,
          i,
          nGrams,
          minWordLength,
          sentenceNumber
        );
      }
    }

    return sentence.text;
  });

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
  //sort keyphrases by words
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
      var phraseTokenized = tokenizeWikiPhrases(keyphraseGram.keyphrase, {
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
  for (var i = 0; i < sentencesPOS.length; i++)
    sentenceKeysMap.push({
      text: sentencesPOS[i],
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

  return { top_sentences, keyphrases, sentences: sentencesPOS };
}
