[Documentation](../../../modules.md) / extractor/pdf-to-html/models/LineConverter

## default

Defined in: extractor/pdf-to-html/models/LineConverter.js:58

Converts text items which have been grouped to a line (through TextItemLineGrouper) to a single LineItem doing inline transformations like
'whitespace removal', bold/emphasis annotation, link-detection, etc..

### Constructors

#### Constructor

```ts
new default(fontToFormats: any): default;
```

Defined in: extractor/pdf-to-html/models/LineConverter.js:59

##### Parameters

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

`fontToFormats`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](#default)

### Properties

#### fontToFormats

```ts
fontToFormats: any;
```

Defined in: extractor/pdf-to-html/models/LineConverter.js:60

### Methods

#### compact()

```ts
compact(textItems: any): default;
```

Defined in: extractor/pdf-to-html/models/LineConverter.js:64

returns a CombineResult

##### Parameters

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

`textItems`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](LineItem.md#default)

***

## WordFormat

```ts
const WordFormat: object;
```

Defined in: extractor/pdf-to-html/models/LineConverter.js:9

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

<a id="bold"></a> `BOLD`

</td>
<td>

\{
  `name`: `string`;
  `startSymbol`: `string`;
  `endSymbol`: `string`;
\}

</td>
<td>

extractor/pdf-to-html/models/LineConverter.js:10

</td>
</tr>
<tr>
<td>

<a id="oblique"></a> `OBLIQUE`

</td>
<td>

\{
  `name`: `string`;
  `startSymbol`: `string`;
  `endSymbol`: `string`;
\}

</td>
<td>

extractor/pdf-to-html/models/LineConverter.js:16

</td>
</tr>
<tr>
<td>

<a id="bold_oblique"></a> `BOLD_OBLIQUE`

</td>
<td>

\{
  `name`: `string`;
  `startSymbol`: `string`;
  `endSymbol`: `string`;
\}

</td>
<td>

extractor/pdf-to-html/models/LineConverter.js:22

</td>
</tr>
</tbody>
</table>

***

## WordType

```ts
const WordType: object;
```

Defined in: extractor/pdf-to-html/models/LineConverter.js:30

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

<a id="link"></a> `LINK`

</td>
<td>

\{
  `toText`: `string`;
  `name`: `string`;
\}

</td>
<td>

extractor/pdf-to-html/models/LineConverter.js:31

</td>
</tr>
<tr>
<td>

<a id="footnote_link"></a> `FOOTNOTE_LINK`

</td>
<td>

\{
  `toText`: `string`;
  `name`: `string`;
  `attachWithoutWhitespace`: `boolean`;
  `plainTextFormat`: `boolean`;
\}

</td>
<td>

extractor/pdf-to-html/models/LineConverter.js:38

</td>
</tr>
<tr>
<td>

<a id="footnote"></a> `FOOTNOTE`

</td>
<td>

\{
  `toText`: `string`;
  `name`: `string`;
\}

</td>
<td>

extractor/pdf-to-html/models/LineConverter.js:47

</td>
</tr>
</tbody>
</table>
