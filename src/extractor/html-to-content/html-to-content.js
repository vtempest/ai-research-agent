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
 * @param {boolean} options.useExtractor2 default=false -
 *    false uses Mozilla Readability, true uses Postlight Mercury. 
 *    then use the alternate if the first returns less than 200 characters
 * @returns {Object} The extracted content and citation information
 * @property {string} title - The title of the document
 * @property {string} author_cite - The full citation for the author
 * @property {string} author_short - A shortened version of the author's name
 * @property {string} author - The author's name
 * @property {string} date - The publication date
 * @property {string} source - The source of the document
 * @property {string} html - The extracted HTML content
* @author [ai-research-agent (2024)](https://airesearch.js.org)
 */
export function extractContentAndCite(documentOrHTML, options = {}) {
  const {
    images = true,
    links = true,
    formatting = true,
    url = "",
    useExtractor2 = 0,
  } = options;

  var html =
    typeof documentOrHTML === "string"
      ? documentOrHTML
      : documentOrHTML.documentElement?.innerHTML;

  if (!html) return { error: "No HTML found" };


  var html = html
    .replace(/&lt;/gi, " ").replace(/&gt;/gi, " ")

  var content = 
  useExtractor2
    ? extractContentHTML2(html, options)
    : 
    extractContentHTML(html, options);

    // if Postlight Mercury returns less than 200 characters, try Mozilla Readability
    if (content.length < 200) {
      var content2 = extractContentHTML(html, options);
      if (content2.length > content.length) 
        content = content2;
    }


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
