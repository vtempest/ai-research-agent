import extractContent from "../html-to-content/html-to-content.js";
import { getURLYoutubeVideo, extractYoutubeText } from "./youtube-to-text.js";
import { extractPDF, isUrlPDF } from "./pdf-to-content.js";
// import fetch from "node-fetch";

/**
 * 🚜📜 Tractor the Text Extractor -
 * Extract URL or HTML to main content with Readability or Postlight Parser,
 * which is an improved version with 100+ custom adapters for major websites.
 * Strips to basic HTML for reading mode or saving research notes.
 * Youtube - get full transcript for video if detected a youtube video.
 * PDF - Extracts formatted text from PDF with parsing of headings, page headers,
 * footnotes, and adding linebreaks based on standard deviation of range text height.
 * @param {document} urlOrDoc - url or dom object with article content
 * @param {Object} options
 * @param {boolean} options.keyphrases - extract key phrases
 * @param {boolean} options.images - include images
 * @param {boolean} options.links - include links
 * @param {boolean} options.formatting - preserve formatting
 * @param {boolean} options.absoluteURLs - convert URLs to absolute
 * @returns {Object} - {author, date, title, source, content, image}
 * @category Extractor
 */
export async function extract(urlOrDoc, options = {}) {
  options = options || {
    keyphrases: true,
    images: true,
    links: true,
    formatting: true,
    absoluteURLs: true,
  };
  var response = {};

  let isPdf;

  if (typeof urlOrDoc === "string") {
    var url = urlOrDoc;

    isPdf = url.endsWith(".pdf");

    if (!isPdf) isPdf = await isUrlPDF(url);

    if (isPdf) {
      // pdf checker
      response = await extractPDF(url, {});
      var youtubeID = getURLYoutubeVideo(url);

      // check youtube
    } else if (youtubeID) {
      var { content, timestamps } = await extractYoutubeText(url);

      response.html = `<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/${youtubeID}"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe> ${content}`;
    } else {
      try {
        var html = await (
          await fetch(url, {
            timeout: 2000,
          })
        ).text();
      } catch (e) {
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

      response.html = `<iframe width="560" height="315" 
      src="https://www.youtube.com/embed/${youtubeID}"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
      </iframe> ${content}`;
    } //pass doc to extract
    else response = await extractContent(urlOrDoc, options);
  }

  if (!response.html || response.html?.length == 0) return { error: "No text" };

  //check html for bot block messages
  var commonBlocks = [
    "Cloudflare Ray ID found ",
    "Please verify you are a human",
    "Sorry, we just need to make sure you're not a robot",
    "Access to this page has been denied",
    "Please make sure your browser supports JavaScript",
    "Please complete the security check to access",
  ];

  if (commonBlocks.filter((msg) => response?.html?.indexOf(msg) > -1).length)
    return { error: "Bot detected" }; //, html: response.html };

  //word count of full text original, no html
  response.word_count = response.html
    ?.replace(/<[^>]*>/g, " ")
    .split(" ").length;

  //put url on top
  response = Object.assign({ url }, response);

  return response;
}
