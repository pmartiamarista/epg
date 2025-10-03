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
 * Calculates the exact timeline width needed for the EPG based on program times
 *
 * This function determines the precise width for the timelines based on the actual
 * program time range. It rounds start times down to hour boundaries and end times
 * up to hour boundaries to ensure complete coverage of all programs while avoiding
 * unnecessary empty space at the end.
 *
 * @param params - Configuration object containing timeline parameters
 * @param params.globalEarliestStart - Unix timestamp of the earliest program start time
 * @param params.globalLatestEnd - Unix timestamp of the latest program end time
 * @param params.hourWidth - Width in pixels for each hour in the timeline
 * @param params.channelColumnWidth - Width in pixels for the channel column
 * @param params.minWidth - Minimum width in pixels (default: 400)
 *
 * @returns The calculated timeline width in pixels (includes channel column width)
 *
 * @example
 * ```typescript
 * // Programs from 08:15 to 22:45
 * const width = calculateTimelineWidth({
 *   globalEarliestStart: 1640995200000, // 2022-01-01 08:15:00
 *   globalLatestEnd: 1641071100000,     // 2022-01-01 22:45:00
 *   hourWidth: 240,
 *   channelColumnWidth: 200,
 *   minWidth: 1200
 * });
 * // Returns: 3680 (15 hours * 240px + 200px channel column)
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
  const intervalStartTime = startTime.startOf("hour");
  const endTime = dayjs(globalLatestEnd);
  const intervalEndTime = endTime.startOf("hour").add(1, "hour");

  const totalHours = intervalEndTime.diff(intervalStartTime, "hour", true);

  return Math.max(totalHours * hourWidth + channelColumnWidth, minWidth);
};
