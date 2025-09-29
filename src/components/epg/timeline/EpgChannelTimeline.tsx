import { memo } from "react";

import now from "@/utils/time/now/now";

import EpgChannelTimelineTile from "./EpgChannelTimelineTile";

import type { EpgChannel } from "@/types/egp.types";

interface EpgChannelTimelineProps extends Pick<EpgChannel, "schedules"> {
  hourWidth: number;
  selectedProgram?: string | null;
  globalEarliestStart: number;
  onClick: (programId: string) => void;
}

const EpgChannelTimeline = memo<EpgChannelTimelineProps>(
  ({ schedules, hourWidth, selectedProgram, globalEarliestStart, onClick }) => {
    const nowDate = now().toDate();

    // Calculate timeline width based on this channel's programs
    const latestEnd =
      schedules.length > 0
        ? Math.max(...schedules.map(p => new Date(p.end).getTime()))
        : globalEarliestStart;

    const totalMinutes = (latestEnd - globalEarliestStart) / 60000;
    const timelineWidth = Math.max((totalMinutes / 60) * hourWidth, 200);

    return (
      <div className="relative h-full" style={{ width: `${timelineWidth}px` }}>
        {schedules.map(program => {
          const start = new Date(program.start);
          const end = new Date(program.end);
          const isPlaying = nowDate >= start && nowDate < end;
          const offsetMinutes = (start.getTime() - globalEarliestStart) / 60000;
          const durationMinutes = (end.getTime() - start.getTime()) / 60000;
          const pixelWidth = (durationMinutes / 60) * hourWidth;

          return (
            <EpgChannelTimelineTile
              key={program.id}
              program={program}
              isPlaying={isPlaying}
              isSelected={selectedProgram === program.id}
              style={{
                left: `${(offsetMinutes / 60) * hourWidth}px`,
                width: `${pixelWidth}px`,
              }}
              data-program-id={program.id}
              onClick={() => onClick(program.id)}
            />
          );
        })}
      </div>
    );
  }
);

export default memo(EpgChannelTimeline);
