import sbd from "sbd";
import nlp from "compromise";
const nlpWikipedia = require( "compromise-wikipedia"); 
// default import throws an error here
// https://github.com/spencermountain/compromise/blob/18db3dadcef0d87beabf71317d0904806355ec52/plugins/wikipedia/src/plugin.js#L1

/**
 * Searches text for wikipedia named entities from list of 38K popular pages
 * returns page titles, match indexes, and count
 * @param {string} text - text to search for wikipedia entities
 * @returns {arrray} [{ title, matchCount, matchIndexes}]
 */
export default function WikiEntityRecognition(text, options = {}) {
  var {
    matchPositions = true,
    limit = 10,
  } = options;

  var doc = nlp(text);
  nlp.extend(nlpWikipedia);

  var wikiEntities = doc.wikipedia()
    .json()
    .map((i) => i.text.replace(/[\.\,\[\]\(\)]/g, "").trim());
  wikiEntities = [...new Set(wikiEntities)];

  var wikiEntitiesMatches = [];
  if (matchPositions) {
    for (var title of wikiEntities) {
      if (!title || title.length < 3) continue;
      var matches = Array.from(text.matchAll(title)).map((i) => i.index);

      wikiEntitiesMatches.push({
        text: title,
        matchCount: matches.length,
        matchIndexes: matches,
      });
    }
    wikiEntitiesMatches = wikiEntitiesMatches
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, limit);
  } else {
    wikiEntitiesMatches = wikiEntities.map(i => {
      return { text: i };
    });
  }

  return wikiEntitiesMatches;
}