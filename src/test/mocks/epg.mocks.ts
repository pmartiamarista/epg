import { addHours } from "date-fns";

import type { EpgChannel, ProgramSchedule } from "@/types/egp.types";

/**
 * Creates a mock program schedule for testing
 *
 * @param overrides - Partial program properties to override defaults
 * @returns Mock ProgramSchedule with test data
 */
export const createMockProgram = (
  overrides?: Partial<ProgramSchedule>
): ProgramSchedule => ({
  id: "program-1",
  title: "Test Program",
  start: Date.now(),
  end: Date.now() + 3600000,
  ...overrides,
});

/**
 * Creates an array of mock program schedules for testing
 * Generates schedules spanning 48 hours before and after current time
 *
 * @param count - Number of mock programs to create (default: 48 programs = 48 hours)
 * @returns Array of mock ProgramSchedule objects with sequential test data
 */
export const createMockSchedules = (count: number = 48): ProgramSchedule[] => {
  const now = new Date();
  const startTime = addHours(now, -24); // Start 24 hours ago

  return Array.from({ length: count }, (_, i) => {
    const programStart = addHours(startTime, i);
    const programEnd = addHours(programStart, 1); // Each program is 1 hour long

    return createMockProgram({
      id: `program-${i + 1}`,
      title: `Test Program ${i + 1}`,
      start: programStart.getTime(),
      end: programEnd.getTime(),
    });
  });
};

/**
 * Creates a mock EPG channel for testing
 *
 * @param overrides - Partial channel properties to override defaults
 * @returns Mock EpgChannel with test data and empty schedules
 */
export const createMockChannel = (
  overrides?: Partial<EpgChannel>
): EpgChannel => ({
  id: "channel-1",
  title: "Test Channel",
  images: {
    LOGO: "https://example.com/logo.jpg",
  },
  schedules: createMockSchedules(0),
  ...overrides,
});
