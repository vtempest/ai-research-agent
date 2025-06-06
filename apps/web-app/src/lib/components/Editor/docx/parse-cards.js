import * as tokens from "./docx-tokens";
// import  parseDate  from "chrono-node";

export function extractCards (doc)  {
  //TODO not all are in tag format
  const anchors = getIndexesWith(doc, ["tag"]);
  return anchors.map(anchor => parseCard(doc, anchor));
};

/**
 * Parses card objects from the docx document, 
 * returns an array of objects with summary, author, 
 *  year, cite, url, and content in html
 * @param {document} doc
 * @param {number} anchor
 * @returns {{summary: string, author: string, 
 *  year: number, cite: string, url: string, content: string}}
 */
export function parseCard (doc, anchor = 0) {
  const blockStyles = tokens.getHeadingStyles();
  const card = getBlocksUntil(doc, anchor, blockStyles);
  /*
      first block element is the tag,
      assume second block element is the cite,
      everything left is the card body 
     */
  var tag = card.slice(0, 1);
  var cite = card.slice(1, 2);
  var body = card.slice(2);
  var extractHeading = (name) =>
    extractText([getAboveBlockWith(doc, anchor, [name])]);
  var shortCite = extractText(cite, ["strong"]);

  /* //TODO
      Quite a few documents have the bolded part of cite in seperate block than rest of cite
      The cite in seperate block usually contains the author's name at the start, 
      if that is detected move the first block of the body to the cite
    */
  if (body.length > 1) {
    const start = extractText([body[0]]).slice(0, 50);
    if (shortCite.split(" ").find((word) => start.includes(word)))
      cite.push(...body.splice(0, 1));
  }

  // If card has no body, move anything detected as cite to tag -- its an analytic
  if (!body.length && cite) {
    tag.push(...cite.splice(0, 1));
    var type = "analytic";
  }

  let fullcite = extractText(cite),
    url = extractURL(fullcite),
    block = extractHeading("block"),
    summary = extractText(tag),
    underlined = extractText(body, ["underline"]),
    marked = extractText(body, ["mark"]);

  //title
  var title = fullcite?.match(/["“]([^"”“]*)["”“]/);
  title = title ? title[1]?.replace(/[\.,]$/, "") : null;

  //year
  var currrentYear = new Date().getFullYear();
  var yearMatch = fullcite
    ?.replace(/[0-9]{1,2}[-\/][0-9]{1,2}/g, "") // exclude m/d
    .match(/([ '‘][0-9][, —-]|[0-9]{2,4})/);

  if (yearMatch) {
    var year = yearMatch ? parseInt(yearMatch[0].replace(/[^0-9]/, "")) : null;
    year = year < 26 ? year + 2000 : year <= 99 ? year + 1900 : year;
  }

  //use chrono-node to extract any dates in string
  if (!year && fullcite) {
    var date = parseDate(fullcite);
    // chrono mistakes MM dd in cite as current year
    if (date && date.year != currrentYear) year = date.year;
  }

  if (year > currrentYear) year = null; //cannot be future
  if (year < 1900) year = null; //if too old likely an error

  //some cites have "No Date"
  if (fullcite?.match(/(‘ND|No Date|no date)/gi)) year = "ND";

  var author = shortCite?.replace(/[ ',’0-9]+.+/g, "");
  if (author?.split(" ").length > 3)
    author = author.split(" ").slice(0, 3).join(" ").trim(" ");

  var content = tokens.tokensToMarkup(body, true);

  var html = tokens.tokensToMarkup(body, false);

  var section =
    (extractHeading("pocket") ? extractHeading("pocket") + " - " : "") +
    (extractHeading("hat") || "");

  

  var ranges = htmlToRanges(html);

  content = rangesToHTML(content, ranges.htmltags);

  var rangesOut = ranges;

  marked = rangesOut.marked;

  if (type == "analytic") {
    var cardObject = {
      analytic: summary,
      type,
      section,
      block,
    };
  } else
    var cardObject = {
      summary,

      author,
      year,
      marked,
      markedLength: marked.length,
      cite: fullcite,
      url,
      title,
      // section,
      // block,
      // content,
      // rangesOut,
      html,
    };

  return cardObject;
};

/**
   * Strips markup-html to plain text with array or indexes of tags removed
   * @param {string} html
   * @returns {object} text: string, tags: array
   */
function htmlToRanges(html) {
  var text = "",
    marked = "",
    underlined = "",
    isUnderline = 0,
    isHighlight = 0;
  var htmltags = html
    .split("<")
    .map((tagNode) => {
      var [name, content] = tagNode.split(">");

      if (!name) return;

      var index = text.length;

      text += content || "";

      if (name == "u") isUnderline = 1;
      if (name == "/u") isUnderline = 0;
      if (name == "mark") isHighlight = 1;
      if (name == "/mark") isHighlight = 0;

      if (isHighlight && content) marked += content.trim() + "…" || "";
      if (isUnderline && content) underlined += content.trim() + "…" || "";

      return [index, name];
    })
    .filter(Boolean);

  var lengthMarked = marked.length;
  var lengthUnderlined = underlined.length;

  return { marked, underlined, lengthUnderlined, lengthMarked, htmltags };
}

/**
 * Applies HTML tags from range array to plain text to output HTML
 * @param {string} text
 * @param {array} ranges [...[index,htmlTag]]
 * @returns html
 */
function rangesToHTML(text, ranges) {
  ranges = ranges.sort((a, b) => a[0] - b[0]);

  var offset = 0;
  for (var i in ranges) {
    text =
      text.slice(0, ranges[i][0] + offset) +
      "<" +
      ranges[i][1] +
      ">" +
      text.slice(ranges[i][0] + offset);

    offset += ranges[i][1].length + 2;
  }

  return text;
}

//extract url and remove ending char 
export function extractURL  (textWithURL) {
  if (!textWithURL) return null;
  //) ] } ; : , . | > < -
  const regexPattern =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
  const match = textWithURL.match(regexPattern);
  if (match) {
    let firstMatch = match[0];
    if (
      firstMatch.endsWith(")") ||
      firstMatch.endsWith("]") ||
      firstMatch.endsWith("}") ||
      firstMatch.endsWith(";") ||
      firstMatch.endsWith(":") ||
      firstMatch.endsWith(",") ||
      firstMatch.endsWith(".") ||
      firstMatch.endsWith("|") ||
      firstMatch.endsWith(">") ||
      firstMatch.endsWith("<") ||
      firstMatch.endsWith("-")
    ) {
      firstMatch = firstMatch.slice(0, -1);
    }
    return firstMatch;
  } else {
    return null;
  }
};

const extractText = (blocks, styles) => {
  if (!blocks[0]) return;
  return blocks
    .reduce((acc, block) => {
      // join text and add spacing if skipping tokens
      const text = block.tokens?.reduce((str, token) => {
        if (!styles || styles.every((style) => token.format[style]))
          return str + token.text;
        else return str.trim() + " ";
      }, "");
      return acc.trim() + "\n" + text.trim();
    }, "")
    .trim();
};
export function getIndexesWith (blocks, styles)  {
  const indexes = blocks.reduce((arr, block, index) => {
    const isMatch = styles.includes(block.format);
    return isMatch ? [...arr, index] : arr;
  }, []);
  return indexes;
};
const getAboveBlockWith = (blocks, anchor, styles) => {
  for (let i = anchor; i >= 0; i--)
    if (styles.includes(blocks[i].format)) return blocks[i];
};
export function getBlocksUntil (blocks, anchor, styles)  {
  const subDoc = blocks.slice(anchor, blocks.length);
  const endIdx =
    subDoc.slice(1).findIndex((block) => styles.includes(block.format)) + 1;
  return subDoc.slice(0, endIdx > 0 ? endIdx : blocks.length);
};
