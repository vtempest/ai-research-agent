import TTLCache from "@isaacs/ttlcache";
import { nanoid } from "nanoid";
import { z } from "zod";
let defaultHashFunction;
if (globalThis?.crypto?.subtle) {
  defaultHashFunction = subtleSha256;
}
async function subtleSha256(str) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
class CookieRateLimiter {
  rate;
  cookieOptions;
  secret;
  requirePreflight;
  cookieId;
  hashFunction;
  constructor(options) {
    this.cookieId = options.name;
    this.secret = options.secret;
    this.rate = options.rate;
    this.requirePreflight = options.preflight;
    this.hashFunction = options.hashFunction ?? defaultHashFunction;
    this.cookieOptions = {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      ...options.serializeOptions
    };
  }
  async hash(event) {
    const currentId = await this.userIdFromCookie(event.cookies.get(this.cookieId), event);
    return currentId ? currentId : false;
  }
  async preflight(event) {
    const data = event.cookies.get(this.cookieId);
    if (data) {
      const userId = await this.userIdFromCookie(data, event);
      if (userId)
        return userId;
    }
    return this.setPreflightCookie(event);
  }
  async setPreflightCookie(event) {
    const userId = nanoid();
    event.cookies.set(this.cookieId, userId + ";" + await this.hashFunction(this.secret + userId), this.cookieOptions);
    return userId;
  }
  async userIdFromCookie(cookie, event) {
    if (!cookie)
      return this.requirePreflight ? null : this.preflight(event);
    const [userId, secretHash] = cookie.split(";");
    if (!userId || !secretHash) {
      return this.setPreflightCookie(event);
    }
    if (await this.hashFunction(this.secret + userId) != secretHash) {
      return this.setPreflightCookie(event);
    }
    return userId;
  }
}
class IPRateLimiter {
  rate;
  constructor(rate) {
    this.rate = rate;
  }
  async hash(event) {
    return event.getClientAddress();
  }
}
class IPUserAgentRateLimiter {
  rate;
  constructor(rate) {
    this.rate = rate;
  }
  async hash(event) {
    const ua = event.request.headers.get("user-agent");
    if (!ua)
      return false;
    return event.getClientAddress() + ua;
  }
}
class TTLStore {
  cache;
  constructor(maxTTL, maxItems = Infinity) {
    this.cache = new TTLCache({
      ttl: maxTTL,
      max: maxItems,
      noUpdateTTL: true
    });
  }
  async clear() {
    return this.cache.clear();
  }
  async add(hash, ttl) {
    const currentRate = this.cache.get(hash) ?? 0;
    return this.set(hash, currentRate + 1, ttl);
  }
  set(hash, rate, ttl) {
    this.cache.set(hash, rate, { ttl });
    return rate;
  }
}
function TTLTime(unit) {
  switch (unit) {
    case "s":
      return 1e3;
    case "m":
      return 6e4;
    case "h":
      return 60 * 6e4;
    case "2s":
      return 2e3;
    case "5s":
      return 5e3;
    case "10s":
      return 1e4;
    case "15s":
      return 15e3;
    case "30s":
      return 3e4;
    case "45s":
      return 45e3;
    case "2m":
      return 2 * 6e4;
    case "5m":
      return 5 * 6e4;
    case "10m":
      return 10 * 6e4;
    case "15m":
      return 15 * 6e4;
    case "30m":
      return 30 * 6e4;
    case "45m":
      return 45 * 6e4;
    case "100ms":
      return 100;
    case "250ms":
      return 250;
    case "500ms":
      return 500;
    case "2h":
      return 2 * 60 * 6e4;
    case "6h":
      return 6 * 60 * 6e4;
    case "12h":
      return 12 * 60 * 6e4;
    case "d":
      return 24 * 60 * 6e4;
    case "ms":
      return 1;
  }
  throw new Error("Invalid unit for TTLTime: " + unit);
}
class RateLimiter {
  store;
  plugins;
  onLimited;
  hashFunction;
  cookieLimiter;
  async isLimited(event, extraData) {
    return (await this._isLimited(event, extraData)).limited;
  }
  /**
   * Clear all rate limits.
   */
  async clear() {
    return await this.store.clear();
  }
  /**
   * Check if a request event is rate limited.
   * @param {RequestEvent} event
   * @returns {Promise<limited: boolean, reason: 'IP' | 'IPUA' | 'cookie' | number>} Rate limit status for the event.
   */
  async check(event, extraData) {
    const result = await this._isLimited(event, extraData);
    if (!result.limited)
      return { limited: false };
    return { limited: true, reason: result.reason };
  }
  /**
   * Check if a request event is rate limited.
   * @param {RequestEvent} event
   * @returns {Promise<boolean>} true if request is limited, false otherwise
   */
  async _isLimited(event, extraData) {
    let limited = void 0;
    for (let i = 0; i < this.plugins.length; i++) {
      const plugin = this.plugins[i];
      const rate = plugin.rate;
      const id = await plugin.limiter.hash(event, extraData);
      if (id === false) {
        if (this.onLimited) {
          const status = await this.onLimited(event, "rejected");
          if (status === true)
            return { limited: false, hash: null, ttl: rate[1] };
        }
        return {
          limited: true,
          hash: null,
          ttl: rate[1],
          reason: this.limitReason(plugin.limiter, i)
        };
      } else if (id === null) {
        if (limited === void 0)
          limited = true;
        continue;
      } else {
        limited = false;
      }
      if (!id) {
        throw new Error("Empty hash returned from rate limiter " + plugin.constructor.name);
      }
      if (id === true) {
        return { limited: false, hash: null, ttl: rate[1] };
      }
      const hash = i.toString() + await this.hashFunction(id);
      const currentRate = await this.store.add(hash, rate[1]);
      if (currentRate > rate[0]) {
        if (this.onLimited) {
          const status = await this.onLimited(event, "rate");
          if (status === true)
            return { limited: false, hash, ttl: rate[1] };
        }
        return {
          limited: true,
          hash,
          ttl: rate[1],
          reason: this.limitReason(plugin.limiter, i)
        };
      }
    }
    if (limited) {
      return {
        limited: true,
        hash: null,
        ttl: this.plugins[this.plugins.length - 1].rate[1],
        reason: this.limitReason(this.plugins[this.plugins.length - 1].limiter, this.plugins.length - 1)
      };
    }
    return {
      limited: false,
      hash: null,
      ttl: this.plugins[this.plugins.length - 1].rate[1]
    };
  }
  limitReason(plugin, index) {
    if (plugin instanceof IPRateLimiter)
      return "IP";
    if (plugin instanceof IPUserAgentRateLimiter)
      return "IPUA";
    if (plugin instanceof CookieRateLimiter)
      return "cookie";
    return index;
  }
  constructor(options = {}) {
    this.onLimited = options.onLimited;
    this.hashFunction = options.hashFunction ?? defaultHashFunction;
    if (!this.hashFunction) {
      throw new Error("No RateLimiter hash function found. Please set one with the hashFunction option.");
    }
    function mapPluginRates(limiter) {
      if (!limiter.rate.length)
        throw new Error(`Empty rate for limiter ${limiter.constructor.name}`);
      const pluginRates = Array.isArray(limiter.rate[0]) ? limiter.rate : [limiter.rate];
      return pluginRates.map((rate) => ({
        rate: [rate[0], TTLTime(rate[1])],
        limiter
      }));
    }
    this.plugins = (options.plugins ?? []).flatMap(mapPluginRates);
    const IPRates = options.IP ?? options.rates?.IP;
    if (IPRates) {
      this.plugins = this.plugins.concat(mapPluginRates(new IPRateLimiter(IPRates)));
    }
    const IPUARates = options.IPUA ?? options.rates?.IPUA;
    if (IPUARates) {
      this.plugins = this.plugins.concat(mapPluginRates(new IPUserAgentRateLimiter(IPUARates)));
    }
    const cookieRates = options.cookie ?? options.rates?.cookie;
    if (cookieRates) {
      this.plugins = this.plugins.concat(mapPluginRates(this.cookieLimiter = new CookieRateLimiter({
        hashFunction: this.hashFunction,
        ...cookieRates
      })));
    }
    if (!this.plugins.length) {
      throw new Error("No plugins set for RateLimiter!");
    }
    this.plugins.sort((a, b) => {
      const diff = a.rate[1] - b.rate[1];
      return diff == 0 ? a.rate[0] - b.rate[0] : diff;
    });
    const maxTTL = this.plugins.reduce((acc, plugin) => {
      const rate = plugin.rate[1];
      if (rate == 1) {
        console.warn('RateLimiter: The "ms" unit is not reliable due to OS timing issues.');
      }
      return Math.max(rate, acc);
    }, 0);
    this.store = options.store ?? new TTLStore(maxTTL, options.maxItems);
  }
}
class RetryAfterStore {
  cache;
  constructor(maxItems = Infinity) {
    this.cache = new TTLCache({
      max: maxItems,
      noUpdateTTL: true
    });
  }
  async clear() {
    return this.cache.clear();
  }
  async add(hash, ttl) {
    const currentRate = this.cache.get(hash);
    if (currentRate)
      return this.cache.get(hash) ?? 0;
    const retryAfter = Date.now() + ttl;
    this.cache.set(hash, retryAfter, { ttl });
    return retryAfter;
  }
}
class RetryAfterRateLimiter extends RateLimiter {
  retryAfter;
  constructor(options = {}, retryAfterStore) {
    super(options);
    this.retryAfter = retryAfterStore ?? new RetryAfterStore();
  }
  static toSeconds(rateMs) {
    return Math.max(0, Math.floor(rateMs / 1e3));
  }
  /**
   * Clear all rate limits.
   */
  async clear() {
    await this.retryAfter.clear();
    return await super.clear();
  }
  /**
   * Check if a request event is rate limited.
   * @param {RequestEvent} event
   * @returns {Promise<limited: boolean, retryAfter: number, reason: 'IP' | 'IPUA' | 'cookie' | number>} Rate limit status for the event.
   */
  async check(event, extraData) {
    const result = await this._isLimited(event, extraData);
    if (!result.limited)
      return { limited: false, retryAfter: 0 };
    if (result.hash === null) {
      return {
        limited: true,
        retryAfter: RetryAfterRateLimiter.toSeconds(result.ttl),
        reason: result.reason
      };
    }
    const retryAfter = RetryAfterRateLimiter.toSeconds(await this.retryAfter.add(result.hash, result.ttl) - Date.now());
    return { limited: true, retryAfter, reason: result.reason };
  }
}
new RetryAfterRateLimiter({
  IP: [5, "h"],
  IPUA: [5, "h"]
});
new RetryAfterRateLimiter({
  IP: [5, "s"],
  IPUA: [5, "s"]
});
new RetryAfterRateLimiter({
  IP: [5, "h"],
  IPUA: [5, "h"]
});
new RetryAfterRateLimiter({
  IP: [30, "s"],
  IPUA: [30, "s"]
});
new RetryAfterRateLimiter({
  IP: [1, "h"],
  IPUA: [1, "h"]
});
new RetryAfterRateLimiter({
  IP: [30, "s"],
  IPUA: [30, "s"]
});
new RetryAfterRateLimiter({
  IP: [5, "h"],
  IPUA: [5, "h"]
});
new RetryAfterRateLimiter({
  IP: [5, "s"],
  IPUA: [5, "s"]
});
new RetryAfterRateLimiter({
  IP: [3, "h"],
  IPUA: [3, "h"]
});
new RetryAfterRateLimiter({
  IP: [3, "h"],
  IPUA: [3, "h"]
});
new RetryAfterRateLimiter({
  IP: [3, "h"],
  IPUA: [3, "h"]
});
const USERNAME_MIN_LEN = 3;
const USERNAME_MAX_LEN = 20;
const PASSWORD_MIN_LEN = 6;
const PASSWORD_MAX_LEN = 50;
const NAME_MIN_LEN = 3;
const NAME_MAX_LEN = 50;
const EMAIL_MIN_LEN = 6;
const EMAIL_MAX_LEN = 50;
const USER_ID_LEN = 15;
const TOKEN_LEN = 15;
const emailField = z.string({ required_error: "Email is required" }).trim().email({ message: "Email must be a valid email address" }).min(EMAIL_MIN_LEN, {
  message: `Email must be at least ${EMAIL_MIN_LEN} characters`
}).max(EMAIL_MAX_LEN, {
  message: `Email must not exceed ${EMAIL_MAX_LEN} characters`
});
z.boolean().default(false);
z.boolean().default(false);
const nameField = z.string({ required_error: "Name is required" }).trim().min(NAME_MIN_LEN, {
  message: `Name must be at least ${NAME_MIN_LEN} characters`
}).max(NAME_MAX_LEN, {
  message: `Name must be at least ${NAME_MAX_LEN} characters`
});
const passwordConfirmField = z.string({
  required_error: "Password confirm is required"
});
const passwordConfirmMustBeEqualToPassword = ({ password, passwordConfirm }, ctx) => {
  if (passwordConfirm.length > 0 && password !== passwordConfirm) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password and password confirm must match",
      path: ["password"]
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password and password confirm must match",
      path: ["passwordConfirm"]
    });
  }
};
const passwordRegex = new RegExp(
  `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,\\-./:;<=>?[\\]^_\`{|}~])[A-Za-z0-9!@#$%^&*"'()+,\\-./:;<=>?[\\]^_\`{|}~]{${PASSWORD_MIN_LEN},${PASSWORD_MAX_LEN}}$`
);
const passwordField = z.string({ required_error: "Password is required" }).regex(passwordRegex, { message: "Password is invalid." }).min(PASSWORD_MIN_LEN, {
  message: `Password minimum length is ${PASSWORD_MIN_LEN}`
}).max(PASSWORD_MAX_LEN, {
  message: `Password max length is ${PASSWORD_MAX_LEN}`
});
const tokenField = z.string({ required_error: "Token is required." }).trim().length(TOKEN_LEN, { message: `Token must be ${TOKEN_LEN} characters` });
const userIdField = z.string({ required_error: "UserId is required" }).trim().length(USER_ID_LEN, {
  message: `User id must be ${USER_ID_LEN} characters`
});
const usernameField = z.string({ required_error: "Username is valid." }).trim().min(USERNAME_MIN_LEN, {
  message: `Username must be at least ${USERNAME_MIN_LEN} characters`
}).max(USERNAME_MAX_LEN, {
  message: `Username must be max ${USERNAME_MAX_LEN} characters`
});
z.object({
  email: emailField,
  password: passwordField
});
z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  passwordConfirm: passwordConfirmField
}).superRefine(passwordConfirmMustBeEqualToPassword);
z.object({
  token: tokenField
});
z.object({
  email: emailField
});
z.object({
  token: tokenField
});
z.object({
  email: emailField
});
z.object({
  token: tokenField
});
z.object({
  password: passwordField,
  passwordConfirm: passwordConfirmField
}).superRefine(passwordConfirmMustBeEqualToPassword);
z.object({
  name: nameField
});
z.object({
  name: nameField
});
z.object({
  username: usernameField
});
z.object({
  token: tokenField
});
z.object({
  userId: userIdField
});
z.object({
  name: nameField
});
