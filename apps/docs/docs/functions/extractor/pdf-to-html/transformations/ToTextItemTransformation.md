[Documentation](../../../README.md) / extractor/pdf-to-html/transformations/ToTextItemTransformation

## default

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextItemTransformation.js:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextItemTransformation.js#L5)

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

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextItemTransformation.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextItemTransformation.js#L6)

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

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:11](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L11)

##### Inherited from

[`default`](Transformation.md#default).[`name`](Transformation.md#default#name)

#### itemType

```ts
itemType: any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:12](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L12)

##### Inherited from

[`default`](Transformation.md#default).[`itemType`](Transformation.md#default#itemtype)

### Methods

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextItemTransformation.js:13](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextItemTransformation.js#L13)

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

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:16](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L16)

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
