[Documentation](../../modules.md) / lib/server/users

## createUser()

```ts
function createUser(db: any, newUser: any): Promise<any>;
```

Defined in: apps/web-app/src/lib/server/users.ts:12

Creates a new user

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

### Returns

`Promise`&lt;`any`&gt;

***

## getAllUsers()

```ts
function getAllUsers(db: any): Promise<any>;
```

Defined in: apps/web-app/src/lib/server/users.ts:35

Gets all users

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

### Returns

`Promise`&lt;`any`&gt;

***

## getUserByEmail()

```ts
function getUserByEmail(db: any, email: any): Promise<any>;
```

Defined in: apps/web-app/src/lib/server/users.ts:45

Gets a user by email

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

### Returns

`Promise`&lt;`any`&gt;

***

## getUserById()

```ts
function getUserById(db: any, id: any): Promise<any>;
```

Defined in: apps/web-app/src/lib/server/users.ts:57

Gets a user by id

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

### Returns

`Promise`&lt;`any`&gt;

***

## getUserByUsername()

```ts
function getUserByUsername(db: any, name: any): Promise<any>;
```

Defined in: apps/web-app/src/lib/server/users.ts:69

Gets a user by username

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

`name`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;

***

## updateUserById()

```ts
function updateUserById(
   db: any, 
   id: any, 
   userData: any): Promise<any>;
```

Defined in: apps/web-app/src/lib/server/users.ts:82

Updates a user by id

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

### Returns

`Promise`&lt;`any`&gt;

***

## deleteUserById()

```ts
function deleteUserById(db: any, id: any): Promise<any>;
```

Defined in: apps/web-app/src/lib/server/users.ts:102

Deletes a user by id

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

### Returns

`Promise`&lt;`any`&gt;

***

## createApiKey()

```ts
function createApiKey(length?: number): string;
```

Defined in: apps/web-app/src/lib/server/users.ts:117

Generates a random alphanumeric key.

### Parameters

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

`length?`

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

### Returns

`string`

The API key

***

## validateApiKey()

```ts
function validateApiKey(db: any, apiKey: string): Promise<boolean>;
```

Defined in: apps/web-app/src/lib/server/users.ts:140

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

### Returns

`Promise`&lt;`boolean`&gt;

***

## cancelStripeCustomerSubscriptions()

```ts
function cancelStripeCustomerSubscriptions(email: string, env: any): Promise<void>;
```

Defined in: apps/web-app/src/lib/server/users.ts:156

Cancels all subscriptions for a given customer email

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

`email`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
<tr>
<td>

`env`

</td>
<td>

`any`

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`void`&gt;

***

## getStripeManageSubscriptionURL()

```ts
function getStripeManageSubscriptionURL(email: any, env: any): Promise<string>;
```

Defined in: apps/web-app/src/lib/server/users.ts:190

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

`email`

</td>
<td>

`any`

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

`Promise`&lt;`string`&gt;
