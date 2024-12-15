[ai-research-agent](../../index.md) / editor/modules/smartQuotes

## Functions

### smartQuotes()

```ts
function smartQuotes(editor): object
```

Replaces regular quotes with smart quotes as they are typed. Also affects pasted content.
Uses the text-changing event to prevent the original change and replace it with the new one. This makes the smart-
quotes act more seemlessly and includes them as part of regular text undo/redo instead of breaking it like the smart-
entry conversions do.

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

| Name | Type |
| ------ | ------ |
| `destroy()` |  |
