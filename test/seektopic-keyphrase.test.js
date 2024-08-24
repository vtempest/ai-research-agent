import { test, expect } from "vitest";
import { extractSEEKTOPIC, extract } from "../index.js";

import fs from "fs";
//load models or pass them in
var phrasesModel = JSON.parse(
  fs.readFileSync("./data/wiki-phrases-model-240k.json", "utf8")
);

// //check for typos
var typosModel = JSON.parse(
  fs.readFileSync("./data/misspelled-typos-8k.json", "utf8")
);

test("get top sentences specific to a query", async () => {
    let urls = [
      "https://www.youtube.com/watch?v=T_IdLTofTUU",
      "https://www.technologyreview.com/2024/07/30/1095489/openai-has-released-a-new-chatgpt-bot-that-you-can-talk-to/",
      "https://www.youtube.com/watch?v=OsW_kdOV6c8",
      "https://arxiv.org/pdf/1706.03762",
      "https://vtempest.github.io/ai-research-agent/docs",
    ];

    for (var url of urls){

      let extraction = await extract(url);

      if(!extraction || !extraction.html ) continue;

      extraction = Object.assign(
        extraction,
        extractSEEKTOPIC(extraction.html, {
          phrasesModel,
          typosModel,
          heavyWeightQuery: "extract word pairings",
          limitTopSentences: 10,
          removeHTML: true,
        })
      );

      delete extraction.html;

      var filename = url.replace(/[^a-zA-Z0-9]/g, "_").slice(-20);
      fs.writeFileSync(
        __dirname + "/data/"+filename+".json",
        JSON.stringify(extraction, null, 2)
      );

      console.log(extraction.topSentences);

    }

    expect(filename).toBeDefined();
  }, 20000);
