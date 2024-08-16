import { parseHTML } from "linkedom";
import { parseDate } from "chrono-node";
import {
  extractAuthor,
  extractDate,
  extractSource,
  extractTitle,
} from "./html-dom-to-cite.js";
import extractMetadata from "./metadata-to-cite.js";
import { extractNamedEntity } from "./human-names-recognize.js";

/**
 * Extract Expert Excerpt
 * Extract author, date, source, and title from HTML using meta tags
 * and common class names. Validates human name from author string to check
 * against common list of 3k first names, last names,and organizations to infer
 * if it should be reversed starting by author last name (accounting for affixes/titles),
 * since organizations are not reversed.
 *
 * @param {document} documentHTML  dom object or html string with article content
 * @returns {object} {author, date, title, source}
 * @category Extractor
 */
export function extractCite(document) {
  //if passing in html string, convert to dom object
  if (typeof document === "string") document = parseHTML(document)?.document;

  var { author, date, title, source } = extractMetadata(document);

  if (author?.length < 3 || author?.length > 50) author = null;

  if (author)
    var { author_cite, author_short, author_type } = extractNamedEntity(author);
  else
    var { author_cite, author_short, author_type } =
      extractAuthor(document) || {};

  // console.log(author_cite, author_short, author_type);
  date = extractDate(document) || date;
  date = parseDate(date)?.toISOString().split("T")[0];

  title = extractTitle(document) || title;
  source = extractSource(document) || source;

  return { author, author_cite, author_short, date, title, source };
}
