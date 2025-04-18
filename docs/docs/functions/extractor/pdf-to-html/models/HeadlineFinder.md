[ai-research-agent](../../../modules.md) / extractor/pdf-to-html/models/HeadlineFinder

## Classes

### default

#### Constructors

##### new default()

```ts
new default(options): default
```

###### Parameters

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

`options`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](HeadlineFinder.md#default)

#### Properties

##### headlineCharCodes

```ts
headlineCharCodes: any[];
```

##### stackedChars

```ts
stackedChars: number;
```

##### stackedLineItems

```ts
stackedLineItems: any[];
```

#### Methods

##### consume()

```ts
consume(lineItem): any[]
```

###### Parameters

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

`lineItem`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`[]

##### matchAll()

```ts
matchAll(normalizedCharCodes): boolean
```

###### Parameters

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

`normalizedCharCodes`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`
