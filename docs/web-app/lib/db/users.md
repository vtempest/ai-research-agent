[qwksearch-web-app](../../modules.md) / lib/db/users

## Functions

### createApiKey()

```ts
function createApiKey(length?): string
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

`64`

</td>
<td>

The length of the API key

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

The API key

***

### createUser()

```ts
function createUser(db, newUser): Promise<any>
```

Creates a new user

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

</td>
</tr>
<tr>
<td>

`newUser`

</td>
<td>

`any`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

***

### deleteUserById()

```ts
function deleteUserById(db, id): Promise<any>
```

Deletes a user by id

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

</td>
</tr>
<tr>
<td>

`id`

</td>
<td>

`any`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

***

### getAllUsers()

```ts
function getAllUsers(db): Promise<any>
```

Gets all users

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

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

***

### getUserByEmail()

```ts
function getUserByEmail(db, email): Promise<any>
```

Gets a user by email

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

</td>
</tr>
<tr>
<td>

`email`

</td>
<td>

`any`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

***

### getUserById()

```ts
function getUserById(db, id): Promise<any>
```

Gets a user by id

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

</td>
</tr>
<tr>
<td>

`id`

</td>
<td>

`any`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

***

### getUserByUsername()

```ts
function getUserByUsername(db, username): Promise<any>
```

Gets a user by username

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

</td>
</tr>
<tr>
<td>

`username`

</td>
<td>

`any`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

***

### updateUserById()

```ts
function updateUserById(
   db, 
   id, 
   userData): Promise<any>
```

Updates a user by id

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

</td>
</tr>
<tr>
<td>

`id`

</td>
<td>

`any`

</td>
<td>

</td>
</tr>
<tr>
<td>

`userData`

</td>
<td>

`any`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

***

### validateApiKey()

```ts
function validateApiKey(db, apiKey): Promise<boolean>
```

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

`db`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`apiKey`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`boolean`&gt;
