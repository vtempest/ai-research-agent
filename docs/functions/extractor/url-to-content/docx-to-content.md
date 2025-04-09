[ai-research-agent](../../modules.md) / extractor/url-to-content/docx-to-content

## Extract

### convertDOCXToHTML()

```ts
function convertDOCXToHTML(input, options?): Promise<string>
```

Converts a DOCX document to HTML

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

`input`

</td>
<td>

`string` \| `Blob` \| `ArrayBuffer` \| `File`

</td>
<td>

DOCX input to convert

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

[`DocxOptions`](docx-to-content.md#docxoptions)

</td>
<td>

Conversion options

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;

The converted HTML

#### Throws

If conversion fails

#### Example

```ts
const html = await convertDOCXToHTML('https://example.com/doc.docx');
const html = await convertDOCXToHTML(fileInput.files[0]);
```

## Other

### DocxOptions

#### Properties

##### imgPath?

```ts
optional imgPath: string;
```

Base path for image resources

##### includeStyles?

```ts
optional includeStyles: boolean;
```

Whether to include document styles

##### preserveShapes?

```ts
optional preserveShapes: boolean;
```

Whether to preserve shape elements

***

### ParagraphStyle

#### Properties

##### alignment?

```ts
optional alignment: string;
```

Text alignment (left, right, center, justify)

##### indentation?

```ts
optional indentation: string;
```

Paragraph indentation

##### keepNext?

```ts
optional keepNext: boolean;
```

Keep with next paragraph

##### pageBreakBefore?

```ts
optional pageBreakBefore: boolean;
```

Force page break before

##### spacing?

```ts
optional spacing: string;
```

Line spacing

***

### RunStyle

#### Properties

##### bold?

```ts
optional bold: boolean;
```

Bold text

##### color?

```ts
optional color: string;
```

Text color

##### font?

```ts
optional font: string;
```

Font family

##### highlight?

```ts
optional highlight: string;
```

Highlight color

##### italic?

```ts
optional italic: boolean;
```

Italic text

##### size?

```ts
optional size: string;
```

Font size

##### underline?

```ts
optional underline: boolean;
```

Underlined text

***

### StyleConfig

#### Properties

##### block

```ts
block: boolean;
```

If true, element is rendered as block

##### class?

```ts
optional class: string;
```

CSS class name

##### element

```ts
element: string;
```

HTML element name

##### heading?

```ts
optional heading: boolean;
```

If true, element is a heading

##### xmlName?

```ts
optional xmlName: string;
```

DOCX XML element name
