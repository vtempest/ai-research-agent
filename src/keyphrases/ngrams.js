import stopWords from "../tokenize/stopwords";

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
* @category Topics
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
  // is noun or is a stop word like 'state of the art'
  if (
    isNoun(nextWords[0]) &&
    isNoun(nextWords[nGramSize - 1]) &&
    nextWords.every(
      (word) =>
        word[4]?.length >= minWordLength && 
      (isNoun(word) || stopWords.includes(word[4])) 
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
 * @returns {boolean}  
 * @private
 */
export function isNoun(token) {
  return (token[1] >= 3 && token[1] <= 28) || token[1] == 50;
}