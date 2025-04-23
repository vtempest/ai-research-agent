import { json } from "@sveltejs/kit";
import topicModel from  "../../../../../src/wordlists/wiki-phrases-model-240k.json?raw"


/**
 * Return the topic model from GitHub storage as JSON 
 * cached for 100 hours
 * @param {Object} param0 
 * @returns 
 */
export async function GET({ url }) {
  let topicModelFinal = topicModel ? topicModel : await fetch(
    "https://raw.githubusercontent.com/vtempest/" +
      "ai-research-agent/master/src/wordlists/wiki-phrases-model-240k.json"
  ).then(r => r.json());

  return json(topicModel, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=36000000",
    },
  });
}
