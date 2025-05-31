[Documentation](../modules.md) / agents/reply-language

## Generate

### generateLanguageResponse()

```ts
function generateLanguageResponse(options: object): Promise<{
  content: string;
  data: any;
  error: string;
}>;
```

Defined in: agents/reply-language.js:72

<img src="https://i.imgur.com/bailW5n.gif" /> 
<img src="https://i.imgur.com/uW6E9VJ.gif" /> 

### Generate Language Response
Generates language response to language prompt with agent templates.

- _Requires_: LLM provider, API Key, and either prompt or context and agent.
- _Providers_: groq, togetherai, openai, anthropic, xai, google, perplexity
- _Agent Templates_: summarize-bullets(article), summarize(article), 
suggest-followups(chat_history, article), answer-cite-sources(context, chat_history, query),
query-resolution(chat_history, query), knowledge-graph-nodes(query, article), 
summary-longtext(summaries)
- _How it Works_: Language models are trained on vast amounts of text to predict 
the most likely next word or sequence of words given a prompt. They represent words and 
their contexts as high-dimensional vectors, allowing them to capture complex relationships 
and nuances in language. Using neural network architectures like transformers, these models 
analyze input text, apply attention mechanisms to understand context, and generate human-like 
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

\{ `agent?`: `string`; `apiKey`: `string`; `model?`: `string`; `prompt`: `string` \| `any`[]; `provider`: `string`; `temperature?`: `number`; \}

</td>
<td>

parameters

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

Agent prompt to use with custom variables passed, instead of prompt

</td>
</tr>
<tr>
<td>

`options.apiKey`

</td>
<td>

`string`

</td>
<td>

API key for the specified provider

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

Optional model name. If not provided, uses default

</td>
</tr>
<tr>
<td>

`options.prompt`

</td>
<td>

`string` \| `any`[]

</td>
<td>

User's input query text string or LangChain messages array

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

LLM provider: groq, openai, anthropic, together, xai, google

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

Temperature is a way to control the overall confidence of the model's scores
 (the logits). What this means is that, if you use a lower value than 1.0, the relative
 distance between the tokens will become larger (more deterministic), and if you use a larger
 value than 1.0, the relative distance between the tokens becomes smaller (less deterministic).

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;\{
  `content`: `string`;
  `data`: `any`;
  `error`: `string`;
\}&gt;

Language response with human-like understanding of the question and context.
"content" is HTML (or markdown if requested)
"data" is a JSON object from response extracted by some agents
"error" is an error message if one occurs

#### See

- [Groq Docs](https://console.groq.com/docs/overview) [Groq Keys](https://console.groq.com/keys):
  Llama, Mixtral 8x7B, Gemma2 9B
- [OpenAI Docs](https://platform.openai.com/docs/overview) [OpenAI Keys](https://platform.openai.com/api-keys):
  GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4 Omni, GPT-4 Omni Mini
- [Anthropic Docs](https://docs.anthropic.com/en/docs/welcome) [Anthropic Keys](https://console.anthropic.com/settings/keys):
  Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- [TogetherAI Docs](https://docs.together.ai/docs/quickstart) [TogetherAI Keys](https://api.together.xyz/settings/api-keys):
 Llama, Mistral, Mixtral, Qwen, Gemma, WizardLM, DBRX, DeepSeek, Hermes, SOLAR, StripedHyena.
- [XAI Docs](https://docs.x.ai/docs#models) [XAI Keys](https://console.x.ai/): Grok, Grok Vision
- [Google Vertex Docs](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models) 
  [Google Vertex Keys](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#api-keys): Gemini
- [Perplexity Docs](https://docs.perplexity.ai/models/model-cards) 
   [Perplexity Keys](https://www.perplexity.ai/settings/keys): Sonar, Sonar Deep Research

#### Author

[Language Model Researchers](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE)

#### Example

```ts
const response = await generateLanguageResponse({
  prompt: "Explain neural networks",
  provider: "groq",
  apiKey: "your-api-key"
})
```
