[ai-research-agent](../index.md) / editor/Editor

## Classes

### Editor

#### Extends

- [`EventDispatcher`](util/EventDispatcher.md#eventdispatchert)&lt;[`EditorEventMap`](Editor.md#editoreventmap)&gt;

#### Accessors

##### change

###### Get Signature

```ts
get change(): EditorTextChange
```

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

##### enabled

###### Get Signature

```ts
get enabled(): boolean
```

###### Returns

`boolean`

###### Set Signature

```ts
set enabled(value): void
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

`value`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### root

###### Get Signature

```ts
get root(): HTMLElement
```

###### Returns

`HTMLElement`

#### Constructors

##### new Editor()

```ts
new Editor(options): Editor
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

`options`

</td>
<td>

[`EditorOptions`](Editor.md#editoroptions)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Editor`](Editor.md#editor)

###### Overrides

[`EventDispatcher`](util/EventDispatcher.md#eventdispatchert).[`constructor`](util/EventDispatcher.md#constructors)

#### Methods

##### addEventListener()

###### Call Signature

```ts
addEventListener<K>(
   type, 
   listener, 
   options?): void
```

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`K` *extends* keyof [`EditorEventMap`](Editor.md#editoreventmap)

</td>
</tr>
</tbody>
</table>

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

`K`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`EventDispatcher`](util/EventDispatcher.md#eventdispatchert).[`addEventListener`](util/EventDispatcher.md#addeventlistener)

###### Call Signature

```ts
addEventListener(
   type, 
   listener, 
   options?): void
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

`listener`

</td>
<td>

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`EventDispatcher`](util/EventDispatcher.md#eventdispatchert).[`addEventListener`](util/EventDispatcher.md#addeventlistener)

##### delete()

```ts
delete(directionOrSelection?, options?): this
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

`directionOrSelection`?

</td>
<td>

`1` \| `-1` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

\{ `dontFixNewline`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### destroy()

```ts
destroy(): void
```

###### Returns

`void`

##### dispatchEvent()

```ts
dispatchEvent(event, catchErrors?): void
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

`Event`

</td>
</tr>
<tr>
<td>

`catchErrors`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`EventDispatcher`](util/EventDispatcher.md#eventdispatchert).[`dispatchEvent`](util/EventDispatcher.md#dispatchevent)

##### formatLine()

```ts
formatLine(format, selection): this
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

`format`

</td>
<td>

`string` \| [`default`](delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`selection`

</td>
<td>

`null` \| `number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### formatText()

```ts
formatText(format, selection): this
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

`format`

</td>
<td>

`string` \| [`default`](delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`selection`

</td>
<td>

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### getActive()

```ts
getActive(): default
```

###### Returns

[`default`](delta/AttributeMap/index.md#default)

##### getAllBounds()

```ts
getAllBounds(
   range, 
   relativeTo?, 
   relativeInside?): undefined | DOMRect[]
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

`range`

</td>
<td>

`number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`relativeTo`?

</td>
<td>

`Element`

</td>
</tr>
<tr>
<td>

`relativeInside`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `DOMRect`[]

##### getBounds()

```ts
getBounds(
   range, 
   relativeTo?, 
   relativeInside?): undefined | DOMRect
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

`range`

</td>
<td>

`number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`relativeTo`?

</td>
<td>

`Element`

</td>
</tr>
<tr>
<td>

`relativeInside`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `DOMRect`

##### getDelta()

```ts
getDelta(): default
```

###### Returns

[`default`](delta/Delta.md#default)

##### getHTML()

```ts
getHTML(): string
```

###### Returns

`string`

##### getIndexFromPoint()

```ts
getIndexFromPoint(x, y): null | number
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

`x`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`y`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| `number`

##### getText()

```ts
getText(range?): string
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

`range`?

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### indent()

```ts
indent(): this
```

###### Returns

`this`

##### init()

```ts
init(): void
```

###### Returns

`void`

##### insert()

```ts
insert(
   insert, 
   format?, 
   selection?, 
   options?): this
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

`insert`

</td>
<td>

`string` \| `object`

</td>
</tr>
<tr>
<td>

`format`?

</td>
<td>

[`default`](delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`selection`?

</td>
<td>

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

\{ `dontFixNewline`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### insertContent()

```ts
insertContent(content, selection): this
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

`content`

</td>
<td>

[`default`](delta/Delta.md#default)

</td>
</tr>
<tr>
<td>

`selection`

</td>
<td>

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### off()

###### Call Signature

```ts
off<K>(
   type, 
   listener, 
   options?): void
```

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`K` *extends* keyof [`EditorEventMap`](Editor.md#editoreventmap)

</td>
</tr>
</tbody>
</table>

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

`K`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`EventDispatcher`](util/EventDispatcher.md#eventdispatchert).[`off`](util/EventDispatcher.md#off)

###### Call Signature

```ts
off(
   type, 
   listener, 
   options?): void
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

`listener`

</td>
<td>

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`EventDispatcher`](util/EventDispatcher.md#eventdispatchert).[`off`](util/EventDispatcher.md#off)

##### on()

###### Call Signature

```ts
on<K>(
   type, 
   listener, 
   options?): void
```

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`K` *extends* keyof [`EditorEventMap`](Editor.md#editoreventmap)

</td>
</tr>
</tbody>
</table>

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

`K`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`EventDispatcher`](util/EventDispatcher.md#eventdispatchert).[`on`](util/EventDispatcher.md#on)

###### Call Signature

```ts
on(
   type, 
   listener, 
   options?): void
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

`listener`

</td>
<td>

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`EventDispatcher`](util/EventDispatcher.md#eventdispatchert).[`on`](util/EventDispatcher.md#on)

##### outdent()

```ts
outdent(): this
```

###### Returns

`this`

##### removeEventListener()

###### Call Signature

```ts
removeEventListener<K>(
   type, 
   listener, 
   options?): void
```

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`K` *extends* keyof [`EditorEventMap`](Editor.md#editoreventmap)

</td>
</tr>
</tbody>
</table>

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

`K`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`EventDispatcher`](util/EventDispatcher.md#eventdispatchert).[`removeEventListener`](util/EventDispatcher.md#removeeventlistener)

###### Call Signature

```ts
removeEventListener(
   type, 
   listener, 
   options?): void
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

`listener`

</td>
<td>

(`event`) => `any`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`AddEventListenerOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

[`EventDispatcher`](util/EventDispatcher.md#eventdispatchert).[`removeEventListener`](util/EventDispatcher.md#removeeventlistener)

##### removeFormat()

```ts
removeFormat(selection): this
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

`selection`

</td>
<td>

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### render()

```ts
render(): this
```

###### Returns

`this`

##### select()

```ts
select(at, source?): this
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

`at`

</td>
<td>

`null` \| `number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`source`?

</td>
<td>

[`Source`](Source.md#source)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### set()

```ts
set(
   docOrDelta, 
   source, 
   change?, 
   changedLines?): this
```

###### Parameters

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

`docOrDelta`

</td>
<td>

[`default`](delta/Delta.md#default) \| [`default`](document/TextDocument.md#default)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`source`

</td>
<td>

`string`

</td>
<td>

`Source.user`

</td>
</tr>
<tr>
<td>

`change`?

</td>
<td>

[`default`](document/TextChange.md#default)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`changedLines`?

</td>
<td>

[`default`](document/Line/index.md#default)[]

</td>
<td>

`undefined`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### setDelta()

```ts
setDelta(
   delta, 
   selection, 
   source?): this
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

`delta`

</td>
<td>

[`default`](delta/Delta.md#default)

</td>
</tr>
<tr>
<td>

`selection`

</td>
<td>

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`source`?

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### setHTML()

```ts
setHTML(
   html, 
   selection, 
   source?): this
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

`html`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`selection`

</td>
<td>

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`source`?

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### setRoot()

```ts
setRoot(root): this
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

`root`

</td>
<td>

`HTMLElement`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### setText()

```ts
setText(
   text, 
   selection, 
   source?): this
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

`text`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`selection`

</td>
<td>

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`source`?

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### toggleLineFormat()

```ts
toggleLineFormat(format, selection): this
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

`format`

</td>
<td>

`string` \| [`default`](delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`selection`

</td>
<td>

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### toggleTextFormat()

```ts
toggleTextFormat(format, selection): this
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

`format`

</td>
<td>

`"string"` \| [`default`](delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`selection`

</td>
<td>

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### trimSelection()

```ts
trimSelection(selection): EditorRange
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

`selection`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorRange`](document/EditorRange.md#editorrange)

##### update()

```ts
update(changeOrDelta, source): this
```

###### Parameters

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

`changeOrDelta`

</td>
<td>

[`default`](delta/Delta.md#default) \| [`default`](document/TextChange.md#default)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`source`

</td>
<td>

`string`

</td>
<td>

`Source.user`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

#### Properties

##### \_root

```ts
_root: HTMLElement;
```

##### activeFormats

```ts
activeFormats: default = EMPTY_OBJ;
```

##### catchErrors

```ts
catchErrors: boolean;
```

##### commands

```ts
commands: Commands = {};
```

##### doc

```ts
doc: default;
```

##### identifier

```ts
identifier: any;
```

##### modules

```ts
modules: Modules = {};
```

##### shortcuts

```ts
shortcuts: Shortcuts = {};
```

##### throwOnError

```ts
throwOnError: boolean;
```

##### typeset

```ts
typeset: Typeset;
```

***

### EditorChangeEvent

#### Extends

- `Event`

#### Constructors

##### new EditorChangeEvent()

```ts
new EditorChangeEvent(type, init): EditorChangeEvent
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

[`EditorChangeEventInit`](Editor.md#editorchangeeventinit)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorChangeEvent`](Editor.md#editorchangeevent)

###### Overrides

`Event.constructor`

#### Methods

##### modify()

```ts
modify(delta): void
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

`delta`

</td>
<td>

[`default`](delta/Delta.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

#### Properties

##### change?

```ts
optional change: default;
```

##### changedLines?

```ts
optional changedLines: default[];
```

##### doc

```ts
doc: default;
```

##### old

```ts
old: default;
```

##### source

```ts
source: string;
```

***

### EditorFormatEvent

#### Extends

- `Event`

#### Constructors

##### new EditorFormatEvent()

```ts
new EditorFormatEvent(type, init): EditorFormatEvent
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

[`EditorFormatEventInit`](Editor.md#editorformateventinit)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorFormatEvent`](Editor.md#editorformatevent)

###### Overrides

`Event.constructor`

#### Properties

##### formats

```ts
formats: default;
```

## Interfaces

### EditorChangeEventInit

#### Extends

- `EventInit`

#### Properties

##### change?

```ts
optional change: default;
```

##### changedLines?

```ts
optional changedLines: default[];
```

##### doc

```ts
doc: default;
```

##### old

```ts
old: default;
```

##### source

```ts
source: string;
```

***

### EditorEventMap

#### Indexable

 \[`name`: `string`\]: `Event`

#### Properties

##### blur

```ts
blur: FocusEvent;
```

##### change

```ts
change: EditorChangeEvent;
```

##### changed

```ts
changed: EditorChangeEvent;
```

##### changing

```ts
changing: EditorChangeEvent;
```

##### click

```ts
click: MouseEvent;
```

##### decorate

```ts
decorate: DecorateEvent;
```

##### enabledchange

```ts
enabledchange: Event;
```

##### focus

```ts
focus: FocusEvent;
```

##### format

```ts
format: EditorFormatEvent;
```

##### keydown

```ts
keydown: KeyboardEvent;
```

##### mousedown

```ts
mousedown: MouseEvent;
```

##### mouseup

```ts
mouseup: MouseEvent;
```

##### root

```ts
root: Event;
```

***

### EditorFormatEventInit

#### Extends

- `EventInit`

#### Properties

##### formats

```ts
formats: default;
```

***

### EditorOptions

#### Properties

##### dev?

```ts
optional dev: boolean;
```

##### doc?

```ts
optional doc: default;
```

##### enabled?

```ts
optional enabled: boolean;
```

##### html?

```ts
optional html: string;
```

##### identifier?

```ts
optional identifier: any;
```

##### includeDefaultModules?

```ts
optional includeDefaultModules: boolean;
```

Defaults to true. When true, the `modules` option will be patched on top of the default modules.
Disable this if you are providing all necessary modules in the `modules` option and want full control over module initialization order.

##### modules?

```ts
optional modules: ModuleInitializers;
```

##### root?

```ts
optional root: false | HTMLElement;
```

##### text?

```ts
optional text: string;
```

##### throwOnError?

```ts
optional throwOnError: boolean;
```

##### types?

```ts
optional types: TypesetTypes;
```

***

### EditorTextChange

#### Extends

- [`default`](document/TextChange.md#default)

#### Accessors

##### contentChanged

###### Get Signature

```ts
get contentChanged(): boolean
```

###### Returns

`boolean`

###### Inherited from

[`default`](document/TextChange.md#default).[`contentChanged`](document/TextChange.md#contentchanged)

##### selectionChanged

###### Get Signature

```ts
get selectionChanged(): boolean
```

###### Returns

`boolean`

###### Inherited from

[`default`](document/TextChange.md#default).[`selectionChanged`](document/TextChange.md#selectionchanged)

#### Methods

##### apply()

```ts
apply(source?): Editor
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

`source`?

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Editor`](Editor.md#editor)

###### Overrides

[`default`](document/TextChange.md#default).[`apply`](document/TextChange.md#apply)

##### clone()

```ts
clone(): default
```

###### Returns

[`default`](document/TextChange.md#default)

###### Inherited from

[`default`](document/TextChange.md#default).[`clone`](document/TextChange.md#clone)

##### delete()

```ts
delete(range, options?): EditorTextChange
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

`range`

</td>
<td>

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

\{ `dontFixNewline`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

###### Inherited from

[`default`](document/TextChange.md#default).[`delete`](document/TextChange.md#delete)

##### formatLine()

```ts
formatLine(
   range, 
   format, 
   decoration?): EditorTextChange
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

`range`

</td>
<td>

`number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`format`

</td>
<td>

[`default`](delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`decoration`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

###### Inherited from

[`default`](document/TextChange.md#default).[`formatLine`](document/TextChange.md#formatline)

##### formatText()

```ts
formatText(range, format?): EditorTextChange
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

`range`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`format`?

</td>
<td>

[`default`](delta/AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

###### Inherited from

[`default`](document/TextChange.md#default).[`formatText`](document/TextChange.md#formattext)

##### insert()

```ts
insert(
   at, 
   insert, 
   format?, 
   options?): EditorTextChange
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

`at`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`insert`

</td>
<td>

`string` \| `object`

</td>
</tr>
<tr>
<td>

`format`?

</td>
<td>

[`default`](delta/AttributeMap/index.md#default)

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

\{ `dontFixNewline`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

###### Inherited from

[`default`](document/TextChange.md#default).[`insert`](document/TextChange.md#insert)

##### insertContent()

```ts
insertContent(at, content): EditorTextChange
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

`at`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`content`

</td>
<td>

[`default`](delta/Delta.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

###### Inherited from

[`default`](document/TextChange.md#default).[`insertContent`](document/TextChange.md#insertcontent)

##### isFor()

```ts
isFor(doc): boolean
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

`doc`

</td>
<td>

[`default`](document/TextDocument.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

[`default`](document/TextChange.md#default).[`isFor`](document/TextChange.md#isfor)

##### removeFormat()

```ts
removeFormat(range): EditorTextChange
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

`range`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

###### Inherited from

[`default`](document/TextChange.md#default).[`removeFormat`](document/TextChange.md#removeformat)

##### select()

```ts
select(at): EditorTextChange
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

`at`

</td>
<td>

`null` \| `number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

###### Inherited from

[`default`](document/TextChange.md#default).[`select`](document/TextChange.md#select)

##### setActiveFormats()

```ts
setActiveFormats(activeFormats): EditorTextChange
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

`activeFormats`

</td>
<td>

[`default`](delta/AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

###### Inherited from

[`default`](document/TextChange.md#default).[`setActiveFormats`](document/TextChange.md#setactiveformats)

##### setDelta()

```ts
setDelta(delta): EditorTextChange
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

`delta`

</td>
<td>

[`default`](delta/Delta.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

###### Inherited from

[`default`](document/TextChange.md#default).[`setDelta`](document/TextChange.md#setdelta)

##### toggleLineFormat()

```ts
toggleLineFormat(range, format): EditorTextChange
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

`range`

</td>
<td>

`number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`format`

</td>
<td>

[`default`](delta/AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

###### Inherited from

[`default`](document/TextChange.md#default).[`toggleLineFormat`](document/TextChange.md#togglelineformat)

##### toggleTextFormat()

```ts
toggleTextFormat(range, format): EditorTextChange
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

`range`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`format`

</td>
<td>

[`default`](delta/AttributeMap/index.md#default)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorTextChange`](Editor.md#editortextchange)

###### Inherited from

[`default`](document/TextChange.md#default).[`toggleTextFormat`](document/TextChange.md#toggletextformat)

##### transform()

```ts
transform(change, priority?): default
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

`change`

</td>
<td>

[`default`](document/TextChange.md#default)

</td>
</tr>
<tr>
<td>

`priority`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](document/TextChange.md#default)

###### Inherited from

[`default`](document/TextChange.md#default).[`transform`](document/TextChange.md#transform)

##### transformAgainst()

```ts
transformAgainst(delta, priority?): default
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

`delta`

</td>
<td>

[`default`](delta/Delta.md#default) \| [`default`](document/TextChange.md#default)

</td>
</tr>
<tr>
<td>

`priority`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`default`](document/TextChange.md#default)

###### Inherited from

[`default`](document/TextChange.md#default).[`transformAgainst`](document/TextChange.md#transformagainst)

##### transformSelection()

```ts
transformSelection(selection, priority?): null | EditorRange
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

`selection`

</td>
<td>

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`priority`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`EditorRange`](document/EditorRange.md#editorrange)

###### Inherited from

[`default`](document/TextChange.md#default).[`transformSelection`](document/TextChange.md#transformselection)

#### Properties

##### activeFormats?

```ts
optional activeFormats: default;
```

###### Inherited from

[`default`](document/TextChange.md#default).[`activeFormats`](document/TextChange.md#activeformats)

##### delta

```ts
delta: default;
```

###### Inherited from

[`default`](document/TextChange.md#default).[`delta`](document/TextChange.md#delta)

##### doc

```ts
doc: null | default;
```

###### Inherited from

[`default`](document/TextChange.md#default).[`doc`](document/TextChange.md#doc)

##### selection?

```ts
optional selection: null | EditorRange;
```

###### Inherited from

[`default`](document/TextChange.md#default).[`selection`](document/TextChange.md#selection)

***

### Module

#### Indexable

 \[`name`: `string`\]: `any`

#### Properties

##### commands?

```ts
optional commands: Commands;
```

##### destroy()?

```ts
optional destroy: () => void;
```

###### Returns

`void`

##### getActive()?

```ts
optional getActive: () => default;
```

###### Returns

[`default`](delta/AttributeMap/index.md#default)

##### init()?

```ts
optional init: () => void;
```

###### Returns

`void`

##### shortcuts?

```ts
optional shortcuts: Shortcuts;
```

##### trimSelection()?

```ts
optional trimSelection: (range) => EditorRange;
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

`range`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorRange`](document/EditorRange.md#editorrange)

***

### ModuleInitializer()

```ts
interface ModuleInitializer(editor): Module
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

[`Editor`](Editor.md#editor)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Module`](Editor.md#module)

***

### ModuleInitializers

#### Indexable

 \[`name`: `string`\]: [`ModuleInitializer`](Editor.md#moduleinitializer)

***

### Modules

#### Indexable

 \[`name`: `string`\]: [`Module`](Editor.md#module)

***

### Shortcuts

#### Indexable

 \[`shortcut`: `string`\]: `string`
