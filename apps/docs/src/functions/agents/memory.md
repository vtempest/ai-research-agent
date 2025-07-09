[Documentation](../modules.md) / agents/memory

## MemoryAgent

Defined in: [packages/ai-research-agent/src/agents/memory.js:630](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L630)

Enhanced Memory Agent with better error handling and features

Features:
- Rate limiting
- Multiple LLM provider support
- Health monitoring
- Conversation management
- Memory analytics

### Constructors

#### Constructor

```ts
new MemoryAgent(
   userId: string, 
   db: any, 
   options: object): MemoryAgent;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:644](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L644)

Initialize memory agent

##### Parameters

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

`userId`

</td>
<td>

`string`

</td>
<td>

User identifier

</td>
</tr>
<tr>
<td>

`db`

</td>
<td>

`any`

</td>
<td>

Database connection

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

\{ `defaultApiKey`: `string`; `defaultModel`: `string`; `defaultProvider`: `string`; `memoryOptions`: `any`; `providers`: `any`; `rateLimit`: `any`; \}

</td>
<td>

Configuration options

</td>
</tr>
<tr>
<td>

`options.defaultApiKey`

</td>
<td>

`string`

</td>
<td>

Default API key

</td>
</tr>
<tr>
<td>

`options.defaultModel`

</td>
<td>

`string`

</td>
<td>

Default model

</td>
</tr>
<tr>
<td>

`options.defaultProvider`

</td>
<td>

`string`

</td>
<td>

Default LLM provider

</td>
</tr>
<tr>
<td>

`options.memoryOptions`

</td>
<td>

`any`

</td>
<td>

Memory system options

</td>
</tr>
<tr>
<td>

`options.providers`

</td>
<td>

`any`

</td>
<td>

LLM provider configurations

</td>
</tr>
<tr>
<td>

`options.rateLimit`

</td>
<td>

`any`

</td>
<td>

Rate limiting configuration

</td>
</tr>
</tbody>
</table>

##### Returns

[`MemoryAgent`](#memoryagent)

### Properties

#### analytics

```ts
analytics: object;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:669](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L669)

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`averageResponseTime`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:672](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L672)

</td>
</tr>
<tr>
<td>

`errorCount`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:673](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L673)

</td>
</tr>
<tr>
<td>

`sessionStartTime`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:674](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L674)

</td>
</tr>
<tr>
<td>

`totalMessages`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:670](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L670)

</td>
</tr>
<tr>
<td>

`totalTokens`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:671](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L671)

</td>
</tr>
</tbody>
</table>

#### conversationHistory

```ts
conversationHistory: any[];
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:666](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L666)

#### defaultApiKey

```ts
defaultApiKey: string;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:651](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L651)

#### defaultModel

```ts
defaultModel: string;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:652](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L652)

#### defaultProvider

```ts
defaultProvider: string;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:650](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L650)

#### memory

```ts
memory: SimpleMemory;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:649](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L649)

#### providers

```ts
providers: any;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:662](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L662)

#### rateLimitConfig

```ts
rateLimitConfig: any;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:656](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L656)

#### rateLimiter

```ts
rateLimiter: Map<any, any>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:655](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L655)

#### sessionId

```ts
sessionId: string;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:665](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L665)

### Methods

#### buildPrompt()

```ts
buildPrompt(
   message: any, 
   memoryContext: any, 
   options: any): string;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:863](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L863)

Build enhanced prompt with context

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`message`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`memoryContext`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`string`

#### chat()

```ts
chat(message: string, options: any): Promise<any>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:757](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L757)

Main chat method with comprehensive error handling

##### Parameters

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

`message`

</td>
<td>

`string`

</td>
<td>

User message

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
<td>

Chat options

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`any`&gt;

- Chat response

##### Example

```ts
const response = await agent.chat("Hello, I'm John", {
  provider: 'groq',
  model: 'mixtral-8x7b-32768',
  temperature: 0.7,
  systemPrompt: 'You are a helpful assistant.'
});

