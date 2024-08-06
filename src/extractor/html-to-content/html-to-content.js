import { parseDate } from "chrono-node";
import Parser from "@postlight/parser";
import { Readability } from "./readability.js";
import {extractCite} from "../html-to-cite/index.js";
import {convertHTMLToBasicHTML} from "./html-to-basic-html.js";
import { parseHTML } from "linkedom";
import {extractHumanName} from "../html-to-cite/human-names-recognize.js";
/**
 * Extracts the main content and cite from a document or HTML string
 * @param {string|object} documentOrHTML 
 * @param {object} options 
 * @returns {object} {title, author_cite, author_short, author, date, source, html}
  * @category Extractor
*/
export default async function extractContent(documentOrHTML, options = {}) {
  const {
    images = true,
    links = true,
    formatting = true,
    absoluteURLs = 1,
    url = "",
    usePostlightExtractor = 1,
  } = options;
  if (typeof documentOrHTML === "string") var html = documentOrHTML;
  else var html = documentOrHTML.documentElement.innerHTML;

  var article;
  try {
    if (usePostlightExtractor) {
      article = await  Parser.parse(url, {html})
    } else {
      var document = parseHTML(html)?.document;
      article = new Readability(document).parse();
    }
  } catch (e) {
    return { error: "Error in Parsing" };
  }

  var { author, author_cite, author_short, date, title, source } =
    extractCite(html);
  
    if (!article || !article?.content)
    return { error: "No content found" };
    //TODO comapre by name recognition

  author = article.author && extractHumanName(article.author)?.author_type  ? article.author :  author;
  title = article.title || title;
  date = parseDate(article.date_published)?.toISOString().split("T")?.[0] || date;

  
    var html = convertHTMLToBasicHTML(article?.content, options);

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
