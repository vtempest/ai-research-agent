/**
 * @class Crawler
 * 1. Server API takes url and renders with puppeteer DOM to get all HTML.
 * 2. Bypass Cloudflare bot check
 *  A webpage proxy that request through Chromium (puppeteer) - can be used
 * to bypass Cloudflare anti bot / anti ddos on any application (like curl)
 * Send your request to the server with the port 3000 and add your URL to the "url"
 *  query string like this: `http://localhost:3000/?url=https://example.org`
 *
 * <img src="https://i.imgur.com/XXXTprT.png" width="500px" />
*/ 
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin()); // Use stealth plugin to make puppeteer harder to detect

// Import Koa and its middleware
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new Koa(); // Create a new Koa application
app.use(bodyParser()); // Use body parser middleware

// Import jsesc for escaping JavaScript strings
const jsesc = require("jsesc");

// Define headers to be removed from requests and responses
const requestHeadersToRemove = [
  "host",
  "user-agent",
  "accept-encoding",
  "content-length",
  "forwarded",
  "x-forwarded-proto",
  "x-forwarded-for",
  "x-cloud-trace-context",
];
const responseHeadersToRemove = [
  "Accept-Ranges",
  "Content-Length",
  "Keep-Alive",
  "Connection",
  "content-encoding",
  "set-cookie",
];

// Main application logic
// Set up Puppeteer options
let options = {
  headless: "new", // Use new headless mode
  args: ["--no-sandbox", "--disable-setuid-sandbox"], // Security-related arguments
};

// Configure Puppeteer based on environment variables
if (process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD)
  options.executablePath = "/usr/bin/chromium-browser";
if (process.env.PUPPETEER_HEADFUL) options.headless = false;
if (process.env.PUPPETEER_USERDATADIR)
  options.userDataDir = process.env.PUPPETEER_USERDATADIR;
if (process.env.PUPPETEER_PROXY)
  options.args.push(`--proxy-server=${process.env.PUPPETEER_PROXY}`);

// Launch the browser
const browser = await puppeteer.launch(options);

// Set up Koa middleware
app.use(async (ctx) => {
  if (ctx.query.url) {
    // Extract and decode the URL from the query string
    const url = decodeURIComponent(ctx.url.replace("/?url=", ""));
    if (process.env.DEBUG) {
      console.log(`[DEBUG] URL: ${url}`);
    }

    // Initialize variables for response data
    let responseBody;
    let responseData;
    let responseHeaders;

    // Create a new page
    const page = await browser.newPage();

    // Set up request interception
    await page.removeAllListeners("request");
    await page.setRequestInterception(true);
    let requestHeaders = ctx.headers;
    requestHeadersToRemove.forEach((header) => {
      delete requestHeaders[header];
    });

    // Handle each intercepted request
    page.on("request", (request) => {
      requestHeaders = Object.assign({}, request.headers(), requestHeaders);
      if (process.env.DEBUG) {
        console.log(
          `[DEBUG] requested headers: \n${JSON.stringify(requestHeaders)}`
        );
      }
      if (ctx.method == "POST") {
        request.continue({
          headers: requestHeaders,
          method: "POST",
          postData: ctx.request.rawBody,
        });
      } else {
        request.continue({ headers: requestHeaders });
      }
    });

    // Set up CDP session for more control over the browser
    const client = await page.target().createCDPSession();
    await client.send("Network.setRequestInterception", {
      patterns: [
        {
          urlPattern: "*",
          resourceType: "Document",
          interceptionStage: "HeadersReceived",
        },
      ],
    });

    // Handle intercepted responses
    await client.on("Network.requestIntercepted", async (e) => {
      let obj = { interceptionId: e.interceptionId };
      if (e.isDownload) {
        await client
          .send("Network.getResponseBodyForInterception", {
            interceptionId: e.interceptionId,
          })
          .then((result) => {
            if (result.base64Encoded) {
              responseData = Buffer.from(result.body, "base64");
            }
          });
        obj["errorReason"] = "BlockedByClient";
        responseHeaders = e.responseHeaders;
      }
      await client.send("Network.continueInterceptedRequest", obj);
      if (e.isDownload) await page.close();
    });

    try {
      // Navigate to the URL and handle potential challenges
      let response;
      let tryCount = 0;
      response = await page.goto(url, {
        timeout: 10000,
        waitUntil: "domcontentloaded",
      });
      ctx.status = response.status();
      responseBody = await response.text();
      responseData = await response.buffer();
      while (
        responseBody.includes(
          process.env.CHALLENGE_MATCH || "challenge-platform"
        ) &&
        tryCount <= 10
      ) {
        newResponse = await page.waitForNavigation({
          timeout: 10000,
          waitUntil: "domcontentloaded",
        });
        if (newResponse) response = newResponse;
        responseBody = await response.text();
        responseData = await response.buffer();
        tryCount++;
      }
      responseHeaders = await response.headers();

      // Handle cookies
      const cookies = await page.cookies();
      if (cookies)
        cookies.forEach((cookie) => {
          const { name, value, secure, expires, domain, ...options } = cookie;
          ctx.cookies.set(cookie.name, cookie.value, options);
        });
    } catch (error) {
      // Handle errors
      if (!error.toString().includes("ERR_BLOCKED_BY_CLIENT")) {
        ctx.status = 500;
        ctx.body = error;
      }
    }

    // Close the page
    await page.close();

    // Process response headers
    if (responseHeaders) {
      responseHeadersToRemove.forEach(
        (header) => delete responseHeaders[header]
      );
      Object.keys(responseHeaders).forEach((header) =>
        ctx.set(header, jsesc(responseHeaders[header]))
      );
    }

    // Debug logging
    if (process.env.DEBUG) {
      console.log(
        `[DEBUG] response headers: \n${JSON.stringify(responseHeaders)}`
      );
    }

    // Set the response body
    ctx.body = responseData;
  } else {
    // If no URL is provided, return an error message
    ctx.body = "Please specify the URL in the 'url' query string.";
  }
});

// Start the server
app.listen(process.env.PORT || 3000, process.env.ADDRESS || "::");
