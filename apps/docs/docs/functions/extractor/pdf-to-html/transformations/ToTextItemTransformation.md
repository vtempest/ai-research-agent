[Documentation](../../../modules.md) / extractor/pdf-to-html/transformations/ToTextItemTransformation

## default

Defined in: extractor/pdf-to-html/transformations/ToTextItemTransformation.js:5

A transformation from an PdfPage to an PdfPage

### Extends

- [`default`](Transformation.md#default)

### Extended by

- [`default`](CalculateGlobalStats.md#default)

### Constructors

#### Constructor

```ts
new default(name: any): default;
```

Defined in: extractor/pdf-to-html/transformations/ToTextItemTransformation.js:6

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
</tbody>
</table>

##### Returns

[`default`](#default)

##### Overrides

[`default`](Transformation.md#default).[`constructor`](Transformation.md#default#constructor)

### Properties

#### name

```ts
name: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:11

##### Inherited from

[`default`](Transformation.md#default).[`name`](Transformation.md#default#name)

#### itemType

```ts
itemType: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:12

##### Inherited from

[`default`](Transformation.md#default).[`itemType`](Transformation.md#default#itemtype)

### Methods

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: extractor/pdf-to-html/transformations/ToTextItemTransformation.js:13

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

##### Overrides

[`default`](Transformation.md#default).[`completeTransform`](Transformation.md#default#completetransform)

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

##### Inherited from

[`default`](Transformation.md#default).[`transform`](Transformation.md#default#transform)
