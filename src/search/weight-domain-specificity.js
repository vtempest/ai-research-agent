import wikiWordFrequency from "../data/wiki-word-freq-min32.js";

/**
 * Get the domain-specific score for query words by comparing the 
 * inverse document frequency (IDF) of the term in Wikipedia.  
 * Generally 0-15 with higher meaning rarer, more domain-specific term.
 *  Domains-specific examples in medical data would be "endocrinology" 
 *  or in religion it is "thou shall" which can build label classifiers. 
 * @param {string} query phrase to search wiki-idf for each word
 * @returns {number} score for term specificity,
 */
export function weightDomainSpecificity(query) {
  const totalWikiPages = 6000000;

  let phraseScoreList = query.toLowerCase().split(/\W+/).map(term => {

    //skip terms that are too short
    if (term.length < 3) return null;

    //calculate IDF from Wikipedia term frequency
    const wikiPagesWithTerm = wikiWordFrequency[term] //|| 10;

    // skip terms not found in wiki, to avoid random words, often html errors
    if (!wikiPagesWithTerm) return null; 

    // calculate Wiki-IDF score
    return Math.log(
      (totalWikiPages - wikiPagesWithTerm ) / (wikiPagesWithTerm ) +
        1
    ) ;
  }).filter(Boolean)

  // average the scores for each term in the phrase
  var phraseScore = Math.floor(phraseScoreList.reduce((a, b) => a + b, 0) / phraseScoreList.length) || 1;
  return phraseScore;
}
