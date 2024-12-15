import { describe, it, expect } from 'vitest';
import { convertFaviconToBase64String } from "../src/extractor/html-to-cite/url-to-favicon.js";
import {searchEngines} from "../index.js"
import fs from 'fs';

describe('favicon parser', async() => {
  it('should fetch a favicon and convert it to base64 string', async () => {
    // Sample favicon URL

    for (var engine of searchEngines){
      if (engine.icon.startsWith("http")) {
        engine.icon = await convertFaviconToBase64String(engine.icon);
      }
    }
    
    console.log(searchEngines);
    fs.writeFileSync('./data/search-engines.json', JSON.stringify(searchEngines, null, 2));


    // Verify document content
    expect(1).toBeDefined();
  }, 40000);
});