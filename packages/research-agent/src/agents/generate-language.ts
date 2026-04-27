/**
 * @fileoverview Core logic for generating AI language responses using LangChain and various LLM providers.
 * Handles prompt interpolation, tool calling, and response formatting.
 */
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { pull } from "langchain/hub/node";
import { AGENT_PROMPTS } from "./agent-prompts";
import { AGENT_TOOLS } from "./agent-tools";
import { LANGUAGE_MODELS, LANGUAGE_PROVIDERS } from "./language-model-names";
import { createLLMProvider } from "./llm-providers";
import { convertMarkdownToHTMLEscaped } from "./markdown-to-html";
import type {
  AgentPrompt,
  AgentTool,
  GenerateLanguageOptions,
  GenerateLanguageResult,
} from "./generate-language-types";

export type {
  LLMProviderName,
  GenerateLanguageOptions,
  GenerateLanguageResult,
} from "./generate-language-types";
export { convertMarkdownToHTMLEscaped } from "./markdown-to-html";

/**
 * ### Generate Language Response
 * Writes a language response that shows human-like understanding of the
 * question and context.
 * - _Requires_: LLM provider, API key, agent name, and context variables.
 * - _Providers_: groq, togetherai, openai, anthropic, xai, google,
 *   perplexity, ollama, cloudflare, nvidia
 * - _Agent Templates_: any template from [LangHub](https://smith.langchain.com/hub)
 *   or a custom local entry.
 * - _How it Works_: Language models predict the most likely next token given
 *   a prompt. They represent words as high-dimensional vectors, use
 *   transformer attention across all prior tokens, and sample from the
 *   resulting probability distribution to produce human-like text.
 *
 * @see [LangChain ReactAgent internals](https://medium.com/@terrycho/how-langchain-agent-works-internally-trace-by-using-langsmith-df23766e7fb4)
 * @see [Hugging Face tutorials](https://huggingface.co/learn)
 * @see [Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
 * @see [Building a Transformer with PyTorch](https://www.datacamp.com/tutorial/building-a-transformer-with-py-torch)
 * @see [LLM training example](https://github.com/vtempest/ai-research-agent/blob/master/packages/neural-net/src/train/predict-next-word.js)
 *
 * <img src="https://i.imgur.com/bailW5n.gif" />
 * <img src="https://i.imgur.com/uW6E9VJ.gif" />
 *
 * ### 👄 LIPs: Language Intelligence Providers
 * **IDs**: groq, togetherai, openai, anthropic, xai, google, perplexity, ollama, cloudflare, nvidia
 *
 * - **XAI** 📚 [Docs](https://docs.x.ai/docs#models) 🔑 [Keys](https://console.x.ai/) 💰 80B 💸 100M:
 *   Grok, Grok Vision
 * - **Groq** 📚 [Docs](https://console.groq.com/docs/overview) 🔑 [Keys](https://console.groq.com/keys) 💰 2.8B:
 *   Llama, DeepSeek, Gemini, Mistral
 * - **NVIDIA** 📚 [Docs](https://docs.api.nvidia.com/) 🔑 [Keys](https://build.nvidia.com/settings/api-keys) 💰 1.2T 💸 30B:
 *   Kimi K2.5, Nemotron Nano, DeepSeek V3, Llama Nemotron, Qwen2.5, Gemma3, Llama 4
 * - **Ollama** 📚 [Docs](https://ollama.com/docs) — runs locally, no API key needed
 * - **OpenAI** 📚 [Docs](https://platform.openai.com/docs/overview) 🔑 [Keys](https://platform.openai.com/api-keys) 💰 300B 💸 3.7B:
 *   o1, o4, GPT-4, GPT-4 Turbo, GPT-4 Omni
 * - **Anthropic** 📚 [Docs](https://docs.anthropic.com/en/docs/welcome) 🔑 [Keys](https://console.anthropic.com/settings/keys) 💰 61.5B 💸 1B:
 *   Claude Sonnet, Claude Opus, Claude Haiku
 * - **TogetherAI** 📚 [Docs](https://docs.together.ai/docs/quickstart) 🔑 [Keys](https://api.together.xyz/settings/api-keys) 💰 3.3B 💸 50M:
 *   Llama, Mistral, Mixtral, Qwen, Gemma, WizardLM, DBRX, DeepSeek, Hermes, SOLAR, StripedHyena
 * - **Perplexity** 📚 [Docs](https://docs.perplexity.ai/models/model-cards) 🔑 [Keys](https://www.perplexity.ai/account/api/keys) 💰 18B 💸 20M:
 *   Sonar, Sonar Deep Research
 * - **Cloudflare** 📚 [Docs](https://developers.cloudflare.com/workers-ai/) 🔑 [Keys](https://dash.cloudflare.com/profile/api-tokens) 💰 62.3B 💸 1.67B:
 *   Llama, Gemma, Mistral, Phi, Qwen, DeepSeek, Hermes, SQL Coder, Code Llama
 * - **Google Vertex** 📚 [Docs](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models)
 *   🔑 [Keys](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#api-keys): Gemini
 *
 * @param options - Configuration for the language-model call
 * @returns Resolved response object with `content`, optional `extract`, or `error`
 * @author [Language Model Researchers](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE)
 * @example
 * const response = await generateLanguageResponse({
 *   query: "Explain neural networks",
 *   agent: "question",
 *   provider: "groq",
 *   apiKey: "your-api-key",
 * });
 */
