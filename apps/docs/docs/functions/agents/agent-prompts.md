[Documentation](../README.md) / agents/agent-prompts

## Generate

### extractJSONFromLanguageReply()

```ts
function extractJSONFromLanguageReply(text: string, key?: string): any[];
```

Defined in: [packages/ai-research-agent/src/agents/agent-prompts.js:244](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/agent-prompts.js#L244)

Extracts and cleans content between XML-style tags and returns a JSON object.

#### Parameters

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

`text`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

Input text to parse

</td>
</tr>
<tr>
<td>

`key?`

</td>
<td>

`string`

</td>
<td>

`null`

</td>
<td>

Tag name to look for

</td>
</tr>
</tbody>
</table>

#### Returns

`any`[]

Array of objects containing cleaned content items

***

### AGENT\_PROMPTS

```ts
const AGENT_PROMPTS: (
  | {
  name: string;
  template: string;
  before: (prompt: any, params: any) => any;
  after: any;
}
  | {
  name: string;
  template: string;
  after: (content: any, options: object) => any[];
  before?: undefined;
})[];
```

Defined in: [packages/ai-research-agent/src/agents/agent-prompts.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/agent-prompts.js#L12)

Agent prompt templates which have in brackets the needed 
variables and reformat the response in json with a callback.
