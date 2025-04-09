import { json } from "@sveltejs/kit";

/**
 * Return the topic model from GitHub storage as JSON 
 * cached for 100 hours
 * @param {Object} param0 
 * @returns 
 */
export async function GET({ url }) {
  // import topicModel from  ai-research-agent/data/wiki-phrases-model-240k.json'
  var topicModel = await fetch(
    "https://raw.githubusercontent.com/vtempest/" +
      "ai-research-agent/master/data/wiki-phrases-model-240k.json"
  ).then(r => r.json());

  return json(topicModel, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=36000000",
    },
  });
}
