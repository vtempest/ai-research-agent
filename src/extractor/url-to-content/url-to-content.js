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
 */

/**
 * <h3>🚜📜 Tractor the Text Extractor </h3><br />
 * Extract URL or HTML to main content, based on Readability with improved version
 *  using 100+ custom adapters for major websites. <br>
 * Strips to basic HTML for reading mode or saving research notes. <br>
 * Youtube - get full transcript for video if detected a youtube video.  <br>
 * PDF - Extracts formatted text from PDF with parsing of headings, page headers,
 * footnotes, and adding linebreaks based on standard deviation of range text height. <br>
 * 
 * <img width="350px"  src="https://i.imgur.com/cRewT07.png" > <br />
 * @param {document|string} urlOrDoc - url or dom object with article content
 * @param {Object} [options]
  * @param {boolean} options.images default=true - include images
 * @param {boolean} options.links default=true - include links
 * @param {boolean} options.formatting default=true - preserve formatting
 * @param {boolean} options.absoluteURLs default=true - convert URLs to absolute
 * @param {number} options.timeout default=5 - http request timeout
 * @returns {Article} - object containing url, html, author, date, title, source
 * @author [Gulakov, A. (2024)](https://airesearch.wiki)
 */
export async function extract(urlOrDoc, options = {}) {
  var {
    images = true,
    links = true,
    formatting = true,
    absoluteURLs = true,
    timeout = 5,
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
        var html = await scrapeURL(url);
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
