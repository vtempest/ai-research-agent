import { extractMainContent } from '../../src/extractor/html-to-content/extractor1-content.js/index.js';


async function fetchAndExtractContent(url) {
  try {
    const response = await fetch(url);
    const htmlString = await response.text();
    console.log("HTML fetched, length:", htmlString.length);

    var articleContent = extractMainContent(htmlString, { url });

    //remove html tags, including in attributes
    const RE_HTML_TAGS = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

    articleContent = articleContent.replace(RE_HTML_TAGS, '');
    console.log(articleContent);
  } catch (error) {
    console.error('Error fetching or extracting content:', error);
  }
}

// Example usage

var urls =  [
  // "https://docs.plasmo.com",
  "https://www.nytimes.com/2024/08/28/business/telegram-ceo-pavel-durov-charged.html",
  // "https://www.nytimes.com/interactive/2024/08/28/opinion/columnists/28collins-your-summer-politics-quiz-is-here.html",
// 'https://www.cnn.com/2024/08/28/politics/trump-indictment-jack-smith-election-analysis/index.html',

]

for (let url of urls) {
 await  fetchAndExtractContent(url);
}