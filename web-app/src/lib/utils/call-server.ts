/**
 * Fetch JSON data from server API pass in param in JSON format.
 *
 * @param {string} path The path in the API to call
 * @param {Object} [params={}] Optional parameters to pass to the API
 * @param {string} [params.method="GET"] The HTTP method to use
 * @returns {Promise<Object>} The response from the server API
 * @example var response = await callServerAPI('users', {
 *   method: 'POST',
 *   headers: {
 *     'X-API-KEY': 'your-api-key',
 *   },
 *   query: "search words", 
 * })
 * if (response.error) {
 *  console.error(response.error);
 *  return;
 * }
 * console.log(response);
 */
export async function callServerAPI(path, params = {}) {
  try {
    const method = params.method || "GET";
    const fetchParams = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...params.headers,
      },
    };
    if (method === "POST") {
      fetchParams.body = JSON.stringify(params);
    } else if (method === "GET") {
      const searchParams = new URLSearchParams(params);
      path += `?${searchParams.toString()}`;
    }

    var baseURL = params.baseURL || '/api/';

    var response = await fetch(baseURL + path,
      fetchParams
    ).then((res) => res.text());

    if (!response.startsWith("{")) {
      console.error(response);
      return { error: "Not JSON response" };
    }

    return JSON.parse(response);
  } catch (error) {
    console.debug(error);
    return { error };
  }
}
