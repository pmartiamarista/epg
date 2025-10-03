import { type FC, useMemo } from "react";

import useCurrentTime from "@/hooks/useCurrentTime";

import { calculateCurrentTimePosition } from "@/utils/calculateCurrentTimePosition/calculateCurrentTimePosition";

import type { GlobalEarliestStart, HourWidth } from "@/types/common.types";

interface CurrentTimeIndicatorProps extends GlobalEarliestStart, HourWidth {}

/**
 * Current Time Indicator Component
 *
 * Renders a small yellow indicator that shows the exact position of the current time
 * within the EPG timeline. Updates every 30 seconds based on the time store.
 * Positioned absolutely at the bottom of the time header.
 */
const CurrentTimeIndicator: FC<CurrentTimeIndicatorProps> = ({
  globalEarliestStart,
  hourWidth,
}) => {
  const currentTime = useCurrentTime();

  const position = useMemo(() => {
    return calculateCurrentTimePosition({
      globalEarliestStart,
      hourWidth,
      currentTime,
    });
  }, [globalEarliestStart, hourWidth, currentTime]);

  return (
    <div
      className="absolute w-1 h-1 bg-accent-yellow z-40 pointer-events-none animate-pulse"
      style={{
        bottom: "0",
        left: position,
      }}
    />
  );
};

export default CurrentTimeIndicator;
