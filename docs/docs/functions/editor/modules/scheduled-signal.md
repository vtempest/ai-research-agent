[Documentation](../../modules.md) / editor/modules/scheduled-signal

## readable()

```ts
function readable(initialValue: any, start: () => void): object;
```

Defined in: editor/modules/scheduled-signal.js:93

### Parameters

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

### Returns

`object`

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

`get()`

</td>
<td>

() => `any`

</td>
<td>

editor/modules/scheduled-signal.js:95

</td>
</tr>
<tr>
<td>

`subscribe()`

</td>
<td>

(`subscriber`: `any`, `invalidate`: `any`) => `any`

</td>
<td>

editor/modules/scheduled-signal.js:95

</td>
</tr>
</tbody>
</table>

***

## writable()

```ts
function writable(value: any, start: () => void): object;
```

Defined in: editor/modules/scheduled-signal.js:99

### Parameters

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

### Returns

`object`

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

`get()`

</td>
<td>

() => `any`

</td>
<td>

editor/modules/scheduled-signal.js:172

</td>
</tr>
<tr>
<td>

`set()`

</td>
<td>

\{
(`newValue`: `any`): `void`;
  `[subscribersKey]`: `Map`&lt;`any`, `any`&gt;;
\}

</td>
<td>

editor/modules/scheduled-signal.js:172

</td>
</tr>
<tr>
<td>

`subscribe()`

</td>
<td>

(`subscriber`: `any`, `invalidate`: `any`) => `any`

</td>
<td>

editor/modules/scheduled-signal.js:172

</td>
</tr>
<tr>
<td>

`update()`

</td>
<td>

(`fn`: `any`) => `void`

</td>
<td>

editor/modules/scheduled-signal.js:172

</td>
</tr>
</tbody>
</table>
