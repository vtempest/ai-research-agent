[Documentation](../../modules.md) / lib/server/validations

## USERNAME\_MIN\_LEN

```ts
const USERNAME_MIN_LEN: 3 = 3;
```

Defined in: apps/web/src/lib/server/validations.ts:10

Validations module uses the Zod library to define 
and validate different types of user inputs.

### See

 - Zod [Zod Docs](https://zod.dev/?id=basic-usage)
 - flash-messages [sveltekit-flash-messages](https://github.com/ciscoheat/sveltekit-flash-messages#how-to-use)

***

## USERNAME\_MAX\_LEN

```ts
const USERNAME_MAX_LEN: 20 = 20;
```

Defined in: apps/web/src/lib/server/validations.ts:11

***

## PASSWORD\_MIN\_LEN

```ts
const PASSWORD_MIN_LEN: 6 = 6;
```

Defined in: apps/web/src/lib/server/validations.ts:13

***

## PASSWORD\_MAX\_LEN

```ts
const PASSWORD_MAX_LEN: 50 = 50;
```

Defined in: apps/web/src/lib/server/validations.ts:14

***

## NAME\_MIN\_LEN

```ts
const NAME_MIN_LEN: 3 = 3;
```

Defined in: apps/web/src/lib/server/validations.ts:16

***

## NAME\_MAX\_LEN

```ts
const NAME_MAX_LEN: 50 = 50;
```

Defined in: apps/web/src/lib/server/validations.ts:17

***

## EMAIL\_MIN\_LEN

```ts
const EMAIL_MIN_LEN: 6 = 6;
```

Defined in: apps/web/src/lib/server/validations.ts:19

***

## EMAIL\_MAX\_LEN

```ts
const EMAIL_MAX_LEN: 50 = 50;
```

Defined in: apps/web/src/lib/server/validations.ts:20

***

## MESSAGE\_MIN\_LEN

```ts
const MESSAGE_MIN_LEN: 4 = 4;
```

Defined in: apps/web/src/lib/server/validations.ts:22

***

## MESSAGE\_MAX\_LEN

```ts
const MESSAGE_MAX_LEN: 1000 = 1000;
```

Defined in: apps/web/src/lib/server/validations.ts:23

***

## USER\_ID\_LEN

```ts
const USER_ID_LEN: 15 = 15;
```

Defined in: apps/web/src/lib/server/validations.ts:25

***

## SESSION\_ID\_LEN

```ts
const SESSION_ID_LEN: 40 = 40;
```

Defined in: apps/web/src/lib/server/validations.ts:27

***

## TOKEN\_LEN

```ts
const TOKEN_LEN: 15 = 15;
```

Defined in: apps/web/src/lib/server/validations.ts:29

***

## TOKEN\_EXPIRATION\_TIME

```ts
const TOKEN_EXPIRATION_TIME: 30 = 30;
```

Defined in: apps/web/src/lib/server/validations.ts:30

***

## emailField

```ts
const emailField: ZodString;
```

Defined in: apps/web/src/lib/server/validations.ts:33

Core Field Validations

***

## isAdminField

```ts
const isAdminField: ZodDefault<ZodBoolean>;
```

Defined in: apps/web/src/lib/server/validations.ts:44

***

## isVerifiedField

```ts
const isVerifiedField: ZodDefault<ZodBoolean>;
```

Defined in: apps/web/src/lib/server/validations.ts:46

***

## nameField

```ts
const nameField: ZodString;
```

Defined in: apps/web/src/lib/server/validations.ts:48

***

## passwordConfirmField

```ts
const passwordConfirmField: ZodString;
```

Defined in: apps/web/src/lib/server/validations.ts:58

***

## passwordField

```ts
const passwordField: ZodString;
```

Defined in: apps/web/src/lib/server/validations.ts:86

***

## tokenField

```ts
const tokenField: ZodString;
```

Defined in: apps/web/src/lib/server/validations.ts:96

***

## userIdField

```ts
const userIdField: ZodString;
```

Defined in: apps/web/src/lib/server/validations.ts:101

***

## usernameField

```ts
const usernameField: ZodString;
```

Defined in: apps/web/src/lib/server/validations.ts:108

***

## loginFormSchema

```ts
const loginFormSchema: ZodObject<{
  email: ZodString;
  password: ZodString;
}, "strip", ZodTypeAny, {
  email?: string;
  password?: string;
}, {
  email?: string;
  password?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:119

Auth Form Schemas

***

## registerFormSchema

```ts
const registerFormSchema: ZodEffects<ZodObject<{
  name: ZodString;
  email: ZodString;
  password: ZodString;
  passwordConfirm: ZodString;
}, "strip", ZodTypeAny, {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}, {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}>, {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}, {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:124

***

## verifyEmailFormSchema

```ts
const verifyEmailFormSchema: ZodObject<{
  token: ZodString;
}, "strip", ZodTypeAny, {
  token?: string;
}, {
  token?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:133

***

## changeEmailFormSchemaFirstStep

```ts
const changeEmailFormSchemaFirstStep: ZodObject<{
  email: ZodString;
}, "strip", ZodTypeAny, {
  email?: string;
}, {
  email?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:138

Change Email Form Schemas

***

## changeEmailFormSchemaSecondStep

```ts
const changeEmailFormSchemaSecondStep: ZodObject<{
  token: ZodString;
}, "strip", ZodTypeAny, {
  token?: string;
}, {
  token?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:142

***

## resetPasswordFormSchemaFirstStep

```ts
const resetPasswordFormSchemaFirstStep: ZodObject<{
  email: ZodString;
}, "strip", ZodTypeAny, {
  email?: string;
}, {
  email?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:147

Reset Password Form Schemas

***

## resetPasswordFormSchemaSecondStep

```ts
const resetPasswordFormSchemaSecondStep: ZodObject<{
  token: ZodString;
}, "strip", ZodTypeAny, {
  token?: string;
}, {
  token?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:151

***

## resetPasswordFormSchemaThirdStep

```ts
const resetPasswordFormSchemaThirdStep: ZodEffects<ZodObject<{
  password: ZodString;
  passwordConfirm: ZodString;
}, "strip", ZodTypeAny, {
  password?: string;
  passwordConfirm?: string;
}, {
  password?: string;
  passwordConfirm?: string;
}>, {
  password?: string;
  passwordConfirm?: string;
}, {
  password?: string;
  passwordConfirm?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:155

***

## settingsAccountFormSchema

```ts
const settingsAccountFormSchema: ZodObject<{
  name: ZodString;
}, "strip", ZodTypeAny, {
  name?: string;
}, {
  name?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:163

Settings Schemas

***

## settingsNotificationsFormSchema

```ts
const settingsNotificationsFormSchema: ZodObject<{
  name: ZodString;
}, "strip", ZodTypeAny, {
  name?: string;
}, {
  name?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:167

***

## settingsProfileFormSchema

```ts
const settingsProfileFormSchema: ZodObject<{
  username: ZodString;
}, "strip", ZodTypeAny, {
  username?: string;
}, {
  username?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:171

***

## tokenSchema

```ts
const tokenSchema: ZodObject<{
  token: ZodString;
}, "strip", ZodTypeAny, {
  token?: string;
}, {
  token?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:176

Parameter Schemas

***

## userIdSchema

```ts
const userIdSchema: ZodObject<{
  userId: ZodString;
}, "strip", ZodTypeAny, {
  userId?: string;
}, {
  userId?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:180

***

## updateUserFormSchema

```ts
const updateUserFormSchema: ZodObject<{
  name: ZodString;
}, "strip", ZodTypeAny, {
  name?: string;
}, {
  name?: string;
}>;
```

Defined in: apps/web/src/lib/server/validations.ts:185

Update User Schema

***

## passwordConfirmMustBeEqualToPassword()

```ts
function passwordConfirmMustBeEqualToPassword(__namedParameters: EqualPasswords, ctx: RefinementCtx): void;
```

Defined in: apps/web/src/lib/server/validations.ts:64

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

`EqualPasswords`

</td>
</tr>
<tr>
<td>

`ctx`

</td>
<td>

`RefinementCtx`

</td>
</tr>
</tbody>
</table>

### Returns

`void`
