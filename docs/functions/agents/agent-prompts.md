[ai-research-agent](../modules.md) / agents/agent-prompts

## Generate

### getAgentPrompts()

```ts
function getAgentPrompts(agentName, options?): 
  | {
  name: string;
  prompt: string;
  tools: any[];
 }
  | {
  error: string;
}
```

### Agent Prompts

 1. summarize-bullets:
       - article
   2. summarize:
       - article
   3. suggest-followups:
       - chat_history
       - article
   4. answer:
       - chat_history
       - query
   5. query-resolution:
       - chat_history
       - query
   6. knowledge-graph-nodes:
       - query
       - article
   7. summary-longtext:
       - article
       - sections 

Returns an object with agent prompts based on the provided agent name and options
Uses regex to detect any variables in %7Bbrackets%7D in the prompts
and replace them with values from the options object
Values inside brackets must be the matching variable name

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

`agentName`

</td>
<td>

`any`

</td>
<td>

The name of the agent to generate prompts for.

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`any`

</td>
<td>

An options object that can contain the following
  properties:
  - `context`: An object containing context variables to be used when
    generating the prompts.variablesNotProvided

</td>
</tr>
</tbody>
</table>

#### Returns

  \| \{
  `name`: `string`;
  `prompt`: `string`;
  `tools`: `any`[];
 \}
  \| \{
  `error`: `string`;
 \}

An object with agent prompts.

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

#### Example

```ts
var prompt = getAgentPrompts("summarize-bullets", {article})
```
