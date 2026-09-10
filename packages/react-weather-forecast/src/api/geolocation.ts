import type { WeatherLocation } from '../types';
import { grabJson } from './http';

const DEFAULT_IP_API_URL = 'https://ipapi.co';

/**
 * ipapi.co's free tier rate-limits by IP and answers a 200 carrying
 * `{ error: true, reason: 'RateLimited' }`, and a geo worker can drop a
 * request while it cold-starts. Both clear on their own, so the lookup is
 * repeated before the error reaches the caller.
 */
const DEFAULT_ATTEMPTS = 3;
const DEFAULT_RETRY_DELAY_MS = 500;

export type GeolocationOptions = {
  /** default=3 How many times the lookup is tried before the error is thrown. */
  attempts?: number;
  /** default=500 Milliseconds to wait before the second try; each further wait grows by that much. */
  retryDelay?: number;
};

type IpApiResponse = {
  city?: string;
  region?: string;
  country_name?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  error?: boolean;
  reason?: string;
};

type GeoWorkerResponse = {
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  latitude?: number | string;
  longitude?: number | string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function lookupViaWorker(geoEndpoint: string, ip?: string): Promise<WeatherLocation> {
  const url = ip ? `${geoEndpoint}?ip=${encodeURIComponent(ip)}` : geoEndpoint;
  const data = await grabJson<GeoWorkerResponse>(url, 'Geolocation worker lookup');

  return {
    city: data.city,
    region: data.region,
    country: data.country,
    timezone: data.timezone,
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
  };
}

async function lookupViaIpApi(ip?: string): Promise<WeatherLocation> {
  const url = `${DEFAULT_IP_API_URL}/${ip ? `${encodeURIComponent(ip)}/` : ''}json/`;
  const data = await grabJson<IpApiResponse>(url, 'ipapi.co lookup');

  return {
    city: data.city,
    region: data.region,
    country: data.country_name,
    timezone: data.timezone,
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
  };
}

/**
 * Resolve the caller's location, either from a deployed geo worker or from
 * ipapi.co directly.
 *
 * A failed lookup is repeated with a growing delay and only the last error is
 * thrown, so a single rate-limited or cold-started response no longer takes
 * the whole forecast down with it.
 *
 * @param geoEndpoint URL of a deployed geo worker; omit to use ipapi.co.
 * @param ip Look up this IP instead of the caller's own.
 * @param options How often to repeat the lookup, and how long to wait between tries.
 */
export async function getClientLocation(
  geoEndpoint?: string,
  ip?: string,
  options: GeolocationOptions = {}
): Promise<WeatherLocation> {
  const attempts = Math.max(1, Math.trunc(options.attempts ?? DEFAULT_ATTEMPTS));
  const retryDelay = Math.max(0, options.retryDelay ?? DEFAULT_RETRY_DELAY_MS);

  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return geoEndpoint ? await lookupViaWorker(geoEndpoint, ip) : await lookupViaIpApi(ip);
    } catch (error) {
      lastError = error;
      if (attempt < attempts && retryDelay > 0) await wait(retryDelay * attempt);
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
