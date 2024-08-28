import extractContent from "../html-to-content/html-to-content.js";
import { getURLYoutubeVideo, extractYoutubeText } from "./youtube-to-text.js";
import { extractPDF, isUrlPDF } from "./pdf-to-content.js";
import { scrapeURL } from "./scrape-url.js";

/**
 * <h3>🚜📜 Tractor the Text Extractor </h3><br />
 * Extract URL or HTML to main content with Readability or Postlight Parser,
 * which is an improved version with 100+ custom adapters for major websites. <br>
 * Strips to basic HTML for reading mode or saving research notes. <br>
 * Youtube - get full transcript for video if detected a youtube video.  <br>
 * PDF - Extracts formatted text from PDF with parsing of headings, page headers,
 * footnotes, and adding linebreaks based on standard deviation of range text height. <br>
 * @param {document|string} urlOrDoc - url or dom object with article content
 * @param {Object} options
 * @param {boolean} options.keyphrases default=true - extract key phrases
 * @param {boolean} options.images default=true - include images
 * @param {boolean} options.links default=true - include links
 * @param {boolean} options.formatting default=true - preserve formatting
 * @param {boolean} options.absoluteURLs default=true - convert URLs to absolute
 * @param {boolean} options.usePostlightParser default=true - PostlightParser is an
 * improved version of Readability with 100+ custom adapters for major websites.
 * @param {boolean} options.timeout default=5 - http request timeout
 * @returns {Object} - {author, date, title, source, content, image}
 * @category Extractor
 */
export async function extract(urlOrDoc, options = {}) {
  var {
    keyphrases = true,
    images = true,
    links = true,
    formatting = true,
    absoluteURLs = true,
    usePostlightParser = false,
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
      response = await extractPDF(url, options);

      // check youtube
    } else if (youtubeID) {
      var { content, timestamps } = await extractYoutubeText(url, options);

      response.html = content;
      response.timestamps = timestamps;
    } else {
      try {
        var html = await scrapeURL(url);
      } catch (e) {
        return { error: "Error in fetch" };
      }
      if (html.error){
        return { error: "Error in fetch" };

      }
      options.url = url;
      response = await extractContent(html, options);
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
      response = await extractPDF(url, {});
    if (youtubeID) {
      var { content, timestamps } = await extractYoutubeText(url);

      response.html = content;
      response.timestamps = timestamps;

    } //pass doc to extract
    else response = await extractContent(urlOrDoc, options);
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
