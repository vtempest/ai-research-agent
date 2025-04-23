[Documentation](../../../modules.md) / extractor/pdf-to-html/models/HeadlineFinder

## default

Defined in: extractor/pdf-to-html/models/HeadlineFinder.js:3

### Constructors

#### Constructor

```ts
new default(options: any): default;
```

Defined in: extractor/pdf-to-html/models/HeadlineFinder.js:4

##### Parameters

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

##### Returns

[`default`](#default)

### Properties

#### headlineCharCodes

```ts
headlineCharCodes: any[];
```

Defined in: extractor/pdf-to-html/models/HeadlineFinder.js:5

#### stackedChars

```ts
stackedChars: number;
```

Defined in: extractor/pdf-to-html/models/HeadlineFinder.js:7

#### stackedLineItems

```ts
stackedLineItems: any[];
```

Defined in: extractor/pdf-to-html/models/HeadlineFinder.js:6

### Methods

#### consume()

```ts
consume(lineItem: any): any[];
```

Defined in: extractor/pdf-to-html/models/HeadlineFinder.js:10

##### Parameters

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

##### Returns

`any`[]

#### matchAll()

```ts
matchAll(normalizedCharCodes: any): boolean;
```

Defined in: extractor/pdf-to-html/models/HeadlineFinder.js:30

##### Parameters

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

##### Returns

`boolean`
