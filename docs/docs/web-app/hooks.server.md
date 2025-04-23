[Documentation](modules.md) / hooks.server

## allowCORSAccessAPI

```ts
const allowCORSAccessAPI: Handle;
```

Defined in: web-app/src/hooks.server.ts:24

Enable API access for users with valid API keys and allow CORS.

### Param

RequestEvent, resolve: Function

### Returns

- The resolved response

***

## handle

```ts
const handle: Handle;
```

Defined in: web-app/src/hooks.server.ts:96

***

## handleError()

```ts
function handleError(param0: object): object;
```

Defined in: web-app/src/hooks.server.ts:83

Handles any errors that occur during the execution of the hooks

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

`param0`

</td>
<td>

\{ `error`: `any`; `message`: `any`; `status`: `any`; \}

</td>
<td>

The parameters object

</td>
</tr>
<tr>
<td>

`param0.error`

</td>
<td>

`any`

</td>
<td>

The error object

</td>
</tr>
<tr>
<td>

`param0.message`

</td>
<td>

`any`

</td>
<td>

The error message

</td>
</tr>
<tr>
<td>

`param0.status`

</td>
<td>

`any`

</td>
<td>

The HTTP status code

</td>
</tr>
</tbody>
</table>

### Returns

`object`

The resolved event

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`message`

</td>
<td>

`any`

</td>
<td>

web-app/src/hooks.server.ts:93

</td>
</tr>
</tbody>
</table>
