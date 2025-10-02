import { type FC, memo, useMemo } from "react";

import Body from "@/components/typography/body/Body";

import { formatTime } from "@/utils/time/formatTime/formatTime";

import type { TimeIntervalConfig } from "@/types/common.types";

interface EpgTimeHeaderIndicatorProps extends TimeIntervalConfig {
  width: number;
}

const EpgTimeHeaderIndicator: FC<EpgTimeHeaderIndicatorProps> = ({
  time,
  left,
  width,
}) => {
  const timeFormatted = useMemo(() => {
    return formatTime(time);
  }, [time]);

  return (
    <div
      className="absolute top-0 h-full flex items-center justify-center border-r border-border-secondary"
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
