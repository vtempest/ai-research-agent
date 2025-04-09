[ai-research-agent](../../../../modules.md) / [editor/delta/AttributeMap](../index.md) / default

## Functions

### compose()

```ts
function compose(
   a, 
   b, 
   keepNull?): default | undefined
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

`a`

</td>
<td>

[`default`](../index.md#default)

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

[`default`](../index.md#default)

</td>
</tr>
<tr>
<td>

`keepNull`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

[`default`](../index.md#default) \| `undefined`

***

### diff()

```ts
function diff(a, b): default | undefined
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

`a`

</td>
<td>

[`default`](../index.md#default)

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

[`default`](../index.md#default)

</td>
</tr>
</tbody>
</table>

#### Returns

[`default`](../index.md#default) \| `undefined`

***

### invert()

```ts
function invert(attr, base): default
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

`attr`

</td>
<td>

[`default`](../index.md#default)

</td>
</tr>
<tr>
<td>

`base`

</td>
<td>

[`default`](../index.md#default)

</td>
</tr>
</tbody>
</table>

#### Returns

[`default`](../index.md#default)

***

### transform()

```ts
function transform(
   a, 
   b, 
   priority): default | undefined
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

`a`

</td>
<td>

[`default`](../index.md#default)

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

[`default`](../index.md#default)

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

#### Returns

[`default`](../index.md#default) \| `undefined`
