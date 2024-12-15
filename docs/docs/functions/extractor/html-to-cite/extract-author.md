[ai-research-agent](../../index.md) / extractor/html-to-cite/extract-author

## Functions

### extractAuthor()

```ts
function extractAuthor(document): null | object
```

Extracts the author from the document and validates it as a human name

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

#### Returns

`null` \| `object`

author_cite, author_short, author_type - or null if no valid author found
