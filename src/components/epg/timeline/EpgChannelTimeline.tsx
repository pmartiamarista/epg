import { differenceInMinutes, startOfHour } from "date-fns";
import { memo, useMemo } from "react";

import EpgChannelTimelineTile from "./EpgChannelTimelineTile";

import type {
  GlobalEarliestStart,
  HourWidth,
  TotalWidth,
} from "@/types/common.types";
import type { EpgChannel } from "@/types/egp.types";

interface EpgChannelTimelineProps
  extends Pick<EpgChannel, "schedules">,
    TotalWidth,
    HourWidth,
    GlobalEarliestStart {}

/**
 * Timeline showing channel programs with positioning using date-fns
 * @param schedules - Array of program schedules
 * @param hourWidth - Width per hour in pixels
 * @param globalEarliestStart - Timeline start time
 * @param totalWidth - Total timeline width
 */
const EpgChannelTimeline = memo<EpgChannelTimelineProps>(
  ({ schedules, hourWidth, globalEarliestStart, totalWidth }) => {
    const programList = useMemo(() => {
      return schedules.map(schedule => {
        const start = new Date(schedule.start);
        const end = new Date(schedule.end);

        const timelineStart = startOfHour(new Date(globalEarliestStart));
        const offsetMinutes = differenceInMinutes(start, timelineStart);
        const durationMinutes = differenceInMinutes(end, start);
        const pixelWidth = (durationMinutes / 60) * hourWidth;

        return {
          program: schedule,
          position: (offsetMinutes / 60) * hourWidth,
          width: pixelWidth,
        };
      });
    }, [schedules, globalEarliestStart, hourWidth]);

    return (
      <div
        className="relative h-full overflow-hidden"
        style={{ width: totalWidth }}
      >
        {programList.map((item, index) => (
          <EpgChannelTimelineTile
            key={`${item.program.id}-${index}`}
            role="button"
            program={item.program}
            style={{
              position: "absolute",
              left: item.position,
              width: item.width,
            }}
            data-program-id={item.program.id}
          />
        ))}
      </div>
    );
  }
);

export default EpgChannelTimeline;
