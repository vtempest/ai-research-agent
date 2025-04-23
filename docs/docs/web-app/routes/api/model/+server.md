[Documentation](../../../modules.md) / routes/api/model/+server

## GET()

```ts
function GET(param0: object): Promise<Response>;
```

Defined in: web-app/src/routes/api/model/+server.ts:11

Return the topic model from GitHub storage as JSON 
cached for 100 hours

### Parameters

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

\{ `url`: `any`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`param0.url`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`Response`&gt;
