/**
 * @file pdf2html.js
 * @description Server implementation for converting PDF/Images to HTML/Docling format using Granite model.
 * Uses Hono for the server framework and Hugging Face Transformers for the AI model.
 */
// server.js
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import {
    AutoProcessor,
    AutoModelForVision2Seq,
    load_image,
    TextStreamer,
} from "@huggingface/transformers";

// Initialize the model and processor
/** @type {any} Global reference to the loaded Granite model */
let model = null;
/** @type {any} Global reference to the loaded processor */
let processor = null;
/** @type {Promise<{model: any, processor: any}>|null} Promise to track initialization status */
let initializationPromise = null;

/**
 * Initializes the Granite Docling model and processor.
 * Uses the Singleton pattern to ensure only one instance is created.
 *
 * @returns {Promise<{model: any, processor: any}>} The initialized model and processor
 */
async function initializeModel() {
    if (model && processor) {
        return { model, processor };
    }

    if (initializationPromise) {
        return initializationPromise;
    }

    initializationPromise = (async () => {
        console.log('Initializing Granite Docling model...');
        const model_id = "onnx-community/granite-docling-258M-ONNX";

        processor = await AutoProcessor.from_pretrained(model_id);
        model = await AutoModelForVision2Seq.from_pretrained(model_id, {
            dtype: "fp32",
            // device: "webgpu", // optional: for WebGPU acceleration
        });

        console.log('Model initialized successfully');
        return { model, processor };
    })();

    return initializationPromise;
}

// Create OpenAPI app
/** @type {OpenAPIHono} The Hono application instance with OpenAPI support */
const app = new OpenAPIHono();

// Middleware
/**
 * Register global middleware.
 * - CORS enabled for all routes
 * - Logger enabled for all routes
 */
app.use('*', cors());
app.use('*', logger());

// Define schemas
/**
 * Schema for the image conversion request body.
 */
const ConvertImageBodySchema = z.object({
    imageUrl: z.string().url().describe('URL of the image to convert'),
    prompt: z.string().optional().default('Convert this page to docling.').describe('Custom prompt for conversion'),
    maxTokens: z.number().int().min(1).max(8192).optional().default(4096).describe('Maximum number of tokens to generate'),
    streaming: z.boolean().optional().default(false).describe('Enable streaming response'),
});

/**
 * Schema for the image conversion response.
 */
const ConvertImageResponseSchema = z.object({
    success: z.boolean(),
    result: z.string().describe('Converted docling text'),
    metadata: z.object({
        processingTime: z.number().describe('Processing time in milliseconds'),
        tokenCount: z.number().optional().describe('Number of tokens generated'),
    }),
});

/**
 * Schema for error responses.
 */
const ErrorResponseSchema = z.object({
    success: z.boolean().default(false),
    error: z.string(),
    code: z.string().optional(),
});

/**
 * Schema for health check response.
 */
const HealthResponseSchema = z.object({
    status: z.string(),
    modelLoaded: z.boolean(),
    uptime: z.number(),
    version: z.string(),
});

// Define routes
/**
 * Route configuration for the image conversion endpoint.
 * Accepts an image URL and returns the converted text.
 */
const convertImageRoute = createRoute({
    method: 'post',
    path: '/api/v1/convert',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: ConvertImageBodySchema,
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: ConvertImageResponseSchema,
                },
            },
            description: 'Successful conversion',
        },
        400: {
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
            description: 'Bad request',
        },
        500: {
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
            description: 'Internal server error',
        },
    },
    tags: ['Document Conversion'],
    summary: 'Convert image to docling format',
    description: 'Converts an image URL to docling format using the Granite Docling model',
});

/**
 * Route configuration for the base64 image conversion endpoint.
 * Accepts a base64 encoded image and returns the converted text.
 */
const convertImageBase64Route = createRoute({
    method: 'post',
    path: '/api/v1/convert-base64',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        imageBase64: z.string().describe('Base64 encoded image'),
                        mimeType: z.string().optional().default('image/png').describe('MIME type of the image'),
                        prompt: z.string().optional().default('Convert this page to docling.').describe('Custom prompt for conversion'),
                        maxTokens: z.number().int().min(1).max(8192).optional().default(4096).describe('Maximum number of tokens to generate'),
                        streaming: z.boolean().optional().default(false).describe('Enable streaming response'),
                    }),
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: ConvertImageResponseSchema,
                },
            },
            description: 'Successful conversion',
        },
        400: {
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
            description: 'Bad request',
        },
        500: {
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
            description: 'Internal server error',
        },
    },
    tags: ['Document Conversion'],
    summary: 'Convert base64 image to docling format',
    description: 'Converts a base64 encoded image to docling format using the Granite Docling model',
});

