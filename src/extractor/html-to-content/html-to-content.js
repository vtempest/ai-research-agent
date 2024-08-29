import { parseDate } from "chrono-node";
import { extractCite } from "../html-to-cite/extract-cite.js";
import { convertHTMLToBasicHTML } from "./html-to-basic-html.js";
import { parseHTML } from "linkedom";
import { extractNamedEntity } from "../html-to-cite/human-names-recognize.js";
import { extractMainContent } from "./extract-content.js";
/**
 * Extracts the main content and cite from a document or HTML string
 * @param {string|object} documentOrHTML
 * @param {object} options
 * @returns {object} {title, author_cite, author_short, author, date, source, html}
 * @category Extractor
 */
export async function extractContent(documentOrHTML, options = {}) {
  const {
    images = true,
    links = true,
    formatting = true,
    absoluteURLs = 1,
    url = "",
  } = options;

  if (typeof documentOrHTML === "string") var html = documentOrHTML;
  else var html = documentOrHTML.documentElement?.innerHTML;
  if (!html) return { error: "No HTML found" };

  var content = extractMainContent(html, options);

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
