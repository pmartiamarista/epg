import dayjs from "@/constants/dayjs/dayjs";

import { now } from "../now/now";

/**
 * Checks if a given date is today
 *
 * This utility function determines whether a specific date falls on the current day.
 * It's useful for highlighting today's programs or applying special styling to
 * current day entries in the EPG.
 *
 * @param date - The date to check (string, Date, or dayjs object)
 *
 * @returns Boolean indicating if the date is today
 *
 * @example
 * ```typescript
 * // Check if a program is scheduled for today
 * const isTodayProgram = isToday("2022-01-15 20:00:00");
 * // Returns: true if today is January 15, 2022
 *
 * // Check if a date object is today
 * const programDate = new Date("2022-01-15");
 * const isTodayDate = isToday(programDate);
 * // Returns: true if today is January 15, 2022
 *
 * // Use with program schedules
 * const program = { start: "2022-01-15 20:00:00", title: "Evening News" };
 * const isTodayShow = isToday(program.start);
 * // Returns: true if the program is scheduled for today
 * ```
 */
export const isToday = (date: dayjs.ConfigType): boolean => {
  const currentTime = now();
  const targetDate = dayjs(date);

  return currentTime.isSame(targetDate, "day");
};

export default isToday;
