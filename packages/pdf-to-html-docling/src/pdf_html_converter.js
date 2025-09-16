#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const pdf2pic = require('pdf2pic');
const axios = require('axios');
const FormData = require('form-data');
const sharp = require('sharp');

class PDFToHTMLConverter {
  constructor(huggingFaceApiKey) {
    this.apiKey = huggingFaceApiKey;
    this.modelEndpoint = 'https://api-inference.huggingface.co/models/ds4sd/SmolDocling-256M-preview-mlx-bf16';
    this.maxRetries = 3;
    this.retryDelay = 2000; // 2 seconds
  }

  /**
   * Convert PDF to images using pdf2pic
   */
  async convertPDFToImages(pdfPath, options = {}) {
    const defaultOptions = {
      density: 150,
      saveFilename: 'page',
      savePath: './temp_images',
      format: 'png',
      width: 1600,
      height: 1600
    };

    const config = { ...defaultOptions, ...options };

    try {
      // Ensure temp directory exists
      await fs.mkdir(config.savePath, { recursive: true });

      const convert = pdf2pic.fromPath(pdfPath, config);
      const results = await convert.bulk(-1); // Convert all pages

      console.log(`✅ Converted ${results.length} pages to images`);
      return results.map(result => result.path);
    } catch (error) {
      console.error('❌ Error converting PDF to images:', error);
      throw error;
    }
  }

  /**
   * Resize and optimize image for model processing
   */
  async optimizeImage(imagePath, maxSize = 1600) {
    try {
      const outputPath = imagePath.replace('.png', '_optimized.png');
      
      await sharp(imagePath)
        .resize(maxSize, maxSize, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .png({ quality: 90 })
        .toFile(outputPath);

      return outputPath;
    } catch (error) {
      console.error('❌ Error optimizing image:', error);
      throw error;
    }
  }

  /**
   * Send image to Hugging Face model for markdown extraction
   */
  async extractMarkdownFromImage(imagePath, retryCount = 0) {
    try {
      const imageBuffer = await fs.readFile(imagePath);
      
      const formData = new FormData();
      formData.append('file', imageBuffer, {
        filename: path.basename(imagePath),
        contentType: 'image/png'
      });

      const response = await axios.post(this.modelEndpoint, formData, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          ...formData.getHeaders()
        },
        timeout: 120000 // 2 minutes timeout
      });

      if (response.data && response.data.length > 0) {
        return response.data[0].generated_text || response.data[0].text || '';
      }

      return '';
    } catch (error) {
      if (error.response?.status === 503 && retryCount < this.maxRetries) {
        console.log(`⏳ Model loading, retrying in ${this.retryDelay/1000}s... (${retryCount + 1}/${this.maxRetries})`);
        await this.sleep(this.retryDelay);
        return this.extractMarkdownFromImage(imagePath, retryCount + 1);
      }

      console.error('❌ Error extracting markdown from image:', error.message);
      throw error;
    }
  }

  /**
   * Convert markdown to HTML
   */
  markdownToHTML(markdown) {
    if (!markdown || typeof markdown !== 'string') {
      return '<p>No content extracted</p>';
    }

    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    // Wrap in paragraphs and handle lists
    html = '<p>' + html + '</p>';
    html = html.replace(/<p>(<li>.*<\/li>)<\/p>/g, '<ul>$1</ul>');
    html = html.replace(/<\/li><br><li>/g, '</li><li>');

    return html;
  }

  /**
   * Generate complete HTML document
   */
  generateHTMLDocument(htmlContent, title = 'Converted PDF Document') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .page {
            background: white;
            margin-bottom: 30px;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .page-header {
            border-bottom: 2px solid #e0e0e0;
            margin-bottom: 20px;
            padding-bottom: 10px;
        }
        h1, h2, h3 {
            color: #2c3e50;
            margin-top: 0;
        }
        h1 { font-size: 2em; }
        h2 { font-size: 1.5em; }
        h3 { font-size: 1.2em; }
        ul, ol {
            padding-left: 20px;
        }
        li {
            margin-bottom: 5px;
        }
        p {
            margin-bottom: 15px;
            text-align: justify;
        }
        strong {
            color: #2c3e50;
        }
        .conversion-info {
            background: #e8f4f8;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="conversion-info">
        <strong>Document converted using SmolDocling AI model</strong><br>
        Conversion date: ${new Date().toLocaleString()}
    </div>
    ${htmlContent}
</body>
</html>`;
  }

  /**
   * Main conversion function
   */
  async convertPDFToHTML(pdfPath, outputPath = null) {
    console.log('🚀 Starting PDF to HTML conversion...');
    
    try {
      // Step 1: Convert PDF to images
      console.log('📄 Converting PDF to images...');
      const imagePaths = await this.convertPDFToImages(pdfPath);

      // Step 2: Process each image
      const htmlPagesContent = [];
      
      for (let i = 0; i < imagePaths.length; i++) {
        const imagePath = imagePaths[i];
        console.log(`🖼️  Processing page ${i + 1}/${imagePaths.length}...`);

        // Optimize image
        const optimizedImagePath = await this.optimizeImage(imagePath);

        // Extract markdown
        console.log(`🤖 Extracting content from page ${i + 1}...`);
        const markdown = await this.extractMarkdownFromImage(optimizedImagePath);

        // Convert to HTML
        const pageHTML = this.markdownToHTML(markdown);
        
        htmlPagesContent.push(`
          <div class="page">
            <div class="page-header">
              <h2>Page ${i + 1}</h2>
            </div>
            ${pageHTML}
          </div>
        `);

        console.log(`✅ Page ${i + 1} processed successfully`);
      }

      // Step 3: Generate final HTML document
      const completeHTML = this.generateHTMLDocument(
        htmlPagesContent.join('\n'),
        `Converted: ${path.basename(pdfPath, '.pdf')}`
      );

      // Step 4: Save HTML file
      const finalOutputPath = outputPath || pdfPath.replace('.pdf', '.html');
      await fs.writeFile(finalOutputPath, completeHTML, 'utf8');

      // Step 5: Cleanup temporary files
      await this.cleanup();

      console.log(`🎉 Conversion completed! HTML saved to: ${finalOutputPath}`);
      return finalOutputPath;

    } catch (error) {
      console.error('❌ Conversion failed:', error);
      await this.cleanup();
      throw error;
    }
  }

  /**
   * Clean up temporary files
   */
  async cleanup() {
    try {
      await fs.rmdir('./temp_images', { recursive: true });
      console.log('🧹 Temporary files cleaned up');
    } catch (error) {
      // Ignore cleanup errors
    }
  }

  /**
   * Sleep utility function
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  
  // Check for special commands
  if (args.includes('--download-model') || args.includes('-d')) {
    console.log('📥 Downloading model for offline use...');
    const converter = new PDFToHTMLConverter();
    try {
      await converter.downloadModel();
      console.log('✅ Model download completed!');
    } catch (error) {
      console.error('❌ Model download failed:', error.message);
      process.exit(1);
    }
    return;
  }

  if (args.includes('--clear-cache')) {
    console.log('🗑️ Clearing model cache...');
    const converter = new PDFToHTMLConverter();
    try {
      await converter.clearModelCache();
      console.log('✅ Cache cleared!');
    } catch (error) {
      console.error('❌ Failed to clear cache:', error.message);
    }
    return;
  }

  if (args.includes('--cache-info')) {
    console.log('📊 Model cache information...');
    const converter = new PDFToHTMLConverter();
    try {
      const cacheSize = await converter.getModelCacheSize();
      if (cacheSize > 0) {
        console.log(`💾 Cache size: ${(cacheSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`📂 Cache location: ${converter.modelCache}`);
      } else {
        console.log('ℹ️ No model cache found');
      }
    } catch (error) {
      console.error('❌ Failed to get cache info:', error.message);
    }
    return;
  }
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
📚 PDF to HTML Converter using SmolDocling

