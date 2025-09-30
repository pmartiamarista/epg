import dayjs from "@/constants/dayjs/dayjs";

import type {
  ChannelColumnWidth,
  GlobalEarliestStart,
  GlobalLatestEnd,
  HourWidth,
} from "@/types/common.types";

/**
 * Parameters for calculating timeline width
 */
interface CalculateTimelineWidthParams
  extends GlobalEarliestStart,
    GlobalLatestEnd,
    HourWidth,
    ChannelColumnWidth {
  /** Minimum width in pixels (default: 400) */
  minWidth?: number;
}

/**
 * Calculates the total width needed for the EPG timeline
 *
 * This function determines the appropriate width for the timeline based on the
 * time range between the earliest and latest program times. It rounds up to the
 * next hour boundary to ensure a clean, non-cut-off appearance.
 *
 * @param params - Configuration object containing timeline parameters
 * @param params.globalEarliestStart - Unix timestamp of the earliest program start time
 * @param params.globalLatestEnd - Unix timestamp of the latest program end time
 * @param params.hourWidth - Width in pixels for each hour in the timeline
 * @param params.channelColumnWidth - Width in pixels for the channel column
 * @param params.minWidth - Minimum width in pixels (default: 400)
 *
 * @returns The calculated timeline width in pixels
 *
 * @example
 * ```typescript
 * const width = calculateTimelineWidth({
 *   globalEarliestStart: 1640995200000, // 2022-01-01 00:00:00
 *   globalLatestEnd: 1641081600000,     // 2022-01-02 00:00:00
 *   hourWidth: 100,
 *   channelColumnWidth: 200,
 *   minWidth: 400
 * });
 * // Returns: 1200 (24 hours * 100px + 200px channel column)
 * ```
 */
export const calculateTimelineWidth = ({
  globalEarliestStart,
  globalLatestEnd,
  hourWidth,
  channelColumnWidth,
  minWidth = 400,
}: CalculateTimelineWidthParams): number => {
  const startTime = dayjs(globalEarliestStart);
  const endTime = dayjs(globalLatestEnd);
  const totalHours = endTime.diff(startTime, "hour", true);

  // Round up to the next hour boundary to avoid cut-off appearance
  const roundedHours = Math.ceil(totalHours);

  return Math.max(roundedHours * hourWidth + channelColumnWidth, minWidth);
};
