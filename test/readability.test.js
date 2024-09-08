import { test, expect, it } from "vitest";
// var { extract } = require("../src/trafilatura/core.js");
import { extractContentAndCite } from "../src/extractor/html-to-content/html-to-content.js";

var extractURLs = [
  // "https://www.computerworld.com/article/3496192/court-handcuffs-employees-with-non-compete-agreements-again.html",
  // "https://en.wikipedia.org/wiki/David_Hilbert",
  // "https://blog.jgc.org/2024/09/steve-ballmers-binary-search-interview.html"
  // "https://www.cnn.com/2024/07/26/politics/video/kamala-harris-barack-michelle-obama-endorsement-president-ctm-ldn-digvid",
  "https://www.technologyreview.com/2024/07/30/1095489/openai-has-released-a-new-chatgpt-bot-that-you-can-talk-to/",

]
test("readability - should extract content from HTML", async () => {
  for (var url of extractURLs){

  var html = await (await fetch(url)).text();

  // var content = extract(html, {url});
  var content = extractContentAndCite(html); 
  console.log(content);

  }



  expect(content).toBeDefined();
});


// test("trafilatura - should extract content from HTML", async () => {
//   return 1
//   var url = "https://en.wikipedia.org/wiki/David_Hilbert";
//   var html = await (await fetch(url)).text();

//   var content = extract(html, { url });
//   console.log(content.slice(0, 100));

//   expect(content).toBeDefined();
// });
