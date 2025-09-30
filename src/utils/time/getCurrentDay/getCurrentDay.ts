import dayjs from "dayjs";

import type {
  ChannelColumnWidth,
  GlobalEarliestStart,
  HourWidth,
} from "@/types/common.types";

/**
 * Configuration parameters for calculating the current day based on scroll position
 */
interface GetCurrentDayConfig
  extends GlobalEarliestStart,
    ChannelColumnWidth,
    HourWidth {
  /** Current horizontal scroll position in pixels */
  scrollLeft: number;
}

/**
 * Calculates which day is currently visible in the EPG timeline based on scroll position
 *
 * This function determines which day should be displayed in the day header based on
 * the current horizontal scroll position. It accounts for the channel column width
 * and calculates the day index from the scroll offset.
 *
 * @param config - Configuration object containing timeline parameters
 * @param config.globalEarliestStart - Unix timestamp of the earliest program start time
 * @param config.scrollLeft - Current horizontal scroll position in pixels
 * @param config.channelColumnWidth - Width in pixels for the channel column
 * @param config.hourWidth - Width in pixels for each hour in the timeline
 *
 * @returns Unix timestamp representing the current day
 *
 * @example
 * ```typescript
 * const currentDay = getCurrentDay({
 *   globalEarliestStart: 1640995200000, // 2022-01-01 00:00:00
 *   scrollLeft: 2400, // Scrolled 24 hours worth
 *   channelColumnWidth: 200,
 *   hourWidth: 100
 * });
 * // Returns: 1641081600000 (2022-01-02 00:00:00)
 * ```
 */
export const getCurrentDay = ({
  globalEarliestStart,
  scrollLeft,
  channelColumnWidth,
  hourWidth,
}: GetCurrentDayConfig): number => {
  const startTime = dayjs(globalEarliestStart);
  const startDay = startTime.startOf("day");

  const currentDayIndex = Math.max(
    0,
    Math.floor((scrollLeft - channelColumnWidth) / (hourWidth * 24))
  );
  const currentDay = startDay.add(currentDayIndex, "day");

  return currentDay.valueOf();
};
