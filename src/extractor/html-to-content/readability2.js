import { parseHTML } from "linkedom";
// import { convertHTMLToTokens } from "./html-to-basic-html.js";

/**
 * Extracts main content from HTML documents using algorithm based on Readability.
 * Employs regex patterns, HTML cleaning, node scoring, and content selection.
 *
 * 1. Define regex patterns for content identification
 * 2. Clean HTML by removing unlikely content
 * 3. Score nodes based on content quality indicators
 * 4. Select the best candidate for main content
 * 5. Extract top candate 
 * 6. Clean the selected content
 *
 * @param {string} html - The HTML string to extract content from
 * @param {object} options
 * @param {number} options.minContentLength default=140 - Minimum length of content to be considered valid
 * @param {number} options.minScore default=20 - Minimum score for content to be considered valid
 * @param {number} options.minTextLength default=25 - Minimum length of text to be considered valid
 * @param {number} options.retryLength default=250 - Length to retry content extraction if initial attempt fails
 * @returns {string} Extracted HTML of main content such as article body
 * @author [Mozilla (2015), Arc90 (2010)](https://github.com/mozilla/readability)
 * @example
 * var url = "https://en.wikipedia.org/wiki/David_Hilbert";
 * var html = await (await fetch(url)).text();
 * var content = extractContentHTML(html);
 */
