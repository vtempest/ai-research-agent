[Documentation](modules.md) / global

## SearchResult

```ts
type SearchResult = alertVariants;
```

Defined in: apps/web/src/global.d.ts:8

***

## AgentPrompt

```ts
type AgentPrompt = alertVariants;
```

Defined in: apps/web/src/global.d.ts:9

***

## Article

```ts
type Article = typeof schema.articles.$inferSelect;
```

Defined in: apps/web/src/global.d.ts:11

***

## Message

```ts
type Message = typeof schema.messages.$inferSelect;
```

Defined in: apps/web/src/global.d.ts:12

***

## Chat

```ts
type Chat = typeof schema.chats.$inferSelect;
```

Defined in: apps/web/src/global.d.ts:13

***

## File

```ts
type File = typeof schema.files.$inferSelect;
```

Defined in: apps/web/src/global.d.ts:14

***

## Team

```ts
type Team = typeof schema.teams.$inferSelect;
```

Defined in: apps/web/src/global.d.ts:15

***

## User

```ts
type User = typeof schema.users.$inferSelect & object;
```

Defined in: apps/web/src/global.d.ts:16

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

`settings`

</td>
<td>

[`UserSettings`](#usersettings)

</td>
<td>

apps/web/src/global.d.ts:17

</td>
</tr>
</tbody>
</table>

***

## Session

```ts
type Session = typeof schema.sessions.$inferSelect;
```

Defined in: apps/web/src/global.d.ts:19

***

## Account

```ts
type Account = typeof schema.accounts.$inferSelect;
```

Defined in: apps/web/src/global.d.ts:20

***

## VerificationToken

```ts
type VerificationToken = typeof schema.verificationTokens.$inferSelect;
```

Defined in: apps/web/src/global.d.ts:21

***

## UserSettings

```ts
type UserSettings = Partial<{
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
  showURLPath: boolean;
  showHeadings: boolean;
  enableQueryExpansion: boolean;
  numberTopResultToExtract: number;
}>;
```

Defined in: apps/web/src/global.d.ts:23
