/**
 * @fileoverview React context and provider managing open/close state, target URL, search text, and panel width for the article extract panel; also reflects open state in the URL query string via the `extract` param.
 */
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

/** How the reader should behave once the page is read. */
export interface OpenPanelOptions {
  /**
   * Write questions about the page as soon as its text is in, when it has
   * none cached — so opening it lands on something to ask, not a blank prompt.
   */
  suggestQuestions?: boolean;
}

interface ExtractPanelContextType {
  isOpen: boolean;
  url: string;
  searchText: string;
  /** Set by the last `openPanel` call; see {@link OpenPanelOptions.suggestQuestions}. */
  suggestQuestions: boolean;
  panelWidth: number;
  setIsOpen: (isOpen: boolean) => void;
  setUrl: (url: string) => void;
  setSearchText: (searchText: string) => void;
  setPanelWidth: (width: number) => void;
  openPanel: (url: string, searchText?: string, options?: OpenPanelOptions) => void;
  closePanel: () => void;
}

const ExtractPanelContext = createContext<ExtractPanelContextType | undefined>(
  undefined
);

export const useExtractPanel = () => {
  const context = useContext(ExtractPanelContext);
  if (!context) {
    throw new Error(
      'useExtractPanel must be used within an ExtractPanelProvider'
    );
  }
  return context;
};

/**
 * Like {@link useExtractPanel}, but `undefined` outside an
 * `ExtractPanelProvider` instead of throwing — for components (the homepage
 * widgets) that offer the reader when a host provides one and work without it.
 */
export const useOptionalExtractPanel = () => useContext(ExtractPanelContext);

export const ExtractPanelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [searchText, setSearchText] = useState('');
  const [suggestQuestions, setSuggestQuestions] = useState(false);
  const [panelWidth, setPanelWidth] = useState(600);

  const openPanel = (url: string, searchText: string = '', options: OpenPanelOptions = {}) => {
    console.log('[ExtractPanelContext] openPanel called with URL:', url);

    // Validate URL before opening
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.pathname === "/" || parsedUrl.pathname === "") {
        console.error('[ExtractPanelContext] URL is domain-only, missing article path:', url);
      }
    } catch (e) {
      console.error('[ExtractPanelContext] Invalid URL format:', url, e);
    }

    setUrl(url);
    setSearchText(searchText);
    setSuggestQuestions(Boolean(options.suggestQuestions));
    setIsOpen(true);

    // Update URL parameter
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('extract', encodeURIComponent(url));
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const closePanel = () => {
    setIsOpen(false);

    // Remove extract parameter from URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.delete('extract');
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      window.history.pushState({}, '', newUrl);
    }
  };

  return (
    <ExtractPanelContext.Provider
      value={{
        isOpen,
        url,
        searchText,
        suggestQuestions,
        panelWidth,
        setIsOpen,
        setUrl,
        setSearchText,
        setPanelWidth,
        openPanel,
        closePanel,
      }}
    >
      {children}
    </ExtractPanelContext.Provider>
  );
};
