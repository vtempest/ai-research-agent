import assert from 'assert';
import * as cheerio from 'cheerio';

import { setScore, getScore } from  '../../src/extractor/html-to-content/extract-content/extractor2-content.js';


describe('Scoring utils', () => {
  describe('setScore(node, $, amount)', () => {
    it("sets the specified amount as the node's score", () => {
      const $ = cheerio.load('<p>Foo</p>');
      const $node = $('p').first();
      const newScore = 25;
      setScore($node, $, newScore);

      const score = getScore($node);
      assert(score, newScore);
    });
  });
});