Usage: node pdf-converter.js [options] <pdf-file> [output-file]

Options:
  --download-model, -d  Download model for offline use
  --clear-cache         Clear downloaded model cache
  --cache-info          Show model cache information
  --help, -h            Show this help message

Examples:
  # Download model (first time setup)
  node pdf-converter.js --download-model
  
  # Convert PDF to HTML
  node pdf-converter.js document.pdf
  
  # Convert with custom output
  node pdf-converter.js document.pdf output.html

Note: This model only supports local processing (no API mode available)

Setup:
  1. npm install
  2. node pdf-converter.js --download-model
  3. node pdf-converter.js your-document.pdf
    `);
    process.exit(args.includes('--help') || args.includes('-h') ? 0 : 1);
  }

  // Parse command line arguments
  const pdfPath = args.find(arg => !arg.startsWith('-') && arg.endsWith('.pdf'));
  const outputPath = args.find(arg => !arg.startsWith('-') && !arg.endsWith('.pdf'));

  if (!pdfPath) {
    console.error('❌ No PDF file specified');
    process.exit(1);
  }

  // Check if PDF file exists
  try {
    await fs.access(pdfPath);
  } catch (error) {
    console.error(`❌ PDF file not found: ${pdfPath}`);
    process.exit(1);
  }

  try {
    const converter = new PDFToHTMLConverter();
    await converter.convertPDFToHTML(pdfPath, outputPath);
  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
    if (error.message.includes('model')) {
      console.log('💡 Try downloading the model first with: node pdf-converter.js --download-model');
    }
    process.exit(1);
  }
}

// Export for programmatic use
module.exports = PDFToHTMLConverter;

// Run CLI if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}