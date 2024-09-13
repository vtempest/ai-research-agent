
/**
 * ### Tardigrade Crawler 
 * #### Use Fetch API, check for bot detection
 * 
 * Scrape  any domain's URL to get its HTML, JSON, or arraybuffer.<br />
 * Features: timeout, redirects, default UA, referer as google, and bot detection checking. <br />
 * Scraping internet pages is a <a href="https://blog.apify.com/is-web-scraping-legal/">free speech
 *  right globally</a>.
 * 
 * #### Docker container, bypass bot check
 * 1. Docker container with NodeJS server API takes url and renders with puppeteer DOM to get all HTML.
 * 2. Bypass Cloudflare bot check: A webpage proxy that request through Chromium (puppeteer) - can be used
 * to bypass Cloudflare anti bot / anti ddos on any application (like curl)
 * 3. Send your request to the server with the port 3000 and add your URL to the "url"
 *  query string like this: `http://localhost:3000/?url=https://example.org`
 *
 * <img src="https://i.imgur.com/XXXTprT.png" width="500px" />
 * @param {string} url - any domain's URL
 * @param {Object} [options]
  * @param {number} options.timeout default=5 -  abort request if not retrived, in seconds
 * @param {number} options.maxRedirects default=3 - max redirects to follow
 * @param {number} options.checkBotDetection default=true - check for bot detection messages
 * @param {number} options.changeReferer default=true - set referer as google
 * @param {number} options.userAgentIndex default=0 - index of [google bot, default chrome]
 * @param {number} options.useCORSProxy default=false - use 60%-working corsproxy.io (in frontend JS)
 * @param {string} options.urlProxy default=false - use proxy url
 * @returns {Promise<Object|string>} -  HTML, JSON, arraybuffer, or error object
* @example await scrapeURL("https://hckrnews.com", {timeout: 5, userAgentIndex: 1})
 * @author [Gulakov, A. (2024)](https://airesearch.wiki)
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
      urlProxy = false,
      useProxyAsBackup = true,
    } = options;

    
    if(urlProxy)
      url = urlProxy + encodeURIComponent(url);


    var userAgentStrings =
      ['Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible ; Googlebot/2.1 ; +http://www.google.com/bot.html)',
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)"]

    var headers = {
      ...options,
      "User-Agent": userAgentStrings[userAgentIndex],
      signal: AbortSignal.timeout(timeout * 1000),
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "priority": "u=0, i",
      "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
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



      //spoof the base-url for relative paths on the target page
      // html = (html || "").replace(/<head[^>]*>/i, "<head><base href='" + url + "/'>")

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
    "<p>Please enable JS and disable any ad blocker</p></p>",
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
    "You can’t perform that action at this time."
  ];

  return commonBlocks.filter(m => html?.indexOf(m) > -1).length > 0;
}


// try on the frontend  
// <iframe id="dom-iframe" style="width:0;height:0;border:0; border:none;"></iframe>
// document.getElementById('dom-iframe').src = '/get?url=' + url;
// document.getElementById('dom-iframe').contentWindow.document.body.innerHTML;
