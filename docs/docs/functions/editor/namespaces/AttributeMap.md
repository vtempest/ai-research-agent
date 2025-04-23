[Documentation](../../modules.md) / [editor](../index.md) / AttributeMap

## compose()

```ts
function compose(
   a: AttributeMap, 
   b: AttributeMap, 
   keepNull?: boolean): AttributeMap;
```

Defined in: editor/delta/AttributeMap.ts:22

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

`a`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
<tr>
<td>

`keepNull?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

### Returns

[`AttributeMap`](../index.md#attributemap)

***

## diff()

```ts
function diff(a: AttributeMap, b: AttributeMap): AttributeMap;
```

Defined in: editor/delta/AttributeMap.ts:55

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

`a`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
</tbody>
</table>

### Returns

[`AttributeMap`](../index.md#attributemap)

***

## invert()

```ts
function invert(attr: AttributeMap, base: AttributeMap): AttributeMap;
```

Defined in: editor/delta/AttributeMap.ts:82

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

`attr`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
<tr>
<td>

`base`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
</tr>
</tbody>
</table>

### Returns

[`AttributeMap`](../index.md#attributemap)

***

## transform()

```ts
function transform(
   a: AttributeMap, 
   b: AttributeMap, 
   priority: boolean): AttributeMap;
```

Defined in: editor/delta/AttributeMap.ts:105

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

`a`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

[`AttributeMap`](../index.md#attributemap)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`priority`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
</tbody>
</table>

### Returns

[`AttributeMap`](../index.md#attributemap)
