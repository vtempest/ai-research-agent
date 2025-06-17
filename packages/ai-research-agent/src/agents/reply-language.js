import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { pull } from "langchain/hub";
import { z } from "zod";
import { agentTools } from "./agent-tools";
import {
  AGENT_PROMPTS,
  LANGUAGE_MODELS,
  LANGUAGE_PROVIDERS,
  convertMarkdownToHTML,
  convertEscapedHTMLToHTML,
} from "..";

//providers
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatGroq } from "@langchain/groq";
import { ChatPerplexity } from "@langchain/community/chat_models/perplexity";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { ChatOllama } from "@langchain/ollama";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { ChatXAI } from "@langchain/xai";
import { ChatVertexAI } from "@langchain/google-vertexai-web";

/**
 * ### Generate Language Response
 * Generates language response to language prompt with agent templates.
 *
 * - _Requires_: LLM provider, API Key, and either prompt or context and agent.
 * - _Providers_: groq, togetherai, openai, anthropic, xai, google, perplexity
 * - _Agent Templates_: summarize-bullets(article), summarize(article),
 * suggest-followups(chat_history, article), answer-cite-sources(context, chat_history, query),
 * query-resolution(chat_history, query), knowledge-graph-nodes(query, article),
 * summary-longtext(summaries)
 * - _How it Works_: Language models are trained on vast amounts of text to predict
 * the most likely next word or sequence of words given a prompt. They represent words and
 * their contexts as high-dimensional vectors, allowing them to capture complex relationships
 * and nuances in language. Using neural network architectures like transformers, these models
 * analyze input text, apply attention mechanisms to understand context by multiplying scores
 * of all other words, using multiple attention head starting points, and generate human-like
 * responses based on learned patterns.
 *
 * <img src="https://i.imgur.com/bailW5n.gif" />
 * <img src="https://i.imgur.com/uW6E9VJ.gif" />
 * @see
 * - [Groq Docs](https://console.groq.com/docs/overview) [Groq Keys](https://console.groq.com/keys):
 *   Llama, Mixtral 8x7B, Gemma2 9B
 * - [OpenAI Docs](https://platform.openai.com/docs/overview) [OpenAI Keys](https://platform.openai.com/api-keys):
 *   GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4 Omni, GPT-4 Omni Mini
 * - [Anthropic Docs](https://docs.anthropic.com/en/docs/welcome) [Anthropic Keys](https://console.anthropic.com/settings/keys):
 *   Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
 * - [TogetherAI Docs](https://docs.together.ai/docs/quickstart) [TogetherAI Keys](https://api.together.xyz/settings/api-keys):
 *  Llama, Mistral, Mixtral, Qwen, Gemma, WizardLM, DBRX, DeepSeek, Hermes, SOLAR, StripedHyena.
 * - [XAI Docs](https://docs.x.ai/docs#models) [XAI Keys](https://console.x.ai/): Grok, Grok Vision
 * - [Google Vertex Docs](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models)
 *   [Google Vertex Keys](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#api-keys): Gemini
 * - [Perplexity Docs](https://docs.perplexity.ai/models/model-cards)
 *    [Perplexity Keys](https://www.perplexity.ai/settings/keys): Sonar, Sonar Deep Research
 * @param {object} options - parameters
 * @param {string} [options.agent] - Agent prompt to use with custom variables passed, instead of prompt
 * @param {string} options.provider - LLM provider: groq, openai, anthropic, together, xai, google
 * @param {string} options.apiKey - API key for the specified provider
 * @param {string|Array} options.prompt - User's input query text string or LangChain messages array
 * @param {string} [options.model] - Optional model name. If not provided, uses default
 * @param {number} [options.temperature=1] -
 * Temperature is a way to control the overall confidence of the model's scores
 *  (the logits). What this means is that, if you use a lower value than 1.0, the relative
 *  distance between the tokens will become larger (more deterministic), and if you use a larger
 *  value than 1.0, the relative distance between the tokens becomes smaller (less deterministic).
 * @category Generate
 * @author [Language Model Researchers](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE)
 * @returns {Promise<{content: string, extract: object, error: string}>}
 * Language response with human-like understanding of the question and context.
 * "content" is HTML (or markdown if requested)
 * "data" is a JSON object from response extracted by some agents
 * "error" is an error message if one occurs
 * @example
 * const response = await generateLanguageResponse({
 *   prompt: "Explain neural networks",
 *   provider: "groq",
 *   apiKey: "your-api-key"
 * })
 */
