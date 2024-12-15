[ai-research-agent](../../../../index.md) / [editor/document/Line](../index.md) / default

## Functions

### create()

```ts
function create(
   content, 
   attributes, 
   id?): default
```

#### Parameters

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

`content`

</td>
<td>

[`default`](../../../delta/Delta.md#default)

</td>
</tr>
<tr>
<td>

`attributes`

</td>
<td>

[`default`](../../../delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`id`?

</td>
<td>

`string` \| [`LineIds`](../index.md#lineids-1)

</td>
</tr>
</tbody>
</table>

#### Returns

[`default`](../index.md#default)

***

### createFrom()

```ts
function createFrom(
   line?, 
   content?, 
   lineIds?): default
```

#### Parameters

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

`line`?

</td>
<td>

[`default`](../index.md#default)

</td>
</tr>
<tr>
<td>

`content`?

</td>
<td>

[`default`](../../../delta/Delta.md#default)

</td>
</tr>
<tr>
<td>

`lineIds`?

</td>
<td>

[`LineIds`](../index.md#lineids-1)

</td>
</tr>
</tbody>
</table>

#### Returns

[`default`](../index.md#default)

***

### createId()

```ts
function createId(existing): string
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`existing`

</td>
<td>

[`LineIds`](../index.md#lineids-1)

</td>
<td>

`EMPTY_MAP`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

***

### equal()

```ts
function equal(value, other): boolean
```

#### Parameters

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

`value`

</td>
<td>

[`default`](../index.md#default)

</td>
</tr>
<tr>
<td>

`other`

</td>
<td>

[`default`](../index.md#default)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### fromDelta()

```ts
function fromDelta(delta, existing?): default[]
```

#### Parameters

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

`delta`

</td>
<td>

[`default`](../../../delta/Delta.md#default)

</td>
</tr>
<tr>
<td>

`existing`?

</td>
<td>

[`LineIds`](../index.md#lineids-1)

</td>
</tr>
</tbody>
</table>

#### Returns

[`default`](../index.md#default)[]

***

### getId()

```ts
function getId(line): string
```

#### Parameters

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

`line`

</td>
<td>

[`default`](../index.md#default)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

***

### getLineRanges()

```ts
function getLineRanges(lines): LineRanges
```

#### Parameters

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

`lines`

</td>
<td>

[`default`](../index.md#default)[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`LineRanges`](../index.md#lineranges)

***

### iterator()

```ts
function iterator(lines, lineIds?): LineIterator
```

#### Parameters

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

`lines`

</td>
<td>

[`default`](../index.md#default)[]

</td>
</tr>
<tr>
<td>

`lineIds`?

</td>
<td>

[`LineIds`](../index.md#lineids-1)

</td>
</tr>
</tbody>
</table>

#### Returns

[`LineIterator`](../index.md#lineiterator)

***

### length()

```ts
function length(line): number
```

#### Parameters

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

`line`

</td>
<td>

[`default`](../index.md#default)

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

***

### linesToLineIds()

```ts
function linesToLineIds(lines): Map<any, any>
```

#### Parameters

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

`lines`

</td>
<td>

[`default`](../index.md#default)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Map`&lt;`any`, `any`&gt;

***

### toDelta()

```ts
function toDelta(lines): default
```

#### Parameters

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

`lines`

</td>
<td>

[`default`](../index.md#default)[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`default`](../../../delta/Delta.md#default)