if (response.success) {
  console.log('Response:', response.content);
  console.log('Memory context:', response.memoryContext);
  console.log('Tokens used:', response.tokensUsed);
} else {
  console.error('Error:', response.error);
}
```

#### checkRateLimit()

```ts
checkRateLimit(
   key: string, 
   maxRequests: number, 
   windowMs: number): boolean;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:713](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L713)

Rate limiting check with sliding window

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

Rate limit key

</td>
</tr>
<tr>
<td>

`maxRequests`

</td>
<td>

`number`

</td>
<td>

`null`

</td>
<td>

Maximum requests per window

</td>
</tr>
<tr>
<td>

`windowMs`

</td>
<td>

`number`

</td>
<td>

`null`

</td>
<td>

Window size in milliseconds

</td>
</tr>
</tbody>
</table>

##### Returns

`boolean`

- Whether request is allowed

#### forceStoreSummary()

```ts
forceStoreSummary(): Promise<boolean>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:955](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L955)

Force store summary of current conversation

##### Returns

`Promise`&lt;`boolean`&gt;

#### generateResponse()

```ts
generateResponse(prompt: any, options: any): Promise<any>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:837](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L837)

Generate LLM response with timeout and error handling

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`prompt`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`any`&gt;

#### generateSessionId()

```ts
generateSessionId(): string;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:701](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L701)

Generate unique session ID

##### Returns

`string`

#### getAnalytics()

```ts
getAnalytics(): object;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:990](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L990)

Get analytics and performance metrics

##### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`averageResponseTime`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:672](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L672)

</td>
</tr>
<tr>
<td>

`errorCount`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:673](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L673)

</td>
</tr>
<tr>
<td>

`memory`

</td>
<td>

\{
  `cacheHits`: `number`;
  `cacheMisses`: `number`;
  `cacheSize`: `number`;
  `errors`: `number`;
  `isProcessing`: `boolean`;
  `recentMessagesCount`: `number`;
  `summarizations`: `number`;
  `vectorSearches`: `number`;
\}

</td>
<td>

&hyphen;

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:993](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L993)

</td>
</tr>
<tr>
<td>

`sessionId`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:994](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L994)

</td>
</tr>
<tr>
<td>

`sessionStartTime`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:674](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L674)

</td>
</tr>
<tr>
<td>

`totalMessages`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:670](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L670)

</td>
</tr>
<tr>
<td>

`totalTokens`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:671](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L671)

</td>
</tr>
<tr>
<td>

`uptime`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:995](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L995)

</td>
</tr>
</tbody>
</table>

#### getDefaultProviders()

```ts
getDefaultProviders(): object;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:681](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L681)

Get default LLM providers

##### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`groq()`

</td>
<td>

(`apiKey`: `any`, `model`: `any`, `temperature`: `any`) => `object`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:683](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L683)

</td>
</tr>
<tr>
<td>

`openai()`

</td>
<td>

(`apiKey`: `any`, `model`: `any`, `temperature`: `any`) => `object`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:689](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L689)

</td>
</tr>
</tbody>
</table>

#### getMemories()

```ts
getMemories(
   query: string, 
   limit: number, 
   options: any): Promise<any[]>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:948](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L948)

Get memories with filtering

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`query`

</td>
<td>

`string`

</td>
<td>

`''`

</td>
<td>

Search query

</td>
</tr>
<tr>
<td>

`limit`

</td>
<td>

`number`

</td>
<td>

`10`

</td>
<td>

Maximum results

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
<td>

`{}`

</td>
<td>

Search options

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`any`[]&gt;

- Memories

##### Example

```ts
// Get all work-related memories
const workMemories = await agent.getMemories('', 20, { memoryType: 'work' });

// Search for meeting memories
const meetingMemories = await agent.getMemories('meeting', 10);
```

