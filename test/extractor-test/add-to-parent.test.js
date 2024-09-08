import assert from 'assert';
import * as cheerio from 'cheerio';

import { addToParent, getScore } from  '../../src/extractor/html-to-content/extract-content/extractor2-content.js';


describe('Scoring utils', () => {
  describe('addToParent(node, $, amount)', () => {
    it("adds 1/4 of a node's score it its parent", () => {
      const $ = cheerio.load('<div score="25"><p score="40">Foo</p></div>');
      const $node = addToParent($('p').first(), $, 40);

      assert.equal(getScore($node.parent()), 35);
      assert.equal(getScore($node), 40);
    });
  });
});
