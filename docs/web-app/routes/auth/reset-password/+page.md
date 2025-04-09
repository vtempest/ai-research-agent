[qwksearch-web-app](../../../modules.md) / routes/auth/reset-password/+page.server

## Functions

### load()

```ts
function load(__namedParameters): Promise<{
  form: SuperValidated<{
     email: string;
    }, any, {
     email: string;
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

`ServerLoadEvent`&lt;`RouteParams`, `Omit`&lt;\{ `user`: `User`; \}, `never`&gt;, `"/auth/reset-password"`&gt;

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;\{
  `form`: `SuperValidated`&lt;\{
     `email`: `string`;
    \}, `any`, \{
     `email`: `string`;
    \}&gt;;
 \}&gt;

## Variables

### actions

```ts
const actions: Actions;
```
