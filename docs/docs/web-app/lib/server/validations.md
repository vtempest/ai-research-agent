[Documentation](../../modules.md) / lib/server/validations

## changeEmailFormSchemaFirstStep

```ts
const changeEmailFormSchemaFirstStep: ZodObject<{
  email: ZodString;
}, "strip", ZodTypeAny, {
  email: string;
}, {
  email: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:138

***

## changeEmailFormSchemaSecondStep

```ts
const changeEmailFormSchemaSecondStep: ZodObject<{
  token: ZodString;
}, "strip", ZodTypeAny, {
  token: string;
}, {
  token: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:142

***

## EMAIL\_MAX\_LEN

```ts
const EMAIL_MAX_LEN: 50 = 50;
```

Defined in: web-app/src/lib/server/validations.ts:20

***

## EMAIL\_MIN\_LEN

```ts
const EMAIL_MIN_LEN: 6 = 6;
```

Defined in: web-app/src/lib/server/validations.ts:19

***

## emailField

```ts
const emailField: ZodString;
```

Defined in: web-app/src/lib/server/validations.ts:33

***

## isAdminField

```ts
const isAdminField: ZodDefault<ZodBoolean>;
```

Defined in: web-app/src/lib/server/validations.ts:44

***

## isVerifiedField

```ts
const isVerifiedField: ZodDefault<ZodBoolean>;
```

Defined in: web-app/src/lib/server/validations.ts:46

***

## loginFormSchema

```ts
const loginFormSchema: ZodObject<{
  email: ZodString;
  password: ZodString;
}, "strip", ZodTypeAny, {
  email: string;
  password: string;
}, {
  email: string;
  password: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:119

***

## MESSAGE\_MAX\_LEN

```ts
const MESSAGE_MAX_LEN: 1000 = 1000;
```

Defined in: web-app/src/lib/server/validations.ts:23

***

## MESSAGE\_MIN\_LEN

```ts
const MESSAGE_MIN_LEN: 4 = 4;
```

Defined in: web-app/src/lib/server/validations.ts:22

***

## NAME\_MAX\_LEN

```ts
const NAME_MAX_LEN: 50 = 50;
```

Defined in: web-app/src/lib/server/validations.ts:17

***

## NAME\_MIN\_LEN

```ts
const NAME_MIN_LEN: 3 = 3;
```

Defined in: web-app/src/lib/server/validations.ts:16

***

## nameField

```ts
const nameField: ZodString;
```

Defined in: web-app/src/lib/server/validations.ts:48

***

## PASSWORD\_MAX\_LEN

```ts
const PASSWORD_MAX_LEN: 50 = 50;
```

Defined in: web-app/src/lib/server/validations.ts:14

***

## PASSWORD\_MIN\_LEN

```ts
const PASSWORD_MIN_LEN: 6 = 6;
```

Defined in: web-app/src/lib/server/validations.ts:13

***

## passwordConfirmField

```ts
const passwordConfirmField: ZodString;
```

Defined in: web-app/src/lib/server/validations.ts:58

***

## passwordField

```ts
const passwordField: ZodString;
```

Defined in: web-app/src/lib/server/validations.ts:86

***

## registerFormSchema

```ts
const registerFormSchema: ZodEffects<ZodObject<{
  email: ZodString;
  name: ZodString;
  password: ZodString;
  passwordConfirm: ZodString;
}, "strip", ZodTypeAny, {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}, {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}>, {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}, {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:124

***

## resetPasswordFormSchemaFirstStep

```ts
const resetPasswordFormSchemaFirstStep: ZodObject<{
  email: ZodString;
}, "strip", ZodTypeAny, {
  email: string;
}, {
  email: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:147

***

## resetPasswordFormSchemaSecondStep

```ts
const resetPasswordFormSchemaSecondStep: ZodObject<{
  token: ZodString;
}, "strip", ZodTypeAny, {
  token: string;
}, {
  token: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:151

***

## resetPasswordFormSchemaThirdStep

```ts
const resetPasswordFormSchemaThirdStep: ZodEffects<ZodObject<{
  password: ZodString;
  passwordConfirm: ZodString;
}, "strip", ZodTypeAny, {
  password: string;
  passwordConfirm: string;
}, {
  password: string;
  passwordConfirm: string;
}>, {
  password: string;
  passwordConfirm: string;
}, {
  password: string;
  passwordConfirm: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:155

***

## SESSION\_ID\_LEN

```ts
const SESSION_ID_LEN: 40 = 40;
```

Defined in: web-app/src/lib/server/validations.ts:27

***

## settingsAccountFormSchema

```ts
const settingsAccountFormSchema: ZodObject<{
  name: ZodString;
}, "strip", ZodTypeAny, {
  name: string;
}, {
  name: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:163

***

## settingsNotificationsFormSchema

```ts
const settingsNotificationsFormSchema: ZodObject<{
  name: ZodString;
}, "strip", ZodTypeAny, {
  name: string;
}, {
  name: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:167

***

## settingsProfileFormSchema

```ts
const settingsProfileFormSchema: ZodObject<{
  username: ZodString;
}, "strip", ZodTypeAny, {
  username: string;
}, {
  username: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:171

***

## TOKEN\_EXPIRATION\_TIME

```ts
const TOKEN_EXPIRATION_TIME: 30 = 30;
```

Defined in: web-app/src/lib/server/validations.ts:30

***

## TOKEN\_LEN

```ts
const TOKEN_LEN: 15 = 15;
```

Defined in: web-app/src/lib/server/validations.ts:29

***

## tokenField

```ts
const tokenField: ZodString;
```

Defined in: web-app/src/lib/server/validations.ts:96

***

## tokenSchema

```ts
const tokenSchema: ZodObject<{
  token: ZodString;
}, "strip", ZodTypeAny, {
  token: string;
}, {
  token: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:176

***

## updateUserFormSchema

```ts
const updateUserFormSchema: ZodObject<{
  name: ZodString;
}, "strip", ZodTypeAny, {
  name: string;
}, {
  name: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:185

***

## USER\_ID\_LEN

```ts
const USER_ID_LEN: 15 = 15;
```

Defined in: web-app/src/lib/server/validations.ts:25

***

## userIdField

```ts
const userIdField: ZodString;
```

Defined in: web-app/src/lib/server/validations.ts:101

***

## userIdSchema

```ts
const userIdSchema: ZodObject<{
  userId: ZodString;
}, "strip", ZodTypeAny, {
  userId: string;
}, {
  userId: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:180

***

## USERNAME\_MAX\_LEN

```ts
const USERNAME_MAX_LEN: 20 = 20;
```

Defined in: web-app/src/lib/server/validations.ts:11

***

## USERNAME\_MIN\_LEN

```ts
const USERNAME_MIN_LEN: 3 = 3;
```

Defined in: web-app/src/lib/server/validations.ts:10

Validations module uses the Zod library to define 
and validate different types of user inputs.

### See

 - Zod [Zod Docs](https://zod.dev/?id=basic-usage)
 - flash-messages [sveltekit-flash-messages](https://github.com/ciscoheat/sveltekit-flash-messages#how-to-use)

***

## usernameField

```ts
const usernameField: ZodString;
```

Defined in: web-app/src/lib/server/validations.ts:108

***

## verifyEmailFormSchema

```ts
const verifyEmailFormSchema: ZodObject<{
  token: ZodString;
}, "strip", ZodTypeAny, {
  token: string;
}, {
  token: string;
}>;
```

Defined in: web-app/src/lib/server/validations.ts:133

***

## passwordConfirmMustBeEqualToPassword()

```ts
function passwordConfirmMustBeEqualToPassword(__namedParameters: EqualPasswords, ctx: RefinementCtx): void;
```

Defined in: web-app/src/lib/server/validations.ts:64

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
