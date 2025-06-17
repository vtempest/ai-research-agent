import { json } from "@sveltejs/kit";
import topicModelJSON from  "../../../../../../packages/ai-research-agent/src/wordlists/wiki-phrases-model-240k.json" with { type: "json" }


/**
 * Return the topic model from GitHub storage as JSON 
 * cached for 100 hours
 * @param {Object} request 
 * @returns {Object} topicModelFinal
 */
export async function GET(request) {
  let topicModel = topicModelJSON ? topicModelJSON : await fetch(
    "https://raw.githubusercontent.com/vtempest/" +
      "ai-research-agent/master/src/wordlists/wiki-phrases-model-240k.json"
  ).then(r => r.json());

  return json({topicModel}, {
    headers: {
      "Cache-Control": "public, max-age=36000000",
    },
  });
}
