[Documentation](../modules.md) / server/auth

## auth

```ts
auth: any;
```

Defined in: [apps/web/src/lib/server/auth.ts:39](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/auth.ts#L39)

***

## permissions

```ts
const permissions: object;
```

Defined in: [apps/web/src/lib/server/auth.ts:115](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/auth.ts#L115)

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

[apps/web/src/lib/server/auth.ts:116](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/auth.ts#L116)

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

[apps/web/src/lib/server/auth.ts:117](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/auth.ts#L117)

</td>
</tr>
</tbody>
</table>

***

## checkAuthorization()

```ts
function checkAuthorization(__namedParameters: object): Promise<any>;
```

Defined in: [apps/web/src/lib/server/auth.ts:124](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/auth.ts#L124)

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

***

## createAuth()

```ts
function createAuth(env: any): any;
```

Defined in: [apps/web/src/lib/server/auth.ts:41](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/auth.ts#L41)

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

## initAuthRouteHandler()

```ts
function initAuthRouteHandler(__namedParameters: object): Promise<any>;
```

Defined in: [apps/web/src/lib/server/auth.ts:13](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/auth.ts#L13)

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

## initDatabase()

```ts
function initDatabase(__namedParameters: object): Promise<any>;
```

Defined in: [apps/web/src/lib/server/auth.ts:109](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/auth.ts#L109)

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

## initializeUser()

```ts
function initializeUser(locals: any, request: any): Promise<any>;
```

Defined in: [apps/web/src/lib/server/auth.ts:144](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/auth.ts#L144)

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
