[ai-research-agent](../../modules.md) / editor/modules/shortcutFromEvent

## Classes

### ShortcutEvent

#### Extends

- `KeyboardEvent`

#### Constructors

##### new ShortcutEvent()

```ts
new ShortcutEvent(type, init?): ShortcutEvent
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

`init`?

</td>
<td>

[`ShortcutEventInit`](shortcutFromEvent.md#shortcuteventinit)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ShortcutEvent`](shortcutFromEvent.md#shortcutevent)

###### Overrides

`KeyboardEvent.constructor`

#### Properties

##### modShortcut

```ts
readonly modShortcut: string;
```

##### osShortcut

```ts
readonly osShortcut: string;
```

##### shortcut

```ts
readonly shortcut: string;
```

#### Methods

##### fromKeyboardEvent()

```ts
static fromKeyboardEvent(event): ShortcutEvent
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

`event`

</td>
<td>

`KeyboardEvent`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ShortcutEvent`](shortcutFromEvent.md#shortcutevent)

## Interfaces

### KeyboardEventWithShortcut

#### Extends

- `KeyboardEvent`

#### Properties

##### modShortcut?

```ts
optional modShortcut: string;
```

##### osShortcut?

```ts
optional osShortcut: string;
```

##### shortcut?

```ts
optional shortcut: string;
```

***

### ShortcutEventInit

#### Extends

- `KeyboardEventInit`

#### Properties

##### shortcut?

```ts
optional shortcut: string;
```

## Functions

### addShortcutsToEvent()

```ts
function addShortcutsToEvent(event): KeyboardEventWithShortcut
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

`event`

</td>
<td>

[`KeyboardEventWithShortcut`](shortcutFromEvent.md#keyboardeventwithshortcut)

</td>
</tr>
</tbody>
</table>

#### Returns

[`KeyboardEventWithShortcut`](shortcutFromEvent.md#keyboardeventwithshortcut)

***

### shortcutFromEvent()

```ts
function shortcutFromEvent(event): string
```

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

`event`

</td>
<td>

`KeyboardEvent`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`
