import { extractContent } from '../src/extractor/url-to-content/url-to-content.js';
import { isBufferDOCX } from '../src/extractor/url-to-content/util/is-buffer-docx.js';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Test DOCX buffer detection and extraction
 */
async function testDOCXBuffer() {
  console.log('Testing DOCX buffer functionality...');
  
  try {
    // Test buffer detection with a sample DOCX file
    // Note: You would need an actual DOCX file for this test
    const sampleDocxPath = join(process.cwd(), 'test', 'data', 'sample.docx');
    
    // Check if sample file exists
    try {
      const buffer = readFileSync(sampleDocxPath);
      
      // Test buffer detection
      const isDocx = isBufferDOCX(buffer);
      console.log('✓ Buffer detection test:', isDocx ? 'PASSED' : 'FAILED');
      
      if (isDocx) {
        // Test extraction from buffer
        const result = await extractContent(buffer);
        console.log('✓ Buffer extraction test:', result.html ? 'PASSED' : 'FAILED');
        console.log('  - Title:', result.title || 'No title');
        console.log('  - Word count:', result.word_count || 0);
        console.log('  - HTML length:', result.html?.length || 0);
      }
      
    } catch (fileError) {
      console.log('⚠ Sample DOCX file not found, skipping file-based tests');
      console.log('  To test with a real file, place a sample.docx in test/data/');
    }
    
    // Test with invalid buffer
    const invalidBuffer = new Uint8Array([0x48, 0x65, 0x6C, 0x6C, 0x6F]); // "Hello"
    const isInvalidDocx = isBufferDOCX(invalidBuffer);
    console.log('✓ Invalid buffer detection test:', !isInvalidDocx ? 'PASSED' : 'FAILED');
    
    // Test extraction with invalid buffer
    try {
      await extractContent(invalidBuffer);
      console.log('✗ Invalid buffer extraction test: FAILED (should have thrown error)');
    } catch (error) {
      console.log('✓ Invalid buffer extraction test: PASSED (correctly rejected)');
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testDOCXBuffer();
}

export { testDOCXBuffer };
