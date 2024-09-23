import { PUBLIC_GROQ_API_KEY, PUBLIC_PROXY } from '$env/static/public';

//the devil is in the defauls
export const defaultSearchEngine = "Perplexity";
export const defaultPrompt = "Summarize";
export const apiKey = PUBLIC_GROQ_API_KEY;
export const searchEngines = {
  QwkSearch: "https://www.qwksearch.com/?q=",
  Perplexity: "https://www.perplexity.ai/?q=",
  Google: "https://www.google.com/search?q=",
  "Go To First": "https://duckduckgo.com/?q=%5C",
  DuckDuckGo: "https://duckduckgo.com/?q=",
  Youtube: "https://www.youtube.com/results?search_query=",
};

export const LOGIN_URL = "/auth/oauth/google";
export const LINK_BLOG = "https://www.linkedin.com/company/qwksearch/posts/";

//llama-3.1-405b-reasoning
export const enumLLMs = [
  // "gemma2-9b-it",
  "llama-3.1-70b-versatile",
  "llama-3.1-8b-instant"
]

export const NEXT_PUBLIC_WS_URL = "/api/websocket";
export const NEXT_PUBLIC_API_URL = "/api";
export const PROXY = PUBLIC_PROXY;
export const APP_NAME = "QwkSearch";
export const APP_EMAIL = "support@qwksearch.com";
export const searxngDomain = "http://ec2-184-169-153-151.us-west-1.compute.amazonaws.com/searxng"

export const TYPESENSE_HOST = "54.177.193.125";
export const TYPESENSE_API_KEY = "rV3bherhNPrpVzZKalft8OhGqmbHIbMq2xBwxLExwG7BRR2s";
