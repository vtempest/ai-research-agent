
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```sh
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const ANTIGRAVITY_CLI_ALIAS: string;
	export const BUNDLED_DEBUGPY_PATH: string;
	export const BUN_INSTALL: string;
	export const CHROME_DESKTOP: string;
	export const COLORTERM: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const DEBUGINFOD_URLS: string;
	export const DESKTOP_SESSION: string;
	export const DISPLAY: string;
	export const DOCKER_HOST: string;
	export const GDK_BACKEND: string;
	export const GIT_ASKPASS: string;
	export const GIT_DISCOVERY_ACROSS_FILESYSTEM: string;
	export const GTK2_RC_FILES: string;
	export const GTK_RC_FILES: string;
	export const HOME: string;
	export const ICEAUTHORITY: string;
	export const INVOCATION_ID: string;
	export const JOURNAL_STREAM: string;
	export const KDE_APPLICATIONS_AS_SCOPE: string;
	export const KDE_FULL_SESSION: string;
	export const KDE_SESSION_UID: string;
	export const KDE_SESSION_VERSION: string;
	export const LANG: string;
	export const LC_ADDRESS: string;
	export const LC_IDENTIFICATION: string;
	export const LC_MEASUREMENT: string;
	export const LC_MONETARY: string;
	export const LC_NAME: string;
	export const LC_NUMERIC: string;
	export const LC_PAPER: string;
	export const LC_TELEPHONE: string;
	export const LC_TIME: string;
	export const LOGNAME: string;
	export const MAIL: string;
	export const MANAGERPID: string;
	export const MANAGERPIDFDID: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const MOTD_SHOWN: string;
	export const NODE: string;
	export const NODE_NO_WARNINGS: string;
	export const NO_AT_BRIDGE: string;
	export const OMF_CONFIG: string;
	export const OMF_PATH: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const PATH: string;
	export const PWD: string;
	export const PYDEVD_DISABLE_FILE_VALIDATION: string;
	export const PYTHONSTARTUP: string;
	export const PYTHON_BASIC_REPL: string;
	export const QT_WAYLAND_RECONNECT: string;
	export const SESSION_MANAGER: string;
	export const SHELL: string;
	export const SHLVL: string;
	export const STARSHIP_SESSION_KEY: string;
	export const STARSHIP_SHELL: string;
	export const SYSTEMD_EXEC_PID: string;
	export const TERM: string;
	export const TERM_PROGRAM: string;
	export const TERM_PROGRAM_VERSION: string;
	export const USER: string;
	export const VIRTUAL_ENV_DISABLE_PROMPT: string;
	export const VOLTA_HOME: string;
	export const VSCODE_DEBUGPY_ADAPTER_ENDPOINTS: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const VSCODE_NONCE: string;
	export const WAYLAND_DISPLAY: string;
	export const WRANGLER_DOCKER_BIN: string;
	export const XAUTHORITY: string;
	export const XDG_CONFIG_DIRS: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const XDG_DATA_DIRS: string;
	export const XDG_MENU_PREFIX: string;
	export const XDG_RUNTIME_DIR: string;
	export const XDG_SEAT: string;
	export const XDG_SEAT_PATH: string;
	export const XDG_SESSION_CLASS: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XDG_SESSION_ID: string;
	export const XDG_SESSION_PATH: string;
	export const XDG_SESSION_TYPE: string;
	export const XDG_VTNR: string;
	export const XKB_DEFAULT_LAYOUT: string;
	export const _: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const _VOLTA_TOOL_RECURSION: string;
	export const npm_command: string;
	export const npm_config_local_prefix: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const npm_lifecycle_event: string;
	export const npm_lifecycle_script: string;
	export const npm_node_execpath: string;
	export const npm_package_json: string;
	export const npm_package_name: string;
	export const npm_package_version: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		ANTIGRAVITY_CLI_ALIAS: string;
		BUNDLED_DEBUGPY_PATH: string;
		BUN_INSTALL: string;
		CHROME_DESKTOP: string;
		COLORTERM: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		DEBUGINFOD_URLS: string;
		DESKTOP_SESSION: string;
		DISPLAY: string;
		DOCKER_HOST: string;
		GDK_BACKEND: string;
		GIT_ASKPASS: string;
		GIT_DISCOVERY_ACROSS_FILESYSTEM: string;
		GTK2_RC_FILES: string;
		GTK_RC_FILES: string;
		HOME: string;
		ICEAUTHORITY: string;
		INVOCATION_ID: string;
		JOURNAL_STREAM: string;
		KDE_APPLICATIONS_AS_SCOPE: string;
		KDE_FULL_SESSION: string;
		KDE_SESSION_UID: string;
		KDE_SESSION_VERSION: string;
		LANG: string;
		LC_ADDRESS: string;
		LC_IDENTIFICATION: string;
		LC_MEASUREMENT: string;
		LC_MONETARY: string;
		LC_NAME: string;
		LC_NUMERIC: string;
		LC_PAPER: string;
		LC_TELEPHONE: string;
		LC_TIME: string;
		LOGNAME: string;
		MAIL: string;
		MANAGERPID: string;
		MANAGERPIDFDID: string;
		MEMORY_PRESSURE_WATCH: string;
		MEMORY_PRESSURE_WRITE: string;
		MOTD_SHOWN: string;
		NODE: string;
		NODE_NO_WARNINGS: string;
		NO_AT_BRIDGE: string;
		OMF_CONFIG: string;
		OMF_PATH: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		PATH: string;
		PWD: string;
		PYDEVD_DISABLE_FILE_VALIDATION: string;
		PYTHONSTARTUP: string;
		PYTHON_BASIC_REPL: string;
		QT_WAYLAND_RECONNECT: string;
		SESSION_MANAGER: string;
		SHELL: string;
		SHLVL: string;
		STARSHIP_SESSION_KEY: string;
		STARSHIP_SHELL: string;
		SYSTEMD_EXEC_PID: string;
		TERM: string;
		TERM_PROGRAM: string;
		TERM_PROGRAM_VERSION: string;
		USER: string;
		VIRTUAL_ENV_DISABLE_PROMPT: string;
		VOLTA_HOME: string;
		VSCODE_DEBUGPY_ADAPTER_ENDPOINTS: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		VSCODE_GIT_IPC_HANDLE: string;
		VSCODE_NONCE: string;
		WAYLAND_DISPLAY: string;
		WRANGLER_DOCKER_BIN: string;
		XAUTHORITY: string;
		XDG_CONFIG_DIRS: string;
		XDG_CURRENT_DESKTOP: string;
		XDG_DATA_DIRS: string;
		XDG_MENU_PREFIX: string;
		XDG_RUNTIME_DIR: string;
		XDG_SEAT: string;
		XDG_SEAT_PATH: string;
		XDG_SESSION_CLASS: string;
		XDG_SESSION_DESKTOP: string;
		XDG_SESSION_ID: string;
		XDG_SESSION_PATH: string;
		XDG_SESSION_TYPE: string;
		XDG_VTNR: string;
		XKB_DEFAULT_LAYOUT: string;
		_: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		_VOLTA_TOOL_RECURSION: string;
		npm_command: string;
		npm_config_local_prefix: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		npm_lifecycle_event: string;
		npm_lifecycle_script: string;
		npm_node_execpath: string;
		npm_package_json: string;
		npm_package_name: string;
		npm_package_version: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
