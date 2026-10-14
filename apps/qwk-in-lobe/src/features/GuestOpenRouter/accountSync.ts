/**
 * Lets a guest's OpenRouter key drive the full LobeHub chat, not just `/demo`.
 *
 * Visitors get an automatic guest account (`src/libs/better-auth/guest.ts`),
 * so the key can be written to that account's OpenRouter provider config —
 * the same place Settings → Providers saves it, encrypted with the key-vault
 * secret. The main chat reads keys from there (`initModelRuntimeFromDB`).
 * The guest account lives only as long as the browser's session cookie.
 */
import { isGuestEmail } from '@/libs/better-auth/guestEmail';
import { useAiInfraStore } from '@/store/aiInfra';
import { useUserStore } from '@/store/user';
import { authSelectors, userProfileSelectors } from '@/store/user/selectors';

import { GUEST_DEFAULT_MODEL } from './openrouter';

export const OPENROUTER_PROVIDER_ID = 'openrouter';

/** True when the visitor is signed in with an automatic guest account. */
export const useIsGuestSession = () =>
  useUserStore((s) => authSelectors.isLogin(s) && isGuestEmail(userProfileSelectors.email(s)));

/** Saves the key as the account's OpenRouter key, enables the provider and points new agents at it. */
export const applyGuestKeyToAccount = async (apiKey: string) => {
  const aiInfra = useAiInfraStore.getState();

  await aiInfra.updateAiProviderConfig(OPENROUTER_PROVIDER_ID, { keyVaults: { apiKey } });
  await aiInfra.toggleProviderEnabled(OPENROUTER_PROVIDER_ID, true);
  await useUserStore.getState().updateDefaultAgent({
    config: { model: GUEST_DEFAULT_MODEL, provider: OPENROUTER_PROVIDER_ID },
  });
  await aiInfra.refreshAiProviderRuntimeState();
};

/** Clears the key from the account; the provider stays configured but keyless. */
export const removeGuestKeyFromAccount = async () => {
  const aiInfra = useAiInfraStore.getState();

  await aiInfra.updateAiProviderConfig(OPENROUTER_PROVIDER_ID, { keyVaults: { apiKey: '' } });
  await aiInfra.refreshAiProviderRuntimeState();
};
