[qwksearch-web-app](../../../modules.md) / lib/components/AppLayout/auth-google-one-tap

## Functions

### displayGoogleOneTapLogin()

```ts
function displayGoogleOneTapLogin(client_id, options): Promise<boolean>
```

Show Google One Tap menu and send id to callback route.

The verifyIdToken function verifies the JWT signature,
the aud claim, the exp claim, and the iss claim.
*Why It's Secure:*
Tamper-Proof: The JWT's signature prevents anyone from
 altering the token or creating a fake one. Your server
 can detect any modifications.
Short-Lived: JWTs have a short expiration time, typically
1 hour, limiting the window of potential misuse5.
Google's Verification: The email in the token is verified
by Google, not just claimed by the user. The email_verified
 claim in the token indicates whether Google has verified
 the email address

Error: If browser blocks due to closing with "FedCM get()
 rejects with NetworkError" then clear cookies and allow 
localhost in chrome://settings/content/federatedIdentityApi, or click lock
icon in url bar and allow "Third Party Sign In"

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

`client_id`

</td>
<td>

`string`

</td>
<td>

Google OAuth Client ID

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

\{ `auto_select`: `boolean`; `callback_url`: `string`; `cancel_on_tap_outside`: `boolean`; `state_cookie_domain`: `string`; `use_fedcm_for_prompt`: `boolean`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.auto_select`?

</td>
<td>

`boolean`

</td>
<td>

If true, the
  One Tap prompt will immediately return an ID token
  without user interaction when there is only one Google
  session.

</td>
</tr>
<tr>
<td>

`options.callback_url`

</td>
<td>

`string`

</td>
<td>

The server route
  endpoint to send the ID token to.

</td>
</tr>
<tr>
<td>

`options.cancel_on_tap_outside`?

</td>
<td>

`boolean`

</td>
<td>

If true,
  the One Tap request will be canceled if the user clicks
  outside the prompt. If user clicks X it's always off until 
  they click lock icon in url bar and allow "Third Party Sign In"

</td>
</tr>
<tr>
<td>

`options.state_cookie_domain`?

</td>
<td>

`string`

</td>
<td>

If you need
  to display One Tap in the parent domain and its subdomains,
  pass the parent domain to this field so that a single
  shared-state cookie is used.

</td>
</tr>
<tr>
<td>

`options.use_fedcm_for_prompt`?

</td>
<td>

`boolean`

</td>
<td>

If true,
  the browser will control user sign-in prompts and mediate
  the sign-in flow between your website and Google.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`boolean`&gt;

true if able to show menu

#### See

 - Verify_JWT [Verify Docs](https://developers.google.com/identity/sign-in/web/backend-auth)
 - Google_One_Tap [One Tap Docs](https://developers.google.com/identity/gsi/web/reference/js-reference)

#### Author

[vtempest](https://github.com/vtempest/)

#### Example

```ts
if (!user) {
     var isOneTapShown = displayGoogleOneTapLogin(
       PUBLIC_GOOGLE_CLIENT_ID, {
         auto_select: true,
         use_fedcm_for_prompt: true,
         cancel_on_tap_outside: true,
         callback_url: `/auth/google/callback`,
         state_cookie_domain: PUBLIC_DOMAIN
       })
     if (!isOneTapShown) 
       console.log("OneTap error - use alternatives");
   }
```
