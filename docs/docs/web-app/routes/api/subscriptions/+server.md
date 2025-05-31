[Documentation](../../../modules.md) / routes/api/subscriptions/+server

## GET()

```ts
function GET(event: RequestEvent): Promise<Response>;
```

Defined in: web-app/src/routes/api/subscriptions/+server.ts:82

Redirects to Stripe's Manage Subscription page.

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

`event`

</td>
<td>

`RequestEvent`

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`Response`&gt;

***

## POST()

```ts
function POST(event: RequestEvent): Promise<Response>;
```

Defined in: web-app/src/routes/api/subscriptions/+server.ts:21

Webhook listens to Stripe Subscription change
and updates subscription status in db.

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

`event`

</td>
<td>

`RequestEvent`

</td>
<td>

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`Response`&gt;

### See

[Stripe Docs](https://stripe.com/docs/api/subscriptions/object)
