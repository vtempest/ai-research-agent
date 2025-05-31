import { printStructureJSON, log, showAlert } from "./log.js";

/**
 * ### GRAB: Generate Request to API from Browser
 * ![GrabAPILogo](https://i.imgur.com/qrQWkeb.png)
 * 
 * 1. **One Function**: 2Kb min, 0 dependencies, minimal boilerplate syntax - [better than top alternatives](https://grab.js.org/guide/Comparisons) 
 * 2. **Auto-JSON Convert**: Pass parameters and get response or error in JSON, handling other data types as is.
 * 3. **isLoading Status**: Sets `.isLoading=true` on the pre-initialized response object so you can show a "Loading..." in any framework
 * 4. **Debug Logging**: Adds global `log()` and prints colored JSON structure, response, timing for requests in test.
 * 5. **Mock Server Support**: Configure `window.grab.mock` for development and testing environments
 * 6. **Concurrency Handling**: Prevent this request if one is ongoing to same path & params, or cancel the ongoing request.
 * 7. **Timeout & Retry**: Customizable request timeout, default 20s, and auto-retry on error
 * 8. **Rate Limiting**: Built-in rate limiting to prevent multi-click cascading responses, require to wait seconds between requests.
 * 9. **Request History**: Stores all request and response data in global `grab.log` object
 * 10. **Pagination Infinite Scroll**: Built-in pagination for infinite scroll to auto-load and merge next result page.
 * 11. **Base URL Based on Environment**: Configure `grab.defaults.baseURL` once at the top, overide with `SERVER_API_URL` in `.env` or `process.env.SERVER_API_URL` in Node.js.
 * 12. **Frontend Cache**: Set cache headers and retrieve from frontend memory for repeat requests to static data.
 * 13. **Modular Design**: Can be used in any frontend framework, Node.js 18+, Bun, Deno, Cloudflare Workers, etc.
 * 14. **Framework Agnostic**: Alternatives like TanStack work only in component initialization and depend on React & others. 
 * 15. **Globals**: Adds to window in browser or global in Node.js so you only import once: `grab()`, `log()`, `grab.log`, `grab.mock`, `grab.defaults`
 * 16. **TypeScript Tooltips**: Developers can hover over option names and autocomplete TypeScript. Add to top of file: `import 'grab-api.js/globals'`
 * 17. **Request Stategies**: [🎯 Examples](https://grab.js.org/guide/Examples) show common stategies like debounce, repeat, proxy, unit tests, interceptors, file upload, etc
 * 18. **DevTools**: `Ctrl+I` overlays webpage with devtools showing all requests and responses, timing, and JSON structure.
 * 19. **Repeat**: Repeat request this many times, or repeat every X seconds to poll for updates.
 * 20. **Loading Icons**: Import from `grab-api.js/icons` to get enhanced animated loading icons.
 * @param {string} path The full URL path OR relative path on this server after `grab.defaults.baseURL`
 * @param {object} [options={}] Request params for GET or body for POST/PUT/PATCH and utility options
 * @param {string} [options.method] default="GET" The HTTP method to use
 * @param {object} [options.response] Pre-initialized object to set the response in. isLoading and error are also set on this object.
 * @param {boolean} [options.cancelOngoingIfNew]  default=true Cancel previous requests to same path
 * @param {boolean} [options.cancelNewIfOngoing] default=false Cancel if a request to path is in progress
 * @param {boolean} [options.cache] default=false Whether to cache the request and from frontend cache
 * @param {boolean} [options.debug] default=false Whether to log the request and response
 * @param {number} [options.timeout] default=20 The timeout for the request in seconds
 * @param {number} [options.rateLimit] default=0 If set, how many seconds to wait between requests
 * @param {string} [options.paginateResult]  The key to paginate result data by
 * @param {string} [options.paginateKey] default="" The key to paginate the request by
 * @param {string} [options.baseURL] default='/api/' base url prefix, override with SERVER_API_URL env
 * @param {boolean} [options.setDefaults] default=false Pass this with options to set
 *  those options as defaults for all requests.
 * @param {number} [options.retryAttempts] default=0 Retry failed requests this many times
 * @param {number} [options.repeat] default=0 Repeat request this many times
 * @param {number} [options.repeatEvery] default=null Repeat request every seconds
 * @param {function} [options.logger] default=log Custom logger to override the built-in color JSON log()
 * @param {function} [options.onBeforeRequest] Set with defaults to modify each request data. Takes and returns in order: path, response, params, fetchParams
 * @param {function} [options.onAfterRequest] Set with defaults to modify each request data. Takes and returns in order: path, response, params, fetchParams
 * @param {any} [...params] All other params become GET params, POST body, and other methods.
 * @returns {Promise<Object>} The response object with resulting data or .error if error.
 * @author [vtempest (2025)](https://github.com/vtempest/grab-api)
 * @see  [🎯 Examples](https://grab.js.org/guide/Examples) [📑 Docs](https://grab.js.org)
 * @example import grab from 'grab-api.js';

  let res = {};
  await grab('search', {
    response: res,
    query: "search words"
  })
 */
