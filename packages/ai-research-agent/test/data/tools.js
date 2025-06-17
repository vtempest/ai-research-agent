/**Generated API Tools from QwkSearch API v1.0.0
Search, extract, vectorize and outline a topic base with 
AI Research Agent.
 */

import { z } from 'zod';
import { tool } from "@langchain/core/tools";


export const extractContent = tool(
async (params) => {
    const baseUrl = "https://qwksearch.com/api/";
    let url = "/extract";
    
    
    
    const queryParams = new URLSearchParams();
    if (params.url !== undefined) queryParams.set('url', params.url);
    if (params.images !== undefined) queryParams.set('images', params.images);
    if (params.links !== undefined) queryParams.set('links', params.links);
    if (params.formatting !== undefined) queryParams.set('formatting', params.formatting);
    if (params.absoluteURLs !== undefined) queryParams.set('absoluteURLs', params.absoluteURLs);
    if (params.timeout !== undefined) queryParams.set('timeout', params.timeout);
    const headers = {
      'Content-Type': 'application/json',
      
    };
    
    
    const fullUrl = baseUrl + url + (queryParams.toString() ? '?' + queryParams.toString() : '');
    
    try {
      const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });
      
      if (!response.ok) 
        throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
      
      const contentType = response.headers.get('content-type');
      return contentType?.includes('application/json') 
        ? await response.json() 
        : await response.text();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  },
{
  name: "extractContent",
  description: "## Extract structured content and cite from any URL",
  schema: z.object({
    url: z.string().url(),
    images: z.boolean().default(true),
    links: z.boolean().default(true),
    formatting: z.boolean().default(true),
    absoluteURLs: z.boolean().default(true),
    timeout: z.number().int().min(1).max(30).default(5)
  })
});
export const writeLanguage = tool(
async (params) => {
    const baseUrl = "https://qwksearch.com/api/";
    let url = "/agents";
    
    
    
    const queryParams = new URLSearchParams();
    
    const headers = {
      'Content-Type': 'application/json',
      
    };
    const bodyData = {};
    if (params.prompt !== undefined) bodyData.prompt = params.prompt;
    if (params.agent !== undefined) bodyData.agent = params.agent;
    if (params.context !== undefined) bodyData.context = params.context;
    if (params.provider !== undefined) bodyData.provider = params.provider;
    if (params.key !== undefined) bodyData.key = params.key;
    if (params.model !== undefined) bodyData.model = params.model;
    if (params.html !== undefined) bodyData.html = params.html;
    if (params.temperature !== undefined) bodyData.temperature = params.temperature;
    if (Object.keys(bodyData).length > 0) {
      opts.body = JSON.stringify(bodyData);
    }
    
    const fullUrl = baseUrl + url + (queryParams.toString() ? '?' + queryParams.toString() : '');
    
    try {
      const response = await fetch(fullUrl, {
      method: 'POST',
      headers,
    });
      
      if (!response.ok) 
        throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
      
      const contentType = response.headers.get('content-type');
      return contentType?.includes('application/json') 
        ? await response.json() 
        : await response.text();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  },
{
  name: "writeLanguage",
  description: "## Generate language model reply using agent prompts",
  schema: z.object({
    prompt: z.string().optional(),
    agent: z.enum(["question", "summarize-bullets", "summarize", "suggest-followups", "answer-cite-sources", "query-resolution", "knowledge-graph-nodes", "summary-longtext"]).optional(),
    context: z.string().optional(),
    provider: z.enum(["groq", "openai", "anthropic", "together", "xai", "google", "perplexity"]).default("groq"),
    key: z.string(),
    model: z.enum(["sonar-pro", "sonar", "sonar-reasoning-pro", "sonar-reasoning", "sonar-deep-research", "llama-3.1-sonar-small-128k-online", "llama-3.1-sonar-large-128k-online", "llama-3.1-sonar-huge-128k-online", "deepseek-r1-distill-llama-70b", "meta-llama/llama-4-maverick-17b-128e-instruct", "meta-llama/llama-4-scout-17b-16e-instruct", "llama-3.3-70b-versatile", "llama-3.3-70b-specdec", "llama-3.2-3b-preview", "llama-3.2-11b-vision-preview", "llama-3.2-90b-vision-preview", "llama-3.1-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768", "gemma2-9b-it", "gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-4", "gpt-3.5-turbo", "claude-3-7-sonnet-20250219", "claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307", "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo", "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo", "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo", "meta-llama/Meta-Llama-3-8B-Instruct-Turbo", "meta-llama/Meta-Llama-3-70B-Instruct-Turbo", "meta-llama/Llama-3.2-3B-Instruct-Turbo", "meta-llama/Meta-Llama-3-8B-Instruct-Lite", "meta-llama/Meta-Llama-3-70B-Instruct-Lite", "meta-llama/Llama-3-8b-chat-hf", "meta-llama/Llama-3-70b-chat-hf", "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF", "Qwen/Qwen2.5-Coder-32B-Instruct", "microsoft/WizardLM-2-8x22B", "google/gemma-2-27b-it", "google/gemma-2-9b-it", "databricks/dbrx-instruct", "deepseek-ai/deepseek-llm-67b-chat", "google/gemma-2b-it", "Gryphe/MythoMax-L2-13b", "meta-llama/Llama-2-13b-chat-hf", "mistralai/Mistral-7B-Instruct-v0.1", "mistralai/Mistral-7B-Instruct-v0.2", "mistralai/Mistral-7B-Instruct-v0.3", "mistralai/Mixtral-8x7B-Instruct-v0.1", "mistralai/Mixtral-8x22B-Instruct-v0.1", "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO", "Qwen/Qwen2.5-7B-Instruct-Turbo", "Qwen/Qwen2.5-72B-Instruct-Turbo", "Qwen/Qwen2-72B-Instruct", "togethercomputer/StripedHyena-Nous-7B", "upstage/SOLAR-10.7B-Instruct-v1.0", "meta-llama/Llama-Vision-Free", "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo", "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo", "grok-beta", "grok-vision-beta", "gemini-2.5-pro-preview-05-06", "gemini-2.5-flash-preview-04-17", "gemini-2.0-flash-001", "gemini-2.0-flash-lite-001", "gemini-2.0-flash-live-preview-04-09", "imagen-3.0-generate-002", "imagen-3.0-fast-generate-001", "meta-llama/Llama-3.3-70B", "gemma-3", "gemma-2", "gemma"]).default("meta-llama/llama-4-maverick-17b-128e-instruct"),
    html: z.string().default(true),
    temperature: z.number().default(1)
  })
});
export const searchWeb = tool(
async (params) => {
    const baseUrl = "https://qwksearch.com/api/";
    let url = "/search";
    
    
    
    const queryParams = new URLSearchParams();
    if (params.q !== undefined) queryParams.set('q', params.q);
    if (params.cat !== undefined) queryParams.set('cat', params.cat);
    if (params.recency !== undefined) queryParams.set('recency', params.recency);
    if (params.public !== undefined) queryParams.set('public', params.public);
    if (params.page !== undefined) queryParams.set('page', params.page);
    if (params.lang !== undefined) queryParams.set('lang', params.lang);
    const headers = {
      'Content-Type': 'application/json',
      
    };
    
    
    const fullUrl = baseUrl + url + (queryParams.toString() ? '?' + queryParams.toString() : '');
    
    try {
      const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });
      
      if (!response.ok) 
        throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
      
      const contentType = response.headers.get('content-type');
      return contentType?.includes('application/json') 
        ? await response.json() 
        : await response.text();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  },
{
  name: "searchWeb",
  description: "## Search the web",
  schema: z.object({
    q: z.string(),
    cat: z.enum(["general", "news", "videos", "images", "science", "files", "it"]).default("general"),
    recency: z.enum(["none", "day", "week", "month", "year"]).default("none"),
    public: z.boolean().default(false),
    page: z.number().int().default(1),
    lang: z.string().default("en-US")
  })
});

export const tools = [extractContent, writeLanguage, searchWeb];

export const toolsMap = {
  "extractContent": extractContent,
  "writeLanguage": writeLanguage,
  "searchWeb": searchWeb
};
