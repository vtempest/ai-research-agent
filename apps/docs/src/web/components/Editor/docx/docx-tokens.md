[Documentation](../../../modules.md) / components/Editor/docx/docx-tokens

## styleMap

```ts
const styleMap: object;
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-tokens.js:102](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L102)

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="block"></a> `block`

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
<td>

[apps/web/src/lib/components/Editor/docx/docx-tokens.js:125](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L125)

</td>
</tr>
<tr>
<td>

<a id="hat"></a> `hat`

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
<td>

[apps/web/src/lib/components/Editor/docx/docx-tokens.js:114](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L114)

</td>
</tr>
<tr>
<td>

<a id="mark"></a> `mark`

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
<td>

[apps/web/src/lib/components/Editor/docx/docx-tokens.js:171](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L171)

</td>
</tr>
<tr>
<td>

<a id="pocket"></a> `pocket`

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
<td>

[apps/web/src/lib/components/Editor/docx/docx-tokens.js:103](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L103)

</td>
</tr>
<tr>
<td>

<a id="strong"></a> `strong`

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
<td>

[apps/web/src/lib/components/Editor/docx/docx-tokens.js:162](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L162)

</td>
</tr>
<tr>
<td>

<a id="tag"></a> `tag`

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
<td>

[apps/web/src/lib/components/Editor/docx/docx-tokens.js:136](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L136)

</td>
</tr>
<tr>
<td>

<a id="text"></a> `text`

</td>
<td>

\{
  `block`: `boolean`;
  `domElement`: `string`;
  `domSelector`: `string`[];
  `heading`: `boolean`;
\}

</td>
<td>

[apps/web/src/lib/components/Editor/docx/docx-tokens.js:147](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L147)

</td>
</tr>
<tr>
<td>

<a id="underline"></a> `underline`

</td>
<td>

\{
  `block`: `boolean`;
  `docxStyles`: \{
     `underline`: \{
     \};
  \};
  `domElement`: `string`;
  `domSelector`: `string`[];
  `heading`: `boolean`;
\}

</td>
<td>

[apps/web/src/lib/components/Editor/docx/docx-tokens.js:153](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L153)

</td>
</tr>
</tbody>
</table>

***

## getDocxStyles()

```ts
function getDocxStyles(styles: any): any;
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-tokens.js:21](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L21)

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

`styles`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`any`

***

## getHeadingStyles()

```ts
function getHeadingStyles(): string[];
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-tokens.js:15](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L15)

### Returns

`string`[]

***

## getOutlineLvlName()

```ts
function getOutlineLvlName(outlineLvl: any): string;
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-tokens.js:6](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L6)

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

`outlineLvl`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`string`

***

## getStyleNameByXml()

```ts
function getStyleNameByXml(elXmlName: any): string;
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-tokens.js:1](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L1)

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

`elXmlName`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`string`

***

## getStyles()

```ts
function getStyles(): string[];
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-tokens.js:11](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L11)

### Returns

`string`[]

***

## simplifyTokens()

```ts
function simplifyTokens(block: any): object;
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-tokens.js:69](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L69)

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

`block`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`format`

</td>
<td>

`any`

</td>
<td>

`block.format`

</td>
<td>

[apps/web/src/lib/components/Editor/docx/docx-tokens.js:80](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L80)

</td>
</tr>
<tr>
<td>

`tokens`

</td>
<td>

`any`

</td>
<td>

`simplifiedTokens`

</td>
<td>

[apps/web/src/lib/components/Editor/docx/docx-tokens.js:80](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L80)

</td>
</tr>
</tbody>
</table>

***

## tokensToMarkup()

```ts
function tokensToMarkup(textBlocks: any, plainTextOnly: boolean): string;
```

Defined in: [apps/web/src/lib/components/Editor/docx/docx-tokens.js:31](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/Editor/docx/docx-tokens.js#L31)

### Parameters

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

### Returns

`string`
