import { parseDate } from "chrono-node";
import { extractCite } from "../html-to-cite/extract-cite.js";
import { convertHTMLToBasicHTML } from "./html-to-basic-html.js";
import { parseHTML } from "linkedom";
import { extractNamedEntity } from "../html-to-cite/human-names-recognize.js";

import { extractContentHTML } from "./extract-content/extractor1-content.js";
import { extractContentHTML2 } from "./extract-content/extractor2-content.js";

/**
 * Extracts the main content and citation information from a document or HTML string
 * @param {string|object} documentOrHTML - The document or HTML string to extract content from
 * @param {Object} options - Optional configuration options
 * @param {boolean} options.images default=true - Whether to include images in the extracted content
 * @param {boolean} options.links default=true - Whether to include links in the extracted content
 * @param {boolean} options.formatting default=true - Whether to preserve formatting in the extracted content
 * @param {string} options.url The URL of the original document, if available, for absolutify-ing URLs
 * @param {boolean} options.useExtractor2 default=false - false uses Mozilla Readability, true uses Postlight Mercury
 * @returns {ExtractedContent} An object containing extracted information
 * @throws {Error} If there's an error parsing the HTML
 * @category Extractor
 */
export function extractContentAndCite(documentOrHTML, options = {}) {
  const {
    images = true,
    links = true,
    formatting = true,
    url = "",
    useExtractor2 = 1,
  } = options;

  var html =
    typeof documentOrHTML === "string"
      ? documentOrHTML
      : documentOrHTML.documentElement?.innerHTML;

  if (!html) return { error: "No HTML found" };

  var document = parseHTML(html)?.document;

  var content = 
  useExtractor2
    ? extractContentHTML2(html, options)
    : 
    extractContentHTML(html, options);

  var { author, author_cite, author_short, date, title, source } =
    extractCite(html);

  var html = convertHTMLToBasicHTML(content, options);

  return {
    title,
    author_cite,
    author_short,
    author,
    date,
    source,
    html,
  };
}
/**
 * @typedef {Object} ExtractedContent
 * @property {string} title - The title of the content
 * @property {string} author_cite - The full citation for the author
 * @property {string} author_short - A shortened version of the author's name
 * @property {string} author - The author's name
 * @property {string} date - The publication date
 * @property {string} source - The source of the content
 * @property {string} html - The extracted main content in HTML format
 * @private
 */
