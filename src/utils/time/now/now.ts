import dayjs from "@/constants/dayjs/dayjs";

/**
 * Returns the current date and time using dayjs
 *
 * This utility function provides a centralized way to get the current moment
 * throughout the EPG application. It ensures consistent time handling and
 * makes it easier to mock or override the current time for testing purposes.
 *
 * @returns dayjs object representing the current moment
 *
 * @example
 * ```typescript
 * // Get current time for comparisons
 * const currentTime = now();
 * const isAfterNow = someDate.isAfter(currentTime);
 *
 * // Use in time calculations
 * const timeRemaining = targetDate.diff(now(), "minute");
 *
 * // Format current time
 * const currentTimeString = now().format("HH:mm");
 * // Returns: "14:30" (current time in 24-hour format)
 *
 * // Use in EPG components
 * const isNowPlaying = isBetweenDates(programStart, programEnd);
 * // Internally uses now() to get current time
 * ```
 */
export const now = (): dayjs.Dayjs => {
  return dayjs.utc();
};

export default now;
