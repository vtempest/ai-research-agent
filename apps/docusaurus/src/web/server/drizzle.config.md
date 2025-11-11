[Documentation](../modules.md) / server/drizzle.config

## default

```ts
default: object;
```

Defined in: [apps/web/src/lib/server/drizzle.config.ts:46](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/drizzle.config.ts#L46)

### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="dbcredentials"></a> `dbCredentials`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
<td>

[apps/web/src/lib/server/drizzle.config.ts:50](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/drizzle.config.ts#L50)

</td>
</tr>
<tr>
<td>

<a id="dialect"></a> `dialect`

</td>
<td>

`"sqlite"`

</td>
<td>

`"sqlite"`

</td>
<td>

[apps/web/src/lib/server/drizzle.config.ts:49](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/drizzle.config.ts#L49)

</td>
</tr>
<tr>
<td>

<a id="out"></a> `out`

</td>
<td>

`string`

</td>
<td>

`"migrations"`

</td>
<td>

[apps/web/src/lib/server/drizzle.config.ts:48](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/drizzle.config.ts#L48)

</td>
</tr>
<tr>
<td>

<a id="schema"></a> `schema`

</td>
<td>

`string`

</td>
<td>

`"./src/lib/server/schema.ts"`

</td>
<td>

[apps/web/src/lib/server/drizzle.config.ts:47](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/drizzle.config.ts#L47)

</td>
</tr>
</tbody>
</table>

***

## getLocalDb()

```ts
function getLocalDb(): string;
```

Defined in: [apps/web/src/lib/server/drizzle.config.ts:8](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/lib/server/drizzle.config.ts#L8)

### Returns

`string`
