import assert from 'assert';
import * as cheerio from 'cheerio';

import { getScore } from '../../src/extractor/html-to-content/extract-content/extractor2-content';

describe('Scoring utils', () => {
  describe('getScore($node)', () => {
    it('returns null if the node has no score set', () => {
      const $ = cheerio.load('<p>Foo</p>');
      assert.equal(getScore($('p').first()), null);
    });

    it('returns 25 if the node has a score attr of 25', () => {
      const $ = cheerio.load('<p score="25">Foo</p>');
      const score = getScore($('p').first());
      assert.equal(typeof score, 'number');
      assert.equal(score, 25);
    });
  });
});