export async function generateLanguageResponse(options = {}) {
  let {
    provider,
    apiKey,
    model = null,
    agent = "question",
    temperature = 1,
    html = true,
    applyContextLimit = true,
    LANGCHAIN_API_KEY,
    ...context
  } = options;

  let response = { content: "" };

  provider = provider?.toLowerCase();

  if (!apiKey || !provider || !LANGUAGE_PROVIDERS.includes(provider))
    return {
      error:
        "API key and provider are required. Valid providers: " +
        LANGUAGE_PROVIDERS.join(", "),
    };

  try {
    provider = provider.toLowerCase();

    if (!model)
      model = LANGUAGE_MODELS.find(
        (m) => m.provider.toLowerCase() == provider.toLowerCase()
      )?.default;

    let modelJSON = LANGUAGE_MODELS.find(
      (m) => m.provider.toLowerCase() == provider.toLowerCase()
    )?.models.find((m) => m.id === model);


    let agentObject =
      AGENT_PROMPTS.find((p) => p?.name == agent) ||
      (await pull(agent, { api_key: LANGCHAIN_API_KEY }));

    if (!agentObject) return { error: "Agent " + agent + " not found" };

    //preformating callback function
    if (agentObject?.before)
      agentObject.prompt = agentObject.before(agentObject.prompt, options);

    options.input = context.query + " " + context.article;

    //replace variables in prompt with values passed in options, format JSON
    let prompt = agentObject?.template.replace(/\{(.+?)\}/g, (match, key) =>
      key in options
        ? typeof options[key] === "string"
          ? options[key]
          : JSON.stringify(options[key], null, 2)
              .replace(/[{}"]/g, "")
              .replace(/,/g, "\n")
        : "[not provided]"
    );

    //limit text length
    if (modelJSON?.contextLength && applyContextLimit)
      prompt = prompt.slice(0, modelJSON.contextLength);

    // let messages = typeof prompt === "string" ? [new HumanMessage(prompt)] : prompt;

    //select provider object
    const LangModelProvider =
      provider === "groq"
        ? new ChatGroq({ apiKey, model, temperature })
        : provider === "togetherai"
          ? new ChatTogetherAI({ apiKey, model, temperature })
          : provider === "openai"
            ? new ChatOpenAI({ openAIApiKey: apiKey, model, temperature })
            : provider === "anthropic"
              ? new ChatAnthropic({
                  anthropicApiKey: apiKey,
                  model,
                  temperature,
                })
              : provider === "xai"
                ? new ChatXAI({ apiKey, model, temperature })
                : provider === "google"
                  ? new ChatVertexAI({ apiKey, model, temperature })
                  : provider === "perplexity"
                    ? new ChatPerplexity({ apiKey, model, temperature })
                    : provider === "cloudflare"
                      ? new ChatCloudflareWorkersAI({
                          apiKey,
                          cloudflareApiToken: apiKey.split(":")[0],
                          cloudflareAccountId: apiKey.split(":")[1],
                          temperature,
                        })
                      : provider === "ollama"
                        ? new ChatOllama({ model, temperature })
                        : null;

    if (!LangModelProvider) return { error: "Invalid provider selected" };

    let tools = agentTools
      .filter((t) => agentObject.tools?.includes(t.name))
      .map((t) => tool(t.func, t));

    // Generate response by calling the API provider
    let languageReply = tools.length
      ? (
          await createReactAgent({ llm: LangModelProvider, tools }).invoke({
            messages: [{ role: "user", content: prompt }],
          })
        ).messages.at(-1)?.content
      : (await LangModelProvider.invoke(prompt))?.content;

    // var reply = result?.choices?.[0]?.message?.content || result?.content;

    //markdown or html output
    response.content = html
      ? convertEscapedHTMLToHTML(convertMarkdownToHTML(languageReply))
      : languageReply;

    if (agentObject?.after)
      response.extract = agentObject.after(languageReply, options);

    //

    //markdown or html output
    // response.content = languageReply // html ? convertEscapedHTMLToHTML(convertMarkdownToHTML(languageReply)) : languageReply;

    // if (agentObject?.after)
    //   response.data = agentObject.after(response.content, options);
  } catch (error) {
    response.error =
      error.response?.status === 429
        ? "Rate limit exceeded. Please wait before trying again."
        : error.message ||
          "Failed to generate response. Please try again later.";
  }

  return response;
}
