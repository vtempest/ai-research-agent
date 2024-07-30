/**
 * QUASAR: Quotes-Unifying Alphanumeric Search-All RegExp
 * Search document_text for all words of query
 * ignoring casing except treat "words in quotes" as required 
 * to be together like in Google search.
 * @param {string} document_text 
 * @param {string} query 
 * @returns {boolean} true if found all words and "in phrases"
 */
export default function matchQuasar(document_text, query) {
    return new RegExp(
      "(?=.*" +
        query
          .match(/"([^"]+)"|[\w]+/gi)
          .join(")(?=.*")
          .replace(/\"/g, "") +
        ").+",
      "ig"
    ).test(document_text.replace(/\n/g, " "));
  }