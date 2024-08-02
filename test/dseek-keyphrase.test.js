import { describe, it, expect } from "vitest";
import {
  weightKeyPhrasesSentences,
} from "../src/keyphrases/dseek-keyphrases.js";
import {test3} from "./data/data-long-article.js"

import fs from 'fs';
 //load models or pass them in
  var phrasesModel = JSON.parse(
    fs.readFileSync("./data/wiki-phrases-model-240k.json", "utf8")
  );

// //check for typos
  var typosModel = JSON.parse(
    fs.readFileSync("./data/misspelled-typos-8k.json", "utf8")
  );



describe("top sentences textrank", () => {
  it("get top sentences specific to a query", async () => {

    let summary_obj = weightKeyPhrasesSentences(test3, {
      phrasesModel,
      typosModel,
      heavyWeightQuery: "self attention",
      limitTopSentences : 10
    });



    fs.writeFileSync(
      __dirname + "/data/output-keyphrases.json",
      JSON.stringify(summary_obj, null, 2)
    );
    expect(typeof summary_obj).toBe("object");
  }, 20000);
});
