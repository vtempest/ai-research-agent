[Documentation](../../../modules.md) / routes/api/user/+server

## GET()

```ts
function GET(__namedParameters: object): Promise<Response>;
```

Defined in: apps/web-app/src/routes/api/user/+server.ts:7

Serve user object

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

### Returns

`Promise`&lt;`Response`&gt;

***

## POST()

```ts
function POST(__namedParameters: object): Promise<Response>;
```

Defined in: apps/web-app/src/routes/api/user/+server.ts:13

Update user object

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

\{ `locals`: `any`; `request`: `any`; \}

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

`__namedParameters.request`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`Response`&gt;
