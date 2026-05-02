/**
 * @module research/models/providers/ollama
 * @description Research library module.
 */
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { Model, ModelList, ProviderMetadata } from "../types";
import BaseModelProvider from "./baseProvider";
import { ChatOllama } from "@langchain/ollama";
import { UIConfigField } from "../../config/types";
import { getConfiguredModelProviderById } from "../../config/serverRegistry";
// import grab from "grab-url";

import { getEnv } from "../../config/env";

interface OllamaConfig {
  baseURL: string;
}

const providerConfigFields: UIConfigField[] = [
  {
    type: "string",
    name: "Base URL",
    key: "baseURL",
    description: "The base URL for the Ollama",
    required: true,
    placeholder: getEnv("DOCKER")
      ? "http://host.docker.internal:11434"
      : "http://localhost:11434",
    env: "OLLAMA_BASE_URL",
    scope: "server",
  },
];

class OllamaProvider extends BaseModelProvider<OllamaConfig> {
  constructor(id: string, name: string, config: OllamaConfig) {
    super(id, name, config);
  }

  async getDefaultModels(): Promise<ModelList> {
    try {
      const response = await fetch(`${this.config.baseURL}/api/tags`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Ollama API returned ${response.status}: ${errorText}`);
        return { chat: [] };
      }

      const data = (await response.json()) as any;

      if (!data.models || !Array.isArray(data.models)) {
        console.warn(
          `Invalid response format from Ollama API: ${JSON.stringify(data)}`,
        );
        return { chat: [] };
      }

      const models: Model[] = data.models.map((m: any) => {
        return {
          name: m.name,
          key: m.model,
        };
      });

      return {
        chat: models,
      };
    } catch (err) {
      console.error("Error fetching Ollama models:", err);
      return {
        chat: [],
      };
    }
  }

  async getModelList(): Promise<ModelList> {
    const defaultModels = await this.getDefaultModels();
    const configProvider = getConfiguredModelProviderById(this.id)!;

    return {
      chat: [...defaultModels.chat, ...configProvider.chatModels],
    };
  }

  async loadChatModel(key: string): Promise<BaseChatModel> {
    const modelList = await this.getModelList();

    const exists = modelList.chat.find((m) => m.key === key);

    if (!exists) {
      throw new Error(
        "Error Loading Ollama Chat Model. Invalid Model Selected",
      );
    }

    return new ChatOllama({
      temperature: 0.7,
      model: key,
      baseUrl: this.config.baseURL,
    });
  }

  static parseAndValidate(raw: any): OllamaConfig {
    if (!raw || typeof raw !== "object")
      throw new Error("Invalid config provided. Expected object");
    if (!raw.baseURL)
      throw new Error("Invalid config provided. Base URL must be provided");

    return {
      baseURL: String(raw.baseURL),
    };
  }

  static getProviderConfigFields(): UIConfigField[] {
    return providerConfigFields;
  }

  static getProviderMetadata(): ProviderMetadata {
    return {
      key: "ollama",
      name: "Ollama",
    };
  }
}

export default OllamaProvider;
