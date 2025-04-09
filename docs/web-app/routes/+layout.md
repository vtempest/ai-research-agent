[qwksearch-web-app](../modules.md) / routes/+layout.server

## Functions

### load()

```ts
function load(event): MaybePromise<void | Partial<PageData> & Record<string, any>>
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

`event`

</td>
<td>

`ServerLoadEvent`&lt;\{ `userId`: `string`; \}, \{\}, `LayoutRouteId`&gt;

</td>
</tr>
</tbody>
</table>

#### Returns

`MaybePromise`&lt;`void` \| `Partial`&lt;`PageData`&gt; & `Record`&lt;`string`, `any`&gt;&gt;
