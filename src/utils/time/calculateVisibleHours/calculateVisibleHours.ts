import dayjs from "@/constants/dayjs/dayjs";

import type { StartEndConfig, TimeIntervalConfig } from "@/types/common.types";

/**
 * Calculates which hours should be visible in the EPG timeline based on the current scroll position
 *
 * This function determines which hour intervals should be rendered in the timeline header
 * based on the visible viewport area. It includes padding to ensure smooth scrolling
 * and rounds up to hour boundaries for consistent display.
 *
 * @param globalEarliestStart - Unix timestamp of the earliest program start time
 * @param globalLatestEnd - Unix timestamp of the latest program end time
 * @param hourWidth - Width in pixels for each hour in the timeline
 * @param visibleRange - Object containing the current visible scroll range
 * @param visibleRange.start - Left scroll position in pixels
 * @param visibleRange.end - Right scroll position in pixels
 *
 * @returns Array of time intervals with their positions for rendering
 *
 * @example
 * ```typescript
 * const visibleHours = calculateVisibleHours(
 *   1640995200000, // 2022-01-01 00:00:00
 *   1641081600000, // 2022-01-02 00:00:00
 *   100, // 100px per hour
 *   { start: 500, end: 1500 } // Visible area
 * );
 * // Returns: Array of hour intervals with time and left position
 * ```
 */
export const calculateVisibleHours = (
  globalEarliestStart: number,
  globalLatestEnd: number,
  hourWidth: number,
  visibleRange: StartEndConfig
): TimeIntervalConfig[] => {
  const startTime = dayjs(globalEarliestStart);
  const endTime = dayjs(globalLatestEnd);
  const totalHours = endTime.diff(startTime, "hour", true);

  const { start: visibleStart, end: visibleEnd } = visibleRange;

  const padding = hourWidth;
  const startIndex = Math.max(
    0,
    Math.floor((visibleStart - padding) / hourWidth)
  );
  const endIndex = Math.ceil((visibleEnd + padding) / hourWidth);

  // Round up to the next hour boundary to avoid cut-off appearance
  const maxHours = Math.ceil(totalHours);
  const clampedEndIndex = Math.min(endIndex, maxHours);

  const hoursArray: TimeIntervalConfig[] = [];

  for (let i = startIndex; i < clampedEndIndex; i++) {
    const hourTime = startTime.add(i, "hour").toDate();
    hoursArray.push({
      time: hourTime,
      left: i * hourWidth,
    });
  }

  return hoursArray;
};
