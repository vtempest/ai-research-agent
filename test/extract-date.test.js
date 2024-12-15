import { describe, it, expect } from 'vitest';
import { extractDate } from '../src/extractor/html-to-cite/extract-date/extract-date.js'; 
import { parseHTML } from 'linkedom';

describe('extractDate', () => {
  it('should extract the date from a given URL', async () => {
    const urls = [
      'https://www.newsbreak.com/politico-560779/3666655180867-trump-won-t-just-change-washington-politics-he-ll-change-life-in-the-city',
      'https://www.pbs.org/newshour/politics/trump-issues-early-challenge-to-republican-led-senate-with-defiant-nominations',
      'https://www.nytimes.com/2024/10/26/us/politics/trump-democracy-threats.html'
    ];
    const html = await (await fetch(urls[2])).text();
    const { document } = parseHTML(html);

    const date = extractDate(document.body, 
      true,
      true,
      "%Y-%m-%d",
      urls[2],
      false
    );

    expect(date).toBeTruthy();
    console.log(date);
  });
});