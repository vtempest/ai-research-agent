[Documentation](../../modules.md) / components/ShortcutSearch/shortcut-search-web

## extractGoogleResultsPage()

```ts
function extractGoogleResultsPage(document: Document): object[];
```

Defined in: [apps/web/src/lib/components/ShortcutSearch/shortcut-search-web.js:53](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/ShortcutSearch/shortcut-search-web.js#L53)

Extract resuls JSON object from Google results html page
The results html page keeps changing so this minimizes 
use of classes and extracts; title, url, snippet

TODO insert these results into the Sidebar as you read to flip to next result

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`document`

</td>
<td>

`Document`

</td>
<td>

Google results HTML document object

</td>
</tr>
</tbody>
</table>

### Returns

`object`[]

- array of objects with title, url, snippet

***

## openTabSearchWeb()

```ts
function openTabSearchWeb(query: string, shouldOpenInBackground: boolean): void;
```

Defined in: [apps/web/src/lib/components/ShortcutSearch/shortcut-search-web.js:8](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/ShortcutSearch/shortcut-search-web.js#L8)

Searches Google in background tab and opens first result if on that page

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

`query`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

text to search

</td>
</tr>
<tr>
<td>

`shouldOpenInBackground`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Returns

`void`
