import { describe, expect, it } from 'vitest';

import {
  OPENROUTER_DEFAULT_MODEL,
  resolveDefaultAgentConfigEnv,
  resolveSystemAgentEnv,
} from './openRouterDefaults';
import { parseAgentConfig } from './parseDefaultAgent';
import { parseSystemAgent } from './parseSystemAgent';

describe('resolveDefaultAgentConfigEnv', () => {
  it('keeps an explicit DEFAULT_AGENT_CONFIG', () => {
    expect(
      resolveDefaultAgentConfigEnv('provider=openai;model=gpt-4o', { OPENROUTER_API_KEY: 'k' }),
    ).toBe('provider=openai;model=gpt-4o');
  });

  it('stays empty without an OpenRouter key', () => {
    expect(resolveDefaultAgentConfigEnv('', {})).toBe('');
  });

  it('defaults new agents to OpenRouter when only the key is set', () => {
    const env = resolveDefaultAgentConfigEnv('', { OPENROUTER_API_KEY: 'k' });

    expect(parseAgentConfig(env)).toEqual({
      model: OPENROUTER_DEFAULT_MODEL,
      provider: 'openrouter',
    });
  });

  it('honours OPENROUTER_DEFAULT_MODEL', () => {
    const env = resolveDefaultAgentConfigEnv('', {
      OPENROUTER_API_KEY: 'k',
      OPENROUTER_DEFAULT_MODEL: 'openai/gpt-4o-mini',
    });

    expect(parseAgentConfig(env)).toEqual({ model: 'openai/gpt-4o-mini', provider: 'openrouter' });
  });
});

describe('resolveSystemAgentEnv', () => {
  it('keeps an explicit SYSTEM_AGENT', () => {
    expect(resolveSystemAgentEnv('default=openai/gpt-4o', { OPENROUTER_API_KEY: 'k' })).toBe(
      'default=openai/gpt-4o',
    );
  });

  it('stays unset without an OpenRouter key', () => {
    expect(resolveSystemAgentEnv(undefined, {})).toBeUndefined();
  });

  it('points every system agent at OpenRouter when only the key is set', () => {
    const config = parseSystemAgent(resolveSystemAgentEnv(undefined, { OPENROUTER_API_KEY: 'k' }));

    expect(config.topic).toMatchObject({ model: OPENROUTER_DEFAULT_MODEL, provider: 'openrouter' });
    expect(config.translation).toMatchObject({
      model: OPENROUTER_DEFAULT_MODEL,
      provider: 'openrouter',
    });
  });
});
