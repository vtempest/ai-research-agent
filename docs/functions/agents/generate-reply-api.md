[ai-research-agent](../modules.md) / agents/generate-reply-api

## Generate

### CHAT\_MODELS

```ts
const CHAT_MODELS: object;
```

List of default models for the chat providers and a list of models available for Groq

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`anthropic`

</td>
<td>

`object`[]

</td>
</tr>
<tr>
<td>

`defaults`

</td>
<td>

\{
  `anthropic`: `string`;
  `groq`: `string`;
  `openai`: `string`;
  `together`: `string`;
  `xai`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`groq`

</td>
<td>

`object`[]

</td>
</tr>
<tr>
<td>

`openai`

</td>
<td>

`object`[]

</td>
</tr>
<tr>
<td>

`together`

</td>
<td>

`object`[]

</td>
</tr>
<tr>
<td>

`xai`

</td>
<td>

`object`[]

</td>
</tr>
</tbody>
</table>

***

### generateLanguageModelReply()

```ts
function generateLanguageModelReply(query, options): Promise<{
  content: string;
  error: string;
 }>
```

Generates a reply using specified AI provider and model:
- [Groq Docs](https://console.groq.com/docs/overview) [Groq Keys](https://console.groq.com/keys):
  Llama 3.2 3B, Llama 3.2 11B Vision, Llama 3.2 90B Vision, Llama 3.1 70B, Llama 3.1 8B, Mixtral 8x7B, Gemma2 9B
- [OpenAI Docs](https://platform.openai.com/docs/overview) [OpenAI Keys](https://platform.openai.com/api-keys):
  GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4 Omni, GPT-4 Omni Mini
- [Anthropic Docs](https://docs.anthropic.com/en/docs/welcome) [Anthropic Keys](https://console.anthropic.com/settings/keys):
  Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- [TogetherAI Docs](https://docs.together.ai/docs/quickstart) [TogetherAI Keys](https://api.together.xyz/settings/api-keys):
 Llama, Mistral, Mixtral, Qwen, Gemma, WizardLM, DBRX, DeepSeek, Hermes, SOLAR, StripedHyena.
- [XAI Docs](https://docs.x.ai/docs#models) [XAI Keys](https://console.x.ai/): Grok, Grok Vision
 
[Google Vertex Docs](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models) 
[Google Vertex Keys](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#api-keys): Gemini

 This function utilizes [transformer-based language 
 models](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE)
 1. Input Embedding: Converts input text into numerical vectors.
 2. Positional Encoding: Adds position information to maintain word order.
 3. Multi-Head Attention: Processes relationships between words in parallel.
 4. Feed-Forward Networks: Further processes the attention output.
 5. Layer Normalization & Residual Connections: Stabilizes learning and 
 prevents vanishing gradients.
 6. Output Layer: Generates probabilities for next tokens.

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

`query`

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

`options`

</td>
<td>

\{ `apiKey`: `string`; `html`: `boolean`; `model`: `string`; `provider`: `string`; `temperature`: `number`; \}

</td>
<td>

Options

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

`options.html`?

</td>
<td>

`boolean`

</td>
<td>

If true, reply format is HTML. If false, Markdown

</td>
</tr>
<tr>
<td>

`options.model`?

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

`options.temperature`?

</td>
<td>

`number`

</td>
<td>

Temperature is a way to control the overall confidence of the model's scores
 (the logits). What this means is that, if you use a lower value than 1.0, the relative
 distance between the tokens will become larger (more deterministic), and if you use a larger
 value than 1.0, the relative distance between the tokens becomes smaller (less deterministic).
1.0 Temperature is the original distribution that the model was trained to optimize for,
since the scores remain the same.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;\{
  `content`: `string`;
  `error`: `string`;
 \}&gt;

Generated response

#### Author

[AI Research Contributors](https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE)

#### Example

```ts
const response = await generateLanguageModelReply(
  "Explain neural networks", {provider: "groq", apiKey: "your-api-key"})
```

## Other

### ChatModel

#### Properties

##### id

```ts
id: string;
```

The internal ID of the model

##### model

```ts
model: string;
```

The model name

##### name

```ts
name: string;
```

The display name of the model

***

### ChatModels

#### Properties

##### defaults

```ts
defaults: any;
```

The default models for the chat providers

##### groq

```ts
groq: ChatModel[];
```

List of models available for Groq
