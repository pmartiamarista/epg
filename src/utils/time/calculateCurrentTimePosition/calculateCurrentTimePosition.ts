import type { Dayjs } from "dayjs";

import dayjs from "@/constants/dayjs/dayjs";

import type { GlobalEarliestStart, HourWidth } from "@/types/common.types";

/**
 * Current time position calculation parameters
 */
interface CalculateCurrentTimePositionParams
  extends GlobalEarliestStart,
    HourWidth {
  /** Current time (optional, defaults to dayjs()) */
  currentTime?: Dayjs;
}

/**
 * Calculates the horizontal pixel position of the current time within a timeline
 *
 * This function determines where the current time falls horizontally within the EPG
 * timeline based on the global timeline start time and the configured hour width.
 * Used by both the progress bar and current time indicator components.
 *
 * @param params - Configuration object containing timeline parameters
 * @param params.globalEarliestStart - Unix timestamp of the earliest program start time
 * @param params.hourWidth - Width in pixels for each hour in the timeline
 *
 * @returns The horizontal pixel position of the current time (defaults to 0 if current time is before timeline start)
 *
 * @example
 * ```typescript
 * // For progress bar
 * const progressPosition = calculateCurrentTimePosition({
 *   globalEarliestStart: 1640995200000,
 *   hourWidth: 120
 * });
 *
 * // For time indicator
 * const indicatorPosition = calculateCurrentTimePosition({
 *   globalEarliestStart: 1640995200000,
 *   hourWidth: 120
 * });
 * ```
 */
export const calculateCurrentTimePosition = ({
  globalEarliestStart,
  hourWidth,
  currentTime = dayjs(),
}: CalculateCurrentTimePositionParams): number => {
  const timelineStart = dayjs(globalEarliestStart);

  // If current time is before timeline start, return 0
  if (currentTime.isBefore(timelineStart)) {
    return 0;
  }

  const elapsedMinutes = currentTime.diff(timelineStart, "minute");
  return (elapsedMinutes / 60) * hourWidth;
};
