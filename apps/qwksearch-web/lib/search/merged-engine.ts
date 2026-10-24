/**
 * Merged Search Engine
 *
 * Combines the LobeChat context-engine pipeline (the internal chat engine moved
 * over from apps/qwk-in-lobe/packages/context-engine) with the search-web-api
 * search-sources-api, then exposes it as the default search implementation for
 * qwksearch-web.
 *
 * The pipeline is a small, self-contained port of `@lobechat/context-engine`'s
 * `ContextEngine` / `ContextProcessor` so this module has no cross-workspace
 * dependencies (qwk-in-lobe is a separate pnpm workspace).
 */

// =============================================================================
// Context engine pipeline (ported from @lobechat/context-engine)
// =============================================================================

export interface PipelineContext {
  abortReason?: string;
  readonly initialState: { messages: Array<any> };
  isAborted: boolean;
  messages: Array<any>;
  metadata: Record<string, any>;
}

export interface PipelineResult {
  abortReason?: string;
  isAborted: boolean;
  messages: Array<any>;
  metadata: Record<string, any>;
  stats: {
    processedCount: number;
    processorDurations: Record<string, number>;
    totalDuration: number;
  };
}

export interface ContextProcessor {
  name: string;
  process: (context: PipelineContext) => Promise<PipelineContext>;
}

export interface ContextEngineConfig {
  pipeline: ContextProcessor[];
  debug?: boolean;
  logger?: (message: string, level?: 'info' | 'warn' | 'error') => void;
}

export class PipelineError extends Error {
  public originalError?: Error;
  public processorName?: string;

  constructor(message: string, processorName?: string, cause?: Error) {
    super(`[${processorName ?? 'unknown'}] ${message}`, { cause });
    this.name = 'PipelineError';
    this.processorName = processorName;
    this.originalError = cause;
  }

  toJSON(): Record<string, unknown> {
    return {
      message: this.message,
      name: this.name,
      processorName: this.processorName,
      cause: this.cause
        ? String(this.cause)
        : undefined,
    };
  }
}

/**
 * ContextEngine - Core orchestrator that executes processors sequentially.
 */
export class ContextEngine {
  private processors: ContextProcessor[] = [];
  private readonly options: { debug: boolean; logger?: ContextEngineConfig['logger'] };

  constructor(config: ContextEngineConfig) {
    const { pipeline, ...options } = config;
    this.processors = [...pipeline];
    this.options = {
      debug: false,
      ...options,
    };
  }

  addProcessor(processor: ContextProcessor): this {
    this.processors.push(processor);
    return this;
  }

  removeProcessor(name: string): this {
    this.processors = this.processors.filter((p) => p.name !== name);
    return this;
  }

  getProcessors(): ContextProcessor[] {
    return [...this.processors];
  }

  clear(): this {
    this.processors = [];
    return this;
  }

  async process(input: { messages: Array<any> }): Promise<PipelineResult> {
    const startTime = Date.now();
    const processorDurations: Record<string, number> = {};

    let context: PipelineContext = {
      initialState: { messages: input.messages },
      isAborted: false,
      messages: [...input.messages],
      metadata: {},
    };

    let processedCount = 0;

    try {
      for (const processor of this.processors) {
        if (context.isAborted) break;

        const processorStartTime = Date.now();

        try {
          context = await processor.process(context);
          processedCount++;
          processorDurations[processor.name] = Date.now() - processorStartTime;
          if (context.isAborted) break;
        } catch (error) {
          processorDurations[processor.name] = Date.now() - processorStartTime;
          // Rethrow the original error so route-level error handling (and any
          // caller) sees the unchanged message / rejection value, matching the
          // behaviour of the previous raw `new Search()` usage.
          throw error;
        }
      }

      return {
        abortReason: context.abortReason,
        isAborted: context.isAborted,
        messages: context.messages,
        metadata: context.metadata,
        stats: {
          processedCount,
          processorDurations,
          totalDuration: Date.now() - startTime,
        },
      };
    } catch (error) {
      // Rethrow the original rejection unchanged so callers / route handlers see
      // the real error message rather than a generic wrapper.
      throw error;
    }
  }

  clone(): ContextEngine {
    return new ContextEngine({
      pipeline: [...this.processors],
      ...this.options,
    });
  }

