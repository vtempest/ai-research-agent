[ai-research-agent](../../../modules.md) / extractor/pdf-to-html/models/LineConverter

## Classes

### default

#### Constructors

##### new default()

```ts
new default(fontToFormats): default
```

###### Parameters

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

###### Returns

[`default`](LineConverter.md#default)

#### Properties

##### fontToFormats

```ts
fontToFormats: any;
```

#### Methods

##### compact()

```ts
compact(textItems): default
```

###### Parameters

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

###### Returns

[`default`](LineItem.md#default)

## Variables

### WordFormat

```ts
const WordFormat: object;
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

`BOLD`

</td>
<td>

\{
  `endSymbol`: `string`;
  `name`: `string`;
  `startSymbol`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`BOLD_OBLIQUE`

</td>
<td>

\{
  `endSymbol`: `string`;
  `name`: `string`;
  `startSymbol`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`OBLIQUE`

</td>
<td>

\{
  `endSymbol`: `string`;
  `name`: `string`;
  `startSymbol`: `string`;
 \}

</td>
</tr>
</tbody>
</table>

***

### WordType

```ts
const WordType: object;
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

`FOOTNOTE`

</td>
<td>

\{
  `name`: `string`;
  `toText`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`FOOTNOTE_LINK`

</td>
<td>

\{
  `attachWithoutWhitespace`: `boolean`;
  `name`: `string`;
  `plainTextFormat`: `boolean`;
  `toText`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`LINK`

</td>
<td>

\{
  `name`: `string`;
  `toText`: `string`;
 \}

</td>
</tr>
</tbody>
</table>
