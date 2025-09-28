import { epgService } from "@/api/epg-service/epg-service";

import type { EpgResponse } from "@/types/egp.types";

// EPG Query Keys - centralized for consistency
export const epgQueryKeys = {
  all: ["epg"] as const,
  lists: () => [...epgQueryKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...epgQueryKeys.lists(), { filters }] as const,
} as const;

// EPG Query Functions
export const epgQueryFunctions = {
  getEpgData: async (): Promise<EpgResponse> => {
    const result = await epgService.getEpgData();
    if (result.error) {
      throw new Error(result.error.message || "Failed to fetch EPG data");
    }
    return result.data!;
  },
} as const;

// EPG Query Configuration
export const epgQueries = {
  getEpgData: () => ({
    queryKey: epgQueryKeys.lists(),
    queryFn: epgQueryFunctions.getEpgData,
  }),
} as const;
