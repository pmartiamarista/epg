import dayjs from "@/constants/dayjs/dayjs";

import { now } from "../now/now";

/**
 * Checks if the current time is between a start and end date
 * @param startDate - The start date (string, Date, or dayjs object)
 * @param endDate - The end date (string, Date, or dayjs object)
 * @returns boolean indicating if the current time is within the interval
 */
export const isBetweenDates = (
  startDate: string | Date | dayjs.Dayjs,
  endDate: string | Date | dayjs.Dayjs
): boolean => {
  const currentTime = now();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  return currentTime.isAfter(start) && currentTime.isBefore(end);
};

export default isBetweenDates;
