// src/index.js
import puppeteer from "@cloudflare/puppeteer";

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		
		// Handle different routes
		if (url.pathname === '/api/swagger' || url.pathname === '/swagger') {
			return serveSwagger();
		}
		
		if (url.pathname === '/api/openapi.json') {
			return serveOpenAPI();
		}
		
		if (url.pathname !== '/api/render' && url.pathname !== '/') {
			return new Response('Not Found', { status: 404 });
		}

		// Handle authentication
		const authResult = await authenticateRequest(request, env);
		if (!authResult.success) {
			return new Response(authResult.error, { 
				status: 401,
				headers: { 'WWW-Authenticate': 'Bearer realm="API"' }
			});
		}

		// Parse request parameters
		const params = await parseRequestParams(request);
		
		if (!params.url) {
			return new Response(
				JSON.stringify({ error: "URL parameter is required" }),
				{ 
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		// Get or create a Durable Object instance
		const id = env.BROWSER_DO.idFromName(`browser-${params.sessionId || 'default'}`);
		const browserDO = env.BROWSER_DO.get(id);
		
		// Forward the request to the Durable Object
		const response = await browserDO.fetch(request);
		return response;
	},
};

// Authentication function
async function authenticateRequest(request, env) {
	// Skip auth if no API key is set
	if (!env.API_KEY) {
		return { success: true };
	}

	const authHeader = request.headers.get('Authorization');
	const urlParams = new URL(request.url).searchParams;
	const bodyApiKey = request.method === 'POST' ? await getApiKeyFromBody(request) : null;
	
	// Check API key in Authorization header, URL params, or POST body
	let providedApiKey = null;
	
	if (authHeader && authHeader.startsWith('Bearer ')) {
		providedApiKey = authHeader.substring(7);
	} else if (urlParams.get('api_key')) {
		providedApiKey = urlParams.get('api_key');
	} else if (bodyApiKey) {
		providedApiKey = bodyApiKey;
	}
	
	if (providedApiKey !== env.API_KEY) {
		return { 
			success: false, 
			error: JSON.stringify({ error: "Invalid or missing API key" })
		};
	}
	
	return { success: true };
}

async function getApiKeyFromBody(request) {
	try {
		const contentType = request.headers.get('content-type') || '';
		if (contentType.includes('application/json')) {
			const body = await request.json();
			return body.api_key;
		} else if (contentType.includes('application/x-www-form-urlencoded')) {
			const formData = await request.formData();
			return formData.get('api_key');
		}
	} catch (e) {
		// Ignore parsing errors
	}
	return null;
}

async function parseRequestParams(request) {
	const url = new URL(request.url);
	const searchParams = url.searchParams;
	
	let bodyParams = {};
	if (request.method === 'POST') {
		try {
			const contentType = request.headers.get('content-type') || '';
			if (contentType.includes('application/json')) {
				bodyParams = await request.json();
			} else if (contentType.includes('application/x-www-form-urlencoded')) {
				const formData = await request.formData();
				bodyParams = Object.fromEntries(formData);
			}
		} catch (e) {
			// Ignore parsing errors
		}
	}
	
	return {
		url: searchParams.get('url') || bodyParams.url,
		wait: parseInt(searchParams.get('wait') || bodyParams.wait || '0'),
		blockImages: searchParams.get('blockImages') === 'true' || bodyParams.blockImages === true,
		sessionId: searchParams.get('sessionId') || bodyParams.sessionId || 'default',
		timeout: parseInt(searchParams.get('timeout') || bodyParams.timeout || '30000'),
		waitUntil: searchParams.get('waitUntil') || bodyParams.waitUntil || 'networkidle2',
		cookies: searchParams.get('cookies') || bodyParams.cookies,
		headers: bodyParams.headers || {},
		format: searchParams.get('format') || bodyParams.format || 'html',
		proxyUrl: searchParams.get('proxyUrl') || bodyParams.proxyUrl,
		proxyUser: searchParams.get('proxyUser') || bodyParams.proxyUser,
		proxyPass: searchParams.get('proxyPass') || bodyParams.proxyPass
	};
}

function serveSwagger() {
	const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Puppeteer API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui.css" />
    <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin:0; background: #fafafa; }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-bundle.js"></script>
    <script>
        SwaggerUIBundle({
            url: './openapi.json',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.presets.standalone
            ],
            plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
        });
    </script>
</body>
</html>`;
	
	return new Response(html, {
		headers: { 'Content-Type': 'text/html' }
	});
}

function serveOpenAPI() {
	const spec = {
		openapi: "3.0.3",
		info: {
			title: "Puppeteer Rendering API",
			description: "A powerful web scraping and rendering API using Puppeteer with Cloudflare Workers and Durable Objects",
			version: "2.0.0",
			contact: {
				name: "API Support"
			}
		},
		servers: [
			{
				url: "/api",
				description: "API Server"
			}
		],
		security: [
			{
				bearerAuth: []
			},
			{
				passwordAuth: []
			}
		],
		paths: {
			"/render": {
				get: {
					summary: "Render webpage (GET)",
					description: "Render a webpage using Puppeteer and return the HTML content",
					parameters: [
						{
							name: "url",
							in: "query",
							required: true,
							schema: { type: "string", format: "uri" },
							description: "The URL to render"
						},
						{
							name: "api_key",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "API key (if required)"
						},
						{
							name: "wait",
							in: "query",
							required: false,
							schema: { type: "integer", minimum: 0, maximum: 30000 },
							description: "Additional wait time in milliseconds"
						},
						{
							name: "blockImages",
							in: "query",
							required: false,
							schema: { type: "boolean" },
							description: "Block image loading to save bandwidth"
						},
						{
							name: "sessionId",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "Session ID for browser reuse and cookie persistence"
						},
						{
							name: "timeout",
							in: "query",
							required: false,
							schema: { type: "integer", minimum: 5000, maximum: 60000 },
							description: "Page load timeout in milliseconds"
						},
						{
							name: "waitUntil",
							in: "query",
							required: false,
							schema: { 
								type: "string", 
								enum: ["load", "domcontentloaded", "networkidle0", "networkidle2"]
							},
							description: "When to consider navigation succeeded"
						},
						{
							name: "cookies",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "JSON string of cookies to set"
						},
						{
							name: "format",
							in: "query",
							required: false,
							schema: { 
								type: "string", 
								enum: ["html", "json"]
							},
							description: "Response format"
						},
						{
							name: "proxyUrl",
							in: "query",
							required: false,
							schema: { type: "string", format: "uri" },
							description: "Proxy server URL (e.g., http://proxy.example.com:8080)"
						},
						{
							name: "proxyUser",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "Proxy username (if proxy requires authentication)"
						},
						{
							name: "proxyPass",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "Proxy password (if proxy requires authentication)"
						}
					],
					responses: {
						"200": {
							description: "Successfully rendered webpage",
							content: {
								"text/html": {
									schema: { type: "string" }
								},
								"application/json": {
									schema: {
										type: "object",
										properties: {
											html: { type: "string" },
											url: { type: "string" },
											title: { type: "string" },
											cookies: { type: "array" },
											performance: { type: "object" }
										}
									}
								}
							}
						},
						"400": {
							description: "Bad request - missing URL or invalid parameters"
						},
						"401": {
							description: "Unauthorized - invalid or missing password"
						},
						"500": {
							description: "Internal server error"
						}
					}
				},
				post: {
					summary: "Render webpage (POST)",
					description: "Render a webpage using Puppeteer with advanced options via POST body",
					requestBody: {
						required: true,
						content: {
							"application/json": {
								schema: {
									type: "object",
									required: ["url"],
									properties: {
										url: { type: "string", format: "uri" },
										api_key: { type: "string" },
										wait: { type: "integer", minimum: 0, maximum: 30000 },
										blockImages: { type: "boolean" },
										sessionId: { type: "string" },
										timeout: { type: "integer", minimum: 5000, maximum: 60000 },
										waitUntil: { 
											type: "string", 
											enum: ["load", "domcontentloaded", "networkidle0", "networkidle2"]
										},
										cookies: { type: "string" },
										headers: { 
											type: "object",
											additionalProperties: { type: "string" }
										},
										format: { 
											type: "string", 
											enum: ["html", "json"]
										},
										proxyUrl: { type: "string", format: "uri" },
										proxyUser: { type: "string" },
										proxyPass: { type: "string" }
									}
								}
							}
						}
					},
					responses: {
						"200": {
							description: "Successfully rendered webpage",
							content: {
								"text/html": {
									schema: { type: "string" }
								},
								"application/json": {
									schema: {
										type: "object",
										properties: {
											html: { type: "string" },
											url: { type: "string" },
											title: { type: "string" },
											cookies: { type: "array" },
											performance: { type: "object" }
										}
									}
								}
							}
						}
					}
				}
			}
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					description: "Use your API key as the bearer token"
				},
				apiKeyAuth: {
					type: "apiKey",
					in: "query",
					name: "api_key",
					description: "API key as query parameter"
				}
			}
		}
	};
	
	return new Response(JSON.stringify(spec, null, 2), {
		headers: { 'Content-Type': 'application/json' }
	});
}

// Enhanced Durable Object class with cookie storage and advanced features
export class BrowserDurableObject {
	constructor(state, env) {
		this.state = state;
		this.env = env;
		this.browser = null;
		this.lastUsed = 0;
		this.storage = state.storage;
		this.BROWSER_TIMEOUT = 5 * 60 * 1000; // 5 minutes
	}

	async fetch(request) {
		const params = await parseRequestParams(request);
		
		try {
			// Validate URL
			const normalizedUrl = new URL(params.url).toString();
			
			// Ensure we have a browser instance
			await this.ensureBrowser();
			
			// Create a new page
			const page = await this.browser.newPage();
			
			// Handle proxy authentication if credentials are provided in parameters
			if (params.proxyUser && params.proxyPass) {
				await page.authenticate({
					username: params.proxyUser,
					password: params.proxyPass
				});
			} else if (this.env.PROXY_USER && this.env.PROXY_PASS) {
				// Fallback to environment variables for proxy auth
				await page.authenticate({
					username: this.env.PROXY_USER,
					password: this.env.PROXY_PASS
				});
			}
			
			// Set a realistic user agent to avoid bot detection
			await page.setUserAgent(
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
			);
			
			// Set standard viewport for consistent rendering
			await page.setViewport({
				width: 1920,
				height: 1080,
				deviceScaleFactor: 1,
			});
			
			// Set up request interception for blocking resources
			if (params.blockImages || Object.keys(params.headers).length > 0) {
				await page.setRequestInterception(true);
				page.on('request', (request) => {
					const resourceType = request.resourceType();
					const shouldBlock = params.blockImages && resourceType === 'image';
					
					if (shouldBlock) {
						request.abort();
					} else {
						// Apply custom headers if provided
						const headers = { ...request.headers(), ...params.headers };
						request.continue({ headers });
					}
				});
			}
			
			// Load and set cookies
			await this.loadCookies(page, params.sessionId, params.cookies);
			
			// Navigate to the page
			const startTime = Date.now();
			const response = await page.goto(normalizedUrl, {
				waitUntil: params.waitUntil,
				timeout: params.timeout
			});
			
			// Additional wait if specified
			if (params.wait > 0) {
				await page.waitForTimeout(params.wait);
			}
			
			// Get page content and metadata
			const html = await page.content();
			const title = await page.title();
			const finalUrl = page.url();
			const loadTime = Date.now() - startTime;
			
			// Save cookies for this session
			const cookies = await page.cookies();
			await this.saveCookies(params.sessionId, cookies);
			
			// Close the page
			await page.close();
			
			// Update last used timestamp and schedule cleanup
			this.lastUsed = Date.now();
			await this.scheduleCleanup();
			
			// Prepare response based on format
			if (params.format === 'json') {
				const responseData = {
					html,
					url: finalUrl,
					title,
					cookies,
					performance: {
						loadTime,
						timestamp: new Date().toISOString()
					},
					metadata: {
						sessionId: params.sessionId,
						blockedResources: {
							images: params.blockImages
						}
					}
				};
				
				return new Response(JSON.stringify(responseData, null, 2), {
					headers: {
						'Content-Type': 'application/json',
						'X-Load-Time': loadTime.toString(),
						'X-Session-Id': params.sessionId,
						'Access-Control-Allow-Origin': '*',
					}
				});
			} else {
				// Add base tag for relative URLs (like in the reference code)
				const htmlWithBase = html.replace(
					/<head[^>]*>/i,
					`<head><base href='${normalizedUrl.split("/").slice(0, 3).join("/")}/'>`
				);
				
				return new Response(htmlWithBase, {
					headers: {
						'Content-Type': 'text/html; charset=utf-8',
						'X-Load-Time': loadTime.toString(),
						'X-Session-Id': params.sessionId,
						'X-Final-URL': finalUrl,
						'Access-Control-Allow-Origin': '*',
					}
				});
			}
			
		} catch (error) {
			console.error('Error rendering page:', error);
			await this.closeBrowser();
			
			return new Response(
				JSON.stringify({ 
					error: `Failed to render page: ${error.message}`,
					timestamp: new Date().toISOString()
				}),
				{ 
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}
	}

	async loadCookies(page, sessionId, cookiesParam) {
		// Load cookies from storage
		const storedCookies = await this.storage.get(`cookies:${sessionId}`);
		let allCookies = [];
		
		if (storedCookies) {
			allCookies = allCookies.concat(storedCookies);
		}
		
		// Add cookies from parameter
		if (cookiesParam) {
			try {
				const paramCookies = JSON.parse(cookiesParam);
				allCookies = allCookies.concat(paramCookies);
			} catch (e) {
				console.error('Invalid cookies parameter:', e);
			}
		}
		
		if (allCookies.length > 0) {
			await page.setCookie(...allCookies);
		}
	}

	async saveCookies(sessionId, cookies) {
		if (cookies && cookies.length > 0) {
			await this.storage.put(`cookies:${sessionId}`, cookies);
		}
	}

	async ensureBrowser() {
		if (this.browser && this.browser.isConnected()) {
			try {
				await this.browser.version();
				return;
			} catch (error) {
				this.browser = null;
			}
		}

		// Configure browser launch options
		const launchOptions = {
			keep_alive: 10 * 60 * 1000
		};

		// Add proxy configuration if provided via environment variables
		const browserArgs = [];
		if (this.env.PROXY_URL) {
			browserArgs.push(`--proxy-server=${this.env.PROXY_URL}`);
		}
		
		if (browserArgs.length > 0) {
			launchOptions.args = browserArgs;
		}

		this.browser = await puppeteer.launch(this.env.MYBROWSER, launchOptions);
		this.lastUsed = Date.now();
	}

	async closeBrowser() {
		if (this.browser) {
			try {
				await this.browser.close();
			} catch (error) {
				console.error('Error closing browser:', error);
			}
			this.browser = null;
		}
	}

	async scheduleCleanup() {
		const existingAlarm = await this.storage.getAlarm();
		if (existingAlarm) {
			await this.storage.deleteAlarm();
		}
		
		const cleanupTime = Date.now() + this.BROWSER_TIMEOUT;
		await this.storage.setAlarm(cleanupTime);
	}

	async alarm() {
		const timeSinceLastUse = Date.now() - this.lastUsed;
		
		if (timeSinceLastUse >= this.BROWSER_TIMEOUT) {
			await this.closeBrowser();
		} else {
			await this.scheduleCleanup();
		}
	}
}