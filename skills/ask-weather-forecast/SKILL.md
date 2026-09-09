---
name: ask-weather-forecast
description: Guide to react-weather-forecast (packages/react-weather-forecast, published as use-weather-forecast), the Open-Meteo weather widget — getWeatherForecast and its location resolution (explicit coordinates, a geo Worker, or ipapi.co), getClientLocation, the useWeatherForecast hook, the WeatherForecast component and its compact mode, the WMO-code-to-icon mapping, the 30-minute localStorage cache, and the bundled Cloudflare geo Worker. Use when embedding or restyling the weather widget, when it resolves the wrong location or rate-limits, when adding a weather condition or icon, or when deploying the geo Worker.
---

# Working With react-weather-forecast

Directory `packages/react-weather-forecast`; the npm name is **`use-weather-forecast`**
— mind the mismatch when adding it as a dependency. Forecast data comes from
[Open-Meteo](https://open-meteo.com) (no API key), and the location comes from IP
geolocation.

## Setup

```tsx
import { WeatherForecast, useWeatherForecast, getWeatherForecast } from "use-weather-forecast";

<WeatherForecast compact temperatureUnit="celsius" windSpeedUnit="kmh" />
<WeatherForecast latitude={40.7} longitude={-74} />               // skip geolocation
<WeatherForecast geoEndpoint="https://geo.you.workers.dev" />     // use the bundled worker
```

Peers: `react`, `react-dom`. No key, no bundled data.

## Location resolution, in order

1. **`latitude` + `longitude`** given → used directly, no lookup.
2. **`geoEndpoint`** set → `GET {geoEndpoint}` (plus `?ip=` when `ip` is given). That is
   the bundled `worker/geo-worker.ts`, which uses Cloudflare's own `request.cf` geo data
   for the caller and falls back to ipapi.co for an explicit `ip`.
3. Otherwise → **`https://ipapi.co/json/`** directly from the browser.

Option 3 is the default and is the usual source of trouble: ipapi.co rate-limits by IP,
and calling it from the client exposes the visitor to a third party. Deploy the worker
(`bun run worker:deploy`) and pass `geoEndpoint` for anything real.

## Options and shapes

| Option | Default | Meaning |
| --- | --- | --- |
| `latitude` / `longitude` | — | Explicit coordinates; both required to skip geolocation |
| `location` | — | `Partial<WeatherLocation>`; its `timezone` overrides Open-Meteo's `auto` |
| `locations` | — | `WeatherLocationInput[]` for a multi-location widget |
| `geoEndpoint`, `ip` | — | See above |
| `forecastDays` | `5` | |
| `forecastHours` | `24` | |
| `temperatureUnit` | `"fahrenheit"` | or `"celsius"` |
| `windSpeedUnit` | `"mph"` | or `"kmh"`, `"ms"`, `"kn"` |

The component adds `className`, `style` and `compact`.

Data: `WeatherForecastData { location, current, hourly[], daily[] }` with
`CurrentWeather { time, temperature, weatherCode, icon, isDay?, rain?, showers?,
snowfall?, windSpeed? }`, `HourlyWeather` (adds `precipitationProbability`) and
`DailyWeather`. `WeatherCondition` is the icon union — `sun`, `cloud-sun`, `clouds`,
`cloud-fog`, `cloud-drizzle`, `cloud-showers`, `cloud-showers-heavy`, `cloud-sleet`,
`cloud-snow`, `snowflake`, `cloud-bolt`, `cloud-hail`.

## Recipes

**Icons.** Open-Meteo returns a numeric WMO `weather_code`; `getWeatherIcon` (in
`src/weatherCodes.ts`) maps it to a `WeatherCondition`, and `<WeatherIcon>` renders it.
Add a condition in both places.

**Caching.** 30 minutes in `localStorage`, keyed by the full Open-Meteo URL (prefix
`weather-forecast-cache:`). Any option that changes the URL is a different cache entry.
`clearWeatherForecastCache()` clears it.

**Timezones.** `timezone` defaults to `auto` (Open-Meteo infers it from the
coordinates). The component formats times with `Intl.DateTimeFormat` in that zone and
falls back to the browser's zone when the string is missing or invalid.

## Troubleshooting

| Symptom | Cause → fix |
| --- | --- |
| The package isn't found as `react-weather-forecast` | The npm name is `use-weather-forecast`. |
| Wrong city, or the datacenter's location | IP geolocation resolved the server or a VPN exit. Pass explicit coordinates, or use `geoEndpoint` so Cloudflare's edge geo is used. |
| `ipapi.co lookup failed: …` | Rate-limited or blocked. Deploy the geo worker and set `geoEndpoint`. |
| `Geolocation worker lookup failed: <status>` | The endpoint is wrong or not deployed. |
| `Invalid weather response` | Open-Meteo replied without `current`/`hourly`/`daily` — usually invalid coordinates (only one of lat/lon given, so the pair was ignored). |
| Stale data after changing units | Different units → different URL → different cache key, but an unchanged URL keeps its 30-minute entry. `clearWeatherForecastCache()`. |
| Times are in the wrong zone | Pass `location.timezone`, or let `auto` do its job — do not set a zone that disagrees with the coordinates. |
| SSR errors | The component is client-side and the cache guards on `typeof window`; mark the host boundary `'use client'`. |
| An unknown weather code renders no icon | Add the WMO code to `weatherCodes.ts` and, if needed, a new `WeatherCondition` plus its SVG. |
| Worker commands can't find a config | Use the `worker:*` scripts, which pass `--config worker/wrangler.jsonc`. |
