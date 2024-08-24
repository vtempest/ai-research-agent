import { resolvePDFJS } from "pdfjs-serverless";
import * as chrono from "chrono-node";
/**
 * Extracts formatted text from PDF with parsing of linebreaks ,
 * page headers, footnotes, and infering section headings based on
 * standard deviation of range from average text height <br>
 * https://en.wikipedia.org/wiki/History_of_PDF <br>
 * https://github.com/mozilla/pdf.js/releases <br>
 * https://www.oreilly.com/library/view/pdf-explained/9781449321581/ch04.html
 * @param {string} pdfURLOrBuffer - URL to a PDF file or buffer from fs.readFile
 * @param {Object} options
 * @param {boolean} options.addHeadingsTags=true - Adds H1 tags to heading titles in document
 * @param {boolean} options.addPageNumbers=true - Adds  #  to end of each page
 * @param {boolean} options.addSentenceLineBreaks=true - Inserts line breaks at the end of sentence ranges
 * @param {boolean} options.removePageHeaders=true - Removes repeated headers found on each page
 * @param {boolean} options.removeHyphens=true - Removes hyphens at end of lines
 * @param {boolean} options.moveFootnotes=true - Moves footnotes to end of document
 * @param {boolean} options.timeout=5 - http request timeout
 * @returns {string|Object} HTML formatted text or {error} if error in parsing
 * @category Extractor
 */
export async function extractPDF(pdfURLOrBuffer, options = {}) {
  // try {
    var {
      addHeadingsTags = true,
      addPageNumbers = true,
      addSentenceLineBreaks = false,
      removePageHeaders = true,
      removeHyphens = true,
      moveFootnotes = true,
      addCitation = true,
      timeout = 15,
    } = options;

    // pass in databuffer or download all pdf data 
    // and convert to array buffer
    var buffer =
      typeof pdfURLOrBuffer === "string"
        ? await (
            await fetch(pdfURLOrBuffer, { signal: AbortSignal.timeout(timeout * 1000) })
          ).arrayBuffer()
        : pdfURLOrBuffer;

    try {
      const { getDocument } = await resolvePDFJS();
      var doc = await getDocument({
        data: new Uint8Array(buffer),
        useSystemFonts: true,
        verbosity: 0,
      }).promise;
    } catch (e) {
      return { error: e.message };
    }
    // get text ranges with pdf.js which gives pages
    // with few word ranges with {str, hasEOL, height}
    var pages = []; //[ [{str, hasEOL, height}, ...], ...]
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      var contentObjects = await page.getTextContent();
      pages.push(contentObjects.items);
    }

    //remove redundant headers
    if (removePageHeaders && pages.length > 2) {
      //test first 4 ranges in each page for a redundant header
      for (let rangeIndex = 0; rangeIndex < 3; rangeIndex++) {
        pages.forEach((page, pageNum) => {
          var range = page[rangeIndex];
          if (!range) return;

          // detect header if same range in same index as prior page
          if (
            range?.length > 6 &&
            pageNum >= 1 &&
            range == pages[pageNum - 1][rangeIndex].str
          ) {
            pages[pageNum][rangeIndex].str = "";
          }
        });
      }
    }

    //get average text heights to infer headings and footnotes
    const articleCharHeights = [];
    for (const textItem of pages.flat()) {
      if (textItem.height) {
        articleCharHeights.push(
          ...Array(textItem.str.length).fill(textItem.height)
        );
      }
    }
    const articleAvgHeight = mean(articleCharHeights);
    const articlesStandardDev = calculateStandardDeviation(articleCharHeights);

    const rangeTokens = []; // array of ranges {newline, mode, text}
    let newline = true;
    let mode = "p"; // "h1" | "h2" | "p" | "space" | "footnote"
    let pageNumber = 1;
    for (const pageTextItems of pages) {
      const charHeights = [];
      for (const textItem of pageTextItems) {
        if (textItem.height) {
          charHeights.push(...Array(textItem.str.length).fill(textItem.height));
        }
      }

      const avgHeight = mean(charHeights);
      const calculateStandardDeviationHeight =
        calculateStandardDeviation(charHeights);

      // use text height to infer headings and footnotes based on
      // standard deviation to the average text heights
      const MAX_HEADING_LENGTH = 50;

      for (const textItem of pageTextItems) {
        if (
          textItem.str.length < MAX_HEADING_LENGTH &&
          textItem.str.toLowerCase() != textItem.str && //cannot be all lowercase
          textItem.height > articleAvgHeight + 3 * articlesStandardDev
        ) {
          mode = "h1";
        } else if (
          textItem.str.length < MAX_HEADING_LENGTH &&
          textItem.height > articleAvgHeight + articlesStandardDev
        ) {
          mode = "h2";
        } else if (
          textItem.height &&
          textItem.height < avgHeight - calculateStandardDeviationHeight
        ) {
          mode = "footnote";
        } else if (textItem.height) {
          mode = "p";
        } else {
          mode = "space";
        }

        rangeTokens.push({
          newline,
          mode,
          text: textItem.str,
        });
        newline = textItem.hasEOL && !textItem.str;
      }

      //add page numbers
      if (addPageNumbers)
        rangeTokens.push({ mode: "p", text: "[ " + pageNumber + " ]" });
      pageNumber++;
    }

    //convert {} ranges to html text
    let htmlChunks = [],
      appendixChunks = [],
      previousMode = "space";
    for (const x of rangeTokens) {
      if (x.mode == "space") {
        // previousMode = x.mode;
        continue;
      }
      if (x.newline) {
        if (addHeadingsTags && previousMode == "h1") htmlChunks.push(`</h1> `);
        if (addHeadingsTags && previousMode == "h2") htmlChunks.push(`</h2> `);
        if (previousMode == "p") htmlChunks.push("</p>");
        if (x.mode == "p") htmlChunks.push("\n\n<p>");
        if (addHeadingsTags && x.mode == "h1") htmlChunks.push(`\n\n<h1>`);
        if (addHeadingsTags && x.mode == "h2") htmlChunks.push(`<h2>`);
      }

      if (x.text) {
        if (moveFootnotes && x.mode === "footnote")
          appendixChunks.push((x.newline ? "<br />" : "") + x.text.trim());
        else htmlChunks.push(x.text.trim());
      }

      previousMode = x.mode;
    }

    //add appendixChunks to end of document
    if (moveFootnotes && appendixChunks.length) {
      const appendix =
        "<h1>Footnotes</h1> <small>" +
        appendixChunks.join(" ").replace(/[\r?\n]/gi, "<br />") +
        " </small>";
      htmlChunks.push(appendix);
    }

    var content = htmlChunks.reduce((all, range) => {
      if (!range || !range.endsWith) return all;
      //hyphenated words at end of line or column
      if (removeHyphens && range.endsWith("-")) return all + range.slice(0, -1);

      // Merge unwanted mid-sentence line breaks
      var separator =
        addSentenceLineBreaks &&
        !Number(range) &&
        range.length > 5 &&
        '.?!"”\n'.includes(range[range.length - 1]) //end of sentence
          ? "</p>\n<p>"
          : " ";

      return all + range + (separator ?? " ");
    }, "");

    //make sure h1 tags are not too long and are really large font Ps
    content = content
      .replace(/<h1>([^<>]*?)<\/h1>/g, (match, p1) => {
        if (p1.length > 100) {
          return `<p>${p1}</p>`;
        }
        return match;
      })
      .replace(/<h2>([^<>]*?)<\/h2>/g, (match, p1) => {
        if (p1.length > 100) {
          return `<p>${p1}</p>`;
        }
        return match;
      });

    if (addCitation) {
      // Get metadata
      // avoid using date as it is unreliable sand generally file mod date
      var metadata = await doc.getMetadata();
      var { Author: author, Title: title } = metadata.info;
      // date =
      //   date.slice(2, 6) + "-" + date.slice(6, 8) + "-" + date.slice(8, 10);
      // date = date ? new Date(date)?.toISOString().split("T")[0] : null;

      //look for date in first page
      // date = chrono
      //   .parseDate(content.slice(0, 400))
      //   ?.toISOString()
      //   .split("T")[0];
      // //  || date;

      title = content.slice(0, 400).match(/<h1>(.*?)<\/h1>/)?.[1] || title;

      return { author, title, html: content, format: "pdf" };
    }

    return { html: content };
  // } catch (e) {
  //   return { error: e.message };
  // }
}

