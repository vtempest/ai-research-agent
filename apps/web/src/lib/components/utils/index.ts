import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Adds variable state (like query, active tab. etc) to 
 * the URL so that the state is preserved in a sharable URL 
 * which when clicked resumes from those same state variables.
 * Pass in nothing to get the current URL state variables.
 *
 * @param {Record<string, string>} stateObject
 *   - The state object to sync to the URL like view: "search"
 * @param {boolean} addToBrowserHistory default false.
 *   - If true, add the new state to the browser history
 * @returns {Record<string, string>} stateObject
 *   - Always returns the current URL state object
 * @example
 *  let {view, q} = setStateInURL();
 *  setStateInURL({ view: "search" });
 */
export function setStateInURL(
  stateObject: Record<string, string> = null,
  addToBrowserHistory = false
) {
  if (typeof window === "undefined") return;
  const url = new URL(document?.location.href);

  if (stateObject) {
    Object.entries(stateObject).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    if (addToBrowserHistory) window.history.pushState({}, "", url);
    else window.history.replaceState({}, "", url);
  }

  return Object.fromEntries(url.searchParams.entries()) || {};
}

/**
 * Utility function for merging Tailwind classes, needed for
 * [shadcn-svelte.](https://next.shadcn-svelte.com/docs/migration/svelte-5#update-utils)
 *
 * @param {ClassValue[]} inputs
 * @returns {string} class name
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Device information object
 */
export type DeviceInfo = {
  /** True if the screen is small size like on mobile web, updated on resize */
  isMobile?: boolean;
  /** The user's device OS */
  os?: 'Windows' | 'Mac' | 'Linux' | 'Android' | 'iOS' | 'Other';
}
/**
 * Checks if the current view is a mobile view
 * Updates deviceInfo.isMobile state based on the window width
 * Updates deviceInfo.os based on the user's device OS
 * @param {Object} deviceInfo - The device information object
 * @returns {void}
 */
export function setupMobileView(
  deviceInfo: DeviceInfo = {} as DeviceInfo
) {
  // Define the mobile width breakpoint (average is 768)
  const MOBILE_WIDTH = 468;
  function checkMobileView() {
    deviceInfo.isMobile = window.innerWidth < MOBILE_WIDTH;
  }

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  deviceInfo.os = /Windows/i.test(ua) ? "Windows" :
    /Mac/i.test(ua) ? "Mac" :
      /Linux/i.test(ua) ? "Linux" :
        /Android/i.test(ua) ? "Android" :
          /iPhone|iPad|iPod/i.test(ua) ? "iOS" :
            "Other";

  checkMobileView();
  window.addEventListener("resize", checkMobileView);
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, "children">
  : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};



/**
 * Generates HTML head tags including fonts, analytics, and meta tags
 * @param {Object} options - Configuration options for head tags
 * @param {string} [options.title] - Page title to set
 * @param {string} [options.fonts] - Comma separated Google Fonts to load
 * @param {string} [options.googleAnalyticsId] - Google Analytics tracking ID
 * @param {boolean} [options.simpleAnalytics=false] - Whether to load SimpleAnalytics.com
 * @param {string} [options.faviconPath="/favicon.ico"] - Path to the favicon.ico file, set false for blank 
 * @param {string} [options.appleIcon="/icons/apple-touch-icon.png"] - Path to the Apple touch icon
 * @param {string} [options.androidManifest="/site.webmanifest"] - Path to the site.webmanifest file
 * @param {boolean} [options.addMobileViewport=true] - Whether to include the mobile viewport meta tag
 * @param {boolean} [options.shouldAppend=false] - Whether to append tags to document head instead of returning string
 * @returns {string|void} Complete HTML head tags string if shouldAppend is false, otherwise void
 */

export function loadHeadTags(options: LoadHeadTagsOptions = {}) {
  const {
    title,
    fonts,
    googleAnalyticsId,
    simpleAnalytics = false,
    faviconPath = "/favicon.ico",
    appleIcon = "/icons/apple-touch-icon.png",
    androidManifest = "/site.webmanifest",
    addMobileViewport = true,
    shouldAppend = false
  } = options;

  let headTags = '';

  // Set title
  if (title) {
    if (shouldAppend) {
      document.title = title;
    } else {
      headTags += `<title>${title}</title>\n`;
    }
  }

  // Mobile viewport
  if (addMobileViewport) {
    headTags += loadLink({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, shouldAppend);
  }

  // Icons
  const favicon = faviconPath === false
    ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    : faviconPath;

  headTags += loadLink({ rel: 'shortcut icon', type: 'image/x-icon', href: favicon }, shouldAppend);
  headTags += loadLink({ rel: 'apple-touch-icon', href: appleIcon }, shouldAppend);
  headTags += loadLink({ rel: 'manifest', href: androidManifest }, shouldAppend);

  // Google Fonts
  if (fonts) {
    headTags += loadLink({ rel: 'preconnect', href: '//fonts.googleapis.com' }, shouldAppend);
    headTags += loadLink({ rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: '' }, shouldAppend);

    fonts.split(',').forEach(font => {
      const url = `//fonts.googleapis.com/css2?family=${encodeURIComponent(font.trim())}:wght@400;700&display=swap`;
      headTags += loadLink({ href: url, rel: 'stylesheet' }, shouldAppend);
    });
  }

  // Google Analytics
  if (googleAnalyticsId) {
    headTags += loadScript(`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`, { async: true }, shouldAppend);

    const configScript = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleAnalyticsId}');
    `;

    if (shouldAppend) {
      const script = document.createElement('script');
      script.innerHTML = configScript;
      document.head.appendChild(script);
    } else {
      headTags += `<script>${configScript}</script>\n`;
    }
  }

  // Simple Analytics
  if (simpleAnalytics) {
    headTags += loadScript('https://scripts.simpleanalyticscdn.com/latest.js', {
      async: true,
      defer: true
    }, shouldAppend);
  }

  return headTags;
}


/**
 * Configuration options for loading HTML head tags
 */
interface LoadHeadTagsOptions {
  /** Page title to set in the document */
  title?: string;

  /** Comma-separated list of Google Fonts to load (e.g., "Roboto, Open Sans") */
  fonts?: string;

  /** Google Analytics tracking ID (e.g., "GA_MEASUREMENT_ID") */
  googleAnalyticsId?: string;

  /** Whether to include Simple Analytics tracking script */
  simpleAnalytics?: boolean;

  /** Path to favicon file or false to use blank gif */
  faviconPath?: string | false;

  /** Path to Apple touch icon file */
  appleIcon?: string;

  /** Path to web app manifest file */
  androidManifest?: string;

  /** Whether to add mobile viewport meta tag */
  addMobileViewport?: boolean;

  /** Whether to append elements to DOM directly instead of returning HTML strings */
  shouldAppend?: boolean;
}

// Reusable function for loading scripts
function loadScript(src, attrs = {}, shouldAppend = false) {
  if (shouldAppend) {
    const script = document.createElement('script');
    script.src = src;
    Object.assign(script, attrs);
    document.head.appendChild(script);
    return '';
  }
  const attrStr = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
  return `<script src="${src}" ${attrStr}></script>\n`;
}

// Reusable function for loading links
function loadLink(attrs, shouldAppend = false) {
  if (shouldAppend) {
    const link = document.createElement('link');
    Object.assign(link, attrs);
    document.head.appendChild(link);
    return '';
  }
  const attrStr = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
  return `<link ${attrStr} />\n`;
}