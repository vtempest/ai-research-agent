[qwksearch-web-app](../../../../../modules.md) / routes/auth/reset-password/\[userId\]/new-password/+page.server

## Functions

### load()

```ts
function load(__namedParameters): Promise<{
  form: SuperValidated<{
     password: string;
     passwordConfirm: string;
    }, any, {
     password: string;
     passwordConfirm: string;
    }>;
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

`ServerLoadEvent`&lt;`RouteParams`, `Omit`&lt;\{ `user`: `User`; \}, `never`&gt;, `"/auth/reset-password/[userId]/new-password"`&gt;

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;\{
  `form`: `SuperValidated`&lt;\{
     `password`: `string`;
     `passwordConfirm`: `string`;
    \}, `any`, \{
     `password`: `string`;
     `passwordConfirm`: `string`;
    \}&gt;;
 \}&gt;

## Variables

### actions

```ts
const actions: Actions;
```
