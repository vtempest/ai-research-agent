[ai-research-agent](../../../modules.md) / extractor/pdf-to-html/transformations/CalculateGlobalStats

## default

Defined in: [src/extractor/pdf-to-html/transformations/CalculateGlobalStats.js:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/CalculateGlobalStats.js#L5)

### Extends

- [`default`](ToTextItemTransformation.md#default)

### Constructors

#### Constructor

```ts
new default(fontMap: any): default;
```

Defined in: [src/extractor/pdf-to-html/transformations/CalculateGlobalStats.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/CalculateGlobalStats.js#L6)

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

`fontMap`

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

[`default`](ToTextItemTransformation.md#default).[`constructor`](ToTextItemTransformation.md#constructor)

### Properties

#### fontMap

```ts
fontMap: any;
```

Defined in: [src/extractor/pdf-to-html/transformations/CalculateGlobalStats.js:8](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/CalculateGlobalStats.js#L8)

#### itemType

```ts
itemType: any;
```

Defined in: [src/extractor/pdf-to-html/transformations/Transformation.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L12)

##### Inherited from

[`default`](Transformation.md#default).[`itemType`](Transformation.md#itemtype)

#### name

```ts
name: any;
```

Defined in: [src/extractor/pdf-to-html/transformations/Transformation.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L11)

##### Inherited from

[`default`](Transformation.md#default).[`name`](Transformation.md#name)

### Methods

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: [src/extractor/pdf-to-html/transformations/ToTextItemTransformation.js:13](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextItemTransformation.js#L13)

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

[`default`](ToTextItemTransformation.md#default).[`completeTransform`](ToTextItemTransformation.md#completetransform)

#### transform()

```ts
transform(parseResult: any): default;
```

Defined in: [src/extractor/pdf-to-html/transformations/CalculateGlobalStats.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/CalculateGlobalStats.js#L11)

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

[`default`](../models/ParseResult.md#default)

##### Overrides

[`default`](ToTextItemTransformation.md#default).[`transform`](ToTextItemTransformation.md#transform)
