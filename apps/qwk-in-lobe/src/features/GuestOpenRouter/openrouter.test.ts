import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  looksLikeOpenRouterKey,
  normalizeOpenRouterKey,
  OpenRouterError,
  parseStreamChunk,
  streamOpenRouterChat,
  verifyOpenRouterKey,
} from './openrouter';

const KEY = 'sk-or-v1-0123456789abcdef';

const sseResponse = (chunks: string[]) => {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
  return new Response(body, { headers: { 'Content-Type': 'text/event-stream' }, status: 200 });
};

const delta = (content: string) =>
  `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`;

describe('guest OpenRouter client', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it('normalizes and shape-checks keys', () => {
    expect(normalizeOpenRouterKey(`  Bearer ${KEY} `)).toBe(KEY);
    expect(looksLikeOpenRouterKey(KEY)).toBe(true);
    expect(looksLikeOpenRouterKey('sk-proj-abc')).toBe(false);
    expect(looksLikeOpenRouterKey('')).toBe(false);
  });

  it('verifies a key against OpenRouter directly', async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json({ data: { is_free_tier: true, label: 'demo', limit: null, usage: 0 } }),
    );

    await expect(verifyOpenRouterKey(KEY)).resolves.toEqual({
      isFreeTier: true,
      label: 'demo',
      limit: null,
      usage: 0,
    });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://openrouter.ai/api/v1/key');
    expect(init.headers.Authorization).toBe(`Bearer ${KEY}`);
  });

  it('surfaces OpenRouter error messages for a rejected key', async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json(
        { error: { code: 401, message: 'No auth credentials found' } },
        { status: 401 },
      ),
    );

    const error = await verifyOpenRouterKey(KEY).catch((e) => e);
    expect(error).toBeInstanceOf(OpenRouterError);
    expect(error.message).toBe('No auth credentials found');
    expect(error.status).toBe(401);
  });

  it('parses stream chunks, ignoring [DONE] and junk', () => {
    expect(parseStreamChunk('[DONE]')).toBe('');
    expect(parseStreamChunk('not json')).toBe('');
    expect(parseStreamChunk(JSON.stringify({ choices: [{ delta: { content: 'hi' } }] }))).toBe(
      'hi',
    );
    expect(() => parseStreamChunk(JSON.stringify({ error: { message: 'rate limited' } }))).toThrow(
      'rate limited',
    );
  });

  it('streams deltas split across network chunks', async () => {
    const full =
      delta('Hello') + ': OPENROUTER PROCESSING\n\n' + delta(', world') + 'data: [DONE]\n\n';
    // Split mid-line to make sure partial lines are buffered.
    fetchMock.mockResolvedValueOnce(
      sseResponse([full.slice(0, 20), full.slice(20, 61), full.slice(61)]),
    );

    const onDelta = vi.fn();
    const reply = await streamOpenRouterChat({
      apiKey: KEY,
      messages: [{ content: 'hi', role: 'user' }],
      model: 'openrouter/auto',
      onDelta,
    });

    expect(reply).toBe('Hello, world');
    expect(onDelta.mock.calls.map(([d]) => d)).toEqual(['Hello', ', world']);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://openrouter.ai/api/v1/chat/completions');
    expect(JSON.parse(init.body)).toEqual({
      messages: [{ content: 'hi', role: 'user' }],
      model: 'openrouter/auto',
      stream: true,
    });
  });

  it('rejects with the error body when the request fails', async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json({ error: { message: 'Insufficient credits' } }, { status: 402 }),
    );

    await expect(
      streamOpenRouterChat({ apiKey: KEY, messages: [], model: 'x', onDelta: vi.fn() }),
    ).rejects.toThrow('Insufficient credits');
  });
});
