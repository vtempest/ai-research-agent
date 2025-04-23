[Documentation](../../modules.md) / [editor](../index.md) / Line

## create()

```ts
function create(
   content: default, 
   attributes: AttributeMap, 
   id?: string | LineIds): Line;
```

Defined in: editor/document/Line.ts:77

### Parameters

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

[`default`](../delta/Delta.md#default)

</td>
</tr>
<tr>
<td>

`attributes`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
<tr>
<td>

`id?`

</td>
<td>

`string` \| [`LineIds`](../document/Line.md#lineids-1)

</td>
</tr>
</tbody>
</table>

### Returns

[`Line`](../index.md#line)

***

## createFrom()

```ts
function createFrom(
   line?: Line, 
   content?: default, 
   lineIds?: LineIds): Line;
```

Defined in: editor/document/Line.ts:87

### Parameters

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

`line?`

</td>
<td>

[`Line`](../index.md#line)

</td>
</tr>
<tr>
<td>

`content?`

</td>
<td>

[`default`](../delta/Delta.md#default)

</td>
</tr>
<tr>
<td>

`lineIds?`

</td>
<td>

[`LineIds`](../document/Line.md#lineids-1)

</td>
</tr>
</tbody>
</table>

### Returns

[`Line`](../index.md#line)

***

## createId()

```ts
function createId(existing: LineIds): string;
```

Defined in: editor/document/Line.ts:106

### Parameters

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

[`LineIds`](../document/Line.md#lineids-1)

</td>
<td>

`EMPTY_MAP`

</td>
</tr>
</tbody>
</table>

### Returns

`string`

***

## equal()

```ts
function equal(value: Line, other: Line): boolean;
```

Defined in: editor/document/Line.ts:43

### Parameters

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

[`Line`](../index.md#line)

</td>
</tr>
<tr>
<td>

`other`

</td>
<td>

[`Line`](../index.md#line)

</td>
</tr>
</tbody>
</table>

### Returns

`boolean`

***

## fromDelta()

```ts
function fromDelta(delta: default, existing?: LineIds): Line[];
```

Defined in: editor/document/Line.ts:50

### Parameters

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

[`default`](../delta/Delta.md#default)

</td>
</tr>
<tr>
<td>

`existing?`

</td>
<td>

[`LineIds`](../document/Line.md#lineids-1)

</td>
</tr>
</tbody>
</table>

### Returns

[`Line`](../index.md#line)[]

***

## getId()

```ts
function getId(line: Line): string;
```

Defined in: editor/document/Line.ts:38

### Parameters

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

[`Line`](../index.md#line)

</td>
</tr>
</tbody>
</table>

### Returns

`string`

***

## getLineRanges()

```ts
function getLineRanges(lines: Line[]): LineRanges;
```

Defined in: editor/document/Line.ts:97

### Parameters

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

[`Line`](../index.md#line)[]

</td>
</tr>
</tbody>
</table>

### Returns

[`LineRanges`](../document/Line.md#lineranges)

***

## iterator()

```ts
function iterator(lines: Line[], lineIds?: LineIds): LineIterator;
```

Defined in: editor/document/Line.ts:22

### Parameters

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

[`Line`](../index.md#line)[]

</td>
</tr>
<tr>
<td>

`lineIds?`

</td>
<td>

[`LineIds`](../document/Line.md#lineids-1)

</td>
</tr>
</tbody>
</table>

### Returns

[`LineIterator`](../document/Line.md#lineiterator)

***

## length()

```ts
function length(line: Line): number;
```

Defined in: editor/document/Line.ts:34

### Parameters

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

[`Line`](../index.md#line)

</td>
</tr>
</tbody>
</table>

### Returns

`number`

***

## linesToLineIds()

```ts
function linesToLineIds(lines: Line[]): Map<any, any>;
```

Defined in: editor/document/Line.ts:26

### Parameters

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

[`Line`](../index.md#line)[]

</td>
</tr>
</tbody>
</table>

### Returns

`Map`&lt;`any`, `any`&gt;

***

## toDelta()

```ts
function toDelta(lines: Line[]): default;
```

Defined in: editor/document/Line.ts:68

### Parameters

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

[`Line`](../index.md#line)[]

</td>
</tr>
</tbody>
</table>

### Returns

[`default`](../delta/Delta.md#default)