export async function generateLanguageResponse(
  options: GenerateLanguageOptions = {} as GenerateLanguageOptions,
): Promise<GenerateLanguageResult> {
  const {
    apiKey,
    agent = "question",
    temperature = 1,
    html = true,
    applyContextLimit = true,
    LANGCHAIN_API_KEY,
    ...context
  } = options;

  // Normalise provider to lowercase for consistent switch matching
  const provider = options.provider?.toLowerCase();

  // Resolve model: explicit override → provider's registered default
  const model =
    options.model ??
    (LANGUAGE_MODELS as Array<{ provider: string; default?: string }>).find(
      (m) => m.provider.toLowerCase() === provider,
    )?.default ??
    "";

  try {
    // ── 1. Validate required inputs ──────────────────────────────────────────
    const validProviders = LANGUAGE_PROVIDERS as string[];
    if (!apiKey || !provider || !validProviders.includes(provider)) {
      return {
        error:
          "API key and provider are required. Valid providers: " +
          validProviders.join(", "),
      };
    }

    // ── 2. Load agent prompt (local registry → LangChain Hub fallback) ───────
    const agentObject = ((AGENT_PROMPTS as AgentPrompt[]).find(
      (p) => p?.name === agent,
    ) ?? (await pull(agent, { apiKey: LANGCHAIN_API_KEY }))) as AgentPrompt;

    if (!agentObject) return { error: `Agent "${agent}" not found` };

    // ── 3. Pre-process the prompt template via optional `before` hook ─────────
    if (agentObject.before) {
      agentObject.prompt = agentObject.before(agentObject.prompt, options);
    }

    // ── 4. Build template variable map and interpolate placeholders ───────────
    const templateVars: Record<string, unknown> = {
      ...options,
      input: `${context.query ?? ""} ${context.article ?? ""}`,
    };
    let prompt = interpolateTemplate(agentObject.template ?? "", templateVars);

    // ── 5. Trim prompt to the model's context window ──────────────────────────
    if (applyContextLimit) {
      const modelConfig = (
        LANGUAGE_MODELS as Array<{
          provider: string;
          models: Array<{ id: string; contextLength: number }>;
        }>
      )
        .find((m) => m.provider.toLowerCase() === provider)
        ?.models.find((m) => m.id === model);

      if (modelConfig) {
        prompt = prompt.slice(0, modelConfig.contextLength);
      }
    }

    // ── 6. Instantiate the LLM provider ──────────────────────────────────────
    const llm = createLLMProvider(provider, apiKey, model, temperature);
    if (!llm) return { error: "Invalid provider selected" };

    // ── 7. Resolve tools declared by the agent ────────────────────────────────
    const tools = (AGENT_TOOLS as AgentTool[])
      .filter((t) => agentObject.tools?.includes(t.name))
      .map((t) => tool(t.func as Parameters<typeof tool>[0], t));

    // ── 8. Invoke LLM (ReAct agent when tools are present, plain otherwise) ───
    let rawReply: string;
    if (tools.length > 0) {
      const agentResult = await createReactAgent({ llm, tools }).invoke({
        messages: [{ role: "user", content: prompt }],
      });
      rawReply = String(agentResult.messages.at(-1)?.content ?? "");
    } else {
      const invokeResult = await llm.invoke(prompt);
      rawReply =
        typeof invokeResult === "string"
          ? invokeResult
          : String((invokeResult as { content?: unknown })?.content ?? "");
    }

    // ── 9. Format output (HTML or raw Markdown) ───────────────────────────────
    const content: string = html
      ? await convertMarkdownToHTMLEscaped(rawReply)
      : rawReply;

    // ── 10. Extract structured data via optional `after` hook ─────────────────
    const extract = agentObject.after?.(rawReply, options);

    return { content, ...(extract !== undefined && { extract }) };
  } catch (err) {
    const error = err as { response?: { status?: number }; message?: string };
    return {
      error:
        error.response?.status === 429
          ? "Rate limit exceeded. Please wait before trying again."
          : (error.message ??
            "Failed to generate response. Please try again later."),
    };
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Substitutes `{variableName}` placeholders in a template string with values
 * from `vars`. Object/array values are pretty-printed without braces or
 * commas. Unmatched keys fall back to `"[not provided]"`.
 *
 * @param template - Template string containing `{key}` placeholders
 * @param vars     - Map of variable names to their replacement values
 * @returns The fully interpolated string
 */
function interpolateTemplate(
  template: string,
  vars: Record<string, unknown>,
): string {
  return template.replace(/\{(.+?)\}/g, (_match, key: string) => {
    if (!(key in vars)) return "[not provided]";
    const value = vars[key];
    if (typeof value === "string") return value;
    return JSON.stringify(value, null, 2)
      .replace(/[{}"]/g, "")
      .replace(/,/g, "\n");
  });
}
