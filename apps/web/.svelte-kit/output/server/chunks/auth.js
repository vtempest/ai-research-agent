import { createRouter, APIError } from "better-call";
import { i as isTest, a as isDevelopment, l as listSessions, u as updateUser, c as createAuthEndpoint, g as getSession, t as toAuthEndpoints, o as originCheckMiddleware, b as logger, B as BASE_ERROR_CODES, p as parseUserInput, d as createEmailVerificationToken, s as setSessionCookie, e as error, f as ok, h as accountInfo, j as getAccessToken, r as refreshToken, k as unlinkAccount, m as deleteUserCallback, n as listUserAccounts, q as linkSocialAccount, v as revokeOtherSessions, w as revokeSessions, x as revokeSession, y as requestPasswordResetCallback, z as requestPasswordReset, A as forgetPasswordCallback, C as deleteUser, D as setPassword, E as changePassword, F as changeEmail, G as sendVerificationEmail, H as verifyEmail, I as resetPassword, J as forgetPassword, K as signInEmail, L as signOut, M as callbackOAuth, N as signInSocial, O as wildcardMatch, P as safeJSONParse, Q as generateId, R as BetterAuthError, S as parseSessionOutput, T as parseUserOutput, U as getDate, V as createLogger, W as getBaseURL, X as getOrigin, Y as env, Z as isProduction, _ as getCookies, $ as socialProviders, a0 as createCookieGetter, a1 as verifyPassword, a2 as hashPassword, a3 as getBooleanEnvVar, a4 as ENV, a5 as hashToBase64, a6 as getEnvVar } from "./better-auth.Dgq_1hxR.js";
import * as z from "zod";
import "@better-auth/utils/hash";
import "@better-auth/utils/base64";
import "@better-auth/utils/hex";
import "@better-auth/utils/random";
import { betterFetch } from "@better-fetch/fetch";
import "@better-auth/utils/hmac";
import "@better-auth/utils/binary";
import { defu } from "defu";
import { SqliteDialect, MysqlDialect, PostgresDialect, MssqlDialect, Kysely, sql } from "kysely";
import { count, desc, asc, inArray, notInArray, like, lt, lte, ne, gt, gte, eq, and, or, sql as sql$1 } from "drizzle-orm";
import "./validations.js";
import "@better-auth/utils/otp";
import "@better-auth/utils";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { drizzle } from "drizzle-orm/d1";
import { error as error$1 } from "@sveltejs/kit";
import { u as user, s as schema } from "./schema.js";
import { P as PUBLIC_DOMAIN } from "./customize-site.js";
function getIp(req, options) {
  if (options.advanced?.ipAddress?.disableIpTracking) {
    return null;
  }
  if (isTest()) {
    return "127.0.0.1";
  }
  if (isDevelopment) {
    return "127.0.0.1";
  }
  const headers = "headers" in req ? req.headers : req;
  const defaultHeaders = ["x-forwarded-for"];
  const ipHeaders = options.advanced?.ipAddress?.ipAddressHeaders || defaultHeaders;
  for (const key of ipHeaders) {
    const value = "get" in headers ? headers.get(key) : headers[key];
    if (typeof value === "string") {
      const ip = value.split(",")[0].trim();
      if (isValidIP(ip)) {
        return ip;
      }
    }
  }
  return null;
}
function isValidIP(ip) {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(ip)) {
    const parts = ip.split(".").map(Number);
    return parts.every((part) => part >= 0 && part <= 255);
  }
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv6Regex.test(ip);
}
const signUpEmail = () => createAuthEndpoint(
  "/sign-up/email",
  {
    method: "POST",
    body: z.record(z.string(), z.any()),
    metadata: {
      $Infer: {
        body: {}
      },
      openapi: {
        description: "Sign up a user using email and password",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "The name of the user"
                  },
                  email: {
                    type: "string",
                    description: "The email of the user"
                  },
                  password: {
                    type: "string",
                    description: "The password of the user"
                  },
                  image: {
                    type: "string",
                    description: "The profile image URL of the user"
                  },
                  callbackURL: {
                    type: "string",
                    description: "The URL to use for email verification callback"
                  },
                  rememberMe: {
                    type: "boolean",
                    description: "If this is false, the session will not be remembered. Default is `true`."
                  }
                },
                required: ["name", "email", "password"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Successfully created user",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      nullable: true,
                      description: "Authentication token for the session"
                    },
                    user: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          description: "The unique identifier of the user"
                        },
                        email: {
                          type: "string",
                          format: "email",
                          description: "The email address of the user"
                        },
                        name: {
                          type: "string",
                          description: "The name of the user"
                        },
                        image: {
                          type: "string",
                          format: "uri",
                          nullable: true,
                          description: "The profile image URL of the user"
                        },
                        emailVerified: {
                          type: "boolean",
                          description: "Whether the email has been verified"
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          description: "When the user was created"
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          description: "When the user was last updated"
                        }
                      },
                      required: [
                        "id",
                        "email",
                        "name",
                        "emailVerified",
                        "createdAt",
                        "updatedAt"
                      ]
                    }
                  },
                  required: ["user"]
                  // token is optional
                }
              }
            }
          },
          "422": {
            description: "Unprocessable Entity. User already exists or failed to create user.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    if (!ctx.context.options.emailAndPassword?.enabled || ctx.context.options.emailAndPassword?.disableSignUp) {
      throw new APIError("BAD_REQUEST", {
        message: "Email and password sign up is not enabled"
      });
    }
    const body = ctx.body;
    const {
      name,
      email,
      password,
      image,
      callbackURL,
      rememberMe,
      ...additionalFields
    } = body;
    const isValidEmail = z.email().safeParse(email);
    if (!isValidEmail.success) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.INVALID_EMAIL
      });
    }
    const minPasswordLength = ctx.context.password.config.minPasswordLength;
    if (password.length < minPasswordLength) {
      ctx.context.logger.error("Password is too short");
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT
      });
    }
    const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
    if (password.length > maxPasswordLength) {
      ctx.context.logger.error("Password is too long");
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.PASSWORD_TOO_LONG
      });
    }
    const dbUser = await ctx.context.internalAdapter.findUserByEmail(email);
    if (dbUser?.user) {
      ctx.context.logger.info(`Sign-up attempt for existing email: ${email}`);
      throw new APIError("UNPROCESSABLE_ENTITY", {
        message: BASE_ERROR_CODES.USER_ALREADY_EXISTS
      });
    }
    const additionalData = parseUserInput(
      ctx.context.options,
      additionalFields
    );
    const hash = await ctx.context.password.hash(password);
    let createdUser;
    try {
      createdUser = await ctx.context.internalAdapter.createUser(
        {
          email: email.toLowerCase(),
          name,
          image,
          ...additionalData,
          emailVerified: false
        },
        ctx
      );
      if (!createdUser) {
        throw new APIError("BAD_REQUEST", {
          message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER
        });
      }
    } catch (e) {
      if (isDevelopment) {
        ctx.context.logger.error("Failed to create user", e);
      }
      if (e instanceof APIError) {
        throw e;
      }
      throw new APIError("UNPROCESSABLE_ENTITY", {
        message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER,
        details: e
      });
    }
    if (!createdUser) {
      throw new APIError("UNPROCESSABLE_ENTITY", {
        message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER
      });
    }
    await ctx.context.internalAdapter.linkAccount(
      {
        userId: createdUser.id,
        providerId: "credential",
        accountId: createdUser.id,
        password: hash
      },
      ctx
    );
    if (ctx.context.options.emailVerification?.sendOnSignUp || ctx.context.options.emailAndPassword.requireEmailVerification) {
      const token = await createEmailVerificationToken(
        ctx.context.secret,
        createdUser.email,
        void 0,
        ctx.context.options.emailVerification?.expiresIn
      );
      const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${body.callbackURL || "/"}`;
      await ctx.context.options.emailVerification?.sendVerificationEmail?.(
        {
          user: createdUser,
          url,
          token
        },
        ctx.request
      );
    }
    if (ctx.context.options.emailAndPassword.autoSignIn === false || ctx.context.options.emailAndPassword.requireEmailVerification) {
      return ctx.json({
        token: null,
        user: {
          id: createdUser.id,
          email: createdUser.email,
          name: createdUser.name,
          image: createdUser.image,
          emailVerified: createdUser.emailVerified,
          createdAt: createdUser.createdAt,
          updatedAt: createdUser.updatedAt
        }
      });
    }
    const session = await ctx.context.internalAdapter.createSession(
      createdUser.id,
      ctx,
      rememberMe === false
    );
    if (!session) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION
      });
    }
    await setSessionCookie(
      ctx,
      {
        session,
        user: createdUser
      },
      rememberMe === false
    );
    return ctx.json({
      token: session.token,
      user: {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        image: createdUser.image,
        emailVerified: createdUser.emailVerified,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt
      }
    });
  }
);
function shouldRateLimit(max, window2, rateLimitData) {
  const now = Date.now();
  const windowInMs = window2 * 1e3;
  const timeSinceLastRequest = now - rateLimitData.lastRequest;
  return timeSinceLastRequest < windowInMs && rateLimitData.count >= max;
}
function rateLimitResponse(retryAfter) {
  return new Response(
    JSON.stringify({
      message: "Too many requests. Please try again later."
    }),
    {
      status: 429,
      statusText: "Too Many Requests",
      headers: {
        "X-Retry-After": retryAfter.toString()
      }
    }
  );
}
function getRetryAfter(lastRequest, window2) {
  const now = Date.now();
  const windowInMs = window2 * 1e3;
  return Math.ceil((lastRequest + windowInMs - now) / 1e3);
}
function createDBStorage(ctx) {
  const model = "rateLimit";
  const db = ctx.adapter;
  return {
    get: async (key) => {
      const res = await db.findMany({
        model,
        where: [{ field: "key", value: key }]
      });
      const data = res[0];
      if (typeof data?.lastRequest === "bigint") {
        data.lastRequest = Number(data.lastRequest);
      }
      return data;
    },
    set: async (key, value, _update) => {
      try {
        if (_update) {
          await db.updateMany({
            model,
            where: [{ field: "key", value: key }],
            update: {
              count: value.count,
              lastRequest: value.lastRequest
            }
          });
        } else {
          await db.create({
            model,
            data: {
              key,
              count: value.count,
              lastRequest: value.lastRequest
            }
          });
        }
      } catch (e) {
        ctx.logger.error("Error setting rate limit", e);
      }
    }
  };
}
const memory = /* @__PURE__ */ new Map();
function getRateLimitStorage(ctx) {
  if (ctx.options.rateLimit?.customStorage) {
    return ctx.options.rateLimit.customStorage;
  }
  if (ctx.rateLimit.storage === "secondary-storage") {
    return {
      get: async (key) => {
        const data = await ctx.options.secondaryStorage?.get(key);
        return data ? safeJSONParse(data) : void 0;
      },
      set: async (key, value) => {
        await ctx.options.secondaryStorage?.set?.(key, JSON.stringify(value));
      }
    };
  }
  const storage = ctx.rateLimit.storage;
  if (storage === "memory") {
    return {
      async get(key) {
        return memory.get(key);
      },
      async set(key, value, _update) {
        memory.set(key, value);
      }
    };
  }
  return createDBStorage(ctx);
}
async function onRequestRateLimit(req, ctx) {
  if (!ctx.rateLimit.enabled) {
    return;
  }
  const path = new URL(req.url).pathname.replace(
    ctx.options.basePath || "/api/auth",
    ""
  );
  let window2 = ctx.rateLimit.window;
  let max = ctx.rateLimit.max;
  const ip = getIp(req, ctx.options);
  if (!ip) {
    return;
  }
  const key = ip + path;
  const specialRules = getDefaultSpecialRules();
  const specialRule = specialRules.find((rule) => rule.pathMatcher(path));
  if (specialRule) {
    window2 = specialRule.window;
    max = specialRule.max;
  }
  for (const plugin of ctx.options.plugins || []) {
    if (plugin.rateLimit) {
      const matchedRule = plugin.rateLimit.find(
        (rule) => rule.pathMatcher(path)
      );
      if (matchedRule) {
        window2 = matchedRule.window;
        max = matchedRule.max;
        break;
      }
    }
  }
  if (ctx.rateLimit.customRules) {
    const _path = Object.keys(ctx.rateLimit.customRules).find((p) => {
      if (p.includes("*")) {
        const isMatch = wildcardMatch(p)(path);
        return isMatch;
      }
      return p === path;
    });
    if (_path) {
      const customRule = ctx.rateLimit.customRules[_path];
      const resolved = typeof customRule === "function" ? await customRule(req) : customRule;
      if (resolved) {
        window2 = resolved.window;
        max = resolved.max;
      }
      if (resolved === false) {
        return;
      }
    }
  }
  const storage = getRateLimitStorage(ctx);
  const data = await storage.get(key);
  const now = Date.now();
  if (!data) {
    await storage.set(key, {
      key,
      count: 1,
      lastRequest: now
    });
  } else {
    const timeSinceLastRequest = now - data.lastRequest;
    if (shouldRateLimit(max, window2, data)) {
      const retryAfter = getRetryAfter(data.lastRequest, window2);
      return rateLimitResponse(retryAfter);
    } else if (timeSinceLastRequest > window2 * 1e3) {
      await storage.set(
        key,
        {
          ...data,
          count: 1,
          lastRequest: now
        },
        true
      );
    } else {
      await storage.set(
        key,
        {
          ...data,
          count: data.count + 1,
          lastRequest: now
        },
        true
      );
    }
  }
}
function getDefaultSpecialRules() {
  const specialRules = [
    {
      pathMatcher(path) {
        return path.startsWith("/sign-in") || path.startsWith("/sign-up") || path.startsWith("/change-password") || path.startsWith("/change-email");
      },
      window: 10,
      max: 3
    }
  ];
  return specialRules;
}
function checkEndpointConflicts(options, logger2) {
  const endpointRegistry = /* @__PURE__ */ new Map();
  options.plugins?.forEach((plugin) => {
    if (plugin.endpoints) {
      for (const [key, endpoint] of Object.entries(plugin.endpoints)) {
        if (endpoint && "path" in endpoint) {
          const path = endpoint.path;
          let methods = [];
          if (endpoint.options && "method" in endpoint.options) {
            if (Array.isArray(endpoint.options.method)) {
              methods = endpoint.options.method;
            } else if (typeof endpoint.options.method === "string") {
              methods = [endpoint.options.method];
            }
          }
          if (methods.length === 0) {
            methods = ["*"];
          }
          if (!endpointRegistry.has(path)) {
            endpointRegistry.set(path, []);
          }
          endpointRegistry.get(path).push({
            pluginId: plugin.id,
            endpointKey: key,
            methods
          });
        }
      }
    }
  });
  const conflicts = [];
  for (const [path, entries] of endpointRegistry.entries()) {
    if (entries.length > 1) {
      const methodMap = /* @__PURE__ */ new Map();
      let hasConflict = false;
      for (const entry of entries) {
        for (const method of entry.methods) {
          if (!methodMap.has(method)) {
            methodMap.set(method, []);
          }
          methodMap.get(method).push(entry.pluginId);
          if (methodMap.get(method).length > 1) {
            hasConflict = true;
          }
          if (method === "*" && entries.length > 1) {
            hasConflict = true;
          } else if (method !== "*" && methodMap.has("*")) {
            hasConflict = true;
          }
        }
      }
      if (hasConflict) {
        const uniquePlugins = [...new Set(entries.map((e) => e.pluginId))];
        const conflictingMethods = [];
        for (const [method, plugins] of methodMap.entries()) {
          if (plugins.length > 1 || method === "*" && entries.length > 1 || method !== "*" && methodMap.has("*")) {
            conflictingMethods.push(method);
          }
        }
        conflicts.push({
          path,
          plugins: uniquePlugins,
          conflictingMethods
        });
      }
    }
  }
  if (conflicts.length > 0) {
    const conflictMessages = conflicts.map(
      (conflict) => `  - "${conflict.path}" [${conflict.conflictingMethods.join(", ")}] used by plugins: ${conflict.plugins.join(", ")}`
    ).join("\n");
    logger2.error(
      `Endpoint path conflicts detected! Multiple plugins are trying to use the same endpoint paths with conflicting HTTP methods:
${conflictMessages}

To resolve this, you can:
	1. Use only one of the conflicting plugins
	2. Configure the plugins to use different paths (if supported)
	3. Ensure plugins use different HTTP methods for the same path
`
    );
  }
}
function getEndpoints(ctx, options) {
  const pluginEndpoints = options.plugins?.reduce(
    (acc, plugin) => {
      return {
        ...acc,
        ...plugin.endpoints
      };
    },
    {}
  );
  const middlewares = options.plugins?.map(
    (plugin) => plugin.middlewares?.map((m) => {
      const middleware = (async (context) => {
        const authContext = await ctx;
        return m.middleware({
          ...context,
          context: {
            ...authContext,
            ...context.context
          }
        });
      });
      middleware.options = m.middleware.options;
      return {
        path: m.path,
        middleware
      };
    })
  ).filter((plugin) => plugin !== void 0).flat() || [];
  const baseEndpoints = {
    signInSocial,
    callbackOAuth,
    getSession: getSession(),
    signOut,
    signUpEmail: signUpEmail(),
    signInEmail,
    forgetPassword,
    resetPassword,
    verifyEmail,
    sendVerificationEmail,
    changeEmail,
    changePassword,
    setPassword,
    updateUser: updateUser(),
    deleteUser,
    forgetPasswordCallback,
    requestPasswordReset,
    requestPasswordResetCallback,
    listSessions: listSessions(),
    revokeSession,
    revokeSessions,
    revokeOtherSessions,
    linkSocialAccount,
    listUserAccounts,
    deleteUserCallback,
    unlinkAccount,
    refreshToken,
    getAccessToken,
    accountInfo
  };
  const endpoints = {
    ...baseEndpoints,
    ...pluginEndpoints,
    ok,
    error
  };
  const api = toAuthEndpoints(endpoints, ctx);
  return {
    api,
    middlewares
  };
}
const router = (ctx, options) => {
  const { api, middlewares } = getEndpoints(ctx, options);
  const basePath = new URL(ctx.baseURL).pathname;
  return createRouter(api, {
    routerContext: ctx,
    openapi: {
      disabled: true
    },
    basePath,
    routerMiddleware: [
      {
        path: "/**",
        middleware: originCheckMiddleware
      },
      ...middlewares
    ],
    async onRequest(req) {
      const disabledPaths = ctx.options.disabledPaths || [];
      const path = new URL(req.url).pathname.replace(basePath, "");
      if (disabledPaths.includes(path)) {
        return new Response("Not Found", { status: 404 });
      }
      for (const plugin of ctx.options.plugins || []) {
        if (plugin.onRequest) {
          const response = await plugin.onRequest(req, ctx);
          if (response && "response" in response) {
            return response.response;
          }
        }
      }
      return onRequestRateLimit(req, ctx);
    },
    async onResponse(res) {
      for (const plugin of ctx.options.plugins || []) {
        if (plugin.onResponse) {
          const response = await plugin.onResponse(res, ctx);
          if (response) {
            return response.response;
          }
        }
      }
      return res;
    },
    onError(e) {
      if (e instanceof APIError && e.status === "FOUND") {
        return;
      }
      if (options.onAPIError?.throw) {
        throw e;
      }
      if (options.onAPIError?.onError) {
        options.onAPIError.onError(e, ctx);
        return;
      }
      const optLogLevel = options.logger?.level;
      const log = optLogLevel === "error" || optLogLevel === "warn" || optLogLevel === "debug" ? logger : void 0;
      if (options.logger?.disabled !== true) {
        if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
          if (e.message.includes("no column") || e.message.includes("column") || e.message.includes("relation") || e.message.includes("table") || e.message.includes("does not exist")) {
            ctx.logger?.error(e.message);
            return;
          }
        }
        if (e instanceof APIError) {
          if (e.status === "INTERNAL_SERVER_ERROR") {
            ctx.logger.error(e.status, e);
          }
          log?.error(e.message);
        } else {
          ctx.logger?.error(
            e && typeof e === "object" && "name" in e ? e.name : "",
            e
          );
        }
      }
    }
  });
};
const getAuthTables = (options) => {
  const pluginSchema = (options.plugins ?? []).reduce(
    (acc, plugin) => {
      const schema2 = plugin.schema;
      if (!schema2) return acc;
      for (const [key, value] of Object.entries(schema2)) {
        acc[key] = {
          fields: {
            ...acc[key]?.fields,
            ...value.fields
          },
          modelName: value.modelName || key
        };
      }
      return acc;
    },
    {}
  );
  const shouldAddRateLimitTable = options.rateLimit?.storage === "database";
  const rateLimitTable = {
    rateLimit: {
      modelName: options.rateLimit?.modelName || "rateLimit",
      fields: {
        key: {
          type: "string",
          fieldName: options.rateLimit?.fields?.key || "key"
        },
        count: {
          type: "number",
          fieldName: options.rateLimit?.fields?.count || "count"
        },
        lastRequest: {
          type: "number",
          bigint: true,
          fieldName: options.rateLimit?.fields?.lastRequest || "lastRequest"
        }
      }
    }
  };
  const { user: user2, session, account, ...pluginTables } = pluginSchema;
  const sessionTable = {
    session: {
      modelName: options.session?.modelName || "session",
      fields: {
        expiresAt: {
          type: "date",
          required: true,
          fieldName: options.session?.fields?.expiresAt || "expiresAt"
        },
        token: {
          type: "string",
          required: true,
          fieldName: options.session?.fields?.token || "token",
          unique: true
        },
        createdAt: {
          type: "date",
          required: true,
          fieldName: options.session?.fields?.createdAt || "createdAt",
          defaultValue: () => /* @__PURE__ */ new Date()
        },
        updatedAt: {
          type: "date",
          required: true,
          fieldName: options.session?.fields?.updatedAt || "updatedAt",
          onUpdate: () => /* @__PURE__ */ new Date()
        },
        ipAddress: {
          type: "string",
          required: false,
          fieldName: options.session?.fields?.ipAddress || "ipAddress"
        },
        userAgent: {
          type: "string",
          required: false,
          fieldName: options.session?.fields?.userAgent || "userAgent"
        },
        userId: {
          type: "string",
          fieldName: options.session?.fields?.userId || "userId",
          references: {
            model: options.user?.modelName || "user",
            field: "id",
            onDelete: "cascade"
          },
          required: true
        },
        ...session?.fields,
        ...options.session?.additionalFields
      },
      order: 2
    }
  };
  return {
    user: {
      modelName: options.user?.modelName || "user",
      fields: {
        name: {
          type: "string",
          required: true,
          fieldName: options.user?.fields?.name || "name",
          sortable: true
        },
        email: {
          type: "string",
          unique: true,
          required: true,
          fieldName: options.user?.fields?.email || "email",
          sortable: true
        },
        emailVerified: {
          type: "boolean",
          defaultValue: false,
          required: true,
          fieldName: options.user?.fields?.emailVerified || "emailVerified"
        },
        image: {
          type: "string",
          required: false,
          fieldName: options.user?.fields?.image || "image"
        },
        createdAt: {
          type: "date",
          defaultValue: () => /* @__PURE__ */ new Date(),
          required: true,
          fieldName: options.user?.fields?.createdAt || "createdAt"
        },
        updatedAt: {
          type: "date",
          defaultValue: () => /* @__PURE__ */ new Date(),
          onUpdate: () => /* @__PURE__ */ new Date(),
          required: true,
          fieldName: options.user?.fields?.updatedAt || "updatedAt"
        },
        ...user2?.fields,
        ...options.user?.additionalFields
      },
      order: 1
    },
    //only add session table if it's not stored in secondary storage
    ...!options.secondaryStorage || options.session?.storeSessionInDatabase ? sessionTable : {},
    account: {
      modelName: options.account?.modelName || "account",
      fields: {
        accountId: {
          type: "string",
          required: true,
          fieldName: options.account?.fields?.accountId || "accountId"
        },
        providerId: {
          type: "string",
          required: true,
          fieldName: options.account?.fields?.providerId || "providerId"
        },
        userId: {
          type: "string",
          references: {
            model: options.user?.modelName || "user",
            field: "id",
            onDelete: "cascade"
          },
          required: true,
          fieldName: options.account?.fields?.userId || "userId"
        },
        accessToken: {
          type: "string",
          required: false,
          fieldName: options.account?.fields?.accessToken || "accessToken"
        },
        refreshToken: {
          type: "string",
          required: false,
          fieldName: options.account?.fields?.refreshToken || "refreshToken"
        },
        idToken: {
          type: "string",
          required: false,
          fieldName: options.account?.fields?.idToken || "idToken"
        },
        accessTokenExpiresAt: {
          type: "date",
          required: false,
          fieldName: options.account?.fields?.accessTokenExpiresAt || "accessTokenExpiresAt"
        },
        refreshTokenExpiresAt: {
          type: "date",
          required: false,
          fieldName: options.account?.fields?.refreshTokenExpiresAt || "refreshTokenExpiresAt"
        },
        scope: {
          type: "string",
          required: false,
          fieldName: options.account?.fields?.scope || "scope"
        },
        password: {
          type: "string",
          required: false,
          fieldName: options.account?.fields?.password || "password"
        },
        createdAt: {
          type: "date",
          required: true,
          fieldName: options.account?.fields?.createdAt || "createdAt",
          defaultValue: () => /* @__PURE__ */ new Date()
        },
        updatedAt: {
          type: "date",
          required: true,
          fieldName: options.account?.fields?.updatedAt || "updatedAt",
          onUpdate: () => /* @__PURE__ */ new Date()
        },
        ...account?.fields
      },
      order: 3
    },
    verification: {
      modelName: options.verification?.modelName || "verification",
      fields: {
        identifier: {
          type: "string",
          required: true,
          fieldName: options.verification?.fields?.identifier || "identifier"
        },
        value: {
          type: "string",
          required: true,
          fieldName: options.verification?.fields?.value || "value"
        },
        expiresAt: {
          type: "date",
          required: true,
          fieldName: options.verification?.fields?.expiresAt || "expiresAt"
        },
        createdAt: {
          type: "date",
          required: true,
          defaultValue: () => /* @__PURE__ */ new Date(),
          fieldName: options.verification?.fields?.createdAt || "createdAt"
        },
        updatedAt: {
          type: "date",
          required: true,
          defaultValue: () => /* @__PURE__ */ new Date(),
          onUpdate: () => /* @__PURE__ */ new Date(),
          fieldName: options.verification?.fields?.updatedAt || "updatedAt"
        }
      },
      order: 4
    },
    ...pluginTables,
    ...shouldAddRateLimitTable ? rateLimitTable : {}
  };
};
function withApplyDefault(value, field, action) {
  if (action === "update") {
    if (value === void 0 && field.onUpdate !== void 0) {
      if (typeof field.onUpdate === "function") {
        return field.onUpdate();
      }
      return field.onUpdate;
    }
    return value;
  }
  if (value === void 0 || value === null) {
    if (field.defaultValue !== void 0) {
      if (typeof field.defaultValue === "function") {
        return field.defaultValue();
      }
      return field.defaultValue;
    }
  }
  return value;
}
let debugLogs = [];
let transactionId = -1;
const colors = {
  reset: "\x1B[0m",
  bright: "\x1B[1m",
  dim: "\x1B[2m",
  fg: {
    yellow: "\x1B[33m",
    magenta: "\x1B[35m"
  },
  bg: {
    black: "\x1B[40m"
  }
};
const createAsIsTransaction = (adapter) => (fn) => fn(adapter);
const createAdapterFactory = ({
  adapter: customAdapter,
  config: cfg
}) => (options) => {
  const config = {
    ...cfg,
    supportsBooleans: cfg.supportsBooleans ?? true,
    supportsDates: cfg.supportsDates ?? true,
    supportsJSON: cfg.supportsJSON ?? false,
    adapterName: cfg.adapterName ?? cfg.adapterId,
    supportsNumericIds: cfg.supportsNumericIds ?? true
  };
  if (options.advanced?.database?.useNumberId === true && config.supportsNumericIds === false) {
    throw new Error(
      `[${config.adapterName}] Your database or database adapter does not support numeric ids. Please disable "useNumberId" in your config.`
    );
  }
  const schema2 = getAuthTables(options);
  const getDefaultFieldName = ({
    field,
    model: unsafe_model
  }) => {
    if (field === "id" || field === "_id") {
      return "id";
    }
    const model = getDefaultModelName(unsafe_model);
    let f = schema2[model]?.fields[field];
    if (!f) {
      f = Object.values(schema2[model]?.fields).find(
        (f2) => f2.fieldName === field
      );
    }
    if (!f) {
      debugLog(`Field ${field} not found in model ${model}`);
      debugLog(`Schema:`, schema2);
      throw new Error(`Field ${field} not found in model ${model}`);
    }
    return field;
  };
  const getDefaultModelName = (model) => {
    if (config.usePlural && model.charAt(model.length - 1) === "s") {
      let pluralessModel = model.slice(0, -1);
      let m2 = schema2[pluralessModel] ? pluralessModel : void 0;
      if (!m2) {
        m2 = Object.entries(schema2).find(
          ([_, f]) => f.modelName === pluralessModel
        )?.[0];
      }
      if (m2) {
        return m2;
      }
    }
    let m = schema2[model] ? model : void 0;
    if (!m) {
      m = Object.entries(schema2).find(([_, f]) => f.modelName === model)?.[0];
    }
    if (!m) {
      debugLog(`Model "${model}" not found in schema`);
      debugLog(`Schema:`, schema2);
      throw new Error(`Model "${model}" not found in schema`);
    }
    return m;
  };
  const getModelName = (model) => {
    const defaultModelKey = getDefaultModelName(model);
    const usePlural = config && config.usePlural;
    const useCustomModelName = schema2 && schema2[defaultModelKey] && schema2[defaultModelKey].modelName !== model;
    if (useCustomModelName) {
      return usePlural ? `${schema2[defaultModelKey].modelName}s` : schema2[defaultModelKey].modelName;
    }
    return usePlural ? `${model}s` : model;
  };
  function getFieldName({
    model: model_name,
    field: field_name
  }) {
    const model = getDefaultModelName(model_name);
    const field = getDefaultFieldName({ model, field: field_name });
    return schema2[model]?.fields[field]?.fieldName || field;
  }
  const debugLog = (...args) => {
    if (config.debugLogs === true || typeof config.debugLogs === "object") {
      if (typeof config.debugLogs === "object" && "isRunningAdapterTests" in config.debugLogs) {
        if (config.debugLogs.isRunningAdapterTests) {
          args.shift();
          debugLogs.push(args);
        }
        return;
      }
      if (typeof config.debugLogs === "object" && config.debugLogs.logCondition && !config.debugLogs.logCondition?.()) {
        return;
      }
      if (typeof args[0] === "object" && "method" in args[0]) {
        const method = args.shift().method;
        if (typeof config.debugLogs === "object") {
          if (method === "create" && !config.debugLogs.create) {
            return;
          } else if (method === "update" && !config.debugLogs.update) {
            return;
          } else if (method === "updateMany" && !config.debugLogs.updateMany) {
            return;
          } else if (method === "findOne" && !config.debugLogs.findOne) {
            return;
          } else if (method === "findMany" && !config.debugLogs.findMany) {
            return;
          } else if (method === "delete" && !config.debugLogs.delete) {
            return;
          } else if (method === "deleteMany" && !config.debugLogs.deleteMany) {
            return;
          } else if (method === "count" && !config.debugLogs.count) {
            return;
          }
        }
        logger.info(`[${config.adapterName}]`, ...args);
      } else {
        logger.info(`[${config.adapterName}]`, ...args);
      }
    }
  };
  const idField = ({
    customModelName,
    forceAllowId
  }) => {
    const shouldGenerateId = !config.disableIdGeneration && !options.advanced?.database?.useNumberId && !forceAllowId;
    const model = getDefaultModelName(customModelName ?? "id");
    return {
      type: options.advanced?.database?.useNumberId ? "number" : "string",
      required: shouldGenerateId ? true : false,
      ...shouldGenerateId ? {
        defaultValue() {
          if (config.disableIdGeneration) return void 0;
          const useNumberId = options.advanced?.database?.useNumberId;
          let generateId$1 = options.advanced?.database?.generateId;
          if (options.advanced?.generateId !== void 0) {
            logger.warn(
              "Your Better Auth config includes advanced.generateId which is deprecated. Please use advanced.database.generateId instead. This will be removed in future releases."
            );
            generateId$1 = options.advanced?.generateId;
          }
          if (generateId$1 === false || useNumberId) return void 0;
          if (generateId$1) {
            return generateId$1({
              model
            });
          }
          if (config.customIdGenerator) {
            return config.customIdGenerator({ model });
          }
          return generateId();
        }
      } : {}
    };
  };
  const getFieldAttributes = ({
    model,
    field
  }) => {
    const defaultModelName = getDefaultModelName(model);
    const defaultFieldName = getDefaultFieldName({
      field,
      model
    });
    const fields = schema2[defaultModelName].fields;
    fields.id = idField({ customModelName: defaultModelName });
    return fields[defaultFieldName];
  };
  const adapterInstance = customAdapter({
    options,
    schema: schema2,
    debugLog,
    getFieldName,
    getModelName,
    getDefaultModelName,
    getDefaultFieldName,
    getFieldAttributes
  });
  const transformInput = async (data, unsafe_model, action, forceAllowId) => {
    const transformedData = {};
    const fields = schema2[unsafe_model].fields;
    const newMappedKeys = config.mapKeysTransformInput ?? {};
    if (!config.disableIdGeneration && !options.advanced?.database?.useNumberId) {
      fields.id = idField({
        customModelName: unsafe_model,
        forceAllowId: forceAllowId && "id" in data
      });
    }
    for (const field in fields) {
      const value = data[field];
      const fieldAttributes = fields[field];
      let newFieldName = newMappedKeys[field] || fields[field].fieldName || field;
      if (value === void 0 && (fieldAttributes.defaultValue === void 0 && !fieldAttributes.transform?.input && !(action === "update" && fieldAttributes.onUpdate) || action === "update" && !fieldAttributes.onUpdate)) {
        continue;
      }
      let newValue = withApplyDefault(value, fieldAttributes, action);
      if (fieldAttributes.transform?.input) {
        newValue = await fieldAttributes.transform.input(newValue);
      }
      if (fieldAttributes.references?.field === "id" && options.advanced?.database?.useNumberId) {
        if (Array.isArray(newValue)) {
          newValue = newValue.map(Number);
        } else {
          newValue = Number(newValue);
        }
      } else if (config.supportsJSON === false && typeof newValue === "object" && fieldAttributes.type === "json") {
        newValue = JSON.stringify(newValue);
      } else if (config.supportsDates === false && newValue instanceof Date && fieldAttributes.type === "date") {
        newValue = newValue.toISOString();
      } else if (config.supportsBooleans === false && typeof newValue === "boolean") {
        newValue = newValue ? 1 : 0;
      }
      if (config.customTransformInput) {
        newValue = config.customTransformInput({
          data: newValue,
          action,
          field: newFieldName,
          fieldAttributes,
          model: unsafe_model,
          schema: schema2,
          options
        });
      }
      if (newValue !== void 0) {
        transformedData[newFieldName] = newValue;
      }
    }
    return transformedData;
  };
  const transformOutput = async (data, unsafe_model, select = []) => {
    if (!data) return null;
    const newMappedKeys = config.mapKeysTransformOutput ?? {};
    const transformedData = {};
    const tableSchema = schema2[unsafe_model].fields;
    const idKey = Object.entries(newMappedKeys).find(
      ([_, v]) => v === "id"
    )?.[0];
    tableSchema[idKey ?? "id"] = {
      type: options.advanced?.database?.useNumberId ? "number" : "string"
    };
    for (const key in tableSchema) {
      if (select.length && !select.includes(key)) {
        continue;
      }
      const field = tableSchema[key];
      if (field) {
        const originalKey = field.fieldName || key;
        let newValue = data[Object.entries(newMappedKeys).find(
          ([_, v]) => v === originalKey
        )?.[0] || originalKey];
        if (field.transform?.output) {
          newValue = await field.transform.output(newValue);
        }
        let newFieldName = newMappedKeys[key] || key;
        if (originalKey === "id" || field.references?.field === "id") {
          if (typeof newValue !== "undefined") newValue = String(newValue);
        } else if (config.supportsJSON === false && typeof newValue === "string" && field.type === "json") {
          newValue = safeJSONParse(newValue);
        } else if (config.supportsDates === false && typeof newValue === "string" && field.type === "date") {
          newValue = new Date(newValue);
        } else if (config.supportsBooleans === false && typeof newValue === "number" && field.type === "boolean") {
          newValue = newValue === 1;
        }
        if (config.customTransformOutput) {
          newValue = config.customTransformOutput({
            data: newValue,
            field: newFieldName,
            fieldAttributes: field,
            select,
            model: unsafe_model,
            schema: schema2,
            options
          });
        }
        transformedData[newFieldName] = newValue;
      }
    }
    return transformedData;
  };
  const transformWhereClause = ({
    model,
    where
  }) => {
    if (!where) return void 0;
    const newMappedKeys = config.mapKeysTransformInput ?? {};
    return where.map((w) => {
      const {
        field: unsafe_field,
        value,
        operator = "eq",
        connector = "AND"
      } = w;
      if (operator === "in") {
        if (!Array.isArray(value)) {
          throw new Error("Value must be an array");
        }
      }
      const defaultModelName = getDefaultModelName(model);
      const defaultFieldName = getDefaultFieldName({
        field: unsafe_field,
        model
      });
      const fieldName = newMappedKeys[defaultFieldName] || getFieldName({
        field: defaultFieldName,
        model: defaultModelName
      });
      const fieldAttr = getFieldAttributes({
        field: defaultFieldName,
        model: defaultModelName
      });
      if (defaultFieldName === "id" || fieldAttr.references?.field === "id") {
        if (options.advanced?.database?.useNumberId) {
          if (Array.isArray(value)) {
            return {
              operator,
              connector,
              field: fieldName,
              value: value.map(Number)
            };
          }
          return {
            operator,
            connector,
            field: fieldName,
            value: Number(value)
          };
        }
      }
      return {
        operator,
        connector,
        field: fieldName,
        value
      };
    });
  };
  let lazyLoadTransaction = null;
  const adapter = {
    transaction: async (cb) => {
      if (!lazyLoadTransaction) {
        if (!config.transaction) {
          logger.warn(
            `[${config.adapterName}] - Transactions are not supported. Executing operations sequentially.`
          );
          lazyLoadTransaction = createAsIsTransaction(adapter);
        } else {
          logger.debug(
            `[${config.adapterName}] - Using provided transaction implementation.`
          );
          lazyLoadTransaction = config.transaction;
        }
      }
      return lazyLoadTransaction(cb);
    },
    create: async ({
      data: unsafeData,
      model: unsafeModel,
      select,
      forceAllowId = false
    }) => {
      transactionId++;
      let thisTransactionId = transactionId;
      const model = getModelName(unsafeModel);
      if ("id" in unsafeData && !forceAllowId) {
        logger.warn(
          `[${config.adapterName}] - You are trying to create a record with an id. This is not allowed as we handle id generation for you, unless you pass in the \`forceAllowId\` parameter. The id will be ignored.`
        );
        const err = new Error();
        const stack = err.stack?.split("\n").filter((_, i) => i !== 1).join("\n").replace("Error:", "Create method with `id` being called at:");
        console.log(stack);
        unsafeData.id = void 0;
      }
      debugLog(
        { method: "create" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(1, 4)}`,
        `${formatMethod("create")} ${formatAction("Unsafe Input")}:`,
        { model, data: unsafeData }
      );
      const data = await transformInput(
        unsafeData,
        unsafeModel,
        "create",
        forceAllowId
      );
      debugLog(
        { method: "create" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(2, 4)}`,
        `${formatMethod("create")} ${formatAction("Parsed Input")}:`,
        { model, data }
      );
      const res = await adapterInstance.create({ data, model });
      debugLog(
        { method: "create" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(3, 4)}`,
        `${formatMethod("create")} ${formatAction("DB Result")}:`,
        { model, res }
      );
      const transformed = await transformOutput(res, unsafeModel, select);
      debugLog(
        { method: "create" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(4, 4)}`,
        `${formatMethod("create")} ${formatAction("Parsed Result")}:`,
        { model, data: transformed }
      );
      return transformed;
    },
    update: async ({
      model: unsafeModel,
      where: unsafeWhere,
      update: unsafeData
    }) => {
      transactionId++;
      let thisTransactionId = transactionId;
      const model = getModelName(unsafeModel);
      const where = transformWhereClause({
        model: unsafeModel,
        where: unsafeWhere
      });
      debugLog(
        { method: "update" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(1, 4)}`,
        `${formatMethod("update")} ${formatAction("Unsafe Input")}:`,
        { model, data: unsafeData }
      );
      const data = await transformInput(
        unsafeData,
        unsafeModel,
        "update"
      );
      debugLog(
        { method: "update" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(2, 4)}`,
        `${formatMethod("update")} ${formatAction("Parsed Input")}:`,
        { model, data }
      );
      const res = await adapterInstance.update({
        model,
        where,
        update: data
      });
      debugLog(
        { method: "update" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(3, 4)}`,
        `${formatMethod("update")} ${formatAction("DB Result")}:`,
        { model, data: res }
      );
      const transformed = await transformOutput(res, unsafeModel);
      debugLog(
        { method: "update" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(4, 4)}`,
        `${formatMethod("update")} ${formatAction("Parsed Result")}:`,
        { model, data: transformed }
      );
      return transformed;
    },
    updateMany: async ({
      model: unsafeModel,
      where: unsafeWhere,
      update: unsafeData
    }) => {
      transactionId++;
      let thisTransactionId = transactionId;
      const model = getModelName(unsafeModel);
      const where = transformWhereClause({
        model: unsafeModel,
        where: unsafeWhere
      });
      debugLog(
        { method: "updateMany" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(1, 4)}`,
        `${formatMethod("updateMany")} ${formatAction("Unsafe Input")}:`,
        { model, data: unsafeData }
      );
      const data = await transformInput(unsafeData, unsafeModel, "update");
      debugLog(
        { method: "updateMany" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(2, 4)}`,
        `${formatMethod("updateMany")} ${formatAction("Parsed Input")}:`,
        { model, data }
      );
      const updatedCount = await adapterInstance.updateMany({
        model,
        where,
        update: data
      });
      debugLog(
        { method: "updateMany" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(3, 4)}`,
        `${formatMethod("updateMany")} ${formatAction("DB Result")}:`,
        { model, data: updatedCount }
      );
      debugLog(
        { method: "updateMany" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(4, 4)}`,
        `${formatMethod("updateMany")} ${formatAction("Parsed Result")}:`,
        { model, data: updatedCount }
      );
      return updatedCount;
    },
    findOne: async ({
      model: unsafeModel,
      where: unsafeWhere,
      select
    }) => {
      transactionId++;
      let thisTransactionId = transactionId;
      const model = getModelName(unsafeModel);
      const where = transformWhereClause({
        model: unsafeModel,
        where: unsafeWhere
      });
      debugLog(
        { method: "findOne" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(1, 3)}`,
        `${formatMethod("findOne")}:`,
        { model, where, select }
      );
      const res = await adapterInstance.findOne({
        model,
        where,
        select
      });
      debugLog(
        { method: "findOne" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(2, 3)}`,
        `${formatMethod("findOne")} ${formatAction("DB Result")}:`,
        { model, data: res }
      );
      const transformed = await transformOutput(
        res,
        unsafeModel,
        select
      );
      debugLog(
        { method: "findOne" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(3, 3)}`,
        `${formatMethod("findOne")} ${formatAction("Parsed Result")}:`,
        { model, data: transformed }
      );
      return transformed;
    },
    findMany: async ({
      model: unsafeModel,
      where: unsafeWhere,
      limit: unsafeLimit,
      sortBy,
      offset
    }) => {
      transactionId++;
      let thisTransactionId = transactionId;
      const limit = unsafeLimit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
      const model = getModelName(unsafeModel);
      const where = transformWhereClause({
        model: unsafeModel,
        where: unsafeWhere
      });
      debugLog(
        { method: "findMany" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(1, 3)}`,
        `${formatMethod("findMany")}:`,
        { model, where, limit, sortBy, offset }
      );
      const res = await adapterInstance.findMany({
        model,
        where,
        limit,
        sortBy,
        offset
      });
      debugLog(
        { method: "findMany" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(2, 3)}`,
        `${formatMethod("findMany")} ${formatAction("DB Result")}:`,
        { model, data: res }
      );
      const transformed = await Promise.all(
        res.map(async (r) => await transformOutput(r, unsafeModel))
      );
      debugLog(
        { method: "findMany" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(3, 3)}`,
        `${formatMethod("findMany")} ${formatAction("Parsed Result")}:`,
        { model, data: transformed }
      );
      return transformed;
    },
    delete: async ({
      model: unsafeModel,
      where: unsafeWhere
    }) => {
      transactionId++;
      let thisTransactionId = transactionId;
      const model = getModelName(unsafeModel);
      const where = transformWhereClause({
        model: unsafeModel,
        where: unsafeWhere
      });
      debugLog(
        { method: "delete" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(1, 2)}`,
        `${formatMethod("delete")}:`,
        { model, where }
      );
      await adapterInstance.delete({
        model,
        where
      });
      debugLog(
        { method: "delete" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(2, 2)}`,
        `${formatMethod("delete")} ${formatAction("DB Result")}:`,
        { model }
      );
    },
    deleteMany: async ({
      model: unsafeModel,
      where: unsafeWhere
    }) => {
      transactionId++;
      let thisTransactionId = transactionId;
      const model = getModelName(unsafeModel);
      const where = transformWhereClause({
        model: unsafeModel,
        where: unsafeWhere
      });
      debugLog(
        { method: "deleteMany" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(1, 2)}`,
        `${formatMethod("deleteMany")} ${formatAction("DeleteMany")}:`,
        { model, where }
      );
      const res = await adapterInstance.deleteMany({
        model,
        where
      });
      debugLog(
        { method: "deleteMany" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(2, 2)}`,
        `${formatMethod("deleteMany")} ${formatAction("DB Result")}:`,
        { model, data: res }
      );
      return res;
    },
    count: async ({
      model: unsafeModel,
      where: unsafeWhere
    }) => {
      transactionId++;
      let thisTransactionId = transactionId;
      const model = getModelName(unsafeModel);
      const where = transformWhereClause({
        model: unsafeModel,
        where: unsafeWhere
      });
      debugLog(
        { method: "count" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(1, 2)}`,
        `${formatMethod("count")}:`,
        {
          model,
          where
        }
      );
      const res = await adapterInstance.count({
        model,
        where
      });
      debugLog(
        { method: "count" },
        `${formatTransactionId(thisTransactionId)} ${formatStep(2, 2)}`,
        `${formatMethod("count")}:`,
        {
          model,
          data: res
        }
      );
      return res;
    },
    createSchema: adapterInstance.createSchema ? async (_, file) => {
      const tables = getAuthTables(options);
      if (options.secondaryStorage && !options.session?.storeSessionInDatabase) {
        delete tables.session;
      }
      if (options.rateLimit && options.rateLimit.storage === "database" && // rate-limit will default to enabled in production,
      // and given storage is database, it will try to use the rate-limit table,
      // so we should make sure to generate rate-limit table schema
      (typeof options.rateLimit.enabled === "undefined" || // and of course if they forcefully set to true, then they want rate-limit,
      // thus we should also generate rate-limit table schema
      options.rateLimit.enabled === true)) {
        tables.ratelimit = {
          modelName: options.rateLimit.modelName ?? "ratelimit",
          fields: {
            key: {
              type: "string",
              unique: true,
              required: true,
              fieldName: options.rateLimit.fields?.key ?? "key"
            },
            count: {
              type: "number",
              required: true,
              fieldName: options.rateLimit.fields?.count ?? "count"
            },
            lastRequest: {
              type: "number",
              required: true,
              bigint: true,
              defaultValue: () => Date.now(),
              fieldName: options.rateLimit.fields?.lastRequest ?? "lastRequest"
            }
          }
        };
      }
      return adapterInstance.createSchema({ file, tables });
    } : void 0,
    options: {
      adapterConfig: config,
      ...adapterInstance.options ?? {}
    },
    id: config.adapterId,
    // Secretly export values ONLY if this adapter has enabled adapter-test-debug-logs.
    // This would then be used during our adapter-tests to help print debug logs if a test fails.
    //@ts-expect-error - ^^
    ...config.debugLogs?.isRunningAdapterTests ? {
      adapterTestDebugLogs: {
        resetDebugLogs() {
          debugLogs = [];
        },
        printDebugLogs() {
          const separator = `─`.repeat(80);
          let log = debugLogs.reverse().map((log2) => {
            log2[0] = `
${log2[0]}`;
            return [...log2, "\n"];
          }).reduce(
            (prev, curr) => {
              return [...curr, ...prev];
            },
            [`
${separator}`]
          );
          console.log(...log);
        }
      }
    } : {}
  };
  return adapter;
};
function formatTransactionId(transactionId2) {
  return `${colors.fg.magenta}#${transactionId2}${colors.reset}`;
}
function formatStep(step, total) {
  return `${colors.bg.black}${colors.fg.yellow}[${step}/${total}]${colors.reset}`;
}
function formatMethod(method) {
  return `${colors.bright}${method}${colors.reset}`;
}
function formatAction(action) {
  return `${colors.dim}(${action})${colors.reset}`;
}
function getKyselyDatabaseType(db) {
  if (!db) {
    return null;
  }
  if ("dialect" in db) {
    return getKyselyDatabaseType(db.dialect);
  }
  if ("createDriver" in db) {
    if (db instanceof SqliteDialect) {
      return "sqlite";
    }
    if (db instanceof MysqlDialect) {
      return "mysql";
    }
    if (db instanceof PostgresDialect) {
      return "postgres";
    }
    if (db instanceof MssqlDialect) {
      return "mssql";
    }
  }
  if ("aggregate" in db) {
    return "sqlite";
  }
  if ("getConnection" in db) {
    return "mysql";
  }
  if ("connect" in db) {
    return "postgres";
  }
  if ("fileControl" in db) {
    return "sqlite";
  }
  if ("open" in db && "close" in db && "prepare" in db) {
    return "sqlite";
  }
  return null;
}
const createKyselyAdapter = async (config) => {
  const db = config.database;
  if (!db) {
    return {
      kysely: null,
      databaseType: null
    };
  }
  if ("db" in db) {
    return {
      kysely: db.db,
      databaseType: db.type
    };
  }
  if ("dialect" in db) {
    return {
      kysely: new Kysely({ dialect: db.dialect }),
      databaseType: db.type
    };
  }
  let dialect = void 0;
  const databaseType = getKyselyDatabaseType(db);
  if ("createDriver" in db) {
    dialect = db;
  }
  if ("aggregate" in db && !("createSession" in db)) {
    dialect = new SqliteDialect({
      database: db
    });
  }
  if ("getConnection" in db) {
    dialect = new MysqlDialect(db);
  }
  if ("connect" in db) {
    dialect = new PostgresDialect({
      pool: db
    });
  }
  if ("fileControl" in db) {
    const { BunSqliteDialect } = await import("./bun-sqlite-dialect.js");
    dialect = new BunSqliteDialect({
      database: db
    });
  }
  if ("createSession" in db && typeof window === "undefined") {
    let DatabaseSync = void 0;
    try {
      let nodeSqlite = "node:sqlite";
      ({ DatabaseSync } = await import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        nodeSqlite
      ));
    } catch (error2) {
      if (error2 !== null && typeof error2 === "object" && "code" in error2 && error2.code !== "ERR_UNKNOWN_BUILTIN_MODULE") {
        throw error2;
      }
    }
    if (DatabaseSync && db instanceof DatabaseSync) {
      const { NodeSqliteDialect } = await import("./node-sqlite-dialect.js");
      dialect = new NodeSqliteDialect({
        database: db
      });
    }
  }
  return {
    kysely: dialect ? new Kysely({ dialect }) : null,
    databaseType
  };
};
function ensureUTC(date) {
  const utcTimestamp = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
  return new Date(utcTimestamp);
}
const kyselyAdapter = (db, config) => {
  let lazyOptions = null;
  const createCustomAdapter = (db2) => {
    return ({ getFieldName, schema: schema2 }) => {
      const withReturning = async (values, builder, model, where) => {
        let res;
        if (config?.type === "mysql") {
          await builder.execute();
          const field = values.id ? "id" : where.length > 0 && where[0].field ? where[0].field : "id";
          if (!values.id && where.length === 0) {
            res = await db2.selectFrom(model).selectAll().orderBy(getFieldName({ model, field }), "desc").limit(1).executeTakeFirst();
            return res;
          }
          const value = values[field] || where[0].value;
          res = await db2.selectFrom(model).selectAll().orderBy(getFieldName({ model, field }), "desc").where(getFieldName({ model, field }), "=", value).limit(1).executeTakeFirst();
          return res;
        }
        if (config?.type === "mssql") {
          res = await builder.outputAll("inserted").executeTakeFirst();
          return res;
        }
        res = await builder.returningAll().executeTakeFirst();
        return res;
      };
      function transformValueToDB(value, model, field) {
        if (field === "id") {
          return value;
        }
        const { type = "sqlite" } = config || {};
        let f = schema2[model]?.fields[field];
        if (!f) {
          f = Object.values(schema2).find((f2) => f2.modelName === model);
        }
        if (f.type === "boolean" && (type === "sqlite" || type === "mssql") && value !== null && value !== void 0) {
          return value ? 1 : 0;
        }
        if (f.type === "date" && value && value instanceof Date) {
          return type === "sqlite" ? value.toISOString() : value;
        }
        return value;
      }
      function transformValueFromDB(value) {
        function transformObject(obj) {
          for (const key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
            const field = obj[key];
            if (field instanceof Date && config?.type === "mysql") {
              obj[key] = ensureUTC(field);
            } else if (typeof field === "object" && field !== null) {
              transformObject(field);
            }
          }
        }
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const item = value[i];
            if (typeof item === "object" && item !== null) {
              transformObject(item);
            }
          }
        } else if (typeof value === "object" && value !== null) {
          transformObject(value);
        }
        return value;
      }
      function convertWhereClause(model, w) {
        if (!w)
          return {
            and: null,
            or: null
          };
        const conditions = {
          and: [],
          or: []
        };
        w.forEach((condition) => {
          let {
            field: _field,
            value,
            operator = "=",
            connector = "AND"
          } = condition;
          const field = getFieldName({ model, field: _field });
          value = transformValueToDB(value, model, _field);
          const expr = (eb) => {
            if (operator.toLowerCase() === "in") {
              return eb(field, "in", Array.isArray(value) ? value : [value]);
            }
            if (operator.toLowerCase() === "not_in") {
              return eb(
                field,
                "not in",
                Array.isArray(value) ? value : [value]
              );
            }
            if (operator === "contains") {
              return eb(field, "like", `%${value}%`);
            }
            if (operator === "starts_with") {
              return eb(field, "like", `${value}%`);
            }
            if (operator === "ends_with") {
              return eb(field, "like", `%${value}`);
            }
            if (operator === "eq") {
              return eb(field, "=", value);
            }
            if (operator === "ne") {
              return eb(field, "<>", value);
            }
            if (operator === "gt") {
              return eb(field, ">", value);
            }
            if (operator === "gte") {
              return eb(field, ">=", value);
            }
            if (operator === "lt") {
              return eb(field, "<", value);
            }
            if (operator === "lte") {
              return eb(field, "<=", value);
            }
            return eb(field, operator, value);
          };
          if (connector === "OR") {
            conditions.or.push(expr);
          } else {
            conditions.and.push(expr);
          }
        });
        return {
          and: conditions.and.length ? conditions.and : null,
          or: conditions.or.length ? conditions.or : null
        };
      }
      return {
        async create({ data, model }) {
          const builder = db2.insertInto(model).values(data);
          return transformValueFromDB(
            await withReturning(data, builder, model, [])
          );
        },
        async findOne({ model, where, select }) {
          const { and: and2, or: or2 } = convertWhereClause(model, where);
          let query = db2.selectFrom(model).selectAll();
          if (and2) {
            query = query.where((eb) => eb.and(and2.map((expr) => expr(eb))));
          }
          if (or2) {
            query = query.where((eb) => eb.or(or2.map((expr) => expr(eb))));
          }
          const res = await query.executeTakeFirst();
          if (!res) return null;
          return transformValueFromDB(res);
        },
        async findMany({ model, where, limit, offset, sortBy }) {
          const { and: and2, or: or2 } = convertWhereClause(model, where);
          let query = db2.selectFrom(model);
          if (and2) {
            query = query.where((eb) => eb.and(and2.map((expr) => expr(eb))));
          }
          if (or2) {
            query = query.where((eb) => eb.or(or2.map((expr) => expr(eb))));
          }
          if (config?.type === "mssql") {
            if (!offset) {
              query = query.top(limit || 100);
            }
          } else {
            query = query.limit(limit || 100);
          }
          if (sortBy) {
            query = query.orderBy(
              getFieldName({ model, field: sortBy.field }),
              sortBy.direction
            );
          }
          if (offset) {
            if (config?.type === "mssql") {
              if (!sortBy) {
                query = query.orderBy(getFieldName({ model, field: "id" }));
              }
              query = query.offset(offset).fetch(limit || 100);
            } else {
              query = query.offset(offset);
            }
          }
          const res = await query.selectAll().execute();
          if (!res) return [];
          return transformValueFromDB(res);
        },
        async update({ model, where, update: values }) {
          const { and: and2, or: or2 } = convertWhereClause(model, where);
          let query = db2.updateTable(model).set(values);
          if (and2) {
            query = query.where((eb) => eb.and(and2.map((expr) => expr(eb))));
          }
          if (or2) {
            query = query.where((eb) => eb.or(or2.map((expr) => expr(eb))));
          }
          return transformValueFromDB(
            await withReturning(values, query, model, where)
          );
        },
        async updateMany({ model, where, update: values }) {
          const { and: and2, or: or2 } = convertWhereClause(model, where);
          let query = db2.updateTable(model).set(values);
          if (and2) {
            query = query.where((eb) => eb.and(and2.map((expr) => expr(eb))));
          }
          if (or2) {
            query = query.where((eb) => eb.or(or2.map((expr) => expr(eb))));
          }
          const res = await query.execute();
          return res.length;
        },
        async count({ model, where }) {
          const { and: and2, or: or2 } = convertWhereClause(model, where);
          let query = db2.selectFrom(model).select(db2.fn.count("id").as("count"));
          if (and2) {
            query = query.where((eb) => eb.and(and2.map((expr) => expr(eb))));
          }
          if (or2) {
            query = query.where((eb) => eb.or(or2.map((expr) => expr(eb))));
          }
          const res = await query.execute();
          return res[0].count;
        },
        async delete({ model, where }) {
          const { and: and2, or: or2 } = convertWhereClause(model, where);
          let query = db2.deleteFrom(model);
          if (and2) {
            query = query.where((eb) => eb.and(and2.map((expr) => expr(eb))));
          }
          if (or2) {
            query = query.where((eb) => eb.or(or2.map((expr) => expr(eb))));
          }
          await query.execute();
        },
        async deleteMany({ model, where }) {
          const { and: and2, or: or2 } = convertWhereClause(model, where);
          let query = db2.deleteFrom(model);
          if (and2) {
            query = query.where((eb) => eb.and(and2.map((expr) => expr(eb))));
          }
          if (or2) {
            query = query.where((eb) => eb.or(or2.map((expr) => expr(eb))));
          }
          return (await query.execute()).length;
        },
        options: config
      };
    };
  };
  let adapterOptions = null;
  adapterOptions = {
    config: {
      adapterId: "kysely",
      adapterName: "Kysely Adapter",
      usePlural: config?.usePlural,
      debugLogs: config?.debugLogs,
      supportsBooleans: config?.type === "sqlite" || config?.type === "mssql" || !config?.type ? false : true,
      supportsDates: config?.type === "sqlite" || config?.type === "mssql" || !config?.type ? false : true,
      supportsJSON: false,
      transaction: config?.transaction ?? true ? (cb) => db.transaction().execute((trx) => {
        const adapter2 = createAdapterFactory({
          config: adapterOptions.config,
          adapter: createCustomAdapter(trx)
        })(lazyOptions);
        return cb(adapter2);
      }) : false
    },
    adapter: createCustomAdapter(db)
  };
  const adapter = createAdapterFactory(adapterOptions);
  return (options) => {
    lazyOptions = options;
    return adapter(options);
  };
};
const memoryAdapter = (db, config) => {
  let lazyOptions = null;
  let adapterCreator = createAdapterFactory({
    config: {
      adapterId: "memory",
      adapterName: "Memory Adapter",
      usePlural: false,
      debugLogs: false,
      customTransformInput(props) {
        if (props.options.advanced?.database?.useNumberId && props.field === "id" && props.action === "create") {
          return db[props.model].length + 1;
        }
        return props.data;
      },
      transaction: async (cb) => {
        let clone = structuredClone(db);
        try {
          return cb(adapterCreator(lazyOptions));
        } catch {
          Object.keys(db).forEach((key) => {
            db[key] = clone[key];
          });
          throw new Error("Transaction failed, rolling back changes");
        }
      }
    },
    adapter: ({ getFieldName, options, debugLog }) => {
      function convertWhereClause(where, model) {
        const table = db[model];
        if (!table) {
          logger.error(
            `[MemoryAdapter] Model ${model} not found in the DB`,
            Object.keys(db)
          );
          throw new Error(`Model ${model} not found`);
        }
        const evalClause = (record, clause) => {
          const { field, value, operator } = clause;
          switch (operator) {
            case "in":
              if (!Array.isArray(value)) {
                throw new Error("Value must be an array");
              }
              return value.includes(record[field]);
            case "not_in":
              if (!Array.isArray(value)) {
                throw new Error("Value must be an array");
              }
              return !value.includes(record[field]);
            case "contains":
              return record[field].includes(value);
            case "starts_with":
              return record[field].startsWith(value);
            case "ends_with":
              return record[field].endsWith(value);
            default:
              return record[field] === value;
          }
        };
        return table.filter((record) => {
          if (!where.length || where.length === 0) {
            return true;
          }
          let result = evalClause(record, where[0]);
          for (const clause of where) {
            const clauseResult = evalClause(record, clause);
            if (clause.connector === "OR") {
              result = result || clauseResult;
            } else {
              result = result && clauseResult;
            }
          }
          return result;
        });
      }
      return {
        create: async ({ model, data }) => {
          if (options.advanced?.database?.useNumberId) {
            data.id = db[model].length + 1;
          }
          if (!db[model]) {
            db[model] = [];
          }
          db[model].push(data);
          return data;
        },
        findOne: async ({ model, where }) => {
          const res = convertWhereClause(where, model);
          const record = res[0] || null;
          return record;
        },
        findMany: async ({ model, where, sortBy, limit, offset }) => {
          let table = db[model];
          if (where) {
            table = convertWhereClause(where, model);
          }
          if (sortBy) {
            table = table.sort((a, b) => {
              const field = getFieldName({ model, field: sortBy.field });
              if (sortBy.direction === "asc") {
                return a[field] > b[field] ? 1 : -1;
              } else {
                return a[field] < b[field] ? 1 : -1;
              }
            });
          }
          if (offset !== void 0) {
            table = table.slice(offset);
          }
          if (limit !== void 0) {
            table = table.slice(0, limit);
          }
          return table;
        },
        count: async ({ model }) => {
          return db[model].length;
        },
        update: async ({ model, where, update }) => {
          const res = convertWhereClause(where, model);
          res.forEach((record) => {
            Object.assign(record, update);
          });
          return res[0] || null;
        },
        delete: async ({ model, where }) => {
          const table = db[model];
          const res = convertWhereClause(where, model);
          db[model] = table.filter((record) => !res.includes(record));
        },
        deleteMany: async ({ model, where }) => {
          const table = db[model];
          const res = convertWhereClause(where, model);
          let count2 = 0;
          db[model] = table.filter((record) => {
            if (res.includes(record)) {
              count2++;
              return false;
            }
            return !res.includes(record);
          });
          return count2;
        },
        updateMany({ model, where, update }) {
          const res = convertWhereClause(where, model);
          res.forEach((record) => {
            Object.assign(record, update);
          });
          return res[0] || null;
        }
      };
    }
  });
  return (options) => {
    lazyOptions = options;
    return adapterCreator(options);
  };
};
function getWithHooks(adapter, ctx) {
  const hooks = ctx.hooks;
  async function createWithHooks(data, model, customCreateFn, context, trxAdapter) {
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.create?.before;
      if (toRun) {
        const result = await toRun(actualData, context);
        if (result === false) {
          return null;
        }
        const isObject = typeof result === "object" && "data" in result;
        if (isObject) {
          actualData = {
            ...actualData,
            ...result.data
          };
        }
      }
    }
    const customCreated = customCreateFn ? await customCreateFn.fn(actualData) : null;
    const created = !customCreateFn || customCreateFn.executeMainFn ? await (trxAdapter || adapter).create({
      model,
      data: actualData,
      forceAllowId: true
    }) : customCreated;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.create?.after;
      if (toRun) {
        await toRun(created, context);
      }
    }
    return created;
  }
  async function updateWithHooks(data, where, model, customUpdateFn, context, trxAdapter) {
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.before;
      if (toRun) {
        const result = await toRun(data, context);
        if (result === false) {
          return null;
        }
        const isObject = typeof result === "object";
        actualData = isObject ? result.data : result;
      }
    }
    const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
    const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (trxAdapter || adapter).update({
      model,
      update: actualData,
      where
    }) : customUpdated;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.after;
      if (toRun) {
        await toRun(updated, context);
      }
    }
    return updated;
  }
  async function updateManyWithHooks(data, where, model, customUpdateFn, context, trxAdapter) {
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.before;
      if (toRun) {
        const result = await toRun(data, context);
        if (result === false) {
          return null;
        }
        const isObject = typeof result === "object";
        actualData = isObject ? result.data : result;
      }
    }
    const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
    const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (trxAdapter || adapter).updateMany({
      model,
      update: actualData,
      where
    }) : customUpdated;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.after;
      if (toRun) {
        await toRun(updated, context);
      }
    }
    return updated;
  }
  return {
    createWithHooks,
    updateWithHooks,
    updateManyWithHooks
  };
}
const createInternalAdapter = (adapter, ctx) => {
  const logger2 = ctx.logger;
  const options = ctx.options;
  const secondaryStorage = options.secondaryStorage;
  const sessionExpiration = options.session?.expiresIn || 60 * 60 * 24 * 7;
  const { createWithHooks, updateWithHooks, updateManyWithHooks } = getWithHooks(adapter, ctx);
  return {
    createOAuthUser: async (user2, account, context) => {
      return adapter.transaction(async (trxAdapter) => {
        const createdUser = await createWithHooks(
          {
            // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date(),
            ...user2
          },
          "user",
          void 0,
          context,
          trxAdapter
        );
        const createdAccount = await createWithHooks(
          {
            ...account,
            userId: createdUser.id,
            // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          },
          "account",
          void 0,
          context,
          trxAdapter
        );
        return {
          user: createdUser,
          account: createdAccount
        };
      });
    },
    createUser: async (user2, context, trxAdapter) => {
      const createdUser = await createWithHooks(
        {
          // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          ...user2,
          email: user2.email?.toLowerCase()
        },
        "user",
        void 0,
        context,
        trxAdapter
      );
      return createdUser;
    },
    createAccount: async (account, context, trxAdapter) => {
      const createdAccount = await createWithHooks(
        {
          // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          ...account
        },
        "account",
        void 0,
        context,
        trxAdapter
      );
      return createdAccount;
    },
    listSessions: async (userId, trxAdapter) => {
      if (secondaryStorage) {
        const currentList = await secondaryStorage.get(
          `active-sessions-${userId}`
        );
        if (!currentList) return [];
        const list = safeJSONParse(currentList) || [];
        const now = Date.now();
        const validSessions = list.filter((s) => s.expiresAt > now);
        const sessions2 = [];
        for (const session of validSessions) {
          const sessionStringified = await secondaryStorage.get(session.token);
          if (sessionStringified) {
            const s = safeJSONParse(sessionStringified);
            if (!s) return [];
            const parsedSession = parseSessionOutput(ctx.options, {
              ...s.session,
              expiresAt: new Date(s.session.expiresAt)
            });
            sessions2.push(parsedSession);
          }
        }
        return sessions2;
      }
      const sessions = await (trxAdapter || adapter).findMany({
        model: "session",
        where: [
          {
            field: "userId",
            value: userId
          }
        ]
      });
      return sessions;
    },
    listUsers: async (limit, offset, sortBy, where, trxAdapter) => {
      const users = await (trxAdapter || adapter).findMany({
        model: "user",
        limit,
        offset,
        sortBy,
        where
      });
      return users;
    },
    countTotalUsers: async (where, trxAdapter) => {
      const total = await (trxAdapter || adapter).count({
        model: "user",
        where
      });
      if (typeof total === "string") {
        return parseInt(total);
      }
      return total;
    },
    deleteUser: async (userId, trxAdapter) => {
      if (secondaryStorage) {
        await secondaryStorage.delete(`active-sessions-${userId}`);
      }
      if (!secondaryStorage || options.session?.storeSessionInDatabase) {
        await (trxAdapter || adapter).deleteMany({
          model: "session",
          where: [
            {
              field: "userId",
              value: userId
            }
          ]
        });
      }
      await (trxAdapter || adapter).deleteMany({
        model: "account",
        where: [
          {
            field: "userId",
            value: userId
          }
        ]
      });
      await (trxAdapter || adapter).delete({
        model: "user",
        where: [
          {
            field: "id",
            value: userId
          }
        ]
      });
    },
    createSession: async (userId, ctx2, dontRememberMe, override, overrideAll, trxAdapter) => {
      const headers = ctx2.headers || ctx2.request?.headers;
      const { id: _, ...rest } = override || {};
      const data = {
        ipAddress: ctx2.request || ctx2.headers ? getIp(ctx2.request || ctx2.headers, ctx2.context.options) || "" : "",
        userAgent: headers?.get("user-agent") || "",
        ...rest,
        /**
         * If the user doesn't want to be remembered
         * set the session to expire in 1 day.
         * The cookie will be set to expire at the end of the session
         */
        expiresAt: dontRememberMe ? getDate(60 * 60 * 24, "sec") : getDate(sessionExpiration, "sec"),
        userId,
        token: generateId(32),
        // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...overrideAll ? rest : {}
      };
      const res = await createWithHooks(
        data,
        "session",
        secondaryStorage ? {
          fn: async (sessionData) => {
            const currentList = await secondaryStorage.get(
              `active-sessions-${userId}`
            );
            let list = [];
            const now = Date.now();
            if (currentList) {
              list = safeJSONParse(currentList) || [];
              list = list.filter((session) => session.expiresAt > now);
            }
            list.push({
              token: data.token,
              expiresAt: now + sessionExpiration * 1e3
            });
            await secondaryStorage.set(
              `active-sessions-${userId}`,
              JSON.stringify(list),
              sessionExpiration
            );
            return sessionData;
          },
          executeMainFn: options.session?.storeSessionInDatabase
        } : void 0,
        ctx2,
        trxAdapter
      );
      return res;
    },
    findSession: async (token, trxAdapter) => {
      if (secondaryStorage) {
        const sessionStringified = await secondaryStorage.get(token);
        if (!sessionStringified && !options.session?.storeSessionInDatabase) {
          return null;
        }
        if (sessionStringified) {
          const s = safeJSONParse(sessionStringified);
          if (!s) return null;
          const parsedSession2 = parseSessionOutput(ctx.options, {
            ...s.session,
            expiresAt: new Date(s.session.expiresAt),
            createdAt: new Date(s.session.createdAt),
            updatedAt: new Date(s.session.updatedAt)
          });
          const parsedUser2 = parseUserOutput(ctx.options, {
            ...s.user,
            createdAt: new Date(s.user.createdAt),
            updatedAt: new Date(s.user.updatedAt)
          });
          return {
            session: parsedSession2,
            user: parsedUser2
          };
        }
      }
      const session = await (trxAdapter || adapter).findOne({
        model: "session",
        where: [
          {
            value: token,
            field: "token"
          }
        ]
      });
      if (!session) {
        return null;
      }
      const user2 = await (trxAdapter || adapter).findOne({
        model: "user",
        where: [
          {
            value: session.userId,
            field: "id"
          }
        ]
      });
      if (!user2) {
        return null;
      }
      const parsedSession = parseSessionOutput(ctx.options, session);
      const parsedUser = parseUserOutput(ctx.options, user2);
      return {
        session: parsedSession,
        user: parsedUser
      };
    },
    findSessions: async (sessionTokens, trxAdapter) => {
      if (secondaryStorage) {
        const sessions2 = [];
        for (const sessionToken of sessionTokens) {
          const sessionStringified = await secondaryStorage.get(sessionToken);
          if (sessionStringified) {
            const s = safeJSONParse(sessionStringified);
            if (!s) return [];
            const session = {
              session: {
                ...s.session,
                expiresAt: new Date(s.session.expiresAt)
              },
              user: {
                ...s.user,
                createdAt: new Date(s.user.createdAt),
                updatedAt: new Date(s.user.updatedAt)
              }
            };
            sessions2.push(session);
          }
        }
        return sessions2;
      }
      const sessions = await (trxAdapter || adapter).findMany({
        model: "session",
        where: [
          {
            field: "token",
            value: sessionTokens,
            operator: "in"
          }
        ]
      });
      const userIds = sessions.map((session) => {
        return session.userId;
      });
      if (!userIds.length) return [];
      const users = await (trxAdapter || adapter).findMany({
        model: "user",
        where: [
          {
            field: "id",
            value: userIds,
            operator: "in"
          }
        ]
      });
      return sessions.map((session) => {
        const user2 = users.find((u) => u.id === session.userId);
        if (!user2) return null;
        return {
          session,
          user: user2
        };
      });
    },
    updateSession: async (sessionToken, session, context, trxAdapter) => {
      const updatedSession = await updateWithHooks(
        session,
        [{ field: "token", value: sessionToken }],
        "session",
        secondaryStorage ? {
          async fn(data) {
            const currentSession = await secondaryStorage.get(sessionToken);
            let updatedSession2 = null;
            if (currentSession) {
              const parsedSession = safeJSONParse(currentSession);
              if (!parsedSession) return null;
              updatedSession2 = {
                ...parsedSession.session,
                ...data
              };
              return updatedSession2;
            } else {
              return null;
            }
          },
          executeMainFn: options.session?.storeSessionInDatabase
        } : void 0,
        context,
        trxAdapter
      );
      return updatedSession;
    },
    deleteSession: async (token, trxAdapter) => {
      if (secondaryStorage) {
        const data = await secondaryStorage.get(token);
        if (data) {
          const { session } = safeJSONParse(data) ?? {};
          if (!session) {
            logger2.error("Session not found in secondary storage");
            return;
          }
          const userId = session.userId;
          const currentList = await secondaryStorage.get(
            `active-sessions-${userId}`
          );
          if (currentList) {
            let list = safeJSONParse(currentList) || [];
            list = list.filter((s) => s.token !== token);
            if (list.length > 0) {
              await secondaryStorage.set(
                `active-sessions-${userId}`,
                JSON.stringify(list),
                sessionExpiration
              );
            } else {
              await secondaryStorage.delete(`active-sessions-${userId}`);
            }
          } else {
            logger2.error("Active sessions list not found in secondary storage");
          }
        }
        await secondaryStorage.delete(token);
        if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) {
          return;
        }
      }
      await (trxAdapter || adapter).delete({
        model: "session",
        where: [
          {
            field: "token",
            value: token
          }
        ]
      });
    },
    deleteAccounts: async (userId, trxAdapter) => {
      await (trxAdapter || adapter).deleteMany({
        model: "account",
        where: [
          {
            field: "userId",
            value: userId
          }
        ]
      });
    },
    deleteAccount: async (accountId, trxAdapter) => {
      await (trxAdapter || adapter).delete({
        model: "account",
        where: [
          {
            field: "id",
            value: accountId
          }
        ]
      });
    },
    deleteSessions: async (userIdOrSessionTokens, trxAdapter) => {
      if (secondaryStorage) {
        if (typeof userIdOrSessionTokens === "string") {
          const activeSession = await secondaryStorage.get(
            `active-sessions-${userIdOrSessionTokens}`
          );
          const sessions = activeSession ? safeJSONParse(activeSession) : [];
          if (!sessions) return;
          for (const session of sessions) {
            await secondaryStorage.delete(session.token);
          }
        } else {
          for (const sessionToken of userIdOrSessionTokens) {
            const session = await secondaryStorage.get(sessionToken);
            if (session) {
              await secondaryStorage.delete(sessionToken);
            }
          }
        }
        if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) {
          return;
        }
      }
      await (trxAdapter || adapter).deleteMany({
        model: "session",
        where: [
          {
            field: Array.isArray(userIdOrSessionTokens) ? "token" : "userId",
            value: userIdOrSessionTokens,
            operator: Array.isArray(userIdOrSessionTokens) ? "in" : void 0
          }
        ]
      });
    },
    findOAuthUser: async (email, accountId, providerId, trxAdapter) => {
      const account = await (trxAdapter || adapter).findMany({
        model: "account",
        where: [
          {
            value: accountId,
            field: "accountId"
          }
        ]
      }).then((accounts) => {
        return accounts.find((a) => a.providerId === providerId);
      });
      if (account) {
        const user2 = await (trxAdapter || adapter).findOne({
          model: "user",
          where: [
            {
              value: account.userId,
              field: "id"
            }
          ]
        });
        if (user2) {
          return {
            user: user2,
            accounts: [account]
          };
        } else {
          const user22 = await (trxAdapter || adapter).findOne({
            model: "user",
            where: [
              {
                value: email.toLowerCase(),
                field: "email"
              }
            ]
          });
          if (user22) {
            return {
              user: user22,
              accounts: [account]
            };
          }
          return null;
        }
      } else {
        const user2 = await (trxAdapter || adapter).findOne({
          model: "user",
          where: [
            {
              value: email.toLowerCase(),
              field: "email"
            }
          ]
        });
        if (user2) {
          const accounts = await (trxAdapter || adapter).findMany({
            model: "account",
            where: [
              {
                value: user2.id,
                field: "userId"
              }
            ]
          });
          return {
            user: user2,
            accounts: accounts || []
          };
        } else {
          return null;
        }
      }
    },
    findUserByEmail: async (email, options2, trxAdapter) => {
      const user2 = await (trxAdapter || adapter).findOne({
        model: "user",
        where: [
          {
            value: email.toLowerCase(),
            field: "email"
          }
        ]
      });
      if (!user2) return null;
      if (options2?.includeAccounts) {
        const accounts = await (trxAdapter || adapter).findMany({
          model: "account",
          where: [
            {
              value: user2.id,
              field: "userId"
            }
          ]
        });
        return {
          user: user2,
          accounts
        };
      }
      return {
        user: user2,
        accounts: []
      };
    },
    findUserById: async (userId, trxAdapter) => {
      const user2 = await (trxAdapter || adapter).findOne({
        model: "user",
        where: [
          {
            field: "id",
            value: userId
          }
        ]
      });
      return user2;
    },
    linkAccount: async (account, context, trxAdapter) => {
      const _account = await createWithHooks(
        {
          // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          ...account
        },
        "account",
        void 0,
        context,
        trxAdapter
      );
      return _account;
    },
    updateUser: async (userId, data, context, trxAdapter) => {
      const user2 = await updateWithHooks(
        data,
        [
          {
            field: "id",
            value: userId
          }
        ],
        "user",
        void 0,
        context,
        trxAdapter
      );
      if (secondaryStorage && user2) {
        const listRaw = await secondaryStorage.get(`active-sessions-${userId}`);
        if (listRaw) {
          const now = Date.now();
          const list = safeJSONParse(listRaw) || [];
          const validSessions = list.filter((s) => s.expiresAt > now);
          await Promise.all(
            validSessions.map(async ({ token }) => {
              const cached = await secondaryStorage.get(token);
              if (!cached) return;
              const parsed = safeJSONParse(cached);
              if (!parsed) return;
              const sessionTTL = Math.max(
                Math.floor(
                  (new Date(parsed.session.expiresAt).getTime() - now) / 1e3
                ),
                0
              );
              await secondaryStorage.set(
                token,
                JSON.stringify({
                  session: parsed.session,
                  user: user2
                }),
                sessionTTL
              );
            })
          );
        }
      }
      return user2;
    },
    updateUserByEmail: async (email, data, context, trxAdapter) => {
      const user2 = await updateWithHooks(
        data,
        [
          {
            field: "email",
            value: email.toLowerCase()
          }
        ],
        "user",
        void 0,
        context,
        trxAdapter
      );
      return user2;
    },
    updatePassword: async (userId, password, context, trxAdapter) => {
      await updateManyWithHooks(
        {
          password
        },
        [
          {
            field: "userId",
            value: userId
          },
          {
            field: "providerId",
            value: "credential"
          }
        ],
        "account",
        void 0,
        context,
        trxAdapter
      );
    },
    findAccounts: async (userId, trxAdapter) => {
      const accounts = await (trxAdapter || adapter).findMany({
        model: "account",
        where: [
          {
            field: "userId",
            value: userId
          }
        ]
      });
      return accounts;
    },
    findAccount: async (accountId, trxAdapter) => {
      const account = await (trxAdapter || adapter).findOne({
        model: "account",
        where: [
          {
            field: "accountId",
            value: accountId
          }
        ]
      });
      return account;
    },
    findAccountByProviderId: async (accountId, providerId, trxAdapter) => {
      const account = await (trxAdapter || adapter).findOne({
        model: "account",
        where: [
          {
            field: "accountId",
            value: accountId
          },
          {
            field: "providerId",
            value: providerId
          }
        ]
      });
      return account;
    },
    findAccountByUserId: async (userId, trxAdapter) => {
      const account = await (trxAdapter || adapter).findMany({
        model: "account",
        where: [
          {
            field: "userId",
            value: userId
          }
        ]
      });
      return account;
    },
    updateAccount: async (id, data, context, trxAdapter) => {
      const account = await updateWithHooks(
        data,
        [{ field: "id", value: id }],
        "account",
        void 0,
        context,
        trxAdapter
      );
      return account;
    },
    createVerificationValue: async (data, context, trxAdapter) => {
      const verification = await createWithHooks(
        {
          // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          ...data
        },
        "verification",
        void 0,
        context,
        trxAdapter
      );
      return verification;
    },
    findVerificationValue: async (identifier, trxAdapter) => {
      const verification = await (trxAdapter || adapter).findMany(
        {
          model: "verification",
          where: [
            {
              field: "identifier",
              value: identifier
            }
          ],
          sortBy: {
            field: "createdAt",
            direction: "desc"
          },
          limit: 1
        }
      );
      if (!options.verification?.disableCleanup) {
        await (trxAdapter || adapter).deleteMany({
          model: "verification",
          where: [
            {
              field: "expiresAt",
              value: /* @__PURE__ */ new Date(),
              operator: "lt"
            }
          ]
        });
      }
      const lastVerification = verification[0];
      return lastVerification;
    },
    deleteVerificationValue: async (id, trxAdapter) => {
      await (trxAdapter || adapter).delete({
        model: "verification",
        where: [
          {
            field: "id",
            value: id
          }
        ]
      });
    },
    deleteVerificationByIdentifier: async (identifier, trxAdapter) => {
      await (trxAdapter || adapter).delete({
        model: "verification",
        where: [
          {
            field: "identifier",
            value: identifier
          }
        ]
      });
    },
    updateVerificationValue: async (id, data, context, trxAdapter) => {
      const verification = await updateWithHooks(
        data,
        [{ field: "id", value: id }],
        "verification",
        void 0,
        context,
        trxAdapter
      );
      return verification;
    }
  };
};
async function getAdapter(options) {
  if (!options.database) {
    const tables = getAuthTables(options);
    const memoryDB = Object.keys(tables).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    logger.warn(
      "No database configuration provided. Using memory adapter in development"
    );
    return memoryAdapter(memoryDB)(options);
  }
  if (typeof options.database === "function") {
    return options.database(options);
  }
  const { kysely, databaseType } = await createKyselyAdapter(options);
  if (!kysely) {
    throw new BetterAuthError("Failed to initialize database adapter");
  }
  return kyselyAdapter(kysely, {
    type: databaseType || "sqlite",
    debugLogs: "debugLogs" in options.database ? options.database.debugLogs : false
  })(options);
}
function getSchema(config) {
  const tables = getAuthTables(config);
  let schema2 = {};
  for (const key in tables) {
    const table = tables[key];
    const fields = table.fields;
    let actualFields = {};
    Object.entries(fields).forEach(([key2, field]) => {
      actualFields[field.fieldName || key2] = field;
      if (field.references) {
        const refTable = tables[field.references.model];
        if (refTable) {
          actualFields[field.fieldName || key2].references = {
            model: refTable.modelName,
            field: field.references.field
          };
        }
      }
    });
    if (schema2[table.modelName]) {
      schema2[table.modelName].fields = {
        ...schema2[table.modelName].fields,
        ...actualFields
      };
      continue;
    }
    schema2[table.modelName] = {
      fields: actualFields,
      order: table.order || Infinity
    };
  }
  return schema2;
}
const postgresMap = {
  string: ["character varying", "varchar", "text"],
  number: [
    "int4",
    "integer",
    "bigint",
    "smallint",
    "numeric",
    "real",
    "double precision"
  ],
  boolean: ["bool", "boolean"],
  date: ["timestamptz", "timestamp", "date"],
  json: ["json", "jsonb"]
};
const mysqlMap = {
  string: ["varchar", "text"],
  number: [
    "integer",
    "int",
    "bigint",
    "smallint",
    "decimal",
    "float",
    "double"
  ],
  boolean: ["boolean", "tinyint"],
  date: ["timestamp", "datetime", "date"],
  json: ["json"]
};
const sqliteMap = {
  string: ["TEXT"],
  number: ["INTEGER", "REAL"],
  boolean: ["INTEGER", "BOOLEAN"],
  // 0 or 1
  date: ["DATE", "INTEGER"],
  json: ["TEXT"]
};
const mssqlMap = {
  string: ["varchar", "nvarchar"],
  number: ["int", "bigint", "smallint", "decimal", "float", "double"],
  boolean: ["bit", "smallint"],
  date: ["datetime", "date"],
  json: ["varchar", "nvarchar"]
};
const map = {
  postgres: postgresMap,
  mysql: mysqlMap,
  sqlite: sqliteMap,
  mssql: mssqlMap
};
function matchType(columnDataType, fieldType, dbType) {
  function normalize(type) {
    return type.toLowerCase().split("(")[0].trim();
  }
  if (fieldType === "string[]" || fieldType === "number[]") {
    return columnDataType.toLowerCase().includes("json");
  }
  const types = map[dbType];
  const expected = Array.isArray(fieldType) ? types["string"].map((t) => t.toLowerCase()) : types[fieldType].map((t) => t.toLowerCase());
  return expected.includes(normalize(columnDataType));
}
async function getMigrations(config) {
  const betterAuthSchema = getSchema(config);
  const logger2 = createLogger(config.logger);
  let { kysely: db, databaseType: dbType } = await createKyselyAdapter(config);
  if (!dbType) {
    logger2.warn(
      "Could not determine database type, defaulting to sqlite. Please provide a type in the database options to avoid this."
    );
    dbType = "sqlite";
  }
  if (!db) {
    logger2.error(
      "Only kysely adapter is supported for migrations. You can use `generate` command to generate the schema, if you're using a different adapter."
    );
    process.exit(1);
  }
  const tableMetadata = await db.introspection.getTables();
  const toBeCreated = [];
  const toBeAdded = [];
  for (const [key, value] of Object.entries(betterAuthSchema)) {
    const table = tableMetadata.find((t) => t.name === key);
    if (!table) {
      const tIndex = toBeCreated.findIndex((t) => t.table === key);
      const tableData = {
        table: key,
        fields: value.fields,
        order: value.order || Infinity
      };
      const insertIndex = toBeCreated.findIndex(
        (t) => (t.order || Infinity) > tableData.order
      );
      if (insertIndex === -1) {
        if (tIndex === -1) {
          toBeCreated.push(tableData);
        } else {
          toBeCreated[tIndex].fields = {
            ...toBeCreated[tIndex].fields,
            ...value.fields
          };
        }
      } else {
        toBeCreated.splice(insertIndex, 0, tableData);
      }
      continue;
    }
    let toBeAddedFields = {};
    for (const [fieldName, field] of Object.entries(value.fields)) {
      const column = table.columns.find((c) => c.name === fieldName);
      if (!column) {
        toBeAddedFields[fieldName] = field;
        continue;
      }
      if (matchType(column.dataType, field.type, dbType)) {
        continue;
      } else {
        logger2.warn(
          `Field ${fieldName} in table ${key} has a different type in the database. Expected ${field.type} but got ${column.dataType}.`
        );
      }
    }
    if (Object.keys(toBeAddedFields).length > 0) {
      toBeAdded.push({
        table: key,
        fields: toBeAddedFields,
        order: value.order || Infinity
      });
    }
  }
  const migrations = [];
  function getType(field, fieldName) {
    const type = field.type;
    const typeMap = {
      string: {
        sqlite: "text",
        postgres: "text",
        mysql: field.unique ? "varchar(255)" : field.references ? "varchar(36)" : "text",
        mssql: field.unique || field.sortable ? "varchar(255)" : field.references ? "varchar(36)" : (
          // mssql deprecated `text`, and the alternative is `varchar(max)`.
          // Kysely type interface doesn't support `text`, so we set this to `varchar(8000)` as
          // that's the max length for `varchar`
          "varchar(8000)"
        )
      },
      boolean: {
        sqlite: "integer",
        postgres: "boolean",
        mysql: "boolean",
        mssql: "smallint"
      },
      number: {
        sqlite: field.bigint ? "bigint" : "integer",
        postgres: field.bigint ? "bigint" : "integer",
        mysql: field.bigint ? "bigint" : "integer",
        mssql: field.bigint ? "bigint" : "integer"
      },
      date: {
        sqlite: "date",
        postgres: "timestamptz",
        mysql: "timestamp",
        mssql: "datetime"
      },
      json: {
        sqlite: "text",
        postgres: "jsonb",
        mysql: "json",
        mssql: "varchar(8000)"
      },
      id: {
        postgres: config.advanced?.database?.useNumberId ? "serial" : "text",
        mysql: config.advanced?.database?.useNumberId ? "integer" : "varchar(36)",
        mssql: config.advanced?.database?.useNumberId ? "integer" : "varchar(36)",
        sqlite: config.advanced?.database?.useNumberId ? "integer" : "text"
      }
    };
    if (fieldName === "id" || field.references?.field === "id") {
      return typeMap.id[dbType];
    }
    if (dbType === "sqlite" && (type === "string[]" || type === "number[]")) {
      return "text";
    }
    if (type === "string[]" || type === "number[]") {
      return "jsonb";
    }
    if (Array.isArray(type)) {
      return "text";
    }
    return typeMap[type][dbType || "sqlite"];
  }
  if (toBeAdded.length) {
    for (const table of toBeAdded) {
      for (const [fieldName, field] of Object.entries(table.fields)) {
        const type = getType(field, fieldName);
        const exec = db.schema.alterTable(table.table).addColumn(fieldName, type, (col) => {
          col = field.required !== false ? col.notNull() : col;
          if (field.references) {
            col = col.references(
              `${field.references.model}.${field.references.field}`
            ).onDelete(field.references.onDelete || "cascade");
          }
          if (field.unique) {
            col = col.unique();
          }
          if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) {
            col = col.defaultTo(sql`CURRENT_TIMESTAMP`);
          }
          return col;
        });
        migrations.push(exec);
      }
    }
  }
  if (toBeCreated.length) {
    for (const table of toBeCreated) {
      let dbT = db.schema.createTable(table.table).addColumn(
        "id",
        config.advanced?.database?.useNumberId ? dbType === "postgres" ? "serial" : "integer" : dbType === "mysql" || dbType === "mssql" ? "varchar(36)" : "text",
        (col) => {
          if (config.advanced?.database?.useNumberId) {
            if (dbType === "postgres" || dbType === "sqlite") {
              return col.primaryKey().notNull();
            }
            return col.autoIncrement().primaryKey().notNull();
          }
          return col.primaryKey().notNull();
        }
      );
      for (const [fieldName, field] of Object.entries(table.fields)) {
        const type = getType(field, fieldName);
        dbT = dbT.addColumn(fieldName, type, (col) => {
          col = field.required !== false ? col.notNull() : col;
          if (field.references) {
            col = col.references(`${field.references.model}.${field.references.field}`).onDelete(field.references.onDelete || "cascade");
          }
          if (field.unique) {
            col = col.unique();
          }
          if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) {
            col = col.defaultTo(sql`CURRENT_TIMESTAMP`);
          }
          return col;
        });
      }
      migrations.push(dbT);
    }
  }
  async function runMigrations() {
    for (const migration of migrations) {
      await migration.execute();
    }
  }
  async function compileMigrations() {
    const compiled = migrations.map((m) => m.compile().sql);
    return compiled.join(";\n\n") + ";";
  }
  return { toBeCreated, toBeAdded, runMigrations, compileMigrations };
}
async function checkPassword(userId, c) {
  const accounts = await c.context.internalAdapter.findAccounts(userId);
  const credentialAccount = accounts?.find(
    (account) => account.providerId === "credential"
  );
  const currentPassword = credentialAccount?.password;
  if (!credentialAccount || !currentPassword || !c.body.password) {
    throw new APIError("BAD_REQUEST", {
      message: "No password credential found"
    });
  }
  const compare = await c.context.password.verify({
    hash: currentPassword,
    password: c.body.password
  });
  if (!compare) {
    throw new APIError("BAD_REQUEST", {
      message: "Invalid password"
    });
  }
  return true;
}
const DEFAULT_SECRET = "better-auth-secret-123456789";
let packageJSONCache;
async function readRootPackageJson() {
  if (packageJSONCache) return packageJSONCache;
  try {
    const cwd = typeof process !== "undefined" && typeof process.cwd === "function" ? process.cwd() : "";
    if (!cwd) return void 0;
    const importRuntime2 = (m) => Function("mm", "return import(mm)")(m);
    const [{ default: fs }, { default: path }] = await Promise.all([
      importRuntime2("fs/promises"),
      importRuntime2("path")
    ]);
    const raw = await fs.readFile(path.join(cwd, "package.json"), "utf-8");
    packageJSONCache = JSON.parse(raw);
    return packageJSONCache;
  } catch {
  }
  return void 0;
}
async function getPackageVersion(pkg) {
  if (packageJSONCache) {
    return packageJSONCache.dependencies?.[pkg] || packageJSONCache.devDependencies?.[pkg] || packageJSONCache.peerDependencies?.[pkg];
  }
  try {
    const cwd = typeof process !== "undefined" && typeof process.cwd === "function" ? process.cwd() : "";
    if (!cwd) throw new Error("no-cwd");
    const importRuntime2 = (m) => Function("mm", "return import(mm)")(m);
    const [{ default: fs }, { default: path }] = await Promise.all([
      importRuntime2("fs/promises"),
      importRuntime2("path")
    ]);
    const pkgJsonPath = path.join(cwd, "node_modules", pkg, "package.json");
    const raw = await fs.readFile(pkgJsonPath, "utf-8");
    const json = JSON.parse(raw);
    const resolved = json.version || await getVersionFromLocalPackageJson(pkg) || void 0;
    return resolved;
  } catch {
  }
  const fromRoot = await getVersionFromLocalPackageJson(pkg);
  return fromRoot;
}
async function getVersionFromLocalPackageJson(pkg) {
  const json = await readRootPackageJson();
  if (!json) return void 0;
  const allDeps = {
    ...json.dependencies,
    ...json.devDependencies,
    ...json.peerDependencies
  };
  return allDeps[pkg];
}
async function getNameFromLocalPackageJson() {
  const json = await readRootPackageJson();
  return json?.name;
}
let projectIdCached = null;
async function getProjectId(baseUrl) {
  if (projectIdCached) return projectIdCached;
  const projectName = await getNameFromLocalPackageJson();
  if (projectName) {
    projectIdCached = await hashToBase64(
      baseUrl ? baseUrl + projectName : projectName
    );
    return projectIdCached;
  }
  if (baseUrl) {
    projectIdCached = await hashToBase64(baseUrl);
    return projectIdCached;
  }
  projectIdCached = generateId(32);
  return projectIdCached;
}
const importRuntime = (m) => {
  return Function("mm", "return import(mm)")(m);
};
function getVendor() {
  const hasAny = (...keys) => keys.some((k) => Boolean(env[k]));
  if (hasAny("CF_PAGES", "CF_PAGES_URL", "CF_ACCOUNT_ID") || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers") {
    return "cloudflare";
  }
  if (hasAny("VERCEL", "VERCEL_URL", "VERCEL_ENV")) return "vercel";
  if (hasAny("NETLIFY", "NETLIFY_URL")) return "netlify";
  if (hasAny(
    "RENDER",
    "RENDER_URL",
    "RENDER_INTERNAL_HOSTNAME",
    "RENDER_SERVICE_ID"
  )) {
    return "render";
  }
  if (hasAny("AWS_LAMBDA_FUNCTION_NAME", "AWS_EXECUTION_ENV", "LAMBDA_TASK_ROOT")) {
    return "aws";
  }
  if (hasAny(
    "GOOGLE_CLOUD_FUNCTION_NAME",
    "GOOGLE_CLOUD_PROJECT",
    "GCP_PROJECT",
    "K_SERVICE"
  )) {
    return "gcp";
  }
  if (hasAny(
    "AZURE_FUNCTION_NAME",
    "FUNCTIONS_WORKER_RUNTIME",
    "WEBSITE_INSTANCE_ID",
    "WEBSITE_SITE_NAME"
  )) {
    return "azure";
  }
  if (hasAny("DENO_DEPLOYMENT_ID", "DENO_REGION")) return "deno-deploy";
  if (hasAny("FLY_APP_NAME", "FLY_REGION", "FLY_ALLOC_ID")) return "fly-io";
  if (hasAny("RAILWAY_STATIC_URL", "RAILWAY_ENVIRONMENT_NAME"))
    return "railway";
  if (hasAny("DYNO", "HEROKU_APP_NAME")) return "heroku";
  if (hasAny("DO_DEPLOYMENT_ID", "DO_APP_NAME", "DIGITALOCEAN"))
    return "digitalocean";
  if (hasAny("KOYEB", "KOYEB_DEPLOYMENT_ID", "KOYEB_APP_NAME")) return "koyeb";
  return null;
}
async function detectSystemInfo() {
  try {
    if (getVendor() === "cloudflare") return "cloudflare";
    const os = await importRuntime("os");
    const cpus = os.cpus();
    return {
      deploymentVendor: getVendor(),
      systemPlatform: os.platform(),
      systemRelease: os.release(),
      systemArchitecture: os.arch(),
      cpuCount: cpus.length,
      cpuModel: cpus.length ? cpus[0].model : null,
      cpuSpeed: cpus.length ? cpus[0].speed : null,
      memory: os.totalmem(),
      isWSL: await isWsl(),
      isDocker: await isDocker(),
      isTTY: typeof process !== "undefined" && process.stdout ? process.stdout.isTTY : null
    };
  } catch (e) {
    return {
      systemPlatform: null,
      systemRelease: null,
      systemArchitecture: null,
      cpuCount: null,
      cpuModel: null,
      cpuSpeed: null,
      memory: null,
      isWSL: null,
      isDocker: null,
      isTTY: null
    };
  }
}
let isDockerCached;
async function hasDockerEnv() {
  if (getVendor() === "cloudflare") return false;
  try {
    const fs = await importRuntime("fs");
    fs.statSync("/.dockerenv");
    return true;
  } catch {
    return false;
  }
}
async function hasDockerCGroup() {
  if (getVendor() === "cloudflare") return false;
  try {
    const fs = await importRuntime("fs");
    return fs.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
  } catch {
    return false;
  }
}
async function isDocker() {
  if (getVendor() === "cloudflare") return false;
  if (isDockerCached === void 0) {
    isDockerCached = await hasDockerEnv() || await hasDockerCGroup();
  }
  return isDockerCached;
}
async function isWsl() {
  try {
    if (getVendor() === "cloudflare") return false;
    if (typeof process === "undefined" || process.platform !== "linux") {
      return false;
    }
    const fs = await importRuntime("fs");
    const os = await importRuntime("os");
    if (os.release().toLowerCase().includes("microsoft")) {
      if (await isInsideContainer()) {
        return false;
      }
      return true;
    }
    return fs.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !await isInsideContainer() : false;
  } catch {
    return false;
  }
}
let isInsideContainerCached;
const hasContainerEnv = async () => {
  if (getVendor() === "cloudflare") return false;
  try {
    const fs = await importRuntime("fs");
    fs.statSync("/run/.containerenv");
    return true;
  } catch {
    return false;
  }
};
async function isInsideContainer() {
  if (isInsideContainerCached === void 0) {
    isInsideContainerCached = await hasContainerEnv() || await isDocker();
  }
  return isInsideContainerCached;
}
function isCI() {
  return env.CI !== "false" && ("BUILD_ID" in env || // Jenkins, Cloudbees
  "BUILD_NUMBER" in env || // Jenkins, TeamCity (fixed typo: extra space removed)
  "CI" in env || // Travis CI, CircleCI, Cirrus CI, Gitlab CI, Appveyor, CodeShip, dsari, Cloudflare
  "CI_APP_ID" in env || // Appflow
  "CI_BUILD_ID" in env || // Appflow
  "CI_BUILD_NUMBER" in env || // Appflow
  "CI_NAME" in env || // Codeship and others
  "CONTINUOUS_INTEGRATION" in env || // Travis CI, Cirrus CI
  "RUN_ID" in env);
}
function detectRuntime() {
  if (typeof Deno !== "undefined") {
    const denoVersion = Deno?.version?.deno ?? null;
    return { name: "deno", version: denoVersion };
  }
  if (typeof Bun !== "undefined") {
    const bunVersion = Bun?.version ?? null;
    return { name: "bun", version: bunVersion };
  }
  if (typeof process !== "undefined" && process?.versions?.node) {
    return { name: "node", version: process.versions.node ?? null };
  }
  return { name: "edge", version: null };
}
function detectEnvironment() {
  return getEnvVar("NODE_ENV") === "production" ? "production" : isCI() ? "ci" : isTest() ? "test" : "development";
}
const DATABASES = {
  pg: "postgresql",
  mysql: "mysql",
  mariadb: "mariadb",
  sqlite3: "sqlite",
  "better-sqlite3": "sqlite",
  "@prisma/client": "prisma",
  mongoose: "mongodb",
  mongodb: "mongodb",
  "drizzle-orm": "drizzle"
};
async function detectDatabase() {
  for (const [pkg, name] of Object.entries(DATABASES)) {
    const version = await getPackageVersion(pkg);
    if (version) return { name, version };
  }
  return void 0;
}
const FRAMEWORKS = {
  next: "next",
  nuxt: "nuxt",
  "@remix-run/server-runtime": "remix",
  astro: "astro",
  "@sveltejs/kit": "sveltekit",
  "solid-start": "solid-start",
  "tanstack-start": "tanstack-start",
  hono: "hono",
  express: "express",
  elysia: "elysia",
  expo: "expo"
};
async function detectFramework() {
  for (const [pkg, name] of Object.entries(FRAMEWORKS)) {
    const version = await getPackageVersion(pkg);
    if (version) return { name, version };
  }
  return void 0;
}
function detectPackageManager() {
  const userAgent = env.npm_config_user_agent;
  if (!userAgent) {
    return void 0;
  }
  const pmSpec = userAgent.split(" ")[0];
  const separatorPos = pmSpec.lastIndexOf("/");
  const name = pmSpec.substring(0, separatorPos);
  return {
    name: name === "npminstall" ? "cnpm" : name,
    version: pmSpec.substring(separatorPos + 1)
  };
}
function getTelemetryAuthConfig(options, context) {
  return {
    database: context?.database,
    adapter: context?.adapter,
    emailVerification: {
      sendVerificationEmail: !!options.emailVerification?.sendVerificationEmail,
      sendOnSignUp: !!options.emailVerification?.sendOnSignUp,
      sendOnSignIn: !!options.emailVerification?.sendOnSignIn,
      autoSignInAfterVerification: !!options.emailVerification?.autoSignInAfterVerification,
      expiresIn: options.emailVerification?.expiresIn,
      onEmailVerification: !!options.emailVerification?.onEmailVerification,
      afterEmailVerification: !!options.emailVerification?.afterEmailVerification
    },
    emailAndPassword: {
      enabled: !!options.emailAndPassword?.enabled,
      disableSignUp: !!options.emailAndPassword?.disableSignUp,
      requireEmailVerification: !!options.emailAndPassword?.requireEmailVerification,
      maxPasswordLength: options.emailAndPassword?.maxPasswordLength,
      minPasswordLength: options.emailAndPassword?.minPasswordLength,
      sendResetPassword: !!options.emailAndPassword?.sendResetPassword,
      resetPasswordTokenExpiresIn: options.emailAndPassword?.resetPasswordTokenExpiresIn,
      onPasswordReset: !!options.emailAndPassword?.onPasswordReset,
      password: {
        hash: !!options.emailAndPassword?.password?.hash,
        verify: !!options.emailAndPassword?.password?.verify
      },
      autoSignIn: !!options.emailAndPassword?.autoSignIn,
      revokeSessionsOnPasswordReset: !!options.emailAndPassword?.revokeSessionsOnPasswordReset
    },
    socialProviders: Object.keys(options.socialProviders || {}).map((p) => {
      const provider = options.socialProviders?.[p];
      if (!provider) return {};
      return {
        id: p,
        mapProfileToUser: !!provider.mapProfileToUser,
        disableDefaultScope: !!provider.disableDefaultScope,
        disableIdTokenSignIn: !!provider.disableIdTokenSignIn,
        disableImplicitSignUp: provider.disableImplicitSignUp,
        disableSignUp: provider.disableSignUp,
        getUserInfo: !!provider.getUserInfo,
        overrideUserInfoOnSignIn: !!provider.overrideUserInfoOnSignIn,
        prompt: provider.prompt,
        verifyIdToken: !!provider.verifyIdToken,
        scope: provider.scope,
        refreshAccessToken: !!provider.refreshAccessToken
      };
    }),
    plugins: options.plugins?.map((p) => p.id.toString()),
    user: {
      modelName: options.user?.modelName,
      fields: options.user?.fields,
      additionalFields: options.user?.additionalFields,
      changeEmail: {
        enabled: options.user?.changeEmail?.enabled,
        sendChangeEmailVerification: !!options.user?.changeEmail?.sendChangeEmailVerification
      }
    },
    verification: {
      modelName: options.verification?.modelName,
      disableCleanup: options.verification?.disableCleanup,
      fields: options.verification?.fields
    },
    session: {
      modelName: options.session?.modelName,
      additionalFields: options.session?.additionalFields,
      cookieCache: {
        enabled: options.session?.cookieCache?.enabled,
        maxAge: options.session?.cookieCache?.maxAge
      },
      disableSessionRefresh: options.session?.disableSessionRefresh,
      expiresIn: options.session?.expiresIn,
      fields: options.session?.fields,
      freshAge: options.session?.freshAge,
      preserveSessionInDatabase: options.session?.preserveSessionInDatabase,
      storeSessionInDatabase: options.session?.storeSessionInDatabase,
      updateAge: options.session?.updateAge
    },
    account: {
      modelName: options.account?.modelName,
      fields: options.account?.fields,
      encryptOAuthTokens: options.account?.encryptOAuthTokens,
      updateAccountOnSignIn: options.account?.updateAccountOnSignIn,
      accountLinking: {
        enabled: options.account?.accountLinking?.enabled,
        trustedProviders: options.account?.accountLinking?.trustedProviders,
        updateUserInfoOnLink: options.account?.accountLinking?.updateUserInfoOnLink,
        allowUnlinkingAll: options.account?.accountLinking?.allowUnlinkingAll
      }
    },
    hooks: {
      after: !!options.hooks?.after,
      before: !!options.hooks?.before
    },
    secondaryStorage: !!options.secondaryStorage,
    advanced: {
      cookiePrefix: !!options.advanced?.cookiePrefix,
      //this shouldn't be tracked
      cookies: !!options.advanced?.cookies,
      crossSubDomainCookies: {
        domain: !!options.advanced?.crossSubDomainCookies?.domain,
        enabled: options.advanced?.crossSubDomainCookies?.enabled,
        additionalCookies: options.advanced?.crossSubDomainCookies?.additionalCookies
      },
      database: {
        useNumberId: !!options.advanced?.database?.useNumberId,
        generateId: options.advanced?.database?.generateId,
        defaultFindManyLimit: options.advanced?.database?.defaultFindManyLimit
      },
      useSecureCookies: options.advanced?.useSecureCookies,
      ipAddress: {
        disableIpTracking: options.advanced?.ipAddress?.disableIpTracking,
        ipAddressHeaders: options.advanced?.ipAddress?.ipAddressHeaders
      },
      disableCSRFCheck: options.advanced?.disableCSRFCheck,
      cookieAttributes: {
        expires: options.advanced?.defaultCookieAttributes?.expires,
        secure: options.advanced?.defaultCookieAttributes?.secure,
        sameSite: options.advanced?.defaultCookieAttributes?.sameSite,
        domain: !!options.advanced?.defaultCookieAttributes?.domain,
        path: options.advanced?.defaultCookieAttributes?.path,
        httpOnly: options.advanced?.defaultCookieAttributes?.httpOnly
      }
    },
    trustedOrigins: options.trustedOrigins?.length,
    rateLimit: {
      storage: options.rateLimit?.storage,
      modelName: options.rateLimit?.modelName,
      window: options.rateLimit?.window,
      customStorage: !!options.rateLimit?.customStorage,
      enabled: options.rateLimit?.enabled,
      max: options.rateLimit?.max
    },
    onAPIError: {
      errorURL: options.onAPIError?.errorURL,
      onError: !!options.onAPIError?.onError,
      throw: options.onAPIError?.throw
    },
    logger: {
      disabled: options.logger?.disabled,
      level: options.logger?.level,
      log: !!options.logger?.log
    },
    databaseHooks: {
      user: {
        create: {
          after: !!options.databaseHooks?.user?.create?.after,
          before: !!options.databaseHooks?.user?.create?.before
        },
        update: {
          after: !!options.databaseHooks?.user?.update?.after,
          before: !!options.databaseHooks?.user?.update?.before
        }
      },
      session: {
        create: {
          after: !!options.databaseHooks?.session?.create?.after,
          before: !!options.databaseHooks?.session?.create?.before
        },
        update: {
          after: !!options.databaseHooks?.session?.update?.after,
          before: !!options.databaseHooks?.session?.update?.before
        }
      },
      account: {
        create: {
          after: !!options.databaseHooks?.account?.create?.after,
          before: !!options.databaseHooks?.account?.create?.before
        },
        update: {
          after: !!options.databaseHooks?.account?.update?.after,
          before: !!options.databaseHooks?.account?.update?.before
        }
      },
      verification: {
        create: {
          after: !!options.databaseHooks?.verification?.create?.after,
          before: !!options.databaseHooks?.verification?.create?.before
        },
        update: {
          after: !!options.databaseHooks?.verification?.update?.after,
          before: !!options.databaseHooks?.verification?.update?.before
        }
      }
    }
  };
}
async function createTelemetry(options, context) {
  const debugEnabled = options.telemetry?.debug || getBooleanEnvVar("BETTER_AUTH_TELEMETRY_DEBUG", false);
  const TELEMETRY_ENDPOINT = ENV.BETTER_AUTH_TELEMETRY_ENDPOINT;
  const track = async (event) => {
    try {
      if (context?.customTrack) {
        await context.customTrack(event);
      } else {
        if (debugEnabled) {
          await Promise.resolve(
            logger.info("telemetry event", JSON.stringify(event, null, 2))
          );
        } else {
          await betterFetch(TELEMETRY_ENDPOINT, {
            method: "POST",
            body: event
          });
        }
      }
    } catch {
    }
  };
  const isEnabled = async () => {
    const telemetryEnabled = options.telemetry?.enabled !== void 0 ? options.telemetry.enabled : false;
    const envEnabled = getBooleanEnvVar("BETTER_AUTH_TELEMETRY", false);
    return (envEnabled || telemetryEnabled) && (context?.skipTestCheck || !isTest());
  };
  const enabled = await isEnabled();
  let anonymousId;
  if (enabled) {
    anonymousId = await getProjectId(options.baseURL);
    const payload = {
      config: getTelemetryAuthConfig(options),
      runtime: detectRuntime(),
      database: await detectDatabase(),
      framework: await detectFramework(),
      environment: detectEnvironment(),
      systemInfo: await detectSystemInfo(),
      packageManager: detectPackageManager()
    };
    void track({ type: "init", payload, anonymousId });
  }
  return {
    publish: async (event) => {
      if (!enabled) return;
      if (!anonymousId) {
        anonymousId = await getProjectId(options.baseURL);
      }
      await track({
        type: event.type,
        payload: event.payload,
        anonymousId
      });
    }
  };
}
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
const init = async (options) => {
  const adapter = await getAdapter(options);
  const plugins = options.plugins || [];
  const internalPlugins = getInternalPlugins(options);
  const logger2 = createLogger(options.logger);
  const baseURL = getBaseURL(options.baseURL, options.basePath);
  const secret = options.secret || env.BETTER_AUTH_SECRET || env.AUTH_SECRET || DEFAULT_SECRET;
  if (secret === DEFAULT_SECRET) {
    if (isProduction) {
      logger2.error(
        "You are using the default secret. Please set `BETTER_AUTH_SECRET` in your environment variables or pass `secret` in your auth config."
      );
    }
  }
  options = {
    ...options,
    secret,
    baseURL: baseURL ? new URL(baseURL).origin : "",
    basePath: options.basePath || "/api/auth",
    plugins: plugins.concat(internalPlugins)
  };
  checkEndpointConflicts(options, logger2);
  const cookies = getCookies(options);
  const tables = getAuthTables(options);
  const providers = Object.entries(
    options.socialProviders || {}
  ).map(([key, config]) => {
    if (config == null) {
      return null;
    }
    if (config.enabled === false) {
      return null;
    }
    if (!config.clientId) {
      logger2.warn(
        `Social provider ${key} is missing clientId or clientSecret`
      );
    }
    const provider = socialProviders[key](config);
    provider.disableImplicitSignUp = config.disableImplicitSignUp;
    return provider;
  }).filter((x) => x !== null);
  const generateIdFunc = ({ model, size }) => {
    if (typeof options.advanced?.generateId === "function") {
      return options.advanced.generateId({ model, size });
    }
    if (typeof options?.advanced?.database?.generateId === "function") {
      return options.advanced.database.generateId({ model, size });
    }
    return generateId(size);
  };
  const { publish } = await createTelemetry(options, {
    adapter: adapter.id,
    database: typeof options.database === "function" ? "adapter" : getKyselyDatabaseType(options.database) || "unknown"
  });
  let ctx = {
    appName: options.appName || "Better Auth",
    socialProviders: providers,
    options,
    tables,
    trustedOrigins: getTrustedOrigins(options),
    baseURL: baseURL || "",
    sessionConfig: {
      updateAge: options.session?.updateAge !== void 0 ? options.session.updateAge : 24 * 60 * 60,
      // 24 hours
      expiresIn: options.session?.expiresIn || 60 * 60 * 24 * 7,
      // 7 days
      freshAge: options.session?.freshAge === void 0 ? 60 * 60 * 24 : options.session.freshAge
    },
    secret,
    rateLimit: {
      ...options.rateLimit,
      enabled: options.rateLimit?.enabled ?? isProduction,
      window: options.rateLimit?.window || 10,
      max: options.rateLimit?.max || 100,
      storage: options.rateLimit?.storage || (options.secondaryStorage ? "secondary-storage" : "memory")
    },
    authCookies: cookies,
    logger: logger2,
    generateId: generateIdFunc,
    session: null,
    secondaryStorage: options.secondaryStorage,
    password: {
      hash: options.emailAndPassword?.password?.hash || hashPassword,
      verify: options.emailAndPassword?.password?.verify || verifyPassword,
      config: {
        minPasswordLength: options.emailAndPassword?.minPasswordLength || 8,
        maxPasswordLength: options.emailAndPassword?.maxPasswordLength || 128
      },
      checkPassword
    },
    setNewSession(session) {
      this.newSession = session;
    },
    newSession: null,
    adapter,
    internalAdapter: createInternalAdapter(adapter, {
      options,
      logger: logger2,
      hooks: options.databaseHooks ? [options.databaseHooks] : []
    }),
    createAuthCookie: createCookieGetter(options),
    async runMigrations() {
      if (!options.database || "updateMany" in options.database) {
        throw new BetterAuthError(
          "Database is not provided or it's an adapter. Migrations are only supported with a database instance."
        );
      }
      const { runMigrations } = await getMigrations(options);
      await runMigrations();
    },
    publishTelemetry: publish
  };
  const initOrPromise = runPluginInit(ctx);
  let context;
  if (isPromise(initOrPromise)) {
    ({ context } = await initOrPromise);
  } else {
    ({ context } = initOrPromise);
  }
  return context;
};
async function runPluginInit(ctx) {
  let options = ctx.options;
  const plugins = options.plugins || [];
  let context = ctx;
  const dbHooks = [];
  for (const plugin of plugins) {
    if (plugin.init) {
      let initPromise = plugin.init(context);
      let result;
      if (isPromise(initPromise)) {
        result = await initPromise;
      } else {
        result = initPromise;
      }
      if (typeof result === "object") {
        if (result.options) {
          const { databaseHooks, ...restOpts } = result.options;
          if (databaseHooks) {
            dbHooks.push(databaseHooks);
          }
          options = defu(options, restOpts);
        }
        if (result.context) {
          context = {
            ...context,
            ...result.context
          };
        }
      }
    }
  }
  dbHooks.push(options.databaseHooks);
  context.internalAdapter = createInternalAdapter(ctx.adapter, {
    options,
    logger: ctx.logger,
    hooks: dbHooks.filter((u) => u !== void 0),
    generateId: ctx.generateId
  });
  context.options = options;
  return { context };
}
function getInternalPlugins(options) {
  const plugins = [];
  if (options.advanced?.crossSubDomainCookies?.enabled) ;
  return plugins;
}
function getTrustedOrigins(options) {
  const baseURL = getBaseURL(options.baseURL, options.basePath);
  if (!baseURL) {
    return [];
  }
  const trustedOrigins = [new URL(baseURL).origin];
  if (options.trustedOrigins && Array.isArray(options.trustedOrigins)) {
    trustedOrigins.push(...options.trustedOrigins);
  }
  const envTrustedOrigins = env.BETTER_AUTH_TRUSTED_ORIGINS;
  if (envTrustedOrigins) {
    trustedOrigins.push(...envTrustedOrigins.split(","));
  }
  if (trustedOrigins.filter((x) => !x).length) {
    throw new BetterAuthError(
      "A provided trusted origin is invalid, make sure your trusted origins list is properly defined."
    );
  }
  return trustedOrigins;
}
const betterAuth = (options) => {
  const authContext = init(options);
  const { api } = getEndpoints(authContext, options);
  const errorCodes = options.plugins?.reduce((acc, plugin) => {
    if (plugin.$ERROR_CODES) {
      return {
        ...acc,
        ...plugin.$ERROR_CODES
      };
    }
    return acc;
  }, {});
  return {
    handler: async (request) => {
      const ctx = await authContext;
      const basePath = ctx.options.basePath || "/api/auth";
      if (!ctx.options.baseURL) {
        const baseURL = getBaseURL(void 0, basePath, request);
        if (baseURL) {
          ctx.baseURL = baseURL;
          ctx.options.baseURL = getOrigin(ctx.baseURL) || void 0;
        } else {
          throw new BetterAuthError(
            "Could not get base URL from request. Please provide a valid base URL."
          );
        }
      }
      ctx.trustedOrigins = [
        ...options.trustedOrigins ? Array.isArray(options.trustedOrigins) ? options.trustedOrigins : await options.trustedOrigins(request) : [],
        ctx.options.baseURL
      ];
      const { handler } = router(ctx, options);
      return handler(request);
    },
    api,
    options,
    $context: authContext,
    $Infer: {},
    $ERROR_CODES: {
      ...errorCodes,
      ...BASE_ERROR_CODES
    }
  };
};
const drizzleAdapter = (db, config) => {
  let lazyOptions = null;
  const createCustomAdapter = (db2) => ({ getFieldName, debugLog }) => {
    function getSchema2(model) {
      const schema2 = config.schema || db2._.fullSchema;
      if (!schema2) {
        throw new BetterAuthError(
          "Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object."
        );
      }
      const schemaModel = schema2[model];
      if (!schemaModel) {
        throw new BetterAuthError(
          `[# Drizzle Adapter]: The model "${model}" was not found in the schema object. Please pass the schema directly to the adapter options.`
        );
      }
      return schemaModel;
    }
    const withReturning = async (model, builder, data, where) => {
      if (config.provider !== "mysql") {
        const c = await builder.returning();
        return c[0];
      }
      await builder.execute();
      const schemaModel = getSchema2(model);
      const builderVal = builder.config?.values;
      if (where?.length) {
        const clause = convertWhereClause(where, model);
        const res = await db2.select().from(schemaModel).where(...clause);
        return res[0];
      } else if (builderVal && builderVal[0]?.id?.value) {
        let tId = builderVal[0]?.id?.value;
        if (!tId) {
          const lastInsertId = await db2.select({ id: sql$1`LAST_INSERT_ID()` }).from(schemaModel).orderBy(desc(schemaModel.id)).limit(1);
          tId = lastInsertId[0].id;
        }
        const res = await db2.select().from(schemaModel).where(eq(schemaModel.id, tId)).limit(1).execute();
        return res[0];
      } else if (data.id) {
        const res = await db2.select().from(schemaModel).where(eq(schemaModel.id, data.id)).limit(1).execute();
        return res[0];
      } else {
        if (!("id" in schemaModel)) {
          throw new BetterAuthError(
            `The model "${model}" does not have an "id" field. Please use the "id" field as your primary key.`
          );
        }
        const res = await db2.select().from(schemaModel).orderBy(desc(schemaModel.id)).limit(1).execute();
        return res[0];
      }
    };
    function convertWhereClause(where, model) {
      const schemaModel = getSchema2(model);
      if (!where) return [];
      if (where.length === 1) {
        const w = where[0];
        if (!w) {
          return [];
        }
        const field = getFieldName({ model, field: w.field });
        if (!schemaModel[field]) {
          throw new BetterAuthError(
            `The field "${w.field}" does not exist in the schema for the model "${model}". Please update your schema.`
          );
        }
        if (w.operator === "in") {
          if (!Array.isArray(w.value)) {
            throw new BetterAuthError(
              `The value for the field "${w.field}" must be an array when using the "in" operator.`
            );
          }
          return [inArray(schemaModel[field], w.value)];
        }
        if (w.operator === "not_in") {
          if (!Array.isArray(w.value)) {
            throw new BetterAuthError(
              `The value for the field "${w.field}" must be an array when using the "not_in" operator.`
            );
          }
          return [notInArray(schemaModel[field], w.value)];
        }
        if (w.operator === "contains") {
          return [like(schemaModel[field], `%${w.value}%`)];
        }
        if (w.operator === "starts_with") {
          return [like(schemaModel[field], `${w.value}%`)];
        }
        if (w.operator === "ends_with") {
          return [like(schemaModel[field], `%${w.value}`)];
        }
        if (w.operator === "lt") {
          return [lt(schemaModel[field], w.value)];
        }
        if (w.operator === "lte") {
          return [lte(schemaModel[field], w.value)];
        }
        if (w.operator === "ne") {
          return [ne(schemaModel[field], w.value)];
        }
        if (w.operator === "gt") {
          return [gt(schemaModel[field], w.value)];
        }
        if (w.operator === "gte") {
          return [gte(schemaModel[field], w.value)];
        }
        return [eq(schemaModel[field], w.value)];
      }
      const andGroup = where.filter(
        (w) => w.connector === "AND" || !w.connector
      );
      const orGroup = where.filter((w) => w.connector === "OR");
      const andClause = and(
        ...andGroup.map((w) => {
          const field = getFieldName({ model, field: w.field });
          if (w.operator === "in") {
            if (!Array.isArray(w.value)) {
              throw new BetterAuthError(
                `The value for the field "${w.field}" must be an array when using the "in" operator.`
              );
            }
            return inArray(schemaModel[field], w.value);
          }
          if (w.operator === "not_in") {
            if (!Array.isArray(w.value)) {
              throw new BetterAuthError(
                `The value for the field "${w.field}" must be an array when using the "not_in" operator.`
              );
            }
            return notInArray(schemaModel[field], w.value);
          }
          return eq(schemaModel[field], w.value);
        })
      );
      const orClause = or(
        ...orGroup.map((w) => {
          const field = getFieldName({ model, field: w.field });
          return eq(schemaModel[field], w.value);
        })
      );
      const clause = [];
      if (andGroup.length) clause.push(andClause);
      if (orGroup.length) clause.push(orClause);
      return clause;
    }
    function checkMissingFields(schema2, model, values) {
      if (!schema2) {
        throw new BetterAuthError(
          "Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object."
        );
      }
      for (const key in values) {
        if (!schema2[key]) {
          throw new BetterAuthError(
            `The field "${key}" does not exist in the "${model}" schema. Please update your drizzle schema or re-generate using "npx @better-auth/cli generate".`
          );
        }
      }
    }
    return {
      async create({ model, data: values }) {
        const schemaModel = getSchema2(model);
        checkMissingFields(schemaModel, model, values);
        const builder = db2.insert(schemaModel).values(values);
        const returned = await withReturning(model, builder, values);
        return returned;
      },
      async findOne({ model, where }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        const res = await db2.select().from(schemaModel).where(...clause);
        if (!res.length) return null;
        return res[0];
      },
      async findMany({ model, where, sortBy, limit, offset }) {
        const schemaModel = getSchema2(model);
        const clause = where ? convertWhereClause(where, model) : [];
        const sortFn = sortBy?.direction === "desc" ? desc : asc;
        const builder = db2.select().from(schemaModel).limit(limit || 100).offset(offset || 0);
        if (sortBy?.field) {
          builder.orderBy(
            sortFn(
              schemaModel[getFieldName({ model, field: sortBy?.field })]
            )
          );
        }
        return await builder.where(...clause);
      },
      async count({ model, where }) {
        const schemaModel = getSchema2(model);
        const clause = where ? convertWhereClause(where, model) : [];
        const res = await db2.select({ count: count() }).from(schemaModel).where(...clause);
        return res[0].count;
      },
      async update({ model, where, update: values }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        const builder = db2.update(schemaModel).set(values).where(...clause);
        return await withReturning(model, builder, values, where);
      },
      async updateMany({ model, where, update: values }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        const builder = db2.update(schemaModel).set(values).where(...clause);
        return await builder;
      },
      async delete({ model, where }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        const builder = db2.delete(schemaModel).where(...clause);
        return await builder;
      },
      async deleteMany({ model, where }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        const builder = db2.delete(schemaModel).where(...clause);
        return await builder;
      },
      options: config
    };
  };
  let adapterOptions = null;
  adapterOptions = {
    config: {
      adapterId: "drizzle",
      adapterName: "Drizzle Adapter",
      usePlural: config.usePlural ?? false,
      debugLogs: config.debugLogs ?? false,
      transaction: config.transaction ?? true ? (cb) => db.transaction((tx) => {
        const adapter2 = createAdapterFactory({
          config: adapterOptions.config,
          adapter: createCustomAdapter(tx)
        })(lazyOptions);
        return cb(adapter2);
      }) : false
    },
    adapter: createCustomAdapter(db)
  };
  const adapter = createAdapterFactory(adapterOptions);
  return (options) => {
    lazyOptions = options;
    return adapter(options);
  };
};
function toBoolean(value) {
  return value === "true" || value === true;
}
const oneTap = (options) => ({
  id: "one-tap",
  endpoints: {
    oneTapCallback: createAuthEndpoint(
      "/one-tap/callback",
      {
        method: "POST",
        body: z.object({
          idToken: z.string().meta({
            description: "Google ID token, which the client obtains from the One Tap API"
          })
        }),
        metadata: {
          openapi: {
            summary: "One tap callback",
            description: "Use this endpoint to authenticate with Google One Tap",
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        session: {
                          $ref: "#/components/schemas/Session"
                        },
                        user: {
                          $ref: "#/components/schemas/User"
                        }
                      }
                    }
                  }
                }
              },
              400: {
                description: "Invalid token"
              }
            }
          }
        }
      },
      async (ctx) => {
        const { idToken } = ctx.body;
        let payload;
        try {
          const JWKS = createRemoteJWKSet(
            new URL("https://www.googleapis.com/oauth2/v3/certs")
          );
          const { payload: verifiedPayload } = await jwtVerify(
            idToken,
            JWKS,
            {
              issuer: ["https://accounts.google.com", "accounts.google.com"],
              audience: options?.clientId || ctx.context.options.socialProviders?.google?.clientId
            }
          );
          payload = verifiedPayload;
        } catch (error2) {
          throw new APIError("BAD_REQUEST", {
            message: "invalid id token"
          });
        }
        const { email, email_verified, name, picture, sub } = payload;
        if (!email) {
          return ctx.json({ error: "Email not available in token" });
        }
        const user2 = await ctx.context.internalAdapter.findUserByEmail(email);
        if (!user2) {
          const newUser = await ctx.context.internalAdapter.createOAuthUser(
            {
              email,
              emailVerified: typeof email_verified === "boolean" ? email_verified : toBoolean(email_verified),
              name,
              image: picture
            },
            {
              providerId: "google",
              accountId: sub
            },
            ctx
          );
          if (!newUser) {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Could not create user"
            });
          }
          const session2 = await ctx.context.internalAdapter.createSession(
            newUser.user.id,
            ctx
          );
          await setSessionCookie(ctx, {
            user: newUser.user,
            session: session2
          });
          return ctx.json({
            token: session2.token,
            user: {
              id: newUser.user.id,
              email: newUser.user.email,
              emailVerified: newUser.user.emailVerified,
              name: newUser.user.name,
              image: newUser.user.image,
              createdAt: newUser.user.createdAt,
              updatedAt: newUser.user.updatedAt
            }
          });
        }
        const account = await ctx.context.internalAdapter.findAccount(sub);
        if (!account) {
          const accountLinking = ctx.context.options.account?.accountLinking;
          const shouldLinkAccount = accountLinking?.enabled && (accountLinking.trustedProviders?.includes("google") || email_verified);
          if (shouldLinkAccount) {
            await ctx.context.internalAdapter.linkAccount({
              userId: user2.user.id,
              providerId: "google",
              accountId: sub,
              scope: "openid,profile,email",
              idToken
            });
          } else {
            throw new APIError("UNAUTHORIZED", {
              message: "Google sub doesn't match"
            });
          }
        }
        const session = await ctx.context.internalAdapter.createSession(
          user2.user.id,
          ctx
        );
        await setSessionCookie(ctx, {
          user: user2.user,
          session
        });
        return ctx.json({
          token: session.token,
          user: {
            id: user2.user.id,
            email: user2.user.email,
            emailVerified: user2.user.emailVerified,
            name: user2.user.name,
            image: user2.user.image,
            createdAt: user2.user.createdAt,
            updatedAt: user2.user.updatedAt
          }
        });
      }
    )
  }
});
const allowedType = /* @__PURE__ */ new Set(["string", "number", "boolean", "array", "object"]);
function getTypeFromZodType(zodType) {
  const type = zodType.type;
  return allowedType.has(type) ? type : "string";
}
function getFieldSchema(field) {
  const schema2 = {
    type: field.type === "date" ? "string" : field.type
  };
  if (field.defaultValue !== void 0) {
    schema2.default = typeof field.defaultValue === "function" ? "Generated at runtime" : field.defaultValue;
  }
  if (field.input === false) {
    schema2.readOnly = true;
  }
  return schema2;
}
function getParameters(options) {
  const parameters = [];
  if (options.metadata?.openapi?.parameters) {
    parameters.push(...options.metadata.openapi.parameters);
    return parameters;
  }
  if (options.query instanceof z.ZodObject) {
    Object.entries(options.query.shape).forEach(([key, value]) => {
      if (value instanceof z.ZodType) {
        parameters.push({
          name: key,
          in: "query",
          schema: {
            ...processZodType(value),
            ..."minLength" in value && value.minLength ? {
              minLength: value.minLength
            } : {}
          }
        });
      }
    });
  }
  return parameters;
}
function getRequestBody(options) {
  if (options.metadata?.openapi?.requestBody) {
    return options.metadata.openapi.requestBody;
  }
  if (!options.body) return void 0;
  if (options.body instanceof z.ZodObject || options.body instanceof z.ZodOptional) {
    const shape = options.body.shape;
    if (!shape) return void 0;
    const properties = {};
    const required = [];
    Object.entries(shape).forEach(([key, value]) => {
      if (value instanceof z.ZodType) {
        properties[key] = processZodType(value);
        if (!(value instanceof z.ZodOptional)) {
          required.push(key);
        }
      }
    });
    return {
      required: options.body instanceof z.ZodOptional ? false : options.body ? true : false,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties,
            required
          }
        }
      }
    };
  }
  return void 0;
}
function processZodType(zodType) {
  if (zodType instanceof z.ZodOptional) {
    const innerType = zodType._def.innerType;
    const innerSchema = processZodType(innerType);
    return {
      ...innerSchema,
      nullable: true
    };
  }
  if (zodType instanceof z.ZodObject) {
    const shape = zodType.shape;
    if (shape) {
      const properties = {};
      const required = [];
      Object.entries(shape).forEach(([key, value]) => {
        if (value instanceof z.ZodType) {
          properties[key] = processZodType(value);
          if (!(value instanceof z.ZodOptional)) {
            required.push(key);
          }
        }
      });
      return {
        type: "object",
        properties,
        ...required.length > 0 ? { required } : {},
        description: zodType.description
      };
    }
  }
  const baseSchema = {
    type: getTypeFromZodType(zodType),
    description: zodType.description
  };
  return baseSchema;
}
function getResponse(responses) {
  return {
    "400": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string"
              }
            },
            required: ["message"]
          }
        }
      },
      description: "Bad Request. Usually due to missing parameters, or invalid parameters."
    },
    "401": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string"
              }
            },
            required: ["message"]
          }
        }
      },
      description: "Unauthorized. Due to missing or invalid authentication."
    },
    "403": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string"
              }
            }
          }
        }
      },
      description: "Forbidden. You do not have permission to access this resource or to perform this action."
    },
    "404": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string"
              }
            }
          }
        }
      },
      description: "Not Found. The requested resource was not found."
    },
    "429": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string"
              }
            }
          }
        }
      },
      description: "Too Many Requests. You have exceeded the rate limit. Try again later."
    },
    "500": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string"
              }
            }
          }
        }
      },
      description: "Internal Server Error. This is a problem with the server that you cannot fix."
    },
    ...responses
  };
}
function toOpenApiPath(path) {
  return path.split("/").map((part) => part.startsWith(":") ? `{${part.slice(1)}}` : part).join("/");
}
async function generator(ctx, options) {
  const baseEndpoints = getEndpoints(ctx, {
    ...options,
    plugins: []
  });
  const tables = getAuthTables(options);
  const models = Object.entries(tables).reduce((acc, [key, value]) => {
    const modelName = key.charAt(0).toUpperCase() + key.slice(1);
    const fields = value.fields;
    const required = [];
    const properties = {
      id: { type: "string" }
    };
    Object.entries(fields).forEach(([fieldKey, fieldValue]) => {
      if (!fieldValue) return;
      properties[fieldKey] = getFieldSchema(fieldValue);
      if (fieldValue.required && fieldValue.input !== false) {
        required.push(fieldKey);
      }
    });
    acc[modelName] = {
      type: "object",
      properties,
      ...required.length > 0 ? { required } : {}
    };
    return acc;
  }, {});
  const components = {
    schemas: {
      ...models
    }
  };
  const paths = {};
  Object.entries(baseEndpoints.api).forEach(([_, value]) => {
    if (ctx.options.disabledPaths?.includes(value.path)) return;
    const options2 = value.options;
    if (options2.metadata?.SERVER_ONLY) return;
    const path = toOpenApiPath(value.path);
    if (options2.method === "GET") {
      paths[path] = {
        get: {
          tags: ["Default", ...options2.metadata?.openapi?.tags || []],
          description: options2.metadata?.openapi?.description,
          operationId: options2.metadata?.openapi?.operationId,
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: getParameters(options2),
          responses: getResponse(options2.metadata?.openapi?.responses)
        }
      };
    }
    if (options2.method === "POST") {
      const body = getRequestBody(options2);
      paths[path] = {
        post: {
          tags: ["Default", ...options2.metadata?.openapi?.tags || []],
          description: options2.metadata?.openapi?.description,
          operationId: options2.metadata?.openapi?.operationId,
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: getParameters(options2),
          ...body ? { requestBody: body } : {
            requestBody: {
              //set body none
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {}
                  }
                }
              }
            }
          },
          responses: getResponse(options2.metadata?.openapi?.responses)
        }
      };
    }
  });
  for (const plugin of options.plugins || []) {
    if (plugin.id === "open-api") {
      continue;
    }
    const pluginEndpoints = getEndpoints(ctx, {
      ...options,
      plugins: [plugin]
    });
    const api = Object.keys(pluginEndpoints.api).map((key) => {
      if (baseEndpoints.api[key] === void 0) {
        return pluginEndpoints.api[key];
      }
      return null;
    }).filter((x) => x !== null);
    Object.entries(api).forEach(([key, value]) => {
      if (ctx.options.disabledPaths?.includes(value.path)) return;
      const options2 = value.options;
      if (options2.metadata?.SERVER_ONLY) return;
      const path = toOpenApiPath(value.path);
      if (options2.method === "GET") {
        paths[path] = {
          get: {
            tags: options2.metadata?.openapi?.tags || [
              plugin.id.charAt(0).toUpperCase() + plugin.id.slice(1)
            ],
            description: options2.metadata?.openapi?.description,
            operationId: options2.metadata?.openapi?.operationId,
            security: [
              {
                bearerAuth: []
              }
            ],
            parameters: getParameters(options2),
            responses: getResponse(options2.metadata?.openapi?.responses)
          }
        };
      }
      if (options2.method === "POST") {
        paths[path] = {
          post: {
            tags: options2.metadata?.openapi?.tags || [
              plugin.id.charAt(0).toUpperCase() + plugin.id.slice(1)
            ],
            description: options2.metadata?.openapi?.description,
            operationId: options2.metadata?.openapi?.operationId,
            security: [
              {
                bearerAuth: []
              }
            ],
            parameters: getParameters(options2),
            requestBody: getRequestBody(options2),
            responses: getResponse(options2.metadata?.openapi?.responses)
          }
        };
      }
    });
  }
  const res = {
    openapi: "3.1.1",
    info: {
      title: "Better Auth",
      description: "API Reference for your Better Auth Instance",
      version: "1.1.0"
    },
    components: {
      ...components,
      securitySchemes: {
        apiKeyCookie: {
          type: "apiKey",
          in: "cookie",
          name: "apiKeyCookie",
          description: "API Key authentication via cookie"
        },
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Bearer token authentication"
        }
      }
    },
    security: [
      {
        apiKeyCookie: [],
        bearerAuth: []
      }
    ],
    servers: [
      {
        url: ctx.baseURL
      }
    ],
    tags: [
      {
        name: "Default",
        description: "Default endpoints that are included with Better Auth by default. These endpoints are not part of any plugin."
      }
    ],
    paths
  };
  return res;
}
const logo = `<svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="75" height="75" fill="url(#pattern0_21_12)"/>
<defs>
<pattern id="pattern0_21_12" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_21_12" transform="scale(0.00094697)"/>
</pattern>
<image id="image0_21_12" width="1056" height="1056" xlink:href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAEIKADAAQAAAABAAAEIAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+ICKElDQ19QUk9GSUxFAAEBAAACGGFwcGwEAAAAbW50clJHQiBYWVogB+YAAQABAAAAAAAAYWNzcEFQUEwAAAAAQVBQTAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1hcHBs7P2jjjiFR8NttL1PetoYLwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKZGVzYwAAAPwAAAAwY3BydAAAASwAAABQd3RwdAAAAXwAAAAUclhZWgAAAZAAAAAUZ1hZWgAAAaQAAAAUYlhZWgAAAbgAAAAUclRSQwAAAcwAAAAgY2hhZAAAAewAAAAsYlRSQwAAAcwAAAAgZ1RSQwAAAcwAAAAgbWx1YwAAAAAAAAABAAAADGVuVVMAAAAUAAAAHABEAGkAcwBwAGwAYQB5ACAAUAAzbWx1YwAAAAAAAAABAAAADGVuVVMAAAA0AAAAHABDAG8AcAB5AHIAaQBnAGgAdAAgAEEAcABwAGwAZQAgAEkAbgBjAC4ALAAgADIAMAAyADJYWVogAAAAAAAA9tUAAQAAAADTLFhZWiAAAAAAAACD3wAAPb////+7WFlaIAAAAAAAAEq/AACxNwAACrlYWVogAAAAAAAAKDgAABELAADIuXBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbc2YzMgAAAAAAAQxCAAAF3v//8yYAAAeTAAD9kP//+6L///2jAAAD3AAAwG7/wAARCAQgBCADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAgICAgIDAgIDBAMDAwQFBAQEBAUHBQUFBQUHCAcHBwcHBwgICAgICAgICgoKCgoKCwsLCwsNDQ0NDQ0NDQ0N/9sAQwECAgIDAwMGAwMGDQkHCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0N/90ABABC/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9L9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9b9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9H9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9T9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Ln/gq38a/in8Dvgp4T8R/CfxFdeG9SvvFMdlcXFoELyW5srqQxnzEcY3op4Gciv1Gr8Z/+C2X/JvXgj/sc4v/AE33lAH4z/8ADwv9tD/oq2tf9823/wAZo/4eF/tof9FW1r/vm2/+M18Z0UAfZn/Dwv8AbQ/6KtrX/fNt/wDGaP8Ah4X+2h/0VbWv++bb/wCM18Z0UAfZn/Dwv9tD/oq2tf8AfNt/8Zo/4eF/tof9FW1r/vm2/wDjNfGdFAH2Z/w8L/bQ/wCira1/3zbf/GaP+Hhf7aH/AEVbWv8Avm2/+M18Z0UAfZn/AA8L/bQ/6KtrX/fNt/8AGaP+Hhf7aH/RVta/75tv/jNfGdFAH2Z/w8L/AG0P+ira1/3zbf8Axmj/AIeF/tof9FW1r/vm2/8AjNfGdFAH63/sVftq/tTfEb9qb4deCfG3xF1TVtD1bVGgvbKdYBHPGIJW2ttiVsblB4I6V/UbX8Z//BPT/k9D4U/9hpv/AEmmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+M/wD4eF/tof8ARVta/wC+bb/4zR/w8L/bQ/6KtrX/AHzbf/Ga+M6KAPsz/h4X+2h/0VbWv++bb/4zR/w8L/bQ/wCira1/3zbf/Ga+M6KAPsz/AIeF/tof9FW1r/vm2/8AjNH/AA8L/bQ/6KtrX/fNt/8AGa+M6KAPsz/h4X+2h/0VbWv++bb/AOM0f8PC/wBtD/oq2tf9823/AMZr4zooA+zP+Hhf7aH/AEVbWv8Avm2/+M0f8PC/20P+ira1/wB823/xmvjOigD7M/4eF/tof9FW1r/vm2/+M0f8PC/20P8Aoq2tf9823/xmvjOigD7M/wCHhf7aH/RVta/75tv/AIzR/wAPC/20P+ira1/3zbf/ABmvjOigD7M/4eF/tof9FW1r/vm2/wDjNH/Dwv8AbQ/6KtrX/fNt/wDGa+M6KAPsz/h4X+2h/wBFW1r/AL5tv/jNH/Dwv9tD/oq2tf8AfNt/8Zr4zooA+zP+Hhf7aH/RVta/75tv/jNH/Dwv9tD/AKKtrX/fNt/8Zr4zooA+zP8Ah4X+2h/0VbWv++bb/wCM0f8ADwv9tD/oq2tf9823/wAZr4zooA+zP+Hhf7aH/RVta/75tv8A4zR/w8L/AG0P+ira1/3zbf8AxmvjOigD7M/4eF/tof8ARVta/wC+bb/4zR/w8L/bQ/6KtrX/AHzbf/Ga+M6KAP6tv+CUnxr+Kfxx+CnizxH8WPEV14k1Kx8UyWVvcXYQPHbiytZBGPLRBje7HkZya/Uavxn/AOCJv/JvXjf/ALHOX/032dfsxQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/0f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKAPsz/gnp/yeh8Kf+w03/pNNX9mFfxn/APBPT/k9D4U/9hpv/Saav7MKACiiigAooooAKKKKACiiigAooooAKKKKAP4A6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/S/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKAPsz/gnp/yeh8Kf+w03/pNNX9mFfwq/BT4r638Dvin4d+LHhy0tb7UvDd0bu3t70ObeRzG0eJBGyPjDnowOa/Ub/h9l+0L/ANCR4M/79ah/8m0Af0yUV/M3/wAPsv2hf+hI8Gf9+tQ/+TaP+H2X7Qv/AEJHgz/v1qH/AMm0Af0yUV/M3/w+y/aF/wChI8Gf9+tQ/wDk2j/h9l+0L/0JHgz/AL9ah/8AJtAH9MlFfzN/8Psv2hf+hI8Gf9+tQ/8Ak2j/AIfZftC/9CR4M/79ah/8m0Af0yUV/M3/AMPsv2hf+hI8Gf8AfrUP/k2j/h9l+0L/ANCR4M/79ah/8m0Af0yUV/M3/wAPsv2hf+hI8Gf9+tQ/+TaP+H2X7Qv/AEJHgz/v1qH/AMm0Af0yUV/M3/w+y/aF/wChI8Gf9+tQ/wDk2j/h9l+0L/0JHgz/AL9ah/8AJtAH4z0V/TJ/w5N/Z6/6Hfxn/wB/dP8A/kKj/hyb+z1/0O/jP/v7p/8A8hUAfzN0V/TJ/wAOTf2ev+h38Z/9/dP/APkKj/hyb+z1/wBDv4z/AO/un/8AyFQB/M3RX9Mn/Dk39nr/AKHfxn/390//AOQqP+HJv7PX/Q7+M/8Av7p//wAhUAfzN0V/TJ/w5N/Z6/6Hfxn/AN/dP/8AkKj/AIcm/s9f9Dv4z/7+6f8A/IVAH8zdFf0yf8OTf2ev+h38Z/8Af3T/AP5Co/4cm/s9f9Dv4z/7+6f/APIVAH8zdFf0yf8ADk39nr/od/Gf/f3T/wD5Co/4cm/s9f8AQ7+M/wDv7p//AMhUAfzN0V/TJ/w5N/Z6/wCh38Z/9/dP/wDkKvwV/ag+FGifA74++M/hP4cu7q+03w3fi0t7i9KG4kQxRyZkMaomcueigYoA8FooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/AOxzl/8ATfZ1+zFfjP8A8ETf+TevG/8A2Ocv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/v8ooooAKKKKACiiigAooooAKKKKACiiigAr+M//goX/wAnofFb/sNL/wCk0Nf2YV/Gf/wUL/5PQ+K3/YaX/wBJoaAPjOiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/W/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP7/KKKKACiiigAooooAKKKKACiiigAooooAK/jP/4KF/8AJ6HxW/7DS/8ApNDX9mFfxn/8FC/+T0Pit/2Gl/8ASaGgD4zooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+/yiiigAooooAKKKKACiiigAooooAKKKKACv4z/+Chf/ACeh8Vv+w0v/AKTQ1/ZhX8Z//BQv/k9D4rf9hpf/AEmhoA+M6KKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/v8ooooAKKKKACiiigAooooAKKKKACiiigAr+M//goX/wAnofFb/sNL/wCk0Nf2YV/Gf/wUL/5PQ+K3/YaX/wBJoaAPjOiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/R/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP7/KKKKACiiigAooooAKKKKACiiigAooooAK/jP/4KF/8AJ6HxW/7DS/8ApNDX9mFfxn/8FC/+T0Pit/2Gl/8ASaGgD4zooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/0v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+/yiiigAooooAKKKKACiiigAooooAKKKKACv4z/+Chf/ACeh8Vv+w0v/AKTQ1/ZhX8Z//BQv/k9D4rf9hpf/AEmhoA+M6KKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD1L4KfCjW/jj8U/Dvwn8OXdrY6l4kujaW9xelxbxuI2kzIY1d8YQ9FJzX6jf8OTf2hf8Aod/Bn/f3UP8A5Cr4z/4J6f8AJ6Hwp/7DTf8ApNNX9mFAH8zf/Dk39oX/AKHfwZ/391D/AOQqP+HJv7Qv/Q7+DP8Av7qH/wAhV/TJRQB/M3/w5N/aF/6HfwZ/391D/wCQqP8Ahyb+0L/0O/gz/v7qH/yFX9MlFAH8zf8Aw5N/aF/6HfwZ/wB/dQ/+QqP+HJv7Qv8A0O/gz/v7qH/yFX9MlFAH8zf/AA5N/aF/6HfwZ/391D/5Co/4cm/tC/8AQ7+DP+/uof8AyFX9MlFAH8zf/Dk39oX/AKHfwZ/391D/AOQqP+HJv7Qv/Q7+DP8Av7qH/wAhV/TJRQB/M3/w5N/aF/6HfwZ/391D/wCQqP8Ahyb+0L/0O/gz/v7qH/yFX9MlFAH4z/8AD7L9nr/oSPGf/frT/wD5No/4fZfs9f8AQkeM/wDv1p//AMm1/M3RQB/TJ/w+y/Z6/wChI8Z/9+tP/wDk2j/h9l+z1/0JHjP/AL9af/8AJtfzN0UAf0yf8Psv2ev+hI8Z/wDfrT//AJNo/wCH2X7PX/QkeM/+/Wn/APybX8zdFAH9Mn/D7L9nr/oSPGf/AH60/wD+TaP+H2X7PX/QkeM/+/Wn/wDybX8zdFAH9Mn/AA+y/Z6/6Ejxn/360/8A+TaP+H2X7PX/AEJHjP8A79af/wDJtfzN0UAf0yf8Psv2ev8AoSPGf/frT/8A5No/4fZfs9f9CR4z/wC/Wn//ACbX8zdFAH9Mn/D7L9nr/oSPGf8A360//wCTa/BX9qD4r6J8cfj74z+LHhy0urHTfEl+Lu3t70ILiNBFHHiQRs6Zyh6MRivBaKACiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/ACb143/7HOX/ANN9nX7MV+M//BE3/k3rxv8A9jnL/wCm+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//U/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKAPsz/gnp/yeh8Kf+w03/pNNX9mFfxn/APBPT/k9D4U/9hpv/Saav7MKACiiigAooooAKKKKACiiigAooooAKKKKAP4A6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/0f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+XP/BVv4KfFP44/BTwn4c+E/h268SalY+KY724t7QoHjtxZXUZkPmOgxvdRwc5NAH8pNFfZn/DvT9tD/olOtf99W3/AMeo/wCHen7aH/RKda/76tv/AI9QB8Z0V9mf8O9P20P+iU61/wB9W3/x6j/h3p+2h/0SnWv++rb/AOPUAfGdFfZn/DvT9tD/AKJTrX/fVt/8eo/4d6ftof8ARKda/wC+rb/49QB8Z0V9mf8ADvT9tD/olOtf99W3/wAeo/4d6ftof9Ep1r/vq2/+PUAfGdFfZn/DvT9tD/olOtf99W3/AMeo/wCHen7aH/RKda/76tv/AI9QB8Z0V9mf8O9P20P+iU61/wB9W3/x6j/h3p+2h/0SnWv++rb/AOPUAH/BPT/k9D4U/wDYab/0mmr+zCv5cv2Kv2Kv2pvhz+1N8OvG3jb4dappOh6TqjT3t7O0BjgjMEq7m2ys2NzAcA9a/qNoAKKKKACiiigAooooAKKKKACiiigAooooA/gDor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD4zor7M/4d6ftof9Ep1r/vq2/wDj1H/DvT9tD/olOtf99W3/AMeoA+M6K+zP+Hen7aH/AESnWv8Avq2/+PUf8O9P20P+iU61/wB9W3/x6gD4zor7M/4d6ftof9Ep1r/vq2/+PUf8O9P20P8AolOtf99W3/x6gD4zor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD4zor7M/4d6ftof9Ep1r/vq2/wDj1H/DvT9tD/olOtf99W3/AMeoA+M6K+zP+Hen7aH/AESnWv8Avq2/+PUf8O9P20P+iU61/wB9W3/x6gD4zor7M/4d6ftof9Ep1r/vq2/+PUf8O9P20P8AolOtf99W3/x6gD4zor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD4zor7M/4d6ftof9Ep1r/vq2/wDj1H/DvT9tD/olOtf99W3/AMeoA+M6K+zP+Hen7aH/AESnWv8Avq2/+PUf8O9P20P+iU61/wB9W3/x6gD4zor7M/4d6ftof9Ep1r/vq2/+PUf8O9P20P8AolOtf99W3/x6gD4zor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD9mP+CJv/JvXjf8A7HOX/wBN9nX7MV+XP/BKT4KfFP4HfBTxZ4c+LHh268N6lfeKZL23t7soXktzZWsYkHlu4xvRhyc5FfqNQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9L9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9b9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9H9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9T9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9f9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/2Q=="/>
</defs>
</svg>
`;
const getHTML = (apiReference, theme) => `<!doctype html>
<html>
  <head>
    <title>Scalar API Reference</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <script
      id="api-reference"
      type="application/json">
    ${JSON.stringify(apiReference)}
    <\/script>
	 <script>
      var configuration = {
	  	favicon: "data:image/svg+xml;utf8,${encodeURIComponent(logo)}",
	   	theme: "${"default"}",
        metaData: {
			title: "Better Auth API",
			description: "API Reference for your Better Auth Instance",
		}
      }

      document.getElementById('api-reference').dataset.configuration =
        JSON.stringify(configuration)
    <\/script>
	  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"><\/script>
  </body>
</html>`;
const openAPI = (options) => {
  const path = "/reference";
  return {
    id: "open-api",
    endpoints: {
      generateOpenAPISchema: createAuthEndpoint(
        "/open-api/generate-schema",
        {
          method: "GET"
        },
        async (ctx) => {
          const schema2 = await generator(ctx.context, ctx.context.options);
          return ctx.json(schema2);
        }
      ),
      openAPIReference: createAuthEndpoint(
        path,
        {
          method: "GET",
          metadata: {
            isAction: false
          }
        },
        async (ctx) => {
          const schema2 = await generator(ctx.context, ctx.context.options);
          return new Response(getHTML(schema2), {
            headers: {
              "Content-Type": "text/html"
            }
          });
        }
      )
    }
  };
};
const SESSION_DURATION_IN_DAYS = 60;
let auth;
const createAuth = (env2) => {
  auth = betterAuth({
    database: drizzleAdapter(drizzle(env2.DB, { schema }), {
      provider: "sqlite"
      // generateId: () => crypto.randomUUID(),
    }),
    secret: env2.BETTER_AUTH_SECRET,
    baseURL: PUBLIC_DOMAIN,
    session: {
      expiresIn: SESSION_DURATION_IN_DAYS * 24 * 60 * 60,
      // Convert to seconds
      updateAge: 24 * 60 * 60
      // Update session every 24 hours
    },
    socialProviders: {
      google: {
        clientId: env2.AUTH_GOOGLE_ID,
        clientSecret: env2.AUTH_GOOGLE_SECRET
      },
      discord: {
        clientId: env2.AUTH_DISCORD_ID,
        clientSecret: env2.AUTH_DISCORD_SECRET
      },
      github: {
        clientId: env2.AUTH_GITHUB_ID,
        clientSecret: env2.AUTH_GITHUB_SECRET
      },
      microsoft: {
        clientId: env2.AUTH_MICROSOFT_ENTRA_ID_ID,
        clientSecret: env2.AUTH_MICROSOFT_ENTRA_ID_SECRET
      },
      facebook: {
        clientId: env2.AUTH_FACEBOOK_ID,
        clientSecret: env2.AUTH_FACEBOOK_SECRET
      }
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false
    },
    emailVerification: {
      sendOnSignUp: false,
      autoSignInAfterVerification: true
    },
    plugins: [
      openAPI(),
      oneTap()
    ],
    advanced: {
      crossSubDomainCookies: {
        enabled: true
      }
    }
  });
  return auth;
};
const initDatabase = async ({ event, resolve }) => {
  event.locals.db = drizzle(event.platform?.env.DB, { schema });
  return resolve(event);
};
async function initializeUser(locals, request) {
  const session = await auth.api.getSession({
    headers: request?.headers
  });
  if (!session?.user?.email) {
    return null;
  }
  const authUser = await locals.db.query.user.findFirst({
    where: eq(user.email, session.user.email)
  });
  if (!authUser) {
    throw error$1(401, "Unauthorized");
  }
  return authUser;
}
export {
  initDatabase as a,
  createAuth as c,
  initializeUser as i
};
