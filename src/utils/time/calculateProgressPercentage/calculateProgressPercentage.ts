import { differenceInMilliseconds, isAfter, isBefore, isValid } from "date-fns";

import type { ProgramSchedule } from "@/types/egp.types";

/**
 * Progress percentage calculation parameters
 */
interface CalculateProgressPercentageParams
  extends Pick<ProgramSchedule, "start" | "end"> {
  /** Current time (optional, defaults to new Date()) */
  currentTime?: Date;
}

/**
 * Calculates the progress percentage of a program based on current time using date-fns
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
  currentTime = new Date(),
}: CalculateProgressPercentageParams): number => {
  if (typeof start !== "number" || typeof end !== "number") {
    return 0;
  }

  if (start >= end) {
    return 0;
  }

  const programStart = new Date(start);
  const programEnd = new Date(end);

  if (!isValid(programStart) || !isValid(programEnd)) {
    return 0;
  }

  if (isBefore(currentTime, programStart)) {
    return 0;
  }

  if (isAfter(currentTime, programEnd)) {
    return 100;
  }

  const totalDuration = differenceInMilliseconds(programEnd, programStart);
  const elapsed = differenceInMilliseconds(currentTime, programStart);

  if (totalDuration <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
};