/**
 * Route configuration for the health check endpoint.
 */
const healthRoute = createRoute({
    method: 'get',
    path: '/health',
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: HealthResponseSchema,
                },
            },
            description: 'Health check response',
        },
    },
    tags: ['System'],
    summary: 'Health check',
    description: 'Check if the service is running and model is loaded',
});

// Track server start time for uptime
/** @type {number} Timestamp when the server started, used for calculating uptime */
const startTime = Date.now();

// Implement health check endpoint
/**
 * Health check endpoint handler.
 * Returns the service status, model load status, and uptime.
 */
app.openapi(healthRoute, async (c) => {
    return c.json({
        status: 'healthy',
        modelLoaded: model !== null && processor !== null,
        uptime: Date.now() - startTime,
        version: '1.0.0',
    });
});

// Implement convert endpoint
/**
 * Image conversion endpoint handler.
 * Downloads the image from the provided URL and processes it using the Granite model.
 */
app.openapi(convertImageRoute, async (c) => {
    const startProcessing = Date.now();
    var generated_ids = 0;

    try {
        const { imageUrl, prompt, maxTokens, streaming } = c.req.valid('json');

        // Initialize model if needed
        const { model, processor } = await initializeModel();

        // Load image from URL
        let image;
        try {
            image = await load_image(imageUrl);
        } catch (error) {
            return c.json({
                success: false,
                error: 'Failed to load image from URL',
                code: 'IMAGE_LOAD_ERROR',
            }, 400);
        }

        // Prepare messages
        const messages = [{
            role: "user",
            content: [
                { type: "image" },
                { type: "text", text: prompt }
            ]
        }];

        // Apply chat template
        const text = processor.apply_chat_template(messages, {
            add_generation_prompt: true
        });

        // Process inputs
        const inputs = await processor(text, [image], {
            do_image_splitting: true,
        });

        // Generate response
        let generatedText = '';
        if (streaming) {
            // For streaming, we would need to implement Server-Sent Events
            // This is a simplified version
            const streamer = new TextStreamer(processor.tokenizer, {
                skip_prompt: true,
                skip_special_tokens: false,
                on_finalized_text: (text) => {
                    generatedText += text;
                },
            });

            generated_ids = await model.generate({
                ...inputs,
                max_new_tokens: maxTokens,
                streamer,
            });

            const generated_texts = processor.batch_decode(
                generated_ids.slice(null, [inputs.input_ids.dims.at(-1), null]),
                { skip_special_tokens: true },
            );

            generatedText = generated_texts[0];
        } else {
            generated_ids = await model.generate({
                ...inputs,
                max_new_tokens: maxTokens,
            });

            const generated_texts = processor.batch_decode(
                generated_ids.slice(null, [inputs.input_ids.dims.at(-1), null]),
                { skip_special_tokens: true },
            );

            generatedText = generated_texts[0];
        }

        const processingTime = Date.now() - startProcessing;

        return c.json({
            success: true,
            result: generatedText,
            metadata: {
                processingTime,
                // tokenCount: generated_ids ? generated_ids.dims[1] : undefined,
            },
        });

    } catch (error) {
        console.error('Conversion error:', error);
        return c.json({
            success: false,
            error: error.message || 'Internal processing error',
            code: 'PROCESSING_ERROR',
        }, 500);
    }
});

// Implement convert base64 endpoint
/**
 * Base64 image conversion endpoint handler.
 * Decodes the base64 image and processes it using the Granite model.
 */
