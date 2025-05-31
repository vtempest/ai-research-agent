[Documentation](../../modules.md) / lib/server/drizzle.config

## default

```ts
default: object;
```

Defined in: web-app/src/lib/server/drizzle.config.ts:46

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

web-app/src/lib/server/drizzle.config.ts:50

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

web-app/src/lib/server/drizzle.config.ts:49

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

web-app/src/lib/server/drizzle.config.ts:48

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

web-app/src/lib/server/drizzle.config.ts:47

</td>
</tr>
</tbody>
</table>

***

## getLocalDb()

```ts
function getLocalDb(): string;
```

Defined in: web-app/src/lib/server/drizzle.config.ts:8

### Returns

`string`
