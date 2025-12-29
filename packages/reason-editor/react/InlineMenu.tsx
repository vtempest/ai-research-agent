import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createPopper, type Instance as Popper } from '@popperjs/core';
import { Editor } from '../src/Editor';
import { OFFSCREEN_RECT } from '../src/popper';
import { getLineElementAt } from '../src/rendering/position';
import type { HTMLLineElement } from '../src/rendering/rendering';
import { useEditor } from './hooks';
import type { EditorRange, Line } from '../src/document';

export interface InlineMenuProps {
    editor: Editor;
    atLine?: boolean;
    hover?: boolean;
    any?: boolean;
    className?: string;
    children?: (props: {
        commands: any;
        active: any;
        selection: EditorRange | null;
        focus: boolean;
    }) => React.ReactNode;
}

export const InlineMenu: React.FC<InlineMenuProps> = ({
    editor,
    atLine = false,
    hover = false,
    any = false,
    className = 'inline-menu',
    children,
}) => {
    const { active, doc, selection, focus, root } = useEditor(editor);
    const menuRef = useRef<HTMLDivElement>(null);
    const popperRef = useRef<Popper | null>(null);
    const [menuHasFocus, setMenuHasFocus] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [at, setAt] = useState<number | null>(null);

    // Derived state
    const activeSelection = useMemo(() => {
        return menuHasFocus ? selection : selection; // Svelte: return menuHasFocus ? activeSelection : selection; (where activeSelection was derived from store)
    }, [menuHasFocus, selection]);

    const sel = useMemo(() => {
        return !hover && activeSelection && activeSelection[0] === activeSelection[1] ? activeSelection : null;
    }, [hover, activeSelection]);

    // Update 'at' based on selection if not hovering
    useEffect(() => {
        if (!hover && sel) {
            setAt(sel[0]);
        } else if (!hover && !sel) {
            setAt(null);
        }
    }, [hover, sel]);

    const line = useMemo(() => {
        return (at || at === 0) ? doc.getLineAt(at) : null;
    }, [at, doc]);

    const lineElement = useMemo(() => {
        return (line && at !== null && getLineElementAt(editor, at)) || null;
    }, [line, at, editor]);

    const show = useMemo(() => {
        if (!line || line.length !== 1) return false;
        const { lines } = editor.typeset;
        const type = lines.findByAttributes(line.attributes, true);
        return type === lines.default || (any && !type.frozen);
    }, [line, editor, any]);

    // Event Listeners
    useEffect(() => {
        if (!root) return;

        const onMouseOver = (event: MouseEvent) => {
            let node = event.target as HTMLElement;
            while (node && node !== root && node.parentNode !== root) {
                node = node.parentNode as HTMLElement;
            }
            if (!node) return;
            const line = doc.getLineBy((node as HTMLLineElement).key);
            if (line) {
                setAt(doc.getLineRange(line)[0]);
            }
        };

        const onMouseLeave = (event: MouseEvent) => {
            if (menuRef.current && menuRef.current.contains(event.relatedTarget as HTMLElement)) {
                return;
            }
            setAt(null);
        };

        const onRootMouseDown = () => {
            setIsMouseDown(true);
            root.ownerDocument.addEventListener('mouseup', onDocumentMouseUp);
        };

        const onDocumentMouseUp = (event: MouseEvent) => {
            setIsMouseDown(false);
            if (menuRef.current?.style.pointerEvents) menuRef.current.style.pointerEvents = '';
            (event.target as Document).removeEventListener('mouseup', onDocumentMouseUp);
        };

        root.addEventListener('mousedown', onRootMouseDown);
        if (hover) {
            root.addEventListener('mouseover', onMouseOver);
            root.addEventListener('mouseleave', onMouseLeave);
        }

        return () => {
            root.removeEventListener('mousedown', onRootMouseDown);
            if (hover) {
                root.removeEventListener('mouseover', onMouseOver);
                root.removeEventListener('mouseleave', onMouseLeave);
            }
            root.ownerDocument.removeEventListener('mouseup', onDocumentMouseUp);
        };
    }, [root, hover, doc]);

    // Popper update
    useEffect(() => {
        const menu = menuRef.current;
        if (menu && show) { // Only update if showing
            if (popperRef.current) {
                popperRef.current.update();
            } else {
                const element = {
                    getBoundingClientRect: () => {
                        if (atLine) {
                            if (!lineElement) return OFFSCREEN_RECT;
                            const { x, y, height } = lineElement.getBoundingClientRect();
                            return new DOMRect(x, y, 0, height);
                        } else return (at !== null && editor.getBounds(at)) || OFFSCREEN_RECT;
                    },
                    contextElement: editor.root,
                };
                popperRef.current = createPopper(element, menu, {
                    placement: 'right',
                });
                if (isMouseDown) menu.style.pointerEvents = 'none';
                requestAnimationFrame(() => menu && menu.classList.add('active'));
            }
        } else {
            if (popperRef.current && !menuHasFocus) {
                popperRef.current.destroy();
                popperRef.current = null;
            }
        }
    }, [show, atLine, lineElement, editor, at, isMouseDown, menuHasFocus]);

    const onGainFocus = (event: React.FocusEvent) => {
        if (menuHasFocus || (event.target as HTMLElement).nodeName === 'BUTTON') return;
        editor.modules.selection.pause();
        setMenuHasFocus(true);
    };

    const onLoseFocus = () => {
        if (!menuHasFocus) return;
        editor.modules.selection.resume();
        setMenuHasFocus(false);
    };

    const onMouseDownHandler = () => {
        if (!activeSelection || activeSelection[0] !== at) {
            editor.select(at);
        }
    };

    if (!show) return null;

    return (
        <div
            className={className}
            onFocus={onGainFocus}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    onLoseFocus();
                }
            }}
            onMouseDown={onMouseDownHandler}
            ref={menuRef}
            tabIndex={-1}
        >
            {children && children({
                commands: editor.commands,
                active,
                selection: selection, // Svelte passed $selection, which is the raw selection store value
                focus,
            })}
        </div>
    );
};
