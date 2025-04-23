[Documentation](../../modules.md) / editor/rendering/rendering

## HTMLLineElement

Defined in: editor/rendering/rendering.ts:22

### Extends

- `HTMLElement`

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="key"></a> `key`

</td>
<td>

`string`

</td>
<td>

editor/rendering/rendering.ts:23

</td>
</tr>
</tbody>
</table>

***

## Combined

```ts
type Combined = CombinedEntry[];
```

Defined in: editor/rendering/rendering.ts:16

***

## CombinedEntry

```ts
type CombinedEntry = Line | Line[];
```

Defined in: editor/rendering/rendering.ts:15

***

## combineLines()

```ts
function combineLines(editor: Editor, lines: Line[]): CombinedData;
```

Defined in: editor/rendering/rendering.ts:141

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

`lines`

</td>
<td>

[`Line`](../index.md#line)[]

</td>
</tr>
</tbody>
</table>

### Returns

`CombinedData`

***

## getChangedRanges()

```ts
function getChangedRanges(oldC: Combined, newC: Combined): LineRanges;
```

Defined in: editor/rendering/rendering.ts:179

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

`oldC`

</td>
<td>

[`Combined`](#combined)

</td>
</tr>
<tr>
<td>

`newC`

</td>
<td>

[`Combined`](#combined)

</td>
</tr>
</tbody>
</table>

### Returns

`LineRanges`

***

## getLineNodeEnd()

```ts
function getLineNodeEnd(root: HTMLElement, node: Node): number;
```

Defined in: editor/rendering/rendering.ts:30

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

`root`

</td>
<td>

`HTMLElement`

</td>
</tr>
<tr>
<td>

`node`

</td>
<td>

`Node`

</td>
</tr>
</tbody>
</table>

### Returns

`number`

***

## getLineNodeStart()

```ts
function getLineNodeStart(root: HTMLElement, node: Node): number;
```

Defined in: editor/rendering/rendering.ts:26

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

`root`

</td>
<td>

`HTMLElement`

</td>
</tr>
<tr>
<td>

`node`

</td>
<td>

`Node`

</td>
</tr>
</tbody>
</table>

### Returns

`number`

***

## render()

```ts
function render(editor: Editor, doc: default): void;
```

Defined in: editor/rendering/rendering.ts:69

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

`doc`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
</tr>
</tbody>
</table>

### Returns

`void`

***

## renderChanges()

```ts
function renderChanges(
   editor: Editor, 
   oldDoc: default, 
   newDoc: default): void;
```

Defined in: editor/rendering/rendering.ts:78

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

`oldDoc`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
</tr>
<tr>
<td>

`newDoc`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
</tr>
</tbody>
</table>

### Returns

`void`

***

## renderCombined()

```ts
function renderCombined(
   editor: Editor, 
   combined: Combined, 
   forHTML?: boolean): VNode[];
```

Defined in: editor/rendering/rendering.ts:111

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

`combined`

</td>
<td>

[`Combined`](#combined)

</td>
</tr>
<tr>
<td>

`forHTML?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

### Returns

[`VNode`](vdom.md#vnode)[]

***

## renderDoc()

```ts
function renderDoc(
   editor: Editor, 
   doc: default, 
   forHTML?: boolean): VNode[];
```

Defined in: editor/rendering/rendering.ts:107

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

`doc`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
</tr>
<tr>
<td>

`forHTML?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

### Returns

[`VNode`](vdom.md#vnode)[]

***

## renderInline()

```ts
function renderInline(
   editor: Editor, 
   line: Line, 
   forHTML?: boolean): VChild[];
```

Defined in: editor/rendering/rendering.ts:206

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

`line`

</td>
<td>

[`Line`](../index.md#line)

</td>
</tr>
<tr>
<td>

`forHTML?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

### Returns

[`VChild`](vdom.md#vchild)[]

***

## renderLine()

```ts
function renderLine(
   editor: Editor, 
   line: CombinedEntry, 
   forHTML?: boolean): VNode;
```

Defined in: editor/rendering/rendering.ts:115

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

`line`

</td>
<td>

[`CombinedEntry`](#combinedentry)

</td>
</tr>
<tr>
<td>

`forHTML?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

### Returns

[`VNode`](vdom.md#vnode)

***

## renderMultiLine()

```ts
function renderMultiLine(
   editor: Editor, 
   lines: Line[], 
   forHTML?: boolean): VNode;
```

Defined in: editor/rendering/rendering.ts:128

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

`lines`

</td>
<td>

[`Line`](../index.md#line)[]

</td>
</tr>
<tr>
<td>

`forHTML?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

### Returns

[`VNode`](vdom.md#vnode)

***

## renderSingleLine()

```ts
function renderSingleLine(
   editor: Editor, 
   line: Line, 
   forHTML?: boolean): VNode;
```

Defined in: editor/rendering/rendering.ts:119

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

`line`

</td>
<td>

[`Line`](../index.md#line)

</td>
</tr>
<tr>
<td>

`forHTML?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

### Returns

[`VNode`](vdom.md#vnode)

***

## setLineNodesRanges()

```ts
function setLineNodesRanges(editor: Editor): void;
```

Defined in: editor/rendering/rendering.ts:34

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
</tbody>
</table>

### Returns

`void`
