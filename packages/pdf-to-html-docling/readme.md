
# PDF To HTML with Docling Neural Model 

![docling_pdf_logo](https://i.imgur.com/XyTvjJu.png)

Convert PDF documents to HTML using the [`ds4sd/SmolDocling-256M-preview`](https://huggingface.co/ds4sd/SmolDocling-256M-preview) AI model from Hugging Face.

This system processes documents by extracting text with OCR while preserving layout, structure, and bounding boxes. It supports recognition of code, formulas, tables, lists, charts, and figures, ensuring accurate formatting and correspondence of captions. Full-page conversion integrates all elements—text, equations, tables, and graphics—into a cohesive output. It is designed for both scientific and non-scientific documents, offering comprehensive document processing capabilities.

## Features

- 📄 Convert PDF files to structured HTML
- 🤖 Uses advanced SmolDocling AI model for accurate text extraction
- 🎨 Generates clean, styled HTML output
- 📱 Responsive HTML design

📐 Layout and Localization – Preserves document structure and document element bounding boxes.
💻 Code Recognition – Detects and formats code blocks including identation.
🔢 Formula Recognition – Identifies and processes mathematical expressions.
📊 Chart Recognition – Extracts and interprets chart data.
📑 Table Recognition – Supports column and row headers for structured table extraction.
🖼️ Figure Classification – Differentiates figures and graphical elements.
📝 Caption Correspondence – Links captions to relevant images and figures.
📜 List Grouping – Organizes and structures list elements correctly.
📄 Full-Page Conversion – Processes entire pages for comprehensive document conversion including all page elements (code, equations, tables, charts etc.)
🔲 OCR with Bounding Boxes – OCR regions using a bounding box.

## Prerequisites

- Node.js 16.0.0 or higher
- Hugging Face API key (free account required)

## Installation

1. **Clone or download the files**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Get your Hugging Face API key:**
   - Go to https://huggingface.co/settings/tokens
   - Create a new token (read access is sufficient)
   - Copy the token

4. **Set environment variable:**
   ```bash
   # Linux/Mac
   export HF_API_KEY="your_api_key_here"
   
   # Windows
   set HF_API_KEY=your_api_key_here
   ```

## Usage

### Command Line Interface

**Basic usage:**
```bash
npm run convert document.pdf
```

**Specify output file:**
```bash
npm run convert document.pdf output.html
```

**Direct node execution:**
```bash
node pdf-converter.js document.pdf
node pdf-converter.js document.pdf custom-output.html
```

### Programmatic Usage

```javascript
const PDFToHTMLConverter = require('./pdf-converter');

async function convertPDF() {
  const converter = new PDFToHTMLConverter(process.env.HF_API_KEY);
  
  try {
    const outputPath = await converter.convertPDFToHTML(
      'input.pdf',
      'output.html'
    );
    console.log('Conversion completed:', outputPath);
  } catch (error) {
    console.error('Conversion failed:', error);
  }
}

convertPDF();
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run convert` | Run the converter (shows help if no args) |
| `npm run convert:help` | Show usage help |
| `npm test <pdf-file>` | Test conversion with a PDF file |
| `npm run clean` | Remove temporary files and generated HTML |
| `npm run setup` | Show setup instructions |

## Configuration Options

The converter accepts several options when used programmatically:

```javascript
// PDF to images conversion options
const imageOptions = {
  density: 150,        // DPI for image conversion
  format: 'png',       // Output format
  width: 1600,         // Max width
  height: 1600,        // Max height
  savePath: './temp'   // Temporary directory
};

const imagePaths = await converter.convertPDFToImages(pdfPath, imageOptions);
```

## Output Features

The generated HTML includes:

- **Clean styling** with modern CSS
- **Responsive design** that works on mobile devices
- **Page separation** with clear page headers
- **Structured content** with proper headings and lists
- **Conversion metadata** showing date and model used

## Performance Notes

- **Processing time**: Approximately 1-3 minutes per page (depending on content complexity)
- **Model**: Uses the optimized `mlx-bf16` variant for better performance
- **Image optimization**: Automatically resizes images for optimal model processing
- **Retry logic**: Handles model loading delays with automatic retries

## Troubleshooting

### Common Issues

**API Key Error:**
```
❌ HF_API_KEY environment variable is required
```
**Solution:** Set your Hugging Face API key as described in installation.

**Model Loading Error:**
```
⏳ Model loading, retrying...
```
**Solution:** This is normal. The model takes time to load on first use. The script will retry automatically.

**File Not Found:**
```
❌ PDF file not found: document.pdf
```
**Solution:** Check the file path is correct and the file exists.

**Memory Issues:**
- Try converting smaller PDFs or fewer pages at once
- Ensure you have sufficient RAM available

### Getting Help

**Show help:**
```bash
node pdf-converter.js
```

**Test with example:**
```bash
npm test path/to/your/test.pdf
```

**View example usage:**
```bash
node test-converter.js --example
```

## Example Output

The converter generates HTML like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Converted PDF Document</title>
    <style>/* Beautiful CSS styling */</style>
</head>
<body>
    <div class="conversion-info">
        <strong>Document converted using SmolDocling AI model</strong>
        Conversion date: 12/15/2023, 2:30:45 PM
    </div>
    
    <div class="page">
        <div class="page-header">
            <h2>Page 1</h2>
        </div>
        <!-- Extracted content here -->
    </div>
    
    <!-- Additional pages... -->
</body>
</html>
```

## Dependencies

- **axios**: HTTP client for API requests
- **canvas**: Image processing
- **form-data**: Multipart form handling
- **pdf2pic**: PDF to image conversion
- **sharp**: Image optimization

## License

MIT License - feel free to use and modify as needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Model Information
This converter uses the `ds4sd/SmolDocling-256M-preview-mlx-bf16` model from Hugging Face, which is optimized for:

- Document layout understanding
- Text extraction from images
- Markdown formatting
- Multi-language support

For more information about the model, visit: https://huggingface.co/ds4sd/SmolDocling-256M-preview-mlx-bf16