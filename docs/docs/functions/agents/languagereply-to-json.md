[ai-research-agent](../index.md) / agents/languagereply-to-json

## Generate

### convertLanguageReplyToJSON()

```ts
function convertLanguageReplyToJSON(text, key?): Object[]
```

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

`key`?

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

`Object`[]

Array of objects containing cleaned content items
