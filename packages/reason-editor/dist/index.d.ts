import { default as diff } from 'fast-diff';

export declare function activeStore(editorStore: Readable<Editor>): Readable<AttributeMap>;

export declare function addShortcutsToEvent(event: KeyboardEventWithShortcut): KeyboardEventWithShortcut;

export declare function applyDecorations(vnode: VNode, attributes: AttributeMap | undefined, defaultClasses?: string[]): VNode;

export declare function asRoot(root: HTMLElement, editor: Editor): {
    update: (newEditor: Editor) => void;
    destroy: () => void;
};

export declare interface AttributeMap {
    [key: string]: any;
}

export declare namespace AttributeMap {
    export function compose(a?: AttributeMap, b?: AttributeMap, keepNull?: boolean): AttributeMap | undefined;
    export function diff(a?: AttributeMap, b?: AttributeMap): AttributeMap | undefined;
    export function invert(attr?: AttributeMap, base?: AttributeMap): AttributeMap;
    export function transform(a: AttributeMap | undefined, b: AttributeMap | undefined, priority?: boolean): AttributeMap | undefined;
}

export declare interface BasicType {
    name: string;
    selector: string;
    styleSelector?: string;
    fromDom?: FromDom | false;
    commands?: (editor: Editor) => Commands | Function;
    shortcuts?: Shortcuts | string;
    render?: Renderer;
}

export declare const BLOCK_ELEMENTS = "address, article, aside, blockquote, editor, dd, div, dl, dt, fieldset, figcaption, figure, footer, form,  header, hr, li, main, nav, noscript, ol, output, p, pre, section, table, tfoot, ul, video";

export declare const blockquote: LineType;

export declare const bold: FormatType;

export declare const br: EmbedType;

export declare function cleanText(delta: Delta): void;

export declare function cloneDeep(value: any): any;

export declare const code: FormatType;

export declare const codeblock: LineType;

export declare type Combined = CombinedEntry[];

declare interface CombinedData {
    combined: Combined;
    byKey: Record<string, CombinedEntry>;
}

export declare type CombinedEntry = Line | Line[];

export declare function combineLines(editor: Editor, lines: Line[]): CombinedData;

export declare interface Commands {
    [name: string]: (...args: any[]) => any;
}

export declare function copy(editor: Editor, options?: CopyOptions): {
    commands: {
        getCopy: (selection?: EditorRange) => {
            text: string;
            html: string;
        };
    };
    init(): void;
    destroy(): void;
};

export declare interface CopyData {
    text?: string;
    html?: string;
    selection?: EditorRange | null;
}

export declare interface CopyOptions {
    copyPlainText?: boolean;
    copyHTML?: boolean;
}

export declare class DecorateEvent extends Event {
    old: TextDocument;
    doc: TextDocument;
    change?: TextChange;
    changedLines?: Line[];
    constructor(type: string, init: DecorateEventInit);
}

export declare interface DecorateEventInit extends EventInit {
    old: TextDocument;
    doc: TextDocument;
    change?: TextChange;
    changedLines?: Line[];
}

export declare interface Decorations {
    class?: string;
    style?: string;
    [attributeName: string]: any;
}

export declare function decorations(editor: Editor): DecorationsModule;

export declare interface DecorationsModule {
    readonly old: TextDocument;
    readonly doc: TextDocument;
    getDecorator: (name: string) => Decorator;
    removeDecorations: (name: string) => boolean;
    clearDecorations: () => void;
    gatherDecorations: (change?: TextChange | undefined, changedLines?: Line[] | undefined) => void;
    init(): void;
    destroy(): void;
}

export declare class Decorator {
    change: TextChange;
    private _name;
    private _doc;
    private _decoration;
    private _apply;
    private _remove;
    constructor(name: string, doc: TextDocument, decoration: Delta | undefined, apply: (name: string, updates: Delta) => void, remove: (name: string) => void);
    hasDecorations(): boolean;
    getDecoration(): Delta;
    apply(): void;
    remove(): void;
    clear(range?: EditorRange): this;
    clearLines(lines: Line[]): this;
    clearLine(value: number | string | Line): this;
    invert(range?: EditorRange): Delta;
    decorateText(range: EditorRange, decoration?: Decorations): this;
    decorateLine(range: EditorRange | number, decoration?: Decorations): this;
    insertDecoration(at: number, decoration?: Decorations): this;
}

export declare const defaultHandlers: (typeof lineReplace)[];

