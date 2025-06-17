[Documentation](../../../../README.md) / routes/api/files/\[fileId\]/+server

## GET()

```ts
function GET(__namedParameters: object): Promise<Response>;
```

Defined in: [apps/web/src/routes/api/files/\[fileId\]/+server.ts:7](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/routes/api/files/[fileId]/+server.ts#L7)

### Parameters

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

`__namedParameters`

</td>
<td>

\{ `params`: `any`; `locals`: `any`; `request`: `any`; \}

</td>
</tr>
<tr>
<td>

`__namedParameters.params`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`__namedParameters.locals`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`__namedParameters.request`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`Response`&gt;

***

## POST()

```ts
function POST(__namedParameters: object): Promise<Response>;
```

Defined in: [apps/web/src/routes/api/files/\[fileId\]/+server.ts:19](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/routes/api/files/[fileId]/+server.ts#L19)

### Parameters

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

`__namedParameters`

</td>
<td>

\{ `params`: `any`; `request`: `any`; `locals`: \{ `db`: `any`; \}; \}

</td>
</tr>
<tr>
<td>

`__namedParameters.params`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`__namedParameters.request`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`__namedParameters.locals`

</td>
<td>

\{ `db`: `any`; \}

</td>
</tr>
<tr>
<td>

`__namedParameters.locals.db`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`Response`&gt;

***

## DELETE()

```ts
function DELETE(__namedParameters: object): Promise<Response>;
```

Defined in: [apps/web/src/routes/api/files/\[fileId\]/+server.ts:28](https://github.com/vtempest/ai-research-agent/tree/master/apps/web/src/routes/api/files/[fileId]/+server.ts#L28)

### Parameters

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

`__namedParameters`

</td>
<td>

\{ `params`: `any`; `locals`: \{ `db`: `any`; \}; \}

</td>
</tr>
<tr>
<td>

`__namedParameters.params`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`__namedParameters.locals`

</td>
<td>

\{ `db`: `any`; \}

</td>
</tr>
<tr>
<td>

`__namedParameters.locals.db`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`Response`&gt;
