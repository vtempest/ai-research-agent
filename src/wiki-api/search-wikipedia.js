import splitSentences from "../tokenize/sentences.js";

/**
 * Search Wikipedia for a query, return result's title, summary, and image. 
 *
 * @param {string} query search phrase 
 * @param {object} options Options object with the following properties and defaults:
 * @param {object.options} plainText = false, // Return plain text instead of HTML
 * @param {object.options} summarySentenceLimit = 3, // Limit summary to this many sentences
 * @param {object.options} limitSearchResults = 1, // Limit number of search results
 * @param {object.options} images = true, // Include image in results
 * @param {object.options} imageSize = 200, // Image size in pixels
 * @param {object.options} searchInTitleOnly = false, // Search in title only
 * @param {object.options} filterDisambiguation = true, // Filter disambiguation pages
 * @example await searchWikipedia("JavaScript", { plainText: true })
 * @returns {object} {results: [ {title, summary, image}, ...]}
 * @returns {object} Returns {error} if no results found. {error: "No results"}
 */
export default async function searchWikipedia(query, options = {}) {
  // Set default options
  var {
    plainText = false,
    summarySentenceLimit = 3,
    limitSearchResults = 2,
    images = true,
    imageSize = 200,
    searchInTitleOnly = true,
    filterDisambiguation = true,
  } = options;

  // Formet URL for Wikipedia search
  var url =
    "https://en.wikipedia.org/w/api.php?action=query&gsrlimit=" +
    limitSearchResults +
    "&origin=*&" +
    (plainText ? "explaintext=1&exsectionformat=plain" : "") +
    "&generator=search&exintro=&inprop=url&prop=" +
    (images ? "extracts|pageimages|info" : "extracts|info") +
    "&format=json&gsrsearch=" +
    (searchInTitleOnly ? "intitle:" : "") +
    query.replace(/ /g, "%20");

  // Fetch search results as JSON
  var info = await (await fetch(url)).json();

  // Return error if no results found
  if (!info || !info.query || !Object.keys(info?.query?.pages).length)
    return { error: "No results" };

  var resultsKeys = Object.keys(info.query.pages);
  var resultsObjects = [];

  for (var i = 0; i < resultsKeys.length; i++) {
    // Get first search result
    var pageObject = info.query.pages[resultsKeys[i]];

    // Create page data object with title
    var pageData = { title: pageObject.title };
    pageData.url = pageObject.fullurl;

    //preserve basic html but remove links and spans of wiki-classes
    var extract = plainText
      ? pageObject.extract?.replace(/[\n\r]/g, " ")
      : pageObject.extract
          ?.replace(/<(link|span|\/span)[^>]*>/g, " ")
          ?.replace(/( class=\"mw-empty-elt\")/g, "")
          .replace(/[\n\r]/g, " ")
          .replace(/<p>[ ]*<\/p>/g, "")
          .replace(/<p>/g, ""); //remove all paragraphs since we get a few sentences

    // Use sentence boundary detection to limit summary to a few sentences
    pageData.summary =
      summarySentenceLimit > 0
        ? splitSentences(extract).slice(0, summarySentenceLimit).join(" ")
        : extract;

    // Check if page is a disambiguation page
    if (extract.includes(" may refer to: </p>"))
      pageData.isDisambiguation = true;

    // Get image if requested in size specified
    if (images)
      pageData.image = pageObject.thumbnail
        ? pageObject.thumbnail.source.replace("/50px", "/" + imageSize + "px")
        : null;

    // push into results the page data object with title, summary, and image
    resultsObjects.push(pageData);
  }

  //remove disambiguation pages like "___ may refer to"
  if (filterDisambiguation)
    resultsObjects = resultsObjects.filter((i) => !i.isDisambiguation);

  return { results: resultsObjects };
}



/**
 * Compute the softmax of an array of numbers.
 * https://en.wikipedia.org/wiki/Softmax_function
 *
 * Softmax is a generalization of the logistic sigmoid function used in
 * logistic regression. It is commonly used in machine learning models
 * for multi-class classification problems where there are more than two
 * possible output classes. The softmax function takes a vector of arbitrary
 * real-valued scores and squashes it to a vector of values between 0 and 1
 * that sum to 1. This allows the output to be interpreted as a probability
 * distribution over the possible classes.
 *
 * @param {array} arr The array of numbers to compute the softmax of.
 * @returns {array} The softmax array.
 */

export function softmax(array) {
  return array.map(
    (val, index) =>
      Math.exp(array[index]) /
      array.map((y) => Math.exp(y)).reduce((a, b) => a + b)
  );
}
