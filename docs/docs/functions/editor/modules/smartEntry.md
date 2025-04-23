[Documentation](../../modules.md) / editor/modules/smartEntry

## Handler()

```ts
type Handler = (editor?: Editor, index?: number, prefix?: string, wholeText?: string) => void;
```

Defined in: editor/modules/smartEntry.ts:10

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

`editor?`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`index?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`prefix?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`wholeText?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

### Returns

`void`

***

## Replacement

```ts
type Replacement = [RegExp, (captured: string, attr: AttributeMap) => AttributeMap];
```

Defined in: editor/modules/smartEntry.ts:4

***

## TextReplacement

```ts
type TextReplacement = [RegExp, (captured: string) => string];
```

Defined in: editor/modules/smartEntry.ts:5

***

## defaultHandlers

```ts
const defaultHandlers: (editor: Editor, index: number, prefix: string) => boolean[];
```

Defined in: editor/modules/smartEntry.ts:151

Allow text representations to format a line

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

### Returns

`boolean`

***

## lineReplacements

```ts
const lineReplacements: Replacement[];
```

Defined in: editor/modules/smartEntry.ts:16

A list of [ RegExp, Function ] tuples to convert text into a formatted line with the attributes returned by the
function. The function's argument will be the captured text from the regular expression.

***

## linkReplacements

```ts
const linkReplacements: Replacement[];
```

Defined in: editor/modules/smartEntry.ts:63

***

## markReplacements

```ts
const markReplacements: Replacement[];
```

Defined in: editor/modules/smartEntry.ts:57

A list of [ RegExp, Function ] tuples to convert text into formatted text with the attributes returned by the
function. The function's argument will be the captured text from the regular expression.

***

## textReplacements

```ts
const textReplacements: TextReplacement[];
```

Defined in: editor/modules/smartEntry.ts:73

A list of [ RegExp, Function ] tuples to convert text into another string of text which is returned by the function.
The function's argument will be the captured text from the regular expression.

***

## lineReplace()

```ts
function lineReplace(
   editor: Editor, 
   index: number, 
   prefix: string): boolean;
```

Defined in: editor/modules/smartEntry.ts:82

Allow text representations to format a line

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

### Returns

`boolean`

***

## linkReplace()

```ts
function linkReplace(
   editor: Editor, 
   index: number, 
   prefix: string): boolean;
```

Defined in: editor/modules/smartEntry.ts:100

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

### Returns

`boolean`

***

## markReplace()

```ts
function markReplace(
   editor: Editor, 
   index: number, 
   prefix: string, 
   wholeText: string): boolean;
```

Defined in: editor/modules/smartEntry.ts:119

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

### Returns

`boolean`

***

## smartEntry()

```ts
function smartEntry(handlers: Handler[]): (editor: Editor) => object;
```

Defined in: editor/modules/smartEntry.ts:154

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

`handlers`

</td>
<td>

[`Handler`](#handler)[]

</td>
<td>

`defaultHandlers`

</td>
</tr>
</tbody>
</table>

### Returns

```ts
(editor: Editor): object;
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
</tbody>
</table>

#### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`destroy()`

</td>
<td>

() => 

</td>
<td>

editor/modules/smartEntry.ts:173

</td>
</tr>
</tbody>
</table>

***

## textReplace()

```ts
function textReplace(
   editor: Editor, 
   index: number, 
   prefix: string): boolean;
```

Defined in: editor/modules/smartEntry.ts:139

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

### Returns

`boolean`
