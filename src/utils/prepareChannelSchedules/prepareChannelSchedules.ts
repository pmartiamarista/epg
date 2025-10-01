import dayjs from "dayjs";

import { generateUniqueId } from "@/utils/generateUniqueId/generateUniqueId";

import type { EpgChannel } from "@/types/egp.types";

/**
 * Prepares channel schedules by fixing overnight programs and generating unique IDs
 *
 * This function processes EPG channel data to:
 * 1. Fix overnight program schedules that span across midnight by adding one day to end times
 * 2. Generate unique IDs for programs (backend data may have dummy IDs)
 * 3. Convert timestamps to milliseconds for consistent handling
 *
 * @param channels - Array of EPG channels with their program schedules
 *
 * @returns Array of channels with prepared and corrected schedules
 *
 * @example
 * ```typescript
 * const preparedChannels = prepareChannelSchedules([
 *   {
 *     id: "channel1",
 *     title: "Channel 1",
 *     schedules: [
 *       {
 *         id: "dummy-id",
 *         title: "Late Night Show",
 *         start: 1640995200000, // 2022-01-01 00:00:00
 *         end: 1640998800000    // 2022-01-01 01:00:00 (but should be next day)
 *       }
 *     ]
 *   }
 * ]);
 * // Returns: Channels with corrected end times and unique IDs
 * ```
 */
export const prepareChannelSchedules = (
  channels: EpgChannel[]
): EpgChannel[] => {
  return channels.map(channel => {
    const correctedSchedules = channel.schedules.map(program => {
      let endDateTime = dayjs.utc(program.end);
      const startDateTime = dayjs.utc(program.start);

      if (endDateTime.isBefore(startDateTime)) {
        endDateTime = endDateTime.add(1, "day");
      }

      return {
        ...program,
        // Add a unique id to the program, backend data has dummy ids
        id: generateUniqueId(),
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
