import dayjs from "@/constants/dayjs/dayjs";

type DurationUnit = "minute" | "second";

/**
 * Calculates the duration between two dates in the specified unit
 * @param startDate - The start date (string, Date, or dayjs object)
 * @param endDate - The end date (string, Date, or dayjs object)
 * @param unit - The unit to return ('minute' or 'second')
 * @returns Duration in the specified unit
 */
export const getDuration = (
  startDate: string | Date | dayjs.Dayjs,
  endDate: string | Date | dayjs.Dayjs,
  unit: DurationUnit = "minute"
): number => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  return end.diff(start, unit);
};

export default getDuration;
