[ai-research-agent](../../modules.md) / extractor/html-to-cite/extract-author

## extractAuthor()

```ts
function extractAuthor(document: Document): any;
```

Defined in: [src/extractor/html-to-cite/extract-author.js:53](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/extract-author.js#L53)

Extracts the author from the document and validates it as a human name

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

</td>
</tr>
</tbody>
</table>

### Returns

`any`

author_cite, author_short, author_type - or null if no valid author found
