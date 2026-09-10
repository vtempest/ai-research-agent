import grab from 'grab-url';

/**
 * Shared JSON transport for every upstream this package talks to (the geo
 * worker, the IP geolocation providers and the weather providers).
 *
 * `grab-url` is the HTTP client used across this repo rather than `fetch`: it
 * parses the JSON, applies a timeout and can repeat a failed request itself.
 * Unlike `fetch` it resolves rather than rejects when a request fails, handing
 * back the message on `.error`, so every call site has to inspect the payload
 * -- that check lives here so the callers can just `await` a typed body.
 *
 * On top of that this module adds what the upstreams actually need to stay up:
 * a classified retry loop (repeat what can recover, give up immediately on a
 * request the server called invalid) with exponential backoff.
 */
export type GrabJsonOptions = {
  headers?: Record<string, string>;
  /** default=3 Total tries for this request, including the first one. */
  attempts?: number;
  /** default=400 Milliseconds before the second try; each further wait doubles. */
  retryDelay?: number;
  /** default=15 Seconds before a single try is aborted. */
  timeout?: number;
  /**
   * default=0 Times grab-url itself repeats a try that failed at the transport
   * level, inside each of our `attempts`. Left at 0 so the backoff and the
   * status classification below stay in charge of every repeat.
   */
  retryAttempts?: number;
  /**
   * default=false Repeat even when the server rejected the request as invalid
   * (a 4xx other than 408/429). Off by default: replaying a request that is
   * malformed only wastes the upstream's rate limit.
   */
  retryClientErrors?: boolean;
};

/**
 * Both kinds of upstream can answer HTTP 200 with an error flag instead of
 * data: ipapi.co does it for rate limits, Open-Meteo for a malformed query.
 */
type ErrorPayload = { error?: boolean | string; reason?: string };

/** Statuses worth repeating: the upstream is busy, cold or briefly broken. */
const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504, 520, 521, 522, 523, 524]);

/** A failed upstream call, carrying the HTTP status when the failure had one. */
export class HttpRequestError extends Error {
  readonly status?: number;
  readonly retryable: boolean;

  constructor(message: string, options: { status?: number; retryable?: boolean } = {}) {
    super(message);
    this.name = 'HttpRequestError';
    this.status = options.status;
    this.retryable = options.retryable ?? isRetryableStatus(options.status);
  }
}

/** No status at all means the request never reached the server -- worth a repeat. */
export function isRetryableStatus(status?: number): boolean {
  if (status === undefined) return true;
  return RETRYABLE_STATUS.has(status) || status >= 500;
}

/**
 * grab-url reports a failed request as `HTTP error: 429 Too Many Requests`.
 * That prefix is noise once the message is nested under `<label> failed:`,
 * so drop it and keep the status.
 */
function describeFailure(error: string): string {
  return error.replace(/^HTTP error:\s*/i, '').trim() || 'unknown error';
}

/** Read the HTTP status back out of the message grab-url built for it. */
function parseStatus(error: string): number | undefined {
  const match = /^\s*(?:HTTP error:\s*)?([1-5]\d{2})\b/.exec(error.replace(/^HTTP error:\s*/i, 'HTTP error: '));
  const status = match ? Number(match[1]) : Number.NaN;
  return Number.isFinite(status) ? status : undefined;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * grab-url writes a parsed JSON object to the root of its response, but hands
 * back anything it could not parse as JSON under `.data`. Unwrap that shape so
 * providers only ever see the body itself.
 */
function unwrapBody<T>(payload: Record<string, unknown>): T {
  const keys = Object.keys(payload).filter((key) => key !== 'isLoading' && key !== 'error');
  if (keys.length === 1 && keys[0] === 'data') {
    const body = payload.data;
    if (body && typeof body === 'object') return body as T;
  }
  return payload as T;
}

/** One try. Throws an {@link HttpRequestError} describing why it failed. */
async function grabJsonOnce<T>(url: string, label: string, options: GrabJsonOptions): Promise<T> {
  const { headers, retryAttempts = 0, timeout = 15 } = options;

  const data = (await grab(url, {
    headers,
    retryAttempts,
    timeout,
    // Several widgets (or several locations in one widget) hit the same path
    // at once, and grab-url aborts the earlier call of a duplicate path by
    // default -- which would surface as a spurious failure here.
    cancelOngoingIfNew: false,
    // These upstreams answer JSON; skip grab-url's HTML/ZIP post-processing so
    // an error page is never handed back as a parsed DOM.
    dom: false,
    unzip: false,
  })) as (T & ErrorPayload) | null | undefined;

  if (typeof data?.error === 'string') {
    const status = parseStatus(data.error);
    throw new HttpRequestError(`${label} failed: ${describeFailure(data.error)}`, { status });
  }

  if (data?.error === true) {
    // A 200 carrying an error flag is the upstream's own complaint (a rate
    // limit, or a query it could not parse) rather than a transport failure.
    const reason = data.reason ?? 'unknown error';
    throw new HttpRequestError(`${label} failed: ${reason}`, {
      retryable: /rate|limit|busy|timeout|try again/i.test(reason),
    });
  }

  if (!data) throw new HttpRequestError(`${label} failed: empty response`);

  return unwrapBody<T>(data as unknown as Record<string, unknown>);
}

/**
 * Request a JSON body, repeating what can recover and throwing a labelled
 * {@link HttpRequestError} once it cannot.
 *
 * @param url Full URL to request.
 * @param label Prefix for the thrown message, e.g. `ipapi.co lookup`.
 * @param options Transport and retry options.
 */
export async function grabJson<T>(
  url: string,
  label: string,
  options: GrabJsonOptions = {}
): Promise<T> {
  const attempts = Math.max(1, Math.trunc(options.attempts ?? 3));
  const retryDelay = Math.max(0, options.retryDelay ?? 400);

  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await grabJsonOnce<T>(url, label, options);
    } catch (error) {
      lastError = error;

      const retryable =
        !(error instanceof HttpRequestError) || error.retryable || options.retryClientErrors === true;
      if (!retryable || attempt === attempts) break;

      // Exponential backoff: 1x, 2x, 4x ... of the configured delay.
      if (retryDelay > 0) await wait(retryDelay * 2 ** (attempt - 1));
    }
  }

  throw lastError instanceof Error ? lastError : new HttpRequestError(String(lastError));
}
