
import {isWordCommonIgnored} from "../tokenize/stopwords";

/**
 * Extracts noun-based edge grams from a given set of terms. This function is crucial
 * for identifying important multi-word concepts in the text.
 * 
 * The function looks for sequences of words (n-grams) that:
 * 1. Start and end with a noun
 * 2. Contain words that are either nouns or common ignored words (like articles or prepositions)
 * 3. Meet the minimum word length requirement
 * 
 * @param {number} nGramSize - The size of the n-grams to extract. For example, 2 for bigrams, 3 for trigrams, etc.
 * @param {Array<Array<string|number>>} terms - Array of terms, where each term is an array containing the word and its part of speech tag.
 *                                              Example: [["The", 1], ["quick", 2], ["brown", 2], ["fox", 3]]
 * @param {number} index - The starting index in the terms array to begin extraction. This allows for sliding window extraction.
 * @param {Object<number, Object<string, number[]>>} nGrams - Object to store the extracted n-grams. 
 *                                                            Structure: {nGramSize: {nGramString: [sentenceNumbers]}}
 * @param {number} minWordLength - The minimum length a word should have to be considered in the n-gram.
 * @param {number} sentenceNumber - The current sentence number being processed. Used to track which sentences contain the n-gram.
 * @returns {Object<number, Object<string, number[]>>} The updated nGrams object with newly extracted n-grams.
 * @category Topics
 * @example
 * let terms = [["The", 1], ["quick", 2], ["brown", 2], ["fox", 3], ["jumps", 4]];
 * let nGrams = {};
 * extractNounEdgeGrams(3, terms, 0, nGrams, 3, 1);
 * // nGrams might now contain: {3: {"brown fox jumps": [1]}}
 */
export function extractNounEdgeGrams(
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
  // Check if the n-gram starts and ends with a noun, and all words meet the criteria

  if (
    isNoun(nextWords[0]) &&
    isNoun(nextWords[nGramSize - 1]) 
    && nextWords.every(
      (word) =>
        word[0]?.length >= minWordLength && 
      (isNoun(word) || isWordCommonIgnored(word[0]))  )
  ) {
    var nextWordsString = nextWords.map(v => v[0]).join(" ");
    if (!nGrams[nGramSize][nextWordsString])
      nGrams[nGramSize][nextWordsString] = [];

    nGrams[nGramSize][nextWordsString].push(sentenceNumber);
  }

  return nGrams;
}

/**
 * Checks if a token represents a noun based on its part of speech tag.
 * This function uses a range of POS tags to identify nouns, including
 * common nouns, proper nouns, and potentially other noun-like categories.
 * 
 * @param {Array<string|number>} token - An array containing the word and its part of speech tag.
 *                                       The POS tag is expected to be a number at index 1.
 * @returns {boolean} True if the token is a noun, false otherwise.
 * @private
 */
export function isNoun(token) {
  // POS tags 3-28 and 50 are considered nouns
  // This may need to be adjusted based on the specific POS tagging system used
  return (token[1] >= 3 && token[1] <= 28) || token[1] == 50;
}