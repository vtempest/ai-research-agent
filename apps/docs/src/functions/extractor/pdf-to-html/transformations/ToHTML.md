[ai-research-agent](../../../modules.md) / extractor/pdf-to-html/transformations/ToHTML

## default

Defined in: [src/extractor/pdf-to-html/transformations/ToHTML.js:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToHTML.js#L5)

### Extends

- [`default`](Transformation.md#default)

### Constructors

#### Constructor

```ts
new default(): default;
```

Defined in: [src/extractor/pdf-to-html/transformations/ToHTML.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToHTML.js#L6)

##### Returns

[`default`](#default)

##### Overrides

[`default`](Transformation.md#default).[`constructor`](Transformation.md#constructor)

### Properties

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

Defined in: [src/extractor/pdf-to-html/transformations/Transformation.js:21](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/Transformation.js#L21)

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

[`default`](Transformation.md#default).[`completeTransform`](Transformation.md#completetransform)

#### transform()

```ts
transform(parseResult: any): default;
```

Defined in: [src/extractor/pdf-to-html/transformations/ToHTML.js:9](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/transformations/ToHTML.js#L9)

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

[`default`](Transformation.md#default).[`transform`](Transformation.md#transform)
