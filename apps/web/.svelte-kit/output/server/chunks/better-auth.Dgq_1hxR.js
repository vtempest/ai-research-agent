import * as z from "zod";
import { createMiddleware, createEndpoint, APIError, toResponse } from "better-call";
import { base64Url, base64 } from "@better-auth/utils/base64";
import { createHMAC } from "@better-auth/utils/hmac";
import { binary } from "@better-auth/utils/binary";
import { createHash } from "@better-auth/utils/hash";
import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";
import { utf8ToBytes, managedNonce, bytesToHex, hexToBytes } from "@noble/ciphers/utils.js";
import { SignJWT, jwtVerify, decodeJwt, createRemoteJWKSet, decodeProtectedHeader, importJWK } from "jose";
import { scryptAsync } from "@noble/hashes/scrypt.js";
import { hex } from "@better-auth/utils/hex";
import { hexToBytes as hexToBytes$1 } from "@noble/hashes/utils.js";
import { createRandomStringGenerator } from "@better-auth/utils/random";
import { betterFetch } from "@better-fetch/fetch";
import { JWTExpired } from "jose/errors";
import { createDefu } from "defu";
const getDate = (span, unit = "ms") => {
  return new Date(Date.now() + (unit === "sec" ? span * 1e3 : span));
};
class BetterAuthError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "BetterAuthError";
    this.message = message;
    this.cause = cause;
    this.stack = "";
  }
}
const _envShim = /* @__PURE__ */ Object.create(null);
const _getEnv = (useShim) => globalThis.process?.env || //@ts-expect-error
globalThis.Deno?.env.toObject() || //@ts-expect-error
globalThis.__env__ || (useShim ? _envShim : globalThis);
const env = new Proxy(_envShim, {
  get(_, prop) {
    const env2 = _getEnv();
    return env2[prop] ?? _envShim[prop];
  },
  has(_, prop) {
    const env2 = _getEnv();
    return prop in env2 || prop in _envShim;
  },
  set(_, prop, value) {
    const env2 = _getEnv(true);
    env2[prop] = value;
    return true;
  },
  deleteProperty(_, prop) {
    if (!prop) {
      return false;
    }
    const env2 = _getEnv(true);
    delete env2[prop];
    return true;
  },
  ownKeys() {
    const env2 = _getEnv(true);
    return Object.keys(env2);
  }
});
function toBoolean(val) {
  return val ? val !== "false" : false;
}
const nodeENV = typeof process !== "undefined" && process.env && process.env.NODE_ENV || "";
const isProduction = nodeENV === "production";
const isDevelopment = nodeENV === "dev" || nodeENV === "development";
const isTest = () => nodeENV === "test" || toBoolean(env.TEST);
function getEnvVar(key, fallback) {
  if (typeof process !== "undefined" && process.env) {
    return process.env[key] ?? fallback;
  }
  if (typeof Deno !== "undefined") {
    return Deno.env.get(key) ?? fallback;
  }
  if (typeof Bun !== "undefined") {
    return Bun.env[key] ?? fallback;
  }
  return fallback;
}
function getBooleanEnvVar(key, fallback = true) {
  const value = getEnvVar(key);
  if (!value) return fallback;
  return value !== "0" && value.toLowerCase() !== "false" && value !== "";
}
const ENV = {
  get BETTER_AUTH_TELEMETRY_ENDPOINT() {
    return getEnvVar(
      "BETTER_AUTH_TELEMETRY_ENDPOINT",
      "https://telemetry.better-auth.com/v1/track"
    );
  }
};
const COLORS_2 = 1;
const COLORS_16 = 4;
const COLORS_256 = 8;
const COLORS_16m = 24;
const TERM_ENVS = {
  eterm: COLORS_16,
  cons25: COLORS_16,
  console: COLORS_16,
  cygwin: COLORS_16,
  dtterm: COLORS_16,
  gnome: COLORS_16,
  hurd: COLORS_16,
  jfbterm: COLORS_16,
  konsole: COLORS_16,
  kterm: COLORS_16,
  mlterm: COLORS_16,
  mosh: COLORS_16m,
  putty: COLORS_16,
  st: COLORS_16,
  // http://lists.schmorp.de/pipermail/rxvt-unicode/2016q2/002261.html
  "rxvt-unicode-24bit": COLORS_16m,
  // https://bugs.launchpad.net/terminator/+bug/1030562
  terminator: COLORS_16m,
  "xterm-kitty": COLORS_16m
};
const CI_ENVS_MAP = new Map(
  Object.entries({
    APPVEYOR: COLORS_256,
    BUILDKITE: COLORS_256,
    CIRCLECI: COLORS_16m,
    DRONE: COLORS_256,
    GITEA_ACTIONS: COLORS_16m,
    GITHUB_ACTIONS: COLORS_16m,
    GITLAB_CI: COLORS_256,
    TRAVIS: COLORS_256
  })
);
const TERM_ENVS_REG_EXP = [
  /ansi/,
  /color/,
  /linux/,
  /direct/,
  /^con[0-9]*x[0-9]/,
  /^rxvt/,
  /^screen/,
  /^xterm/,
  /^vt100/,
  /^vt220/
];
function getColorDepth() {
  if (getEnvVar("FORCE_COLOR") !== void 0) {
    switch (getEnvVar("FORCE_COLOR")) {
      case "":
      case "1":
      case "true":
        return COLORS_16;
      case "2":
        return COLORS_256;
      case "3":
        return COLORS_16m;
      default:
        return COLORS_2;
    }
  }
  if (getEnvVar("NODE_DISABLE_COLORS") !== void 0 && getEnvVar("NODE_DISABLE_COLORS") !== "" || // See https://no-color.org/
  getEnvVar("NO_COLOR") !== void 0 && getEnvVar("NO_COLOR") !== "" || // The "dumb" special terminal, as defined by terminfo, doesn't support
  // ANSI color control codes.
  // See https://invisible-island.net/ncurses/terminfo.ti.html#toc-_Specials
  getEnvVar("TERM") === "dumb") {
    return COLORS_2;
  }
  if (typeof process !== "undefined" && process.platform === "win32") {
    return COLORS_16m;
  }
  if (getEnvVar("TMUX")) {
    return COLORS_16m;
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return COLORS_16;
  }
  if ("CI" in env) {
    for (const { 0: envName, 1: colors2 } of CI_ENVS_MAP) {
      if (envName in env) {
        return colors2;
      }
    }
    if (getEnvVar("CI_NAME") === "codeship") {
      return COLORS_256;
    }
    return COLORS_2;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.exec(
      getEnvVar("TEAMCITY_VERSION")
    ) !== null ? COLORS_16 : COLORS_2;
  }
  switch (getEnvVar("TERM_PROGRAM")) {
    case "iTerm.app":
      if (!getEnvVar("TERM_PROGRAM_VERSION") || /^[0-2]\./.exec(getEnvVar("TERM_PROGRAM_VERSION")) !== null) {
        return COLORS_256;
      }
      return COLORS_16m;
    case "HyperTerm":
    case "MacTerm":
      return COLORS_16m;
    case "Apple_Terminal":
      return COLORS_256;
  }
  if (getEnvVar("COLORTERM") === "truecolor" || getEnvVar("COLORTERM") === "24bit") {
    return COLORS_16m;
  }
  if (getEnvVar("TERM")) {
    if (/truecolor/.exec(getEnvVar("TERM")) !== null) {
      return COLORS_16m;
    }
    if (/^xterm-256/.exec(getEnvVar("TERM")) !== null) {
      return COLORS_256;
    }
    const termEnv = getEnvVar("TERM").toLowerCase();
    if (TERM_ENVS[termEnv]) {
      return TERM_ENVS[termEnv];
    }
    if (TERM_ENVS_REG_EXP.some((term) => term.exec(termEnv) !== null)) {
      return COLORS_16;
    }
  }
  if (getEnvVar("COLORTERM")) {
    return COLORS_16;
  }
  return COLORS_2;
}
const levels = ["info", "success", "warn", "error", "debug"];
function shouldPublishLog(currentLogLevel, logLevel) {
  return levels.indexOf(logLevel) <= levels.indexOf(currentLogLevel);
}
const colors = {
  reset: "\x1B[0m",
  bright: "\x1B[1m",
  dim: "\x1B[2m",
  fg: {
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    magenta: "\x1B[35m"
  }
};
const levelColors = {
  info: colors.fg.blue,
  success: colors.fg.green,
  warn: colors.fg.yellow,
  error: colors.fg.red,
  debug: colors.fg.magenta
};
const formatMessage = (level, message, colorsEnabled) => {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  if (colorsEnabled) {
    return `${colors.dim}${timestamp}${colors.reset} ${levelColors[level]}${level.toUpperCase()}${colors.reset} ${colors.bright}[Better Auth]:${colors.reset} ${message}`;
  }
  return `${timestamp} ${level.toUpperCase()} [Better Auth]: ${message}`;
};
const createLogger = (options) => {
  const enabled = options?.disabled !== true;
  const logLevel = options?.level ?? "error";
  const isDisableColorsSpecified = options?.disableColors !== void 0;
  const colorsEnabled = isDisableColorsSpecified ? !options.disableColors : getColorDepth() !== 1;
  const LogFunc = (level, message, args = []) => {
    if (!enabled || !shouldPublishLog(logLevel, level)) {
      return;
    }
    const formattedMessage = formatMessage(level, message, colorsEnabled);
    if (!options || typeof options.log !== "function") {
      if (level === "error") {
        console.error(formattedMessage, ...args);
      } else if (level === "warn") {
        console.warn(formattedMessage, ...args);
      } else {
        console.log(formattedMessage, ...args);
      }
      return;
    }
    options.log(level === "success" ? "info" : level, message, ...args);
  };
  const logger2 = Object.fromEntries(
    levels.map((level) => [
      level,
      (...[message, ...args]) => LogFunc(level, message, args)
    ])
  );
  return {
    ...logger2,
    get level() {
      return logLevel;
    }
  };
};
const logger = createLogger();
function safeJSONParse(data) {
  function reviver(_, value) {
    if (typeof value === "string") {
      const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
      if (iso8601Regex.test(value)) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
    }
    return value;
  }
  try {
    if (typeof data !== "string") {
      return data;
    }
    return JSON.parse(data, reviver);
  } catch (e) {
    logger.error("Error parsing JSON", { error: e });
    return null;
  }
}
function checkHasPath(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname !== "/";
  } catch (error2) {
    throw new BetterAuthError(
      `Invalid base URL: ${url}. Please provide a valid base URL.`
    );
  }
}
function withPath(url, path = "/api/auth") {
  const hasPath = checkHasPath(url);
  if (hasPath) {
    return url;
  }
  path = path.startsWith("/") ? path : `/${path}`;
  return `${url.replace(/\/+$/, "")}${path}`;
}
function getBaseURL(url, path, request) {
  if (url) {
    return withPath(url, path);
  }
  const fromEnv = env.BETTER_AUTH_URL || env.NEXT_PUBLIC_BETTER_AUTH_URL || env.PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_AUTH_URL || (env.BASE_URL !== "/" ? env.BASE_URL : void 0);
  if (fromEnv) {
    return withPath(fromEnv, path);
  }
  const fromRequest = request?.headers.get("x-forwarded-host");
  const fromRequestProto = request?.headers.get("x-forwarded-proto");
  if (fromRequest && fromRequestProto) {
    return withPath(`${fromRequestProto}://${fromRequest}`, path);
  }
  if (request) {
    const url2 = getOrigin(request.url);
    if (!url2) {
      throw new BetterAuthError(
        "Could not get origin from request. Please provide a valid base URL."
      );
    }
    return withPath(url2, path);
  }
  if (typeof window !== "undefined" && window.location) {
    return withPath(window.location.origin, path);
  }
  return void 0;
}
function getOrigin(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.origin;
  } catch (error2) {
    return null;
  }
}
function getProtocol(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol;
  } catch (error2) {
    return null;
  }
}
function getHost(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.host;
  } catch (error2) {
    return url;
  }
}
const s = 1e3;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;
const mo = y / 12;
function ms(value, options) {
  if (typeof value === "string") return parse(value);
  else if (typeof value === "number") return format(value);
  throw new Error(`Value provided to ms() must be a string or number. value=${JSON.stringify(value)}`);
}
function parse(str) {
  if (typeof str !== "string" || str.length === 0 || str.length > 100) throw new Error(`Value provided to ms.parse() must be a string with length between 1 and 99. value=${JSON.stringify(str)}`);
  const match = /^(?<value>-?\d*\.?\d+) *(?<unit>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)?$/i.exec(str);
  if (!match?.groups) return NaN;
  const { value, unit = "ms" } = match.groups;
  const n = parseFloat(value);
  const matchUnit = unit.toLowerCase();
  switch (matchUnit) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      return n * y;
    case "months":
    case "month":
    case "mo":
      return n * mo;
    case "weeks":
    case "week":
    case "w":
      return n * w;
    case "days":
    case "day":
    case "d":
      return n * d;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return n * h;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return n * m;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return n * s;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return n;
    default:
      throw new Error(`Unknown unit "${matchUnit}" provided to ms.parse(). value=${JSON.stringify(str)}`);
  }
}
function fmtShort(ms$1) {
  const msAbs = Math.abs(ms$1);
  if (msAbs >= y) return `${Math.round(ms$1 / y)}y`;
  if (msAbs >= mo) return `${Math.round(ms$1 / mo)}mo`;
  if (msAbs >= w) return `${Math.round(ms$1 / w)}w`;
  if (msAbs >= d) return `${Math.round(ms$1 / d)}d`;
  if (msAbs >= h) return `${Math.round(ms$1 / h)}h`;
  if (msAbs >= m) return `${Math.round(ms$1 / m)}m`;
  if (msAbs >= s) return `${Math.round(ms$1 / s)}s`;
  return `${ms$1}ms`;
}
function format(ms$1, options) {
  if (typeof ms$1 !== "number" || !Number.isFinite(ms$1)) throw new Error("Value provided to ms.format() must be of type number.");
  return fmtShort(ms$1);
}
function createCookieGetter(options) {
  const secure = options.advanced?.useSecureCookies !== void 0 ? options.advanced?.useSecureCookies : options.baseURL !== void 0 ? options.baseURL.startsWith("https://") ? true : false : isProduction;
  const secureCookiePrefix = secure ? "__Secure-" : "";
  const crossSubdomainEnabled = !!options.advanced?.crossSubDomainCookies?.enabled;
  const domain = crossSubdomainEnabled ? options.advanced?.crossSubDomainCookies?.domain || (options.baseURL ? new URL(options.baseURL).hostname : void 0) : void 0;
  if (crossSubdomainEnabled && !domain) {
    throw new BetterAuthError(
      "baseURL is required when crossSubdomainCookies are enabled"
    );
  }
  function createCookie(cookieName, overrideAttributes = {}) {
    const prefix = options.advanced?.cookiePrefix || "better-auth";
    const name = options.advanced?.cookies?.[cookieName]?.name || `${prefix}.${cookieName}`;
    const attributes = options.advanced?.cookies?.[cookieName]?.attributes;
    return {
      name: `${secureCookiePrefix}${name}`,
      attributes: {
        secure: !!secureCookiePrefix,
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        ...crossSubdomainEnabled ? { domain } : {},
        ...options.advanced?.defaultCookieAttributes,
        ...overrideAttributes,
        ...attributes
      }
    };
  }
  return createCookie;
}
function getCookies(options) {
  const createCookie = createCookieGetter(options);
  const sessionMaxAge = options.session?.expiresIn || ms("7d") / 1e3;
  const sessionToken = createCookie("session_token", {
    maxAge: sessionMaxAge
  });
  const sessionData = createCookie("session_data", {
    maxAge: options.session?.cookieCache?.maxAge || 60 * 5
  });
  const dontRememberToken = createCookie("dont_remember");
  return {
    sessionToken: {
      name: sessionToken.name,
      options: sessionToken.attributes
    },
    /**
     * This cookie is used to store the session data in the cookie
     * This is useful for when you want to cache the session in the cookie
     */
    sessionData: {
      name: sessionData.name,
      options: sessionData.attributes
    },
    dontRememberToken: {
      name: dontRememberToken.name,
      options: dontRememberToken.attributes
    }
  };
}
async function setCookieCache(ctx, session, dontRememberMe) {
  const shouldStoreSessionDataInCookie = ctx.context.options.session?.cookieCache?.enabled;
  if (shouldStoreSessionDataInCookie) {
    const filteredSession = Object.entries(session.session).reduce(
      (acc, [key, value]) => {
        const fieldConfig = ctx.context.options.session?.additionalFields?.[key];
        if (!fieldConfig || fieldConfig.returned !== false) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    const sessionData = { session: filteredSession, user: session.user };
    const options = {
      ...ctx.context.authCookies.sessionData.options,
      maxAge: dontRememberMe ? void 0 : ctx.context.authCookies.sessionData.options.maxAge
    };
    const expiresAtDate = getDate(options.maxAge || 60, "sec").getTime();
    const data = base64Url.encode(
      JSON.stringify({
        session: sessionData,
        expiresAt: expiresAtDate,
        signature: await createHMAC("SHA-256", "base64urlnopad").sign(
          ctx.context.secret,
          JSON.stringify({
            ...sessionData,
            expiresAt: expiresAtDate
          })
        )
      }),
      {
        padding: false
      }
    );
    if (data.length > 4093) {
      throw new BetterAuthError(
        "Session data is too large to store in the cookie. Please disable session cookie caching or reduce the size of the session data"
      );
    }
    ctx.setCookie(ctx.context.authCookies.sessionData.name, data, options);
  }
}
async function setSessionCookie(ctx, session, dontRememberMe, overrides) {
  const dontRememberMeCookie = await ctx.getSignedCookie(
    ctx.context.authCookies.dontRememberToken.name,
    ctx.context.secret
  );
  dontRememberMe = dontRememberMe !== void 0 ? dontRememberMe : !!dontRememberMeCookie;
  const options = ctx.context.authCookies.sessionToken.options;
  const maxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
  await ctx.setSignedCookie(
    ctx.context.authCookies.sessionToken.name,
    session.session.token,
    ctx.context.secret,
    {
      ...options,
      maxAge,
      ...overrides
    }
  );
  if (dontRememberMe) {
    await ctx.setSignedCookie(
      ctx.context.authCookies.dontRememberToken.name,
      "true",
      ctx.context.secret,
      ctx.context.authCookies.dontRememberToken.options
    );
  }
  await setCookieCache(ctx, session, dontRememberMe);
  ctx.context.setNewSession(session);
  if (ctx.context.options.secondaryStorage) {
    await ctx.context.secondaryStorage?.set(
      session.session.token,
      JSON.stringify({
        user: session.user,
        session: session.session
      }),
      Math.floor(
        (new Date(session.session.expiresAt).getTime() - Date.now()) / 1e3
      )
    );
  }
}
function deleteSessionCookie(ctx, skipDontRememberMe) {
  ctx.setCookie(ctx.context.authCookies.sessionToken.name, "", {
    ...ctx.context.authCookies.sessionToken.options,
    maxAge: 0
  });
  ctx.setCookie(ctx.context.authCookies.sessionData.name, "", {
    ...ctx.context.authCookies.sessionData.options,
    maxAge: 0
  });
  {
    ctx.setCookie(ctx.context.authCookies.dontRememberToken.name, "", {
      ...ctx.context.authCookies.dontRememberToken.options,
      maxAge: 0
    });
  }
}
const optionsMiddleware = createMiddleware(async () => {
  return {};
});
const createAuthMiddleware = createMiddleware.create({
  use: [
    optionsMiddleware,
    /**
     * Only use for post hooks
     */
    createMiddleware(async () => {
      return {};
    })
  ]
});
const createAuthEndpoint = createEndpoint.create({
  use: [optionsMiddleware]
});
const BASE_ERROR_CODES = {
  USER_NOT_FOUND: "User not found",
  FAILED_TO_CREATE_USER: "Failed to create user",
  FAILED_TO_CREATE_SESSION: "Failed to create session",
  FAILED_TO_UPDATE_USER: "Failed to update user",
  FAILED_TO_GET_SESSION: "Failed to get session",
  INVALID_PASSWORD: "Invalid password",
  INVALID_EMAIL: "Invalid email",
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
  SOCIAL_ACCOUNT_ALREADY_LINKED: "Social account already linked",
  PROVIDER_NOT_FOUND: "Provider not found",
  INVALID_TOKEN: "Invalid token",
  ID_TOKEN_NOT_SUPPORTED: "id_token not supported",
  FAILED_TO_GET_USER_INFO: "Failed to get user info",
  USER_EMAIL_NOT_FOUND: "User email not found",
  EMAIL_NOT_VERIFIED: "Email not verified",
  PASSWORD_TOO_SHORT: "Password too short",
  PASSWORD_TOO_LONG: "Password too long",
  USER_ALREADY_EXISTS: "User already exists. Use another email.",
  EMAIL_CAN_NOT_BE_UPDATED: "Email can not be updated",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "Credential account not found",
  SESSION_EXPIRED: "Session expired. Re-authenticate to perform this action.",
  FAILED_TO_UNLINK_LAST_ACCOUNT: "You can't unlink your last account",
  ACCOUNT_NOT_FOUND: "Account not found",
  USER_ALREADY_HAS_PASSWORD: "User already has a password. Provide that to delete the account."
};
const getSessionQuerySchema = z.optional(
  z.object({
    /**
     * If cookie cache is enabled, it will disable the cache
     * and fetch the session from the database
     */
    disableCookieCache: z.coerce.boolean().meta({
      description: "Disable cookie cache and fetch session from database"
    }).optional(),
    disableRefresh: z.coerce.boolean().meta({
      description: "Disable session refresh. Useful for checking session status, without updating the session"
    }).optional()
  })
);
const getSession = () => createAuthEndpoint(
  "/get-session",
  {
    method: "GET",
    query: getSessionQuerySchema,
    requireHeaders: true,
    metadata: {
      openapi: {
        description: "Get the current session",
        responses: {
          "200": {
            description: "Success",
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
                  },
                  required: ["session", "user"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    try {
      const sessionCookieToken = await ctx.getSignedCookie(
        ctx.context.authCookies.sessionToken.name,
        ctx.context.secret
      );
      if (!sessionCookieToken) {
        return null;
      }
      const sessionDataCookie = ctx.getCookie(
        ctx.context.authCookies.sessionData.name
      );
      const sessionDataPayload = sessionDataCookie ? safeJSONParse(binary.decode(base64Url.decode(sessionDataCookie))) : null;
      if (sessionDataPayload) {
        const isValid = await createHMAC("SHA-256", "base64urlnopad").verify(
          ctx.context.secret,
          JSON.stringify({
            ...sessionDataPayload.session,
            expiresAt: sessionDataPayload.expiresAt
          }),
          sessionDataPayload.signature
        );
        if (!isValid) {
          const dataCookie = ctx.context.authCookies.sessionData.name;
          ctx.setCookie(dataCookie, "", {
            maxAge: 0
          });
          return ctx.json(null);
        }
      }
      const dontRememberMe = await ctx.getSignedCookie(
        ctx.context.authCookies.dontRememberToken.name,
        ctx.context.secret
      );
      if (sessionDataPayload?.session && ctx.context.options.session?.cookieCache?.enabled && !ctx.query?.disableCookieCache) {
        const session2 = sessionDataPayload.session;
        const hasExpired = sessionDataPayload.expiresAt < Date.now() || session2.session.expiresAt < /* @__PURE__ */ new Date();
        if (!hasExpired) {
          ctx.context.session = session2;
          return ctx.json(
            session2
          );
        } else {
          const dataCookie = ctx.context.authCookies.sessionData.name;
          ctx.setCookie(dataCookie, "", {
            maxAge: 0
          });
        }
      }
      const session = await ctx.context.internalAdapter.findSession(sessionCookieToken);
      ctx.context.session = session;
      if (!session || session.session.expiresAt < /* @__PURE__ */ new Date()) {
        deleteSessionCookie(ctx);
        if (session) {
          await ctx.context.internalAdapter.deleteSession(
            session.session.token
          );
        }
        return ctx.json(null);
      }
      if (dontRememberMe || ctx.query?.disableRefresh) {
        return ctx.json(
          session
        );
      }
      const expiresIn = ctx.context.sessionConfig.expiresIn;
      const updateAge = ctx.context.sessionConfig.updateAge;
      const sessionIsDueToBeUpdatedDate = session.session.expiresAt.valueOf() - expiresIn * 1e3 + updateAge * 1e3;
      const shouldBeUpdated = sessionIsDueToBeUpdatedDate <= Date.now();
      if (shouldBeUpdated && (!ctx.query?.disableRefresh || !ctx.context.options.session?.disableSessionRefresh)) {
        const updatedSession = await ctx.context.internalAdapter.updateSession(
          session.session.token,
          {
            expiresAt: getDate(ctx.context.sessionConfig.expiresIn, "sec"),
            updatedAt: /* @__PURE__ */ new Date()
          }
        );
        if (!updatedSession) {
          deleteSessionCookie(ctx);
          return ctx.json(null, { status: 401 });
        }
        const maxAge = (updatedSession.expiresAt.valueOf() - Date.now()) / 1e3;
        await setSessionCookie(
          ctx,
          {
            session: updatedSession,
            user: session.user
          },
          false,
          {
            maxAge
          }
        );
        return ctx.json({
          session: updatedSession,
          user: session.user
        });
      }
      await setCookieCache(ctx, session, !!dontRememberMe);
      return ctx.json(
        session
      );
    } catch (error2) {
      ctx.context.logger.error("INTERNAL_SERVER_ERROR", error2);
      throw new APIError("INTERNAL_SERVER_ERROR", {
        message: BASE_ERROR_CODES.FAILED_TO_GET_SESSION
      });
    }
  }
);
const getSessionFromCtx = async (ctx, config2) => {
  if (ctx.context.session) {
    return ctx.context.session;
  }
  const session = await getSession()({
    ...ctx,
    asResponse: false,
    headers: ctx.headers,
    returnHeaders: false,
    query: {
      ...config2,
      ...ctx.query
    }
  }).catch((e) => {
    return null;
  });
  ctx.context.session = session;
  return session;
};
const sessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session = await getSessionFromCtx(ctx);
  if (!session?.session) {
    throw new APIError("UNAUTHORIZED");
  }
  return {
    session
  };
});
const sensitiveSessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session = await getSessionFromCtx(ctx, { disableCookieCache: true });
  if (!session?.session) {
    throw new APIError("UNAUTHORIZED");
  }
  return {
    session
  };
});
createAuthMiddleware(
  async (ctx) => {
    const session = await getSessionFromCtx(ctx);
    if (!session?.session && (ctx.request || ctx.headers)) {
      throw new APIError("UNAUTHORIZED");
    }
    return { session };
  }
);
const freshSessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session = await getSessionFromCtx(ctx);
  if (!session?.session) {
    throw new APIError("UNAUTHORIZED");
  }
  if (ctx.context.sessionConfig.freshAge === 0) {
    return {
      session
    };
  }
  const freshAge = ctx.context.sessionConfig.freshAge;
  const lastUpdated = session.session.updatedAt?.valueOf() || session.session.createdAt.valueOf();
  const now = Date.now();
  const isFresh = now - lastUpdated < freshAge * 1e3;
  if (!isFresh) {
    throw new APIError("FORBIDDEN", {
      message: "Session is not fresh"
    });
  }
  return {
    session
  };
});
const listSessions = () => createAuthEndpoint(
  "/list-sessions",
  {
    method: "GET",
    use: [sessionMiddleware],
    requireHeaders: true,
    metadata: {
      openapi: {
        description: "List all active sessions for the user",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Session"
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
    try {
      const sessions = await ctx.context.internalAdapter.listSessions(
        ctx.context.session.user.id
      );
      const activeSessions = sessions.filter((session) => {
        return session.expiresAt > /* @__PURE__ */ new Date();
      });
      return ctx.json(
        activeSessions
      );
    } catch (e) {
      ctx.context.logger.error(e);
      throw ctx.error("INTERNAL_SERVER_ERROR");
    }
  }
);
const revokeSession = createAuthEndpoint(
  "/revoke-session",
  {
    method: "POST",
    body: z.object({
      token: z.string().meta({
        description: "The token to revoke"
      })
    }),
    use: [sensitiveSessionMiddleware],
    requireHeaders: true,
    metadata: {
      openapi: {
        description: "Revoke a single session",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string",
                    description: "The token to revoke"
                  }
                },
                required: ["token"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      description: "Indicates if the session was revoked successfully"
                    }
                  },
                  required: ["status"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const token = ctx.body.token;
    const findSession = await ctx.context.internalAdapter.findSession(token);
    if (!findSession) {
      throw new APIError("BAD_REQUEST", {
        message: "Session not found"
      });
    }
    if (findSession.session.userId !== ctx.context.session.user.id) {
      throw new APIError("UNAUTHORIZED");
    }
    try {
      await ctx.context.internalAdapter.deleteSession(token);
    } catch (error2) {
      ctx.context.logger.error(
        error2 && typeof error2 === "object" && "name" in error2 ? error2.name : "",
        error2
      );
      throw new APIError("INTERNAL_SERVER_ERROR");
    }
    return ctx.json({
      status: true
    });
  }
);
const revokeSessions = createAuthEndpoint(
  "/revoke-sessions",
  {
    method: "POST",
    use: [sensitiveSessionMiddleware],
    requireHeaders: true,
    metadata: {
      openapi: {
        description: "Revoke all sessions for the user",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      description: "Indicates if all sessions were revoked successfully"
                    }
                  },
                  required: ["status"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    try {
      await ctx.context.internalAdapter.deleteSessions(
        ctx.context.session.user.id
      );
    } catch (error2) {
      ctx.context.logger.error(
        error2 && typeof error2 === "object" && "name" in error2 ? error2.name : "",
        error2
      );
      throw new APIError("INTERNAL_SERVER_ERROR");
    }
    return ctx.json({
      status: true
    });
  }
);
const revokeOtherSessions = createAuthEndpoint(
  "/revoke-other-sessions",
  {
    method: "POST",
    requireHeaders: true,
    use: [sensitiveSessionMiddleware],
    metadata: {
      openapi: {
        description: "Revoke all other sessions for the user except the current one",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      description: "Indicates if all other sessions were revoked successfully"
                    }
                  },
                  required: ["status"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const session = ctx.context.session;
    if (!session.user) {
      throw new APIError("UNAUTHORIZED");
    }
    const sessions = await ctx.context.internalAdapter.listSessions(
      session.user.id
    );
    const activeSessions = sessions.filter((session2) => {
      return session2.expiresAt > /* @__PURE__ */ new Date();
    });
    const otherSessions = activeSessions.filter(
      (session2) => session2.token !== ctx.context.session.session.token
    );
    await Promise.all(
      otherSessions.map(
        (session2) => ctx.context.internalAdapter.deleteSession(session2.token)
      )
    );
    return ctx.json({
      status: true
    });
  }
);
const generateRandomString = createRandomStringGenerator(
  "a-z",
  "0-9",
  "A-Z",
  "-_"
);
async function signJWT(payload, secret, expiresIn = 3600) {
  const jwt = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
  return jwt;
}
function constantTimeEqual(a, b) {
  const aBuffer = new Uint8Array(a);
  const bBuffer = new Uint8Array(b);
  let c = aBuffer.length ^ bBuffer.length;
  const length = Math.max(aBuffer.length, bBuffer.length);
  for (let i = 0; i < length; i++) {
    c |= (i < aBuffer.length ? aBuffer[i] : 0) ^ (i < bBuffer.length ? bBuffer[i] : 0);
  }
  return c === 0;
}
async function hashToBase64(data) {
  const buffer = await createHash("SHA-256").digest(data);
  return base64.encode(buffer);
}
const config = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64
};
async function generateKey(password, salt) {
  return await scryptAsync(password.normalize("NFKC"), salt, {
    N: config.N,
    p: config.p,
    r: config.r,
    dkLen: config.dkLen,
    maxmem: 128 * config.N * config.r * 2
  });
}
const hashPassword = async (password) => {
  const salt = hex.encode(crypto.getRandomValues(new Uint8Array(16)));
  const key = await generateKey(password, salt);
  return `${salt}:${hex.encode(key)}`;
};
const verifyPassword = async ({
  hash,
  password
}) => {
  const [salt, key] = hash.split(":");
  if (!salt || !key) {
    throw new BetterAuthError("Invalid password hash");
  }
  const targetKey = await generateKey(password, salt);
  return constantTimeEqual(targetKey, hexToBytes$1(key));
};
const symmetricEncrypt = async ({
  key,
  data
}) => {
  const keyAsBytes = await createHash("SHA-256").digest(key);
  const dataAsBytes = utf8ToBytes(data);
  const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return bytesToHex(chacha.encrypt(dataAsBytes));
};
const symmetricDecrypt = async ({
  key,
  data
}) => {
  const keyAsBytes = await createHash("SHA-256").digest(key);
  const dataAsBytes = hexToBytes(data);
  const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return new TextDecoder().decode(chacha.decrypt(dataAsBytes));
};
const generateId = (size) => {
  return createRandomStringGenerator("a-z", "A-Z", "0-9")(size || 32);
};
const coreSchema = z.object({
  id: z.string(),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date()),
  updatedAt: z.date().default(() => /* @__PURE__ */ new Date())
});
coreSchema.extend({
  providerId: z.string(),
  accountId: z.string(),
  userId: z.coerce.string(),
  accessToken: z.string().nullish(),
  refreshToken: z.string().nullish(),
  idToken: z.string().nullish(),
  /**
   * Access token expires at
   */
  accessTokenExpiresAt: z.date().nullish(),
  /**
   * Refresh token expires at
   */
  refreshTokenExpiresAt: z.date().nullish(),
  /**
   * The scopes that the user has authorized
   */
  scope: z.string().nullish(),
  /**
   * Password is only stored in the credential provider
   */
  password: z.string().nullish()
});
coreSchema.extend({
  email: z.string().transform((val) => val.toLowerCase()),
  emailVerified: z.boolean().default(false),
  name: z.string(),
  image: z.string().nullish()
});
coreSchema.extend({
  userId: z.coerce.string(),
  expiresAt: z.date(),
  token: z.string(),
  ipAddress: z.string().nullish(),
  userAgent: z.string().nullish()
});
coreSchema.extend({
  value: z.string(),
  expiresAt: z.date(),
  identifier: z.string()
});
function parseOutputData(data, schema2) {
  const fields = schema2.fields;
  const parsedData = {};
  for (const key in data) {
    const field = fields[key];
    if (!field) {
      parsedData[key] = data[key];
      continue;
    }
    if (field.returned === false) {
      continue;
    }
    parsedData[key] = data[key];
  }
  return parsedData;
}
function getAllFields(options, table) {
  let schema2 = {
    ...table === "user" ? options.user?.additionalFields : {},
    ...table === "session" ? options.session?.additionalFields : {}
  };
  for (const plugin of options.plugins || []) {
    if (plugin.schema && plugin.schema[table]) {
      schema2 = {
        ...schema2,
        ...plugin.schema[table].fields
      };
    }
  }
  return schema2;
}
function parseUserOutput(options, user) {
  const schema2 = getAllFields(options, "user");
  return parseOutputData(user, { fields: schema2 });
}
function parseSessionOutput(options, session) {
  const schema2 = getAllFields(options, "session");
  return parseOutputData(session, { fields: schema2 });
}
function parseInputData(data, schema2) {
  const action = schema2.action || "create";
  const fields = schema2.fields;
  const parsedData = {};
  for (const key in fields) {
    if (key in data) {
      if (fields[key].input === false) {
        if (fields[key].defaultValue) {
          parsedData[key] = fields[key].defaultValue;
          continue;
        }
        continue;
      }
      if (fields[key].validator?.input && data[key] !== void 0) {
        parsedData[key] = fields[key].validator.input.parse(data[key]);
        continue;
      }
      if (fields[key].transform?.input && data[key] !== void 0) {
        parsedData[key] = fields[key].transform?.input(data[key]);
        continue;
      }
      parsedData[key] = data[key];
      continue;
    }
    if (fields[key].defaultValue && action === "create") {
      parsedData[key] = fields[key].defaultValue;
      continue;
    }
    if (fields[key].required && action === "create") {
      throw new APIError("BAD_REQUEST", {
        message: `${key} is required`
      });
    }
  }
  return parsedData;
}
function parseUserInput(options, user, action) {
  const schema2 = getAllFields(options, "user");
  return parseInputData(user || {}, { fields: schema2, action });
}
function escapeRegExpChar(char) {
  if (char === "-" || char === "^" || char === "$" || char === "+" || char === "." || char === "(" || char === ")" || char === "|" || char === "[" || char === "]" || char === "{" || char === "}" || char === "*" || char === "?" || char === "\\") {
    return `\\${char}`;
  } else {
    return char;
  }
}
function escapeRegExpString(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += escapeRegExpChar(str[i]);
  }
  return result;
}
function transform(pattern, separator = true) {
  if (Array.isArray(pattern)) {
    let regExpPatterns = pattern.map((p) => `^${transform(p, separator)}$`);
    return `(?:${regExpPatterns.join("|")})`;
  }
  let separatorSplitter = "";
  let separatorMatcher = "";
  let wildcard = ".";
  if (separator === true) {
    separatorSplitter = "/";
    separatorMatcher = "[/\\\\]";
    wildcard = "[^/\\\\]";
  } else if (separator) {
    separatorSplitter = separator;
    separatorMatcher = escapeRegExpString(separatorSplitter);
    if (separatorMatcher.length > 1) {
      separatorMatcher = `(?:${separatorMatcher})`;
      wildcard = `((?!${separatorMatcher}).)`;
    } else {
      wildcard = `[^${separatorMatcher}]`;
    }
  }
  let requiredSeparator = separator ? `${separatorMatcher}+?` : "";
  let optionalSeparator = separator ? `${separatorMatcher}*?` : "";
  let segments = separator ? pattern.split(separatorSplitter) : [pattern];
  let result = "";
  for (let s2 = 0; s2 < segments.length; s2++) {
    let segment = segments[s2];
    let nextSegment = segments[s2 + 1];
    let currentSeparator = "";
    if (!segment && s2 > 0) {
      continue;
    }
    if (separator) {
      if (s2 === segments.length - 1) {
        currentSeparator = optionalSeparator;
      } else if (nextSegment !== "**") {
        currentSeparator = requiredSeparator;
      } else {
        currentSeparator = "";
      }
    }
    if (separator && segment === "**") {
      if (currentSeparator) {
        result += s2 === 0 ? "" : currentSeparator;
        result += `(?:${wildcard}*?${currentSeparator})*?`;
      }
      continue;
    }
    for (let c = 0; c < segment.length; c++) {
      let char = segment[c];
      if (char === "\\") {
        if (c < segment.length - 1) {
          result += escapeRegExpChar(segment[c + 1]);
          c++;
        }
      } else if (char === "?") {
        result += wildcard;
      } else if (char === "*") {
        result += `${wildcard}*?`;
      } else {
        result += escapeRegExpChar(char);
      }
    }
    result += currentSeparator;
  }
  return result;
}
function isMatch(regexp, sample) {
  if (typeof sample !== "string") {
    throw new TypeError(`Sample must be a string, but ${typeof sample} given`);
  }
  return regexp.test(sample);
}
function wildcardMatch(pattern, options) {
  if (typeof pattern !== "string" && !Array.isArray(pattern)) {
    throw new TypeError(
      `The first argument must be a single pattern string or an array of patterns, but ${typeof pattern} given`
    );
  }
  if (typeof options === "string" || typeof options === "boolean") {
    options = { separator: options };
  }
  if (arguments.length === 2 && !(typeof options === "undefined" || typeof options === "object" && options !== null && !Array.isArray(options))) {
    throw new TypeError(
      `The second argument must be an options object or a string/boolean separator, but ${typeof options} given`
    );
  }
  options = options || {};
  if (options.separator === "\\") {
    throw new Error(
      "\\ is not a valid separator because it is used for escaping. Try setting the separator to `true` instead"
    );
  }
  let regexpPattern = transform(pattern, options.separator);
  let regexp = new RegExp(`^${regexpPattern}$`, options.flags);
  let fn = isMatch.bind(null, regexp);
  fn.options = options;
  fn.pattern = pattern;
  fn.regexp = regexp;
  return fn;
}
const originCheckMiddleware = createAuthMiddleware(async (ctx) => {
  if (ctx.request?.method !== "POST" || !ctx.request) {
    return;
  }
  const { body, query, context } = ctx;
  const originHeader = ctx.headers?.get("origin") || ctx.headers?.get("referer") || "";
  const callbackURL = body?.callbackURL || query?.callbackURL;
  const redirectURL = body?.redirectTo;
  const errorCallbackURL = body?.errorCallbackURL;
  const newUserCallbackURL = body?.newUserCallbackURL;
  const trustedOrigins = Array.isArray(context.options.trustedOrigins) ? context.trustedOrigins : [
    ...context.trustedOrigins,
    ...await context.options.trustedOrigins?.(ctx.request) || []
  ];
  const usesCookies = ctx.headers?.has("cookie");
  const matchesPattern = (url, pattern) => {
    if (url.startsWith("/")) {
      return false;
    }
    if (pattern.includes("*")) {
      if (pattern.includes("://")) {
        return wildcardMatch(pattern)(getOrigin(url) || url);
      }
      return wildcardMatch(pattern)(getHost(url));
    }
    const protocol = getProtocol(url);
    return protocol === "http:" || protocol === "https:" || !protocol ? pattern === getOrigin(url) : url.startsWith(pattern);
  };
  const validateURL = (url, label) => {
    if (!url) {
      return;
    }
    const isTrustedOrigin = trustedOrigins.some(
      (origin) => matchesPattern(url, origin) || url?.startsWith("/") && label !== "origin" && /^\/(?!\/|\\|%2f|%5c)[\w\-.\+/@]*(?:\?[\w\-.\+/=&%@]*)?$/.test(url)
    );
    if (!isTrustedOrigin) {
      ctx.context.logger.error(`Invalid ${label}: ${url}`);
      ctx.context.logger.info(
        `If it's a valid URL, please add ${url} to trustedOrigins in your auth config
`,
        `Current list of trustedOrigins: ${trustedOrigins}`
      );
      throw new APIError("FORBIDDEN", { message: `Invalid ${label}` });
    }
  };
  if (usesCookies && !ctx.context.options.advanced?.disableCSRFCheck) {
    validateURL(originHeader, "origin");
  }
  callbackURL && validateURL(callbackURL, "callbackURL");
  redirectURL && validateURL(redirectURL, "redirectURL");
  errorCallbackURL && validateURL(errorCallbackURL, "errorCallbackURL");
  newUserCallbackURL && validateURL(newUserCallbackURL, "newUserCallbackURL");
});
const originCheck = (getValue) => createAuthMiddleware(async (ctx) => {
  if (!ctx.request) {
    return;
  }
  const { context } = ctx;
  const callbackURL = getValue(ctx);
  const trustedOrigins = Array.isArray(
    context.options.trustedOrigins
  ) ? context.trustedOrigins : [
    ...context.trustedOrigins,
    ...await context.options.trustedOrigins?.(ctx.request) || []
  ];
  const matchesPattern = (url, pattern) => {
    if (url.startsWith("/")) {
      return false;
    }
    if (pattern.includes("*")) {
      if (pattern.includes("://")) {
        return wildcardMatch(pattern)(getOrigin(url) || url);
      }
      return wildcardMatch(pattern)(getHost(url));
    }
    const protocol = getProtocol(url);
    return protocol === "http:" || protocol === "https:" || !protocol ? pattern === getOrigin(url) : url.startsWith(pattern);
  };
  const validateURL = (url, label) => {
    if (!url) {
      return;
    }
    const isTrustedOrigin = trustedOrigins.some(
      (origin) => matchesPattern(url, origin) || url?.startsWith("/") && label !== "origin" && /^\/(?!\/|\\|%2f|%5c)[\w\-.\+/@]*(?:\?[\w\-.\+/=&%@]*)?$/.test(
        url
      )
    );
    if (!isTrustedOrigin) {
      ctx.context.logger.error(`Invalid ${label}: ${url}`);
      ctx.context.logger.info(
        `If it's a valid URL, please add ${url} to trustedOrigins in your auth config
`,
        `Current list of trustedOrigins: ${trustedOrigins}`
      );
      throw new APIError("FORBIDDEN", { message: `Invalid ${label}` });
    }
  };
  const callbacks = Array.isArray(callbackURL) ? callbackURL : [callbackURL];
  for (const url of callbacks) {
    validateURL(url, "callbackURL");
  }
});
async function createEmailVerificationToken(secret, email, updateTo, expiresIn = 3600) {
  const token = await signJWT(
    {
      email: email.toLowerCase(),
      updateTo
    },
    secret,
    expiresIn
  );
  return token;
}
async function sendVerificationEmailFn(ctx, user) {
  if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
    ctx.context.logger.error("Verification email isn't enabled.");
    throw new APIError("BAD_REQUEST", {
      message: "Verification email isn't enabled"
    });
  }
  const token = await createEmailVerificationToken(
    ctx.context.secret,
    user.email,
    void 0,
    ctx.context.options.emailVerification?.expiresIn
  );
  const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
  await ctx.context.options.emailVerification.sendVerificationEmail(
    {
      user,
      url,
      token
    },
    ctx.request
  );
}
const sendVerificationEmail = createAuthEndpoint(
  "/send-verification-email",
  {
    method: "POST",
    body: z.object({
      email: z.email().meta({
        description: "The email to send the verification email to"
      }),
      callbackURL: z.string().meta({
        description: "The URL to use for email verification callback"
      }).optional()
    }),
    metadata: {
      openapi: {
        description: "Send a verification email to the user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    description: "The email to send the verification email to",
                    example: "user@example.com"
                  },
                  callbackURL: {
                    type: "string",
                    description: "The URL to use for email verification callback",
                    example: "https://example.com/callback",
                    nullable: true
                  }
                },
                required: ["email"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      description: "Indicates if the email was sent successfully",
                      example: true
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      description: "Error message",
                      example: "Verification email isn't enabled"
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
    if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
      ctx.context.logger.error("Verification email isn't enabled.");
      throw new APIError("BAD_REQUEST", {
        message: "Verification email isn't enabled"
      });
    }
    const { email } = ctx.body;
    const session = await getSessionFromCtx(ctx);
    if (!session) {
      const user = await ctx.context.internalAdapter.findUserByEmail(email);
      if (!user) {
        return ctx.json({
          status: true
        });
      }
      await sendVerificationEmailFn(ctx, user.user);
      return ctx.json({
        status: true
      });
    }
    if (session?.user.emailVerified) {
      throw new APIError("BAD_REQUEST", {
        message: "You can only send a verification email to an unverified email"
      });
    }
    if (session?.user.email !== email) {
      throw new APIError("BAD_REQUEST", {
        message: "You can only send a verification email to your own email"
      });
    }
    await sendVerificationEmailFn(ctx, session.user);
    return ctx.json({
      status: true
    });
  }
);
const verifyEmail = createAuthEndpoint(
  "/verify-email",
  {
    method: "GET",
    query: z.object({
      token: z.string().meta({
        description: "The token to verify the email"
      }),
      callbackURL: z.string().meta({
        description: "The URL to redirect to after email verification"
      }).optional()
    }),
    use: [originCheck((ctx) => ctx.query.callbackURL)],
    metadata: {
      openapi: {
        description: "Verify the email of the user",
        parameters: [
          {
            name: "token",
            in: "query",
            description: "The token to verify the email",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "callbackURL",
            in: "query",
            description: "The URL to redirect to after email verification",
            required: false,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          description: "User ID"
                        },
                        email: {
                          type: "string",
                          description: "User email"
                        },
                        name: {
                          type: "string",
                          description: "User name"
                        },
                        image: {
                          type: "string",
                          description: "User image URL"
                        },
                        emailVerified: {
                          type: "boolean",
                          description: "Indicates if the user email is verified"
                        },
                        createdAt: {
                          type: "string",
                          description: "User creation date"
                        },
                        updatedAt: {
                          type: "string",
                          description: "User update date"
                        }
                      },
                      required: [
                        "id",
                        "email",
                        "name",
                        "image",
                        "emailVerified",
                        "createdAt",
                        "updatedAt"
                      ]
                    },
                    status: {
                      type: "boolean",
                      description: "Indicates if the email was verified successfully"
                    }
                  },
                  required: ["user", "status"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    function redirectOnError(error2) {
      if (ctx.query.callbackURL) {
        if (ctx.query.callbackURL.includes("?")) {
          throw ctx.redirect(`${ctx.query.callbackURL}&error=${error2}`);
        }
        throw ctx.redirect(`${ctx.query.callbackURL}?error=${error2}`);
      }
      throw new APIError("UNAUTHORIZED", {
        message: error2
      });
    }
    const { token } = ctx.query;
    let jwt;
    try {
      jwt = await jwtVerify(
        token,
        new TextEncoder().encode(ctx.context.secret),
        {
          algorithms: ["HS256"]
        }
      );
    } catch (e) {
      if (e instanceof JWTExpired) {
        return redirectOnError("token_expired");
      }
      return redirectOnError("invalid_token");
    }
    const schema2 = z.object({
      email: z.string().email(),
      updateTo: z.string().optional()
    });
    const parsed = schema2.parse(jwt.payload);
    const user = await ctx.context.internalAdapter.findUserByEmail(
      parsed.email
    );
    if (!user) {
      return redirectOnError("user_not_found");
    }
    if (parsed.updateTo) {
      const session = await getSessionFromCtx(ctx);
      if (!session) {
        if (ctx.query.callbackURL) {
          throw ctx.redirect(`${ctx.query.callbackURL}?error=unauthorized`);
        }
        return redirectOnError("unauthorized");
      }
      if (session.user.email !== parsed.email) {
        if (ctx.query.callbackURL) {
          throw ctx.redirect(`${ctx.query.callbackURL}?error=unauthorized`);
        }
        return redirectOnError("unauthorized");
      }
      const updatedUser2 = await ctx.context.internalAdapter.updateUserByEmail(
        parsed.email,
        {
          email: parsed.updateTo,
          emailVerified: false
        },
        ctx
      );
      const newToken = await createEmailVerificationToken(
        ctx.context.secret,
        parsed.updateTo
      );
      await ctx.context.options.emailVerification?.sendVerificationEmail?.(
        {
          user: updatedUser2,
          url: `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${ctx.query.callbackURL || "/"}`,
          token: newToken
        },
        ctx.request
      );
      await setSessionCookie(ctx, {
        session: session.session,
        user: {
          ...session.user,
          email: parsed.updateTo,
          emailVerified: false
        }
      });
      if (ctx.query.callbackURL) {
        throw ctx.redirect(ctx.query.callbackURL);
      }
      return ctx.json({
        status: true,
        user: {
          id: updatedUser2.id,
          email: updatedUser2.email,
          name: updatedUser2.name,
          image: updatedUser2.image,
          emailVerified: updatedUser2.emailVerified,
          createdAt: updatedUser2.createdAt,
          updatedAt: updatedUser2.updatedAt
        }
      });
    }
    if (ctx.context.options.emailVerification?.onEmailVerification) {
      await ctx.context.options.emailVerification.onEmailVerification(
        user.user,
        ctx.request
      );
    }
    const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(
      parsed.email,
      {
        emailVerified: true
      },
      ctx
    );
    if (ctx.context.options.emailVerification?.afterEmailVerification) {
      await ctx.context.options.emailVerification.afterEmailVerification(
        updatedUser,
        ctx.request
      );
    }
    if (ctx.context.options.emailVerification?.autoSignInAfterVerification) {
      const currentSession = await getSessionFromCtx(ctx);
      if (!currentSession || currentSession.user.email !== parsed.email) {
        const session = await ctx.context.internalAdapter.createSession(
          user.user.id,
          ctx
        );
        if (!session) {
          throw new APIError("INTERNAL_SERVER_ERROR", {
            message: "Failed to create session"
          });
        }
        await setSessionCookie(ctx, {
          session,
          user: {
            ...user.user,
            emailVerified: true
          }
        });
      } else {
        await setSessionCookie(ctx, {
          session: currentSession.session,
          user: {
            ...currentSession.user,
            emailVerified: true
          }
        });
      }
    }
    if (ctx.query.callbackURL) {
      throw ctx.redirect(ctx.query.callbackURL);
    }
    return ctx.json({
      status: true,
      user: null
    });
  }
);
const HIDE_METADATA = {
  isAction: false
};
async function generateState(c, link) {
  const callbackURL = c.body?.callbackURL || c.context.options.baseURL;
  if (!callbackURL) {
    throw new APIError("BAD_REQUEST", {
      message: "callbackURL is required"
    });
  }
  const codeVerifier = generateRandomString(128);
  const state = generateRandomString(32);
  const data = JSON.stringify({
    callbackURL,
    codeVerifier,
    errorURL: c.body?.errorCallbackURL,
    newUserURL: c.body?.newUserCallbackURL,
    link,
    /**
     * This is the actual expiry time of the state
     */
    expiresAt: Date.now() + 10 * 60 * 1e3,
    requestSignUp: c.body?.requestSignUp
  });
  const expiresAt = /* @__PURE__ */ new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);
  const verification = await c.context.internalAdapter.createVerificationValue(
    {
      value: data,
      identifier: state,
      expiresAt
    },
    c
  );
  if (!verification) {
    c.context.logger.error(
      "Unable to create verification. Make sure the database adapter is properly working and there is a verification table in the database"
    );
    throw new APIError("INTERNAL_SERVER_ERROR", {
      message: "Unable to create verification"
    });
  }
  return {
    state: verification.identifier,
    codeVerifier
  };
}
async function parseState(c) {
  const state = c.query.state || c.body.state;
  const data = await c.context.internalAdapter.findVerificationValue(state);
  if (!data) {
    c.context.logger.error("State Mismatch. Verification not found", {
      state
    });
    const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
    throw c.redirect(`${errorURL}?error=please_restart_the_process`);
  }
  const parsedData = z.object({
    callbackURL: z.string(),
    codeVerifier: z.string(),
    errorURL: z.string().optional(),
    newUserURL: z.string().optional(),
    expiresAt: z.number(),
    link: z.object({
      email: z.string(),
      userId: z.coerce.string()
    }).optional(),
    requestSignUp: z.boolean().optional()
  }).parse(JSON.parse(data.value));
  if (!parsedData.errorURL) {
    parsedData.errorURL = `${c.context.baseURL}/error`;
  }
  if (parsedData.expiresAt < Date.now()) {
    await c.context.internalAdapter.deleteVerificationValue(data.id);
    const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
    throw c.redirect(`${errorURL}?error=please_restart_the_process`);
  }
  await c.context.internalAdapter.deleteVerificationValue(data.id);
  return parsedData;
}
async function generateCodeChallenge(codeVerifier) {
  const codeChallengeBytes = await createHash("SHA-256").digest(codeVerifier);
  return base64Url.encode(new Uint8Array(codeChallengeBytes), {
    padding: false
  });
}
function getOAuth2Tokens(data) {
  return {
    tokenType: data.token_type,
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    accessTokenExpiresAt: data.expires_in ? getDate(data.expires_in, "sec") : void 0,
    refreshTokenExpiresAt: data.refresh_token_expires_in ? getDate(data.refresh_token_expires_in, "sec") : void 0,
    scopes: data?.scope ? typeof data.scope === "string" ? data.scope.split(" ") : data.scope : [],
    idToken: data.id_token
  };
}
function decryptOAuthToken(token, ctx) {
  if (!token) return token;
  if (ctx.options.account?.encryptOAuthTokens) {
    return symmetricDecrypt({
      key: ctx.secret,
      data: token
    });
  }
  return token;
}
function setTokenUtil(token, ctx) {
  if (ctx.options.account?.encryptOAuthTokens && token) {
    return symmetricEncrypt({
      key: ctx.secret,
      data: token
    });
  }
  return token;
}
async function handleOAuthUserInfo(c, {
  userInfo,
  account,
  callbackURL,
  disableSignUp,
  overrideUserInfo
}) {
  const dbUser = await c.context.internalAdapter.findOAuthUser(
    userInfo.email.toLowerCase(),
    account.accountId,
    account.providerId
  ).catch((e) => {
    logger.error(
      "Better auth was unable to query your database.\nError: ",
      e
    );
    const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
    throw c.redirect(`${errorURL}?error=internal_server_error`);
  });
  let user = dbUser?.user;
  let isRegister = !user;
  if (dbUser) {
    const hasBeenLinked = dbUser.accounts.find(
      (a) => a.providerId === account.providerId && a.accountId === account.accountId
    );
    if (!hasBeenLinked) {
      const trustedProviders = c.context.options.account?.accountLinking?.trustedProviders;
      const isTrustedProvider = trustedProviders?.includes(
        account.providerId
      );
      if (!isTrustedProvider && !userInfo.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
        if (isDevelopment) {
          logger.warn(
            `User already exist but account isn't linked to ${account.providerId}. To read more about how account linking works in Better Auth see https://www.better-auth.com/docs/concepts/users-accounts#account-linking.`
          );
        }
        return {
          error: "account not linked",
          data: null
        };
      }
      try {
        await c.context.internalAdapter.linkAccount(
          {
            providerId: account.providerId,
            accountId: userInfo.id.toString(),
            userId: dbUser.user.id,
            accessToken: await setTokenUtil(account.accessToken, c.context),
            refreshToken: await setTokenUtil(account.refreshToken, c.context),
            idToken: account.idToken,
            accessTokenExpiresAt: account.accessTokenExpiresAt,
            refreshTokenExpiresAt: account.refreshTokenExpiresAt,
            scope: account.scope
          },
          c
        );
      } catch (e) {
        logger.error("Unable to link account", e);
        return {
          error: "unable to link account",
          data: null
        };
      }
      if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) {
        await c.context.internalAdapter.updateUser(dbUser.user.id, {
          emailVerified: true
        });
      }
    } else {
      if (c.context.options.account?.updateAccountOnSignIn !== false) {
        const updateData = Object.fromEntries(
          Object.entries({
            idToken: account.idToken,
            accessToken: await setTokenUtil(account.accessToken, c.context),
            refreshToken: await setTokenUtil(account.refreshToken, c.context),
            accessTokenExpiresAt: account.accessTokenExpiresAt,
            refreshTokenExpiresAt: account.refreshTokenExpiresAt,
            scope: account.scope
          }).filter(([_, value]) => value !== void 0)
        );
        if (Object.keys(updateData).length > 0) {
          await c.context.internalAdapter.updateAccount(
            hasBeenLinked.id,
            updateData,
            c
          );
        }
      }
      if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) {
        await c.context.internalAdapter.updateUser(dbUser.user.id, {
          emailVerified: true
        });
      }
    }
    if (overrideUserInfo) {
      const { id: _, ...restUserInfo } = userInfo;
      await c.context.internalAdapter.updateUser(dbUser.user.id, {
        ...restUserInfo,
        email: userInfo.email.toLowerCase(),
        emailVerified: userInfo.email.toLowerCase() === dbUser.user.email ? dbUser.user.emailVerified || userInfo.emailVerified : userInfo.emailVerified
      });
    }
  } else {
    if (disableSignUp) {
      return {
        error: "signup disabled",
        data: null,
        isRegister: false
      };
    }
    try {
      const { id: _, ...restUserInfo } = userInfo;
      user = await c.context.internalAdapter.createOAuthUser(
        {
          ...restUserInfo,
          email: userInfo.email.toLowerCase()
        },
        {
          accessToken: await setTokenUtil(account.accessToken, c.context),
          refreshToken: await setTokenUtil(account.refreshToken, c.context),
          idToken: account.idToken,
          accessTokenExpiresAt: account.accessTokenExpiresAt,
          refreshTokenExpiresAt: account.refreshTokenExpiresAt,
          scope: account.scope,
          providerId: account.providerId,
          accountId: userInfo.id.toString()
        },
        c
      ).then((res) => res?.user);
      if (!userInfo.emailVerified && user && c.context.options.emailVerification?.sendOnSignUp) {
        const token = await createEmailVerificationToken(
          c.context.secret,
          user.email,
          void 0,
          c.context.options.emailVerification?.expiresIn
        );
        const url = `${c.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
        await c.context.options.emailVerification?.sendVerificationEmail?.(
          {
            user,
            url,
            token
          },
          c.request
        );
      }
    } catch (e) {
      logger.error(e);
      if (e instanceof APIError) {
        return {
          error: e.message,
          data: null,
          isRegister: false
        };
      }
      return {
        error: "unable to create user",
        data: null,
        isRegister: false
      };
    }
  }
  if (!user) {
    return {
      error: "unable to create user",
      data: null,
      isRegister: false
    };
  }
  const session = await c.context.internalAdapter.createSession(user.id, c);
  if (!session) {
    return {
      error: "unable to create session",
      data: null,
      isRegister: false
    };
  }
  return {
    data: {
      session,
      user
    },
    error: null,
    isRegister
  };
}
async function createAuthorizationURL({
  id,
  options,
  authorizationEndpoint,
  state,
  codeVerifier,
  scopes,
  claims,
  redirectURI,
  duration,
  prompt,
  accessType,
  responseType,
  display,
  loginHint,
  hd,
  responseMode,
  additionalParams,
  scopeJoiner
}) {
  const url = new URL(authorizationEndpoint);
  url.searchParams.set("response_type", responseType || "code");
  const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
  url.searchParams.set("client_id", primaryClientId);
  url.searchParams.set("state", state);
  url.searchParams.set("scope", scopes.join(scopeJoiner || " "));
  url.searchParams.set("redirect_uri", options.redirectURI || redirectURI);
  duration && url.searchParams.set("duration", duration);
  display && url.searchParams.set("display", display);
  loginHint && url.searchParams.set("login_hint", loginHint);
  prompt && url.searchParams.set("prompt", prompt);
  hd && url.searchParams.set("hd", hd);
  accessType && url.searchParams.set("access_type", accessType);
  responseMode && url.searchParams.set("response_mode", responseMode);
  if (codeVerifier) {
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    url.searchParams.set("code_challenge_method", "S256");
    url.searchParams.set("code_challenge", codeChallenge);
  }
  if (claims) {
    const claimsObj = claims.reduce(
      (acc, claim) => {
        acc[claim] = null;
        return acc;
      },
      {}
    );
    url.searchParams.set(
      "claims",
      JSON.stringify({
        id_token: { email: null, email_verified: null, ...claimsObj }
      })
    );
  }
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url;
}
function createAuthorizationCodeRequest({
  code,
  codeVerifier,
  redirectURI,
  options,
  authentication,
  deviceId,
  headers,
  additionalParams = {},
  resource
}) {
  const body = new URLSearchParams();
  const requestHeaders = {
    "content-type": "application/x-www-form-urlencoded",
    accept: "application/json",
    "user-agent": "better-auth",
    ...headers
  };
  body.set("grant_type", "authorization_code");
  body.set("code", code);
  codeVerifier && body.set("code_verifier", codeVerifier);
  options.clientKey && body.set("client_key", options.clientKey);
  deviceId && body.set("device_id", deviceId);
  body.set("redirect_uri", options.redirectURI || redirectURI);
  if (resource) {
    if (typeof resource === "string") {
      body.append("resource", resource);
    } else {
      for (const _resource of resource) {
        body.append("resource", _resource);
      }
    }
  }
  if (authentication === "basic") {
    const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
    const encodedCredentials = base64.encode(
      `${primaryClientId}:${options.clientSecret ?? ""}`
    );
    requestHeaders["authorization"] = `Basic ${encodedCredentials}`;
  } else {
    const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
    body.set("client_id", primaryClientId);
    if (options.clientSecret) {
      body.set("client_secret", options.clientSecret);
    }
  }
  for (const [key, value] of Object.entries(additionalParams)) {
    if (!body.has(key)) body.append(key, value);
  }
  return {
    body,
    headers: requestHeaders
  };
}
async function validateAuthorizationCode({
  code,
  codeVerifier,
  redirectURI,
  options,
  tokenEndpoint,
  authentication,
  deviceId,
  headers,
  additionalParams = {},
  resource
}) {
  const { body, headers: requestHeaders } = createAuthorizationCodeRequest({
    code,
    codeVerifier,
    redirectURI,
    options,
    authentication,
    deviceId,
    headers,
    additionalParams,
    resource
  });
  const { data, error: error2 } = await betterFetch(tokenEndpoint, {
    method: "POST",
    body,
    headers: requestHeaders
  });
  if (error2) {
    throw error2;
  }
  const tokens = getOAuth2Tokens(data);
  return tokens;
}
function createRefreshAccessTokenRequest({
  refreshToken: refreshToken2,
  options,
  authentication,
  extraParams,
  resource
}) {
  const body = new URLSearchParams();
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    accept: "application/json"
  };
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", refreshToken2);
  if (authentication === "basic") {
    const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
    if (primaryClientId) {
      headers["authorization"] = "Basic " + base64.encode(`${primaryClientId}:${options.clientSecret ?? ""}`);
    } else {
      headers["authorization"] = "Basic " + base64.encode(`:${options.clientSecret ?? ""}`);
    }
  } else {
    const primaryClientId = Array.isArray(options.clientId) ? options.clientId[0] : options.clientId;
    body.set("client_id", primaryClientId);
    if (options.clientSecret) {
      body.set("client_secret", options.clientSecret);
    }
  }
  if (resource) {
    if (typeof resource === "string") {
      body.append("resource", resource);
    } else {
      for (const _resource of resource) {
        body.append("resource", _resource);
      }
    }
  }
  if (extraParams) {
    for (const [key, value] of Object.entries(extraParams)) {
      body.set(key, value);
    }
  }
  return {
    body,
    headers
  };
}
async function refreshAccessToken({
  refreshToken: refreshToken2,
  options,
  tokenEndpoint,
  authentication,
  extraParams
}) {
  const { body, headers } = createRefreshAccessTokenRequest({
    refreshToken: refreshToken2,
    options,
    authentication,
    extraParams
  });
  const { data, error: error2 } = await betterFetch(tokenEndpoint, {
    method: "POST",
    body,
    headers
  });
  if (error2) {
    throw error2;
  }
  const tokens = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenType: data.token_type,
    scopes: data.scope?.split(" "),
    idToken: data.id_token
  };
  if (data.expires_in) {
    const now = /* @__PURE__ */ new Date();
    tokens.accessTokenExpiresAt = new Date(
      now.getTime() + data.expires_in * 1e3
    );
  }
  return tokens;
}
const apple = (options) => {
  const tokenEndpoint = "https://appleid.apple.com/auth/token";
  return {
    id: "apple",
    name: "Apple",
    async createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scope = options.disableDefaultScope ? [] : ["email", "name"];
      options.scope && _scope.push(...options.scope);
      scopes && _scope.push(...scopes);
      const url = await createAuthorizationURL({
        id: "apple",
        options,
        authorizationEndpoint: "https://appleid.apple.com/auth/authorize",
        scopes: _scope,
        state,
        redirectURI,
        responseMode: "form_post",
        responseType: "code id_token"
      });
      return url;
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      const decodedHeader = decodeProtectedHeader(token);
      const { kid, alg: jwtAlg } = decodedHeader;
      if (!kid || !jwtAlg) return false;
      const publicKey = await getApplePublicKey(kid);
      const { payload: jwtClaims } = await jwtVerify(token, publicKey, {
        algorithms: [jwtAlg],
        issuer: "https://appleid.apple.com",
        audience: options.audience && options.audience.length ? options.audience : options.appBundleIdentifier ? options.appBundleIdentifier : options.clientId,
        maxTokenAge: "1h"
      });
      ["email_verified", "is_private_email"].forEach((field) => {
        if (jwtClaims[field] !== void 0) {
          jwtClaims[field] = Boolean(jwtClaims[field]);
        }
      });
      if (nonce && jwtClaims.nonce !== nonce) {
        return false;
      }
      return !!jwtClaims;
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://appleid.apple.com/auth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (!token.idToken) {
        return null;
      }
      const profile = decodeJwt(token.idToken);
      if (!profile) {
        return null;
      }
      const name = token.user ? `${token.user.name?.firstName} ${token.user.name?.lastName}` : profile.name || profile.email;
      const emailVerified = typeof profile.email_verified === "boolean" ? profile.email_verified : profile.email_verified === "true";
      const enrichedProfile = {
        ...profile,
        name
      };
      const userMap = await options.mapProfileToUser?.(enrichedProfile);
      return {
        user: {
          id: profile.sub,
          name: enrichedProfile.name,
          emailVerified,
          email: profile.email,
          ...userMap
        },
        data: enrichedProfile
      };
    },
    options
  };
};
const getApplePublicKey = async (kid) => {
  const APPLE_BASE_URL = "https://appleid.apple.com";
  const JWKS_APPLE_URI = "/auth/keys";
  const { data } = await betterFetch(`${APPLE_BASE_URL}${JWKS_APPLE_URI}`);
  if (!data?.keys) {
    throw new APIError("BAD_REQUEST", {
      message: "Keys not found"
    });
  }
  const jwk = data.keys.find((key) => key.kid === kid);
  if (!jwk) {
    throw new Error(`JWK with kid ${kid} not found`);
  }
  return await importJWK(jwk, jwk.alg);
};
const atlassian = (options) => {
  return {
    id: "atlassian",
    name: "Atlassian",
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      if (!options.clientId || !options.clientSecret) {
        logger.error("Client Id and Secret are required for Atlassian");
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) {
        throw new BetterAuthError("codeVerifier is required for Atlassian");
      }
      const _scopes = options.disableDefaultScope ? [] : ["read:jira-user", "offline_access"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "atlassian",
        options,
        authorizationEndpoint: "https://auth.atlassian.com/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        additionalParams: {
          audience: "api.atlassian.com"
        },
        prompt: options.prompt
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://auth.atlassian.com/oauth/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://auth.atlassian.com/oauth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (!token.accessToken) {
        return null;
      }
      try {
        const { data: profile } = await betterFetch("https://api.atlassian.com/me", {
          headers: { Authorization: `Bearer ${token.accessToken}` }
        });
        if (!profile) return null;
        const userMap = await options.mapProfileToUser?.(profile);
        return {
          user: {
            id: profile.account_id,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            emailVerified: false,
            ...userMap
          },
          data: profile
        };
      } catch (error2) {
        logger.error("Failed to fetch user info from Figma:", error2);
        return null;
      }
    },
    options
  };
};
const cognito = (options) => {
  if (!options.domain || !options.region || !options.userPoolId) {
    logger.error(
      "Domain, region and userPoolId are required for Amazon Cognito. Make sure to provide them in the options."
    );
    throw new BetterAuthError("DOMAIN_AND_REGION_REQUIRED");
  }
  const cleanDomain = options.domain.replace(/^https?:\/\//, "");
  const authorizationEndpoint = `https://${cleanDomain}/oauth2/authorize`;
  const tokenEndpoint = `https://${cleanDomain}/oauth2/token`;
  const userInfoEndpoint = `https://${cleanDomain}/oauth2/userinfo`;
  return {
    id: "cognito",
    name: "Cognito",
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      if (!options.clientId) {
        logger.error(
          "ClientId is required for Amazon Cognito. Make sure to provide them in the options."
        );
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (options.requireClientSecret && !options.clientSecret) {
        logger.error(
          "Client Secret is required when requireClientSecret is true. Make sure to provide it in the options."
        );
        throw new BetterAuthError("CLIENT_SECRET_REQUIRED");
      }
      const _scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      const url = await createAuthorizationURL({
        id: "cognito",
        options: {
          ...options
        },
        authorizationEndpoint,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        prompt: options.prompt
      });
      return url;
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      try {
        const decodedHeader = decodeProtectedHeader(token);
        const { kid, alg: jwtAlg } = decodedHeader;
        if (!kid || !jwtAlg) return false;
        const publicKey = await getCognitoPublicKey(
          kid,
          options.region,
          options.userPoolId
        );
        const expectedIssuer = `https://cognito-idp.${options.region}.amazonaws.com/${options.userPoolId}`;
        const { payload: jwtClaims } = await jwtVerify(token, publicKey, {
          algorithms: [jwtAlg],
          issuer: expectedIssuer,
          audience: options.clientId,
          maxTokenAge: "1h"
        });
        if (nonce && jwtClaims.nonce !== nonce) {
          return false;
        }
        return true;
      } catch (error2) {
        logger.error("Failed to verify ID token:", error2);
        return false;
      }
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (token.idToken) {
        try {
          const profile = decodeJwt(token.idToken);
          if (!profile) {
            return null;
          }
          const name = profile.name || profile.given_name || profile.username || profile.email;
          const enrichedProfile = {
            ...profile,
            name
          };
          const userMap = await options.mapProfileToUser?.(enrichedProfile);
          return {
            user: {
              id: profile.sub,
              name: enrichedProfile.name,
              email: profile.email,
              image: profile.picture,
              emailVerified: profile.email_verified,
              ...userMap
            },
            data: enrichedProfile
          };
        } catch (error2) {
          logger.error("Failed to decode ID token:", error2);
        }
      }
      if (token.accessToken) {
        try {
          const { data: userInfo } = await betterFetch(
            userInfoEndpoint,
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`
              }
            }
          );
          if (userInfo) {
            const userMap = await options.mapProfileToUser?.(userInfo);
            return {
              user: {
                id: userInfo.sub,
                name: userInfo.name || userInfo.given_name || userInfo.username,
                email: userInfo.email,
                image: userInfo.picture,
                emailVerified: userInfo.email_verified,
                ...userMap
              },
              data: userInfo
            };
          }
        } catch (error2) {
          logger.error("Failed to fetch user info from Cognito:", error2);
        }
      }
      return null;
    },
    options
  };
};
const getCognitoPublicKey = async (kid, region, userPoolId) => {
  const COGNITO_JWKS_URI = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
  try {
    const { data } = await betterFetch(COGNITO_JWKS_URI);
    if (!data?.keys) {
      throw new APIError("BAD_REQUEST", {
        message: "Keys not found"
      });
    }
    const jwk = data.keys.find((key) => key.kid === kid);
    if (!jwk) {
      throw new Error(`JWK with kid ${kid} not found`);
    }
    return await importJWK(jwk, jwk.alg);
  } catch (error2) {
    logger.error("Failed to fetch Cognito public key:", error2);
    throw error2;
  }
};
const discord = (options) => {
  return {
    id: "discord",
    name: "Discord",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["identify", "email"];
      scopes && _scopes.push(...scopes);
      options.scope && _scopes.push(...options.scope);
      return new URL(
        `https://discord.com/api/oauth2/authorize?scope=${_scopes.join(
          "+"
        )}&response_type=code&client_id=${options.clientId}&redirect_uri=${encodeURIComponent(
          options.redirectURI || redirectURI
        )}&state=${state}&prompt=${options.prompt || "none"}`
      );
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://discord.com/api/oauth2/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://discord.com/api/oauth2/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://discord.com/api/users/@me",
        {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2) {
        return null;
      }
      if (profile.avatar === null) {
        const defaultAvatarNumber = profile.discriminator === "0" ? Number(BigInt(profile.id) >> BigInt(22)) % 6 : parseInt(profile.discriminator) % 5;
        profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
      } else {
        const format2 = profile.avatar.startsWith("a_") ? "gif" : "png";
        profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format2}`;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.global_name || profile.username || "",
          email: profile.email,
          emailVerified: profile.verified,
          image: profile.image_url,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const facebook = (options) => {
  return {
    id: "facebook",
    name: "Facebook",
    async createAuthorizationURL({ state, scopes, redirectURI, loginHint }) {
      const _scopes = options.disableDefaultScope ? [] : ["email", "public_profile"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: "facebook",
        options,
        authorizationEndpoint: "https://www.facebook.com/v21.0/dialog/oauth",
        scopes: _scopes,
        state,
        redirectURI,
        loginHint,
        additionalParams: options.configId ? {
          config_id: options.configId
        } : {}
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://graph.facebook.com/oauth/access_token"
      });
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      if (token.split(".").length === 3) {
        try {
          const { payload: jwtClaims } = await jwtVerify(
            token,
            createRemoteJWKSet(
              // https://developers.facebook.com/docs/facebook-login/limited-login/token/#jwks
              new URL(
                "https://limited.facebook.com/.well-known/oauth/openid/jwks/"
              )
            ),
            {
              algorithms: ["RS256"],
              audience: options.clientId,
              issuer: "https://www.facebook.com"
            }
          );
          if (nonce && jwtClaims.nonce !== nonce) {
            return false;
          }
          return !!jwtClaims;
        } catch (error2) {
          return false;
        }
      }
      return true;
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://graph.facebook.com/v18.0/oauth/access_token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (token.idToken && token.idToken.split(".").length === 3) {
        const profile2 = decodeJwt(token.idToken);
        const user = {
          id: profile2.sub,
          name: profile2.name,
          email: profile2.email,
          picture: {
            data: {
              url: profile2.picture,
              height: 100,
              width: 100,
              is_silhouette: false
            }
          }
        };
        const userMap2 = await options.mapProfileToUser?.({
          ...user,
          email_verified: true
        });
        return {
          user: {
            ...user,
            emailVerified: true,
            ...userMap2
          },
          data: profile2
        };
      }
      const fields = [
        "id",
        "name",
        "email",
        "picture",
        ...options?.fields || []
      ];
      const { data: profile, error: error2 } = await betterFetch(
        "https://graph.facebook.com/me?fields=" + fields.join(","),
        {
          auth: {
            type: "Bearer",
            token: token.accessToken
          }
        }
      );
      if (error2) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture.data.url,
          emailVerified: profile.email_verified,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const figma = (options) => {
  return {
    id: "figma",
    name: "Figma",
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      if (!options.clientId || !options.clientSecret) {
        logger.error(
          "Client Id and Client Secret are required for Figma. Make sure to provide them in the options."
        );
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) {
        throw new BetterAuthError("codeVerifier is required for Figma");
      }
      const _scopes = options.disableDefaultScope ? [] : ["file_read"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      const url = await createAuthorizationURL({
        id: "figma",
        options,
        authorizationEndpoint: "https://www.figma.com/oauth",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI
      });
      return url;
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://www.figma.com/api/oauth/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://www.figma.com/api/oauth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      try {
        const { data: profile } = await betterFetch(
          "https://api.figma.com/v1/me",
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`
            }
          }
        );
        if (!profile) {
          logger.error("Failed to fetch user from Figma");
          return null;
        }
        const userMap = await options.mapProfileToUser?.(profile);
        return {
          user: {
            id: profile.id,
            name: profile.handle,
            email: profile.email,
            image: profile.img_url,
            emailVerified: !!profile.email,
            ...userMap
          },
          data: profile
        };
      } catch (error2) {
        logger.error("Failed to fetch user info from Figma:", error2);
        return null;
      }
    },
    options
  };
};
const github = (options) => {
  const tokenEndpoint = "https://github.com/login/oauth/access_token";
  return {
    id: "github",
    name: "GitHub",
    createAuthorizationURL({ state, scopes, loginHint, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["read:user", "user:email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "github",
        options,
        authorizationEndpoint: "https://github.com/login/oauth/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        loginHint,
        prompt: options.prompt
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://github.com/login/oauth/access_token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://api.github.com/user",
        {
          headers: {
            "User-Agent": "better-auth",
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2) {
        return null;
      }
      const { data: emails } = await betterFetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "User-Agent": "better-auth"
        }
      });
      if (!profile.email && emails) {
        profile.email = (emails.find((e) => e.primary) ?? emails[0])?.email;
      }
      const emailVerified = emails?.find((e) => e.email === profile.email)?.verified ?? false;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          emailVerified,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const google = (options) => {
  return {
    id: "google",
    name: "Google",
    async createAuthorizationURL({
      state,
      scopes,
      codeVerifier,
      redirectURI,
      loginHint,
      display
    }) {
      if (!options.clientId || !options.clientSecret) {
        logger.error(
          "Client Id and Client Secret is required for Google. Make sure to provide them in the options."
        );
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) {
        throw new BetterAuthError("codeVerifier is required for Google");
      }
      const _scopes = options.disableDefaultScope ? [] : ["email", "profile", "openid"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      const url = await createAuthorizationURL({
        id: "google",
        options,
        authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        prompt: options.prompt,
        accessType: options.accessType,
        display: display || options.display,
        loginHint,
        hd: options.hd,
        additionalParams: {
          include_granted_scopes: "true"
        }
      });
      return url;
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://oauth2.googleapis.com/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token"
      });
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      const googlePublicKeyUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;
      const { data: tokenInfo } = await betterFetch(googlePublicKeyUrl);
      if (!tokenInfo) {
        return false;
      }
      const isValid = tokenInfo.aud === options.clientId && (tokenInfo.iss === "https://accounts.google.com" || tokenInfo.iss === "accounts.google.com");
      return isValid;
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (!token.idToken) {
        return null;
      }
      const user = decodeJwt(token.idToken);
      const userMap = await options.mapProfileToUser?.(user);
      return {
        user: {
          id: user.sub,
          name: user.name,
          email: user.email,
          image: user.picture,
          emailVerified: user.email_verified,
          ...userMap
        },
        data: user
      };
    },
    options
  };
};
const kick = (options) => {
  return {
    id: "kick",
    name: "Kick",
    createAuthorizationURL({ state, scopes, redirectURI, codeVerifier }) {
      const _scopes = options.disableDefaultScope ? [] : ["user:read"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "kick",
        redirectURI,
        options,
        authorizationEndpoint: "https://id.kick.com/oauth/authorize",
        scopes: _scopes,
        codeVerifier,
        state
      });
    },
    async validateAuthorizationCode({ code, redirectURI, codeVerifier }) {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://id.kick.com/oauth/token",
        codeVerifier
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data, error: error2 } = await betterFetch("https://api.kick.com/public/v1/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        }
      });
      if (error2) {
        return null;
      }
      const profile = data.data[0];
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.user_id,
          name: profile.name,
          email: profile.email,
          image: profile.profile_picture,
          emailVerified: true,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const huggingface = (options) => {
  return {
    id: "huggingface",
    name: "Hugging Face",
    createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "huggingface",
        options,
        authorizationEndpoint: "https://huggingface.co/oauth/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://huggingface.co/oauth/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://huggingface.co/oauth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://huggingface.co/oauth/userinfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.sub,
          name: profile.name || profile.preferred_username,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified ?? false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const microsoft = (options) => {
  const tenant = options.tenantId || "common";
  const authority = options.authority || "https://login.microsoftonline.com";
  const authorizationEndpoint = `${authority}/${tenant}/oauth2/v2.0/authorize`;
  const tokenEndpoint = `${authority}/${tenant}/oauth2/v2.0/token`;
  return {
    id: "microsoft",
    name: "Microsoft EntraID",
    createAuthorizationURL(data) {
      const scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email", "User.Read", "offline_access"];
      options.scope && scopes.push(...options.scope);
      data.scopes && scopes.push(...data.scopes);
      return createAuthorizationURL({
        id: "microsoft",
        options,
        authorizationEndpoint,
        state: data.state,
        codeVerifier: data.codeVerifier,
        scopes,
        redirectURI: data.redirectURI,
        prompt: options.prompt,
        loginHint: data.loginHint
      });
    },
    validateAuthorizationCode({ code, codeVerifier, redirectURI }) {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (!token.idToken) {
        return null;
      }
      const user = decodeJwt(token.idToken);
      const profilePhotoSize = options.profilePhotoSize || 48;
      await betterFetch(
        `https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          },
          async onResponse(context) {
            if (options.disableProfilePhoto || !context.response.ok) {
              return;
            }
            try {
              const response = context.response.clone();
              const pictureBuffer = await response.arrayBuffer();
              const pictureBase64 = base64.encode(pictureBuffer);
              user.picture = `data:image/jpeg;base64, ${pictureBase64}`;
            } catch (e) {
              logger.error(
                e && typeof e === "object" && "name" in e ? e.name : "",
                e
              );
            }
          }
        }
      );
      const userMap = await options.mapProfileToUser?.(user);
      return {
        user: {
          id: user.sub,
          name: user.name,
          email: user.email,
          image: user.picture,
          emailVerified: true,
          ...userMap
        },
        data: user
      };
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      const scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email", "User.Read", "offline_access"];
      options.scope && scopes.push(...options.scope);
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        extraParams: {
          scope: scopes.join(" ")
          // Include the scopes in request to microsoft
        },
        tokenEndpoint
      });
    },
    options
  };
};
const slack = (options) => {
  return {
    id: "slack",
    name: "Slack",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email"];
      scopes && _scopes.push(...scopes);
      options.scope && _scopes.push(...options.scope);
      const url = new URL("https://slack.com/openid/connect/authorize");
      url.searchParams.set("scope", _scopes.join(" "));
      url.searchParams.set("response_type", "code");
      url.searchParams.set("client_id", options.clientId);
      url.searchParams.set("redirect_uri", options.redirectURI || redirectURI);
      url.searchParams.set("state", state);
      return url;
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://slack.com/api/openid.connect.token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://slack.com/api/openid.connect.token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://slack.com/api/openid.connect.userInfo",
        {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile["https://slack.com/user_id"],
          name: profile.name || "",
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture || profile["https://slack.com/user_image_512"],
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const notion = (options) => {
  const tokenEndpoint = "https://api.notion.com/v1/oauth/token";
  return {
    id: "notion",
    name: "Notion",
    createAuthorizationURL({ state, scopes, loginHint, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : [];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "notion",
        options,
        authorizationEndpoint: "https://api.notion.com/v1/oauth/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        loginHint,
        additionalParams: {
          owner: "user"
        }
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint,
        authentication: "basic"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch("https://api.notion.com/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "Notion-Version": "2022-06-28"
        }
      });
      if (error2 || !profile) {
        return null;
      }
      const userProfile = profile.bot?.owner?.user;
      if (!userProfile) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(userProfile);
      return {
        user: {
          id: userProfile.id,
          name: userProfile.name || "Notion User",
          email: userProfile.person?.email || null,
          image: userProfile.avatar_url,
          emailVerified: !!userProfile.person?.email,
          ...userMap
        },
        data: userProfile
      };
    },
    options
  };
};
const spotify = (options) => {
  return {
    id: "spotify",
    name: "Spotify",
    createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["user-read-email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "spotify",
        options,
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://accounts.spotify.com/api/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://accounts.spotify.com/api/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://api.spotify.com/v1/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images[0]?.url,
          emailVerified: false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const twitch = (options) => {
  return {
    id: "twitch",
    name: "Twitch",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["user:read:email", "openid"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "twitch",
        redirectURI,
        options,
        authorizationEndpoint: "https://id.twitch.tv/oauth2/authorize",
        scopes: _scopes,
        state,
        claims: options.claims || [
          "email",
          "email_verified",
          "preferred_username",
          "picture"
        ]
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://id.twitch.tv/oauth2/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://id.twitch.tv/oauth2/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const idToken = token.idToken;
      if (!idToken) {
        logger.error("No idToken found in token");
        return null;
      }
      const profile = decodeJwt(idToken);
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.sub,
          name: profile.preferred_username,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const twitter = (options) => {
  return {
    id: "twitter",
    name: "Twitter",
    createAuthorizationURL(data) {
      const _scopes = options.disableDefaultScope ? [] : ["users.read", "tweet.read", "offline.access", "users.email"];
      options.scope && _scopes.push(...options.scope);
      data.scopes && _scopes.push(...data.scopes);
      return createAuthorizationURL({
        id: "twitter",
        options,
        authorizationEndpoint: "https://x.com/i/oauth2/authorize",
        scopes: _scopes,
        state: data.state,
        codeVerifier: data.codeVerifier,
        redirectURI: data.redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        authentication: "basic",
        redirectURI,
        options,
        tokenEndpoint: "https://api.x.com/2/oauth2/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        authentication: "basic",
        tokenEndpoint: "https://api.x.com/2/oauth2/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: profileError } = await betterFetch(
        "https://api.x.com/2/users/me?user.fields=profile_image_url",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (profileError) {
        return null;
      }
      const { data: emailData, error: emailError } = await betterFetch("https://api.x.com/2/users/me?user.fields=confirmed_email", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        }
      });
      let emailVerified = false;
      if (!emailError && emailData?.data?.confirmed_email) {
        profile.data.email = emailData.data.confirmed_email;
        emailVerified = true;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.data.id,
          name: profile.data.name,
          email: profile.data.email || profile.data.username || null,
          image: profile.data.profile_image_url,
          emailVerified,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const dropbox = (options) => {
  const tokenEndpoint = "https://api.dropboxapi.com/oauth2/token";
  return {
    id: "dropbox",
    name: "Dropbox",
    createAuthorizationURL: async ({
      state,
      scopes,
      codeVerifier,
      redirectURI
    }) => {
      const _scopes = options.disableDefaultScope ? [] : ["account_info.read"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      const additionalParams = {};
      if (options.accessType) {
        additionalParams.token_access_type = options.accessType;
      }
      return await createAuthorizationURL({
        id: "dropbox",
        options,
        authorizationEndpoint: "https://www.dropbox.com/oauth2/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        codeVerifier,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return await validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://api.dropbox.com/oauth2/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://api.dropboxapi.com/2/users/get_current_account",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.account_id,
          name: profile.name?.display_name,
          email: profile.email,
          emailVerified: profile.email_verified || false,
          image: profile.profile_photo_url,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const linear = (options) => {
  const tokenEndpoint = "https://api.linear.app/oauth/token";
  return {
    id: "linear",
    name: "Linear",
    createAuthorizationURL({ state, scopes, loginHint, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["read"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "linear",
        options,
        authorizationEndpoint: "https://linear.app/oauth/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        loginHint
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://api.linear.app/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`
          },
          body: JSON.stringify({
            query: `
							query {
								viewer {
									id
									name
									email
									avatarUrl
									active
									createdAt
									updatedAt
								}
							}
						`
          })
        }
      );
      if (error2 || !profile?.data?.viewer) {
        return null;
      }
      const userData = profile.data.viewer;
      const userMap = await options.mapProfileToUser?.(userData);
      return {
        user: {
          id: profile.data.viewer.id,
          name: profile.data.viewer.name,
          email: profile.data.viewer.email,
          image: profile.data.viewer.avatarUrl,
          emailVerified: true,
          ...userMap
        },
        data: userData
      };
    },
    options
  };
};
const linkedin = (options) => {
  const authorizationEndpoint = "https://www.linkedin.com/oauth/v2/authorization";
  const tokenEndpoint = "https://www.linkedin.com/oauth/v2/accessToken";
  return {
    id: "linkedin",
    name: "Linkedin",
    createAuthorizationURL: async ({
      state,
      scopes,
      redirectURI,
      loginHint
    }) => {
      const _scopes = options.disableDefaultScope ? [] : ["profile", "email", "openid"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: "linkedin",
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        loginHint,
        redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return await validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://api.linkedin.com/v2/userinfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified || false,
          image: profile.picture,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const cleanDoubleSlashes = (input = "") => {
  return input.split("://").map((str) => str.replace(/\/{2,}/g, "/")).join("://");
};
const issuerToEndpoints = (issuer) => {
  let baseUrl = issuer || "https://gitlab.com";
  return {
    authorizationEndpoint: cleanDoubleSlashes(`${baseUrl}/oauth/authorize`),
    tokenEndpoint: cleanDoubleSlashes(`${baseUrl}/oauth/token`),
    userinfoEndpoint: cleanDoubleSlashes(`${baseUrl}/api/v4/user`)
  };
};
const gitlab = (options) => {
  const { authorizationEndpoint, tokenEndpoint, userinfoEndpoint } = issuerToEndpoints(options.issuer);
  const issuerId = "gitlab";
  const issuerName = "Gitlab";
  return {
    id: issuerId,
    name: issuerName,
    createAuthorizationURL: async ({
      state,
      scopes,
      codeVerifier,
      loginHint,
      redirectURI
    }) => {
      const _scopes = options.disableDefaultScope ? [] : ["read_user"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: issuerId,
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        redirectURI,
        codeVerifier,
        loginHint
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI, codeVerifier }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        codeVerifier,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://gitlab.com/oauth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        userinfoEndpoint,
        { headers: { authorization: `Bearer ${token.accessToken}` } }
      );
      if (error2 || profile.state !== "active" || profile.locked) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.name ?? profile.username,
          email: profile.email,
          image: profile.avatar_url,
          emailVerified: true,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const tiktok = (options) => {
  return {
    id: "tiktok",
    name: "TikTok",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["user.info.profile"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return new URL(
        `https://www.tiktok.com/v2/auth/authorize?scope=${_scopes.join(
          ","
        )}&response_type=code&client_key=${options.clientKey}&redirect_uri=${encodeURIComponent(
          options.redirectURI || redirectURI
        )}&state=${state}`
      );
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI: options.redirectURI || redirectURI,
        options: {
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://open.tiktokapis.com/v2/oauth/token/"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://open.tiktokapis.com/v2/oauth/token/",
        authentication: "post",
        extraParams: {
          client_key: options.clientKey
        }
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const fields = [
        "open_id",
        "avatar_large_url",
        "display_name",
        "username"
      ];
      const { data: profile, error: error2 } = await betterFetch(
        `https://open.tiktokapis.com/v2/user/info/?fields=${fields.join(",")}`,
        {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2) {
        return null;
      }
      return {
        user: {
          email: profile.data.user.email || profile.data.user.username,
          id: profile.data.user.open_id,
          name: profile.data.user.display_name || profile.data.user.username,
          image: profile.data.user.avatar_large_url,
          /** @note Tiktok does not provide emailVerified or even email*/
          emailVerified: profile.data.user.email ? true : false
        },
        data: profile
      };
    },
    options
  };
};
const reddit = (options) => {
  return {
    id: "reddit",
    name: "Reddit",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["identity"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "reddit",
        options,
        authorizationEndpoint: "https://www.reddit.com/api/v1/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        duration: options.duration
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: options.redirectURI || redirectURI
      });
      const headers = {
        "content-type": "application/x-www-form-urlencoded",
        accept: "text/plain",
        "user-agent": "better-auth",
        Authorization: `Basic ${base64.encode(
          `${options.clientId}:${options.clientSecret}`
        )}`
      };
      const { data, error: error2 } = await betterFetch(
        "https://www.reddit.com/api/v1/access_token",
        {
          method: "POST",
          headers,
          body: body.toString()
        }
      );
      if (error2) {
        throw error2;
      }
      return getOAuth2Tokens(data);
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        authentication: "basic",
        tokenEndpoint: "https://www.reddit.com/api/v1/access_token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://oauth.reddit.com/api/v1/me",
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "User-Agent": "better-auth"
          }
        }
      );
      if (error2) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.name,
          email: profile.oauth_client_id,
          emailVerified: profile.has_verified_email,
          image: profile.icon_img?.split("?")[0],
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const roblox = (options) => {
  return {
    id: "roblox",
    name: "Roblox",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["openid", "profile"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return new URL(
        `https://apis.roblox.com/oauth/v1/authorize?scope=${_scopes.join(
          "+"
        )}&response_type=code&client_id=${options.clientId}&redirect_uri=${encodeURIComponent(
          options.redirectURI || redirectURI
        )}&state=${state}&prompt=${options.prompt || "select_account consent"}`
      );
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI: options.redirectURI || redirectURI,
        options,
        tokenEndpoint: "https://apis.roblox.com/oauth/v1/token",
        authentication: "post"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://apis.roblox.com/oauth/v1/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://apis.roblox.com/oauth/v1/userinfo",
        {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.sub,
          name: profile.nickname || profile.preferred_username || "",
          image: profile.picture,
          email: profile.preferred_username || null,
          // Roblox does not provide email
          emailVerified: true,
          ...userMap
        },
        data: {
          ...profile
        }
      };
    },
    options
  };
};
const salesforce = (options) => {
  const environment = options.environment ?? "production";
  const isSandbox = environment === "sandbox";
  const authorizationEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/authorize` : isSandbox ? "https://test.salesforce.com/services/oauth2/authorize" : "https://login.salesforce.com/services/oauth2/authorize";
  const tokenEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/token` : isSandbox ? "https://test.salesforce.com/services/oauth2/token" : "https://login.salesforce.com/services/oauth2/token";
  const userInfoEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/userinfo` : isSandbox ? "https://test.salesforce.com/services/oauth2/userinfo" : "https://login.salesforce.com/services/oauth2/userinfo";
  return {
    id: "salesforce",
    name: "Salesforce",
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      if (!options.clientId || !options.clientSecret) {
        logger.error(
          "Client Id and Client Secret are required for Salesforce. Make sure to provide them in the options."
        );
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) {
        throw new BetterAuthError("codeVerifier is required for Salesforce");
      }
      const _scopes = options.disableDefaultScope ? [] : ["openid", "email", "profile"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "salesforce",
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI: options.redirectURI || redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI: options.redirectURI || redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      try {
        const { data: user } = await betterFetch(
          userInfoEndpoint,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`
            }
          }
        );
        if (!user) {
          logger.error("Failed to fetch user info from Salesforce");
          return null;
        }
        const userMap = await options.mapProfileToUser?.(user);
        return {
          user: {
            id: user.user_id,
            name: user.name,
            email: user.email,
            image: user.photos?.picture || user.photos?.thumbnail,
            emailVerified: user.email_verified ?? false,
            ...userMap
          },
          data: user
        };
      } catch (error2) {
        logger.error("Failed to fetch user info from Salesforce:", error2);
        return null;
      }
    },
    options
  };
};
const vk = (options) => {
  return {
    id: "vk",
    name: "VK",
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["email", "phone"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      const authorizationEndpoint = "https://id.vk.com/authorize";
      return createAuthorizationURL({
        id: "vk",
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        redirectURI,
        codeVerifier
      });
    },
    validateAuthorizationCode: async ({
      code,
      codeVerifier,
      redirectURI,
      deviceId
    }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI: options.redirectURI || redirectURI,
        options,
        deviceId,
        tokenEndpoint: "https://id.vk.com/oauth2/auth"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://id.vk.com/oauth2/auth"
      });
    },
    async getUserInfo(data) {
      if (options.getUserInfo) {
        return options.getUserInfo(data);
      }
      if (!data.accessToken) {
        return null;
      }
      const formBody = new URLSearchParams({
        access_token: data.accessToken,
        client_id: options.clientId
      }).toString();
      const { data: profile, error: error2 } = await betterFetch(
        "https://id.vk.com/oauth2/user_info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formBody
        }
      );
      if (error2) {
        return null;
      }
      if (!profile.user.email) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.user.user_id,
          first_name: profile.user.first_name,
          last_name: profile.user.last_name,
          email: profile.user.email,
          image: profile.user.avatar,
          /** @note VK does not provide emailVerified*/
          emailVerified: !!profile.user.email,
          birthday: profile.user.birthday,
          sex: profile.user.sex,
          name: `${profile.user.first_name} ${profile.user.last_name}`,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const zoom = (userOptions) => {
  const options = {
    pkce: true,
    ...userOptions
  };
  return {
    id: "zoom",
    name: "Zoom",
    createAuthorizationURL: async ({ state, redirectURI, codeVerifier }) => {
      const params = new URLSearchParams({
        response_type: "code",
        redirect_uri: options.redirectURI ? options.redirectURI : redirectURI,
        client_id: options.clientId,
        state
      });
      if (options.pkce) {
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        params.set("code_challenge_method", "S256");
        params.set("code_challenge", codeChallenge);
      }
      const url = new URL("https://zoom.us/oauth/authorize");
      url.search = params.toString();
      return url;
    },
    validateAuthorizationCode: async ({ code, redirectURI, codeVerifier }) => {
      return validateAuthorizationCode({
        code,
        redirectURI: options.redirectURI || redirectURI,
        codeVerifier,
        options,
        tokenEndpoint: "https://zoom.us/oauth/token",
        authentication: "post"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://api.zoom.us/v2/users/me",
        {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.display_name,
          image: profile.pic_url,
          email: profile.email,
          emailVerified: Boolean(profile.verified),
          ...userMap
        },
        data: {
          ...profile
        }
      };
    }
  };
};
const kakao = (options) => {
  return {
    id: "kakao",
    name: "Kakao",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["account_email", "profile_image", "profile_nickname"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "kakao",
        options,
        authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
        scopes: _scopes,
        state,
        redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://kauth.kakao.com/oauth/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://kauth.kakao.com/oauth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://kapi.kakao.com/v2/user/me",
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2 || !profile) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      const account = profile.kakao_account || {};
      const kakaoProfile = account.profile || {};
      const user = {
        id: String(profile.id),
        name: kakaoProfile.nickname || account.name || void 0,
        email: account.email,
        image: kakaoProfile.profile_image_url || kakaoProfile.thumbnail_image_url,
        emailVerified: !!account.is_email_valid && !!account.is_email_verified,
        ...userMap
      };
      return {
        user,
        data: profile
      };
    },
    options
  };
};
const naver = (options) => {
  return {
    id: "naver",
    name: "Naver",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["profile", "email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return createAuthorizationURL({
        id: "naver",
        options,
        authorizationEndpoint: "https://nid.naver.com/oauth2.0/authorize",
        scopes: _scopes,
        state,
        redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://nid.naver.com/oauth2.0/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://nid.naver.com/oauth2.0/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: error2 } = await betterFetch(
        "https://openapi.naver.com/v1/nid/me",
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error2 || !profile || profile.resultcode !== "00") {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      const res = profile.response || {};
      const user = {
        id: res.id,
        name: res.name || res.nickname,
        email: res.email,
        image: res.profile_image,
        emailVerified: false,
        ...userMap
      };
      return {
        user,
        data: profile
      };
    },
    options
  };
};
const line = (options) => {
  const authorizationEndpoint = "https://access.line.me/oauth2/v2.1/authorize";
  const tokenEndpoint = "https://api.line.me/oauth2/v2.1/token";
  const userInfoEndpoint = "https://api.line.me/oauth2/v2.1/userinfo";
  const verifyIdTokenEndpoint = "https://api.line.me/oauth2/v2.1/verify";
  return {
    id: "line",
    name: "LINE",
    async createAuthorizationURL({
      state,
      scopes,
      codeVerifier,
      redirectURI,
      loginHint
    }) {
      const _scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return await createAuthorizationURL({
        id: "line",
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        loginHint
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      return refreshAccessToken({
        refreshToken: refreshToken2,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      const body = new URLSearchParams();
      body.set("id_token", token);
      body.set("client_id", options.clientId);
      if (nonce) body.set("nonce", nonce);
      const { data, error: error2 } = await betterFetch(
        verifyIdTokenEndpoint,
        {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          body
        }
      );
      if (error2 || !data) {
        return false;
      }
      if (data.aud !== options.clientId) return false;
      if (nonce && data.nonce && data.nonce !== nonce) return false;
      return true;
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      let profile = null;
      if (token.idToken) {
        try {
          profile = decodeJwt(token.idToken);
        } catch {
        }
      }
      if (!profile) {
        const { data } = await betterFetch(userInfoEndpoint, {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        });
        profile = data || null;
      }
      if (!profile) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      const id = profile.sub || profile.userId;
      const name = profile.name || profile.displayName;
      const image = profile.picture || profile.pictureUrl || void 0;
      const email = profile.email;
      return {
        user: {
          id,
          name,
          email,
          image,
          // LINE does not expose email verification status in ID token/userinfo
          emailVerified: false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};
const paypal = (options) => {
  const environment = options.environment || "sandbox";
  const isSandbox = environment === "sandbox";
  const authorizationEndpoint = isSandbox ? "https://www.sandbox.paypal.com/signin/authorize" : "https://www.paypal.com/signin/authorize";
  const tokenEndpoint = isSandbox ? "https://api-m.sandbox.paypal.com/v1/oauth2/token" : "https://api-m.paypal.com/v1/oauth2/token";
  const userInfoEndpoint = isSandbox ? "https://api-m.sandbox.paypal.com/v1/identity/oauth2/userinfo" : "https://api-m.paypal.com/v1/identity/oauth2/userinfo";
  return {
    id: "paypal",
    name: "PayPal",
    async createAuthorizationURL({ state, codeVerifier, redirectURI }) {
      if (!options.clientId || !options.clientSecret) {
        logger.error(
          "Client Id and Client Secret is required for PayPal. Make sure to provide them in the options."
        );
        throw new BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      const _scopes = [];
      const url = await createAuthorizationURL({
        id: "paypal",
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        prompt: options.prompt
      });
      return url;
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      const credentials = base64.encode(
        `${options.clientId}:${options.clientSecret}`
      );
      try {
        const response = await betterFetch(tokenEndpoint, {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
            Accept: "application/json",
            "Accept-Language": "en_US",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectURI
          }).toString()
        });
        if (!response.data) {
          throw new BetterAuthError("FAILED_TO_GET_ACCESS_TOKEN");
        }
        const data = response.data;
        const result = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          accessTokenExpiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1e3) : void 0,
          idToken: data.id_token
        };
        return result;
      } catch (error2) {
        logger.error("PayPal token exchange failed:", error2);
        throw new BetterAuthError("FAILED_TO_GET_ACCESS_TOKEN");
      }
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken2) => {
      const credentials = base64.encode(
        `${options.clientId}:${options.clientSecret}`
      );
      try {
        const response = await betterFetch(tokenEndpoint, {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
            Accept: "application/json",
            "Accept-Language": "en_US",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken2
          }).toString()
        });
        if (!response.data) {
          throw new BetterAuthError("FAILED_TO_REFRESH_ACCESS_TOKEN");
        }
        const data = response.data;
        return {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          accessTokenExpiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1e3) : void 0
        };
      } catch (error2) {
        logger.error("PayPal token refresh failed:", error2);
        throw new BetterAuthError("FAILED_TO_REFRESH_ACCESS_TOKEN");
      }
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      try {
        const payload = decodeJwt(token);
        return !!payload.sub;
      } catch (error2) {
        logger.error("Failed to verify PayPal ID token:", error2);
        return false;
      }
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (!token.accessToken) {
        logger.error("Access token is required to fetch PayPal user info");
        return null;
      }
      try {
        const response = await betterFetch(
          `${userInfoEndpoint}?schema=paypalv1.1`,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
              Accept: "application/json"
            }
          }
        );
        if (!response.data) {
          logger.error("Failed to fetch user info from PayPal");
          return null;
        }
        const userInfo = response.data;
        const userMap = await options.mapProfileToUser?.(userInfo);
        const result = {
          user: {
            id: userInfo.user_id,
            name: userInfo.name,
            email: userInfo.email,
            image: userInfo.picture,
            emailVerified: userInfo.email_verified,
            ...userMap
          },
          data: userInfo
        };
        return result;
      } catch (error2) {
        logger.error("Failed to fetch user info from PayPal:", error2);
        return null;
      }
    },
    options
  };
};
const socialProviders = {
  apple,
  atlassian,
  cognito,
  discord,
  facebook,
  figma,
  github,
  microsoft,
  google,
  huggingface,
  slack,
  spotify,
  twitch,
  twitter,
  dropbox,
  kick,
  linear,
  linkedin,
  gitlab,
  tiktok,
  reddit,
  roblox,
  salesforce,
  vk,
  zoom,
  notion,
  kakao,
  naver,
  line,
  paypal
};
const socialProviderList = Object.keys(socialProviders);
const SocialProviderListEnum = z.enum(socialProviderList).or(z.string());
const signInSocial = createAuthEndpoint(
  "/sign-in/social",
  {
    method: "POST",
    body: z.object({
      /**
       * Callback URL to redirect to after the user
       * has signed in.
       */
      callbackURL: z.string().meta({
        description: "Callback URL to redirect to after the user has signed in"
      }).optional(),
      /**
       * callback url to redirect if the user is newly registered.
       *
       * useful if you have different routes for existing users and new users
       */
      newUserCallbackURL: z.string().optional(),
      /**
       * Callback url to redirect to if an error happens
       *
       * If it's initiated from the client sdk this defaults to
       * the current url.
       */
      errorCallbackURL: z.string().meta({
        description: "Callback URL to redirect to if an error happens"
      }).optional(),
      /**
       * OAuth2 provider to use`
       */
      provider: SocialProviderListEnum,
      /**
       * Disable automatic redirection to the provider
       *
       * This is useful if you want to handle the redirection
       * yourself like in a popup or a different tab.
       */
      disableRedirect: z.boolean().meta({
        description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself"
      }).optional(),
      /**
       * ID token from the provider
       *
       * This is used to sign in the user
       * if the user is already signed in with the
       * provider in the frontend.
       *
       * Only applicable if the provider supports
       * it. Currently only `apple` and `google` is
       * supported out of the box.
       */
      idToken: z.optional(
        z.object({
          /**
           * ID token from the provider
           */
          token: z.string().meta({
            description: "ID token from the provider"
          }),
          /**
           * The nonce used to generate the token
           */
          nonce: z.string().meta({
            description: "Nonce used to generate the token"
          }).optional(),
          /**
           * Access token from the provider
           */
          accessToken: z.string().meta({
            description: "Access token from the provider"
          }).optional(),
          /**
           * Refresh token from the provider
           */
          refreshToken: z.string().meta({
            description: "Refresh token from the provider"
          }).optional(),
          /**
           * Expiry date of the token
           */
          expiresAt: z.number().meta({
            description: "Expiry date of the token"
          }).optional()
        })
      ),
      scopes: z.array(z.string()).meta({
        description: "Array of scopes to request from the provider. This will override the default scopes passed."
      }).optional(),
      /**
       * Explicitly request sign-up
       *
       * Should be used to allow sign up when
       * disableImplicitSignUp for this provider is
       * true
       */
      requestSignUp: z.boolean().meta({
        description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider"
      }).optional(),
      /**
       * The login hint to use for the authorization code request
       */
      loginHint: z.string().meta({
        description: "The login hint to use for the authorization code request"
      }).optional()
    }),
    metadata: {
      openapi: {
        description: "Sign in with a social provider",
        operationId: "socialSignIn",
        responses: {
          "200": {
            description: "Success - Returns either session details or redirect URL",
            content: {
              "application/json": {
                schema: {
                  // todo: we need support for multiple schema
                  type: "object",
                  description: "Session response when idToken is provided",
                  properties: {
                    redirect: {
                      type: "boolean",
                      enum: [false]
                    },
                    token: {
                      type: "string",
                      description: "Session token",
                      url: {
                        type: "null",
                        nullable: true
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          email: { type: "string" },
                          name: {
                            type: "string",
                            nullable: true
                          },
                          image: {
                            type: "string",
                            nullable: true
                          },
                          emailVerified: {
                            type: "boolean"
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time"
                          },
                          updatedAt: {
                            type: "string",
                            format: "date-time"
                          }
                        },
                        required: [
                          "id",
                          "email",
                          "emailVerified",
                          "createdAt",
                          "updatedAt"
                        ]
                      }
                    }
                  },
                  required: ["redirect", "token", "user"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (c) => {
    const provider = c.context.socialProviders.find(
      (p) => p.id === c.body.provider
    );
    if (!provider) {
      c.context.logger.error(
        "Provider not found. Make sure to add the provider in your auth config",
        {
          provider: c.body.provider
        }
      );
      throw new APIError("NOT_FOUND", {
        message: BASE_ERROR_CODES.PROVIDER_NOT_FOUND
      });
    }
    if (c.body.idToken) {
      if (!provider.verifyIdToken) {
        c.context.logger.error(
          "Provider does not support id token verification",
          {
            provider: c.body.provider
          }
        );
        throw new APIError("NOT_FOUND", {
          message: BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED
        });
      }
      const { token, nonce } = c.body.idToken;
      const valid = await provider.verifyIdToken(token, nonce);
      if (!valid) {
        c.context.logger.error("Invalid id token", {
          provider: c.body.provider
        });
        throw new APIError("UNAUTHORIZED", {
          message: BASE_ERROR_CODES.INVALID_TOKEN
        });
      }
      const userInfo = await provider.getUserInfo({
        idToken: token,
        accessToken: c.body.idToken.accessToken,
        refreshToken: c.body.idToken.refreshToken
      });
      if (!userInfo || !userInfo?.user) {
        c.context.logger.error("Failed to get user info", {
          provider: c.body.provider
        });
        throw new APIError("UNAUTHORIZED", {
          message: BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO
        });
      }
      if (!userInfo.user.email) {
        c.context.logger.error("User email not found", {
          provider: c.body.provider
        });
        throw new APIError("UNAUTHORIZED", {
          message: BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND
        });
      }
      const data = await handleOAuthUserInfo(c, {
        userInfo: {
          ...userInfo.user,
          email: userInfo.user.email,
          id: String(userInfo.user.id),
          name: userInfo.user.name || "",
          image: userInfo.user.image,
          emailVerified: userInfo.user.emailVerified || false
        },
        account: {
          providerId: provider.id,
          accountId: String(userInfo.user.id),
          accessToken: c.body.idToken.accessToken
        },
        callbackURL: c.body.callbackURL,
        disableSignUp: provider.disableImplicitSignUp && !c.body.requestSignUp || provider.disableSignUp
      });
      if (data.error) {
        throw new APIError("UNAUTHORIZED", {
          message: data.error
        });
      }
      await setSessionCookie(c, data.data);
      return c.json({
        redirect: false,
        token: data.data.session.token,
        url: void 0,
        user: {
          id: data.data.user.id,
          email: data.data.user.email,
          name: data.data.user.name,
          image: data.data.user.image,
          emailVerified: data.data.user.emailVerified,
          createdAt: data.data.user.createdAt,
          updatedAt: data.data.user.updatedAt
        }
      });
    }
    const { codeVerifier, state } = await generateState(c);
    const url = await provider.createAuthorizationURL({
      state,
      codeVerifier,
      redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
      scopes: c.body.scopes,
      loginHint: c.body.loginHint
    });
    return c.json({
      url: url.toString(),
      redirect: !c.body.disableRedirect
    });
  }
);
const signInEmail = createAuthEndpoint(
  "/sign-in/email",
  {
    method: "POST",
    body: z.object({
      /**
       * Email of the user
       */
      email: z.string().meta({
        description: "Email of the user"
      }),
      /**
       * Password of the user
       */
      password: z.string().meta({
        description: "Password of the user"
      }),
      /**
       * Callback URL to use as a redirect for email
       * verification and for possible redirects
       */
      callbackURL: z.string().meta({
        description: "Callback URL to use as a redirect for email verification"
      }).optional(),
      /**
       * If this is false, the session will not be remembered
       * @default true
       */
      rememberMe: z.boolean().meta({
        description: "If this is false, the session will not be remembered. Default is `true`."
      }).default(true).optional()
    }),
    metadata: {
      openapi: {
        description: "Sign in with email and password",
        responses: {
          "200": {
            description: "Success - Returns either session details or redirect URL",
            content: {
              "application/json": {
                schema: {
                  // todo: we need support for multiple schema
                  type: "object",
                  description: "Session response when idToken is provided",
                  properties: {
                    redirect: {
                      type: "boolean",
                      enum: [false]
                    },
                    token: {
                      type: "string",
                      description: "Session token"
                    },
                    url: {
                      type: "null",
                      nullable: true
                    },
                    user: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        email: { type: "string" },
                        name: {
                          type: "string",
                          nullable: true
                        },
                        image: {
                          type: "string",
                          nullable: true
                        },
                        emailVerified: {
                          type: "boolean"
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time"
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time"
                        }
                      },
                      required: [
                        "id",
                        "email",
                        "emailVerified",
                        "createdAt",
                        "updatedAt"
                      ]
                    }
                  },
                  required: ["redirect", "token", "user"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    if (!ctx.context.options?.emailAndPassword?.enabled) {
      ctx.context.logger.error(
        "Email and password is not enabled. Make sure to enable it in the options on you `auth.ts` file. Check `https://better-auth.com/docs/authentication/email-password` for more!"
      );
      throw new APIError("BAD_REQUEST", {
        message: "Email and password is not enabled"
      });
    }
    const { email, password } = ctx.body;
    const isValidEmail = z.string().email().safeParse(email);
    if (!isValidEmail.success) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.INVALID_EMAIL
      });
    }
    const user = await ctx.context.internalAdapter.findUserByEmail(email, {
      includeAccounts: true
    });
    if (!user) {
      await ctx.context.password.hash(password);
      ctx.context.logger.error("User not found", { email });
      throw new APIError("UNAUTHORIZED", {
        message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD
      });
    }
    const credentialAccount = user.accounts.find(
      (a) => a.providerId === "credential"
    );
    if (!credentialAccount) {
      ctx.context.logger.error("Credential account not found", { email });
      throw new APIError("UNAUTHORIZED", {
        message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD
      });
    }
    const currentPassword = credentialAccount?.password;
    if (!currentPassword) {
      ctx.context.logger.error("Password not found", { email });
      throw new APIError("UNAUTHORIZED", {
        message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD
      });
    }
    const validPassword = await ctx.context.password.verify({
      hash: currentPassword,
      password
    });
    if (!validPassword) {
      ctx.context.logger.error("Invalid password");
      throw new APIError("UNAUTHORIZED", {
        message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD
      });
    }
    if (ctx.context.options?.emailAndPassword?.requireEmailVerification && !user.user.emailVerified) {
      if (!ctx.context.options?.emailVerification?.sendVerificationEmail) {
        throw new APIError("FORBIDDEN", {
          message: BASE_ERROR_CODES.EMAIL_NOT_VERIFIED
        });
      }
      if (ctx.context.options?.emailVerification?.sendOnSignIn) {
        const token = await createEmailVerificationToken(
          ctx.context.secret,
          user.user.email,
          void 0,
          ctx.context.options.emailVerification?.expiresIn
        );
        const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
        await ctx.context.options.emailVerification.sendVerificationEmail(
          {
            user: user.user,
            url,
            token
          },
          ctx.request
        );
      }
      throw new APIError("FORBIDDEN", {
        message: BASE_ERROR_CODES.EMAIL_NOT_VERIFIED
      });
    }
    const session = await ctx.context.internalAdapter.createSession(
      user.user.id,
      ctx,
      ctx.body.rememberMe === false
    );
    if (!session) {
      ctx.context.logger.error("Failed to create session");
      throw new APIError("UNAUTHORIZED", {
        message: BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION
      });
    }
    await setSessionCookie(
      ctx,
      {
        session,
        user: user.user
      },
      ctx.body.rememberMe === false
    );
    return ctx.json({
      redirect: !!ctx.body.callbackURL,
      token: session.token,
      url: ctx.body.callbackURL,
      user: {
        id: user.user.id,
        email: user.user.email,
        name: user.user.name,
        image: user.user.image,
        emailVerified: user.user.emailVerified,
        createdAt: user.user.createdAt,
        updatedAt: user.user.updatedAt
      }
    });
  }
);
const schema = z.object({
  code: z.string().optional(),
  error: z.string().optional(),
  device_id: z.string().optional(),
  error_description: z.string().optional(),
  state: z.string().optional(),
  user: z.string().optional()
});
const callbackOAuth = createAuthEndpoint(
  "/callback/:id",
  {
    method: ["GET", "POST"],
    body: schema.optional(),
    query: schema.optional(),
    metadata: HIDE_METADATA
  },
  async (c) => {
    let queryOrBody;
    const defaultErrorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
    try {
      if (c.method === "GET") {
        queryOrBody = schema.parse(c.query);
      } else if (c.method === "POST") {
        queryOrBody = schema.parse(c.body);
      } else {
        throw new Error("Unsupported method");
      }
    } catch (e) {
      c.context.logger.error("INVALID_CALLBACK_REQUEST", e);
      throw c.redirect(`${defaultErrorURL}?error=invalid_callback_request`);
    }
    const { code, error: error2, state, error_description, device_id } = queryOrBody;
    if (!state) {
      c.context.logger.error("State not found", error2);
      const sep = defaultErrorURL.includes("?") ? "&" : "?";
      const url = `${defaultErrorURL}${sep}state=state_not_found`;
      throw c.redirect(url);
    }
    const {
      codeVerifier,
      callbackURL,
      link,
      errorURL,
      newUserURL,
      requestSignUp
    } = await parseState(c);
    function redirectOnError(error22, description) {
      const baseURL = errorURL ?? defaultErrorURL;
      const params = new URLSearchParams({ error: error22 });
      if (description) params.set("error_description", description);
      const sep = baseURL.includes("?") ? "&" : "?";
      const url = `${baseURL}${sep}${params.toString()}`;
      throw c.redirect(url);
    }
    if (error2) {
      redirectOnError(error2, error_description);
    }
    if (!code) {
      c.context.logger.error("Code not found");
      throw redirectOnError("no_code");
    }
    const provider = c.context.socialProviders.find(
      (p) => p.id === c.params.id
    );
    if (!provider) {
      c.context.logger.error(
        "Oauth provider with id",
        c.params.id,
        "not found"
      );
      throw redirectOnError("oauth_provider_not_found");
    }
    let tokens;
    try {
      tokens = await provider.validateAuthorizationCode({
        code,
        codeVerifier,
        deviceId: device_id,
        redirectURI: `${c.context.baseURL}/callback/${provider.id}`
      });
    } catch (e) {
      c.context.logger.error("", e);
      throw redirectOnError("invalid_code");
    }
    const userInfo = await provider.getUserInfo({
      ...tokens,
      user: c.body?.user ? safeJSONParse(c.body.user) : void 0
    }).then((res) => res?.user);
    if (!userInfo) {
      c.context.logger.error("Unable to get user info");
      return redirectOnError("unable_to_get_user_info");
    }
    if (!callbackURL) {
      c.context.logger.error("No callback URL found");
      throw redirectOnError("no_callback_url");
    }
    if (link) {
      const trustedProviders = c.context.options.account?.accountLinking?.trustedProviders;
      const isTrustedProvider = trustedProviders?.includes(
        provider.id
      );
      if (!isTrustedProvider && !userInfo.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
        c.context.logger.error("Unable to link account - untrusted provider");
        return redirectOnError("unable_to_link_account");
      }
      if (userInfo.email !== link.email && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) {
        return redirectOnError("email_doesn't_match");
      }
      const existingAccount = await c.context.internalAdapter.findAccount(
        String(userInfo.id)
      );
      if (existingAccount) {
        if (existingAccount.userId.toString() !== link.userId.toString()) {
          return redirectOnError("account_already_linked_to_different_user");
        }
        const updateData = Object.fromEntries(
          Object.entries({
            accessToken: await setTokenUtil(tokens.accessToken, c.context),
            refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
            idToken: tokens.idToken,
            accessTokenExpiresAt: tokens.accessTokenExpiresAt,
            refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
            scope: tokens.scopes?.join(",")
          }).filter(([_, value]) => value !== void 0)
        );
        await c.context.internalAdapter.updateAccount(
          existingAccount.id,
          updateData
        );
      } else {
        const newAccount = await c.context.internalAdapter.createAccount(
          {
            userId: link.userId,
            providerId: provider.id,
            accountId: String(userInfo.id),
            ...tokens,
            accessToken: await setTokenUtil(tokens.accessToken, c.context),
            refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
            scope: tokens.scopes?.join(",")
          },
          c
        );
        if (!newAccount) {
          return redirectOnError("unable_to_link_account");
        }
      }
      let toRedirectTo2;
      try {
        const url = callbackURL;
        toRedirectTo2 = url.toString();
      } catch {
        toRedirectTo2 = callbackURL;
      }
      throw c.redirect(toRedirectTo2);
    }
    if (!userInfo.email) {
      c.context.logger.error(
        "Provider did not return email. This could be due to misconfiguration in the provider settings."
      );
      return redirectOnError("email_not_found");
    }
    const result = await handleOAuthUserInfo(c, {
      userInfo: {
        ...userInfo,
        id: String(userInfo.id),
        email: userInfo.email,
        name: userInfo.name || userInfo.email
      },
      account: {
        providerId: provider.id,
        accountId: String(userInfo.id),
        ...tokens,
        scope: tokens.scopes?.join(",")
      },
      callbackURL,
      disableSignUp: provider.disableImplicitSignUp && !requestSignUp || provider.options?.disableSignUp,
      overrideUserInfo: provider.options?.overrideUserInfoOnSignIn
    });
    if (result.error) {
      c.context.logger.error(result.error.split(" ").join("_"));
      return redirectOnError(result.error.split(" ").join("_"));
    }
    const { session, user } = result.data;
    await setSessionCookie(c, {
      session,
      user
    });
    let toRedirectTo;
    try {
      const url = result.isRegister ? newUserURL || callbackURL : callbackURL;
      toRedirectTo = url.toString();
    } catch {
      toRedirectTo = result.isRegister ? newUserURL || callbackURL : callbackURL;
    }
    throw c.redirect(toRedirectTo);
  }
);
const signOut = createAuthEndpoint(
  "/sign-out",
  {
    method: "POST",
    requireHeaders: true,
    metadata: {
      openapi: {
        description: "Sign out the current user",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean"
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
    const sessionCookieToken = await ctx.getSignedCookie(
      ctx.context.authCookies.sessionToken.name,
      ctx.context.secret
    );
    if (!sessionCookieToken) {
      deleteSessionCookie(ctx);
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.FAILED_TO_GET_SESSION
      });
    }
    await ctx.context.internalAdapter.deleteSession(sessionCookieToken);
    deleteSessionCookie(ctx);
    return ctx.json({
      success: true
    });
  }
);
function redirectError(ctx, callbackURL, query) {
  const url = callbackURL ? new URL(callbackURL, ctx.baseURL) : new URL(`${ctx.baseURL}/error`);
  if (query)
    Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.href;
}
function redirectCallback(ctx, callbackURL, query) {
  const url = new URL(callbackURL, ctx.baseURL);
  if (query)
    Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.href;
}
const requestPasswordReset = createAuthEndpoint(
  "/request-password-reset",
  {
    method: "POST",
    body: z.object({
      /**
       * The email address of the user to send a password reset email to.
       */
      email: z.email().meta({
        description: "The email address of the user to send a password reset email to"
      }),
      /**
       * The URL to redirect the user to reset their password.
       * If the token isn't valid or expired, it'll be redirected with a query parameter `?
       * error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?
       * token=VALID_TOKEN
       */
      redirectTo: z.string().meta({
        description: "The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN"
      }).optional()
    }),
    metadata: {
      openapi: {
        description: "Send a password reset email to the user",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean"
                    },
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
    if (!ctx.context.options.emailAndPassword?.sendResetPassword) {
      ctx.context.logger.error(
        "Reset password isn't enabled.Please pass an emailAndPassword.sendResetPassword function in your auth config!"
      );
      throw new APIError("BAD_REQUEST", {
        message: "Reset password isn't enabled"
      });
    }
    const { email, redirectTo } = ctx.body;
    const user = await ctx.context.internalAdapter.findUserByEmail(email, {
      includeAccounts: true
    });
    if (!user) {
      ctx.context.logger.error("Reset Password: User not found", { email });
      return ctx.json({
        status: true,
        message: "If this email exists in our system, check your email for the reset link"
      });
    }
    const defaultExpiresIn = 60 * 60 * 1;
    const expiresAt = getDate(
      ctx.context.options.emailAndPassword.resetPasswordTokenExpiresIn || defaultExpiresIn,
      "sec"
    );
    const verificationToken = generateId(24);
    await ctx.context.internalAdapter.createVerificationValue(
      {
        value: user.user.id,
        identifier: `reset-password:${verificationToken}`,
        expiresAt
      },
      ctx
    );
    const callbackURL = redirectTo ? encodeURIComponent(redirectTo) : "";
    const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${callbackURL}`;
    await ctx.context.options.emailAndPassword.sendResetPassword(
      {
        user: user.user,
        url,
        token: verificationToken
      },
      ctx.request
    );
    return ctx.json({
      status: true
    });
  }
);
const forgetPassword = createAuthEndpoint(
  "/forget-password",
  {
    method: "POST",
    body: z.object({
      /**
       * The email address of the user to send a password reset email to.
       */
      email: z.string().email().meta({
        description: "The email address of the user to send a password reset email to"
      }),
      /**
       * The URL to redirect the user to reset their password.
       * If the token isn't valid or expired, it'll be redirected with a query parameter `?
       * error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?
       * token=VALID_TOKEN
       */
      redirectTo: z.string().meta({
        description: "The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN"
      }).optional()
    }),
    metadata: {
      openapi: {
        description: "Send a password reset email to the user",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean"
                    },
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
    if (!ctx.context.options.emailAndPassword?.sendResetPassword) {
      ctx.context.logger.error(
        "Reset password isn't enabled.Please pass an emailAndPassword.sendResetPassword function in your auth config!"
      );
      throw new APIError("BAD_REQUEST", {
        message: "Reset password isn't enabled"
      });
    }
    const { email, redirectTo } = ctx.body;
    const user = await ctx.context.internalAdapter.findUserByEmail(email, {
      includeAccounts: true
    });
    if (!user) {
      ctx.context.logger.error("Reset Password: User not found", { email });
      return ctx.json({
        status: true,
        message: "If this email exists in our system, check your email for the reset link"
      });
    }
    const defaultExpiresIn = 60 * 60 * 1;
    const expiresAt = getDate(
      ctx.context.options.emailAndPassword.resetPasswordTokenExpiresIn || defaultExpiresIn,
      "sec"
    );
    const verificationToken = generateId(24);
    await ctx.context.internalAdapter.createVerificationValue(
      {
        value: user.user.id,
        identifier: `reset-password:${verificationToken}`,
        expiresAt
      },
      ctx
    );
    const callbackURL = redirectTo ? encodeURIComponent(redirectTo) : "";
    const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${callbackURL}`;
    await ctx.context.options.emailAndPassword.sendResetPassword(
      {
        user: user.user,
        url,
        token: verificationToken
      },
      ctx.request
    );
    return ctx.json({
      status: true
    });
  }
);
const requestPasswordResetCallback = createAuthEndpoint(
  "/reset-password/:token",
  {
    method: "GET",
    query: z.object({
      callbackURL: z.string().meta({
        description: "The URL to redirect the user to reset their password"
      })
    }),
    use: [originCheck((ctx) => ctx.query.callbackURL)],
    metadata: {
      openapi: {
        description: "Redirects the user to the callback URL with the token",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
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
    const { token } = ctx.params;
    const { callbackURL } = ctx.query;
    if (!token || !callbackURL) {
      throw ctx.redirect(
        redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" })
      );
    }
    const verification = await ctx.context.internalAdapter.findVerificationValue(
      `reset-password:${token}`
    );
    if (!verification || verification.expiresAt < /* @__PURE__ */ new Date()) {
      throw ctx.redirect(
        redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" })
      );
    }
    throw ctx.redirect(redirectCallback(ctx.context, callbackURL, { token }));
  }
);
const forgetPasswordCallback = requestPasswordResetCallback;
const resetPassword = createAuthEndpoint(
  "/reset-password",
  {
    method: "POST",
    query: z.object({
      token: z.string().optional()
    }).optional(),
    body: z.object({
      newPassword: z.string().meta({
        description: "The new password to set"
      }),
      token: z.string().meta({
        description: "The token to reset the password"
      }).optional()
    }),
    metadata: {
      openapi: {
        description: "Reset the password for a user",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean"
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
    const token = ctx.body.token || ctx.query?.token;
    if (!token) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.INVALID_TOKEN
      });
    }
    const { newPassword } = ctx.body;
    const minLength = ctx.context.password?.config.minPasswordLength;
    const maxLength = ctx.context.password?.config.maxPasswordLength;
    if (newPassword.length < minLength) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT
      });
    }
    if (newPassword.length > maxLength) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.PASSWORD_TOO_LONG
      });
    }
    const id = `reset-password:${token}`;
    const verification = await ctx.context.internalAdapter.findVerificationValue(id);
    if (!verification || verification.expiresAt < /* @__PURE__ */ new Date()) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.INVALID_TOKEN
      });
    }
    const userId = verification.value;
    const hashedPassword = await ctx.context.password.hash(newPassword);
    const accounts = await ctx.context.internalAdapter.findAccounts(userId);
    const account = accounts.find((ac) => ac.providerId === "credential");
    if (!account) {
      await ctx.context.internalAdapter.createAccount(
        {
          userId,
          providerId: "credential",
          password: hashedPassword,
          accountId: userId
        },
        ctx
      );
    } else {
      await ctx.context.internalAdapter.updatePassword(
        userId,
        hashedPassword,
        ctx
      );
    }
    await ctx.context.internalAdapter.deleteVerificationValue(verification.id);
    if (ctx.context.options.emailAndPassword?.onPasswordReset) {
      const user = await ctx.context.internalAdapter.findUserById(userId);
      if (user) {
        await ctx.context.options.emailAndPassword.onPasswordReset(
          {
            user
          },
          ctx.request
        );
      }
    }
    if (ctx.context.options.emailAndPassword?.revokeSessionsOnPasswordReset) {
      await ctx.context.internalAdapter.deleteSessions(userId);
    }
    return ctx.json({
      status: true
    });
  }
);
const updateUser = () => createAuthEndpoint(
  "/update-user",
  {
    method: "POST",
    body: z.record(
      z.string().meta({
        description: "Field name must be a string"
      }),
      z.any()
    ),
    use: [sessionMiddleware],
    metadata: {
      $Infer: {
        body: {}
      },
      openapi: {
        description: "Update the current user",
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
                  image: {
                    type: "string",
                    description: "The image of the user"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      description: "Indicates if the update was successful"
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
    const body = ctx.body;
    if (body.email) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.EMAIL_CAN_NOT_BE_UPDATED
      });
    }
    const { name, image, ...rest } = body;
    const session = ctx.context.session;
    if (image === void 0 && name === void 0 && Object.keys(rest).length === 0) {
      return ctx.json({
        status: true
      });
    }
    const additionalFields = parseUserInput(
      ctx.context.options,
      rest,
      "update"
    );
    const user = await ctx.context.internalAdapter.updateUser(
      session.user.id,
      {
        name,
        image,
        ...additionalFields
      },
      ctx
    );
    await setSessionCookie(ctx, {
      session: session.session,
      user
    });
    return ctx.json({
      status: true
    });
  }
);
const changePassword = createAuthEndpoint(
  "/change-password",
  {
    method: "POST",
    body: z.object({
      /**
       * The new password to set
       */
      newPassword: z.string().meta({
        description: "The new password to set"
      }),
      /**
       * The current password of the user
       */
      currentPassword: z.string().meta({
        description: "The current password is required"
      }),
      /**
       * revoke all sessions that are not the
       * current one logged in by the user
       */
      revokeOtherSessions: z.boolean().meta({
        description: "Must be a boolean value"
      }).optional()
    }),
    use: [sensitiveSessionMiddleware],
    metadata: {
      openapi: {
        description: "Change the password of the user",
        responses: {
          "200": {
            description: "Password successfully changed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      nullable: true,
                      // Only present if revokeOtherSessions is true
                      description: "New session token if other sessions were revoked"
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
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const { newPassword, currentPassword, revokeOtherSessions: revokeOtherSessions2 } = ctx.body;
    const session = ctx.context.session;
    const minPasswordLength = ctx.context.password.config.minPasswordLength;
    if (newPassword.length < minPasswordLength) {
      ctx.context.logger.error("Password is too short");
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT
      });
    }
    const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
    if (newPassword.length > maxPasswordLength) {
      ctx.context.logger.error("Password is too long");
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.PASSWORD_TOO_LONG
      });
    }
    const accounts = await ctx.context.internalAdapter.findAccounts(
      session.user.id
    );
    const account = accounts.find(
      (account2) => account2.providerId === "credential" && account2.password
    );
    if (!account || !account.password) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND
      });
    }
    const passwordHash = await ctx.context.password.hash(newPassword);
    const verify = await ctx.context.password.verify({
      hash: account.password,
      password: currentPassword
    });
    if (!verify) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.INVALID_PASSWORD
      });
    }
    await ctx.context.internalAdapter.updateAccount(account.id, {
      password: passwordHash
    });
    let token = null;
    if (revokeOtherSessions2) {
      await ctx.context.internalAdapter.deleteSessions(session.user.id);
      const newSession = await ctx.context.internalAdapter.createSession(
        session.user.id,
        ctx
      );
      if (!newSession) {
        throw new APIError("INTERNAL_SERVER_ERROR", {
          message: BASE_ERROR_CODES.FAILED_TO_GET_SESSION
        });
      }
      await setSessionCookie(ctx, {
        session: newSession,
        user: session.user
      });
      token = newSession.token;
    }
    return ctx.json({
      token,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        emailVerified: session.user.emailVerified,
        createdAt: session.user.createdAt,
        updatedAt: session.user.updatedAt
      }
    });
  }
);
const setPassword = createAuthEndpoint(
  "/set-password",
  {
    method: "POST",
    body: z.object({
      /**
       * The new password to set
       */
      newPassword: z.string().meta({
        description: "The new password to set is required"
      })
    }),
    metadata: {
      SERVER_ONLY: true
    },
    use: [sensitiveSessionMiddleware]
  },
  async (ctx) => {
    const { newPassword } = ctx.body;
    const session = ctx.context.session;
    const minPasswordLength = ctx.context.password.config.minPasswordLength;
    if (newPassword.length < minPasswordLength) {
      ctx.context.logger.error("Password is too short");
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT
      });
    }
    const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
    if (newPassword.length > maxPasswordLength) {
      ctx.context.logger.error("Password is too long");
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.PASSWORD_TOO_LONG
      });
    }
    const accounts = await ctx.context.internalAdapter.findAccounts(
      session.user.id
    );
    const account = accounts.find(
      (account2) => account2.providerId === "credential" && account2.password
    );
    const passwordHash = await ctx.context.password.hash(newPassword);
    if (!account) {
      await ctx.context.internalAdapter.linkAccount(
        {
          userId: session.user.id,
          providerId: "credential",
          accountId: session.user.id,
          password: passwordHash
        },
        ctx
      );
      return ctx.json({
        status: true
      });
    }
    throw new APIError("BAD_REQUEST", {
      message: "user already has a password"
    });
  }
);
const deleteUser = createAuthEndpoint(
  "/delete-user",
  {
    method: "POST",
    use: [sensitiveSessionMiddleware],
    body: z.object({
      /**
       * The callback URL to redirect to after the user is deleted
       * this is only used on delete user callback
       */
      callbackURL: z.string().meta({
        description: "The callback URL to redirect to after the user is deleted"
      }).optional(),
      /**
       * The password of the user. If the password isn't provided, session freshness
       * will be checked.
       */
      password: z.string().meta({
        description: "The password of the user is required to delete the user"
      }).optional(),
      /**
       * The token to delete the user. If the token is provided, the user will be deleted
       */
      token: z.string().meta({
        description: "The token to delete the user is required"
      }).optional()
    }),
    metadata: {
      openapi: {
        description: "Delete the user",
        responses: {
          "200": {
            description: "User deletion processed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      description: "Indicates if the operation was successful"
                    },
                    message: {
                      type: "string",
                      enum: ["User deleted", "Verification email sent"],
                      description: "Status message of the deletion process"
                    }
                  },
                  required: ["success", "message"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    if (!ctx.context.options.user?.deleteUser?.enabled) {
      ctx.context.logger.error(
        "Delete user is disabled. Enable it in the options",
        {
          session: ctx.context.session
        }
      );
      throw new APIError("NOT_FOUND");
    }
    const session = ctx.context.session;
    if (ctx.body.password) {
      const accounts = await ctx.context.internalAdapter.findAccounts(
        session.user.id
      );
      const account = accounts.find(
        (account2) => account2.providerId === "credential" && account2.password
      );
      if (!account || !account.password) {
        throw new APIError("BAD_REQUEST", {
          message: BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND
        });
      }
      const verify = await ctx.context.password.verify({
        hash: account.password,
        password: ctx.body.password
      });
      if (!verify) {
        throw new APIError("BAD_REQUEST", {
          message: BASE_ERROR_CODES.INVALID_PASSWORD
        });
      }
    }
    if (ctx.body.token) {
      await deleteUserCallback({
        ...ctx,
        query: {
          token: ctx.body.token
        }
      });
      return ctx.json({
        success: true,
        message: "User deleted"
      });
    }
    if (ctx.context.options.user.deleteUser?.sendDeleteAccountVerification) {
      const token = generateRandomString(32, "0-9", "a-z");
      await ctx.context.internalAdapter.createVerificationValue(
        {
          value: session.user.id,
          identifier: `delete-account-${token}`,
          expiresAt: new Date(
            Date.now() + (ctx.context.options.user.deleteUser?.deleteTokenExpiresIn || 60 * 60 * 24) * 1e3
          )
        },
        ctx
      );
      const url = `${ctx.context.baseURL}/delete-user/callback?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
      await ctx.context.options.user.deleteUser.sendDeleteAccountVerification(
        {
          user: session.user,
          url,
          token
        },
        ctx.request
      );
      return ctx.json({
        success: true,
        message: "Verification email sent"
      });
    }
    if (!ctx.body.password && ctx.context.sessionConfig.freshAge !== 0) {
      const currentAge = new Date(session.session.createdAt).getTime();
      const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
      const now = Date.now();
      if (now - currentAge > freshAge * 1e3) {
        throw new APIError("BAD_REQUEST", {
          message: BASE_ERROR_CODES.SESSION_EXPIRED
        });
      }
    }
    const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
    if (beforeDelete) {
      await beforeDelete(session.user, ctx.request);
    }
    await ctx.context.internalAdapter.deleteUser(session.user.id);
    await ctx.context.internalAdapter.deleteSessions(session.user.id);
    await ctx.context.internalAdapter.deleteAccounts(session.user.id);
    deleteSessionCookie(ctx);
    const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
    if (afterDelete) {
      await afterDelete(session.user, ctx.request);
    }
    return ctx.json({
      success: true,
      message: "User deleted"
    });
  }
);
const deleteUserCallback = createAuthEndpoint(
  "/delete-user/callback",
  {
    method: "GET",
    query: z.object({
      token: z.string().meta({
        description: "The token to verify the deletion request"
      }),
      callbackURL: z.string().meta({
        description: "The URL to redirect to after deletion"
      }).optional()
    }),
    use: [originCheck((ctx) => ctx.query.callbackURL)],
    metadata: {
      openapi: {
        description: "Callback to complete user deletion with verification token",
        responses: {
          "200": {
            description: "User successfully deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      description: "Indicates if the deletion was successful"
                    },
                    message: {
                      type: "string",
                      enum: ["User deleted"],
                      description: "Confirmation message"
                    }
                  },
                  required: ["success", "message"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    if (!ctx.context.options.user?.deleteUser?.enabled) {
      ctx.context.logger.error(
        "Delete user is disabled. Enable it in the options"
      );
      throw new APIError("NOT_FOUND");
    }
    const session = await getSessionFromCtx(ctx);
    if (!session) {
      throw new APIError("NOT_FOUND", {
        message: BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO
      });
    }
    const token = await ctx.context.internalAdapter.findVerificationValue(
      `delete-account-${ctx.query.token}`
    );
    if (!token || token.expiresAt < /* @__PURE__ */ new Date()) {
      throw new APIError("NOT_FOUND", {
        message: BASE_ERROR_CODES.INVALID_TOKEN
      });
    }
    if (token.value !== session.user.id) {
      throw new APIError("NOT_FOUND", {
        message: BASE_ERROR_CODES.INVALID_TOKEN
      });
    }
    const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
    if (beforeDelete) {
      await beforeDelete(session.user, ctx.request);
    }
    await ctx.context.internalAdapter.deleteUser(session.user.id);
    await ctx.context.internalAdapter.deleteSessions(session.user.id);
    await ctx.context.internalAdapter.deleteAccounts(session.user.id);
    await ctx.context.internalAdapter.deleteVerificationValue(token.id);
    deleteSessionCookie(ctx);
    const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
    if (afterDelete) {
      await afterDelete(session.user, ctx.request);
    }
    if (ctx.query.callbackURL) {
      throw ctx.redirect(ctx.query.callbackURL || "/");
    }
    return ctx.json({
      success: true,
      message: "User deleted"
    });
  }
);
const changeEmail = createAuthEndpoint(
  "/change-email",
  {
    method: "POST",
    body: z.object({
      newEmail: z.email().meta({
        description: "The new email address to set must be a valid email address"
      }),
      callbackURL: z.string().meta({
        description: "The URL to redirect to after email verification"
      }).optional()
    }),
    use: [sensitiveSessionMiddleware],
    metadata: {
      openapi: {
        responses: {
          "200": {
            description: "Email change request processed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      description: "Indicates if the request was successful"
                    },
                    message: {
                      type: "string",
                      enum: ["Email updated", "Verification email sent"],
                      description: "Status message of the email change process",
                      nullable: true
                    }
                  },
                  required: ["status"]
                }
              }
            }
          },
          "422": {
            description: "Unprocessable Entity. Email already exists",
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
    if (!ctx.context.options.user?.changeEmail?.enabled) {
      ctx.context.logger.error("Change email is disabled.");
      throw new APIError("BAD_REQUEST", {
        message: "Change email is disabled"
      });
    }
    const newEmail = ctx.body.newEmail.toLowerCase();
    if (newEmail === ctx.context.session.user.email) {
      ctx.context.logger.error("Email is the same");
      throw new APIError("BAD_REQUEST", {
        message: "Email is the same"
      });
    }
    const existingUser = await ctx.context.internalAdapter.findUserByEmail(newEmail);
    if (existingUser) {
      ctx.context.logger.error("Email already exists");
      throw new APIError("BAD_REQUEST", {
        message: "Couldn't update your email"
      });
    }
    if (ctx.context.session.user.emailVerified !== true) {
      const existing = await ctx.context.internalAdapter.findUserByEmail(newEmail);
      if (existing) {
        throw new APIError("UNPROCESSABLE_ENTITY", {
          message: BASE_ERROR_CODES.USER_ALREADY_EXISTS
        });
      }
      await ctx.context.internalAdapter.updateUserByEmail(
        ctx.context.session.user.email,
        {
          email: newEmail
        },
        ctx
      );
      await setSessionCookie(ctx, {
        session: ctx.context.session.session,
        user: {
          ...ctx.context.session.user,
          email: newEmail
        }
      });
      if (ctx.context.options.emailVerification?.sendVerificationEmail) {
        const token2 = await createEmailVerificationToken(
          ctx.context.secret,
          newEmail,
          void 0,
          ctx.context.options.emailVerification?.expiresIn
        );
        const url2 = `${ctx.context.baseURL}/verify-email?token=${token2}&callbackURL=${ctx.body.callbackURL || "/"}`;
        await ctx.context.options.emailVerification.sendVerificationEmail(
          {
            user: {
              ...ctx.context.session.user,
              email: newEmail
            },
            url: url2,
            token: token2
          },
          ctx.request
        );
      }
      return ctx.json({
        status: true
      });
    }
    if (!ctx.context.options.user.changeEmail.sendChangeEmailVerification) {
      ctx.context.logger.error("Verification email isn't enabled.");
      throw new APIError("BAD_REQUEST", {
        message: "Verification email isn't enabled"
      });
    }
    const token = await createEmailVerificationToken(
      ctx.context.secret,
      ctx.context.session.user.email,
      newEmail,
      ctx.context.options.emailVerification?.expiresIn
    );
    const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
    await ctx.context.options.user.changeEmail.sendChangeEmailVerification(
      {
        user: ctx.context.session.user,
        newEmail,
        url,
        token
      },
      ctx.request
    );
    return ctx.json({
      status: true
    });
  }
);
function sanitize(input) {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const html = (errorCode = "Unknown") => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authentication Error</title>
    <style>
        :root {
            --bg-color: #f8f9fa;
            --text-color: #212529;
            --accent-color: #000000;
            --error-color: #dc3545;
            --border-color: #e9ecef;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            line-height: 1.5;
        }
        .error-container {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            padding: 2.5rem;
            text-align: center;
            max-width: 90%;
            width: 400px;
        }
        h1 {
            color: var(--error-color);
            font-size: 1.75rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        p {
            margin-bottom: 1.5rem;
            color: #495057;
        }
        .btn {
            background-color: var(--accent-color);
            color: #ffffff;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            transition: all 0.3s ease;
            display: inline-block;
            font-weight: 500;
            border: 2px solid var(--accent-color);
        }
        .btn:hover {
            background-color: #131721;
        }
        .error-code {
            font-size: 0.875rem;
            color: #6c757d;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border-color);
        }
        .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="icon">⚠️</div>
        <h1>Better Auth Error</h1>
        <p>We encountered an issue while processing your request. Please try again or contact the application owner if the problem persists.</p>
        <a href="/" id="returnLink" class="btn">Return to Application</a>
        <div class="error-code">Error Code: <span id="errorCode">${sanitize(
  errorCode
)}</span></div>
    </div>
</body>
</html>`;
const error = createAuthEndpoint(
  "/error",
  {
    method: "GET",
    metadata: {
      ...HIDE_METADATA,
      openapi: {
        description: "Displays an error page",
        responses: {
          "200": {
            description: "Success",
            content: {
              "text/html": {
                schema: {
                  type: "string",
                  description: "The HTML content of the error page"
                }
              }
            }
          }
        }
      }
    }
  },
  async (c) => {
    const query = new URL(c.request?.url || "").searchParams.get("error") || "Unknown";
    return new Response(html(query), {
      headers: {
        "Content-Type": "text/html"
      }
    });
  }
);
const ok = createAuthEndpoint(
  "/ok",
  {
    method: "GET",
    metadata: {
      ...HIDE_METADATA,
      openapi: {
        description: "Check if the API is working",
        responses: {
          "200": {
            description: "API is working",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: {
                      type: "boolean",
                      description: "Indicates if the API is working"
                    }
                  },
                  required: ["ok"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    return ctx.json({
      ok: true
    });
  }
);
const listUserAccounts = createAuthEndpoint(
  "/list-accounts",
  {
    method: "GET",
    use: [sessionMiddleware],
    metadata: {
      openapi: {
        description: "List all accounts linked to the user",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string"
                      },
                      providerId: {
                        type: "string"
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time"
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time"
                      },
                      accountId: {
                        type: "string"
                      },
                      scopes: {
                        type: "array",
                        items: {
                          type: "string"
                        }
                      }
                    },
                    required: [
                      "id",
                      "providerId",
                      "createdAt",
                      "updatedAt",
                      "accountId",
                      "scopes"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  async (c) => {
    const session = c.context.session;
    const accounts = await c.context.internalAdapter.findAccounts(
      session.user.id
    );
    return c.json(
      accounts.map((a) => ({
        id: a.id,
        providerId: a.providerId,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
        accountId: a.accountId,
        scopes: a.scope?.split(",") || []
      }))
    );
  }
);
const linkSocialAccount = createAuthEndpoint(
  "/link-social",
  {
    method: "POST",
    requireHeaders: true,
    body: z.object({
      /**
       * Callback URL to redirect to after the user has signed in.
       */
      callbackURL: z.string().meta({
        description: "The URL to redirect to after the user has signed in"
      }).optional(),
      /**
       * OAuth2 provider to use
       */
      provider: SocialProviderListEnum,
      /**
       * ID Token for direct authentication without redirect
       */
      idToken: z.object({
        token: z.string(),
        nonce: z.string().optional(),
        accessToken: z.string().optional(),
        refreshToken: z.string().optional(),
        scopes: z.array(z.string()).optional()
      }).optional(),
      /**
       * Whether to allow sign up for new users
       */
      requestSignUp: z.boolean().optional(),
      /**
       * Additional scopes to request when linking the account.
       * This is useful for requesting additional permissions when
       * linking a social account compared to the initial authentication.
       */
      scopes: z.array(z.string()).meta({
        description: "Additional scopes to request from the provider"
      }).optional(),
      /**
       * The URL to redirect to if there is an error during the link process.
       */
      errorCallbackURL: z.string().meta({
        description: "The URL to redirect to if there is an error during the link process"
      }).optional(),
      /**
       * Disable automatic redirection to the provider
       *
       * This is useful if you want to handle the redirection
       * yourself like in a popup or a different tab.
       */
      disableRedirect: z.boolean().meta({
        description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself"
      }).optional()
    }),
    use: [sessionMiddleware],
    metadata: {
      openapi: {
        description: "Link a social account to the user",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    url: {
                      type: "string",
                      description: "The authorization URL to redirect the user to"
                    },
                    redirect: {
                      type: "boolean",
                      description: "Indicates if the user should be redirected to the authorization URL"
                    },
                    status: {
                      type: "boolean"
                    }
                  },
                  required: ["redirect"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (c) => {
    const session = c.context.session;
    const provider = c.context.socialProviders.find(
      (p) => p.id === c.body.provider
    );
    if (!provider) {
      c.context.logger.error(
        "Provider not found. Make sure to add the provider in your auth config",
        {
          provider: c.body.provider
        }
      );
      throw new APIError("NOT_FOUND", {
        message: BASE_ERROR_CODES.PROVIDER_NOT_FOUND
      });
    }
    if (c.body.idToken) {
      if (!provider.verifyIdToken) {
        c.context.logger.error(
          "Provider does not support id token verification",
          {
            provider: c.body.provider
          }
        );
        throw new APIError("NOT_FOUND", {
          message: BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED
        });
      }
      const { token, nonce } = c.body.idToken;
      const valid = await provider.verifyIdToken(token, nonce);
      if (!valid) {
        c.context.logger.error("Invalid id token", {
          provider: c.body.provider
        });
        throw new APIError("UNAUTHORIZED", {
          message: BASE_ERROR_CODES.INVALID_TOKEN
        });
      }
      const linkingUserInfo = await provider.getUserInfo({
        idToken: token,
        accessToken: c.body.idToken.accessToken,
        refreshToken: c.body.idToken.refreshToken
      });
      if (!linkingUserInfo || !linkingUserInfo?.user) {
        c.context.logger.error("Failed to get user info", {
          provider: c.body.provider
        });
        throw new APIError("UNAUTHORIZED", {
          message: BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO
        });
      }
      const linkingUserId = String(linkingUserInfo.user.id);
      if (!linkingUserInfo.user.email) {
        c.context.logger.error("User email not found", {
          provider: c.body.provider
        });
        throw new APIError("UNAUTHORIZED", {
          message: BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND
        });
      }
      const existingAccounts = await c.context.internalAdapter.findAccounts(
        session.user.id
      );
      const hasBeenLinked = existingAccounts.find(
        (a) => a.providerId === provider.id && a.accountId === linkingUserId
      );
      if (hasBeenLinked) {
        return c.json({
          url: "",
          // this is for type inference
          status: true,
          redirect: false
        });
      }
      const trustedProviders = c.context.options.account?.accountLinking?.trustedProviders;
      const isTrustedProvider = trustedProviders?.includes(provider.id);
      if (!isTrustedProvider && !linkingUserInfo.user.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
        throw new APIError("UNAUTHORIZED", {
          message: "Account not linked - linking not allowed"
        });
      }
      if (linkingUserInfo.user.email !== session.user.email && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) {
        throw new APIError("UNAUTHORIZED", {
          message: "Account not linked - different emails not allowed"
        });
      }
      try {
        await c.context.internalAdapter.createAccount(
          {
            userId: session.user.id,
            providerId: provider.id,
            accountId: linkingUserId,
            accessToken: c.body.idToken.accessToken,
            idToken: token,
            refreshToken: c.body.idToken.refreshToken,
            scope: c.body.idToken.scopes?.join(",")
          },
          c
        );
      } catch (e) {
        throw new APIError("EXPECTATION_FAILED", {
          message: "Account not linked - unable to create account"
        });
      }
      if (c.context.options.account?.accountLinking?.updateUserInfoOnLink === true) {
        try {
          await c.context.internalAdapter.updateUser(session.user.id, {
            name: linkingUserInfo.user?.name,
            image: linkingUserInfo.user?.image
          });
        } catch (e) {
          console.warn("Could not update user - " + e.toString());
        }
      }
      return c.json({
        url: "",
        // this is for type inference
        status: true,
        redirect: false
      });
    }
    const state = await generateState(c, {
      userId: session.user.id,
      email: session.user.email
    });
    const url = await provider.createAuthorizationURL({
      state: state.state,
      codeVerifier: state.codeVerifier,
      redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
      scopes: c.body.scopes
    });
    return c.json({
      url: url.toString(),
      redirect: !c.body.disableRedirect
    });
  }
);
const unlinkAccount = createAuthEndpoint(
  "/unlink-account",
  {
    method: "POST",
    body: z.object({
      providerId: z.string(),
      accountId: z.string().optional()
    }),
    use: [freshSessionMiddleware],
    metadata: {
      openapi: {
        description: "Unlink an account",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean"
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
    const { providerId, accountId } = ctx.body;
    const accounts = await ctx.context.internalAdapter.findAccounts(
      ctx.context.session.user.id
    );
    if (accounts.length === 1 && !ctx.context.options.account?.accountLinking?.allowUnlinkingAll) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.FAILED_TO_UNLINK_LAST_ACCOUNT
      });
    }
    const accountExist = accounts.find(
      (account) => accountId ? account.accountId === accountId && account.providerId === providerId : account.providerId === providerId
    );
    if (!accountExist) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.ACCOUNT_NOT_FOUND
      });
    }
    await ctx.context.internalAdapter.deleteAccount(accountExist.id);
    return ctx.json({
      status: true
    });
  }
);
const getAccessToken = createAuthEndpoint(
  "/get-access-token",
  {
    method: "POST",
    body: z.object({
      providerId: z.string().meta({
        description: "The provider ID for the OAuth provider"
      }),
      accountId: z.string().meta({
        description: "The account ID associated with the refresh token"
      }).optional(),
      userId: z.string().meta({
        description: "The user ID associated with the account"
      }).optional()
    }),
    metadata: {
      openapi: {
        description: "Get a valid access token, doing a refresh if needed",
        responses: {
          200: {
            description: "A Valid access token",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    tokenType: {
                      type: "string"
                    },
                    idToken: {
                      type: "string"
                    },
                    accessToken: {
                      type: "string"
                    },
                    refreshToken: {
                      type: "string"
                    },
                    accessTokenExpiresAt: {
                      type: "string",
                      format: "date-time"
                    },
                    refreshTokenExpiresAt: {
                      type: "string",
                      format: "date-time"
                    }
                  }
                }
              }
            }
          },
          400: {
            description: "Invalid refresh token or provider configuration"
          }
        }
      }
    }
  },
  async (ctx) => {
    const { providerId, accountId, userId } = ctx.body;
    const req = ctx.request;
    const session = await getSessionFromCtx(ctx);
    if (req && !session) {
      throw ctx.error("UNAUTHORIZED");
    }
    let resolvedUserId = session?.user?.id || userId;
    if (!resolvedUserId) {
      throw new APIError("BAD_REQUEST", {
        message: `Either userId or session is required`
      });
    }
    if (!ctx.context.socialProviders.find((p) => p.id === providerId)) {
      throw new APIError("BAD_REQUEST", {
        message: `Provider ${providerId} is not supported.`
      });
    }
    const accounts = await ctx.context.internalAdapter.findAccounts(resolvedUserId);
    const account = accounts.find(
      (acc) => accountId ? acc.id === accountId && acc.providerId === providerId : acc.providerId === providerId
    );
    if (!account) {
      throw new APIError("BAD_REQUEST", {
        message: "Account not found"
      });
    }
    const provider = ctx.context.socialProviders.find(
      (p) => p.id === providerId
    );
    if (!provider) {
      throw new APIError("BAD_REQUEST", {
        message: `Provider ${providerId} not found.`
      });
    }
    try {
      let newTokens = null;
      const accessTokenExpired = account.accessTokenExpiresAt && new Date(account.accessTokenExpiresAt).getTime() - Date.now() < 5e3;
      if (account.refreshToken && accessTokenExpired && provider.refreshAccessToken) {
        newTokens = await provider.refreshAccessToken(
          account.refreshToken
        );
        await ctx.context.internalAdapter.updateAccount(account.id, {
          accessToken: await setTokenUtil(newTokens.accessToken, ctx.context),
          accessTokenExpiresAt: newTokens.accessTokenExpiresAt,
          refreshToken: await setTokenUtil(newTokens.refreshToken, ctx.context),
          refreshTokenExpiresAt: newTokens.refreshTokenExpiresAt
        });
      }
      const tokens = {
        accessToken: await decryptOAuthToken(
          newTokens?.accessToken ?? account.accessToken ?? "",
          ctx.context
        ),
        accessTokenExpiresAt: newTokens?.accessTokenExpiresAt ?? account.accessTokenExpiresAt ?? void 0,
        scopes: account.scope?.split(",") ?? [],
        idToken: newTokens?.idToken ?? account.idToken ?? void 0
      };
      return ctx.json(tokens);
    } catch (error2) {
      throw new APIError("BAD_REQUEST", {
        message: "Failed to get a valid access token",
        cause: error2
      });
    }
  }
);
const refreshToken = createAuthEndpoint(
  "/refresh-token",
  {
    method: "POST",
    body: z.object({
      providerId: z.string().meta({
        description: "The provider ID for the OAuth provider"
      }),
      accountId: z.string().meta({
        description: "The account ID associated with the refresh token"
      }).optional(),
      userId: z.string().meta({
        description: "The user ID associated with the account"
      }).optional()
    }),
    metadata: {
      openapi: {
        description: "Refresh the access token using a refresh token",
        responses: {
          200: {
            description: "Access token refreshed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    tokenType: {
                      type: "string"
                    },
                    idToken: {
                      type: "string"
                    },
                    accessToken: {
                      type: "string"
                    },
                    refreshToken: {
                      type: "string"
                    },
                    accessTokenExpiresAt: {
                      type: "string",
                      format: "date-time"
                    },
                    refreshTokenExpiresAt: {
                      type: "string",
                      format: "date-time"
                    }
                  }
                }
              }
            }
          },
          400: {
            description: "Invalid refresh token or provider configuration"
          }
        }
      }
    }
  },
  async (ctx) => {
    const { providerId, accountId, userId } = ctx.body;
    const req = ctx.request;
    const session = await getSessionFromCtx(ctx);
    if (req && !session) {
      throw ctx.error("UNAUTHORIZED");
    }
    let resolvedUserId = session?.user?.id || userId;
    if (!resolvedUserId) {
      throw new APIError("BAD_REQUEST", {
        message: `Either userId or session is required`
      });
    }
    const accounts = await ctx.context.internalAdapter.findAccounts(resolvedUserId);
    const account = accounts.find(
      (acc) => accountId ? acc.id === accountId && acc.providerId === providerId : acc.providerId === providerId
    );
    if (!account) {
      throw new APIError("BAD_REQUEST", {
        message: "Account not found"
      });
    }
    const provider = ctx.context.socialProviders.find(
      (p) => p.id === providerId
    );
    if (!provider) {
      throw new APIError("BAD_REQUEST", {
        message: `Provider ${providerId} not found.`
      });
    }
    if (!provider.refreshAccessToken) {
      throw new APIError("BAD_REQUEST", {
        message: `Provider ${providerId} does not support token refreshing.`
      });
    }
    try {
      const tokens = await provider.refreshAccessToken(
        account.refreshToken
      );
      await ctx.context.internalAdapter.updateAccount(account.id, {
        accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
        refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
        accessTokenExpiresAt: tokens.accessTokenExpiresAt,
        refreshTokenExpiresAt: tokens.refreshTokenExpiresAt
      });
      return ctx.json(tokens);
    } catch (error2) {
      throw new APIError("BAD_REQUEST", {
        message: "Failed to refresh access token",
        cause: error2
      });
    }
  }
);
const accountInfo = createAuthEndpoint(
  "/account-info",
  {
    method: "POST",
    use: [sessionMiddleware],
    metadata: {
      openapi: {
        description: "Get the account info provided by the provider",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string"
                        },
                        name: {
                          type: "string"
                        },
                        email: {
                          type: "string"
                        },
                        image: {
                          type: "string"
                        },
                        emailVerified: {
                          type: "boolean"
                        }
                      },
                      required: ["id", "emailVerified"]
                    },
                    data: {
                      type: "object",
                      properties: {},
                      additionalProperties: true
                    }
                  },
                  required: ["user", "data"],
                  additionalProperties: false
                }
              }
            }
          }
        }
      }
    },
    body: z.object({
      accountId: z.string().meta({
        description: "The provider given account id for which to get the account info"
      })
    })
  },
  async (ctx) => {
    const account = await ctx.context.internalAdapter.findAccount(
      ctx.body.accountId
    );
    if (!account || account.userId !== ctx.context.session.user.id) {
      throw new APIError("BAD_REQUEST", {
        message: "Account not found"
      });
    }
    const provider = ctx.context.socialProviders.find(
      (p) => p.id === account.providerId
    );
    if (!provider) {
      throw new APIError("INTERNAL_SERVER_ERROR", {
        message: `Provider account provider is ${account.providerId} but it is not configured`
      });
    }
    const tokens = await getAccessToken({
      ...ctx,
      body: {
        accountId: account.id,
        providerId: account.providerId
      },
      returnHeaders: false
    });
    if (!tokens.accessToken) {
      throw new APIError("BAD_REQUEST", {
        message: "Access token not found"
      });
    }
    const info = await provider.getUserInfo({
      ...tokens,
      accessToken: tokens.accessToken
    });
    return ctx.json(info);
  }
);
const defuReplaceArrays = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value;
    return true;
  }
});
function toAuthEndpoints(endpoints, ctx) {
  const api = {};
  for (const [key, endpoint] of Object.entries(endpoints)) {
    api[key] = async (context) => {
      const authContext = await ctx;
      let internalContext = {
        ...context,
        context: {
          ...authContext,
          returned: void 0,
          responseHeaders: void 0,
          session: null
        },
        path: endpoint.path,
        headers: context?.headers ? new Headers(context?.headers) : void 0
      };
      const { beforeHooks, afterHooks } = getHooks(authContext);
      const before = await runBeforeHooks(internalContext, beforeHooks);
      if ("context" in before && before.context && typeof before.context === "object") {
        const { headers, ...rest } = before.context;
        if (headers) {
          headers.forEach((value, key2) => {
            internalContext.headers.set(key2, value);
          });
        }
        internalContext = defuReplaceArrays(rest, internalContext);
      } else if (before) {
        return before;
      }
      internalContext.asResponse = false;
      internalContext.returnHeaders = true;
      const result = await endpoint(internalContext).catch((e) => {
        if (e instanceof APIError) {
          return {
            response: e,
            headers: e.headers ? new Headers(e.headers) : null
          };
        }
        throw e;
      });
      if (result && result instanceof Response) {
        return result;
      }
      internalContext.context.returned = result.response;
      internalContext.context.responseHeaders = result.headers;
      const after = await runAfterHooks(internalContext, afterHooks);
      if (after.response) {
        result.response = after.response;
      }
      if (result.response instanceof APIError && shouldPublishLog(authContext.logger.level, "debug")) {
        result.response.stack = result.response.errorStack;
      }
      if (result.response instanceof APIError && !context?.asResponse) {
        throw result.response;
      }
      const response = context?.asResponse ? toResponse(result.response, {
        headers: result.headers
      }) : context?.returnHeaders ? {
        headers: result.headers,
        response: result.response
      } : result.response;
      return response;
    };
    api[key].path = endpoint.path;
    api[key].options = endpoint.options;
  }
  return api;
}
async function runBeforeHooks(context, hooks) {
  let modifiedContext = {};
  for (const hook of hooks) {
    if (hook.matcher(context)) {
      const result = await hook.handler({
        ...context,
        returnHeaders: false
      }).catch((e) => {
        if (e instanceof APIError && shouldPublishLog(context.context.logger.level, "debug")) {
          e.stack = e.errorStack;
        }
        throw e;
      });
      if (result && typeof result === "object") {
        if ("context" in result && typeof result.context === "object") {
          const { headers, ...rest } = result.context;
          if (headers instanceof Headers) {
            if (modifiedContext.headers) {
              headers.forEach((value, key) => {
                modifiedContext.headers?.set(key, value);
              });
            } else {
              modifiedContext.headers = headers;
            }
          }
          modifiedContext = defuReplaceArrays(rest, modifiedContext);
          continue;
        }
        return result;
      }
    }
  }
  return { context: modifiedContext };
}
async function runAfterHooks(context, hooks) {
  for (const hook of hooks) {
    if (hook.matcher(context)) {
      const result = await hook.handler(context).catch((e) => {
        if (e instanceof APIError) {
          if (shouldPublishLog(context.context.logger.level, "debug")) {
            e.stack = e.errorStack;
          }
          return {
            response: e,
            headers: e.headers ? new Headers(e.headers) : null
          };
        }
        throw e;
      });
      if (result.headers) {
        result.headers.forEach((value, key) => {
          if (!context.context.responseHeaders) {
            context.context.responseHeaders = new Headers({
              [key]: value
            });
          } else {
            if (key.toLowerCase() === "set-cookie") {
              context.context.responseHeaders.append(key, value);
            } else {
              context.context.responseHeaders.set(key, value);
            }
          }
        });
      }
      if (result.response) {
        context.context.returned = result.response;
      }
    }
  }
  return {
    response: context.context.returned,
    headers: context.context.responseHeaders
  };
}
function getHooks(authContext) {
  const plugins = authContext.options.plugins || [];
  const beforeHooks = [];
  const afterHooks = [];
  if (authContext.options.hooks?.before) {
    beforeHooks.push({
      matcher: () => true,
      handler: authContext.options.hooks.before
    });
  }
  if (authContext.options.hooks?.after) {
    afterHooks.push({
      matcher: () => true,
      handler: authContext.options.hooks.after
    });
  }
  const pluginBeforeHooks = plugins.map((plugin) => {
    if (plugin.hooks?.before) {
      return plugin.hooks.before;
    }
  }).filter((plugin) => plugin !== void 0).flat();
  const pluginAfterHooks = plugins.map((plugin) => {
    if (plugin.hooks?.after) {
      return plugin.hooks.after;
    }
  }).filter((plugin) => plugin !== void 0).flat();
  pluginBeforeHooks.length && beforeHooks.push(...pluginBeforeHooks);
  pluginAfterHooks.length && afterHooks.push(...pluginAfterHooks);
  return {
    beforeHooks,
    afterHooks
  };
}
export {
  socialProviders as $,
  forgetPasswordCallback as A,
  BASE_ERROR_CODES as B,
  deleteUser as C,
  setPassword as D,
  changePassword as E,
  changeEmail as F,
  sendVerificationEmail as G,
  verifyEmail as H,
  resetPassword as I,
  forgetPassword as J,
  signInEmail as K,
  signOut as L,
  callbackOAuth as M,
  signInSocial as N,
  wildcardMatch as O,
  safeJSONParse as P,
  generateId as Q,
  BetterAuthError as R,
  parseSessionOutput as S,
  parseUserOutput as T,
  getDate as U,
  createLogger as V,
  getBaseURL as W,
  getOrigin as X,
  env as Y,
  isProduction as Z,
  getCookies as _,
  isDevelopment as a,
  createCookieGetter as a0,
  verifyPassword as a1,
  hashPassword as a2,
  getBooleanEnvVar as a3,
  ENV as a4,
  hashToBase64 as a5,
  getEnvVar as a6,
  createAuthMiddleware as a7,
  sessionMiddleware as a8,
  ms as a9,
  logger as b,
  createAuthEndpoint as c,
  createEmailVerificationToken as d,
  error as e,
  ok as f,
  getSession as g,
  accountInfo as h,
  isTest as i,
  getAccessToken as j,
  unlinkAccount as k,
  listSessions as l,
  deleteUserCallback as m,
  listUserAccounts as n,
  originCheckMiddleware as o,
  parseUserInput as p,
  linkSocialAccount as q,
  refreshToken as r,
  setSessionCookie as s,
  toAuthEndpoints as t,
  updateUser as u,
  revokeOtherSessions as v,
  revokeSessions as w,
  revokeSession as x,
  requestPasswordResetCallback as y,
  requestPasswordReset as z
};
