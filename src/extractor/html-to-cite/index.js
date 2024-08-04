import { parseHTML } from "linkedom";
import { parseDate } from "chrono-node";
import extractAuthor from "./html-to-author.js";
import extractDate from "./html-to-date.js";
import extractSource from "./html-to-source.js";
import extractTitle from "./html-to-title.js";
import extractMetadata from "./metadata-to-cite.js";
import { recognizeHumanName } from "./human-names-recognize.js";

/**
 * Extract author, date, source, and title from HTML using meta tags 
 * and common class names. Validates human name from author string to check 
 * against common list of 3k first names, last names,and organizations to infer 
 * if it should be reversed starting by author last name (accounting for affixes/titles), 
 * since organizations are not reversed.
 *
 * @param {document} documentHTML  dom object or html string with article content
 * @returns {object} {author, date, title, source}
 */
export function extractCite(document) {
  //if passing in html string, convert to dom object
  if (typeof document === "string") document = parseHTML(document)?.document;

  var { author, date, title, source } = extractMetadata(document);

  if (
    !author ||
    author.length < 3 ||
    author.length > 50 ||
    author.split(" ").length < 2
  ) {
    author = extractAuthor(document) || author;
    if (author?.length < 3 || author?.length > 50) author = null;
  }

  if (author)
    var { author_cite, author_short, author_type } = recognizeHumanName(author);

  // console.log(author_cite, author_short, author_type);
  date = extractDate(document) || date;
  date = parseDate(date)?.toISOString().split("T")[0];

  title = extractTitle(document) || title;
  source = extractSource(document) || source;

  return { author, author_cite, author_short, date, title, source };
}
