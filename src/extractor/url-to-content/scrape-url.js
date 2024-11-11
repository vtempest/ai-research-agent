
/**
 * ### Tardigrade the Web Crawler 
 * <img src="https://i.imgur.com/XXXTprT.png" width="350px" /> 
 * 
 * 1. **Use Fetch API, check for bot detection.** Scrape  any domain's URL to get its HTML, JSON, or arraybuffer.<br />
 * Scraping internet pages is a [free speech right 
 * ](https://blog.apify.com/is-web-scraping-legal/).
 * 2. Features: timeout, redirects, default UA, referer as google, and bot 
 * detection checking. <br />
 * 3. If fetch method does not get needed HTML, use Docker proxy as backup.
 * 
 * 4. [Setup Docker](https://github.com/vtempest/ai-research-agent/tree/master/src/crawler)
 *  container with NodeJS server API renders with puppeteer DOM to get all HTML loaded by
 *  secondary in-page API requests after the initial page request, including user login and cookie storage.
 * 5. Bypass Cloudflare bot check: A webpage proxy that request through Chromium (puppeteer) - can be used
 * to bypass Cloudflare anti bot using cookie id javascript method.
 * 6. Send your request to the server with the port 3000 and add your URL to the "url"
 *  query string like this: `http://localhost:3000/?url=https://example.org`
 *
 * @param {string} url - any domain's URL
 * @param {Object} [options]
 * @param {number} options.timeout default=5 -  abort request if not retrived, in seconds
 * @param {number} options.maxRedirects default=3 - max redirects to follow
 * @param {number} options.checkBotDetection default=true - check for bot detection messages
 * @param {number} options.changeReferer default=true - set referer as google
 * @param {number} options.userAgentIndex default=0 - index of [google bot, default chrome]
 * @param {number} options.useCORSProxy default=false - use 60%-working corsproxy.io (in frontend JS)
 * @param {string} options.proxy default=false - use proxy url
 * @param {boolean} options.checkRobotsAllowed default=false - check robots.txt rules
 * @returns {Promise<string>} -  HTML, JSON, arraybuffer, or error object
 * @category Extract
 * @example await scrapeURL("https://hckrnews.com", {timeout: 5, userAgentIndex: 1})
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 */
export async function scrapeURL(url, options = {}) {
  // try {
    let {
      timeout = 15,
      checkBotDetection = true,
      maxRedirects = 3,
      changeReferer = 0,
      userAgentIndex = 0,
      useCORSProxy = false,
      proxy = null,
      useProxyAsBackup = true,
      checkRobotsAllowed = false,
    } = options;

    if(checkRobotsAllowed) {
      const rules = await fetchScrapingRules(url);
      //TODO cache rules per domain
      if(!isAllowedToScrape(rules, url)) {
        return { error: "Robots.txt forbids to scrape there" };
      }
    }

    
    if(proxy)
      url = proxy +   url;

    // console.log(url);

    var userAgentStrings =
      ['Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible ; Googlebot/2.1 ; +http://www.google.com/bot.html)',
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)"]

    var headers = {
      ...options,
      "User-Agent": userAgentStrings[userAgentIndex],
      signal: AbortSignal.timeout(timeout * 1000),
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
    };

    if (changeReferer)
      headers["Referer"] = "https://www.google.com/";


    let response = await fetch(url, headers);

    if (response.redirected) {
      if (maxRedirects <= 0)
        return { error: "Max redirects exceeded" };
      maxRedirects--;
      options = { ...options, maxRedirects };

      return scrapeURL(response.url, options);
    }


    //return based on content type
    const contentType = response.headers.get("Content-Type");

    if (contentType.includes("application/json")) {
      return await response.json();
    } else if (contentType.includes("text")) {
      var html = await response.text();
      if (checkBotDetection && isHTMLBotDetection(html))
        return { error: "Bot detected" }; //, html: response.html };



      return html;
    } else {
      // For other types, return as arrayBuffer
      return await response.arrayBuffer();
    }
  // } catch (e) {
  //   return { error: "Error in fetch", msg: e.message };
  // }
}

