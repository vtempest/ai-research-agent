[Documentation](../../modules.md) / extractor/html-to-cite/url-to-favicon

## Extract

### convertFaviconToBase64String()

```ts
function convertFaviconToBase64String(url: string, size?: number): Promise<string>;
```

Defined in: extractor/html-to-cite/url-to-favicon.js:17

Convert a ICO/PNG favicon from URL using npm sharp into 16px
image base64 string. This prevents the need for many requests
to fetch for each site's favicon which can cause delays.

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

`url`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The URL of the favicon

</td>
</tr>
<tr>
<td>

`size?`

</td>
<td>

`number`

</td>
<td>

`16`

</td>
<td>

Pixel size of the resized favicon

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;

Base64  string of resized favicon

#### Throws

If there's an issue downloading or processing

#### Example

```ts
const base64String = await
 convertFaviconToBase64String('https://www.amazon.com/favicon.ico');
console.log(base64String);
```
