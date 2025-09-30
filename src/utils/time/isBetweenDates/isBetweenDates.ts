import dayjs from "@/constants/dayjs/dayjs";

import { now } from "../now/now";

/**
 * Checks if the current time is between a start and end date
 *
 * This function is commonly used to determine if a program is currently airing
 * or if the current time falls within a specific time range. It's useful for
 * highlighting "now playing" programs in the EPG.
 *
 * @param startDate - The start date (string, Date, or dayjs object)
 * @param endDate - The end date (string, Date, or dayjs object)
 *
 * @returns Boolean indicating if the current time is within the interval
 *
 * @example
 * ```typescript
 * // Check if current time is during a program
 * const isAiring = isBetweenDates(
 *   "2022-01-01 20:00:00",
 *   "2022-01-01 21:00:00"
 * );
 * // Returns: true if current time is between 20:00 and 21:00
 *
 * // Check if program is currently playing
 * const programStart = new Date("2022-01-01 20:00:00");
 * const programEnd = new Date("2022-01-01 21:30:00");
 * const isNowPlaying = isBetweenDates(programStart, programEnd);
 * // Returns: true if current time is during the program
 * ```
 */
export const isBetweenDates = (
  startDate: dayjs.ConfigType,
  endDate: dayjs.ConfigType
): boolean => {
  const currentTime = now();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  return currentTime.isAfter(start) && currentTime.isBefore(end);
};

export default isBetweenDates;
