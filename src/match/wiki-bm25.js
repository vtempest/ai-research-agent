import wikiTermFrequency from "../../data/wiki-word-freq-325k.json";

/**
 * Calculate term specificity for a single doc with BM25 formula 
 * by using Wikipedia term frequencies as the baseline IDF.
 *
 * @param {string} query phrase to search tf and idf for each word
 * @param {string} document a single document to calculate the score for
 * @param {number} saturationWeight saturationWeight controls the impact of term frequency saturation.
    It typically ranges from 1.2 to 2.0, with 1.5 being a common default value.
    As saturationWeight increases: The impact of term frequency increases (i.e., multiple occurrences of a term in a document become more significant).

 * @param {number} normalizeLength
   normalizeLengthcontrols the document length normalization.
    It ranges from 0 to 1, with 0.75 being a common default value.
    WhennormalizeLength= 1: Full length normalization is applied.
    Longer documents are penalized more heavily.

 * @param {number} avgDocWordCount Estimated average word count of all documents
 * @param {number} totalWikiPages Total number of Wikipedia pages used to calculate IDF
 * @returns {number} score for term specificity 
 */
export function calculateWikiBM25(
  query,
  document,
  saturationWeight = 1.5,
  normalizeLength = 0.75,
  avgDocWordCount = 2500,
  totalWikiPages = 6000000
) {
  const words = document.toLowerCase().split(/\W+/);
  const queryTerms = query.toLowerCase().split(/\W+/);
  const docLength = words.length;

  return queryTerms.reduce((score, term) => {
    const tf = words.filter((word) => word === term).length;

    //calculate IDF from Wikipedia term frequency
    const wikiPagesWithTerm = wikiTermFrequency[term] || 1;

    const wordScore =
      Math.log(
        (totalWikiPages - wikiPagesWithTerm + 0.5) / (wikiPagesWithTerm + 0.5) +
          1
      ) *
      ((tf * (saturationWeight + 1)) / tf +
        saturationWeight *
          (1 -
            normalizeLength +
            normalizeLength * (docLength / avgDocWordCount)));

    return score + wordScore || 0;
  }, 0);
}
