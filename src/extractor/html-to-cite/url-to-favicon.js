/**
 * Gets favicon for any URL by parsing the HTML and looking for &lt;link rel="icon"&gt; 
 * tags and validates domain.com/favicon.ico by checking if for valid response.
 * @param {string} url
 * @param {Object} [options] 
 * @returns {Promise<string|null>} Favicon URL or null if not found
 * @category Extractor
 * @example const favicons = await extractFavicon('https://github.com/') 
*/
export async function extractFavicon(url, options = {}) {
  const { timeout = 5000, maxRedirects = 3 } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetchWithRedirects(url, { signal: controller.signal, maxRedirects });
    const html = await response.text();
    const faviconUrls = extractFaviconUrls(html, response.url);
    
    // Validate favicon URLs
    for (const faviconUrl of faviconUrls) {
      try {
        const res = await fetch(faviconUrl, { method: 'HEAD', signal: controller.signal });
        if (res.ok) {
          return faviconUrl;
        }
      } catch {
        // If fetch fails, continue to the next URL
      }
    }

    return null;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchWithRedirects(url, options, redirectCount = 0) {
  if (redirectCount > options.maxRedirects) {
    throw new Error('Max redirects exceeded');
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
  const linkRegex = /<link[^>]*rel=["'](?:shortcut icon|icon|apple-touch-icon)["'][^>]*>/gi;
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
    icons.push(combineURLs(baseUrl, '/favicon.ico'));
  }

  return icons;
}

function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

function resolveUrl(url, base) {
  // If the URL is already absolute, return it
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  // If it's a protocol-relative URL, prepend the base protocol
  if (url.startsWith('//')) {
    return base.split('//')[0] + url;
  }

  // If it's a root-relative URL, combine it with the base origin
  if (url.startsWith('/')) {
    const origin = base.match(/^(https?:\/\/[^/]+)/i)[0];
    return combineURLs(origin, url);
  }

  // Otherwise, it's a relative URL, combine it with the base URL
  return combineURLs(base, url);
}

