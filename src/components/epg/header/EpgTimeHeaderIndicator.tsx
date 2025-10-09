import { type FC, memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { useIsNowPlaying } from "@/hooks/useIsNowPlaying";

import Body from "@/components/typography/body/Body";

import dayjs from "@/constants/dayjs/dayjs";
import { formatTime } from "@/utils/time/formatTime/formatTime";

import type { TimeIntervalConfig } from "@/types/common.types";

interface EpgTimeHeaderIndicatorProps extends TimeIntervalConfig {
  width: number;
}

/**
 * Individual hour indicator in time header
 * @param time - Hour time
 * @param left - Left position in pixels
 * @param width - Width in pixels
 */
const EpgTimeHeaderIndicator: FC<EpgTimeHeaderIndicatorProps> = ({
  time,
  left,
  width,
}) => {
  const isNowPlaying = useIsNowPlaying({
    start: time.getTime(),
    end: dayjs(time).add(1, "hour").toDate().getTime(),
  });

  const containerClassName = useMemo(() => {
    return twMerge(
      "absolute top-0 h-full w-full flex items-center justify-center border-r border-border-secondary",
      isNowPlaying && "bg-bg-tertiary"
    );
  }, [isNowPlaying]);

  const timeFormatted = useMemo(() => {
    return formatTime(time);
  }, [time]);

  return (
    <div
      className={containerClassName}
      style={{
        left: left,
        width: width,
      }}
    >
      <Body weight="semibold" size="xs" className="text-text-secondary">
        {timeFormatted}
      </Body>
    </div>
  );
};

export default memo(EpgTimeHeaderIndicator);
