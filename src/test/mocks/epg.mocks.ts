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
 *
 * @param count - Number of mock programs to create
 * @returns Array of mock ProgramSchedule objects with sequential test data
 */
export const createMockSchedules = (count: number = 2): ProgramSchedule[] => {
  return Array.from({ length: count }, (_, i) =>
    createMockProgram({
      id: `program-${i + 1}`,
      title: `Test Program ${i + 1}`,
      start: 1609459200000 + i * 3600000,
      end: 1609462800000 + i * 3600000,
    })
  );
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
