[Documentation](../modules.md) / lib/grab-api

## grab()

```ts
function grab(path: string, options?: object): Promise<any>;
```

Defined in: apps/web-app/src/lib/grab-api.js:60

### GRAB: Generate Request to API from Browser
![GrabAPILogo](https://i.imgur.com/qrQWkeb.png)

1. **One Function**: 2Kb min, 0 dependencies, minimal boilerplate syntax - [better than top alternatives](https://grab.js.org/guide/Comparisons) 
2. **Auto-JSON Convert**: Pass parameters and get response or error in JSON, handling other data types as is.
3. **isLoading Status**: Sets `.isLoading=true` on the pre-initialized response object so you can show a "Loading..." in any framework
4. **Debug Logging**: Adds global `log()` and prints colored JSON structure, response, timing for requests in test.
5. **Mock Server Support**: Configure `window.grab.mock` for development and testing environments
6. **Concurrency Handling**: Prevent this request if one is ongoing to same path & params, or cancel the ongoing request.
7. **Timeout & Retry**: Customizable request timeout, default 20s, and auto-retry on error
8. **Rate Limiting**: Built-in rate limiting to prevent multi-click cascading responses, require to wait seconds between requests.
9. **Request History**: Stores all request and response data in global `grab.log` object
10. **Pagination Infinite Scroll**: Built-in pagination for infinite scroll to auto-load and merge next result page.
11. **Base URL Based on Environment**: Configure `grab.defaults.baseURL` once at the top, overide with `SERVER_API_URL` in `.env` or `process.env.SERVER_API_URL` in Node.js.
12. **Frontend Cache**: Set cache headers and retrieve from frontend memory for repeat requests to static data.
13. **Modular Design**: Can be used in any frontend framework, Node.js 18+, Bun, Deno, Cloudflare Workers, etc.
14. **Framework Agnostic**: Alternatives like TanStack work only in component initialization and depend on React & others. 
15. **Globals**: Adds to window in browser or global in Node.js so you only import once: `grab()`, `log()`, `grab.log`, `grab.mock`, `grab.defaults`
16. **TypeScript Tooltips**: Developers can hover over option names and autocomplete TypeScript. Add to top of file: `import 'grab-api.js/globals'`
17. **Request Stategies**: [🎯 Examples](https://grab.js.org/guide/Examples) show common stategies like debounce, repeat, proxy, unit tests, interceptors, file upload, etc
18. **DevTools**: `Ctrl+I` overlays webpage with devtools showing all requests and responses, timing, and JSON structure.
19. **Repeat**: Repeat request this many times, or repeat every X seconds to poll for updates.
20. **Loading Icons**: Import from `grab-api.js/icons` to get enhanced animated loading icons.

### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`path`

</td>
<td>

`string`

</td>
<td>

The full URL path OR relative path on this server after `grab.defaults.baseURL`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `method?`: `string`; `response?`: `any`; `cancelOngoingIfNew?`: `boolean`; `cancelNewIfOngoing?`: `boolean`; `cache?`: `boolean`; `debug?`: `boolean`; `timeout?`: `number`; `rateLimit?`: `number`; `paginateResult?`: `string`; `paginateKey?`: `string`; `baseURL?`: `string`; `setDefaults?`: `boolean`; `retryAttempts?`: `number`; `repeat?`: `number`; `repeatEvery?`: `number`; `logger?`: `Function`; `onBeforeRequest?`: `Function`; `onAfterRequest?`: `Function`; \}

</td>
<td>

Request params for GET or body for POST/PUT/PATCH and utility options

</td>
</tr>
<tr>
<td>

`options.method?`

</td>
<td>

`string`

</td>
<td>

default="GET" The HTTP method to use

</td>
</tr>
<tr>
<td>

`options.response?`

</td>
<td>

`any`

</td>
<td>

Pre-initialized object to set the response in. isLoading and error are also set on this object.

</td>
</tr>
<tr>
<td>

`options.cancelOngoingIfNew?`

</td>
<td>

`boolean`

</td>
<td>

default=true Cancel previous requests to same path

</td>
</tr>
<tr>
<td>

`options.cancelNewIfOngoing?`

</td>
<td>

`boolean`

</td>
<td>

default=false Cancel if a request to path is in progress

</td>
</tr>
<tr>
<td>

`options.cache?`

</td>
<td>

`boolean`

</td>
<td>

default=false Whether to cache the request and from frontend cache

</td>
</tr>
<tr>
<td>

`options.debug?`

</td>
<td>

`boolean`

</td>
<td>

default=false Whether to log the request and response

</td>
</tr>
<tr>
<td>

`options.timeout?`

</td>
<td>

`number`

</td>
<td>

default=20 The timeout for the request in seconds

</td>
</tr>
<tr>
<td>

`options.rateLimit?`

</td>
<td>

`number`

</td>
<td>

default=0 If set, how many seconds to wait between requests

</td>
</tr>
<tr>
<td>

`options.paginateResult?`

</td>
<td>

`string`

</td>
<td>

The key to paginate result data by

</td>
</tr>
<tr>
<td>

`options.paginateKey?`

</td>
<td>

`string`

</td>
<td>

default="" The key to paginate the request by

</td>
</tr>
<tr>
<td>

`options.baseURL?`

</td>
<td>

`string`

</td>
<td>

default='/api/' base url prefix, override with SERVER_API_URL env

</td>
</tr>
<tr>
<td>

`options.setDefaults?`

</td>
<td>

`boolean`

</td>
<td>

default=false Pass this with options to set
 those options as defaults for all requests.

</td>
</tr>
<tr>
<td>

`options.retryAttempts?`

</td>
<td>

`number`

</td>
<td>

default=0 Retry failed requests this many times

</td>
</tr>
<tr>
<td>

`options.repeat?`

</td>
<td>

`number`

</td>
<td>

default=0 Repeat request this many times

</td>
</tr>
<tr>
<td>

`options.repeatEvery?`

</td>
<td>

`number`

</td>
<td>

default=null Repeat request every seconds

</td>
</tr>
<tr>
<td>

`options.logger?`

</td>
<td>

`Function`

</td>
<td>

default=log Custom logger to override the built-in color JSON log()

</td>
</tr>
<tr>
<td>

`options.onBeforeRequest?`

</td>
<td>

`Function`

</td>
<td>

Set with defaults to modify each request data. Takes and returns in order: path, response, params, fetchParams

</td>
</tr>
<tr>
<td>

`options.onAfterRequest?`

</td>
<td>

`Function`

</td>
<td>

Set with defaults to modify each request data. Takes and returns in order: path, response, params, fetchParams

</td>
</tr>
</tbody>
</table>

### Returns

`Promise`&lt;`any`&gt;

The response object with resulting data or .error if error.

### Author

[vtempest (2025)](https://github.com/vtempest/grab-api)

### See

[🎯 Examples](https://grab.js.org/guide/Examples) [📑 Docs](https://grab.js.org)

### Example

```ts
import grab from 'grab-api.js';

 let res = {};
 await grab('search', {
   response: res,
   query: "search words"
 })
```
