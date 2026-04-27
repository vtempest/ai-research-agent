import grab from "grab-url";

export async function apiRequest(endpoint: string, options?: any) {
  return await grab(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
}
