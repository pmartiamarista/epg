import dayjs from "dayjs";

import { generateUniqueId } from "@/utils/generateUniqueId/generateUniqueId";

import type { EpgChannel } from "@/types/egp.types";

/**
 * Prepares channel schedules by fixing overnight programs and generating unique IDs
 *
 * This function processes raw EPG channel data to ensure program schedules are
 * properly formatted and ready for timeline rendering. It handles overnight
 * programs that span midnight and ensures consistent timestamp format.
 *
 * Key transformations:
 * 1. Fixes overnight programs by adding one day to end times when end < start
 * 2. Generates unique IDs for programs (replaces backend dummy IDs)
 * 3. Ensures timestamps are in Unix milliseconds format for consistency
 * 4. Maintains original program data structure while cleaning up edge cases
 *
 * @param channels - Array of EPG channels with their program schedules
 *
 * @returns Array of channels with prepared and corrected schedules
 *
 * @example
 * ```typescript
 * const rawChannels = [{
 *   id: "channel1",
 *   title: "Channel 1",
 *   schedules: [{
 *     id: "dummy-id", // Will be replaced with unique ID
 *     title: "Late Night Show",
 *     start: 1640995200000, // 2024-01-01 00:00:00
 *     end: 1640998800000    // 2024-01-01 01:00:00 (overnight, will be corrected)
 *   }]
 * }];
 *
 * const preparedChannels = prepareChannelSchedules(rawChannels);
 * // Returns: Channels with corrected overnight programs and unique IDs
 * ```
 */
export const prepareChannelSchedules = (
  channels: EpgChannel[]
): EpgChannel[] => {
  return channels.map(channel => {
    const correctedSchedules = channel.schedules.map(program => {
      let endDateTime = dayjs(program.end);
      const startDateTime = dayjs(program.start);

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
