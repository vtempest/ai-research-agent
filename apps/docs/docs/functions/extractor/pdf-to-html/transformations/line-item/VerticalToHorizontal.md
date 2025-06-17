[Documentation](../../../../README.md) / extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal

## default

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal.js:8](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal.js#L8)

Converts vertical text to horizontal

### Extends

- [`default`](../ToLineItemTransformation.md#default)

### Constructors

#### Constructor

```ts
new default(): default;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal.js:9](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal.js#L9)

##### Returns

[`default`](#default)

##### Overrides

[`default`](../ToLineItemTransformation.md#default).[`constructor`](../ToLineItemTransformation.md#default#constructor)

### Properties

#### name

```ts
name: any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L11)

##### Inherited from

[`default`](../ToLineItemTransformation.md#default).[`name`](../ToLineItemTransformation.md#default#name)

#### itemType

```ts
itemType: any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L12)

##### Inherited from

[`default`](../ToLineItemTransformation.md#default).[`itemType`](../ToLineItemTransformation.md#default#itemtype)

### Methods

#### transform()

```ts
transform(parseResult: any): default;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal.js:13](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/VerticalToHorizontal.js#L13)

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

[`default`](../../models/ParseResult.md#default)

##### Overrides

[`default`](../ToLineItemTransformation.md#default).[`transform`](../ToLineItemTransformation.md#default#transform)

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToLineItemTransformation.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToLineItemTransformation.js#L19)

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

##### Inherited from

[`default`](../ToLineItemTransformation.md#default).[`completeTransform`](../ToLineItemTransformation.md#default#completetransform)
