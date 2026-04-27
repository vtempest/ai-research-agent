/**
 * @module research/search/stream-handler
 * @description Consumes a LangChain streamEvents generator and emits
 * structured "sources" and "response" events on an EventEmitter.
 */
import { Document } from "@langchain/core/documents";
import EventEmitter from "events";
import type { StreamEvent } from "@langchain/core/tracers/log_stream";
import { buildFallbackDocs, normalizeSourcesOutput } from "./doc-utils";

export async function handleStream(
  stream: AsyncGenerator<StreamEvent, any, any>,
  emitter: EventEmitter,
  query: string,
): Promise<void> {
  let emittedSources = false;
  let responseChunkCount = 0;
  let lastSources: Document[] = [];

  for await (const event of stream) {
    if (event.event === "on_chain_end" && event.name === "FinalSourceRetriever") {
      lastSources = normalizeSourcesOutput(event.data.output, query);
      emittedSources = true;
      emitter.emit("data", JSON.stringify({ type: "sources", data: lastSources }));
    }

    if (event.event === "on_chain_stream" && event.name === "FinalResponseGenerator") {
      responseChunkCount += 1;
      emitter.emit("data", JSON.stringify({ type: "response", data: event.data.chunk }));
    }

    if (event.event === "on_chain_end" && event.name === "FinalResponseGenerator") {
      if (!emittedSources) {
        lastSources = buildFallbackDocs(query);
        emitter.emit("data", JSON.stringify({ type: "sources", data: lastSources }));
      }

      if (responseChunkCount === 0) {
        const fallbackUrls = (
          lastSources.length > 0
            ? lastSources
                .map((doc) => doc.metadata?.url)
                .filter((url): url is string => typeof url === "string")
            : buildFallbackDocs(query).map((doc) => doc.metadata.url)
        ).slice(0, 5);

        const fallbackMessage = [
          "I couldn't generate a full answer, but I ran a web search and found these source URLs:",
          ...fallbackUrls.map((url) => `- ${url}`),
        ].join("\n");

        emitter.emit("data", JSON.stringify({ type: "response", data: fallbackMessage }));
      }

      emitter.emit("end");
    }
  }
}
