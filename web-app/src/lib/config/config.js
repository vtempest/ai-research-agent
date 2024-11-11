import { PUBLIC_GROQ_API_KEY } from '$env/static/public';

//the devil is in the defauls
export const defaultSearchEngine = "QwkSearch";
export const defaultPrompt = "Summarize in bullet points and bold topics";
export const searxngDomain = "https://search.qwksearch.com/";

export const apiKey = PUBLIC_GROQ_API_KEY;


export const searchEngines = {
  QwkSearch: "https://qwksearch.com/?q=",
  Perplexity: "https://www.perplexity.ai/?q=",
  Google: "https://www.google.com/search?q=",
  "Go To First": "https://duckduckgo.com/?q=%5C",
  DuckDuckGo: "https://duckduckgo.com/?q=",
  Youtube: "https://www.youtube.com/results?search_query=",
};
export const LOGIN_URL = "/auth/oauth/google";
export const LINK_BLOG = "https://www.linkedin.com/company/qwksearch/posts/";
export const LINK_SUPPORT = "https://discord.gg/SJdBqBz3tV";

//llama-3.1-405b-reasoning

export const enumLLMs = [
  "llama-3.2-90b-vision-preview",
  "llama-3.2-11b-vision-preview",
  "llama-3.1-70b-versatile",
  "llama-3.1-8b-instant",
  // "gemma2-9b-it",
]

export const proxy = 'https://proxy.qwksearch.com?url=';
export const APP_NAME = "QwkSearch";
export const APP_EMAIL = "support@qwksearch.com";