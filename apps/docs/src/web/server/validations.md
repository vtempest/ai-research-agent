[Documentation](../modules.md) / server/validations

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

Defined in: [apps/web/src/lib/server/validations.ts:138](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L138)

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

Defined in: [apps/web/src/lib/server/validations.ts:142](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L142)

***

## EMAIL\_MAX\_LEN

```ts
const EMAIL_MAX_LEN: 50 = 50;
```

Defined in: [apps/web/src/lib/server/validations.ts:20](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L20)

***

## EMAIL\_MIN\_LEN

```ts
const EMAIL_MIN_LEN: 6 = 6;
```

Defined in: [apps/web/src/lib/server/validations.ts:19](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L19)

***

## emailField

```ts
const emailField: ZodString;
```

Defined in: [apps/web/src/lib/server/validations.ts:33](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L33)

***

## isAdminField

```ts
const isAdminField: ZodDefault<ZodBoolean>;
```

Defined in: [apps/web/src/lib/server/validations.ts:44](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L44)

***

## isVerifiedField

```ts
const isVerifiedField: ZodDefault<ZodBoolean>;
```

Defined in: [apps/web/src/lib/server/validations.ts:46](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L46)

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

Defined in: [apps/web/src/lib/server/validations.ts:119](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L119)

***

## MESSAGE\_MAX\_LEN

```ts
const MESSAGE_MAX_LEN: 1000 = 1000;
```

Defined in: [apps/web/src/lib/server/validations.ts:23](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L23)

***

## MESSAGE\_MIN\_LEN

```ts
const MESSAGE_MIN_LEN: 4 = 4;
```

Defined in: [apps/web/src/lib/server/validations.ts:22](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L22)

***

## NAME\_MAX\_LEN

```ts
const NAME_MAX_LEN: 50 = 50;
```

Defined in: [apps/web/src/lib/server/validations.ts:17](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L17)

***

## NAME\_MIN\_LEN

```ts
const NAME_MIN_LEN: 3 = 3;
```

Defined in: [apps/web/src/lib/server/validations.ts:16](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L16)

***

## nameField

```ts
const nameField: ZodString;
```

Defined in: [apps/web/src/lib/server/validations.ts:48](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L48)

***

## PASSWORD\_MAX\_LEN

```ts
const PASSWORD_MAX_LEN: 50 = 50;
```

Defined in: [apps/web/src/lib/server/validations.ts:14](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L14)

***

## PASSWORD\_MIN\_LEN

```ts
const PASSWORD_MIN_LEN: 6 = 6;
```

Defined in: [apps/web/src/lib/server/validations.ts:13](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L13)

***

## passwordConfirmField

```ts
const passwordConfirmField: ZodString;
```

Defined in: [apps/web/src/lib/server/validations.ts:58](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L58)

***

## passwordField

```ts
const passwordField: ZodString;
```

Defined in: [apps/web/src/lib/server/validations.ts:86](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L86)

***

## registerFormSchema

```ts
const registerFormSchema: ZodEffects<ZodObject<{
  email: ZodString;
  name: ZodString;
  password: ZodString;
  passwordConfirm: ZodString;
}, "strip", ZodTypeAny, {
  email?: string;
  name?: string;
  password?: string;
  passwordConfirm?: string;
}, {
  email?: string;
  name?: string;
  password?: string;
  passwordConfirm?: string;
}>, {
  email?: string;
  name?: string;
  password?: string;
  passwordConfirm?: string;
}, {
  email?: string;
  name?: string;
  password?: string;
  passwordConfirm?: string;
}>;
```

Defined in: [apps/web/src/lib/server/validations.ts:124](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L124)

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

Defined in: [apps/web/src/lib/server/validations.ts:147](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L147)

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

Defined in: [apps/web/src/lib/server/validations.ts:151](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L151)

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

Defined in: [apps/web/src/lib/server/validations.ts:155](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L155)

***

## SESSION\_ID\_LEN

```ts
const SESSION_ID_LEN: 40 = 40;
```

Defined in: [apps/web/src/lib/server/validations.ts:27](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L27)

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

Defined in: [apps/web/src/lib/server/validations.ts:163](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L163)

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

Defined in: [apps/web/src/lib/server/validations.ts:167](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L167)

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

Defined in: [apps/web/src/lib/server/validations.ts:171](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L171)

***

## TOKEN\_EXPIRATION\_TIME

```ts
const TOKEN_EXPIRATION_TIME: 30 = 30;
```

Defined in: [apps/web/src/lib/server/validations.ts:30](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L30)

***

## TOKEN\_LEN

```ts
const TOKEN_LEN: 15 = 15;
```

Defined in: [apps/web/src/lib/server/validations.ts:29](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L29)

***

## tokenField

```ts
const tokenField: ZodString;
```

Defined in: [apps/web/src/lib/server/validations.ts:96](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L96)

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

Defined in: [apps/web/src/lib/server/validations.ts:176](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L176)

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

Defined in: [apps/web/src/lib/server/validations.ts:185](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L185)

***

## USER\_ID\_LEN

```ts
const USER_ID_LEN: 15 = 15;
```

Defined in: [apps/web/src/lib/server/validations.ts:25](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L25)

***

## userIdField

```ts
const userIdField: ZodString;
```

Defined in: [apps/web/src/lib/server/validations.ts:101](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L101)

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

Defined in: [apps/web/src/lib/server/validations.ts:180](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L180)

***

## USERNAME\_MAX\_LEN

```ts
const USERNAME_MAX_LEN: 20 = 20;
```

Defined in: [apps/web/src/lib/server/validations.ts:11](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L11)

***

## USERNAME\_MIN\_LEN

```ts
const USERNAME_MIN_LEN: 3 = 3;
```

Defined in: [apps/web/src/lib/server/validations.ts:10](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L10)

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

Defined in: [apps/web/src/lib/server/validations.ts:108](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L108)

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

Defined in: [apps/web/src/lib/server/validations.ts:133](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L133)

***

## passwordConfirmMustBeEqualToPassword()

```ts
function passwordConfirmMustBeEqualToPassword(__namedParameters: EqualPasswords, ctx: RefinementCtx): void;
```

Defined in: [apps/web/src/lib/server/validations.ts:64](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/validations.ts#L64)

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
