[Documentation](../../modules.md) / editor/modules/placeholder

## placeholder()

```ts
function placeholder(placeholder: string | Function, options?: PlaceholderOptions): (editor: Editor) => object;
```

Defined in: editor/modules/placeholder.ts:25

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

`placeholder`

</td>
<td>

`string` \| `Function`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`PlaceholderOptions`

</td>
</tr>
</tbody>
</table>

### Returns

```ts
(editor: Editor): object;
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`destroy()`

</td>
<td>

() => 

</td>
<td>

editor/modules/placeholder.ts:57

</td>
</tr>
</tbody>
</table>
