[ai-research-agent](../../index.md) / editor/modules/placeholder

## Functions

### placeholder()

```ts
function placeholder(placeholder, options?): (editor) => object
```

Set placeholder text in the editable area when there is no content. Then add the css:

```css
.placeholder {
  position: relative;
}
.placeholder::before {
  content: attr(data-placeholder);
  position: absolute;
  left: 0;
  right: 0;
  opacity: 0.5;
}
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

`placeholder`

</td>
<td>

`string` \| `Function`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`PlaceholderOptions`

</td>
</tr>
</tbody>
</table>

#### Returns

`Function`

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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

##### Returns

`object`

| Name | Type |
| ------ | ------ |
| `destroy()` |  |
