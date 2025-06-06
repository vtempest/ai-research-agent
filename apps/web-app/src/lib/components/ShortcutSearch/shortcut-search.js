import { openTabSearchWeb, extractGoogleResultsPage } from "./shortcut-search-web";
import { toggleReadingMode } from "$lib/components/ReadMode/read-mode-view";

/**
 * Select Text, Press Tab To Search Google,
 * Tab again for First Result
 * TODO: preserve the results in sidebar
 * @param {Event} e keydown event
 */
function onKeyDown(e) {
  // ` (backtick) = reading mode shortcut if no text selected,
  // search text if text selected
  if (e.keyCode == 192 && !e.altKey && !e.ctrlKey) {
    if (isInsideTextInput(e.target)) return;


    e.preventDefault();
    e.stopPropagation();
    var textSelected = window?.getSelection().toString();

    //if already on google results page, then load first result
    if (
      document.location.host.match(/google/gi) &&
      document.location.href.match(/search/gi) &&
      document.querySelectorAll("a[href]:has(h3)")?.length > 0
    ) {
      var results = extractGoogleResultsPage(document);

      if (results.length > 0) document.location = results[0].url;

      //if text selected, search it,
    } else if (textSelected?.length) {
      var shouldOpenInBackground = e.shiftKey;
      openTabSearchWeb(textSelected, shouldOpenInBackground);
    } else {
      // else toggle Applying Reading Mode

      toggleReadingMode();
      
      //TODO or bring up query box for search
    }

    var readingModeHTML = document.documentElement.outerHTML;
    localStorage.setItem("readingModeHTML", readingModeHTML);
  }
}

/** 
 * Detect if pressing shortcut in text input box
 * @param {HTMLElement} i element to test
 * @returns {boolean} true if inside text input
 */
function isInsideTextInput(i) {
  return (
    i instanceof HTMLImageElement ||
    i instanceof HTMLInputElement ||
    i instanceof HTMLTextAreaElement ||
    i.textbox ||
    (i.textContent && i.textContent == "") ||
    (i.ownerDocument &&
      i.ownerDocument.designMode &&
      i.ownerDocument.designMode.match(/on/i))
  );
}

window.addEventListener("keydown", onKeyDown, false);
