import dayjs from "@/constants/dayjs/dayjs";

import type { TimeIntervalConfig } from "@/types/common.types";
import type { ProgramSchedule } from "@/types/egp.types";

/**
 * Calculates which hour intervals should be visible in the EPG header based on scroll position
 *
 * This function determines which hour markers should be rendered in the timeline header
 * based on the currently visible viewport area. It includes padding to ensure smooth
 * horizontal scrolling and only renders hour intervals that are within or near the
 * visible range for optimal performance.
 *
 * @param globalEarliestStart - Unix timestamp of the earliest program start time (used as reference point)
 * @param globalLatestEnd - Unix timestamp of the latest program end time
 * @param hourWidth - Width in pixels for each hour in the timeline
 * @param visibleRange - Object containing the current visible scroll range
 * @param visibleRange.start - Left scroll position in pixels
 * @param visibleRange.end - Right scroll position in pixels
 *
 * @returns Array of hour interval objects with time and left position for header rendering
 *
 * @example
 * ```typescript
 * const visibleHours = calculateVisibleHours(
 *   1640995200000, // 2024-01-01 08:00:00 (earliest program)
 *   1641074400000, // 2024-01-01 22:00:00 (latest program)
 *   240, // 240px per hour
 *   { start: 1000, end: 3400 } // Currently visible area (4-14 hours)
 * );
 * // Returns: [{ time: "08:00", left: 0 }, { time: "09:00", left: 240 }, ...]
 * ```
 */
export const calculateVisibleHours = (
  globalEarliestStart: number,
  globalLatestEnd: number,
  hourWidth: number,
  visibleRange: Pick<ProgramSchedule, "start" | "end">
): TimeIntervalConfig[] => {
  // Start from the beginning of the day (00:00) instead of global earliest start
  const startTime = dayjs(globalEarliestStart).startOf("hour");
  const endTime = dayjs(globalLatestEnd);
  const totalHours = endTime.diff(startTime, "hour", true);

  const { start: visibleStart, end: visibleEnd } = visibleRange;

  const padding = hourWidth;
  const startIndex = Math.max(
    0,
    Math.floor((visibleStart - padding) / hourWidth)
  );
  const endIndex = Math.ceil((visibleEnd + padding) / hourWidth);

  // Generate MORE hours to cover a full range - not just visible area
  const maxHours = Math.max(24, Math.ceil(totalHours)); // At least 24 hours
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
