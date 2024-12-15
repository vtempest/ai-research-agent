/**
 * Find query words in tab content and if found return object
 * {dispString, id, title, favIconUrl, lastSearchWord}
 *
 * @param {object} document - {tabId, title, favIconUrl, content}
 * @param {string} searchText
 * @param {number} [snippetTextSize=100]
 * @returns {object} {dispString, id, title, favIconUrl, lastSearchWord}
 */
export default function findInTabContent(
  { tabId, title, favIconUrl, content },
  searchText,
  snippetTextSize = 100
) {
  content =
    title +
    " " +
    content.replace(
      /(<(noscript|script|style)\b[^>]*>).*?(<\/\2>)/gis,
      "$1$3"
    )
    .replace(/\r?\n|\r/g, " ")
    .replace(/<style(.|\n)+?\/style>/gi, "")
    .replace(/<noscript(.|\n)+?\/noscript>/gi, "")
    .replace(/<script(.|\n)+?\/script>/gi, "")
    .replace(/<(.|\n)+?>/gi, " ");
    
  //search to find all words in tab content
  var foundAllWords = true;
  var searchSplit = searchText
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((x) => x.length > 1);
  
    //quit if nothing to search
  if (searchSplit.length == 0) return;

  for (var i in searchSplit)
    if (searchSplit[i].length > 0)
      if (content.toLowerCase().indexOf(searchSplit[i]) == -1)
        foundAllWords = false;

  //quit if all words not found
  if (!foundAllWords) return;

  let lastSearchWord = searchSplit[searchSplit?.length - 1];

  //create title
  if (title.length > 45) title = title.substr(0, 45) + "&hellip;";

  //create snippet substring
  let indexStartWord =
    lastSearchWord && content.toLowerCase().indexOf(lastSearchWord);
  let indexEndWord = indexStartWord + (lastSearchWord?.length || 0);

  let dispString =
    content.substring(
      Math.max(indexStartWord - snippetTextSize, 0),
      indexStartWord
    ) +
    "<b>" +
    content.substring(indexStartWord, indexEndWord) +
    "</b>" +
    content.substring(indexEndWord, indexEndWord + snippetTextSize);

  return {
    dispString,
    id: tabId,
    title,
    favIconUrl,
    lastSearchWord,
  };
}
