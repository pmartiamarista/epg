export const buildQueryParams = (params: Record<string, string>): string => {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : "";
};
