/**
 * <b>Allow CORS - Chrome Extension API.</b> Add (Access-Control-Allow-Origin: *) rule to the response 
 * header of all requests to enable cross-domain requests to scrape data from other domains. 
 * CORS is voluntarily enforced by browser frontends, but not by curl or backend
 * requests. Allowing CORS on the front-end means no proxy server is needed and web apps 
 * have Browser App functionality and can turn any data into an API.
 * [There are several extension enabling CORS.](https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?)
 * It is suggested to allow only on specific initiator domains to prevent errors 
 * commonly caused on secure sites like Claude.ai. Needs [Chrome API 
 * "permissions"](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest):[ "declarativeNetRequest"]
 * 
 *  * @param {string[]} initiatorDomains - The domains allowed to initiate CORS request
 * @param {string} receivingDomains - The domains allowed to receive the request
 * @returns {void}
 * @category Chrome Extension
 * @example chrome.runtime.onInstalled.addListener(() => {
    modifyChromeAPIAllowCORS(["qwksearch.com"]);
  });
 */
export function modifyChromeAPIAllowCORS(
  initiatorDomains = "*://*/*",
  receivingDomains = "*"
) {
  return chrome?.declarativeNetRequest?.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: "modifyHeaders",
          responseHeaders: [
            {
              header: "Access-Control-Allow-Origin",
              operation: "set",
              value: "*",
            },
            {
              header: "Access-Control-Allow-Methods",
              operation: "set",
              value: "GET, POST, OPTIONS, PUT, DELETE, PATCH",
            },
          ],
        },
        condition: {
          urlFilter: receivingDomains,
          initiatorDomains,
          resourceTypes: [
            "main_frame",
            "sub_frame",
            "stylesheet",
            "script",
            "image",
            "font",
            "object",
            "xmlhttprequest",
            "ping",
            "csp_report",
            "media",
            "websocket",
            "other",
          ],
        },
      },
    ],
  });
}

