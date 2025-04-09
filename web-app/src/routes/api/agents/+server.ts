import {
  generateLanguageModelReply,
  getAgentPrompts
  // @ts-ignore
} from "$ai-research-agent";
import { json } from "@sveltejs/kit";
// @ts-ignore
import { GROQ_API_KEY } from "$env/static/private";

export async function POST({ request }) {
  const data = await request.json().catch(() => {
    return { error: "Invalid JSON input" };
  });
  var {
    prompt,
    agent,
    context,
    html,
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


    var agentPrompt : AgentPrompt = getAgentPrompts(agent, context);
  }
  var finalPrompt = prompt + " \n\n" + agentPrompt?.prompt ;

  var {
    content,
    error,
  }: {
    content: string;
    error: string;
  } = await generateLanguageModelReply(finalPrompt, {
    provider,
    apiKey,
    html,
    model,
    temperature
  });

  if (error) {
    return json({ error }, { status: 500 });
  }

  return json({ content });
}
