[ai-research-agent](../modules.md) / agents/api2ai

## Generate

### convertOpenAPIToLangChainTools()

```ts
function convertOpenAPIToLangChainTools(fileContents: string): string;
```

Defined in: [src/agents/api2ai.js:22](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/agents/api2ai.js#L22)

### API2AI 

Translates any website's OpenAPI.yml file to LLM agent tool
format with Zod schemas for validation, and returns the content
of a tools.js file that exports these tools

[List of public apis](https://github.com/public-apis/public-apis)
[public apis](https://publicapis.dev/category/business)

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

`fileContents`

</td>
<td>

`string`

</td>
<td>

OpenAPI YAML file contents

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

Content of tools.js file with exported tools

#### Example

```ts
const fileContents = fs.readFileSync(yamlPath, 'utf8');
const toolsFileContent = convertOpenAPIToAgentTools(fileContents);
fs.writeFileSync('tools.js', toolsFileContent);
```