#### healthCheck()

```ts
healthCheck(): Promise<any>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:964](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L964)

Health check for the agent

##### Returns

`Promise`&lt;`any`&gt;

- Health status

#### remember()

```ts
remember(
   fact: string, 
   importance: number, 
   category: string, 
   metadata: any): Promise<string>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:920](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L920)

Remember a fact manually

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`fact`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

Fact to remember

</td>
</tr>
<tr>
<td>

`importance`

</td>
<td>

`number`

</td>
<td>

`1`

</td>
<td>

Importance score

</td>
</tr>
<tr>
<td>

`category`

</td>
<td>

`string`

</td>
<td>

`MEMORY_TYPES.MANUAL`

</td>
<td>

Memory category

</td>
</tr>
<tr>
<td>

`metadata`

</td>
<td>

`any`

</td>
<td>

`{}`

</td>
<td>

Additional metadata

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`string`&gt;

- Memory ID

##### Example

```ts
await agent.remember("User prefers meetings in the morning", 8, 'preference', {
  source: 'manual',
  confidence: 0.9
});
```

#### resetSession()

```ts
resetSession(): void;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:1002](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L1002)

Reset session and clear conversation history

##### Returns

`void`

#### updateAnalytics()

```ts
updateAnalytics(tokensUsed: any, responseTime: any): void;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:893](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L893)

Update analytics

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`tokensUsed`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`responseTime`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

***

## SimpleMemory

Defined in: [packages/ai-research-agent/src/agents/memory.js:56](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L56)

Simple Memory Class - Core memory management functionality

Features:
- Message deduplication
- Automatic summarization
- Vector-based relevance search
- Caching with TTL
- Batch processing
- Conflict resolution

### Constructors

#### Constructor

```ts
new SimpleMemory(
   userId: string, 
   db: any, 
   options: object): SimpleMemory;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:69](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L69)

Initialize memory system for a user

##### Parameters

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

`userId`

</td>
<td>

`string`

</td>
<td>

Unique user identifier

</td>
</tr>
<tr>
<td>

`db`

</td>
<td>

`any`

</td>
<td>

Database connection

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

\{ `cacheExpiry`: `number`; `enableAutoSummarization`: `boolean`; `enableVectorSearch`: `boolean`; `maxMemories`: `number`; `summaryThreshold`: `number`; \}

</td>
<td>

Configuration options

</td>
</tr>
<tr>
<td>

`options.cacheExpiry`

</td>
<td>

`number`

</td>
<td>

Cache TTL in milliseconds

</td>
</tr>
<tr>
<td>

`options.enableAutoSummarization`

</td>
<td>

`boolean`

</td>
<td>

Enable auto-summarization

</td>
</tr>
<tr>
<td>

`options.enableVectorSearch`

</td>
<td>

`boolean`

</td>
<td>

Enable vector-based search

</td>
</tr>
<tr>
<td>

`options.maxMemories`

</td>
<td>

`number`

</td>
<td>

Maximum memories to store

</td>
</tr>
<tr>
<td>

`options.summaryThreshold`

</td>
<td>

`number`

</td>
<td>

Messages before auto-summarization

</td>
</tr>
</tbody>
</table>

##### Returns

[`SimpleMemory`](#simplememory)

### Properties

#### batchSize

```ts
batchSize: any;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:79](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L79)

#### cacheExpiry

```ts
cacheExpiry: number;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:78](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L78)

#### db

```ts
db: any;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:75](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L75)

#### enableAutoSummarization

```ts
enableAutoSummarization: boolean;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:84](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L84)

#### enableVectorSearch

```ts
enableVectorSearch: boolean;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:83](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L83)

#### isProcessing

```ts
isProcessing: boolean;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:89](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L89)

#### maxMemories

```ts
maxMemories: number;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:76](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L76)

#### memoryCache

