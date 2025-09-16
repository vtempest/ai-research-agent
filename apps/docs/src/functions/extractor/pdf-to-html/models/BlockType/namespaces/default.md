[ai-research-agent](../../../../../modules.md) / [extractor/pdf-to-html/models/BlockType](../index.md) / default

## blockToText()

```ts
function blockToText(block: any): any;
```

Defined in: [src/extractor/pdf-to-html/models/BlockType.js:155](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/BlockType.js#L155)

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

`block`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`any`

***

## headlineByLevel()

```ts
function headlineByLevel(level: any): object;
```

Defined in: [src/extractor/pdf-to-html/models/BlockType.js:162](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/BlockType.js#L162)

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

`level`

</td>
<td>

`any`

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
<th>Default value</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`headline`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

[src/extractor/pdf-to-html/models/BlockType.js:6](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/BlockType.js#L6)

</td>
</tr>
<tr>
<td>

`headlineLevel`

</td>
<td>

`number`

</td>
<td>

`1`

</td>
<td>

[src/extractor/pdf-to-html/models/BlockType.js:7](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/BlockType.js#L7)

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`'H1'`

</td>
<td>

[src/extractor/pdf-to-html/models/BlockType.js:5](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/BlockType.js#L5)

</td>
</tr>
<tr>
<td>

`toText()`

</td>
<td>

(`block`: `any`) => 

</td>
<td>

&hyphen;

</td>
<td>

[src/extractor/pdf-to-html/models/BlockType.js:8](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/BlockType.js#L8)

</td>
</tr>
</tbody>
</table>

***

## isHeadline()

```ts
function isHeadline(type: any): boolean;
```

Defined in: [src/extractor/pdf-to-html/models/BlockType.js:151](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/pdf-to-html/models/BlockType.js#L151)

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

`type`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

### Returns

`boolean`