export async function grab(path, options = {}) {
  let {
    headers,
    response = {}, // Pre-initialized object to set the response in. isLoading and error are also set on this object.
    method = options.post
      ? "POST"
      : options.put
        ? "PUT"
        : options.patch
          ? "PATCH"
          : options.delete
            ? "DELETE"
            : "GET", // set post: true for POST, omit for GET
    cache = false, // Enable/disable frontend caching
    timeout = 20, // Request timeout in seconds
    baseURL = (typeof process !== "undefined" && process.env.SERVER_API_URL) ||
      "/api/", // Use env var or default to /api/
    cancelOngoingIfNew = true, // Cancel previous request for same path
    cancelNewIfOngoing = false, // Don't make new request if one is ongoing
    rateLimit = 0, // Minimum seconds between requests
    debug = typeof window !== "undefined" &&
      window?.location?.hostname?.includes("localhost"), // Auto-enable debug on localhost
    paginateResult = null, // Key to paginate in response
    paginateKey = null, // Request param for pagination
    infiniteScroll = null, // page key, response field to concatenate, element with results
    setDefaults = false, // Set these options as defaults for future requests
    retryAttempts = 0, // Retry failed requests once
    logger = log, // Custom logger to override the built-in color JSON log()
    onBeforeRequest = null, // Hook to modify request data before request is made
    onAfterRequest = null, // Hook to modify request data after request is made
    repeatEvery = null, // Repeat request every seconds
    repeat = 0, // Repeat request this many times
    debounce = null, // Debounce request this many milliseconds
    ...params // All other params become request params/query
  } = {
    // Destructure options with defaults, merging with any globally set defaults
    ...(window?.grab?.defaults || global?.grab?.defaults || {}),
    ...options,
  };

  // try {
  // Handle repeat and repeatEvery
  if (repeat > 1) {
    for (let i = 0; i < repeat; i++) {
      await grab(path, { ...options, repeat: 0 });
    }
    return response;
  }
  if (repeatEvery) {
    setInterval(async () => {
      await grab(path, { ...options, repeat: 0, repeatEvery: null });
    }, repeatEvery * 1000);
    return response;
  }

  // Store options as defaults if setDefaults flag is true
  if (options?.setDefaults) {
    if (typeof window !== "undefined")
      window.grab.defaults = { ...options, setDefaults: undefined };
    else global.grab.defaults = { ...options, setDefaults: undefined };

    return {};
  }

  // response can be a function in React like setResults
  let resFunction = typeof response === "function" ? response : null;
  // Initialize response object if not provided
  if (!response || resFunction) response = {};

  // Find prior request in log same path and params, ignoring the "page" or similar page key
  let paramsAsText = JSON.stringify(
    paginateKey ? { ...params, [paginateKey]: undefined } : params
  );
  let priorRequest = grab.log?.find(
    (e) => e.request == paramsAsText && e.path == path
  );

  // Handle infinite scroll
  if (infiniteScroll) {
    var [paginateKey2, paginateResult2, element] = infiniteScroll;
    paginateKey = paginateKey2;
    paginateResult = paginateResult2;
    if (typeof element === "string") element = document.querySelector(element);
    element.removeEventListener("scroll", window?.scrollListener);
    window.scrollListener = element.addEventListener(
      "scroll",
      async ({ target: t }) =>
        t.scrollHeight - t.scrollTop <= t.clientHeight + 200 &&
        (await grab(path, {
          ...options,
          cache: false,
          [paginateKey]: priorRequest?.currentPage + 1,
        }))
    );
  }

  // Handle response clearing/caching based on pagination
  if (!paginateKey) {
    // Return cached response if enabled and request is identical
    if (cache && priorRequest) {
      for (let key of Object.keys(priorRequest.res))
        response[key] = priorRequest.res[key];
      if (resFunction) response = resFunction(response);
      return response;
    }

    // Clear previous response data
    for (let key of Object.keys(response)) response[key] = undefined;
  } else {
    // Handle pagination - track current page and append results
    let pageNumber =
      priorRequest?.currentPage + 1 || params?.[paginateKey] || 1;

    //clear response if not repeat request, new params
    if (!priorRequest) {
      response[paginateResult] = [];
      pageNumber = 1;
    }

    //update current page on prior request
    if (priorRequest) priorRequest.currentPage = pageNumber;
    params[paginateKey] = pageNumber;
  }

  // Set loading state
  response.isLoading = true;
  if (resFunction) response = resFunction(response);

  // Enforce rate limiting if enabled
  if (
    rateLimit > 0 &&
    priorRequest?.lastFetchTime &&
    priorRequest.lastFetchTime > Date.now() - 1000 * rateLimit
  )
    throw new Error(
      "Fetch rate limit exceeded for " +
        path +
        ". Wait " +
        rateLimit +
        "s between requests."
    );

  // Handle request cancellation logic
  if (priorRequest?.controller)
    if (cancelOngoingIfNew) priorRequest.controller.abort();
    else if (cancelNewIfOngoing) return { isLoading: true };

  // Setup new request tracking
  grab.log.unshift({
    path,
    request: paramsAsText,
    lastFetchTime: Date.now(),
    controller: new AbortController(),
  });

  // Configure fetch parameters
  let fetchParams = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    redirect: "follow",
    cache: cache ? "force-cache" : "no-store",
    signal: cancelOngoingIfNew
      ? grab.log[0]?.controller?.signal
      : AbortSignal.timeout(timeout * 1000),
  };

  // Format request params/query params based on method
  let paramsGETRequest = "";
  if (["POST", "PUT", "PATCH"].includes(method))
    fetchParams.body = params.body || JSON.stringify(params);
  else paramsGETRequest = "?" + new URLSearchParams(params).toString();

  //hook all requests before request intercept to modify data
  if (typeof beforeRequest === "function")
    [path, response, params, fetchParams] = onBeforeRequest(
      path,
      response,
      params,
      fetchParams
    );

  // Handle path and baseURL, if path is absolute, ignore baseURL
  if (!path.startsWith("/") && !baseURL.endsWith("/")) path = "/" + path;
  if (path.startsWith("http:") || path.startsWith("https:")) baseURL = "";

  // Handle mock server responses if configured
  let res = null,
    startTime = new Date(),
    mockHandler = grab.mock?.[path];

  let wait = (s) => new Promise((res) => setTimeout(res, s * 1000 || 0));

  if (
    mockHandler &&
    (!mockHandler.params || mockHandler.method == method) &&
    (!mockHandler.params || paramsAsText == JSON.stringify(mockHandler.params))
  ) {
    await wait(mockHandler.delay);

    res =
      typeof mockHandler.response === "function"
        ? mockHandler.response(params)
        : mockHandler.response;
  } else {
    // Make actual API request
    res = await fetch(baseURL + path + paramsGETRequest, fetchParams).catch(
      (e) => {
        throw new Error(e);
      }
    );

    //get response type
    let type = res.headers.get("content-type");
    res = await (
      type
        ? type.includes("application/json")
          ? res && res.json()
          : type.includes("application/pdf") ||
              type.includes("application/octet-stream")
            ? res.blob()
            : res.text()
        : res.json()
    ).catch((e) => {
      throw new Error("Error parsing response: " + e);
    });

    // if (res?.startsWith && res?.startsWith("{")) res = JSON.parse(res);
  }

  //hook all requests before request intercept to modify data
  if (typeof afterRequest === "function")
    [path, response, params, fetchParams] = onAfterRequest(
      path,
      response,
      params,
      fetchParams
    );

  // Clear loading state
  delete response.isLoading;

  delete priorRequest?.controller;

  // Log debug information if enabled

  const elapsedTime = ((Number(new Date()) - Number(startTime)) / 1000).toFixed(
    1
  );
  if (debug) {
    log(
      "Path:" +
        baseURL +
        path +
        paramsGETRequest +
        "\n" +
        JSON.stringify(options, null, 2) +
        "\nTime: " +
        elapsedTime +
        "s\nResponse: " +
        printStructureJSON(res)
    );
    // allows user to expand and collapse the object in console
    console.log(res);
  }

  //if not object, return
  if (typeof res === "undefined") return;

  // Update response object with results, handling pagination
  for (let key of Object.keys(res))
    response[key] =
      paginateResult == key && response[key]?.length
        ? [...response[key], ...res[key]] // concat with existing results
        : res[key]; // set new results

  // Store request/response data for future reference
  grab.log.unshift({
    path,
    request: JSON.stringify({ ...params, paginateKey: undefined }),
    response,
    lastFetchTime: Date.now(),
  });

  if (resFunction) response = resFunction(response);

  return response;
  // } catch (error) {
  //   let errorMessage =
  //     "Error: " + error.message + "\nPath:" + baseURL + path + "\n";
  //   JSON.stringify(params);

  //   // Handle errors, with optional retry
  //   if (options.retryAttempts > 0)
  //     return await grab(path, response, {
  //       ...options,
  //       retryAttempts: --options.retryAttempts,
  //     });
  //   // update error in response
  //   if (!error.message.includes("signal")) {
  //     log(errorMessage, true, "color: red;");
  //     if (debug) showAlert(errorMessage);
  //     response.error = error.message;
  //   }
  //   delete response.isLoading;
  //   // update error in log
  //   grab.log?.unshift({
  //     path,
  //     request: JSON.stringify(params),
  //     error: error.message,
  //   });
  //   if (typeof options.response === "function")
  //     response = options.response(response);
  //   return response;
  // }
}

