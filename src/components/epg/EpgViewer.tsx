import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";

import dayjs from "@/constants/dayjs/dayjs";
import {
  DESKTOP_BREAKPOINT,
  layoutConfigByDevice,
  TABLET_BREAKPOINT,
} from "@/constants/layout";
import { calculateTimelineWidth } from "@/utils/time/calculateTimelineWidth/calculateTimelineWidth";
import { now } from "@/utils/time/now/now";

import EpgDayHeader from "./header/EpgDayHeader";
import EpgTimeHeader from "./header/EpgTimeHeader";
import NowButton from "./NowButton";
import EpgChannelTile from "./timeline/EpgChannelTile";
import EpgChannelTimeline from "./timeline/EpgChannelTimeline";

import type { EpgChannel } from "@/types/egp.types";

type EPGProps = { channels: EpgChannel[] };

const EpgViewer: React.FC<EPGProps> = ({ channels }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef(layoutConfigByDevice.mobile);

  const rowVirtualizer = useVirtualizer({
    count: channels.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => layoutRef.current.rowHeight,
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
      hourWidth: layoutRef.current.hourWidth,
      channelColumnWidth: layoutRef.current.channelColumnWidth,
    });
  }, [globalEarliestStart, globalLatestEnd]);

  const handleScrollToNow = useCallback(() => {
    if (!containerRef.current) return;

    const nowTime = now();
    const hoursFromStart = nowTime.diff(
      dayjs(globalEarliestStart),
      "hour",
      true
    );
    const scrollLeft = hoursFromStart * layoutRef.current.hourWidth;
    const containerWidth = containerRef.current.clientWidth;
    const centeredScrollLeft =
      scrollLeft - containerWidth / 2 + layoutRef.current.channelColumnWidth;

    containerRef.current.scrollTo({
      left: Math.max(0, centeredScrollLeft),
      behavior: "smooth",
    });
  }, [globalEarliestStart]);

  useLayoutEffect(() => {
    const checkSize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        layoutRef.current = layoutConfigByDevice.desktop;
      } else if (window.innerWidth >= TABLET_BREAKPOINT) {
        layoutRef.current = layoutConfigByDevice.tablet;
      } else {
        layoutRef.current = layoutConfigByDevice.mobile;
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col text-text-primary font-sans select-none">
      <div className="flex items-center justify-between p-4 bg-bg-secondary border-b border-border-primary">
        <h1 className="text-xl font-bold">EPG Viewer</h1>
        <NowButton onScrollToNow={handleScrollToNow} />
      </div>

      <EpgDayHeader
        globalEarliestStart={globalEarliestStart}
        hourWidth={layoutRef.current.hourWidth}
        channelColumnWidth={layoutRef.current.channelColumnWidth}
        scrollContainerRef={containerRef}
      />
      <div
        ref={containerRef}
        className="flex-1 overflow-auto relative scrollbar-hide"
      >
        <EpgTimeHeader
          globalEarliestStart={globalEarliestStart}
          globalLatestEnd={globalLatestEnd}
          hourWidth={layoutRef.current.hourWidth}
          channelColumnWidth={layoutRef.current.channelColumnWidth}
          totalWidth={timelineWidth}
          scrollContainerRef={containerRef}
        />

        <div
          className="relative"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${timelineWidth}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const channel = channels[virtualRow.index];
            if (!channel) return null;
            return (
              <div
                key={virtualRow.key}
                className="flex absolute top-0 left-0 bg-bg-primary"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                }}
              >
                <EpgChannelTile
                  channel={channel}
                  style={{ width: `${layoutRef.current.channelColumnWidth}px` }}
                />
                <div className="w-full">
                  <EpgChannelTimeline
                    schedules={channel.schedules}
                    hourWidth={layoutRef.current.hourWidth}
                    globalEarliestStart={globalEarliestStart}
                  />
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
