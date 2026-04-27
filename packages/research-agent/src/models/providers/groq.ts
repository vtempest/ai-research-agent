/**
 * @module research/models/providers/groq
 * @description Research library module.
 */
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { Model, ModelList, ProviderMetadata } from "../types";
import BaseModelProvider from "./baseProvider";
import { ChatGroq } from "@langchain/groq";
import { UIConfigField } from "../../config/types";
import { getConfiguredModelProviderById } from "../../config/serverRegistry";
// import grab from "grab-url";


interface GroqConfig {
  apiKey: string;
}

const providerConfigFields: UIConfigField[] = [
  {
    type: "password",
    name: "API Key",
    key: "apiKey",
    description: "Your Groq API key",
    required: true,
    placeholder: "Groq API Key",
    env: "GROQ_API_KEY",
    scope: "server",
  },
];

const defaultChatModels: Model[] = [
  { name: "Llama 3.3 70b (Versatile)", key: "llama-3.3-70b-versatile" },
  { name: "Llama 3.1 8b (Instant)", key: "llama-3.1-8b-instant" },
  { name: "Llama 3.2 1b (Preview)", key: "llama-3.2-1b-preview" },
  { name: "Llama 3.2 3b (Preview)", key: "llama-3.2-3b-preview" },
  { name: "DeepSeek R1 Distill Llama 70b", key: "deepseek-r1-distill-llama-70b" },
  { name: "Gemma 2 9b It", key: "gemma2-9b-it" },
];

class GroqProvider extends BaseModelProvider<GroqConfig> {
  constructor(id: string, name: string, config: GroqConfig) {
    super(id, name, config);
  }

  async getDefaultModels(): Promise<ModelList> {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/models", {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Groq API returned ${response.status}: ${errorText}`);
        return { chat: defaultChatModels };
      }

      const data = (await response.json()) as any;

      if (!data.data || !Array.isArray(data.data)) {
        console.warn(
          `Invalid response format from Groq API: ${JSON.stringify(data)}`,
        );
        return { chat: defaultChatModels };
      }

      const models: Model[] = data.data.map((m: any) => {
        return {
          name: m.id,
          key: m.id,
        };
      });

      return {
        chat: models,
      };
    } catch (err) {
      console.error("Error fetching Groq models:", err);
      return {
        chat: defaultChatModels,
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
      throw new Error("Error Loading Groq Chat Model. Invalid Model Selected");
    }

    return new ChatGroq({
      apiKey: this.config.apiKey,
      temperature: 0.7,
      model: key,
    });
  }

  static parseAndValidate(raw: any): GroqConfig {
    if (!raw || typeof raw !== "object")
      throw new Error("Invalid config provided. Expected object");
    if (!raw.apiKey)
      throw new Error("Invalid config provided. API key must be provided");

    return {
      apiKey: String(raw.apiKey),
    };
  }

  static getProviderConfigFields(): UIConfigField[] {
    return providerConfigFields;
  }

  static getProviderMetadata(): ProviderMetadata {
    return {
      key: "groq",
      name: "Groq",
    };
  }
}

export default GroqProvider;
