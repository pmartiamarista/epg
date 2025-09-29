import dayjs from "@/constants/dayjs/dayjs";

import { now } from "../now/now";

/**
 * Calculates the remaining time until a target date and returns a human-readable string
 * @param targetDate - The target date (string, Date, or dayjs object)
 * @returns Formatted string indicating remaining time (e.g., "15 minutes remaining", "1 minute remaining", "0 minutes remaining")
 */
export const getTimeRemaining = (
  targetDate: string | Date | dayjs.Dayjs
): string => {
  const currentTime = now();
  const endTime = dayjs(targetDate);

  // Calculate the difference in minutes
  const remainingMinutes = endTime.diff(currentTime, "minute");

  // Prevent negative values
  const safeMinutes = Math.max(0, remainingMinutes);

  // Return formatted string with proper pluralization
  return safeMinutes !== 1
    ? `${safeMinutes} mins remaining`
    : "1 min remaining";
};

export default getTimeRemaining;
