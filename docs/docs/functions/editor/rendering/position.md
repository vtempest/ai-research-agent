[Documentation](../../modules.md) / editor/rendering/position

## LineInfo

Defined in: editor/rendering/position.ts:13

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

<a id="belowmid"></a> `belowMid`

</td>
<td>

`boolean`

</td>
<td>

editor/rendering/position.ts:17

</td>
</tr>
<tr>
<td>

<a id="element"></a> `element`

</td>
<td>

[`HTMLLineElement`](rendering.md#htmllineelement)

</td>
<td>

editor/rendering/position.ts:15

</td>
</tr>
<tr>
<td>

<a id="line"></a> `line`

</td>
<td>

[`Line`](../index.md#line)

</td>
<td>

editor/rendering/position.ts:14

</td>
</tr>
<tr>
<td>

<a id="rect"></a> `rect`

</td>
<td>

`DOMRect`

</td>
<td>

editor/rendering/position.ts:16

</td>
</tr>
</tbody>
</table>

***

## getBoudingBrowserRange()

```ts
function getBoudingBrowserRange(editor: Editor, range: EditorRange): Range;
```

Defined in: editor/rendering/position.ts:70

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

`range`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

### Returns

`Range`

***

## getBrowserRange()

```ts
function getBrowserRange(editor: Editor, range: EditorRange): Range;
```

Defined in: editor/rendering/position.ts:59

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

`range`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

### Returns

`Range`

***

## getIndexFromNode()

```ts
function getIndexFromNode(editor: Editor, startNode: Node): number;
```

Defined in: editor/rendering/position.ts:111

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

`startNode`

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

## getIndexFromNodeAndOffset()

```ts
function getIndexFromNodeAndOffset(
   editor: Editor, 
   node: Node, 
   offset: number, 
   current?: number): number;
```

Defined in: editor/rendering/position.ts:80

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

`node`

</td>
<td>

`Node`

</td>
</tr>
<tr>
<td>

`offset`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`current?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

### Returns

`number`

***

## getIndexFromPoint()

```ts
function getIndexFromPoint(
   editor: Editor, 
   x: number, 
   y: number): number;
```

Defined in: editor/rendering/position.ts:20

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

`x`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`y`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

### Returns

`number`

***

## getLineElementAt()

```ts
function getLineElementAt(editor: Editor, index: number): HTMLLineElement;
```

Defined in: editor/rendering/position.ts:134

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
</tbody>
</table>

### Returns

[`HTMLLineElement`](rendering.md#htmllineelement)

***

## getLineInfoFromPoint()

```ts
function getLineInfoFromPoint(editor: Editor, y: number): LineInfo;
```

Defined in: editor/rendering/position.ts:42

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

`y`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

### Returns

[`LineInfo`](#lineinfo)

***

## getNodeAndOffset()

```ts
function getNodeAndOffset(
   editor: Editor, 
   index: number, 
   direction: 0 | 1): NodeOffsetAndFrozen;
```

Defined in: editor/rendering/position.ts:183

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

`direction`

</td>
<td>

`0` \| `1`

</td>
</tr>
</tbody>
</table>

### Returns

`NodeOffsetAndFrozen`

***

## getNodeLength()

```ts
function getNodeLength(editor: Editor, parentNode: Node): number;
```

Defined in: editor/rendering/position.ts:143

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

`parentNode`

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

## getNodesForRange()

```ts
function getNodesForRange(editor: Editor, range: EditorRange): [Node, number, Node, number];
```

Defined in: editor/rendering/position.ts:164

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

`range`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

### Returns

\[`Node`, `number`, `Node`, `number`\]

***

## textNodeLength()

```ts
function textNodeLength(lines: Types, node: Node): number;
```

Defined in: editor/rendering/position.ts:242

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

[`Types`](../typesetting/typeset.md#types)

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
