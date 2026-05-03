/**
 * @module research/search/meta-search-types
 * @description Shared types for the MetaSearchAgent.
 */
import type { BaseMessage, BaseMessageLike } from "@langchain/core/messages";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type EventEmitter from "events";

export interface MetaSearchAgentType {
  searchAndAnswer: (
    message: string,
    history: BaseMessage[],
    llm: BaseChatModel,
    optimizationMode: "speed" | "balanced" | "quality",
    fileIds: string[],
    systemInstructions: string,
    category?: string,
    sourceExtractionEnabled?: boolean,
    extractTimeLimit?: number,
  ) => Promise<EventEmitter>;
}

export interface Config {
  searchWeb: boolean;
  rerank: boolean;
  rerankThreshold: number;
  queryGeneratorPrompt: string;
  queryGeneratorFewShots: BaseMessageLike[];
  responsePrompt: string;
  activeEngines: string[];
}

export type BasicChainInput = {
  chat_history: BaseMessage[];
  query: string;
};
