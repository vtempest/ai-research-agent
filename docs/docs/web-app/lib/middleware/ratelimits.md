[qwksearch-web-app](../../modules.md) / lib/middleware/ratelimits

## Variables

### accountSettingsLimiter

```ts
const accountSettingsLimiter: RetryAfterRateLimiter<never>;
```

***

### changeEmailLimiter

```ts
const changeEmailLimiter: RetryAfterRateLimiter<never>;
```

***

### loginLimiter

```ts
const loginLimiter: RetryAfterRateLimiter<never>;
```

***

### notificationsSettingsLimiter

```ts
const notificationsSettingsLimiter: RetryAfterRateLimiter<never>;
```

***

### profileSettingsLimiter

```ts
const profileSettingsLimiter: RetryAfterRateLimiter<never>;
```

***

### registerLimiter

```ts
const registerLimiter: RetryAfterRateLimiter<never>;
```

***

### resendChangeEmailLimiter

```ts
const resendChangeEmailLimiter: RetryAfterRateLimiter<never>;
```

***

### resendResetPasswordLimiter

```ts
const resendResetPasswordLimiter: RetryAfterRateLimiter<never>;
```

***

### resendVerifyEmailLimiter

```ts
const resendVerifyEmailLimiter: RetryAfterRateLimiter<never>;
```

***

### resetPasswordLimiter

```ts
const resetPasswordLimiter: RetryAfterRateLimiter<never>;
```

***

### verifyEmailLimiter

```ts
const verifyEmailLimiter: RetryAfterRateLimiter<never>;
```

## Functions

### verifyRateLimiter()

```ts
function verifyRateLimiter(event, limiter): Promise<string>
```

Verifies the rate limiter for a given request event.

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

`event`

</td>
<td>

`any`

</td>
<td>

The request event to be checked.

</td>
</tr>
<tr>
<td>

`limiter`

</td>
<td>

`any`

</td>
<td>

The rate limiter to be used for checking the event.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;

- A string representation of the retry after time in minutes if the event is limited, otherwise undefined.

#### See

Rate-Limiter [Rate Limiter Docs](https://github.com/ciscoheat/sveltekit-rate-limiter#how-to-use)
