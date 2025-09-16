async function testConverter() {
  console.log('🧪 Testing PDF to HTML Converter...\n');

  // Parse command line arguments
  const args = process.argv.slice(2);
  const useLocal = args.includes('--local') || args.includes('-l');
  const testPdfPath = args.find(arg => !arg.startsWith('-'));

  console.log(`📋 Test mode: ${useLocal ? 'Local Model (Offline)' : 'Remote API'}`);

  // Check for API key if not using local mode
  if (!useLocal && !process.env.HF_API_KEY) {
    console.error('❌ Please set HF_API_KEY environment variable for API mode');
    console.log('Example: export HF_API_KEY="your_api_key_here"');
    console.log('💡 Or use --local flag for offline testing');
    process.exit(1);
  }
  
  if (!testPdfPath) {
    console.log('Usage: npm test [--local] <path-to-pdf-file>');
    console.log('Examples:');
    console.log('  npm test sample.pdf              # Test with API');
    console.log('  npm test --local sample.pdf      # Test with local model');
    console.log('  npm run test:local sample.pdf    # Test with local model');
    process.exit(1);
  }

  try {
    // Check if test PDF exists
    await fs.access(testPdfPath);
    console.log(`✅ Found test PDF: ${testPdfPath}`);

    // Initialize converter
    const converter = new PDFToHTMLConverter(process.env.HF_API_KEY, useLocal);

    // Download model if using local mode and model#!/usr/bin/env node

const PDFToHTMLConverter = require('./pdf-converter');
const fs = require('fs').promises;
const path = require('path');

async function testConverter() {
  console.log('🧪 Testing PDF to HTML Converter...\n');

  // Check if API key is set
  if (!process.env.HF_API_KEY) {
    console.error('❌ Please set HF_API_KEY environment variable');
    console.log('Example: export HF_API_KEY="your_api_key_here"');
    process.exit(1);
  }

  // Create a simple test if no PDF is provided
  const testPdfPath = process.argv[2];
  
  if (!testPdfPath) {
    console.log('Usage: npm test <path-to-pdf-file>');
    console.log('Example: npm test sample.pdf');
    process.exit(1);
  }

  try {
    // Check if test PDF exists
    await fs.access(testPdfPath);
    console.log(`✅ Found test PDF: ${testPdfPath}`);

    // Initialize converter
    const converter = new PDFToHTMLConverter(process.env.HF_API_KEY);

    // Start conversion
    console.log('🚀 Starting test conversion...\n');
    const startTime = Date.now();

    const outputPath = await converter.convertPDFToHTML(
      testPdfPath,
      testPdfPath.replace('.pdf', '_test_output.html')
    );

    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    console.log(`\n✅ Test completed successfully!`);
    console.log(`📊 Conversion took: ${duration} seconds`);
    console.log(`📄 Output file: ${outputPath}`);

    // Check output file exists and get size
    const stats = await fs.stat(outputPath);
    console.log(`📏 Output file size: ${Math.round(stats.size / 1024)} KB`);

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Programmatic usage example
async function exampleUsage() {
  console.log('📖 Example usage:\n');
  
  const exampleCode = `
// Example: Using the converter programmatically

const PDFToHTMLConverter = require('./pdf-converter');

// Basic usage - local model only
async function convertMyPDF() {
  const converter = new PDFToHTMLConverter(); // No API key needed - local only
  
  try {
    // Download model if not cached (first time only)
    await converter.downloadModel();
    
    // Convert PDF
    const outputPath = await converter.convertPDFToHTML(
      'my-document.pdf',
      'my-document.html'
    );
    console.log('Conversion completed:', outputPath);
  } catch (error) {
    console.error('Conversion failed:', error);
  }
}

// Check model status
async function checkModelStatus() {
  const converter = new PDFToHTMLConverter();
  
  const cacheSize = await converter.getModelCacheSize();
  if (cacheSize > 0) {
    console.log(\`Model cached: \${(cacheSize / 1024 / 1024).toFixed(2)} MB\`);
    console.log('Ready for offline processing!');
  } else {
    console.log('Model not cached - run downloadModel() first');
  }
}

// Batch processing
async function convertMultiplePDFs(pdfFiles) {
  const converter = new PDFToHTMLConverter();
  
  // Ensure model is downloaded
  await converter.downloadModel();
  
  for (const pdfFile of pdfFiles) {
    console.log(\`Converting \${pdfFile}...\`);
    await converter.convertPDFToHTML(pdfFile);
  }
}

// Usage examples
convertMyPDF();
// checkModelStatus();
// convertMultiplePDFs(['doc1.pdf', 'doc2.pdf', 'doc3.pdf']);
  `;
  
  console.log(exampleCode);
}

// Run test if this file is executed directly
if (require.main === module) {
  if (process.argv[2] === '--example') {
    exampleUsage();
  } else {
    testConverter().catch(console.error);
  }
}