import { describe, it, expect } from 'vitest';
import { extractContent } from "../index.js"

describe('DOCX Parser', () => {
  it('should fetch a DOCX file and convert it to HTML', async () => {
    // Sample DOCX file URL
    const docxUrl = 'https://file-examples.com/storage/fe91352fe66730de9982024/2017/02/file-sample_500kB.docx';
    
    const response = await extractContent(docxUrl)
    
    // Verify document content
    expect(response.html).toMatch(/Lorem ipsum/i); // Sample file contains Lorem ipsum text
  }, 40000);
});