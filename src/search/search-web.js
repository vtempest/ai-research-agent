import { convertHTMLSpecialChars } from "../extractor/html-to-content/html-utils.js";
import { scrapeURL } from "../../index.js";
/**
 * Search Web via SearXNG metasearch of all major search engines.
 * Options are 10 search categories, recency, and how many
 * times to retry other domains if first time fails.
 * SearXNG is a free internet metasearch engine which aggregates results from more than 70 search services.
 * @param {string} query - The search query string.
 * @param {Object} [options]
 * @param {number} options.category default=0 - ["general", "news", "videos", "images",
 *  "science", "map", "music", "it", "files", "social+media"]
 * @param {number} options.recency default=0 - ["", "day", "week", "month", "year"]
 * @param {string|boolean} options.customSearxngDomain default=null - Use your custom domain SearXNG
 * @param {number} options.maxRetries default=3 - Maximum number of retry attempts if the initial search fails.
 * @param {number} options.page default=1 - The page number to retrieve.
 * @returns {Promise<Array<{title: string, url: string, snippet: string, engines: string[], cached: string}>>} An array of search result objects.
 * @throws {Error} Throws an error if the search fails after all retry attempts.
 * @example  const advancedResults = await searchWeb('Node.js', {
 *   category: 2,
 *   recency: 1,
 *   maxRetries: 5
 * });
 * @author [Gulakov, A. (2024)](https://airesearch.wiki)
 * 
 * [Heiser, M., Tauber, A., Flament, A., et al. (2014-)](https://github.com/searxng/searxng/graphs/contributors)
*/
export async function searchWeb(query, options = {}) {
  const {
    category = 0,
    recency = 0,
    customSearxngDomain = 0,
    maxRetries = 3,
    page = 1,
    language = "en-US",
  } = options;

  const CATEGORY_LIST = [
    "general",
    "news",
    "videos",
    "images",
    "science",
    "map",
    "music",
    "it",
    "files",
    "social+media",
  ];
  const RECENCY_LIST = ["", "day", "week", "month", "year"];

  const SEARX_DOMAINS = [
    "baresearch.org",
    "copp.gg",
    "darmarit.org",
    "etsi.me",
    "fairsuch.net",
    "nogoo.me",
    "northboot.xyz",
    "nyc1.sx.ggtyler.dev",
    "ooglester.com",
    "opnxng.com",
    "paulgo.io",
    "priv.au",
    "s.trung.fun",
    "search.blitzw.in",
    "search.charliewhiskey.net",
    "search.citw.lgbt",
    "search.darkness.services",
    "search.datura.network",
    "search.dotone.nl",
    "search.gcomm.ch",
    "search.hbubli.cc",
    "search.im-in.space",
    "search.incogniweb.net",
    "search.inetol.net",
    "search.leptons.xyz",
    "search.nadeko.net",
    "search.ngn.tf",
    "search.ononoki.org",
    "search.privacyredirect.com",
    "search.sapti.me",
    "search.rowie.at",
    "search.projectsegfau.lt",
    "search.tommy-tran.com",
    "searx.aleteoryx.me",
    "searx.ankha.ac",
    "searx.be",
    "searx.colbster937.dev",
    "searx.daetalytica.io",
    "searx.dresden.network",
    "searx.foss.family",
    "searx.hu",
    "searx.juancord.xyz",
    "searx.lunar.icu",
    "searx.mxchange.org",
    "searx.namejeff.xyz",
    "searx.oakleycord.dev",
    "searx.ro",
    "searx.sev.monster",
    "searx.thefloatinglab.world",
    "searx.tiekoetter.com",
    "searx.tuxcloud.net",
    "searx.work",
    "searx.zhenyapav.com",
    "searxng.hweeren.com",
    "searxng.online",
    "searxng.shreven.org",
    "searxng.site",
    "skyrimhater.com",
    "sx.ca.zorby.top",
    "sx.catgirl.cloud",
    "sx.thatxtreme.dev",
    "sx.zorby.top",
    "xo.wtf",
  ];

  //select a random domain if none is provided 

  const searchDomain =
  customSearxngDomain ||
    "https://" +
      SEARX_DOMAINS[Math.floor(Math.random() * SEARX_DOMAINS.length)];

  const categoryName = CATEGORY_LIST[category]; // Using the first category as default
  const timeRangeName = RECENCY_LIST[recency]; // Using the first time range as default

  const url = `${searchDomain}/search?q=${encodeURIComponent(query)}` +
    `&category_${categoryName}=1&language=${language}&time_range=${timeRangeName}` +
    `&safesearch=0&pageno=${page}`;

  const resultHTML = await scrapeURL(url, {
    headers: {
      "accept-language": language+",en;q=0.9",
    },
  })
  let results = [];
  const resultRegex = /<article class="result[^>]*>[\s\S]*?<\/article>/g;
  const titleUrlRegex = /<h3><a href="([^"]*)"[^>]*>(.*?)<\/a><\/h3>/;
  const snippetRegex = /<p class="content">\s*(.*?)\s*<\/p>/;
  const enginesRegex = /<span>(bing|duckduckgo|yahoo|google)<\/span>/g;
  const linksRegex =
    /<a href="([^"]*)" class="(cache_link|proxyfied_link)"[^>]*>(cached|proxied)<\/a>/g;

  let match;
  while ((match = resultRegex.exec(resultHTML)) !== null) {
    const resultHtml = match[0];
    const titleUrlMatch = titleUrlRegex.exec(resultHtml);
    const snippetMatch = snippetRegex.exec(resultHtml);

    if (titleUrlMatch && titleUrlMatch[1] && titleUrlMatch[2]) {
      const url = convertHTMLSpecialChars(titleUrlMatch[1]);
      let title = titleUrlMatch[2].replace(/<\/?[^>]+(>|$)/g, "");
      let snippet = snippetMatch
        ? snippetMatch[1].replace(/<\/?[^>]+(>|$)/g, "")
        : "";

      let engines = [];
      let engineMatch;
      while ((engineMatch = enginesRegex.exec(resultHtml)) !== null) {
        engines.push(engineMatch[1]);
      }

      let cached = null;
      let linkMatch;
      while ((linkMatch = linksRegex.exec(resultHtml)) !== null) {
        cached = linkMatch[1];
      }

      title = convertHTMLSpecialChars(title);
      snippet = convertHTMLSpecialChars(snippet);
      if (!url.includes(".de/")) results.push({ title, url, snippet });
    }
  }

  if (results.length === 0 && maxRetries > 0) {
    console.log("No results found with ", searchDomain);
    results = await searchWeb(query, {
      category,
      recency,
      maxRetries: maxRetries - 1,
    });
  }

  //filter out url that end with .de
  results = results.filter((result) => !result.url.includes(".de/"));

  return results;
  // } catch (error) {
  //   console.error(`Error fetching search results: ${error.message}`);
  //   return [];
  // }
}
