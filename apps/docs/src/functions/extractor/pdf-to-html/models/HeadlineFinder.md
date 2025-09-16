[ai-research-agent](../../../modules.md) / extractor/pdf-to-html/models/HeadlineFinder

## default

Defined in: [src/extractor/pdf-to-html/models/HeadlineFinder.js:3](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/HeadlineFinder.js#L3)

### Constructors

#### Constructor

```ts
new default(options: any): default;
```

Defined in: [src/extractor/pdf-to-html/models/HeadlineFinder.js:4](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/HeadlineFinder.js#L4)

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

Defined in: [src/extractor/pdf-to-html/models/HeadlineFinder.js:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/HeadlineFinder.js#L5)

#### stackedChars

```ts
stackedChars: number;
```

Defined in: [src/extractor/pdf-to-html/models/HeadlineFinder.js:7](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/HeadlineFinder.js#L7)

#### stackedLineItems

```ts
stackedLineItems: any[];
```

Defined in: [src/extractor/pdf-to-html/models/HeadlineFinder.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/HeadlineFinder.js#L6)

### Methods

#### consume()

```ts
consume(lineItem: any): any[];
```

Defined in: [src/extractor/pdf-to-html/models/HeadlineFinder.js:10](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/HeadlineFinder.js#L10)

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

Defined in: [src/extractor/pdf-to-html/models/HeadlineFinder.js:30](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/HeadlineFinder.js#L30)

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
