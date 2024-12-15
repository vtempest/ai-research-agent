[ai-research-agent](../../index.md) / editor/modules/smartEntry

## Functions

### lineReplace()

```ts
function lineReplace(
   editor, 
   index, 
   prefix): boolean
```

Allow text representations to format a line

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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`prefix`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### linkReplace()

```ts
function linkReplace(
   editor, 
   index, 
   prefix): boolean
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`prefix`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### markReplace()

```ts
function markReplace(
   editor, 
   index, 
   prefix, 
   wholeText): boolean
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`prefix`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`wholeText`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### smartEntry()

```ts
function smartEntry(handlers): (editor) => object
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

`handlers`

</td>
<td>

[`Handler`](smartEntry.md#handler)[]

</td>
<td>

`defaultHandlers`

</td>
</tr>
</tbody>
</table>

#### Returns

`Function`

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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

##### Returns

`object`

| Name | Type |
| ------ | ------ |
| `destroy()` |  |

***

### textReplace()

```ts
function textReplace(
   editor, 
   index, 
   prefix): boolean
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`prefix`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

## Type Aliases

### Handler()

```ts
type Handler: (editor?, index?, prefix?, wholeText?) => void;
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

`editor`?

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`index`?

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`prefix`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`wholeText`?

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### Replacement

```ts
type Replacement: [RegExp, (captured, attr) => default];
```

***

### TextReplacement

```ts
type TextReplacement: [RegExp, (captured) => string];
```

## Variables

### defaultHandlers

```ts
const defaultHandlers: (editor, index, prefix) => boolean[];
```

Allow text representations to format a line

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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`index`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`prefix`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### lineReplacements

```ts
const lineReplacements: Replacement[];
```

A list of [ RegExp, Function ] tuples to convert text into a formatted line with the attributes returned by the
function. The function's argument will be the captured text from the regular expression.

***

### linkReplacements

```ts
const linkReplacements: Replacement[];
```

***

### markReplacements

```ts
const markReplacements: Replacement[];
```

A list of [ RegExp, Function ] tuples to convert text into formatted text with the attributes returned by the
function. The function's argument will be the captured text from the regular expression.

***

### textReplacements

```ts
const textReplacements: TextReplacement[];
```

A list of [ RegExp, Function ] tuples to convert text into another string of text which is returned by the function.
The function's argument will be the captured text from the regular expression.