```ts
memoryCache: Map<any, any>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:88](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L88)

#### metrics

```ts
metrics: object;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:93](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L93)

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`cacheHits`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:94](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L94)

</td>
</tr>
<tr>
<td>

`cacheMisses`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:95](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L95)

</td>
</tr>
<tr>
<td>

`errors`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:98](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L98)

</td>
</tr>
<tr>
<td>

`summarizations`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:97](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L97)

</td>
</tr>
<tr>
<td>

`vectorSearches`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:96](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L96)

</td>
</tr>
</tbody>
</table>

#### processingQueue

```ts
processingQueue: any[];
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:90](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L90)

#### recentMessages

```ts
recentMessages: any[];
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:87](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L87)

#### relevanceThreshold

```ts
relevanceThreshold: any;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:80](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L80)

#### summarizeTimeout

```ts
summarizeTimeout: Timeout;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:161](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L161)

#### summaryThreshold

```ts
summaryThreshold: number;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:77](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L77)

#### userId

```ts
userId: string;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:74](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L74)

### Methods

#### addMessage()

```ts
addMessage(
   role: string, 
   content: string, 
   metadata: any): boolean;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:114](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L114)

Add a message to current session with intelligent deduplication

##### Parameters

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

`role`

</td>
<td>

`string`

</td>
<td>

Message role ('user' or 'assistant')

</td>
</tr>
<tr>
<td>

`content`

</td>
<td>

`string`

</td>
<td>

Message content

</td>
</tr>
<tr>
<td>

`metadata`

</td>
<td>

`any`

</td>
<td>

Additional message metadata

</td>
</tr>
</tbody>
</table>

##### Returns

`boolean`

- Whether message was added

##### Example

```ts
memory.addMessage('user', 'Hello, how are you?', { timestamp: Date.now() });
memory.addMessage('assistant', 'I am doing well, thank you!');
```

#### applyVectorSearch()

```ts
applyVectorSearch(
   query: any, 
   memories: any, 
   options: any): Promise<any>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:394](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L394)

Apply vector search to memories

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`query`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`memories`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`any`&gt;

#### clearCache()

```ts
clearCache(): void;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:548](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L548)

Clear cache utility

##### Returns

`void`

#### debouncedSummarize()

```ts
debouncedSummarize(): void;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:156](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L156)

Debounced summarization to prevent excessive processing

##### Returns

`void`

#### extractFactsFromConversation()

```ts
extractFactsFromConversation(conversationText: any): Promise<any[]>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:493](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L493)

Extract facts from conversation using LLM

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`conversationText`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`any`[]&gt;

#### fetchMemoriesFromDB()

```ts
fetchMemoriesFromDB(
   query: any, 
   limit: any, 
   options: any): Promise<any>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:364](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L364)

Fetch memories from database with filtering

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`query`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`limit`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`any`&gt;

#### findSimilarFacts()

```ts
findSimilarFacts(content: string): Promise<any[]>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:243](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L243)

Find similar facts using content similarity

##### Parameters

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

`content`

</td>
<td>

`string`

</td>
<td>

Content to find similar facts for

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`any`[]&gt;

- Similar facts

#### getMemoryContext()

```ts
getMemoryContext(
   query: string, 
   includeRecent: boolean, 
   options: any): Promise<string>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:566](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L566)

Get memory context with better formatting and relevance

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`query`

</td>
<td>

`string`

</td>
<td>

`''`

</td>
<td>

Context query

</td>
</tr>
<tr>
<td>

`includeRecent`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

Include recent messages

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
<td>

`{}`

</td>
<td>

Context options

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`string`&gt;

- Formatted context

##### Example

```ts
const context = await memory.getMemoryContext('work meeting', true, {
  maxMemories: 5,
  minImportance: 3
});
```

#### getMetrics()

