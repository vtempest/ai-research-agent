[Documentation](../modules.md) / agents/api2ai

## Generate

### convertOpenAPIToAgentTools()

```ts
function convertOpenAPIToAgentTools(fileContents: string): any[];
```

Defined in: agents/api2ai.js:21

### API2AI
<img width="350px"  src="https://i.imgur.com/AvFLGdR.png" />

Translates any website's OpenAPI.yml file to LLM agent tool
LangChain.js function format

[List of public apis](https://github.com/public-apis/public-apis)
[publicapis](https://publicapis.dev/category/business)

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

`any`[]

Array of tool use function objects

#### Example

```ts
const fileContents = fs.readFileSync(yamlPath, 'utf8');
const tools = convertOpenAPIToAgentTools(fileContents);
```
