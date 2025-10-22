import { format, isValid, parseISO } from "date-fns";

/**
 * Supported time and date format patterns for date-fns
 */
type TimeFormat =
  | "HH:mm" // 24-hour format: 14:30
  | "HH:mm:ss" // 24-hour with seconds: 14:30:45
  | "h:mm a" // 12-hour format: 2:30 PM
  | "h:mm:ss a" // 12-hour with seconds: 2:30:45 PM
  | "H:mm" // 24-hour single digit: 4:30
  | "H:mm:ss" // 24-hour single digit with seconds: 4:30:45
  | "MMM dd, yyyy" // Date format: Jan 15, 2022
  | "dd MMM yyyy" // Date format: 15 Jan 2022
  | "EEE, dd MMM" // Day and date: Mon, 15 Jan
  | "MMMM dd, yyyy"; // Full month: January 15, 2022

/**
 * Formats a date/time value into a human-readable string using date-fns
 *
 * This utility function provides consistent date and time formatting across the EPG application.
 * It supports various formats for different use cases, from simple time display to full date formats.
 *
 * @param date - The date to format (string, Date, or number)
 * @param formatPattern - The format pattern to use (default: 'HH:mm')
 *
 * @returns Formatted time/date string
 *
 * @example
 * ```typescript
 * // Time formatting
 * formatTime(new Date(), "HH:mm");        // "14:30"
 * formatTime(1640995200000, "h:mm a");     // "12:00 AM"
 *
 * // Date formatting
 * formatTime(new Date(), "MMM dd, yyyy"); // "Jan 15, 2022"
 * formatTime(new Date(), "EEE, dd MMM");  // "Mon, 15 Jan"
 * ```
 */
export const formatTime = (
  date: string | Date | number,
  formatPattern: TimeFormat = "HH:mm"
): string => {
  let parsedDate: Date;

  if (typeof date === "string") {
    parsedDate = parseISO(date);
  } else if (typeof date === "number") {
    parsedDate = new Date(date);
  } else {
    parsedDate = date;
  }

  if (!isValid(parsedDate)) {
    return "";
  }

  return format(parsedDate, formatPattern);
};

export default formatTime;
