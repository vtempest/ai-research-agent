[ai-research-agent](../../index.md) / editor/modules/scheduled-signal

## Functions

### readable()

```ts
function readable(initialValue, start): object
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`initialValue`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`start`

</td>
<td>

() => `void`

</td>
<td>

`noop`

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `get` | () => `any` |
| `subscribe` | (`subscriber`, `invalidate`) => `any` |

***

### writable()

```ts
function writable(value, start): object
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`start`

</td>
<td>

() => `void`

</td>
<td>

`noop`

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `get` | () => `any` |
| `set` | (`newValue`) => `void` |
| `subscribe` | (`subscriber`, `invalidate`) => `any` |
| `update` | (`fn`) => `void` |
