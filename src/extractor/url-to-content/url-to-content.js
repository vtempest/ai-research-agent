import extractContent from "../html-to-content/html-to-content.js";
import { getURLYoutubeVideo, extractYoutubeText } from "./youtube-to-text.js";
import { extractPDF, isUrlPDF } from "./pdf-to-content.js";

/**
 * 🚜📜 Tractor the Text Extractor -
 * Extract URL or HTML to main content with Readability or Postlight Parser,
 * which is an improved version with 100+ custom adapters for major websites. <br>
 * Strips to basic HTML for reading mode or saving research notes. <br>
 * Youtube - get full transcript for video if detected a youtube video.  <br>
 * PDF - Extracts formatted text from PDF with parsing of headings, page headers,
 * footnotes, and adding linebreaks based on standard deviation of range text height. <br>
 * @param {document} urlOrDoc - url or dom object with article content
 * @param {Object} options
 * @param {boolean} options.keyphrases=true - extract key phrases
 * @param {boolean} options.images=true - include images
 * @param {boolean} options.links=true - include links
 * @param {boolean} options.formatting=true - preserve formatting
 * @param {boolean} options.absoluteURLs=true - convert URLs to absolute
 * @param {boolean} options.usePostlightParser=true - PostlightParser is an
 * improved version of Readability with 100+ custom adapters for major websites.
 * @param {boolean} options.timeout=5 - http request timeout
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

      response.html = `<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/${youtubeID}"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe> ${content}`;
    } else {
      try {
        var html = await (await fetchURL(url)).text();
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

/**
 * Fetch with timeout and redirects
 * @param {string} url - url to fetch
 * @param {object} options
 * @param {number} options.timeout=5 -  abort request if not retrived, in seconds
 * @param {number} options.maxRedirects=3 - max redirects to follow
 * @param {number} options.redirectCount=0 - current redirect count
 * @returns {Promise<Response>|Object} - fetch response or error object
 * @category Extractor
 * @example await fetchURL("https://hckrnews.com", {timeout: 5, maxRedirects: 5})
 */
export async function fetchURL(url, options = {}) {
  try {
    let {  timeout = 5, redirectCount = 0, maxRedirects = 3 } = options;


    options = { ...options, signal: AbortSignal.timeout(timeout * 1000) };

    const response = await fetch(url, options);

    if (response.redirected) {
      
      if (redirectCount > maxRedirects)
        return { error: "Max redirects exceeded" };
      redirectCount++;
      options = { ...options, redirectCount };

      return fetchURL(response.url, options);
    }

    return response;
  } catch (e) {
    return { error: "Error in fetch" };
  }
}
