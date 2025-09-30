import dayjs from "dayjs";

import type { EpgChannel } from "@/types/egp.types";

/**
 * Fixes overnight program schedules that span across midnight
 *
 * Some EPG data may have programs that start before midnight and end after midnight,
 * but the end time might be incorrectly represented as being before the start time.
 * This function detects such cases and adds one day to the end time to correct
 * the schedule representation.
 *
 * @param channels - Array of EPG channels with their program schedules
 *
 * @returns Array of channels with corrected overnight schedules
 *
 * @example
 * ```typescript
 * const correctedChannels = fixOvernightSchedules([
 *   {
 *     id: "channel1",
 *     title: "Channel 1",
 *     schedules: [
 *       {
 *         id: "program1",
 *         title: "Late Night Show",
 *         start: 1640995200000, // 2022-01-01 00:00:00
 *         end: 1640998800000    // 2022-01-01 01:00:00 (but should be next day)
 *       }
 *     ]
 *   }
 * ]);
 * // Returns: Channels with corrected end times for overnight programs
 * ```
 */
export const fixOvernightSchedules = (channels: EpgChannel[]): EpgChannel[] => {
  return channels.map(channel => {
    const correctedSchedules = channel.schedules.map(program => {
      let endDateTime = dayjs.utc(program.end);
      const startDateTime = dayjs.utc(program.start);

      if (endDateTime.isBefore(startDateTime)) {
        endDateTime = endDateTime.add(1, "day");
      }

      return {
        ...program,
        start: startDateTime.toDate().getTime(),
        end: endDateTime.toDate().getTime(),
      };
    });

    return {
      ...channel,
      schedules: correctedSchedules,
    };
  });
};
