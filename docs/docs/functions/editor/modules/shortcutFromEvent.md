[Documentation](../../modules.md) / editor/modules/shortcutFromEvent

## ShortcutEvent

Defined in: editor/modules/shortcutFromEvent.ts:15

### Extends

- `KeyboardEvent`

### Constructors

#### Constructor

```ts
new ShortcutEvent(type: string, init?: ShortcutEventInit): ShortcutEvent;
```

Defined in: editor/modules/shortcutFromEvent.ts:20

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

`init?`

</td>
<td>

[`ShortcutEventInit`](#shortcuteventinit)

</td>
</tr>
</tbody>
</table>

##### Returns

[`ShortcutEvent`](#shortcutevent)

##### Overrides

```ts
KeyboardEvent.constructor
```

### Properties

#### modShortcut

```ts
readonly modShortcut: string;
```

Defined in: editor/modules/shortcutFromEvent.ts:18

#### osShortcut

```ts
readonly osShortcut: string;
```

Defined in: editor/modules/shortcutFromEvent.ts:17

#### shortcut

```ts
readonly shortcut: string;
```

Defined in: editor/modules/shortcutFromEvent.ts:16

### Methods

#### fromKeyboardEvent()

```ts
static fromKeyboardEvent(event: KeyboardEvent): ShortcutEvent;
```

Defined in: editor/modules/shortcutFromEvent.ts:27

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

`event`

</td>
<td>

`KeyboardEvent`

</td>
</tr>
</tbody>
</table>

##### Returns

[`ShortcutEvent`](#shortcutevent)

***

## KeyboardEventWithShortcut

Defined in: editor/modules/shortcutFromEvent.ts:33

### Extends

- `KeyboardEvent`

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

<a id="modshortcut-1"></a> `modShortcut?`

</td>
<td>

`string`

</td>
<td>

editor/modules/shortcutFromEvent.ts:36

</td>
</tr>
<tr>
<td>

<a id="osshortcut-1"></a> `osShortcut?`

</td>
<td>

`string`

</td>
<td>

editor/modules/shortcutFromEvent.ts:35

</td>
</tr>
<tr>
<td>

<a id="shortcut-1"></a> `shortcut?`

</td>
<td>

`string`

</td>
<td>

editor/modules/shortcutFromEvent.ts:34

</td>
</tr>
</tbody>
</table>

***

## ShortcutEventInit

Defined in: editor/modules/shortcutFromEvent.ts:11

### Extends

- `KeyboardEventInit`

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

<a id="shortcut-2"></a> `shortcut?`

</td>
<td>

`string`

</td>
<td>

editor/modules/shortcutFromEvent.ts:12

</td>
</tr>
</tbody>
</table>

***

## addShortcutsToEvent()

```ts
function addShortcutsToEvent(event: KeyboardEventWithShortcut): KeyboardEventWithShortcut;
```

Defined in: editor/modules/shortcutFromEvent.ts:39

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

`event`

</td>
<td>

[`KeyboardEventWithShortcut`](#keyboardeventwithshortcut)

</td>
</tr>
</tbody>
</table>

### Returns

[`KeyboardEventWithShortcut`](#keyboardeventwithshortcut)

***

## shortcutFromEvent()

```ts
function shortcutFromEvent(event: KeyboardEvent): string;
```

Defined in: editor/modules/shortcutFromEvent.ts:58

Returns the textual representation of a shortcut given a keyboard event. Examples of shortcuts:
Cmd+L
Cmd+Shift+M
Ctrl+O
Backspace
T
Right
Shift+Down
Shift+F1
Space

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

`event`

</td>
<td>

`KeyboardEvent`

</td>
</tr>
</tbody>
</table>

### Returns

`string`
