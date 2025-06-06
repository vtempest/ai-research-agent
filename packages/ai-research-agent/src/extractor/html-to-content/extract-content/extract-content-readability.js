import { parseHTML } from "linkedom";

/**
 * ### HTML-to-Main-Content Extractor #1
 * The function extracts main content with regex patterns, cleaning HTML, scoring nodes
 *  based on content indicators like paragraphs and id/class names, selecting
 *  the top candidate, extracting it, and cleaning up content around it.
 *
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
 * [Article Extraction Benchmark](https://trafilatura.readthedocs.io/en/latest/evaluation.html)
 *
 * @example
 * var url = "https://www.nytimes.com/2024/08/28/business/telegram-ceo-pavel-durov-charged.html"
 * const html = await (await fetch(url)).text();
 * var articleContent = extractMainContentFromHTML(html);
 * @param {Object} [options]
 * @param {number} options.minContentLength default=140 - Minimum length of content to be considered valid
 * @param {number} options.minScore default=20 - Minimum score for content to be considered valid
 * @param {number} options.minTextLength default=25 - Minimum length of text to be considered valid
 * @param {number} options.retryLength default=250 - Length to retry content extraction if initial attempt fails
 * @returns {Element} Extracted HTML element of main content such as article body
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 * Based on [Mozilla Readability (2015)](https://github.com/mozilla/readability)
 * @category Extract
 */
export function extractMainContentFromHTML(html, options = {}) {
  const {
    minContentLength = 140,
    minScore = 20,
    minTextLength = 25,
    retryLength = 250,
  } = options;

  // Define regular expressions for content identification
  const positiveRe =
    /article|body|content|entry|hentry|main|page|pagination|post|text|blog|story/i;
  const negativeRe =
    /button|combx|comment|com-|contact|figure|foot|footer|footnote|form|input|masthead|media|meta|outbrain|promo|related|scroll|shoutbox|sidebar|sponsor|shopping|tags|tool|widget/i;
  const videoRe = /https?:\/\/(?:www\.)?(?:youtube|vimeo)\.com/i;

  // Parse the HTML string into a document
  var doc = parseHTML(html)?.document;

  // Remove script and style tags
  doc.querySelectorAll("script, style").forEach((elem) => elem.remove());

  // Clean HTML by removing unlikely candidates
  for (var elem of doc.querySelectorAll("*")) {
    var attrs =
      (elem.getAttribute("class") || "") +
      " " +
      (elem.getAttribute("id") || "");
    if (attrs.length < 2) continue;
    //test unlikely candidates
    if (
      !["body", "html"].includes(elem.tagName.toLowerCase()) &&
      /combx|comment|community|disqus|extra|foot|header|menu|remark|rss|shoutbox|sidebar|sponsor|ad-break|agegate|pagination|pager|popup|tweet|twitter/i.test(
        attrs
      ) &&
      !/and|article|body|column|main|shadow/i.test(attrs)
    ) {
      elem.remove();
    }
  }

  // Convert divs to paragraphs if they don't contain block elements
  var divs = doc.getElementsByTagName("div");
  for (var elem of divs) {
    if (
      !/<(?:a|blockquote|dl|div|img|ol|p|pre|table|ul)/i.test(
        elem?.innerHTML?.replace(/\s+/, " ")
      )
    ) {
      const newElem = doc.createElement("p");
      for (const attr of elem.attributes) {
        newElem.setAttribute(attr.name, attr.value);
      }
      while (elem.firstChild) {
        newElem.appendChild(elem.firstChild);
      }
      elem.parentNode?.replaceChild(newElem, elem);
    }
  }

  // Score nodes
  var candidates = {};
  var elems = Array.from(doc.querySelectorAll("p, pre, td"));

  for (var elem of elems) {
    var parentNode = elem.parentNode;
    var grandParentNode = parentNode ? parentNode.parentNode : null;

    var innerText = elem.textContent.trim();
    var innerTextLen = innerText.length;

    if (innerTextLen < minTextLength) continue;

    // Score parent and grandparent nodes
    if (!candidates[parentNode]) {
      candidates[parentNode] = scoreNode(parentNode, positiveRe, negativeRe);
    }
    if (grandParentNode && !candidates[grandParentNode]) {
      candidates[grandParentNode] = scoreNode(
        grandParentNode,
        positiveRe,
        negativeRe
      );
    }

    // Calculate score based on text content
    var score = 1;
    score += innerText.split(",").length;
    score += Math.min(innerTextLen / 100, 3);

    candidates[parentNode].score += score;
    if (grandParentNode) candidates[grandParentNode].score += score / 2;
  }

  // Adjust scores based on link density
  for (var candidate of Object.values(candidates)) {
    if (candidate && candidate.elem) {
      candidate.score *= 1 - getLinkDensity(candidate.elem);
    }
  }

  // Find the best candidate
  var sortedCandidates = Object.values(candidates).sort(
    (a, b) => b.score - a.score
  );
  var bestCandidate = sortedCandidates[0];

  if (bestCandidate) {
    // Extract content from the best candidate and its siblings
    var siblingScoreThreshold = Math.max(10, bestCandidate.score * 0.2);
    var article = doc.createElement("div");
    var parent = bestCandidate.elem.parentNode;
    var siblings = parent ? Array.from(parent.children) : [bestCandidate.elem];

    for (var sibling of siblings) {
      let append = false;
      if (
        sibling === bestCandidate.elem ||
        (candidates[sibling] &&
          candidates[sibling].score >= siblingScoreThreshold)
      ) {
        append = true;
      } else if (sibling.tagName === "P") {
        var linkDensity = getLinkDensity(sibling);
        var nodeContent = sibling.textContent;
        var nodeLength = nodeContent.length;

        if (
          (nodeLength > 80 && linkDensity < 0.25) ||
          (nodeLength <= 80 && linkDensity === 0 && /\.( |$)/.test(nodeContent))
        ) {
          append = true;
        }
      }

      //todo fix err

      if (append) article.innerHTML += sibling.innerHTML;
    }

    var cleanedArticle = sanitize(
      article,
      candidates,
      videoRe,
      positiveRe,
      negativeRe,
      minTextLength
    );
    var articleLength = cleanedArticle ? cleanedArticle.textContent.length : 0;
  } else {
    // If no best candidate, use the body or entire document
    var article = doc.querySelector("body") || doc;
    cleanedArticle = sanitize(
      article,
      candidates,
      videoRe,
      positiveRe,
      negativeRe,
      minTextLength
    );
  }

  return cleanedArticle.innerHTML;
}

