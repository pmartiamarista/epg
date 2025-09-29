import dayjs from "@/constants/dayjs/dayjs";

import { now } from "../now/now";

/**
 * Checks if a given date is today
 * @param date - The date to check (string, Date, or dayjs object)
 * @returns boolean indicating if the date is today
 */
export const isToday = (date: string | Date | dayjs.Dayjs): boolean => {
  const currentTime = now();
  const targetDate = dayjs(date);

  return currentTime.isSame(targetDate, "day");
};

export default isToday;
