
import { LexicalEditor } from 'lexical';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import {
  MAX_ALLOWED_FONT_SIZE,
  MIN_ALLOWED_FONT_SIZE,
} from '../../context/ToolbarContext';
import { updateFontSizeInSelection } from './utils';

const FONT_SIZE_OPTIONS = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72];

function parseFontSize(input: string): [number, string] | null {
  const match = input.match(/^(\d+(?:\.\d+)?)(px|pt)$/);
  return match ? [Number(match[1]), match[2]] : null;
}

function normalizeToPx(fontSize: number, unit: string): number {
  return unit === 'pt' ? Math.round((fontSize * 4) / 3) : fontSize;
}

function isValidFontSize(fontSizePx: number): boolean {
  return (
    fontSizePx >= MIN_ALLOWED_FONT_SIZE && fontSizePx <= MAX_ALLOWED_FONT_SIZE
  );
}

export function parseFontSizeForToolbar(input: string): string {
  const parsed = parseFontSize(input);
  if (!parsed) return '';
  const [fontSize, unit] = parsed;
  const fontSizePx = normalizeToPx(fontSize, unit);
  return `${fontSizePx}px`;
}

export function parseAllowedFontSize(input: string): string {
  const parsed = parseFontSize(input);
  if (!parsed) return '';
  const [fontSize, unit] = parsed;
  const fontSizePx = normalizeToPx(fontSize, unit);
  return isValidFontSize(fontSizePx) ? input : '';
}

export default function FontSize({
  selectionFontSize,
  disabled,
  editor,
}: {
  selectionFontSize: string;
  disabled: boolean;
  editor: LexicalEditor;
}) {
  const currentSize = selectionFontSize ? String(parseInt(selectionFontSize, 10)) : '';

  const handleValueChange = (value: string) => {
    updateFontSizeInSelection(editor, value + 'px', null, false);
  };

  return (
    <Select value={currentSize} onValueChange={handleValueChange} disabled={disabled}>
      <SelectTrigger
        className="h-7 w-14 text-xs font-semibold px-2 border-border focus:ring-ring shrink-0"
        aria-label="Font size"
      >
        <SelectValue placeholder="–" />
      </SelectTrigger>
      <SelectContent className="min-w-[4rem]">
        {FONT_SIZE_OPTIONS.map((size) => (
          <SelectItem key={size} value={String(size)} className="text-xs">
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
