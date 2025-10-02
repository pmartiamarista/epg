import { memo } from "react";

import dayjs from "@/constants/dayjs/dayjs";

import EpgChannelTimelineTile from "./EpgChannelTimelineTile";

import type { GlobalEarliestStart, HourWidth } from "@/types/common.types";
import type { EpgChannel } from "@/types/egp.types";

interface EpgChannelTimelineProps
  extends Pick<EpgChannel, "schedules">,
    HourWidth,
    GlobalEarliestStart {}

const EpgChannelTimeline = memo<EpgChannelTimelineProps>(
  ({ schedules, hourWidth, globalEarliestStart }) => {
    const latestEnd =
      schedules.length > 0
        ? Math.max(...schedules.map(p => dayjs(p.end).valueOf()))
        : globalEarliestStart;

    const startTime = dayjs(globalEarliestStart);
    const endTime = dayjs(latestEnd);
    const totalMinutes = endTime.diff(startTime, "minute", true);

    // Round up to the next hour boundary to avoid cut-off appearance
    const roundedHours = Math.ceil(totalMinutes / 60);
    const timelineWidth = Math.max(roundedHours * hourWidth, 200);

    return (
      <div
        className="relative h-full overflow-hidden"
        style={{ width: `${timelineWidth}px` }}
      >
        {schedules.map(program => {
          const start = dayjs(program.start);
          const end = dayjs(program.end);

          const offsetMinutes = start.diff(
            dayjs(globalEarliestStart),
            "minute"
          );
          const durationMinutes = end.diff(start, "minute");
          const pixelWidth = (durationMinutes / 60) * hourWidth;

          return (
            <EpgChannelTimelineTile
              key={program.id}
              role="button"
              program={program}
              style={{
                left: `${(offsetMinutes / 60) * hourWidth}px`,
                width: `${pixelWidth}px`,
              }}
              data-program-id={program.id}
            />
          );
        })}
      </div>
    );
  }
);

export default memo(EpgChannelTimeline);
