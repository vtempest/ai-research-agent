import { extractNamedEntity } from "./human-names-recognize.js";
import { parseDate } from "chrono-node";

// https://www.scribbr.com/citation/generator/folders/2rx21jyIjZIKRrcwLk2oXE/lists/4OeJQ4euxzyTk9BiPTRjwn/
const AUTHOR_META_TAGS = [
  "byl",
  "clmst",
  "dc.author",
  "dcsext.author",
  "dc.creator",
  "rbauthors",
  "authors",
  "sailthru.author",
  "article:author",
  "parsely-author",
];

const AUTHOR_SELECTORS = [
  ".entry .entry-author",
  ".author.vcard .fn",
  ".author .vcard .fn",
  ".byline.vcard .fn",
  ".byline .vcard .fn",
  ".byline .by .author",
  ".byline .by",
  ".byline .author",
  ".post-author.vcard",
  ".post-author .vcard",
  "a[rel=author]",
  "#by_author",
  ".by_author",
  "#entryAuthor",
  ".entryAuthor",
  ".byline a[href*=author]",
  "#author .authorname",
  ".author .authorname",
  "#author",
  ".author",
  ".articleauthor",
  ".ArticleAuthor",
  ".byline",
];

const AUTHOR_MAX_LENGTH = 300;
const BYLINE_REGEX = /^[\n\s]*By\s*:?\s*/i;
const CLEAN_AUTHOR_RE = /^\s*(posted |written )?by\s*:?\s*(.*)/i;

/**
 * Extracts the author from the document and validates it as a human name
 *
 * @param {Document} document
 * @returns {object|null} {author_cite, author_short, author_type} or null if no valid author found
  * @private
*/
export function extractAuthor(document) {
  

  // 1. Check meta tags
  for (const tag of AUTHOR_META_TAGS) {
    const metaElement = document.querySelector(
      `meta[name="${tag}"], meta[property="${tag}"]`
    );
    if (metaElement) {
      const author = extractAndValidateHumanName(
        metaElement.getAttribute("content")
      );
      if (author) return author;
    }
  }

  // 2. Check selectors
  for (const selector of AUTHOR_SELECTORS) {
    const element = document.querySelector(selector);
    if (element) {
      const author = extractAndValidateHumanName(element.textContent);
      if (author) return author;
    }
  }

  // 3. Check for YouTube channel name
  const channelNameLink = document.querySelector('link[itemprop="name"]');
  if (channelNameLink) {
    const author = extractAndValidateHumanName(
      channelNameLink.getAttribute("content")
    );
    if (author) return author;
  }

  // 4. Broader search in divs and spans
  const elements = [
    ...document.getElementsByTagName("div"),
    ...document.getElementsByTagName("span"),
  ];
  for (const element of elements) {
    if (
      element.id.match(/author|byline/i) ||
      element.className.match(/author|byline/i)
    ) {
      const author = extractAndValidateHumanName(element.innerText);
      if (author) return author;
    }
  }

  // 5. As a last resort, look for "By" pattern in any paragraph
  const paragraphs = document.getElementsByTagName("p");
  for (const p of paragraphs) {
    if (BYLINE_REGEX.test(p.textContent)) {
      const author = extractAndValidateHumanName(p.textContent);
      if (author) return author;
    }
  }

  return null;
}

// Helper function to clean and validate author string
const validateAuthor = (author) => {
  if (!author) return null;
  author = author.replace(CLEAN_AUTHOR_RE, "$2").trim();
  return author.length > 0 && author.length < AUTHOR_MAX_LENGTH
    ? author
    : null;
};

// Function to extract and validate human name
const extractAndValidateHumanName = (author) => {
  const validatedAuthor = validateAuthor(author);
  if (validatedAuthor) {
    return extractNamedEntity(validatedAuthor);
  }
  return null;
};


