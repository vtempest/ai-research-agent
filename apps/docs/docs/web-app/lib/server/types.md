[Documentation](../../modules.md) / lib/server/types

## OAuthUserInfoType

Defined in: apps/web-app/src/lib/server/types.d.ts:42

### Extends

- `Partial`&lt;\{
  `email`: `string`;
  `name`: `string`;
  `picture`: `string`;
  `providerUserId`: `string`;
  `sub`: `string`;
  `email_verified`: `boolean`;
\}&gt;

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="email"></a> `email?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.email
```

</td>
<td>

apps/web-app/src/lib/server/types.d.ts:44

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.name
```

</td>
<td>

apps/web-app/src/lib/server/types.d.ts:45

</td>
</tr>
<tr>
<td>

<a id="picture"></a> `picture?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.picture
```

</td>
<td>

apps/web-app/src/lib/server/types.d.ts:46

</td>
</tr>
<tr>
<td>

<a id="provideruserid"></a> `providerUserId?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.providerUserId
```

</td>
<td>

apps/web-app/src/lib/server/types.d.ts:47

</td>
</tr>
<tr>
<td>

<a id="sub"></a> `sub?`

</td>
<td>

`string`

</td>
<td>

```ts
Partial.sub
```

</td>
<td>

apps/web-app/src/lib/server/types.d.ts:48

</td>
</tr>
<tr>
<td>

<a id="email_verified"></a> `email_verified?`

</td>
<td>

`boolean`

</td>
<td>

```ts
Partial.email_verified
```

</td>
<td>

apps/web-app/src/lib/server/types.d.ts:49

</td>
</tr>
</tbody>
</table>

***

## UserType

```ts
type UserType = Partial<{
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: number | null;
  image: string | null;
  subscription: number;
  isAdmin: boolean;
  createdAt: number;
  apiKey: string;
  modifiedAt: number;
  settings: {
     provider: string;
     model: string;
     temperature: number;
     topP: number;
     frequencyPenalty: number;
     providerApiKeys: object[];
     theme: string;
     language: string;
     fontSize: number;
     fontFamily: string;
     searchEngines: object[];
     searchEngineDefault: string;
     OpenFirstResultInBackgroundTab: boolean;
     OpenFirstResultInSameTab: boolean;
     AutoSummarize: boolean;
     ShowURLPath: boolean;
     ShowHeadings: boolean;
     enableQueryExpansion: boolean;
     numberTopResultToExtract: number;
  };
}>;
```

Defined in: apps/web-app/src/lib/server/types.d.ts:1
