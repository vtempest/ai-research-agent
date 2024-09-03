import { parseHTML } from 'linkedom';

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
  // 1. Define regular expressions
  const regexes = {
    unlikelyCandidates: /combx|comment|community|disqus|extra|foot|header|menu|remark|rss|shoutbox|sidebar|sponsor|ad-break|agegate|pagination|pager|popup|tweet|twitter/i,
    okMaybeItsACandidate: /and|article|body|column|main|shadow/i,
    positive: /article|body|content|entry|hentry|main|page|pagination|post|text|blog|story/i,
    negative: /hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|masthead|media|meta|outbrain|promo|related|scroll|shoutbox|sidebar|sponsor|shopping|tags|tool|widget/i,
    extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
    byline: /byline|author|dateline|writtenby|p-author/i,
    replaceFonts: /<(\/?)font[^>]*>/gi,
    normalize: /\s{2,}/g,
    videos: /\/\/(www\.)?(dailymotion|youtube|youtube-nocookie|player\.vimeo)\.com/i,
    nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
    prevLink: /(prev|earl|old|new|<|«)/i,
    whitespace: /^\s*$/,
    hasContent: /\S$/,
  };

  // 2. Define helper functions
  const normalizeSpaces = (text) => text.replace(regexes.normalize, ' ');
  const stripTags = (text) => text.replace(/<[^>]*>/g, '');
  const getTextLength = (text) => stripTags(text).trim().length;
  const calculateLinkDensity = (node) => {
    const linkLength = Array.from(node.querySelectorAll('a'))
      .reduce((sum, link) => sum + getTextLength(link.innerHTML), 0);
    const textLength = getTextLength(node.innerHTML);
    return linkLength / textLength || 0;
  };

  // 3. Clean HTML
  const removeUnlikelyCandidates = (html) => {
    return html.replace(/<[^>]*>/g, (tag) => {
      if (regexes.unlikelyCandidates.test(tag) && !regexes.okMaybeItsACandidate.test(tag)) {
        return '';
      }
      return tag;
    });
  };

  // 4. Define scoring function
  const scoreNode = (node) => {
    let score = 0;
    const classAndId = `${node.className} ${node.id}`;

    // Increase score for positive indicators
    if (regexes.positive.test(classAndId)) score += 25;

    // Decrease score for negative indicators
    if (regexes.negative.test(classAndId)) score -= 25;

    // Add to score based on tag name
    score += getNodeTagScore(node);

    // Add to score based on paragraph count
    const paragraphs = node.querySelectorAll('p');
    score += paragraphs.length;

    // Add to score based on text length
    const textLength = getTextLength(node.innerHTML);
    score += Math.min(Math.floor(textLength / 100), 3);

    return score;
  };

  const getNodeTagScore = (node) => {
    switch (node.tagName.toLowerCase()) {
      case 'div': return 5;
      case 'pre': case 'td': case 'blockquote': return 3;
      case 'address': case 'ol': case 'ul': case 'dl': case 'dd': case 'dt': case 'li': case 'form': return -3;
      case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': case 'th': return -5;
    }
    return 0;
  };

  // 5. Find and score candidate nodes
  const findCandidates = (html) => {
    const { document } = parseHTML(html);
    const candidates = Array.from(document.body.getElementsByTagName('*'))
      .filter(node => ['p', 'pre', 'td'].includes(node.tagName.toLowerCase()));

    return candidates.map(node => ({
      node,
      score: scoreNode(node)
    }));
  };

  // 6. Select top candidate
  const selectTopCandidate = (candidates) => {
    return candidates.length > 0 ? candidates.sort((a, b) => b.score - a.score)[0] : null;
  };

  // 7. Extract content
  const extractContent = (html, topCandidate) => {
    if (!topCandidate) {
      // If no top candidate is found, return the entire body content
      const { document } = parseHTML(html);
      return document.body ? document.body.innerHTML : '';
    }

    const { document } = parseHTML(html);
    const articleContent = document.createElement('div');
    let siblingScoreThreshold = Math.max(10, topCandidate.score * 0.2);
    let node = topCandidate.node;

    while (node) {
      if (node.tagName.toLowerCase() === 'body') break;
      
      const sibling = node.previousElementSibling;
      if (sibling) {
        let siblingScore = scoreNode(sibling);
        if (siblingScore >= siblingScoreThreshold) {
          articleContent.insertBefore(sibling.cloneNode(true), articleContent.firstChild);
        }
      }
      
      articleContent.insertBefore(node.cloneNode(true), articleContent.firstChild);
      node = node.parentElement;
    }

    return articleContent.innerHTML;
  };

  // 8. Clean up extracted content
  const cleanContent = (content) => {
    // Remove script and style tags
    content = content.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '');

    // Process anchor tags
    content = content.replace(/<a\s+[^>]*>([\s\S]*?)<\/a>/gi, (match, innerContent) => {
      const plainText = stripTags(innerContent);
      if (plainText.length > 2 && plainText.length / innerContent.length >= 0.5) {
        return innerContent;
      }
      return match;
    });

    // Keep only specific HTML tags
    const allowedTags = ['a', 'p', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li'];
    const allowedTagsRegex = new RegExp(`<(/?)(?:${allowedTags.join('|')})[^>]*>`, 'gi');
    content = content.replace(/<[^>]+>/g, (tag) => {
      return allowedTagsRegex.test(tag) ? tag : '';
    });

    // Remove excess whitespace
    content = content.replace(/\s+/g, ' ').trim();

    return content;
  };

  // Main execution
  let cleanedHtml = removeUnlikelyCandidates(htmlString);
  const candidates = findCandidates(cleanedHtml);
  const topCandidate = selectTopCandidate(candidates);
  let extractedContent = extractContent(cleanedHtml, topCandidate);
  let finalContent = cleanContent(extractedContent);

  // Apply options
  if (options.removeHTML) {
    finalContent = stripTags(finalContent).replace(/\n+/g, '\n').trim();
  }

  return finalContent;
}