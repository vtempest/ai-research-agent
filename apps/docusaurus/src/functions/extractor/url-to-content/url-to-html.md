[ai-research-agent](../../modules.md) / extractor/url-to-content/url-to-html

## Extract

### scrapeURL()

```ts
function scrapeURL(url: string, options?: object): Promise<string>;
```

Defined in: [src/extractor/url-to-content/url-to-html.js:44](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-html.js#L44)

### Tardigrade the Web Crawler 
<img src="https://i.imgur.com/iuzpcvD.png" width="350px" /> 

1. **Use Fetch API, check for bot detection.** Scrape  any domain's URL to get its HTML, JSON, or arraybuffer.<br />
Scraping internet pages is a [free speech right 
](https://blog.apify.com/is-web-scraping-legal/).
2. Features: timeout, redirects, default UA, referer as google, and bot 
detection checking. <br />
3. If fetch method does not get needed HTML, use Docker proxy as backup.

4. [Setup Docker](https://github.com/vtempest/ai-research-agent/tree/master/src/crawler)
 container with NodeJS server API renders with puppeteer DOM to get all HTML loaded by
 secondary in-page API requests after the initial page request, including user login and cookie storage.
5. Bypass Cloudflare bot check: A webpage proxy that request through Chromium (puppeteer) - can be used
to bypass Cloudflare anti bot using cookie id javascript method.
6. Send your request to the server with the port 3000 and add your URL to the "url"
 query string like this: `http://localhost:3000/?url=https://example.org`

7. Optional: Setup residential IP proxy to access sites that IP-block datacenters
 and manage rotation with [Scrapoxy](https://scrapoxy.io). Recommended:
[Hypeproxy](https://hypeproxy.io/products/static-residential-proxies)
[NinjasProxy](https://ninjasproxy.com/residential-proxies/)
[Proxy-Cheap](https://app.proxy-cheap.com/order)
[LiveProxies](https://liveproxies.io/rotating-residential-proxies-pricing)

#### Parameters

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

`url`

</td>
<td>

`string`

</td>
<td>

any domain's URL

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `changeReferer`: `number`; `checkBotDetection`: `number`; `checkRobotsAllowed`: `boolean`; `maxRedirects`: `number`; `proxy`: `string`; `timeout`: `number`; `userAgentIndex`: `number`; \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.changeReferer?`

</td>
<td>

`number`

</td>
<td>

default=true - set referer as google

</td>
</tr>
<tr>
<td>

`options.checkBotDetection?`

</td>
<td>

`number`

</td>
<td>

default=true - check for bot detection messages

</td>
</tr>
<tr>
<td>

`options.checkRobotsAllowed?`

</td>
<td>

`boolean`

</td>
<td>

default=false - check robots.txt rules

</td>
</tr>
<tr>
<td>

`options.maxRedirects?`

</td>
<td>

`number`

</td>
<td>

default=3 - max redirects to follow

</td>
</tr>
<tr>
<td>

`options.proxy?`

</td>
<td>

`string`

</td>
<td>

default=false - use proxy url

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

default=5 -  abort request if not retrived, in seconds

</td>
</tr>
<tr>
<td>

`options.userAgentIndex?`

</td>
<td>

`number`

</td>
<td>

default=0 - index of [google bot, default chrome]

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;

-  HTML, JSON, arraybuffer, or error object

#### Example

```ts
await scrapeURL("https://hckrnews.com", {timeout: 5, userAgentIndex: 1})
```

#### Author

[ai-research-agent (2024)](https://airesearch.js.org)

## Other

### fetchScrapingRules()

```ts
function fetchScrapingRules(url: string): Promise<any>;
```

Defined in: [src/extractor/url-to-content/url-to-html.js:211](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-html.js#L211)

Fetches and parses the robots.txt file for a given URL.

#### Parameters

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

`url`

</td>
<td>

`string`

</td>
<td>

The base URL to fetch the robots.txt from.

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`any`&gt;

A JSON object representing the parsed robots.txt.

***

### scrapeJINA()

```ts
function scrapeJINA(url: string): Promise<string>;
```

Defined in: [src/extractor/url-to-content/url-to-html.js:132](https://github.com/vtempest/ai-research-agent/tree/master/packages/ai-research-agent/src/extractor/url-to-content/url-to-html.js#L132)

As backup, scrape with JINA to get html

#### Parameters

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

`url`

</td>
<td>

`string`

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`&lt;`string`&gt;
