[Documentation](../../../../modules.md) / extractor/pdf-to-html/transformations/line-item-block/DetectListLevels

## default

Defined in: extractor/pdf-to-html/transformations/line-item-block/DetectListLevels.js:8

### Extends

- [`default`](../ToLineItemBlockTransformation.md#default)

### Constructors

#### Constructor

```ts
new default(): default;
```

Defined in: extractor/pdf-to-html/transformations/line-item-block/DetectListLevels.js:9

##### Returns

[`default`](#default)

##### Overrides

[`default`](../ToLineItemBlockTransformation.md#default).[`constructor`](../ToLineItemBlockTransformation.md#default#constructor)

### Properties

#### itemType

```ts
itemType: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:12

##### Inherited from

[`default`](../ToLineItemBlockTransformation.md#default).[`itemType`](../ToLineItemBlockTransformation.md#default#itemtype)

#### name

```ts
name: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:11

##### Inherited from

[`default`](../ToLineItemBlockTransformation.md#default).[`name`](../ToLineItemBlockTransformation.md#default#name)

### Methods

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: extractor/pdf-to-html/transformations/ToLineItemBlockTransformation.js:19

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

##### Inherited from

[`default`](../ToLineItemBlockTransformation.md#default).[`completeTransform`](../ToLineItemBlockTransformation.md#default#completetransform)

#### transform()

```ts
transform(parseResult: any): default;
```

Defined in: extractor/pdf-to-html/transformations/line-item-block/DetectListLevels.js:13

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

[`default`](../../models/ParseResult.md#default)

##### Overrides

[`default`](../ToLineItemBlockTransformation.md#default).[`transform`](../ToLineItemBlockTransformation.md#default#transform)
