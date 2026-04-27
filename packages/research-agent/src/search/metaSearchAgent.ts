/**
 * @fileoverview Orchestrator for complex research queries.
 * Manages query expansion, web search execution, and result synthesis using LLMs.
 */
import { ChatOpenAI } from "@langchain/openai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  RunnableLambda,
  RunnableMap,
  RunnableSequence,
} from "@langchain/core/runnables";
import { BaseMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { LineOutputParser, LineListOutputParser } from "./outputParser";
import { getDocumentsFromLinks } from "../utils/documents";
import { Document } from "@langchain/core/documents";
import { searchSearxng } from "./public-searxng";
import { searchTavily, isTavilyConfigured } from "./tavily";
import { scrapeURL } from "./url-to-html";

/** Strip HTML tags and decode entities — works in Cloudflare edge runtime */
function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/(script|style)>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[a-z#][a-z0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
import { getSourceScrapeTimeout } from "../config/serverRegistry";
import { formatChatHistoryAsString } from "../utils";
import EventEmitter from "events";
import type { Config, BasicChainInput, MetaSearchAgentType } from "./meta-search-types";
import { buildFallbackDocs, rerankDocs, processDocs } from "./doc-utils";
import { groupAndSummarizeDocs } from "./link-summarizer";
import { handleStream } from "./stream-handler";

export type { MetaSearchAgentType, Config } from "./meta-search-types";

const waitWithTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T | undefined> => {
  return Promise.race([
    promise,
    new Promise<undefined>((resolve) => {
      setTimeout(() => resolve(undefined), timeoutMs);
    }),
  ]);
};

class MetaSearchAgent implements MetaSearchAgentType {
  private config: Config;
  private strParser = new StringOutputParser();

  constructor(config: Config) {
    this.config = config;
  }

  private async createSearchRetrieverChain(
    llm: BaseChatModel,
    category: string = "general",
    sourceExtractionEnabled = false,
  ) {
    (llm as unknown as ChatOpenAI).temperature = 0;

    return RunnableSequence.from([
      ChatPromptTemplate.fromMessages([
        ["system", this.config.queryGeneratorPrompt],
        ...this.config.queryGeneratorFewShots,
        [
          "user",
          `
        <conversation>
        {chat_history}
        </conversation>

        <query>
        {query}
        </query>
       `,
        ],
      ]),
      llm,
      this.strParser,
      RunnableLambda.from(async (input: string) => {
        const linksOutputParser = new LineListOutputParser({ key: "links" });
        const questionOutputParser = new LineOutputParser({ key: "question" });

        const links = await linksOutputParser.parse(input);
        let question = (await questionOutputParser.parse(input)) ?? input;

        if (question === "not_needed") {
          question = "latest information";
        }

        if (links.length > 0) {
          if (question.length === 0) question = "summarize";

          const linkDocs = await getDocumentsFromLinks({ links });
          const docs = await groupAndSummarizeDocs(llm, linkDocs, question);

          return { query: question, docs };
        }

        question = question.replace(/<think>.*?<\/think>/g, "");
        if (!question || question.trim().length === 0) {
          question = "latest information";
        }

        let res: { results: any[]; suggestions: string[] };

        if (
          isTavilyConfigured() &&
          this.config.activeEngines.length === 0 &&
          category === "general"
        ) {
          try {
            res = await searchTavily(question, { searchDepth: "basic", maxResults: 10 });
          } catch (error) {
            console.error("Tavily search failed, falling back to SearXNG:", error);
            res = await searchSearxng(question, {
              language: "en",
              engines: this.config.activeEngines,
              categories: [category],
            });
          }
        } else {
          res = await searchSearxng(question, {
            language: "en",
            engines: this.config.activeEngines,
            categories: [category],
          });
        }

        let documents: Document[] = res.results.map(
          (result) =>
            new Document({
              pageContent:
                result.content ||
                (this.config.activeEngines.includes("youtube") ? result.title : ""),
              metadata: {
                title: result.title,
                url: result.url,
                source: result.source,
                ...(result.img_src && { img_src: result.img_src }),
              },
            }),
        );

        if (documents.length === 0) {
          documents = buildFallbackDocs(question);
        }

        const scrapeCount = sourceExtractionEnabled ? 3 : 0;
        const scrapeTimeout = Math.max(1, getSourceScrapeTimeout());

        if (scrapeCount > 0) {
          const extractionTasks = documents.slice(0, scrapeCount).map(async (doc, idx) => {
            const url = doc.metadata?.url;
            if (!url) return;
            try {
              const result = await waitWithTimeout(
                scrapeURL(url, { timeout: scrapeTimeout }),
                scrapeTimeout * 1000 + 1500,
              );
              if (typeof result === "string" && result.length > 100) {
                const text = htmlToText(result)
                  .replace(/(\r\n|\n|\r)/gm, " ")
                  .replace(/\s+/g, " ")
                  .trim()
                  .slice(0, 5000);
                if (text.length > 100) {
                  documents[idx].pageContent = text;
                }
              }
            } catch {
              // Keep original snippet on scraping failure or timeout
            }
          });

          await Promise.allSettled(extractionTasks);
        }

        return { query: question, docs: documents };
      }),
    ]);
  }

  private async createAnsweringChain(
    llm: BaseChatModel,
    fileIds: string[],
    optimizationMode: "speed" | "balanced" | "quality",
    systemInstructions: string,
    category: string = "general",
    sourceExtractionEnabled = false,
  ) {
    return RunnableSequence.from([
      RunnableMap.from({
        systemInstructions: () => systemInstructions,
        query: (input: BasicChainInput) => input.query,
        chat_history: (input: BasicChainInput) => input.chat_history,
        date: () => new Date().toISOString(),
        context: RunnableLambda.from(async (input: BasicChainInput) => {
          const processedHistory = formatChatHistoryAsString(input.chat_history);

          let docs: Document[] | null = null;
          let query = input.query;

          if (this.config.searchWeb) {
            const searchRetrieverChain = await this.createSearchRetrieverChain(
              llm,
              category,
              sourceExtractionEnabled,
            );
            const result = await searchRetrieverChain.invoke({
              chat_history: processedHistory,
              query,
            });
            query = result.query;
            docs = result.docs;
          }

          const sortedDocs = await rerankDocs(query, docs ?? [], fileIds, optimizationMode);
          return sortedDocs;
        })
          .withConfig({ runName: "FinalSourceRetriever" })
          .pipe(processDocs),
      }),
      ChatPromptTemplate.fromMessages([
        ["system", this.config.responsePrompt],
        new MessagesPlaceholder("chat_history"),
        ["user", "{query}"],
      ]),
      llm,
      this.strParser,
    ]).withConfig({ runName: "FinalResponseGenerator" });
  }

  async searchAndAnswer(
    message: string,
    history: BaseMessage[],
    llm: BaseChatModel,
    optimizationMode: "speed" | "balanced" | "quality",
    fileIds: string[],
    systemInstructions: string,
    category: string = "general",
    sourceExtractionEnabled = false,
  ) {
    const emitter = new EventEmitter();

    const answeringChain = await this.createAnsweringChain(
      llm,
      fileIds,
      optimizationMode,
      systemInstructions,
      category,
      sourceExtractionEnabled,
    );

    const stream = answeringChain.streamEvents(
      { chat_history: history, query: message },
      { version: "v1" },
    );

    handleStream(stream, emitter, message);

    return emitter;
  }
}

export default MetaSearchAgent;
