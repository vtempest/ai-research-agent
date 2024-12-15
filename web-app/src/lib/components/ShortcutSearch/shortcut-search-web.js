
import { searchEngines } from "$ai-research-agent";
/**
 * Searches Google in background tab and opens first result if on that page
 * @param {string} query text to search
 * @param {boolean} shouldOpenInBackground 
 */
export function openTabSearchWeb(query, shouldOpenInBackground = false) {

  // defaultSearchEngine = "Google";
  var baseQueryURL = searchEngines[0].url;

  if (!query) return;

   else { //otherwise, open google search results page

    query = encodeURIComponent(query);

    if (chrome)
    chrome.runtime.sendMessage({
      type: "openTab",
      bg: shouldOpenInBackground,
      url: baseQueryURL + query,
    });
    else 
      openNewTab(baseQueryURL + query, true);

  }

  function openNewTab(url, shouldOpenInBackground = false) {
    const newTab = window.open(url, '_blank');
    if (newTab && !shouldOpenInBackground) {
      newTab.focus();
    }
  }

  
}



/** 
 * Extract resuls JSON object from Google results html page
 * The results html page keeps changing so this minimizes 
 * use of classes and extracts [{title, url, snippet},...]
 * 
 * TODO insert these results into the Sidebar as you read to flip to next result
 * 
 * @param {Document} document - Google results HTML document object
 * @returns {Array<{title: string, url: string, snippet: string}>}
 *  - array of objects with title, url, snippet
 */
export function extractGoogleResultsPage(document) {
  // get results which are <a href> elements with <h3> children
  return Array.from(document.querySelectorAll("a[href]:has(h3)"))?.map(
    (e) => {
      var title = e.querySelector("h3")
        //remove missing <?> chars common in snippets
        .textContent.replace(/[\u{0080}-\u{10FFFF}]/gu, "");

      //get the closest parent element with a specific class (adjust as needed)
      var parent = e.closest('.g');

      //find snippet in element containing span+span, get its text node
      var snippetDiv = parent?.querySelector("span>em")?.parentNode;
      if (snippetDiv)
        var snippet = snippetDiv?.textContent //isolate text node
          ?.replace(/\.\.\./g, "") //remove ...
          ?.replace(/[\u{0080}-\u{10FFFF}]/gu, "")
          .trim(); //remove missing <?> chars common in snippets

      //get url from href, remove google tracking
      var url = e.getAttribute("href");
      if (url && url.indexOf("/url?q") > -1)
        url = new URLSearchParams(url.slice(5)).get("q");

      return {
        title,
        url,
        snippet,
      };
    }
  );
}
