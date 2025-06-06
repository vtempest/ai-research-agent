[Documentation](../../modules.md) / lib/server/auth

## permissions

```ts
const permissions: object;
```

Defined in: apps/web-app/src/lib/server/auth.ts:136

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

apps/web-app/src/lib/server/auth.ts:137

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

apps/web-app/src/lib/server/auth.ts:138

</td>
</tr>
</tbody>
</table>

***

## authHelpers

```ts
const authHelpers: object;
```

Defined in: apps/web-app/src/lib/server/auth.ts:181

Helper functions for use in components and pages

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="signin"></a> `signIn()`

</td>
<td>

(`provider`: `string`, `redirectTo?`: `string`) => `Promise`&lt;`void`&gt;

</td>
<td>

Sign in with provider

</td>
<td>

apps/web-app/src/lib/server/auth.ts:185

</td>
</tr>
<tr>
<td>

<a id="signout"></a> `signOut()`

</td>
<td>

(`redirectTo?`: `string`) => `Promise`&lt;`void`&gt;

</td>
<td>

Sign out

</td>
<td>

apps/web-app/src/lib/server/auth.ts:195

</td>
</tr>
<tr>
<td>

<a id="getsession"></a> `getSession()`

</td>
<td>

() => `Promise`&lt;`any`&gt;

</td>
<td>

Get current session on client side

</td>
<td>

apps/web-app/src/lib/server/auth.ts:212

</td>
</tr>
</tbody>
</table>

***

## initAuth()

```ts
function initAuth(env: any, options?: object): object;
```

Defined in: apps/web-app/src/lib/server/auth.ts:21

Initialize Better Auth instance

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

Environment variables

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `SESSION_DURATION_IN_DAYS?`: `number`; `SHOULD_SEND_WELCOME_EMAIL?`: `boolean`; `ALLOW_ACCOUNT_LINKING?`: `boolean`; \}

</td>
<td>

Additional options

</td>
</tr>
<tr>
<td>

`options.SESSION_DURATION_IN_DAYS?`

</td>
<td>

`number`

</td>
<td>

Session duration in days

</td>
</tr>
<tr>
<td>

`options.SHOULD_SEND_WELCOME_EMAIL?`

</td>
<td>

`boolean`

</td>
<td>

Send welcome email to new users

</td>
</tr>
<tr>
<td>

`options.ALLOW_ACCOUNT_LINKING?`

</td>
<td>

`boolean`

</td>
<td>

Allow merging accounts by email

</td>
</tr>
</tbody>
</table>

### Returns

`object`

- Better Auth instance

***

## initializeUser()

```ts
function initializeUser(locals: any): Promise<User>;
```

Defined in: apps/web-app/src/lib/server/auth.ts:162

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
</tbody>
</table>

### Returns

`Promise`&lt;[`User`](../../global.md#user)&gt;

***

## getAuthenticatedUser()

```ts
function getAuthenticatedUser(request: Request, env: any): Promise<User>;
```

Defined in: apps/web-app/src/lib/server/auth.ts:224

Server-side helper to get authenticated user

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

`request`

</td>
<td>

`Request`

</td>
</tr>
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

`Promise`&lt;[`User`](../../global.md#user)&gt;

***

## initDatabase()

```ts
function initDatabase(__namedParameters: object): Promise<any>;
```

Defined in: apps/web-app/src/lib/server/auth.ts:110

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

## initAuthRouteHandler()

```ts
function initAuthRouteHandler(__namedParameters: object): Promise<any>;
```

Defined in: apps/web-app/src/lib/server/auth.ts:118

Initialize Better Auth route handler

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

Defined in: apps/web-app/src/lib/server/auth.ts:145

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
