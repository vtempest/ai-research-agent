[Documentation](../../modules.md) / routes/settings/+layout.server

## load()

```ts
function load(__namedParameters: object): Promise<{
  user: any;
}>;
```

Defined in: apps/web/src/routes/settings/+layout.server.ts:2

pass the user object into $props

### Parameters

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

\{ `locals`: \{ `user`: `any`; \}; \}

</td>
</tr>
<tr>
<td>

`__namedParameters.locals`

</td>
<td>

\{ `user`: `any`; \}

</td>
</tr>
<tr>
<td>

`__namedParameters.locals.user`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;\{
  `user`: `any`;
\}&gt;
