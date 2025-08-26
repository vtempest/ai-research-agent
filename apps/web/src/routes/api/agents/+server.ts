import {
  generateLanguageResponse,
  // @ts-ignore
} from "ai-research-agent";
import { json } from "@sveltejs/kit";
import { initializeUser } from '$lib/server';

export async function POST(event) {
  let { request, platform, locals } = event;
  let params = await request.json().catch(() => {
    return json({ error: "Invalid JSON input" }, { status: 500 });
  });

  params.ip = event.getClientAddress();


  let user = await initializeUser(locals, request);
  // get user's own api key
  if (user) {
    params.apiKey = user.settings?.providerApiKeys?.find(
      (key) => key.provider == params.provider
    )?.key;
  }

  
  params.LANGCHAIN_API_KEY =  platform?.env?.LANGCHAIN_API_KEY;

  //provide default api keys
  if (!params.apiKey)
    params.apiKey =
      params.provider == "groq" ? platform?.env?.GROQ_API_KEY : false;

  if (!params.apiKey)
    return json({ error: "API key is required" }, { status: 500 });

  return generateLanguageResponse(params).then(json);
}
