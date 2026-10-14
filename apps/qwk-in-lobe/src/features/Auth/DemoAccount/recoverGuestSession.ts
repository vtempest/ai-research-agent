import { startDemoSession } from './startDemoSession';

const RECOVERY_STORAGE_KEY = 'LOBE_GUEST_SESSION_RECOVERY';
const RECOVERY_COOLDOWN_MS = 30_000;

/**
 * - `reloading`: a new guest session was started and the page is reloading.
 * - `kept`: the server still has a session for this browser, so there is
 *   nothing to recover and no reason to leave the page.
 * - `unavailable`: the demo account is disabled, the request failed, or a
 *   recovery already ran moments ago; the caller falls back to `/signin`.
 */
export type GuestRecovery = 'kept' | 'reloading' | 'unavailable';

interface RecoverGuestSessionOptions {
  fetcher?: typeof fetch;
  now?: () => number;
  reload?: () => void;
  storage?: Pick<Storage, 'getItem' | 'setItem'> | null;
}

const getSessionStorage = () => {
  try {
    return typeof sessionStorage === 'undefined' ? null : sessionStorage;
  } catch {
    return null;
  }
};

/**
 * A demo deployment never sends a guest to sign in. When the session behind a
 * request is gone (a tRPC 401), start a fresh guest session through the
 * demo-account endpoint and reload the page, instead of opening `/signin`.
 *
 * At most one recovery per 30 s per tab, so a 401 that a new session does not
 * fix cannot turn into a reload loop.
 */
export const recoverGuestSession = async ({
  fetcher = fetch,
  now = Date.now,
  reload = () => window.location.reload(),
  storage = getSessionStorage(),
}: RecoverGuestSessionOptions = {}): Promise<GuestRecovery> => {
  const startedAt = now();

  try {
    const last = Number(storage?.getItem(RECOVERY_STORAGE_KEY));
    if (last && startedAt - last < RECOVERY_COOLDOWN_MS) return 'unavailable';
    storage?.setItem(RECOVERY_STORAGE_KEY, String(startedAt));
  } catch {
    // Storage blocked: recover anyway, the 401 debounce still limits retries
  }

  try {
    const { created } = await startDemoSession(fetcher);
    if (!created) return 'kept';
  } catch (error) {
    console.error('[guest-session] could not start a new guest session:', error);
    return 'unavailable';
  }

  reload();
  return 'reloading';
};
