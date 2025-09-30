import dayjs from "@/constants/dayjs/dayjs";

/**
 * Supported time and date format patterns
 */
type TimeFormat =
  | "HH:mm" // 24-hour format: 14:30
  | "HH:mm:ss" // 24-hour with seconds: 14:30:45
  | "h:mm A" // 12-hour format: 2:30 PM
  | "h:mm:ss A" // 12-hour with seconds: 2:30:45 PM
  | "H:mm" // 24-hour single digit: 4:30
  | "H:mm:ss" // 24-hour single digit with seconds: 4:30:45
  | "MMM DD, YYYY" // Date format: Jan 15, 2022
  | "DD MMM YYYY" // Date format: 15 Jan 2022
  | "ddd, DD MMM" // Day and date: Mon, 15 Jan
  | "MMMM DD, YYYY"; // Full month: January 15, 2022

/**
 * Formats a date/time value into a human-readable string
 *
 * This utility function provides consistent date and time formatting across the EPG application.
 * It supports various formats for different use cases, from simple time display to full date formats.
 *
 * @param date - The date to format (string, Date, number, or dayjs object)
 * @param format - The format pattern to use (default: 'HH:mm')
 *
 * @returns Formatted time/date string
 *
 * @example
 * ```typescript
 * // Time formatting
 * formatTime(new Date(), "HH:mm");        // "14:30"
 * formatTime(1640995200000, "h:mm A");    // "12:00 AM"
 *
 * // Date formatting
 * formatTime(new Date(), "MMM DD, YYYY"); // "Jan 15, 2022"
 * formatTime(new Date(), "ddd, DD MMM");  // "Mon, 15 Jan"
 * ```
 */
export const formatTime = (
  date: dayjs.ConfigType,
  format: TimeFormat = "HH:mm"
): string => {
  return dayjs(date).format(format);
};

export default formatTime;
