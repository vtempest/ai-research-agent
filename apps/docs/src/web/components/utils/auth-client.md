[Documentation](../../modules.md) / components/utils/auth-client

## authClient

```ts
const authClient: object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object & object;
```

Defined in: [apps/web/src/lib/components/utils/auth-client.ts:13](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/components/utils/auth-client.ts#L13)

### Create Better Auth Client with One Tap

Note: If browser blocks due to closing with "FedCM get()
rejects with NetworkError" then click lockicon in url bar and 
allow "Third Party Sign In" or clear cookies and allow 
localhost in chrome://settings/content/federatedIdentityApi

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`signIn`

</td>
<td>

\{
  `social`: &lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;`NonNullable`&lt;
     \| \{
   \}
     \| \{
   \}&gt;, \{
  \}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;;
\}

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`getSession()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`undefined`&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`signOut()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`undefined`&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`signIn`

</td>
<td>

\{
  `email`: &lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
   \}, \{
  \}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;;
\}

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`forgetPassword()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`resetPassword()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`verifyEmail()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`undefined`&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;`NonNullable`&lt;
  \| `void`
  \| \{
\}
  \| \{
\}&gt;, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`sendVerificationEmail()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`changeEmail()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`changePassword()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deleteUser()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`resetPassword`

</td>
<td>

\{
  `:token`: &lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`undefined`&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;`never`, \{
  \}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;;
\}

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`requestPasswordReset()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`resetPassword`

</td>
<td>

\{
  `:token`: &lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`undefined`&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;`never`, \{
  \}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;;
\}

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`revokeSession()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`revokeSessions()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`undefined`&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`revokeOtherSessions()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`undefined`&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`linkSocial()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`listAccounts()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`undefined`&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;`object`[], \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`deleteUser`

</td>
<td>

\{
  `callback`: &lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`undefined`&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
   \}, \{
  \}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;;
\}

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`unlinkAccount()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`refreshToken()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;`OAuth2Tokens`, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`getAccessToken()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`accountInfo()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`object` & `object`&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`signUp`

</td>
<td>

\{
  `email`: &lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;\{
   \}&gt;, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;`NonNullable`&lt;
     \| \{
   \}
     \| \{
   \}&gt;, \{
  \}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;;
\}

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`updateUser()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`InferUserUpdateCtx`&lt;\{
  `baseURL`: `string`;
  `plugins`: `object`[];
\}, `FetchOptions`&gt;&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;\{
\}, \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`listSessions()`

</td>
<td>

&lt;`FetchOptions`&gt;(...`data`: \[`Prettify`&lt;`undefined`&gt;?, `FetchOptions`?\]) => `Promise`&lt;`BetterFetchResponse`&lt;`Prettify`&lt;\{
\}&gt;[], \{
\}, `FetchOptions`\[`"throw"`\] *extends* `true` ? `true` : `false`&gt;&gt;

</td>
<td>

</td>
</tr>
</tbody>
</table>
