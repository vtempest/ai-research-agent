[Documentation](../../../modules.md) / extractor/pdf-to-html/util/is-url-pdf

## Extract

### isUrlPDF()

```ts
function isUrlPDF(url: string): Promise<boolean>;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/util/is-url-pdf.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/util/is-url-pdf.js#L12)

Detects if a given URL points to a PDF file by checking
the stream's first bytes for %PDF-  then ends  the request.
Useful for hidden pdf url that does not end with pdf

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

`url`

</td>
<td>

`string`

</td>
<td>

The URL to check.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`boolean`&gt;

True if the URL points to a PDF, false otherwise.

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)
