[ai-research-agent](../../index.md) / editor/rendering/position

## Functions

### getBoudingBrowserRange()

```ts
function getBoudingBrowserRange(editor, range): Range
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

`range`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

#### Returns

`Range`

***

### getBrowserRange()

```ts
function getBrowserRange(editor, range): Range
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

`range`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

#### Returns

`Range`

***

### getIndexFromNode()

```ts
function getIndexFromNode(editor, startNode): number
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

`startNode`

</td>
<td>

`Node`

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

***

### getIndexFromNodeAndOffset()

```ts
function getIndexFromNodeAndOffset(
   editor, 
   node, 
   offset, 
   current?): number
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

`current`?

</td>
<td>

`null` \| `number`

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

***

### getIndexFromPoint()

```ts
function getIndexFromPoint(
   editor, 
   x, 
   y): null | number
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

#### Returns

`null` \| `number`

***

### getLineElementAt()

```ts
function getLineElementAt(editor, index): undefined | HTMLLineElement
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
</tbody>
</table>

#### Returns

`undefined` \| [`HTMLLineElement`](rendering.md#htmllineelement)

***

### getLineInfoFromPoint()

```ts
function getLineInfoFromPoint(editor, y): LineInfo | undefined
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

`y`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

[`LineInfo`](position.md#lineinfo) \| `undefined`

***

### getNodeAndOffset()

```ts
function getNodeAndOffset(
   editor, 
   index, 
   direction): NodeOffsetAndFrozen
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

`direction`

</td>
<td>

`0` \| `1`

</td>
</tr>
</tbody>
</table>

#### Returns

`NodeOffsetAndFrozen`

***

### getNodeLength()

```ts
function getNodeLength(editor, parentNode): number
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

`parentNode`

</td>
<td>

`Node`

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

***

### getNodesForRange()

```ts
function getNodesForRange(editor, range): [Node | null, number, Node | null, number]
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

`range`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Node` \| `null`, `number`, `Node` \| `null`, `number`]

***

### textNodeLength()

```ts
function textNodeLength(lines, node): number
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

[`Types`](../typesetting/typeset.md#typest)&lt;[`BasicType`](../typesetting/typeset.md#basictype)&gt;

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

#### Returns

`number`

## Interfaces

### LineInfo

#### Properties

##### belowMid

```ts
belowMid: boolean;
```

##### element

```ts
element: HTMLLineElement;
```

##### line

```ts
line: default;
```

##### rect

```ts
rect: DOMRect;
```
