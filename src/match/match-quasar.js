/**
 * <h3>QUASAR: Quotes-Unifying Alphanumeric Search-All RegExp</h3> 
 * 
 * Search document for all words of query ignoring casing
 * but "words in quotes" as necessarily together like users expect
 * in web search engines.  Single line function that can be used 
 * anywhere, such as UI inputs to filter a data list.
 * 
 * <img width="350px"  src="https://i.imgur.com/IuwW97p.png" > 
 * @param {string} document
 * @param {string} query
 * @returns {boolean} true if doc has all words and "phrases in quotes"
 * @category Relevance
 * @example var isFound = matchQUASAR(`Ask not what your country can do for you, 
 * ask what you can do for your country.  is nothing to fear but fear itself.`, 
 * ` "Ask not" "but fear itself" nothing`) // returns true
*/
export function matchQUASAR(document, query) {
  //  Uses negative lookaheads
  // (?= bar(?=bar) to find the 1st "bar" and ignore second. 
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