const mean = function (array) {
  return array.length == 0 ? 0 : array.reduce((a, b) => a + b) / array.length;
};

/**
 * Calculate standard deviation of array
 * https://en.wikipedia.org/wiki/Standard_error
 * @param {array} array
 * @returns {int} number of standard deviation from average
 * @category Math
 */
const calculateStandardDeviation = function (array) {
  var mean2 = mean(array);
  return Math.sqrt(mean(array.map((x) => (x - mean2) ** 2)));
};

/**
 *
 * Softmax is a generalization of the logistic sigmoid function used in
 * logistic regression. It is commonly used in machine learning models
 * for multi-class classification problems where there are more than two
 * possible output classes. The softmax function takes a vector of arbitrary
 * real-valued scores and squashes it to a vector of values between 0 and 1
 * that sum to 1. This allows the output to be interpreted as a probability
 * distribution over the possible classes.
 * https://en.wikipedia.org/wiki/Softmax_function
 *
 * @param {Array} arr  array of numbers .
 * @returns {Array}  Softmax array.
 * @category Math
 */
export function calculateSoftmax(arr) {
  // Compute the maximum value in the array
  const maxVal = Math.max(...arr);

  // Compute the exponentials of the array values
  const exps = arr.map((x) => Math.exp(x - maxVal));

  // Compute the sum of the exponentials
  const sumExps = exps.reduce((acc, val) => acc + val, 0);

  // Compute the calculateSoftmax values
  const calculateSoftmaxArr = exps.map((x) => x / sumExps);

  return calculateSoftmaxArr;
}

/**
 * Detects if a given URL points to a PDF file by checking
 * the stream's first bytes for %PDF-  then ends  the request.
 * Useful for hidden pdf url that does not end with pdf
 * @param {string} url - The URL to check.
 * @returns {Promise<boolean>} True if the URL points to a PDF, false otherwise.
 * @category Extractor
 */
export async function isUrlPDF(url) {
  let response;
  try {
    // Fetch the URL with a stream response
    response = await fetch(url);

    //check if content type is pdf from headers
    if (response.headers.get("content-type")?.includes("pdf")) return true;

    if (!response.body || !response.body.getReader) 
        return false;
        
    const reader = response.body.getReader();
    const chunk = new Uint8Array(5);
    let bytesRead = 0;

    while (bytesRead < 5) {
      const { value, done } = await reader.read();

      if (done) break;

      const remainingBytes = 5 - bytesRead;
      const bytesToCopy = Math.min(remainingBytes, value.length);

      chunk.set(value.subarray(0, bytesToCopy), bytesRead);
      bytesRead += bytesToCopy;
    }

    // Check if we read 5 bytes and if they match the PDF signature
    return (
      bytesRead === 5 &&
      chunk[0] === 0x25 && // %
      chunk[1] === 0x50 && // P
      chunk[2] === 0x44 && // D
      chunk[3] === 0x46 && // F
      chunk[4] === 0x2d
    ); // -
  } catch (error) {
    console.error("Error checking URL:", error);
    return false;
  }
}
