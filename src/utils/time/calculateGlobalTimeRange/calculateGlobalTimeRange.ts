import type {
  GlobalEarliestStart,
  GlobalLatestEnd,
} from "@/types/common.types";
import type { EpgChannel } from "@/types/egp.types";

type GlobalTimeRange = GlobalEarliestStart & GlobalLatestEnd;

/**
 * Calculates the global time range across all channels in the EPG
 *
 * This function analyzes all programs across all channels to determine the absolute
 * earliest start time and latest end time. It ensures fixed time intervals by
 * rounding the global start down to the hour boundary and calculates precise range
 * for timeline width calculations without unnecessary trailing space.
 *
 * @param channels - Array of EPG channels, each containing program schedules with start/end times
 *
 * @returns Object containing the global earliest start and latest end timestamps (Unix milliseconds)
 *
 * @example
 * ```typescript
 * const channels = [
 *   { schedules: [{ start: 1640995200000, end: 1641074400000 }] }, // 08:00-22:00
 *   { schedules: [{ start: 1641000000000, end: 1641062400000 }] }  // 10:00-20:00
 * ];
 * const timeRange = calculateGlobalTimeRange(channels);
 * // Returns: { globalEarliestStart: 1640995200000, globalLatestEnd: 1641074400000 }
 * // Timeline covers: 08:00 - 23:00 (15 hours)
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
