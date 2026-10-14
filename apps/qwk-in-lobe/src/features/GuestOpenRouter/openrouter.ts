/**
 * Browser-side OpenRouter client for the guest demo.
 *
 * A visitor who is not signed in has no server-side key vault, so the demo
 * calls OpenRouter straight from the browser with the visitor's own key.
 * OpenRouter answers CORS requests, which means the key goes from this tab to
 * openrouter.ai and nowhere else: none of these requests touch our Worker.
 */

export const OPENROUTER_API_BASE = 'https://openrouter.ai/api/v1';
export const OPENROUTER_KEYS_URL = 'https://openrouter.ai/keys';
export const GUEST_DEFAULT_MODEL = 'openrouter/auto';

/** Suggestions for the model field; any OpenRouter model id is accepted. */
export const GUEST_MODEL_SUGGESTIONS = [
  'openrouter/auto',
  'openai/gpt-4o-mini',
  'google/gemini-2.5-flash',
  'anthropic/claude-3.5-haiku',
  'meta-llama/llama-3.3-70b-instruct:free',
];

export interface GuestChatMessage {
  content: string;
  role: 'assistant' | 'system' | 'user';
}

export class OpenRouterError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'OpenRouterError';
    this.status = status;
  }
}

const appHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = { 'X-Title': 'QwkSearch LobeHub demo' };
  // OpenRouter uses the referer to attribute traffic to an app.
  if (typeof location !== 'undefined' && location.origin) headers['HTTP-Referer'] = location.origin;
  return headers;
};

/** Pull a readable message out of an OpenRouter error body. */
const readError = async (res: Response): Promise<OpenRouterError> => {
  let message = `${res.status} ${res.statusText}`.trim();
  try {
    const body: any = await res.json();
    const detail = body?.error?.message ?? body?.message;
    if (typeof detail === 'string' && detail) message = detail;
  } catch {
    // keep the status line
  }
  return new OpenRouterError(message, res.status);
};

/** Trims whitespace and a pasted `Bearer ` prefix. */
export const normalizeOpenRouterKey = (key: string) => key.trim().replace(/^bearer\s+/i, '');

/** A cheap shape check so obvious typos are caught before a network round trip. */
export const looksLikeOpenRouterKey = (key: string) => /^sk-or-[\w-]{10,}$/.test(key);

export interface OpenRouterKeyInfo {
  isFreeTier?: boolean;
  label?: string;
  limit?: number | null;
  usage?: number;
}

/**
 * Checks the key against OpenRouter's `GET /key` endpoint.
 * Resolves with the key's metadata, rejects with `OpenRouterError` when it is refused.
 */
export const verifyOpenRouterKey = async (
  apiKey: string,
  signal?: AbortSignal,
): Promise<OpenRouterKeyInfo> => {
  const res = await fetch(`${OPENROUTER_API_BASE}/key`, {
    headers: { Authorization: `Bearer ${apiKey}`, ...appHeaders() },
    signal,
  });

  if (!res.ok) throw await readError(res);

  const body: any = await res.json().catch(() => ({}));
  const data = body?.data ?? {};

  return {
    isFreeTier: data.is_free_tier,
    label: data.label,
    limit: data.limit,
    usage: data.usage,
  };
};

export interface StreamChatParams {
  apiKey: string;
  messages: GuestChatMessage[];
  model: string;
  onDelta: (text: string) => void;
  signal?: AbortSignal;
}

/** Extracts the text delta from one SSE `data:` payload; throws on an in-stream error. */
export const parseStreamChunk = (data: string): string => {
  if (!data || data === '[DONE]') return '';

  let json: any;
  try {
    json = JSON.parse(data);
  } catch {
    return '';
  }

  if (json?.error) {
    throw new OpenRouterError(
      json.error.message || 'OpenRouter returned an error',
      json.error.code,
    );
  }

  const delta = json?.choices?.[0]?.delta?.content;
  return typeof delta === 'string' ? delta : '';
};

/**
 * Streams a chat completion from OpenRouter, calling `onDelta` for each text
 * chunk. Resolves with the full reply once the stream ends.
 */
export const streamOpenRouterChat = async ({
  apiKey,
  messages,
  model,
  onDelta,
  signal,
}: StreamChatParams): Promise<string> => {
  const res = await fetch(`${OPENROUTER_API_BASE}/chat/completions`, {
    body: JSON.stringify({ messages, model, stream: true }),
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...appHeaders(),
    },
    method: 'POST',
    signal,
  });

  if (!res.ok) throw await readError(res);
  if (!res.body) throw new OpenRouterError('OpenRouter returned an empty response');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let full = '';

  const handleLine = (line: string) => {
    // SSE comments (": OPENROUTER PROCESSING") keep the connection alive.
    if (!line.startsWith('data:')) return;
    const delta = parseStreamChunk(line.slice(5).trim());
    if (delta) {
      full += delta;
      onDelta(delta);
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) handleLine(line.trim());
  }

  buffer += decoder.decode();
  if (buffer.trim()) handleLine(buffer.trim());

  return full;
};
