import {searchWeb} from "../../index.js";
import {extract} from "../../index.js";

/**
 * <h3>🤖🔎 STREAM: Search with Top Result Extraction & Answer Model</h3>  <br />
 * 1. Searches the Web for the query via metasearch of major engines or custom data.<br />
 * 2. Extracts text of top results using Tractor the Text Extractor.<br />
 * 3. Implements SEEKTOPIC to extract Keyphrase Topics and Top Sentences that centralize those topics.<br />
 * 4. Reranks document chunks based on relevance to the query, using embeddings to <br />
 * convert text to concept vectors within LLM "concept space", and calculates cosine similarity of query to topic. <br />
 * 5. Uses a Research Agent prompt with key sentences from relevant sources to generate an answer via Groq 
 *  Llama, OpenAI, or Anthropic API, and suggests follow-up queries.
 *
 * @async
 * @param {string} query - The search query string.
 * @param {object} options - default {
    categoryIndex = 0,
    recencyIndex = 0,
    maxRetries = 8,
    maxTopResultsToExtract = 3,
  } - 
    categoryIndex=0 - Index of the search category.
    recencyIndex=0 - Index representing the recency of results.
    maxRetries=5 - Maximum number of retry attempts for the search.
    maxTopResultsToExtract=6 - Maximum number of top results to extract and analyze.
 * 
 * 
 * @param {number} options.categoryIndex default=0 - Index of the search category.
 * @param {number} options.recencyIndex default=0 - Index representing the recency of results.
 * @param {number} options.maxRetries default=5 - Maximum number of retry attempts for the search.
 * @param {number} options.maxTopResultsToExtract default=6 - Maximum number of top results to extract and analyze.
 * @param {string|null} options.selectedDomain default=null - Use your custom domain SearXNG
 * @returns {Promise<Array>} A promise that resolves to an array containing the search results, extracted information, and generated answer.
 * @category Search
 * @example const advancedResults = await searchSTREAM('Latest developments in quantum computing', {
 *   categoryIndex: 2,
 *   recencyIndex: 1,
 *   maxRetries: 5,
 *   maxTopResultsToExtract: 10
 * });
 */
export async function searchSTREAM(query, options = {}) {
  const {
    categoryIndex = 0,
    recencyIndex = 0,
    maxRetries = 8,
    maxTopResultsToExtract = 3,
    selectedDomain = null,
  } = options;

  var timerStart = Date.now();

  //try archive.org if original url fails or bot-blocked

  const optionUseCacheBackup = 1;

  let results = await searchWeb(query, {
    categoryIndex,
    recencyIndex,
    maxRetries,
    selectedDomain,
  });

  if (!results || results.length === 0) {
    console.log("No results found.");
    return;
  }

  results = results.slice(0, maxTopResultsToExtract);

  for (var i in results) {
    
    let {url, cached} = results[i];

    let extraction = await extract(url);

    if (optionUseCacheBackup && extraction.error)
      extraction = await extract(cached);

    if (extraction.error) console.error("error", extraction);
  else{
    results[i] = extraction;
  }
    // extraction.html = "";
    // html.html = splitSentences.default(html.html);
    // console.log("Extracted content:", extraction);
  }


  var timeElapsed = Date.now() - timerStart;

  return {results, timeElapsed};
}
