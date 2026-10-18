import { context as otContext } from '@lobechat/observability-otel/api';
import type { ClientSecretPayload } from '@lobechat/types';
import { ChatErrorType } from '@lobechat/types';

import { getServerDB } from '@/database/core/db-adaptor';
import type { LobeChatDatabase } from '@/database/type';
import { extractTraceContext, injectActiveTraceHeaders } from '@/libs/observability/traceparent';
import { getLocalUserId } from '@/server/modules/LocalUser';
import { createErrorResponse } from '@/utils/errorResponse';

type RequestOptions = { params: Promise<{ provider?: string }> };

export type RequestHandler = (
  req: Request,
  options: RequestOptions & {
    jwtPayload: ClientSecretPayload;
    serverDB: LobeChatDatabase;
    userId: string;
  },
) => Promise<Response>;

/**
 * Wraps a `/webapi` route handler with the user it runs as. There is no
 * sign-in, so that is always the local user (`@/server/modules/LocalUser`).
 */
export const checkAuth =
  (handler: RequestHandler) => async (req: Request, options: RequestOptions) => {
    // Clone the request to avoid "Response body object should not be disturbed or locked" error
    // in Next.js 16 when the body stream has been consumed by Next.js internal mechanisms
    const clonedReq = req.clone();

    let serverDB: LobeChatDatabase;
    let userId: string;
    try {
      serverDB = await getServerDB();
      userId = await getLocalUserId();
    } catch (error) {
      console.error(error);
      const params = await options.params;
      return createErrorResponse(ChatErrorType.InternalServerError, {
        error,
        provider: params?.provider,
      });
    }

    const jwtPayload: ClientSecretPayload = { userId };

    const extractedContext = extractTraceContext(req.headers);

    const res = await otContext.with(extractedContext, () =>
      handler(clonedReq, { ...options, jwtPayload, serverDB, userId }),
    );

    // Only inject trace headers when the handler returns a Response
    if (!(res instanceof Response)) return res;

    try {
      const headers = new Headers(res.headers);
      const traceparent = injectActiveTraceHeaders(headers);
      if (!traceparent) return res;

      return new Response(res.body, { headers, status: res.status, statusText: res.statusText });
    } catch (err) {
      console.error('Failed to inject trace headers:', err);
      return res;
    }
  };
