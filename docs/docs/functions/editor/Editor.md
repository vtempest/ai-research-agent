[Documentation](../modules.md) / editor/Editor

## Editor

Defined in: editor/Editor.ts:143

### Extends

- [`EventDispatcher`](util/EventDispatcher.md#eventdispatcher)&lt;[`EditorEventMap`](#editoreventmap)&gt;

### Constructors

#### Constructor

```ts
new Editor(options: EditorOptions): Editor;
```

Defined in: editor/Editor.ts:157

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

`options`

</td>
<td>

[`EditorOptions`](#editoroptions)

</td>
</tr>
</tbody>
</table>

##### Returns

[`Editor`](#editor)

##### Overrides

[`EventDispatcher`](util/EventDispatcher.md#eventdispatcher).[`constructor`](util/EventDispatcher.md#eventdispatcher#constructor)

### Properties

#### \_root

```ts
_root: HTMLElement;
```

Defined in: editor/Editor.ts:153

#### activeFormats

```ts
activeFormats: AttributeMap = EMPTY_OBJ;
```

Defined in: editor/Editor.ts:147

#### catchErrors

```ts
catchErrors: boolean;
```

Defined in: editor/Editor.ts:151

#### commands

```ts
commands: Commands = {};
```

Defined in: editor/Editor.ts:148

#### doc

```ts
doc: default;
```

Defined in: editor/Editor.ts:146

#### identifier

```ts
identifier: any;
```

Defined in: editor/Editor.ts:144

#### modules

```ts
modules: Modules = {};
```

Defined in: editor/Editor.ts:150

#### shortcuts

```ts
shortcuts: Shortcuts = {};
```

Defined in: editor/Editor.ts:149

#### throwOnError

```ts
throwOnError: boolean;
```

Defined in: editor/Editor.ts:152

#### typeset

```ts
typeset: Typeset;
```

Defined in: editor/Editor.ts:145

### Accessors

#### change

##### Get Signature

```ts
get change(): EditorTextChange;
```

Defined in: editor/Editor.ts:198

###### Returns

[`EditorTextChange`](#editortextchange)

#### enabled

##### Get Signature

```ts
get enabled(): boolean;
```

Defined in: editor/Editor.ts:185

###### Returns

`boolean`

##### Set Signature

```ts
set enabled(value: boolean): void;
```

Defined in: editor/Editor.ts:189

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

#### root

##### Get Signature

```ts
get root(): HTMLElement;
```

Defined in: editor/Editor.ts:178

###### Returns

`HTMLElement`

### Methods

#### addEventListener()

##### Call Signature

```ts
addEventListener<K>(
   type: K, 
   listener: (event: EditorEventMap[K]) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:19

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

`K` *extends* keyof [`EditorEventMap`](#editoreventmap)

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

(`event`: [`EditorEventMap`](#editoreventmap)\[`K`\]) => `any`

</td>
</tr>
<tr>
<td>

`options?`

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

[`EventDispatcher`](util/EventDispatcher.md#eventdispatcher).[`addEventListener`](util/EventDispatcher.md#eventdispatcher#addeventlistener)

##### Call Signature

```ts
addEventListener(
   type: string, 
   listener: (event: Event) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:20

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

(`event`: `Event`) => `any`

</td>
</tr>
<tr>
<td>

`options?`

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

[`EventDispatcher`](util/EventDispatcher.md#eventdispatcher).[`addEventListener`](util/EventDispatcher.md#eventdispatcher#addeventlistener)

#### delete()

```ts
delete(directionOrSelection?: 1 | -1 | EditorRange, options?: object): this;
```

Defined in: editor/Editor.ts:353

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

`directionOrSelection?`

</td>
<td>

`1` \| `-1` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `dontFixNewline?`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### destroy()

```ts
destroy(): void;
```

Defined in: editor/Editor.ts:494

##### Returns

`void`

#### dispatchEvent()

```ts
dispatchEvent(event: Event, catchErrors?: boolean): void;
```

Defined in: editor/util/EventDispatcher.ts:39

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

`Event`

</td>
</tr>
<tr>
<td>

`catchErrors?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

##### Inherited from

[`EventDispatcher`](util/EventDispatcher.md#eventdispatcher).[`dispatchEvent`](util/EventDispatcher.md#eventdispatcher#dispatchevent)

#### formatLine()

```ts
formatLine(format: string | AttributeMap, selection: number | EditorRange): this;
```

Defined in: editor/Editor.ts:409

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

`format`

</td>
<td>

`string` \| [`AttributeMap`](index.md#attributemap)

</td>
</tr>
<tr>
<td>

`selection`

</td>
<td>

`number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### formatText()

```ts
formatText(format: string | AttributeMap, selection: EditorRange): this;
```

Defined in: editor/Editor.ts:384

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

`format`

</td>
<td>

`string` \| [`AttributeMap`](index.md#attributemap)

</td>
</tr>
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

##### Returns

`this`

#### getActive()

```ts
getActive(): AttributeMap;
```

Defined in: editor/Editor.ts:294

##### Returns

[`AttributeMap`](index.md#attributemap)

#### getAllBounds()

```ts
getAllBounds(
   range: number | EditorRange, 
   relativeTo?: Element, 
   relativeInside?: boolean): DOMRect[];
```

Defined in: editor/Editor.ts:449

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

`range`

</td>
<td>

`number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`relativeTo?`

</td>
<td>

`Element`

</td>
</tr>
<tr>
<td>

`relativeInside?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

`DOMRect`[]

#### getBounds()

```ts
getBounds(
   range: number | EditorRange, 
   relativeTo?: Element, 
   relativeInside?: boolean): DOMRect;
```

Defined in: editor/Editor.ts:436

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

`range`

</td>
<td>

`number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`relativeTo?`

</td>
<td>

`Element`

</td>
</tr>
<tr>
<td>

`relativeInside?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

`DOMRect`

#### getDelta()

```ts
getDelta(): default;
```

Defined in: editor/Editor.ts:264

##### Returns

[`default`](delta/Delta.md#default)

#### getHTML()

```ts
getHTML(): string;
```

Defined in: editor/Editor.ts:256

##### Returns

`string`

#### getIndexFromPoint()

```ts
getIndexFromPoint(x: number, y: number): number;
```

Defined in: editor/Editor.ts:462

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

##### Returns

`number`

#### getText()

```ts
getText(range?: EditorRange): string;
```

Defined in: editor/Editor.ts:272

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

`range?`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

`string`

#### indent()

```ts
indent(): this;
```

Defined in: editor/Editor.ts:421

##### Returns

`this`

#### init()

```ts
init(): void;
```

Defined in: editor/Editor.ts:473

##### Returns

`void`

#### insert()

```ts
insert(
   insert: string | object, 
   format?: AttributeMap, 
   selection?: EditorRange, 
   options?: object): this;
```

Defined in: editor/Editor.ts:311

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

`insert`

</td>
<td>

`string` \| `object`

</td>
</tr>
<tr>
<td>

`format?`

</td>
<td>

[`AttributeMap`](index.md#attributemap)

</td>
</tr>
<tr>
<td>

`selection?`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `dontFixNewline?`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### insertContent()

```ts
insertContent(content: default, selection: EditorRange): this;
```

Defined in: editor/Editor.ts:347

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

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### off()

##### Call Signature

```ts
off<K>(
   type: K, 
   listener: (event: EditorEventMap[K]) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:13

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

`K` *extends* keyof [`EditorEventMap`](#editoreventmap)

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

(`event`: [`EditorEventMap`](#editoreventmap)\[`K`\]) => `any`

</td>
</tr>
<tr>
<td>

`options?`

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

[`EventDispatcher`](util/EventDispatcher.md#eventdispatcher).[`off`](util/EventDispatcher.md#eventdispatcher#off)

##### Call Signature

```ts
off(
   type: string, 
   listener: (event: Event) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:14

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

(`event`: `Event`) => `any`

</td>
</tr>
<tr>
<td>

`options?`

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

[`EventDispatcher`](util/EventDispatcher.md#eventdispatcher).[`off`](util/EventDispatcher.md#eventdispatcher#off)

#### on()

##### Call Signature

```ts
on<K>(
   type: K, 
   listener: (event: EditorEventMap[K]) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:7

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

`K` *extends* keyof [`EditorEventMap`](#editoreventmap)

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

(`event`: [`EditorEventMap`](#editoreventmap)\[`K`\]) => `any`

</td>
</tr>
<tr>
<td>

`options?`

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

[`EventDispatcher`](util/EventDispatcher.md#eventdispatcher).[`on`](util/EventDispatcher.md#eventdispatcher#on)

##### Call Signature

```ts
on(
   type: string, 
   listener: (event: Event) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:8

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

(`event`: `Event`) => `any`

</td>
</tr>
<tr>
<td>

`options?`

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

[`EventDispatcher`](util/EventDispatcher.md#eventdispatcher).[`on`](util/EventDispatcher.md#eventdispatcher#on)

#### outdent()

```ts
outdent(): this;
```

Defined in: editor/Editor.ts:426

##### Returns

`this`

#### removeEventListener()

##### Call Signature

```ts
removeEventListener<K>(
   type: K, 
   listener: (event: EditorEventMap[K]) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:26

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

`K` *extends* keyof [`EditorEventMap`](#editoreventmap)

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

(`event`: [`EditorEventMap`](#editoreventmap)\[`K`\]) => `any`

</td>
</tr>
<tr>
<td>

`options?`

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

[`EventDispatcher`](util/EventDispatcher.md#eventdispatcher).[`removeEventListener`](util/EventDispatcher.md#eventdispatcher#removeeventlistener)

##### Call Signature

```ts
removeEventListener(
   type: string, 
   listener: (event: Event) => any, 
   options?: AddEventListenerOptions): void;
```

Defined in: editor/util/EventDispatcher.ts:31

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

(`event`: `Event`) => `any`

</td>
</tr>
<tr>
<td>

`options?`

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

[`EventDispatcher`](util/EventDispatcher.md#eventdispatcher).[`removeEventListener`](util/EventDispatcher.md#eventdispatcher#removeeventlistener)

#### removeFormat()

```ts
removeFormat(selection: EditorRange): this;
```

Defined in: editor/Editor.ts:431

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

`selection`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### render()

```ts
render(): this;
```

Defined in: editor/Editor.ts:466

##### Returns

`this`

#### select()

```ts
select(at: number | EditorRange, source?: Source): this;
```

Defined in: editor/Editor.ts:307

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

`at`

</td>
<td>

`number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`source?`

</td>
<td>

[`Source`](Source.md#source)

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### set()

```ts
set(
   docOrDelta: 
  | default
  | default, 
   source: string, 
   change?: default, 
   changedLines?: Line[]): this;
```

Defined in: editor/Editor.ts:227

##### Parameters

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

 \| [`default`](delta/Delta.md#default) \| [`default`](document/TextDocument.md#default)

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

`change?`

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

`changedLines?`

</td>
<td>

[`Line`](index.md#line)[]

</td>
<td>

`undefined`

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### setDelta()

```ts
setDelta(
   delta: default, 
   selection: EditorRange, 
   source?: string): this;
```

Defined in: editor/Editor.ts:268

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

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`source?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### setHTML()

```ts
setHTML(
   html: string, 
   selection: EditorRange, 
   source?: string): this;
```

Defined in: editor/Editor.ts:260

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

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`source?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### setRoot()

```ts
setRoot(root: HTMLElement): this;
```

Defined in: editor/Editor.ts:204

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

`root`

</td>
<td>

`HTMLElement`

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### setText()

```ts
setText(
   text: string, 
   selection: EditorRange, 
   source?: string): this;
```

Defined in: editor/Editor.ts:276

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

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`source?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

##### Returns

`this`

#### toggleLineFormat()

```ts
toggleLineFormat(format: string | AttributeMap, selection: EditorRange): this;
```

Defined in: editor/Editor.ts:415

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

`format`

</td>
<td>

`string` \| [`AttributeMap`](index.md#attributemap)

</td>
</tr>
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

##### Returns

`this`

#### toggleTextFormat()

```ts
toggleTextFormat(format: "string" | AttributeMap, selection: EditorRange): this;
```

Defined in: editor/Editor.ts:396

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

`format`

</td>
<td>

`"string"` \| [`AttributeMap`](index.md#attributemap)

</td>
</tr>
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

##### Returns

`this`

#### trimSelection()

```ts
trimSelection(selection: EditorRange): EditorRange;
```

Defined in: editor/Editor.ts:280

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

`selection`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorRange`](document/EditorRange.md#editorrange)

#### update()

```ts
update(changeOrDelta: 
  | default
  | default, source: string): this;
```

Defined in: editor/Editor.ts:213

##### Parameters

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

 \| [`default`](delta/Delta.md#default) \| [`default`](document/TextChange.md#default)

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

##### Returns

`this`

***

## EditorChangeEvent

Defined in: editor/Editor.ts:80

### Extends

- `Event`

### Constructors

#### Constructor

```ts
new EditorChangeEvent(type: string, init: EditorChangeEventInit): EditorChangeEvent;
```

Defined in: editor/Editor.ts:87

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

[`EditorChangeEventInit`](#editorchangeeventinit)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorChangeEvent`](#editorchangeevent)

##### Overrides

```ts
Event.constructor
```

### Properties

#### change?

```ts
optional change: default;
```

Defined in: editor/Editor.ts:83

#### changedLines?

```ts
optional changedLines: Line[];
```

Defined in: editor/Editor.ts:84

#### doc

```ts
doc: default;
```

Defined in: editor/Editor.ts:82

#### old

```ts
old: default;
```

Defined in: editor/Editor.ts:81

#### source

```ts
source: string;
```

Defined in: editor/Editor.ts:85

### Methods

#### modify()

```ts
modify(delta: default): void;
```

Defined in: editor/Editor.ts:99

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

`delta`

</td>
<td>

[`default`](delta/Delta.md#default)

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

***

## EditorFormatEvent

Defined in: editor/Editor.ts:130

### Extends

- `Event`

### Constructors

#### Constructor

```ts
new EditorFormatEvent(type: string, init: EditorFormatEventInit): EditorFormatEvent;
```

Defined in: editor/Editor.ts:133

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

[`EditorFormatEventInit`](#editorformateventinit)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorFormatEvent`](#editorformatevent)

##### Overrides

```ts
Event.constructor
```

### Properties

#### formats

```ts
formats: AttributeMap;
```

Defined in: editor/Editor.ts:131

***

## EditorChangeEventInit

Defined in: editor/Editor.ts:72

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

<a id="change-2"></a> `change?`

</td>
<td>

[`default`](document/TextChange.md#default)

</td>
<td>

editor/Editor.ts:75

</td>
</tr>
<tr>
<td>

<a id="changedlines-1"></a> `changedLines?`

</td>
<td>

[`Line`](index.md#line)[]

</td>
<td>

editor/Editor.ts:76

</td>
</tr>
<tr>
<td>

<a id="doc-2"></a> `doc`

</td>
<td>

[`default`](document/TextDocument.md#default)

</td>
<td>

editor/Editor.ts:74

</td>
</tr>
<tr>
<td>

<a id="old-1"></a> `old`

</td>
<td>

[`default`](document/TextDocument.md#default)

</td>
<td>

editor/Editor.ts:73

</td>
</tr>
<tr>
<td>

<a id="source-1"></a> `source`

</td>
<td>

`string`

</td>
<td>

editor/Editor.ts:77

</td>
</tr>
</tbody>
</table>

***

## EditorEventMap

Defined in: editor/Editor.ts:113

### Indexable

```ts
[name: string]: Event
```

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

<a id="blur"></a> `blur`

</td>
<td>

`FocusEvent`

</td>
<td>

editor/Editor.ts:121

</td>
</tr>
<tr>
<td>

<a id="change-3"></a> `change`

</td>
<td>

[`EditorChangeEvent`](#editorchangeevent)

</td>
<td>

editor/Editor.ts:117

</td>
</tr>
<tr>
<td>

<a id="changed"></a> `changed`

</td>
<td>

[`EditorChangeEvent`](#editorchangeevent)

</td>
<td>

editor/Editor.ts:118

</td>
</tr>
<tr>
<td>

<a id="changing"></a> `changing`

</td>
<td>

[`EditorChangeEvent`](#editorchangeevent)

</td>
<td>

editor/Editor.ts:116

</td>
</tr>
<tr>
<td>

<a id="click"></a> `click`

</td>
<td>

`MouseEvent`

</td>
<td>

editor/Editor.ts:125

</td>
</tr>
<tr>
<td>

<a id="decorate"></a> `decorate`

</td>
<td>

[`DecorateEvent`](modules/decorations.md#decorateevent)

</td>
<td>

editor/Editor.ts:126

</td>
</tr>
<tr>
<td>

<a id="enabledchange"></a> `enabledchange`

</td>
<td>

`Event`

</td>
<td>

editor/Editor.ts:114

</td>
</tr>
<tr>
<td>

<a id="focus"></a> `focus`

</td>
<td>

`FocusEvent`

</td>
<td>

editor/Editor.ts:120

</td>
</tr>
<tr>
<td>

<a id="format"></a> `format`

</td>
<td>

[`EditorFormatEvent`](#editorformatevent)

</td>
<td>

editor/Editor.ts:119

</td>
</tr>
<tr>
<td>

<a id="keydown"></a> `keydown`

</td>
<td>

`KeyboardEvent`

</td>
<td>

editor/Editor.ts:122

</td>
</tr>
<tr>
<td>

<a id="mousedown"></a> `mousedown`

</td>
<td>

`MouseEvent`

</td>
<td>

editor/Editor.ts:123

</td>
</tr>
<tr>
<td>

<a id="mouseup"></a> `mouseup`

</td>
<td>

`MouseEvent`

</td>
<td>

editor/Editor.ts:124

</td>
</tr>
<tr>
<td>

<a id="root-1"></a> `root`

</td>
<td>

`Event`

</td>
<td>

editor/Editor.ts:115

</td>
</tr>
</tbody>
</table>

***

## EditorFormatEventInit

Defined in: editor/Editor.ts:109

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

<a id="formats-1"></a> `formats`

</td>
<td>

[`AttributeMap`](index.md#attributemap)

</td>
<td>

editor/Editor.ts:110

</td>
</tr>
</tbody>
</table>

***

## EditorOptions

Defined in: editor/Editor.ts:28

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="dev"></a> `dev?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

editor/Editor.ts:42

</td>
</tr>
<tr>
<td>

<a id="doc-3"></a> `doc?`

</td>
<td>

[`default`](document/TextDocument.md#default)

</td>
<td>

&hyphen;

</td>
<td>

editor/Editor.ts:32

</td>
</tr>
<tr>
<td>

<a id="enabled-1"></a> `enabled?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

editor/Editor.ts:39

</td>
</tr>
<tr>
<td>

<a id="html"></a> `html?`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

editor/Editor.ts:41

</td>
</tr>
<tr>
<td>

<a id="identifier-1"></a> `identifier?`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
<td>

editor/Editor.ts:29

</td>
</tr>
<tr>
<td>

<a id="includedefaultmodules"></a> `includeDefaultModules?`

</td>
<td>

`boolean`

</td>
<td>

Defaults to true. When true, the `modules` option will be patched on top of the default modules.
Disable this if you are providing all necessary modules in the `modules` option and want full control over module initialization order.

</td>
<td>

editor/Editor.ts:38

</td>
</tr>
<tr>
<td>

<a id="modules-1"></a> `modules?`

</td>
<td>

[`ModuleInitializers`](#moduleinitializers)

</td>
<td>

&hyphen;

</td>
<td>

editor/Editor.ts:33

</td>
</tr>
<tr>
<td>

<a id="root-2"></a> `root?`

</td>
<td>

`false` \| `HTMLElement`

</td>
<td>

&hyphen;

</td>
<td>

editor/Editor.ts:30

</td>
</tr>
<tr>
<td>

<a id="text"></a> `text?`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

editor/Editor.ts:40

</td>
</tr>
<tr>
<td>

<a id="throwonerror-1"></a> `throwOnError?`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
<td>

editor/Editor.ts:43

</td>
</tr>
<tr>
<td>

<a id="types"></a> `types?`

</td>
<td>

[`TypesetTypes`](typesetting/typeset.md#typesettypes)

</td>
<td>

&hyphen;

</td>
<td>

editor/Editor.ts:31

</td>
</tr>
</tbody>
</table>

***

## EditorTextChange

Defined in: editor/Editor.ts:139

### Extends

- [`default`](document/TextChange.md#default)

### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="activeformats-1"></a> `activeFormats?`

</td>
<td>

[`AttributeMap`](index.md#attributemap)

</td>
<td>

[`default`](document/TextChange.md#default).[`activeFormats`](document/TextChange.md#default#activeformats)

</td>
<td>

editor/document/TextChange.ts:11

</td>
</tr>
<tr>
<td>

<a id="delta"></a> `delta`

</td>
<td>

[`default`](delta/Delta.md#default)

</td>
<td>

[`default`](document/TextChange.md#default).[`delta`](document/TextChange.md#default#delta)

</td>
<td>

editor/document/TextChange.ts:9

</td>
</tr>
<tr>
<td>

<a id="doc-4"></a> `doc`

</td>
<td>

[`default`](document/TextDocument.md#default)

</td>
<td>

[`default`](document/TextChange.md#default).[`doc`](document/TextChange.md#default#doc)

</td>
<td>

editor/document/TextChange.ts:8

</td>
</tr>
<tr>
<td>

<a id="selection"></a> `selection?`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
<td>

[`default`](document/TextChange.md#default).[`selection`](document/TextChange.md#default#selection)

</td>
<td>

editor/document/TextChange.ts:10

</td>
</tr>
</tbody>
</table>

### Accessors

#### contentChanged

##### Get Signature

```ts
get contentChanged(): boolean;
```

Defined in: editor/document/TextChange.ts:26

###### Returns

`boolean`

##### Inherited from

[`default`](document/TextChange.md#default).[`contentChanged`](document/TextChange.md#default#contentchanged)

#### selectionChanged

##### Get Signature

```ts
get selectionChanged(): boolean;
```

Defined in: editor/document/TextChange.ts:30

###### Returns

`boolean`

##### Inherited from

[`default`](document/TextChange.md#default).[`selectionChanged`](document/TextChange.md#default#selectionchanged)

### Methods

#### apply()

```ts
apply(source?: string): Editor;
```

Defined in: editor/Editor.ts:140

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

`source?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

##### Returns

[`Editor`](#editor)

##### Overrides

[`default`](document/TextChange.md#default).[`apply`](document/TextChange.md#default#apply)

#### clone()

```ts
clone(): default;
```

Defined in: editor/document/TextChange.ts:245

##### Returns

[`default`](document/TextChange.md#default)

##### Inherited from

[`default`](document/TextChange.md#default).[`clone`](document/TextChange.md#default#clone)

#### delete()

```ts
delete(range: EditorRange, options?: object): EditorTextChange;
```

Defined in: editor/document/TextChange.ts:57

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

`range`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `dontFixNewline?`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorTextChange`](#editortextchange)

##### Inherited from

[`default`](document/TextChange.md#default).[`delete`](document/TextChange.md#default#delete)

#### formatLine()

```ts
formatLine(
   range: number | EditorRange, 
   format: AttributeMap, 
   decoration?: boolean): EditorTextChange;
```

Defined in: editor/document/TextChange.ts:174

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

[`AttributeMap`](index.md#attributemap)

</td>
</tr>
<tr>
<td>

`decoration?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorTextChange`](#editortextchange)

##### Inherited from

[`default`](document/TextChange.md#default).[`formatLine`](document/TextChange.md#default#formatline)

#### formatText()

```ts
formatText(range: EditorRange, format?: AttributeMap): EditorTextChange;
```

Defined in: editor/document/TextChange.ts:144

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

`range`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`format?`

</td>
<td>

[`AttributeMap`](index.md#attributemap)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorTextChange`](#editortextchange)

##### Inherited from

[`default`](document/TextChange.md#default).[`formatText`](document/TextChange.md#default#formattext)

#### insert()

```ts
insert(
   at: number, 
   insert: string | object, 
   format?: AttributeMap, 
   options?: object): EditorTextChange;
```

Defined in: editor/document/TextChange.ts:76

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

`format?`

</td>
<td>

[`AttributeMap`](index.md#attributemap)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `dontFixNewline?`: `boolean`; \}

</td>
</tr>
<tr>
<td>

`options.dontFixNewline?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorTextChange`](#editortextchange)

##### Inherited from

[`default`](document/TextChange.md#default).[`insert`](document/TextChange.md#default#insert)

#### insertContent()

```ts
insertContent(at: number, content: default): EditorTextChange;
```

Defined in: editor/document/TextChange.ts:120

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

##### Returns

[`EditorTextChange`](#editortextchange)

##### Inherited from

[`default`](document/TextChange.md#default).[`insertContent`](document/TextChange.md#default#insertcontent)

#### isFor()

```ts
isFor(doc: default): boolean;
```

Defined in: editor/document/TextChange.ts:241

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

`doc`

</td>
<td>

[`default`](document/TextDocument.md#default)

</td>
</tr>
</tbody>
</table>

##### Returns

`boolean`

##### Inherited from

[`default`](document/TextChange.md#default).[`isFor`](document/TextChange.md#default#isfor)

#### removeFormat()

```ts
removeFormat(range: EditorRange): EditorTextChange;
```

Defined in: editor/document/TextChange.ts:204

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

`range`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorTextChange`](#editortextchange)

##### Inherited from

[`default`](document/TextChange.md#default).[`removeFormat`](document/TextChange.md#default#removeformat)

#### select()

```ts
select(at: number | EditorRange): EditorTextChange;
```

Defined in: editor/document/TextChange.ts:52

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

`at`

</td>
<td>

`number` \| [`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorTextChange`](#editortextchange)

##### Inherited from

[`default`](document/TextChange.md#default).[`select`](document/TextChange.md#default#select)

#### setActiveFormats()

```ts
setActiveFormats(activeFormats: AttributeMap): EditorTextChange;
```

Defined in: editor/document/TextChange.ts:47

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

`activeFormats`

</td>
<td>

[`AttributeMap`](index.md#attributemap)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorTextChange`](#editortextchange)

##### Inherited from

[`default`](document/TextChange.md#default).[`setActiveFormats`](document/TextChange.md#default#setactiveformats)

#### setDelta()

```ts
setDelta(delta: default): EditorTextChange;
```

Defined in: editor/document/TextChange.ts:41

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

`delta`

</td>
<td>

[`default`](delta/Delta.md#default)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorTextChange`](#editortextchange)

##### Inherited from

[`default`](document/TextChange.md#default).[`setDelta`](document/TextChange.md#default#setdelta)

#### toggleLineFormat()

```ts
toggleLineFormat(range: number | EditorRange, format: AttributeMap): EditorTextChange;
```

Defined in: editor/document/TextChange.ts:195

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

[`AttributeMap`](index.md#attributemap)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorTextChange`](#editortextchange)

##### Inherited from

[`default`](document/TextChange.md#default).[`toggleLineFormat`](document/TextChange.md#default#togglelineformat)

#### toggleTextFormat()

```ts
toggleTextFormat(range: EditorRange, format: AttributeMap): EditorTextChange;
```

Defined in: editor/document/TextChange.ts:165

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

[`AttributeMap`](index.md#attributemap)

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorTextChange`](#editortextchange)

##### Inherited from

[`default`](document/TextChange.md#default).[`toggleTextFormat`](document/TextChange.md#default#toggletextformat)

#### transform()

```ts
transform(change: default, priority?: boolean): default;
```

Defined in: editor/document/TextChange.ts:216

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

`change`

</td>
<td>

[`default`](document/TextChange.md#default)

</td>
</tr>
<tr>
<td>

`priority?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](document/TextChange.md#default)

##### Inherited from

[`default`](document/TextChange.md#default).[`transform`](document/TextChange.md#default#transform)

#### transformAgainst()

```ts
transformAgainst(delta: 
  | default
  | default, priority?: boolean): default;
```

Defined in: editor/document/TextChange.ts:234

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

`delta`

</td>
<td>

 \| [`default`](delta/Delta.md#default) \| [`default`](document/TextChange.md#default)

</td>
</tr>
<tr>
<td>

`priority?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`default`](document/TextChange.md#default)

##### Inherited from

[`default`](document/TextChange.md#default).[`transformAgainst`](document/TextChange.md#default#transformagainst)

#### transformSelection()

```ts
transformSelection(selection: EditorRange, priority?: boolean): EditorRange;
```

Defined in: editor/document/TextChange.ts:223

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

`selection`

</td>
<td>

[`EditorRange`](document/EditorRange.md#editorrange)

</td>
</tr>
<tr>
<td>

`priority?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

##### Returns

[`EditorRange`](document/EditorRange.md#editorrange)

##### Inherited from

[`default`](document/TextChange.md#default).[`transformSelection`](document/TextChange.md#default#transformselection)

***

## Module

Defined in: editor/Editor.ts:50

### Indexable

```ts
[name: string]: any
```

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

<a id="commands-1"></a> `commands?`

</td>
<td>

[`Commands`](typesetting/typeset.md#commands-1)

</td>
<td>

editor/Editor.ts:54

</td>
</tr>
<tr>
<td>

<a id="destroy-2"></a> `destroy?`

</td>
<td>

() => `void`

</td>
<td>

editor/Editor.ts:52

</td>
</tr>
<tr>
<td>

<a id="getactive-2"></a> `getActive?`

</td>
<td>

() => [`AttributeMap`](index.md#attributemap)

</td>
<td>

editor/Editor.ts:55

</td>
</tr>
<tr>
<td>

<a id="init-2"></a> `init?`

</td>
<td>

() => `void`

</td>
<td>

editor/Editor.ts:51

</td>
</tr>
<tr>
<td>

<a id="shortcuts-1"></a> `shortcuts?`

</td>
<td>

[`Shortcuts`](#shortcuts-2)

</td>
<td>

editor/Editor.ts:53

</td>
</tr>
<tr>
<td>

<a id="trimselection-2"></a> `trimSelection?`

</td>
<td>

(`range`: [`EditorRange`](document/EditorRange.md#editorrange)) => [`EditorRange`](document/EditorRange.md#editorrange)

</td>
<td>

editor/Editor.ts:56

</td>
</tr>
</tbody>
</table>

***

## ModuleInitializer()

Defined in: editor/Editor.ts:64

```ts
ModuleInitializer(editor: Editor): Module;
```

Defined in: editor/Editor.ts:65

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

[`Editor`](#editor)

</td>
</tr>
</tbody>
</table>

### Returns

[`Module`](#module)

***

## ModuleInitializers

Defined in: editor/Editor.ts:60

### Indexable

```ts
[name: string]: ModuleInitializer
```

***

## Modules

Defined in: editor/Editor.ts:68

### Indexable

```ts
[name: string]: Module
```

***

## Shortcuts

Defined in: editor/Editor.ts:46

### Indexable

```ts
[shortcut: string]: string
```
