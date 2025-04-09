[ai-research-agent](../../modules.md) / editor/rendering/selection

## Functions

### getSelection()

```ts
function getSelection(editor): EditorRange | null
```

Get the selection range from the current browser selection

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

[`EditorRange`](../document/EditorRange.md#editorrange) \| `null`

***

### setSelection()

```ts
function setSelection(editor, range): void
```

Set the current browser selection to the given selection range

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

`void`
