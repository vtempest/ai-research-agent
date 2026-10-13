/**
 * OpenRouter as the zero-config default.
 *
 * With only `OPENROUTER_API_KEY` set, the stock defaults point new agents and
 * the system agents (topic titles, translation, …) at providers that have no
 * key, so the first message fails. When the operator has not configured
 * `DEFAULT_AGENT_CONFIG` / `SYSTEM_AGENT` themselves, fall back to OpenRouter.
 * Explicit configuration always wins.
 */
export const OPENROUTER_DEFAULT_MODEL = 'openrouter/auto';

interface OpenRouterDefaultsEnv {
  [key: string]: string | undefined;
  OPENROUTER_API_KEY?: string;
  /** Overrides the model used for the OpenRouter fallback. */
  OPENROUTER_DEFAULT_MODEL?: string;
}

const openRouterModel = (env: OpenRouterDefaultsEnv) =>
  env.OPENROUTER_DEFAULT_MODEL?.trim() || OPENROUTER_DEFAULT_MODEL;

export const resolveDefaultAgentConfigEnv = (
  defaultAgentConfig: string | undefined,
  env: OpenRouterDefaultsEnv = process.env,
): string => {
  if (defaultAgentConfig) return defaultAgentConfig;
  if (!env.OPENROUTER_API_KEY) return '';

  return `provider=openrouter;model=${openRouterModel(env)}`;
};

export const resolveSystemAgentEnv = (
  systemAgent: string | undefined,
  env: OpenRouterDefaultsEnv = process.env,
): string | undefined => {
  if (systemAgent) return systemAgent;
  if (!env.OPENROUTER_API_KEY) return systemAgent;

  return `default=openrouter/${openRouterModel(env)}`;
};
