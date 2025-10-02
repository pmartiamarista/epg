import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useLayoutEffect, useMemo, useRef } from "react";

import { layoutConfig } from "@/constants/layout";
import { calculateTimelineWidth } from "@/utils/time/calculateTimelineWidth/calculateTimelineWidth";

import EpgDayHeader from "./header/EpgDayHeader";
import EpgTimeHeader from "./header/EpgTimeHeader";
import NowButton from "./NowButton";
import CurrentTimeLine from "./timeline/CurrentTimeLine";
import EpgChannelTile from "./timeline/EpgChannelTile";
import EpgChannelTimeline from "./timeline/EpgChannelTimeline";

import type { EpgChannel } from "@/types/egp.types";

type EPGProps = { channels: EpgChannel[] };

const EpgViewer: React.FC<EPGProps> = ({ channels }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: channels.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => layoutConfig.rowHeight,
    overscan: 4,
  });

  const { globalEarliestStart, globalLatestEnd } = useMemo(() => {
    let earliest = Infinity;
    let latest = -Infinity;

    for (const channel of channels) {
      for (const program of channel.schedules) {
        const start = program.start;
        const end = program.end;

        earliest = Math.min(earliest, start);
        latest = Math.max(latest, end);
      }
    }

    return {
      globalEarliestStart: earliest,
      globalLatestEnd: latest,
    };
  }, [channels]);

  const timelineWidth = useMemo(() => {
    return calculateTimelineWidth({
      globalEarliestStart,
      globalLatestEnd,
      hourWidth: layoutConfig.hourWidth,
      channelColumnWidth: layoutConfig.channelColumnWidth,
    });
  }, [globalEarliestStart, globalLatestEnd]);

  useLayoutEffect(() => {
    // Force virtualizer to re-measure after layout change
    rowVirtualizer.measure();
  }, [rowVirtualizer]);

  return (
    <div className="h-screen w-screen flex flex-col text-text-primary font-sans select-none">
      <div className="flex items-center justify-between p-4 bg-bg-secondary border-b border-border-primary">
        <h1 className="text-xl font-bold">EPG Viewer</h1>
        <NowButton
          containerRef={containerRef}
          globalEarliestStart={globalEarliestStart}
          hourWidth={layoutConfig.hourWidth}
        />
      </div>

      <EpgDayHeader
        globalEarliestStart={globalEarliestStart}
        hourWidth={layoutConfig.hourWidth}
        channelColumnWidth={layoutConfig.channelColumnWidth}
        scrollContainerRef={containerRef}
      />
      <div
        ref={containerRef}
        className="flex-1 overflow-auto relative scrollbar-hide"
      >
        <EpgTimeHeader
          globalEarliestStart={globalEarliestStart}
          globalLatestEnd={globalLatestEnd}
          hourWidth={layoutConfig.hourWidth}
          channelColumnWidth={layoutConfig.channelColumnWidth}
          totalWidth={timelineWidth + layoutConfig.channelColumnWidth}
          scrollContainerRef={containerRef}
        />

        <div
          className="relative"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${timelineWidth + layoutConfig.channelColumnWidth}px`,
          }}
        >
          {/* Current time line - rendered once for all rows */}
          <CurrentTimeLine
            globalEarliestStart={globalEarliestStart}
            hourWidth={layoutConfig.hourWidth}
            channelColumnWidth={layoutConfig.channelColumnWidth}
            className="z-2"
          />

          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const channel = channels[virtualRow.index];
            if (!channel) return null;
            return (
              <div
                key={virtualRow.key}
                className="absolute top-0 left-0 bg-bg-primary"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: `${timelineWidth + layoutConfig.channelColumnWidth}px`,
                }}
              >
                <div className="flex h-full">
                  <EpgChannelTile
                    channel={channel}
                    style={{ width: `${layoutConfig.channelColumnWidth}px` }}
                    className="z-3 sticky left-0"
                  />
                  <div className="w-full relative overflow-hidden z-1">
                    <EpgChannelTimeline
                      schedules={channel.schedules}
                      hourWidth={layoutConfig.hourWidth}
                      globalEarliestStart={globalEarliestStart}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EpgViewer;
