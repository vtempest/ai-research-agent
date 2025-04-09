[qwksearch-web-app](../../../modules.md) / lib/components/TabManager/find-in-tab-content

## Functions

### default()

```ts
function default(
   document, 
   searchText, 
   snippetTextSize?): object
```

Find query words in tab content and if found return object

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`document`

</td>
<td>

\{ `content`: `string`; `favIconUrl`: `string`; `tabId`: `number`; `title`: `string`; \}

</td>
<td>

`undefined`

</td>
<td>

</td>
</tr>
<tr>
<td>

`document.content`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`document.favIconUrl`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`document.tabId`?

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`document.title`?

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`searchText`?

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

</td>
</tr>
<tr>
<td>

`snippetTextSize`?

</td>
<td>

`number`

</td>
<td>

`100`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `dispString` | `string` |
| `favIconUrl` | `string` |
| `id` | `number` |
| `lastSearchWord` | `string` |
| `title` | `string` |