```ts
getMetrics(): object;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:608](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L608)

Get performance metrics

##### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`cacheHits`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:94](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L94)

</td>
</tr>
<tr>
<td>

`cacheMisses`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:95](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L95)

</td>
</tr>
<tr>
<td>

`cacheSize`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:611](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L611)

</td>
</tr>
<tr>
<td>

`errors`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:98](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L98)

</td>
</tr>
<tr>
<td>

`isProcessing`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:613](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L613)

</td>
</tr>
<tr>
<td>

`recentMessagesCount`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:612](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L612)

</td>
</tr>
<tr>
<td>

`summarizations`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:97](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L97)

</td>
</tr>
<tr>
<td>

`vectorSearches`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:96](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L96)

</td>
</tr>
</tbody>
</table>

#### processFactsInBatches()

```ts
processFactsInBatches(factsResponse: any): Promise<void>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:514](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L514)

Process facts in batches to avoid overwhelming the database

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`factsResponse`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`void`&gt;

#### recallRelevantMemories()

```ts
recallRelevantMemories(
   query: string, 
   limit: number, 
   options: any): Promise<any[]>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:302](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L302)

Enhanced memory recall with caching and vector search

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`query`

</td>
<td>

`string`

</td>
<td>

`''`

</td>
<td>

Search query

</td>
</tr>
<tr>
<td>

`limit`

</td>
<td>

`number`

</td>
<td>

`10`

</td>
<td>

Maximum results

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`any`

</td>
<td>

`{}`

</td>
<td>

Search options

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`any`[]&gt;

- Relevant memories

##### Example

```ts
// Search for work-related memories
const workMemories = await memory.recallRelevantMemories('work', 10);

// Get most important memories
const importantMemories = await memory.recallRelevantMemories('', 5);

// Search with specific options
const recentMemories = await memory.recallRelevantMemories('meeting', 10, { 
  minImportance: 5, 
  includeMetadata: true 
});
```

#### storeFact()

```ts
storeFact(
   content: string, 
   importance: number, 
   category: string, 
   metadata: any): Promise<string>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:182](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L182)

Store important facts with validation and conflict resolution

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`content`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

Fact content

</td>
</tr>
<tr>
<td>

`importance`

</td>
<td>

`number`

</td>
<td>

`1`

</td>
<td>

Importance score (0-10)

</td>
</tr>
<tr>
<td>

`category`

</td>
<td>

`string`

</td>
<td>

`MEMORY_TYPES.FACT`

</td>
<td>

Memory category

</td>
</tr>
<tr>
<td>

`metadata`

</td>
<td>

`any`

</td>
<td>

`{}`

</td>
<td>

Additional metadata

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`string`&gt;

- Memory ID

##### Example

```ts
await memory.storeFact('User prefers dark mode', 8, 'preference', { source: 'conversation' });
await memory.storeFact('User works at Google', 9, 'personal', { confidence: 0.95 });
```

#### summarizeAndStore()

```ts
summarizeAndStore(): Promise<boolean>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:451](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L451)

Improved summarization with error handling and batch processing

##### Returns

`Promise`&lt;`boolean`&gt;

- Success status

#### updateMemory()

```ts
updateMemory(id: string, updates: any): Promise<void>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:274](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L274)

Update memory record

##### Parameters

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

`id`

</td>
<td>

`string`

</td>
<td>

Memory ID

</td>
</tr>
<tr>
<td>

`updates`

</td>
<td>

`any`

</td>
<td>

Fields to update

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`void`&gt;

#### updateRelevanceScores()

```ts
updateRelevanceScores(memories: any, sentencesByRelevance: any): Promise<void>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:426](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L426)

Update relevance scores for memories

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`memories`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`sentencesByRelevance`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`&lt;`void`&gt;

***

## MEMORY\_CONFIG

