import type { Dayjs } from "dayjs";

import dayjs from "@/constants/dayjs/dayjs";
/**
 * Progress percentage calculation parameters
 */
interface CalculateProgressPercentageParams {
  /** Program start time (Unix timestamp in milliseconds) */
  start: number;
  /** Program end time (Unix timestamp in milliseconds) */
  end: number;
  /** Current time (optional, defaults to dayjs()) */
  currentTime?: Dayjs;
}

/**
 * Calculates the progress percentage of a program based on current time
 *
 * This function determines what percentage of a program has elapsed since
 * its start time. Returns 0% if program hasn't started, 100% if program
 * has ended, and a percentage between 0-100 for programs currently airing.
 *
 * @param params - Configuration object containing program time parameters
 * @param params.start - Unix timestamp of the program start time
 * @param params.end - Unix timestamp of the program end time
 *
 * @returns The progress percentage (0-100) of the program
 *
 * @example
 * ```typescript
 * // For a program that started 30 minutes ago and runs for 60 minutes
 * const progress = calculateProgressPercentage({
 *   start: 1640995200000, // Started 30 minutes ago
 *   end: 1640998800000     // Ends in 30 minutes
 * });
 * // Returns: 50 (the program is 50% complete)
 *
 * // For a program in the future
 * const futureProgress = calculateProgressPercentage({
 *   start: 1640996000000, // Starts in 10 minutes
 *   end: 1640999600000    // Ends in 70 minutes
 * });
 * // Returns: 0 (program hasn't started yet)
 * ```
 */
export const calculateProgressPercentage = ({
  start,
  end,
  currentTime = dayjs(),
}: CalculateProgressPercentageParams): number => {
  const programStart = dayjs(start);
  const programEnd = dayjs(end);

  // If current time is before program start, return 0%
  if (currentTime.isBefore(programStart)) {
    return 0;
  }

  // If current time is after program end, return 100%
  if (currentTime.isAfter(programEnd)) {
    return 100;
  }

  // Calculate progress percentage within the program
  const totalDuration = programEnd.diff(programStart);
  const elapsed = currentTime.diff(programStart);

  return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
};
