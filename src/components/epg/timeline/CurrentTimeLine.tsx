import React from "react";

import useCurrentTime from "@/hooks/useCurrentTime";

import dayjs from "@/constants/dayjs/dayjs";

import type {
  ChannelColumnWidth,
  GlobalEarliestStart,
  HourWidth,
} from "@/types/common.types";

interface CurrentTimeLineProps
  extends GlobalEarliestStart,
    HourWidth,
    ChannelColumnWidth {}

const CurrentTimeLine: React.FC<CurrentTimeLineProps> = ({
  globalEarliestStart,
  hourWidth,
  channelColumnWidth,
}) => {
  const currentTime = useCurrentTime();

  const startTime = dayjs(globalEarliestStart);
  const hoursFromStart = currentTime.diff(startTime, "hour", true);
  const leftPosition = channelColumnWidth + hoursFromStart * hourWidth;

  return (
    <div
      className="absolute top-0 bottom-0 w-0.5 bg-warning z-50 pointer-events-none"
      style={{
        left: `${leftPosition}px`,
      }}
    />
  );
};

export default CurrentTimeLine;
