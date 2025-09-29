import dayjs from "@/constants/dayjs/dayjs";

/**
 * Returns the current date and time using dayjs
 * @returns dayjs object representing the current moment
 */
export const now = (): dayjs.Dayjs => {
  return dayjs();
};

export default now;
