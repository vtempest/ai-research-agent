
/**
 * List of default models for the chat providers and a list of models
 * 
 * @property {string} provider - The provider of the model
 * @property {string} docs - The documentation URL for the model
 * @property {string} api_key - The API key  url for the model
 * @property {string} default - The default model for the chat provider
 * @property {Object[]} models - The list of models available for the chat provider
 * @category Generate
 */
export const LANGUAGE_MODELS = [
    {
        "provider": "Perplexity",
        "docs": "https://docs.perplexity.ai/models/model-cards",
        "api_key": "https://www.perplexity.ai/settings/keys",
        "default": "sonar",
        "models": [
            {
                name: "Sonar Pro",
                id: "sonar-pro",
                contextLength: 200000
            },
            {
                name: "Sonar",
                id: "sonar",
                contextLength: 128000
            },
            {
                name: "Sonar Reasoning Pro",
                id: "sonar-reasoning-pro",
                contextLength: 128000
            },
            {
                name: "Sonar Reasoning",
                id: "sonar-reasoning",
                contextLength: 128000
            },
            {
                name: "Sonar Deep Research",
                id: "sonar-deep-research",
                contextLength: 128000
            },
            {
                name: "Llama 3.1 Sonar Small 128k Online",
                id: "llama-3.1-sonar-small-128k-online",
                contextLength: 127072
            },
            {
                name: "Llama 3.1 Sonar Large 128k Online",
                id: "llama-3.1-sonar-large-128k-online",
                contextLength: 127072
            },
            {
                name: "Llama 3.1 Sonar Huge 128k Online",
                id: "llama-3.1-sonar-huge-128k-online",
                contextLength: 127072
            }
        ]
    },
    {
        "provider": "Groq",
        "docs": "https://console.groq.com/docs/overview",
        "api_key": "https://console.groq.com/keys",
        "default": "meta-llama/llama-4-maverick-17b-128e-instruct",
        "models": [
            {
                name: "DeepSeek R1 Distill Llama 70B",
                id: "deepseek-r1-distill-llama-70b",
                contextLength: 131072,
            },
            {
                name: "Llama 4 Maverick 17B",
                id: "meta-llama/llama-4-maverick-17b-128e-instruct",
                contextLength: 131072,
            },
            {
                name: "Llama 4 Scout 17B",
                id: "meta-llama/llama-4-scout-17b-16e-instruct",
                contextLength: 131072,
            },
            {
                name: "Llama 3.3 70B Versatile",
                id: "llama-3.3-70b-versatile",
                contextLength: 131072,
            },
            {
                name: "Llama 3.3 70B SpecDec",
                id: "llama-3.3-70b-specdec",
                contextLength: 131072,
            },

            {
                name: "Llama 3.2 3B",
                id: "llama-3.2-3b-preview",
                contextLength: 8192,
            },
            {
                name: "Llama 3.2 11B Vision",
                id: "llama-3.2-11b-vision-preview",
                contextLength: 32768,
            },
            {
                name: "Llama 3.2 90B Vision",
                id: "llama-3.2-90b-vision-preview",
                contextLength: 131072,
            },
            {
                name: "Llama 3.1 70B",
                id: "llama-3.1-70b-versatile",
                contextLength: 65536,
            },
            {
                name: "Llama 3.1 8B",
                id: "llama-3.1-8b-instant",
                contextLength: 8192,
            },
            {
                name: "Mixtral 8x7B",
                id: "mixtral-8x7b-32768",
                contextLength: 32768,
            },
            {
                name: "Gemma2 9B",
                id: "gemma2-9b-it",
                contextLength: 16384,
            },
        ],
    },
    {
        "provider": "OpenAI",
        "docs": "https://platform.openai.com/docs/overview",
        "api_key": "https://platform.openai.com/api-keys",
        "default": "gpt-4o",
        "models": [
            {
                name: "GPT-4 Omni",
                id: "gpt-4o",
                contextLength: 128000,
            },
            {
                name: "GPT-4 Omni Mini",
                id: "gpt-4o-mini",
                contextLength: 128000,
            },
            {
                name: "GPT-4 Turbo",
                id: "gpt-4-turbo",
                contextLength: 128000,
            },
            {
                name: "GPT-4",
                id: "gpt-4",
                contextLength: 8192,
            },
            {
                name: "GPT-3.5 Turbo",
                id: "gpt-3.5-turbo",
                contextLength: 16385,
            },
        ]
    },
    {
        "provider": "Anthropic",
        "docs": "https://docs.anthropic.com/en/docs/welcome",
        "api_key": "https://console.anthropic.com/settings/keys",
        "default": "claude-3-7-sonnet-20250219",
        "models": [
            {
                name: "Claude 3.7 Sonnet",
                id: "claude-3-7-sonnet-20250219",
                contextLength: 200000,
            },
            {
                name: "Claude 3.5 Sonnet",
                id: "claude-3-5-sonnet-20241022",
                contextLength: 200000,
            },
            {
                name: "Claude 3 Opus",
                id: "claude-3-opus-20240229",
                contextLength: 200000,
            },
            {
                name: "Claude 3 Sonnet",
                id: "claude-3-sonnet-20240229",
                contextLength: 200000,
            },
            {
                name: "Claude 3 Haiku",
                id: "claude-3-haiku-20240307",
                contextLength: 200000,
            },
        ]
    },
    {
        "provider": "TogetherAI",
        "docs": "https://docs.together.ai/docs/quickstart",
        "api_key": "https://api.together.xyz/settings/api-keys",
        "default": "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        "models": [
            {
                name: "Llama 3.1 8B Instruct Turbo",
                id: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
                contextLength: 131072,
            },
            {
                name: "Llama 3.1 70B Instruct Turbo",
                id: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
                contextLength: 131072,
            },
            {
                name: "Llama 3.1 405B Instruct Turbo",
                id: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
                contextLength: 130815,
            },
            {
                name: "Llama 3 8B Instruct Turbo",
                id: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
                contextLength: 8192,
            },
            {
                name: "Llama 3 70B Instruct Turbo",
                id: "meta-llama/Meta-Llama-3-70B-Instruct-Turbo",
                contextLength: 8192,
            },
            {
                name: "Llama 3.2 3B Instruct Turbo",
                id: "meta-llama/Llama-3.2-3B-Instruct-Turbo",
                contextLength: 131072,
            },
            {
                name: "Llama 3 8B Instruct Lite",
                id: "meta-llama/Meta-Llama-3-8B-Instruct-Lite",
                contextLength: 8192,
            },
            {
                name: "Llama 3 70B Instruct Lite",
                id: "meta-llama/Meta-Llama-3-70B-Instruct-Lite",
                contextLength: 8192,
            },
            {
                name: "Llama 3 8B Instruct Reference",
                id: "meta-llama/Llama-3-8b-chat-hf",
                contextLength: 8192,
            },
            {
                name: "Llama 3 70B Instruct Reference",
                id: "meta-llama/Llama-3-70b-chat-hf",
                contextLength: 8192,
            },
            {
                name: "Llama 3.1 Nemotron 70B",
                id: "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",
                contextLength: 32768,
            },
            {
                name: "Qwen 2.5 Coder 32B Instruct",
                id: "Qwen/Qwen2.5-Coder-32B-Instruct",
                contextLength: 32769,
            },
            {
                name: "WizardLM-2 8x22B",
                id: "microsoft/WizardLM-2-8x22B",
                contextLength: 65536,
            },
            {
                name: "Gemma 2 27B",
                id: "google/gemma-2-27b-it",
                contextLength: 8192,
            },
            {
                name: "Gemma 2 9B",
                id: "google/gemma-2-9b-it",
                contextLength: 8192,
            },
            {
                name: "DBRX Instruct",
                id: "databricks/dbrx-instruct",
                contextLength: 32768,
            },
            {
                name: "DeepSeek LLM Chat (67B)",
                id: "deepseek-ai/deepseek-llm-67b-chat",
                contextLength: 4096,
            },
            {
                name: "Gemma Instruct (2B)",
                id: "google/gemma-2b-it",
                contextLength: 8192,
            },
            {
                name: "MythoMax-L2 (13B)",
                id: "Gryphe/MythoMax-L2-13b",
                contextLength: 4096,
            },
            {
                name: "LLaMA-2 Chat (13B)",
                id: "meta-llama/Llama-2-13b-chat-hf",
                contextLength: 4096,
            },
            {
                name: "Mistral (7B) Instruct",
                id: "mistralai/Mistral-7B-Instruct-v0.1",
                contextLength: 8192,
            },
            {
                name: "Mistral (7B) Instruct v0.2",
                id: "mistralai/Mistral-7B-Instruct-v0.2",
                contextLength: 32768,
            },
            {
                name: "Mistral (7B) Instruct v0.3",
                id: "mistralai/Mistral-7B-Instruct-v0.3",
                contextLength: 32768,
            },
            {
                name: "Mixtral-8x7B Instruct (46.7B)",
                id: "mistralai/Mixtral-8x7B-Instruct-v0.1",
                contextLength: 32768,
            },
            {
                name: "Mixtral-8x22B Instruct (141B)",
                id: "mistralai/Mixtral-8x22B-Instruct-v0.1",
                contextLength: 65536,
            },
            {
                name: "Nous Hermes 2 - Mixtral 8x7B-DPO (46.7B)",
                id: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
                contextLength: 32768,
            },
            {
                name: "Qwen 2.5 7B Instruct Turbo",
                id: "Qwen/Qwen2.5-7B-Instruct-Turbo",
                contextLength: 32768,
            },
            {
                name: "Qwen 2.5 72B Instruct Turbo",
                id: "Qwen/Qwen2.5-72B-Instruct-Turbo",
                contextLength: 32768,
            },
            {
                name: "Qwen 2 Instruct (72B)",
                id: "Qwen/Qwen2-72B-Instruct",
                contextLength: 32768,
            },
            {
                name: "StripedHyena Nous (7B)",
                id: "togethercomputer/StripedHyena-Nous-7B",
                contextLength: 32768,
            },
            {
                name: "Upstage SOLAR Instruct v1 (11B)",
                id: "upstage/SOLAR-10.7B-Instruct-v1.0",
                contextLength: 4096,
            },
            {
                name: "Llama 3.2 11B Vision Instruct Turbo (Free)",
                id: "meta-llama/Llama-Vision-Free",
                contextLength: 131072,
            },
            {
                name: "Llama 3.2 11B Vision Instruct Turbo",
                id: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
                contextLength: 131072,
            },
            {
                name: "Llama 3.2 90B Vision Instruct Turbo",
                id: "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
                contextLength: 131072,
            },
        ]
    },
    {
        "provider": "XAI",
        "docs": "https://docs.x.ai/docs#models",
        "api_key": "https://console.x.ai/",
        "default": "grok-beta",
        "models": [
            {
                name: "Grok",
                id: "grok-beta",
                contextLength: 131072,
            },
            {
                name: "Grok Vision",
                id: "grok-vision-beta",
                contextLength: 8192,
            },
        ]
    },
    {
        "provider": "Google",
        "docs": "https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models",
        "api_key": "https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#api-keys",
        models: [
            {
                name: "Gemini 2.5 Pro Preview",
                id: "gemini-2.5-pro-preview-05-06",
                contextLength: 1048576
            },
            {
                name: "Gemini 2.5 Flash Preview",
                id: "gemini-2.5-flash-preview-04-17",
                contextLength: 1048576
            },
            {
                name: "Gemini 2.0 Flash",
                id: "gemini-2.0-flash-001",
                contextLength: 1048576
            },
            {
                name: "Gemini 2.0 Flash-Lite",
                id: "gemini-2.0-flash-lite-001",
                contextLength: 1048576
            },
            {
                name: "Gemini 2.0 Flash-Live",
                id: "gemini-2.0-flash-live-preview-04-09",
                contextLength: 32768
            },
            {
                name: "Imagen 3",
                id: "imagen-3.0-generate-002",
                contextLength: 480
            },
            {
                name: "Imagen 3 Fast",
                id: "imagen-3.0-fast-generate-001",
                contextLength: 480
            },
            {
                name: "Llama 3.2 90B Vision Instruct Turbo",
                id: "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
                contextLength: 131072
            },
            {
                name: "Llama 3.3 70B",
                id: "meta-llama/Llama-3.3-70B",
                contextLength: 131072
            },
            {
                name: "Gemma 3",
                id: "gemma-3",
                contextLength: 131072
            },
            {
                name: "Gemma 2",
                id: "gemma-2",
                contextLength: 131072
            },
            {
                name: "Gemma",
                id: "gemma",
                contextLength: 131072
            }
        ]
    }
]