[Documentation](../../../modules.md) / routes/api/model/+server

## GET()

```ts
function GET(request: any): Promise<Response>;
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

`request`

</td>
<td>

`any`

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`Response`&gt;

topicModelFinal
