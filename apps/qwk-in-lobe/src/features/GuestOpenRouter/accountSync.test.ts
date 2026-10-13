import { beforeEach, describe, expect, it, vi } from 'vitest';

const aiInfra = {
  refreshAiProviderRuntimeState: vi.fn(),
  toggleProviderEnabled: vi.fn(),
  updateAiProviderConfig: vi.fn(),
};
const user = { updateDefaultAgent: vi.fn() };

vi.mock('@/store/aiInfra', () => ({ useAiInfraStore: { getState: () => aiInfra } }));
vi.mock('@/store/user', () => ({ useUserStore: { getState: () => user } }));

const { applyGuestKeyToAccount, OPENROUTER_PROVIDER_ID, removeGuestKeyFromAccount } =
  await import('./accountSync');

const KEY = 'sk-or-v1-0123456789abcdef';

describe('guest key account sync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('saves the key as the OpenRouter provider key, enables it and defaults new agents to it', async () => {
    await applyGuestKeyToAccount(KEY);

    expect(aiInfra.updateAiProviderConfig).toHaveBeenCalledWith(OPENROUTER_PROVIDER_ID, {
      keyVaults: { apiKey: KEY },
    });
    expect(aiInfra.toggleProviderEnabled).toHaveBeenCalledWith(OPENROUTER_PROVIDER_ID, true);
    expect(user.updateDefaultAgent).toHaveBeenCalledWith({
      config: { model: 'openrouter/auto', provider: 'openrouter' },
    });
    expect(aiInfra.refreshAiProviderRuntimeState).toHaveBeenCalled();
  });

  it('stops before touching defaults when saving the key fails', async () => {
    aiInfra.updateAiProviderConfig.mockRejectedValueOnce(new Error('UNAUTHORIZED'));

    await expect(applyGuestKeyToAccount(KEY)).rejects.toThrow('UNAUTHORIZED');
    expect(aiInfra.toggleProviderEnabled).not.toHaveBeenCalled();
    expect(user.updateDefaultAgent).not.toHaveBeenCalled();
  });

  it('clears the key from the account on removal', async () => {
    await removeGuestKeyFromAccount();

    expect(aiInfra.updateAiProviderConfig).toHaveBeenCalledWith(OPENROUTER_PROVIDER_ID, {
      keyVaults: { apiKey: '' },
    });
    expect(aiInfra.refreshAiProviderRuntimeState).toHaveBeenCalled();
  });
});
