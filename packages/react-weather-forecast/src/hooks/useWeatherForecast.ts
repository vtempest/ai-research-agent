import { useEffect, useState } from 'react';
import type { WeatherForecastData, WeatherForecastOptions } from '../types';
import { getWeatherForecast } from '../api/forecast';

/** Provider lists are usually inline arrays, so the effect keys off their ids. */
function providerKey(options: WeatherForecastOptions): string {
  const ids = (list: WeatherForecastOptions['weatherProviders'] | WeatherForecastOptions['geoProviders']) =>
    (list ?? []).map((provider) => (typeof provider === 'string' ? provider : provider.id)).join(',');

  return `${ids(options.weatherProviders)}|${ids(options.geoProviders)}`;
}

/**
 * Fetch a forecast for `options`, refetching whenever they change.
 *
 * The last good forecast is kept while a refetch is in flight *and* if that
 * refetch fails, so a rate-limited upstream leaves the widget showing the
 * previous data rather than replacing it with an error.
 */
export function useWeatherForecast(options: WeatherForecastOptions = {}) {
  const [data, setData] = useState<WeatherForecastData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getWeatherForecast(options)
      .then((result) => { if (active) setData(result); })
      .catch((err) => { if (active) setError(err instanceof Error ? err : new Error('Unknown error')); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [
    options.latitude,
    options.longitude,
    options.geoEndpoint,
    options.ip,
    options.forecastDays,
    options.forecastHours,
    options.temperatureUnit,
    options.windSpeedUnit,
    options.location?.timezone,
    options.retryAttempts,
    options.retryDelay,
    options.timeout,
    options.allowStaleCache,
    options.fallbackLocation?.latitude,
    options.fallbackLocation?.longitude,
    providerKey(options),
  ]);

  return { data, error, loading };
}
