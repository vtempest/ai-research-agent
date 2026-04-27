/**
 * @module RightPanel
 * @description Collapsible right-side panel that toggles between the AI Suggestions
 * view and the document Outline (table-of-contents) view.
 */
import type { TableOfContentsEntry } from '@lexical/react/LexicalTableOfContentsPlugin';
import { OutlineView } from '../search/OutlineView';
import { AIRewriteSuggestion } from '../features/AIRewriteSuggestion';
import { Button } from '../ui/button';
import { Loader2, X } from 'lucide-react';

/** Props for the {@link RightPanel} component. */
interface RightPanelProps {
  /** Whether the AI suggestion panel is visible. */
  showAiPanel: boolean;
  /** Setter that shows or hides the AI panel. */
  setShowAiPanel: (show: boolean) => void;
  /** True while an AI rewrite is pending. */
  isAiLoading: boolean;
  aiSuggestion: {
    originalText: string;
    suggestedText: string;
    range: { from: number; to: number };
    mode?: string;
  } | null;
  onAiApprove: () => void;
  onAiReject: () => void;
  onAiRegenerate: (mode: any) => void;
  headings: TableOfContentsEntry[];
  searchQuery: string;
  onNavigate: (key: string) => void;
}

/**
 * Right-hand side panel that either shows AI rewrite suggestions or the document
 * heading outline depending on `showAiPanel`.
 */
export function RightPanel({
  showAiPanel,
  setShowAiPanel,
  isAiLoading,
  aiSuggestion,
  onAiApprove,
  onAiReject,
  onAiRegenerate,
  headings,
  searchQuery,
  onNavigate,
}: RightPanelProps) {
  return (
    <div className="h-full border-l border-sidebar-border bg-sidebar-background">
      {showAiPanel ? (
        <div className="h-full overflow-hidden flex flex-col">
          <div className="px-3 py-2 border-b border-sidebar-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-sidebar-foreground">AI Suggestions</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={() => setShowAiPanel(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            {isAiLoading ? (
              <div className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Generating AI suggestion...</p>
                </div>
              </div>
            ) : aiSuggestion ? (
              <AIRewriteSuggestion
                originalText={aiSuggestion.originalText}
                suggestedText={aiSuggestion.suggestedText}
                onApprove={onAiApprove}
                onReject={onAiReject}
                onRegenerate={onAiRegenerate}
                currentMode={aiSuggestion.mode}
                isLoading={false}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-6 text-center">
                <p className="text-sm text-muted-foreground">Select text and click the AI button to get suggestions</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-full overflow-hidden flex flex-col">
          <div className="px-3 py-2 border-b border-sidebar-border">
            <h3 className="text-sm font-semibold text-sidebar-foreground">Outline</h3>
          </div>
          <div className="flex-1 overflow-auto">
            <OutlineView
              headings={headings}
              searchQuery={searchQuery}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
