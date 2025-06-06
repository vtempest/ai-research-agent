import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();

// 1. Configure connections to MCP servers (local or remote)
const client = new MultiServerMCPClient({
  throwOnLoadError: true,
  prefixToolNameWithServerName: true,
  additionalToolNamePrefix: "mcp",
  mcpServers: {
    // Example: Local math server via stdio
    math: {
      transport: "stdio",
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-math"],
      restart: {
        enabled: true,
        maxAttempts: 3,
        delayMs: 1000,
      },
    },
    // Example: Remote weather server via SSE
    weather: {
      transport: "sse",
      url: "https://example.com/weather/mcp",
      headers: {
        Authorization: "Bearer my-weather-token",
      },
      reconnect: {
        enabled: true,
        maxAttempts: 5,
        delayMs: 2000,
      },
    },
  },
});

// 2. Load tools from all configured MCP servers
const tools = await client.getTools();

// 3. Initialize Groq LLM
const model = new ChatGroq({
  modelName: "llama-3-70b-8192", // or your preferred Groq-supported model
  temperature: 0.2,
  // apiKey: process.env.GROQ_API_KEY,
});

// 4. Create a LangChain agent with Groq and MCP tools
const agent = createReactAgent({ llm: model, tools });

// 5. Use the agent
try {
  const response = await agent.invoke({
    messages: [{ role: "user", content: "What is (3 + 5) x 12? And what's the weather in San Francisco?" }],
  });
  console.log(response);
} catch (error) {
  console.error("Agent execution error:", error);
}
await client.close();
