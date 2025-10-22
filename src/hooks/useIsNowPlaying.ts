import { isBefore, isValid } from "date-fns";
import { useMemo } from "react";

import useCurrentTime from "./useCurrentTime";

import type { ProgramSchedule } from "@/types/egp.types";

type UseIsNowPlayingOptions = Pick<ProgramSchedule, "start" | "end">;

/**
 * Hook to check if a program is currently playing using date-fns
 * @param options - Program start and end times
 * @returns Boolean indicating if program is currently airing
 */
export const useIsNowPlaying = (options: UseIsNowPlayingOptions) => {
  const currentTime = useCurrentTime();

  return useMemo(() => {
    const start = new Date(options.start);
    const end = new Date(options.end);

    if (!isValid(start) || !isValid(end)) {
      return false;
    }

    return !isBefore(currentTime, start) && isBefore(currentTime, end);
  }, [currentTime, options.start, options.end]);
};
