/**
 * Guest demo state: the visitor's OpenRouter key, the model they picked and
 * the current conversation.
 *
 * Only the key and model are persisted, in this browser's localStorage. The
 * conversation lives in memory and is gone on reload: a guest has no account
 * to save it to.
 */
import { createJSONStorage, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import {
  GUEST_DEFAULT_MODEL,
  type GuestChatMessage,
  normalizeOpenRouterKey,
  streamOpenRouterChat,
} from './openrouter';

export const GUEST_OPENROUTER_STORAGE_KEY = 'qwk-guest-openrouter';

export interface GuestOpenRouterState {
  apiKey: string;
  error?: string;
  messages: GuestChatMessage[];
  model: string;
  sending: boolean;
}

export interface GuestOpenRouterActions {
  clearConversation: () => void;
  clearKey: () => void;
  send: (text: string) => Promise<void>;
  setKey: (key: string) => void;
  setModel: (model: string) => void;
  stop: () => void;
}

export type GuestOpenRouterStore = GuestOpenRouterState & GuestOpenRouterActions;

const initialState: GuestOpenRouterState = {
  apiKey: '',
  error: undefined,
  messages: [],
  model: GUEST_DEFAULT_MODEL,
  sending: false,
};

let abortController: AbortController | undefined;

export const useGuestOpenRouterStore = createWithEqualityFn<GuestOpenRouterStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      clearConversation: () => {
        get().stop();
        set({ error: undefined, messages: [] });
      },

      clearKey: () => {
        get().stop();
        set({ apiKey: '', error: undefined });
      },

      send: async (text) => {
        const content = text.trim();
        const { apiKey, model, messages, sending } = get();
        if (!content || sending || !apiKey) return;

        const history: GuestChatMessage[] = [...messages, { content, role: 'user' }];
        set({
          error: undefined,
          messages: [...history, { content: '', role: 'assistant' }],
          sending: true,
        });

        abortController = new AbortController();
        const controller = abortController;

        const appendToReply = (delta: string) =>
          set((s) => {
            const next = [...s.messages];
            const last = next.at(-1);
            if (last?.role === 'assistant')
              next[next.length - 1] = { ...last, content: last.content + delta };
            return { messages: next };
          });

        try {
          await streamOpenRouterChat({
            apiKey,
            messages: history,
            model: model.trim() || GUEST_DEFAULT_MODEL,
            onDelta: appendToReply,
            signal: controller.signal,
          });
        } catch (e) {
          if (!controller.signal.aborted) {
            set({ error: (e as Error)?.message || String(e) });
          }
        } finally {
          if (abortController === controller) abortController = undefined;
          // Drop an empty reply bubble left by an error or an early stop.
          set((s) => {
            const last = s.messages.at(-1);
            const messages =
              last?.role === 'assistant' && !last.content ? s.messages.slice(0, -1) : s.messages;
            return { messages, sending: false };
          });
        }
      },

      setKey: (key) => set({ apiKey: normalizeOpenRouterKey(key), error: undefined }),

      setModel: (model) => set({ model }),

      stop: () => {
        abortController?.abort();
        abortController = undefined;
      },
    }),
    {
      name: GUEST_OPENROUTER_STORAGE_KEY,
      partialize: (s) => ({ apiKey: s.apiKey, model: s.model }),
      storage: createJSONStorage(() => localStorage),
    },
  ),
  shallow,
);

export const guestOpenRouterSelectors = {
  hasKey: (s: GuestOpenRouterStore) => !!s.apiKey,
  /** `sk-or-v1-…abcd`: enough to recognise a key without showing it. */
  maskedKey: (s: GuestOpenRouterStore) =>
    s.apiKey ? `${s.apiKey.slice(0, 9)}…${s.apiKey.slice(-4)}` : '',
};