```ts
const MEMORY_CONFIG: object;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:20](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L20)

Configuration constants for memory management

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="auto_summarization_enabled"></a> `AUTO_SUMMARIZATION_ENABLED`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:30](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L30)

</td>
</tr>
<tr>
<td>

<a id="default_batch_size"></a> `DEFAULT_BATCH_SIZE`

</td>
<td>

`number`

</td>
<td>

`5`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:24](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L24)

</td>
</tr>
<tr>
<td>

<a id="default_cache_expiry"></a> `DEFAULT_CACHE_EXPIRY`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:23](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L23)

</td>
</tr>
<tr>
<td>

<a id="default_importance_range"></a> `DEFAULT_IMPORTANCE_RANGE`

</td>
<td>

\{
  `max`: `number`;
  `min`: `number`;
\}

</td>
<td>

&hyphen;

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:26](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L26)

</td>
</tr>
<tr>
<td>

<a id="default_max_memories"></a> `DEFAULT_MAX_MEMORIES`

</td>
<td>

`number`

</td>
<td>

`100`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L21)

</td>
</tr>
<tr>
<td>

<a id="default_rate_limit"></a> `DEFAULT_RATE_LIMIT`

</td>
<td>

\{
  `requests`: `number`;
  `windowMs`: `number`;
\}

</td>
<td>

&hyphen;

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:27](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L27)

</td>
</tr>
<tr>
<td>

<a id="default_relevance_threshold"></a> `DEFAULT_RELEVANCE_THRESHOLD`

</td>
<td>

`number`

</td>
<td>

`0.3`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:25](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L25)

</td>
</tr>
<tr>
<td>

<a id="default_summary_threshold"></a> `DEFAULT_SUMMARY_THRESHOLD`

</td>
<td>

`number`

</td>
<td>

`10`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:22](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L22)

</td>
</tr>
<tr>
<td>

<a id="default_timeout"></a> `DEFAULT_TIMEOUT`

</td>
<td>

`number`

</td>
<td>

`30000`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:28](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L28)

</td>
</tr>
<tr>
<td>

<a id="vector_search_enabled"></a> `VECTOR_SEARCH_ENABLED`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:29](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L29)

</td>
</tr>
</tbody>
</table>

***

## MEMORY\_TYPES

```ts
const MEMORY_TYPES: object;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:36](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L36)

Memory types for categorization

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="conversation"></a> `CONVERSATION`

</td>
<td>

`string`

</td>
<td>

`'conversation'`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:38](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L38)

</td>
</tr>
<tr>
<td>

<a id="fact"></a> `FACT`

</td>
<td>

`string`

</td>
<td>

`'fact'`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:37](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L37)

</td>
</tr>
<tr>
<td>

<a id="manual"></a> `MANUAL`

</td>
<td>

`string`

</td>
<td>

`'manual'`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:42](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L42)

</td>
</tr>
<tr>
<td>

<a id="personal"></a> `PERSONAL`

</td>
<td>

`string`

</td>
<td>

`'personal'`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:40](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L40)

</td>
</tr>
<tr>
<td>

<a id="preference"></a> `PREFERENCE`

</td>
<td>

`string`

</td>
<td>

`'preference'`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:39](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L39)

</td>
</tr>
<tr>
<td>

<a id="work"></a> `WORK`

</td>
<td>

`string`

</td>
<td>

`'work'`

</td>
<td>

[packages/ai-research-agent/src/agents/memory.js:41](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L41)

</td>
</tr>
</tbody>
</table>

***

## createMemorySchema()

```ts
function createMemorySchema(db: any): any;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:1015](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L1015)

Database schema for memory system

### Parameters

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

`db`

</td>
<td>

`any`

</td>
<td>

Database instance

</td>
</tr>
</tbody>
</table>

### Returns

`any`

- Schema definition

***

## exampleUsage()

```ts
function exampleUsage(db: any): Promise<void>;
```

Defined in: [packages/ai-research-agent/src/agents/memory.js:1037](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/memory.js#L1037)

Comprehensive usage example with error handling

### Parameters

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

`db`

</td>
<td>

`any`

</td>
<td>

Database connection

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`void`&gt;
