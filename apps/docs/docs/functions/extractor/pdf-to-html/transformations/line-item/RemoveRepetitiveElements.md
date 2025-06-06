[Documentation](../../../../modules.md) / extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements

## default

Defined in: extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements.js:21

Remove elements with similar content on same page positions, like page numbers, licenes information, etc...

### Extends

- [`default`](../ToLineItemTransformation.md#default)

### Constructors

#### Constructor

```ts
new default(): default;
```

Defined in: extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements.js:22

##### Returns

[`default`](#default)

##### Overrides

[`default`](../ToLineItemTransformation.md#default).[`constructor`](../ToLineItemTransformation.md#default#constructor)

### Properties

#### name

```ts
name: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:11

##### Inherited from

[`default`](../ToLineItemTransformation.md#default).[`name`](../ToLineItemTransformation.md#default#name)

#### itemType

```ts
itemType: any;
```

Defined in: extractor/pdf-to-html/transformations/Transformation.js:12

##### Inherited from

[`default`](../ToLineItemTransformation.md#default).[`itemType`](../ToLineItemTransformation.md#default#itemtype)

### Methods

#### transform()

```ts
transform(parseResult: any): default;
```

Defined in: extractor/pdf-to-html/transformations/line-item/RemoveRepetitiveElements.js:30

The idea is the following:
- For each page, collect all items of the first, and all items of the last line
- Calculate how often these items occur accros all pages (hash ignoring numbers, whitespace, upper/lowercase)
- Delete items occuring on more then 2/3 of all pages

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

#### completeTransform()

```ts
completeTransform(parseResult: any): any;
```

Defined in: extractor/pdf-to-html/transformations/ToLineItemTransformation.js:19

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

[`default`](../ToLineItemTransformation.md#default).[`completeTransform`](../ToLineItemTransformation.md#default#completetransform)
