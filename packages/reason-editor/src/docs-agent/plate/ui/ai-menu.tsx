'use client';

import * as React from 'react';

import { flip, getRangeBoundingClientRect, offset, shift, useVirtualFloating } from '@platejs/floating';
import {
  ArrowLeft,
  Check,
  Copy,
  CornerDownRight,
  Loader2,
  RotateCcw,
  Sparkles,
  Square,
  X,
} from 'lucide-react';
import { RangeApi } from 'platejs';
import { useEditorReadOnly, useEditorRef, useEditorSelector } from 'platejs/react';

import { AI_COMMAND_GROUP_LABELS } from '@/extensions/Ai/commands';
import { commandsForSelection, groupCommands } from '@/extensions/Ai/lib/prompt';
import { cn } from '@/lib/utils';

import { getAiController, type AiPanelState } from '@/docs-agent/plate/ai-controller';
import { AiPlugin } from '@/docs-agent/plate/ai-plugin';

import type { AiCommandDefinition } from '@/extensions/Ai/types';

const CLOSED_PANEL: AiPanelState = { status: 'closed' };

/** One action in the review/error footer. */
function MenuRow({
  icon: Icon,
  label,
  onClick,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  title?: string;
}) {
  return (
    <button
      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
      onClick={onClick}
      title={title}
      type="button"
    >
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      {label}
    </button>
  );
}

/**
 * The floating "Ask AI anything…" panel: the filterable command list, the
 * streaming indicator with a Stop control, the accept / insert-below / try
 * again / discard review controls over a preview of the result, and the error
 * state — the same four states `src/extensions/Ai/components/AiMenu.tsx`
 * renders on the Tiptap side, driven by `../ai-controller.ts` instead of a
 * ProseMirror plugin.
 *
 * Mounted by `../kits/ai-kit.tsx` as the AI plugin's `afterEditable`, so every
 * Plate surface that registers the plugin gets it without wiring of its own.
 */
