/**
 * The function extracts main content with regex patterns, cleaning HTML, scoring nodes 
 *  based on content indicators like paragraphs and id/class names, selecting
 *  the top candidate, extracting it, and cleaning up content around it.
 * 
 * [Article-extraction-benchmark](https://github.com/scrapinghub/article-extraction-benchmark?tab=readme-ov-file#results)
 * 
 * @description
 * This function works through the following steps to extract the main content:
 * 
 * 1. Define regular expressions:
 *    - Various regex patterns are defined to identify content and non-content areas.
 * 
 * 2. Define helper functions:
 *    - normalizeSpaces: Normalizes whitespace in a string.
 *    - stripTags: Removes all HTML tags from a string.
 *    - getTextLength: Calculates the length of text after stripping tags.
 *    - calculateLinkDensity: Calculates the ratio of link text to total text.
 * 
 * 3. Clean HTML:
 *    - Remove unlikely candidates (e.g., ads, sidebars) from the HTML.
 * 
 * 4. Define scoring function:
 *    - scoreNode: Assigns a score to an HTML node based on content and attributes.
 *    - Increases score for positive indicators (e.g., article, body, content tags).
 *    - Decreases score for negative indicators (e.g., hidden, footer, sidebar tags).
 *    - Adds to score based on paragraph tags and text length.
 * 
 * 5. Find and score candidate nodes:
 *    - Identify potential content nodes in the cleaned HTML.
 *    - Score each node using the scoreNode function.
 * 
 * 6. Select top candidate:
 *    - Sort candidates by score and select the highest-scoring node.
 * 
 * 7. Extract content:
 *    - Use regex to extract content around the top candidate node.
 * 
 * 8. Clean up extracted content:
 *    - Remove script and style tags and their contents.
 *    - Process anchor tags based on content density.
 *    - Keep only specific HTML tags (a, p, img, h1-h6, ul, ol, li).
 *    - Remove excess whitespace from the final content.
 * 
 *
 * Based on [Postlight](https://github.com/postlight/parser) and [Readability](https://github.com/mozilla/readability)
 * 
 * 
 * @example
 * var url = "https://www.nytimes.com/2024/08/28/business/telegram-ceo-pavel-durov-charged.html"
 * const html = await (await fetch(url)).text();
 * var articleContent = extractMainArticle(html, {removeHTML: true});
 * @param {string} htmlString - The HTML string to extract content from.
 * @param {Object} options - Additional options for extraction 
 * @param {boolean} options.removeHTML [default=false] - remove HTML tags and return text with linebreaks
 * @returns {string} The extracted main article content.
 */
export function extractMainContent(htmlString, options = {}) {
  var {
    removeHTML = false,
  } = options;

  /**
   * Regular expressions used for content identification and cleaning
   */
  const REGEX = {
    // Patterns likely to indicate non-content areas
    unlikelyCandidates:
      /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,

    // Patterns that might indicate content despite matching unlikelyCandidates
    potentialCandidates: /and|article|body|column|content|main|shadow/i,

    // Patterns likely to indicate content areas
    positiveCandidates:
      /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,

    // Patterns likely to indicate non-content areas, more specific than unlikelyCandidates
    negativeCandidates:
      /-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,

    // Patterns indicating extraneous content
    extraneousElements:
      /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,

    // Pattern to identify author bylines
    byline: /byline|author|dateline|writtenby|p-author/i,

    // Pattern to replace font tags
    replaceFonts: /<(\/?)font[^>]*>/gi,

    // Pattern to normalize whitespace
    normalizeWhitespace: /\s{2,}/g,

    // Pattern to identify video embeds
    videoEmbeds:
      /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,

    // Pattern to identify share buttons
    shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,

    // Patterns to identify next/previous page links
    nextPageLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
    prevPageLink: /(prev|earl|old|new|<|«)/i,

    // Pattern to identify pure whitespace
    whitespaceOnly: /^\s*$/,

    // Pattern to check if a string has any non-whitespace content
    hasVisibleContent: /\S$/,
  };

  // Helper function to normalize spaces in a string
  const normalizeSpaces = (text) =>
    text;

  // Helper function to remove all HTML tags from a string
  const stripTags = (text) => text.replace(/<\/?[^>]+(>|$)/g, "");

  // Helper function to get the text length of a string after stripping tags
  const getTextLength = (text) => stripTags(text).length;

  // Helper function to calculate the link density of a node
  const calculateLinkDensity = (nodeHtml) => {
    const totalLength = getTextLength(nodeHtml);
    const linkText = (nodeHtml.match(/<a[^>]+>[^<]+<\/a>/g) || []).reduce(
      (sum, link) => sum + getTextLength(link),
      0
    );
    return totalLength > 0 ? linkText / totalLength : 0;
  };

  // Remove unlikely candidates from the HTML
  let cleanedHtml = htmlString.replace(/<[^>]+>/g, (match) => {
    if (
      REGEX.unlikelyCandidates.test(match) &&
      !REGEX.potentialCandidates.test(match)
    ) {
      return ""; // Remove the tag if it's an unlikely candidate
    }
    return match; // Keep the tag otherwise
  });

  // Function to score a node based on its content and attributes
  const scoreNode = (nodeHtml) => {
    let nodeScore = 0;
    const nodeAttributes = nodeHtml.match(/<[^>]+>/)[0]; // Extract opening tag with attributes

    // Increase score for positive indicators
    if (REGEX.positiveCandidates.test(nodeAttributes))
      nodeScore += 25;

    // Decrease score for negative indicators
    if (REGEX.negativeCandidates.test(nodeAttributes))
      nodeScore -= 25;

    // Add to score based on paragraph tags
    nodeScore += (nodeHtml.match(/<p/g) || []).length * 3;

    // Add to score based on text length, with a cap
    nodeScore += Math.min(Math.floor(getTextLength(nodeHtml) / 100), 3);

    return nodeScore;
  };

  // Find and score candidate nodes
  const candidateNodes = [];
  const nodeMatches = cleanedHtml.match(/<[^>]+>[^<]+<\/[^>]+>/g) || [];
  nodeMatches.forEach((node) => {
    const nodeScore = scoreNode(node);
    candidateNodes.push({ node, score: nodeScore });
  });

  // Sort candidates by score and select the top candidate
  candidateNodes.sort((a, b) => b.score - a.score);
  const topCandidateNode = candidateNodes[0] || { node: "" };

  // Extract content around the top candidate
  const contentRegex = new RegExp(
    `([\\s\\S]*${topCandidateNode.node}[\\s\\S]*)`
  );
  const contentMatch = cleanedHtml.match(contentRegex);
  let extractedContent = contentMatch ? contentMatch[1] : "";

  // Clean up the extracted content
  extractedContent = extractedContent
    // Remove script and style tags and their contents
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
    // Remove or keep anchor tags based on their content density
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, (match, innerContent) => {
      return getTextLength(innerContent) / getTextLength(match) < 0.5
        ? innerContent
        : "";
    })
    // Normalize spaces in the final content

    .replace(REGEX.normalizeWhitespace, " ").trim()

    // Keep only specific HTML tags, remove others
    // .replace(/<[^>]+>/g, (tag) => {
    //   return /^<(a|p|img|h[1-6]|ul|ol|li)/.test(tag) ? tag : "";
    // });

    //remove html tags, including in attributes
    const RE_HTML_TAGS = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

  if(removeHTML)
    extractedContent = extractedContent.replace(RE_HTML_TAGS, '');


  return extractedContent;
}
