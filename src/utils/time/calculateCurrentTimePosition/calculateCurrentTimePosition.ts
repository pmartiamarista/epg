import { differenceInMinutes, isValid } from "date-fns";

import type { GlobalEarliestStart, HourWidth } from "@/types/common.types";

/**
 * Current time position calculation parameters
 */
interface CalculateCurrentTimePositionParams
  extends GlobalEarliestStart,
    HourWidth {
  /** Current time (optional, defaults to new Date()) */
  currentTime?: Date;
}

/**
 * Calculates the horizontal pixel position of the current time within a timeline using date-fns
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
  currentTime = new Date(),
}: CalculateCurrentTimePositionParams): number => {
  if (
    typeof globalEarliestStart !== "number" ||
    typeof hourWidth !== "number"
  ) {
    return 0;
  }

  if (hourWidth <= 0) {
    return 0;
  }

  const timelineStart = new Date(globalEarliestStart);

  if (!isValid(timelineStart)) {
    return 0;
  }

  if (currentTime < timelineStart) {
    return 0;
  }

  const elapsedMinutes = differenceInMinutes(currentTime, timelineStart);

  if (elapsedMinutes < 0) {
    return 0;
  }

  return (elapsedMinutes / 60) * hourWidth;
};
