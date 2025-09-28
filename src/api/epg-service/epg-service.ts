import { apiClientInstance } from "@/api/api-client/api-client";

import type { ApiResponse } from "@/types/api.types";
import type { EpgResponse } from "@/types/egp.types";

/**
 * EPG Service Class
 * Handles EPG API calls
 */
export class EpgService {
  private readonly basePath = "/epg";

  /**
   * Get EPG data for all channels
   * @returns Promise<ApiResponse<EpgResponse>> - API response with data or error
   */
  async getEpgData(): Promise<ApiResponse<EpgResponse>> {
    return await apiClientInstance.get<EpgResponse>(this.basePath);
  }
}

// Export a singleton instance
export const epgService = new EpgService();
