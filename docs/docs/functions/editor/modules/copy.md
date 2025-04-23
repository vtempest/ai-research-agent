[Documentation](../../modules.md) / editor/modules/copy

## CopyData

Defined in: editor/modules/copy.ts:15

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

<a id="html"></a> `html?`

</td>
<td>

`string`

</td>
<td>

editor/modules/copy.ts:17

</td>
</tr>
<tr>
<td>

<a id="selection"></a> `selection?`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
<td>

editor/modules/copy.ts:18

</td>
</tr>
<tr>
<td>

<a id="text"></a> `text?`

</td>
<td>

`string`

</td>
<td>

editor/modules/copy.ts:16

</td>
</tr>
</tbody>
</table>

***

## CopyOptions

Defined in: editor/modules/copy.ts:10

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

<a id="copyhtml"></a> `copyHTML?`

</td>
<td>

`boolean`

</td>
<td>

editor/modules/copy.ts:12

</td>
</tr>
<tr>
<td>

<a id="copyplaintext"></a> `copyPlainText?`

</td>
<td>

`boolean`

</td>
<td>

editor/modules/copy.ts:11

</td>
</tr>
</tbody>
</table>

***

## copy()

```ts
function copy(editor: Editor, options: CopyOptions): object;
```

Defined in: editor/modules/copy.ts:23

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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CopyOptions`](#copyoptions)

</td>
<td>

`defaultOptions`

</td>
</tr>
</tbody>
</table>

### Returns

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

`commands`

</td>
<td>

\{
  `getCopy`: (`selection?`: [`EditorRange`](../document/EditorRange.md#editorrange)) => `object`;
\}

</td>
<td>

editor/modules/copy.ts:61

</td>
</tr>
<tr>
<td>

`destroy()`

</td>
<td>

() => 

</td>
<td>

editor/modules/copy.ts:68

</td>
</tr>
<tr>
<td>

`init()`

</td>
<td>

() => 

</td>
<td>

editor/modules/copy.ts:64

</td>
</tr>
</tbody>
</table>
