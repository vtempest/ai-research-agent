import { parseDate } from "chrono-node";
import { extractCite } from "../html-to-cite/extract-cite.js";
import { convertHTMLToBasicHTML } from "./html-to-basic-html.js";
import { parseHTML } from "linkedom";
import { extractNamedEntity } from "../html-to-cite/human-names-recognize.js";

import { extractMainContent } from "./extract-content.js";
import { Readability } from "./readability.js";
import { extractContentHTML }  from "./readability2.js";

/**
 * Extracts the main content and cite from a document or HTML string
 * @param {string|object} documentOrHTML
 * @param {object} options
 * @returns {object} {title, author_cite, author_short, author, date, source, html}
 * @category Extractor
 */
export function extractContent(documentOrHTML, options = {}) {
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

  var article;
  // try {
    var document = parseHTML(html)?.document;
    article = new Readability(document).parse();
    var { content, author, title, date_published } = article;


    var content = extractContentHTML(html, options).innerHTML;


  // } catch (e) {
  //   return { error: "Error in Parsing" };
  // }

  var date = date_published; //parseDate(date_published)?.toISOString().split("T")?.[0];

    var { author, author_cite, author_short, date, title, source } =
      extractCite(html);

    author =
      article.author && extractNamedEntity(article.author)?.author_type
        ? article.author
        : author;
    title = article.title || title;
    date =
      parseDate(article.date_published)?.toISOString().split("T")?.[0] || date;

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
