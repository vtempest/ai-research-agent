import { parseDate } from "chrono-node";
import Parser from "@postlight/parser";
import { Readability } from "./readability.js";
import extractCite from "../html-to-cite/index.js";
import convertHTMLToBasicHTML from "./html-to-basic-html.js";
import { parseHTML } from "linkedom";

export default async function extractContent(documentOrHTML, options = {}) {
  options = options || {
    images: true,
    links: true,
    formatting: true,
    absoluteURLs: 1,
    url: "",
    usePostlightExtractor: 1,
  };
  if (typeof documentOrHTML === "string") var html = documentOrHTML;
  else var html = documentOrHTML.documentElement.innerHTML;

  var url = options.url;
  var article;
  try {
    if (options.usePostlightExtractor) {
      article = await new Promise(function (resolve, reject) {
        Parser.parse(url, {
          html: document.documentElement.innerHTML,
        })
          .then(resolve)
          .catch((e) => {
            console.log(e);
            reject();
          });
      });
    } else {
      var document = parseHTML(html)?.document;
      article = new Readability(document).parse();
    }
  } catch (e) {
    return { error: "Error in fetch" };
  }

  var { author, author_cite, author_short, date, title, source } =
    extractCite(html);

  // author = article.author || author;
  // title = article.title || title;
  // date = date_published || date;

  if (article?.content)
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
