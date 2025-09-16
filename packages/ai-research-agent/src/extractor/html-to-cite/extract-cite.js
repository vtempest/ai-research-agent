import { parseHTML } from "linkedom";
import { extractAuthor } from "./extract-author.js";
import { extractDateQuick } from "./extract-date/extract-date-quick.js";
import { extractDate } from "./extract-date/extract-date.js";
import { extractSource } from "./extract-source.js";
import { extractTitle } from "./extract-title.js";
import { extractCiteFromMetadata } from "./metadata-to-cite.js";
import { extractHumanName } from "./human-names-recognize.js";
import { parseDate } from "chrono-node";

/**
 * ### 📚💎 Extract Expert Excerpt 
 * <img width="350px" src="https://i.imgur.com/4GOOM9s.jpeg" />
 *
 * Extract author, date, source, and title from HTML using meta tags
 * and common class names. Validates human name from author string to check
 * against common list of 90k first names, last names,and organizations to infer
 * if it should be reversed starting by author last name (accounting for affixes/titles),
 * since organizations are not reversed.
 * [Article Extraction Benchmark](https://github.com/scrapinghub/article-extraction-benchmark?tab=readme-ov-file#results)
 * @param {document} document  dom object or html string with article content
 * @returns {{author: string, author_cite: string, author_short: string, date: string, title: string, source: string}} An object containing extracted citation information.
 * @category Extract
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 */
export function extractCite(document, options = {}) {
  const {
    url = "",
  } = options;

  if (!document) return null;

  //if passing in html string, convert to dom object
  if (typeof document === "string") document = parseHTML(document)?.document;

  var { author, date, title, source } = extractCiteFromMetadata(document);

  if (author?.length < 3 || author?.length > 100) author = null;

    var { author_cite, author_short, author_type } =
      extractAuthor(document) || extractHumanName(author);

  date = extractDateQuick(document, url) || date;

  
  //extract from ways of writing dates in natural language into standard format
  date = parseDate(date)?.toISOString().split("T")[0] || null;


  
  if (!date)
    try {
      date = extractDate(document,
        true,
        true,
        "%Y-%m-%d",
        url,
        false,
        new Date("2002-01-01"),
      );
    } catch (e) { console.log(e); }

    date = parseDate(date)?.toISOString().split("T")[0] || null;

  title = extractTitle(document) || title;
  source = extractSource(document) || source;

  // URL TO SOURCE
  if (!source && url?.length > 20)
    source = url.split('//')[1].split('/')[0]?.replace("www.", "")
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return { author, author_cite, date, title, source };
}
