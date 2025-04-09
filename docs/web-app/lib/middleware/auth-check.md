[qwksearch-web-app](../../modules.md) / lib/middleware/auth-check

## Functions

### checkAuthRouteHandler()

```ts
function checkAuthRouteHandler(input): MaybePromise<Response>
```

1. Add database, user, Lucia to each route controller as locals obj
2. Authenticate the user by validating the session
using the sessionId from the browser's cookies
3. Ensure the user is authorized to access the route

Does not authenticate when server-side rendering the routes

[How Hooks Work](https://www.youtube.com/watch?v=K1Tya6ovVOI)

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

`input`

</td>
<td>

\{\}

</td>
</tr>
</tbody>
</table>

#### Returns

`MaybePromise`&lt;`Response`&gt;

- The resolved response

## Type Aliases

### OAuthUser

```ts
type OAuthUser = object;
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

`auth_methods`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`avatar_url`

</td>
<td>

`string` \| `null`

</td>
</tr>
<tr>
<td>

`created_at`

</td>
<td>

`Date`

</td>
</tr>
<tr>
<td>

`email`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`is_admin`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`is_verified`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`modified_at`

</td>
<td>

`Date` \| `null`

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`username`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

## Variables

### LOGIN\_COOKIE\_NAME

```ts
const LOGIN_COOKIE_NAME: "site_auth" = "site_auth";
```

***

### SESSION\_EXPIRATION\_TIME

```ts
const SESSION_EXPIRATION_TIME: 30 = 30;
```
