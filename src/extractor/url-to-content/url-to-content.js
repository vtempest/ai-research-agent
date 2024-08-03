import extractContent from "../html-to-content/html-to-content.js";
import { getURLYoutubeVideo, fetchYoutubeText } from "./youtube-to-text.js";
import { extractPDF, isUrlPDF } from "./pdf-to-content.js";
import fetch from "node-fetch";

/**
 * Extract cite info and main formatted text content
 * Checks if URL is PDF, HTML or Youtube.
 * @param {document} urlOrDoc url or dom object with article content
 * @returns {object} {author, date, title, source, content, image}
 */
export default async function extract(urlOrDoc, options = {}) {
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
      var { content, timestamps } = await fetchYoutubeText(url);

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
  } else if (typeof urlOrDoc == "object"){
    //if passing in dom object document

    var url = urlOrDoc.location.href;

    //pdf checker for embeded docs
    isPdf = urlOrDoc.querySelectorAll('embed[type="application/pdf"]')?.length;
    var youtubeID = getURLYoutubeVideo(url);

    if (isPdf)
      // pdf checker
      response = await extractPDF(url, {});
    if (youtubeID) {
      var { content, timestamps } = await fetchYoutubeText(url);

      response.html = `<iframe width="560" height="315" 
      src="https://www.youtube.com/embed/${youtubeID}"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
      </iframe> ${content}`;
    } //pass doc to extract
    else response = await extractContent(urlOrDoc, options);
  }

  if ( !response.html || response.html?.length == 0)
    return { error: "No text" };

  //check html for bot block messages
  var commonBlockMessages = [
    "Cloudflare Ray ID found at the bottom of this page",
    "Please verify you are a human",
    "Sorry, we just need to make sure you're not a robot",
    "Access to this page has been denied",
    "Please make sure your browser supports JavaScript",
    "Please complete the security check to access",
  ];

  if (commonBlockMessages.filter((msg) =>
    response?.html?.indexOf(msg) > -1).length)

    return { error: "Bot detected", html: response.html };

  //word count of full text original, no html
  response.word_count = response.html
    ?.replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .split(" ").length;

  //put url on top
  response = Object.assign({ url }, response);

  return response;
}

