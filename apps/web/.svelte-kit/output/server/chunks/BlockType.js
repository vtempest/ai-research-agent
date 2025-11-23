import { z } from "zod";
import katex from "katex";
import { marked } from "marked";
import hljs from "highlight.js";
const LANGUAGE_MODELS = [
  {
    provider: "Cloudflare",
    docs: "https://developers.cloudflare.com/workers-ai/",
    api_key: "https://dash.cloudflare.com/profile/api-tokens",
    default: "llama-4-scout-17b-16e-instruct",
    models: [
      {
        name: "Llama 4 Scout 17B 16E Instruct",
        id: "llama-4-scout-17b-16e-instruct",
        contextLength: 128e3
      },
      {
        name: "Llama 3.3 70B Instruct FP8 Fast",
        id: "llama-3.3-70b-instruct-fp8-fast",
        contextLength: 128e3
      },
      {
        name: "Llama 3.1 8B Instruct Fast",
        id: "llama-3.1-8b-instruct-fast",
        contextLength: 128e3
      },
      {
        name: "Gemma 3 12B IT",
        id: "gemma-3-12b-it",
        contextLength: 128e3
      },
      {
        name: "Mistral Small 3.1 24B Instruct",
        id: "mistral-small-3.1-24b-instruct",
        contextLength: 128e3
      },
      {
        name: "QwQ 32B",
        id: "qwq-32b",
        contextLength: 32768
      },
      {
        name: "Qwen2.5 Coder 32B Instruct",
        id: "qwen2.5-coder-32b-instruct",
        contextLength: 32768
      },
      {
        name: "BGE Reranker Base",
        id: "bge-reranker-base",
        contextLength: 512
      },
      {
        name: "Llama Guard 3 8B",
        id: "llama-guard-3-8b",
        contextLength: 8192
      },
      {
        name: "DeepSeek R1 Distill Qwen 32B",
        id: "deepseek-r1-distill-qwen-32b",
        contextLength: 32768
      },
      {
        name: "Llama 3.2 1B Instruct",
        id: "llama-3.2-1b-instruct",
        contextLength: 131072
      },
      {
        name: "Llama 3.2 3B Instruct",
        id: "llama-3.2-3b-instruct",
        contextLength: 131072
      },
      {
        name: "Llama 3.2 11B Vision Instruct",
        id: "llama-3.2-11b-vision-instruct",
        contextLength: 131072
      },
      {
        name: "FLUX.1 Schnell",
        id: "flux-1-schnell",
        contextLength: 512
      },
      {
        name: "Llama 3.1 8B Instruct AWQ",
        id: "llama-3.1-8b-instruct-awq",
        contextLength: 128e3
      },
      {
        name: "Llama 3.1 8B Instruct FP8",
        id: "llama-3.1-8b-instruct-fp8",
        contextLength: 128e3
      },
      {
        name: "MeloTTS",
        id: "melotts",
        contextLength: 1024
      },
      {
        name: "Llama 3.1 8B Instruct",
        id: "llama-3.1-8b-instruct",
        contextLength: 128e3
      },
      {
        name: "BGE M3",
        id: "bge-m3",
        contextLength: 8192
      },
      {
        name: "Meta Llama 3 8B Instruct",
        id: "meta-llama-3-8b-instruct",
        contextLength: 8192
      },
      {
        name: "Whisper Large V3 Turbo",
        id: "whisper-large-v3-turbo",
        contextLength: 448e3
      },
      {
        name: "Llama 3 8B Instruct AWQ",
        id: "llama-3-8b-instruct-awq",
        contextLength: 8192
      },
      {
        name: "LLaVA 1.5 7B HF",
        id: "llava-1.5-7b-hf",
        contextLength: 4096
      },
      {
        name: "Una Cybertron 7B V2 BF16",
        id: "una-cybertron-7b-v2-bf16",
        contextLength: 32768
      },
      {
        name: "Whisper Tiny EN",
        id: "whisper-tiny-en",
        contextLength: 448e3
      },
      {
        name: "Llama 3 8B Instruct",
        id: "llama-3-8b-instruct",
        contextLength: 8192
      },
      {
        name: "Mistral 7B Instruct v0.2",
        id: "mistral-7b-instruct-v0.2",
        contextLength: 32768
      },
      {
        name: "Gemma 7B IT LoRA",
        id: "gemma-7b-it-lora",
        contextLength: 8192
      },
      {
        name: "Gemma 2B IT LoRA",
        id: "gemma-2b-it-lora",
        contextLength: 8192
      },
      {
        name: "Llama 2 7B Chat HF LoRA",
        id: "llama-2-7b-chat-hf-lora",
        contextLength: 4096
      },
      {
        name: "Gemma 7B IT",
        id: "gemma-7b-it",
        contextLength: 8192
      },
      {
        name: "Starling LM 7B Beta",
        id: "starling-lm-7b-beta",
        contextLength: 8192
      },
      {
        name: "Hermes 2 Pro Mistral 7B",
        id: "hermes-2-pro-mistral-7b",
        contextLength: 32768
      },
      {
        name: "Mistral 7B Instruct v0.2 LoRA",
        id: "mistral-7b-instruct-v0.2-lora",
        contextLength: 32768
      },
      {
        name: "Qwen1.5 1.8B Chat",
        id: "qwen1.5-1.8b-chat",
        contextLength: 32768
      },
      {
        name: "UForm Gen2 Qwen 500M",
        id: "uform-gen2-qwen-500m",
        contextLength: 2048
      },
      {
        name: "BART Large CNN",
        id: "bart-large-cnn",
        contextLength: 1024
      },
      {
        name: "Phi-2",
        id: "phi-2",
        contextLength: 2048
      },
      {
        name: "TinyLlama 1.1B Chat v1.0",
        id: "tinyllama-1.1b-chat-v1.0",
        contextLength: 2048
      },
      {
        name: "Qwen1.5 14B Chat AWQ",
        id: "qwen1.5-14b-chat-awq",
        contextLength: 32768
      },
      {
        name: "Qwen1.5 7B Chat AWQ",
        id: "qwen1.5-7b-chat-awq",
        contextLength: 32768
      },
      {
        name: "Qwen1.5 0.5B Chat",
        id: "qwen1.5-0.5b-chat",
        contextLength: 32768
      },
      {
        name: "DiscoLM German 7B v1 AWQ",
        id: "discolm-german-7b-v1-awq",
        contextLength: 32768
      },
      {
        name: "Falcon 7B Instruct",
        id: "falcon-7b-instruct",
        contextLength: 2048
      },
      {
        name: "OpenChat 3.5 0106",
        id: "openchat-3.5-0106",
        contextLength: 8192
      },
      {
        name: "SQLCoder 7B 2",
        id: "sqlcoder-7b-2",
        contextLength: 16384
      },
      {
        name: "DeepSeek Math 7B Instruct",
        id: "deepseek-math-7b-instruct",
        contextLength: 4096
      },
      {
        name: "DETR ResNet-50",
        id: "detr-resnet-50",
        contextLength: 1024
      },
      {
        name: "Stable Diffusion XL Lightning",
        id: "stable-diffusion-xl-lightning",
        contextLength: 77
      },
      {
        name: "DreamShaper 8 LCM",
        id: "dreamshaper-8-lcm",
        contextLength: 77
      },
      {
        name: "Stable Diffusion v1.5 Img2Img",
        id: "stable-diffusion-v1-5-img2img",
        contextLength: 77
      },
      {
        name: "Stable Diffusion v1.5 Inpainting",
        id: "stable-diffusion-v1-5-inpainting",
        contextLength: 77
      },
      {
        name: "DeepSeek Coder 6.7B Instruct AWQ",
        id: "deepseek-coder-6.7b-instruct-awq",
        contextLength: 16384
      },
      {
        name: "DeepSeek Coder 6.7B Base AWQ",
        id: "deepseek-coder-6.7b-base-awq",
        contextLength: 16384
      },
      {
        name: "LlamaGuard 7B AWQ",
        id: "llamaguard-7b-awq",
        contextLength: 4096
      },
      {
        name: "Neural Chat 7B v3.1 AWQ",
        id: "neural-chat-7b-v3-1-awq",
        contextLength: 8192
      },
      {
        name: "OpenHermes 2.5 Mistral 7B AWQ",
        id: "openhermes-2.5-mistral-7b-awq",
        contextLength: 8192
      },
      {
        name: "Llama 2 13B Chat AWQ",
        id: "llama-2-13b-chat-awq",
        contextLength: 4096
      },
      {
        name: "Mistral 7B Instruct v0.1 AWQ",
        id: "mistral-7b-instruct-v0.1-awq",
        contextLength: 8192
      },
      {
        name: "Zephyr 7B Beta AWQ",
        id: "zephyr-7b-beta-awq",
        contextLength: 8192
      },
      {
        name: "Stable Diffusion XL Base 1.0",
        id: "stable-diffusion-xl-base-1.0",
        contextLength: 77
      },
      {
        name: "BGE Large EN v1.5",
        id: "bge-large-en-v1.5",
        contextLength: 512
      },
      {
        name: "BGE Small EN v1.5",
        id: "bge-small-en-v1.5",
        contextLength: 512
      },
      {
        name: "Llama 2 7B Chat FP16",
        id: "llama-2-7b-chat-fp16",
        contextLength: 4096
      },
      {
        name: "Mistral 7B Instruct v0.1",
        id: "mistral-7b-instruct-v0.1",
        contextLength: 8192
      },
      {
        name: "BGE Base EN v1.5",
        id: "bge-base-en-v1.5",
        contextLength: 512
      },
      {
        name: "DistilBERT SST-2 Int8",
        id: "distilbert-sst-2-int8",
        contextLength: 512
      },
      {
        name: "Llama 2 7B Chat Int8",
        id: "llama-2-7b-chat-int8",
        contextLength: 4096
      },
      {
        name: "M2M100 1.2B",
        id: "m2m100-1.2b",
        contextLength: 1024
      },
      {
        name: "ResNet-50",
        id: "resnet-50",
        contextLength: 224
      },
      {
        name: "Whisper",
        id: "whisper",
        contextLength: 448e3
      },
      {
        name: "Llama 3.1 70B Instruct",
        id: "llama-3.1-70b-instruct",
        contextLength: 128e3
      }
    ]
  },
  {
    provider: "Perplexity",
    docs: "https://docs.perplexity.ai/models/model-cards",
    api_key: "https://www.perplexity.ai/account/api/keys",
    default: "sonar",
    models: [
      {
        name: "Sonar Pro",
        id: "sonar-pro",
        contextLength: 2e5
      },
      {
        name: "Sonar",
        id: "sonar",
        contextLength: 128e3
      },
      {
        name: "Sonar Reasoning Pro",
        id: "sonar-reasoning-pro",
        contextLength: 128e3
      },
      {
        name: "Sonar Reasoning",
        id: "sonar-reasoning",
        contextLength: 128e3
      },
      {
        name: "Sonar Deep Research",
        id: "sonar-deep-research",
        contextLength: 128e3
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
    provider: "Groq",
    docs: "https://console.groq.com/docs/overview",
    api_key: "https://console.groq.com/keys",
    default: "meta-llama/llama-4-maverick-17b-128e-instruct",
    models: [
      {
        name: "DeepSeek R1 Distill Llama 70B",
        id: "deepseek-r1-distill-llama-70b",
        contextLength: 131072
      },
      {
        name: "Llama 4 Maverick 17B",
        id: "meta-llama/llama-4-maverick-17b-128e-instruct",
        contextLength: 131072
      },
      {
        name: "Llama 4 Scout 17B",
        id: "meta-llama/llama-4-scout-17b-16e-instruct",
        contextLength: 131072
      },
      {
        name: "Llama 3.3 70B Versatile",
        id: "llama-3.3-70b-versatile",
        contextLength: 131072
      },
      {
        name: "Llama 3.3 70B SpecDec",
        id: "llama-3.3-70b-specdec",
        contextLength: 131072
      },
      {
        name: "Llama 3.2 3B",
        id: "llama-3.2-3b-preview",
        contextLength: 8192
      },
      {
        name: "Llama 3.2 11B Vision",
        id: "llama-3.2-11b-vision-preview",
        contextLength: 32768
      },
      {
        name: "Llama 3.2 90B Vision",
        id: "llama-3.2-90b-vision-preview",
        contextLength: 131072
      },
      {
        name: "Llama 3.1 70B",
        id: "llama-3.1-70b-versatile",
        contextLength: 65536
      },
      {
        name: "Llama 3.1 8B",
        id: "llama-3.1-8b-instant",
        contextLength: 8192
      },
      {
        name: "Mixtral 8x7B",
        id: "mixtral-8x7b-32768",
        contextLength: 32768
      },
      {
        name: "Gemma2 9B",
        id: "gemma2-9b-it",
        contextLength: 16384
      }
    ]
  },
  {
    provider: "OpenAI",
    docs: "https://platform.openai.com/docs/overview",
    api_key: "https://platform.openai.com/api-keys",
    default: "gpt-4o",
    models: [
      {
        name: "GPT-4 Omni",
        id: "gpt-4o",
        contextLength: 128e3
      },
      {
        name: "GPT-4 Omni Mini",
        id: "gpt-4o-mini",
        contextLength: 128e3
      },
      {
        name: "GPT-4 Turbo",
        id: "gpt-4-turbo",
        contextLength: 128e3
      },
      {
        name: "GPT-4",
        id: "gpt-4",
        contextLength: 8192
      },
      {
        name: "GPT-3.5 Turbo",
        id: "gpt-3.5-turbo",
        contextLength: 16385
      }
    ]
  },
  {
    provider: "Anthropic",
    docs: "https://docs.anthropic.com/en/docs/welcome",
    api_key: "https://console.anthropic.com/settings/keys",
    default: "claude-3-7-sonnet-20250219",
    models: [
      {
        name: "Claude 3.7 Sonnet",
        id: "claude-3-7-sonnet-20250219",
        contextLength: 2e5
      },
      {
        name: "Claude 3.5 Sonnet",
        id: "claude-3-5-sonnet-20241022",
        contextLength: 2e5
      },
      {
        name: "Claude 3 Opus",
        id: "claude-3-opus-20240229",
        contextLength: 2e5
      },
      {
        name: "Claude 3 Sonnet",
        id: "claude-3-sonnet-20240229",
        contextLength: 2e5
      },
      {
        name: "Claude 3 Haiku",
        id: "claude-3-haiku-20240307",
        contextLength: 2e5
      }
    ]
  },
  {
    provider: "TogetherAI",
    docs: "https://docs.together.ai/docs/quickstart",
    api_key: "https://api.together.xyz/settings/api-keys",
    default: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    models: [
      {
        name: "Llama 3.1 8B Instruct Turbo",
        id: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        contextLength: 131072
      },
      {
        name: "Llama 3.1 70B Instruct Turbo",
        id: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
        contextLength: 131072
      },
      {
        name: "Llama 3.1 405B Instruct Turbo",
        id: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
        contextLength: 130815
      },
      {
        name: "Llama 3 8B Instruct Turbo",
        id: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
        contextLength: 8192
      },
      {
        name: "Llama 3 70B Instruct Turbo",
        id: "meta-llama/Meta-Llama-3-70B-Instruct-Turbo",
        contextLength: 8192
      },
      {
        name: "Llama 3.2 3B Instruct Turbo",
        id: "meta-llama/Llama-3.2-3B-Instruct-Turbo",
        contextLength: 131072
      },
      {
        name: "Llama 3 8B Instruct Lite",
        id: "meta-llama/Meta-Llama-3-8B-Instruct-Lite",
        contextLength: 8192
      },
      {
        name: "Llama 3 70B Instruct Lite",
        id: "meta-llama/Meta-Llama-3-70B-Instruct-Lite",
        contextLength: 8192
      },
      {
        name: "Llama 3 8B Instruct Reference",
        id: "meta-llama/Llama-3-8b-chat-hf",
        contextLength: 8192
      },
      {
        name: "Llama 3 70B Instruct Reference",
        id: "meta-llama/Llama-3-70b-chat-hf",
        contextLength: 8192
      },
      {
        name: "Llama 3.1 Nemotron 70B",
        id: "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",
        contextLength: 32768
      },
      {
        name: "Qwen 2.5 Coder 32B Instruct",
        id: "Qwen/Qwen2.5-Coder-32B-Instruct",
        contextLength: 32769
      },
      {
        name: "WizardLM-2 8x22B",
        id: "microsoft/WizardLM-2-8x22B",
        contextLength: 65536
      },
      {
        name: "Gemma 2 27B",
        id: "google/gemma-2-27b-it",
        contextLength: 8192
      },
      {
        name: "Gemma 2 9B",
        id: "google/gemma-2-9b-it",
        contextLength: 8192
      },
      {
        name: "DBRX Instruct",
        id: "databricks/dbrx-instruct",
        contextLength: 32768
      },
      {
        name: "DeepSeek LLM Chat (67B)",
        id: "deepseek-ai/deepseek-llm-67b-chat",
        contextLength: 4096
      },
      {
        name: "Gemma Instruct (2B)",
        id: "google/gemma-2b-it",
        contextLength: 8192
      },
      {
        name: "MythoMax-L2 (13B)",
        id: "Gryphe/MythoMax-L2-13b",
        contextLength: 4096
      },
      {
        name: "LLaMA-2 Chat (13B)",
        id: "meta-llama/Llama-2-13b-chat-hf",
        contextLength: 4096
      },
      {
        name: "Mistral (7B) Instruct",
        id: "mistralai/Mistral-7B-Instruct-v0.1",
        contextLength: 8192
      },
      {
        name: "Mistral (7B) Instruct v0.2",
        id: "mistralai/Mistral-7B-Instruct-v0.2",
        contextLength: 32768
      },
      {
        name: "Mistral (7B) Instruct v0.3",
        id: "mistralai/Mistral-7B-Instruct-v0.3",
        contextLength: 32768
      },
      {
        name: "Mixtral-8x7B Instruct (46.7B)",
        id: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        contextLength: 32768
      },
      {
        name: "Mixtral-8x22B Instruct (141B)",
        id: "mistralai/Mixtral-8x22B-Instruct-v0.1",
        contextLength: 65536
      },
      {
        name: "Nous Hermes 2 - Mixtral 8x7B-DPO (46.7B)",
        id: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
        contextLength: 32768
      },
      {
        name: "Qwen 2.5 7B Instruct Turbo",
        id: "Qwen/Qwen2.5-7B-Instruct-Turbo",
        contextLength: 32768
      },
      {
        name: "Qwen 2.5 72B Instruct Turbo",
        id: "Qwen/Qwen2.5-72B-Instruct-Turbo",
        contextLength: 32768
      },
      {
        name: "Qwen 2 Instruct (72B)",
        id: "Qwen/Qwen2-72B-Instruct",
        contextLength: 32768
      },
      {
        name: "StripedHyena Nous (7B)",
        id: "togethercomputer/StripedHyena-Nous-7B",
        contextLength: 32768
      },
      {
        name: "Upstage SOLAR Instruct v1 (11B)",
        id: "upstage/SOLAR-10.7B-Instruct-v1.0",
        contextLength: 4096
      },
      {
        name: "Llama 3.2 11B Vision Instruct Turbo (Free)",
        id: "meta-llama/Llama-Vision-Free",
        contextLength: 131072
      },
      {
        name: "Llama 3.2 11B Vision Instruct Turbo",
        id: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
        contextLength: 131072
      },
      {
        name: "Llama 3.2 90B Vision Instruct Turbo",
        id: "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
        contextLength: 131072
      }
    ]
  },
  {
    provider: "XAI",
    docs: "https://docs.x.ai/docs#models",
    api_key: "https://console.x.ai/",
    default: "grok-beta",
    models: [
      {
        name: "Grok",
        id: "grok-beta",
        contextLength: 131072
      },
      {
        name: "Grok Vision",
        id: "grok-vision-beta",
        contextLength: 8192
      }
    ]
  },
  {
    provider: "Google",
    docs: "https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models",
    api_key: "https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#api-keys",
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
  },
  {
    provider: "Amazon",
    docs: "https://docs.aws.amazon.com/bedrock/",
    api_key: "https://console.aws.amazon.com/iam/home#/security_credentials",
    default: "anthropic.claude-3-5-sonnet-20241022-v2:0",
    models: [
      {
        name: "AI21 Jamba 1.5 Mini",
        id: "ai21.jamba-1-5-mini-v1:0",
        contextLength: 256e3,
        provider: "AI21 Labs"
      },
      {
        name: "AI21 Jamba 1.5 Large",
        id: "ai21.jamba-1-5-large-v1:0",
        contextLength: 256e3,
        provider: "AI21 Labs"
      },
      {
        name: "Amazon Nova Canvas",
        id: "amazon.nova-canvas-v1:0",
        contextLength: 77,
        provider: "Amazon",
        type: "image"
      },
      {
        name: "Amazon Nova Lite",
        id: "amazon.nova-lite-v1:0",
        contextLength: 3e5,
        provider: "Amazon"
      },
      {
        name: "Amazon Nova Micro",
        id: "amazon.nova-micro-v1:0",
        contextLength: 128e3,
        provider: "Amazon"
      },
      {
        name: "Amazon Nova Pro",
        id: "amazon.nova-pro-v1:0",
        contextLength: 3e5,
        provider: "Amazon"
      },
      {
        name: "Amazon Nova Reel",
        id: "amazon.nova-reel-v1:0",
        contextLength: 1e4,
        provider: "Amazon",
        type: "video"
      },
      {
        name: "Amazon Nova Reel V2 Lite",
        id: "amazon.nova-reel-v2-lite-v1:0",
        contextLength: 1e4,
        provider: "Amazon",
        type: "video"
      },
      {
        name: "Amazon Nova Reel V2 Standard",
        id: "amazon.nova-reel-v2-standard-v1:0",
        contextLength: 1e4,
        provider: "Amazon",
        type: "video"
      },
      {
        name: "Amazon Rerank",
        id: "amazon.rerank-v1:0",
        contextLength: 8192,
        provider: "Amazon",
        type: "reranker"
      },
      {
        name: "Amazon Titan Embeddings G1 - Text",
        id: "amazon.titan-embed-text-v1",
        contextLength: 8192,
        provider: "Amazon",
        type: "embedding"
      },
      {
        name: "Amazon Titan Embeddings G1 - Text v2",
        id: "amazon.titan-embed-text-v2:0",
        contextLength: 8192,
        provider: "Amazon",
        type: "embedding"
      },
      {
        name: "Amazon Titan Image Generator G1",
        id: "amazon.titan-image-generator-v1",
        contextLength: 128,
        provider: "Amazon",
        type: "image"
      },
      {
        name: "Amazon Titan Image Generator G2",
        id: "amazon.titan-image-generator-v2:0",
        contextLength: 128,
        provider: "Amazon",
        type: "image"
      },
      {
        name: "Amazon Titan Multimodal Embeddings G1",
        id: "amazon.titan-embed-image-v1",
        contextLength: 8192,
        provider: "Amazon",
        type: "embedding"
      },
      {
        name: "Amazon Titan Text G1 - Express",
        id: "amazon.titan-text-express-v1",
        contextLength: 8192,
        provider: "Amazon"
      },
      {
        name: "Amazon Titan Text G1 - Lite",
        id: "amazon.titan-text-lite-v1",
        contextLength: 4096,
        provider: "Amazon"
      },
      {
        name: "Amazon Titan Text G1 - Premier",
        id: "amazon.titan-text-premier-v1:0",
        contextLength: 32e3,
        provider: "Amazon"
      },
      {
        name: "Claude 3.5 Sonnet v2",
        id: "anthropic.claude-3-5-sonnet-20241022-v2:0",
        contextLength: 2e5,
        provider: "Anthropic"
      },
      {
        name: "Claude 3.5 Sonnet v1",
        id: "anthropic.claude-3-5-sonnet-20240620-v1:0",
        contextLength: 2e5,
        provider: "Anthropic"
      },
      {
        name: "Claude 3.5 Haiku",
        id: "anthropic.claude-3-5-haiku-20241022-v1:0",
        contextLength: 2e5,
        provider: "Anthropic"
      },
      {
        name: "Claude 3 Opus",
        id: "anthropic.claude-3-opus-20240229-v1:0",
        contextLength: 2e5,
        provider: "Anthropic"
      },
      {
        name: "Claude 3 Sonnet",
        id: "anthropic.claude-3-sonnet-20240229-v1:0",
        contextLength: 2e5,
        provider: "Anthropic"
      },
      {
        name: "Claude 3 Haiku",
        id: "anthropic.claude-3-haiku-20240307-v1:0",
        contextLength: 2e5,
        provider: "Anthropic"
      },
      {
        name: "Claude Instant",
        id: "anthropic.claude-instant-v1",
        contextLength: 1e5,
        provider: "Anthropic"
      },
      {
        name: "Cohere Command",
        id: "cohere.command-text-v14",
        contextLength: 4096,
        provider: "Cohere"
      },
      {
        name: "Cohere Command Light",
        id: "cohere.command-light-text-v14",
        contextLength: 4096,
        provider: "Cohere"
      },
      {
        name: "Cohere Command R",
        id: "cohere.command-r-v1:0",
        contextLength: 128e3,
        provider: "Cohere"
      },
      {
        name: "Cohere Command R+",
        id: "cohere.command-r-plus-v1:0",
        contextLength: 128e3,
        provider: "Cohere"
      },
      {
        name: "Cohere Embed English",
        id: "cohere.embed-english-v3",
        contextLength: 512,
        provider: "Cohere",
        type: "embedding"
      },
      {
        name: "Cohere Embed Multilingual",
        id: "cohere.embed-multilingual-v3",
        contextLength: 512,
        provider: "Cohere",
        type: "embedding"
      },
      {
        name: "Cohere Rerank English",
        id: "cohere.rerank-english-v3:0",
        contextLength: 4096,
        provider: "Cohere",
        type: "reranker"
      },
      {
        name: "Cohere Rerank Multilingual",
        id: "cohere.rerank-multilingual-v3:0",
        contextLength: 4096,
        provider: "Cohere",
        type: "reranker"
      },
      {
        name: "DeepSeek R1",
        id: "deepseek.deepseek-r1-distill-qwen-32b-v1:0",
        contextLength: 32768,
        provider: "DeepSeek"
      },
      {
        name: "Luma Dream Machine",
        id: "luma.dream-machine-v1:0",
        contextLength: 512,
        provider: "Luma AI",
        type: "video"
      },
      {
        name: "Llama 2 13B Chat",
        id: "meta.llama2-13b-chat-v1",
        contextLength: 4096,
        provider: "Meta"
      },
      {
        name: "Llama 2 70B Chat",
        id: "meta.llama2-70b-chat-v1",
        contextLength: 4096,
        provider: "Meta"
      },
      {
        name: "Llama 3 8B Instruct",
        id: "meta.llama3-8b-instruct-v1:0",
        contextLength: 8192,
        provider: "Meta"
      },
      {
        name: "Llama 3 70B Instruct",
        id: "meta.llama3-70b-instruct-v1:0",
        contextLength: 8192,
        provider: "Meta"
      },
      {
        name: "Llama 3.1 8B Instruct",
        id: "meta.llama3-1-8b-instruct-v1:0",
        contextLength: 128e3,
        provider: "Meta"
      },
      {
        name: "Llama 3.1 70B Instruct",
        id: "meta.llama3-1-70b-instruct-v1:0",
        contextLength: 128e3,
        provider: "Meta"
      },
      {
        name: "Llama 3.1 405B Instruct",
        id: "meta.llama3-1-405b-instruct-v1:0",
        contextLength: 128e3,
        provider: "Meta"
      },
      {
        name: "Llama 3.2 1B Instruct",
        id: "meta.llama3-2-1b-instruct-v1:0",
        contextLength: 128e3,
        provider: "Meta"
      },
      {
        name: "Llama 3.2 3B Instruct",
        id: "meta.llama3-2-3b-instruct-v1:0",
        contextLength: 128e3,
        provider: "Meta"
      },
      {
        name: "Llama 3.2 11B Vision Instruct",
        id: "meta.llama3-2-11b-instruct-v1:0",
        contextLength: 128e3,
        provider: "Meta"
      },
      {
        name: "Llama 3.2 90B Vision Instruct",
        id: "meta.llama3-2-90b-instruct-v1:0",
        contextLength: 128e3,
        provider: "Meta"
      },
      {
        name: "Mistral 7B Instruct",
        id: "mistral.mistral-7b-instruct-v0:2",
        contextLength: 32768,
        provider: "Mistral AI"
      },
      {
        name: "Mixtral 8x7B Instruct",
        id: "mistral.mixtral-8x7b-instruct-v0:1",
        contextLength: 32768,
        provider: "Mistral AI"
      },
      {
        name: "Mistral Small",
        id: "mistral.mistral-small-2402-v1:0",
        contextLength: 32768,
        provider: "Mistral AI"
      },
      {
        name: "Mistral Large",
        id: "mistral.mistral-large-2402-v1:0",
        contextLength: 32768,
        provider: "Mistral AI"
      },
      {
        name: "Mistral Large 2",
        id: "mistral.mistral-large-2407-v1:0",
        contextLength: 128e3,
        provider: "Mistral AI"
      },
      {
        name: "Mistral Large 2411",
        id: "mistral.mistral-large-2411-v1:0",
        contextLength: 128e3,
        provider: "Mistral AI"
      },
      {
        name: "Stable Diffusion XL",
        id: "stability.stable-diffusion-xl-v1",
        contextLength: 77,
        provider: "Stability AI",
        type: "image"
      },
      {
        name: "SDXL 1.0",
        id: "stability.stable-diffusion-xl-v0",
        contextLength: 77,
        provider: "Stability AI",
        type: "image"
      },
      {
        name: "Stable Image Ultra",
        id: "stability.stable-image-ultra-v1:0",
        contextLength: 77,
        provider: "Stability AI",
        type: "image"
      },
      {
        name: "Stable Image Core",
        id: "stability.stable-image-core-v1:0",
        contextLength: 77,
        provider: "Stability AI",
        type: "image"
      },
      {
        name: "Writer Palmyra X",
        id: "writer.palmyra-x-004-v1:0",
        contextLength: 32768,
        provider: "Writer"
      },
      {
        name: "Writer Palmyra Creative",
        id: "writer.palmyra-creative-004-v1:0",
        contextLength: 32768,
        provider: "Writer"
      }
    ]
  },
  {
    provider: "Ollama",
    docs: "https://ollama.com/",
    api_key: "Not required - runs locally",
    default: "llama3.2",
    models: [
      {
        name: "DeepSeek-R1",
        id: "deepseek-r1",
        contextLength: 32768,
        type: "reasoning"
      },
      {
        name: "Gemma 3",
        id: "gemma3",
        contextLength: 8192,
        type: "vision"
      },
      {
        name: "Qwen 3",
        id: "qwen3",
        contextLength: 32768
      },
      {
        name: "Devstral",
        id: "devstral",
        contextLength: 32768
      },
      {
        name: "Llama 4",
        id: "llama4",
        contextLength: 128e3,
        type: "multimodal"
      },
      {
        name: "Qwen 2.5 VL",
        id: "qwen2.5vl",
        contextLength: 32768,
        type: "vision"
      },
      {
        name: "Llama 3.3",
        id: "llama3.3",
        contextLength: 128e3
      },
      {
        name: "Phi-4",
        id: "phi4",
        contextLength: 16384
      },
      {
        name: "Llama 3.2",
        id: "llama3.2",
        contextLength: 128e3
      },
      {
        name: "Llama 3.1",
        id: "llama3.1",
        contextLength: 128e3
      },
      {
        name: "Nomic Embed Text",
        id: "nomic-embed-text",
        contextLength: 8192,
        type: "embedding"
      },
      {
        name: "Mistral",
        id: "mistral",
        contextLength: 32768
      },
      {
        name: "Qwen 2.5",
        id: "qwen2.5",
        contextLength: 128e3
      },
      {
        name: "Llama 3",
        id: "llama3",
        contextLength: 8192
      },
      {
        name: "LLaVA",
        id: "llava",
        contextLength: 4096,
        type: "vision"
      },
      {
        name: "Qwen 2.5 Coder",
        id: "qwen2.5-coder",
        contextLength: 32768
      },
      {
        name: "Gemma 2",
        id: "gemma2",
        contextLength: 8192
      },
      {
        name: "Qwen",
        id: "qwen",
        contextLength: 32768
      },
      {
        name: "Gemma",
        id: "gemma",
        contextLength: 8192
      },
      {
        name: "Qwen 2",
        id: "qwen2",
        contextLength: 32768
      },
      {
        name: "Llama 2",
        id: "llama2",
        contextLength: 4096
      },
      {
        name: "MxBai Embed Large",
        id: "mxbai-embed-large",
        contextLength: 512,
        type: "embedding"
      },
      {
        name: "Phi-3",
        id: "phi3",
        contextLength: 128e3
      },
      {
        name: "Llama 3.2 Vision",
        id: "llama3.2-vision",
        contextLength: 128e3,
        type: "vision"
      },
      {
        name: "CodeLlama",
        id: "codellama",
        contextLength: 16384
      },
      {
        name: "Mistral Nemo",
        id: "mistral-nemo",
        contextLength: 128e3
      },
      {
        name: "TinyLlama",
        id: "tinyllama",
        contextLength: 2048
      },
      {
        name: "MiniCPM-V",
        id: "minicpm-v",
        contextLength: 4096,
        type: "vision"
      },
      {
        name: "QwQ",
        id: "qwq",
        contextLength: 32768,
        type: "reasoning"
      },
      {
        name: "DeepSeek V3",
        id: "deepseek-v3",
        contextLength: 64e3
      },
      {
        name: "Dolphin 3",
        id: "dolphin3",
        contextLength: 32768
      },
      {
        name: "OLMo 2",
        id: "olmo2",
        contextLength: 4096
      },
      {
        name: "BGE M3",
        id: "bge-m3",
        contextLength: 8192,
        type: "embedding"
      },
      {
        name: "Llama 2 Uncensored",
        id: "llama2-uncensored",
        contextLength: 4096
      },
      {
        name: "Mixtral",
        id: "mixtral",
        contextLength: 32768
      },
      {
        name: "StarCoder 2",
        id: "starcoder2",
        contextLength: 16384
      },
      {
        name: "LLaVA Llama 3",
        id: "llava-llama3",
        contextLength: 8192,
        type: "vision"
      },
      {
        name: "Mistral Small",
        id: "mistral-small",
        contextLength: 32768
      },
      {
        name: "SmolLM 2",
        id: "smollm2",
        contextLength: 8192
      },
      {
        name: "DeepSeek Coder V2",
        id: "deepseek-coder-v2",
        contextLength: 163840
      },
      {
        name: "DeepSeek Coder",
        id: "deepseek-coder",
        contextLength: 16384
      },
      {
        name: "Snowflake Arctic Embed",
        id: "snowflake-arctic-embed",
        contextLength: 512,
        type: "embedding"
      },
      {
        name: "CodeGemma",
        id: "codegemma",
        contextLength: 8192
      },
      {
        name: "Dolphin Mixtral",
        id: "dolphin-mixtral",
        contextLength: 32768
      },
      {
        name: "Phi-2",
        id: "phi",
        contextLength: 2048
      },
      {
        name: "All MiniLM",
        id: "all-minilm",
        contextLength: 512,
        type: "embedding"
      },
      {
        name: "OpenThinker",
        id: "openthinker",
        contextLength: 32768,
        type: "reasoning"
      },
      {
        name: "WizardLM 2",
        id: "wizardlm2",
        contextLength: 65536
      },
      {
        name: "Dolphin Mistral",
        id: "dolphin-mistral",
        contextLength: 32768
      },
      {
        name: "Orca Mini",
        id: "orca-mini",
        contextLength: 2048
      },
      {
        name: "Dolphin Llama 3",
        id: "dolphin-llama3",
        contextLength: 8192
      },
      {
        name: "Codestral",
        id: "codestral",
        contextLength: 32768
      },
      {
        name: "Command R",
        id: "command-r",
        contextLength: 128e3
      },
      {
        name: "Hermes 3",
        id: "hermes3",
        contextLength: 128e3
      },
      {
        name: "Phi-3.5",
        id: "phi3.5",
        contextLength: 128e3
      },
      {
        name: "Yi",
        id: "yi",
        contextLength: 4096
      },
      {
        name: "SmolLM",
        id: "smollm",
        contextLength: 8192
      }
    ]
  }
];
const LANGUAGE_PROVIDERS = LANGUAGE_MODELS.map((p) => p.provider.toLocaleLowerCase());
const jsonBodySerializer = {
  bodySerializer: (body) => JSON.stringify(
    body,
    (_key, value) => typeof value === "bigint" ? value.toString() : value
  )
};
const createSseClient = ({
  onRequest,
  onSseError,
  onSseEvent,
  responseTransformer,
  responseValidator,
  sseDefaultRetryDelay,
  sseMaxRetryAttempts,
  sseMaxRetryDelay,
  sseSleepFn,
  url,
  ...options
}) => {
  let lastEventId;
  const sleep = sseSleepFn ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
  const createStream = async function* () {
    let retryDelay = sseDefaultRetryDelay ?? 3e3;
    let attempt = 0;
    const signal = options.signal ?? new AbortController().signal;
    while (true) {
      if (signal.aborted) break;
      attempt++;
      const headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
      if (lastEventId !== void 0) {
        headers.set("Last-Event-ID", lastEventId);
      }
      try {
        const requestInit = {
          redirect: "follow",
          ...options,
          body: options.serializedBody,
          headers,
          signal
        };
        let request = new Request(url, requestInit);
        if (onRequest) {
          request = await onRequest(url, requestInit);
        }
        const _fetch = options.fetch ?? globalThis.fetch;
        const response = await _fetch(request);
        if (!response.ok)
          throw new Error(
            `SSE failed: ${response.status} ${response.statusText}`
          );
        if (!response.body) throw new Error("No body in SSE response");
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        let buffer = "";
        const abortHandler = () => {
          try {
            reader.cancel();
          } catch {
          }
        };
        signal.addEventListener("abort", abortHandler);
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += value;
            const chunks = buffer.split("\n\n");
            buffer = chunks.pop() ?? "";
            for (const chunk of chunks) {
              const lines = chunk.split("\n");
              const dataLines = [];
              let eventName;
              for (const line of lines) {
                if (line.startsWith("data:")) {
                  dataLines.push(line.replace(/^data:\s*/, ""));
                } else if (line.startsWith("event:")) {
                  eventName = line.replace(/^event:\s*/, "");
                } else if (line.startsWith("id:")) {
                  lastEventId = line.replace(/^id:\s*/, "");
                } else if (line.startsWith("retry:")) {
                  const parsed = Number.parseInt(
                    line.replace(/^retry:\s*/, ""),
                    10
                  );
                  if (!Number.isNaN(parsed)) {
                    retryDelay = parsed;
                  }
                }
              }
              let data;
              let parsedJson = false;
              if (dataLines.length) {
                const rawData = dataLines.join("\n");
                try {
                  data = JSON.parse(rawData);
                  parsedJson = true;
                } catch {
                  data = rawData;
                }
              }
              if (parsedJson) {
                if (responseValidator) {
                  await responseValidator(data);
                }
                if (responseTransformer) {
                  data = await responseTransformer(data);
                }
              }
              onSseEvent?.({
                data,
                event: eventName,
                id: lastEventId,
                retry: retryDelay
              });
              if (dataLines.length) {
                yield data;
              }
            }
          }
        } finally {
          signal.removeEventListener("abort", abortHandler);
          reader.releaseLock();
        }
        break;
      } catch (error) {
        onSseError?.(error);
        if (sseMaxRetryAttempts !== void 0 && attempt >= sseMaxRetryAttempts) {
          break;
        }
        const backoff = Math.min(
          retryDelay * 2 ** (attempt - 1),
          sseMaxRetryDelay ?? 3e4
        );
        await sleep(backoff);
      }
    }
  };
  const stream = createStream();
  return { stream };
};
const separatorArrayExplode = (style) => {
  switch (style) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
const separatorArrayNoExplode = (style) => {
  switch (style) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
};
const separatorObjectExplode = (style) => {
  switch (style) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
const serializeArrayParam = ({
  allowReserved,
  explode,
  name,
  style,
  value
}) => {
  if (!explode) {
    const joinedValues2 = (allowReserved ? value : value.map((v) => encodeURIComponent(v))).join(separatorArrayNoExplode(style));
    switch (style) {
      case "label":
        return `.${joinedValues2}`;
      case "matrix":
        return `;${name}=${joinedValues2}`;
      case "simple":
        return joinedValues2;
      default:
        return `${name}=${joinedValues2}`;
    }
  }
  const separator = separatorArrayExplode(style);
  const joinedValues = value.map((v) => {
    if (style === "label" || style === "simple") {
      return allowReserved ? v : encodeURIComponent(v);
    }
    return serializePrimitiveParam({
      allowReserved,
      name,
      value: v
    });
  }).join(separator);
  return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
};
const serializePrimitiveParam = ({
  allowReserved,
  name,
  value
}) => {
  if (value === void 0 || value === null) {
    return "";
  }
  if (typeof value === "object") {
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these."
    );
  }
  return `${name}=${allowReserved ? value : encodeURIComponent(value)}`;
};
const serializeObjectParam = ({
  allowReserved,
  explode,
  name,
  style,
  value,
  valueOnly
}) => {
  if (value instanceof Date) {
    return valueOnly ? value.toISOString() : `${name}=${value.toISOString()}`;
  }
  if (style !== "deepObject" && !explode) {
    let values = [];
    Object.entries(value).forEach(([key, v]) => {
      values = [
        ...values,
        key,
        allowReserved ? v : encodeURIComponent(v)
      ];
    });
    const joinedValues2 = values.join(",");
    switch (style) {
      case "form":
        return `${name}=${joinedValues2}`;
      case "label":
        return `.${joinedValues2}`;
      case "matrix":
        return `;${name}=${joinedValues2}`;
      default:
        return joinedValues2;
    }
  }
  const separator = separatorObjectExplode(style);
  const joinedValues = Object.entries(value).map(
    ([key, v]) => serializePrimitiveParam({
      allowReserved,
      name: style === "deepObject" ? `${name}[${key}]` : key,
      value: v
    })
  ).join(separator);
  return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
};
const PATH_PARAM_RE = /\{[^{}]+\}/g;
const defaultPathSerializer = ({ path, url: _url }) => {
  let url = _url;
  const matches = _url.match(PATH_PARAM_RE);
  if (matches) {
    for (const match of matches) {
      let explode = false;
      let name = match.substring(1, match.length - 1);
      let style = "simple";
      if (name.endsWith("*")) {
        explode = true;
        name = name.substring(0, name.length - 1);
      }
      if (name.startsWith(".")) {
        name = name.substring(1);
        style = "label";
      } else if (name.startsWith(";")) {
        name = name.substring(1);
        style = "matrix";
      }
      const value = path[name];
      if (value === void 0 || value === null) {
        continue;
      }
      if (Array.isArray(value)) {
        url = url.replace(
          match,
          serializeArrayParam({ explode, name, style, value })
        );
        continue;
      }
      if (typeof value === "object") {
        url = url.replace(
          match,
          serializeObjectParam({
            explode,
            name,
            style,
            value,
            valueOnly: true
          })
        );
        continue;
      }
      if (style === "matrix") {
        url = url.replace(
          match,
          `;${serializePrimitiveParam({
            name,
            value
          })}`
        );
        continue;
      }
      const replaceValue = encodeURIComponent(
        style === "label" ? `.${value}` : value
      );
      url = url.replace(match, replaceValue);
    }
  }
  return url;
};
const getUrl = ({
  baseUrl: baseUrl2,
  path,
  query,
  querySerializer,
  url: _url
}) => {
  const pathUrl = _url.startsWith("/") ? _url : `/${_url}`;
  let url = (baseUrl2 ?? "") + pathUrl;
  if (path) {
    url = defaultPathSerializer({ path, url });
  }
  let search = query ? querySerializer(query) : "";
  if (search.startsWith("?")) {
    search = search.substring(1);
  }
  if (search) {
    url += `?${search}`;
  }
  return url;
};
function getValidRequestBody(options) {
  const hasBody = options.body !== void 0;
  const isSerializedBody = hasBody && options.bodySerializer;
  if (isSerializedBody) {
    if ("serializedBody" in options) {
      const hasSerializedBody = options.serializedBody !== void 0 && options.serializedBody !== "";
      return hasSerializedBody ? options.serializedBody : null;
    }
    return options.body !== "" ? options.body : null;
  }
  if (hasBody) {
    return options.body;
  }
  return void 0;
}
const getAuthToken = async (auth, callback) => {
  const token = typeof callback === "function" ? await callback(auth) : callback;
  if (!token) {
    return;
  }
  if (auth.scheme === "bearer") {
    return `Bearer ${token}`;
  }
  if (auth.scheme === "basic") {
    return `Basic ${btoa(token)}`;
  }
  return token;
};
const createQuerySerializer = ({
  parameters = {},
  ...args
} = {}) => {
  const querySerializer = (queryParams) => {
    const search = [];
    if (queryParams && typeof queryParams === "object") {
      for (const name in queryParams) {
        const value = queryParams[name];
        if (value === void 0 || value === null) {
          continue;
        }
        const options = parameters[name] || args;
        if (Array.isArray(value)) {
          const serializedArray = serializeArrayParam({
            allowReserved: options.allowReserved,
            explode: true,
            name,
            style: "form",
            value,
            ...options.array
          });
          if (serializedArray) search.push(serializedArray);
        } else if (typeof value === "object") {
          const serializedObject = serializeObjectParam({
            allowReserved: options.allowReserved,
            explode: true,
            name,
            style: "deepObject",
            value,
            ...options.object
          });
          if (serializedObject) search.push(serializedObject);
        } else {
          const serializedPrimitive = serializePrimitiveParam({
            allowReserved: options.allowReserved,
            name,
            value
          });
          if (serializedPrimitive) search.push(serializedPrimitive);
        }
      }
    }
    return search.join("&");
  };
  return querySerializer;
};
const getParseAs = (contentType) => {
  if (!contentType) {
    return "stream";
  }
  const cleanContent = contentType.split(";")[0]?.trim();
  if (!cleanContent) {
    return;
  }
  if (cleanContent.startsWith("application/json") || cleanContent.endsWith("+json")) {
    return "json";
  }
  if (cleanContent === "multipart/form-data") {
    return "formData";
  }
  if (["application/", "audio/", "image/", "video/"].some(
    (type) => cleanContent.startsWith(type)
  )) {
    return "blob";
  }
  if (cleanContent.startsWith("text/")) {
    return "text";
  }
  return;
};
const checkForExistence = (options, name) => {
  if (!name) {
    return false;
  }
  if (options.headers.has(name) || options.query?.[name] || options.headers.get("Cookie")?.includes(`${name}=`)) {
    return true;
  }
  return false;
};
const setAuthParams = async ({
  security,
  ...options
}) => {
  for (const auth of security) {
    if (checkForExistence(options, auth.name)) {
      continue;
    }
    const token = await getAuthToken(auth, options.auth);
    if (!token) {
      continue;
    }
    const name = auth.name ?? "Authorization";
    switch (auth.in) {
      case "query":
        if (!options.query) {
          options.query = {};
        }
        options.query[name] = token;
        break;
      case "cookie":
        options.headers.append("Cookie", `${name}=${token}`);
        break;
      case "header":
      default:
        options.headers.set(name, token);
        break;
    }
  }
};
const buildUrl = (options) => getUrl({
  baseUrl: options.baseUrl,
  path: options.path,
  query: options.query,
  querySerializer: typeof options.querySerializer === "function" ? options.querySerializer : createQuerySerializer(options.querySerializer),
  url: options.url
});
const mergeConfigs = (a, b) => {
  const config = { ...a, ...b };
  if (config.baseUrl?.endsWith("/")) {
    config.baseUrl = config.baseUrl.substring(0, config.baseUrl.length - 1);
  }
  config.headers = mergeHeaders(a.headers, b.headers);
  return config;
};
const headersEntries = (headers) => {
  const entries = [];
  headers.forEach((value, key) => {
    entries.push([key, value]);
  });
  return entries;
};
const mergeHeaders = (...headers) => {
  const mergedHeaders = new Headers();
  for (const header of headers) {
    if (!header) {
      continue;
    }
    const iterator = header instanceof Headers ? headersEntries(header) : Object.entries(header);
    for (const [key, value] of iterator) {
      if (value === null) {
        mergedHeaders.delete(key);
      } else if (Array.isArray(value)) {
        for (const v of value) {
          mergedHeaders.append(key, v);
        }
      } else if (value !== void 0) {
        mergedHeaders.set(
          key,
          typeof value === "object" ? JSON.stringify(value) : value
        );
      }
    }
  }
  return mergedHeaders;
};
class Interceptors {
  fns = [];
  clear() {
    this.fns = [];
  }
  eject(id) {
    const index = this.getInterceptorIndex(id);
    if (this.fns[index]) {
      this.fns[index] = null;
    }
  }
  exists(id) {
    const index = this.getInterceptorIndex(id);
    return Boolean(this.fns[index]);
  }
  getInterceptorIndex(id) {
    if (typeof id === "number") {
      return this.fns[id] ? id : -1;
    }
    return this.fns.indexOf(id);
  }
  update(id, fn) {
    const index = this.getInterceptorIndex(id);
    if (this.fns[index]) {
      this.fns[index] = fn;
      return id;
    }
    return false;
  }
  use(fn) {
    this.fns.push(fn);
    return this.fns.length - 1;
  }
}
const createInterceptors = () => ({
  error: new Interceptors(),
  request: new Interceptors(),
  response: new Interceptors()
});
const defaultQuerySerializer = createQuerySerializer({
  allowReserved: false,
  array: {
    explode: true,
    style: "form"
  },
  object: {
    explode: true,
    style: "deepObject"
  }
});
const defaultHeaders = {
  "Content-Type": "application/json"
};
const createConfig = (override = {}) => ({
  ...jsonBodySerializer,
  headers: defaultHeaders,
  parseAs: "auto",
  querySerializer: defaultQuerySerializer,
  ...override
});
const createClient = (config = {}) => {
  let _config = mergeConfigs(createConfig(), config);
  const getConfig = () => ({ ..._config });
  const setConfig = (config2) => {
    _config = mergeConfigs(_config, config2);
    return getConfig();
  };
  const interceptors = createInterceptors();
  const beforeRequest = async (options) => {
    const opts = {
      ..._config,
      ...options,
      fetch: options.fetch ?? _config.fetch ?? globalThis.fetch,
      headers: mergeHeaders(_config.headers, options.headers),
      serializedBody: void 0
    };
    if (opts.security) {
      await setAuthParams({
        ...opts,
        security: opts.security
      });
    }
    if (opts.requestValidator) {
      await opts.requestValidator(opts);
    }
    if (opts.body !== void 0 && opts.bodySerializer) {
      opts.serializedBody = opts.bodySerializer(opts.body);
    }
    if (opts.body === void 0 || opts.serializedBody === "") {
      opts.headers.delete("Content-Type");
    }
    const url = buildUrl(opts);
    return { opts, url };
  };
  const request = async (options) => {
    const { opts, url } = await beforeRequest(options);
    const requestInit = {
      redirect: "follow",
      ...opts,
      body: getValidRequestBody(opts)
    };
    let request2 = new Request(url, requestInit);
    for (const fn of interceptors.request.fns) {
      if (fn) {
        request2 = await fn(request2, opts);
      }
    }
    const _fetch = opts.fetch;
    let response;
    try {
      response = await _fetch(request2);
    } catch (error2) {
      let finalError2 = error2;
      for (const fn of interceptors.error.fns) {
        if (fn) {
          finalError2 = await fn(
            error2,
            void 0,
            request2,
            opts
          );
        }
      }
      finalError2 = finalError2 || {};
      if (opts.throwOnError) {
        throw finalError2;
      }
      return opts.responseStyle === "data" ? void 0 : {
        error: finalError2,
        request: request2,
        response: void 0
      };
    }
    for (const fn of interceptors.response.fns) {
      if (fn) {
        response = await fn(response, request2, opts);
      }
    }
    const result = {
      request: request2,
      response
    };
    if (response.ok) {
      const parseAs = (opts.parseAs === "auto" ? getParseAs(response.headers.get("Content-Type")) : opts.parseAs) ?? "json";
      if (response.status === 204 || response.headers.get("Content-Length") === "0") {
        let emptyData;
        switch (parseAs) {
          case "arrayBuffer":
          case "blob":
          case "text":
            emptyData = await response[parseAs]();
            break;
          case "formData":
            emptyData = new FormData();
            break;
          case "stream":
            emptyData = response.body;
            break;
          case "json":
          default:
            emptyData = {};
            break;
        }
        return opts.responseStyle === "data" ? emptyData : {
          data: emptyData,
          ...result
        };
      }
      let data;
      switch (parseAs) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          data = await response[parseAs]();
          break;
        case "stream":
          return opts.responseStyle === "data" ? response.body : {
            data: response.body,
            ...result
          };
      }
      if (parseAs === "json") {
        if (opts.responseValidator) {
          await opts.responseValidator(data);
        }
        if (opts.responseTransformer) {
          data = await opts.responseTransformer(data);
        }
      }
      return opts.responseStyle === "data" ? data : {
        data,
        ...result
      };
    }
    const textError = await response.text();
    let jsonError;
    try {
      jsonError = JSON.parse(textError);
    } catch {
    }
    const error = jsonError ?? textError;
    let finalError = error;
    for (const fn of interceptors.error.fns) {
      if (fn) {
        finalError = await fn(error, response, request2, opts);
      }
    }
    finalError = finalError || {};
    if (opts.throwOnError) {
      throw finalError;
    }
    return opts.responseStyle === "data" ? void 0 : {
      error: finalError,
      ...result
    };
  };
  const makeMethodFn = (method) => (options) => request({ ...options, method });
  const makeSseFn = (method) => async (options) => {
    const { opts, url } = await beforeRequest(options);
    return createSseClient({
      ...opts,
      body: opts.body,
      headers: opts.headers,
      method,
      onRequest: async (url2, init) => {
        let request2 = new Request(url2, init);
        for (const fn of interceptors.request.fns) {
          if (fn) {
            request2 = await fn(request2, opts);
          }
        }
        return request2;
      },
      url
    });
  };
  return {
    buildUrl,
    connect: makeMethodFn("CONNECT"),
    delete: makeMethodFn("DELETE"),
    get: makeMethodFn("GET"),
    getConfig,
    head: makeMethodFn("HEAD"),
    interceptors,
    options: makeMethodFn("OPTIONS"),
    patch: makeMethodFn("PATCH"),
    post: makeMethodFn("POST"),
    put: makeMethodFn("PUT"),
    request,
    setConfig,
    sse: {
      connect: makeSseFn("CONNECT"),
      delete: makeSseFn("DELETE"),
      get: makeSseFn("GET"),
      head: makeSseFn("HEAD"),
      options: makeSseFn("OPTIONS"),
      patch: makeSseFn("PATCH"),
      post: makeSseFn("POST"),
      put: makeSseFn("PUT"),
      trace: makeSseFn("TRACE")
    },
    trace: makeMethodFn("TRACE")
  };
};
const baseUrl = "https://qwksearch.com/api";
const createClientConfig = (config) => ({
  ...config,
  baseUrl
});
const client = createClient(createClientConfig(createConfig()));
const extractContent = (options) => (options.client ?? client).get({ url: "/extract", ...options });
const writeLanguage = (options) => (options.client ?? client).post({
  url: "/agents",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
const searchWeb = (options) => (options.client ?? client).get({ url: "/search", ...options });
const QWKSEARCH_CONFIG = {
  baseURL: typeof process !== "undefined" && process?.env.QWKSEARCH_URL || "https://api.qwksearch.com",
  apiKey: typeof process !== "undefined" && process?.env.QWKSEARCH_API_KEY || null
};
const AGENT_TOOLS = [
  {
    name: "web_search",
    description: "Search the web for information on any topic using QwkSearch API. Input: search query string and optional category. Returns relevant search results with titles, descriptions, and URLs from 100+ sources via SearXNG metasearch engine.",
    schema: z.object({
      query: z.string(),
      category: z.enum(["general", "news", "videos", "images", "science", "files", "it"]).optional().default("general"),
      recency: z.enum(["none", "day", "week", "month", "year"]).optional().default("none"),
      page: z.number().optional().default(1),
      language: z.string().optional().default("en-US"),
      public: z.boolean().optional().default(false),
      timeout: z.number().optional().default(10),
      baseURL: z.string().optional(),
      apiKey: z.string().optional()
    }),
    func: async ({ query, category = "general", recency = "none", page = 1, language = "en-US", public: isPublic = false, timeout = 10, baseURL, apiKey }) => {
      try {
        const config = {
          baseURL: baseURL || QWKSEARCH_CONFIG.baseURL,
          apiKey: apiKey || QWKSEARCH_CONFIG.apiKey
        };
        const result = await searchWeb({
          query: {
            q: query,
            cat: category,
            recency,
            page,
            lang: language,
            public: isPublic,
            timeout
          },
          config
        });
        if (!result.data || !result.data.results || result.data.results.length === 0) {
          return `No search results found for "${query}". Please try a different search term.`;
        }
        let resultText = `Web search results for "${query}" (${category} category):

`;
        result.data.results.forEach((searchResult, index) => {
          resultText += `${index + 1}. ${searchResult.title}
`;
          resultText += `   URL: ${searchResult.url}
`;
          if (searchResult.domain) {
            resultText += `   Domain: ${searchResult.domain}
`;
          }
          if (searchResult.snippet) {
            resultText += `   Description: ${searchResult.snippet}
`;
          }
          if (searchResult.engines && searchResult.engines.length > 0) {
            resultText += `   Sources: ${searchResult.engines.join(", ")}
`;
          }
          resultText += `
`;
        });
        resultText += `Found ${result.data.results.length} results from multiple search engines. This is the complete search information.`;
        return resultText;
      } catch (error) {
        return `Unable to perform web search for "${query}". Error: ${error.message}`;
      }
    }
  },
  {
    name: "extract_page",
    description: "Extract and summarize content from a web page using QwkSearch API. Supports articles, PDFs, and YouTube videos. Uses Mozilla Readability and Postlight Mercury algorithms with 100+ custom adapters for major sites. Input: URL of the page to extract. Returns structured content with citation information.",
    schema: z.object({
      url: z.string().url(),
      images: z.boolean().optional().default(true),
      links: z.boolean().optional().default(true),
      formatting: z.boolean().optional().default(true),
      absoluteURLs: z.boolean().optional().default(true),
      timeout: z.number().min(1).max(30).optional().default(10),
      baseURL: z.string().optional(),
      apiKey: z.string().optional()
    }),
    func: async ({ url, images = true, links = true, formatting = true, absoluteURLs = true, timeout = 10, baseURL, apiKey }) => {
      try {
        const config = {
          baseURL: baseURL || QWKSEARCH_CONFIG.baseURL,
          apiKey: apiKey || QWKSEARCH_CONFIG.apiKey
        };
        const result = await extractContent({
          query: {
            url,
            images,
            links,
            formatting,
            absoluteURLs,
            timeout
          },
          config
        });
        if (!result.data) {
          return `No content could be extracted from "${url}". Please check the URL and try again.`;
        }
        const data = result.data;
        let resultText = `Content extracted from: ${data.url || url}

`;
        if (data.title) {
          resultText += `Title: ${data.title}

`;
        }
        if (data.author) {
          resultText += `Author: ${data.author}
`;
          if (data.author_cite) {
            resultText += `Author (Citation Format): ${data.author_cite}
`;
          }
          if (data.author_type) {
            resultText += `Author Type: ${data.author_type}
`;
          }
        }
        if (data.date) {
          resultText += `Publication Date: ${data.date}
`;
        }
        if (data.source) {
          resultText += `Source: ${data.source}
`;
        }
        if (data.word_count) {
          resultText += `Word Count: ${data.word_count}
`;
        }
        if (data.cite) {
          resultText += `
Citation (APA Format): ${data.cite}
`;
        }
        if (data.html) {
          resultText += `
Content:
${data.html}

`;
        }
        resultText += `This is the complete page extraction information.`;
        return resultText;
      } catch (error) {
        return `Unable to extract content from "${url}". Error: ${error.message}`;
      }
    }
  },
  {
    name: "generate_ai_response",
    description: "Generate AI language model responses using QwkSearch API with various agent templates. Supports multiple providers (Groq, OpenAI, Anthropic, etc.) and agent types for different tasks like summarization, question answering, and content generation.",
    schema: z.object({
      provider: z.enum(["groq", "openai", "anthropic", "together", "xai", "google", "perplexity", "ollama", "cloudflare"]),
      key: z.string().optional(),
      agent: z.enum([
        "question",
        "summarize-bullets",
        "summarize",
        "suggest-followups",
        "answer-cite-sources",
        "query-resolution",
        "knowledge-graph-nodes",
        "summary-longtext"
      ]).optional().default("question"),
      model: z.string().optional().default("meta-llama/llama-4-maverick-17b-128e-instruct"),
      temperature: z.number().min(0).max(2).optional().default(0.7),
      html: z.boolean().optional().default(true),
      query: z.string().optional(),
      chat_history: z.string().optional(),
      article: z.string().optional(),
      baseURL: z.string().optional(),
      apiKey: z.string().optional()
    }),
    func: async ({ provider, key, agent = "question", model = "meta-llama/llama-4-maverick-17b-128e-instruct", temperature = 0.7, html = true, query, chat_history, article, baseURL, apiKey }) => {
      try {
        const config = {
          baseURL: baseURL || QWKSEARCH_CONFIG.baseURL,
          apiKey: apiKey || QWKSEARCH_CONFIG.apiKey
        };
        const requestBody = {
          agent,
          provider,
          model,
          html,
          temperature
        };
        if (key) {
          requestBody.key = key;
        }
        if (query) {
          requestBody.query = query;
        }
        if (chat_history) {
          requestBody.chat_history = chat_history;
        }
        if (article) {
          requestBody.article = article;
        }
        const result = await writeLanguage({
          body: requestBody,
          config
        });
        if (!result.data) {
          return `No response generated. Please check your input parameters and try again.`;
        }
        let resultText = `AI Response (${agent} agent, ${provider} provider):

`;
        if (result.data.content) {
          resultText += result.data.content;
        }
        if (result.data.extract) {
          resultText += `

Structured Extract:
${JSON.stringify(result.data.extract, null, 2)}`;
        }
        resultText += `

This is the complete AI-generated response.`;
        return resultText;
      } catch (error) {
        return `Unable to generate AI response. Error: ${error.message}`;
      }
    }
  }
];
function convertMathLaTexToImage(html) {
  try {
    const replacedHtml = html.replace(
      /<math>(.*?)<\/math>|\[document.*?\[\/document>/gs,
      (match, p1) => {
        const curlyBracesContent = p1.match(/{([^}]*)}(?!.*})/) ?? [];
        const documentClassContent = p1.match(
          /\[document.*?\[\/document>/gs
        ) ?? [];
        if (!curlyBracesContent && !documentClassContent) return match;
        var equationFormula = curlyBracesContent[0] ?? documentClassContent[0];
        equationFormula = equationFormula?.replace(/\\/g, "\\").replace(/\[documentclass.*?\[/g, "").replace(/\[\/document>/g, "").replace(/\[.+\]/g, "");
        var htmlEquation = katex.renderToString(equationFormula, {
          throwOnError: false,
          output: "html",
          displayMode: false,
          strict: false
        });
        return htmlEquation;
      }
    );
    return replacedHtml;
  } catch (e) {
    console.log(e);
    return html;
  }
}
function convertURLSafeHTMLToHTML(str, toStandardHTML = true) {
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    " ": "&nbsp;",
    "'": "&#39;",
    "`": "&#96;",
    "¢": "&cent;",
    "£": "&pound;",
    "¥": "&yen;",
    "€": "&euro;",
    "©": "&copy;",
    "®": "&reg;",
    "™": "&trade;"
  };
  for (let i = 160; i <= 255; i++) {
    entityMap[String.fromCharCode(i)] = `&#${i};`;
  }
  if (toStandardHTML) {
    const reverseEntityMap = Object.fromEntries(
      Object.entries(entityMap).map(([k, v]) => [v, k])
    );
    reverseEntityMap["&apos;"] = "'";
    reverseEntityMap["&laquo;"] = "«";
    reverseEntityMap["&raquo;"] = "»";
    const entityRegex = new RegExp(
      Object.keys(reverseEntityMap).join("|") + "|&#[0-9]+;|&#x[0-9a-fA-F]+;",
      "g"
    );
    str = str.replace(entityRegex, (entity) => {
      if (entity.startsWith("&#x")) {
        return String.fromCharCode(parseInt(entity.slice(3, -1), 16));
      } else if (entity.startsWith("&#")) {
        return String.fromCharCode(parseInt(entity.slice(2, -1), 10));
      }
      return reverseEntityMap[entity] || entity;
    });
    str = str.replace(/[\u0300-\u036f]/g, "");
    return str;
  } else {
    const charRegex = new RegExp(`[${Object.keys(entityMap).join("")}]`, "g");
    return str.replace(charRegex, (char) => entityMap[char]);
  }
}
function convertMarkdownToHTML(content, toHtml = true) {
  if (!toHtml) return convertHTMLToMarkdown(content);
  marked.setOptions({
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: "hljs language-"
  });
  return content?.length ? marked.parse(content) : "";
}
function convertHTMLToMarkdown(html) {
  var markdown = html.replace(/<h([1-6])>(.*?)<\/h[1-6]>/g, (match, level, content) => {
    return "#".repeat(parseInt(level)) + " " + content.trim() + "\n\n";
  }).replace(/<strong>(.*?)<\/strong>/g, "**$1**").replace(/<b>(.*?)<\/b>/g, "**$1**").replace(/<em>(.*?)<\/em>/g, "*$1*").replace(/<ul>(.*?)<\/ul>/gs, (match, content) => {
    return content.replace(/<li>(.*?)<\/li>/g, "* $1\n") + "\n";
  }).replace(/<ol>(.*?)<\/ol>/gs, (match, content) => {
    let index = 1;
    return content.replace(/<li>(.*?)<\/li>/g, () => `${index++}. $1
`) + "\n";
  }).replace(/<p>(.*?)<\/p>/g, "$1\n\n").replace(/<img src="(.*?)" alt="(.*?)".*?\/>/g, "![$2]($1)").replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)").replace(/<[^>]*>/g, "").trim();
  return markdown;
}
var MIN_DATE = new Date(2002, 0, 0, 1);
const LOGGER$2 = { debug: () => {
}, log: () => {
}, error: () => {
} };
function is_valid_date(date_input, outputformat, earliest, latest) {
  if (date_input === null) {
    return false;
  }
  if (!earliest || !earliest.getFullYear)
    earliest = new Date(2002, 0, 0, 1);
  if (!latest)
    latest = /* @__PURE__ */ new Date();
  let dateobject;
  if (date_input instanceof Date) {
    dateobject = date_input;
  } else {
    try {
      if (outputformat === "YYYY-MM-DD") {
        dateobject = new Date(date_input.slice(0, 4), date_input.slice(5, 7) - 1, date_input.slice(8, 10));
      } else {
        dateobject = new Date(date_input);
      }
    } catch (error) {
      return false;
    }
  }
  if (earliest.getFullYear() <= dateobject.getFullYear() && dateobject.getFullYear() <= latest.getFullYear() && earliest.getTime() <= dateobject.getTime() && dateobject.getTime() <= latest.getTime()) {
    return true;
  }
  LOGGER$2.debug(`date not valid: ${date_input}`);
  return false;
}
function is_valid_format(outputformat) {
  var dateobject = new Date(2017, 8, 1, 0, 0);
  try {
    dateobject.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
  } catch (err) {
    LOGGER$2.error(`wrong output format or type: ${outputformat} ${err}`);
    return false;
  }
  if (typeof outputformat !== "string" || !outputformat.includes("%")) {
    LOGGER$2.error(`malformed output format: ${outputformat}`);
    return false;
  }
  return true;
}
function plausible_year_filter(htmlstring, pattern, yearpat, earliest, latest, incomplete = false) {
  var occurrences = /* @__PURE__ */ new Map();
  if (!htmlstring)
    return occurrences;
  var matches = htmlstring.match(new RegExp(pattern, "g")) || [];
  matches.forEach((item2) => {
    var count2 = occurrences.get(item2) || 0;
    occurrences.set(item2, count2 + 1);
  });
  for (var [item, count] of occurrences) {
    var year_match = item.match(yearpat);
    if (!year_match) {
      LOGGER$2.debug(`not a year pattern: ${item}`);
      occurrences.delete(item);
      continue;
    }
    var lastdigits = year_match[1];
    let potential_year;
    if (!incomplete) {
      potential_year = parseInt(lastdigits);
    } else {
      var century = lastdigits[0] === "9" ? "19" : "20";
      potential_year = parseInt(century + lastdigits);
    }
    if (!(earliest.getFullYear() <= potential_year && potential_year <= latest.getFullYear())) {
      LOGGER$2.debug(`no potential year: ${item}`);
      occurrences.delete(item);
    }
  }
  return occurrences;
}
function compare_values(reference, attempt, options) {
  try {
    var timestamp = new Date(attempt).getTime() / 1e3;
    if (options.original) {
      reference = reference ? Math.min(reference, timestamp) : timestamp;
    } else {
      reference = Math.max(reference, timestamp);
    }
  } catch (err) {
    LOGGER$2.debug(`Date parsing exception: ${err} for string ${attempt}`);
  }
  return reference;
}
function filter_ymd_candidate(bestmatch, pattern, original_date, copyear, outputformat, min_date, max_date) {
  if (bestmatch) {
    var pagedate = `${bestmatch[1]}-${bestmatch[2]}-${bestmatch[3]}`;
    if (is_valid_date(pagedate, "YYYY-MM-DD", min_date, max_date) && (copyear === 0 || parseInt(bestmatch[1]) >= copyear)) {
      LOGGER$2.debug(`date found for pattern "${pattern}": ${pagedate}`);
      return convert_date(pagedate, "YYYY-MM-DD", outputformat);
    }
  }
  return null;
}
function convert_date(datestring, inputformat, outputformat) {
  if (inputformat === outputformat) {
    return datestring;
  }
  if (datestring instanceof Date) {
    return datestring.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
  }
  var dateobject = new Date(datestring);
  return dateobject.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
}
function check_extracted_reference(reference, options) {
  if (reference > 0) {
    var dateobject = new Date(reference * 1e3);
    var converted = dateobject.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
    if (is_valid_date(converted, options.format, options.min, options.max)) {
      return converted;
    }
  }
  return null;
}
function check_date_input(date_object, default_date) {
  if (date_object instanceof Date) {
    return date_object;
  }
  if (typeof date_object === "string") {
    try {
      return new Date(date_object);
    } catch (error) {
      LOGGER$2.warning(`invalid datetime string: ${date_object}`);
    }
  }
  return default_date;
}
function get_min_date(min_date) {
  return check_date_input(min_date, MIN_DATE);
}
function get_max_date(max_date) {
  return check_date_input(max_date, /* @__PURE__ */ new Date());
}
const LOGGER$1 = { debug: () => {
}, error: () => {
} };
const FAST_PREPEND = "";
const MIN_SEGMENT_LEN = 6;
const MAX_SEGMENT_LEN = 52;
const DATE_EXPRESSIONS = [
  '[id*="date" i]',
  '[class*="date" i]',
  '[itemprop*="date" i]',
  '[id*="datum" i]',
  '[class*="datum" i]',
  '[itemprop*="datum" i]',
  '[id*="meta" i]',
  '[class*="meta" i]',
  '[id*="time" i]',
  '[class*="time" i]',
  '[id*="publish" i]',
  '[class*="publish" i]',
  '[id*="footer" i]',
  '[class*="footer" i]',
  '[class*="info" i]',
  '[class*="post_detail" i]',
  '[class*="block-content" i]',
  '[class*="byline" i]',
  '[class*="subline" i]',
  '[class*="posted" i]',
  '[class*="submitted" i]',
  '[class*="created-post" i]',
  '[class*="publication" i]',
  '[class*="author" i]',
  '[class*="autor" i]',
  '[class*="field-content" i]',
  '[class*="fa-clock-o" i]',
  '[class*="fa-calendar" i]',
  '[class*="fecha" i]',
  '[class*="parution" i]'
].join(",");
const SLOW_PREPEND = "";
const DAY_RE = "[0-3]?[0-9]";
const MONTH_RE = "[0-1]?[0-9]";
const YEAR_RE = "199[0-9]|20[0-3][0-9]";
const THREE_COMP_REGEX_A = new RegExp(`(${DAY_RE})[/.-](${MONTH_RE})[/.-](${YEAR_RE})`);
const TWO_COMP_REGEX = new RegExp(`(${MONTH_RE})[/.-](${YEAR_RE})`);
const YEAR_PATTERN = new RegExp(`^\\D?(${YEAR_RE})`);
const COPYRIGHT_PATTERN = new RegExp(`(?:©|\\&copy;|Copyright|\\(c\\))\\D*(?:${YEAR_RE})?-?(${YEAR_RE})\\D`);
const THREE_PATTERN = new RegExp("/([0-9]{4}/[0-9]{2}/[0-9]{2})[01/]");
const THREE_CATCH = new RegExp("([0-9]{4})/([0-9]{2})/([0-9]{2})");
const THREE_LOOSE_PATTERN = new RegExp("\\D([0-9]{4}[/.-][0-9]{2}[/.-][0-9]{2})\\D");
const THREE_LOOSE_CATCH = new RegExp("([0-9]{4})[/.-]([0-9]{2})[/.-]([0-9]{2})");
const SELECT_YMD_PATTERN = new RegExp("\\D([0-3]?[0-9][/.-][01]?[0-9][/.-][0-9]{4})\\D");
const SELECT_YMD_YEAR = new RegExp(`(${YEAR_RE})\\D?$`);
const DATESTRINGS_PATTERN = new RegExp("\\D(?:19[0-9]{2}|20[0-9]{2})[01][0-9][0-3][0-9]\\D");
const DATESTRINGS_CATCH = new RegExp(`(${YEAR_RE})([01][0-9])([0-3][0-9])`);
const YYYYMM_PATTERN = new RegExp("\\D([12][0-9]{3}[/.-](?:1[0-2]|0[1-9]))\\D");
const YYYYMM_CATCH = new RegExp(`(${YEAR_RE})[/.-](1[0-2]|0[1-9]|)`);
const MMYYYY_PATTERN = new RegExp("\\D([01]?[0-9][/.-][12][0-9]{3})\\D");
const MMYYYY_YEAR = new RegExp(`(${YEAR_RE})\\D?$`);
const SIMPLE_PATTERN = new RegExp(`(?<!w3.org)\\D(${YEAR_RE})\\D`);
const YMD_NO_SEP_PATTERN = /\b(\d{8})\b/;
const YMD_PATTERN = new RegExp(
  `(?:\\D|^)(?:(?<year>${YEAR_RE})[-/.](?<month>${MONTH_RE})[-/.](?<day>${DAY_RE})|(?<day2>${DAY_RE})[-/.](?<month2>${MONTH_RE})[-/.](?<year2>\\d{2,4}))(?:\\D|$)`
);
const YM_PATTERN = new RegExp(
  `(?:\\D|^)(?:(?<year>${YEAR_RE})[-/.](?<month>${MONTH_RE})|(?<month2>${MONTH_RE})[-/.](?<year2>${YEAR_RE}))(?:\\D|$)`
);
const REGEX_MONTHS = `
January?|February?|March|A[pv]ril|Ma[iy]|Jun[ei]|Jul[iy]|August|September|O[ck]tober|November|De[csz]ember|
Jan|Feb|M[aä]r|Apr|Jun|Jul|Aug|Sep|O[ck]t|Nov|De[cz]|
Januari|Februari|Maret|Mei|Agustus|
Jänner|Feber|März|
janvier|février|mars|juin|juillet|aout|septembre|octobre|novembre|décembre|
Ocak|Şubat|Mart|Nisan|Mayıs|Haziran|Temmuz|Ağustos|Eylül|Ekim|Kasım|Aralık|
Oca|Şub|Mar|Nis|Haz|Tem|Ağu|Eyl|Eki|Kas|Ara
`.replace(/\n/g, "");
const LONG_TEXT_PATTERN = new RegExp(
  `(?<month>${REGEX_MONTHS})\\s(?<day>${DAY_RE})(?:st|nd|rd|th)?,? (?<year>${YEAR_RE})|(?<day2>${DAY_RE})(?:st|nd|rd|th|\\.)? (?:of )?(?<month2>${REGEX_MONTHS})[,.]? (?<year2>${YEAR_RE})`,
  "i"
);
const COMPLETE_URL = new RegExp(`\\D(${YEAR_RE})[/_-](${MONTH_RE})[/_-](${DAY_RE})(?:\\D|$)`);
const JSON_MODIFIED = new RegExp(`"dateModified": ?"(${YEAR_RE}-${MONTH_RE}-${DAY_RE})"`, "i");
const TIMESTAMP_PATTERN = new RegExp(`(${YEAR_RE}-${MONTH_RE}-${DAY_RE}).[0-9]{2}:[0-9]{2}:[0-9]{2}`);
const MONTHS = [
  ["jan", "januar", "jänner", "january", "januari", "janvier", "ocak", "oca"],
  ["feb", "februar", "feber", "february", "februari", "février", "şubat", "şub"],
  ["mar", "mär", "märz", "march", "maret", "mart", "mars"],
  ["apr", "april", "avril", "nisan", "nis"],
  ["may", "mai", "mei", "mayıs"],
  ["jun", "juni", "june", "juin", "haziran", "haz"],
  ["jul", "juli", "july", "juillet", "temmuz", "tem"],
  ["aug", "august", "agustus", "ağustos", "ağu", "aout"],
  ["sep", "september", "septembre", "eylül", "eyl"],
  ["oct", "oktober", "october", "octobre", "okt", "ekim", "eki"],
  ["nov", "november", "kasım", "kas", "novembre"],
  ["dec", "dez", "dezember", "december", "desember", "décembre", "aralık", "ara"]
];
const TEXT_MONTHS = {};
MONTHS.forEach((monthList, index) => {
  monthList.forEach((month) => {
    TEXT_MONTHS[month] = index + 1;
  });
});
const TEXT_DATE_PATTERN = /[.:,_/ -]|^\d+$/;
const DISCARD_PATTERNS = new RegExp(
  "^\\d{2}:\\d{2}(?: |:|$)|^\\D*\\d{4}\\D*$|[$€¥Ұ£¢₽₱฿#₹]|[A-Z]{3}[^A-Z]|(?:^|\\D)(?:\\+\\d{2}|\\d{3}|\\d{5})\\D|ftps?|https?|sftp|\\.(?:com|net|org|info|gov|edu|de|fr|io)\\b|IBAN|[A-Z]{2}[0-9]{2}|®"
);
const TEXT_PATTERNS = new RegExp(
  `(?:date[^0-9"]{,20}|updated|published|on)(?:[ :])*?([0-9]{1,4})[./]([0-9]{1,2})[./]([0-9]{2,4})|(?:Datum|Stand|Veröffentlicht am):? ?([0-9]{1,2})\\.([0-9]{1,2})\\.([0-9]{2,4})|(?:güncellen?me|yayı(?:m|n)lan?ma) *?(?:tarihi)? *?:? *?([0-9]{1,2})[./]([0-9]{1,2})[./]([0-9]{2,4})|([0-9]{1,2})[./]([0-9]{1,2})[./]([0-9]{2,4}) *?(?:'de|'da|'te|'ta|'de|'da|'te|'ta|tarihinde) *(?:güncellendi|yayı(?:m|n)landı)`,
  "i"
);
function discard_unwanted(tree) {
  const myDiscarded = [];
  const discardElements = tree.querySelectorAll("#wm-ipp-base, #wm-ipp");
  discardElements.forEach((element) => {
    myDiscarded.push(element);
    element.parentNode.removeChild(element);
  });
  return [tree, myDiscarded];
}
function extract_url_date(testurl, options) {
  if (testurl) {
    const match = COMPLETE_URL.exec(testurl);
    if (match) {
      LOGGER$1.debug(`found date in URL: ${match[0]}`);
      try {
        const dateObject = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
        if (is_valid_date(dateObject, options.format, options.min, options.max)) {
          return dateObject.toISOString().slice(0, 10);
        }
      } catch (err) {
        LOGGER$1.debug(`conversion error: ${match[0]} ${err}`);
      }
    }
  }
  return null;
}
function correct_year(year) {
  if (year < 100) {
    return year + (year >= 90 ? 1900 : 2e3);
  }
  return year;
}
function try_swap_values(day, month) {
  return month > 12 && day <= 12 ? [month, day] : [day, month];
}
function regex_parse(string) {
  const match = LONG_TEXT_PATTERN.exec(string);
  if (!match) {
    return null;
  }
  const groups = match.groups.year ? ["day", "month", "year"] : ["day2", "month2", "year2"];
  try {
    let [day, month, year] = [
      parseInt(match.groups[groups[0]]),
      TEXT_MONTHS[match.groups[groups[1]]?.toLowerCase().replace(/\.$/, "")],
      parseInt(match.groups[groups[2]])
    ];
    year = correct_year(year);
    [day, month] = try_swap_values(day, month);
    const dateObject = new Date(year, month - 1, day);
    LOGGER$1.debug(`multilingual text found: ${dateObject}`);
    return dateObject;
  } catch (err) {
    return null;
  }
}
function custom_parse(string, outputformat, min_date, max_date) {
  if (string.slice(0, 4).match(/^\d{4}$/)) {
    let candidate = null;
    if (string.slice(4, 8).match(/^\d{4}$/)) {
      try {
        candidate = new Date(parseInt(string.slice(0, 4)), parseInt(string.slice(4, 6)) - 1, parseInt(string.slice(6, 8)));
      } catch (err) {
        LOGGER$1.debug(`8-digit error: ${string.slice(0, 8)}`);
      }
    } else {
      try {
        candidate = new Date(string);
      } catch (err) {
        try {
          candidate = new Date(Date.parse(string));
        } catch (err2) {
        }
      }
    }
    if (candidate && is_valid_date(candidate, outputformat, min_date, max_date)) {
      return candidate.toISOString().slice(0, 10);
    }
  }
  const match = YMD_NO_SEP_PATTERN.exec(string);
  if (match) {
    try {
      const [year, month, day] = [parseInt(match[1].slice(0, 4)), parseInt(match[1].slice(4, 6)), parseInt(match[1].slice(6, 8))];
      const candidate = new Date(year, month - 1, day);
      if (is_valid_date(candidate, "%Y-%m-%d", min_date, max_date)) {
        LOGGER$1.debug(`YYYYMMDD match: ${candidate}`);
        return candidate.toISOString().slice(0, 10);
      }
    } catch (err) {
      LOGGER$1.debug(`YYYYMMDD value error: ${match[0]}`);
    }
  }
  const ymdMatch = YMD_PATTERN.exec(string);
  if (ymdMatch) {
    try {
      let year, month, day;
      if (ymdMatch.groups.day) {
        [year, month, day] = [parseInt(ymdMatch.groups.year), parseInt(ymdMatch.groups.month), parseInt(ymdMatch.groups.day)];
      } else {
        [day, month, year] = [parseInt(ymdMatch.groups.day2), parseInt(ymdMatch.groups.month2), parseInt(ymdMatch.groups.year2)];
        year = correct_year(year);
        [day, month] = try_swap_values(day, month);
      }
      const candidate = new Date(year, month - 1, day);
      if (is_valid_date(candidate, "%Y-%m-%d", min_date, max_date)) {
        LOGGER$1.debug(`regex match: ${candidate}`);
        return candidate.toISOString().slice(0, 10);
      }
    } catch (err) {
      LOGGER$1.debug(`regex value error: ${ymdMatch[0]}`);
    }
  }
  const ymMatch = YM_PATTERN.exec(string);
  if (ymMatch) {
    try {
      let year, month;
      if (ymMatch.groups.month) {
        [year, month] = [parseInt(ymMatch.groups.year), parseInt(ymMatch.groups.month)];
      } else {
        [year, month] = [parseInt(ymMatch.groups.year2), parseInt(ymMatch.groups.month2)];
      }
      const candidate = new Date(year, month - 1, 1);
      if (is_valid_date(candidate, "%Y-%m-%d", min_date, max_date)) {
        LOGGER$1.debug(`Y-M match: ${candidate}`);
        return candidate.toISOString().slice(0, 10);
      }
    } catch (err) {
      LOGGER$1.debug(`Y-M value error: ${ymMatch[0]}`);
    }
  }
  const dateObject = regex_parse(string);
  if (is_valid_date(dateObject, outputformat, min_date, max_date)) {
    try {
      LOGGER$1.debug(`custom parse result: ${dateObject}`);
      return dateObject.toISOString().slice(0, 10);
    } catch (err) {
    }
  }
  return null;
}
function external_date_parser(string, outputformat) {
  try {
    const target = new Date(string);
    if (isNaN(target.getTime())) {
      return null;
    }
    return target.toISOString().slice(0, 10);
  } catch (err) {
    return null;
  }
}
function try_date_expr(string, outputformat, extensive_search, min_date, max_date) {
  if (!string) {
    return null;
  }
  string = string.trim().slice(0, MAX_SEGMENT_LEN);
  if (!string || !(4 <= string.split("").filter((char) => /\d/.test(char)).length <= 18)) {
    return null;
  }
  if (DISCARD_PATTERNS.test(string)) {
    return null;
  }
  const customresult = custom_parse(string, outputformat, min_date, max_date);
  if (customresult !== null) {
    return customresult;
  }
  if (extensive_search && TEXT_DATE_PATTERN.test(string)) {
    const dateparserResult = external_date_parser(string);
    if (is_valid_date(dateparserResult, outputformat, min_date, max_date)) {
      return dateparserResult;
    }
  }
  return null;
}
function img_search(tree, options) {
  const element = tree.querySelector('meta[property="og:image"][content]');
  if (element !== null) {
    return extract_url_date(element.getAttribute("content"), options);
  }
  return null;
}
function pattern_search(text, date_pattern, options) {
  const match = date_pattern.exec(text);
  if (match && is_valid_date(match[1], "%Y-%m-%d", options.min, options.max)) {
    LOGGER$1.debug(`regex found: ${date_pattern} ${match[0]}`);
    return convert_date(match[1], "%Y-%m-%d", options.format);
  }
  return null;
}
function json_search(tree, options) {
  const json_pattern = JSON_MODIFIED;
  const elements = tree.querySelectorAll('script[type="application/ld+json"], script[type="application/settings+json"]');
  for (const elem of elements) {
    if (!elem.textContent || !elem.textContent.includes('"date')) {
      continue;
    }
    return pattern_search(elem.textContent, json_pattern, options);
  }
  return null;
}
function idiosyncrasies_search(htmlstring, options) {
  const match = TEXT_PATTERNS.exec(htmlstring);
  if (match) {
    const parts = match.slice(1).filter(Boolean);
    try {
      let candidate;
      if (parts[0].length === 4) {
        candidate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      } else {
        let [day, month] = try_swap_values(parseInt(parts[0]), parseInt(parts[1]));
        let year = correct_year(parseInt(parts[2]));
        candidate = new Date(year, month - 1, day);
      }
      if (is_valid_date(candidate, "%Y-%m-%d", options.min, options.max)) {
        return candidate.toISOString().slice(0, 10);
      }
    } catch (err) {
      LOGGER$1.debug(`cannot process idiosyncrasies: ${match[0]}`);
    }
  }
  return null;
}
var DEBUG = 0;
const LOGGER = DEBUG ? console : { debug: () => {
}, error: () => {
} };
var MAX_POSSIBLE_CANDIDATES = 1e3;
var CLEANING_LIST = [
  "applet",
  "audio",
  "canvas",
  "datalist",
  "embed",
  "frame",
  "frameset",
  "iframe",
  "label",
  "map",
  "math",
  "noframes",
  "object",
  "picture",
  "rdf",
  "svg",
  "track",
  "video"
];
const DATE_ATTRIBUTES = /* @__PURE__ */ new Set([
  "analyticsattributes.articledate",
  "article.created",
  "article_date_original",
  "article:post_date",
  "article.published",
  "article:published",
  "article:published_date",
  "article:published_time",
  "article:publicationdate",
  "bt:pubdate",
  "citation_date",
  "citation_publication_date",
  "content_create_date",
  "created",
  "cxenseparse:recs:publishtime",
  "date",
  "date_created",
  "date_published",
  "datecreated",
  "dateposted",
  "datepublished",
  // Dublin Core
  "dc.date",
  "dc.created",
  "dc.date.created",
  "dc.date.issued",
  "dc.date.publication",
  "dcsext.articlefirstpublished",
  "dcterms.created",
  "dcterms.date",
  "dcterms.issued",
  "dc:created",
  "dc:date",
  "displaydate",
  "doc_date",
  "field-name-post-date",
  "gentime",
  "mediator_published_time",
  "meta",
  // Open Graph
  "og:article:published",
  "og:article:published_time",
  "og:datepublished",
  "og:pubdate",
  "og:publish_date",
  "og:published_time",
  "og:question:published_time",
  "og:regdate",
  "originalpublicationdate",
  "parsely-pub-date",
  "pdate",
  "ptime",
  "pubdate",
  "publishdate",
  "publish_date",
  "publish_time",
  "publish-date",
  "published-date",
  "published_date",
  "published_time",
  "publisheddate",
  "publication_date",
  "rbpubdate",
  "release_date",
  "rnews:datepublished",
  "sailthru.date",
  "shareaholic:article_published_time",
  "timestamp",
  "twt-published-at",
  "video:release_date",
  "vr:published_time"
]);
const NAME_MODIFIED = /* @__PURE__ */ new Set([
  "lastdate",
  "lastmod",
  "lastmodified",
  "last-modified",
  "modified",
  "utime"
]);
const PROPERTY_MODIFIED = /* @__PURE__ */ new Set([
  "article:modified",
  "article:modified_date",
  "article:modified_time",
  "article:post_modified",
  "bt:moddate",
  "datemodified",
  "dc.modified",
  "dcterms.modified",
  "lastmodified",
  "modified_time",
  "modificationdate",
  "og:article:modified_time",
  "og:modified_time",
  "og:updated_time",
  "release_date",
  "revision_date",
  "updated_time"
]);
const ITEMPROP_ATTRS_ORIGINAL = /* @__PURE__ */ new Set([
  "datecreated",
  "datepublished",
  "pubyear"
]);
const ITEMPROP_ATTRS_MODIFIED = /* @__PURE__ */ new Set(["datemodified", "dateupdate"]);
const ITEMPROP_ATTRS = /* @__PURE__ */ new Set([
  ...ITEMPROP_ATTRS_ORIGINAL,
  ...ITEMPROP_ATTRS_MODIFIED
]);
const CLASS_ATTRS = /* @__PURE__ */ new Set(["date-published", "published", "time published"]);
const NON_DIGITS_REGEX = /\D+$/;
const THREE_COMP_PATTERNS = [
  [THREE_PATTERN, THREE_CATCH],
  [THREE_LOOSE_PATTERN, THREE_LOOSE_CATCH]
];
function examine_text(text, options) {
  if (text.length <= MIN_SEGMENT_LEN) {
    return null;
  }
  text = text.slice(0, MAX_SEGMENT_LEN).replace(NON_DIGITS_REGEX, "");
  return try_date_expr(
    text,
    options.format,
    options.extensive,
    options.min,
    options.max
  );
}
function examine_date_elements(tree, expression, options) {
  const elements = tree.querySelectorAll(expression);
  if (!elements || elements.length > MAX_POSSIBLE_CANDIDATES) {
    return null;
  }
  for (const elem of elements) {
    for (const text of [elem.textContent, elem.getAttribute("title") || ""]) {
      const attempt = examine_text(text, options);
      if (attempt) {
        return attempt;
      }
    }
  }
  return null;
}
function examine_header(tree, options) {
  let headerdate = null;
  let reserve = null;
  const tryfunc = (content) => try_date_expr(
    content,
    options.format,
    options.extensive,
    options.min,
    options.max
  );
  for (const elem of tree.querySelectorAll("meta")) {
    if (!elem.attributes.length || !elem.getAttribute("content") && !elem.getAttribute("datetime")) {
      continue;
    }
    if (elem.hasAttribute("name")) {
      const attribute = elem.getAttribute("name")?.toLowerCase();
      if (attribute === "og:url") {
        reserve = extract_url_date(elem.getAttribute("content"), options);
      } else if (DATE_ATTRIBUTES.has(attribute)) {
        LOGGER.debug(`examining meta name: ${elem.outerHTML}`);
        headerdate = tryfunc(elem.getAttribute("content"));
      } else if (NAME_MODIFIED.has(attribute)) {
        LOGGER.debug(`examining meta name: ${elem.outerHTML}`);
        if (!options.original) {
          headerdate = tryfunc(elem.getAttribute("content"));
        } else {
          reserve = tryfunc(elem.getAttribute("content"));
        }
      }
    } else if (elem.hasAttribute("property")) {
      const attribute = elem.getAttribute("property").toLowerCase();
      if (DATE_ATTRIBUTES.has(attribute) || PROPERTY_MODIFIED.has(attribute)) {
        LOGGER.debug(`examining meta property: ${elem.outerHTML}`);
        const attempt = tryfunc(elem.getAttribute("content"));
        if (attempt !== null) {
          if (DATE_ATTRIBUTES.has(attribute) && options.original || PROPERTY_MODIFIED.has(attribute) && !options.original) {
            headerdate = attempt;
          } else {
            reserve = attempt;
          }
        }
      }
    } else if (elem.hasAttribute("itemprop")) {
      const attribute = elem.getAttribute("itemprop").toLowerCase();
      if (ITEMPROP_ATTRS.has(attribute)) {
        LOGGER.debug(`examining meta itemprop: ${elem.outerHTML}`);
        const attempt = tryfunc(
          elem.getAttribute("datetime") || elem.getAttribute("content")
        );
        if (attempt !== null) {
          if (ITEMPROP_ATTRS_ORIGINAL.has(attribute) && options.original || ITEMPROP_ATTRS_MODIFIED.has(attribute) && !options.original) {
            headerdate = attempt;
          }
        }
      } else if (attribute === "copyrightyear") {
        LOGGER.debug(`examining meta itemprop: ${elem.outerHTML}`);
        if (elem.hasAttribute("content")) {
          const attempt = `${elem.getAttribute("content")}-01-01`;
          if (is_valid_date(attempt, "%Y-%m-%d", options.min, options.max)) {
            reserve = attempt;
          }
        }
      }
    } else if (elem.hasAttribute("pubdate")) {
      if (elem.getAttribute("pubdate").toLowerCase() === "pubdate") {
        LOGGER.debug(`examining meta pubdate: ${elem.outerHTML}`);
        headerdate = tryfunc(elem.getAttribute("content"));
      }
    } else if (elem.hasAttribute("http-equiv")) {
      const attribute = elem.getAttribute("http-equiv").toLowerCase();
      if (attribute === "date") {
        LOGGER.debug(`examining meta http-equiv: ${elem.outerHTML}`);
        if (options.original) {
          headerdate = tryfunc(elem.getAttribute("content"));
        } else {
          reserve = tryfunc(elem.getAttribute("content"));
        }
      } else if (attribute === "last-modified") {
        LOGGER.debug(`examining meta http-equiv: ${elem.outerHTML}`);
        if (!options.original) {
          headerdate = tryfunc(elem.getAttribute("content"));
        } else {
          reserve = tryfunc(elem.getAttribute("content"));
        }
      }
    }
    if (headerdate !== null) {
      break;
    }
  }
  if (headerdate === null && reserve !== null) {
    LOGGER.debug("opting for reserve date with less granularity");
    headerdate = reserve;
  }
  return headerdate;
}
function select_candidate(occurrences, catch_regex, yearpat, options) {
  if (!occurrences || occurrences.size > MAX_POSSIBLE_CANDIDATES) {
    return null;
  }
  if (occurrences.size === 1) {
    const pattern = occurrences.keys().next().value;
    return catch_regex.exec(pattern);
  }
  return occurrences;
}
function search_pattern(htmlstring, pattern, catch_regex, yearpat, options) {
  const candidates = plausible_year_filter(
    htmlstring,
    pattern,
    yearpat,
    options.min,
    options.max
  );
  return select_candidate(candidates, catch_regex);
}
function compare_reference(reference, expression, options) {
  const attempt = try_date_expr(
    expression,
    options.format,
    options.extensive,
    options.min,
    options.max
  );
  if (attempt !== null) {
    return compare_values(reference, attempt, options);
  }
  return reference;
}
function examine_abbr_elements(tree, options) {
  const elements = tree.querySelectorAll("abbr");
  if (elements.length > 0 && elements.length < MAX_POSSIBLE_CANDIDATES) {
    let reference = 0;
    for (const elem of elements) {
      if (elem.hasAttribute("data-utime")) {
        try {
          const candidate = parseInt(elem.getAttribute("data-utime"));
          LOGGER.debug(`data-utime found: ${candidate}`);
          if (options.original && (reference === 0 || candidate < reference)) {
            reference = candidate;
          } else if (!options.original && candidate > reference) {
            reference = candidate;
          }
        } catch (err) {
          continue;
        }
      } else if (CLASS_ATTRS.has(elem.getAttribute("class"))) {
        if (elem.hasAttribute("title")) {
          const trytext = elem.getAttribute("title");
          LOGGER.debug(`abbr published-title found: ${trytext}`);
          if (options.original) {
            const attempt = try_date_expr(
              trytext,
              options.format,
              options.extensive,
              options.min,
              options.max
            );
            if (attempt !== null) {
              return attempt;
            }
          } else {
            reference = compare_reference(reference, trytext, options);
            if (reference > 0) {
              break;
            }
          }
        } else if (elem.textContent && elem.textContent.length > 10) {
          LOGGER.debug(`abbr published found: ${elem.textContent}`);
          reference = compare_reference(reference, elem.textContent, options);
        }
      }
    }
    return check_extracted_reference(reference, options) || examine_date_elements(tree, "abbr", options);
  }
  return null;
}
function examine_time_elements(tree, options) {
  const elements = tree.querySelectorAll("time");
  if (elements.length > 0 && elements.length < MAX_POSSIBLE_CANDIDATES) {
    let reference = 0;
    for (const elem of elements) {
      let shortcut_flag = false;
      if (!elem || !elem.getAttribute)
        continue;
      const datetime_attr = elem.getAttribute("datetime") || "";
      if (datetime_attr.length > 6) {
        if (elem.hasAttribute("pubdate") && elem.getAttribute("pubdate") === "pubdate" && options.original) {
          shortcut_flag = true;
          LOGGER.debug(`shortcut for time pubdate found: ${datetime_attr}`);
        } else if (elem.hasAttribute("class")) {
          if (options.original && (elem.getAttribute("class").startsWith("entry-date") || elem.getAttribute("class").startsWith("entry-time"))) {
            shortcut_flag = true;
            LOGGER.debug(`shortcut for time/datetime found: ${datetime_attr}`);
          } else if (!options.original && elem.getAttribute("class") === "updated") {
            shortcut_flag = true;
            LOGGER.debug(
              `shortcut for updated time/datetime found: ${datetime_attr}`
            );
          }
        } else {
          LOGGER.debug(`time/datetime found: ${datetime_attr}`);
        }
        if (shortcut_flag) {
          const attempt = try_date_expr(
            datetime_attr,
            options.format,
            options.extensive,
            options.min,
            options.max
          );
          if (attempt !== null) {
            return attempt;
          }
        } else {
          reference = compare_reference(reference, datetime_attr, options);
        }
      } else if (elem.textContent && elem.textContent.length > 6) {
        LOGGER.debug(`time/datetime found in text: ${elem.textContent}`);
        reference = compare_reference(reference, elem.textContent, options);
      }
    }
    return check_extracted_reference(reference, options);
  }
  return null;
}
function normalize_match(match) {
  if (!match) return null;
  const groups = match.slice(1).filter((g) => g);
  let [day, month, year] = groups.map((g) => g.padStart(2, "0"));
  if (year.length === 2) {
    year = year[0] === "9" ? `19${year}` : `20${year}`;
  }
  return `${year}-${month}-${day}`;
}
function search_page(htmlstring, options) {
  LOGGER.debug("looking for copyright/footer information");
  let copyear = 0;
  let bestmatch = search_pattern(
    htmlstring,
    COPYRIGHT_PATTERN,
    YEAR_PATTERN,
    YEAR_PATTERN,
    options
  );
  if (bestmatch) {
    const year = parseInt(bestmatch[0]);
    if (is_valid_date(new Date(year, 0, 1), "%Y", options.min, options.max)) {
      LOGGER.debug(`copyright year/footer pattern found: ${year}`);
      copyear = year;
    }
  }
  LOGGER.debug("3 components");
  for (const patterns of THREE_COMP_PATTERNS) {
    bestmatch = search_pattern(
      htmlstring,
      patterns[0],
      patterns[1],
      YEAR_PATTERN,
      options
    );
    let result2 = filter_ymd_candidate(
      bestmatch,
      patterns[0],
      options.original,
      copyear,
      options.format,
      options.min,
      options.max
    );
    if (result2 !== null) {
      return result2;
    }
  }
  let candidates = plausible_year_filter(
    htmlstring,
    SELECT_YMD_PATTERN,
    SELECT_YMD_YEAR,
    options.min,
    options.max
  );
  let replacement = {};
  for (const [item, count] of Object.entries(candidates)) {
    const match = THREE_COMP_REGEX_A.exec(item);
    if (match) {
      const candidate = normalize_match(match);
      replacement[candidate] = count;
    }
  }
  bestmatch = select_candidate(
    new Counter(replacement),
    YMD_PATTERN
  );
  let result = filter_ymd_candidate(
    bestmatch,
    SELECT_YMD_PATTERN,
    options.original,
    copyear,
    options.format,
    options.min,
    options.max
  );
  if (result !== null) {
    return result;
  }
  bestmatch = search_pattern(
    htmlstring,
    DATESTRINGS_PATTERN,
    DATESTRINGS_CATCH,
    YEAR_PATTERN,
    options
  );
  result = filter_ymd_candidate(
    bestmatch,
    DATESTRINGS_PATTERN,
    options.original,
    copyear,
    options.format,
    options.min,
    options.max
  );
  if (result !== null) {
    return result;
  }
  LOGGER.debug("switching to two components");
  bestmatch = search_pattern(
    htmlstring,
    YYYYMM_PATTERN,
    YYYYMM_CATCH,
    YEAR_PATTERN,
    options
  );
  if (bestmatch) {
    const dateObject2 = new Date(parseInt(bestmatch[1]), parseInt(bestmatch[2]) - 1, 1);
    if (is_valid_date(
      dateObject2,
      "%Y-%m-%d",
      { earliest: options.min, latest: options.max }
    ) && (copyear === 0 || dateObject2.getFullYear() >= copyear)) {
      LOGGER.debug(
        'date found for pattern "%s": %s, %s',
        YYYYMM_PATTERN,
        bestmatch[1],
        bestmatch[2]
      );
      return format_date(dateObject2, options.format);
    }
  }
  candidates = plausible_year_filter(
    htmlstring,
    MMYYYY_PATTERN,
    MMYYYY_YEAR,
    options.min,
    options.max,
    options.original
  );
  replacement = {};
  for (const [item, count] of Object.entries(candidates)) {
    const match = item?.match(TWO_COMP_REGEX);
    if (!match) continue;
    let month = match[1];
    if (month.length === 1) {
      month = `0${month}`;
    }
    const candidate = `${match[2]}-${month}-01`;
    replacement[candidate] = count;
  }
  candidates = new Counter(replacement);
  bestmatch = select_candidate(candidates, YMD_PATTERN);
  result = filter_ymd_candidate(
    bestmatch,
    MMYYYY_PATTERN,
    options.original,
    copyear,
    options.format,
    options.min,
    options.max
  );
  if (result !== null) {
    return result;
  }
  const dateObject = regex_parse(htmlstring);
  if (dateObject && is_valid_date(
    dateObject,
    options.format,
    { earliest: options.min, latest: options.max }
  ) && (copyear === 0 || dateObject.getFullYear() >= copyear)) {
    try {
      LOGGER.debug("regex result on HTML: %s", dateObject);
      return format_date(dateObject, options.format);
    } catch (err) {
      LOGGER.error("value error during conversion: %s %s", dateObject, err);
    }
  }
  if (copyear !== 0) {
    LOGGER.debug("using copyright year as default");
    const dateObject2 = new Date(copyear, 0, 1);
    return format_date(dateObject2, options.format);
  }
  LOGGER.debug("switching to one component");
  bestmatch = search_pattern(
    htmlstring,
    SIMPLE_PATTERN,
    YEAR_PATTERN,
    YEAR_PATTERN,
    options
  );
  if (bestmatch) {
    const dateobject = new Date(parseInt(bestmatch[0]), 0, 1);
    if (is_valid_date(dateobject, "%Y-%m-%d", options.min, options.max) && dateobject.getFullYear() >= copyear) {
      LOGGER.debug(
        `date found for pattern "${SIMPLE_PATTERN}": ${bestmatch[0]}`
      );
      return dateobject.toISOString().slice(0, 10);
    }
  }
  return null;
}
class Extractor {
  constructor(extensive_search, max_date, min_date, original_date, outputformat) {
    this.extensive = extensive_search;
    this.format = outputformat;
    this.max = max_date;
    this.min = min_date;
    this.original = original_date;
  }
}
class Counter {
  constructor(iterable = null) {
    this._counts = {};
    if (iterable === null) {
      return;
    }
    if (typeof iterable === "string") {
      for (const char of iterable) {
        this._counts[char] = (this._counts[char] || 0) + 1;
      }
      return;
    }
    if (Array.isArray(iterable)) {
      for (const item of iterable) {
        this._counts[item] = (this._counts[item] || 0) + 1;
      }
      return;
    }
    if (typeof iterable === "object") {
      for (const [key, value] of Object.entries(iterable)) {
        if (value !== 0) {
          this._counts[key] = value;
        }
      }
      return;
    }
  }
  // Dictionary-like interface
  // Get count (returns 0 for missing items)
  get(key) {
    return this._counts[key] || 0;
  }
  // Set count
  set(key, value) {
    if (value !== 0) {
      this._counts[key] = value;
    }
  }
  // Array access syntax
  valueOf(key) {
    return this.get(key);
  }
  // Support array-like access: counter['key']
  get [Symbol.toPrimitive]() {
    return (hint) => {
      if (hint === "number") {
        return NaN;
      }
      return this.toString();
    };
  }
  // Delete an entry
  delete(key) {
    delete this._counts[key];
  }
  // Check if key exists
  has(key) {
    return key in this._counts;
  }
  // Counter-specific methods
  // Return n most common elements and their counts
  most_common(n = null) {
    const items = Object.entries(this._counts);
    items.sort((a, b) => b[1] - a[1]);
    return n ? items.slice(0, n) : items;
  }
  // Return the total of all counts
  total() {
    return Object.values(this._counts).reduce((a, b) => a + b, 0);
  }
  // Return an iterator over elements, repeating each as many times as its count
  *elements() {
    for (const [item, count] of Object.entries(this._counts)) {
      for (let i = 0; i < count; i++) {
        yield item;
      }
    }
  }
  // Update counts from an iterable
  update(iterable) {
    const other = iterable instanceof Counter ? iterable : new Counter(iterable);
    for (const [key, value] of Object.entries(other._counts)) {
      this._counts[key] = (this._counts[key] || 0) + value;
      if (this._counts[key] === 0) {
        delete this._counts[key];
      }
    }
  }
  // Subtract counts from an iterable
  subtract(iterable) {
    const other = iterable instanceof Counter ? iterable : new Counter(iterable);
    for (const [key, value] of Object.entries(other._counts)) {
      this._counts[key] = (this._counts[key] || 0) - value;
      if (this._counts[key] === 0) {
        delete this._counts[key];
      }
    }
  }
  // Support for...of iteration
  *[Symbol.iterator]() {
    yield* Object.entries(this._counts);
  }
}
function extractDate(htmlobject, extensive_search = true, original_date = false, outputformat = "%Y-%m-%d", url = null, verbose = false, min_date = null, max_date = null, deferred_url_extractor = false) {
  if (verbose) {
    DEBUG = true;
  }
  const tree = htmlobject;
  if (!tree) {
    return null;
  }
  if (outputformat !== "%Y-%m-%d" && !is_valid_format(outputformat)) {
    return null;
  }
  const options = new Extractor(
    extensive_search,
    get_max_date(max_date),
    get_min_date(min_date),
    original_date,
    outputformat
  );
  let url_result = null;
  if (!url) {
    const urlelem = tree.querySelector('link[rel="canonical"]');
    if (urlelem) {
      url = urlelem.getAttribute("href");
    }
  }
  url_result = extract_url_date(url, options);
  if (url_result && !deferred_url_extractor) {
    return url_result;
  }
  let result = examine_header(tree, options) || json_search(tree, options);
  if (result) {
    return result;
  }
  if (deferred_url_extractor && url_result) {
    return url_result;
  }
  const abbr_result = examine_abbr_elements(tree, options);
  if (abbr_result) {
    return abbr_result;
  }
  let search_tree, discarded;
  try {
    [search_tree, discarded] = discard_unwanted(
      (tree.cloneNode(true), CLEANING_LIST)
    );
  } catch (error) {
    search_tree = tree;
  }
  const date_expr = extensive_search ? SLOW_PREPEND + DATE_EXPRESSIONS : FAST_PREPEND + DATE_EXPRESSIONS;
  result = examine_date_elements(search_tree, date_expr, options) || examine_date_elements(search_tree, "title,h1", options) || examine_time_elements(search_tree, options);
  if (result) {
    return result;
  }
  const htmlstring = search_tree.innerHTML;
  result = pattern_search(htmlstring, TIMESTAMP_PATTERN, options) || img_search(search_tree, options) || idiosyncrasies_search(htmlstring, options);
  if (result) {
    return result;
  }
  if (extensive_search) {
    LOGGER.debug("extensive search started");
    let reference = 0;
    const textNodes = Array.from(search_tree.childNodes).filter((node) => node.nodeType === 3);
    for (let i = 0; i < textNodes.length; i++) {
      const segment = textNodes[i].textContent.trim();
      if (segment.length > MIN_SEGMENT_LEN && segment.length < MAX_SEGMENT_LEN) {
        reference = compare_reference(reference, segment, options);
      }
    }
    const converted = check_extracted_reference(reference, options);
    return converted || search_page(htmlstring, options);
  }
  return null;
}
class Annotation {
  constructor(options) {
    this.category = options.category;
    this.color = options.color;
  }
}
const ADDED_ANNOTATION = new Annotation({
  category: "Added",
  color: "green"
});
const REMOVED_ANNOTATION = new Annotation({
  category: "Removed",
  color: "red"
});
const UNCHANGED_ANNOTATION = new Annotation({
  category: "Unchanged",
  color: "brown"
});
const DETECTED_ANNOTATION = new Annotation({
  category: "Detected",
  color: "green"
});
const MODIFIED_ANNOTATION = new Annotation({
  category: "Modified",
  color: "green"
});
const BlockTypes = {
  H1: {
    name: "H1",
    headline: true,
    headlineLevel: 1,
    toText(block) {
      return "<h1>" + linesToText(block.items, true) + "</h1>";
    }
  },
  H2: {
    name: "H2",
    headline: true,
    headlineLevel: 2,
    toText(block) {
      return "<h2>" + linesToText(block.items, true) + "</h2>";
    }
  },
  H3: {
    name: "H3",
    headline: true,
    headlineLevel: 3,
    toText(block) {
      return "<h3>" + linesToText(block.items, true) + "</h3>";
    }
  },
  H4: {
    name: "H4",
    headline: true,
    headlineLevel: 4,
    toText(block) {
      return "<h4>" + linesToText(block.items, true) + "</h4>";
    }
  },
  H5: {
    name: "H5",
    headline: true,
    headlineLevel: 5,
    toText(block) {
      return "<h5>" + linesToText(block.items, true) + "</h5>";
    }
  },
  H6: {
    name: "H6",
    headline: true,
    headlineLevel: 6,
    toText(block) {
      return "<h6>" + linesToText(block.items, true) + "</h6>";
    }
  },
  TOC: {
    name: "TOC",
    mergeToBlock: true,
    toText(block) {
      return linesToText(block.items, true);
    }
  },
  FOOTNOTES: {
    name: "FOOTNOTES",
    mergeToBlock: true,
    mergeFollowingNonTypedItems: true,
    toText(block) {
      return "<p>" + linesToText(block.items, false) + "</p>";
    }
  },
  CODE: {
    name: "CODE",
    mergeToBlock: true,
    toText(block) {
      return "<code>" + linesToText(block.items, true) + "</code>";
    }
  },
  LIST: {
    name: "LIST",
    mergeToBlock: false,
    mergeFollowingNonTypedItemsWithSmallDistance: true,
    toText(block) {
      return "<ul>\n" + linesToText(block.items, false) + "</ul>";
    }
  },
  PARAGRAPH: {
    name: "PARAGRAPH",
    toText(block) {
      return "<p>" + linesToText(block.items, false) + "</p>";
    }
  }
};
function firstFormat(lineItem) {
  if (lineItem.words.length === 0) {
    return null;
  }
  return lineItem.words[0].format;
}
function isPunctationCharacter(string) {
  if (string.length !== 1) {
    return false;
  }
  return string[0] === "." || string[0] === "!" || string[0] === "?";
}
function linesToText(lineItems, disableInlineFormats) {
  var text = "";
  var openFormat;
  const closeFormat = () => {
    text += openFormat.endSymbol;
    openFormat = null;
  };
  lineItems.forEach((line, lineIndex) => {
    if (!line) return;
    line.words.forEach((word, i) => {
      const wordType = word.type;
      const wordFormat = word.format;
      if (openFormat && (!wordFormat || wordFormat !== openFormat)) {
        closeFormat();
      }
      if (i > 0 && !(wordType && wordType.attachWithoutWhitespace) && !isPunctationCharacter(word.string)) {
        text += " ";
      }
      if (wordFormat && !openFormat && !disableInlineFormats) {
        openFormat = wordFormat;
        text += openFormat.startSymbol;
      }
      if (wordType && (!disableInlineFormats || wordType.plainTextFormat)) {
        text += wordType.toText(word.string);
      } else {
        text += word.string;
      }
    });
    if (openFormat && (lineIndex === lineItems.length - 1 || firstFormat(lineItems[lineIndex + 1]) !== openFormat)) {
      closeFormat();
    }
    text += "\n";
  });
  return text;
}
BlockTypes.isHeadline = function isHeadline(type) {
  return type && type.name.length === 2 && type.name[0] === "H";
};
BlockTypes.blockToText = function blockToText(block) {
  if (!block.type) {
    return linesToText(block.items, false);
  }
  return block.type.toText(block);
};
BlockTypes.headlineByLevel = function headlineByLevel(level) {
  if (level === 1) return BlockTypes.H1;
  if (level === 2) return BlockTypes.H2;
  if (level === 3) return BlockTypes.H3;
  if (level === 4) return BlockTypes.H4;
  if (level === 5) return BlockTypes.H5;
  if (level > 6) {
    console.warn("Unsupported headline level: " + level + " (supported are 1-6), defaulting to level 6");
  }
  return BlockTypes.H6;
};
export {
  AGENT_TOOLS as A,
  BlockTypes as B,
  DETECTED_ANNOTATION as D,
  LANGUAGE_MODELS as L,
  MODIFIED_ANNOTATION as M,
  REMOVED_ANNOTATION as R,
  UNCHANGED_ANNOTATION as U,
  LANGUAGE_PROVIDERS as a,
  convertMarkdownToHTML as b,
  convertURLSafeHTMLToHTML as c,
  convertMathLaTexToImage as d,
  extractDate as e,
  ADDED_ANNOTATION as f
};
