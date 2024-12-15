[ai-research-agent](../../index.md) / editor/modules/virtualRendering

## Functions

### virtualRendering()

```ts
function virtualRendering(editor): object
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

| Name | Type |
| ------ | ------ |
| `render` | (`what`?) => `void` |
| `destroy()` |  |
| `init()` |  |

## Interfaces

### VirtualRenderWhat

#### Properties

##### doc?

```ts
optional doc: default;
```

##### old?

```ts
optional old: default;
```

##### selection

```ts
selection: null | EditorRange;
```
