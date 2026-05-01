/**
 * React component that renders ActionBar within the ResearchAgent area of ResearchAgent.
 */
import React from "react";
import FileUploadDropdown from '../FileUpload/FileUploadDropdown';
import HistoryDropdown from '../ChatHistoryDropdown';
import { Icons } from "./MessageInputIconSet";

interface ActionBarProps {
    loading: boolean;
    isListening: boolean;
    isSpeechSupported: boolean;
    toggleSpeech: () => void;
    handleFiles: (files: FileList | File[]) => void;
    hasContent: boolean;
    handleSend: () => void;
    onStop?: () => void;
}

export function ActionBar({
    loading,
    isListening,
    isSpeechSupported,
    toggleSpeech,
    handleFiles,
    hasContent,
    handleSend,
    onStop,
}: ActionBarProps) {
    return (
        <div className="flex gap-2 w-full items-center">
            {/* Left Tools */}
            <div className="relative flex-1 flex items-center shrink min-w-0 gap-1">
                <FileUploadDropdown
                    onFileSelect={handleFiles}
                    disabled={loading}
                />

                {isSpeechSupported && (
                    <div className="relative flex shrink min-w-8 !shrink-0 group">
                        <button
                            onClick={toggleSpeech}
                            disabled={loading}
                            className={`transition-all duration-200 h-8 w-8 flex items-center justify-center rounded-lg active:scale-95
                                ${isListening
                                    ? 'text-red-500 bg-red-500/10 animate-pulse'
                                    : 'text-text-400 hover:text-text-200 hover:bg-bg-200'}
                            `}
                            aria-label={isListening ? "Stop listening" : "Voice input"}
                        >
                            <Icons.Mic className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1F1E1D] dark:bg-[#EEEEEC] text-[11px] font-medium rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-sm tracking-wide">
                            <span className="text-[#ECECEC] dark:text-[#1F1E1D]">
                                {isListening ? 'Stop listening' : 'Voice input'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Tools */}
            <div className="flex flex-row items-center min-w-0 gap-1">
                <div className="flex flex-row items-center space-x-1">
                    <HistoryDropdown position="top" align="right" />
                </div>
                {/* Send / Stop Button */}
                <div>
                    {loading ? (
                        <button
                            onClick={onStop}
                            className="inline-flex items-center justify-center relative shrink-0 transition-colors h-8 w-8 rounded-md active:scale-95 !rounded-xl !h-8 !w-8 bg-red-500 text-white hover:bg-red-600 shadow-md"
                            type="button"
                            aria-label="Stop generating"
                        >
                            <Icons.Stop className="w-3.5 h-3.5 fill-current" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSend}
                            disabled={!hasContent}
                            className={`inline-flex items-center justify-center relative shrink-0 transition-colors h-8 w-8 rounded-md active:scale-95 !rounded-xl !h-8 !w-8
                                ${hasContent
                                    ? 'bg-accent text-bg-0 hover:bg-accent-hover shadow-md'
                                    : 'bg-accent/30 text-bg-0/60 cursor-default'}
                            `}
                            type="button"
                            aria-label="Send message"
                        >
                            <Icons.ArrowUp className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
