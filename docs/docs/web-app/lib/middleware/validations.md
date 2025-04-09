[qwksearch-web-app](../../modules.md) / lib/middleware/validations

## Variables

### changeEmailFormSchemaFirstStep

```ts
const changeEmailFormSchemaFirstStep: ZodObject<{
  email: ZodString;
 }, "strip", ZodTypeAny, {
  email: string;
 }, {
  email: string;
 }>;
```

***

### changeEmailFormSchemaSecondStep

```ts
const changeEmailFormSchemaSecondStep: ZodObject<{
  token: ZodString;
 }, "strip", ZodTypeAny, {
  token: string;
 }, {
  token: string;
 }>;
```

***

### EMAIL\_MAX\_LEN

```ts
const EMAIL_MAX_LEN: 50 = 50;
```

***

### EMAIL\_MIN\_LEN

```ts
const EMAIL_MIN_LEN: 6 = 6;
```

***

### emailField

```ts
const emailField: ZodString;
```

***

### isAdminField

```ts
const isAdminField: ZodDefault<ZodBoolean>;
```

***

### isVerifiedField

```ts
const isVerifiedField: ZodDefault<ZodBoolean>;
```

***

### loginFormSchema

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

***

### MESSAGE\_MAX\_LEN

```ts
const MESSAGE_MAX_LEN: 1000 = 1000;
```

***

### MESSAGE\_MIN\_LEN

```ts
const MESSAGE_MIN_LEN: 4 = 4;
```

***

### NAME\_MAX\_LEN

```ts
const NAME_MAX_LEN: 50 = 50;
```

***

### NAME\_MIN\_LEN

```ts
const NAME_MIN_LEN: 3 = 3;
```

***

### nameField

```ts
const nameField: ZodString;
```

***

### PASSWORD\_MAX\_LEN

```ts
const PASSWORD_MAX_LEN: 50 = 50;
```

***

### PASSWORD\_MIN\_LEN

```ts
const PASSWORD_MIN_LEN: 6 = 6;
```

***

### passwordConfirmField

```ts
const passwordConfirmField: ZodString;
```

***

### passwordField

```ts
const passwordField: ZodString;
```

***

### registerFormSchema

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

***

### resetPasswordFormSchemaFirstStep

```ts
const resetPasswordFormSchemaFirstStep: ZodObject<{
  email: ZodString;
 }, "strip", ZodTypeAny, {
  email: string;
 }, {
  email: string;
 }>;
```

***

### resetPasswordFormSchemaSecondStep

```ts
const resetPasswordFormSchemaSecondStep: ZodObject<{
  token: ZodString;
 }, "strip", ZodTypeAny, {
  token: string;
 }, {
  token: string;
 }>;
```

***

### resetPasswordFormSchemaThirdStep

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

***

### SESSION\_ID\_LEN

```ts
const SESSION_ID_LEN: 40 = 40;
```

***

### settingsAccountFormSchema

```ts
const settingsAccountFormSchema: ZodObject<{
  name: ZodString;
 }, "strip", ZodTypeAny, {
  name: string;
 }, {
  name: string;
 }>;
```

***

### settingsNotificationsFormSchema

```ts
const settingsNotificationsFormSchema: ZodObject<{
  name: ZodString;
 }, "strip", ZodTypeAny, {
  name: string;
 }, {
  name: string;
 }>;
```

***

### settingsProfileFormSchema

```ts
const settingsProfileFormSchema: ZodObject<{
  username: ZodString;
 }, "strip", ZodTypeAny, {
  username: string;
 }, {
  username: string;
 }>;
```

***

### TOKEN\_EXPIRATION\_TIME

```ts
const TOKEN_EXPIRATION_TIME: 30 = 30;
```

***

### TOKEN\_LEN

```ts
const TOKEN_LEN: 15 = 15;
```

***

### tokenField

```ts
const tokenField: ZodString;
```

***

### tokenSchema

```ts
const tokenSchema: ZodObject<{
  token: ZodString;
 }, "strip", ZodTypeAny, {
  token: string;
 }, {
  token: string;
 }>;
```

***

### updateUserFormSchema

```ts
const updateUserFormSchema: ZodObject<{
  name: ZodString;
 }, "strip", ZodTypeAny, {
  name: string;
 }, {
  name: string;
 }>;
```

***

### USER\_ID\_LEN

```ts
const USER_ID_LEN: 15 = 15;
```

***

### userIdField

```ts
const userIdField: ZodString;
```

***

### userIdSchema

```ts
const userIdSchema: ZodObject<{
  userId: ZodString;
 }, "strip", ZodTypeAny, {
  userId: string;
 }, {
  userId: string;
 }>;
```

***

### USERNAME\_MAX\_LEN

```ts
const USERNAME_MAX_LEN: 20 = 20;
```

***

### USERNAME\_MIN\_LEN

```ts
const USERNAME_MIN_LEN: 3 = 3;
```

Validations module uses the Zod library to define 
and validate different types of user inputs.

#### See

 - Zod [Zod Docs](https://zod.dev/?id=basic-usage)
 - flash-messages [sveltekit-flash-messages](https://github.com/ciscoheat/sveltekit-flash-messages#how-to-use)

***

### usernameField

```ts
const usernameField: ZodString;
```

***

### verifyEmailFormSchema

```ts
const verifyEmailFormSchema: ZodObject<{
  token: ZodString;
 }, "strip", ZodTypeAny, {
  token: string;
 }, {
  token: string;
 }>;
```

## Functions

### passwordConfirmMustBeEqualToPassword()

```ts
function passwordConfirmMustBeEqualToPassword(__namedParameters, ctx): void
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

#### Returns

`void`
