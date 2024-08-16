import { PUBLIC_GROQ_API_KEY } from '$env/static/public';

//the devil is in the defauls
export const defaultSearchEngine = "Perplexity";
export const defaultPrompt = "Summarize";
export const apiKey = PUBLIC_GROQ_API_KEY;
export const searchEngines = {
  Perplexity: "https://www.perplexity.ai/?q=",
  Google: "https://www.google.com/search?q=",
  "Go To First": "https://duckduckgo.com/?q=%5C",
  DuckDuckGo: "https://duckduckgo.com/?q=",
  Youtube: "https://www.youtube.com/results?search_query=",
};

export const LOGIN_URL = "/auth/oauth/google";

//llama-3.1-405b-reasoning
export const enumLLMs =
  "gemma2-9b-it llama-3.1-70b-versatile llama-3.1-8b-instant".split(" ");

export const NEXT_PUBLIC_WS_URL = "/api/websocket";
export const NEXT_PUBLIC_API_URL = "/api";

export const APP_NAME = "QwkSearch";
export const APP_EMAIL = "support@qwksearch.com";

// export  const NEXT_PUBLIC_WS_URL = 'ws://localhost:3001'
// export  const NEXT_PUBLIC_API_URL = 'http://localhost:3001/api'

export const TYPESENSE_HOST = "54.177.193.125";

export const TYPESENSE_API_KEY =
  "rV3bherhNPrpVzZKalft8OhGqmbHIbMq2xBwxLExwG7BRR2s";
