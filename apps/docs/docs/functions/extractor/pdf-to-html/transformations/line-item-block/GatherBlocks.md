[Documentation](../../../../README.md) / extractor/pdf-to-html/transformations/line-item-block/GatherBlocks

## default

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks.js:9](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks.js#L9)

Gathers lines to blocks

### Extends

- [`default`](../ToLineItemBlockTransformation.md#default)

### Constructors

#### Constructor

```ts
new default(): default;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks.js#L10)

##### Returns

[`default`](#default)

##### Overrides

[`default`](../ToLineItemBlockTransformation.md#default).[`constructor`](../ToLineItemBlockTransformation.md#default#constructor)

### Properties

#### name

```ts
name: any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L11)

##### Inherited from

[`default`](../ToLineItemBlockTransformation.md#default).[`name`](../ToLineItemBlockTransformation.md#default#name)

#### itemType

```ts
itemType: any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L12)

##### Inherited from

[`default`](../ToLineItemBlockTransformation.md#default).[`itemType`](../ToLineItemBlockTransformation.md#default#itemtype)

### Methods

#### transform()

```ts
transform(parseResult: any): default;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks.js:14](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item-block/GatherBlocks.js#L14)

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

[`default`](../ToLineItemBlockTransformation.md#default).[`transform`](../ToLineItemBlockTransformation.md#default#transform)

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToLineItemBlockTransformation.js#L19)

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

[`default`](../ToLineItemBlockTransformation.md#default).[`completeTransform`](../ToLineItemBlockTransformation.md#default#completetransform)