export declare const defaultModules: {
    keyboard: typeof keyboard;
    input: typeof input;
    copy: typeof copy;
    paste: typeof paste;
    history: (editor: Editor) => {
        options: Options;
        hasUndo: () => boolean;
        hasRedo: () => boolean;
        undo: () => void;
        redo: () => void;
        cutoffHistory: () => void;
        clearHistory: () => void;
        setStack: (value: UndoStack) => void;
        getStack: () => UndoStack;
        getActive(): {
            undo: boolean;
            redo: boolean;
        };
        commands: {
            undo: () => void;
            redo: () => void;
        };
        shortcuts: {
            'win:Ctrl+Z': string;
            'mac:Cmd+Z': string;
            'win:Ctrl+Y': string;
            'mac:Cmd+Shift+Z': string;
        };
        init(): void;
        destroy(): void;
    };
    decorations: typeof decorations;
    rendering: typeof rendering;
    selection: typeof selection;
};

export declare const defaultTypes: TypesetTypes;

export declare class Delta {
    static Op: typeof Op;
    static AttributeMap: typeof AttributeMap;
    ops: Op[];
    constructor(ops?: Op[] | {
        ops: Op[];
    });
    insert(arg: string | Record<string, any>, attributes?: AttributeMap | null): this;
    delete(length: number): this;
    retain(length: number, attributes?: AttributeMap | null): this;
    push(newOp: Op): this;
    chop(): this;
    filter(predicate: (op: Op, index: number) => boolean): Op[];
    forEach(predicate: (op: Op, index: number) => void): void;
    map<T>(predicate: (op: Op, index: number) => T): T[];
    partition(predicate: (op: Op) => boolean): [Op[], Op[]];
    reduce<T>(predicate: (accum: T, curr: Op, index: number) => T, initialValue: T): T;
    changeLength(): number;
    length(): number;
    slice(start?: number, end?: number): Delta;
    compose(other: Delta, discardNull?: boolean): Delta;
    concat(other: Delta): Delta;
    diff(other: Delta, cursor?: any): Delta;
    eachLine(predicate: (line: Delta, attributes: AttributeMap, index: number) => boolean | void, newline?: string): void;
    invert(base: Delta): Delta;
    transform(index: number, priority?: boolean): number;
    transform(other: Delta, priority?: boolean): Delta;
    transformPosition(index: number, priority?: boolean): number;
}

export declare function deltaFromDom(editor: Editor, options?: FromDomOptions): Delta;

export declare function deltaFromHTML(editor: Editor, html: string, options?: DeltaFromHTMLOptions): Delta;

export declare interface DeltaFromHTMLOptions {
    possiblePartial?: boolean;
    collapseWhitespace?: boolean;
}

export declare function deltaToText(delta: Delta): string;

export declare function derivedEditorStore<T>(editorStore: Readable<Editor>, defaultValue: T, changeEvents: string[], update: (editor: Editor) => T, checkEquality?: boolean): Readable<T>;

export { diff }

export declare const dl: LineType;

export declare function docFromDom(editor: Editor, root: HTMLElement): TextDocument;

export declare function docFromHTML(editor: Editor, html: string, selection?: EditorRange | null): TextDocument;

export declare function docStore(editorStore: Readable<Editor>): Readable<TextDocument>;

export declare function docToHTML(editor: Editor, doc: TextDocument): string;

