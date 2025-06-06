import sharp from "sharp";
import { parseICO } from "icojs";
/**
 * Convert a ICO/PNG favicon from URL using npm sharp into 16px
 * image base64 string. This prevents the need for many requests
 * to fetch for each site's favicon which can cause delays.
 *
 * @param {string} url - The URL of the favicon
 * @param {number} [size=16] - Pixel size of the resized favicon
 * @returns {Promise<string>} Base64  string of resized favicon
 * @throws {Error} If there's an issue downloading or processing
 * @category Extract
 * @example const base64String = await
 *  convertFaviconToBase64String('https://www.amazon.com/favicon.ico');
 * console.log(base64String);
 */
export async function convertFaviconToBase64String(url, size = 16) {
  //download image buffer
  const faviconBuffer = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.timeout = timeout;
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send();
  });

  // ico2png
  if (url.endsWith(".ico"))
    faviconBuffer = Buffer.from(
      (await parseICO(faviconBuffer, "image/png"))[0].buffer
    );

  // Resize to 16x16 and convert to base64
  return await (
    await sharp(faviconBuffer)
      .resize(size, size, {
        fit: "fill",
        kernel: sharp.kernel.nearest,
      })
      .png()
      .toBuffer()
  ).toString("base64");
}

/**
 * Gets favicon for any URL by parsing the HTML and looking for &lt;link rel="icon"&gt;
 * tags and validates domain.com/favicon.ico by checking if for valid response.
 * @param {string} url
 * @param {Object} [options]
 * @returns {Promise<string|null>} Favicon URL or null if not found
 * @category Extract
 * @private
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 * @example const favicons = await extractFavicon('https://github.com/')
 */

export async function extractFavicon(url, options = {}) {
  const { timeout = 5000, maxRedirects = 3 } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetchWithRedirects(url, {
      signal: controller.signal,
      maxRedirects,
    });
    const html = await response.text();
    const faviconUrls = extractFaviconUrls(html, response.url);

    // Validate favicon URLs
    for (const faviconUrl of faviconUrls) {
      try {
        const res = await fetch(faviconUrl, {
          method: "HEAD",
          signal: controller.signal,
        });
        if (res.ok) {
          return faviconUrl;
        }
      } catch {
        // If fetch fails, continue to the next URL
      }
    }

    return null;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchWithRedirects(url, options, redirectCount = 0) {
  if (redirectCount > options.maxRedirects) {
    throw new Error("Max redirects exceeded");
  }

  const response = await fetch(url, options);

  if (response.redirected) {
    return fetchWithRedirects(response.url, options, redirectCount + 1);
  }

  return response;
}

function extractFaviconUrls(html, baseUrl) {
  const icons = [];

  // Extract from HTML
  const linkRegex =
    /<link[^>]*rel=["'](?:shortcut icon|icon|apple-touch-icon)["'][^>]*>/gi;
  const hrefRegex = /href=["']([^"']+)["']/i;

  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const hrefMatch = hrefRegex.exec(match[0]);
    if (hrefMatch) {
      const iconUrl = resolveUrl(hrefMatch[1], baseUrl);
      if (iconUrl) icons.push(iconUrl);
    }
  }

  // Add default favicon if no others were found
  if (icons.length === 0) {
    icons.push(combineURLs(baseUrl, "/favicon.ico"));
  }

  return icons;
}

function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "")
    : baseURL;
}

function resolveUrl(url, base) {
  // If the URL is already absolute, return it
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  // If it's a protocol-relative URL, prepend the base protocol
  if (url.startsWith("//")) {
    return base.split("//")[0] + url;
  }

  // If it's a root-relative URL, combine it with the base origin
  if (url.startsWith("/")) {
    const origin = base.match(/^(https?:\/\/[^/]+)/i)[0];
    return combineURLs(origin, url);
  }

  // Otherwise, it's a relative URL, combine it with the base URL
  return combineURLs(base, url);
}
