[qwksearch-web-app](../../modules.md) / lib/middleware/auth

## Functions

### createAndSetSession()

```ts
function createAndSetSession(
   lucia, 
   userId, 
   cookies): Promise<void>
```

Creates a new session for the given user and sets it

#### Parameters

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

`lucia`

</td>
<td>

`Lucia`

</td>
<td>

The Lucia instance to use

</td>
</tr>
<tr>
<td>

`userId`

</td>
<td>

`string`

</td>
<td>

The user to create the session for

</td>
</tr>
<tr>
<td>

`cookies`

</td>
<td>

`Cookies`

</td>
<td>

The cookies to use

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`void`&gt;

***

### generateId()

```ts
function generateId(length?): string
```

Generates a random alphanumeric key.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`length`?

</td>
<td>

`number`

</td>
<td>

`32`

</td>
<td>

The length of the  key

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

The random key

***

### handleAuthProviderCallback()

```ts
function handleAuthProviderCallback(
   cookies, 
   url, 
   locals, 
   providerId): Promise<
  | {
  error: any;
  success: undefined;
 }
  | {
  error: undefined;
  success: boolean;
 }>
```

Handles the Third-Party OAuth callback and creates a session for the user.
Validates the OAuth callback code, OAuth state and code verifier.

#### Parameters

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

`cookies`

</td>
<td>

`Cookies`

</td>
<td>

The cookies object.

</td>
</tr>
<tr>
<td>

`url`

</td>
<td>

`URL`

</td>
<td>

The URL object.

</td>
</tr>
<tr>
<td>

`locals`

</td>
<td>

`Locals`

</td>
<td>

The locals object.

</td>
</tr>
<tr>
<td>

`providerId`

</td>
<td>

`string`

</td>
<td>

Google, GitHub, Discord, Apple, Microsoft, Facebook, X, etc

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;
  \| \{
  `error`: `any`;
  `success`: `undefined`;
 \}
  \| \{
  `error`: `undefined`;
  `success`: `boolean`;
 \}&gt;

#### See

 - Keys: [Google OAuth API Keys](https://console.cloud.google.com/apis/credentials)
 - Docs: [Google OAuth API Docs](https://developers.google.com/identity/protocols/oauth2)

***

### initiateAuthProvider()

```ts
function initiateAuthProvider(
   url, 
   cookies, 
   providerId): any
```

Initialize third party OAuth by creating cookies
and return auth url to forward to for login.

#### Parameters

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

`url`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
<tr>
<td>

`cookies`

</td>
<td>

`Cookies`

</td>
<td>

</td>
</tr>
<tr>
<td>

`providerId`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

***

### isAnonymous()

```ts
function isAnonymous(locals): void
```

Checks if the user is anonymous.Redirects home if they are not.

#### Parameters

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

`locals`

</td>
<td>

`Locals`

</td>
<td>

The locals object of RequestEvent.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

void

***

### isUserAdmin()

```ts
function isUserAdmin(
   locals, 
   cookies, 
   url): object
```

Checks if the user is authenticated and has admin privileges.
Redirects them to the dashboard if they are not.

#### Parameters

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

`locals`

</td>
<td>

`Locals`

</td>
<td>

The locals object of RequestEvent.

</td>
</tr>
<tr>
<td>

`cookies`

</td>
<td>

`Cookies`

</td>
<td>

The cookies object of RequestEvent.

</td>
</tr>
<tr>
<td>

`url`

</td>
<td>

`any`

</td>
<td>

The URL object.

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

void

| Name | Type | Default value |
| ------ | ------ | ------ |
| `error` | `string` | "Unauthorized" |

***

### isUserAuthenticated()

```ts
function isUserAuthenticated(
   locals, 
   cookies, 
   url): void
```

Checks if the user is authenticated.
Redirects them to the login page if they are not.

#### Parameters

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

`locals`

</td>
<td>

`Locals`

</td>
<td>

The locals object of RequestEvent.

</td>
</tr>
<tr>
<td>

`cookies`

</td>
<td>

`Cookies`

</td>
<td>

The cookies object of RequestEvent.

</td>
</tr>
<tr>
<td>

`url`

</td>
<td>

`any`

</td>
<td>

The URL object.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

void

***

### isUserNotVerified()

```ts
function isUserNotVerified(
   locals, 
   cookies, 
   url): void
```

Checks if the user is authenticated and is not verified.
Redirects them to the dashboard if they are not.

#### Parameters

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

`locals`

</td>
<td>

`Locals`

</td>
<td>

The locals object of RequestEvent.

</td>
</tr>
<tr>
<td>

`cookies`

</td>
<td>

`Cookies`

</td>
<td>

The cookies object of RequestEvent.

</td>
</tr>
<tr>
<td>

`url`

</td>
<td>

`any`

</td>
<td>

The URL object.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

void

***

### logoutSession()

```ts
function logoutSession(
   session, 
   lucia, 
   cookies): Promise<void>
```

Destroys the current session for the given user

#### Parameters

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

`session`

</td>
<td>

`Session`

</td>
<td>

The session object

</td>
</tr>
<tr>
<td>

`lucia`

</td>
<td>

`Lucia`

</td>
<td>

The Lucia instance to use

</td>
</tr>
<tr>
<td>

`cookies`

</td>
<td>

`Cookies`

</td>
<td>

The cookies to use

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`void`&gt;

***

### upsertUserLinkAccount()

```ts
function upsertUserLinkAccount(
   cookies, 
   locals, 
   providerId, 
   providerUserId, 
   email, 
   name, 
   picture): Promise<
  | {
  error: any;
  success: undefined;
 }
  | {
  error: undefined;
  success: boolean;
 }>
```

Either creates a new user or links the OAuth account to
an existing user.

#### Parameters

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

`cookies`

</td>
<td>

`Cookies`

</td>
<td>

The cookies object.

</td>
</tr>
<tr>
<td>

`locals`

</td>
<td>

`Locals`

</td>
<td>

The locals object.

</td>
</tr>
<tr>
<td>

`providerId`

</td>
<td>

`string`

</td>
<td>

Google, GitHub, Discord, Apple, Microsoft, Facebook, X, etc

</td>
</tr>
<tr>
<td>

`providerUserId`

</td>
<td>

`string`

</td>
<td>

The user ID of the provider.

</td>
</tr>
<tr>
<td>

`email`

</td>
<td>

`string`

</td>
<td>

The email of the user.

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

The name of the user.

</td>
</tr>
<tr>
<td>

`picture`

</td>
<td>

`string`

</td>
<td>

The picture of the user.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;
  \| \{
  `error`: `any`;
  `success`: `undefined`;
 \}
  \| \{
  `error`: `undefined`;
  `success`: `boolean`;
 \}&gt;
