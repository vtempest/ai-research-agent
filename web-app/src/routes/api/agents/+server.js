import {
  generateLanguageModelReply,
  getAgentPrompts
} from "$ai-research-agent";
import { json } from "@sveltejs/kit";

import { GROQ_API_KEY } from "$env/static/private";

export async function POST({ request }) {
  const data = await request.json().catch(() => {
    return { error: "Invalid JSON input" };
  });
  var {
    prompt,
    agent,
    context,
    html = true,
    provider = "groq",
    key: userApiKey,
    model,
    temperature,
  } = data;
  //set default api keys
  var apiKey = userApiKey;
    apiKey = userApiKey || provider == "groq" ? GROQ_API_KEY : false
  if (!apiKey) 
    return json({ error: "API key is required" }, { status: 500 });

  if(agent){
    // if (context?.startsWith("{") && context?.endsWith("}"))
    //   context = JSON.parse(context);

    console.log("context", agent);

    var agentPrompts = getAgentPrompts(agent, context);
    console.log("agentPrompts", agentPrompts);
  }
  var finalPrompt = agentPrompts?.prompt || prompt;

  var aiResponseObject = await generateLanguageModelReply(finalPrompt, {
    provider,
    apiKey,
    html,
    model,
    temperature
  });
  var aiResponse = aiResponseObject?.content || "";

  if (aiResponseObject?.error) {
    return json(aiResponseObject, { status: 500 });
  }

  return json(aiResponseObject );
}
