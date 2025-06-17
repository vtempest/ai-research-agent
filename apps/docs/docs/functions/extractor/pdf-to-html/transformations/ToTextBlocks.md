[Documentation](../../../README.md) / extractor/pdf-to-html/transformations/ToTextBlocks

## default

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextBlocks.js:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextBlocks.js#L5)

A transformation from an PdfPage to an PdfPage

### Extends

- [`default`](Transformation.md#default)

### Constructors

#### Constructor

```ts
new default(): default;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextBlocks.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextBlocks.js#L6)

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

#### transform()

```ts
transform(parseResult: any): default;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextBlocks.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToTextBlocks.js#L10)

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

[`default`](../models/ParseResult.md#default)

##### Overrides

[`default`](Transformation.md#default).[`transform`](Transformation.md#default#transform)

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: [packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L21)

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

[`default`](Transformation.md#default).[`completeTransform`](Transformation.md#default#completetransform)
