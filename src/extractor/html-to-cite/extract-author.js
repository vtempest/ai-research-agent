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


