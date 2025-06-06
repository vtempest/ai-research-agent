[Documentation](../../../modules.md) / extractor/pdf-to-html/transformations/Transformation

## default

Defined in: extractor/pdf-to-html/transformations/Transformation.js:3

A transformation from an PdfPage to an PdfPage

### Extended by

- [`default`](ToHTML.md#default)
- [`default`](ToLineItemBlockTransformation.md#default)
- [`default`](ToLineItemTransformation.md#default)
- [`default`](ToTextBlocks.md#default)
- [`default`](ToTextItemTransformation.md#default)

### Constructors

#### Constructor

```ts
new default(name: any, itemType: any): default;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:4

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

`name`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`itemType`

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

#### name

```ts
name: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:11

#### itemType

```ts
itemType: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:12

### Methods

#### transform()

```ts
transform(parseResult: any): void;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:16

Transform an incoming ParseResult into an outgoing ParseResult

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

`parseResult`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:21

Sometimes the transform() does only visualize a change. This methods then does the actual change.

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

`parseResult`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

##### Returns

`any`
