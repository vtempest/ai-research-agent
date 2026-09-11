import type { WeatherForecastData, WeatherForecastOptions, WeatherLocation } from '../types';
import { readCachedForecast, readStaleForecast, writeCachedForecast } from '../lib/cache';
import {
  clampInteger,
  MAX_FORECAST_DAYS,
  MAX_FORECAST_HOURS,
  normalizeCoordinates,
  normalizeTimezone,
} from '../lib/validate';
import { getClientLocation } from './geolocation';
import type { GrabJsonOptions } from './http';
import { resolveWeatherProviders, type ForecastRequest } from './providers';

/**
 * Everything that goes on the wire is validated first, then the providers are
 * tried in order until one answers.
 *
 * The `400 Bad Request` this used to render came from an unvalidated request:
 * a geolocation upstream answering 200 with no coordinates put `latitude=NaN`
 * in the URL, and an unknown timezone string or an out-of-range `forecastDays`
 * did the same. Those are caught in {@link buildForecastRequest} now, before a
 * request is sent, and anything that still fails falls through to the next
 * provider and finally to a stale cache entry.
 */

/** Cache key for a request, so a fallback provider's answer is reused like the primary one's. */
export function forecastCacheKey(request: ForecastRequest): string {
  const { latitude, longitude } = request.location;
  return [
    'v2',
    `${latitude},${longitude}`,
    request.temperatureUnit,
    request.windSpeedUnit,
    `${request.forecastDays}d`,
    `${request.forecastHours}h`,
    request.timezone ?? 'auto',
  ].join('|');
}

/** Resolve the location for a request, falling back to IP geolocation. */
async function resolveLocation(options: WeatherForecastOptions): Promise<WeatherLocation> {
  const explicit = normalizeCoordinates(options.latitude, options.longitude);
  if (explicit) {
    return {
      ...options.location,
      ...explicit,
      timezone: normalizeTimezone(options.location?.timezone),
    };
  }

  // Coordinates that were passed but unusable (a NaN from a parent component's
  // own geolocation, say) are treated as absent rather than sent upstream.
  return getClientLocation(options.geoEndpoint, options.ip, {
    attempts: options.retryAttempts,
    retryDelay: options.retryDelay,
    providers: options.geoProviders,
    fallbackLocation: options.fallbackLocation,
    onProviderError: options.onProviderError
      ? ({ provider, error }) => options.onProviderError?.({ provider, error, stage: 'geolocation' })
      : undefined,
  });
}

/** Validate and clamp every option into a request that no upstream can reject as malformed. */
export async function buildForecastRequest(
  options: WeatherForecastOptions = {}
): Promise<ForecastRequest> {
  const location = await resolveLocation(options);
  const transport: GrabJsonOptions = {
    attempts: options.retryAttempts,
    retryDelay: options.retryDelay,
    timeout: options.timeout,
  };

  return {
    location,
    temperatureUnit: options.temperatureUnit || 'fahrenheit',
    windSpeedUnit: options.windSpeedUnit || 'mph',
    forecastDays: clampInteger(options.forecastDays ?? 5, 5, 1, MAX_FORECAST_DAYS),
    forecastHours: clampInteger(options.forecastHours ?? 24, 24, 1, MAX_FORECAST_HOURS),
    // `undefined` means "let the provider resolve the zone from the
    // coordinates" (Open-Meteo's `timezone=auto`); an unrecognised zone string
    // is dropped here rather than sent, since Open-Meteo answers 400 for one.
    timezone: normalizeTimezone(options.location?.timezone),
    transport,
  };
}

/**
 * Current, hourly and daily forecast for a location.
 *
 * @param options Location, units, range, provider chain and retry settings.
 * @returns The first provider's answer, a cached one, or -- if every provider
 *   failed and `allowStaleCache` is on -- the last good answer for this exact
 *   request.
 */
export async function getWeatherForecast(
  options: WeatherForecastOptions = {}
): Promise<WeatherForecastData> {
  const request = await buildForecastRequest(options);
  const key = forecastCacheKey(request);

  const cached = readCachedForecast<WeatherForecastData>(key);
  if (cached) return cached;

  const providers = resolveWeatherProviders(options.weatherProviders);
  const failures: string[] = [];

  for (const provider of providers) {
    try {
      const data = await provider.fetchForecast(request);
      writeCachedForecast(key, data);
      return data;
    } catch (error) {
      const failure = error instanceof Error ? error : new Error(String(error));
      options.onProviderError?.({ provider: provider.id, error: failure, stage: 'forecast' });
      // grab-url already labelled the message `Weather request failed: ...`;
      // the provider's own name replaces that prefix in the summary below.
      failures.push(`${provider.label}: ${failure.message.replace(/^Weather request failed:\s*/, '')}`);
    }
  }

  // Every upstream is down or rate-limited: a forecast from up to a few hours
  // ago is still a better widget than an error message.
  if (options.allowStaleCache !== false) {
    const stale = readStaleForecast<WeatherForecastData>(key);
    if (stale) return stale;
  }

  throw new Error(`Weather request failed: ${failures.join('; ')}`);
}
