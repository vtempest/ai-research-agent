[ai-research-agent](../../modules.md) / editor/modules/tables

## Functions

### table()

```ts
function table(editor): object
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

| Name | Type |
| ------ | ------ |
| `commands` | \{ `addColumn`: (`direction`) => `void`; `addColumnLeft`: () => `void`; `addColumnRight`: () => `void`; `addRow`: (`direction`) => `void`; `addRowAbove`: () => `void`; `addRowBelow`: () => `void`; `deleteColumn`: () => `void`; `deleteRow`: () => `void`; `deleteTable`: () => `void`; `insertTable`: (`rows`, `columns`) => `void`; \} |
