

import {test2} from "./data/data-long-article.js"
import WikiEntityRecognition from "../src/extract-entitities/wiki-entity-recognition";

function wer() {
  var entities = WikiEntityRecognition(test2);
  console.log(entities);
}

wer();
