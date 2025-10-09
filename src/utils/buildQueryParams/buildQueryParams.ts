/**
 * Builds URL query parameters from a key-value object
 *
 * This utility function converts a JavaScript object into URL query parameters
 * using the native URLSearchParams API. It's commonly used for API requests
 * and URL construction throughout the EPG application.
 *
 * @param params - Object containing key-value pairs for query parameters
 *
 * @returns Query string with leading '?' if parameters exist, empty string otherwise
 *
 * @example
 * ```typescript
 * // Basic query parameters
 * const query = buildQueryParams({ page: "1", limit: "10" });
 * // Returns: "?page=1&limit=10"
 *
 * // Empty parameters
 * const emptyQuery = buildQueryParams({});
 * // Returns: ""
 *
 * // API request example
 * const apiUrl = `https://api.example.com/epg${buildQueryParams({ channel: "bbc1" })}`;
 * // Results in: "https://api.example.com/epg?channel=bbc1"
 * ```
 */
export const buildQueryParams = (params: Record<string, string>): string => {
  if (!params || typeof params !== "object") {
    return "";
  }

  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : "";
};
