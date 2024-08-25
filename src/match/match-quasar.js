/**
 * QUASAR: Quotes-Unifying Alphanumeric Search-All RegExp
 * Search document for all words of query ignoring casing
 * but "words in quotes" as necessarily together like in Google.
 *  Uses negative lookaheads (?= bar(?=bar) to find the 1st "bar" and ignore second. 
 * Single line function that can be used anywhere.
 * @param {string} document
 * @param {string} query
 * @returns {boolean} true if doc has all words and "in phrases"
 * @category Relevance
 * @example var isFound = matchQUASAR(`Ask not what your country can do for you, ask what you can do for your country. 
 * There is nothing to fear but fear itself.`, ` "Ask not" "but fear itself" nothing`) 
*/
export function matchQUASAR(document, query) {
  return new RegExp(
    "(?=.*" +
      query
        .match(/"([^"]+)"|[\w]+/gi)
        .join(")(?=.*")
        .replace(/\"/g, "") +
      ").+",
    "ig"
  ).test(document.replace(/\n/g, " "));
}
