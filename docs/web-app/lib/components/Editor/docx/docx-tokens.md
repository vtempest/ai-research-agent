[qwksearch-web-app](../../../../modules.md) / lib/components/Editor/docx/docx-tokens

## Functions

### getDocxStyles()

```ts
function getDocxStyles(styles): any
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

`styles`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### getHeadingStyles()

```ts
function getHeadingStyles(): string[]
```

#### Returns

`string`[]

***

### getOutlineLvlName()

```ts
function getOutlineLvlName(outlineLvl): string
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

`outlineLvl`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

***

### getStyleNameByXml()

```ts
function getStyleNameByXml(elXmlName): string
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

`elXmlName`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

***

### getStyles()

```ts
function getStyles(): string[]
```

#### Returns

`string`[]

***

### simplifyTokens()

```ts
function simplifyTokens(block): object
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

`block`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type | Default value |
| ------ | ------ | ------ |
| `format` | `any` | block.format |
| `tokens` | `any` | simplifiedTokens |

***

### tokensToMarkup()

```ts
function tokensToMarkup(textBlocks, plainTextOnly): string
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`textBlocks`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`plainTextOnly`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

## Variables

### styleMap

```ts
const styleMap: object;
```

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`block`

</td>
<td>

\{
  `block`: `boolean`;
  `docxStyles`: \{
     `heading`: `number`;
     `outlineLevel`: `number`;
    \};
  `domElement`: `string`;
  `domSelector`: `string`[];
  `heading`: `boolean`;
  `xmlName`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`hat`

</td>
<td>

\{
  `block`: `boolean`;
  `docxStyles`: \{
     `heading`: `number`;
     `outlineLevel`: `number`;
    \};
  `domElement`: `string`;
  `domSelector`: `string`[];
  `heading`: `boolean`;
  `xmlName`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`mark`

</td>
<td>

\{
  `block`: `boolean`;
  `docxStyles`: \{
     `highlight`: `string`;
    \};
  `domElement`: `string`;
  `domSelector`: `string`[];
  `heading`: `boolean`;
 \}

</td>
</tr>
<tr>
<td>

`pocket`

</td>
<td>

\{
  `block`: `boolean`;
  `docxStyles`: \{
     `heading`: `number`;
     `outlineLevel`: `number`;
    \};
  `domElement`: `string`;
  `domSelector`: `string`[];
  `heading`: `boolean`;
  `xmlName`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`strong`

</td>
<td>

\{
  `block`: `boolean`;
  `docxStyles`: \{
     `bold`: `boolean`;
    \};
  `domElement`: `string`;
  `domSelector`: `string`[];
  `heading`: `boolean`;
 \}

</td>
</tr>
<tr>
<td>

`tag`

</td>
<td>

\{
  `block`: `boolean`;
  `docxStyles`: \{
     `heading`: `number`;
     `outlineLevel`: `number`;
    \};
  `domElement`: `string`;
  `domSelector`: `string`[];
  `heading`: `boolean`;
  `xmlName`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`text`

</td>
<td>

\{
  `block`: `boolean`;
  `domElement`: `string`;
  `domSelector`: `string`[];
  `heading`: `boolean`;
 \}

</td>
</tr>
<tr>
<td>

`underline`

</td>
<td>

\{
  `block`: `boolean`;
  `docxStyles`: \{
     `underline`: \{\};
    \};
  `domElement`: `string`;
  `domSelector`: `string`[];
  `heading`: `boolean`;
 \}

</td>
</tr>
</tbody>
</table>
