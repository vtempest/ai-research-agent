[ai-research-agent](../../../modules.md) / extractor/pdf-to-html/transformations/CalculateGlobalStats

## Classes

### default

#### Extends

- [`default`](ToTextItemTransformation.md#default)

#### Constructors

##### new default()

```ts
new default(fontMap): default
```

###### Parameters

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

###### Returns

[`default`](CalculateGlobalStats.md#default)

###### Overrides

[`default`](ToTextItemTransformation.md#default).[`constructor`](ToTextItemTransformation.md#constructors)

#### Properties

##### fontMap

```ts
fontMap: any;
```

##### itemType

```ts
itemType: any;
```

###### Inherited from

[`default`](ToTextItemTransformation.md#default).[`itemType`](ToTextItemTransformation.md#itemtype)

##### name

```ts
name: any;
```

###### Inherited from

[`default`](ToTextItemTransformation.md#default).[`name`](ToTextItemTransformation.md#name)

#### Methods

##### completeTransform()

```ts
completeTransform(parseResult): any
```

###### Parameters

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

###### Returns

`any`

###### Inherited from

[`default`](ToTextItemTransformation.md#default).[`completeTransform`](ToTextItemTransformation.md#completetransform)

##### transform()

```ts
transform(parseResult): default
```

###### Parameters

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

###### Returns

[`default`](../models/ParseResult.md#default)

###### Overrides

[`default`](ToTextItemTransformation.md#default).[`transform`](ToTextItemTransformation.md#transform)
