import {searchWeb} from "../..";
import {extract} from "../..";

/**
 * 🤖🔎 STREAM: Search with Top Result Extraction & Answer Model 
 * 1. Search Web for query via metasearch of major engines or your custom data
 *  2. Extract text of top results with Tractor the Text Extractor.
 *  3. SEEKTOPIC: Extract Keyphrase Topics and Top Sentences that centralize those topics
 *  4. Rerank documents's chunks based on relevance to query,  using embeddings by convert text to concept vector of numbers within LLM  "concept space", and cosine similarity of query to topic, returning the sentences central to key relevant parts of the article.
 *  5. Research Agent prompt with key sentences from relevant sources to answer via Groq Llama, OpenAI, or Anthropic API Key and suggest follow-ups
 * @param {string} query
 * @param {object} options
 * @returns {Promise<Array[]>} 
 * 
 */
export async function searchSTREAM(query, options = {}) {
  const {
    categoryIndex = 0,
    recencyIndex = 0,
    maxRetries = 3,
    maxTopResultsToExtract = 6,
  } = options;

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
  console.log("Search results:", results);

  for (const r of results) {
    let extraction = await extract(r.url);

    if (optionUseCacheBackup && extraction.error)
      extraction = await extract(r.cached);

    if (extraction.error) console.error("error", extraction);

    // extraction.html = "";
    // html.html = splitSentences.default(html.html);
    console.log("Extracted content:", extraction);
  }
}
