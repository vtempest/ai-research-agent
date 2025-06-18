import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { pull } from "langchain/hub";
import {
  AGENT_PROMPTS,
  AGENT_TOOLS,
  LANGUAGE_MODELS,
  LANGUAGE_PROVIDERS,
  convertMarkdownToHTML,
  convertURLSafeHTMLToHTML,
} from "..";

// Import language model providers
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
 * Writes language response showing human-like understanding of the question and context.
 * 
 * - _Requires_: LLM provider, API Key, agent name, and context input variables for agent.
 * - _Providers_: groq, togetherai, openai, anthropic, xai, google, perplexity, ollama, cloudflare
 * - _Agent Templates_: any template from [LangHub](https://smith.langchain.com/hub) or custom:
 * summarize-bullets(article), summarize(article), summary-longtext(summaries),
 * suggest-followups(chat_history, article), answer-cite-sources(context, chat_history, query),
 * query-resolution(chat_history, query), knowledge-graph-nodes(query, article)
 * - _How it Works_: Language models are trained on vast amounts of text to predict
 * the most likely next word or sequence of words given a prompt. They represent words and
 * their contexts as high-dimensional vectors, allowing them to capture complex relationships
 * and nuances in language. Using neural network architectures like transformers, these models
 * analyze input text, apply attention mechanisms to understand context by multiplying scores
 * of all other words, using multiple attention head starting points, and generate human-like
 * responses based on learned patterns. [How LangChain ReactAgent Tools 
 * Works](https://medium.com/@terrycho/how-langchain-agent-works-internally-trace-by-using-langsmith-df23766e7fb4)
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
 * @param {object} options - Configuration parameters for language model generation
 * @param {string} options.provider - Language model provider to use. Supported providers:
 *   - groq, togetherai, openai, anthropic, xai, google, perplexity, ollama, cloudflare
 * @param {string} [options.apiKey] - API key for the specified provider. Not required for ollama.
 *   For cloudflare, use format: "key:accountId"
 * @param {string} [options.agent] - Name of the agent prompt template to use. Can include custom variables
 * @param {string} [options.model] - Specific model name to use. If not provided, uses provider's default model
 * @param {number} [options.temperature=1] - Controls response randomness:
 *   - Values < 1.0: More deterministic, focused responses
 *   - Values > 1.0: More creative, varied responses
 *   - Default: 1.0 (balanced)
 * @param {string} [options.query] - User's input query text (required for some agents)
 * @param {string} [options.article] - Article text to process (required for some agents)
 * @param {string} [options.chat_history] - Previous conversation history (required for some agents)
 * @param {boolean} [options.html=true] - Set to true to return response in HTML format, false for markdown
 * @param {boolean} [options.applyContextLimit=true] - Whether to enforce model's context length limits
 * @param {string} [options.LANGCHAIN_API_KEY] - API key for LangChain tracing functionality
 * @category Generate
 * @author [Language Model Researchers](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE)
 * @returns {Promise<{content: string, extract: object, error: string}>} Response object containing:
 *   - content: Generated response in HTML/markdown format
 *   - extract: JSON object with extracted data (for supported agents)
 *   - error: Error message if generation fails
 * @example
 * const response = await generateLanguageResponse({
 *   query: "Explain neural networks",
 *   agent: "question",
 *   provider: "groq",
 *   apiKey: "your-api-key"
 * })
 */
export async function generateLanguageResponse(options = {}) {
  // Extract and set default values for required parameters
  let {
    provider,
    apiKey,
    model = LANGUAGE_MODELS.find(m => m.provider == options.provider)?.default,
    agent = "question",
    temperature = 1,
    html = true,
    applyContextLimit = true,
    LANGCHAIN_API_KEY,
    ...context
  } = options;

  try {
    // Initialize response object
    let response = { content: "" };

    // Normalize provider name to lowercase
    provider = provider?.toLowerCase();

    // Validate required parameters
    if (!apiKey || !provider || !LANGUAGE_PROVIDERS.includes(provider))
      return {
        error:
          "API key and provider are required. Valid providers: " +
          LANGUAGE_PROVIDERS.join(", "),
      };

    // Get default model for provider if not specified
    if (!model)
      model = LANGUAGE_MODELS.find(m => m.provider == provider)?.default;

    // Get agent template from local cache or LangChain hub
    let agentObject =
      AGENT_PROMPTS.find((p) => p?.name == agent) ||
      (await pull(agent, { api_key: LANGCHAIN_API_KEY }));

    if (!agentObject) return { error: "Agent " + agent + " not found" };

    // Apply any pre-formatting to the prompt if specified
    if (agentObject?.before)
      agentObject.prompt = agentObject.before(agentObject.prompt, options);

    // Combine query and article for input
    options.input = context.query + " " + context.article;

    // Replace template variables with actual values
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
    if (applyContextLimit) {
      // Get model configuration including context length limits
      let modelJSON = LANGUAGE_MODELS.find(m => m.provider == provider)
        ?.models.find(m => m.id === model);

      prompt = prompt.slice(0, modelJSON.contextLength);
    }

    //instantiate provider object
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

    // get tools for agent
    let tools = AGENT_TOOLS
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

    //markdown or html output
    response.content = html
      ? convertURLSafeHTMLToHTML(convertMarkdownToHTML(languageReply))
      : languageReply;

    // extract data from response for some agents
    if (agentObject?.after)
      response.extract = agentObject.after(languageReply, options);

    return response;
  } catch (error) {
    // return error message by status code or message
    return {
      error:
        error.response?.status === 429
          ? "Rate limit exceeded. Please wait before trying again."
          : error.message ||
          "Failed to generate response. Please try again later."
    }
  }
}
