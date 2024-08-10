import {searchWeb} from "../../index.js";
import {extract} from "../../index.js";

/**
 * 🤖🔎 STREAM: Search with Top Result Extraction & Answer Model
 * 
 * This function performs a comprehensive search and analysis process: \n
 * 1. Searches the Web for the query via metasearch of major engines or custom data.\n
 * 2. Extracts text of top results using Tractor the Text Extractor.\n
 * 3. Implements SEEKTOPIC to extract Keyphrase Topics and Top Sentences that centralize those topics.\n
 * 4. Reranks document chunks based on relevance to the query, using embeddings to \n
 * convert text to concept vectors within LLM "concept space", and calculates cosine similarity of query to topic.
 * 5. Uses a Research Agent prompt with key sentences from relevant sources to generate an answer via Groq\n
 *  Llama, OpenAI, or Anthropic API, and suggests follow-up queries.
 *
 * @async
 * @param {string} query - The search query string.
 * @param {object} options={} - Optional configuration for the search process.
 * @param {number} options.categoryIndex=0 - Index of the search category.
 * @param {number} options.recencyIndex=0 - Index representing the recency of results.
 * @param {number} options.maxRetries=5 - Maximum number of retry attempts for the search.
 * @param {number} options.maxTopResultsToExtract=6 - Maximum number of top results to extract and analyze.
 * @returns {Promise<Array>} A promise that resolves to an array containing the search results, extracted information, and generated answer.
 * @throws {Error} Throws an error if the search or analysis process fails.
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
    maxRetries = 5,
    maxTopResultsToExtract = 6,
  } = options;

  var timerStart = Date.now();

  //try archive.org if original url fails or bot-blocked

  const optionUseCacheBackup = 1;

  let results = await searchWeb(query, {
    categoryIndex,
    recencyIndex,
    maxRetries,
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
