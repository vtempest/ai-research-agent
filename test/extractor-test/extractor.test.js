import assert from "assert";
import {extractContentHTML} from "../../src/html-to-content/extract-content2";

var extractURLs = [
  // "https://www.computerworld.com/article/3496192/court-handcuffs-employees-with-non-compete-agreements-again.html",
  "https://en.wikipedia.org/wiki/David_Hilbert",
  // "https://blog.jgc.org/2024/09/steve-ballmers-binary-search-interview.html",
  // "https://www.cnn.com/2024/07/26/politics/video/kamala-harris-barack-michelle-obama-endorsement-president-ctm-ldn-digvid",
  // "https://www.technologyreview.com/2024/07/30/1095489/openai-has-released-a-new-chatgpt-bot-that-you-can-talk-to/",
];

describe("GenericContentExtractor", () => {
    it("extracts html and returns the article", async () => {
      for (var url of extractURLs) {
        var html = await (await fetch(url)).text();

        const result = extractContentHTML(
          html,
        );

        console.log(result.slice(0,1000));

        assert(typeof result, "string");
      }
    }, 10000);
  });