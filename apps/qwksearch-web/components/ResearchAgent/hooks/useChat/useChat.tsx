/**
 * Custom React hook that encapsulates chat behavior for ResearchAgent.
 */
'use client';

// Re-export everything from the chat module
export { ChatProvider, useChat, chatContext } from '.';
export type { ChatContextValue as ChatContext } from '.';
export type { Section, ChatFile as File } from '.';
