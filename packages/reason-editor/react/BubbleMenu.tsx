import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createPopper, type Placement, type Instance as Popper } from '@popperjs/core';
import { Editor } from '../src/Editor';
import { OFFSCREEN_RECT } from '../src/popper';
import { useEditor } from './hooks';
import type { EditorRange } from '../src/document';

export interface BubbleMenuProps {
    editor: Editor;
    className?: string;
    offset?: number;
    padding?: number;
    for?: string;
    placement?: Placement;
    children?: (props: {
        commands: any;
        active: any;
        selection: EditorRange | null;
        focus: boolean;
        placement: Placement;
    }) => React.ReactNode;
}

export const BubbleMenu: React.FC<BubbleMenuProps> = ({
    editor,
    className = 'bubble-menu',
    offset = 40,
    padding = 0,
    for: forLineType,
    placement = 'bottom',
    children,
}) => {
    const { active, doc, selection, focus, root } = useEditor(editor);
    const menuRef = useRef<HTMLDivElement>(null);
    const popperRef = useRef<Popper | null>(null);
    const [mouseDown, setMouseDown] = useState(false);
    const [menuHasFocus, setMenuHasFocus] = useState(false);
    const [actualPlacement, setActualPlacement] = useState<Placement>(placement);

    const activeSelection = useMemo(() => {
        let fixedSelection = selection && editor?.trimSelection(selection);
        let lineType;
        if (fixedSelection && fixedSelection[0] === fixedSelection[1] - 1) {
            const line = doc.getLineAt(fixedSelection[0]);
            const type = editor.typeset.lines.findByAttributes(line.attributes, true);
            if (type.frozen) {
                lineType = type.name;
            }
        }
        if (lineType != forLineType) fixedSelection = null;
        return mouseDown || menuHasFocus ? selection : fixedSelection; // Note: Svelte used activeSelection recursively which seems wrong or I misunderstood.
        // Re-reading Svelte:
        // $: activeSelection = getActive(mouseDown, menuHasFocus, $selection);
        // function getActive(...) { ... return mouseDown || menuHasFocus ? activeSelection : fixedSelection; }
        // Wait, Svelte's reactive statement `$: activeSelection = ...` means `activeSelection` is the result.
        // But inside `getActive` it returns `activeSelection`? That would be the *previous* value.
        // In Svelte, if you reference the variable being assigned to inside the reactive block, it uses the current value (which might be undefined initially or previous value).
        // Basically it means "keep showing the current selection if mouse is down or menu has focus".
        // In React, we can use a ref to store the "last valid" selection.
    }, [selection, editor, doc, forLineType, mouseDown, menuHasFocus]);

    // To implement the "keep selection" logic:
    const [lastValidSelection, setLastValidSelection] = useState<EditorRange | null>(null);

    useEffect(() => {
        let fixedSelection = selection && editor?.trimSelection(selection);
        let lineType;
        if (fixedSelection && fixedSelection[0] === fixedSelection[1] - 1) {
            const line = doc.getLineAt(fixedSelection[0]);
            const type = editor.typeset.lines.findByAttributes(line.attributes, true);
            if (type.frozen) {
                lineType = type.name;
            }
        }
        if (lineType != forLineType) fixedSelection = null;

        if (!mouseDown && !menuHasFocus) {
            setLastValidSelection(fixedSelection);
        }
    }, [selection, editor, doc, forLineType, mouseDown, menuHasFocus]);

    const currentSelection = mouseDown || menuHasFocus ? lastValidSelection : lastValidSelection;
    // Wait, if !mouseDown && !menuHasFocus, we update lastValidSelection to fixedSelection.
    // If mouseDown || menuHasFocus, we DON'T update it, so it stays as the previous value.
    // So `currentSelection` is just `lastValidSelection`.
    // However, we need to make sure `lastValidSelection` is updated correctly.

    // Let's refine the selection logic.
    // Svelte:
    // $: activeSelection = getActive(mouseDown, menuHasFocus, $selection);
    // getActive returns: if (mouseDown || menuHasFocus) return activeSelection (previous value); else return fixedSelection;

    // React equivalent:
    const [displayedSelection, setDisplayedSelection] = useState<EditorRange | null>(null);

    useEffect(() => {
        if (mouseDown || menuHasFocus) return;

        let fixedSelection = selection && editor?.trimSelection(selection);
        let lineType;
        if (fixedSelection && fixedSelection[0] === fixedSelection[1] - 1) {
            const line = doc.getLineAt(fixedSelection[0]);
            const type = editor.typeset.lines.findByAttributes(line.attributes, true);
            if (type.frozen) {
                lineType = type.name;
            }
        }
        if (lineType != forLineType) fixedSelection = null;

        setDisplayedSelection(fixedSelection);
    }, [selection, editor, doc, forLineType, mouseDown, menuHasFocus]);


    useEffect(() => {
        const onMouseDown = () => setMouseDown(true);
        const onMouseUp = () => {
            setMouseDown(false);
            // update(menu, $doc); // handled by effect dependency
        };

        if (root) {
            root.addEventListener('mousedown', onMouseDown);
            root.ownerDocument.addEventListener('mouseup', onMouseUp);
        }
        return () => {
            if (root) {
                root.removeEventListener('mousedown', onMouseDown);
                root.ownerDocument.removeEventListener('mouseup', onMouseUp);
            }
        };
    }, [root]);

    useEffect(() => {
        if (mouseDown) return;
        const menu = menuRef.current;
        if (menu && displayedSelection && displayedSelection[0] !== displayedSelection[1]) {
            if (popperRef.current) {
                popperRef.current.update();
            } else {
                const element = {
                    getBoundingClientRect: () => (displayedSelection && editor.getBounds(displayedSelection)) || OFFSCREEN_RECT,
                    contextElement: editor.root,
                };
                popperRef.current = createPopper(element, menu, {
                    placement,
                    modifiers: [
                        { name: 'arrow', options: { element: '[data-arrow]' } },
                        { name: 'computeStyles', options: { adaptive: false } },
                        { name: 'offset', options: { offset: [-20, offset] } },
                        { name: 'preventOverflow', options: { padding } },
                        {
                            name: 'dataOutput',
                            enabled: true,
                            phase: 'write',
                            fn({ state }) {
                                setActualPlacement(state.placement.split('-')[0] as Placement);
                            },
                        },
                    ],
                });
                requestAnimationFrame(() => menu && menu.classList.add('active'));
            }
        } else {
            if (popperRef.current && !menuHasFocus) {
                popperRef.current.destroy();
                popperRef.current = null;
            }
        }
    }, [mouseDown, displayedSelection, editor, offset, padding, placement, menuHasFocus, doc]); // Added doc to trigger update on doc change if needed, though Svelte used $doc in update() args.

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

    if (!displayedSelection || displayedSelection[0] === displayedSelection[1]) {
        return null;
    }

    return (
        <div
            className={`${className} z-10000`}
            onFocus={onGainFocus}
            onBlur={(e) => {
                // Check if focus moved outside the menu
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    onLoseFocus();
                }
            }}
            ref={menuRef}
            tabIndex={-1} // Allow div to receive focus
        >
            {children && children({
                commands: editor.commands,
                active,
                selection: displayedSelection,
                focus,
                placement: actualPlacement,
            })}
        </div>
    );
};
