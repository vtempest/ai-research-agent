import fs from 'fs';
var wikiWordFrequency = JSON.parse(
  fs.readFileSync("./data/wiki-word-freq-325k.json", "utf8")
);
/** 
 * Find domain-specific unique words for a single doc with BM25 formula 
 * by using Wikipedia term frequencies as the common words corpus.
 * 
 * @param {string} query phrase to search wiki-idf for each word
 * @returns {number} score for term specificity 
 */
export default function weightWikiWordSpecificity(
  query
) {
  const totalWikiPages = 6000000;
  const queryTerms = query.toLowerCase().split(/\W+/);

  let phraseScoreList = queryTerms.map((term) => {
    //skip terms that are too short
    if (term.length < 3) return null;

    //calculate IDF from Wikipedia term frequency
    const wikiPagesWithTerm = wikiWordFrequency[term] //|| 10;

    if (!wikiPagesWithTerm) return null;

    return Math.log(
      (totalWikiPages - wikiPagesWithTerm ) / (wikiPagesWithTerm ) +
        1
    ) ;
  }).filter(Boolean)
  
  var phraseScore = Math.floor(phraseScoreList.reduce((a, b) => a + b, 0) / phraseScoreList.length) || 5;
  return phraseScore;
}
