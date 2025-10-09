import { useMemo } from "react";

import dayjs from "@/constants/dayjs/dayjs";

import useCurrentTime from "./useCurrentTime";

import type { ProgramSchedule } from "@/types/egp.types";

type UseIsNowPlayingOptions = Pick<ProgramSchedule, "start" | "end">;

/**
 * Hook to check if a program is currently playing
 * @param options - Program start and end times
 * @returns Boolean indicating if program is currently airing
 */
export const useIsNowPlaying = (options: UseIsNowPlayingOptions) => {
  const currentTime = useCurrentTime();

  return useMemo(() => {
    const start = dayjs(options.start);
    const end = dayjs(options.end);

    return !currentTime.isBefore(start) && currentTime.isBefore(end);
  }, [currentTime, options.start, options.end]);
};
