[Documentation](../modules.md) / server/email

## sendEmail()

```ts
function sendEmail(
   email: string, 
   subject: string, 
   body: string, 
   authResendKey: string): Promise<boolean>;
```

Defined in: [apps/web/src/lib/server/email.ts:58](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/email.ts#L58)

Sends an email to the specified email address.

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
<tr>
<td>

`authResendKey`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`boolean`&gt;

A promise that resolves to a boolean indicating whether the email was sent successfully.

### See

Resend [Resend Docs](https://resend.com/docs/introduction)

***

## sendEmailChangeEmail()

```ts
function sendEmailChangeEmail(
   email: string, 
   name: string, 
   token: string, 
   authResendKey: string): Promise<boolean>;
```

Defined in: [apps/web/src/lib/server/email.ts:137](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/email.ts#L137)

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
<tr>
<td>

`authResendKey`

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

## sendEmailVerificationEmail()

```ts
function sendEmailVerificationEmail(
   email: string, 
   name: string, 
   token: string, 
   authResendKey: string): Promise<boolean>;
```

Defined in: [apps/web/src/lib/server/email.ts:89](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/email.ts#L89)

Sends a verification email to the specified email address.

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
<tr>
<td>

`authResendKey`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`boolean`&gt;

A promise that resolves to a boolean indicating whether the email was sent successfully.

***

## sendPasswordResetEmail()

```ts
function sendPasswordResetEmail(
   email: string, 
   token: string, 
   authResendKey: string): Promise<boolean>;
```

Defined in: [apps/web/src/lib/server/email.ts:122](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/email.ts#L122)

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
<tr>
<td>

`authResendKey`

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

## sendWelcomeEmail()

```ts
function sendWelcomeEmail(
   email: string, 
   name: string, 
   authResendKey: string): Promise<boolean>;
```

Defined in: [apps/web/src/lib/server/email.ts:106](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/email.ts#L106)

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

`authResendKey`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`boolean`&gt;
