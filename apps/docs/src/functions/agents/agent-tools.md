[ai-research-agent](../modules.md) / agents/agent-tools

## AGENT\_TOOLS

```ts
const AGENT_TOOLS: object[];
```

Defined in: [src/agents/agent-tools.js:3](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/agent-tools.js#L3)

### Type Declaration

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

`description`

</td>
<td>

`string`

</td>
<td>

`"Get current weather for a city. Input: city name. Returns temperature, conditions, and forecast."`

</td>
<td>

[src/agents/agent-tools.js:7](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/agent-tools.js#L7)

</td>
</tr>
<tr>
<td>

`func()`

</td>
<td>

(`location`: `any`) => `Promise`&lt;`string`&gt;

</td>
<td>

&hyphen;

</td>
<td>

[src/agents/agent-tools.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/agent-tools.js#L10)

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`"get_weather"`

</td>
<td>

[src/agents/agent-tools.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/agent-tools.js#L6)

</td>
</tr>
<tr>
<td>

`schema`

</td>
<td>

`ZodObject`&lt;\{
  `location`: `ZodString`;
\}, `"strip"`, `ZodTypeAny`, \{
  `location?`: `string`;
\}, \{
  `location?`: `string`;
\}&gt;

</td>
<td>

&hyphen;

</td>
<td>

[src/agents/agent-tools.js:9](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/agent-tools.js#L9)

</td>
</tr>
</tbody>
</table>