/**
 * Extract date from document using common class names
 *
 * @param {document} document document or dom object with article content
 * @returns {object} date
  * @private
*/
export function extractDate(document) {
  // var mainText = document.body.innerText.slice(0, 5000);

  // // sometimes this over-extracts to get random dates like rec yt vids
  // // var date =
  // //   parseDate(mainText)?.toISOString().split("T")?.[0] 
    
    // the problem is this grabs dates inside the article itself, like wiki birth dates
  // var date = mainText.match(/\b\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})\b/) || //Match m/d/yy to mm/dd/yyyy
  //   mainText.match(
  //     /\b(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])-(?:[0-9]{2})?[0-9]{2}\b/
  //   ) ||
  //   mainText.match(
  //     /\b(1[0-2]|0?[1-9])\.(3[01]|[12][0-9]|0?[1-9])\.(?:[0-9]{2})?[0-9]{2}\b/
  //   ) ||
  //   mainText.match(
  //     /\b(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?)\ 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Nov|Dec)(ember)?)\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))\b/
  //   ) ||
  //   mainText.match(
  //     /\b(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?)\ 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Nov|Dec)(ember)?)\ (0?[1-9]|([12]\d)|30)(st|nd|rd|th))|(Feb(ruary)?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))(st|nd|rd|th)))\,\ ((1[6-9]|[2-9]\d)\d{2}))\b/
  //   ) ||
  //   mainText.match(
  //     /\b(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?)(.)?\ 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Nov|Dec)(ember)?)(.)?\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?(.)?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))\b/
  //   ) ||
  //   mainText.match(
  //     /\b((31(?!\ (Feb(ruary)?|Apr(il)?|June?|(Sep(?=\b|t)t?|Nov)(ember)?)))|((30|29)(?!\ Feb(ruary)?))|(29(?=\ Feb(ruary)?\ (((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))|(0?[1-9])|1\d|2[0-8])\ (Jan(uary)?|Feb(ruary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sep(?=\b|t)t?|Nov|Dec)(ember)?)\ ((1[6-9]|[2-9]\d)\d{2})\b/
  //   ) ||
  //   mainText.match(
  //     /\b(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?)\ 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Nov|Dec)(ember)?)\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))\b/
  //   ) ||
  //   mainText.match(
  //     /\b(?:(((JAN(UARY)?|MA(R(CH)?|Y)|JUL(Y)?|AUG(UST)?|OCT(OBER)?|DEC(EMBER)?)\ 31)|((JAN(UARY)?|MA(R(CH)?|Y)|APR(IL)?|JU((LY?)|(NE?))|AUG(UST)?|OCT(OBER)?|(SEPT|NOV|DEC)(EMBER)?)\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))\b/
  //   ) ||
  //   mainText.match(
  //     /\b(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?)\ 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Nov|Dec)(ember)?)\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\ ((1[6-9]|[2-9]\d)\d{2}))\b/
  //   ) ||
  //   mainText.match(
  //     /\b(?:(((JAN(UARY)?|MA(R(CH)?|Y)|JUL(Y)?|AUG(UST)?|OCT(OBER)?|DEC(EMBER)?)\ 31)|((JAN(UARY)?|MA(R(CH)?|Y)|APR(IL)?|JU((LY?)|(NE?))|AUG(UST)?|OCT(OBER)?|(SEPT|NOV|DEC)(EMBER)?)\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\ ((1[6-9]|[2-9]\d)\d{2}))\b/
  //   ) ||
  //   mainText.match(
  //     /\b(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?)\.\ 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Nov|Dec)(ember)?)\.\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?\.\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\ ((1[6-9]|[2-9]\d)\d{2}))\b/
  //   ) ||
  //   mainText.match(
  //     /\b(?:(((JAN(UARY)?|MA(R(CH)?|Y)|JUL(Y)?|AUG(UST)?|OCT(OBER)?|DEC(EMBER)?)\.\ 31)|((JAN(UARY)?|MA(R(CH)?|Y)|APR(IL)?|JU((LY?)|(NE?))|AUG(UST)?|OCT(OBER)?|(SEPT|NOV|DEC)(EMBER)?)\.\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?\.\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\ ((1[6-9]|[2-9]\d)\d{2}))\b/
  //   ) ||
  //   mainText.match(
  //     /\b(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?)\.\ 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Nov|Dec)(ember)?)\.\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?\.\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))\b/
  //   ) ||
  //   mainText.match(
  //     /\b(?:(((JAN(UARY)?|MA(R(CH)?|Y)|JUL(Y)?|AUG(UST)?|OCT(OBER)?|DEC(EMBER)?)\.\ 31)|((JAN(UARY)?|MA(R(CH)?|Y)|APR(IL)?|JU((LY?)|(NE?))|AUG(UST)?|OCT(OBER)?|(SEPT|NOV|DEC)(EMBER)?)\.\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?\.\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))\b/
  //   );

  
  var date;

  for (let tag of ["time", "span", "div", "p", "*"]) {
    for (let el of document.getElementsByTagName(tag)) {
      if (el.textContent.includes("Published")) {
        date = el.textContent.split("Published")[1].trim();
        if (date) return date;
      } else if (el.textContent.includes("Updated")) {
        date = el.textContent.split("Updated")[1].trim();
        if (date) return date;
      } else if (el.textContent.includes("Posted")) {
        date = el.textContent.split("Posted")[1].trim();
        if (date) return date;
      }
    }
  }

  return date;
}

/**
 * Extract source from document using common class names
 *
 * @param {document} document document or dom object with article content
 * @returns {object} source
  * @private
*/
export function extractSource(document) {
  var source, arrSources;

  if (typeof source == "undefined") {
    arrSources = document.getElementsByClassName("og:site_name");
    if (arrSources.length <= 0) {
      arrSources = document.getElementsByClassName("cre");
    }
    if (arrSources.length <= 0) {
      var arrMeta = document.getElementsByTagName("meta");

      for (var i = 0; i < arrMeta.length; i++) {
        if (arrMeta[i].getAttribute("property") == "og:site_name") {
          source = arrMeta[i].content;
        }
      }
    }
    if (arrSources.length > 0) {
      source = arrSources[0].content;
    }
  }
  return source;
}

/**
 * Extract title from document using common class names
 *
 * @param {document} document document or dom object with article content
 * @returns {object} title
 * @private
 */
export function extractTitle(document) {
  var title, arrTitles;

  if (typeof title == "undefined") {
    arrTitles = document.getElementsByClassName("og:title");
    if (arrTitles.length <= 0)
      arrTitles = document.getElementsByClassName("DC.title");
    if (arrTitles.length <= 0)
      arrTitles = document.getElementsByClassName("headline");
    if (arrTitles.length <= 0) {
      var arrMeta = document.getElementsByTagName("meta");
      for (var i = 0; i < arrMeta.length; i++) {
        if (arrMeta[i].getAttribute("property") == "og:title") {
          title = arrMeta[i].content;
        }
      }
    }

    if (typeof title == "undefined") title = document.title;

    if (typeof title != "undefined") {
      if (title.indexOf("|") != -1)
        title = title.slice(0, title.indexOf("|") - 1);
      if (title.indexOf("--") != -1)
        title = title.slice(0, title.indexOf("--") - 1);
      if (title.indexOf(" - ") != -1)
        title = title.slice(0, title.indexOf(" - "));
    }
  }

  return title;
}
