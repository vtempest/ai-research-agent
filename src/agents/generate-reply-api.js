import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatGroq } from "@langchain/groq";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { ChatXAI } from "@langchain/xai";
import { ChatVertexAI } from "@langchain/google-vertexai-web"

import { HumanMessage } from "@langchain/core/messages";
import { convertMarkdownToHTML } from "../../index.js";

/**
 * Generates a reply using specified AI provider and model:
 * - [Groq Docs](https://console.groq.com/docs/overview) [Groq Keys](https://console.groq.com/keys):
 *   Llama 3.2 3B, Llama 3.2 11B Vision, Llama 3.2 90B Vision, Llama 3.1 70B, Llama 3.1 8B, Mixtral 8x7B, Gemma2 9B
 * - [OpenAI Docs](https://platform.openai.com/docs/overview) [OpenAI Keys](https://platform.openai.com/api-keys):
 *   GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4 Omni, GPT-4 Omni Mini
 * - [Anthropic Docs](https://docs.anthropic.com/en/docs/welcome) [Anthropic Keys](https://console.anthropic.com/settings/keys):
 *   Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
 * - [TogetherAI Docs](https://docs.together.ai/docs/quickstart) [TogetherAI Keys](https://api.together.xyz/settings/api-keys):
 *  Llama, Mistral, Mixtral, Qwen, Gemma, WizardLM, DBRX, DeepSeek, Hermes, SOLAR, StripedHyena.
 * - [XAI Docs](https://docs.x.ai/docs#models) [XAI Keys](https://console.x.ai/): Grok, Grok Vision
 *  
 * [Google Vertex Docs](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models) 
 * [Google Vertex Keys](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#api-keys): Gemini
 * 
 * 
 *  This function utilizes [transformer-based language 
 *  models](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE)
 *  1. Input Embedding: Converts input text into numerical vectors.
 *  2. Positional Encoding: Adds position information to maintain word order.
 *  3. Multi-Head Attention: Processes relationships between words in parallel.
 *  4. Feed-Forward Networks: Further processes the attention output.
 *  5. Layer Normalization & Residual Connections: Stabilizes learning and 
 *  prevents vanishing gradients.
 *  6. Output Layer: Generates probabilities for next tokens.
 * 
 * @param {string|Array} query - User's input query text string or LangChain messages array
 * @param {object} options - Options
 * @param {string} options.provider - LLM provider: groq, openai, anthropic, together, xai, google
 * @param {string} options.apiKey - API key for the specified provider
 * @param {boolean} [options.html=true] - If true, reply format is HTML. If false, Markdown
 * @param {string} [options.model] - Optional model name. If not provided, uses default
 * @param {number} [options.temperature=0.7] -
 * Temperature is a way to control the overall confidence of the model's scores
 *  (the logits). What this means is that, if you use a lower value than 1.0, the relative
 *  distance between the tokens will become larger (more deterministic), and if you use a larger
 *  value than 1.0, the relative distance between the tokens becomes smaller (less deterministic).
 * 1.0 Temperature is the original distribution that the model was trained to optimize for,
 * since the scores remain the same.
 * @category Generate
 * @author [AI Research Contributors](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE)
 * @returns {Promise<{content: string, error: string}>} Generated response
 * @example
 * const response = await generateLanguageModelReply(
 *   "Explain neural networks", {provider: "groq", apiKey: "your-api-key"})
 */
export async function generateLanguageModelReply(query, options = {}) {
  let {
    model = null,
    provider,
    apiKey,
    temperature = 0.7,
    html = true,
    applyContextLimit = true,
  } = options;

  const response = { content: "" };

  if (!apiKey || !provider)
    return { error: "API key and provider are required" };

  try {
    const selectedModel = model || CHAT_MODELS.defaults[provider.toLowerCase()];
    let chat;
    if (provider.toLowerCase() === "groq") {
      chat = new ChatGroq({
        apiKey,
        model: selectedModel,
        temperature,
      });
    } else if (provider.toLowerCase() === "togetherai") {
      chat = new ChatTogetherAI({
        apiKey,
        model: selectedModel,
        temperature,
      });
    } else if (provider.toLowerCase() === "openai") {
      chat = new ChatOpenAI({
        openAIApiKey: apiKey,
        model: selectedModel,
        temperature,
      });
    } else if (provider.toLowerCase() === "anthropic") {
      chat = new ChatAnthropic({
        anthropicApiKey: apiKey,
        model: selectedModel,
        temperature,
      });
    } else if (provider.toLowerCase() === "xai") {
      chat = new ChatXAI({
        apiKey,
        model: selectedModel,
        temperature,
      });
    } else if (provider.toLowerCase() === "google") {
      chat = new ChatVertexAI({
        apiKey,
        model: selectedModel,
        temperature,
      });
    }


    

    var modelJSON = CHAT_MODELS[provider].filter(
      (item) => item.model === selectedModel
    )?.[0];

    if (!modelJSON) {
      return { error: "Invalid model selected" };
    }

    if (modelJSON.contextLength && applyContextLimit) {
      var contextLimit = modelJSON.contextLength;
      query = query.slice(0, contextLimit);
    }

    // Generate response
    const messages =
      typeof query === "string" ? [new HumanMessage(query)] : query;
    const result = await chat.invoke(messages);

    var reply = result?.choices?.[0]?.message?.content || result?.content;

    response.content = html && html !== "false" ? convertMarkdownToHTML(reply) : reply;
  } catch (error) {
    response.error =
      error.response?.status === 429
        ? "Rate limit exceeded. Please wait before trying again."
        : "Failed to generate response. Please try again later.";
  }

  return response;
}

