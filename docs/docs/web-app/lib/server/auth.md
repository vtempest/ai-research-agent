[Documentation](../../modules.md) / lib/server/auth

## checkAuthorization()

```ts
function checkAuthorization(__namedParameters: object): Promise<any>;
```

Defined in: web-app/src/lib/server/auth.ts:221

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

***

## initAuth()

```ts
function initAuth(env: any, options?: any): object;
```

Defined in: web-app/src/lib/server/auth.ts:51

Initialize SvelteKitAuth session handler

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

`env`

</td>
<td>

`any`

</td>
<td>

SvelteKit environment

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`any`

</td>
<td>

Additional options

</td>
</tr>
</tbody>
</table>

### Returns

`object`

- SvelteKitAuth instance

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

`handle`

</td>
<td>

`Handle`

</td>
<td>

web-app/src/lib/server/auth.ts:201

</td>
</tr>
<tr>
<td>

`signIn`

</td>
<td>

`Action`

</td>
<td>

web-app/src/lib/server/auth.ts:201

</td>
</tr>
<tr>
<td>

`signOut`

</td>
<td>

`Action`

</td>
<td>

web-app/src/lib/server/auth.ts:201

</td>
</tr>
</tbody>
</table>

***

## initAuthRouteHandler()

```ts
function initAuthRouteHandler(__namedParameters: object): Promise<Response>;
```

Defined in: web-app/src/lib/server/auth.ts:215

Initialize auth.js session provider handler

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

`Promise`&lt;`Response`&gt;

***

## initDatabase()

```ts
function initDatabase(__namedParameters: object): Promise<any>;
```

Defined in: web-app/src/lib/server/auth.ts:207

Add drizzle DB to locals.db

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
