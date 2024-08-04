/**
 * QUASAR: Quotes-Unifying Alphanumeric Search-All RegExp
 * Search document for all words of query ignoring casing
 * but "words in quotes" as necessarily together like in Google.
 * @param {string} document
 * @param {string} query
 * @returns {boolean} true if doc has all words and "in phrases"
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
