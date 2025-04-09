[qwksearch-web-app](../../../../modules.md) / routes/auth/new-email/confirm/+page.server

## Functions

### load()

```ts
function load(__namedParameters): Promise<{
  form: SuperValidated<{
     token: string;
    }, any, {
     token: string;
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

\{ `cookies`: `any`; `locals`: `any`; `url`: `any`; \}

</td>
</tr>
<tr>
<td>

`__namedParameters.cookies`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`__namedParameters.locals`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`__namedParameters.url`

</td>
<td>

`any`

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
 \}&gt;

## Variables

### actions

```ts
const actions: Actions;
```
