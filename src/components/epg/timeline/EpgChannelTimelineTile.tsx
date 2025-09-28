import React, { type FC, memo } from "react";
import { twMerge } from "tailwind-merge";

import Card from "../../card/Card";

import type { EpgGridCell } from "@/types/egp.types";

interface EpgChannelTimelineTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<EpgGridCell, "program"> {
  isPlaying: boolean;
  minutesLeft: number;
  progressPercentage: number;
}

const EpgChannelTimelineTile: FC<EpgChannelTimelineTileProps> = ({
  program,
  style,
  className,
  isPlaying,
  minutesLeft,
  progressPercentage,
  ...props
}) => {
  const currentClassName = twMerge(
    "absolute top-1 h-[calc(100%-8px)] flex items-center rounded-lg px-3 transition-all duration-200 group",
    "cursor-pointer",
    isPlaying
      ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg scale-105 z-10"
      : "bg-gray-700 hover:bg-gray-600",
    className
  );

  return (
    <Card style={style} className={currentClassName} {...props}>
      <p className="text-white text-sm font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
        {program.title}
      </p>
      {isPlaying && (
        <>
          <div className="absolute bottom-1 right-3 text-white/80 text-[10px] font-medium">
            {minutesLeft} min left
          </div>
          <div
            className="absolute bottom-0 left-0 h-1 bg-pink-500 rounded-bl-lg"
            style={{ width: `${progressPercentage}%` }}
          />
        </>
      )}
    </Card>
  );
};

export default memo(EpgChannelTimelineTile);