export function extractContentHTML(html, options = {}) {
  const {
    minContentLength = 140,
    minScore = 20,
    minTextLength = 25,
    retryLength = 250,
  } = options;

  // Step 1: Define regex patterns and constants
  const DOT_SPACE = /\.( |$)/;
  const DIV_TO_P_ELEMS = [
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
  ];
  const DIV_SCORES = ["div", "article"];
  const BLOCK_SCORES = ["pre", "td", "blockquote"];
  const BAD_ELEM_SCORES = [
    "address",
    "ol",
    "ul",
    "dl",
    "dd",
    "dt",
    "li",
    "form",
    "aside",
  ];
  const STRUCTURE_SCORES = [
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
  ];
  const TEXT_CLEAN_ELEMS = ["p", "img", "li", "a", "embed", "input"];
  const FRAME_TAGS = ["body", "html"];
  const LIST_TAGS = ["ol", "ul"];

  const REGEXES = {
    unlikelyCandidatesRe:
      /combx|comment|community|disqus|extra|foot|header|menu|remark|rss|shoutbox|sidebar|sponsor|ad-break|agegate|pagination|pager|popup|tweet|twitter/i,
    okMaybeItsACandidateRe: /and|article|body|column|main|shadow/i,
    positiveRe:
      /article|body|content|entry|hentry|main|page|pagination|post|text|blog|story/i,
    negativeRe:
      /button|combx|comment|com-|contact|figure|foot|footer|footnote|form|input|masthead|media|meta|outbrain|promo|related|scroll|shoutbox|sidebar|sponsor|shopping|tags|tool|widget/i,
    divToPElementsRe: /<(?:a|blockquote|dl|div|img|ol|p|pre|table|ul)/i,
    videoRe: /https?:\/\/(?:www\.)?(?:youtube|vimeo)\.com/i,
  };

  var doc = parseHTML(html)?.document;

  // var doc = new JSDOM(html).window.document;

  // var doc = convertHTMLToTokens(html)

  // Step 2: Remove script and style tags
  doc.querySelectorAll("script, style").forEach((elem) => elem.remove());

  let isRunning = true;
  while (true) {
    if (isRunning) {
      // Step 2:  Clean HTML
      for (var elem of doc.querySelectorAll("*")) {
        var attrs =
          (elem.getAttribute("class") || "") +
          " " +
          (elem.getAttribute("id") || "");
        if (attrs.length < 2) continue;
        if (
          !FRAME_TAGS.includes(elem.tagName.toLowerCase()) &&
          REGEXES.unlikelyCandidatesRe.test(attrs) &&
          !REGEXES.okMaybeItsACandidateRe.test(attrs)
        ) {
          elem.remove();
        }
      }
    }

    var divs = doc.getElementsByTagName("div");

    for (var elem of divs) {
      if (!REGEXES.divToPElementsRe.test(elem.innerHTML.replace(/\s+/, " "))) {
        // Convert div to paragraph if it doesn't contain block elements
        // elem.tagName = 'p';
      }
    }

    // Step 3: Score paragraphs
    var candidates = {};
    var elems = doc.querySelectorAll("p, pre, td");

    for (var elem of elems) {
      var parentNode = elem.parentNode;
      var grandParentNode = parentNode ? parentNode.parentNode : null;

      var innerText = elem.textContent.trim();
      var innerTextLen = innerText.length;

      if (innerTextLen < minTextLength) continue;

      if (!candidates[parentNode]) {
        candidates[parentNode] = {
          score: 0,
          elem: parentNode,
        };
      }
      if (grandParentNode && !candidates[grandParentNode]) {
        candidates[grandParentNode] = {
          score: 0,
          elem: grandParentNode,
        };
      }

      var score = 1;
      score += innerText.split(",").length;
      score += Math.min(innerTextLen / 100, 3);

      candidates[parentNode].score += score;
      if (grandParentNode) candidates[grandParentNode].score += score / 2;
    }

    // Adjust scores based on link density
    for (var candidate of Object.values(candidates)) {
      var elem = candidate.elem;
      var links = elem.querySelectorAll("a");
      var linkLength = 0;
      for (var link of links) {
        linkLength += link.textContent.trim().length;
      }
      var linkDensity = linkLength / elem.textContent.trim().length;
      candidate.score *= 1 - linkDensity;
    }

    // Step 4: Select best candidate
    var sortedCandidates = Object.values(candidates).sort(
      (a, b) => b.score - a.score
    );
    var bestCandidate = sortedCandidates[0];

    if (bestCandidate) {
      // Step 5: Extract content
      var siblingScoreThreshold = Math.max(10, bestCandidate.score * 0.2);
      var output = doc.createElement("div");
      var parent = bestCandidate.elem.parentNode;
      var siblings = parent
        ? Array.from(parent.children)
        : [bestCandidate.elem];

      for (var sibling of siblings) {
        let append = false;
        if (
          sibling === bestCandidate.elem ||
          (candidates[sibling] &&
            candidates[sibling].score >= siblingScoreThreshold)
        ) {
          append = true;
        } else if (sibling.tagName === "P") {
          var linkDensity = 0;
          var links = sibling.querySelectorAll("a");
          for (var link of links) {
            linkDensity += link.textContent.trim().length;
          }
          linkDensity /= sibling.textContent.trim().length;
          var nodeContent = sibling.textContent;
          var nodeLength = nodeContent.length;

          if (
            (nodeLength > 80 && linkDensity < 0.25) ||
            (nodeLength <= 80 &&
              linkDensity === 0 &&
              DOT_SPACE.test(nodeContent))
          ) {
            append = true;
          }
        }

        if (append) output.appendChild(sibling.cloneNode(true));
      }

      // Step 6: Clean extracted content
      for (var elem of output.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, form, textarea, iframe"
      )) {
        if (elem.tagName === "IFRAME" && REGEXES.videoRe.test(elem.src)) {
          elem.textContent = "VIDEO";
        } else {
          elem.remove();
        }
      }

      // Clean remaining elements
      for (var elem of Array.from(
        output.querySelectorAll(
          "table, ul, div, aside, header, footer, section"
        )
      ).reverse()) {
        var weight = 0;
        if (elem.getAttribute("class")) {
          if (REGEXES.negativeRe.test(elem.getAttribute("class"))) weight -= 25;
          if (REGEXES.positiveRe.test(elem.getAttribute("class"))) weight += 25;
        }
        if (elem.getAttribute("id")) {
          if (REGEXES.negativeRe.test(elem.getAttribute("id"))) weight -= 25;
          if (REGEXES.positiveRe.test(elem.getAttribute("id"))) weight += 25;
        }
        var score = candidates[elem] ? candidates[elem].score : 0;

        if (weight + score < 0) {
          elem.remove();
        } else if (elem.textContent.split(",").length < 10) {
          var counts = {
            p: elem.querySelectorAll("p").length,
            img: elem.querySelectorAll("img").length,
            li: Math.max(0, elem.querySelectorAll("li").length - 100),
            input:
              elem.querySelectorAll("input").length -
              elem.querySelectorAll("input[type=hidden]").length,
            a: elem.querySelectorAll("a").length,
          };
          var contentLength = elem.textContent.trim().length;
          var linkDensity = 0;
          var links = elem.querySelectorAll("a");
          for (var link of links) {
            linkDensity += link.textContent.trim().length;
          }
          linkDensity /= contentLength;

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

      var articleLength = output.textContent.length;
      if (isRunning && articleLength < retryLength) {
        isRunning = false;
        continue;
      }
      return output;
    } else {
      if (isRunning) {
        isRunning = false;
        continue;
      }
      // If could not extract content, return full body
      var article = doc.querySelector("body") || doc;
      return article;
    }
  }
}
