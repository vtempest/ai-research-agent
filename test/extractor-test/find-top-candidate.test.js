import assert from 'assert';
import * as cheerio from 'cheerio';

import { getScore, findTopCandidate, scoreContent } from  '../../src/extractor/html-to-content/extract-content/extractor2-content.js';


const fs = require('fs');

describe('findTopCandidate($)', () => {
  it('finds the top candidate from simple case', () => {
    const $ = cheerio.load(`
      <div score="100">
        <p score="1">Lorem ipsum etc</p>
      </div>
    `);

    const $$topCandidate = findTopCandidate($);

    assert.equal(getScore($$topCandidate), 100);
  });

  it('finds the top candidate from a nested case', () => {
    const $ = cheerio.load(`
      <div score="10">
        <article score="50">
          <p score="1">Lorem ipsum etc</p>
        </article>
      </div>
    `);

    const $$topCandidate = findTopCandidate($);

    // this is wrapped in a div so checking the score of the first child
    assert.equal(getScore($$topCandidate.first()), 50);
  });

  it('ignores tags like BR', () => {
    const $ = cheerio.load(`
      <article score="50">
        <p score="1">Lorem ipsum br</p>
        <br score="1000" />
      </article>
    `);

    const $topCandidate = findTopCandidate($);

    assert.equal(getScore($topCandidate), 50);
  });

  it('returns BODY if no candidates found', () => {
    const $ = cheerio.load(`
      <body>
        <article>
          <p>Lorem ipsum etc</p>
          <br />
        </article>
      <body>
    `);

    const $topCandidate = findTopCandidate($);

    // browser won't allow body tag to be placed arbitrarily/loaded on the page,
    // so we tranform it in cheerio-query, so this test would fail.
    if (!$.browser) {
      assert.equal($topCandidate.get(0).tagName, 'body');
    }
  });


});