/**
 * Check html for bot block messages
 * @param {string} html
 * @returns {Boolean} true if bot detection message found
 */
function isHTMLBotDetection(html) {
  var commonBlocks = [
    "The security system for this website has been triggered",
    "You do not have permission to view this page.",
    "Our systems have detected unusual traffic from your computer network.",
    "Your request has been blocked due to a network policy.",
    "Cloudflare Ray ID found ",
    "Please verify you are a human",
    "Our systems have detected unusual traffic activity from your network. Please complete this reCAPTCHA",
    "Sorry, we just need to make sure you're not a robot",
    "Access to this page has been denied",
    "<p>Please enable JS and disable any ad blocker",
    "Please make sure your browser supports JavaScript",
    "Please complete the security check to access",
    "https://errors.edgesuite.net",
    "Please enable JS and disable any ad blocker",
    "The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    "We’re currently checking your connection. This shouldn’t take long.",
    "Generated by cloudfront (CloudFront)",
    "You don't have permission to access",
    "The request could not be satisfied.",
    "Enable JavaScript and cookies to continue",
    "Something went wrong. Wait a moment and try again.",
    "You’re using a web browser that isn’t supported",
    "You can’t perform that action at this time.",
    "403 Forbidden",
    "504 Gateway Timeout",
    "Agree & Join LinkedIn",
    "Verifying you are human. This may take a few seconds",
    "500 Internal Server Error",
    "By clicking Continue to join or sign in, you agree to LinkedIn",
  ];

  return commonBlocks.filter(m => html?.indexOf(m) > -1).length > 0;
}



/**
 * Fetches and parses the robots.txt file for a given URL.
 * @param {string} url - The base URL to fetch the robots.txt from.
 * @returns {Promise<Object>} A JSON object representing the parsed robots.txt.
 */
export async function fetchScrapingRules(url) {
  const hostname = url.split('//')[1].split('/')[0];
  const robotsUrl = `https://${hostname}/robots.txt`;
  const content = await (await fetch(robotsUrl)).text();
  const rules = {
    directives: {},
    crawlDelay: {},
    sitemaps: [],
    preferredHost: null
  };
  let currentUserAgents = [];

  const lines = content.split('\n');
  for (const line of lines) {
    const [directive, value] = line.split(':').map(s => s.trim());
    switch (directive.toLowerCase()) {
      case 'user-agent':
        currentUserAgents = [value.toLowerCase()];
        break;
      case 'disallow':
      case 'allow':
        for (const ua of currentUserAgents) {
          rules.directives[ua] = rules.directives[ua] || [];
          rules.directives[ua].push({ path: value, allow: directive.toLowerCase() === 'allow' });
        }
        break;
      case 'crawl-delay':
        for (const ua of currentUserAgents) {
          rules.crawlDelay[ua] = parseFloat(value);
        }
        break;
      case 'sitemap':
        rules.sitemaps.push(value);
        break;
      case 'host':
        rules.preferredHost = value.toLowerCase();
        break;
    }
  }
  return rules;
}

/**
 * Checks if a given path is allowed for a specific user agent.
 * @param {Object} rules - The parsed rules from robots.txt.
 * @param {string} path - The path to check.
 * @param {string} [userAgent='*'] - The user agent to check for.
 * @returns {boolean} True if the path is allowed, false otherwise.
 */
function isAllowedToScrape(rules, path, userAgent = '*') {
  const relevantRules = rules.directives[userAgent.toLowerCase()]
   || rules.directives['*'] || [];
  for (const rule of relevantRules) 
    if (path.startsWith(rule.path)) 
      return rule.allow;
    
  return true; // If no rules match, it's allowed by default
}
