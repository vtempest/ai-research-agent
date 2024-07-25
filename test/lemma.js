import posTagger from "wink-pos-tagger";
import sbd from "sbd";
// import { test3 } from "./data/data-long-article.js";

var test3= "The United Nations Climate Change Conference concluded today with a landmark agreement to reduce global carbon emissions. Over 190 countries signed the pact, which aims to limit global temperature rise to 1.5 degrees Celsius above pre-industrial levels. The agreement includes provisions for developed nations to provide financial assistance to developing countries in their efforts to combat climate change."
var res = sbd.sentences(test3).map((sentence) =>
  posTagger()
    .tagSentence(sentence)
    // .filter((r) => r.pos.startsWith("NN") && r.value.length > 1)
    .map((r) => r.lemma || r.normal)
);

console.log(res);
