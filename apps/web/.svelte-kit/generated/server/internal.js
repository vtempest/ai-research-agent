
import root from '../root.js';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env } from '../../../node_modules/.pnpm/@sveltejs+kit@2.41.0_@sveltejs+vite-plugin-svelte@6.2.0_svelte@5.38.10_vite@7.1.5_@type_165d445dce9b8d769826906b8885f60b/node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	csrf_trusted_origins: [],
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	service_worker_options: undefined,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <title>QwkSearch</title>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    " + head + "\n    <style>\n      /* Artistic loader styles */\n      #artistic-loader {\n        position: fixed;\n        inset: 0;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background: radial-gradient(circle at 50% 30%, #222 60%, #111 100%);\n        z-index: 9999;\n        transition: opacity 0.5s;\n      }\n      .loader-shape {\n        width: 60px;\n        height: 60px;\n        border-radius: 50%;\n        border: 8px solid #fff;\n        border-top: 8px solid #ff6f61;\n        border-bottom: 8px solid #6ec6ff;\n        animation: spin 1.2s linear infinite;\n        box-shadow: 0 0 30px #ff6f61, 0 0 60px #6ec6ff;\n      }\n      @keyframes spin {\n        0% { transform: rotate(0deg);}\n        100% { transform: rotate(360deg);}\n      }\n      .loader-text {\n        margin-top: 20px;\n        color: #fff;\n        font-family: 'Fira Mono', monospace;\n        font-size: 1.3rem;\n        letter-spacing: 0.1em;\n        text-shadow: 0 2px 8px #222;\n        animation: fadeIn 1.5s infinite alternate;\n      }\n      @keyframes fadeIn {\n        from { opacity: 0.7; }\n        to   { opacity: 1; }\n      }\n    </style>\n  </head>\n  <body>\n    <!-- Artistic Loader -->\n    <div id=\"artistic-loader\">\n      <div>\n        <div class=\"loader-shape\"></div>\n        <div class=\"loader-text\">Loading QwkSearch...</div>\n      </div>\n    </div>\n    <div id=\"svelte\">" + body + "</div>\n    <script>\n      // Remove loader once Svelte mounts\n      document.addEventListener('DOMContentLoaded', () => {\n        const loader = document.getElementById('artistic-loader');\n        if (loader) {\n          loader.style.opacity = '0';\n          setTimeout(() => loader.remove(), 500);\n        }\n      });\n    </script>\n  </body>\n</html>\n",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\" />\n  <title>" + message + "</title>\n  <script src=\"https://cdn.tailwindcss.com\"></script>\n  <style>\n    body {\n      background: radial-gradient(ellipse at top, #f0f4f8 0%, #e6eaf3 100%);\n      perspective: 1000px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      min-height: 100vh;\n      margin: 0;\n      font-family: 'Arial', sans-serif;\n    }\n\n    .error-container {\n      width: 100%;\n      max-width: 28rem;\n      background: white;\n      border-radius: 1rem;\n      box-shadow: \n        0 25px 50px -12px rgba(0, 0, 0, 0.25),\n        0 10px 20px -5px rgba(0, 0, 0, 0.1);\n      padding: 2.5rem;\n      transform-style: preserve-3d;\n      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    }\n\n    .error-icon {\n      display: flex;\n      justify-content: center;\n      margin-bottom: 2rem;\n      transform: translateZ(50px);\n    }\n\n    .error-icon svg {\n      width: 100px;\n      height: 100px;\n      color: #ef4444;\n      stroke-width: 1.5;\n      transform: translateZ(30px);\n    }\n\n    .error-message {\n      text-align: center;\n      font-size: 2rem;\n      font-weight: bold;\n      color: #ef4444;\n      margin-bottom: 1.5rem;\n      transform: translateZ(20px);\n    }\n\n    .error-text {\n      text-align: center;\n      color: #4b5563;\n      margin-bottom: 2rem;\n      line-height: 1.6;\n      transform: translateZ(10px);\n    }\n\n    .error-text a {\n      color: #3b82f6;\n      text-decoration: underline;\n      transition: color 0.3s ease;\n    }\n\n    .error-text a:hover {\n      color: #2563eb;\n    }\n\n    .error-actions {\n      display: flex;\n      justify-content: center;\n      transform: translateZ(40px);\n    }\n\n    .error-button {\n      background-color: #fbbf24;\n      color: white;\n      font-weight: bold;\n      padding: 0.75rem 1.5rem;\n      border-radius: 9999px;\n      transition: all 0.3s ease;\n      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n    }\n\n    .error-button:hover {\n      background-color: #d97706;\n      transform: scale(1.05);\n    }\n\n    @media (max-width: 640px) {\n      .error-container {\n        margin: 1rem;\n        padding: 1.5rem;\n      }\n      \n      .error-icon svg {\n        width: 80px;\n        height: 80px;\n      }\n    }\n  </style>\n</head>\n<body>\n  <main class=\"error-container\">\n    <div class=\"error-icon\">\n      <svg \n        xmlns=\"http://www.w3.org/2000/svg\" \n        viewBox=\"0 0 24 24\" \n        fill=\"none\" \n        stroke=\"currentColor\" \n        stroke-linecap=\"round\" \n        stroke-linejoin=\"round\"\n      >\n        <path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path>\n        <line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"></line>\n        <line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"></line>\n      </svg>\n    </div>\n\n    <h1 class=\"error-message\">" + message + "</h1>\n    \n    <p class=\"error-text\">\n      Please try again later. \n      You may report the issue using \n      the support link on the homepage.\n    </p>\n    \n    <div class=\"error-actions\">\n      <button \n        type=\"button\" \n        class=\"error-button\" \n        onclick=\"window.location.href = '/'\">\n        Go Home\n      </button>\n    </div>\n  </main>\n\n</body>\n</html>"
	},
	version_hash: "c8jbcl"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let handleValidationError;
	let init;
	({ handle, handleFetch, handleError, handleValidationError, init } = await import("../../../src/hooks.server.ts"));

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		handleValidationError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation };
