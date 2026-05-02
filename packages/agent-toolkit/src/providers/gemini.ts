/**
 * @module research/models/providers/gemini
 * @description Research library module.
 */
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { Model, ModelList, ProviderMetadata } from "../types";
import BaseModelProvider from "./baseProvider";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { UIConfigField } from "../../config/types";
import { getConfiguredModelProviderById } from "../../config/serverRegistry";
// import grab from "grab-url";


interface GeminiConfig {
  apiKey: string;
}

const providerConfigFields: UIConfigField[] = [
  {
    type: "password",
    name: "API Key",
    key: "apiKey",
    description: "Your Google Gemini API key",
    required: true,
    placeholder: "Google Gemini API Key",
    env: "GEMINI_API_KEY",
    scope: "server",
  },
];

class GeminiProvider extends BaseModelProvider<GeminiConfig> {
  constructor(id: string, name: string, config: GeminiConfig) {
    super(id, name, config);
  }

  async getDefaultModels(): Promise<ModelList> {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${this.config.apiKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Gemini API returned ${response.status}: ${errorText}`);
        return { chat: [] };
      }

      const data = (await response.json()) as any;

      if (!data.models || !Array.isArray(data.models)) {
        console.warn(
          `Invalid response format from Gemini API: ${JSON.stringify(data)}`,
        );
        return { chat: [] };
      }

      let defaultChatModels: Model[] = [];

      data.models.forEach((m: any) => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
          defaultChatModels.push({
            key: m.name,
            name: m.displayName,
          });
        }
      });

      return {
        chat: defaultChatModels,
      };
    } catch (err) {
      console.error("Error fetching Gemini models:", err);
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
        "Error Loading Gemini Chat Model. Invalid Model Selected",
      );
    }

    return new ChatGoogleGenerativeAI({
      apiKey: this.config.apiKey,
      temperature: 0.7,
      model: key,
    });
  }

  static parseAndValidate(raw: any): GeminiConfig {
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
      key: "gemini",
      name: "Google Gemini",
    };
  }
}

export default GeminiProvider;