/**
 * Calculates the link density of an element.
 * @param {Element} elem - The element to calculate link density for
 * @returns {number} The link density (ratio of link text length to total text length)
 */
export function getLinkDensity(elem) {
  if (!elem || !elem.textContent) {
    return 0;
  }
  var links = elem.querySelectorAll("a");
  var textLength = elem.textContent.trim().length;
  var linkLength = Array.from(links).reduce(
    (total, link) => total + link.textContent.trim().length,
    0
  );
  return textLength > 0 ? linkLength / textLength : 0;
}

/**
 * Calculates the weight of an element based on its class and id attributes.
 * @param {Element} elem - The element to calculate weight for
 * @param {RegExp} positiveRe - Regular expression for positive indicators
 * @param {RegExp} negativeRe - Regular expression for negative indicators
 * @returns {number} The calculated weight
 */
export function classWeight(elem, positiveRe, negativeRe) {
  let weight = 0;
  if (!elem || !elem.getAttribute) return weight;
  if (elem.getAttribute("class")) {
    if (negativeRe.test(elem.getAttribute("class"))) weight -= 25;
    if (positiveRe.test(elem.getAttribute("class"))) weight += 25;
  }
  if (elem.getAttribute("id")) {
    if (negativeRe.test(elem.getAttribute("id"))) weight -= 25;
    if (positiveRe.test(elem.getAttribute("id"))) weight += 25;
  }
  return weight;
}

