import { test, expect, it } from "vitest";
var { extract } = require("../src/extract-content/core.js");
var { extractContentHTML } = require("../src/extractor/html-to-content/readability2.js");

test("readability - should extract content from HTML", async () => {
  var url = "https://en.wikipedia.org/wiki/David_Hilbert";
  var html = await (await fetch(url)).text();

  // var content = extract(html, {url});
  var content = extractContentHTML(html);
  console.log(content.innerHTML);



  expect(content).toBeDefined();
});


test("trafilatura - should extract content from HTML", async () => {
 
  var url = "https://en.wikipedia.org/wiki/David_Hilbert";
  var html = await (await fetch(url)).text();

  var content = extract(html, { url });
  console.log(content);

  expect(content).toBeDefined();
});
