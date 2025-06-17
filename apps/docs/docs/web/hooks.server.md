[Documentation](modules.md) / hooks.server

## allowCORSAccessAPI

```ts
const allowCORSAccessAPI: Handle;
```

Defined in: apps/web/src/hooks.server.ts:47

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

Defined in: apps/web/src/hooks.server.ts:98

***

## handleAuth()

```ts
function handleAuth(__namedParameters: object): Promise<any>;
```

Defined in: apps/web/src/hooks.server.ts:24

handle better Auth
Create auth instance with the current request's environment

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

\{ `event`: `any`; `resolve`: `any`; \}

</td>
</tr>
<tr>
<td>

`__namedParameters.event`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`__namedParameters.resolve`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;
