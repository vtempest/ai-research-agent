import React from 'react';
import { Editor } from '../src/Editor';
import { useEditor } from './hooks';
import type { EditorRange } from '../src/document';

export interface ToolbarProps {
    editor: Editor;
    children?: (props: {
        commands: any;
        active: any;
        selection: EditorRange | null;
        focus: boolean;
    }) => React.ReactNode;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor, children }) => {
    const { active, selection, focus } = useEditor(editor);

    return (
        <>
            {children && children({
                commands: editor.commands,
                active,
                selection,
                focus,
            })}
        </>
    );
};
