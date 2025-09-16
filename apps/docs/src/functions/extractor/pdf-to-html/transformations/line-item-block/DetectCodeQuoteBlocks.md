[ai-research-agent](../../../../modules.md) / extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks

## default

Defined in: [src/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks.js:9](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks.js#L9)

### Extends

- [`default`](../ToLineItemBlockTransformation.md#default)

### Constructors

#### Constructor

```ts
new default(): default;
```

Defined in: [src/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks.js#L10)

##### Returns

[`default`](#default)

##### Overrides

[`default`](../ToLineItemBlockTransformation.md#default).[`constructor`](../ToLineItemBlockTransformation.md#constructor)

### Properties

#### itemType

```ts
itemType: any;
```

Defined in: [src/extractor/pdf-to-html/transformations/Transformation.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L12)

##### Inherited from

[`default`](../ToLineItemBlockTransformation.md#default).[`itemType`](../ToLineItemBlockTransformation.md#itemtype)

#### name

```ts
name: any;
```

Defined in: [src/extractor/pdf-to-html/transformations/Transformation.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L11)

##### Inherited from

[`default`](../ToLineItemBlockTransformation.md#default).[`name`](../ToLineItemBlockTransformation.md#name)

### Methods

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: [src/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation.js#L19)

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

[`default`](../ToLineItemBlockTransformation.md#default).[`completeTransform`](../ToLineItemBlockTransformation.md#completetransform)

#### transform()

```ts
transform(parseResult: any): default;
```

Defined in: [src/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks.js:14](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item-block/DetectCodeQuoteBlocks.js#L14)

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

[`default`](../ToLineItemBlockTransformation.md#default).[`transform`](../ToLineItemBlockTransformation.md#transform)
