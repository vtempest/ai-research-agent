
import { LexicalEditor } from 'lexical';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import Icon from '../../ui/Icon';
import {
  MAX_ALLOWED_FONT_SIZE,
  MIN_ALLOWED_FONT_SIZE,
} from '../../context/ToolbarContext';
import { isKeyboardInput } from '../../utils/focusUtils';
import { SHORTCUTS } from '../ShortcutsPlugin/shortcuts';
import {
  updateFontSize,
  updateFontSizeInSelection,
  UpdateFontSizeType,
} from './utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';

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
  if (!parsed) {
    return '';
  }

  const [fontSize, unit] = parsed;
  const fontSizePx = normalizeToPx(fontSize, unit);
  return `${fontSizePx}px`;
}

export function parseAllowedFontSize(input: string): string {
  const parsed = parseFontSize(input);
  if (!parsed) {
    return '';
  }

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
  const [inputValue, setInputValue] = React.useState<string>(selectionFontSize);
  const [inputChangeFlag, setInputChangeFlag] = React.useState<boolean>(false);
  const [isMouseMode, setIsMouseMode] = React.useState(false);
  const [lastAppliedSize, setLastAppliedSize] = React.useState<string>(selectionFontSize);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValueNumber = Number(inputValue);

    if (e.key === 'Tab') {
      return;
    }
    if (['e', 'E', '+', '-'].includes(e.key) || isNaN(inputValueNumber)) {
      e.preventDefault();
      setInputValue('');
      return;
    }
    setInputChangeFlag(true);

    // Apply immediately on arrow up/down keys
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      // Let the browser update the input value first
      setTimeout(() => {
        const newValue = Number((e.target as HTMLInputElement).value);
        if (!isNaN(newValue)) {
          updateFontSizeByInputValue(newValue, true);
        }
      }, 0);
    } else if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      updateFontSizeByInputValue(inputValueNumber, !isMouseMode);
    }
  };

  const handleInputBlur = () => {
    setIsMouseMode(false);

    if (inputValue !== '' && inputChangeFlag) {
      const inputValueNumber = Number(inputValue);
      updateFontSizeByInputValue(inputValueNumber);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    setIsMouseMode(true);
  };

  const updateFontSizeByInputValue = (
    inputValueNumber: number,
    skipRefocus: boolean = false,
  ) => {
    let updatedFontSize = inputValueNumber;
    if (inputValueNumber > MAX_ALLOWED_FONT_SIZE) {
      updatedFontSize = MAX_ALLOWED_FONT_SIZE;
    } else if (inputValueNumber < MIN_ALLOWED_FONT_SIZE) {
      updatedFontSize = MIN_ALLOWED_FONT_SIZE;
    }

    const fontSizeStr = String(updatedFontSize);
    setInputValue(fontSizeStr);
    setLastAppliedSize(fontSizeStr);
    updateFontSizeInSelection(
      editor,
      fontSizeStr + 'px',
      null,
      skipRefocus,
    );
    setInputChangeFlag(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setInputChangeFlag(true);

    // Auto-apply when using spinner buttons (value changes by exactly 1)
    const numValue = Number(newValue);
    const lastNum = Number(lastAppliedSize);
    if (!isNaN(numValue) && !isNaN(lastNum) && Math.abs(numValue - lastNum) === 1) {
      // This is likely from spinner buttons
      updateFontSizeByInputValue(numValue, true);
    }
  };

  React.useEffect(() => {
    setInputValue(selectionFontSize);
    setLastAppliedSize(selectionFontSize);
  }, [selectionFontSize]);

  const btnClass = 'inline-flex items-center justify-center rounded-md h-7 w-7 bg-transparent border-0 cursor-pointer text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="inline-flex items-center gap-0.5 shrink-0">
          <input
            type="number"
            value={inputValue}
            disabled={disabled}
            className={cn(
              'w-9 h-7 text-center text-sm font-semibold bg-transparent border border-border rounded-md',
              'focus:outline-none focus:ring-1 focus:ring-ring',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            )}
            min={MIN_ALLOWED_FONT_SIZE}
            max={MAX_ALLOWED_FONT_SIZE}
            onChange={handleInputChange}
            onClick={handleClick}
            onKeyDown={handleKeyPress}
            onBlur={handleInputBlur}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>Font size</TooltipContent>
    </Tooltip>
  );
}
