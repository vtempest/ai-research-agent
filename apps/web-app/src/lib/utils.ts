import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Adds variable state (like query, active tab. etc) to the URL so that the stateis preserved in a sharable URL which
 * when clicked resumes from those same state variables.
 * Pass in nothing to get the current URL state object.
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
 * Checks if the current view is a mobile view
 * Updates deviceInfo.isMobile state based on the window width
 * @param {Object} deviceInfo - The device information object
 * @returns {void}
 */
export function setupMobileView(
  deviceInfo: { isMobile?: boolean; os?: string } = {}
) {
  const MOBILE_WIDTH = 468;
  function checkMobileView() {
    deviceInfo.isMobile = window.innerWidth < MOBILE_WIDTH;
  }
  deviceInfo.os = getUserDeviceOS();
  checkMobileView();
  window.addEventListener("resize", checkMobileView);
}




/**
 * Gets the user's device OS
 * @returns {string} OS Name: Windows, Mac, Linux, Android, iOS, or Other
 */
export function getUserDeviceOS() {
  const ua = navigator?.userAgent;

  if (/Windows/i.test(ua)) {
    return "Windows";
  } else if (/Mac/i.test(ua)) {
    return "Mac";
  } else if (/Linux/i.test(ua)) {
    return "Linux";
  } else if (/Android/i.test(ua)) {
    return "Android";
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    return "iOS";
  } else {
    return "Other";
  }
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
 * @param {string} [options.faviconPath="/favicon.ico"] - Path to the favicon.ico file
 * @param {string} [options.appleTouchIconPath="/icons/apple-touch-icon.png"] - Path to the Apple touch icon
 * @param {string} [options.manifestPath="/site.webmanifest"] - Path to the site.webmanifest file
 * @param {boolean} [options.addMobileViewport=true] - Whether to include the mobile viewport meta tag
 * @param {boolean} [options.shouldAppend=false] - Whether to append tags to document head instead of returning string
 * @returns {string|void} Complete HTML head tags string if shouldAppend is false, otherwise void
 */
export function loadHeadTags(options = {} as any) {
  const {
    title,
    fonts,
    googleAnalyticsId,
    simpleAnalytics = false,
    faviconPath = "/favicon.ico",
    appleTouchIconPath = "/icons/apple-touch-icon.png",
    manifestPath = "/site.webmanifest",
    addMobileViewport = true,
    shouldAppend = false
  } = options;

  let headTags = '';

  // Set page title
  if (title) {
    if (shouldAppend) {
      document.title = title;
    } else {
      headTags += `<title>${title}</title>\n`;
    }
  }

  // Add mobile viewport meta tag
  if (addMobileViewport) {
    const viewportTag = '<meta name="viewport" content="width=device-width, initial-scale=1" />';
    if (shouldAppend) {
      const viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      viewportMeta.content = 'width=device-width, initial-scale=1';
      document.head.appendChild(viewportMeta);
    } else {
      headTags += viewportTag + '\n';
    }
  }

  // Add favicon and icon links
  const iconLinks = [
    { rel: 'shortcut icon', type: 'image/x-icon', href: faviconPath },
    { rel: 'apple-touch-icon', href: appleTouchIconPath },
    { rel: 'manifest', href: manifestPath }
  ];

  iconLinks.forEach(linkData => {
    if (shouldAppend) {
      const link = document.createElement('link');
      Object.entries(linkData).forEach(([key, value]) => {
        link[key] = value;
      });
      document.head.appendChild(link);
    } else {
      const attrs = Object.entries(linkData)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      headTags += `<link ${attrs} />\n`;
    }
  });

  // Add Google Fonts
  if (fonts) {
    const fontPreconnects = [
      { rel: 'preconnect', href: '//fonts.googleapis.com' },
      { rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: '' }
    ];

    if (shouldAppend) {
      // Add preconnect links
      fontPreconnects.forEach(linkData => {
        const link = document.createElement('link');
        Object.entries(linkData).forEach(([key, value]) => {
          link[key] = value;
        });
        document.head.appendChild(link);
      });

      // Add font stylesheets
      fonts.split(",").forEach(font => {
        const link = document.createElement('link');
        link.href = `//fonts.googleapis.com/css2?family=${encodeURIComponent(font.trim())}:wght@400;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      });
    } else {
      headTags += `<link rel="preconnect" href="//fonts.googleapis.com" />\n<link rel="preconnect" href="//fonts.gstatic.com" crossorigin="" />\n`;
      headTags += fonts
        .split(",")
        .map(
          (f) => `<link href="//fonts.googleapis.com/css2?family=${encodeURIComponent(f.trim())}:wght@400;700&display=swap" rel="stylesheet" />`
        )
        .join("\n") + "\n";
    }
  }

  // Add Google Analytics
  if (googleAnalyticsId) {
    if (shouldAppend) {
      // Add gtag script
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(gtagScript);

      // Add configuration script
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
      `;
      document.head.appendChild(configScript);
    } else {
      headTags += `<script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '${googleAnalyticsId}');\n</script>\n`;
    }
  }

  // Add Simple Analytics
  if (simpleAnalytics) {
    if (shouldAppend) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://scripts.simpleanalyticscdn.com/latest.js';
      document.head.appendChild(script);
    } else {
      headTags += '<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>\n';
    }
  } 

  return headTags;
}
