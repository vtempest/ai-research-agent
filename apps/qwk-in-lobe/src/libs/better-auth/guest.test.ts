// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { isLikelyBot } from './guest';

describe('isLikelyBot', () => {
  it('flags crawlers, unfurlers, scripts and missing user agents', () => {
    expect(
      isLikelyBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'),
    ).toBe(true);
    expect(isLikelyBot('facebookexternalhit/1.1')).toBe(true);
    expect(isLikelyBot('curl/8.5.0')).toBe(true);
    expect(isLikelyBot('')).toBe(true);
    expect(isLikelyBot(null)).toBe(true);
  });

  it('lets real browsers through', () => {
    expect(
      isLikelyBot(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
      ),
    ).toBe(false);
    expect(
      isLikelyBot(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36',
      ),
    ).toBe(false);
  });
});
