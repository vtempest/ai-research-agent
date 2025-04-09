[qwksearch-web-app](../../../modules.md) / routes/auth/register/+page.server

## Functions

### load()

```ts
function load(__namedParameters): Promise<{
  form: SuperValidated<{
     email: string;
     name: string;
     password: string;
     passwordConfirm: string;
    }, any, {
     email: string;
     name: string;
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

\{ `locals`: `any`; \}

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
</tbody>
</table>

#### Returns

`Promise`&lt;\{
  `form`: `SuperValidated`&lt;\{
     `email`: `string`;
     `name`: `string`;
     `password`: `string`;
     `passwordConfirm`: `string`;
    \}, `any`, \{
     `email`: `string`;
     `name`: `string`;
     `password`: `string`;
     `passwordConfirm`: `string`;
    \}&gt;;
 \}&gt;

## Variables

### actions

```ts
const actions: object;
```

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`default`

</td>
<td>

(`event`) => `Promise`&lt;\{\} \| `ActionFailure`&lt;\{\}&gt;&gt;

</td>
</tr>
</tbody>
</table>
