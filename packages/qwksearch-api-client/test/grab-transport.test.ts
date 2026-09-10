/**
 * @fileoverview Proves the generated SDK actually sends its requests through
 * grab, and through the *shared* grab instance rather than a private copy.
 *
 * The distinction matters: `grab.mock`, the cache, the rate limiter and the
 * request log all live on the instance exported by `grab-url`. If the SDK
 * bundled its own, an app that stubbed `grab.mock['/search/engines']` or
 * primed the cache would see none of it apply to these endpoints.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { grab } from 'grab-url';
import { listSearchEngines } from '../src/sdk.gen';

/** Stubs the network and reports how many times it was actually hit. */
function stubNetwork(body: unknown) {
  const fetchMock = vi.fn().mockImplementation(
    async () =>
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

beforeEach(() => {
  grab.mock = {};
  // grab keys its cache, rate limiter and dedupe off the shared request log.
  grab.log = [];
});

afterEach(() => {
  grab.mock = {};
  grab.log = [];
  vi.unstubAllGlobals();
});

describe('SDK requests go through grab', () => {
  it('lets grab.mock answer an operation without touching the network', async () => {
    const fetchMock = stubNetwork({ engines: ['from the network'] });
    grab.mock['/search/engines'] = { response: { engines: ['from the mock'] } };

    const result = await listSearchEngines();

    expect(result.data).toEqual({ engines: ['from the mock'] });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('accepts grab options per request', async () => {
    const fetchMock = stubNetwork({ engines: [] });

    // `rateLimit` is a grab option, not a Hey API one — it only has an effect
    // if grab is the transport. The second call inside the window is refused
    // before it reaches the network, and comes back as an error result.
    const first = await listSearchEngines({ rateLimit: 30 } as never);
    const second = await listSearchEngines({ rateLimit: 30 } as never);

    expect(first.data).toEqual({ engines: [] });
    expect(second.error).toMatch(/rate limit/i);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('still reaches the network when nothing is mocked', async () => {
    const fetchMock = stubNetwork({ engines: ['live'] });

    const result = await listSearchEngines();

    expect(result.data).toEqual({ engines: ['live'] });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain('/search/engines');
  });
});
