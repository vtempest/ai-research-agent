import { beforeEach, describe, expect, it, vi, type MockedFunction } from 'vitest';
import { getClientLocation } from '../src/api/geolocation';
import grab from 'grab-url';

vi.mock('grab-url');
const mockGrab = grab as MockedFunction<typeof grab>;

/** grab-url resolves with the parsed body, or with `{ error }` when a request failed. */
function grabResolves(...responses: unknown[]) {
  for (const response of responses) mockGrab.mockResolvedValueOnce(response as never);
  return mockGrab;
}

/** No delay between tries: the repeat behaviour is what is under test, not the backoff. */
const noDelay = { retryDelay: 0 };

describe('getClientLocation', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('via the bundled geo worker', () => {
    it('requests the endpoint and normalizes the payload', async () => {
      grabResolves({
        city: 'Austin',
        region: 'Texas',
        country: 'United States',
        timezone: 'America/Chicago',
        latitude: 30.27,
        longitude: -97.74,
      });

      const location = await getClientLocation('https://geo.example.workers.dev');

      expect(mockGrab.mock.calls[0][0]).toBe('https://geo.example.workers.dev');
      expect(location).toEqual({
        city: 'Austin',
        region: 'Texas',
        country: 'United States',
        timezone: 'America/Chicago',
        latitude: 30.27,
        longitude: -97.74,
      });
    });

    it('coerces string coordinates to numbers', async () => {
      grabResolves({ latitude: '30.27', longitude: '-97.74' });

      const location = await getClientLocation('https://geo.example.workers.dev');

      expect(location.latitude).toBe(30.27);
      expect(location.longitude).toBe(-97.74);
    });

    it('passes an explicit IP through as a URL-encoded query param', async () => {
      grabResolves({ latitude: 1, longitude: 2 });

      await getClientLocation('https://geo.example.workers.dev', '8.8.8.8');

      expect(mockGrab.mock.calls[0][0]).toBe('https://geo.example.workers.dev?ip=8.8.8.8');
    });

    it('throws with the status code when the worker errors', async () => {
      grabResolves({ error: 'HTTP error: 502 Bad Gateway' });

      await expect(
        getClientLocation('https://geo.example.workers.dev', undefined, { attempts: 1 })
      ).rejects.toThrow('Geolocation worker lookup failed: 502 Bad Gateway');
    });
  });

  describe('via ipapi.co (default)', () => {
    it('hits the json endpoint and maps country_name to country', async () => {
      grabResolves({
        city: 'Berlin',
        region: 'Berlin',
        country_name: 'Germany',
        timezone: 'Europe/Berlin',
        latitude: 52.52,
        longitude: 13.4,
      });

      const location = await getClientLocation();

      expect(mockGrab.mock.calls[0][0]).toBe('https://ipapi.co/json/');
      expect(location).toEqual({
        city: 'Berlin',
        region: 'Berlin',
        country: 'Germany',
        timezone: 'Europe/Berlin',
        latitude: 52.52,
        longitude: 13.4,
      });
    });

    it('scopes the lookup to an explicit IP', async () => {
      grabResolves({ latitude: 1, longitude: 2 });

      await getClientLocation(undefined, '1.1.1.1');

      expect(mockGrab.mock.calls[0][0]).toBe('https://ipapi.co/1.1.1.1/json/');
    });

    it('throws on a failed request', async () => {
      grabResolves({ error: 'HTTP error: 429 Too Many Requests' });

      await expect(getClientLocation(undefined, undefined, { attempts: 1 })).rejects.toThrow(
        'ipapi.co lookup failed: 429 Too Many Requests'
      );
    });

    it('throws on a 200 response carrying an error flag', async () => {
      grabResolves({ error: true, reason: 'RateLimited' });

      await expect(getClientLocation(undefined, undefined, { attempts: 1 })).rejects.toThrow(
        'ipapi.co lookup failed: RateLimited'
      );
    });

    it('falls back to a generic message when no reason is given', async () => {
      grabResolves({ error: true });

      await expect(getClientLocation(undefined, undefined, { attempts: 1 })).rejects.toThrow(
        'ipapi.co lookup failed: unknown error'
      );
    });

    it('throws when the response is empty', async () => {
      grabResolves(null);

      await expect(getClientLocation(undefined, undefined, { attempts: 1 })).rejects.toThrow(
        'ipapi.co lookup failed: empty response'
      );
    });
  });

  describe('repeating a failed lookup', () => {
    it('retries a rate-limited lookup and returns the first good response', async () => {
      grabResolves(
        { error: true, reason: 'RateLimited' },
        { city: 'Austin', latitude: 30.27, longitude: -97.74 }
      );

      const location = await getClientLocation(undefined, undefined, noDelay);

      expect(mockGrab).toHaveBeenCalledTimes(2);
      expect(location.city).toBe('Austin');
    });

    it('repeats the lookup three times by default before giving up', async () => {
      mockGrab.mockResolvedValue({ error: true, reason: 'RateLimited' } as never);

      await expect(getClientLocation(undefined, undefined, noDelay)).rejects.toThrow(
        'ipapi.co lookup failed: RateLimited'
      );
      expect(mockGrab).toHaveBeenCalledTimes(3);
    });

    it('honours a custom attempt count', async () => {
      mockGrab.mockResolvedValue({ error: true, reason: 'RateLimited' } as never);

      await expect(
        getClientLocation(undefined, undefined, { attempts: 5, retryDelay: 0 })
      ).rejects.toThrow('ipapi.co lookup failed: RateLimited');
      expect(mockGrab).toHaveBeenCalledTimes(5);
    });

    it('repeats a worker lookup too', async () => {
      grabResolves({ error: 'HTTP error: 502 Bad Gateway' }, { latitude: 1, longitude: 2 });

      const location = await getClientLocation('https://geo.example.workers.dev', undefined, noDelay);

      expect(mockGrab).toHaveBeenCalledTimes(2);
      expect(location.latitude).toBe(1);
    });

    it('waits between tries when a delay is configured', async () => {
      grabResolves({ error: true, reason: 'RateLimited' }, { latitude: 1, longitude: 2 });

      const start = Date.now();
      await getClientLocation(undefined, undefined, { retryDelay: 20 });

      expect(Date.now() - start).toBeGreaterThanOrEqual(20);
      expect(mockGrab).toHaveBeenCalledTimes(2);
    });

    it('never repeats a lookup that succeeded', async () => {
      grabResolves({ latitude: 1, longitude: 2 });

      await getClientLocation(undefined, undefined, noDelay);

      expect(mockGrab).toHaveBeenCalledTimes(1);
    });
  });
});
