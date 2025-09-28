import { memo } from "react";

import EpgChannelTimelineTile from "./EpgChannelTimelineTile";

import type { EpgChannel, ProgramSchedule } from "@/types/egp.types";

interface EpgChannelTimelineProps extends Pick<EpgChannel, "schedules"> {
  dayStartTimestamp: number;
  hourWidth: number;
  now: Date;
  onClick: (program: ProgramSchedule) => void;
}

const EpgChannelTimeline = memo<EpgChannelTimelineProps>(
  ({ schedules, dayStartTimestamp, hourWidth, now, onClick }) => {
    return (
      <div className="relative h-full">
        {schedules.map(program => {
          const start = new Date(program.start);
          const end = new Date(program.end);
          const isPlaying = now >= start && now < end;
          const offsetMinutes = (start.getTime() - dayStartTimestamp) / 60000;
          const durationMinutes = (end.getTime() - start.getTime()) / 60000;
          const pixelWidth = (durationMinutes / 60) * hourWidth;

          let progressPercentage = 0;
          let minutesLeft = 0;
          if (isPlaying) {
            const totalDuration = end.getTime() - start.getTime();
            const elapsed = now.getTime() - start.getTime();
            progressPercentage = (elapsed / totalDuration) * 100;
            minutesLeft = Math.ceil((end.getTime() - now.getTime()) / 60000);
          }

          return (
            <EpgChannelTimelineTile
              key={program.id}
              program={program}
              isPlaying={isPlaying}
              minutesLeft={minutesLeft}
              progressPercentage={progressPercentage}
              style={{
                left: `${(offsetMinutes / 60) * hourWidth}px`,
                width: `${pixelWidth}px`,
              }}
              onClick={() => onClick(program)}
            />
          );
        })}
      </div>
    );
  }
);

export default memo(EpgChannelTimeline);
