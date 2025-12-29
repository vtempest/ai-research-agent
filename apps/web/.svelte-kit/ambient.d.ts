
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
	export const ELECTRON_RUN_AS_NODE: string;
	export const BUN_INSTALL: string;
	export const CHROME_DESKTOP: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const DEBUGINFOD_URLS: string;
	export const DESKTOP_SESSION: string;
	export const DISPLAY: string;
	export const GDK_BACKEND: string;
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
	export const NO_AT_BRIDGE: string;
	export const NVM_DIR: string;
	export const OMF_CONFIG: string;
	export const OMF_PATH: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const PAM_KWALLET5_LOGIN: string;
	export const PATH: string;
	export const PWD: string;
	export const QT_WAYLAND_RECONNECT: string;
	export const SESSION_MANAGER: string;
	export const SHELL: string;
	export const SHLVL: string;
	export const STARSHIP_SESSION_KEY: string;
	export const STARSHIP_SHELL: string;
	export const SYSTEMD_EXEC_PID: string;
	export const USER: string;
	export const VIRTUAL_ENV_DISABLE_PROMPT: string;
	export const VOLTA_HOME: string;
	export const VSCODE_CODE_CACHE_PATH: string;
	export const VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
	export const VSCODE_CWD: string;
	export const VSCODE_ESM_ENTRYPOINT: string;
	export const VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
	export const VSCODE_IPC_HOOK: string;
	export const VSCODE_NLS_CONFIG: string;
	export const VSCODE_PID: string;
	export const WAYLAND_DISPLAY: string;
	export const XAUTHORITY: string;
	export const XDG_CONFIG_DIRS: string;
	export const XDG_CURRENT_DESKTOP: string;
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
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const ELECTRON_NO_ASAR: string;
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
		ELECTRON_RUN_AS_NODE: string;
		BUN_INSTALL: string;
		CHROME_DESKTOP: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		DEBUGINFOD_URLS: string;
		DESKTOP_SESSION: string;
		DISPLAY: string;
		GDK_BACKEND: string;
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
		NO_AT_BRIDGE: string;
		NVM_DIR: string;
		OMF_CONFIG: string;
		OMF_PATH: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		PAM_KWALLET5_LOGIN: string;
		PATH: string;
		PWD: string;
		QT_WAYLAND_RECONNECT: string;
		SESSION_MANAGER: string;
		SHELL: string;
		SHLVL: string;
		STARSHIP_SESSION_KEY: string;
		STARSHIP_SHELL: string;
		SYSTEMD_EXEC_PID: string;
		USER: string;
		VIRTUAL_ENV_DISABLE_PROMPT: string;
		VOLTA_HOME: string;
		VSCODE_CODE_CACHE_PATH: string;
		VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
		VSCODE_CWD: string;
		VSCODE_ESM_ENTRYPOINT: string;
		VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
		VSCODE_IPC_HOOK: string;
		VSCODE_NLS_CONFIG: string;
		VSCODE_PID: string;
		WAYLAND_DISPLAY: string;
		XAUTHORITY: string;
		XDG_CONFIG_DIRS: string;
		XDG_CURRENT_DESKTOP: string;
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
		_JAVA_AWT_WM_NONREPARENTING: string;
		ELECTRON_NO_ASAR: string;
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
