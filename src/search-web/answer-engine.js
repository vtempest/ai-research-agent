import searchWeb from "./search-web.js"
import extract from "../extractor/url-to-content/url-to-content.js";
// import { splitSentences } from "research-agent-model";

// Constants
const OPTION_MAX_RESULTS = 6;

/**
 * Search Web via SearXNG metasearch of all major search engines.
 * Options are 10 search categories, recency, and how many
 * times to retry other domains if first time fails.
 * @param {string} query
 * @param {object} options
 * @returns {Promise<Array[]>} {title, url, snippet, engines, cached}
 */
export async function researchAgent(query, options = {}) {

  const {
    categoryIndex = 0,
    recencyIndex = 0,
    selectedDomain = null,
    maxRetries = 3,
  } = options;



  //try archive.org if original url fails or bot-blocked

  const optionUseCacheBackup = 1;


  const query = "what will claude ai look like "; 
  let results = await searchWeb(query, { categoryIndex: 0, recencyIndex: 2 });

  if (!results || results.length === 0) {
    console.log("No results found.");
    return;
  }

  results = results.slice(0, OPTION_MAX_RESULTS);
  console.log("Search results:", results);

  for (const r of results) {
    let extraction = await extract(r.url);

    if (optionUseCacheBackup && extraction.error) 
      extraction = await extract(r.cached);

    if(extraction.error)
      console.error("error", extraction)

    extraction.html = ''    
    // html.html = splitSentences.default(html.html);
    console.log("Extracted content:", extraction);
  }




}

// Run the main function
main();
