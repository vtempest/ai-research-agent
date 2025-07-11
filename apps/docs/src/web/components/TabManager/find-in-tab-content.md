[Documentation](../../modules.md) / components/TabManager/find-in-tab-content

## default()

```ts
function default(
   document: object, 
   searchText: string, 
   snippetTextSize?: number): object;
```

Defined in: [apps/web/src/lib/components/TabManager/find-in-tab-content.js:15](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/TabManager/find-in-tab-content.js#L15)

Find query words in tab content and if found return object

### Parameters

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

`document.tabId?`

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

`document.title?`

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

`searchText?`

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

`snippetTextSize?`

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

`dispString`

</td>
<td>

`string`

</td>
<td>

[apps/web/src/lib/components/TabManager/find-in-tab-content.js:8](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/TabManager/find-in-tab-content.js#L8)

</td>
</tr>
<tr>
<td>

`favIconUrl`

</td>
<td>

`string`

</td>
<td>

[apps/web/src/lib/components/TabManager/find-in-tab-content.js:11](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/TabManager/find-in-tab-content.js#L11)

</td>
</tr>
<tr>
<td>

`id`

</td>
<td>

`number`

</td>
<td>

[apps/web/src/lib/components/TabManager/find-in-tab-content.js:9](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/TabManager/find-in-tab-content.js#L9)

</td>
</tr>
<tr>
<td>

`lastSearchWord`

</td>
<td>

`string`

</td>
<td>

[apps/web/src/lib/components/TabManager/find-in-tab-content.js:12](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/TabManager/find-in-tab-content.js#L12)

</td>
</tr>
<tr>
<td>

`title`

</td>
<td>

`string`

</td>
<td>

[apps/web/src/lib/components/TabManager/find-in-tab-content.js:10](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/TabManager/find-in-tab-content.js#L10)

</td>
</tr>
</tbody>
</table>
