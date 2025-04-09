[qwksearch-web-app](modules.md) / hooks.server

## Functions

### allowCORSAccessAPI()

```ts
function allowCORSAccessAPI(input): MaybePromise<Response>
```

Enable API access for users with valid API keys and allow CORS.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`input`

</td>
<td>

\{\}

</td>
</tr>
</tbody>
</table>

#### Returns

`MaybePromise`&lt;`Response`&gt;

- The resolved response

***

### handle()

```ts
function handle(input): MaybePromise<Response>
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`input`

</td>
<td>

\{\}

</td>
</tr>
</tbody>
</table>

#### Returns

`MaybePromise`&lt;`Response`&gt;

***

### handleError()

```ts
function handleError(param0): object
```

Handles any errors that occur during the execution of the hooks

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

`param0`

</td>
<td>

\{ `error`: `any`; `message`: `any`; `status`: `any`; \}

</td>
<td>

The parameters object

</td>
</tr>
<tr>
<td>

`param0.error`

</td>
<td>

`any`

</td>
<td>

The error object

</td>
</tr>
<tr>
<td>

`param0.message`

</td>
<td>

`any`

</td>
<td>

The error message

</td>
</tr>
<tr>
<td>

`param0.status`

</td>
<td>

`any`

</td>
<td>

The HTTP status code

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

The resolved event

| Name | Type |
| ------ | ------ |
| `message` | `any` |
