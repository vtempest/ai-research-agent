import { z } from "zod";
import { grab } from "grab-url";

export const AGENT_TOOLS = [
  {
    name: "web_search",
    description:
      "Search the web for information on any topic using QwkSearch API. Input: search query string and optional category. Returns relevant search results with titles, descriptions, and URLs from 100+ sources via SearXNG metasearch engine.",
    schema: z.object({ 
      query: z.string(),
      category: z.enum(["general", "news", "videos", "images", "science", "files", "it"]).optional().default("general"),
      recency: z.enum(["none", "day", "week", "month", "year"]).optional().default("none"),
      page: z.number().optional().default(1),
      language: z.string().optional().default("en-US")
    }),
    func: async ({ query, category = "general", recency = "none", page = 1, language = "en-US" }) => {
      try {
        const searchUrl = new URL("https://qwksearch.com/api/search");
        searchUrl.searchParams.append("q", query);
        searchUrl.searchParams.append("cat", category);
        searchUrl.searchParams.append("recency", recency);
        searchUrl.searchParams.append("page", page.toString());
        searchUrl.searchParams.append("lang", language);

        const response = await fetch(searchUrl.toString(), {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
          return `No search results found for "${query}". Please try a different search term.`;
        }

        let resultText = `Web search results for "${query}" (${category} category):\n\n`;
        
        data.results.forEach((result, index) => {
          resultText += `${index + 1}. ${result.title}\n`;
          resultText += `   URL: ${result.url}\n`;
          resultText += `   Domain: ${result.domain}\n`;
          if (result.snippet) {
            resultText += `   Description: ${result.snippet}\n`;
          }
          if (result.engines && result.engines.length > 0) {
            resultText += `   Sources: ${result.engines.join(", ")}\n`;
          }
          resultText += `\n`;
        });

        resultText += `Found ${data.results.length} results from multiple search engines. This is the complete search information.`;
        
        return resultText;
      } catch (error) {
        return `Unable to perform web search for "${query}". Error: ${error.message}`;
      }
    },
  },
  {
    name: "extract_page",
    description:
      "Extract and summarize content from a web page using QwkSearch API. Supports articles, PDFs, and YouTube videos. Uses Mozilla Readability and Postlight Mercury algorithms with 100+ custom adapters for major sites. Input: URL of the page to extract. Returns structured content with citation information.",
    schema: z.object({ 
      url: z.string().url(),
      images: z.boolean().optional().default(true),
      links: z.boolean().optional().default(true),
      formatting: z.boolean().optional().default(true),
      absoluteURLs: z.boolean().optional().default(true),
      timeout: z.number().min(1).max(30).optional().default(5)
    }),
    func: async ({ url, images = true, links = true, formatting = true, absoluteURLs = true, timeout = 5 }) => {
      try {
        const extractUrl = new URL("https://api.qwksearch.com/extract");
        extractUrl.searchParams.append("url", url);
        extractUrl.searchParams.append("images", images.toString());
        extractUrl.searchParams.append("links", links.toString());
        extractUrl.searchParams.append("formatting", formatting.toString());
        extractUrl.searchParams.append("absoluteURLs", absoluteURLs.toString());
        extractUrl.searchParams.append("timeout", timeout.toString());

        const response = await fetch(extractUrl.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        let resultText = `Content extracted from: ${data.url}\n\n`;
        resultText += `Title: ${data.title}\n\n`;
        
        if (data.author) {
          resultText += `Author: ${data.author}\n`;
          if (data.author_cite) {
            resultText += `Author (Citation Format): ${data.author_cite}\n`;
          }
          if (data.author_type) {
            resultText += `Author Type: ${data.author_type}\n`;
          }
        }
        
        if (data.date) {
          resultText += `Publication Date: ${data.date}\n`;
        }
        
        if (data.source) {
          resultText += `Source: ${data.source}\n`;
        }
        
        if (data.word_count) {
          resultText += `Word Count: ${data.word_count}\n`;
        }
        
        if (data.cite) {
          resultText += `\nCitation (APA Format): ${data.cite}\n`;
        }
        
        resultText += `\nContent:\n${data.html}\n\n`;
        
        resultText += `This is the complete page extraction information.`;
        
        return resultText;
      } catch (error) {
        return `Unable to extract content from "${url}". Error: ${error.message}`;
      }
    },
  },
  {
    name: "generate_ai_response",
    description:
      "Generate AI language model responses using QwkSearch API with various agent templates. Supports multiple providers (Groq, OpenAI, Anthropic, etc.) and agent types for different tasks like summarization, question answering, and content generation.",
    schema: z.object({
      provider: z.enum(["groq", "openai", "anthropic", "together", "xai", "google", "perplexity", "ollama", "cloudflare"]),
      key: z.string(),
      agent: z.enum([
        "question", 
        "summarize-bullets", 
        "summarize", 
        "suggest-followups", 
        "answer-cite-sources", 
        "query-resolution", 
        "knowledge-graph-nodes", 
        "summary-longtext"
      ]).optional().default("question"),
      model: z.string().optional(),
      temperature: z.number().min(0).max(2).optional().default(1),
      html: z.boolean().optional().default(true),
      query: z.string().optional(),
      chat_history: z.string().optional(),
      article: z.string().optional()
    }),
    func: async ({ provider, key, agent = "question", model, temperature = 1, html = true, query, chat_history, article }) => {
      try {
        const requestBody = {
          provider,
          key,
          agent,
          temperature,
          html
        };
        
        if (model) {
          requestBody.model = model;
        }
        
        if (query) {
          requestBody.query = query;
        }
        
        if (chat_history) {
          requestBody.chat_history = chat_history;
        }
        
        if (article) {
          requestBody.article = article;
        }

        const response = await fetch("https://api.qwksearch.com/agents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        let resultText = `AI Response (${agent} agent, ${provider} provider):\n\n`;
        resultText += data.content;
        
        if (data.extract) {
          resultText += `\n\nStructured Extract:\n${JSON.stringify(data.extract, null, 2)}`;
        }
        
        resultText += `\n\nThis is the complete AI-generated response.`;
        
        return resultText;
      } catch (error) {
        return `Unable to generate AI response. Error: ${error.message}`;
      }
    },
  },
];