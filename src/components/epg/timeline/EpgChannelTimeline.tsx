import { useVirtualizer } from "@tanstack/react-virtual";
import { memo, useMemo, useRef } from "react";

import dayjs from "@/constants/dayjs/dayjs";

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

const EpgChannelTimeline = memo<EpgChannelTimelineProps>(
  ({ schedules, hourWidth, globalEarliestStart, totalWidth }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Calculate program positions with memoization
    const programList = useMemo(() => {
      return schedules.map(schedule => {
        const start = dayjs(schedule.start);
        const end = dayjs(schedule.end);

        const offsetMinutes = start.diff(
          dayjs(globalEarliestStart).startOf("hour"),
          "minute"
        );
        const durationMinutes = end.diff(start, "minute");
        const pixelWidth = (durationMinutes / 60) * hourWidth;

        const program = {
          program: schedule,
          position: (offsetMinutes / 60) * hourWidth,
          width: pixelWidth,
        };

        return program;
      });
    }, [schedules, globalEarliestStart, hourWidth]);

    // Virtualization setup for programs
    const programVirtualizer = useVirtualizer({
      count: programList.length,
      getScrollElement: () => containerRef.current,
      estimateSize: index => {
        const item = programList[index];
        return item.width;
      },
      overscan: programList.length,
    });

    return (
      <div
        className="relative h-full overflow-hidden"
        style={{ width: totalWidth }}
        ref={containerRef}
      >
        {programVirtualizer.getVirtualItems().map(virtualItem => {
          const { program, position, width } = programList[virtualItem.index];

          return (
            <EpgChannelTimelineTile
              key={`${program.id}-${virtualItem.index}`}
              role="button"
              program={program}
              style={{
                position: "absolute",
                left: position,
                width: width,
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
