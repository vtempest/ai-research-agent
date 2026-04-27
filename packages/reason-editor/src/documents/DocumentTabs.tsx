/**
 * @module DocumentTabs
 * @description Horizontally scrollable tab bar that lists all open documents.
 * Supports inline rename, right-click context menu (rename, close, split, reopen),
 * and scroll arrows for overflow navigation.
 */
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../ui/context-menu';
import { X, Plus, ChevronLeft, ChevronRight, Menu, Edit2, Trash2, RotateCcw, SplitSquareVertical } from 'lucide-react';
import { Document } from './DocumentTree';
import { cn } from '../lib/utils';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

/** Props for the {@link DocumentTabs} component. */
interface DocumentTabsProps {
  /** Ordered list of document IDs currently open as tabs. */
  openTabs: string[];
  /** ID of the currently active tab, or `null` if none. */
  activeTab: string | null;
  /** Full document list used to resolve tab labels. */
  documents: Document[];
  /** Called when the user selects a different tab. */
  onTabChange: (tabId: string) => void;
  /** Called when the user closes a tab. */
  onTabClose: (tabId: string) => void;
  /** Called when the "+" button is clicked to open a new tab. */
  onTabAdd: () => void;
  /** Optional callback for inline document rename. */
  onRename?: (tabId: string, newTitle: string) => void;
  /** Optional callback for the mobile hamburger-menu button. */
  onMenuClick?: () => void;
  /** Optional callback for permanently deleting a document from the context menu. */
  onDelete?: (tabId: string) => void;
  /** Optional callback to reopen the most recently closed tab. */
  onReopenLastClosed?: () => void;
  /** Optional callback to open a document in a split-right panel. */
  onSplitRight?: (tabId: string) => void;
  /** Whether a closed tab is available to reopen. Defaults to `false`. */
  canReopenLastClosed?: boolean;
}

/**
 * Horizontally scrollable document tab bar. Returns `null` when there are no
 * open tabs. Supports inline rename via double-click and full context-menu
 * actions (rename, close, split right, reopen last closed).
 */
export const DocumentTabs = ({
  openTabs,
  activeTab,
  documents,
  onTabChange,
  onTabClose,
  onTabAdd,
  onRename,
  onMenuClick,
  onDelete,
  onReopenLastClosed,
  onSplitRight,
  canReopenLastClosed = false,
}: DocumentTabsProps) => {
  const isMobile = useIsMobile();
  const [renamingTabId, setRenamingTabId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  /** Updates `isScrollable` based on whether the tab list overflows its container. */
  const checkScrollable = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) setIsScrollable(el.scrollWidth > el.clientWidth);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollable();
    const ro = new ResizeObserver(checkScrollable);
    ro.observe(el);
    el.addEventListener('scroll', checkScrollable);
    return () => { ro.disconnect(); el.removeEventListener('scroll', checkScrollable); };
  }, [checkScrollable, openTabs]);

  /**
   * Resolves the display title for a tab by its document ID.
   * Returns `'Untitled'` when the document has no title.
   */
  const getDocumentTitle = (docId: string) => {
    const doc = documents.find((d) => d.id === docId);
    return doc?.title || 'Untitled';
  };

  // Focus input when renaming starts
  useEffect(() => {
    if (renamingTabId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [renamingTabId]);

  /**
   * Begins inline rename for the given tab on double-click.
   * Pre-fills the rename input with the current document title.
   */
  const handleDoubleClick = (tabId: string) => {
    if (onRename) {
      setRenamingTabId(tabId);
      setRenameValue(getDocumentTitle(tabId));
    }
  };

  /**
   * Commits the pending rename. Calls `onRename` if the new value is non-empty,
   * then clears the rename state regardless.
   */
  const handleRenameSubmit = () => {
    if (renamingTabId && renameValue.trim() && onRename) {
      onRename(renamingTabId, renameValue.trim());
    }
    setRenamingTabId(null);
    setRenameValue('');
  };

  /**
   * Keyboard handler for the inline rename input.
   * - `Enter` commits the rename.
   * - `Escape` cancels without saving.
   */
  const handleRenameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRenameSubmit();
    } else if (e.key === 'Escape') {
      setRenamingTabId(null);
      setRenameValue('');
    }
  };

  /** Scrolls the tab list 200 px to the left. */
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  /** Scrolls the tab list 200 px to the right. */
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  if (openTabs.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-border bg-card">
      <Tabs value={activeTab || undefined} onValueChange={onTabChange}>
        <div className="flex items-center">
          {isMobile && onMenuClick && (
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 rounded-none border-r border-border shrink-0"
              onClick={onMenuClick}
              title="Menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}

          {(isScrollable || isMobile) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 rounded-none border-r border-border shrink-0"
              onClick={scrollLeft}
              title="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          <div ref={scrollContainerRef} className="flex-1 overflow-x-auto">
            <TabsList className="h-10 bg-transparent p-0 rounded-none border-0 flex-nowrap">
              {openTabs.map((tabId) => (
                <ContextMenu key={tabId}>
                  <ContextMenuTrigger>
                    <div className="relative group">
                      <TabsTrigger
                        value={tabId}
                        onDoubleClick={() => handleDoubleClick(tabId)}
                        className={cn(
                          'relative h-10 rounded-none border-r border-border px-4 py-2',
                          'data-[state=active]:bg-background data-[state=active]:text-blue-600 data-[state=active]:font-bold',
                          'data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600',
                          'data-[state=active]:z-10',
                          'data-[state=inactive]:bg-muted/50 data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal',
                          'hover:bg-muted',
                          'pr-8',
                          'transition-all duration-200'
                        )}
                      >
                        {renamingTabId === tabId ? (
                          <input
                            ref={inputRef}
                            type="text"
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={handleRenameKeyDown}
                            onBlur={handleRenameSubmit}
                            className="max-w-[150px] text-sm bg-transparent border-none outline-none focus:ring-1 focus:ring-primary rounded px-1 font-normal"
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            autoFocus
                          />
                        ) : (
                          <span className="max-w-[150px] truncate text-sm">
                            {getDocumentTitle(tabId)}
                          </span>
                        )}
                      </TabsTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          'absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0',
                          'opacity-0 group-hover:opacity-100 transition-opacity',
                          'hover:bg-destructive/10 hover:text-destructive'
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTabClose(tabId);
                        }}
                        title="Close tab"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    {onRename && (
                      <ContextMenuItem
                        onClick={() => handleDoubleClick(tabId)}
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Rename
                      </ContextMenuItem>
                    )}
                    {onDelete && (
                      <ContextMenuItem
                        onClick={() => onDelete(tabId)}
                        className="text-destructive focus:text-destructive"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Close
                      </ContextMenuItem>
                    )}
                    <ContextMenuSeparator />
                    {onSplitRight && (
                      <ContextMenuItem
                        onClick={() => onSplitRight(tabId)}
                      >
                        <SplitSquareVertical className="mr-2 h-4 w-4" />
                        Split Right
                      </ContextMenuItem>
                    )}
                    {onReopenLastClosed && (
                      <ContextMenuItem
                        onClick={onReopenLastClosed}
                        disabled={!canReopenLastClosed}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reopen Last Closed Tab
                      </ContextMenuItem>
                    )}
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </TabsList>
          </div>

          {(isScrollable || isMobile) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 rounded-none border-r border-border shrink-0"
              onClick={scrollRight}
              title="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 rounded-none border-r border-border shrink-0"
            onClick={onTabAdd}
            title="New note"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </Tabs>
    </div>
  );
};
