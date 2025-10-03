import { type FC, useMemo } from "react";

import useCurrentTime from "@/hooks/useCurrentTime";

import { calculateProgressPercentage } from "@/utils/calculateProgressPercentage/calculateProgressPercentage";

import type { EpgGridCell } from "@/types/egp.types";

type EpgChannelTimelineTileProgressBarProps = Pick<EpgGridCell, "program">;

/**
 * Progress Bar Component for EPG Channel Timeline Tiles
 *
 * Displays a thin yellow progress bar at the bottom of a program tile showing
 * the percentage of the program that has elapsed. Updates every 30 seconds
 * based on the time store. Only visible for currently airing programs.
 */
const EpgChannelTimelineTileProgressBar: FC<
  EpgChannelTimelineTileProgressBarProps
> = ({ program }) => {
  const currentTime = useCurrentTime();

  const progress = useMemo(() => {
    return calculateProgressPercentage({
      start: program.start,
      end: program.end,
      currentTime,
    });
  }, [program.start, program.end, currentTime]);

  return (
    <div className="w-full h-0.5 overflow-hidden">
      <div
        className="h-full bg-accent-yellow transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default EpgChannelTimelineTileProgressBar;
