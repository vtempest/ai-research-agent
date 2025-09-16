[ai-research-agent](../../modules.md) / extractor/html-to-cite/human-names-recognize

## extractHumanName()

```ts
function extractHumanName(author: string, options: any): any;
```

Defined in: [src/extractor/html-to-cite/human-names-recognize.js:143](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/human-names-recognize.js#L143)

Validates and formats author names properly handling multiple authors and multi-word names

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

`author`

</td>
<td>

`string`

</td>
<td>

The author name string(s) to be processed

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

Configuration options

</td>
</tr>
</tbody>
</table>

### Returns

`any`

Formatted author information for citation
