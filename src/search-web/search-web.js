import { convertHTMLSpecialChars } from "../extractor/html-to-content/html-to-basic-html";
/**
 * Search Web via SearXNG metasearch of all major search engines.
 * Options are 10 search categories, recency, and how many
 * times to retry other domains if first time fails.
 *
 * @async
 * @function searchWeb
 * @param {string} query - The search query string.
 * @param {object} options={} - Optional configuration for the search.
 * @param {number} options.category=0 - "general", "videos", "news", "images",
 *  "science", "map", "music", "it", "files", "social+media"
 * @param {number} options.recency=0 - ["", "day", "week", "month", "year"]
 * @param {string|null} options.selectedDomain=null - Use your custom domain SearXNG
 * @param {number} options.maxRetries=3 - Maximum number of retry attempts if the initial search fails.
 * @returns {Promise<Array<{title: string, url: string, snippet: string, engines: string[], cached: string}>>} An array of search result objects.
 * @throws {Error} Throws an error if the search fails after all retry attempts.
 * @category Search
 * @example  const advancedResults = await searchWeb('Node.js', {
 *   category: 2,
 *   recency: 1,
 *   maxRetries: 5
 * });
 */
export async function searchWeb(query, options = {}) {
  const {
    category = 0,
    recency = 0,
    selectedDomain = null,
    maxRetries = 3,
  } = options;

  const CATEGORY_LIST = [
    "general",
    "videos",
    "news",
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
    "s.mble.dk",
    "s.trung.fun",
    "search.blitzw.in",
    "search.charliewhiskey.net",
    "search.citw.lgbt",
    "search.darkness.services",
    "search.datura.network",
    "search.dotone.nl",
    "search.einfachzocken.eu",
    "search.gcomm.ch",
    "search.hbubli.cc",
    "search.im-in.space",
    "search.incogniweb.net",
    "search.indst.eu",
    "search.inetol.net",
    "search.leptons.xyz",
    "search.nadeko.net",
    "search.ngn.tf",
    "search.ononoki.org",
    "search.privacyredirect.com",
    "search.sapti.me",
    "search.rhscz.eu",
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
    "searx.nobulart.com",
    "searx.numeriquement.fr",
    "searx.oakleycord.dev",
    "searx.ox2.fr",
    "searx.perennialte.ch",
    "searx.rhscz.eu",
    "searx.ro",
    "searx.sev.monster",
    "searx.thefloatinglab.world",
    "searx.tiekoetter.com",
    "searx.tuxcloud.net",
    "searx.work",
    "searx.zhenyapav.com",
    "searxng.brihx.fr",
    "searxng.ch",
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
    selectedDomain ||
    "https://" +
      SEARX_DOMAINS[Math.floor(Math.random() * SEARX_DOMAINS.length)];

  const categoryName = CATEGORY_LIST[category]; // Using the first category as default
  const timeRangeName = RECENCY_LIST[recency]; // Using the first time range as default

  const url =
    searchDomain +
    `/search?q=${encodeURIComponent(
      query
    )}&category_${categoryName}=1&language=en-US&time_range=${timeRangeName}&safesearch=0`;

  const resultJSON = await (
    await fetch(url, {
      headers: {
        "accept-language": "en-US,en;q=0.9",
      },
    })
  ).text();
  // console.log(resultJSON);

  let results = [];
  const resultRegex = /<article class="result[^>]*>[\s\S]*?<\/article>/g;
  const titleUrlRegex = /<h3><a href="([^"]*)"[^>]*>(.*?)<\/a><\/h3>/;
  const snippetRegex = /<p class="content">\s*(.*?)\s*<\/p>/;
  const enginesRegex = /<span>(bing|duckduckgo|yahoo|google)<\/span>/g;
  const linksRegex =
    /<a href="([^"]*)" class="(cache_link|proxyfied_link)"[^>]*>(cached|proxied)<\/a>/g;

  let match;
  while ((match = resultRegex.exec(resultJSON)) !== null) {
    const resultHtml = match[0];
    const titleUrlMatch = titleUrlRegex.exec(resultHtml);
    const snippetMatch = snippetRegex.exec(resultHtml);

    if (titleUrlMatch && titleUrlMatch[1] && titleUrlMatch[2]) {
      const url = titleUrlMatch[1];
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

      // title = convertHTMLSpecialChars(title);
      // snippet = convertHTMLSpecialChars(snippet);

      results.push({ title, url, snippet });
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

  return results;
  // } catch (error) {
  //   console.error(`Error fetching search results: ${error.message}`);
  //   return [];
  // }
}