export declare class Editor extends EventDispatcher<EditorEventMap> {
    identifier: any;
    typeset: Typeset;
    doc: TextDocument;
    activeFormats: AttributeMap;
    commands: Commands;
    shortcuts: Shortcuts;
    modules: Modules;
    catchErrors: boolean;
    throwOnError: boolean;
    _root: HTMLElement;
    private _modules;
    private _enabled;
    constructor(options?: EditorOptions);
    get root(): HTMLElement;
    get enabled(): boolean;
    set enabled(value: boolean);
    get change(): EditorTextChange;
    setRoot(root: HTMLElement): this;
    update(changeOrDelta: TextChange | Delta, source?: SourceString): this;
    set(docOrDelta: TextDocument | Delta, source?: SourceString, change?: TextChange, changedLines?: Line[]): this;
    getHTML(): string;
    setHTML(html: string, selection?: EditorRange | null, source?: SourceString): this;
    getDelta(): Delta;
    setDelta(delta: Delta, selection?: EditorRange | null, source?: SourceString): this;
    getText(range?: EditorRange): string;
    setText(text: string, selection?: EditorRange | null, source?: SourceString): this;
    trimSelection(selection: EditorRange): EditorRange;
    getActive(): AttributeMap;
    select(at: EditorRange | number | null, source?: Source): this;
    insert(insert: string | object, format?: AttributeMap, selection?: EditorRange, options?: {
        dontFixNewline?: boolean;
    }): this;
    insertContent(content: Delta, selection?: EditorRange): this;
    delete(directionOrSelection?: -1 | 1 | EditorRange, options?: {
        dontFixNewline?: boolean;
    }): this;
    formatText(format: AttributeMap | string, selection?: EditorRange): this;
    toggleTextFormat(format: AttributeMap | 'string', selection?: EditorRange): this;
    formatLine(format: AttributeMap | string, selection?: EditorRange | number | null): this;
    toggleLineFormat(format: AttributeMap | string, selection?: EditorRange): this;
    indent(): this;
    outdent(): this;
    removeFormat(selection?: EditorRange): this;
    getBounds(range: EditorRange | number, relativeTo?: Element, relativeInside?: boolean): DOMRect | undefined;
    getAllBounds(range: EditorRange | number, relativeTo?: Element, relativeInside?: boolean): DOMRect[] | undefined;
    getIndexFromPoint(x: number, y: number): number;
    render(): this;
    init(): void;
    destroy(): void;
}

export declare class EditorChangeEvent extends Event {
    old: TextDocument;
    doc: TextDocument;
    change?: TextChange;
    changedLines?: Line[];
    source: SourceString;
    constructor(type: string, init: EditorChangeEventInit);
    modify(delta: Delta): void;
}

export declare interface EditorChangeEventInit extends EventInit {
    old: TextDocument;
    doc: TextDocument;
    change?: TextChange;
    changedLines?: Line[];
    source: SourceString;
}

export declare interface EditorEventMap {
    enabledchange: Event;
    root: Event;
    changing: EditorChangeEvent;
    change: EditorChangeEvent;
    changed: EditorChangeEvent;
    format: EditorFormatEvent;
    focus: FocusEvent;
    blur: FocusEvent;
    keydown: KeyboardEvent;
    mousedown: MouseEvent;
    mouseup: MouseEvent;
    click: MouseEvent;
    decorate: DecorateEvent;
    [name: string]: Event;
}

export declare class EditorFormatEvent extends Event {
    formats: AttributeMap;
    constructor(type: string, init: EditorFormatEventInit);
}

export declare interface EditorFormatEventInit extends EventInit {
    formats: AttributeMap;
}

export declare interface EditorOptions {
    identifier?: any;
    root?: HTMLElement | false;
    types?: TypesetTypes;
    doc?: TextDocument;
    modules?: ModuleInitializers;
    /**
     * Defaults to true. When true, the `modules` option will be patched on top of the default modules.
     * Disable this if you are providing all necessary modules in the `modules` option and want full control over module initialization order.
     */
    includeDefaultModules?: boolean;
    enabled?: boolean;
    text?: string;
    html?: string;
    dev?: boolean;
    throwOnError?: boolean;
}

export declare type EditorRange = [number, number];

export declare interface EditorStores {
    active: Readable<AttributeMap>;
    doc: Readable<TextDocument>;
    selection: Readable<EditorRange | null>;
    root: Readable<HTMLElement | undefined>;
    focus: Readable<boolean>;
    updateEditor(editor: Editor): void;
}

export declare function editorStores(editor: Editor): EditorStores;

export declare interface EditorTextChange extends TextChange {
    apply(source?: SourceString): Editor;
}

export declare function embed(type: EmbedType): EmbedType;

export declare interface EmbedType extends BasicType {
    noFill?: boolean;
}