app.openapi(convertImageBase64Route, async (c) => {
    const startProcessing = Date.now();

    try {
        const { imageBase64, mimeType, prompt, maxTokens, streaming } = c.req.valid('json');

        // Initialize model if needed
        const { model, processor } = await initializeModel();

        // Convert base64 to image
        let image;
        try {
            // Create data URL from base64
            const dataUrl = `data:${mimeType};base64,${imageBase64}`;
            image = await load_image(dataUrl);
        } catch (error) {
            return c.json({
                success: false,
                error: 'Failed to decode base64 image',
                code: 'IMAGE_DECODE_ERROR',
            }, 400);
        }

        // Prepare messages
        const messages = [{
            role: "user",
            content: [
                { type: "image" },
                { type: "text", text: prompt }
            ]
        }];

        // Apply chat template
        const text = processor.apply_chat_template(messages, {
            add_generation_prompt: true
        });

        // Process inputs
        const inputs = await processor(text, [image], {
            do_image_splitting: true,
        });

        // Generate response
        let generatedText = '';
        let generated_ids;

        if (streaming) {
            const streamer = new TextStreamer(processor.tokenizer, {
                skip_prompt: true,
                skip_special_tokens: false,
                on_finalized_text: (text) => {
                    generatedText += text;
                },
            });

            generated_ids = await model.generate({
                ...inputs,
                max_new_tokens: maxTokens,
                streamer,
            });
        } else {
            generated_ids = await model.generate({
                ...inputs,
                max_new_tokens: maxTokens,
            });
        }

        const generated_texts = processor.batch_decode(
            generated_ids.slice(null, [inputs.input_ids.dims.at(-1), null]),
            { skip_special_tokens: true },
        );

        generatedText = generated_texts[0];

        const processingTime = Date.now() - startProcessing;

        return c.json({
            success: true,
            result: generatedText,
            metadata: {
                processingTime,
                tokenCount: generated_ids ? generated_ids.dims[1] : undefined,
            },
        });

    } catch (error) {
        console.error('Conversion error:', error);
        return c.json({
            success: false,
            error: error.message || 'Internal processing error',
            code: 'PROCESSING_ERROR',
        }, 500);
    }
});

// Add streaming endpoint for Server-Sent Events
/**
 * Streaming conversion endpoint handler.
 * Uses Server-Sent Events (SSE) to stream the generated text token by token.
 */
app.post('/api/v1/convert-stream', async (c) => {
    const body = await c.req.json();
    const { imageUrl, prompt = 'Convert this page to docling.', maxTokens = 4096 } = body;

    c.header('Content-Type', 'text/event-stream');
    c.header('Cache-Control', 'no-cache');
    c.header('Connection', 'keep-alive');

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            try {
                const { model, processor } = await initializeModel();

                const image = await load_image(imageUrl);
                const messages = [{
                    role: "user",
                    content: [
                        { type: "image" },
                        { type: "text", text: prompt }
                    ]
                }];

                const text = processor.apply_chat_template(messages, {
                    add_generation_prompt: true
                });

                const inputs = await processor(text, [image], {
                    do_image_splitting: true,
                });

                let fullText = '';
                const streamer = new TextStreamer(processor.tokenizer, {
                    skip_prompt: true,
                    skip_special_tokens: false,
                    on_finalized_text: (text) => {
                        fullText += text;
                        const data = `data: ${JSON.stringify({ text, done: false })}\n\n`;
                        controller.enqueue(encoder.encode(data));
                    },
                });

                await model.generate({
                    ...inputs,
                    max_new_tokens: maxTokens,
                    streamer,
                });

                // Send final message
                const finalData = `data: ${JSON.stringify({ text: '', done: true, fullText })}\n\n`;
                controller.enqueue(encoder.encode(finalData));
                controller.close();

            } catch (error) {
                const errorData = `data: ${JSON.stringify({ error: error.message, done: true })}\n\n`;
                controller.enqueue(encoder.encode(errorData));
                controller.close();
            }
        },
    });

    return new Response(stream);
});

// OpenAPI documentation
app.doc('/openapi.json', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'Granite Docling API',
        description: 'API for converting images to docling format using the Granite Docling model',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
});

// Swagger UI
app.get('/docs', swaggerUI({ url: '/openapi.json' }));

// Root redirect to docs
app.get('/', (c) => c.redirect('/docs'));

// Error handling
app.onError((err, c) => {
    console.error(`${err}`);
    return c.json({
        success: false,
        error: err.message || 'Internal server error',
        code: 'INTERNAL_ERROR',
    }, 500);
});

// 404 handler
app.notFound((c) => {
    return c.json({
        success: false,
        error: 'Endpoint not found',
        code: 'NOT_FOUND',
    }, 404);
});

// Initialize model on startup (optional)
initializeModel().catch(console.error);

// Start server
/** @type {number|string} Port number for the server to listen on */
const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);
console.log(`OpenAPI documentation available at http://localhost:${port}/docs`);

/**
 * Start the Node.js server.
 */
serve({
    fetch: app.fetch,
    port,
});