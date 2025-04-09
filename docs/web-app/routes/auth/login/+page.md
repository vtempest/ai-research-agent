[qwksearch-web-app](../../../modules.md) / routes/auth/login/+page.server

## Functions

### load()

```ts
function load(event): MaybePromise<
  | void
  | Omit<PageData, "user"> & Partial<Pick<PageData, never>> & Record<string, any>>
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

`ServerLoadEvent`&lt;`RouteParams`, `Omit`&lt;\{ `user`: `User`; \}, `never`&gt;, `"/auth/login"`&gt;

</td>
</tr>
</tbody>
</table>

#### Returns

`MaybePromise`&lt;
  \| `void`
  \| `Omit`&lt;`PageData`, `"user"`&gt; & `Partial`&lt;`Pick`&lt;`PageData`, `never`&gt;&gt; & `Record`&lt;`string`, `any`&gt;&gt;

## Variables

### actions

```ts
const actions: Actions;
```
