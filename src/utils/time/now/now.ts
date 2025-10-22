/**
 * Returns the current date and time using date-fns
 *
 * This utility function provides a centralized way to get the current moment
 * throughout the EPG application. It ensures consistent time handling and
 * makes it easier to mock or override the current time for testing purposes.
 *
 * @returns Date object representing the current moment
 *
 * @example
 * ```typescript
 * // Get current time for comparisons
 * const currentTime = now();
 * const isAfterNow = someDate > currentTime;
 *
 * // Use in time calculations
 * const timeRemaining = differenceInMinutes(targetDate, now());
 *
 * // Format current time
 * const currentTimeString = format(now(), "HH:mm");
 * // Returns: "14:30" (current time in 24-hour format)
 *
 * // Use in EPG components
 * const isNowPlaying = isBetweenDates(programStart, programEnd);
 * // Internally uses now() to get current time
 * ```
 */
export const now = (): Date => {
  return new Date();
};

export default now;
