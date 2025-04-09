[qwksearch-web-app](../../modules.md) / lib/middleware/email

## Functions

### sendEmail()

```ts
function sendEmail(
   email, 
   subject, 
   body): Promise<boolean>
```

Sends an email to the specified email address.

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

`email`

</td>
<td>

`string`

</td>
<td>

The email address to send the email to.

</td>
</tr>
<tr>
<td>

`subject`

</td>
<td>

`string`

</td>
<td>

The subject of the email.

</td>
</tr>
<tr>
<td>

`body`

</td>
<td>

`string`

</td>
<td>

The content of the email.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`boolean`&gt;

A promise that resolves to a boolean indicating whether the email was sent successfully.

#### See

Resend [Resend Docs](https://resend.com/docs/introduction)

***

### sendEmailChangeEmail()

```ts
function sendEmailChangeEmail(
   email, 
   name, 
   token): Promise<boolean>
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

`email`

</td>
<td>

`string`

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

`token`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`boolean`&gt;

***

### sendEmailVerificationEmail()

```ts
function sendEmailVerificationEmail(
   email, 
   name, 
   token): Promise<boolean>
```

Sends a verification email to the specified email address.

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

`email`

</td>
<td>

`string`

</td>
<td>

The email address to send the verification email to.

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

The name of the user to include in the email.

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

The verification token to include in the email.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`boolean`&gt;

A promise that resolves to a boolean indicating whether the email was sent successfully.

***

### sendPasswordResetEmail()

```ts
function sendPasswordResetEmail(email, token): Promise<boolean>
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

`email`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`boolean`&gt;

***

### sendWelcomeEmail()

```ts
function sendWelcomeEmail(email, name): Promise<boolean>
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

`email`

</td>
<td>

`string`

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
</tbody>
</table>

#### Returns

`Promise`&lt;`boolean`&gt;
