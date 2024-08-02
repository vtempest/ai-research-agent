import { stopWords } from "../tokenize/stopwords";

/**
 * Searches terms from index for ngram of given size
 * and maps them to nGrams object.
 * Ngrams include nouns and small stop words.
 *
 * @param {number} nGramSize
 * @param {Array<Object>} terms
 * @param {number} index
 * @param {Object} nGrams
 * @param {number} minWordLength
 * @param {number} sentenceNumber
 */
export default function extractNounEdgeGrams(
  nGramSize,
  terms,
  index,
  nGrams,
  minWordLength,
  sentenceNumber
) {
  if (!terms[index + nGramSize - 1]) return;
  if (!nGrams[nGramSize]) nGrams[nGramSize] = {};

  var nextWords = terms.slice(index, index + nGramSize);
  if (
    isNoun(nextWords[0]) &&
    isNoun(nextWords[nGramSize - 1]) &&
    nextWords.every(
      (word) =>
        word[4]?.length >= minWordLength && (isNoun(word) || isStopWord(word)) // or is a stop word like 'state of the art'
    )
  ) {
    var nextWordsString = nextWords.map((v) => v[4]).join(" ");
    if (!nGrams[nGramSize][nextWordsString])
      nGrams[nGramSize][nextWordsString] = [];

    nGrams[nGramSize][nextWordsString].push(sentenceNumber);
  }

  return nGrams;
}

/**
 * Checks if token is a noun
 * @param {Object} token
 * @returns
 */
export function isNoun(token) {
  return token[1] >= 3 && token[1] <= 28 ||  token[1] == 50;
}

/**
 * Checks if token is a commonly-ignored stop word
 * @param {Object} token
 * @returns
 */
export function isStopWord(token) {
  var stopWordsArray = stopWords.split(",");

  return stopWordsArray.includes(token[4]);
}
