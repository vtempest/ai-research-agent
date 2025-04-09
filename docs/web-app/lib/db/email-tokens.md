[qwksearch-web-app](../../modules.md) / lib/db/email-tokens

## Functions

### createToken()

```ts
function createToken(db, newToken): Promise<any>
```

Creates a new token in the database

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

`db`

</td>
<td>

`any`

</td>
<td>

The database to use

</td>
</tr>
<tr>
<td>

`newToken`

</td>
<td>

`any`

</td>
<td>

The token to create

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

The created token, or undefined if the token already exists

***

### deleteAllTokensByUserId()

```ts
function deleteAllTokensByUserId(
   db, 
   userId, 
   type): Promise<any>
```

Deletes all tokens for a user

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

`db`

</td>
<td>

`any`

</td>
<td>

The database to use

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

The user ID to delete tokens for

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`any`

</td>
<td>

The type of the tokens to delete

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

The deleted tokens, or undefined if no tokens were deleted

***

### deleteToken()

```ts
function deleteToken(
   db, 
   token, 
   type): Promise<any>
```

Deletes a token by token and type

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

`db`

</td>
<td>

`any`

</td>
<td>

The database to use

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`string`

</td>
<td>

The token to delete

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`any`

</td>
<td>

The type of the token to delete

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

The deleted token, or undefined if it doesn't exist

***

### generateToken()

```ts
function generateToken(
   db, 
   userId, 
   email, 
   type): Promise<string>
```

Generates a token for email verification and password resets

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

`db`

</td>
<td>

`any`

</td>
<td>

The database to use

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

The user to generate the token for

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

The email to associate with the token

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`any`

</td>
<td>

The type of the token

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;

The generated token

***

### getToken()

```ts
function getToken(db, token): Promise<any>
```

Gets a token by token

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

`db`

</td>
<td>

`any`

</td>
<td>

The database to use

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`string`

</td>
<td>

The token to get

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

The token, or undefined if it doesn't exist

***

### getTokenByUserId()

```ts
function getTokenByUserId(
   db, 
   userId, 
   type): Promise<any>
```

Gets a token by user ID and type

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

`db`

</td>
<td>

`any`

</td>
<td>

The database to use

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

The user ID to get

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`any`

</td>
<td>

The type of the token to get

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

The token, or undefined if it doesn't exist

***

### verifyToken()

```ts
function verifyToken(
   db, 
   userId, 
   token, 
   type, 
   email?): Promise<string | undefined>
```

Verifies that the given token is valid and matches the given user and email

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

`db`

</td>
<td>

`any`

</td>
<td>

The database to use

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

The user to verify the token for

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`string`

</td>
<td>

The token to verify

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`any`

</td>
<td>

The type of the token

</td>
</tr>
<tr>
<td>

`email`?

</td>
<td>

`string`

</td>
<td>

The email to associate with the token

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string` \| `undefined`&gt;

The email associated with the token if it is valid, otherwise undefined
