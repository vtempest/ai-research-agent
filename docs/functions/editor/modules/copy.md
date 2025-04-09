[ai-research-agent](../../modules.md) / editor/modules/copy

## Functions

### copy()

```ts
function copy(editor, options): object
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CopyOptions`](copy.md#copyoptions)

</td>
<td>

`defaultOptions`

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `commands` | \{ `getCopy`: (`selection`?) => `object`; \} |
| `destroy()` |  |
| `init()` |  |

## Interfaces

### CopyData

#### Properties

##### html?

```ts
optional html: string;
```

##### selection?

```ts
optional selection: EditorRange;
```

##### text?

```ts
optional text: string;
```

***

### CopyOptions

#### Properties

##### copyHTML?

```ts
optional copyHTML: boolean;
```

##### copyPlainText?

```ts
optional copyPlainText: boolean;
```
