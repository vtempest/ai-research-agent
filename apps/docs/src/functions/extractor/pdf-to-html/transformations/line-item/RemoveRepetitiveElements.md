[Documentation](../../../../modules.md) / extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements

## default

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements.js#L21)

### Extends

- [`default`](../ToLineItemTransformation.md#default)

### Constructors

#### Constructor

```ts
new default(): default;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements.js:22](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements.js#L22)

##### Returns

[`default`](#default)

##### Overrides

[`default`](../ToLineItemTransformation.md#default).[`constructor`](../ToLineItemTransformation.md#default#constructor)

### Properties

#### itemType

```ts
itemType: any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L12)

##### Inherited from

[`default`](../ToLineItemTransformation.md#default).[`itemType`](../ToLineItemTransformation.md#default#itemtype)

#### name

```ts
name: any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L11)

##### Inherited from

[`default`](../ToLineItemTransformation.md#default).[`name`](../ToLineItemTransformation.md#default#name)

### Methods

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToLineItemTransformation.js:19](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToLineItemTransformation.js#L19)

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

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements.js:30](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements.js#L30)

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
