[Documentation](../../modules.md) / editor/modules/tables

## table()

```ts
function table(editor: Editor): object;
```

Defined in: editor/modules/tables.ts:26

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

`commands`

</td>
<td>

\{
  `addColumn`: (`direction`: `-1` \| `1`) => `void`;
  `addColumnLeft`: () => `void`;
  `addColumnRight`: () => `void`;
  `addRow`: (`direction`: `-1` \| `1`) => `void`;
  `addRowAbove`: () => `void`;
  `addRowBelow`: () => `void`;
  `deleteColumn`: () => `void`;
  `deleteRow`: () => `void`;
  `deleteTable`: () => `void`;
  `insertTable`: (`rows`: `number`, `columns`: `number`) => `void`;
\}

</td>
<td>

editor/modules/tables.ts:53

</td>
</tr>
</tbody>
</table>
