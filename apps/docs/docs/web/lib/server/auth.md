[Documentation](../../modules.md) / lib/server/auth

## auth

```ts
auth: any;
```

Defined in: apps/web/src/lib/server/auth.ts:39

***

## permissions

```ts
const permissions: object;
```

Defined in: apps/web/src/lib/server/auth.ts:115

### Type declaration

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

<a id="admin"></a> `/admin`

</td>
<td>

`string`[]

</td>
<td>

apps/web/src/lib/server/auth.ts:116

</td>
</tr>
<tr>
<td>

<a id="settings"></a> `/settings`

</td>
<td>

`string`[]

</td>
<td>

apps/web/src/lib/server/auth.ts:117

</td>
</tr>
</tbody>
</table>

***

## initializeUser()

```ts
function initializeUser(locals: any, request: any): Promise<any>;
```

Defined in: apps/web/src/lib/server/auth.ts:144

Get user object from locals of the request

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

`locals`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`request`

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

## initAuthRouteHandler()

```ts
function initAuthRouteHandler(__namedParameters: object): Promise<any>;
```

Defined in: apps/web/src/lib/server/auth.ts:13

Updated route handler that creates auth instance per request

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

\{ `event`: `any`; `resolve`: `Function`; \}

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

`Function`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;

***

## createAuth()

```ts
function createAuth(env: any): any;
```

Defined in: apps/web/src/lib/server/auth.ts:41

Factory function to create auth instance with platform env

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

`env`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`any`

***

## initDatabase()

```ts
function initDatabase(__namedParameters: object): Promise<any>;
```

Defined in: apps/web/src/lib/server/auth.ts:109

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

\{ `event`: `any`; `resolve`: `Function`; \}

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

`Function`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;

***

## checkAuthorization()

```ts
function checkAuthorization(__namedParameters: object): Promise<any>;
```

Defined in: apps/web/src/lib/server/auth.ts:124

SvelteKit hook for checking user authorization and handling route protection

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

\{ `event`: `any`; `resolve`: `Function`; \}

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

`Function`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;
