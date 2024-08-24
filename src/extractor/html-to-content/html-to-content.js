import { parseDate } from "chrono-node";
import { Readability } from "./readability.js";
import {extractCite} from "../html-to-cite/index.js";
import {convertHTMLToBasicHTML} from "./html-to-basic-html.js";
import { parseHTML } from "linkedom";
import {extractNamedEntity} from "../html-to-cite/human-names-recognize.js";

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
    customCite = 1,
    url = "",
    usePostlightExtractor = 1,
  } = options;

  //postlight exceed time limit in cloudflare
  
  if (typeof documentOrHTML === "string") var html = documentOrHTML;
  else var html = documentOrHTML.documentElement?.innerHTML;
  if (!html) return { error: "No HTML found" };

  var article;
  try {
    if (usePostlightExtractor && typeof window !== "undefined") {

      const  Parser =
        await import( "@postlight/parser/dist/mercury.web.js");

      article = await  Parser.parse(url, {html})
    } else {
      var document = parseHTML(html)?.document;
      article = new Readability(document).parse();
    }
  } catch (e) {
    return { error: "Error in Parsing" };
  }

  if (!article || !article?.content)
    return { error: "No content found" };
    //TODO comapre by name recognition

  var {author, title, date_published } = article;

  var date = date_published //parseDate(date_published)?.toISOString().split("T")?.[0];

  if (customCite){

    var { author, author_cite, author_short, date, title, source } =
      extractCite(html);
    
    author = article.author && extractNamedEntity(article.author)?.author_type  ? article.author :  author;
    title = article.title || title;
    date = parseDate(article.date_published)?.toISOString().split("T")?.[0] || date;
  }
  
  
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
