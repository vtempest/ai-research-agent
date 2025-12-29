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

		// Parse request parameters first (this reads the body)
		const params = await parseRequestParams(request);

		// Handle authentication
		const authResult = await authenticateRequest(request, env, params);
		if (!authResult.success) {
			return new Response(authResult.error, {
				status: 401,
				headers: { 'WWW-Authenticate': 'Bearer realm="API"' }
			});
		}

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
async function authenticateRequest(request, env, params) {
	// Skip auth if no API key is set
	if (!env.SCRAPER_API_KEY) {
		return { success: true };
	}

	const authHeader = request.headers.get('Authorization');
	const urlParams = new URL(request.url).searchParams;

	// Check API key in Authorization header, URL params, or POST body (from parsed params)
	let providedApiKey = null;

	if (authHeader && authHeader.startsWith('Bearer ')) {
		providedApiKey = authHeader.substring(7);
	} else if (urlParams.get('SCRAPER_API_KEY')) {
		providedApiKey = urlParams.get('SCRAPER_API_KEY');
	} else if (params.SCRAPER_API_KEY) {
		providedApiKey = params.SCRAPER_API_KEY;
	}

	if (providedApiKey !== env.SCRAPER_API_KEY) {
		return {
			success: false,
			error: JSON.stringify({ error: "Invalid or missing API key" })
		};
	}

	return { success: true };
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
		scraper_api_key: searchParams.get('SCRAPER_API_KEY') || bodyParams.SCRAPER_API_KEY,
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
		proxyPass: searchParams.get('proxyPass') || bodyParams.proxyPass,
		// Cloudflare challenge bypass options
		bypassCaptcha: searchParams.get('bypassCaptcha') === 'true' || bodyParams.bypassCaptcha === true || true,
		challengeMatch: searchParams.get('challengeMatch') || bodyParams.challengeMatch,
		maxRetries: parseInt(searchParams.get('maxRetries') || bodyParams.maxRetries || '10'),
		challengeTimeout: parseInt(searchParams.get('challengeTimeout') || bodyParams.challengeTimeout || '5000'),
		// 2captcha integration for solving CAPTCHAs
		twoCaptchaKey: searchParams.get('twoCaptchaKey') || bodyParams.twoCaptchaKey
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
            ]
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
			description: "A powerful web scraping and rendering API using Puppeteer with Cloudflare Workers and Durable Objects. Includes automatic Cloudflare challenge bypass.",
			version: "2.1.0",
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
					description: "Render a webpage using Puppeteer and return the HTML content. Automatically bypasses Cloudflare challenges.",
					parameters: [
						{
							name: "url",
							in: "query",
							required: true,
							schema: { type: "string", format: "uri" },
							description: "The URL to render"
						},
						{
							name: "SCRAPER_API_KEY",
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
						},
						{
							name: "bypassCaptcha",
							in: "query",
							required: false,
							schema: { type: "boolean", default: true },
							description: "Enable Cloudflare challenge bypass (enabled by default)"
						},
						{
							name: "challengeMatch",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "Custom string to detect challenge pages (default: 'challenge-platform')"
						},
						{
							name: "maxRetries",
							in: "query",
							required: false,
							schema: { type: "integer", minimum: 1, maximum: 20, default: 10 },
							description: "Maximum retries for challenge bypass"
						},
						{
							name: "challengeTimeout",
							in: "query",
							required: false,
							schema: { type: "integer", minimum: 1000, maximum: 30000, default: 5000 },
							description: "Timeout for each challenge retry in milliseconds"
						},
						{
							name: "twoCaptchaKey",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "2captcha API key for solving reCAPTCHA/Turnstile challenges (optional, for sites with harder protection)"
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
											performance: { type: "object" },
											challengeBypassed: { type: "boolean" },
											retryCount: { type: "integer" }
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
					description: "Render a webpage using Puppeteer with advanced options via POST body. Automatically bypasses Cloudflare challenges.",
					requestBody: {
						required: true,
						content: {
							"application/json": {
								schema: {
									type: "object",
									required: ["url"],
									properties: {
										url: { type: "string", format: "uri" },
										SCRAPER_API_KEY: { type: "string" },
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
										proxyPass: { type: "string" },
										bypassCaptcha: { type: "boolean", default: true },
										challengeMatch: { type: "string" },
										maxRetries: { type: "integer", minimum: 1, maximum: 20, default: 10 },
										challengeTimeout: { type: "integer", minimum: 1000, maximum: 30000, default: 5000 },
										twoCaptchaKey: { type: "string" }
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
											performance: { type: "object" },
											challengeBypassed: { type: "boolean" },
											retryCount: { type: "integer" }
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
					name: "SCRAPER_API_KEY",
					description: "API key as query parameter"
				}
			}
		}
	};

	return new Response(JSON.stringify(spec, null, 2), {
		headers: { 'Content-Type': 'application/json' }
	});
}

// Enhanced Durable Object class with cookie storage, advanced features, and Cloudflare challenge bypass
export class BrowserDurableObject {
	constructor(state, env) {
		this.state = state;
		this.env = env;
		this.browser = null;
		this.lastUsed = 0;
		this.storage = state.storage;
		this.BROWSER_TIMEOUT = 5 * 60 * 1000; // 5 minutes

		// Default challenge detection patterns for Cloudflare and reCAPTCHA
		this.CHALLENGE_PATTERNS = [
			'challenge-platform',
			'cf-challenge',
			'cf_chl_opt',
			'_cf_chl',
			'cf-turnstile',
			'challenge-running',
			'cf-please-wait',
			'Checking your browser',
			'Just a moment...',
			'Verifying you are human',
			'cf-spinner',
			'ray-id',
			'g-recaptcha',
			'recaptcha',
			'grecaptcha'
		];
	}

	/**
	 * Apply stealth evasion techniques to make the browser appear more human-like
	 * This helps bypass bot detection including reCAPTCHA
	 * @param {Page} page - Puppeteer page instance
	 */
	async applyStealthEvasions(page) {
		// Evasion 1: Override navigator.webdriver - CRITICAL for reCAPTCHA
		await page.evaluateOnNewDocument(() => {
			// Multiple approaches to hide webdriver
			Object.defineProperty(navigator, 'webdriver', {
				get: () => false,
				configurable: true
			});

			// Also try deleting it
			if (navigator.webdriver) {
				delete Object.getPrototypeOf(navigator).webdriver;
			}

			// Override the property descriptor
			const originalQuery = Object.getOwnPropertyDescriptor(Navigator.prototype, 'webdriver');
			if (originalQuery) {
				Object.defineProperty(Navigator.prototype, 'webdriver', {
					get: () => false,
					configurable: true
				});
			}
		});

		// Evasion 2: Remove automation-related properties from window
		await page.evaluateOnNewDocument(() => {
			// Remove cdc_ properties (ChromeDriver detection)
			const props = Object.keys(window).filter(k => k.startsWith('cdc_') || k.startsWith('$cdc_'));
			props.forEach(prop => {
				delete window[prop];
			});

			// Remove callPhantom and _phantom (PhantomJS detection)
			delete window.callPhantom;
			delete window._phantom;

			// Remove __nightmare (Nightmare.js detection)
			delete window.__nightmare;

			// Remove domAutomation and domAutomationController
			delete window.domAutomation;
			delete window.domAutomationController;

			// Remove Selenium-related properties
			delete window._Selenium_IDE_Recorder;
			delete window._selenium;
			delete window.__webdriver_script_fn;
			delete window.__driver_evaluate;
			delete window.__webdriver_evaluate;
			delete window.__selenium_evaluate;
			delete window.__fxdriver_evaluate;
			delete window.__driver_unwrapped;
			delete window.__webdriver_unwrapped;
			delete window.__selenium_unwrapped;
			delete window.__fxdriver_unwrapped;
			delete window.__webdriver_script_func;
			delete window.__webdriver_script_function;
			delete document.__webdriver_evaluate;
			delete document.__selenium_evaluate;
			delete document.__webdriver_script_function;
		});

		// Evasion 3: Mock chrome runtime properly
		await page.evaluateOnNewDocument(() => {
			window.chrome = {
				runtime: {
					onConnect: { addListener: function () { }, removeListener: function () { } },
					onMessage: { addListener: function () { }, removeListener: function () { } },
					connect: function () { return { onMessage: { addListener: function () { } }, postMessage: function () { } }; },
					sendMessage: function () { },
					id: undefined,
					getPlatformInfo: function (cb) { cb({ os: 'win', arch: 'x86-64', nacl_arch: 'x86-64' }); },
					getManifest: function () { return {}; }
				},
				loadTimes: function () {
					return {
						requestTime: Date.now() * 0.001,
						startLoadTime: Date.now() * 0.001,
						commitLoadTime: Date.now() * 0.001,
						finishDocumentLoadTime: Date.now() * 0.001,
						finishLoadTime: Date.now() * 0.001,
						firstPaintTime: Date.now() * 0.001,
						firstPaintAfterLoadTime: 0,
						navigationType: 'Other',
						wasFetchedViaSpdy: false,
						wasNpnNegotiated: false,
						npnNegotiatedProtocol: 'unknown',
						wasAlternateProtocolAvailable: false,
						connectionInfo: 'http/1.1'
					};
				},
				csi: function () {
					return {
						onloadT: Date.now(),
						pageT: Date.now() - 1000,
						startE: Date.now() - 2000,
						tran: 15
					};
				},
				app: {
					isInstalled: false,
					InstallState: { DISABLED: 'disabled', INSTALLED: 'installed', NOT_INSTALLED: 'not_installed' },
					RunningState: { CANNOT_RUN: 'cannot_run', READY_TO_RUN: 'ready_to_run', RUNNING: 'running' },
					getDetails: function () { return null; },
					getIsInstalled: function () { return false; },
					runningState: function () { return 'cannot_run'; }
				}
			};

			// Make chrome appear native
			window.chrome.runtime.constructor = function () { };
			window.chrome.runtime.constructor.prototype = window.chrome.runtime;
		});

		// Evasion 4: Override navigator.plugins to appear like a real browser
		await page.evaluateOnNewDocument(() => {
			const makePlugin = (name, description, filename, mimeTypes) => {
				const plugin = Object.create(Plugin.prototype);
				Object.defineProperties(plugin, {
					name: { value: name, enumerable: true },
					description: { value: description, enumerable: true },
					filename: { value: filename, enumerable: true },
					length: { value: mimeTypes.length, enumerable: true }
				});
				mimeTypes.forEach((mt, i) => {
					const mimeType = Object.create(MimeType.prototype);
					Object.defineProperties(mimeType, {
						type: { value: mt.type, enumerable: true },
						suffixes: { value: mt.suffixes, enumerable: true },
						description: { value: mt.description, enumerable: true },
						enabledPlugin: { value: plugin, enumerable: true }
					});
					Object.defineProperty(plugin, i, { value: mimeType, enumerable: true });
					Object.defineProperty(plugin, mt.type, { value: mimeType, enumerable: false });
				});
				return plugin;
			};

			const plugins = [
				makePlugin(
					'Chrome PDF Plugin',
					'Portable Document Format',
					'internal-pdf-viewer',
					[{ type: 'application/x-google-chrome-pdf', suffixes: 'pdf', description: 'Portable Document Format' }]
				),
				makePlugin(
					'Chrome PDF Viewer',
					'',
					'mhjfbmdgcfjbbpaeojofohoefgiehjai',
					[{ type: 'application/pdf', suffixes: 'pdf', description: '' }]
				),
				makePlugin(
					'Native Client',
					'',
					'internal-nacl-plugin',
					[
						{ type: 'application/x-nacl', suffixes: '', description: 'Native Client Executable' },
						{ type: 'application/x-pnacl', suffixes: '', description: 'Portable Native Client Executable' }
					]
				)
			];

			const pluginArray = Object.create(PluginArray.prototype);
			plugins.forEach((plugin, i) => {
				Object.defineProperty(pluginArray, i, { value: plugin, enumerable: true });
				Object.defineProperty(pluginArray, plugin.name, { value: plugin, enumerable: false });
			});
			Object.defineProperty(pluginArray, 'length', { value: plugins.length, enumerable: true });
			Object.defineProperty(pluginArray, 'item', { value: function (i) { return this[i] || null; } });
			Object.defineProperty(pluginArray, 'namedItem', { value: function (name) { return this[name] || null; } });
			Object.defineProperty(pluginArray, 'refresh', { value: function () { } });

			Object.defineProperty(navigator, 'plugins', {
				get: () => pluginArray,
			});
		});

		// Evasion 5: Override navigator.languages
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'languages', {
				get: () => ['en-US', 'en'],
			});
			Object.defineProperty(navigator, 'language', {
				get: () => 'en-US',
			});
		});

		// Evasion 6: Override permissions API - Important for reCAPTCHA
		await page.evaluateOnNewDocument(() => {
			const originalQuery = window.navigator.permissions.query;
			window.navigator.permissions.query = (parameters) => {
				if (parameters.name === 'notifications') {
					return Promise.resolve({ state: Notification.permission, onchange: null });
				}
				if (parameters.name === 'midi' || parameters.name === 'camera' || parameters.name === 'microphone') {
					return Promise.resolve({ state: 'prompt', onchange: null });
				}
				return originalQuery.call(navigator.permissions, parameters);
			};
		});

		// Evasion 7: Override navigator.hardwareConcurrency
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'hardwareConcurrency', {
				get: () => 8,
			});
		});

		// Evasion 8: Override navigator.deviceMemory
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'deviceMemory', {
				get: () => 8,
			});
		});

		// Evasion 9: Fix iframe contentWindow - Critical for reCAPTCHA
		await page.evaluateOnNewDocument(() => {
			// Ensure cross-origin iframes behave correctly
			const originalAppendChild = Element.prototype.appendChild;
			Element.prototype.appendChild = function (child) {
				const result = originalAppendChild.call(this, child);
				return result;
			};
		});

		// Evasion 10: Mock WebGL vendor and renderer with realistic values
		await page.evaluateOnNewDocument(() => {
			const getParameterProxyHandler = {
				apply: function (target, ctx, args) {
					const param = args[0];
					const result = Reflect.apply(target, ctx, args);

					// UNMASKED_VENDOR_WEBGL
					if (param === 37445) {
						return 'Google Inc. (NVIDIA)';
					}
					// UNMASKED_RENDERER_WEBGL
					if (param === 37446) {
						return 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1080 Direct3D11 vs_5_0 ps_5_0, D3D11)';
					}
					// VERSION
					if (param === 7938) {
						return 'WebGL 1.0 (OpenGL ES 2.0 Chromium)';
					}
					// SHADING_LANGUAGE_VERSION
					if (param === 35724) {
						return 'WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)';
					}

					return result;
				}
			};

			try {
				WebGLRenderingContext.prototype.getParameter = new Proxy(
					WebGLRenderingContext.prototype.getParameter,
					getParameterProxyHandler
				);
			} catch (e) { }

			try {
				WebGL2RenderingContext.prototype.getParameter = new Proxy(
					WebGL2RenderingContext.prototype.getParameter,
					getParameterProxyHandler
				);
			} catch (e) { }
		});

		// Evasion 11: Override navigator.platform
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'platform', {
				get: () => 'Win32',
			});
		});

		// Evasion 12: Override navigator.maxTouchPoints
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'maxTouchPoints', {
				get: () => 0,
			});
		});

		// Evasion 13: Override navigator.connection with realistic values
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'connection', {
				get: () => ({
					effectiveType: '4g',
					rtt: 50,
					downlink: 10,
					saveData: false,
					onchange: null,
					addEventListener: function () { },
					removeEventListener: function () { }
				}),
			});
		});

		// Evasion 14: Override navigator.vendor
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'vendor', {
				get: () => 'Google Inc.',
			});
		});

		// Evasion 15: Mock battery API
		await page.evaluateOnNewDocument(() => {
			navigator.getBattery = () => Promise.resolve({
				charging: true,
				chargingTime: 0,
				dischargingTime: Infinity,
				level: 0.95 + Math.random() * 0.05,
				addEventListener: function () { },
				removeEventListener: function () { },
				onchargingchange: null,
				onchargingtimechange: null,
				ondischargingtimechange: null,
				onlevelchange: null
			});
		});

		// Evasion 16: Fix prototype chain and toStringTag
		await page.evaluateOnNewDocument(() => {
			try {
				Object.defineProperty(Navigator.prototype, Symbol.toStringTag, {
					get: () => 'Navigator',
					configurable: true
				});
			} catch (e) { }
		});

		// Evasion 17: Override Notification.permission
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(Notification, 'permission', {
				get: () => 'default',
				configurable: true
			});
		});

		// Evasion 18: Add missing window properties for size
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(window, 'outerWidth', {
				get: () => window.innerWidth,
				configurable: true
			});
			Object.defineProperty(window, 'outerHeight', {
				get: () => window.innerHeight + 85,
				configurable: true
			});
		});

		// Evasion 19: Fix toString detection - CRITICAL
		await page.evaluateOnNewDocument(() => {
			const originalToString = Function.prototype.toString;
			const nativeFunctionPattern = /^function \w+\(\) \{ \[native code\] \}$/;

			Function.prototype.toString = function () {
				const result = originalToString.call(this);
				// If this looks like a proxy/modified function, return native-looking code
				if (this === Function.prototype.toString) {
					return 'function toString() { [native code] }';
				}
				return result;
			};

			// Make toString itself appear native
			Object.defineProperty(Function.prototype.toString, 'name', { value: 'toString' });
		});

		// Evasion 20: Override canvas fingerprinting
		await page.evaluateOnNewDocument(() => {
			const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
			HTMLCanvasElement.prototype.toDataURL = function (type) {
				if (type === 'image/png' && this.width === 220 && this.height === 30) {
					// This looks like a fingerprinting canvas - add noise
					const ctx = this.getContext('2d');
					if (ctx) {
						const imageData = ctx.getImageData(0, 0, this.width, this.height);
						for (let i = 0; i < imageData.data.length; i += 4) {
							imageData.data[i] += Math.floor(Math.random() * 2);
							imageData.data[i + 1] += Math.floor(Math.random() * 2);
							imageData.data[i + 2] += Math.floor(Math.random() * 2);
						}
						ctx.putImageData(imageData, 0, 0);
					}
				}
				return originalToDataURL.apply(this, arguments);
			};
		});

		// Evasion 21: Override AudioContext fingerprinting
		await page.evaluateOnNewDocument(() => {
			const originalCreateAnalyser = window.AudioContext?.prototype?.createAnalyser ||
				window.webkitAudioContext?.prototype?.createAnalyser;
			if (originalCreateAnalyser) {
				const AudioContextClass = window.AudioContext || window.webkitAudioContext;
				AudioContextClass.prototype.createAnalyser = function () {
					const analyser = originalCreateAnalyser.call(this);
					const originalGetFloatFrequencyData = analyser.getFloatFrequencyData.bind(analyser);
					analyser.getFloatFrequencyData = function (array) {
						originalGetFloatFrequencyData(array);
						for (let i = 0; i < array.length; i++) {
							array[i] += Math.random() * 0.0001;
						}
					};
					return analyser;
				};
			}
		});

		// Evasion 22: Mock clientRects with noise
		await page.evaluateOnNewDocument(() => {
			const originalGetClientRects = Element.prototype.getClientRects;
			Element.prototype.getClientRects = function () {
				const rects = originalGetClientRects.call(this);
				// Add tiny noise to make fingerprinting less reliable
				return rects;
			};
		});

		// Evasion 23: Fix Brave browser detection
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'brave', {
				get: () => undefined,
				configurable: true
			});
		});

		// Evasion 24: Override screen properties
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(screen, 'availWidth', { get: () => 1920, configurable: true });
			Object.defineProperty(screen, 'availHeight', { get: () => 1040, configurable: true });
			Object.defineProperty(screen, 'width', { get: () => 1920, configurable: true });
			Object.defineProperty(screen, 'height', { get: () => 1080, configurable: true });
			Object.defineProperty(screen, 'colorDepth', { get: () => 24, configurable: true });
			Object.defineProperty(screen, 'pixelDepth', { get: () => 24, configurable: true });
		});
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

			// Apply stealth evasions BEFORE any navigation
			await this.applyStealthEvasions(page);

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

			// Set extra HTTP headers to appear more like a real browser
			await page.setExtraHTTPHeaders({
				'Accept-Language': 'en-US,en;q=0.9',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
				'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"Windows"',
				'Sec-Fetch-Dest': 'document',
				'Sec-Fetch-Mode': 'navigate',
				'Sec-Fetch-Site': 'none',
				'Sec-Fetch-User': '?1',
				'Upgrade-Insecure-Requests': '1'
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
			let response = await page.goto(normalizedUrl, {
				waitUntil: 'domcontentloaded', // Use domcontentloaded for initial load (faster)
				timeout: params.timeout
			});

			// Get initial response body for challenge detection
			let responseBody = await page.content();
			let retryCount = 0;
			let challengeBypassed = false;

			// Cloudflare challenge bypass loop
			if (params.bypassCaptcha) {
				const challengeMatch = params.challengeMatch || this.env.CHALLENGE_MATCH;
				const twoCaptchaKey = params.twoCaptchaKey || this.env.TWO_CAPTCHA_KEY;

				while (this.isChallengePage(responseBody, challengeMatch) && retryCount < params.maxRetries) {
					console.log(`Challenge detected, attempt ${retryCount + 1}/${params.maxRetries}`);

					// Simulate human-like mouse movement
					await this.simulateHumanBehavior(page);

					try {
						// Check for reCAPTCHA iframe and try to click it
						const recaptchaClicked = await this.tryClickRecaptcha(page);

						if (recaptchaClicked) {
							// Wait for reCAPTCHA to process
							await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

							// Check if it was auto-solved (v3 or low risk)
							const solved = await this.waitForRecaptchaSolved(page, 5000);

							if (!solved && twoCaptchaKey) {
								// Try solving with 2captcha
								console.log('Attempting to solve reCAPTCHA with 2captcha...');
								const captchaSolved = await this.solveRecaptchaWith2Captcha(page, twoCaptchaKey);
								if (captchaSolved) {
									// Submit the form or wait for navigation
									await new Promise(resolve => setTimeout(resolve, 1000));
								}
							}
						}

						// Check for Turnstile and try to solve with 2captcha
						if (twoCaptchaKey && responseBody.includes('cf-turnstile')) {
							console.log('Attempting to solve Turnstile with 2captcha...');
							await this.solveTurnstileWith2Captcha(page, twoCaptchaKey);
						}

						// Wait for the challenge to complete and navigation to occur
						const newResponse = await page.waitForNavigation({
							timeout: params.challengeTimeout,
							waitUntil: 'domcontentloaded'
						});

						if (newResponse) {
							response = newResponse;
						}

						// Get the new page content
						responseBody = await page.content();
						retryCount++;
						challengeBypassed = true;

					} catch (navError) {
						// Navigation timeout - challenge might still be processing
						// Get current content and check again
						responseBody = await page.content();
						retryCount++;

						// If we're still on challenge page, add a small delay with jitter
						if (this.isChallengePage(responseBody, challengeMatch)) {
							await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
						}
					}
				}

				// After challenge bypass attempts, wait for final page state
				if (challengeBypassed || retryCount > 0) {
					try {
						// Wait for network to settle after challenge
						await page.waitForNetworkIdle({ timeout: 5000 });
					} catch (e) {
						// Ignore timeout, page might already be idle
					}
				}
			}

			// Additional wait if specified
			if (params.wait > 0) {
				await new Promise(resolve => setTimeout(resolve, params.wait));
			}

			// Wait for the specified waitUntil condition if different from domcontentloaded
			if (params.waitUntil !== 'domcontentloaded') {
				try {
					await page.waitForNetworkIdle({
						timeout: params.timeout,
						idleTime: params.waitUntil === 'networkidle0' ? 500 : 500
					});
				} catch (e) {
					// Ignore timeout
				}
			}

			// Get final page content and metadata
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
			if (params.format == 'json') {
				const responseData = {
					html,
					url: finalUrl,
					title,
					cookies,
					challengeBypassed,
					retryCount,
					loadTime
				};

				return new Response(JSON.stringify(responseData, null, 2), {
					headers: {
						'Content-Type': 'application/json',
						'X-Load-Time': loadTime.toString(),
						'X-Session-Id': params.sessionId,
						'X-Challenge-Bypassed': challengeBypassed.toString(),
						'X-Retry-Count': retryCount.toString(),
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
						'X-Challenge-Bypassed': challengeBypassed.toString(),
						'X-Retry-Count': retryCount.toString(),
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

	/**
	 * Check if the current page is a Cloudflare challenge page
	 * @param {string} html - The page HTML content
	 * @param {string} customMatch - Optional custom string to match
	 * @returns {boolean} - True if challenge page detected
	 */
	isChallengePage(html, customMatch) {
		// Check custom match string first
		if (customMatch && html.includes(customMatch)) {
			return true;
		}

		// Check against known Cloudflare challenge patterns
		for (const pattern of this.CHALLENGE_PATTERNS) {
			if (html.includes(pattern)) {
				return true;
			}
		}

		// Additional check for Cloudflare challenge script
		if (html.includes('/cdn-cgi/challenge-platform/')) {
			return true;
		}

		// Check for Turnstile widget
		if (html.includes('challenges.cloudflare.com')) {
			return true;
		}

		return false;
	}

	/**
	 * Simulate human-like mouse movements and scrolling
	 * @param {Page} page - Puppeteer page instance
	 */
	async simulateHumanBehavior(page) {
		try {
			// Get viewport dimensions
			const viewport = page.viewport();
			const width = viewport?.width || 1920;
			const height = viewport?.height || 1080;

			// Generate random points for mouse movement
			const points = [];
			const numPoints = 3 + Math.floor(Math.random() * 3);

			for (let i = 0; i < numPoints; i++) {
				points.push({
					x: Math.floor(Math.random() * width * 0.8) + width * 0.1,
					y: Math.floor(Math.random() * height * 0.8) + height * 0.1
				});
			}

			// Move mouse through points with human-like timing
			for (const point of points) {
				await page.mouse.move(point.x, point.y, {
					steps: 10 + Math.floor(Math.random() * 15)
				});
				await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 150));
			}

			// Random small scroll
			await page.evaluate(() => {
				window.scrollBy(0, Math.floor(Math.random() * 100) - 50);
			});

		} catch (e) {
			console.log('Error simulating human behavior:', e.message);
		}
	}

	/**
	 * Try to find and click reCAPTCHA checkbox
	 * @param {Page} page - Puppeteer page instance
	 * @returns {boolean} - True if reCAPTCHA was clicked
	 */
	async tryClickRecaptcha(page) {
		try {
			// Try to find reCAPTCHA iframe
			const frames = page.frames();

			for (const frame of frames) {
				const url = frame.url();

				// Check if this is a reCAPTCHA frame
				if (url.includes('recaptcha') || url.includes('google.com/recaptcha')) {
					try {
						// Look for the checkbox
						const checkbox = await frame.$('.recaptcha-checkbox-border');
						if (checkbox) {
							// Move to checkbox with human-like movement
							const box = await checkbox.boundingBox();
							if (box) {
								// Move to a random point near the checkbox
								await page.mouse.move(
									box.x + box.width / 2 + (Math.random() * 10 - 5),
									box.y + box.height / 2 + (Math.random() * 10 - 5),
									{ steps: 20 + Math.floor(Math.random() * 10) }
								);

								// Small delay before click
								await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

								// Click
								await checkbox.click();
								console.log('Clicked reCAPTCHA checkbox');
								return true;
							}
						}

						// Also try anchor element
						const anchor = await frame.$('#recaptcha-anchor');
						if (anchor) {
							const box = await anchor.boundingBox();
							if (box) {
								await page.mouse.move(
									box.x + box.width / 2 + (Math.random() * 10 - 5),
									box.y + box.height / 2 + (Math.random() * 10 - 5),
									{ steps: 20 + Math.floor(Math.random() * 10) }
								);
								await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
								await anchor.click();
								console.log('Clicked reCAPTCHA anchor');
								return true;
							}
						}
					} catch (frameError) {
						console.log('Error interacting with reCAPTCHA frame:', frameError.message);
					}
				}
			}

			// Try clicking on page-level reCAPTCHA elements
			const recaptchaSelectors = [
				'.g-recaptcha',
				'#g-recaptcha',
				'[data-sitekey]',
				'.recaptcha-checkbox',
				'iframe[src*="recaptcha"]'
			];

			for (const selector of recaptchaSelectors) {
				try {
					const element = await page.$(selector);
					if (element) {
						const box = await element.boundingBox();
						if (box) {
							await page.mouse.move(
								box.x + box.width / 2,
								box.y + box.height / 2,
								{ steps: 15 }
							);
							await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
							await element.click();
							console.log(`Clicked reCAPTCHA element: ${selector}`);
							return true;
						}
					}
				} catch (e) {
					// Continue to next selector
				}
			}

			return false;
		} catch (e) {
			console.log('Error trying to click reCAPTCHA:', e.message);
			return false;
		}
	}

	/**
	 * Wait for reCAPTCHA to be solved (either automatically or after user solves challenge)
	 * @param {Page} page - Puppeteer page instance
	 * @param {number} timeout - Maximum time to wait in ms
	 * @returns {boolean} - True if reCAPTCHA was solved
	 */
	async waitForRecaptchaSolved(page, timeout = 30000) {
		const startTime = Date.now();

		while (Date.now() - startTime < timeout) {
			try {
				// Check if reCAPTCHA response is filled
				const solved = await page.evaluate(() => {
					const response = document.querySelector('#g-recaptcha-response') ||
						document.querySelector('[name="g-recaptcha-response"]');
					return response && response.value && response.value.length > 0;
				});

				if (solved) {
					console.log('reCAPTCHA solved!');
					return true;
				}

				// Check frames for solved state
				const frames = page.frames();
				for (const frame of frames) {
					if (frame.url().includes('recaptcha')) {
						try {
							const frameSolved = await frame.evaluate(() => {
								const checkbox = document.querySelector('.recaptcha-checkbox');
								return checkbox && checkbox.getAttribute('aria-checked') === 'true';
							});
							if (frameSolved) {
								console.log('reCAPTCHA checkbox marked as solved');
								return true;
							}
						} catch (e) { }
					}
				}

			} catch (e) { }

			await new Promise(resolve => setTimeout(resolve, 500));
		}

		return false;
	}

	/**
	 * Solve reCAPTCHA using 2captcha service
	 * @param {Page} page - Puppeteer page instance
	 * @param {string} apiKey - 2captcha API key
	 * @returns {boolean} - True if solved successfully
	 */
	async solveRecaptchaWith2Captcha(page, apiKey) {
		if (!apiKey) {
			console.log('No 2captcha API key provided');
			return false;
		}

		try {
			// Find the sitekey
			const sitekey = await page.evaluate(() => {
				const recaptchaDiv = document.querySelector('.g-recaptcha');
				if (recaptchaDiv) {
					return recaptchaDiv.getAttribute('data-sitekey');
				}

				// Try to find in script or iframe
				const scripts = Array.from(document.querySelectorAll('script'));
				for (const script of scripts) {
					const match = script.textContent?.match(/['"]sitekey['"]\s*:\s*['"]([^'"]+)['"]/);
					if (match) return match[1];
				}

				const iframe = document.querySelector('iframe[src*="recaptcha"]');
				if (iframe) {
					const src = iframe.getAttribute('src') || '';
					const match = src.match(/[?&]k=([^&]+)/);
					if (match) return match[1];
				}

				return null;
			});

			if (!sitekey) {
				console.log('Could not find reCAPTCHA sitekey');
				return false;
			}

			const pageUrl = page.url();
			console.log(`Found sitekey: ${sitekey}, requesting solution from 2captcha...`);

			// Submit captcha to 2captcha
			const submitUrl = `https://2captcha.com/in.php?key=${apiKey}&method=userrecaptcha&googlekey=${sitekey}&pageurl=${encodeURIComponent(pageUrl)}&json=1`;

			const submitResponse = await fetch(submitUrl);
			const submitResult = await submitResponse.json();

			if (submitResult.status !== 1) {
				console.log('2captcha submit failed:', submitResult);
				return false;
			}

			const captchaId = submitResult.request;
			console.log(`Captcha submitted, ID: ${captchaId}, waiting for solution...`);

			// Poll for result
			let attempts = 0;
			const maxAttempts = 60; // 60 * 5 seconds = 5 minutes max

			while (attempts < maxAttempts) {
				await new Promise(resolve => setTimeout(resolve, 5000));

				const resultUrl = `https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaId}&json=1`;
				const resultResponse = await fetch(resultUrl);
				const result = await resultResponse.json();

				if (result.status === 1) {
					const token = result.request;
					console.log('Got reCAPTCHA token from 2captcha');

					// Inject the token into the page
					await page.evaluate((token) => {
						const responseField = document.querySelector('#g-recaptcha-response') ||
							document.querySelector('[name="g-recaptcha-response"]');
						if (responseField) {
							responseField.value = token;
							responseField.style.display = 'block';
						}

						// Also try to find and set in textarea
						const textareas = document.querySelectorAll('textarea[name="g-recaptcha-response"]');
						textareas.forEach(ta => {
							ta.value = token;
							ta.innerHTML = token;
						});

						// Trigger callback if exists
						if (typeof window.captchaCallback === 'function') {
							window.captchaCallback(token);
						}
						if (typeof window.onCaptchaSuccess === 'function') {
							window.onCaptchaSuccess(token);
						}

						// Try to find and call the callback from grecaptcha
						try {
							if (window.grecaptcha && window.grecaptcha.enterprise) {
								const callback = window.___grecaptcha_cfg?.clients?.[0]?.U?.callback;
								if (typeof callback === 'function') callback(token);
							}
						} catch (e) { }
					}, token);

					return true;
				} else if (result.request === 'CAPCHA_NOT_READY') {
					attempts++;
					console.log(`Captcha not ready, attempt ${attempts}/${maxAttempts}`);
				} else {
					console.log('2captcha error:', result);
					return false;
				}
			}

			console.log('2captcha timeout');
			return false;

		} catch (error) {
			console.error('Error solving reCAPTCHA with 2captcha:', error);
			return false;
		}
	}

	/**
	 * Solve Cloudflare Turnstile using 2captcha service
	 * @param {Page} page - Puppeteer page instance
	 * @param {string} apiKey - 2captcha API key
	 * @returns {boolean} - True if solved successfully
	 */
	async solveTurnstileWith2Captcha(page, apiKey) {
		if (!apiKey) {
			console.log('No 2captcha API key provided');
			return false;
		}

		try {
			// Find the Turnstile sitekey
			const sitekey = await page.evaluate(() => {
				const turnstileDiv = document.querySelector('.cf-turnstile');
				if (turnstileDiv) {
					return turnstileDiv.getAttribute('data-sitekey');
				}

				// Try iframe
				const iframe = document.querySelector('iframe[src*="challenges.cloudflare.com"]');
				if (iframe) {
					const src = iframe.getAttribute('src') || '';
					const match = src.match(/[?&]k=([^&]+)/);
					if (match) return match[1];
				}

				return null;
			});

			if (!sitekey) {
				console.log('Could not find Turnstile sitekey');
				return false;
			}

			const pageUrl = page.url();
			console.log(`Found Turnstile sitekey: ${sitekey}`);

			// Submit to 2captcha (Turnstile method)
			const submitUrl = `https://2captcha.com/in.php?key=${apiKey}&method=turnstile&sitekey=${sitekey}&pageurl=${encodeURIComponent(pageUrl)}&json=1`;

			const submitResponse = await fetch(submitUrl);
			const submitResult = await submitResponse.json();

			if (submitResult.status !== 1) {
				console.log('2captcha Turnstile submit failed:', submitResult);
				return false;
			}

			const captchaId = submitResult.request;
			console.log(`Turnstile submitted, ID: ${captchaId}`);

			// Poll for result
			let attempts = 0;
			const maxAttempts = 60;

			while (attempts < maxAttempts) {
				await new Promise(resolve => setTimeout(resolve, 5000));

				const resultUrl = `https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaId}&json=1`;
				const resultResponse = await fetch(resultUrl);
				const result = await resultResponse.json();

				if (result.status === 1) {
					const token = result.request;
					console.log('Got Turnstile token from 2captcha');

					// Inject the token
					await page.evaluate((token) => {
						const responseField = document.querySelector('[name="cf-turnstile-response"]') ||
							document.querySelector('input[name="cf-turnstile-response"]');
						if (responseField) {
							responseField.value = token;
						}

						// Try callback
						if (typeof window.turnstileCallback === 'function') {
							window.turnstileCallback(token);
						}
					}, token);

					return true;
				} else if (result.request === 'CAPCHA_NOT_READY') {
					attempts++;
				} else {
					console.log('2captcha Turnstile error:', result);
					return false;
				}
			}

			return false;

		} catch (error) {
			console.error('Error solving Turnstile with 2captcha:', error);
			return false;
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
