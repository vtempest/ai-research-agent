[Documentation](../modules.md) / agents/agent-prompts

## Generate

### AGENT\_PROMPTS

```ts
const AGENT_PROMPTS: (
  | {
  after: any;
  before: (prompt: any, params: any) => any;
  name: string;
  prompt: string;
}
  | {
  after: (content: any, options: object) => any[];
  before?: undefined;
  name: string;
  prompt: string;
})[];
```

Defined in: agents/agent-prompts.js:12

Agent prompt templates which have in brackets the needed 
variables and reformat the response in json with a callback.

***

### extractJSONFromLanguageReply()

```ts
function extractJSONFromLanguageReply(text: string, key?: string): any[];
```

Defined in: agents/agent-prompts.js:241

This function extracts and cleans content between XML-style tags and returns a JSON object.

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
