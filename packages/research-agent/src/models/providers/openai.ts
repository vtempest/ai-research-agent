/**
 * @module research/models/providers/openai
 * @description Research library module.
 */
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { Model, ModelList, ProviderMetadata } from '../types';
import BaseModelProvider from './baseProvider';
import { ChatOpenAI } from '@langchain/openai';
import { UIConfigField } from '../../config/types';
import { getConfiguredModelProviderById } from '../../config/serverRegistry';

interface OpenAIConfig {
  apiKey: string;
  baseURL: string;
}

const defaultChatModels: Model[] = [
  {
    name: 'GPT-3.5 Turbo',
    key: 'gpt-3.5-turbo',
  },
  {
    name: 'GPT-4',
    key: 'gpt-4',
  },
  {
    name: 'GPT-4 turbo',
    key: 'gpt-4-turbo',
  },
  {
    name: 'GPT-4 omni',
    key: 'gpt-4o',
  },
  {
    name: 'GPT-4o (2024-05-13)',
    key: 'gpt-4o-2024-05-13',
  },
  {
    name: 'GPT-4 omni mini',
    key: 'gpt-4o-mini',
  },
  {
    name: 'GPT 4.1 nano',
    key: 'gpt-4.1-nano',
  },
  {
    name: 'GPT 4.1 mini',
    key: 'gpt-4.1-mini',
  },
  {
    name: 'GPT 4.1',
    key: 'gpt-4.1',
  },
  {
    name: 'GPT 5 nano',
    key: 'gpt-5-nano',
  },
  {
    name: 'GPT 5',
    key: 'gpt-5',
  },
  {
    name: 'GPT 5 Mini',
    key: 'gpt-5-mini',
  },
  {
    name: 'GPT 5 Pro',
    key: 'gpt-5-pro',
  },
  {
    name: 'GPT 5.1',
    key: 'gpt-5.1',
  },
  {
    name: 'GPT 5.2',
    key: 'gpt-5.2',
  },
  {
    name: 'GPT 5.2 Pro',
    key: 'gpt-5.2-pro',
  },
  {
    name: 'o1',
    key: 'o1',
  },
  {
    name: 'o3',
    key: 'o3',
  },
  {
    name: 'o3 Mini',
    key: 'o3-mini',
  },
  {
    name: 'o4 Mini',
    key: 'o4-mini',
  },
];

const providerConfigFields: UIConfigField[] = [
  {
    type: 'password',
    name: 'API Key',
    key: 'apiKey',
    description: 'Your OpenAI API key',
    required: true,
    placeholder: 'OpenAI API Key',
    env: 'OPENAI_API_KEY',
    scope: 'server',
  },
  {
    type: 'string',
    name: 'Base URL',
    key: 'baseURL',
    description: 'The base URL for the OpenAI API',
    required: true,
    placeholder: 'OpenAI Base URL',
    default: 'https://api.openai.com/v1',
    env: 'OPENAI_BASE_URL',
    scope: 'server',
  },
];

class OpenAIProvider extends BaseModelProvider<OpenAIConfig> {
  constructor(id: string, name: string, config: OpenAIConfig) {
    super(id, name, config);
  }

  async getDefaultModels(): Promise<ModelList> {
    if (this.config.baseURL === 'https://api.openai.com/v1') {
      return {
        chat: defaultChatModels,
      };
    }

    return {
      chat: [],
    };
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
        'Error Loading OpenAI Chat Model. Invalid Model Selected',
      );
    }

    // Validate that the model is actually a chat model
    const invalidChatModelPatterns = [
      'whisper', // Audio transcription models
      'tts', // Text-to-speech models
      'dall-e', // Image generation models
      'text-embedding', // Embedding models
      'davinci-', // Legacy completion models (not chat)
      'curie-', // Legacy completion models (not chat)
      'babbage-', // Legacy completion models (not chat)
      'ada-', // Legacy completion models (not chat)
    ];

    const normalizedKey = key.toLowerCase();
    const matchedPattern = invalidChatModelPatterns.find((pattern) =>
      normalizedKey.includes(pattern),
    );

    if (matchedPattern) {
      const modelTypeMap: Record<string, string> = {
        whisper: 'audio transcription model (use the Audio/Transcription API instead)',
        tts: 'text-to-speech model (use the Audio/Speech API instead)',
        'dall-e': 'image generation model (use the Images API instead)',
        'text-embedding': 'embedding model (select this under "Embedding Models" instead)',
        'davinci-': 'legacy completion model (use a chat model like gpt-3.5-turbo instead)',
        'curie-': 'legacy completion model (use a chat model like gpt-3.5-turbo instead)',
        'babbage-': 'legacy completion model (use a chat model like gpt-3.5-turbo instead)',
        'ada-': 'legacy completion model (use a chat model like gpt-3.5-turbo instead)',
      };

      const modelType = modelTypeMap[matchedPattern] || 'non-chat model';

      throw new Error(
        `❌ Invalid chat model: "${key}"\n\n` +
        `This is a ${modelType}.\n\n` +
        `Please remove this model from your chat model configuration and select a valid chat completion model (e.g., gpt-3.5-turbo, gpt-4, gpt-4o).\n\n` +
        `You can manage your models in the Settings page.`,
      );
    }

    return new ChatOpenAI({
      apiKey: this.config.apiKey,
      temperature: 0.7,
      model: key,
      configuration: {
        baseURL: this.config.baseURL,
      },
    }) as unknown as BaseChatModel;
  }

  static parseAndValidate(raw: any): OpenAIConfig {
    if (!raw || typeof raw !== 'object')
      throw new Error('Invalid config provided. Expected object');
    if (!raw.apiKey || !raw.baseURL)
      throw new Error(
        'Invalid config provided. API key and base URL must be provided',
      );

    return {
      apiKey: String(raw.apiKey),
      baseURL: String(raw.baseURL),
    };
  }

  static getProviderConfigFields(): UIConfigField[] {
    return providerConfigFields;
  }

  static getProviderMetadata(): ProviderMetadata {
    return {
      key: 'openai',
      name: 'OpenAI',
    };
  }
}

export default OpenAIProvider;
