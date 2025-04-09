[ai-research-agent](../../../modules.md) / extractor/pdf-to-html/transformations/ToLineItemTransformation

## Classes

### default

#### Extends

- [`default`](Transformation.md#default)

#### Extended by

- [`default`](line-item/CompactLines.md#default)
- [`default`](line-item/DetectHeaders.md#default)
- [`default`](line-item/DetectListItems.md#default)
- [`default`](line-item/DetectTOC.md#default)
- [`default`](line-item/RemoveRepetitiveElements.md#default)
- [`default`](line-item/VerticalToHorizontal.md#default)

#### Constructors

##### new default()

```ts
new default(name): default
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
</tbody>
</table>

###### Returns

[`default`](ToLineItemTransformation.md#default)

###### Overrides

[`default`](Transformation.md#default).[`constructor`](Transformation.md#constructors)

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

###### Overrides

[`default`](Transformation.md#default).[`completeTransform`](Transformation.md#completetransform)

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

###### Inherited from

[`default`](Transformation.md#default).[`transform`](Transformation.md#transform)

#### Properties

##### itemType

```ts
itemType: any;
```

###### Inherited from

[`default`](Transformation.md#default).[`itemType`](Transformation.md#itemtype)

##### name

```ts
name: any;
```

###### Inherited from

[`default`](Transformation.md#default).[`name`](Transformation.md#name)
