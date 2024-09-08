import assert from 'assert';
import * as cheerio from 'cheerio';

import { scoreContent, getScore } from  '../../src/extractor/html-to-content/extract-content/extractor2-content.js';


// TODO: Walk through these and sanity check my scores
// Commented out scores were what I expected, but I was also
// probably missing something when calculating
describe('scoreContent($, weightNodes)', () => {
  it('loves hNews content', () => {
    const $ = cheerio.load(`
      <div class="hentry">
        <p class="entry-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
      </div>
    `);
    scoreContent($);

    assert.equal(getScore($('div').first()), 140);
  });

  it('is so-so about non-hNews content', () => {
    const $ = cheerio.load(`
      <div class="">
        <p class="entry-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <p class="entry-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
      </div>
    `);
    scoreContent($);

    assert.equal(getScore($('div').first()), 65);
  });

  it('scores this Wired article the same', async () => {
    const html = await (await fetch("https://www.slashgear.com/1652836/what-makes-airplane-tire-explode/")).text()
    const $ = cheerio.load(html);
    scoreContent($);

    assert.equal(getScore($('article').first()), 47.5);
  });

  it('scores this Vulture article',async  () => {

    const html = await (await fetch("https://www.vulture.com/2016/09/dc-comics-greg-berlanti-c-v-r.html")).text()
    let $ = cheerio.load(html);
    $ = scoreContent($);

    assert.equal($('p[score]').length, 29);
  });

  it('gives its parent all of the children scores', () => {
    const html = `
      <div score="0">
        <div score="0">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book.
          </p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book.
          </p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book.
          </p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book.
          </p>
        </div>
      </div>
    `;

    const $ = cheerio.load(html);
    scoreContent($);

    assert.equal(
      $('p')
        .first()
        .attr('score'),
      '5'
    );
    assert.equal($('div div').attr('score'), '30');
  });
});