  validate(): { errors: string[]; valid: boolean } {
    const errors: string[] = [];
    const names = this.processors.map((p) => p.name);
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    if (duplicates.length > 0) errors.push(`Found duplicate processor names: ${duplicates.join(', ')}`);
    if (this.processors.length === 0) errors.push('No processors in pipeline');
    this.processors.forEach((processor) => {
      if (!processor.name) errors.push('Processor missing name');
      if (typeof processor.process !== 'function')
        errors.push(`Processor [${processor.name}] missing process method`);
    });
    return { errors, valid: errors.length === 0 };
  }
}

// =============================================================================
// Search-sources processor (search-web-api / search-sources-api)
// =============================================================================

import { Search } from 'search-web-api/search/search-query-executor.js';
import type { MergedResult } from 'search-web-api/types/search-result-types';

export interface SearchSourceOptions {
  engineNames?: string[];
  categories?: string[];
  pageno?: number;
}

export class SearchSourcesProcessor implements ContextProcessor {
  public readonly name = 'search-sources';

  constructor(
    private readonly searchSource: Search,
    private readonly options: SearchSourceOptions = {},
  ) {}

  private lastUserMessage(context: PipelineContext): string {
    for (let i = context.messages.length - 1; i >= 0; i--) {
      const message = context.messages[i];
      if (message && message.role === 'user') {
        return typeof message.content === 'string' ? message.content : String(message.content ?? '');
      }
    }
    return '';
  }

  async process(context: PipelineContext): Promise<PipelineContext> {
    const query = this.lastUserMessage(context);
    const pageno = this.options.pageno ?? 1;

    let results: MergedResult[];
    if (this.options.categories !== undefined) {
      results = await this.searchSource.search(
        query,
        pageno,
        this.options.engineNames,
        this.options.categories,
      );
    } else if (this.options.engineNames !== undefined) {
      results = await this.searchSource.search(query, pageno, this.options.engineNames);
    } else {
      results = await this.searchSource.search(query, pageno);
    }

    context.metadata = {
      ...context.metadata,
      searchResults: results,
      searchQuery: query,
      searchedAt: Date.now(),
    };

    context.messages = [
      ...context.messages,
      {
        role: 'tool',
        content: JSON.stringify(results),
        toolName: 'web_search',
      },
    ];

    return context;
  }
}

// =============================================================================
// Merged search engine
// =============================================================================

export interface MergedSearchEngineOptions {
  searchSource?: Search;
  engineNames?: string[];
  categories?: string[];
  pageno?: number;
}

/**
 * MergedSearchEngine runs the context-engine pipeline with the search-web-api
 * search-sources-api as its source. It is the default search implementation
 * for qwksearch-web, replacing the raw `new Search()` usage.
 */
export class MergedSearchEngine {
  private readonly engine: ContextEngine;

  constructor(options: MergedSearchEngineOptions = {}) {
    const searchSource = options.searchSource ?? new Search();
    const pipeline: ContextProcessor[] = [
      new SearchSourcesProcessor(searchSource, {
        engineNames: options.engineNames,
        categories: options.categories,
        pageno: options.pageno,
      }),
    ];
    this.engine = new ContextEngine({ pipeline });
  }

  /**
   * Run a search query through the merged engine and return ranked results.
   */
  async search(
    query: string,
    options: MergedSearchEngineOptions = {},
  ): Promise<MergedResult[]> {
    const context: PipelineContext = {
      initialState: { messages: [{ role: 'user', content: query }] },
      isAborted: false,
      messages: [{ role: 'user', content: query }],
      metadata: {},
    };

    // Per-call engine source override (e.g. different engines per request).
    if (options.engineNames || options.categories || options.pageno !== undefined) {
      this.engine
        .removeProcessor('search-sources')
        .addProcessor(
          new SearchSourcesProcessor(options.searchSource ?? new Search(), {
            engineNames: options.engineNames,
            categories: options.categories,
            pageno: options.pageno,
          }),
        );
    }

    const result = await this.engine.process(context);
    return (result.metadata.searchResults ?? []) as MergedResult[];
  }

  getProcessors(): ContextProcessor[] {
    return this.engine.getProcessors();
  }

  validate() {
    return this.engine.validate();
  }
}
