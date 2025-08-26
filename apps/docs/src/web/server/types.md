[Documentation](../modules.md) / server/types

## OAuthUserInfoType

Defined in: [apps/web/src/lib/server/types.d.ts:42](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/types.d.ts#L42)

### Extends

- `Partial`&lt;\{
  `email`: `string`;
  `email_verified`: `boolean`;
  `name`: `string`;
  `picture`: `string`;
  `providerUserId`: `string`;
  `sub`: `string`;
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

[apps/web/src/lib/server/types.d.ts:44](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/types.d.ts#L44)

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

[apps/web/src/lib/server/types.d.ts:49](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/types.d.ts#L49)

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

[apps/web/src/lib/server/types.d.ts:45](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/types.d.ts#L45)

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

[apps/web/src/lib/server/types.d.ts:46](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/types.d.ts#L46)

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

[apps/web/src/lib/server/types.d.ts:47](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/types.d.ts#L47)

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

[apps/web/src/lib/server/types.d.ts:48](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/types.d.ts#L48)

</td>
</tr>
</tbody>
</table>

***

## UserType

```ts
type UserType = Partial<{
  apiKey: string;
  createdAt: number;
  email: string | null;
  emailVerified: number | null;
  id: string;
  image: string | null;
  isAdmin: boolean;
  modifiedAt: number;
  name: string | null;
  settings: {
     AutoSummarize: boolean;
     enableQueryExpansion: boolean;
     fontFamily: string;
     fontSize: number;
     frequencyPenalty: number;
     language: string;
     model: string;
     numberTopResultToExtract: number;
     OpenFirstResultInBackgroundTab: boolean;
     OpenFirstResultInSameTab: boolean;
     provider: string;
     providerApiKeys: object[];
     searchEngineDefault: string;
     searchEngines: object[];
     ShowHeadings: boolean;
     ShowURLPath: boolean;
     temperature: number;
     theme: string;
     topP: number;
  };
  subscription: number;
}>;
```

Defined in: [apps/web/src/lib/server/types.d.ts:1](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/types.d.ts#L1)