export function AiMenu() {
  const editor = useEditorRef();
  const readOnly = useEditorReadOnly();
  const controller = React.useMemo(() => getAiController(editor), [editor]);

  const panel = React.useSyncExternalStore(
    controller.subscribe,
    () => controller.getState().panel,
    () => CLOSED_PANEL,
  );

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [prompt, setPrompt] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [submenu, setSubmenu] = React.useState<AiCommandDefinition | null>(null);
  const [copied, setCopied] = React.useState(false);

  const isOpen = panel.status !== 'closed';
  const range = isOpen ? controller.getRange() : null;
  const hasSelection = RangeApi.isExpanded(range);
  const selectionLength = range ? editor.api.string(range).length : 0;

  // Anchored to the range the panel is acting on — read live, so the panel
  // follows the text as the document changes under a streaming completion.
  const getBoundingClientRect = React.useCallback(
    () => getRangeBoundingClientRect(editor, controller.getRange()),
    [controller, editor],
  );

  const floating = useVirtualFloating({
    getBoundingClientRect,
    middleware: [offset(8), flip({ padding: 12 }), shift({ padding: 8 })],
    open: isOpen,
    placement: 'bottom-start',
  });

  const { update } = floating;

  // Reposition as the selection moves and as the streamed result grows.
  useEditorSelector(() => {
    update?.();
  }, [update]);

  React.useEffect(() => {
    update?.();
  }, [panel, update]);

  const allCommands = editor.getOptions(AiPlugin).commands;

  // Typing filters the command list, so the input doubles as a palette rather
  // than only ever being a free-form prompt box.
  const query = prompt.trim().toLowerCase();
  const visibleCommands = React.useMemo(() => {
    const available = commandsForSelection(allCommands, hasSelection);
    if (!query) return available;

    return available.filter((command) =>
      `${command.label} ${command.description ?? ''}`.toLowerCase().includes(query),
    );
  }, [allCommands, hasSelection, query]);

  const sections = React.useMemo(() => groupCommands(visibleCommands), [visibleCommands]);

  // Reset and focus the input each time the panel opens fresh.
  React.useEffect(() => {
    if (panel.status === 'menu') {
      const raf = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    if (panel.status === 'closed') {
      setPrompt('');
      setSubmenu(null);
      setActiveIndex(-1);
      setCopied(false);
    }
  }, [panel.status]);

  // A filtered-out highlight would run the wrong command on Enter.
  React.useEffect(() => {
    setActiveIndex((index) => (index >= visibleCommands.length ? visibleCommands.length - 1 : index));
  }, [visibleCommands.length]);

  // Escape / click-outside closes the panel without touching the document.
  React.useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        controller.close();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (submenu) {
          setSubmenu(null);
          return;
        }
        controller.close();
        return;
      }

      // Cmd/Ctrl+Enter accepts a settled suggestion from anywhere in the panel.
      if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
        if (controller.accept()) event.preventDefault();
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [controller, isOpen, submenu]);

  if (readOnly || !isOpen) return null;

  const runCommand = (command: AiCommandDefinition) => {
    if (command.options?.length) {
      setSubmenu(command);
      return;
    }
    controller.runCommand(command.id);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (visibleCommands.length ? (index + 1) % visibleCommands.length : -1));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) =>
        visibleCommands.length ? (index <= 0 ? visibleCommands.length - 1 : index - 1) : -1,
      );
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const highlighted = activeIndex >= 0 ? visibleCommands[activeIndex] : undefined;
      if (highlighted) {
        runCommand(highlighted);
        return;
      }
      if (prompt.trim()) controller.submitPrompt(prompt);
    }
  };

  const copyResult = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be denied; the result is still visible to select.
    }
  };

  return (
    <div
      aria-label="Ask AI"
      className="z-50 w-[min(28rem,90vw)] rounded-md border bg-popover p-1 text-popover-foreground shadow-md print:hidden"
      ref={(node) => {
        containerRef.current = node;
        floating.refs.setFloating(node);
      }}
      role="dialog"
      style={floating.style}
    >
      <div className="flex items-center gap-2 px-2 py-1.5">
        <Sparkles className="size-4 shrink-0 text-violet-600" />
        <input
          aria-label="Ask AI"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          onChange={(event) => {
            setPrompt(event.target.value);
            setActiveIndex(event.target.value.trim() ? 0 : -1);
          }}
          onKeyDown={onInputKeyDown}
          placeholder={hasSelection ? 'Ask AI to change the selection…' : 'Ask AI anything…'}
          ref={inputRef}
          value={prompt}
        />
      </div>

      {panel.status === 'menu' && submenu && (
        <div className="flex max-h-80 flex-col overflow-y-auto">
          <button
            className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            onClick={() => setSubmenu(null)}
            type="button"
          >
            <ArrowLeft className="size-4 shrink-0 text-muted-foreground" />
            {submenu.label}
          </button>

          {submenu.options?.map((option) => (
            <button
              className="flex items-center rounded-sm px-2 py-1.5 pl-8 text-sm hover:bg-accent"
              key={option.id}
              onClick={() => {
                setSubmenu(null);
                controller.runCommand(submenu.id, option.label);
              }}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {panel.status === 'menu' && !submenu && (
        <>
          <div className="px-2 pb-1 text-xs text-muted-foreground">
            {hasSelection
              ? `${selectionLength.toLocaleString()} characters selected`
              : 'Nothing selected — select text for rewrite actions'}
          </div>

          <div className="flex max-h-80 flex-col overflow-y-auto">
            {sections.length === 0 && (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">No matching actions</div>
            )}

            {sections.map((section) => (
              <div key={section.group}>
                <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  {AI_COMMAND_GROUP_LABELS[section.group]}
                </div>

                {section.commands.map((command) => {
                  const index = visibleCommands.indexOf(command);

                  return (
                    <button
                      className={cn(
                        'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm',
                        index === activeIndex && 'bg-accent text-accent-foreground',
                      )}
                      key={command.id}
                      onClick={() => runCommand(command)}
                      onMouseEnter={() => setActiveIndex(index)}
                      type="button"
                    >
                      <command.icon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate">{command.label}</span>
                        {command.description && (
                          <span className="truncate text-xs text-muted-foreground">
                            {command.description}
                          </span>
                        )}
                      </span>
                      {command.options?.length ? (
                        <span className="ml-auto text-muted-foreground">›</span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}

      {panel.status === 'loading' && (
        <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground">
          <Loader2 className="size-4 shrink-0 animate-spin" />
          <span>{panel.commandLabel === 'Custom' ? 'Generating…' : `${panel.commandLabel}…`}</span>
          <button
            className="ml-auto flex items-center gap-1 rounded-sm px-2 py-1 hover:bg-accent"
            onClick={() => controller.stop()}
            type="button"
          >
            <Square className="size-3.5" />
            Stop
          </button>
        </div>
      )}

      {panel.status === 'error' && (
        <div className="px-2 py-1.5">
          <p className="text-sm text-destructive">{panel.message}</p>
          <div className="mt-1 flex flex-wrap">
            <MenuRow icon={RotateCcw} label="Try again" onClick={() => controller.retry()} />
            <MenuRow icon={X} label="Dismiss" onClick={() => controller.close()} />
          </div>
        </div>
      )}

      {panel.status === 'reviewing' && (
        <>
          <div
            aria-live="polite"
            className="mx-1 max-h-60 overflow-y-auto whitespace-pre-wrap rounded-sm bg-muted/50 px-2 py-1.5 text-sm"
          >
            {panel.suggestion.suggestedText || '…'}
          </div>

          {panel.suggestion.isStreaming ? (
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground">
              <Loader2 className="size-4 shrink-0 animate-spin" />
              <span>{panel.commandLabel}…</span>
              <button
                className="ml-auto flex items-center gap-1 rounded-sm px-2 py-1 hover:bg-accent"
                onClick={() => controller.stop()}
                type="button"
              >
                <Square className="size-3.5" />
                Stop
              </button>
            </div>
          ) : (
            <div className="mt-1 flex flex-wrap">
              <MenuRow
                icon={Check}
                label={panel.suggestion.mode === 'replace' ? 'Replace selection' : 'Insert'}
                onClick={() => controller.accept()}
                title="⌘/Ctrl + Enter"
              />
              <MenuRow
                icon={CornerDownRight}
                label="Insert below"
                onClick={() => controller.insertBelow()}
              />
              <MenuRow icon={RotateCcw} label="Try again" onClick={() => controller.retry()} />
              <MenuRow
                icon={Copy}
                label={copied ? 'Copied' : 'Copy'}
                onClick={() => void copyResult(panel.suggestion.suggestedText)}
              />
              <MenuRow icon={X} label="Discard" onClick={() => controller.close()} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
