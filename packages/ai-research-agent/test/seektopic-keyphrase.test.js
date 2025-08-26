import { test, expect } from "vitest";
import { extractSEEKTOPIC, extractContent } from "../index.js";

import fs from "fs";
//load models or pass them in
var phrasesModel = JSON.parse(
  fs.readFileSync("./src/wordlists/wiki-phrases-model-240k.json", "utf8")
);

// //check for typos
var typosModel = JSON.parse(
  fs.readFileSync("./src/wordlists/misspelled-typos-8k.json", "utf8")
); 

test("get top sentences specific to a query", async () => {
    let urls = [
      "https://www.youtube.com/watch?v=T_IdLTofTUU",
      "https://www.youtube.com/watch?v=OsW_kdOV6c8",
      "https://arxiv.org/pdf/1706.03762",
      "https://airesearch.js.org",

    ];

    for (var url of urls){

      let extraction = await extractContent(url);

      if(!extraction || !extraction.html ) continue;

      extraction = Object.assign(
        extraction,
        extractSEEKTOPIC(extraction.html, {
          phrasesModel,
          typosModel,
          heavyWeightQuery: "extract word pairings",
          limitTopSentences: 10,
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
