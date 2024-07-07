
/**
 * Searches terms from index for ngram of given size and maps them to nGrams object.
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
      nextWords[0].tags.includes("Noun") &&
      nextWords[nGramSize - 1].tags.includes("Noun") &&
      nextWords.every(
        (word) =>
          (word.normal.length >=minWordLength && word.tags.includes("Noun")) ||
          "Determiner,Preposition,Conjunction,Adjective"
            .split(",")
            .includes(word.tags[0])
      )
    ) {
      var nextWordsString = nextWords.map((v) => v.normal).join(" ");
      if (!nGrams[nGramSize][nextWordsString])
        nGrams[nGramSize][nextWordsString] = [];
  
      nGrams[nGramSize][nextWordsString].push(sentenceNumber);
    }
  
    return nGrams;
  }
  