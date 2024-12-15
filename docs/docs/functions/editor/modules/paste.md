[ai-research-agent](../../index.md) / editor/modules/paste

## Functions

### paste()

```ts
function paste(editor, options?): object
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
<tr>
<td>

`options`?

</td>
<td>

[`PasteModuleOptions`](paste.md#pastemoduleoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name | Type |
| ------ | ------ |
| `commands` | \{ `paste`: (`__namedParameters`) => `void`; \} |
| `destroy()` |  |
| `init()` |  |

## Classes

### PasteEvent

#### Extends

- `Event`

#### Constructors

##### new PasteEvent()

```ts
new PasteEvent(type, init): PasteEvent
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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`init`

</td>
<td>

[`PasteEventInit`](paste.md#pasteeventinit)

</td>
</tr>
</tbody>
</table>

###### Returns

[`PasteEvent`](paste.md#pasteevent)

###### Overrides

`Event.constructor`

#### Properties

##### delta

```ts
delta: default;
```

##### html?

```ts
optional html: string;
```

##### text?

```ts
optional text: string;
```

## Interfaces

### PasteEventInit

#### Extends

- `EventInit`

#### Properties

##### delta

```ts
delta: default;
```

##### html?

```ts
optional html: string;
```

##### text?

```ts
optional text: string;
```

***

### PasteModuleOptions

#### Properties

##### allowHTMLPaste?

```ts
optional allowHTMLPaste: boolean;
```

##### htmlParser()?

```ts
optional htmlParser: (editor, html) => default;
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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`html`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](../delta/Delta.md#default)

***

### PasteOptions

#### Properties

##### html?

```ts
optional html: string;
```

##### selection?

```ts
optional selection: null | EditorRange;
```

##### text?

```ts
optional text: string;
```
