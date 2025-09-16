[ai-research-agent](../../../modules.md) / extractor/html-to-cite/extract-date/extract-date-quick

## extractDateQuick()

```ts
function extractDateQuick(document: Document, url: string): string;
```

Defined in: [src/extractor/html-to-cite/extract-date/extract-date-quick.js:61](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-date/extract-date-quick.js#L61)

Extract date from document using various methods

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

`document`

</td>
<td>

`Document`

</td>
<td>

DOM object with article content

</td>
</tr>
<tr>
<td>

`url`

</td>
<td>

`string`

</td>
<td>

URL of the page

</td>
</tr>
</tbody>
</table>

### Returns

`string`

Extracted date or null if not found
