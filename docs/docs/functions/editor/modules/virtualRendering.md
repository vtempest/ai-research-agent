[Documentation](../../modules.md) / editor/modules/virtualRendering

## VirtualRenderWhat

Defined in: editor/modules/virtualRendering.ts:14

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

<a id="doc"></a> `doc?`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
<td>

editor/modules/virtualRendering.ts:16

</td>
</tr>
<tr>
<td>

<a id="old"></a> `old?`

</td>
<td>

[`default`](../document/TextDocument.md#default)

</td>
<td>

editor/modules/virtualRendering.ts:15

</td>
</tr>
<tr>
<td>

<a id="selection"></a> `selection`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
<td>

editor/modules/virtualRendering.ts:17

</td>
</tr>
</tbody>
</table>

***

## virtualRendering()

```ts
function virtualRendering(editor: Editor): object;
```

Defined in: editor/modules/virtualRendering.ts:22

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

`render()`

</td>
<td>

(`what?`: [`VirtualRenderWhat`](#virtualrenderwhat)) => `void`

</td>
<td>

editor/modules/virtualRendering.ts:283

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

editor/modules/virtualRendering.ts:290

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

editor/modules/virtualRendering.ts:284

</td>
</tr>
</tbody>
</table>
