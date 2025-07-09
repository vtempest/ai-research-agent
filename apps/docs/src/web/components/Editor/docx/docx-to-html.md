[Documentation](../../../modules.md) / components/Editor/docx/docx-to-html

## createStyleParser()

```ts
function createStyleParser(styleXML: any): Promise<any>;
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-to-html.js:68](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-to-html.js#L68)

### Parameters

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

### Returns

`Promise`&lt;`any`&gt;

***

## createTokenizer()

```ts
function createTokenizer(docXML: string, styleData: any): any[];
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-to-html.js:118](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-to-html.js#L118)

Parses doc xml to tokenize each text range into obj:
text: "", format underline, strong, mark

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

### Returns

`any`[]

blocks

***

## documentToMarkup()

```ts
function documentToMarkup(filepath: any): Promise<string>;
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-to-html.js:62](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-to-html.js#L62)

1 - open document.xml
2 - tokenize xml
3 - reconstruct cleaned html

### Parameters

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

### Returns

`Promise`&lt;`string`&gt;

***

## documentToTokens()

```ts
function documentToTokens(docxInput: string | Blob | ArrayBuffer | File, options: any): Promise<any[]>;
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-to-html.js:14](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-to-html.js#L14)

Converts docx file to array or token objects with text and formatting
 1 - open document.xml and styles.xml by unzipping .docx file
 2 - tokenize document.xml and pull info on named styles from styles.xml

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

`docxInput`

</td>
<td>

`string` \| `Blob` \| `ArrayBuffer` \| `File`

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

### Returns

`Promise`&lt;`any`[]&gt;

Array of token objects with text and formatting
