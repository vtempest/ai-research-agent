import { API_KEY_PREFIX } from '@lobechat/utils/apiKey';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { requireAuth, userAuthMiddleware } from './auth';

interface TestHonoEnv {
  Variables: {
    apiKeyWorkspaceId: string | null | undefined;
    authData: unknown;
    authorizationHeader: string | null;
    authType: string | null;
    userId: string | null;
  };
}

const {
  mockApiKeyFindByKey,
  mockApiKeyUpdateLastUsed,
  mockGetLocalUserId,
  mockGetServerDB,
  mockExtractBearerToken,
  mockServerDB,
  mockValidateApiKeyFormat,
} = vi.hoisted(() => ({
  mockApiKeyFindByKey: vi.fn(),
  mockApiKeyUpdateLastUsed: vi.fn(),
  mockExtractBearerToken: vi.fn(),
  mockGetLocalUserId: vi.fn(),
  mockGetServerDB: vi.fn(),
  mockServerDB: {},
  mockValidateApiKeyFormat: vi.fn(),
}));

vi.mock('@/database/core/db-adaptor', () => ({
  getServerDB: mockGetServerDB,
}));

vi.mock('@/database/models/apiKey', () => ({
  ApiKeyModel: class {
    static findByKey = mockApiKeyFindByKey;
    updateLastUsed = mockApiKeyUpdateLastUsed;
  },
}));

vi.mock('@/server/modules/LocalUser', () => ({
  getLocalUserId: mockGetLocalUserId,
}));

vi.mock('@/utils/apiKey', () => ({
  validateApiKeyFormat: mockValidateApiKeyFormat,
}));

vi.mock('@/utils/server/auth', () => ({
  extractBearerToken: mockExtractBearerToken,
}));

const createApp = () => {
  const app = new Hono<TestHonoEnv>();

  app.onError((error, c) => {
    if (error instanceof HTTPException) return error.getResponse();

    return c.text(error.message, 500);
  });

  app.use('*', userAuthMiddleware);
  app.get('/protected', requireAuth, (c) =>
    c.json({
      apiKeyWorkspaceId: c.get('apiKeyWorkspaceId') ?? null,
      authType: c.get('authType'),
      userId: c.get('userId'),
    }),
  );

  return app;
};

describe('OpenAPI auth middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockExtractBearerToken.mockReturnValue(null);
    mockGetLocalUserId.mockResolvedValue('qwk-local-user');
    mockGetServerDB.mockResolvedValue(mockServerDB);
    mockApiKeyFindByKey.mockResolvedValue(null);
    mockApiKeyUpdateLastUsed.mockResolvedValue(undefined);
    mockValidateApiKeyFormat.mockReturnValue(false);
  });

  it('runs a request without a Bearer token as the local user', async () => {
    const response = await createApp().request('/protected');

    await expect(response.json()).resolves.toEqual({
      apiKeyWorkspaceId: null,
      authType: 'local',
      userId: 'qwk-local-user',
    });
    expect(response.status).toBe(200);
  });

  it('leaves the request unauthenticated when the local user cannot be resolved', async () => {
    mockGetLocalUserId.mockRejectedValue(new Error('database unavailable'));

    const response = await createApp().request('/protected');

    expect(response.status).toBe(401);
  });

  it('rejects a Bearer token that is not a valid API key', async () => {
    mockExtractBearerToken.mockReturnValue('not-an-api-key');

    const response = await createApp().request('/protected', {
      headers: { Authorization: 'Bearer not-an-api-key' },
    });

    expect(response.status).toBe(401);
    expect(mockGetLocalUserId).not.toHaveBeenCalled();
  });

  it('should expose the workspace scope of an API Key to downstream middleware', async () => {
    mockExtractBearerToken.mockReturnValueOnce(`${API_KEY_PREFIX}workspacekey01`);
    mockValidateApiKeyFormat.mockReturnValueOnce(true);
    mockApiKeyFindByKey.mockResolvedValueOnce({
      enabled: true,
      expiresAt: null,
      id: 'api-key-1',
      name: 'Workspace key',
      userId: 'user-1',
      workspaceId: 'workspace-1',
    });

    const response = await createApp().request('/protected', {
      headers: { Authorization: `Bearer ${API_KEY_PREFIX}workspacekey01` },
    });

    await expect(response.json()).resolves.toEqual({
      apiKeyWorkspaceId: 'workspace-1',
      authType: 'apikey',
      userId: 'user-1',
    });
    expect(response.status).toBe(200);
  });

  it('should expose a null workspace scope for a personal API Key', async () => {
    mockExtractBearerToken.mockReturnValueOnce(`${API_KEY_PREFIX}personalkey001`);
    mockValidateApiKeyFormat.mockReturnValueOnce(true);
    mockApiKeyFindByKey.mockResolvedValueOnce({
      enabled: true,
      expiresAt: null,
      id: 'api-key-2',
      name: 'Personal key',
      userId: 'user-1',
      workspaceId: null,
    });

    const response = await createApp().request('/protected', {
      headers: { Authorization: `Bearer ${API_KEY_PREFIX}personalkey001` },
    });

    await expect(response.json()).resolves.toEqual({
      apiKeyWorkspaceId: null,
      authType: 'apikey',
      userId: 'user-1',
    });
    expect(response.status).toBe(200);
  });

  it('should re-read API Key authorization changes on every request', async () => {
    mockExtractBearerToken.mockReturnValue(`${API_KEY_PREFIX}workspacekey01`);
    mockValidateApiKeyFormat.mockReturnValue(true);
    mockApiKeyFindByKey
      .mockResolvedValueOnce({
        enabled: true,
        expiresAt: null,
        id: 'api-key-1',
        name: 'Workspace key',
        scopes: ['agent:read'],
        userId: 'user-1',
        workspaceId: 'workspace-1',
      })
      .mockResolvedValueOnce({
        enabled: false,
        expiresAt: null,
        id: 'api-key-1',
        name: 'Workspace key',
        scopes: ['agent:read'],
        userId: 'user-1',
        workspaceId: 'workspace-1',
      });
    const app = createApp();

    expect(
      (
        await app.request('/protected', {
          headers: { Authorization: `Bearer ${API_KEY_PREFIX}workspacekey01` },
        })
      ).status,
    ).toBe(200);
    expect(
      (
        await app.request('/protected', {
          headers: { Authorization: `Bearer ${API_KEY_PREFIX}workspacekey01` },
        })
      ).status,
    ).toBe(401);
    expect(mockApiKeyFindByKey).toHaveBeenCalledTimes(2);
  });
});
