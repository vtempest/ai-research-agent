export const DEFAULT_EMBEDDING_PROVIDER = 'openai';

/**
 * QwkSearch routes every default model through OpenRouter, so the deployed
 * Worker answers chats with one secret (`OPENROUTER_API_KEY`) instead of a key
 * per vendor. `openrouter/auto` picks a model per prompt and is the one
 * OpenRouter entry enabled in the model bank.
 */
export const DEFAULT_MODEL = 'openrouter/auto';
export const DEFAULT_PROVIDER = 'openrouter';
export const DEFAULT_MINI_MODEL = 'openrouter/auto';
export const DEFAULT_MINI_PROVIDER = 'openrouter';

export const DEFAULT_ONBOARDING_MODEL = 'openrouter/auto';
export const DEFAULT_ONBOARDING_PROVIDER = 'openrouter';

/**
 * The model Acceptance review predictions judge evidence screenshots with.
 * MUST be vision-capable — a text-only model silently "accepts on missing
 * evidence" for every check and no proposal ever surfaces (a model-bank
 * test in apps/server guards this).
 */
export const DEFAULT_REVIEW_PREDICT_MODEL = 'gemini-3.6-flash';
export const DEFAULT_REVIEW_PREDICT_PROVIDER = 'google';
