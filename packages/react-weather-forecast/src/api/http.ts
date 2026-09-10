import grab from 'grab-url';

/**
 * Shared JSON transport for the package's upstreams (the geo worker, ipapi.co
 * and Open-Meteo).
 *
 * `grab-url` is the HTTP client used across this repo: it parses the JSON,
 * applies a timeout and can repeat a failed request itself. Unlike `fetch` it
 * resolves rather than rejects when a request fails, handing back the message
 * on `.error`, so every call site has to inspect the payload -- that check
 * lives here so the callers can just `await` a typed body.
 */
export type GrabJsonOptions = {
  headers?: Record<string, string>;
  /** default=0 Times grab-url repeats a request that failed at the transport level. */
  retryAttempts?: number;
  /** default=15 Seconds before the request is aborted. */
  timeout?: number;
};

/**
 * Both upstreams can answer HTTP 200 with an error flag instead of data:
 * ipapi.co does it for rate limits, Open-Meteo for a malformed query.
 */
type ErrorPayload = { error?: boolean | string; reason?: string };

/**
 * grab-url reports a failed request as `HTTP error: 429 Too Many Requests`.
 * That prefix is noise once the message is nested under `<label> failed:`,
 * so drop it and keep the status.
 */
function describeFailure(error: string): string {
  return error.replace(/^HTTP error:\s*/i, '').trim() || 'unknown error';
}

/**
 * Request a JSON body, throwing a labelled error for any failure.
 *
 * @param url Full URL to request.
 * @param label Prefix for the thrown message, e.g. `ipapi.co lookup`.
 * @param options Transport options passed through to grab-url.
 */
export async function grabJson<T>(
  url: string,
  label: string,
  options: GrabJsonOptions = {}
): Promise<T> {
  const { headers, retryAttempts = 0, timeout = 15 } = options;

  const data = (await grab(url, { headers, retryAttempts, timeout })) as
    | (T & ErrorPayload)
    | null
    | undefined;

  if (typeof data?.error === 'string') {
    throw new Error(`${label} failed: ${describeFailure(data.error)}`);
  }

  if (data?.error === true) {
    throw new Error(`${label} failed: ${data.reason ?? 'unknown error'}`);
  }

  if (!data) throw new Error(`${label} failed: empty response`);

  return data as T;
}
