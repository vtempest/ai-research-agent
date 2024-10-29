import { extractContentAndCite } from "../html-to-content/html-to-content.js";
import { getURLYoutubeVideo, convertYoutubeToText } from "./youtube-to-text.js";
import { convertPDFToHTML, isUrlPDF } from "./pdf-to-content.js";
import { scrapeURL } from "./scrape-url.js";

/**
 * @typedef {Object} Article
 * @property {string} url - The URL of the article
 * @property {string} html - The HTML content of the article
 * @property {string} author - The author of the article
 * @property {string} author_cite - Author name in Last, First Middle format
 * @property {string} author_short - Author name in Last format
 * @property {number} author_type - Author type ["single", "two-author", "more-than-two", "organization"]
 * @property {string} date - The publication date of the article
 * @property {string} title - The title of the article
 * @property {string} source - The source or origin of the article
 * @property {number} word_count - The word count of the full text (without HTML tags)
 * @category Extract
 */

/**
 * ### 🚜📜 Tractor the Text Extractor 
 * <img width="350px"  src="https://i.imgur.com/cRewT07.png" >
 * 
 * 1. Main Content Detection: Extract the main content from a URL by combining 
 * Mozilla Readability and Postlight Mercury algorithms, utilizing over 100 
 * custom adapters for major sites for article, author, date HTML classes.
 * 2. Basic HTML Standardization: Transform complex HTML into a simplified 
 * reading-mode format of basic HTML, making it ideal for research note archival
 *  and focused reading, with headings, images and links.
 * 3. YouTube Transcript Processing: When a YouTube video URL is detected, 
 * retrieve the complete video transcript including both manual captions and 
 * auto-generated subtitles, maintaining proper timestamp synchronization and 
 * speaker identification where available.
 * 4. PDF Text Extraction and Structure: Process PDF documents by extracting
 *  formatted text while intelligently handling line breaks, page headers, 
 *  footnotes. The system analyzes text height statistics to automatically
 *  infer heading levels, creating a properly structured document hierarchy
 *  based on standard deviation from mean text size.
 * 5. Citation Information Extraction: Identify and extract citation metadata
 *  including author names, publication dates, sources, and titles using HTML
 *  meta tags and common class name patterns. The system validates author names
 *  against a comprehensive database of 90,000 first and last names, 
 * distinguishing between personal and organizational authors to properly 
 * format citations.
 * 6. Author Name Formatting: Process author names by checking against 
 * known name databases, handling affixes and titles correctly, and determining
 *  whether to reverse the name order based on whether it's a personal or 
 * organizational author, ensuring proper citation formatting.
 * 7. Content Validation: Verify the extracted content's accuracy by comparing
 *  results from multiple extraction methods, ensuring all essential elements 
 * are preserved and properly formatted for the intended use case.
 * @param {document|string} urlOrDoc - url or dom object with article content
 * @param {Object} [options]
  * @param {boolean} options.images default=true - include images
 * @param {boolean} options.links default=true - include links
 * @param {boolean} options.formatting default=true - preserve formatting
 * @param {boolean} options.absoluteURLs default=true - convert URLs to absolute
 * @param {number} [options.timeout=5] - http request timeout
 * @returns {{  
 *  title: string,
 *  author_cite: string,
 *  author_short: string,
 *  author: string,
 *  date: string,
 *  source: string,
 *  html: string,
 *  word_count: number
 * }} 
 
  *  url - The URL of the article
  *  html - The HTML content of the article
  *  author - The author of the article
  *  author_cite - Author name in Last, First Middle format
  *  author_short - Author name in Last format
  *  author_type - Author type ["single", "two-author", "more-than-two", "organization"]
  *  date - The publication date of the article
  *  title - The title of the article
  *  source - The source or origin of the article
  *  word_count - The word count of the full text (without HTML tags)
 * @category Extract
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 */
export async function extractContent(urlOrDoc, options = {}) {
  var {
    images = true,
    links = true,
    formatting = true,
    absoluteURLs = true,
    timeout = 5,
    proxy = null,
  } = options;
  var response = {};

  let isPdf;

  //url  to fetch
  if (typeof urlOrDoc === "string") {
    var url = urlOrDoc;

    isPdf = url.endsWith(".pdf");

    if (!isPdf) isPdf = await isUrlPDF(url);
    var youtubeID = getURLYoutubeVideo(url);

    if (isPdf) {
      // pdf checker
      response = await convertPDFToHTML(url, options);

      // check youtube
    } else if (youtubeID) {
      var { content, timestamps } = await convertYoutubeToText(url, options);

      response.html = content;
      response.timestamps = timestamps;
    } else {
      try {
        var html = await scrapeURL(url, {
          proxy
        });
      } catch (e) {
        return { error: "Error in fetch", msg: e.message };
      }
      if (html.error){
        return { error: "Error in fetch", msg: html.error };
      }
      options.url = url;
      response = extractContentAndCite(html, options);
    }
  } else if (typeof urlOrDoc == "object") {
    //if passing in dom object document

    var url = urlOrDoc.location.href;

    //pdf checker for embeded docs
    if (urlOrDoc?.querySelectorAll)
      isPdf = urlOrDoc?.querySelectorAll(
        'embed[type="application/pdf"]'
      )?.length;
    var youtubeID = getURLYoutubeVideo(url);

    if (isPdf)
      // pdf checker
      response = await convertPDFToHTML(url, {});
    if (youtubeID) {
      var { content, timestamps } = await convertYoutubeToText(url);

      response.html = content;
      response.timestamps = timestamps;

    } //pass doc to extract
    else response = extractContentAndCite(urlOrDoc, options);
  }

  if (!response.html || response.html?.length == 0) return { error: "No text" };

  //word count of full text original, no html
  response.word_count = response.html
    ?.replace(/<[^>]*>/g, " ")
    .split(" ").length;

  //put url on top
  response = Object.assign({ url }, response);

  return response;
}
