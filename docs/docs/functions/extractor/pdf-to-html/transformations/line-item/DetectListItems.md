[Documentation](../../../../modules.md) / extractor/pdf-to-html/transformations/line-item/DetectListItems

## default

Defined in: extractor/pdf-to-html/transformations/line-item/DetectListItems.js:11

### Extends

- [`default`](../ToLineItemTransformation.md#default)

### Constructors

#### Constructor

```ts
new default(): default;
```

Defined in: extractor/pdf-to-html/transformations/line-item/DetectListItems.js:12

##### Returns

[`default`](#default)

##### Overrides

[`default`](../ToLineItemTransformation.md#default).[`constructor`](../ToLineItemTransformation.md#default#constructor)

### Properties

#### itemType

```ts
itemType: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:12

##### Inherited from

[`default`](../ToLineItemTransformation.md#default).[`itemType`](../ToLineItemTransformation.md#default#itemtype)

#### name

```ts
name: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:11

##### Inherited from

[`default`](../ToLineItemTransformation.md#default).[`name`](../ToLineItemTransformation.md#default#name)

### Methods

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: extractor/pdf-to-html/transformations/ToLineItemTransformation.js:19

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

[`default`](../ToLineItemTransformation.md#default).[`completeTransform`](../ToLineItemTransformation.md#default#completetransform)

#### transform()

```ts
transform(parseResult: any): default;
```

Defined in: extractor/pdf-to-html/transformations/line-item/DetectListItems.js:16

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

[`default`](../ToLineItemTransformation.md#default).[`transform`](../ToLineItemTransformation.md#default#transform)
