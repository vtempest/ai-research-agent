
import { splitSentences } from "../../index.js";
import { convertTextToTokens } from "../../index.js";
import { rankSentencesCentralToKeyphrase } from "./rank-sentences-keyphrases.js";
import { extractNounEdgeGrams } from "./ngrams.js";

/**
 * ### 🔤📊 SEEKTOPIC: Summarization by Extracting Entities, Keyword Tokens, and Outline Phrases Important to Context 
 * Extracts unique, domain-specific key phrases from a document using noun 
 * n-grams and ranks sentences based on their centrality to the most frequently 
 * referenced key phrase concepts,  enabling efficient extraction of 
 * domain-specific content. This can be a first step to use key sentences or topics
 * to vectorize or fit more docs into context limit and visualize them in vector space.
 * 1. Sentence Segmentation: Split the text into sentences, accounting for 
 *    common abbreviations, numbers, URLs, and other exceptions.
 * 2. Tokenization and Phrase Extraction: Employ a Wiki Phrases tokenizer to 
 *    identify wiki topics, phrases, and nouns. This includes spell-checking 
 *    and root word verification using Porter Stemmer.
 * 3. Noun N-gram Extraction: Generate noun edge-grams, allowing for stop words 
 *    in the middle (e.g., "state of the art").
 * 4. Key Phrase Consolidation: Merge smaller n-grams that are subsets of 
 *    larger ones by comparing weights.
 * 5. Domain Specificity Calculation: Determine named entities and phrase 
 *    domain specificity using WikiIDF. This rewards unique key phrases 
 *    specific to the document's field (e.g., "endocrinology" in medical texts 
 *    or "thou shall" in religious texts).
 * 6. Key Phrase Filtering: Select top key phrases based on a combination of 
 *    frequency and word count.
 * 7. Graph Construction: Create a double-ring weighted graph with key phrases 
 *    in the central ring and sentences in the outer ring. Assign weights to 
 *    links based on concept usage probability.
 * 8. Sentence Weighting: Apply TextRank algorithm to weight sentences, 
 *    identifying those that centralize and connect key phrase concepts most 
 *    referenced by other sentences. This process, based on TextRank and 
 *    PageRank, includes random surfing and jumping to avoid loops.
 * 9. Top Results Selection: Select top sentences and key phrases based on 
 *    overall weight and graph centrality, using either a fixed number or 
 *    percentage for larger documents.
 * 10. Output Generation: Return top sentences (with associated key phrases) 
 *     and top key phrases (with associated sentences).
 * 11. Dynamic Reranking: If a user interacts with a key phrase or if there's a 
 *     search query leading to the document, compare query similarity to key 
 *     phrases, heavily weight the most similar key phrase, and reapply 
 *     TextRank from step 8.
 *
 * 
 * <video src="https://github.com/user-attachments/assets/73348d63-7671-4e20-8df9-29a13d5b0768" 
 *  width="550px" controls />
 * @param {string} docText - input text to analyze
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
 * @returns {{
 *  topSentences: Array<Object>,  
 *  keyphrases: Array<Object>,
 *  sentences: Array<string>
 * }} 
 * @example
 *   const result = extractSEEKTOPIC(testDoc, { phrasesModel, heavyWeightQuery: "self attention", limitTopSentences: 10});
 *   console.log(result.topSentences); // Array of top sentences with their keyphrases and weights
 *   console.log(result.keyphrases); // Array of top keyphrases with their weights and associated sentence indices
 *   console.log(result.sentences); // Array of all sentences in the input text
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
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

    var tokens = convertTextToTokens(text, {
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
      var phraseTokenized = convertTextToTokens(keyphraseObject.keyphrase, {
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