export declare class EventDispatcher<T extends Record<string, any> = Record<string, Event>> {
    on<K extends keyof T>(type: K, listener: (event: T[K]) => any, options?: AddEventListenerOptions): void;
    on(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
    off<K extends keyof T>(type: K, listener: (event: T[K]) => any, options?: AddEventListenerOptions): void;
    off(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
    addEventListener<K extends keyof T>(type: K, listener: (event: T[K]) => any, options?: AddEventListenerOptions): void;
    addEventListener(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
    removeEventListener<K extends keyof T>(type: K, listener: (event: T[K]) => any, options?: AddEventListenerOptions): void;
    removeEventListener(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
    dispatchEvent(event: Event, catchErrors?: boolean): void;
}

export declare function focusStore(editorStore: Readable<Editor>): Readable<boolean>;

export declare function format(type: FormatType): FormatType;

export declare interface FormattingOptions {
    nameOnly?: boolean;
    allFormats?: boolean;
}

export declare interface FormatType extends BasicType {
    greedy?: boolean;
}

export declare type FromDom = (node: HTMLElement) => any;

export declare interface FromDomOptions {
    root?: HTMLElement;
    startNode?: Node;
    endNode?: Node;
    offset?: number;
    possiblePartial?: boolean;
    includeIds?: boolean;
    collapseWhitespace?: boolean;
}

export declare function fromNode(editor: Editor, dom: HTMLElement): Line | Line[];

export declare function getBoudingBrowserRange(editor: Editor, range: EditorRange): Range;

export declare function getBrowserRange(editor: Editor, range: EditorRange): Range;

export declare function getChangedRanges(oldC: Combined, newC: Combined): LineRanges_2;

export declare function getIndexFromNode(editor: Editor, startNode: Node): number;

export declare function getIndexFromNodeAndOffset(editor: Editor, node: Node, offset: number, current?: number | null): number;

export declare function getIndexFromPoint(editor: Editor, x: number, y: number): number;

export declare function getLineElementAt(editor: Editor, index: number): HTMLLineElement;

export declare function getLineInfoFromPoint(editor: Editor, y: number): LineInfo | undefined;

export declare function getLineNodeEnd(root: HTMLElement, node: Node): number;

export declare function getLineNodeStart(root: HTMLElement, node: Node): number;

export declare function getNodeAndOffset(editor: Editor, index: number, direction: 0 | 1): NodeOffsetAndFrozen;

export declare function getNodeLength(editor: Editor, parentNode: Node): number;

export declare function getNodesForRange(editor: Editor, range: EditorRange): [Node | null, number, Node | null, number];

/**
 * Get the selection range from the current browser selection
 */
declare function getSelection_2(editor: Editor): EditorRange | null;
export { getSelection_2 as getSelection }

export declare interface H {
    <T, P extends Props | null | undefined, C extends VChild | VChild[]>(type: (props: P, children: C) => T, props?: P, ch?: C): T;
    (type: string, props?: Props | null, ch?: VChild | VChild[]): VNode;
}

export declare const h: H;

export declare type Handler = (editor?: Editor, index?: number, prefix?: string, wholeText?: string) => void;

export declare function hasFormat(format: AttributeMap, attributes: AttributeMap): boolean;

export declare const header: LineType;

declare const history_2: (editor: Editor) => {
    options: Options;
    hasUndo: () => boolean;
    hasRedo: () => boolean;
    undo: () => void;
    redo: () => void;
    cutoffHistory: () => void;
    clearHistory: () => void;
    setStack: (value: UndoStack) => void;
    getStack: () => UndoStack;
    getActive(): {
        undo: boolean;
        redo: boolean;
    };
    commands: {
        undo: () => void;
        redo: () => void;
    };
    shortcuts: {
        'win:Ctrl+Z': string;
        'mac:Cmd+Z': string;
        'win:Ctrl+Y': string;
        'mac:Cmd+Shift+Z': string;
    };
    init(): void;
    destroy(): void;
};
export { history_2 as history }

export declare interface HistoryModule {
    options: Options;
    hasUndo: () => boolean;
    hasRedo: () => boolean;
    undo: () => void;
    redo: () => void;
    cutoffHistory: () => void;
    clearHistory: () => void;
    setStack: (value: UndoStack) => void;
    getStack: () => UndoStack;
    destroy(): void;
}

export declare const hr: LineType;

export declare interface HTMLLineElement extends HTMLElement {
    key: string;
}

export declare const image: EmbedType;

/**
 * History is a view module for storing user changes and undoing/redoing those changes.
 *
 * Stores history for all user-generated changes. Like-changes will be combined until a selection or a delay timeout
 * cuts off the combining. E.g. if a user types "Hello" the 5 changes will be combined into one history entry. If
 * the user moves the cursor somewhere and then back to the end and types " World" the next 6 changes are combined
 * separately from the first 5 because selection changes add a cutoff history entries.
 *
 * The default options can be overridden by passing alternatives to history. To add a timeout to force a cutoff after
 * so many milliseconds set a delay like this:
 * ```js
 * const modules = {
 *   history: history({ delay: 4000 })
 * };
 * ```
 */
export declare function initHistory(initOptions?: Partial<Options>): (editor: Editor) => {
    options: Options;
    hasUndo: () => boolean;
    hasRedo: () => boolean;
    undo: () => void;
    redo: () => void;
    cutoffHistory: () => void;
    clearHistory: () => void;
    setStack: (value: UndoStack) => void;
    getStack: () => UndoStack;
    getActive(): {
        undo: boolean;
        redo: boolean;
    };
    commands: {
        undo: () => void;
        redo: () => void;
    };
    shortcuts: {
        'win:Ctrl+Z': string;
        'mac:Cmd+Z': string;
        'win:Ctrl+Y': string;
        'mac:Cmd+Shift+Z': string;
    };
    init(): void;
    destroy(): void;
};

export declare function inlineToHTML(editor: Editor, delta: Delta): string;

export declare function input(editor: Editor): {
    allowComposition(value?: boolean): void;
    init(): void;
    destroy(): void;
};

export declare function intersect(value: object, other: object): object;

export declare function isBRPlaceholder(editor: Editor, node: Node): boolean;

export declare function isEqual(value: any, other: any, options?: IsEqualOptions): boolean;

declare interface IsEqualOptions {
    shallow?: boolean;
    partial?: boolean;
    excludeProps?: Set<string>;
}

export declare const italic: FormatType;

export declare function keyboard(editor: Editor): {
    init(): void;
    destroy(): void;
};

export declare interface KeyboardEventWithShortcut extends KeyboardEvent {
    shortcut?: string;
    osShortcut?: string;
    modShortcut?: string;
}

export declare interface Line {
    id: string;
    attributes: AttributeMap;
    content: Delta;
    length: number;
}

export declare namespace Line {
    export function iterator(lines: Line[], lineIds?: LineIds): LineIterator;
    export function linesToLineIds(lines: Line[]): Map<any, any>;
    export function length(line: Line): number;
    export function getId(line: Line): string;
    export function equal(value: Line, other: Line): boolean;
    export function fromDelta(delta: Delta, existing?: LineIds): Line[];
    export function toDelta(lines: Line[]): Delta;
    export function create(content?: Delta, attributes?: AttributeMap, id?: string | LineIds): Line;
    export function createFrom(line?: Line, content?: Delta, lineIds?: LineIds): Line;
    export function getLineRanges(lines: Line[]): LineRanges;
    export function createId(existing?: LineIds): string;
}

export declare function line(type: LineType): LineType;

export declare type LineData = [attributes: AttributeMap, children: VChild[], id: string];

export declare type LineIds = Map<string, Line>;

export declare interface LineInfo {
    line: Line;
    element: HTMLLineElement;
    rect: DOMRect;
    belowMid: boolean;
}

export declare class LineIterator {
    lines: Line[];
    index: number;
    offset: number;
    lineIds: LineIds;
    constructor(lines: Line[], lineIds?: LineIds);
    hasNext(): boolean;
    next(length?: number): Line;
    peek(): Line;
    peekLength(): number;
    rest(): Line[];
}

export declare namespace LineOp {
    export function iterator(lines: Line[], lineIds?: LineIds): LineOpIterator;
    export function length(op: Op): number;
}

export declare class LineOpIterator {
    lineIterator: LineIterator;
    opIterator: OpIterator;
    constructor(lines: Line[], lineIds?: LineIds);
    hasNext(): boolean;
    next(length?: number): Op;
    nextLine(): Line;
    peek(): Op;
    peekLine(): Line;
    peekLength(): number;
    peekLineLength(): number;
    peekType(): string;
    restCurrentLine(): Op[];
    restLines(): Line[];
}

export declare type LineRanges = Map<Line, any>;

declare type LineRanges_2 = [EditorRange, EditorRange];

/**
 * Allow text representations to format a line
 */
export declare function lineReplace(editor: Editor, index: number, prefix: string): boolean;

/**
 * A list of [ RegExp, Function ] tuples to convert text into a formatted line with the attributes returned by the
 * function. The function's argument will be the captured text from the regular expression.
 */
export declare const lineReplacements: Replacement[];

export declare interface LineType extends BasicType {
    indentable?: boolean;
    child?: boolean;
    defaultFollows?: boolean;
    frozen?: boolean;
    contained?: boolean;
    onEnter?: (editor: Editor) => void;
    onTab?: (editor: Editor, shiftKey: boolean) => void;
    nextLineAttributes?: (attributes: AttributeMap) => AttributeMap;
    onEmptyEnter?: (editor: Editor, line: Line) => boolean;
    render?: Renderer;
    renderMultiple?: MultiLineRenderer;
    shouldCombine?: ShouldCombine;
}

export declare const link: FormatType;

export declare function linkReplace(editor: Editor, index: number, prefix: string): boolean;

export declare const linkReplacements: Replacement[];

export declare const list: LineType;

export declare const mark: FormatType;

export declare function markReplace(editor: Editor, index: number, prefix: string, wholeText: string): boolean;

/**
 * A list of [ RegExp, Function ] tuples to convert text into formatted text with the attributes returned by the
 * function. The function's argument will be the captured text from the regular expression.
 */
export declare const markReplacements: Replacement[];

export declare interface Module {
    init?: () => void;
    destroy?: () => void;
    shortcuts?: Shortcuts;
    commands?: Commands;
    getActive?: () => AttributeMap;
    trimSelection?: (range: EditorRange) => EditorRange;
    [name: string]: any;
}

export declare interface ModuleInitializer {
    (editor: Editor): Module;
}

export declare interface ModuleInitializers {
    [name: string]: ModuleInitializer;
}

export declare interface Modules {
    [name: string]: Module;
}

export declare type MultiLineRenderer = (lines: LineData[], editor: Editor, forHTML?: boolean) => VNode;

declare type Node_2 = Element | Text;

declare type NodeOffsetAndFrozen = [Node | null, number, boolean?];

export declare function normalizeRange(range: EditorRange): EditorRange;

export declare interface Op {
    insert?: string | Record<string, any>;
    delete?: number;
    retain?: number;
    attributes?: AttributeMap;
}

export declare namespace Op {
    export function iterator(ops: Op[]): OpIterator;
    export function length(op: Op): number;
}

export declare class OpIterator {
    ops: Op[];
    index: number;
    offset: number;
    constructor(ops: Op[]);
    hasNext(): boolean;
    next(length?: number): Op;
    peek(): Op;
    peekLength(): number;
    peekType(): string;
    rest(): Op[];
}

export declare interface Options {
    delay: number;
    maxStack: number;
    unrecordedSources: Set<SourceString>;
}

export declare const options: {
    renderKeys: boolean;
};

export declare const paragraph: LineType;

export declare function paste(editor: Editor, options?: PasteModuleOptions): {
    commands: {
        paste: ({ selection, text, html }: PasteOptions) => void;
    };
    init(): void;
    destroy(): void;
};

export declare class PasteEvent extends Event {
    delta: Delta;
    html?: string;
    text?: string;
    constructor(type: string, init: PasteEventInit);
}

export declare interface PasteEventInit extends EventInit {
    delta: Delta;
    html?: string;
    text?: string;
}

export declare interface PasteModuleOptions {
    htmlParser?: (editor: Editor, html: string) => Delta;
    allowHTMLPaste?: boolean;
}

export declare interface PasteOptions {
    text?: string;
    html?: string;
    selection?: EditorRange | null;
}

export declare const patch: (dom: Node_2, vdom: VNode | VNode[], oldKids?: ChildNode[]) => Node_2;

/**
 * Set placeholder text in the editable area when there is no content. Then add the css:
 *
 * ```css
 * .placeholder {
 *   position: relative;
 * }
 * .placeholder::before {
 *   content: attr(data-placeholder);
 *   position: absolute;
 *   left: 0;
 *   right: 0;
 *   opacity: 0.5;
 * }
 * ```
 */
export declare function placeholder(placeholder: string | Function, options?: PlaceholderOptions): (editor: Editor) => {
    destroy(): void;
};

declare interface PlaceholderOptions {
    keepAttribute?: boolean;
}

export declare interface Props {
    [key: string]: any;
}

export declare const React: {
    createElement: H;
};

export declare interface Readable<T> {
    /**
     * Return the current value.
     */
    get(): T;
    /**
     * Subscribe to changes with a callback. Returns an unsubscribe function.
     */
    subscribe(callback: Subscriber<T>): Unsubscriber;
}

export declare const recycleNode: (dom: Node_2) => string | VNode;

export declare function render(editor: Editor, doc: TextDocument): void;

export declare function renderChanges(editor: Editor, oldDoc: TextDocument, newDoc: TextDocument): void;

export declare function renderCombined(editor: Editor, combined: Combined, forHTML?: boolean): VNode[];

export declare function renderDoc(editor: Editor, doc: TextDocument, forHTML?: boolean): VNode[];

export declare type Renderer = (attributes: AttributeMap, children: VChild[], line: Line, editor: Editor, forHTML?: boolean) => VNode;

export declare function rendering(editor: Editor): {
    render: (what?: RenderWhat) => void;
    destroy(): void;
};

export declare function renderInline(editor: Editor, line: Line, forHTML?: boolean): VChild[];

export declare function renderLine(editor: Editor, line: CombinedEntry, forHTML?: boolean): VNode;

export declare function renderMultiLine(editor: Editor, lines: Line[], forHTML?: boolean): VNode;

export declare function renderSingleLine(editor: Editor, line: Line, forHTML?: boolean): VNode;

export declare interface RenderWhat {
    old?: TextDocument;
    doc?: TextDocument;
}

export declare type Replacement = [RegExp, (captured: string, attr: AttributeMap) => AttributeMap];

export declare function rootStore(editorStore: Readable<Editor>): Readable<HTMLElement>;

export declare function selection(editor: Editor): {
    pause: () => void;
    resume: () => void;
    renderSelection: () => void;
    init(): void;
    destroy(): void;
};

export declare function selectionStore(editorStore: Readable<Editor>): Readable<EditorRange>;

export declare function setLineNodesRanges(editor: Editor): void;

/**
 * Set the current browser selection to the given selection range
 */
export declare function setSelection(editor: Editor, range: EditorRange | null): void;

export declare class ShortcutEvent extends KeyboardEvent {
    readonly shortcut: string;
    readonly osShortcut: string;
    readonly modShortcut: string;
    constructor(type: string, init?: ShortcutEventInit);
    static fromKeyboardEvent(event: KeyboardEvent): ShortcutEvent;
}

export declare interface ShortcutEventInit extends KeyboardEventInit {
    shortcut?: string;
}

/**
 * Returns the textual representation of a shortcut given a keyboard event. Examples of shortcuts:
 * Cmd+L
 * Cmd+Shift+M
 * Ctrl+O
 * Backspace
 * T
 * Right
 * Shift+Down
 * Shift+F1
 * Space
 */
export declare function shortcutFromEvent(event: KeyboardEvent): string;

export declare interface Shortcuts {
    [shortcut: string]: string;
}

export declare type ShouldCombine = (prev: AttributeMap, next: AttributeMap) => boolean;

export declare function smartEntry(handlers?: Handler[]): (editor: Editor) => {
    destroy(): void;
};

/**
 * Replaces regular quotes with smart quotes as they are typed. Also affects pasted content.
 * Uses the text-changing event to prevent the original change and replace it with the new one. This makes the smart-
 * quotes act more seemlessly and includes them as part of regular text undo/redo instead of breaking it like the smart-
 * entry conversions do.
 */
export declare function smartQuotes(editor: Editor): {
    destroy(): void;
};

export declare enum Source {
    api = "api",
    user = "user",
    history = "history",
    input = "input",
    paste = "paste"
}

export declare type SourceString = Source | string;

export declare interface StackEntry {
    redo: TextChange;
    undo: TextChange;
}

/** Callback to inform of a value updates. */
export declare type Subscriber<T> = (value: T) => void;

export declare class TextChange {
    private _pos;
    doc: TextDocument | null;
    delta: Delta;
    selection?: EditorRange | null;
    activeFormats?: AttributeMap;
    constructor(doc: TextDocument | null, delta?: Delta, selection?: EditorRange | null, activeFormats?: AttributeMap);
    get contentChanged(): boolean;
    get selectionChanged(): boolean;
    apply(): void;
    setDelta(delta: Delta): this;
    setActiveFormats(activeFormats: AttributeMap): this;
    select(at: EditorRange | number | null): this;
    delete(range: EditorRange | null, options?: {
        dontFixNewline?: boolean;
    }): this;
    insert(at: number, insert: string | object, format?: AttributeMap, options?: {
        dontFixNewline?: boolean;
    }): this;
    insertContent(at: number, content: Delta): this;
    formatText(range: EditorRange, format?: AttributeMap): this;
    toggleTextFormat(range: EditorRange, format: AttributeMap): this;
    formatLine(range: EditorRange | number, format: AttributeMap, decoration?: boolean): this;
    toggleLineFormat(range: EditorRange | number, format: AttributeMap): this;
    removeFormat(range: EditorRange): this;
    transform(change: TextChange, priority?: boolean): TextChange;
    transformSelection(selection: EditorRange | null, priority?: boolean): EditorRange | null;
    transformAgainst(delta: TextChange | Delta, priority?: boolean): TextChange;
    isFor(doc: TextDocument): boolean;
    clone(): TextChange;
    private compose;
    private normalizePoint;
    private getFormatAt;
}

export declare class TextDocument {
    private _ranges;
    byId: LineIds;
    lines: Line[];
    length: number;
    selection: EditorRange | null;
    constructor(linesOrDocOrDelta?: TextDocument | Line[] | Delta, selection?: EditorRange | null);
    get change(): TextChange;
    getText(range?: EditorRange): string;
    getLineBy(id: string): Line;
    getLineAt(at: number): Line;
    getLinesAt(atOrRange: number | EditorRange, encompassed?: boolean): Line[];
    getLineRange(at: number | string | Line): EditorRange;
    getLineRanges(at?: number | EditorRange): any[];
    getLineFormat(at?: number | EditorRange, options?: FormattingOptions): AttributeMap;
    getTextFormat(at?: number | EditorRange, options?: FormattingOptions): AttributeMap;
    getFormats(at?: number | EditorRange, options?: FormattingOptions): AttributeMap;
    slice(start?: number, end?: number): Delta;
    apply(change: Delta | TextChange, selection?: EditorRange | null, throwOnError?: boolean): TextDocument;
    replace(delta?: Delta, selection?: EditorRange | null): TextDocument;
    toDelta(): Delta;
    equals(other: TextDocument, options?: {
        contentOnly?: boolean;
    }): boolean;
    toJSON(): Delta;
    toString(): string;
}

export declare function textNodeLength(lines: Types, node: Node): number;

export declare function textReplace(editor: Editor, index: number, prefix: string): boolean;

export declare type TextReplacement = [RegExp, (captured: string) => string];

/**
 * A list of [ RegExp, Function ] tuples to convert text into another string of text which is returned by the function.
 * The function's argument will be the captured text from the regular expression.
 */
export declare const textReplacements: TextReplacement[];

export declare function transformHistoryStack(stack: UndoStack, delta: TextChange | Delta): void;

export declare interface TypeMap<T extends BasicType = BasicType> {
    [name: string]: T;
}

/**
 * A type store to hold types and make it easy to manage them.
 */
export declare class Types<T extends BasicType = BasicType> {
    list: T[];
    selector: string;
    types: TypeMap<T>;
    priorities: {
        [name: string]: number;
    };
    constructor(types: T[]);
    get default(): T;
    init(): void;
    add(type: T): void;
    remove(type: T | string): void;
    get(name: string): T;
    priority(name: string): number;
    matches(node: Node | null): boolean;
    findByNode(node: Node, fallbackToDefault: true): T;
    findByNode(node: Node, fallbackToDefault?: boolean): T | undefined;
    findByAttributes(attributes: AttributeMap | undefined, fallbackToDefault: true): T;
    findByAttributes(attributes: AttributeMap | undefined, fallbackToDefault?: boolean): T | undefined;
}

export declare class Typeset {
    lines: Types<LineType>;
    formats: Types<FormatType>;
    embeds: Types<EmbedType>;
    static line: typeof line;
    static format: typeof format;
    static embed: typeof embed;
    constructor(types: TypesetTypes);
}

export declare interface TypesetTypes {
    lines?: Array<string | LineType>;
    formats?: Array<string | FormatType>;
    embeds?: Array<string | EmbedType>;
}

export declare const underline: FormatType;

export declare interface UndoStack {
    undo: StackEntry[];
    redo: StackEntry[];
}

export declare function undoStack(): UndoStack;

/** Unsubscribes from value updates. */
export declare type Unsubscriber = () => void;

export declare type VChild = VNode | string;

export declare function virtualRendering(editor: Editor): {
    render: (what?: VirtualRenderWhat) => void;
    init(): void;
    destroy(): void;
};

export declare interface VirtualRenderWhat {
    old?: TextDocument;
    doc?: TextDocument;
    selection: EditorRange | null;
}

export declare interface VNode {
    type: string;
    props: Props;
    children: VChild[];
    key: any;
}

export { }
