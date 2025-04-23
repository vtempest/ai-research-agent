[Documentation](../../modules.md) / editor/modules/paste

## PasteEvent

Defined in: editor/modules/paste.ts:15

### Extends

- `Event`

### Constructors

#### Constructor

```ts
new PasteEvent(type: string, init: PasteEventInit): PasteEvent;
```

Defined in: editor/modules/paste.ts:20

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

[`PasteEventInit`](#pasteeventinit)

</td>
</tr>
</tbody>
</table>

##### Returns

[`PasteEvent`](#pasteevent)

##### Overrides

```ts
Event.constructor
```

### Properties

#### delta

```ts
delta: default;
```

Defined in: editor/modules/paste.ts:16

#### html?

```ts
optional html: string;
```

Defined in: editor/modules/paste.ts:17

#### text?

```ts
optional text: string;
```

Defined in: editor/modules/paste.ts:18

***

## PasteEventInit

Defined in: editor/modules/paste.ts:9

### Extends

- `EventInit`

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="delta-1"></a> `delta`

</td>
<td>

[`default`](../delta/Delta.md#default)

</td>
<td>

editor/modules/paste.ts:10

</td>
</tr>
<tr>
<td>

<a id="html-1"></a> `html?`

</td>
<td>

`string`

</td>
<td>

editor/modules/paste.ts:11

</td>
</tr>
<tr>
<td>

<a id="text-1"></a> `text?`

</td>
<td>

`string`

</td>
<td>

editor/modules/paste.ts:12

</td>
</tr>
</tbody>
</table>

***

## PasteModuleOptions

Defined in: editor/modules/paste.ts:34

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="allowhtmlpaste"></a> `allowHTMLPaste?`

</td>
<td>

`boolean`

</td>
<td>

editor/modules/paste.ts:36

</td>
</tr>
<tr>
<td>

<a id="htmlparser"></a> `htmlParser?`

</td>
<td>

(`editor`: [`Editor`](../Editor.md#editor), `html`: `string`) => [`default`](../delta/Delta.md#default)

</td>
<td>

editor/modules/paste.ts:35

</td>
</tr>
</tbody>
</table>

***

## PasteOptions

Defined in: editor/modules/paste.ts:28

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="html-2"></a> `html?`

</td>
<td>

`string`

</td>
<td>

editor/modules/paste.ts:30

</td>
</tr>
<tr>
<td>

<a id="selection"></a> `selection?`

</td>
<td>

[`EditorRange`](../document/EditorRange.md#editorrange)

</td>
<td>

editor/modules/paste.ts:31

</td>
</tr>
<tr>
<td>

<a id="text-2"></a> `text?`

</td>
<td>

`string`

</td>
<td>

editor/modules/paste.ts:29

</td>
</tr>
</tbody>
</table>

***

## paste()

```ts
function paste(editor: Editor, options?: PasteModuleOptions): object;
```

Defined in: editor/modules/paste.ts:39

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

`editor`

</td>
<td>

[`Editor`](../Editor.md#editor)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`PasteModuleOptions`](#pastemoduleoptions)

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
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`commands`

</td>
<td>

\{
  `paste`: (`__namedParameters`: [`PasteOptions`](#pasteoptions)) => `void`;
\}

</td>
<td>

editor/modules/paste.ts:129

</td>
</tr>
<tr>
<td>

`destroy()`

</td>
<td>

() => 

</td>
<td>

editor/modules/paste.ts:135

</td>
</tr>
<tr>
<td>

`init()`

</td>
<td>

() => 

</td>
<td>

editor/modules/paste.ts:132

</td>
</tr>
</tbody>
</table>
