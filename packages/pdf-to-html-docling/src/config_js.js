// Configuration file for PDF to HTML Converter
// Modify these settings to customize the conversion process

module.exports = {
  // Model Configuration
  model: {
    // Local model name (Hugging Face model ID)
    localModelName: 'ds4sd/SmolDocling-256M-preview',
    
    // API endpoint for remote processing
    apiEndpoint: '',
    // Model cache directory (relative to project root)
    cacheDir: './model_cache',
    
    // Model generation parameters
    generation: {
      maxNewTokens: 1024,
      doSample: false,
      numBeams: 1,
      temperature: 0.1
    }
  },

  // PDF Processing Configuration
  pdf: {
    // DPI for PDF to image conversion (higher = better quality, slower)
    density: 150,
    
    // Image format for conversion
    format: 'png',
    
    // Maximum image dimensions for optimization
    maxImageWidth: 1600,
    maxImageHeight: 1600,
    
    // Image quality for optimization (0-100)
    imageQuality: 90,
    
    // Temporary directory for processing
    tempDir: './temp_images'
  },

  // API Configuration
  api: {
    // Maximum retries for API calls
    maxRetries: 3,
    
    // Delay between retries (milliseconds)
    retryDelay: 2000,
    
    // Request timeout (milliseconds)
    timeout: 120000
  },

  // HTML Output Configuration
  html: {
    // CSS theme for output HTML
    theme: {
      // Font family
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      
      // Colors
      colors: {
        background: '#f9f9f9',
        pageBackground: 'white',
        text: '#333',
        headings: '#2c3e50',
        accent: '#3498db',
        localMode: '#28a745',
        apiMode: '#ffc107'
      },
      
      // Layout
      layout: {
        maxWidth: '800px',
        pagePadding: '30px',
        pageMargin: '30px',
        borderRadius: '8px'
      }
    },
    
    // Include conversion metadata in output
    includeMetadata: true,
    
    // Include processing mode indicator
    showProcessingMode: true
  },

  // Performance Configuration
  performance: {
    // Memory limit for Node.js (in MB, affects local processing)
    memoryLimit: 4096,
    
    // Concurrent processing (experimental - set to 1 for stability)
    concurrentPages: 1,
    
    // Enable garbage collection hints
    enableGC: true
  },

  // Logging Configuration
  logging: {
    // Log level: 'debug', 'info', 'warn', 'error'
    level: 'info',
    
    // Show processing progress
    showProgress: true,
    
    // Show timing information
    showTiming: true,
    
    // Show memory usage
    showMemoryUsage: false
  },

  // Advanced Features
  advanced: {
    // Custom preprocessing function for images
    // preprocessImage: null, // Function: (imagePath) => Promise<string>
    
    // Custom postprocessing function for markdown
    // postprocessMarkdown: null, // Function: (markdown) => string
    
    // Custom HTML template
    // htmlTemplate: null, // Function: (content, title, config) => string
    
    // Enable experimental features
    experimental: {
      // Parallel page processing (may use more memory)
      parallelProcessing: false,
      
      // Advanced image preprocessing
      advancedImagePreprocessing: false,
      
      // Markdown optimization
      markdownOptimization: true
    }
  }
};

// Example of custom functions (uncomment and modify as needed):

/*
// Custom image preprocessing
function preprocessImage(imagePath) {
  // Add your custom image preprocessing here
  // Return the path to the processed image
  return imagePath;
}

// Custom markdown postprocessing
function postprocessMarkdown(markdown) {
  // Add your custom markdown processing here
  // Example: remove specific patterns, enhance formatting, etc.
  return markdown
    .replace(/\[CONFIDENTIAL\]/g, '[REDACTED]')
    .replace(/TODO:/g, '**TODO:**');
}

// Custom HTML template
function customHtmlTemplate(content, title, config) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="stylesheet" href="custom-styles.css">
</head>
<body>
    <header>
        <h1>Custom Document Converter</h1>
    </header>
    <main>
        ${content}
    </main>
    <footer>
        <p>Converted on ${new Date().toISOString()}</p>
    </footer>
</body>
</html>
  `;
}

// Apply custom functions
module.exports.advanced.preprocessImage = preprocessImage;
module.exports.advanced.postprocessMarkdown = postprocessMarkdown;
module.exports.advanced.htmlTemplate = customHtmlTemplate;
*/