import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GUEST_DEFAULT_MODEL } from './openrouter';
import {
  GUEST_OPENROUTER_STORAGE_KEY,
  guestOpenRouterSelectors,
  useGuestOpenRouterStore,
} from './store';

const KEY = 'sk-or-v1-0123456789abcdef';

/** What the persist middleware wrote to the browser storage it was created with. */
const persisted = () =>
  useGuestOpenRouterStore.persist.getOptions().storage!.getItem(GUEST_OPENROUTER_STORAGE_KEY) as {
    state: Record<string, unknown>;
  } | null;

const sseResponse = (text: string) =>
  new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\ndata: [DONE]\n\n`,
          ),
        );
        controller.close();
      },
    }),
    { status: 200 },
  );

describe('guest OpenRouter store', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    useGuestOpenRouterStore.setState({
      apiKey: '',
      error: undefined,
      messages: [],
      model: GUEST_DEFAULT_MODEL,
      sending: false,
    });
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it('persists the key and model to localStorage, but not the conversation', () => {
    useGuestOpenRouterStore.getState().setKey(`  ${KEY} `);
    useGuestOpenRouterStore.setState({ messages: [{ content: 'secret chat', role: 'user' }] });

    expect(persisted()?.state).toEqual({ apiKey: KEY, model: GUEST_DEFAULT_MODEL });
  });

  it('masks the key for display', () => {
    useGuestOpenRouterStore.getState().setKey(KEY);
    const state = useGuestOpenRouterStore.getState();

    expect(guestOpenRouterSelectors.hasKey(state)).toBe(true);
    expect(guestOpenRouterSelectors.maskedKey(state)).toBe('sk-or-v1-…cdef');
    expect(guestOpenRouterSelectors.maskedKey(state)).not.toContain('0123456789');
  });

  it('does not send without a key', async () => {
    await useGuestOpenRouterStore.getState().send('hello');

    expect(fetchMock).not.toHaveBeenCalled();
    expect(useGuestOpenRouterStore.getState().messages).toEqual([]);
  });

  it('sends the conversation and streams the reply in', async () => {
    fetchMock.mockResolvedValueOnce(sseResponse('Hi there'));
    const store = useGuestOpenRouterStore.getState();
    store.setKey(KEY);
    store.setModel('  ');

    await useGuestOpenRouterStore.getState().send('hello');

    const state = useGuestOpenRouterStore.getState();
    expect(state.sending).toBe(false);
    expect(state.error).toBeUndefined();
    expect(state.messages).toEqual([
      { content: 'hello', role: 'user' },
      { content: 'Hi there', role: 'assistant' },
    ]);

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    // A blank model field falls back to the default instead of sending ''.
    expect(body.model).toBe(GUEST_DEFAULT_MODEL);
    expect(body.messages).toEqual([{ content: 'hello', role: 'user' }]);
  });

  it('keeps the question and shows the error when OpenRouter refuses', async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json({ error: { message: 'Insufficient credits' } }, { status: 402 }),
    );
    useGuestOpenRouterStore.getState().setKey(KEY);

    await useGuestOpenRouterStore.getState().send('hello');

    const state = useGuestOpenRouterStore.getState();
    expect(state.error).toBe('Insufficient credits');
    expect(state.messages).toEqual([{ content: 'hello', role: 'user' }]);
  });

  it('clearKey forgets the key', () => {
    useGuestOpenRouterStore.getState().setKey(KEY);
    useGuestOpenRouterStore.getState().clearKey();

    expect(useGuestOpenRouterStore.getState().apiKey).toBe('');
    expect(persisted()?.state.apiKey).toBe('');
  });
});
