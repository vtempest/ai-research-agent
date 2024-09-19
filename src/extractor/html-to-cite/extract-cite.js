import { parseHTML } from "linkedom";
import { parseDate } from "chrono-node";
import { extractAuthor } from "./extract-author.js";
import { extractDate } from "./extract-date.js";
import { extractSource } from "./extract-source.js";
import { extractTitle } from "./extract-title.js";
import { extractCiteFromMetadata } from "./metadata-to-cite.js";
import { extractNamedEntity } from "./human-names-recognize.js";

/**
 * <h3> 📚💎 Extract Expert Excerpt </h3>
 *
 * Extract author, date, source, and title from HTML using meta tags
 * and common class names. Validates human name from author string to check
 * against common list of 90k first names, last names,and organizations to infer
 * if it should be reversed starting by author last name (accounting for affixes/titles),
 * since organizations are not reversed.
 *
 * [Article-extraction-benchmark](https://github.com/scrapinghub/article-extraction-benchmark?tab=readme-ov-file#results)
 * <img width="350px" src="https://i.imgur.com/4GOOM9s.jpeg">
 *
 * @param {document} document  dom object or html string with article content
 * @returns {object} {author, date, title, source}
 * @category Extract
 * @author [Gulakov, A. (2024)](https://airesearch.js.org)
 */
export function extractCite(document) {
  //if passing in html string, convert to dom object
  if (typeof document === "string") document = parseHTML(document)?.document;

  var { author, date, title, source } = extractCiteFromMetadata(document);

  if (author?.length < 3 || author?.length > 50) author = null;

  if (author)
    var { author_cite, author_short, author_type } = extractNamedEntity(author);
  else
    var { author_cite, author_short, author_type } =
      extractAuthor(document) || {};

  // date = extractDate(document) || date;
  date = parseDate(date)?.toISOString().split("T")[0];

  title = extractTitle(document) || title;
  source = extractSource(document) || source;

  return { author, author_cite, author_short, date, title, source };
}
