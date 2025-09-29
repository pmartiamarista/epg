import dayjs from "@/constants/dayjs/dayjs";

type TimeFormat =
  | "HH:mm"
  | "HH:mm:ss"
  | "h:mm A"
  | "h:mm:ss A"
  | "H:mm"
  | "H:mm:ss";

/**
 * Formats a date to display time in various formats
 * @param date - The date to format (string, Date, or dayjs object)
 * @param format - The format to use (default: 'HH:mm')
 * @returns Formatted time string
 */
export const formatTime = (
  date: string | Date | dayjs.Dayjs,
  format: TimeFormat = "HH:mm"
): string => {
  return dayjs(date).format(format);
};

export default formatTime;
