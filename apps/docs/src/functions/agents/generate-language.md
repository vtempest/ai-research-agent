[Documentation](../modules.md) / agents/generate-language

## Generate

### generateLanguageResponse()

```ts
function generateLanguageResponse(options: object): Promise<{
  content: string;
  error: string;
  extract: any;
}>;
```

Defined in: [packages/ai-research-agent/src/agents/generate-language.js:105](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/generate-language.js#L105)

### Generate Language Response
Writes language response showing human-like understanding of the question and context.

- _Requires_: LLM provider, API Key, agent name, and context input variables for agent.
- _Providers_: groq, togetherai, openai, anthropic, xai, google, perplexity, ollama, cloudflare
- _Agent Templates_: any template from [LangHub](https://smith.langchain.com/hub) or custom:
summarize-bullets(article), summarize(article), summary-longtext(summaries),
suggest-followups(chat_history, article), answer-cite-sources(context, chat_history, query),
query-resolution(chat_history, query), knowledge-graph-nodes(query, article)
- _How it Works_: Language models are trained on vast amounts of text to predict
the most likely next word or sequence of words given a prompt. They represent words and
their contexts as high-dimensional vectors, allowing them to capture complex relationships
and nuances in language. Using neural network architectures like transformers, these models
analyze input text, apply attention mechanisms to understand context by multiplying scores
of all other words, using multiple attention head starting points, and generate human-like
responses based on learned patterns.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

\{ `agent?`: `string`; `apiKey?`: `string`; `applyContextLimit?`: `boolean`; `article?`: `string`; `chat_history?`: `string`; `html?`: `boolean`; `LANGCHAIN_API_KEY?`: `string`; `model?`: `string`; `provider`: `string`; `query?`: `string`; `temperature?`: `number`; \}

</td>
<td>

Configuration parameters for language model generation

</td>
</tr>
<tr>
<td>

`options.agent?`

</td>
<td>

`string`

</td>
<td>

Name of the agent prompt template to use. Can include custom variables

</td>
</tr>
<tr>
<td>

`options.apiKey?`

</td>
<td>

`string`

</td>
<td>

API key for the specified provider. Not required for ollama.
  For cloudflare, use format: "key:accountId"

</td>
</tr>
<tr>
<td>

`options.applyContextLimit?`

</td>
<td>

`boolean`

</td>
<td>

Whether to enforce model's context length limits

</td>
</tr>
<tr>
<td>

`options.article?`

</td>
<td>

`string`

</td>
<td>

Article text to process (required for some agents)

</td>
</tr>
<tr>
<td>

`options.chat_history?`

</td>
<td>

`string`

</td>
<td>

Previous conversation history (required for some agents)

</td>
</tr>
<tr>
<td>

`options.html?`

</td>
<td>

`boolean`

</td>
<td>

Set to true to return response in HTML format, false for markdown

</td>
</tr>
<tr>
<td>

`options.LANGCHAIN_API_KEY?`

</td>
<td>

`string`

</td>
<td>

API key for LangChain tracing functionality

</td>
</tr>
<tr>
<td>

`options.model?`

</td>
<td>

`string`

</td>
<td>

Specific model name to use. If not provided, uses provider's default model

</td>
</tr>
<tr>
<td>

`options.provider`

</td>
<td>

`string`

</td>
<td>

Language model provider to use. Supported providers:
  - groq, togetherai, openai, anthropic, xai, google, perplexity, ollama, cloudflare

</td>
</tr>
<tr>
<td>

`options.query?`

</td>
<td>

`string`

</td>
<td>

User's input query text (required for some agents)

</td>
</tr>
<tr>
<td>

`options.temperature?`

</td>
<td>

`number`

</td>
<td>

Controls response randomness:
  - Values < 1.0: More deterministic, focused responses
  - Values > 1.0: More creative, varied responses
  - Default: 1.0 (balanced)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;\{
  `content`: `string`;
  `error`: `string`;
  `extract`: `any`;
\}&gt;

Response object containing:
  - content: Generated response in HTML/markdown format
  - extract: JSON object with extracted data (for supported agents)
  - error: Error message if generation fails

#### See

 - [LangChain ReactAgent Tools](https://medium.com/@terrycho/how-langchain-agent-works-internally-trace-by-using-langsmith-df23766e7fb4)
[Hugging Face Tutorials](https://huggingface.co/learn)
[Transformer Overview](https://jalammar.github.io/illustrated-transformer/)
[Building Transformer Guide](https://www.datacamp.com/tutorial/building-a-transformer-with-py-torch)
[PyTorch Overview](https://www.learnpytorch.io/pytorch_cheatsheet/)
[LLM Training Example](https://github.com/vtempest/ai-research-agent/blob/master/packages/neural-net/src/train/predict-next-word.js)
         
<img src="https://i.imgur.com/bailW5n.gif" />
<img src="https://i.imgur.com/uW6E9VJ.gif" />
 - ### 👄 LIPs: Language Intelligence Providers
 **IDs**: groq, togetherai, openai, anthropic, xai, google, perplexity, ollama, cloudflare
 
 - **XAI** 📚 [Docs](https://docs.x.ai/docs#models) 🔑 [Keys](https://console.x.ai/) 💰 80B ($ valuation) 💸 100M ($ 2024 revenue):
   Grok, Grok Vision
 - **Groq** 📚 [Docs](https://console.groq.com/docs/overview) 🔑 [Keys](https://console.groq.com/keys) 💰 2.8B:
   Llama, DeepSeek, Gemini, Mistral
 - **Ollama** 📚 [Docs](https://ollama.com/docs)  💸 3.2M: llama, mistral, mixtral, vicuna, gemma, qwen, deepseek, openchat, 
   openhermes, codelama, codegemma, llava, minicpm, wizardcoder, wizardmath, meditrion, falcon
 - **OpenAI** 📚 [Docs](https://platform.openai.com/docs/overview) 🔑 [Keys](https://platform.openai.com/api-keys) 💰 300B 💸 3.7B:
   o1, o1-mini, o4, o4-mini, gpt-4, gpt-4-turbo, gpt-4-omni
 - **Anthropic** 📚 [Docs](https://docs.anthropic.com/en/docs/welcome) 🔑 [Keys](https://console.anthropic.com/settings/keys) 💰 61.5B 💸 1B:
   Claude Sonnet, Claude Opus, Claude Haiku
 - **TogetherAI** 📚 [Docs](https://docs.together.ai/docs/quickstart) 🔑 [Keys](https://api.together.xyz/settings/api-keys) 💰 3.3B 💸 50M:
   Llama, Mistral, Mixtral, Qwen, Gemma, WizardLM, DBRX, DeepSeek, Hermes, SOLAR, StripedHyena
 - **Perplexity** 📚 [Docs](https://docs.perplexity.ai/models/model-cards) 🔑 [Keys](https://www.perplexity.ai/account/api/keys) 💰 18B 💸 20M :
   Sonar, Sonar Deep Research
 - **Cloudflare** 📚 [Docs](https://developers.cloudflare.com/workers-ai/) 🔑 [Keys](https://dash.cloudflare.com/profile/api-tokens) 💰 62.3B 💸 1.67B:
   Llama, Gemma, Mistral, Phi, Qwen, DeepSeek, Hermes, SQL Coder, Code Llama
 - **Google Vertex** 📚 [Docs](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models) 
   🔑 [Keys](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#api-keys): Gemini

#### Author

[Language Model Researchers](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE)

#### Example

```ts
const response = await generateLanguageResponse({
  query: "Explain neural networks",
  agent: "question",
  provider: "groq",
  apiKey: "your-api-key"
})
```
