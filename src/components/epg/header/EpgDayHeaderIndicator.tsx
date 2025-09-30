import { type FC, memo } from "react";

import formatTime from "@/utils/time/formatTime/formatTime";

interface DayIndicatorProps {
  currentDay: number;
}

const EpgDayHeaderIndicator: FC<DayIndicatorProps> = memo(({ currentDay }) => {
  return (
    <div className="flex items-center justify-center h-8 bg-bg-secondary border-b border-border-primary">
      <span className="text-text-primary text-sm font-medium">
        {formatTime(currentDay, "ddd, DD MMM")}
      </span>
    </div>
  );
});

export default EpgDayHeaderIndicator;
