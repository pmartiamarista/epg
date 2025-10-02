import type {
  GlobalEarliestStart,
  GlobalLatestEnd,
} from "@/types/common.types";
import type { EpgChannel } from "@/types/egp.types";

type GlobalTimeRange = GlobalEarliestStart & GlobalLatestEnd;

/**
 * Calculates the global time range for an entire EPG
 *
 * This function determines the earliest start time and latest end time across all
 * programs in all channels. This is used to establish the total time range that
 * the EPG timeline needs to cover.
 *
 * @param channels - Array of EPG channels, each with their program schedules
 *
 * @returns Object containing the global earliest start and latest end timestamps
 *
 * @example
 * ```typescript
 * const timeRange = calculateGlobalTimeRange(channels);
 * // Returns: { globalEarliestStart: 1640995200000, globallyLatestEnd: 1641081600000 }
 *
 * // For timeline width calculation:
 * const timelineWidth = calculateTimelineWidth({
 *   globalEarliestStart: timeRange.globalEarliestStart,
 *   globallyLatestEnd: timeRange.globallyLatestEnd,
 *   hourWidth: 120,
 *   channelColumnWidth: 96
 * });
 * ```
 */
export const calculateGlobalTimeRange = (
  channels: EpgChannel[]
): GlobalTimeRange => {
  let earliest = Infinity;
  let latest = -Infinity;

  for (const channel of channels) {
    for (const program of channel.schedules) {
      const start = program.start;
      const end = program.end;

      earliest = Math.min(earliest, start);
      latest = Math.max(latest, end);
    }
  }

  return {
    globalEarliestStart: earliest,
    globalLatestEnd: latest,
  };
};
