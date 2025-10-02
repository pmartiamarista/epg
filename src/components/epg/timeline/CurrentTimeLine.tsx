import React from "react";
import { twMerge } from "tailwind-merge";

import useCurrentTime from "@/hooks/useCurrentTime";

import dayjs from "@/constants/dayjs/dayjs";

import type {
  ChannelColumnWidth,
  GlobalEarliestStart,
  HourWidth,
} from "@/types/common.types";

interface CurrentTimeLineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    GlobalEarliestStart,
    HourWidth,
    ChannelColumnWidth {}

const CurrentTimeLine: React.FC<CurrentTimeLineProps> = ({
  globalEarliestStart,
  hourWidth,
  channelColumnWidth,
  ...props
}) => {
  const currentTime = useCurrentTime();

  const startTime = dayjs(globalEarliestStart);
  const hoursFromStart = currentTime.diff(startTime, "hour", true);
  const leftPosition = channelColumnWidth + hoursFromStart * hourWidth;

  const currentClassName = twMerge(
    "absolute top-0 bottom-0 w-0.5 bg-warning pointer-events-none",
    props.className
  );

  return (
    <div
      className={currentClassName}
      {...props}
      style={{
        left: `${leftPosition}px`,
      }}
    />
  );
};

export default CurrentTimeLine;
