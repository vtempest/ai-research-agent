[Documentation](../../../modules.md) / extractor/pdf-to-html/transformations/Transformation

## default

Defined in: extractor/pdf-to-html/transformations/Transformation.js:3

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

#### itemType

```ts
itemType: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:12

#### name

```ts
name: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:11

### Methods

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:21

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

#### transform()

```ts
transform(parseResult: any): void;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:16

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
