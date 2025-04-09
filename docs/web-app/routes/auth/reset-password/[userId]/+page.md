[qwksearch-web-app](../../../../modules.md) / routes/auth/reset-password/\[userId\]/+page.server

## Functions

### load()

```ts
function load(__namedParameters): Promise<{
  form: SuperValidated<{
     token: string;
    }, any, {
     token: string;
    }>;
  userId: string;
 }>
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

`__namedParameters`

</td>
<td>

`ServerLoadEvent`&lt;`RouteParams`, `Omit`&lt;\{ `user`: `User`; \}, `never`&gt;, `"/auth/reset-password/[userId]"`&gt;

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;\{
  `form`: `SuperValidated`&lt;\{
     `token`: `string`;
    \}, `any`, \{
     `token`: `string`;
    \}&gt;;
  `userId`: `string`;
 \}&gt;

## Variables

### actions

```ts
const actions: Actions;
```