/**
 * Creates a new instance of grab with default options
 * to apply to all requests made by this instance
 * @param {Object} defaultOptions - options for all requests by instance
 * @returns {Function} grab() function using those options
 */
grab.instance =
  (defaultOptions = {}) =>
  (path, options = {}) =>
    grab(path, { ...defaultOptions, ...options });

//keyboard shortcut to toggle debug
document.addEventListener("keydown", (e) => {
  if (e.key === "i" && e.ctrlKey) {
    //creeate html of the grab.log requests
    let html = " ";
    for (let request of grab.log) {
      html += `<div style="margin-bottom:1em; border-bottom:1px solid #ccc; padding-bottom:1em;">
        <b>Path:</b> ${request.path}<br>
        <b>Request:</b> ${request.request}<br>
        <b>Response:</b> ${JSON.stringify(request.response, null, 2)}<br>
        <b>Time:</b> ${new Date(request.lastFetchTime).toLocaleString()}
      </div>`;
    }
    showAlert(html);
  }
});

// Add globals to window in browser, or global in Node.js
if (typeof window !== "undefined") {
  window.grab = grab;
  window.log = log;
  window.grab.log = [];
  window.grab.mock = {};
  window.grab.defaults = {};
} else if (typeof global !== "undefined") {
  global.grab = grab;
  global.log = log;
  global.grab.log = [];
  global.grab.mock = {};
  global.grab.defaults = {};
}

/**
 * TODO
 *  - pagination working
 *  - react tests
 *  - progress
 *  - grab error popup and dev tool
 *  - tests in stackblitz
 *  - loading icons
 *  - repeat every
 *  - show net log in alert
 */
