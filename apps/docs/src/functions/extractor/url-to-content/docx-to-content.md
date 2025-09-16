[ai-research-agent](../../modules.md) / extractor/url-to-content/docx-to-content

## Extract

### convertDOCXToHTML()

```ts
function convertDOCXToHTML(input: string | ArrayBuffer | File | Blob, options?: DocxOptions): Promise<string>;
```

Defined in: [src/extractor/url-to-content/docx-to-content.js:54](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L54)

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

`string` \| `ArrayBuffer` \| `File` \| `Blob`

</td>
<td>

DOCX input to convert

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`DocxOptions`](#docxoptions)

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

Defined in: [src/extractor/url-to-content/docx-to-content.js:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L5)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="imgpath"></a> `imgPath?`

</td>
<td>

`string`

</td>
<td>

Base path for image resources

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:8](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L8)

</td>
</tr>
<tr>
<td>

<a id="includestyles"></a> `includeStyles?`

</td>
<td>

`boolean`

</td>
<td>

Whether to include document styles

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:7](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L7)

</td>
</tr>
<tr>
<td>

<a id="preserveshapes"></a> `preserveShapes?`

</td>
<td>

`boolean`

</td>
<td>

Whether to preserve shape elements

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L6)

</td>
</tr>
</tbody>
</table>

***

### ParagraphStyle

Defined in: [src/extractor/url-to-content/docx-to-content.js:220](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L220)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="alignment"></a> `alignment?`

</td>
<td>

`string`

</td>
<td>

Text alignment (left, right, center, justify)

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:221](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L221)

</td>
</tr>
<tr>
<td>

<a id="indentation"></a> `indentation?`

</td>
<td>

`string`

</td>
<td>

Paragraph indentation

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:223](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L223)

</td>
</tr>
<tr>
<td>

<a id="keepnext"></a> `keepNext?`

</td>
<td>

`boolean`

</td>
<td>

Keep with next paragraph

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:224](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L224)

</td>
</tr>
<tr>
<td>

<a id="pagebreakbefore"></a> `pageBreakBefore?`

</td>
<td>

`boolean`

</td>
<td>

Force page break before

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:225](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L225)

</td>
</tr>
<tr>
<td>

<a id="spacing"></a> `spacing?`

</td>
<td>

`string`

</td>
<td>

Line spacing

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:222](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L222)

</td>
</tr>
</tbody>
</table>

***

### RunStyle

Defined in: [src/extractor/url-to-content/docx-to-content.js:229](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L229)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bold"></a> `bold?`

</td>
<td>

`boolean`

</td>
<td>

Bold text

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:230](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L230)

</td>
</tr>
<tr>
<td>

<a id="color"></a> `color?`

</td>
<td>

`string`

</td>
<td>

Text color

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:233](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L233)

</td>
</tr>
<tr>
<td>

<a id="font"></a> `font?`

</td>
<td>

`string`

</td>
<td>

Font family

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:236](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L236)

</td>
</tr>
<tr>
<td>

<a id="highlight"></a> `highlight?`

</td>
<td>

`string`

</td>
<td>

Highlight color

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:234](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L234)

</td>
</tr>
<tr>
<td>

<a id="italic"></a> `italic?`

</td>
<td>

`boolean`

</td>
<td>

Italic text

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:231](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L231)

</td>
</tr>
<tr>
<td>

<a id="size"></a> `size?`

</td>
<td>

`string`

</td>
<td>

Font size

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:235](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L235)

</td>
</tr>
<tr>
<td>

<a id="underline"></a> `underline?`

</td>
<td>

`boolean`

</td>
<td>

Underlined text

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:232](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L232)

</td>
</tr>
</tbody>
</table>

***

### StyleConfig

Defined in: [src/extractor/url-to-content/docx-to-content.js:13](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L13)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="block"></a> `block`

</td>
<td>

`boolean`

</td>
<td>

If true, element is rendered as block

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:14](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L14)

</td>
</tr>
<tr>
<td>

<a id="class"></a> `class?`

</td>
<td>

`string`

</td>
<td>

CSS class name

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:18](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L18)

</td>
</tr>
<tr>
<td>

<a id="element"></a> `element`

</td>
<td>

`string`

</td>
<td>

HTML element name

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:16](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L16)

</td>
</tr>
<tr>
<td>

<a id="heading"></a> `heading?`

</td>
<td>

`boolean`

</td>
<td>

If true, element is a heading

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:15](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L15)

</td>
</tr>
<tr>
<td>

<a id="xmlname"></a> `xmlName?`

</td>
<td>

`string`

</td>
<td>

DOCX XML element name

</td>
<td>

[src/extractor/url-to-content/docx-to-content.js:17](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/docx-to-content.js#L17)

</td>
</tr>
</tbody>
</table>
