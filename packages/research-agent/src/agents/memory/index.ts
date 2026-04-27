/**
 * Memory Module Entry Point
 *
 * Exports all memory system components with clean abstractions
 */

// Core classes
export { SimpleMemory } from "./simple-memory";
export { MemoryAgent } from "./memory-agent";

// Storage implementations
export { DrizzleMemoryStorage, createMemorySchema } from "./drizzle-storage";
export type { IMemoryStorage } from "./storage-interface";

// Types and constants
export {
  MEMORY_CONFIG,
  MEMORY_TYPES,
  type MemoryType,
  type MemoryRecord,
  type Message,
  type MemorySearchOptions,
  type MemoryUpdate,
  type MemoryContextOptions,
  type MemoryMetrics,
  type MemoryOptions,
  type ExtractedFact,
} from "./types";

export type { MemoryAgentOptions } from "./memory-agent";
