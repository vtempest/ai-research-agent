[ai-research-agent](../../modules.md) / extractor/html-to-cite/metadata-to-cite

## extractCiteFromMetadata()

```ts
function extractCiteFromMetadata(doc: Document): any;
```

Defined in: [src/extractor/html-to-cite/metadata-to-cite.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/html-to-cite/metadata-to-cite.js#L6)

Extract cite info from common property names in webpage's metadata

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

`doc`

</td>
<td>

`Document`

</td>
<td>

dom object of document

</td>
</tr>
</tbody>
</table>

### Returns

`any`

author, date, title, source
