[Documentation](../modules.md) / datasets/compress-json-jz64

## compressBase64ZipText()

```ts
function compressBase64ZipText(dataOrZip: string, options?: object): Promise<string>;
```

Defined in: datasets/compress-json-jz64.js:14

Compress/decompress any data (such as JSON or text) with JSZip then 
convert zip binary to a Base64Zip text string which is easier to
 store in db or files.

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

`dataOrZip`

</td>
<td>

`string`

</td>
<td>

data to compress, or Base64Zip to decompress

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `compressionLevel`: `number`; `decompress`: `boolean`; \}

</td>
<td>

*

</td>
</tr>
<tr>
<td>

`options.compressionLevel?`

</td>
<td>

`number`

</td>
<td>

default=9 0-9, 9 has smallest size  at ~40%  but takes longer

</td>
</tr>
<tr>
<td>

`options.decompress?`

</td>
<td>

`boolean`

</td>
<td>

default=false  false to compress, true to decompress

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`string`&gt;

base64-encoded string of the zipped data
