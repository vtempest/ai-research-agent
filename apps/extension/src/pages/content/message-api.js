import {extractContentAndCite} from '/mnt/data/Projects/ai-research-agent/packages/ai-research-agent/src/extractor/html-to-content/html-to-content.js'

// Content.js listener to page event, forward to the background, forwards response to page
document.addEventListener("onInvokeChromeAPI", (event) => {

  console.log(JSON.stringify(event.detail));

  chrome.runtime
    .sendMessage(event.detail)
    .then((detail) => {
     
     
      console.log(JSON.stringify(detail)) 

      // var json = extractContentAndCite(detail.html, {url: event.detail.url})

      // console.log(JSON.stringify(json)) 
      
      document.dispatchEvent(new CustomEvent("onExtractionResult", { detail }))
      
    })
});
