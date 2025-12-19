import { getDomainWithoutSuffix } from "tldts";
import { parseDate } from "chrono-node";
import { CATEGORY_LIST, RECENCY_ALLOWED_LIST, SEARX_DOMAINS } from "./constants.js";

/**
 * Convert URL-safe HTML entities to regular HTML
 * @param {string} str - String with HTML entities
 * @returns {string} Converted string
 */
function convertURLSafeHTMLToHTML(str) {
  if (!str) return str;
  
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

/**
 * Search Web via SearXNG metasearch of all major search engines.
 * Options are 10 search categories, recency, and how many
 * times to retry other domains if first time fails.
 * SearXNG is a free internet metasearch engine which aggregates results from
 * more than 180+ search sources.
 *
 * @param {string} query - The search query string.
 * @param {Object} [options]
 * @param {string} options.category default=general - ["general", "news", "videos", "images", "science","it", "files", "social+media", "map", "music"]
 * @param {string} options.recency default=all - ["all", "day", "week", "month", "year"]
 * @param {string|boolean} options.privateSearxng default=null - Use your custom domain SearXNG
 * @param {number} options.maxRetries default=3 - Maximum number of retry attempts if the initial search fails.
 * @param {number} options.page default=1 - The page number to retrieve.
 * @param {boolean} options.safesearch default=false - Whether to block adult content.
 * @param {string} options.lang default="en-US" - The language to use for the search.
 * @param {string} options.proxy default=false - Use corsproxy.io to access in frontend JS
 * @returns {Promise<Object>} Search results object with results, suggestions, and infoboxes
 */
export async function searchWeb(query, options = {}) {
  const {
    category = "general",
    recency,
    privateSearxng = null,
    maxRetries = 3,
    page = 1,
    safesearch = false,
    lang = "en-US",
    proxy = null,
  } = options;

  // Select a random domain if none is provided
  const searchDomain =
    privateSearxng ||
    "https://" +
    SEARX_DOMAINS[Math.floor(Math.random() * SEARX_DOMAINS.length)];

  const categoryName =
    typeof category === "number" ? CATEGORY_LIST[category] : category;

  let url =
    `${searchDomain}/search?q=${encodeURIComponent(query)}` +
    `&category_${categoryName}=1&language=${lang}` +
    `${recency && RECENCY_ALLOWED_LIST.includes(recency) ? '&time_range=' + recency : ""}&safesearch=${safesearch ? "1" : "0"}&pageno=${page}`;

  if (privateSearxng) url += "&format=json";

  if (proxy && !privateSearxng) url = proxy + url;

  try {
    const response = await fetch(url, {
      headers: {
        "accept-language": lang + ",en;q=0.9",
      },
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resultHTML = await response.text();

    if (privateSearxng) {
      if (!resultHTML.startsWith("{")) {
        return { error: "Private SearXNG instance did not return valid JSON" };
      }

      let { results, suggestions, infoboxes } = JSON.parse(resultHTML);

      results = results.map((result) => {
        let title = result.title.replace(/<\/?[^>]+(>|$)/g, "");

        // Clean and normalize the title
        const TITLE_SPLITTERS_RE = /( [|\-\/:»] )|( - )|(\|)/;

        // Handle split titles
        if (TITLE_SPLITTERS_RE.test(title)) {
          const splitTitle = title.split(TITLE_SPLITTERS_RE);

          // Handle breadcrumbed titles
          if (splitTitle.length >= 2) {
            const longestPart = splitTitle.reduce(
              (acc, part) => (part?.length > acc?.length ? part : acc),
              ""
            );
            if (longestPart.length > 10) {
              title = longestPart;
            }
          }
        }

        title = convertURLSafeHTMLToHTML(title);
        let url = result.url.replace(/&amp;/g, "&");
        let snippet = result.content?.replace(/<\/?[^>]+(>|$)/g, "");
        let score = Math.round(result.score * 100) / 100;

        let domain = result.url
          ?.replace(/(http:\/\/|https:\/\/|www.)/gi, "")
          .split("/")[0];

        let date = null;
        let source = null;
        
        if (typeof result.metadata === "string") {
          const [datePart, sourcePart] = result.metadata
            .split("|")
            .map((s) => s.trim());
          date =
            parseDate(result.metadata)?.toISOString().split("T")[0] ||
            undefined;
          source = sourcePart || null;
        }

        if (!source) {
          source = getDomainWithoutSuffix(domain).replace(/\b\w/g, (l) =>
            l.toUpperCase()
          );
          // For small source names like CNN
          if (source.length < 5) source = source.toUpperCase();
        }

        let favicon =
          "https://www.google.com/s2/favicons?domain=" +
          result.url.match(
            /^(?:https?:\/\/)?(?:www\.)?([^/:?\s]+)(?:[/:?]|$)/i
          )?.[0] +
          "&sz=16";

        return {
          title,
          url,
          snippet,
          score,
          ...(date ? { date } : {}),
          ...(source ? { source } : {}),
          domain,
          favicon,
          engines: result.engines || []
        };
      });
      
      return { results, suggestions, infoboxes };
    }

    // Parse HTML results (fallback for public instances)
    let results = [];
    const resultRegex = /<article class="result[^>]*>[\s\S]*?<\/article>/g;
    const titleUrlRegex = /<h3><a href="([^"]*)"[^>]*>(.*?)<\/a><\/h3>/;
    const snippetRegex = /<p class="content">\s*(.*?)\s*<\/p>/;

    let match;
    while ((match = resultRegex.exec(resultHTML)) !== null) {
      const resultHtml = match[0];
      const titleUrlMatch = titleUrlRegex.exec(resultHtml);
      const snippetMatch = snippetRegex.exec(resultHtml);

      if (titleUrlMatch && titleUrlMatch[1] && titleUrlMatch[2]) {
        const url = convertURLSafeHTMLToHTML(titleUrlMatch[1]);
        let title = titleUrlMatch[2].replace(/<\/?[^>]+(>|$)/g, "");
        let snippet = snippetMatch
          ? snippetMatch[1].replace(/<\/?[^>]+(>|$)/g, "")
          : "";

        title = convertURLSafeHTMLToHTML(title);
        snippet = convertURLSafeHTMLToHTML(snippet);
        
        results.push({ title, url, snippet });
      }
    }

    if (results.length === 0 && maxRetries > 0) {
      return await searchWeb(query, {
        ...options,
        maxRetries: maxRetries - 1,
        useProxy: true,
      });
    }

    results = results.map((result) => {
      let favicon =
        "https://www.google.com/s2/favicons?domain=" +
        result.url.match(
          /^(?:https?:\/\/)?(?:www\.)?([^/:?\s]+)(?:[/:?]|$)/i
        )?.[0] + "&sz=16";

      let domain = result.url
        ?.replace(/(http:\/\/|https:\/\/|www.)/gi, "")
        .split("/")[0];

      return {
        ...result,
        domain,
        favicon,
      };
    });
    
    return results;
  } catch (error) {
    console.error(`Error fetching search results: ${error.message}`);
    
    if (maxRetries > 0) {
      return await searchWeb(query, {
        ...options,
        maxRetries: maxRetries - 1,
      });
    }
    
    return { error: error.message };
  }
}
