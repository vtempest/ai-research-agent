[qwksearch-web-app](../../../../modules.md) / lib/components/Editor/docx/docx-to-html

## Functions

### createStyleParser()

```ts
function createStyleParser(styleXML): Promise<any>
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`styleXML`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

***

### createTokenizer()

```ts
function createTokenizer(docXML, styleData): any[]
```

Parses doc xml to tokenize each text range into obj:
text: "", format underline, strong, mark

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

`docXML`

</td>
<td>

`string`

</td>
<td>

string from docx unzip

</td>
</tr>
<tr>
<td>

`styleData`

</td>
<td>

`any`

</td>
<td>

parsed object of style class names

</td>
</tr>
</tbody>
</table>

#### Returns

`any`[]

blocks

***

### documentToMarkup()

```ts
function documentToMarkup(filepath): Promise<string>
```

1 - open document.xml
2 - tokenize xml
3 - reconstruct cleaned html

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`filepath`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;

***

### documentToTokens()

```ts
function documentToTokens(docxInput, options): Promise<any[]>
```

Converts docx file to array or token objects with text and formatting
 1 - open document.xml and styles.xml by unzipping .docx file
 2 - tokenize document.xml and pull info on named styles from styles.xml

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

`docxInput`

</td>
<td>

`string` \| `ArrayBuffer` \| `Blob` \| `File`

</td>
<td>

File Path, File object, Blob, or ArrayBuffer of a DOCX file

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

simplified: boolean

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`[]&gt;

Array of token objects with text and formatting
