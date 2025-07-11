[Documentation](../../../modules.md) / extractor/pdf-to-html/transformations/ToLineItemTransformation

## default

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToLineItemTransformation.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToLineItemTransformation.js#L11)

### Extends

- [`default`](Transformation.md#default)

### Extended by

- [`default`](line-item/CompactLines.md#default)
- [`default`](line-item/DetectHeaders.md#default)
- [`default`](line-item/DetectListItems.md#default)
- [`default`](line-item/DetectTOC.md#default)
- [`default`](line-item/RemoveRepetitiveElements.md#default)
- [`default`](line-item/VerticalToHorizontal.md#default)

### Constructors

#### Constructor

```ts
new default(name: any): default;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToLineItemTransformation.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToLineItemTransformation.js#L12)

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

#### itemType

```ts
itemType: any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L12)

##### Inherited from

[`default`](Transformation.md#default).[`itemType`](Transformation.md#default#itemtype)

#### name

```ts
name: any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L11)

##### Inherited from

[`default`](Transformation.md#default).[`name`](Transformation.md#default#name)

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

##### Overrides

[`default`](Transformation.md#default).[`completeTransform`](Transformation.md#default#completetransform)

#### transform()

```ts
transform(parseResult: any): void;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:16](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L16)

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
