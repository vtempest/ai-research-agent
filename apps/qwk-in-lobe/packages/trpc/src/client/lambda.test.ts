import superjson from 'superjson';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { lambdaClient } from './lambda';

vi.mock('@/const/version', () => ({ isDesktop: false }));
vi.mock('@/services/_auth', () => ({ createHeaderWithAuth: async () => ({}) }));
vi.mock('@/business/client/trpc-headers', () => ({ getBusinessTrpcHeaders: async () => ({}) }));

const okTrpcResponse = (data: unknown) =>
  new Response(JSON.stringify({ result: { data: superjson.serialize(data) } }), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  });

describe('lambdaClient large-input query transport', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('location', new URL('http://localhost/chat'));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  // Regression: the visible-topic candidate set (up to 1000 ids) blows the
  // httpBatchLink GET URL budget (maxURLLength 2083) and used to be rejected
  // client-side with "Input is too big for a single dispatch" before any
  // request was made. These procedures must go over POST instead.
  it.each([
    [
      'agent.getTransferJobStatus',
      () =>
        lambdaClient.agent.getTransferJobStatus.query({
          agentId: 'agt_test',
          topicIds: Array.from({ length: 1000 }, (_, i) => `tpc_${String(i).padStart(16, '0')}`),
        }),
      'topicIds',
      1000,
    ],
    [
      'group.getTransferJobStatus',
      () =>
        lambdaClient.group.getTransferJobStatus.query({
          groupId: 'grp_test',
          topicIds: Array.from({ length: 1000 }, (_, i) => `tpc_${String(i).padStart(16, '0')}`),
        }),
      'topicIds',
      1000,
    ],
  ] as const)(
    'sends %s with a large path/id array as a POST request',
    async (path, call, arrayField, expectedLength) => {
      fetchMock.mockResolvedValueOnce(okTrpcResponse(null));

      await expect(call()).resolves.toBeNull();

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [input, init] = fetchMock.mock.calls[0] as [RequestInfo | URL, RequestInit];
      expect(init.method).toBe('POST');
      // The input travels in the body, not the query string.
      expect(String(input)).toContain(`/trpc/lambda/${path}`);
      expect(String(input).length).toBeLessThan(2083);
      const body = JSON.parse(String(init.body)) as { json: Record<string, unknown[]> };
      expect(body.json[arrayField]).toHaveLength(expectedLength);
    },
  );
});

const userState = vi.hoisted(() => ({
  isSignedIn: true,
  logout: vi.fn(),
  user: { email: 'guest-abc@guest.invalid' } as { email?: string } | undefined,
}));
const recoverGuestSession = vi.hoisted(() => vi.fn());

vi.mock('@/store/user/store', () => ({ getUserStoreState: () => userState }));
vi.mock('@/features/Auth/DemoAccount/recoverGuestSession', () => ({ recoverGuestSession }));

describe('lambdaClient 401 handling', () => {
  const fetchMock = vi.fn();
  // The handler debounces 401s for 5 s; give every test its own clock tick.
  let clock = 1_000_000;

  const unauthorized = (input: RequestInfo | URL) => {
    const error = superjson.serialize({
      code: -32_001,
      data: { code: 'UNAUTHORIZED', httpStatus: 401 },
      message: 'UNAUTHORIZED',
    });
    const body = String(input).includes('batch=1') ? [{ error }] : { error };
    return new Response(JSON.stringify(body), {
      headers: { 'content-type': 'application/json' },
      status: 401,
    });
  };

  const queryOnce = () =>
    lambdaClient.agent.getTransferJobStatus.query({ agentId: 'agt_test', topicIds: [] });

  beforeEach(() => {
    clock += 60_000;
    vi.spyOn(Date, 'now').mockReturnValue(clock);
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('location', new URL('http://localhost/chat'));
    fetchMock.mockImplementation(async (input: RequestInfo | URL) => unauthorized(input));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    fetchMock.mockReset();
    userState.logout.mockReset();
    recoverGuestSession.mockReset();
    userState.isSignedIn = true;
    userState.user = { email: 'guest-abc@guest.invalid' };
  });

  it('gives a guest a new guest session instead of the sign-in page', async () => {
    recoverGuestSession.mockResolvedValue('reloading');

    await expect(queryOnce()).rejects.toThrow();

    expect(recoverGuestSession).toHaveBeenCalledTimes(1);
    expect(userState.logout).not.toHaveBeenCalled();
  });

  it('keeps a guest on the page when the server still has their session', async () => {
    recoverGuestSession.mockResolvedValue('kept');

    await expect(queryOnce()).rejects.toThrow();

    expect(userState.logout).not.toHaveBeenCalled();
  });

  it('falls back to sign-in when the demo account is disabled', async () => {
    recoverGuestSession.mockResolvedValue('unavailable');

    await expect(queryOnce()).rejects.toThrow();

    expect(userState.logout).toHaveBeenCalledWith({
      redirectTo: expect.stringContaining('/signin?'),
    });
  });

  it('still sends a real account to sign in when its session expires', async () => {
    userState.user = { email: 'someone@example.com' };

    await expect(queryOnce()).rejects.toThrow();

    expect(recoverGuestSession).not.toHaveBeenCalled();
    expect(userState.logout).toHaveBeenCalledTimes(1);
  });
});
