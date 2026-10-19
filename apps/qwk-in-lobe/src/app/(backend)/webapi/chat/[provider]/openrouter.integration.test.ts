// @vitest-environment node
/**
 * End-to-end check of the deployed chat path: the default provider/model,
 * the local user (no sign-in), a real database (PGlite) and the server-side
 * `OPENROUTER_API_KEY`, against a fake OpenRouter endpoint.
 */
import { createServer, type IncomingHttpHeaders, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';

import { DEFAULT_MODEL, DEFAULT_PROVIDER } from '@lobechat/business-const';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { getTestDB } from '@/database/core/getTestDB';

vi.mock('@/database/core/db-adaptor', () => ({ getServerDB: () => getTestDB() }));

interface CapturedRequest {
  body: any;
  headers: IncomingHttpHeaders;
  url?: string;
}

const captured: CapturedRequest[] = [];
let server: Server;

const sse = (chunk: object) => `data: ${JSON.stringify(chunk)}\n\n`;

beforeAll(async () => {
  server = createServer((req, res) => {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      captured.push({ body: JSON.parse(raw || '{}'), headers: req.headers, url: req.url });
      res.writeHead(200, { 'Content-Type': 'text/event-stream' });
      const base = {
        created: 0,
        id: 'gen-1',
        model: 'openai/gpt-4o-mini',
        object: 'chat.completion.chunk',
      };
      res.write(
        sse({
          ...base,
          choices: [{ delta: { content: 'Hello from ', role: 'assistant' }, index: 0 }],
        }),
      );
      res.write(sse({ ...base, choices: [{ delta: { content: 'OpenRouter' }, index: 0 }] }));
      res.write(sse({ ...base, choices: [{ delta: {}, finish_reason: 'stop', index: 0 }] }));
      res.end('data: [DONE]\n\n');
    });
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;

  vi.stubEnv('OPENROUTER_API_KEY', 'sk-or-test-key');
  vi.stubEnv('OPENROUTER_PROXY_URL', `http://127.0.0.1:${port}/api/v1`);
});

afterAll(async () => {
  vi.unstubAllEnvs();
  await new Promise((resolve) => server.close(resolve));
});

describe('chat through OpenRouter with the server key', () => {
  it('defaults to OpenRouter', () => {
    expect(DEFAULT_PROVIDER).toBe('openrouter');
    expect(DEFAULT_MODEL).toBe('openrouter/auto');
  });

  it('streams an answer for the local user with no saved provider key', async () => {
    const { POST } = await import('./route');

    const res = await POST(
      new Request('https://lobe.example/webapi/chat/openrouter', {
        body: JSON.stringify({
          messages: [{ content: 'Say hello', role: 'user' }],
          model: DEFAULT_MODEL,
          stream: true,
        }),
        method: 'POST',
      }),
      { params: Promise.resolve({ provider: DEFAULT_PROVIDER }) },
    );

    const text = await res.text();
    expect(res.status, text).toBe(200);
    expect(text).toContain('Hello from ');
    expect(text).toContain('OpenRouter');

    expect(captured).toHaveLength(1);
    expect(captured[0].url).toBe('/api/v1/chat/completions');
    expect(captured[0].headers.authorization).toBe('Bearer sk-or-test-key');
    expect(captured[0].body.model).toBe('openrouter/auto');
  }, 120_000); // PGlite runs every migration on first use
});
