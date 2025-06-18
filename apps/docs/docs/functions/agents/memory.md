[Documentation](../README.md) / agents/memory

## SimpleMemory

Defined in: packages/ai-research-agent/src/agents/memory.js:57

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

Defined in: packages/ai-research-agent/src/agents/memory.js:70

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

\{ `maxMemories`: `number`; `summaryThreshold`: `number`; `cacheExpiry`: `number`; `enableVectorSearch`: `boolean`; `enableAutoSummarization`: `boolean`; \}

</td>
<td>

Configuration options

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

`options.enableAutoSummarization`

</td>
<td>

`boolean`

</td>
<td>

Enable auto-summarization

</td>
</tr>
</tbody>
</table>

##### Returns

[`SimpleMemory`](#simplememory)

### Properties

#### userId

```ts
userId: string;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:75

#### db

```ts
db: any;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:76

#### maxMemories

```ts
maxMemories: number;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:77

#### summaryThreshold

```ts
summaryThreshold: number;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:78

#### cacheExpiry

```ts
cacheExpiry: number;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:79

#### batchSize

```ts
batchSize: any;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:80

#### relevanceThreshold

```ts
relevanceThreshold: any;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:81

#### enableVectorSearch

```ts
enableVectorSearch: boolean;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:84

Feature flags

#### enableAutoSummarization

```ts
enableAutoSummarization: boolean;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:85

#### recentMessages

```ts
recentMessages: any[];
```

Defined in: packages/ai-research-agent/src/agents/memory.js:88

State management

#### memoryCache

```ts
memoryCache: Map<any, any>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:89

#### isProcessing

```ts
isProcessing: boolean;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:90

#### processingQueue

```ts
processingQueue: any[];
```

Defined in: packages/ai-research-agent/src/agents/memory.js:91

#### metrics

```ts
metrics: object;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:94

Performance metrics

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

packages/ai-research-agent/src/agents/memory.js:95

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

packages/ai-research-agent/src/agents/memory.js:96

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

packages/ai-research-agent/src/agents/memory.js:97

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

packages/ai-research-agent/src/agents/memory.js:98

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

packages/ai-research-agent/src/agents/memory.js:99

</td>
</tr>
</tbody>
</table>

#### summarizeTimeout

```ts
summarizeTimeout: Timeout;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:162

### Methods

#### addMessage()

```ts
addMessage(
   role: string, 
   content: string, 
   metadata: any): boolean;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:115

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

#### debouncedSummarize()

```ts
debouncedSummarize(): void;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:157

Debounced summarization to prevent excessive processing

##### Returns

`void`

#### storeFact()

```ts
storeFact(
   content: string, 
   importance: number, 
   category: string, 
   metadata: any): Promise<string>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:183

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

#### findSimilarFacts()

```ts
findSimilarFacts(content: string): Promise<any[]>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:244

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

#### updateMemory()

```ts
updateMemory(id: string, updates: any): Promise<void>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:275

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

#### recallRelevantMemories()

```ts
recallRelevantMemories(
   query: string, 
   limit: number, 
   options: any): Promise<any[]>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:303

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

#### fetchMemoriesFromDB()

```ts
fetchMemoriesFromDB(
   query: any, 
   limit: any, 
   options: any): Promise<any>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:365

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

#### applyVectorSearch()

```ts
applyVectorSearch(
   query: any, 
   memories: any, 
   options: any): Promise<any>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:395

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

#### updateRelevanceScores()

```ts
updateRelevanceScores(memories: any, sentencesByRelevance: any): Promise<void>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:427

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

#### summarizeAndStore()

```ts
summarizeAndStore(): Promise<boolean>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:452

Improved summarization with error handling and batch processing

##### Returns

`Promise`&lt;`boolean`&gt;

- Success status

#### extractFactsFromConversation()

```ts
extractFactsFromConversation(conversationText: any): Promise<any[]>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:494

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

#### processFactsInBatches()

```ts
processFactsInBatches(factsResponse: any): Promise<void>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:515

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

#### clearCache()

```ts
clearCache(): void;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:549

Clear cache utility

##### Returns

`void`

#### getMemoryContext()

```ts
getMemoryContext(
   query: string, 
   includeRecent: boolean, 
   options: any): Promise<string>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:567

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

Defined in: packages/ai-research-agent/src/agents/memory.js:609

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

`cacheSize`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

packages/ai-research-agent/src/agents/memory.js:612

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

packages/ai-research-agent/src/agents/memory.js:613

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

packages/ai-research-agent/src/agents/memory.js:614

</td>
</tr>
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

packages/ai-research-agent/src/agents/memory.js:95

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

packages/ai-research-agent/src/agents/memory.js:96

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

packages/ai-research-agent/src/agents/memory.js:97

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

packages/ai-research-agent/src/agents/memory.js:98

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

packages/ai-research-agent/src/agents/memory.js:99

</td>
</tr>
</tbody>
</table>

***

## MemoryAgent

Defined in: packages/ai-research-agent/src/agents/memory.js:631

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

Defined in: packages/ai-research-agent/src/agents/memory.js:645

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

\{ `memoryOptions`: `any`; `defaultProvider`: `string`; `defaultApiKey`: `string`; `defaultModel`: `string`; `rateLimit`: `any`; `providers`: `any`; \}

</td>
<td>

Configuration options

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

`options.rateLimit`

</td>
<td>

`any`

</td>
<td>

Rate limiting configuration

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
</tbody>
</table>

##### Returns

[`MemoryAgent`](#memoryagent)

### Properties

#### memory

```ts
memory: SimpleMemory;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:650

#### defaultProvider

```ts
defaultProvider: string;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:651

#### defaultApiKey

```ts
defaultApiKey: string;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:652

#### defaultModel

```ts
defaultModel: string;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:653

#### rateLimiter

```ts
rateLimiter: Map<any, any>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:656

Rate limiting

#### rateLimitConfig

```ts
rateLimitConfig: any;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:657

#### providers

```ts
providers: any;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:663

LLM providers

#### sessionId

```ts
sessionId: string;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:666

Session management

#### conversationHistory

```ts
conversationHistory: any[];
```

Defined in: packages/ai-research-agent/src/agents/memory.js:667

#### analytics

```ts
analytics: object;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:670

Analytics

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

`totalMessages`

</td>
<td>

`number`

</td>
<td>

`0`

</td>
<td>

packages/ai-research-agent/src/agents/memory.js:671

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

packages/ai-research-agent/src/agents/memory.js:672

</td>
</tr>
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

packages/ai-research-agent/src/agents/memory.js:673

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

packages/ai-research-agent/src/agents/memory.js:674

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

packages/ai-research-agent/src/agents/memory.js:675

</td>
</tr>
</tbody>
</table>

### Methods

#### getDefaultProviders()

```ts
getDefaultProviders(): object;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:682

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

packages/ai-research-agent/src/agents/memory.js:684

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

packages/ai-research-agent/src/agents/memory.js:690

</td>
</tr>
</tbody>
</table>

#### generateSessionId()

```ts
generateSessionId(): string;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:702

Generate unique session ID

##### Returns

`string`

#### checkRateLimit()

```ts
checkRateLimit(
   key: string, 
   maxRequests: number, 
   windowMs: number): boolean;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:714

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

#### chat()

```ts
chat(message: string, options: any): Promise<any>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:758

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

#### generateResponse()

```ts
generateResponse(prompt: any, options: any): Promise<any>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:838

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

#### buildPrompt()

```ts
buildPrompt(
   message: any, 
   memoryContext: any, 
   options: any): string;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:864

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

#### updateAnalytics()

```ts
updateAnalytics(tokensUsed: any, responseTime: any): void;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:894

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

#### remember()

```ts
remember(
   fact: string, 
   importance: number, 
   category: string, 
   metadata: any): Promise<string>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:921

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

#### getMemories()

```ts
getMemories(
   query: string, 
   limit: number, 
   options: any): Promise<any[]>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:949

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

#### forceStoreSummary()

```ts
forceStoreSummary(): Promise<boolean>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:956

Force store summary of current conversation

##### Returns

`Promise`&lt;`boolean`&gt;

#### healthCheck()

```ts
healthCheck(): Promise<any>;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:965

Health check for the agent

##### Returns

`Promise`&lt;`any`&gt;

- Health status

#### getAnalytics()

```ts
getAnalytics(): object;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:991

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

`memory`

</td>
<td>

\{
  `cacheSize`: `number`;
  `recentMessagesCount`: `number`;
  `isProcessing`: `boolean`;
  `cacheHits`: `number`;
  `cacheMisses`: `number`;
  `vectorSearches`: `number`;
  `summarizations`: `number`;
  `errors`: `number`;
\}

</td>
<td>

&hyphen;

</td>
<td>

packages/ai-research-agent/src/agents/memory.js:994

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

packages/ai-research-agent/src/agents/memory.js:995

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

packages/ai-research-agent/src/agents/memory.js:996

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

packages/ai-research-agent/src/agents/memory.js:671

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

packages/ai-research-agent/src/agents/memory.js:672

</td>
</tr>
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

packages/ai-research-agent/src/agents/memory.js:673

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

packages/ai-research-agent/src/agents/memory.js:674

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

packages/ai-research-agent/src/agents/memory.js:675

</td>
</tr>
</tbody>
</table>

#### resetSession()

```ts
resetSession(): void;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:1003

Reset session and clear conversation history

##### Returns

`void`

***

## MEMORY\_CONFIG

```ts
const MEMORY_CONFIG: object;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:21

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

<a id="default_max_memories"></a> `DEFAULT_MAX_MEMORIES`

</td>
<td>

`number`

</td>
<td>

`100`

</td>
<td>

packages/ai-research-agent/src/agents/memory.js:22

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

packages/ai-research-agent/src/agents/memory.js:23

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

packages/ai-research-agent/src/agents/memory.js:24

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

packages/ai-research-agent/src/agents/memory.js:25

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

packages/ai-research-agent/src/agents/memory.js:26

</td>
</tr>
<tr>
<td>

<a id="default_importance_range"></a> `DEFAULT_IMPORTANCE_RANGE`

</td>
<td>

\{
  `min`: `number`;
  `max`: `number`;
\}

</td>
<td>

&hyphen;

</td>
<td>

packages/ai-research-agent/src/agents/memory.js:27

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

packages/ai-research-agent/src/agents/memory.js:28

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

packages/ai-research-agent/src/agents/memory.js:29

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

packages/ai-research-agent/src/agents/memory.js:30

</td>
</tr>
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

packages/ai-research-agent/src/agents/memory.js:31

</td>
</tr>
</tbody>
</table>

***

## MEMORY\_TYPES

```ts
const MEMORY_TYPES: object;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:37

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

<a id="fact"></a> `FACT`

</td>
<td>

`string`

</td>
<td>

`'fact'`

</td>
<td>

packages/ai-research-agent/src/agents/memory.js:38

</td>
</tr>
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

packages/ai-research-agent/src/agents/memory.js:39

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

packages/ai-research-agent/src/agents/memory.js:40

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

packages/ai-research-agent/src/agents/memory.js:41

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

packages/ai-research-agent/src/agents/memory.js:42

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

packages/ai-research-agent/src/agents/memory.js:43

</td>
</tr>
</tbody>
</table>

***

## createMemorySchema()

```ts
function createMemorySchema(db: any): any;
```

Defined in: packages/ai-research-agent/src/agents/memory.js:1016

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

Defined in: packages/ai-research-agent/src/agents/memory.js:1038

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