/**
 * List of default models for the chat providers and a list of models available for Groq
 *
 * @typedef {Object} ChatModel
 * @property {string} name - The display name of the model
 * @property {string} id - The internal ID of the model
 * @property {string} model - The model name
 *
 * @typedef {Object} ChatModels
 * @property {Object} defaults - The default models for the chat providers
 * @property {ChatModel[]} groq - List of models available for Groq
 * @category Generate
 */
export const CHAT_MODELS = {
  defaults: {
    groq: "meta-llama/llama-4-maverick-17b-128e-instruct",
    anthropic: "claude-3-5-sonnet-20240620",
    openai: "gpt-4o",
    together: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    xai: "grok-beta",
  },
  xai: [
    {
      name: "Grok",
      model: "grok-beta",
      contextLength: 131072,
    },
    {
      name: "Grok Vision",
      model: "grok-vision-beta",
      contextLength: 8192,
    },
  ],
  groq: [
    {
      name: "DeepSeek R1 Distill Llama 70B",
      model: "deepseek-r1-distill-llama-70b",
      contextLength: 131072,
    },
    {
      name: "Llama 4 Maverick 17B",
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      contextLength: 131072,
    },
    {
      name: "Llama 4 Scout 17B",
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      contextLength: 131072,
    },
    {
      name: "Llama 3.3 70B Versatile",
      model: "llama-3.3-70b-versatile",
      contextLength: 131072,
    },
    {
      name: "Llama 3.3 70B SpecDec",
      model: "llama-3.3-70b-specdec",
      contextLength: 131072,
    },
    
    {
      name: "Llama 3.2 3B",
      model: "llama-3.2-3b-preview",
      contextLength: 8192,
    },
    {
      name: "Llama 3.2 11B Vision",
      model: "llama-3.2-11b-vision-preview",
      contextLength: 32768,
    },
    {
      name: "Llama 3.2 90B Vision",
      model: "llama-3.2-90b-vision-preview",
      contextLength: 131072,
    },
    {
      name: "Llama 3.1 70B",
      model: "llama-3.1-70b-versatile",
      contextLength: 65536,
    },
    {
      name: "Llama 3.1 8B",
      model: "llama-3.1-8b-instant",
      contextLength: 8192,
    },
    {
      name: "Mixtral 8x7B",
      model: "mixtral-8x7b-32768",
      contextLength: 32768,
    },
    {
      name: "Gemma2 9B",
      model: "gemma2-9b-it",
      contextLength: 16384,
    },
  ],
  openai: [
    {
      name: "GPT-4 Omni",
      model: "gpt-4o",
      contextLength: 128000,
    },
    {
      name: "GPT-4 Omni Mini",
      model: "gpt-4o-mini",
      contextLength: 128000,
    },
    {
      name: "GPT-4 Turbo",
      model: "gpt-4-turbo",
      contextLength: 128000,
    },
    {
      name: "GPT-4",
      model: "gpt-4",
      contextLength: 8192,
    },
    {
      name: "GPT-3.5 Turbo",
      model: "gpt-3.5-turbo",
      contextLength: 16385,
    },
  ],
  anthropic: [
    {
      name: "Claude 3.5 Sonnet",
      model: "claude-3-5-sonnet-20240620",
      contextLength: 200000,
    },
    {
      name: "Claude 3 Opus",
      model: "claude-3-opus-20240229",
      contextLength: 200000,
    },
    {
      name: "Claude 3 Sonnet",
      model: "claude-3-sonnet-20240229",
      contextLength: 200000,
    },
    {
      name: "Claude 3 Haiku",
      model: "claude-3-haiku-20240307",
      contextLength: 200000,
    },
  ],
  together: [
    {
      name: "Llama 3.1 8B Instruct Turbo",
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      contextLength: 131072,
    },
    {
      name: "Llama 3.1 70B Instruct Turbo",
      model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      contextLength: 131072,
    },
    {
      name: "Llama 3.1 405B Instruct Turbo",
      model: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
      contextLength: 130815,
    },
    {
      name: "Llama 3 8B Instruct Turbo",
      model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
      contextLength: 8192,
    },
    {
      name: "Llama 3 70B Instruct Turbo",
      model: "meta-llama/Meta-Llama-3-70B-Instruct-Turbo",
      contextLength: 8192,
    },
    {
      name: "Llama 3.2 3B Instruct Turbo",
      model: "meta-llama/Llama-3.2-3B-Instruct-Turbo",
      contextLength: 131072,
    },
    {
      name: "Llama 3 8B Instruct Lite",
      model: "meta-llama/Meta-Llama-3-8B-Instruct-Lite",
      contextLength: 8192,
    },
    {
      name: "Llama 3 70B Instruct Lite",
      model: "meta-llama/Meta-Llama-3-70B-Instruct-Lite",
      contextLength: 8192,
    },
    {
      name: "Llama 3 8B Instruct Reference",
      model: "meta-llama/Llama-3-8b-chat-hf",
      contextLength: 8192,
    },
    {
      name: "Llama 3 70B Instruct Reference",
      model: "meta-llama/Llama-3-70b-chat-hf",
      contextLength: 8192,
    },
    {
      name: "Llama 3.1 Nemotron 70B",
      model: "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",
      contextLength: 32768,
    },
    {
      name: "Qwen 2.5 Coder 32B Instruct",
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      contextLength: 32769,
    },
    {
      name: "WizardLM-2 8x22B",
      model: "microsoft/WizardLM-2-8x22B",
      contextLength: 65536,
    },
    {
      name: "Gemma 2 27B",
      model: "google/gemma-2-27b-it",
      contextLength: 8192,
    },
    {
      name: "Gemma 2 9B",
      model: "google/gemma-2-9b-it",
      contextLength: 8192,
    },
    {
      name: "DBRX Instruct",
      model: "databricks/dbrx-instruct",
      contextLength: 32768,
    },
    {
      name: "DeepSeek LLM Chat (67B)",
      model: "deepseek-ai/deepseek-llm-67b-chat",
      contextLength: 4096,
    },
    {
      name: "Gemma Instruct (2B)",
      model: "google/gemma-2b-it",
      contextLength: 8192,
    },
    {
      name: "MythoMax-L2 (13B)",
      model: "Gryphe/MythoMax-L2-13b",
      contextLength: 4096,
    },
    {
      name: "LLaMA-2 Chat (13B)",
      model: "meta-llama/Llama-2-13b-chat-hf",
      contextLength: 4096,
    },
    {
      name: "Mistral (7B) Instruct",
      model: "mistralai/Mistral-7B-Instruct-v0.1",
      contextLength: 8192,
    },
    {
      name: "Mistral (7B) Instruct v0.2",
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      contextLength: 32768,
    },
    {
      name: "Mistral (7B) Instruct v0.3",
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      contextLength: 32768,
    },
    {
      name: "Mixtral-8x7B Instruct (46.7B)",
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      contextLength: 32768,
    },
    {
      name: "Mixtral-8x22B Instruct (141B)",
      model: "mistralai/Mixtral-8x22B-Instruct-v0.1",
      contextLength: 65536,
    },
    {
      name: "Nous Hermes 2 - Mixtral 8x7B-DPO (46.7B)",
      model: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
      contextLength: 32768,
    },
    {
      name: "Qwen 2.5 7B Instruct Turbo",
      model: "Qwen/Qwen2.5-7B-Instruct-Turbo",
      contextLength: 32768,
    },
    {
      name: "Qwen 2.5 72B Instruct Turbo",
      model: "Qwen/Qwen2.5-72B-Instruct-Turbo",
      contextLength: 32768,
    },
    {
      name: "Qwen 2 Instruct (72B)",
      model: "Qwen/Qwen2-72B-Instruct",
      contextLength: 32768,
    },
    {
      name: "StripedHyena Nous (7B)",
      model: "togethercomputer/StripedHyena-Nous-7B",
      contextLength: 32768,
    },
    {
      name: "Upstage SOLAR Instruct v1 (11B)",
      model: "upstage/SOLAR-10.7B-Instruct-v1.0",
      contextLength: 4096,
    },
    {
      name: "Llama 3.2 11B Vision Instruct Turbo (Free)",
      model: "meta-llama/Llama-Vision-Free",
      contextLength: 131072,
    },
    {
      name: "Llama 3.2 11B Vision Instruct Turbo",
      model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
      contextLength: 131072,
    },
    {
      name: "Llama 3.2 90B Vision Instruct Turbo",
      model: "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
      contextLength: 131072,
    },
  ],
};