/**
 * Scores a node based on its tag name and attributes.
 * @param {Element} elem - The element to score
 * @param {RegExp} positiveRe - Regular expression for positive indicators
 * @param {RegExp} negativeRe - Regular expression for negative indicators
 * @returns {Object} An object containing the score and the element
 */
export function scoreNode(elem, positiveRe, negativeRe) {
  if (!elem || !elem.tagName) return { score: 0, elem };
  const DIV_SCORES = new Set(["div", "article"]);
  const BLOCK_SCORES = new Set(["pre", "td", "blockquote"]);
  const BAD_ELEM_SCORES = new Set([
    "address",
    "ol",
    "ul",
    "dl",
    "dd",
    "dt",
    "li",
    "form",
    "aside",
  ]);
  const STRUCTURE_SCORES = new Set([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "th",
    "header",
    "footer",
    "nav",
  ]);

  var score = classWeight(elem, positiveRe, negativeRe);
  var name = elem.tagName.toLowerCase();
  if (DIV_SCORES.has(name)) score += 5;
  else if (BLOCK_SCORES.has(name)) score += 3;
  else if (BAD_ELEM_SCORES.has(name)) score -= 3;
  else if (STRUCTURE_SCORES.has(name)) score -= 5;
  return { score, elem };
}

/**
 * Sanitizes the content by removing unwanted elements and cleaning remaining elements.
 * @param {Element} node - The node to sanitize
 * @param {Object} candidates - Object containing scored candidates
 * @param {RegExp} videoRe - Regular expression for video URLs
 * @param {RegExp} positiveRe - Regular expression for positive indicators
 * @param {RegExp} negativeRe - Regular expression for negative indicators
 * @param {number} minTextLength - Minimum text length to consider
 * @returns {Element} The sanitized node
 */
export function sanitize(
  node,
  candidates,
  videoRe,
  positiveRe,
  negativeRe,
  minTextLength
) {
  const DIV_TO_P_ELEMS = new Set([
    "a",
    "blockquote",
    "dl",
    "div",
    "img",
    "ol",
    "p",
    "pre",
    "table",
    "ul",
  ]);

  // Remove unwanted elements
  for (var elem of node.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, form, textarea, iframe"
  )) {
    if (elem.tagName === "IFRAME" && videoRe.test(elem.src)) {
      elem.textContent = "VIDEO";
    } else {
      elem.remove();
    }
  }

  // Clean remaining elements
  var allowed = new Set();
  for (var elem of Array.from(
    node.querySelectorAll("table, ul, div, aside, header, footer, section")
  ).reverse()) {
    if (allowed.has(elem)) continue;

    var weight = classWeight(elem, positiveRe, negativeRe);
    var score = candidates[elem] ? candidates[elem].score : 0;

    if (weight + score < 0) {
      elem.remove();
    } else if (elem.textContent.split(",").length < 10) {
      // Count various elements within the current element
      var counts = {
        p: elem.querySelectorAll("p").length,
        img: elem.querySelectorAll("img").length,
        li: Math.max(0, elem.querySelectorAll("li").length - 100),
        input:
          elem.querySelectorAll("input").length -
          elem.querySelectorAll("input[type=hidden]").length,
        a: elem.querySelectorAll("a").length,
      };
      let textContent = elem?.textContent || "";
      textContent = textContent.trim();
      var contentLength = textContent?.replace(/\s+/g, " ").length;

      var linkDensity = getLinkDensity(elem);

      // Remove element if it meets certain criteria
      if (
        counts.img > 1 + counts.p * 1.3 ||
        (counts.li > counts.p &&
          elem.tagName !== "UL" &&
          elem.tagName !== "OL") ||
        counts.input > counts.p / 3 ||
        (contentLength < minTextLength && counts.img === 0) ||
        (weight < 25 && linkDensity > 0.2) ||
        (weight >= 25 && linkDensity > 0.5) ||
        (counts.embed === 1 && contentLength < 75) ||
        counts.embed > 1
      ) {
        elem.remove();
      }
    }
  }

  return node;
}
