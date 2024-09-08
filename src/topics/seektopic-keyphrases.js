
import { splitSentences } from "../../index.js";
import { tokenizeTopics } from "../../index.js";
import { rankSentencesCentralToKeyphrase } from "./rank-sentences-keyphrases.js";
import { extractNounEdgeGrams } from "./ngrams.js";

/**
 * <h3> 🔤📊 SEEKTOPIC: Summarization by Extracting Entities,
 * Keyword Tokens, and Outline Phrases Important to Context </h3>
 * This can be used to find unique, domain-specific keyphrases using noun Ngrams. 
 * Weights sentences using TextRank noun keyphrase frequency
 * to find which sentences centralize and tie together keyphrase
 * concepts referred to most by other sentences. Based on the  & PageRank algorithms,
 * it randomly surfs nodes to find probability of being at that node, thus ranking influence.  <br />
 * 
 * @description
 * 1. Split into sentences with exceptions for 222 common abbrev., numbers, URLs, etc. <br />
 * 2. Use this Wiki Phrases tokenizer to extract wiki topics, phrases, and nouns. It checks 
 * for spelling typos and uses Porter Stemmer to check root words if original word is not found. <br />
 * 3. Extract Noun Edgegrams. Stop words are allowed in the middle like "state of the art" <br />
 * 4. Fold smaller Ngrams that are subsets of larger ones by comparing weight into keyphrases  <br />
 * 5. Calculate named entities and phrase domain specificity to reward unique keyphrases, using WikiIDF. 
 *  Domains-specific examples in medical data would be "endocrinology" or in religion it is "thou shall" 
 * which can help build category label classifiers.  We can find repeated phrases that are unique to that
 *  document's field, as opposed to common phrases in all docs. <br />
 * 6. Pass to the next layer only a cut  of top keyphrases sorted by frequency ^ word count <br />
 * 7. Create a double-ring weighted graph mapping keyphrases as the central ring and each sentence that uses
 *  that concept on the outer ring and give each link weights to determine probability of going to that link  <br />
 * 8.  Weights sentences using TextRank noun keyphrase frequency to find which sentences centralize and tie
 *  together keyphrase concepts refered to most by other sentences. Based on the TextRank & PageRank algorithms,
 *  it randomly surfs links to nodes to find probability of being at that node, thus ranking influence. There's 
 * also random jumps to prevent stuck in a loop around same sentences. <br />
 * 9. Cut off top Number or percent (for larger docs) of top sentences and keyphrases by overall weight and graph
 *  centrality  <br />
 * 10. Returns Top Sentences (and  keyphrases for each sentence) and Top Keyphrases (and which sentences for each
 *  keyphrase).  <br />
 * 11. If the user clicks a keyphrase, or if there was a search query leading to doc, we can compare similarity of 
 * query to which keyphrase is most similar -- then we give that keyphrase a lot more weight and rerank everything
 *  from step #8 TextRank.  <br />
 *  <video src="https://github.com/user-attachments/assets/73348d63-7671-4e20-8df9-29a13d5b0768" width="200px"  />

@param {string} docText - input text to analyze
 * @param {Object} [options]
 * @param {Object} options.phrasesModel - phrases model
 * @param {number} options.maxWords default=5 - maximum words in a keyphrase
 * @param {number} options.minWords default=1 - minimum words in a keyphrase
 * @param {number} options.minWordLength default=3 - minimum length of a word
 * @param {number} options.topKeyphrasesPercent default=0.2 - percentage of top keyphrases to consider
 * @param {number} options.limitTopSentences default=5 - maximum number of top sentences to return
 * @param {number} options.limitTopKeyphrases default=10 - maximum number of top keyphrases to return
 * @param {number} options.minKeyPhraseLength default=6 - minimum length of a keyphrase
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
  if (removeHTML) docText = docText.replace(/<[^>]*>/g, "");

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

      var largerKeyphraseSplit = keyphrasesFolded[i].keyphrase.split(" ");
      // compare sorted arrays of words, see if at least 2 words different
      var diff = phrase
        .split(" ")
        .filter((x) => !largerKeyphraseSplit.includes(x)).length;
      if (diff < 2) {
        //combine weight of smaller keyphrase into larger, divided by word count
        keyphrasesFolded[i].weight +=
          keyphraseObject.weight /
          keyphrasesFolded[i].keyphrase.split(" ").length;
        keyphrasesFolded[i].sentences = [
          ...new Set(
            keyphrasesFolded[i].sentences.concat(keyphraseObject.sentences)
          ),
        ];

        // use whatever version has greater weight as keyphrase text
        if (keyphrasesFolded[i].weight < keyphraseObject.weight) {
          keyphrasesFolded[i].keyphrase = keyphraseObject.keyphrase;
          keyphrasesFolded[i].words = keyphraseObject.words;
        }
        shouldAddCurrent = false;
      }
    }

    if (shouldAddCurrent && keyphraseObject.sentences.length >= 1)
      keyphrasesFolded.push(keyphraseObject);
  }

  // heavy heare

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

      //heavy weight query - bias towards query or user-clicked keyphrase
      // TODO - compare concept similarity of keyphrases to heavyWeightQuery

      if (heavyWeightQuery) {
        var querySplit = heavyWeightQuery.split(" ");

        var diffWords = querySplit.filter(
          (x) => keyphraseObject?.keyphrase?.indexOf(x) == -1
        ).length;

        if (diffWords < 4 && diffWords < querySplit.length - 1)
          keyphraseObject.weight += 4000 - diffWords * 1000;
      }

      return keyphraseObject;
    })
    //filter out keyphrases that are too short
    .filter((k) => k.keyphrase.length > minKeyPhraseLength)
    .sort((a, b) => b.weight - a.weight);
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
      keyphrases: [...new Set(s.keyphrases.map((k) => k.keyphrase))]
    }));

  // limit keyphrases to top K
  var keyphrases = keyphraseObjects.slice(0, limitTopKeyphrases).map((k) => ({
    ...k,
    sentences: k.sentences.join(","),
  }));

  return { topSentences, keyphrases, sentences: sentencesArray };
}
