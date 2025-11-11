const { AutoTokenizer, AutoProcessor, pipeline, env } = require('@huggingface/transformers');
const fs = require('fs');
const path = require('path');

// Configure to use local models if needed
env.allowLocalModels = false;
env.allowRemoteModels = true;

async function ocrImageToText(imagePathOrUrl) {
    try {
        console.log("Loading SmolDocling model...");
        
        // Try to use the model directly with pipeline
        // This should work if Transformers.js supports the ONNX version
        const pipe = await pipeline("image-to-text", "ds4sd/SmolDocling-256M-preview", {
            device: 'cpu',
            dtype: 'fp32'
        });
        
        // Handle local files
        let imageInput = imagePathOrUrl;
        if (!imagePathOrUrl.startsWith('http') && fs.existsSync(imagePathOrUrl)) {
            const mimeType = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.bmp': 'image/bmp',
                '.webp': 'image/webp'
            }[path.extname(imagePathOrUrl).toLowerCase()] || 'image/png';
            
            const imageBuffer = fs.readFileSync(imagePathOrUrl);
            const base64 = imageBuffer.toString('base64');
            imageInput = `data:${mimeType};base64,${base64}`;
        }
        
        console.log("Processing image with SmolDocling...");
        
        // Try the chat template format first
        try {
            const messages = [
                {
                    role: "user",
                    content: [
                        { type: "image", image: imageInput },
                        { type: "text", text: "Extract all text from this image." }
                    ]
                }
            ];
            
            const result = await pipe(messages, {
                max_new_tokens: 512,
                temperature: 0.1
            });
            
            console.log("OCR Result:", result);
            return result;
            
        } catch (chatError) {
            console.log("Chat template failed, trying direct image input...");
            
            // Fallback to direct image input
            const result = await pipe(imageInput, {
                max_new_tokens: 512,
                temperature: 0.1
            });
            
            console.log("OCR Result:", result);
            return result;
        }
        
    } catch (modelError) {
        console.error("SmolDocling model failed:", modelError.message);
        console.log("Falling back to TrOCR...");
        
        // Fallback to TrOCR if SmolDocling fails
        const fallbackPipe = await pipeline("image-to-text", "Xenova/trocr-base-printed");
        
        // Handle local files for fallback
        let imageInput = imagePathOrUrl;
        if (!imagePathOrUrl.startsWith('http') && fs.existsSync(imagePathOrUrl)) {
            const mimeType = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.bmp': 'image/bmp',
                '.webp': 'image/webp'
            }[path.extname(imagePathOrUrl).toLowerCase()] || 'image/png';
            
            const imageBuffer = fs.readFileSync(imagePathOrUrl);
            const base64 = imageBuffer.toString('base64');
            imageInput = `data:${mimeType};base64,${base64}`;
        }
        
        console.log("Processing with TrOCR fallback...");
        const result = await fallbackPipe(imageInput);
        console.log("OCR Result (TrOCR):", result[0]?.generated_text || result);
        return result;
    }
}

async function ocrImageToTextAdvanced(imagePathOrUrl) {
    try {
        console.log("Loading SmolDocling components manually...");
        
        // Load processor and tokenizer separately
        const processor = await AutoProcessor.from_pretrained("ds4sd/SmolDocling-256M-preview");
        const tokenizer = await AutoTokenizer.from_pretrained("ds4sd/SmolDocling-256M-preview");
        
        // Handle image input
        let imageInput = imagePathOrUrl;
        if (!imagePathOrUrl.startsWith('http') && fs.existsSync(imagePathOrUrl)) {
            const imageBuffer = fs.readFileSync(imagePathOrUrl);
            const base64 = imageBuffer.toString('base64');
            const mimeType = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.bmp': 'image/bmp',
                '.webp': 'image/webp'
            }[path.extname(imagePathOrUrl).toLowerCase()] || 'image/png';
            imageInput = `data:${mimeType};base64,${base64}`;
        }
        
        // Create messages in the expected format
        const messages = [
            {
                role: "user",
                content: [
                    { type: "image", image: imageInput },
                    { type: "text", text: "Extract all text from this image." }
                ]
            }
        ];
        
        console.log("Applying chat template...");
        const inputs = await processor.apply_chat_template(messages, {
            add_generation_prompt: true,
            tokenize: true,
            return_dict: true,
            return_tensors: "pt"
        });
        
        console.log("Manual processing not fully supported in Transformers.js");
        console.log("Falling back to pipeline approach...");
        
        return await ocrImageToText(imagePathOrUrl);
        
    } catch (error) {
        console.error("Advanced processing failed:", error.message);
        return await ocrImageToText(imagePathOrUrl);
    }
}

// Usage: node ocr.js image.jpg OR node ocr.js https://...jpg
const imagePathOrUrl = process.argv[2];

if (!imagePathOrUrl) {
    console.error('Usage: node ocr.js <image_path_or_url>');
    console.error('Example: node ocr.js image.png');
    console.error('Example: node ocr.js https://example.com/image.jpg');
    process.exit(1);
}

// Try the advanced method first, fall back to simple method
ocrImageToTextAdvanced(imagePathOrUrl)
    .then(() => console.log("\nOCR completed successfully"))
    .catch(error => {
        console.error('\nOCR Error:', error.message);
        process.exit(1);
    });