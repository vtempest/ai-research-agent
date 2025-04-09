import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import pino from "pino";
import { SERVER_API_URL } from "$lib/custom-domain";

/**
 * Log errors in development and production environments.
 *
 * @type {import("pino").Logger}
 */
export const logger = pino({
  level: typeof window === "undefined" ? "debug" : "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

/**
 * Fetch data from server API by defining params in JSON
 * and getting response in JSON, or return error JSON object.
 *
 * @param {string} path The path in the API to call
 * @param {Object} [params={}] Optional parameters to pass to the API
 * @param {string} [params.method="GET"] The HTTP method to use
 * @returns {Promise<Object>} The response from the server API
 * @example var response: {
 *     customField: string;
 *     error: string;
 *   } = await callServerAPI('users', {
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
export async function callServerAPI(
  path: string,
  params: any = {}
): Promise<any> {
  try {
    var { headers, method, baseURL = SERVER_API_URL, ...body } = params;

    method = method || "GET";
    const fetchParams = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: null,
      redirect: "follow" as const,
    };

    if (method === "POST") {
      fetchParams.body = JSON.stringify(body);
    } else path += "?" + new URLSearchParams(body).toString();

    var response = await fetch(baseURL + path, fetchParams).then((res) =>
      res.text()
    );

    if (!response.startsWith("{")) {
      return { error: "Not JSON response" };
    }

    return JSON.parse(response);
  } catch (error) {
    logger.debug(error);
    return { error };
  }
}

/**
 * Utility function for merging Tailwind classes, needed for
 * [shadcn-svelte.](https://next.shadcn-svelte.com/docs/migration/svelte-5#update-utils)
 *
 * @param {ClassValue[]} inputs
 * @returns {string} class name
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the user's device OS
 * @returns {string} OS Name: Windows, Mac, Linux, Android, iOS, or Other
 */
export function getUserDeviceOS():
  | "Windows"
  | "Mac"
  | "Linux"
  | "Android"
  | "iOS"
  | "Other" {
  const ua = navigator?.userAgent;

  if (/Windows/i.test(ua)) {
    return "Windows";
  } else if (/Mac/i.test(ua)) {
    return "Mac";
  } else if (/Linux/i.test(ua)) {
    return "Linux";
  } else if (/Android/i.test(ua)) {
    return "Android";
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    return "iOS";
  } else {
    return "Other";
  }
}
