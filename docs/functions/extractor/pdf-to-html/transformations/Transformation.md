[ai-research-agent](../../../modules.md) / extractor/pdf-to-html/transformations/Transformation

## Classes

### default

#### Extended by

- [`default`](ToHTML.md#default)
- [`default`](ToLineItemBlockTransformation.md#default)
- [`default`](ToLineItemTransformation.md#default)
- [`default`](ToTextBlocks.md#default)
- [`default`](ToTextItemTransformation.md#default)

#### Constructors

##### new default()

```ts
new default(name, itemType): default
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

`name`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`itemType`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](Transformation.md#default)

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

##### transform()

```ts
transform(parseResult): void
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

`void`

#### Properties

##### itemType

```ts
itemType: any;
```

##### name

```ts
name: any;
```
